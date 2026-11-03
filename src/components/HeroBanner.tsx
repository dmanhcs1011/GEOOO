import React from 'react';
import { MainContentLayer } from './MapViewer';

interface HeroBannerProps {
  lang: 'vi' | 'en';
  activeLayer?: MainContentLayer;
  onSelectLayerTab: (layer: MainContentLayer) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  activeLayer = 'all',
  onSelectLayerTab,
}) => {
  const tabs = [
    {
      id: 'tourism' as MainContentLayer,
      titleVi: '01 · Du lịch',
      titleEn: '01 · Tourism',
      descVi: 'Điểm đến, cảnh quan và trải nghiệm',
      descEn: 'Destinations, landscapes and experiences',
    },
    {
      id: 'education' as MainContentLayer,
      titleVi: '02 · Giáo dục địa phương',
      titleEn: '02 · Local Education',
      descVi: 'Lịch sử, văn hóa, di sản và nghề truyền thống',
      descEn: 'History, culture, heritage and traditional crafts',
    },
    {
      id: 'disaster' as MainContentLayer,
      titleVi: '03 · Khí hậu & ngập lụt',
      titleEn: '03 · Climate & Flooding',
      descVi: 'Điểm minh họa cần tìm hiểu, không phải cảnh báo',
      descEn: 'Illustrative study points, not emergency warnings',
    },
  ];

  return (
    <div className="bg-[#f5f8f5] text-stone-900">
      {/* Hero Banner với ảnh nền "Hồ nước giữa đồi xanh lúc hoàng hôn" do người dùng cung cấp */}
      <section className="relative px-6 py-12 sm:py-16 md:py-20 text-white overflow-hidden shadow-md">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
          style={{
            backgroundImage: "url('/assets/aistudio/H__n__c_gi_a___i_xanh_l_c_ho_ng_h_n_794aeff3.png')",
          }}
        />

        {/* Cinematic darkened gradient overlay to guarantee crystal clear contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/65 to-emerald-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/30" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-emerald-100 text-xs font-bold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>BẢN ĐỒ ĐỊA PHƯƠNG SỐ · THAINGUYEN GEO-MAP</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight max-w-5xl mb-4 text-white drop-shadow-sm font-serif">
            {lang === 'vi'
              ? 'CÔNG CỤ HỖ TRỢ HỌC TẬP NỘI DUNG GIÁO DỤC ĐỊA PHƯƠNG QUA THAINGUYEN GEO-MAP'
              : 'A LEARNING SUPPORT TOOL FOR LOCAL EDUCATION CONTENT THROUGH THAINGUYEN GEO-MAP'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-stone-100 max-w-4xl font-normal leading-relaxed opacity-95 drop-shadow-xs">
            {lang === 'vi'
              ? 'Nền tảng số hóa tương tác tích hợp bản đồ địa lý 92 xã phường, di tích lịch sử ATK Định Hóa, Ngũ đại danh trà Thái Nguyên và thông tin phòng chống thiên tai, lũ lụt sông Cầu, sạt lở đất.'
              : 'Interactive digital atlas combining 92 commune markers, revolutionary relics, the 5 Famous Tea Regions, and climate disaster risk mitigation.'}
          </p>

          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 border border-white/35 backdrop-blur-xs text-white">
              🌿 Giáo Dục Địa Phương
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 border border-white/35 backdrop-blur-xs text-white">
              📍 92 Xã / Phường (TN & BC)
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 border border-white/35 backdrop-blur-xs text-white">
              🍵 Ngũ Đại Danh Trà
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 border border-white/35 backdrop-blur-xs text-white">
              ⚠️ Khí Hậu & Phòng Chống Thiên Tai
            </span>
          </div>
        </div>
      </section>

      {/* 3 Mục Dưới Tiêu Đề - Thiết Kế Y Như Trong Ảnh Người Dùng Cung Cấp */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {tabs.map((tab) => {
            const isSelected = activeLayer === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectLayerTab(tab.id)}
                className={`text-left p-4 sm:p-4.5 rounded-2xl bg-white border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-center ${
                  isSelected
                    ? 'border-[#116149] ring-2 ring-[#116149]/20 bg-emerald-50/20'
                    : 'border-stone-200 hover:border-emerald-500/70 hover:bg-stone-50/50'
                }`}
              >
                <div className="font-bold text-stone-900 text-sm sm:text-[15px] tracking-tight">
                  {lang === 'vi' ? tab.titleVi : tab.titleEn}
                </div>
                <div className="text-xs text-stone-500 font-normal mt-1 leading-snug">
                  {lang === 'vi' ? tab.descVi : tab.descEn}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
