import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  MapPin,
  CheckCircle2,
  Layers,
  Sparkles,
  Award,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { speechService } from '../utils/speech';

interface CurriculumSectionProps {
  lang: 'vi' | 'en';
  onSelectPlaceById?: (placeId: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  lang,
  onSelectPlaceById,
}) => {
  const [activeMục, setActiveMục] = useState<number | 'all'>('all');

  const handleSpeak = (text: string, speakLang: 'vi' | 'en') => {
    speechService.speak(text, speakLang);
  };

  const mucButtons = [
    { id: 1, labelVi: 'Mục 1: Di tích và địa danh', labelEn: 'Section 1: Sites & Landmarks' },
    { id: 2, labelVi: 'Mục 2: Di sản văn hóa phi vật thể', labelEn: 'Section 2: Cultural Heritage' },
    { id: 3, labelVi: 'Mục 3: Phong tục, lễ hội và văn hóa các dân tộc', labelEn: 'Section 3: Customs & Festivals' },
    { id: 4, labelVi: 'Mục 4: Làng nghề và sản phẩm', labelEn: 'Section 4: Traditional Crafts' },
    { id: 5, labelVi: 'Mục 5: Lịch sử, địa lý và kinh tế - xã hội', labelEn: 'Section 5: History & Geography' },
  ];

  return (
    <div id="section-curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 scroll-mt-20">
      {/* 1. Header: 02. Giáo dục địa phương / 02. Grade 8 Local Education */}
      <div className="space-y-1 border-b border-stone-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          02. Giáo dục địa phương
        </h2>
        <h3 className="text-lg sm:text-xl font-medium text-stone-600">
          02. Grade 8 Local Education
        </h3>
      </div>

      {/* 2. Banner with Stilt House Photo on Left and 5 Blue Buttons on Right (Khớp chuẩn xác ảnh 1) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        {/* Left: Stilt House and Primeval Forest Photo */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 aspect-16/10">
            <img
              src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2021/04/lang-nha-san-thai-hai-1.jpg"
              alt="Khu bảo tồn nhà sàn Thái Hải - Thái Nguyên"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/assets/aistudio/H__n__c_gi_a___i_xanh_l_c_ho_ng_h_n_794aeff3.png';
              }}
            />
          </div>
          <p className="text-xs text-stone-500 italic mt-2 text-center">
            Không gian nhà sàn và rừng sinh thái truyền thống Thái Nguyên
          </p>
        </div>

        {/* Right: 5 Blue Buttons (Menu 5 Mục Giáo dục địa phương) */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-2.5">
          <div className="space-y-2.5">
            {mucButtons.map((btn) => {
              const isSelected = activeMục === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    setActiveMục(activeMục === btn.id ? 'all' : btn.id);
                    const targetEl = document.getElementById(`curriculum-muc-${btn.id}`);
                    if (targetEl) {
                      targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-center transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'bg-[#0e5945] text-white ring-2 ring-[#0e5945]/40 scale-[1.01]'
                      : 'bg-[#1b6b80] hover:bg-[#165a6c] text-white'
                  }`}
                >
                  {btn.labelVi}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
            <span>Bấm từng mục để xem nhanh chuyên đề</span>
            <button
              onClick={() => setActiveMục('all')}
              className="text-[#116149] font-bold hover:underline cursor-pointer"
            >
              Xem toàn bộ cả 5 mục
            </button>
          </div>
        </div>
      </div>

      {/* 3. Chi tiết 5 Mục Bài học song ngữ (Việt - Anh) chuẩn xác theo 12 ảnh chụp màn hình */}
      <div className="space-y-12">
        {/* ===================== MỤC 1 ===================== */}
        <section
          id="curriculum-muc-1"
          className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs space-y-6 scroll-mt-24 ${
            activeMục !== 'all' && activeMục !== 1 ? 'hidden' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Cột Trái: Tiếng Anh */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Section 1: Historical Sites and Notable Landmarks
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Section 1: Historical Sites and Notable Landmarks. ATK Dinh Hoa was an important revolutionary base during the resistance war against French colonialism.',
                      'en'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              {/* ATK Định Hóa (EN) */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  ATK Định Hóa – A Revolutionary Historical Site
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  ATK Định Hóa was an important revolutionary base during the resistance war against French colonialism (1946–1954). It was where President Ho Chi Minh, the Central Committee of the Communist Party of Vietnam, and the Government lived and worked to lead the resistance war. This historical site helps students better understand the Vietnamese tradition of patriotism, solidarity, and the determination to protect national independence.
                </p>
              </div>

              {/* Núi Cốc Lake (EN) */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Núi Cốc Lake – The Natural Beauty of Thái Nguyên
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Núi Cốc Lake is famous for its vast water surface, numerous large and small islands, and poetic mountain scenery. The lake is associated with the legend of nàng Công and chàng Cốc and is also a popular destination for sightseeing, relaxation, and nature exploration.
                </p>
              </div>

              {/* Ba Bể Lake (EN) */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Ba Bể Lake
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Ba Bể Lake is a remarkable natural attraction featuring clear blue water, limestone mountains, and a rich ecosystem. Following the merger of Bắc Kạn and Thái Nguyên, Ba Bể Lake is now located in Thái Nguyên Province.
                </p>
              </div>
            </div>

            {/* Cột Phải: Tiếng Việt */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Mục 1: Di tích và địa danh
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Mục 1: Di tích và địa danh. ATK Định Hóa – Địa chỉ đỏ cách mạng. Hồ Núi Cốc – Vẻ đẹp thiên nhiên Thái Nguyên. Hồ Ba Bể.',
                      'vi'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              </div>

              {/* ATK Định Hóa (VI) */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  ATK Định Hóa – Địa chỉ đỏ cách mạng
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  ATK Định Hóa là vùng căn cứ quan trọng trong cuộc kháng chiến chống thực dân Pháp (1946–1954). Đây là nơi Chủ tịch Hồ Chí Minh, Trung ương Đảng và Chính phủ từng sống, làm việc, lãnh đạo cuộc kháng chiến. Di tích giúp học sinh hiểu hơn về truyền thống yêu nước, tinh thần đoàn kết và ý chí độc lập của dân tộc.
                </p>
              </div>

              {/* Hồ Núi Cốc (VI) */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Hồ Núi Cốc – Vẻ đẹp thiên nhiên Thái Nguyên
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Hồ Núi Cốc nổi bật với mặt hồ rộng, nhiều đảo lớn nhỏ và cảnh quan núi non thơ mộng. Địa danh này gắn với truyền thuyết nàng Công – chàng Cốc, đồng thời là điểm đến du lịch, nghỉ dưỡng và khám phá thiên nhiên.
                </p>
              </div>

              {/* Hồ Ba Bể (VI) */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Hồ Ba Bể
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Hồ Ba Bể là thắng cảnh thiên nhiên nổi bật với mặt hồ trong xanh, núi đá vôi và hệ sinh thái phong phú. Sau khi Bắc Kạn sáp nhập với Thái Nguyên, hồ Ba Bể thuộc tỉnh Thái Nguyên hiện nay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MỤC 2 ===================== */}
        <section
          id="curriculum-muc-2"
          className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs space-y-6 scroll-mt-24 ${
            activeMục !== 'all' && activeMục !== 2 ? 'hidden' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Cột Trái: Tiếng Anh */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Section 2: Tangible and Intangible Cultural Heritage
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Section 2: Tangible and Intangible Cultural Heritage. Vietnam Museum of Ethnic Cultures.',
                      'en'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              {/* Vietnam Museum of Ethnic Cultures */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Vietnam Museum of Ethnic Cultures
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  The museum preserves and introduces a wide range of artifacts, traditional costumes, working tools, and cultural practices of Vietnam's ethnic groups. It helps students explore cultural diversity and develop a greater awareness of the importance of preserving cultural heritage.
                </p>
              </div>

              {/* Thai Hai Village */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Thái Hải Stilt House Ethnic Culture and Ecological Conservation Area
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Thái Hải introduces traditional stilt houses, community life, and the cultural traditions of the Tày people. The site combines the preservation of ethnic identity with cultural and tourism experiences.
                </p>
              </div>
            </div>

            {/* Cột Phải: Tiếng Việt */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Mục 2: Di sản văn hóa phi vật thể
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Mục 2: Di sản văn hóa phi vật thể. Bảo tàng Văn hóa các dân tộc Việt Nam. Khu bảo tồn làng nhà sàn sinh thái Thái Hải.',
                      'vi'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              </div>

              {/* Bảo tàng */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Bảo tàng Văn hóa các dân tộc Việt Nam
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Bảo tàng lưu giữ và giới thiệu nhiều hiện vật, trang phục, công cụ lao động và nét sinh hoạt truyền thống của các dân tộc. Đây là nơi giúp học sinh tìm hiểu sự đa dạng văn hóa và nâng cao ý thức bảo tồn di sản.
                </p>
              </div>

              {/* Làng Thái Hải */}
              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Khu bảo tồn làng nhà sàn sinh thái Thái Hải
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Thái Hải giới thiệu không gian nhà sàn, sinh hoạt cộng đồng và những nét văn hóa truyền thống của người Tày. Nơi đây kết hợp bảo tồn bản sắc dân tộc với hoạt động du lịch trải nghiệm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MỤC 3 ===================== */}
        <section
          id="curriculum-muc-3"
          className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs space-y-6 scroll-mt-24 ${
            activeMục !== 'all' && activeMục !== 3 ? 'hidden' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Cột Trái: Tiếng Anh */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Section 3: Ethnic Customs, Festivals, and Culture
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Section 3: Ethnic Customs, Festivals, and Culture. Lồng Tồng Festival and Then Singing.',
                      'en'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Lồng Tồng Festival
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  The Lồng Tồng Festival, also known as the Rice-Field Festival, is a traditional celebration of the Tày and Nùng ethnic groups. It expresses wishes for good harvests, prosperous lives, and community solidarity. Traditional activities may include còn throwing, folk games, and cultural performances.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Then Singing and Tính Lute
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Then singing, accompanied by the tính lute, is a traditional art form closely associated with the spiritual life of the Tày and Nùng people. These folk melodies help preserve ethnic languages, customs, and cultural identity.
                </p>
              </div>
            </div>

            {/* Cột Phải: Tiếng Việt */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Mục 3: Phong tục, lễ hội và văn hóa các dân tộc
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Mục 3: Phong tục, lễ hội và văn hóa các dân tộc. Lễ hội Lồng Tồng. Hát Then và đàn tính.',
                      'vi'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Lễ hội Lồng Tồng
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Lễ hội xuống đồng của đồng bào Tày, Nùng thể hiện mong ước mùa màng tốt tươi, cuộc sống no đủ và cộng đồng đoàn kết. Các hoạt động truyền thống có thể bao gồm ném còn, trò chơi dân gian và giao lưu văn nghệ.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Hát Then và đàn tính
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Hát Then cùng đàn tính là loại hình nghệ thuật truyền thống gắn với đời sống tinh thần của người Tày, Nùng. Những làn điệu dân gian góp phần lưu giữ tiếng nói, phong tục và bản sắc văn hóa dân tộc.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MỤC 4 ===================== */}
        <section
          id="curriculum-muc-4"
          className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs space-y-6 scroll-mt-24 ${
            activeMục !== 'all' && activeMục !== 4 ? 'hidden' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Cột Trái: Tiếng Anh */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Section 4: Traditional Crafts, Products, and Production Activities
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Section 4: Traditional Crafts, Products, and Production Activities. Tân Cương Tea-Growing Region and Tea Processing.',
                      'en'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Tân Cương Tea-Growing Region
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Tân Cương is famous for its lush green tea hills and tea products with a distinctive aroma and rich flavor. Tea cultivation and processing provide income for local residents and contribute to promoting the region's reputation.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Traditional Tea Cultivation and Processing
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Tea production involves several stages, including caring for tea plants, harvesting tea buds, processing the leaves, and packaging the finished products. Learning about this process helps students understand local livelihoods, the value of traditional products, and the importance of maintaining tea quality.
                </p>
              </div>
            </div>

            {/* Cột Phải: Tiếng Việt */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Mục 4: Làng nghề và sản phẩm
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Mục 4: Làng nghề và sản phẩm. Vùng chè Tân Cương. Nghề trồng và chế biến chè.',
                      'vi'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Vùng chè Tân Cương
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Tân Cương nổi tiếng với những đồi chè xanh và sản phẩm chè có hương thơm, vị đậm đặc trưng. Nghề trồng và chế biến chè vừa tạo thu nhập cho người dân, vừa góp phần quảng bá thương hiệu địa phương.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Nghề trồng và chế biến chè
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Hoạt động sản xuất chè gồm chăm sóc cây, thu hái búp, chế biến và đóng gói thành phẩm. Qua tìm hiểu quy trình này, học sinh hiểu hơn về lao động địa phương, giá trị sản phẩm truyền thống và vai trò của việc giữ gìn chất lượng chè.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MỤC 5 ===================== */}
        <section
          id="curriculum-muc-5"
          className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs space-y-6 scroll-mt-24 ${
            activeMục !== 'all' && activeMục !== 5 ? 'hidden' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Cột Trái: Tiếng Anh */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Section 5: History, Geography, and Socio-Economic Life
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Section 5: History, Geography, and Socio-Economic Life. Ba Be National Park and Nguom Rock Shelter.',
                      'en'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Ba Bể National Park
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Ba Bể National Park has a rich ecosystem of forests, lakes, and diverse wildlife. Learning about this area helps students recognize the value of natural resources and understand their responsibility to protect the environment.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Ngườm Rock Shelter
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed text-justify">
                  Ngườm Rock Shelter is a well-known archaeological site in the Võ Nhai area. It is important for studying the history of prehistoric human settlement. This site helps students explore the long history of the land of Thái Nguyên.
                </p>
              </div>
            </div>

            {/* Cột Phải: Tiếng Việt */}
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Mục 5: Lịch sử, địa lý và kinh tế - xã hội
                </h4>
                <button
                  onClick={() =>
                    handleSpeak(
                      'Mục 5: Lịch sử, địa lý và kinh tế - xã hội. Vườn quốc gia Ba Bể. Mái đá Ngườm.',
                      'vi'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Vườn quốc gia Ba Bể
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Đây là khu vực có hệ sinh thái rừng, hồ và nhiều loài sinh vật phong phú. Việc tìm hiểu Ba Bể giúp học sinh nhận thức được giá trị của tài nguyên thiên nhiên và trách nhiệm bảo vệ môi trường.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm sm:text-base text-stone-900">
                  Mái đá Ngườm
                </h5>
                <p className="text-sm text-stone-800 leading-relaxed text-justify">
                  Mái đá Ngườm là di chỉ khảo cổ nổi tiếng ở khu vực Võ Nhai, có giá trị trong việc nghiên cứu lịch sử cư trú của người tiền sử. Địa điểm này giúp học sinh tìm hiểu lịch sử lâu đời của vùng đất Thái Nguyên.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. Hình ảnh thực tế sinh động: Lễ hội Lồng Tồng & Sao chè truyền thống (Khớp ảnh 4 & 5) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Ảnh 1: Lễ hội Lồng Tồng */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-2">
          <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-16/10">
            <img
              src="/assets/aistudio/unnamed_e46da7b4.jpg"
              alt="Trò chơi dân gian tại Lễ hội Lồng Tồng truyền thống"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h5 className="font-bold text-xs sm:text-sm text-stone-900">
              Trò chơi dân gian tại Lễ hội Lồng Tồng truyền thống
            </h5>
            <p className="text-[11px] text-stone-500 italic">
              Không khí ngày hội xuống đồng rộn rã của đồng bào Tày, Nùng Thái Nguyên
            </p>
          </div>
        </div>

        {/* Ảnh 2: Sao chè thủ công */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-2">
          <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-16/10">
            <img
              src="/assets/aistudio/unnamed_39734513.jpg"
              alt="Nghệ nhân sao chè thủ công trên chảo gang"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h5 className="font-bold text-xs sm:text-sm text-stone-900">
              Nghệ nhân sao chè thủ công trên chảo gang truyền thống
            </h5>
            <p className="text-[11px] text-stone-500 italic">
              Đôi bàn tay khéo léo tạo nên hương cốm non nức tiếng Đệ nhất danh trà
            </p>
          </div>
        </div>
      </div>

      {/* 5. Khối Bản đồ Khám phá & Thử thách học tập (Khớp chuẩn xác ảnh 6 & 7) */}
      <div className="rounded-3xl bg-[#eaf5ef] border border-emerald-300/80 p-6 sm:p-10 shadow-sm space-y-8">
        {/* Header xanh đậm */}
        <div className="rounded-2xl bg-[#116149] text-white p-6 text-center space-y-2 shadow-sm">
          <div className="text-2xl">🗺️ 🌿 📍</div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            THAINGUYEN GEO-MAP
          </h3>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-200">
            KHÁM PHÁ GIÁO DỤC ĐỊA PHƯƠNG LỚP 8
          </p>
          <p className="text-xs text-emerald-100 opacity-95">
            Khám phá quê hương · Tích lũy kiến thức · Chinh phục thử thách
          </p>
        </div>

        {/* Hướng dẫn */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-100 space-y-2 text-xs sm:text-sm text-stone-700 shadow-xs">
          <div className="font-bold text-[#116149] flex items-center gap-2">
            <span>🎮</span>
            <span>HƯỚNG DẪN</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-stone-600">
            <li>Bấm vào một địa điểm để khám phá.</li>
            <li>Đọc thông tin giới thiệu.</li>
            <li>Chọn "Bắt đầu thử thách" để trả lời câu hỏi và ghi điểm.</li>
          </ol>
        </div>

        {/* 6 Nút địa điểm khám phá */}
        <div className="bg-white/80 rounded-2xl p-6 border border-emerald-100 space-y-3 shadow-xs">
          <div className="text-xs font-bold text-[#116149] uppercase tracking-wider flex items-center gap-1.5">
            <span>📍</span>
            <span>BẢN ĐỒ KHÁM PHÁ THÁI NGUYÊN</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'Hồ Núi Cốc', icon: '🏞️', placeId: 'nui-coc-lake' },
              { name: 'Đồi chè Tân Cương', icon: '🍃', placeId: 'tea-tan-cuong' },
              { name: 'ATK Định Hóa', icon: '🏛️', placeId: 'atk-dinh-hoa' },
              { name: 'Hồ Ba Bể', icon: '🌊', placeId: 'ba-be-lake' },
              { name: 'Văn hóa trà', icon: '🍵', placeId: 'tea-tan-cuong' },
              { name: 'Địa hình & thiên tai', icon: '⛰️', placeId: 'flood-cau-river' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (onSelectPlaceById) {
                    onSelectPlaceById(item.placeId);
                  }
                }}
                className="py-3 px-3 rounded-xl bg-white hover:bg-emerald-50 text-stone-800 hover:text-[#116149] border border-stone-200/90 font-bold text-xs sm:text-sm transition-all shadow-2xs hover:shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-stone-500 italic text-center pt-1">
            Lưu ý: Đây là bản đồ trò chơi minh họa, không thể hiện ranh giới địa lý theo tỷ lệ.
          </p>
        </div>

        {/* Thử thách nhà khám phá */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2">
              <span>🧠</span>
              <span>THỬ THÁCH NHÀ KHÁM PHÁ</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#116149]">
              Điểm của bạn: 0
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600">
            Trả lời các câu hỏi về địa phương để nhận điểm thưởng và mở khóa danh hiệu Nhà khám phá Thái Nguyên.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('section-quiz');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-[#116149] hover:bg-[#0e4e3a] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>▶</span>
              <span>Bắt đầu thử thách</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('section-quiz');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>🔄</span>
              <span>Chơi lại</span>
            </button>
          </div>

          <div className="rounded-xl bg-[#f5f8f5] p-3 text-center text-xs text-[#116149] font-medium border border-emerald-200/50">
            🌱 <strong>HỌC TẬP ĐỂ YÊU QUÊ HƯƠNG:</strong> Mỗi địa điểm là một câu chuyện. Mỗi câu trả lời đúng là một bước khám phá Thái Nguyên!
          </div>
        </div>
      </div>

      {/* 6. Ảnh Thực Tế Học Sinh Lớp 8 Đang Học GDĐP với THAINGUYEN Geo-Map (Khớp chuẩn xác ảnh 9, 10, 11) */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#116149] bg-emerald-50 px-3 py-1 rounded-full inline-block">
            Ứng Dụng Thực Tiễn Giảng Dạy
          </span>
          <h4 className="text-lg sm:text-xl font-extrabold text-stone-900">
            Học Sinh Lớp 8 Trải Nghiệm Học Tập với THAINGUYEN Geo-Map
          </h4>
          <p className="text-xs text-stone-500">
            Hình ảnh các tiết học môn Giáo dục địa phương Lớp 8 tại các trường THCS tỉnh Thái Nguyên
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs p-2">
            <div className="rounded-xl overflow-hidden aspect-4/3">
              <img
                src="/assets/aistudio/unnamed_6694c677.jpg"
                alt="Toàn cảnh lớp học môn GDĐP Lớp 8 với THAINGUYEN Geo-Map"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-stone-600 font-semibold text-center mt-2">
              Toàn cảnh lớp học môn GDĐP Lớp 8 với THAINGUYEN Geo-Map
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs p-2">
            <div className="rounded-xl overflow-hidden aspect-4/3">
              <img
                src="/assets/aistudio/unnamed_1159a186.jpg"
                alt="Học sinh báo cáo chuyên đề Thái Nguyên - Đệ nhất danh trà"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-stone-600 font-semibold text-center mt-2">
              Học sinh báo cáo chuyên đề "Thái Nguyên - Đệ nhất danh trà"
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs p-2">
            <div className="rounded-xl overflow-hidden aspect-4/3">
              <img
                src="/assets/aistudio/unnamed_8aea70b9.jpg"
                alt="Học sinh thao tác chỉ dẫn và tra cứu các địa danh trên bản đồ số"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-stone-600 font-semibold text-center mt-2">
              Học sinh tra cứu trực quan và thuyết trình trên bản đồ số
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
