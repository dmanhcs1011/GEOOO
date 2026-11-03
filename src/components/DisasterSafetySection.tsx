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
  ExternalLink,
  Volume2,
  Maximize2
} from 'lucide-react';
import { SAFETY_GUIDES, PLACES } from '../data/geoData';
import { speechService } from '../utils/speech';

interface DisasterSafetySectionProps {
  lang: 'vi' | 'en';
  onNavigateToPlace: (placeId: string) => void;
}

export const DisasterSafetySection: React.FC<DisasterSafetySectionProps> = ({
  lang,
  onNavigateToPlace,
}) => {
  const [openGuideId, setOpenGuideId] = useState<string>('flood');
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const disasterPlaces = PLACES.filter((p) => p.category === 'disaster');

  const emergencyContacts = [
    { number: '112', labelVi: 'Yêu cầu Cứu nạn Khẩn cấp Toàn quốc', labelEn: 'National Search & Rescue' },
    { number: '114', labelVi: 'Cứu hỏa & Cứu nạn cứu hộ', labelEn: 'Firefighting & Emergency Rescue' },
    { number: '115', labelVi: 'Cấp cứu Y tế Đô thị & Nông thôn', labelEn: 'Medical Ambulance' },
  ];

  const handleSpeak = (text: string, speakLang: 'vi' | 'en') => {
    speechService.speak(text, speakLang);
  };

  return (
    <div id="section-disaster" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 scroll-mt-20">
      {/* 1. Tiêu đề chuẩn Google Sites: 03. Khí hậu và nơi có ngập lụt, sạt lở / 03. Climate and Areas Prone to Flooding and Landslides */}
      <div className="space-y-1 border-b border-stone-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          03. Khí hậu và nơi có ngập lụt, sạt lở
        </h2>
        <h3 className="text-lg sm:text-xl font-medium text-stone-600">
          03. Climate and Areas Prone to Flooding and Landslides
        </h3>
      </div>

      {/* 2. Hai ảnh trên cùng cạnh nhau (Khớp chuẩn xác ảnh tham khảo: Sạt lở đất & Ngập lụt TTXVN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Ảnh trái: Sạt lở đất */}
        <div className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-xs flex flex-col group">
          <div
            className="rounded-2xl overflow-hidden bg-stone-100 aspect-16/10 cursor-pointer relative"
            onClick={() => setActiveModalImage('/assets/aistudio/unnamed_012bcdbf.jpg')}
          >
            <img
              src="/assets/aistudio/unnamed_012bcdbf.jpg"
              alt="Hiện trường sạt lở đất đá nghiêm trọng tại Thái Nguyên"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg text-xs backdrop-blur-xs">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xs text-stone-500 italic mt-2.5 text-center px-2">
            Hiện trường sạt lở taluy dương và sườn núi do mưa lớn kéo dài tại vùng núi Thái Nguyên
          </p>
        </div>

        {/* Ảnh phải: Ngập lụt sông Cầu - TTXVN */}
        <div className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-xs flex flex-col group">
          <div
            className="rounded-2xl overflow-hidden bg-stone-100 aspect-16/10 cursor-pointer relative"
            onClick={() => setActiveModalImage('/assets/aistudio/unnamed_48f9016c.jpg')}
          >
            <img
              src="/assets/aistudio/unnamed_48f9016c.jpg"
              alt="Toàn cảnh ngập lụt sâu dọc lưu vực sông Cầu Thái Nguyên - TTXVN"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg text-xs backdrop-blur-xs">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xs text-stone-500 italic mt-2.5 text-center px-2">
            Ngập lụt diện rộng tại các khu dân cư và phường ven sông Cầu khi lũ dâng cao (Ảnh: TTXVN)
          </p>
        </div>
      </div>

      {/* 3. Khối nội dung song ngữ 2 cột chuẩn xác theo ảnh người dùng cung cấp */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        {/* CỘT TRÁI: TIẾNG VIỆT */}
        <div className="space-y-6 text-stone-800 text-sm leading-relaxed pr-0 md:pr-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#116149] bg-emerald-50 px-3 py-1 rounded-full">
              Phiên bản Tiếng Việt
            </span>
            <button
              onClick={() =>
                handleSpeak(
                  'Thái Nguyên mang khí hậu nhiệt đới gió mùa có mùa đông lạnh, với hai mùa rõ rệt là mùa mưa và mùa khô...',
                  'vi'
                )
              }
              className="text-xs text-[#116149] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe đọc</span>
            </button>
          </div>

          <div className="space-y-3">
            <p>
              <strong className="text-[#116149] font-bold">Thái Nguyên</strong> mang khí hậu nhiệt đới gió mùa có mùa đông lạnh, với hai mùa rõ rệt là mùa mưa (tháng 5 đến tháng 10) và mùa khô (tháng 11 đến tháng 4 năm sau).
            </p>
            <p>
              Do đặc thù địa hình vừa có đồi núi dốc, vừa có hệ thống sông suối lớn (sông Cầu, sông Công), Thái Nguyên thường chịu ảnh hưởng lớn bởi thiên tai. Dưới đây là các khu vực trọng điểm thường xuyên xảy ra ngập lụt và sạt lở:
            </p>
          </div>

          {/* Mục Ngập lụt */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-base text-blue-900 flex items-center gap-2">
              <span>🌊</span>
              <span>Các khu vực thường xuyên bị ngập lụt</span>
            </h4>
            <p className="text-stone-700">
              Khi xảy ra mưa lớn diện rộng hoặc bão lớn, mực nước sông Cầu dâng cao vượt báo động gây ngập úng nghiêm trọng:
            </p>
            <ul className="space-y-2.5 list-disc pl-5 text-stone-700">
              <li>
                <strong>Trung tâm Thành phố Thái Nguyên:</strong> Các tuyến đường thấp trũng như{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Lương Ngọc Quyến</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Hoàng Văn Thụ</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Minh Cầu</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Hùng Vương</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Nha Trang</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Bến Tượng</span> thường bị ngập úng đô thị cục bộ. Các phường ven sông như{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Linh Sơn</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Gia Sàng</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Tích Lương</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Quán Triều</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Phan Đình Phùng</span> (khu vực{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Túc Duyên</span>, cầu sắt chung cư Tiến Bộ) bị ngập sâu và cô lập khi lũ sông Cầu dâng cao.
              </li>
              <li>
                <strong>Khu vực vùng trũng ven sông:</strong> Một số xã trũng thấp, vùng ngầm tràn thuộc thành phố và các huyện phía Nam như{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">TP. Phổ Yên</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Huyện Phú Bình</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Huyện Đại Từ</span> và các xã miền núi như{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Tràng Xá</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">Dân Tiến</span>,{' '}
                <span className="text-blue-700 font-medium underline underline-offset-2">La Hiên (Võ Nhai)</span> thường xuyên bị chia cắt bởi nước lũ.
              </li>
            </ul>
          </div>

          {/* Mục Sạt lở đất */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-base text-amber-900 flex items-center gap-2">
              <span>⛰️</span>
              <span>Các khu vực có nguy cơ xảy ra sạt lở đất, lũ quét</span>
            </h4>
            <p className="text-stone-700">
              Hiện tượng sạt trượt đất đá chủ yếu tập trung dọc theo các sườn núi dốc, mái taluy dương của các tuyến đường giao thông và khu vực đang thi công:
            </p>
            <ul className="space-y-2.5 list-disc pl-5 text-stone-700">
              <li>
                <strong>Huyện Định Hóa:</strong> Các xã có địa hình dốc đứng như{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Lam Vỹ</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Kim Phượng</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Phượng Tiến</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Yên Trạch</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Trung Hội</span>.
              </li>
              <li>
                <strong>Huyện Phú Lương:</strong> Các khu vực thuộc xã{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Vô Tranh</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Động Đạt</span>, và dọc tuyến Quốc lộ 3.
              </li>
              <li>
                <strong>Huyện Đại Từ:</strong> Các xã, thị trấn khu vực chân núi Tam Đảo như{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Thị trấn Quân Chu</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Quân Chu</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Ký Phú</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Mỹ Yên</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">Văn Yên</span>,{' '}
                <span className="text-amber-800 font-medium underline underline-offset-2">La Bằng</span>.
              </li>
              <li>
                <strong>Huyện Đồng Hỷ và Võ Nhai:</strong> Địa hình núi đá, núi đất xen kẽ dễ sụt lún, sạt lở taluy đường giao thông khi đất đạt trạng thái bão hòa nước sau các đợt mưa dài ngày.
              </li>
            </ul>
          </div>
        </div>

        {/* CỘT PHẢI: ENGLISH */}
        <div className="space-y-6 text-stone-800 text-sm leading-relaxed border-t md:border-t-0 md:border-l border-stone-200 pt-6 md:pt-0 md:pl-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full">
              English Translation
            </span>
            <button
              onClick={() =>
                handleSpeak(
                  'Thai Nguyen has a tropical monsoon climate with cold winters and two distinct seasons: the rainy season and the dry season...',
                  'en'
                )
              }
              className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen</span>
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-base text-stone-900">
              Climate and Areas at Risk of Flooding and Landslides in Thai Nguyen
            </h4>
            <p>
              Thai Nguyen has a tropical monsoon climate with cold winters and two distinct seasons: the rainy season (May to October) and the dry season (November to April of the following year).
            </p>
            <p>
              Due to its diverse terrain, which includes steep hills and mountains, as well as major rivers and streams such as the Cau River and the Cong River, Thai Nguyen is highly vulnerable to natural disasters. The following are key areas that are prone to flooding and landslides.
            </p>
          </div>

          {/* Section 1 Flooding */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-base text-blue-900 flex items-center gap-2">
              <span>1. Areas Frequently Affected by Flooding</span>
              <span>🌊</span>
            </h4>
            <ul className="space-y-2.5 list-disc pl-5 text-stone-700">
              <li>
                During widespread heavy rainfall or major storms, the water level of the Cau River can rise above warning levels, causing severe flooding.
              </li>
              <li>
                <strong>Thai Nguyen City Center:</strong> Low-lying streets such as Luong Ngoc Quyen, Hoang Van Thu, Minh Cau, Hung Vuong, Nha Trang, and Ben Tuong are often affected by localized urban flooding. Riverside wards such as Linh Son, Gia Sang, Tich Luong, Quan Trieu, and Phan Dinh Phung (including the Tuc Duyen area and the area near the Tien Bo apartment complex and iron bridge) may experience deep flooding and isolation when the Cau River rises.
              </li>
              <li>
                <strong>Low-Lying Areas Along Rivers:</strong> Some low-lying communes and areas near river crossings in the southern city and districts, including Pho Yen City, Phu Binh District, and Dai Tu District, as well as mountainous communes such as Trang Xa, Dan Tien, and La Hien (Vo Nhai), are often cut off by floodwaters.
              </li>
            </ul>
          </div>

          {/* Section 2 Landslides */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-base text-amber-900 flex items-center gap-2">
              <span>2. Areas at High Risk of Landslides and Flash Floods</span>
              <span>⛰️</span>
            </h4>
            <ul className="space-y-2.5 list-disc pl-5 text-stone-700">
              <li>
                Landslides mainly occur along steep mountain slopes, road cuttings, and areas under construction.
              </li>
              <li>
                <strong>Dinh Hoa District:</strong> Steep areas in communes such as Lam Vy, Kim Phuong, Phuong Tien, Yen Trach, and Trung Hoi are vulnerable to landslides.
              </li>
              <li>
                <strong>Phu Luong District:</strong> Areas in Vo Tranh and Dong Dat communes, as well as locations along National Highway 3, are at risk of landslides.
              </li>
              <li>
                <strong>Dai Tu District:</strong> Communes at the foot of the Tam Dao Mountains, including Quan Chu, Ky Phu, My Yen, and Van Yen, may be affected by landslides and flash floods.
              </li>
              <li>
                <strong>Dong Hy and Vo Nhai Districts:</strong> Their terrain, consisting of limestone mountains and soil-covered hills, is susceptible to ground subsidence and landslides along road slopes, especially when the soil becomes saturated after prolonged rainfall.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Infographic Poster Posters (Khớp ảnh người dùng cung cấp) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#116149] bg-emerald-50 px-3 py-1 rounded-full inline-block">
            Tư Liệu Trực Quan Sinh Động
          </span>
          <h4 className="text-lg sm:text-xl font-extrabold text-stone-900">
            Infographic Khí Hậu & Tổng Quan Không Gian Địa Lý Thái Nguyên
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Poster 1: Khí hậu Thái Nguyên - Trong lành - Mát mẻ - Tươi đẹp quanh năm */}
          <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-xs flex flex-col group">
            <div
              className="rounded-2xl overflow-hidden bg-stone-100 cursor-pointer relative"
              onClick={() => setActiveModalImage('/assets/aistudio/image_e4be71b2.png')}
            >
              <img
                src="/assets/aistudio/image_e4be71b2.png"
                alt="Infographic Khí Hậu Thái Nguyên - Trong lành Mát mẻ Tươi đẹp quanh năm"
                className="w-full h-auto object-cover group-hover:scale-101 transition-transform"
              />
              <div className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg text-xs backdrop-blur-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs text-stone-600 font-semibold text-center mt-2.5 px-2">
              Infographic Khí Hậu Thái Nguyên: 4 mùa, nhiệt độ 21–23°C, lượng mưa 1.500–2.000 mm/năm
            </p>
          </div>

          {/* Poster 2: Bản đồ Tỉnh Thái Nguyên sau sáp nhập & các điểm du lịch */}
          <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-xs flex flex-col group">
            <div
              className="rounded-2xl overflow-hidden bg-stone-100 cursor-pointer relative"
              onClick={() => setActiveModalImage('/assets/aistudio/image_ca330ac5.png')}
            >
              <img
                src="/assets/aistudio/image_ca330ac5.png"
                alt="Bản đồ Tỉnh Thái Nguyên - Hai vùng đất Một hành trình Vạn trải nghiệm"
                className="w-full h-auto object-cover group-hover:scale-101 transition-transform"
              />
              <div className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg text-xs backdrop-blur-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs text-stone-600 font-semibold text-center mt-2.5 px-2">
              Bản đồ quy hoạch & danh thắng liên kết du lịch: ATK Định Hóa, Hồ Núi Cốc, Tân Cương, Ba Bể
            </p>
          </div>
        </div>
      </div>

      {/* 5. Các điểm nguy cơ trọng điểm trên bản đồ số */}
      <div className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full inline-block mb-1">
              Điểm Ghim Tọa Độ GPS
            </span>
            <h4 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>{lang === 'vi' ? 'Các Điểm Nguy Cơ Trọng Điểm Tại Thái Nguyên' : 'Critical Hazard Zones in Thai Nguyen'}</span>
            </h4>
          </div>
          <span className="text-xs text-stone-500 italic">
            {lang === 'vi' ? 'Bấm vào thẻ để xem vị trí trên Bản đồ tương tác' : 'Click card to highlight on Interactive Map'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {disasterPlaces.map((hazard) => (
            <div
              key={hazard.id}
              onClick={() => onNavigateToPlace(hazard.id)}
              className="p-4 rounded-2xl bg-stone-50/80 hover:bg-white border border-rose-200 shadow-2xs hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between group"
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
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                  📍 {lang === 'vi' ? hazard.locationVi : hazard.locationEn}
                </p>
                <p className="text-xs text-stone-700 mt-1.5 line-clamp-2">
                  {lang === 'vi' ? hazard.descVi : hazard.descEn}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-bold text-rose-700">
                <span>{lang === 'vi' ? 'Xem tọa độ & cảnh báo' : 'Locate on Map'}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Quy tắc ứng phó & Cẩm nang an toàn mùa mưa lũ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#116149] bg-emerald-50 px-3 py-1 rounded-full inline-block mb-1">
            {lang === 'vi' ? 'Cẩm Nang Kỹ Năng Sống Cho Học Sinh' : 'Student Life-Survival Handbook'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900">
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
                className="rounded-2xl border border-stone-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenGuideId(isOpen ? '' : guide.id)}
                  className="w-full p-4 text-left flex items-center justify-between bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
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

      {/* 7. Đường dây nóng khẩn cấp */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
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
              className="px-5 py-3 rounded-2xl bg-rose-50/60 hover:bg-rose-100 border border-rose-200 text-center transition-colors min-w-[120px] shadow-2xs"
            >
              <div className="text-2xl font-black text-rose-700 font-mono">{c.number}</div>
              <div className="text-[11px] text-stone-700 font-semibold mt-0.5">{lang === 'vi' ? c.labelVi : c.labelEn}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Modal Phóng To Ảnh */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveModalImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-white p-2">
            <img
              src={activeModalImage}
              alt="Ảnh phóng to chi tiết"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white px-3 py-1 rounded-full text-xs font-bold"
            >
              ✕ Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
