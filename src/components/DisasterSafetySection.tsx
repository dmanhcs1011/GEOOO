import React, { useState } from 'react';
import {
  AlertTriangle,
  Waves,
  Mountain,
  ShieldCheck,
  CloudRain,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { SAFETY_GUIDES, PLACES } from '../data/geoData';

interface DisasterSafetySectionProps {
  lang: 'vi' | 'en';
  onNavigateToPlace: (placeId: string) => void;
}

export const DisasterSafetySection: React.FC<DisasterSafetySectionProps> = ({
  lang,
  onNavigateToPlace,
}) => {
  const [openGuideId, setOpenGuideId] = useState<string>('flood');

  const disasterPlaces = PLACES.filter((p) => p.category === 'disaster');

  const emergencyContacts = [
    { number: '112', labelVi: 'Yêu cầu Cứu nạn Khẩn cấp Toàn quốc', labelEn: 'National Search & Rescue' },
    { number: '114', labelVi: 'Cứu hỏa & Cứu nạn cứu hộ', labelEn: 'Firefighting & Emergency Rescue' },
    { number: '115', labelVi: 'Cấp cứu Y tế Đô thị & Nông thôn', labelEn: 'Medical Ambulance' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Light Clean Intro Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200/80 shadow-sm space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 inline-block">
          {lang === 'vi' ? 'Khí Hậu & Phòng Chống Thiên Tai' : 'Climate & Disaster Risk Management'}
        </span>
        <h3 className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {lang === 'vi'
            ? '03. Khí Hậu Và Nơi Có Nguy Cơ Ngập Lụt, Sạt Lở Đất'
            : '03. Climate & Flood, Landslide Hazard Zones'}
        </h3>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-4xl">
          {lang === 'vi'
            ? 'Thái Nguyên mang khí hậu nhiệt đới gió mùa có mùa đông lạnh, mưa tập trung từ tháng 5 đến tháng 10. Địa hình dốc từ dãy Tam Đảo xuống đồng bằng sông Cầu, sông Công tạo nên các vùng ngập úng và nguy cơ sạt lở cần đặc biệt đề phòng.'
            : 'Thai Nguyen features a tropical monsoon climate with distinct wet (May–Oct) and dry seasons. Steep gradients from Tam Dao to river floodplains generate localized urban inundation and slope slides.'}
        </p>
      </div>

      {/* Climate Overview Grid (Nền sáng) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <CloudRain className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-stone-900">
            {lang === 'vi' ? 'Đặc điểm Khí hậu & Mùa mưa' : 'Climate & Rainy Season'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {lang === 'vi'
              ? 'Mùa mưa chiếm tới 80% lượng mưa cả năm (tháng 5 đến tháng 10). Các đợt mưa lớn trên 100mm dồn dập khiến mực nước sông Cầu và sông Công dâng nhanh.'
              : 'The rainy season accounts for 80% of annual rainfall (May-Oct), triggering rapid surges on Cau and Cong rivers.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Waves className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-stone-900">
            {lang === 'vi' ? 'Khu vực Ngập lụt Thường xuyên' : 'Riverine & Urban Floods'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {lang === 'vi'
              ? 'Tuyến đường trũng trung tâm TP. Thái Nguyên (Lương Ngọc Quyến, Hoàng Văn Thụ, Minh Cầu) và các phường ven sông (Linh Sơn, Túc Duyên, Gia Sàng) ngập sâu khi lũ vượt báo động 3.'
              : 'Central downtown avenues and riverside wards face deep floodwaters when Cau River crests above Warning Level 3.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Mountain className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-stone-900">
            {lang === 'vi' ? 'Sạt Lở Đất & Lũ Quét Vùng Núi' : 'Landslides & Mountain Torrents'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {lang === 'vi'
              ? 'Sườn núi Tam Đảo (Đại Từ), vùng đồi dốc Định Hóa (Lam Vỹ, Kim Phượng), Phú Lương dọc Quốc lộ 3, và vùng đá karst thung lũng kín Võ Nhai, Đồng Hỷ.'
              : 'Steep hill slopes in Tam Dao (Dai Tu), Dinh Hoa, Highway 3 in Phu Luong, and closed karst poljes in Vo Nhai and Dong Hy.'}
          </p>
        </div>
      </div>

      {/* Critical Hazard Hotspots on Geo-Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>{lang === 'vi' ? 'Các Điểm Nguy Cơ Trọng Điểm Tại Thái Nguyên' : 'Critical Hazard Zones in Thai Nguyen'}</span>
          </h4>
          <span className="text-xs text-stone-500">
            {lang === 'vi' ? 'Bấm để phóng to trên bản đồ' : 'Click to locate on Map'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {disasterPlaces.map((hazard) => (
            <div
              key={hazard.id}
              onClick={() => onNavigateToPlace(hazard.id)}
              className="p-4 rounded-2xl bg-white border border-rose-200 shadow-xs hover:border-rose-400 cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: hazard.color }}
                  >
                    {lang === 'vi' ? hazard.typeVi : hazard.typeEn}
                  </span>
                  <MapPin className="w-4 h-4 text-rose-500 group-hover:scale-125 transition-transform" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-rose-700 transition-colors">
                  {lang === 'vi' ? hazard.nameVi : hazard.nameEn}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                  📍 {lang === 'vi' ? hazard.locationVi : hazard.locationEn}
                </p>
                <p className="text-xs text-stone-700 mt-1.5 line-clamp-2">
                  {lang === 'vi' ? hazard.descVi : hazard.descEn}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-rose-700">
                <span>{lang === 'vi' ? 'Xem tọa độ & cảnh báo' : 'Locate on Map'}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Protocol Guides Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
            {lang === 'vi' ? 'Cẩm Nang Kỹ Năng Sống Cho Học Sinh Lớp 8' : 'Student Life-Survival Handbook'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            {lang === 'vi'
              ? 'Quy Tắc Ứng Phó & Phòng Tránh Tai Nạn Mùa Mưa Lũ'
              : 'Safety Protocols & Accident Prevention Rules'}
          </h3>
        </div>

        <div className="space-y-3">
          {SAFETY_GUIDES.map((guide) => {
            const isOpen = openGuideId === guide.id;
            return (
              <div
                key={guide.id}
                className="rounded-2xl border border-stone-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenGuideId(isOpen ? '' : guide.id)}
                  className="w-full p-4 text-left flex items-center justify-between bg-stone-50 hover:bg-stone-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      {guide.id === 'flood' ? <Waves className="w-4 h-4" /> : <Mountain className="w-4 h-4" />}
                    </div>
                    <span className="font-bold text-sm text-stone-900">
                      {lang === 'vi' ? guide.titleVi : guide.titleEn}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white space-y-2.5 border-t border-stone-100">
                    {(lang === 'vi' ? guide.tipsVi : guide.tipsEn).map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-[#116149] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Contacts Banner (Nền sáng) */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>{lang === 'vi' ? 'Đường dây nóng Khẩn cấp' : 'Emergency Hotlines'}</span>
          </div>
          <h4 className="text-lg font-black text-stone-900">
            {lang === 'vi' ? 'Số Điện Thoại Cứu Hộ Khi Có Thiên Tai' : 'Emergency Contact Assistance'}
          </h4>
          <p className="text-xs text-stone-500 max-w-md">
            {lang === 'vi'
              ? 'Học sinh hãy ghi nhớ các đầu số khẩn cấp sau để gọi ngay khi gặp nguy hiểm ngập lụt, sạt lở.'
              : 'Memorize these emergency numbers to call immediately in flood or landslide emergencies.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {emergencyContacts.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              className="px-4 py-2.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-center transition-colors min-w-[110px]"
            >
              <div className="text-xl font-black text-rose-700 font-mono">{c.number}</div>
              <div className="text-[10px] text-stone-600 font-semibold">{lang === 'vi' ? c.labelVi : c.labelEn}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
