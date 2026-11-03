import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Square,
  Navigation,
  MapPin,
  Tag,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Place } from '../data/geoData';
import { speechService, SpeechState } from '../utils/speech';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  lang: 'vi' | 'en';
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  lang,
}) => {
  const [speechState, setSpeechState] = useState<SpeechState>(speechService.getState());
  const [speechRate, setSpeechRate] = useState<number>(0.95);

  useEffect(() => {
    return speechService.subscribe(setSpeechState);
  }, []);

  if (!place) return null;

  const handlePlayVoice = () => {
    const textToSpeak =
      lang === 'vi'
        ? `${place.nameVi}. ${place.speechVi}`
        : `${place.nameEn}. ${place.speechEn}`;
    speechService.speak(textToSpeak, lang, speechRate);
  };

  const isCurrentPlaying = speechState.isPlaying;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Close Button */}
        <div className="relative h-56 sm:h-64 w-full bg-stone-100 overflow-hidden shrink-0">
          <img
            src={place.img}
            alt={place.nameVi}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => {
              speechService.stop();
              onClose();
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Tag & Badges on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className="px-2.5 py-0.5 text-xs font-bold rounded-full text-white shadow-sm"
                style={{ backgroundColor: place.color }}
              >
                {lang === 'vi' ? place.typeVi : place.typeEn}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-stone-200 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {lang === 'vi' ? place.locationVi : place.locationEn}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {lang === 'vi' ? place.nameVi : place.nameEn}
            </h2>
            <p className="text-xs text-stone-300 italic">
              {lang === 'vi' ? place.nameEn : place.nameVi}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-stone-800 text-sm bg-white">
          {/* Audio Speech Player Card */}
          <div className="p-3.5 rounded-xl bg-[#eaf5ef] border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#116149] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-[#116149] text-sm flex items-center gap-1.5">
                  <span>{lang === 'vi' ? 'Thuyết minh Giọng đọc Tự động' : 'Audio Narration Guide'}</span>
                  {isCurrentPlaying && (
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 h-3 bg-emerald-600 animate-pulse" />
                      <span className="w-0.5 h-2 bg-emerald-600 animate-pulse delay-75" />
                      <span className="w-0.5 h-3.5 bg-emerald-600 animate-pulse delay-150" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-800">
                  {lang === 'vi'
                    ? 'Nghe phần giới thiệu dành cho học sinh'
                    : 'Listen to the educational narration'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {isCurrentPlaying ? (
                <button
                  onClick={() => speechService.stop()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>{lang === 'vi' ? 'Dừng đọc' : 'Stop'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePlayVoice}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#116149] hover:bg-[#0e4e3a] text-white text-xs font-bold shadow-sm transition-all hover:scale-105"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Phát giọng đọc' : 'Listen Now'}</span>
                </button>
              )}

              {/* Speed toggle */}
              <select
                value={speechRate}
                onChange={(e) => setSpeechRate(Number(e.target.value))}
                className="text-xs px-2 py-1 rounded bg-white border border-emerald-300 text-stone-700 outline-none"
              >
                <option value={0.85}>0.85x</option>
                <option value={0.95}>1.0x</option>
                <option value={1.15}>1.2x</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#116149]" />
              <span>{lang === 'vi' ? 'Thông tin Tổng quan' : 'Overview & History'}</span>
            </h3>
            <p className="leading-relaxed text-stone-700 text-sm">
              {lang === 'vi' ? place.descVi : place.descEn}
            </p>
          </div>

          {/* Speech transcript */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <h4 className="text-xs font-bold text-[#116149] uppercase tracking-wider mb-1">
              🎙️ {lang === 'vi' ? 'Lời thuyết minh' : 'Narration Transcript'}
            </h4>
            <p className="text-xs italic text-stone-700 leading-normal">
              "{lang === 'vi' ? place.speechVi : place.speechEn}"
            </p>
          </div>

          {/* Key Takeaway / Safety Tip */}
          {place.keyTakeawayVi && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase">
                  💡 {lang === 'vi' ? 'Em hãy ghi nhớ (GDĐP)' : 'Key Student Takeaway'}
                </h4>
                <p className="text-xs text-amber-900 mt-0.5">
                  {lang === 'vi' ? place.keyTakeawayVi : place.keyTakeawayEn}
                </p>
              </div>
            </div>
          )}

          {/* Safety Tip for Disaster Hazards */}
          {place.safetyTipVi && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-900 uppercase">
                  ⚠️ {lang === 'vi' ? 'Kỹ năng An toàn Phòng chống Thiên tai' : 'Disaster Survival Skill'}
                </h4>
                <p className="text-xs text-rose-900 mt-0.5">
                  {lang === 'vi' ? place.safetyTipVi : place.safetyTipEn}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {place.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200"
              >
                <Tag className="w-2.5 h-2.5 text-stone-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer with Google Maps Navigation */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-500">
            {lang === 'vi' ? 'Tọa độ: ' : 'Coordinates: '}
            <span className="font-mono font-semibold">{place.lat.toFixed(4)}, {place.lng.toFixed(4)}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                place.googleMapsQuery || `${place.lat},${place.lng}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#116149] hover:bg-[#0e4e3a] text-white font-bold text-xs shadow-sm transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Chỉ đường Google Maps' : 'Open Google Maps'}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
