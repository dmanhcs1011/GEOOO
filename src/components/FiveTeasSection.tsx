import React, { useState } from 'react';
import {
  Coffee,
  Sparkles,
  MapPin,
  Award,
  Leaf,
  Flame,
  Sun,
  ShieldCheck,
  Check,
  ChevronRight
} from 'lucide-react';
import { FIVE_TEAS, TeaRegion } from '../data/geoData';

interface FiveTeasSectionProps {
  lang: 'vi' | 'en';
  onNavigateToPlace: (placeId: string) => void;
}

export const FiveTeasSection: React.FC<FiveTeasSectionProps> = ({
  lang,
  onNavigateToPlace,
}) => {
  const [selectedTea, setSelectedTea] = useState<TeaRegion>(FIVE_TEAS[0]);

  const teaProcessSteps = [
    {
      step: '01',
      titleVi: 'Thu hái búp chè tươi',
      titleEn: 'Harvesting Tender Buds',
      descVi: 'Hái chuẩn "1 tôm 2 lá" vào sáng sớm khi sương vừa tan để búp non đạt độ tươi nguyên và giàu hương thơm nhất.',
      descEn: 'Harvesting the "one bud and two tender leaves" at early dawn after dew evaporates.',
      icon: Leaf,
    },
    {
      step: '02',
      titleVi: 'Làm héo nhẹ',
      titleEn: 'Gentle Withering',
      descVi: 'Rải mỏng búp chè trên nong tre thoáng khí để thoát bớt nước thừa, giúp búp dẻo dai không bị gãy dập khi vò.',
      descEn: 'Spreading leaves on bamboo mats in airy shade to lose moisture and become supple.',
      icon: Sun,
    },
    {
      step: '03',
      titleVi: 'Xào diệt men',
      titleEn: 'High-Heat De-Enzyming',
      descVi: 'Xào chè trong chảo gang nóng hoặc tôn quay ở nhiệt độ 250–300°C để ức chế men oxy hóa, giữ sắc nước xanh tự nhiên.',
      descEn: 'Pan-frying at 250-300°C to halt enzymatic oxidation and retain natural vibrant green liquor.',
      icon: Flame,
    },
    {
      step: '04',
      titleVi: 'Vò chè tạo hình',
      titleEn: 'Rolling & Shaping',
      descVi: 'Vò chè theo một chiều để dập vỡ màng tế bào lá giải phóng tinh dầu thơm và uốn cánh chè xoăn như móc câu.',
      descEn: 'Rolling leaves in one direction to rupture cell membranes and twist into iconic hooked needles.',
      icon: Sparkles,
    },
    {
      step: '05',
      titleVi: 'Sao lăn khô',
      titleEn: 'Tumble Drying',
      descVi: 'Sao liên tục trên bếp than củi với lửa liu riu để hạ độ ẩm xuống dưới 5%, hạt trà khô đanh và chuyển màu mốc xám nhẹ.',
      descEn: 'Slow tumble roasting over wood fire down to <5% moisture until leaves are crisp.',
      icon: Flame,
    },
    {
      step: '06',
      titleVi: 'Lấy hương truyền thống',
      titleEn: 'Wood-fired Scent Elevation',
      descVi: 'Bí quyết quyết định phẩm cấp: Đánh hương bằng than củi gộc, kích thích hương thơm cốm non ngào ngạt bừng nở.',
      descEn: 'Master pan-scenting over aromatic hardwood charcoal to release the intoxicating young rice fragrance.',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* 5 Regions Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: 5 Tea Region Selector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#116149]" />
              <span>{lang === 'vi' ? 'Khám phá 5 Vùng Danh Trà' : 'Select a Tea Terroir'}</span>
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              5 Vùng Trà
            </span>
          </div>

          <div className="space-y-2.5">
            {FIVE_TEAS.map((tea, idx) => {
              const isSelected = tea.id === selectedTea.id;
              return (
                <div
                  key={tea.id}
                  onClick={() => setSelectedTea(tea)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#116149] text-white border-[#116149] shadow-md scale-[1.01]'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#eaf5ef] text-[#116149]'
                      }`}
                    >
                      0{idx + 1}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-sm leading-tight truncate">
                        {lang === 'vi' ? tea.nameVi : tea.nameEn}
                      </h4>
                      <p
                        className={`text-xs truncate mt-0.5 ${
                          isSelected ? 'text-emerald-100' : 'text-stone-500'
                        }`}
                      >
                        📍 {lang === 'vi' ? tea.locationVi : tea.locationEn}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      isSelected
                        ? 'bg-emerald-900 text-emerald-100'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {tea.ocopInfo.split('(')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Tea Terroir Deep Dive (Nền sáng) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            {/* Image & Header */}
            <div className="relative h-56 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={selectedTea.img}
                alt={selectedTea.nameVi}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#116149] text-white shadow-sm">
                  {selectedTea.ocopInfo}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {lang === 'vi' ? selectedTea.nameVi : selectedTea.nameEn}
                </h3>
                <p className="text-xs text-stone-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  {lang === 'vi' ? selectedTea.locationVi : selectedTea.locationEn}
                </p>
              </div>
            </div>

            {/* Flavor Profile */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'vi' ? 'Hương sắc & Vị giác đặc trưng' : 'Tasting & Aroma Profile'}</span>
              </h4>
              <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed italic">
                "{lang === 'vi' ? selectedTea.flavorProfileVi : selectedTea.flavorProfileEn}"
              </p>
            </div>

            {/* Distinct Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                {lang === 'vi' ? 'Đặc điểm thổ nhưỡng & Phẩm cấp' : 'Terroir & Cultivation Highlights'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'vi' ? selectedTea.featuresVi : selectedTea.featuresEn).map(
                  (feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700"
                    >
                      <Check className="w-4 h-4 text-[#116149] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Actions: Navigate to map */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-100">
              <span className="text-xs text-stone-500 italic">
                {selectedTea.highlight}
              </span>
              <button
                onClick={() => onNavigateToPlace(`tea-${selectedTea.id}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#116149] hover:bg-[#0e4e3a] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Xem trên Bản đồ số' : 'View on Geo-Map'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Traditional Tea Crafting Process Section (Nền sáng, thanh lịch) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#116149]">
            {lang === 'vi' ? 'Di sản Tri thức Làng nghề' : 'Traditional Craft Heritage'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            {lang === 'vi'
              ? 'Quy Trình 6 Bước Chế Biến Danh Trà Thái Nguyên'
              : 'The 6 Artisanal Steps of Thai Nguyen Tea Crafting'}
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            {lang === 'vi'
              ? 'Nghề trồng và chế biến chè Thái Nguyên đã được công nhận là Di sản Văn hóa Phi vật thể Quốc gia.'
              : 'Thai Nguyen tea craftsmanship is recognized as a National Intangible Cultural Heritage.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teaProcessSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-4 rounded-2xl bg-[#f8faf8] border border-stone-200 space-y-2 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#116149] flex items-center justify-center font-mono font-bold text-xs">
                    {s.step}
                  </div>
                  <Icon className="w-4 h-4 text-[#116149]" />
                </div>
                <h4 className="font-bold text-sm text-stone-900">
                  {lang === 'vi' ? s.titleVi : s.titleEn}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'vi' ? s.descVi : s.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
