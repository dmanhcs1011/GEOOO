import React from 'react';

interface ExploreChallengeBannerProps {
  lang: 'vi' | 'en';
  onSelectPlaceById?: (placeId: string) => void;
  onStartQuiz?: () => void;
}

export const ExploreChallengeBanner: React.FC<ExploreChallengeBannerProps> = ({
  lang,
  onSelectPlaceById,
  onStartQuiz,
}) => {
  const explorePoints = [
    { nameVi: 'Hồ Núi Cốc', nameEn: 'Nui Coc Lake', icon: '🏞️', placeId: 'nui-coc-lake' },
    { nameVi: 'Đồi chè Tân Cương', nameEn: 'Tan Cuong Tea', icon: '🍃', placeId: 'tea-tan-cuong' },
    { nameVi: 'ATK Định Hóa', nameEn: 'ATK Dinh Hoa', icon: '🏛️', placeId: 'atk-dinh-hoa' },
    { nameVi: 'Hồ Ba Bể', nameEn: 'Ba Be Lake', icon: '🌊', placeId: 'ba-be-lake' },
    { nameVi: 'Văn hóa trà', nameEn: 'Tea Culture', icon: '🍵', placeId: 'tea-tan-cuong' },
    { nameVi: 'Địa hình & thiên tai', nameEn: 'Hazard Zones', icon: '⛰️', placeId: 'flood-cau-river' },
  ];

  const handleStart = () => {
    if (onStartQuiz) {
      onStartQuiz();
    } else {
      const quizContainer = document.getElementById('quiz-questions-card');
      if (quizContainer) {
        quizContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      {/* Khối Bản đồ Khám phá & Hướng dẫn Thử thách học tập (Chuyển xuống trước phần trò chơi) */}
      <div className="rounded-3xl bg-[#eaf5ef] border border-emerald-300/80 p-6 sm:p-10 shadow-sm space-y-8">
        {/* Header xanh đậm */}
        <div className="rounded-2xl bg-[#116149] text-white p-6 text-center space-y-2 shadow-sm">
          <div className="text-2xl">🗺️ 🌿 📍</div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            THAINGUYEN GEO-MAP
          </h3>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-200">
            {lang === 'vi' ? 'KHÁM PHÁ GIÁO DỤC ĐỊA PHƯƠNG' : 'LOCAL EDUCATION EXPLORER'}
          </p>
          <p className="text-xs text-emerald-100 opacity-95">
            {lang === 'vi'
              ? 'Khám phá quê hương · Tích lũy kiến thức · Chinh phục thử thách'
              : 'Discover your homeland · Build knowledge · Conquer challenges'}
          </p>
        </div>

        {/* Hướng dẫn */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-100 space-y-2 text-xs sm:text-sm text-stone-700 shadow-xs">
          <div className="font-bold text-[#116149] flex items-center gap-2">
            <span>🎮</span>
            <span>{lang === 'vi' ? 'HƯỚNG DẪN' : 'INSTRUCTIONS'}</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-stone-600">
            <li>{lang === 'vi' ? 'Bấm vào một địa điểm để khám phá trên bản đồ.' : 'Click on a location to explore on the map.'}</li>
            <li>{lang === 'vi' ? 'Đọc thông tin giới thiệu và lịch sử địa phương.' : 'Read historical and geographical annotations.'}</li>
            <li>{lang === 'vi' ? 'Chọn "Bắt đầu thử thách" để trả lời câu hỏi và ghi điểm.' : 'Select "Start Challenge" to answer questions and score.'}</li>
          </ol>
        </div>

        {/* 6 Nút địa điểm khám phá */}
        <div className="bg-white/80 rounded-2xl p-6 border border-emerald-100 space-y-3 shadow-xs">
          <div className="text-xs font-bold text-[#116149] uppercase tracking-wider flex items-center gap-1.5">
            <span>📍</span>
            <span>{lang === 'vi' ? 'BẢN ĐỒ KHÁM PHÁ THÁI NGUYÊN' : 'THAI NGUYEN EXPLORATION MAP'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {explorePoints.map((item, idx) => (
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
                <span>{lang === 'vi' ? item.nameVi : item.nameEn}</span>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-stone-500 italic text-center pt-1">
            {lang === 'vi'
              ? 'Lưu ý: Đây là bản đồ trò chơi minh họa, không thể hiện ranh giới địa lý theo tỷ lệ.'
              : 'Note: Illustrated thematic points for educational gameplay.'}
          </p>
        </div>

        {/* Thử thách nhà khám phá */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2">
              <span>🧠</span>
              <span>{lang === 'vi' ? 'THỬ THÁCH NHÀ KHÁM PHÁ' : 'EXPLORER CHALLENGE'}</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#116149]">
              {lang === 'vi' ? 'Sẵn sàng thử thách' : 'Ready for Challenge'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600">
            {lang === 'vi'
              ? 'Trả lời các câu hỏi về địa phương để nhận điểm thưởng và mở khóa danh hiệu Nhà khám phá Thái Nguyên ngay bên dưới.'
              : 'Answer regional questions below to earn score badges and become a Master Scholar of Thai Nguyen.'}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStart}
              className="px-5 py-2.5 rounded-xl bg-[#116149] hover:bg-[#0e4e3a] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>▶</span>
              <span>{lang === 'vi' ? 'Bắt đầu thử thách ngay' : 'Start Challenge Now'}</span>
            </button>
            <button
              onClick={handleStart}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>🔄</span>
              <span>{lang === 'vi' ? 'Làm mới câu hỏi' : 'Reset Quiz'}</span>
            </button>
          </div>

          <div className="rounded-xl bg-[#f5f8f5] p-3 text-center text-xs text-[#116149] font-medium border border-emerald-200/50">
            🌱 <strong>{lang === 'vi' ? 'HỌC TẬP ĐỂ YÊU QUÊ HƯƠNG:' : 'LEARNING TO LOVE OUR HOMELAND:'}</strong>{' '}
            {lang === 'vi'
              ? 'Mỗi địa điểm là một câu chuyện. Mỗi câu trả lời đúng là một bước khám phá Thái Nguyên!'
              : 'Each site holds a story. Each correct answer deepens your connection with Thai Nguyen!'}
          </div>
        </div>
      </div>
    </div>
  );
};
