import React, { useEffect, useRef, useState } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { PLACES, Place, PlaceCategory } from '../data/geoData';
import { COMMUNES_92, Commune } from '../data/communesData';

export type MainContentLayer = 'all' | 'tourism' | 'education' | 'disaster' | 'communes';

interface MapViewerProps {
  onSelectPlace: (place: Place) => void;
  lang: 'vi' | 'en';
  forcedLayer?: MainContentLayer;
}

type TileProvider = 'osm' | 'satellite' | 'topo';

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

  const [activeTile, setActiveTile] = useState<TileProvider>('osm');
  const [activeLayer, setActiveLayer] = useState<MainContentLayer>(forcedLayer);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
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
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
      maxZoom: 18,
    },
    topo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; OpenStreetMap | Style: OpenTopoMap',
      maxZoom: 17,
    },
  };

  const districtList = [
    'all',
    'TP. Thái Nguyên',
    'TP. Sông Công',
    'TX. Phổ Yên',
    'Huyện Đại Từ',
    'Huyện Định Hóa',
    'Huyện Phú Lương',
    'Huyện Đồng Hỷ',
    'Huyện Võ Nhai',
    'Huyện Phú Bình',
    'Vùng Ba Bể & Mở Rộng',
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [21.75, 105.78],
      zoom: 9.5,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const initialTile = L.tileLayer(tilesConfig.osm.url, {
      attribution: tilesConfig.osm.attribution,
      maxZoom: tilesConfig.osm.maxZoom,
    }).addTo(map);

    tileLayerRef.current = initialTile;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const config = tilesConfig[activeTile];
    tileLayerRef.current.setUrl(config.url);
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
        isVisible = place.category === 'tea' || place.category === 'culture' || place.id === 'atk-dinh-hoa' || place.id === 'nguom-rock-shelter';
      } else if (activeLayer === 'disaster') {
        isVisible = place.category === 'disaster';
      } else if (activeLayer === 'communes') {
        isVisible = false; // focus on communes
      }

      if (!isVisible) return;

      const markerHtml = `
        <div class="relative flex items-center justify-center group cursor-pointer">
          <div class="absolute -inset-1.5 rounded-full opacity-60 animate-ping" style="background-color: ${place.color};"></div>
          <div class="relative w-8 h-8 rounded-full shadow-md flex items-center justify-center text-white border-2 border-white transition-transform group-hover:scale-125" style="background-color: ${place.color};">
            <span class="text-xs font-bold">${
              place.category === 'tea' ? '🍃' : place.category === 'history' ? '🏛️' : place.category === 'culture' ? '🎭' : '⚠️'
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

  // Render & Update 92 Communes Markers
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
      // Filter by district if selected
      if (selectedDistrict !== 'all' && c.district !== selectedDistrict) {
        return;
      }

      // Small clickable pill marker for commune
      const communePinHtml = `
        <div class="cursor-pointer group flex items-center">
          <div class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#116149] border border-[#116149]/40 shadow-sm transition-all group-hover:scale-110 group-hover:bg-[#116149] group-hover:text-white flex items-center gap-1 whitespace-nowrap">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 group-hover:bg-amber-300"></span>
            <span>${c.name}</span>
          </div>
        </div>
      `;

      const communeIcon = L.divIcon({
        className: 'custom-commune-pin',
        html: communePinHtml,
        iconSize: [80, 22],
        iconAnchor: [40, 11],
      });

      const marker = L.marker([c.lat, c.lng], { icon: communeIcon });

      const popupHtml = `
        <div style="font-family: Arial, sans-serif; padding: 4px; max-width: 230px;">
          <div style="font-size: 10px; font-weight: bold; color: #116149; text-transform: uppercase;">
            ${c.type} · ${c.district}
          </div>
          <h3 style="margin: 3px 0; font-size: 15px; font-weight: bold; color: #111;">
            ${c.name}
          </h3>
          <p style="margin: 4px 0; font-size: 12px; color: #444; line-height: 1.4;">
            ${lang === 'vi' ? c.featureVi : c.featureEn}
          </p>
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #eee; font-size: 11px;">
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${c.name}, ${c.district}, Thái Nguyên`
            )}" style="color: #0e5945; font-weight: bold; text-decoration: none;">
              🧭 Mở trên Google Maps ↗
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
  }, [showCommunes, activeLayer, selectedDistrict, lang]);

  // Fly to commune handler
  const handleFlyToCommune = (c: Commune) => {
    setSelectedCommune(c);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([c.lat, c.lng], 13, { duration: 1.2 });
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
      map.flyTo([place.lat, place.lng], 13, { duration: 1.2 });
      const marker = placeMarkersRef.current[place.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 600);
      }
    }
  };

  const handleResetProvince = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([21.75, 105.78], 9.5, { duration: 1 });
    }
  };

  // Filtered lists for sidebar
  const filteredCommunes = COMMUNES_92.filter((c) => {
    if (selectedDistrict !== 'all' && c.district !== selectedDistrict) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const name = c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const district = c.district.toLowerCase();
    const feat = c.featureVi.toLowerCase();
    return name.includes(q) || district.includes(q) || feat.includes(q);
  });

  const filteredPlaces = PLACES.filter((p) => {
    if (activeLayer === 'tourism' && p.category !== 'history' && p.category !== 'culture') return false;
    if (activeLayer === 'education' && p.category !== 'tea' && p.category !== 'culture' && p.id !== 'atk-dinh-hoa' && p.id !== 'nguom-rock-shelter') return false;
    if (activeLayer === 'disaster' && p.category !== 'disaster') return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const name = p.nameVi.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.includes(q) || p.descVi.toLowerCase().includes(q);
  });

  return (
    <div className="bg-[#f5f8f5] text-stone-900 border-b border-stone-200">
      {/* 3 Prominent Layer Buttons Header Bar (Thanh 3 Nút Bấm Điều Khiển 3 Lớp Nội Dung) */}
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
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
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
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeLayer === 'education'
                  ? 'bg-[#198263] text-white ring-2 ring-[#198263]/30'
                  : 'bg-stone-100 hover:bg-emerald-50 text-stone-700 border border-stone-200'
              }`}
            >
              <span>📚</span>
              <span>{lang === 'vi' ? '02. GDĐP & Vùng Chè' : '02. Grade 8 & Teas'}</span>
            </button>

            <button
              onClick={() => setActiveLayer('disaster')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeLayer === 'all'
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>{lang === 'vi' ? 'Tất cả lớp' : 'All Layers'}</span>
            </button>

            {/* 92 Communes Toggle Button */}
            <button
              onClick={() => setShowCommunes(!showCommunes)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                showCommunes
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}
              title={lang === 'vi' ? 'Bật/tắt 92 nút bấm xã trên bản đồ' : 'Toggle 92 commune pins'}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'vi' ? '92 Xã / Phường TN & BC' : '92 Communes Layer'}</span>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Map + Sidebar Layout (Giống web site gốc) */}
      <div className="max-w-7xl mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Left Explorer Sidebar (Nền sáng) */}
        <aside className="w-full lg:w-96 bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col max-h-[680px]">
          {/* Search Input */}
          <div className="space-y-2.5 pb-3 border-b border-stone-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-800 text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#116149]" />
                <span>{lang === 'vi' ? 'Danh mục Địa điểm & 92 Xã' : 'Locations & 92 Communes'}</span>
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {showCommunes ? filteredCommunes.length : filteredPlaces.length} điểm
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'vi' ? 'Tìm xã, di tích, vùng chè...' : 'Search commune, tea, relics...'}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#116149]"
              />
            </div>

            {/* District dropdown for 92 Communes */}
            {showCommunes && (
              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-stone-500 shrink-0">
                  {lang === 'vi' ? 'Huyện/Thị:' : 'District:'}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="flex-1 text-xs py-1 px-2 rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:border-[#116149]"
                >
                  <option value="all">{lang === 'vi' ? 'Tất cả 92 xã / phường' : 'All 92 communes'}</option>
                  {districtList.slice(1).map((d) => (
                    <option key={d} value={d}>
                      {d}
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
                {filteredCommunes.map((c) => {
                  const isSelected = selectedCommune?.id === c.id;
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
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                            {c.type}
                          </span>
                          <h4 className="font-bold text-xs text-stone-900 truncate">
                            {c.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">
                          📍 {c.district} · {lang === 'vi' ? c.featureVi : c.featureEn}
                        </p>
                      </div>

                      <span className="text-xs text-emerald-700 font-bold shrink-0">
                        →
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Commune Info Card */}
          {selectedCommune && (
            <div className="mt-3 p-3 rounded-xl bg-[#eaf5ef] border border-emerald-200 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#116149] uppercase tracking-wider text-[10px]">
                  {selectedCommune.type} {selectedCommune.name}
                </span>
                <span className="text-[10px] text-stone-500">{selectedCommune.district}</span>
              </div>
              <p className="text-stone-700 leading-snug">
                {lang === 'vi' ? selectedCommune.featureVi : selectedCommune.featureEn}
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-stone-500 font-mono">
                  {selectedCommune.lat.toFixed(4)}, {selectedCommune.lng.toFixed(4)}
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

        {/* Right Main Map Card (Nền sáng, giống web site gốc) */}
        <div className="flex-1 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col min-h-[520px] lg:min-h-[640px] relative">
          {/* Top Floating Map Controls */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
            {/* Base map switcher */}
            <div className="flex items-center p-1 bg-white/95 rounded-xl shadow-md border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTile('osm')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTile === 'osm' ? 'bg-[#116149] text-white' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                🗺️ Bản đồ
              </button>
              <button
                onClick={() => setActiveTile('satellite')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTile === 'satellite' ? 'bg-[#116149] text-white' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                🛰️ Vệ tinh
              </button>
              <button
                onClick={() => setActiveTile('topo')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTile === 'topo' ? 'bg-[#116149] text-white' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                ⛰️ Địa hình
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetProvince}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-stone-800 rounded-xl shadow-md border border-stone-200 text-xs font-bold hover:bg-stone-50 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#116149]" />
              <span>{lang === 'vi' ? 'Toàn tỉnh TN' : 'Province View'}</span>
            </button>
          </div>

          {/* Leaflet DOM container */}
          <div ref={mapContainerRef} className="w-full h-full flex-1 min-h-[500px] z-10" />

          {/* Bottom Map Legend */}
          <div className="bg-stone-50 border-t border-stone-200 px-4 py-2.5 z-20 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-stone-800 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#116149]" />
                <span>{lang === 'vi' ? 'Ký hiệu bản đồ:' : 'Legend:'}</span>
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
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>92 Xã / Phường</span>
              </span>
            </div>

            <span className="text-[11px] text-stone-400 italic">
              {lang === 'vi'
                ? 'Bản đồ số hỗ trợ giảng dạy Giáo dục địa phương Lớp 8'
                : 'Digital Map for Grade 8 Local Education'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
