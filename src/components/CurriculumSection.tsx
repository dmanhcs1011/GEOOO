import React, { useState } from 'react';
import {
  BookOpen,
  Landmark,
  Sparkles,
  PartyPopper,
  Coffee,
  ShieldAlert,
  ChevronRight,
  MapPin,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import { CURRICULUM_SECTIONS, PLACES } from '../data/geoData';
import { speechService } from '../utils/speech';

interface CurriculumSectionProps {
  lang: 'vi' | 'en';
  onSelectPlaceById: (placeId: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  lang,
  onSelectPlaceById,
}) => {
  const [activeSecId, setActiveSecId] = useState<string>('sec-1');

  const currentSection =
    CURRICULUM_SECTIONS.find((s) => s.id === activeSecId) || CURRICULUM_SECTIONS[0];

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return Landmark;
      case 'Sparkles':
        return Sparkles;
      case 'PartyPopper':
        return PartyPopper;
      case 'Coffee':
        return Coffee;
      case 'ShieldAlert':
        return ShieldAlert;
      default:
        return BookOpen;
    }
  };

  const handleSpeakTopic = (title: string, content: string) => {
    speechService.speak(`${title}. ${content}`, lang);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Light Clean Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#116149] border border-emerald-200 inline-block">
            {lang === 'vi' ? 'Nội dung Giáo dục Địa phương Lớp 8' : 'Grade 8 Local Curriculum'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'vi'
              ? 'Tài Liệu Học Tập Địa Phương Tỉnh Thái Nguyên'
              : 'Local Curriculum Textbook of Thai Nguyen'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {lang === 'vi'
              ? 'Bám sát 5 chuyên đề môn Giáo dục địa phương Lớp 8: Di tích lịch sử cách mạng, di sản văn hóa phi vật thể, phong tục lễ hội dân tộc, nghề truyền thống & Ngũ đại danh trà, khảo cổ học và phòng chống thiên tai.'
              : 'Covering 5 core Grade 8 local curriculum modules: revolutionary monuments, intangible heritage, ethnic customs, tea craftsmanship, and disaster management.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Curriculum Section Tabs (Nền sáng) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2 px-1">
            {lang === 'vi' ? '5 Chuyên đề Bài học' : '5 Curriculum Units'}
          </div>

          {CURRICULUM_SECTIONS.map((sec) => {
            const Icon = getSectionIcon(sec.icon);
            const isActive = sec.id === activeSecId;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSecId(sec.id)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-start gap-3.5 ${
                  isActive
                    ? 'bg-[#116149] text-white border-[#116149] shadow-md scale-[1.01]'
                    : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50 hover:border-emerald-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#eaf5ef] text-[#116149]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-emerald-900 text-emerald-100'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      Mục {sec.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm line-clamp-1">
                    {lang === 'vi' ? sec.titleVi : sec.titleEn}
                  </h3>
                  <p
                    className={`text-[11px] line-clamp-2 mt-1 leading-snug ${
                      isActive ? 'text-emerald-100' : 'text-stone-500'
                    }`}
                  >
                    {lang === 'vi' ? sec.summaryVi : sec.summaryEn}
                  </p>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 mt-3 transition-transform ${
                    isActive ? 'text-emerald-200 rotate-90' : 'text-stone-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Topic Content (Nền sáng) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-xs font-bold text-[#116149] uppercase tracking-widest">
                {lang === 'vi'
                  ? `Chuyên đề ${currentSection.number} · Giáo dục Địa phương Lớp 8`
                  : `Module ${currentSection.number} · Grade 8 Local Education`}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                {lang === 'vi' ? currentSection.titleVi : currentSection.titleEn}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                {lang === 'vi' ? currentSection.summaryVi : currentSection.summaryEn}
              </p>
            </div>

            {/* List of Topics */}
            <div className="space-y-6">
              {currentSection.topics.map((topic, idx) => {
                const linkedPlace = topic.placeId
                  ? PLACES.find((p) => p.id === topic.placeId)
                  : null;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#f8faf8] border border-stone-200/80 space-y-3.5 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#116149] shrink-0" />
                        <h4 className="font-bold text-sm sm:text-base text-stone-900">
                          {lang === 'vi' ? topic.titleVi : topic.titleEn}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Audio Read Button */}
                        <button
                          onClick={() =>
                            handleSpeakTopic(
                              lang === 'vi' ? topic.titleVi : topic.titleEn,
                              lang === 'vi' ? topic.contentVi : topic.contentEn
                            )
                          }
                          className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-[#eaf5ef] text-[#116149] hover:bg-emerald-100 transition-colors"
                          title={lang === 'vi' ? 'Nghe đọc bài học' : 'Listen to topic'}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{lang === 'vi' ? 'Nghe đọc' : 'Listen'}</span>
                        </button>

                        {/* View on Map Button */}
                        {topic.placeId && (
                          <button
                            onClick={() => onSelectPlaceById(topic.placeId!)}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-stone-100 hover:bg-[#116149] hover:text-white text-stone-700 transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{lang === 'vi' ? 'Xem vị trí' : 'Map'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Image if available */}
                    {topic.img && (
                      <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        <img
                          src={topic.img}
                          alt={topic.titleVi}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Topic Paragraph */}
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {lang === 'vi' ? topic.contentVi : topic.contentEn}
                    </p>

                    {/* Secondary translation preview */}
                    <div className="pt-2 border-t border-stone-200/60 text-xs italic text-stone-500">
                      {lang === 'vi' ? topic.contentEn : topic.contentVi}
                    </div>

                    {/* Place Card Highlight if linked */}
                    {linkedPlace && (
                      <div
                        onClick={() => onSelectPlaceById(linkedPlace.id)}
                        className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-between cursor-pointer group shadow-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: linkedPlace.color }}
                          />
                          <span className="text-xs font-bold text-[#116149] group-hover:underline">
                            {lang === 'vi' ? linkedPlace.nameVi : linkedPlace.nameEn} (📍 {linkedPlace.locationVi})
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#116149] group-hover:translate-x-1 transition-transform">
                          {lang === 'vi' ? 'Mở trên bản đồ →' : 'Explore on map →'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
