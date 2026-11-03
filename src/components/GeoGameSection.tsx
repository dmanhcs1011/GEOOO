import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Trophy,
  Star
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/geoData';

interface GeoGameSectionProps {
  lang: 'vi' | 'en';
}

export const GeoGameSection: React.FC<GeoGameSectionProps> = ({ lang }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(idx);
    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Confetti fallback
      }
    }
  };

  const handleRestart = () => {
    setQuestions([...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setIsCompleted(false);
  };

  const getRankBadge = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) {
      return {
        titleVi: '🏆 Trạng Nguyên Địa Lý Xứ Trà',
        titleEn: '🏆 Master Scholar of Thai Nguyen Geography',
        descVi: 'Xuất sắc! Bạn nắm vững mọi kiến thức lịch sử, danh thắng và văn hóa địa phương.',
        descEn: 'Outstanding! You have mastered local geography, heritage, and history.',
      };
    }
    if (percentage >= 70) {
      return {
        titleVi: '🎖️ Nhà Khám Phá Địa Phương Tinh Thông',
        titleEn: '🎖️ Expert Regional Explorer',
        descVi: 'Làm tốt lắm! Bạn hiểu rất sâu sắc về quê hương Thái Nguyên.',
        descEn: 'Great job! You have a profound understanding of your hometown.',
      };
    }
    return {
      titleVi: '🌱 Nhà Khám Phá Tập Sự',
      titleEn: '🌱 Apprentice Explorer',
      descVi: 'Bạn hãy đọc lại các bài học trong Bản đồ số và thử sức thêm một lần nữa nhé!',
      descEn: 'Review the Geo-Map textbook units and give it another try to achieve perfection!',
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner (Nền sáng) */}
      <div className="text-center space-y-1.5">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#116149] border border-emerald-200 inline-block">
          🎮 {lang === 'vi' ? 'Trò Chơi Học Tập GDĐP' : 'Local Education Geo Challenge'}
        </span>
        <h3 className="text-xl sm:text-3xl font-extrabold text-stone-900">
          {lang === 'vi' ? 'Thử Thách Nhà Khám Phá Thái Nguyên' : 'Thai Nguyen Explorer Challenge'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
          {lang === 'vi'
            ? '10 câu hỏi tương tác về di tích ATK, Ngũ đại danh trà, hồ Ba Bể, hồ Núi Cốc và kỹ năng an toàn thiên tai.'
            : '10 interactive quiz questions covering history, tea cultivars, lakes, and disaster safety.'}
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
          {/* Progress & Score Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#116149]" />
              <span>
                {lang === 'vi' ? 'Câu hỏi' : 'Question'} {currentIndex + 1} / {questions.length}
              </span>
            </span>

            <div className="flex items-center gap-2.5">
              {streak >= 2 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center gap-1 text-[11px]">
                  🔥 {streak} {lang === 'vi' ? 'liên tiếp' : 'streak'}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {lang === 'vi' ? 'Điểm:' : 'Score:'} {score}
              </span>
            </div>
          </div>

          {/* Progress line */}
          <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-[#116149] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-1">
            <h4 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
              {lang === 'vi' ? currentQ.qVi : currentQ.qEn}
            </h4>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {(lang === 'vi' ? currentQ.optionsVi : currentQ.optionsEn).map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === currentQ.correctIndex;
              const hasAnswered = selectedOption !== null;

              let btnStyle =
                'bg-stone-50 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-stone-800';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle =
                    'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnStyle =
                    'bg-rose-100 border-rose-300 text-rose-900';
                } else {
                  btnStyle = 'opacity-40 border-stone-100 bg-stone-50';
                }
              }

              return (
                <button
                  key={i}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full p-3.5 rounded-2xl text-left border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-xs shrink-0 text-stone-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner after answering */}
          {selectedOption !== null && (
            <div
              className={`p-4 rounded-2xl border transition-all animate-fadeIn ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-[#116149] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {lang === 'vi' ? 'Chính xác! +1 Điểm' : 'Correct! +1 Point'}
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {lang === 'vi' ? 'Chưa chính xác' : 'Not quite right'}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                💡 <b>{lang === 'vi' ? 'Giải thích:' : 'Explanation:'}</b>{' '}
                {lang === 'vi' ? currentQ.explanationVi : currentQ.explanationEn}
              </p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Làm lại từ đầu' : 'Restart'}</span>
            </button>

            {selectedOption !== null && (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#116149] hover:bg-[#0e4e3a] text-white font-bold text-xs sm:text-sm shadow-xs transition-transform hover:scale-105"
              >
                <span>
                  {currentIndex + 1 === questions.length
                    ? lang === 'vi'
                      ? 'Xem kết quả'
                      : 'View Results'
                    : lang === 'vi'
                    ? 'Câu tiếp theo'
                    : 'Next Question'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Board */
        <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 shadow-sm space-y-5 max-w-lg mx-auto animate-fadeIn">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#116149]">
              {lang === 'vi' ? 'Hoàn thành bài thử thách' : 'Challenge Completed'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              {getRankBadge().titleVi}
            </h3>
            <p className="text-xs text-stone-600 mt-1.5">
              {lang === 'vi' ? getRankBadge().descVi : getRankBadge().descEn}
            </p>
          </div>

          {/* Score Box */}
          <div className="p-5 rounded-2xl bg-[#eaf5ef] border border-emerald-200 space-y-1">
            <div className="text-3xl font-black text-[#116149] font-mono">
              {score} / {questions.length}
            </div>
            <p className="text-xs text-stone-600">
              {lang === 'vi'
                ? `Đạt tỉ lệ chính xác ${Math.round((score / questions.length) * 100)}%`
                : `${Math.round((score / questions.length) * 100)}% Accuracy Rate`}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3 rounded-2xl bg-[#116149] hover:bg-[#0e4e3a] text-white font-bold text-xs sm:text-sm shadow-xs transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Chơi lại thử thách mới' : 'Play Again'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
