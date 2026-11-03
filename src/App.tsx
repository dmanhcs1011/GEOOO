import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DestinationShowcaseSection } from './components/DestinationShowcaseSection';
import { MapViewer, MainContentLayer } from './components/MapViewer';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { CurriculumSection } from './components/CurriculumSection';
import { FiveTeasSection } from './components/FiveTeasSection';
import { DisasterSafetySection } from './components/DisasterSafetySection';
import { ExploreChallengeBanner } from './components/ExploreChallengeBanner';
import { GeoGameSection } from './components/GeoGameSection';
import { AiAssistantModal } from './components/AiAssistantModal';
import { PLACES, Place } from './data/geoData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [activeLayer, setActiveLayer] = useState<MainContentLayer>('all');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Điều hướng khi người dùng bấm vào 3 mục dưới tiêu đề
  const handleSelectLayerTab = (layer: MainContentLayer) => {
    setActiveLayer(layer);

    if (layer === 'tourism') {
      if (activeTab !== 'overview' && activeTab !== 'destinations') {
        setActiveTab('overview');
      }
      setTimeout(() => {
        const destEl = document.getElementById('section-destinations');
        if (destEl) {
          destEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (layer === 'education') {
      if (activeTab !== 'overview' && activeTab !== 'curriculum') {
        setActiveTab('overview');
      }
      setTimeout(() => {
        const eduEl = document.getElementById('section-curriculum');
        if (eduEl) {
          eduEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (layer === 'disaster') {
      if (activeTab !== 'overview' && activeTab !== 'disaster') {
        setActiveTab('overview');
      }
      setTimeout(() => {
        const disasterEl = document.getElementById('section-disaster');
        if (disasterEl) {
          disasterEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleSelectPlaceById = (placeId: string) => {
    const place = PLACES.find((p) => p.id === placeId);
    if (place) {
      setSelectedPlace(place);
      if (activeTab !== 'overview') {
        setActiveTab('overview');
      }
      setTimeout(() => {
        const mapElement = document.getElementById('section-map');
        if (mapElement) {
          mapElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleNavigateToPlace = (placeId: string) => {
    handleSelectPlaceById(placeId);
  };

  return (
    <div className="min-h-screen bg-[#f5f8f5] text-stone-900 flex flex-col font-sans">
      {/* 1. Header Navigation Bar (Nền sáng) */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'ai') {
            setIsAiOpen(true);
            return;
          }
          if (activeTab !== 'overview') {
            setActiveTab('overview');
          }
          if (tab === 'overview') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          const sectionIdMap: Record<string, string> = {
            map: 'section-map',
            destinations: 'section-destinations',
            curriculum: 'section-curriculum',
            teas: 'section-teas',
            disaster: 'section-disaster',
            quiz: 'section-quiz',
          };
          const targetId = sectionIdMap[tab];
          if (targetId) {
            setTimeout(() => {
              const el = document.getElementById(targetId);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }, 60);
          }
        }}
        lang={lang}
        onLangToggle={() => setLang((prev) => (prev === 'vi' ? 'en' : 'vi'))}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* 2. Main Body Content */}
      <main className="flex-1">
        {/* Full Overview Page (Giống website gốc Google Sites với các đề mục chia bố cục rõ ràng) */}
        {activeTab === 'overview' && (
          <div className="space-y-12 pb-16">
            {/* Hero Banner với tiêu đề, ảnh nền hồ nước đồi xanh và 3 mục điều hướng y như trong ảnh */}
            <HeroBanner
              lang={lang}
              activeLayer={activeLayer}
              onSelectLayerTab={handleSelectLayerTab}
            />

            {/* MỤC BẢN ĐỒ ĐỊA PHƯƠNG TƯƠNG TÁC (3 LỚP & 92 XÃ PHƯỜNG ĐƯỢC ĐẨY LÊN TRƯỚC MỤC 1 THEO YÊU CẦU) */}
            <section id="section-map" className="scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
                      {lang === 'vi' ? 'CÔNG CỤ BẢN ĐỒ SỐ HÓA' : 'DIGITAL GEOGRAPHY MAP'}
                    </span>
                    <h2 className="text-2xl font-extrabold text-stone-900">
                      {lang === 'vi' ? 'Bản Đồ Tương Tác Số & 92 Xã Phường Thái Nguyên' : 'Interactive Geo-Map & 92 Communes'}
                    </h2>
                  </div>
                  <span className="text-xs text-stone-500 italic">
                    {lang === 'vi'
                      ? 'Tích hợp đầy đủ tọa độ GPS và thông tin học tập tương tác'
                      : 'Equipped with GPS markers and interactive learning annotations'}
                  </span>
                </div>
              </div>

              <MapViewer
                onSelectPlace={(place) => setSelectedPlace(place)}
                lang={lang}
                forcedLayer={activeLayer}
              />
            </section>

            {/* MỤC 01 · DU LỊCH & ĐIỂM ĐẾN (BỐ CỤC CHUẨN GOOGLE SITES: HÌNH ẢNH, NỘI DUNG SONG NGỮ, VIDEO YOUTUBE) */}
            <section id="section-destinations" className="scroll-mt-20">
              <DestinationShowcaseSection
                lang={lang}
                onSelectPlaceById={handleSelectPlaceById}
              />
            </section>

            {/* MỤC 02: GIÁO DỤC ĐỊA PHƯƠNG */}
            <section id="section-curriculum" className="scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
                  {lang === 'vi' ? 'MỤC 02 · TÀI LIỆU HỌC TẬP' : 'SECTION 02 · STUDY CURRICULUM'}
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {lang === 'vi' ? '02. Giáo Dục Địa Phương' : '02. Local Education'}
                </h2>
              </div>
              <CurriculumSection
                lang={lang}
                onSelectPlaceById={handleSelectPlaceById}
              />
            </section>

            {/* MỤC: "NGŨ ĐẠI DANH TRÀ" THÁI NGUYÊN */}
            <section id="section-teas" className="scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
                  {lang === 'vi' ? 'ĐẶC SẢN ĐỊA PHƯƠNG' : 'LOCAL SPECIALTY HERITAGE'}
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {lang === 'vi' ? '“Ngũ Đại Danh Trà” Thái Nguyên Là Gì?' : 'The "Five Famous Tea Regions" of Thai Nguyen'}
                </h2>
              </div>
              <FiveTeasSection
                lang={lang}
                onNavigateToPlace={handleNavigateToPlace}
              />
            </section>

            {/* MỤC 03: KHÍ HẬU VÀ NƠI CÓ NGẬP LỤT, SẠT LỞ */}
            <section id="section-disaster" className="scroll-mt-20">
              <DisasterSafetySection
                lang={lang}
                onNavigateToPlace={handleNavigateToPlace}
              />
            </section>

            {/* MỤC TRÒ CHƠI THỬ THÁCH NHÀ KHÁM PHÁ */}
            <section id="section-quiz" className="scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
                  {lang === 'vi' ? 'MỤC 04 · THỰC HÀNH TƯƠNG TÁC' : 'SECTION 04 · INTERACTIVE CHALLENGE'}
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {lang === 'vi' ? 'Thử Thách Khám Phá Địa Phương Thái Nguyên' : 'Explorer Knowledge Challenge'}
                </h2>
              </div>
              <ExploreChallengeBanner
                lang={lang}
                onSelectPlaceById={handleSelectPlaceById}
              />
              <GeoGameSection lang={lang} />
            </section>
          </div>
        )}

        {/* Tab-specific Views */}
        {activeTab === 'destinations' && (
          <div className="py-4">
            <DestinationShowcaseSection
              lang={lang}
              onSelectPlaceById={handleSelectPlaceById}
            />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="py-4">
            <MapViewer
              onSelectPlace={(place) => setSelectedPlace(place)}
              lang={lang}
              forcedLayer={activeLayer}
            />
          </div>
        )}

        {activeTab === 'curriculum' && (
          <CurriculumSection
            lang={lang}
            onSelectPlaceById={handleSelectPlaceById}
          />
        )}

        {activeTab === 'teas' && (
          <FiveTeasSection
            lang={lang}
            onNavigateToPlace={handleNavigateToPlace}
          />
        )}

        {activeTab === 'disaster' && (
          <DisasterSafetySection
            lang={lang}
            onNavigateToPlace={handleNavigateToPlace}
          />
        )}

        {activeTab === 'quiz' && (
          <div className="py-4">
            <ExploreChallengeBanner
              lang={lang}
              onSelectPlaceById={handleSelectPlaceById}
            />
            <GeoGameSection lang={lang} />
          </div>
        )}
      </main>

      {/* 3. Footer (Nền sáng, trang trọng) */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 text-center text-xs text-stone-600 space-y-2.5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-bold text-stone-800">
            <span className="text-[#116149]">THAINGUYEN Geo-Map</span>
            <span>•</span>
            <span>Giáo Dục Địa Phương Tỉnh Thái Nguyên</span>
            <span>•</span>
            <span>Ngũ Đại Danh Trà & Di Tích Lịch Sử</span>
            <span>•</span>
            <span>92 Xã / Phường Tương Tác</span>
          </div>
          <p className="max-w-2xl mx-auto text-[11px] text-stone-500 mt-2 leading-relaxed">
            {lang === 'vi'
              ? 'Công cụ học tập số hóa tương tác nội dung Giáo dục địa phương tỉnh Thái Nguyên (Chương trình GDPT 2018). Thông tin địa lý, di tích và phòng chống thiên tai.'
              : 'Interactive digital learning support tool for Local Education of Thai Nguyen. Geographical and hazard data are compiled for educational purposes.'}
          </p>
        </div>
      </footer>

      {/* Place Detail Modal */}
      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        lang={lang}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        lang={lang}
      />
    </div>
  );
}
