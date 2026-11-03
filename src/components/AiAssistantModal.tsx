import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Volume2,
  Bot,
  User,
  Lightbulb,
  Compass,
  Square
} from 'lucide-react';
import { speechService } from '../utils/speech';
import { PLACES, FIVE_TEAS, CURRICULUM_SECTIONS } from '../data/geoData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text:
        lang === 'vi'
          ? 'Xin chào các em học sinh! Thầy/Cô là Trợ lý Ảo Học tập GDĐP Thái Nguyên. Em có thể hỏi thầy/cô về di tích ATK Định Hóa, Ngũ đại danh trà, hồ Ba Bể, hồ Núi Cốc hoặc kỹ năng phòng tránh ngập lụt, sạt lở đất nhé!'
          : 'Hello students! I am your Thai Nguyen Local Geo-AI Assistant. Ask me anything about ATK Dinh Hoa, the 5 Famous Teas, Ba Be Lake, or flood and landslide safety protocols!',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const samplePrompts = [
    {
      vi: 'Vì sao chè Tân Cương có hương cốm non và hậu ngọt sâu?',
      en: 'Why does Tan Cuong tea taste of fresh young rice?',
    },
    {
      vi: 'Ý nghĩa lịch sử của Di tích Lán Tỉn Keo (ATK Định Hóa)?',
      en: 'Historical significance of Tin Keo Hut at ATK Dinh Hoa?',
    },
    {
      vi: 'Kể tên "Ngũ Đại Danh Trà" của tỉnh Thái Nguyên?',
      en: 'What are the 5 Famous Tea Regions of Thai Nguyen?',
    },
    {
      vi: 'Các biện pháp an toàn khi nước lũ sông Cầu dâng cao?',
      en: 'What are safety rules when the Cau River floods?',
    },
    {
      vi: 'Di chỉ Mái đá Ngườm có giá trị khảo cổ thế nào?',
      en: 'Archaeological significance of Nguom Rock Shelter?',
    },
  ];

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputText).trim();
    if (!q) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputText('');
    setIsLoading(true);

    // Knowledge matching logic
    setTimeout(() => {
      const qLower = q.toLowerCase();
      let answer = '';

      if (qLower.includes('tân cương') || qLower.includes('tan cuong') || qLower.includes('hương cốm')) {
        answer =
          lang === 'vi'
            ? 'Vùng chè Tân Cương nổi tiếng với "hương cốm non, tiền chát dịu, hậu ngọt sâu" nhờ vào 3 yếu tố tự nhiên quý giá:\n1. Thổ nhưỡng: Đất sỏi cơm màu đỏ son pha sét dưới chân núi Tam Đảo có độ pH 4.5 - 5.5 rất giàu vi lượng.\n2. Nguồn nước: Nước tưới tự nhiên bắt nguồn từ hồ Núi Cốc và dòng sông Công mát lành.\n3. Nghệ thuật chế biến: Nghệ nhân địa phương áp dụng kỹ thuật xào diệt men bằng chảo gang và kỹ nghệ "đánh hương" lửa củi truyền thống, làm bừng nở hương thơm cốm ngào ngạt.'
            : 'Tan Cuong tea possesses its signature young green rice fragrance and lasting sweetness due to nutrient-rich reddish gravel clay soil nurtured by the Cong River under the Tam Dao foothills, combined with meticulous wood-fired pan de-enzyming and artisanal scenting.';
      } else if (qLower.includes('ngũ đại') || qLower.includes('5 vùng chè') || qLower.includes('five')) {
        answer =
          lang === 'vi'
            ? 'Ngũ Đại Danh Trà của Thái Nguyên gồm 5 vùng đặc sản nổi tiếng:\n1. Vùng chè Tân Cương: Đệ nhất danh trà, nước xanh vàng, hương cốm non.\n2. Vùng chè La Bằng: Dưới chân dãy Tam Đảo, khí hậu mát mẻ, nổi bật với 6 sản phẩm OCOP hữu cơ.\n3. Vùng chè Trại Cài (Đồng Hỷ): Đậm ngậy, bền nước qua nhiều lần châm, nước chè sánh vàng ven sông Sỏi.\n4. Vùng chè Khe Cốc (Phú Lương): Mô hình hợp tác xã chè hữu cơ sinh thái xanh bền vững.\n5. Vùng chè Shan tuyết Bằng Phúc: Cổ thụ vùng cao quanh năm ngậm sương mù mây phủ, búp ngậm tuyết trắng mịn.'
            : 'Thai Nguyen’s 5 Famous Tea Regions are: 1. Tan Cuong (Prime tea, young rice aroma); 2. La Bang (Tam Dao organic mountain tea); 3. Trai Cai (Rich savory body, long-lasting infusions); 4. Khe Coc (Sustainable cooperative tea); 5. Bang Phuc (Centuries-old ancient Shan Tuyet trees in mist).';
      } else if (qLower.includes('tỉn keo') || qLower.includes('atk') || qLower.includes('định hóa')) {
        answer =
          lang === 'vi'
            ? 'Tại lán Tỉn Keo (thuộc xã Phú Đình, huyện Định Hóa), vào ngày 6/12/1953, Chủ tịch Hồ Chí Minh đã chủ trì cuộc họp Bộ Chính trị lịch sử để thông qua Kế hoạch tác chiến Đông Xuân 1953–1954 và quyết định mở Chiến dịch Điện Biên Phủ “lừng lẫy năm châu, chấn động địa cầu”. Đây là mốc son chói lọi trong lịch sử dân tộc và là niềm tự hào của quê hương Thái Nguyên.'
            : 'At Tin Keo Hut in ATK Dinh Hoa, on December 6, 1953, President Ho Chi Minh chaired the Politburo meeting that finalized the 1953-1954 Winter-Spring military plan and launched the historic Dien Bien Phu Campaign.';
      } else if (qLower.includes('lũ') || qLower.includes('ngập') || qLower.includes('flood') || qLower.includes('sông cầu')) {
        answer =
          lang === 'vi'
            ? 'Khi xảy ra lũ lớn trên sông Cầu hoặc ngập úng nội thị TP. Thái Nguyên, học sinh cần tuyệt đối thực hiện:\n1. Không tò mò ra bờ sông ngắm lũ, bơi lội hoặc chèo thuyền vượt dòng xoáy.\n2. Ngắt cầu dao điện gia đình nếu nước tràn vào tầng một để phòng rò rỉ điện.\n3. Kê cao sách vở, đồ dùng học tập lên vị trí cao ráo.\n4. Không đi qua ngầm tràn, cầu sắt hoặc đoạn đường ngập sâu không rõ đáy.\n5. Khi cần cứu nạn khẩn cấp, gọi ngay số 112 hoặc 114.'
            : 'During Cau River floods: 1. Never approach riverbanks or swift waters; 2. Switch off home circuit breakers if ground floors flood; 3. Elevate study equipment; 4. Do not ford flooded spillways; 5. In emergency, dial 112 or 114.';
      } else if (qLower.includes('ngườm') || qLower.includes('khảo cổ') || qLower.includes('nguom')) {
        answer =
          lang === 'vi'
            ? 'Di chỉ Mái đá Ngườm (xã Thần Sa, huyện Võ Nhai) là cái nôi cư trú của người tiền sử từ thời kỳ đồ đá cũ, cách ngày nay khoảng 30.000 đến 40.000 năm. Các nhà khảo cổ đã tìm thấy hàng vạn công cụ đá cuội ghè đẽo (Văn hóa Ngườm), chứng minh Thái Nguyên là một trong những trung tâm định cư đầu tiên của loài người tại Việt Nam và Đông Nam Á.'
            : 'Nguom Rock Shelter in Than Sa, Vo Nhai dates back 30,000 to 40,000 years, yielding thousands of paleolithic pebble tools and proving Thai Nguyen to be an ancient cradle of early human civilization.';
      } else if (qLower.includes('ba bể') || qLower.includes('babe')) {
        answer =
          lang === 'vi'
            ? 'Hồ Ba Bể là hồ nước ngọt tự nhiên nằm trên núi đá vôi ở độ cao khoảng 145m so với mực nước biển, hình thành hơn 200 triệu năm trước. Mặt hồ gồm 3 phân khu: Pé Lèng, Pé Lù, Pé Lầm. Nơi đây là trung tâm của Vườn Quốc gia Ba Bể với hệ sinh thái rừng rậm nhiệt đới, hang Puông và các bản làng người Tày độc đáo như Pác Ngòi.'
            : 'Ba Be Lake is a natural karst mountain lake formed 200 million years ago, composed of three connected basins: Pe Leng, Pe Lu, and Pe Lam, surrounded by the rich Ba Be National Park.';
      } else {
        answer =
          lang === 'vi'
            ? `Về câu hỏi của em: "${q}".\nTrong chương trình Giáo dục địa phương tỉnh Thái Nguyên, các em được trang bị kiến thức về 5 chủ đề cốt lõi: 1. Các di tích lịch sử cách mạng như ATK Định Hóa; 2. Thắng cảnh tự nhiên Hồ Núi Cốc, Hồ Ba Bể; 3. Di sản văn hóa 54 dân tộc tại Bảo tàng Quốc gia & Làng Thái Hải; 4. Làng nghề truyền thống & Ngũ đại danh trà; 5. Phòng chống lũ lụt sông Cầu và sạt lở núi Tam Đảo. Em có thể bấm vào các thẻ trên bản đồ số để xem tọa độ và hình ảnh chi tiết!`
            : `Regarding your inquiry: In Local Education of Thai Nguyen, core topics cover historical sites (ATK Dinh Hoa), natural lakes (Nui Coc, Ba Be), 54 ethnic heritage, 5 Famous Tea Terroirs, and Cau River flood prevention protocols. Explore the interactive map layers for coordinates!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: answer,
        },
      ]);
      setIsLoading(false);
    }, 600);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text, lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col h-[85vh] max-h-[700px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0e5945] to-[#16805e] text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Bot className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">
                  {lang === 'vi' ? 'Trợ Lý AI Học Tập GDĐP Thái Nguyên' : 'Thai Nguyen Local Geo-AI Tutor'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                  GDĐP
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                {lang === 'vi' ? 'Hỏi đáp di tích, ngũ đại danh trà & địa lý số' : 'Curriculum Q&A, Teas & Geography'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              speechService.stop();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Prompts pills */}
        <div className="p-3 bg-stone-50 border-b border-stone-200 overflow-x-auto flex gap-2 scrollbar-none shrink-0">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(lang === 'vi' ? p.vi : p.en)}
              className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-[#116149] text-stone-700 text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>{lang === 'vi' ? p.vi : p.en}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm bg-white">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isAi
                      ? 'bg-[#116149] text-white shadow-sm'
                      : 'bg-stone-700 text-stone-100'
                  }`}
                >
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`relative max-w-[85%] p-3.5 sm:p-4 rounded-2xl whitespace-pre-line leading-relaxed ${
                    isAi
                      ? 'bg-[#f5f8f5] text-stone-800 border border-emerald-100'
                      : 'bg-[#116149] text-white font-medium shadow-sm'
                  }`}
                >
                  {m.text}

                  {isAi && m.id !== 'welcome' && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex items-center justify-end">
                      <button
                        onClick={() => handleSpeak(m.text)}
                        className="flex items-center gap-1 text-[11px] text-[#116149] font-bold hover:underline"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{lang === 'vi' ? 'Nghe giải thích' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-stone-500 p-2">
              <Bot className="w-4 h-4 text-[#116149] animate-spin" />
              <span>{lang === 'vi' ? 'Thầy/Cô đang suy nghĩ câu trả lời...' : 'Geo-AI is thinking...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                lang === 'vi'
                  ? 'Đặt câu hỏi về GDĐP Thái Nguyên...'
                  : 'Ask about Thai Nguyen Local Education...'
              }
              className="flex-1 px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#116149]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-2xl bg-[#116149] hover:bg-[#0e4e3a] disabled:opacity-40 text-white shadow-sm transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
