import React from 'react';
import {
  Map,
  BookOpen,
  AlertTriangle,
  MapPin,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { MainContentLayer } from './MapViewer';

interface HeroBannerProps {
  lang: 'vi' | 'en';
  onSelectLayerTab: (layer: MainContentLayer) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenTechGuide: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  onSelectLayerTab,
  onNavigateSection,
  onOpenTechGuide,
}) => {
  return (
    <div className="bg-[#f5f8f5] text-stone-900">
      {/* Authentic Google Sites Hero Banner (Lấy nguyên gốc từ Google Sites) */}
      <section className="relative px-6 py-10 sm:py-14 bg-gradient-to-r from-[#0e5945] via-[#116149] to-[#16805e] text-white shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div className="text-xs font-bold tracking-[1.8px] uppercase text-emerald-200/90 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>BẢN ĐỒ ĐỊA PHƯƠNG SỐ · THAINGUYEN GEO-MAP</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight max-w-5xl mb-4 font-serif">
            {lang === 'vi'
              ? 'CÔNG CỤ HỖ TRỢ HỌC TẬP NỘI DUNG GIÁO DỤC ĐỊA PHƯƠNG LỚP 8 QUA THAINGUYEN GEO-MAP'
              : 'A LEARNING SUPPORT TOOL FOR GRADE 8 LOCAL EDUCATION CONTENT THROUGH THAINGUYEN GEO-MAP'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-emerald-100 max-w-4xl font-normal leading-relaxed opacity-95">
            {lang === 'vi'
              ? 'Nền tảng số hóa tương tác tích hợp bản đồ địa lý 92 xã phường, di tích lịch sử ATK Định Hóa, Ngũ đại danh trà Thái Nguyên và thông tin phòng chống thiên tai, lũ lụt sông Cầu, sạt lở đất.'
              : 'Interactive digital atlas combining 92 commune markers, revolutionary relics, the 5 Famous Tea Regions, and climate disaster risk mitigation.'}
          </p>

          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/30 backdrop-blur-xs">
              🌿 Giáo Dục Địa Phương Lớp 8
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/30 backdrop-blur-xs">
              📍 92 Xã / Phường (TN & BC)
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/30 backdrop-blur-xs">
              🍵 Ngũ Đại Danh Trà
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/30 backdrop-blur-xs">
              ⚠️ Cảnh Báo Ngập Lụt & Sạt Lở
            </span>
          </div>
        </div>
      </section>

      {/* 3 Prominent Layer Cards (Giải quyết Câu hỏi 1: Tạo 3 nút tương ứng 3 lớp nội dung) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Du Lịch & Di Tích */}
          <div
            onClick={() => onSelectLayerTab('tourism')}
            className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-md hover:shadow-lg hover:border-emerald-300 cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#116149]">
                  LỚP 01
                </span>
                <span className="text-2xl group-hover:scale-110 transition-transform">🏞️</span>
              </div>
              <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#116149] transition-colors">
                {lang === 'vi' ? '01. Du Lịch & Di Tích Lịch Sử' : '01. Tourism & Historical Relics'}
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                {lang === 'vi'
                  ? 'Khám phá Hồ Núi Cốc, Hồ Ba Bể, Khu di tích ATK Định Hóa (Tỉn Keo, Khau Ty), Bảo tàng Dân tộc, Mái đá Ngườm...'
                  : 'Explore Nui Coc Lake, Ba Be Lake, ATK Dinh Hoa, and national museums.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#116149]">
              <span>{lang === 'vi' ? 'Bật bản đồ Du Lịch' : 'Show Tourism Layer'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Giáo Dục Địa Phương & Ngũ Đại Danh Trà */}
          <div
            onClick={() => onSelectLayerTab('education')}
            className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-md hover:shadow-lg hover:border-emerald-300 cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-[#198263]">
                  LỚP 02
                </span>
                <span className="text-2xl group-hover:scale-110 transition-transform">📚</span>
              </div>
              <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#198263] transition-colors">
                {lang === 'vi' ? '02. Giáo Dục Địa Phương Lớp 8' : '02. Grade 8 Local Curriculum'}
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                {lang === 'vi'
                  ? '5 Chuyên đề GDĐP, Ngũ đại danh trà (Tân Cương, La Bằng, Trại Cài, Khe Cốc, Bằng Phúc), quy trình chế biến trà và văn hóa Then.'
                  : '5 Curriculum units, 5 famous tea terroirs, tea processing, and ethnic festivals.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#198263]">
              <span>{lang === 'vi' ? 'Bật lớp Giáo Dục & Trà' : 'Show Education Layer'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Khí Hậu & Ngập Lụt, Sạt Lở */}
          <div
            onClick={() => onSelectLayerTab('disaster')}
            className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-md hover:shadow-lg hover:border-rose-300 cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  LỚP 03
                </span>
                <span className="text-2xl group-hover:scale-110 transition-transform">⚠️</span>
              </div>
              <h3 className="font-extrabold text-base text-stone-900 group-hover:text-rose-700 transition-colors">
                {lang === 'vi' ? '03. Khí Hậu & Nơi Ngập Lụt, Sạt Lở' : '03. Climate & Hazards'}
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                {lang === 'vi'
                  ? 'Bản đồ các vùng trũng ngập sông Cầu, sông Công, ngập úng nội ô TP Thái Nguyên, vùng sạt lở núi Tam Đảo & cẩm nang kỹ năng an toàn.'
                  : 'Flood zones along Cau River, Tam Dao landslides, and life survival guides.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>{lang === 'vi' ? 'Bật lớp Thiên Tai' : 'Show Disaster Layer'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Banner answering the 2 handwritten questions */}
        <div className="mt-4 p-4 rounded-2xl bg-[#eaf5ef] border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#116149] text-white flex items-center justify-center font-bold text-base shrink-0">
              💡
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#116149]">
                {lang === 'vi'
                  ? 'Giải đáp kỹ thuật 2 câu hỏi trong ảnh viết tay của bạn:'
                  : 'Technical solutions for the 2 handwritten questions:'}
              </h4>
              <p className="text-[11px] text-stone-600">
                {lang === 'vi'
                  ? 'Cách tạo 3 nút ứng với 3 lớp nội dung & Cách gắn 92 nút bấm xã tương tác đúng vị trí GPS.'
                  : 'How to build 3-layer sync buttons & how to render 92 interactive commune coordinates.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenTechGuide}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#116149] hover:bg-[#0e4e3a] text-white text-xs font-bold transition-all shrink-0 shadow-xs"
          >
            <span>{lang === 'vi' ? 'Xem lời giải & Mã mẫu' : 'View Code Blueprint'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
