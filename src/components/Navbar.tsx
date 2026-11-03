import React, { useEffect, useState } from 'react';
import {
  Map,
  BookOpen,
  Coffee,
  AlertTriangle,
  Award,
  Sparkles,
  Volume2,
  Square,
  Globe,
  Video
} from 'lucide-react';
import { speechService, SpeechState } from '../utils/speech';

export type ActiveTab = 'overview' | 'destinations' | 'map' | 'curriculum' | 'teas' | 'disaster' | 'quiz' | 'ai';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  lang: 'vi' | 'en';
  onLangToggle: () => void;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  lang,
  onLangToggle,
  onOpenAi,
}) => {
  const [speechState, setSpeechState] = useState<SpeechState>(speechService.getState());

  useEffect(() => {
    return speechService.subscribe(setSpeechState);
  }, []);

  const navItems = [
    {
      id: 'overview' as ActiveTab,
      labelVi: 'Trang chủ',
      labelEn: 'Overview',
      icon: Map,
    },
    {
      id: 'map' as ActiveTab,
      labelVi: 'Bản đồ 92 Xã/Phường',
      labelEn: 'Map & 92 Communes',
      icon: Map,
    },
    {
      id: 'destinations' as ActiveTab,
      labelVi: '01. Du lịch & Điểm đến',
      labelEn: '01. Tourism & Video',
      icon: Video,
    },
    {
      id: 'curriculum' as ActiveTab,
      labelVi: '02. Giáo dục địa phương',
      labelEn: '02. Local Education',
      icon: BookOpen,
    },
    {
      id: 'teas' as ActiveTab,
      labelVi: 'Ngũ Đại Danh Trà',
      labelEn: '5 Famous Teas',
      icon: Coffee,
    },
    {
      id: 'disaster' as ActiveTab,
      labelVi: '03. Khí hậu & Thiên tai',
      labelEn: '03. Climate & Hazards',
      icon: AlertTriangle,
    },
    {
      id: 'quiz' as ActiveTab,
      labelVi: 'Thử thách GDĐP',
      labelEn: 'Quiz Challenge',
      icon: Award,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-stone-800 border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title (Giống Google Sites gốc: THAINGUYEN Geo-Map) */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onTabChange('overview')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#116149] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-xl font-black text-white tracking-wider">TN</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[#116149]">
                  THAINGUYEN Geo-Map
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-[#eaf5ef] text-[#116149] border border-[#116149]/20 rounded-full">
                  GDĐP
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium truncate max-w-[200px] sm:max-w-none">
                {lang === 'vi'
                  ? 'Bản đồ tương tác số & Giáo dục địa phương Thái Nguyên'
                  : 'Digital Local Geography & Heritage of Thai Nguyen'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation (Nền sáng) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#116149] text-white shadow-xs'
                      : 'text-stone-700 hover:text-[#116149] hover:bg-[#eaf5ef]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? item.labelVi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Voice status, AI Study Tutor, Language Switch */}
          <div className="flex items-center gap-2">
            {speechState.isPlaying && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-full text-xs animate-pulse">
                <Volume2 className="w-3.5 h-3.5 text-[#116149]" />
                <span className="hidden sm:inline font-semibold">
                  {lang === 'vi' ? 'Đang đọc...' : 'Speaking...'}
                </span>
                <button
                  onClick={() => speechService.stop()}
                  title={lang === 'vi' ? 'Dừng giọng đọc' : 'Stop voice'}
                  className="hover:bg-emerald-200 p-0.5 rounded text-emerald-900"
                >
                  <Square className="w-3 h-3 fill-emerald-800" />
                </button>
              </div>
            )}

            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#116149] hover:bg-[#0e4e3a] text-white shadow-xs transition-transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'vi' ? 'Hỏi đáp AI' : 'Geo AI'}</span>
            </button>

            <button
              onClick={onLangToggle}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors"
              title={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
            >
              <Globe className="w-3.5 h-3.5 text-[#116149]" />
              <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Sub-row Navigation for smaller desktop & mobile */}
        <div className="flex xl:hidden overflow-x-auto py-2 gap-1 border-t border-stone-100 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#116149] text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? item.labelVi : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
