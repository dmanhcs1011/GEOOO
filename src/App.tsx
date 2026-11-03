import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MapViewer, MainContentLayer } from './components/MapViewer';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { CurriculumSection } from './components/CurriculumSection';
import { FiveTeasSection } from './components/FiveTeasSection';
import { DisasterSafetySection } from './components/DisasterSafetySection';
import { GeoGameSection } from './components/GeoGameSection';
import { TechGuideSection } from './components/TechGuideSection';
import { AiAssistantModal } from './components/AiAssistantModal';
import { PLACES, Place } from './data/geoData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [activeLayer, setActiveLayer] = useState<MainContentLayer>('all');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // When user clicks one of the 3 big cards in the Hero Banner
  const handleSelectLayerTab = (layer: MainContentLayer) => {
    setActiveLayer(layer);
    if (activeTab !== 'overview' && activeTab !== 'map') {
      setActiveTab('map');
    }
    // Scroll smoothly to map section if on overview
    const mapElement = document.getElementById('section-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlaceById = (placeId: string) => {
    const place = PLACES.find((p) => p.id === placeId);
    if (place) {
      setSelectedPlace(place);
      setActiveTab('overview');
      const mapElement = document.getElementById('section-map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
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
          } else {
            setActiveTab(tab);
          }
        }}
        lang={lang}
        onLangToggle={() => setLang((prev) => (prev === 'vi' ? 'en' : 'vi'))}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* 2. Main Body Content */}
      <main className="flex-1">
        {/* Full Overview Page (Giống web site gốc Google Sites với các đề mục chia bố cục rõ ràng) */}
        {activeTab === 'overview' && (
          <div className="space-y-12 pb-16">
            {/* Hero Banner with Title & 3 Layer Cards */}
            <HeroBanner
              lang={lang}
              onSelectLayerTab={handleSelectLayerTab}
              onNavigateSection={(id) => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenTechGuide={() => setActiveTab('tech')}
            />

            {/* MỤC 01: BẢN ĐỒ ĐỊA PHƯƠNG TƯƠNG TÁC (3 LỚP & 92 XÃ PHƯỜNG) */}
            <section id="section-map" className="scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
                      {lang === 'vi' ? 'MỤC 01 · CÔNG CỤ SỐ HÓA ĐỊA PHƯƠNG' : 'SECTION 01 · DIGITAL GEOGRAPHY'}
                    </span>
                    <h2 className="text-2xl font-extrabold text-stone-900">
                      {lang === 'vi' ? 'Bản Đồ Tương Tác Số & 92 Xã Phường Thái Nguyên' : 'Interactive Geo-Map & 92 Communes'}
                    </h2>
                  </div>
                  <span className="text-xs text-stone-500 italic">
                    {lang === 'vi'
                      ? 'Bấm 3 nút phía trên để lọc nội dung theo chuyên đề'
                      : 'Use the 3 buttons above to filter themed layers'}
                  </span>
                </div>
              </div>

              <MapViewer
                onSelectPlace={(place) => setSelectedPlace(place)}
                lang={lang}
                forcedLayer={activeLayer}
              />
            </section>

            {/* MỤC 02: GIÁO DỤC ĐỊA PHƯƠNG LỚP 8 */}
            <section id="section-curriculum" className="scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
                  {lang === 'vi' ? 'MỤC 02 · TÀI LIỆU HỌC TẬP' : 'SECTION 02 · STUDY CURRICULUM'}
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {lang === 'vi' ? '02. Giáo Dục Địa Phương Lớp 8' : '02. Grade 8 Local Education'}
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  {lang === 'vi' ? 'MỤC 03 · ĐỊA LÝ & KỸ NĂNG SỐNG' : 'SECTION 03 · DISASTER MITIGATION'}
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {lang === 'vi' ? '03. Khí Hậu Và Nơi Có Ngập Lụt, Sạt Lở' : '03. Climate & Flood, Landslide Hazard Zones'}
                </h2>
              </div>
              <DisasterSafetySection
                lang={lang}
                onNavigateToPlace={handleNavigateToPlace}
              />
            </section>

            {/* MỤC TRÒ CHƠI THỬ THÁCH NHÀ KHÁM PHÁ */}
            <section id="section-quiz" className="scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
                  {lang === 'vi' ? 'MỤC 04 · THỰC HÀNH TƯƠNG TÁC' : 'SECTION 04 · INTERACTIVE CHALLENGE'}
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {lang === 'vi' ? 'Thử Thách Khám Phá Địa Phương Thái Nguyên' : 'Explorer Knowledge Challenge'}
                </h2>
              </div>
              <GeoGameSection lang={lang} />
            </section>

            {/* MỤC HƯỚNG DẪN KỸ THUẬT: GIẢI ĐÁP 2 CÂU HỎI VIẾT TAY */}
            <section id="section-tech" className="scroll-mt-20">
              <TechGuideSection
                lang={lang}
                onActivateLayer={(layer) => {
                  setActiveLayer(layer);
                  const el = document.getElementById('section-map');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </section>
          </div>
        )}

        {/* Tab-specific Views if user prefers isolated tab navigation */}
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
          <GeoGameSection lang={lang} />
        )}

        {activeTab === 'tech' && (
          <TechGuideSection
            lang={lang}
            onActivateLayer={(layer) => {
              setActiveLayer(layer);
              setActiveTab('map');
            }}
          />
        )}
      </main>

      {/* 3. Footer (Nền sáng, trang trọng) */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 text-center text-xs text-stone-600 space-y-2.5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-bold text-stone-800">
            <span className="text-[#116149]">THAINGUYEN Geo-Map</span>
            <span>•</span>
            <span>Giáo Dục Địa Phương Lớp 8 Tỉnh Thái Nguyên</span>
            <span>•</span>
            <span>Ngũ Đại Danh Trà & Di Tích Lịch Sử</span>
            <span>•</span>
            <span>92 Xã / Phường Tương Tác</span>
          </div>
          <p className="max-w-2xl mx-auto text-[11px] text-stone-500 mt-2 leading-relaxed">
            {lang === 'vi'
              ? 'Công cụ học tập số hóa tương tác nội dung Giáo dục địa phương Lớp 8 tỉnh Thái Nguyên (Chương trình GDPT 2018). Thông tin địa lý, di tích và cảnh báo thiên tai phục vụ mục đích nghiên cứu học đường.'
              : 'Interactive digital learning support tool for Grade 8 Local Education of Thai Nguyen. Geographical and hazard data are compiled for educational purposes.'}
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
