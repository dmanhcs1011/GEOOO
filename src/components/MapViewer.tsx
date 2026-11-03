import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import {
  Layers,
  Search,
  MapPin,
  Compass,
  Check,
  Eye,
  Info,
  Building2,
  Navigation,
  ExternalLink,
  ChevronDown,
  Table as TableIcon,
  Filter,
  ArrowUpDown,
  X,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  Map as MapIcon
} from 'lucide-react';
import { PLACES, Place, PlaceCategory } from '../data/geoData';
import {
  COMMUNES_92,
  Commune,
  DEVELOPMENT_ZONES,
  DevelopmentZone,
  AdministrativeStatus
} from '../data/communesData';

export type MainContentLayer = 'all' | 'tourism' | 'education' | 'disaster' | 'communes';

interface MapViewerProps {
  onSelectPlace: (place: Place) => void;
  lang: 'vi' | 'en';
  forcedLayer?: MainContentLayer;
}

type TileProvider = 'googleRoad' | 'googleSatellite' | 'googleTerrain' | 'osm';

export const MapViewer: React.FC<MapViewerProps> = ({
  onSelectPlace,
  lang,
  forcedLayer = 'all',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const placeMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const communeMarkersRef = useRef<{ [key: string]: L.Marker }>({});

  const [activeTile, setActiveTile] = useState<TileProvider>('googleRoad');
  const [activeLayer, setActiveLayer] = useState<MainContentLayer>(forcedLayer);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Đơn vị hành chính sáp nhập mới nhất theo NQ 1683
  const [selectedUnitType, setSelectedUnitType] = useState<'all' | 'Phường' | 'Xã' | 'Giữ nguyên'>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'split' | 'table'>('split');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [showCommunes, setShowCommunes] = useState(true);
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  // Sync forcedLayer prop if changed externally
  useEffect(() => {
    if (forcedLayer) {
      setActiveLayer(forcedLayer);
    }
  }, [forcedLayer]);

  const tilesConfig = {
    googleRoad: {
      name: 'Google Maps',
      url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '© Google Maps',
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    },
    googleSatellite: {
      name: 'Google Vệ tinh',
      url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '© Google Maps',
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    },
    googleTerrain: {
      name: 'Google Địa hình',
      url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      attribution: '© Google Maps',
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    },
    osm: {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    },
  };

  // Bounds covering the entire unified 92-commune territory (from south Phổ Yên to north Pác Nặm)
  const PROVINCE_BOUNDS: L.LatLngBoundsExpression = [
    [21.32, 105.42], // Southwest (Phú Thọ / Tuyên Quang / Hà Nội border)
    [22.74, 106.28], // Northeast (Cao Bằng / Lạng Sơn border)
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [21.95, 105.82],
      zoom: 9,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const initialConfig = tilesConfig.googleRoad;
    const initialTile = L.tileLayer(initialConfig.url, {
      attribution: initialConfig.attribution,
      maxZoom: initialConfig.maxZoom,
      subdomains: initialConfig.subdomains,
    }).addTo(map);

    tileLayerRef.current = initialTile;
    mapInstanceRef.current = map;

    // Fit map bounds smoothly
    setTimeout(() => {
      map.fitBounds(PROVINCE_BOUNDS, { padding: [15, 15] });
    }, 150);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    const config = tilesConfig[activeTile];
    const newTile = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
      subdomains: config.subdomains,
    }).addTo(map);
    tileLayerRef.current = newTile;
  }, [activeTile]);

  // Render & Update Main Places Markers based on 3 Main Content Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing place markers
    Object.values(placeMarkersRef.current).forEach((marker) => {
      map.removeLayer(marker);
    });
    placeMarkersRef.current = {};

    PLACES.forEach((place) => {
      // Check which layers match
      let isVisible = false;
      if (activeLayer === 'all') {
        isVisible = true;
      } else if (activeLayer === 'tourism') {
        isVisible = place.category === 'history' || place.category === 'culture';
      } else if (activeLayer === 'education') {
        isVisible =
          place.category === 'tea' ||
          place.category === 'culture' ||
          place.id === 'atk-dinh-hoa' ||
          place.id === 'nguom-rock-shelter';
      } else if (activeLayer === 'disaster') {
        isVisible = place.category === 'disaster';
      } else if (activeLayer === 'communes') {
        isVisible = false;
      }

      if (!isVisible) return;

      const markerHtml = `
        <div class="relative flex items-center justify-center group cursor-pointer">
          <div class="absolute -inset-1.5 rounded-full opacity-60 animate-ping" style="background-color: ${place.color};"></div>
          <div class="relative w-8 h-8 rounded-full shadow-md flex items-center justify-center text-white border-2 border-white transition-transform group-hover:scale-125" style="background-color: ${place.color};">
            <span class="text-xs font-bold">${
              place.category === 'tea'
                ? '🍃'
                : place.category === 'history'
                ? '🏛️'
                : place.category === 'culture'
                ? '🎭'
                : '⚠️'
            }</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1.5 font-sans text-stone-900 max-w-[260px]';
      popupContent.innerHTML = `
        <div class="text-[11px] font-bold text-white px-2 py-0.5 rounded mb-1 inline-block" style="background-color: ${place.color}">
          ${lang === 'vi' ? place.typeVi : place.typeEn}
        </div>
        <h4 class="font-bold text-sm text-stone-900 leading-tight">${lang === 'vi' ? place.nameVi : place.nameEn}</h4>
        <p class="text-[11px] text-stone-600 line-clamp-2 my-1">${lang === 'vi' ? place.descVi : place.descEn}</p>
        <button id="btn-view-${place.id}" class="w-full mt-1 px-3 py-1 text-xs font-bold bg-[#116149] hover:bg-[#0e4e3a] text-white rounded shadow-sm text-center">
          ${lang === 'vi' ? 'Xem chi tiết & Thuyết minh →' : 'View Details & Voice →'}
        </button>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-view-${place.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectPlace(place);
            setSelectedPlaceId(place.id);
          };
        }
      });

      marker.addTo(map);
      placeMarkersRef.current[place.id] = marker;
    });
  }, [activeLayer, lang, onSelectPlace]);

  // Render & Update 92 Communes Markers with Accurate Number Badges (1..92) matching textbook map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing commune markers
    Object.values(communeMarkersRef.current).forEach((m) => {
      map.removeLayer(m);
    });
    communeMarkersRef.current = {};

    const shouldShow = showCommunes || activeLayer === 'communes';
    if (!shouldShow) return;

    COMMUNES_92.forEach((c) => {
      // Filter by Unit Type if selected
      if (selectedUnitType === 'Phường' && c.type !== 'Phường') return;
      if (selectedUnitType === 'Xã' && c.type !== 'Xã') return;
      if (selectedUnitType === 'Giữ nguyên' && c.status !== 'Đơn vị giữ nguyên trạng') return;

      // Filter by Development Zone if selected
      if (selectedZone !== 'all' && c.zone !== selectedZone) return;

      // Compact numbered marker badge centered directly on the exact coordinates
      const communePinHtml = `
        <div style="transform: translate(-50%, -50%); display: inline-flex; align-items: center; justify-content: center;" class="pointer-events-auto">
          <div class="group cursor-pointer flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/95 text-stone-900 border-2 border-[#116149] shadow-md hover:scale-125 hover:z-50 hover:bg-[#116149] hover:text-white transition-all select-none whitespace-nowrap">
            <span class="w-4 h-4 rounded-full bg-[#116149] text-white flex items-center justify-center text-[9px] font-black group-hover:bg-amber-300 group-hover:text-stone-900 shrink-0">
              ${c.number}
            </span>
            <span class="text-[10px] font-bold text-stone-800 group-hover:text-white">
              ${c.name.replace('Xã ', '').replace('P. ', 'P.')}
            </span>
          </div>
        </div>
      `;

      const communeIcon = L.divIcon({
        className: 'custom-commune-pin',
        html: communePinHtml,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([c.lat, c.lng], { icon: communeIcon });

      const isPreserved = c.status === 'Đơn vị giữ nguyên trạng';
      const statusBadge = isPreserved
        ? `<span style="font-size: 10px; font-weight: bold; background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; border: 1px solid #fde68a;">Giữ nguyên trạng (NQ 1683)</span>`
        : `<span style="font-size: 10px; font-weight: bold; background: #e0f2fe; color: #075985; padding: 2px 6px; border-radius: 4px; border: 1px solid #bae6fd;">Sáp nhập theo NQ 1683</span>`;

      const popupHtml = `
        <div style="font-family: Arial, sans-serif; padding: 6px; max-width: 280px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; gap: 4px;">
            <span style="font-size: 11px; font-weight: 800; background-color: #116149; color: white; padding: 2px 7px; border-radius: 6px;">
              Số ${c.number} / 92 · ${c.type}
            </span>
            ${statusBadge}
          </div>
          <h3 style="margin: 4px 0 2px; font-size: 16px; font-weight: 800; color: #111;">
            ${c.name}
          </h3>
          <div style="font-size: 11px; color: #0e5945; font-weight: bold; margin-bottom: 4px;">
            📍 ${c.zone}
          </div>
          <p style="margin: 4px 0; font-size: 12px; color: #444; line-height: 1.45;">
            ${lang === 'vi' ? c.featureVi : c.featureEn}
          </p>
          <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
            <span style="color: #666; font-family: monospace;">GPS: ${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}</span>
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${c.name}, Thái Nguyên`
            )}" style="color: #0e5945; font-weight: bold; text-decoration: none;">
              🧭 Google Maps ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        setSelectedCommune(c);
      });

      marker.addTo(map);
      communeMarkersRef.current[c.id] = marker;
    });
  }, [showCommunes, activeLayer, selectedUnitType, selectedZone, lang]);

  // Fly to commune handler
  const handleFlyToCommune = (c: Commune) => {
    setSelectedCommune(c);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([c.lat, c.lng], 13.5, { duration: 1.2 });
      const marker = communeMarkersRef.current[c.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 600);
      }
    }
  };

  const handleFlyToPlace = (place: Place) => {
    setSelectedPlaceId(place.id);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([place.lat, place.lng], 13.5, { duration: 1.2 });
      const marker = placeMarkersRef.current[place.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 600);
      }
    }
  };

  const handleResetProvince = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.fitBounds(PROVINCE_BOUNDS, { padding: [15, 15], duration: 1 });
    }
  };

  // Filtered and sorted communes for sidebar & administrative table
  const filteredCommunes = useMemo(() => {
    return COMMUNES_92.filter((c) => {
      // Filter by unit type
      if (selectedUnitType === 'Phường' && c.type !== 'Phường') return false;
      if (selectedUnitType === 'Xã' && c.type !== 'Xã') return false;
      if (selectedUnitType === 'Giữ nguyên' && c.status !== 'Đơn vị giữ nguyên trạng') return false;

      // Filter by development zone
      if (selectedZone !== 'all' && c.zone !== selectedZone) return false;

      // Text search
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const num = c.number.toString();
      const name = c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const zone = (c.zone || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const feat = (c.featureVi || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const highlight = (c.highlight || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      return (
        q === num ||
        num.includes(q) ||
        name.includes(q) ||
        zone.includes(q) ||
        feat.includes(q) ||
        highlight.includes(q)
      );
    }).sort((a, b) => (sortOrder === 'asc' ? a.number - b.number : b.number - a.number));
  }, [selectedUnitType, selectedZone, searchQuery, sortOrder]);

  const filteredPlaces = PLACES.filter((p) => {
    if (activeLayer === 'tourism' && p.category !== 'history' && p.category !== 'culture')
      return false;
    if (
      activeLayer === 'education' &&
      p.category !== 'tea' &&
      p.category !== 'culture' &&
      p.id !== 'atk-dinh-hoa' &&
      p.id !== 'nguom-rock-shelter'
    )
      return false;
    if (activeLayer === 'disaster' && p.category !== 'disaster') return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const name = p.nameVi.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.includes(q) || p.descVi.toLowerCase().includes(q);
  });

  return (
    <div className="bg-[#f5f8f5] text-stone-900 border-b border-stone-200">
      {/* 3 Prominent Layer Buttons Header Bar */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#116149] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#116149]" />
              <span>{lang === 'vi' ? '3 Lớp Nội Dung Bản Đồ' : '3 Main Content Layers'}:</span>
            </span>
          </div>

          {/* 3 Main Buttons corresponding to the 3 content layers */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveLayer('tourism')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                activeLayer === 'tourism'
                  ? 'bg-[#116149] text-white ring-2 ring-[#116149]/30'
                  : 'bg-stone-100 hover:bg-emerald-50 text-stone-700 border border-stone-200'
              }`}
            >
              <span>🗺️</span>
              <span>{lang === 'vi' ? '01. Du Lịch & Di Tích' : '01. Tourism & Relics'}</span>
            </button>

            <button
              onClick={() => setActiveLayer('education')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                activeLayer === 'education'
                  ? 'bg-[#198263] text-white ring-2 ring-[#198263]/30'
                  : 'bg-stone-100 hover:bg-emerald-50 text-stone-700 border border-stone-200'
              }`}
            >
              <span>📚</span>
              <span>{lang === 'vi' ? '02. GDĐP & Vùng Chè' : '02. Local Education & Teas'}</span>
            </button>

            <button
              onClick={() => setActiveLayer('disaster')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                activeLayer === 'disaster'
                  ? 'bg-rose-700 text-white ring-2 ring-rose-700/30'
                  : 'bg-stone-100 hover:bg-rose-50 text-stone-700 border border-stone-200'
              }`}
            >
              <span>⚠️</span>
              <span>{lang === 'vi' ? '03. Khí Hậu & Ngập Lụt' : '03. Climate & Flood'}</span>
            </button>

            <button
              onClick={() => setActiveLayer('all')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLayer === 'all'
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>{lang === 'vi' ? 'Tất cả lớp' : 'All Layers'}</span>
            </button>

            {/* Mode Switcher: Map View vs Full Data Table */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-[#116149] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Xem giao diện Bản đồ tương tác kết hợp tra cứu"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Bản đồ tương tác' : 'Interactive Map'}</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#116149] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Mở Bảng tra cứu 92 Đơn vị hành chính sáp nhập mới nhất"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Bảng tra cứu 92 ĐVHC' : '92 Communes Table'}</span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              </button>
            </div>

            {/* 92 Communes Toggle Button */}
            <button
              onClick={() => setShowCommunes(!showCommunes)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                showCommunes
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}
              title={lang === 'vi' ? 'Bật/tắt 92 ghim xã/phường trên bản đồ' : 'Toggle 92 commune pins'}
            >
              <MapPin className="w-3.5 h-3.5 text-[#116149]" />
              <span>{lang === 'vi' ? 'Lớp 92 Xã/Phường' : '92 Communes Layer'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Split Map Mode vs Full Table View Mode */}
      {viewMode === 'table' ? (
        /* =================== FULL ADMINISTRATIVE DATA TABLE =================== */
        <div className="max-w-7xl mx-auto p-3 sm:p-5">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            {/* Table Header Banner */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-900 via-[#116149] to-teal-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black uppercase tracking-wider">
                    NQ 1683/NQ-UBTVQH15 & NQ 202/2025/QH15
                  </span>
                  <span className="text-xs text-emerald-200">
                    Chính quyền 2 cấp: Tỉnh → Xã/Phường
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black">
                  Bảng Tra Cứu 92 Đơn Vị Hành Chính Sáp Nhập Mới Nhất
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                  Tỉnh Thái Nguyên mới sau sáp nhập gồm <strong className="text-amber-300">15 Phường</strong> đô thị, <strong className="text-amber-300">75 Xã</strong> sắp xếp mới và <strong className="text-amber-300">02 Xã</strong> giữ nguyên trạng (Sảng Mộc & Thượng Quan).
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setViewMode('split')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#116149] hover:bg-emerald-50 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <MapIcon className="w-4 h-4" />
                  <span>Quay lại Bản đồ</span>
                </button>
              </div>
            </div>

            {/* Table Control Filters Bar */}
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo STT (1-92), tên xã / phường, phân vùng, đặc trưng..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#116149]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Tabs by Unit Type */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setSelectedUnitType('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedUnitType === 'all'
                      ? 'bg-[#116149] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  Tất cả (92)
                </button>
                <button
                  onClick={() => setSelectedUnitType('Phường')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedUnitType === 'Phường'
                      ? 'bg-purple-700 text-white'
                      : 'bg-white text-stone-700 hover:bg-purple-50 border border-stone-200'
                  }`}
                >
                  15 Phường (78-92)
                </button>
                <button
                  onClick={() => setSelectedUnitType('Xã')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedUnitType === 'Xã'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-stone-700 hover:bg-emerald-50 border border-stone-200'
                  }`}
                >
                  77 Xã (1-77)
                </button>
                <button
                  onClick={() => setSelectedUnitType('Giữ nguyên')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedUnitType === 'Giữ nguyên'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
                  }`}
                >
                  02 Giữ nguyên (76, 77)
                </button>
              </div>

              {/* Zone Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="text-xs py-1.5 px-3 rounded-xl border border-stone-200 bg-white text-stone-700 focus:outline-none focus:border-[#116149]"
                >
                  <option value="all">Toàn bộ 5 Phân vùng không gian</option>
                  {DEVELOPMENT_ZONES.map((z) => (
                    <option key={z.id} value={z.name}>
                      {z.name} ({z.count} ĐVHC)
                    </option>
                  ))}
                </select>

                {/* Sort STT toggle */}
                <button
                  onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-100"
                  title="Sắp xếp theo STT"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#116149]" />
                  <span>{sortOrder === 'asc' ? 'STT 1 → 92' : 'STT 92 → 1'}</span>
                </button>
              </div>
            </div>

            {/* Results counter bar */}
            <div className="px-4 py-2 bg-emerald-50/50 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>
                Hiển thị <strong className="text-[#116149] font-bold">{filteredCommunes.length}</strong> / 92 đơn vị hành chính cấp xã
              </span>
              <span className="text-[11px] text-stone-500">
                Nhấp vào "Định vị" để bay tới vị trí xã/phường trên bản đồ số
              </span>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-stone-100 text-stone-700 uppercase font-black tracking-wider text-[11px] sticky top-0 z-10 border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-3 w-16 text-center">STT</th>
                    <th className="py-3 px-4">Đơn vị hành chính mới</th>
                    <th className="py-3 px-3">Loại hình</th>
                    <th className="py-3 px-4">Phân vùng phát triển</th>
                    <th className="py-3 px-3">Tình trạng sáp nhập</th>
                    <th className="py-3 px-4">Tọa độ GPS</th>
                    <th className="py-3 px-5">Đặc trưng nổi bật & Tiềm năng</th>
                    <th className="py-3 px-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCommunes.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-stone-400">
                        Không tìm thấy đơn vị hành chính nào phù hợp với từ khóa "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    filteredCommunes.map((c) => {
                      const isPreserved = c.status === 'Đơn vị giữ nguyên trạng';
                      return (
                        <tr
                          key={c.id}
                          className="hover:bg-emerald-50/60 transition-colors group cursor-pointer"
                          onClick={() => {
                            setViewMode('split');
                            setTimeout(() => handleFlyToCommune(c), 150);
                          }}
                        >
                          {/* STT */}
                          <td className="py-2.5 px-3 text-center">
                            <span className="inline-flex w-7 h-7 rounded-lg bg-[#116149] text-white font-black text-xs items-center justify-center shadow-xs">
                              {c.number}
                            </span>
                          </td>

                          {/* Name */}
                          <td className="py-2.5 px-4 font-bold text-stone-900 group-hover:text-[#116149] whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span>{c.name}</span>
                              {c.highlight && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                  {c.highlight}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Type */}
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                                c.type === 'Phường'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {c.type === 'Phường' ? 'Phường Đô Thị' : 'Xã Nông Thôn'}
                            </span>
                          </td>

                          {/* Development Zone */}
                          <td className="py-2.5 px-4 whitespace-nowrap">
                            <span className="text-[11px] font-medium text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                              {c.zone}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                isPreserved
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-sky-100 text-sky-900 border border-sky-200'
                              }`}
                            >
                              {isPreserved ? 'Giữ nguyên trạng (NQ 1683)' : 'Sáp nhập theo NQ 1683'}
                            </span>
                          </td>

                          {/* GPS */}
                          <td className="py-2.5 px-4 whitespace-nowrap font-mono text-[11px] text-stone-600">
                            {c.lat.toFixed(4)}, {c.lng.toFixed(4)}
                          </td>

                          {/* Features */}
                          <td className="py-2.5 px-5 text-stone-600 line-clamp-2 max-w-xs text-[11px] leading-relaxed">
                            {lang === 'vi' ? c.featureVi : c.featureEn}
                          </td>

                          {/* Actions */}
                          <td
                            className="py-2.5 px-3 text-center whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setViewMode('split');
                                  setTimeout(() => handleFlyToCommune(c), 150);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#116149] text-white hover:bg-emerald-800 text-[11px] font-bold flex items-center gap-1 transition-colors"
                                title="Định vị và mở popup trên bản đồ"
                              >
                                <MapPin className="w-3 h-3" />
                                <span>Định vị</span>
                              </button>
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  `${c.name}, Thái Nguyên`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600"
                                title="Mở trên Google Maps"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer info */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Dữ liệu được chuẩn hóa số hiệu 1 đến 92 đồng bộ theo bản đồ Địa lí Giáo dục địa phương tỉnh Thái Nguyên mới nhất.
                </span>
              </div>
              <button
                onClick={() => setViewMode('split')}
                className="text-[#116149] font-bold hover:underline"
              >
                Mở Bản đồ tương tác →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =================== SPLIT INTERACTIVE MAP + SEARCH SIDEBAR =================== */
        <div className="max-w-7xl mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Left Explorer Sidebar */}
          <aside className="w-full lg:w-96 bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col max-h-[720px]">
            {/* Search Input & Filters */}
            <div className="space-y-2.5 pb-3 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#116149]" />
                    <span>Bảng Tìm Kiếm Khu Vực</span>
                  </h3>
                  <p className="text-[10px] text-stone-500">
                    Theo NQ 1683 sáp nhập (92 ĐVHC cấp xã)
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {showCommunes ? filteredCommunes.length : filteredPlaces.length} điểm
                </span>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'vi'
                      ? 'Tìm theo số (1-92), tên xã / phường...'
                      : 'Search by number (1-92), commune...'
                  }
                  className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#116149]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Unit Type Filter Tabs */}
              {showCommunes && (
                <div className="grid grid-cols-4 gap-1">
                  <button
                    onClick={() => setSelectedUnitType('all')}
                    className={`py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                      selectedUnitType === 'all'
                        ? 'bg-[#116149] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Tất cả (92)
                  </button>
                  <button
                    onClick={() => setSelectedUnitType('Phường')}
                    className={`py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                      selectedUnitType === 'Phường'
                        ? 'bg-purple-700 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    15 Phường
                  </button>
                  <button
                    onClick={() => setSelectedUnitType('Xã')}
                    className={`py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                      selectedUnitType === 'Xã'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    77 Xã
                  </button>
                  <button
                    onClick={() => setSelectedUnitType('Giữ nguyên')}
                    className={`py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                      selectedUnitType === 'Giữ nguyên'
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                    title="02 xã giữ nguyên trạng: Sảng Mộc & Thượng Quan"
                  >
                    02 Giữ nguyên
                  </button>
                </div>
              )}

              {/* Development Zone Dropdown */}
              {showCommunes && (
                <div className="flex items-center gap-1.5">
                  <label className="text-[11px] font-semibold text-stone-500 shrink-0">
                    Phân vùng:
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="flex-1 text-xs py-1 px-2 rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:border-[#116149]"
                  >
                    <option value="all">Tất cả 5 Không gian phát triển</option>
                    {DEVELOPMENT_ZONES.map((z) => (
                      <option key={z.id} value={z.name}>
                        {z.name} ({z.count})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Places & Communes Scrollable List */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 pr-1 space-y-1 pt-2">
              {/* Primary Educational Places */}
              {filteredPlaces.length > 0 && !showCommunes && (
                <div className="space-y-1">
                  {filteredPlaces.map((place) => (
                    <div
                      key={place.id}
                      onClick={() => handleFlyToPlace(place)}
                      className="p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-start gap-2.5 min-w-0 pr-2">
                        <span
                          className="w-3 h-3 rounded-full mt-0.5 shrink-0"
                          style={{ backgroundColor: place.color }}
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#116149] truncate">
                            {lang === 'vi' ? place.nameVi : place.nameEn}
                          </h4>
                          <p className="text-[11px] text-stone-500 truncate">
                            {lang === 'vi' ? place.typeVi : place.typeEn}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlace(place);
                        }}
                        className="p-1 rounded bg-stone-100 group-hover:bg-[#116149] group-hover:text-white text-stone-600 transition-colors"
                        title={lang === 'vi' ? 'Xem chi tiết' : 'Details'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 92 Communes List */}
              {showCommunes && (
                <div className="space-y-1">
                  {filteredCommunes.length === 0 ? (
                    <div className="py-8 text-center text-stone-400 text-xs">
                      Không có xã/phường nào phù hợp bộ lọc
                    </div>
                  ) : (
                    filteredCommunes.map((c) => {
                      const isSelected = selectedCommune?.id === c.id;
                      const isPreserved = c.status === 'Đơn vị giữ nguyên trạng';
                      return (
                        <div
                          key={c.id}
                          onClick={() => handleFlyToCommune(c)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                              : 'bg-white hover:bg-stone-50 border-stone-100'
                          }`}
                        >
                          <div className="min-w-0 pr-2 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-md bg-[#116149] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                              {c.number}
                            </span>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="font-bold text-xs text-stone-900 truncate">
                                  {c.name}
                                </h4>
                                <span
                                  className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                                    c.type === 'Phường'
                                      ? 'bg-purple-100 text-purple-700'
                                      : 'bg-emerald-100 text-emerald-700'
                                  }`}
                                >
                                  {c.type}
                                </span>
                                {isPreserved && (
                                  <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-amber-100 text-amber-800">
                                    Giữ nguyên
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                                {c.highlight || (lang === 'vi' ? c.featureVi : c.featureEn)}
                              </p>
                              <div className="text-[10px] text-stone-400 truncate mt-0.5">
                                📍 {c.zone}
                              </div>
                            </div>
                          </div>

                          <span className="text-xs text-emerald-700 font-bold shrink-0">
                            →
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Selected Commune Info Card */}
            {selectedCommune && (
              <div className="mt-3 p-3 rounded-xl bg-[#eaf5ef] border border-emerald-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#116149] text-xs flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-[#116149] text-white flex items-center justify-center text-[10px] font-bold">
                      {selectedCommune.number}
                    </span>
                    <span>{selectedCommune.name}</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-white text-stone-600 font-semibold border border-stone-200">
                      {selectedCommune.type}
                    </span>
                  </span>
                  <span className="text-[10px] text-stone-500 font-semibold">
                    {selectedCommune.status}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-emerald-800">
                  📍 {selectedCommune.zone}
                </div>
                <p className="text-stone-700 leading-snug">
                  {lang === 'vi' ? selectedCommune.featureVi : selectedCommune.featureEn}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 font-mono">
                    GPS: {selectedCommune.lat.toFixed(4)}, {selectedCommune.lng.toFixed(4)}
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCommune.lat},${selectedCommune.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#116149] font-bold hover:underline inline-flex items-center gap-0.5"
                  >
                    Chỉ đường ↗
                  </a>
                </div>
              </div>
            )}
          </aside>

          {/* Right Main Map Card */}
          <div className="flex-1 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col min-h-[540px] lg:min-h-[660px] relative">
            {/* Top Floating Map Controls */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              {/* Base map switcher */}
              <div className="flex items-center p-1 bg-white/95 rounded-xl shadow-md border border-stone-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveTile('googleRoad')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTile === 'googleRoad'
                      ? 'bg-[#116149] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                  title="Google Maps Tiêu chuẩn"
                >
                  🗺️ Google Maps
                </button>
                <button
                  onClick={() => setActiveTile('googleSatellite')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTile === 'googleSatellite'
                      ? 'bg-[#116149] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                  title="Google Vệ tinh lai có nhãn"
                >
                  🛰️ Vệ tinh
                </button>
                <button
                  onClick={() => setActiveTile('googleTerrain')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTile === 'googleTerrain'
                      ? 'bg-[#116149] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                  title="Google Địa hình"
                >
                  ⛰️ Địa hình
                </button>
                <button
                  onClick={() => setActiveTile('osm')}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTile === 'osm'
                      ? 'bg-[#116149] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                  title="OpenStreetMap"
                >
                  OSM
                </button>
              </div>

              {/* Reset View Button */}
              <button
                onClick={handleResetProvince}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-stone-800 rounded-xl shadow-md border border-stone-200 text-xs font-bold hover:bg-stone-50 transition-colors cursor-pointer"
                title="Xem toàn cảnh bản đồ 92 xã Thái Nguyên"
              >
                <Compass className="w-3.5 h-3.5 text-[#116149]" />
                <span>{lang === 'vi' ? 'Toàn cảnh 92 xã' : 'All 92 View'}</span>
              </button>
            </div>

            {/* Leaflet DOM container */}
            <div ref={mapContainerRef} className="w-full h-full flex-1 min-h-[500px] z-10" />

            {/* Bottom Map Legend */}
            <div className="bg-stone-50 border-t border-stone-200 px-4 py-2.5 z-20 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-stone-800 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-[#116149]" />
                  <span>{lang === 'vi' ? 'Ký hiệu bản đồ:' : 'Legend:'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-[#116149] text-white text-[9px] font-bold flex items-center justify-center">
                    #
                  </span>
                  <span className="font-medium">92 Vị trí xã/phường (chuẩn số 1-92 theo SGK)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span>Di tích lịch sử</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                  <span>Vùng chè danh tiếng</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span>Cảnh báo thiên tai</span>
                </span>
              </div>

              <span className="text-[11px] text-stone-500 font-medium">
                {lang === 'vi'
                  ? 'Bản đồ 92 đơn vị hành chính sau sáp nhập (NQ 1683) · GDĐP'
                  : '92 Communes Unified Map (Resolution 1683) · Local Education'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

