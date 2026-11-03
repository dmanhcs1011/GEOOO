import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  HelpCircle,
  Layers,
  MapPin,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface TechGuideSectionProps {
  lang: 'vi' | 'en';
  onActivateLayer: (layer: 'tourism' | 'education' | 'disaster' | 'communes') => void;
}

export const TechGuideSection: React.FC<TechGuideSectionProps> = ({
  lang,
  onActivateLayer,
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const code3Buttons = `<!-- CÁCH TẠO 3 NÚT TƯƠNG ỨNG 3 LỚP NỘI DUNG TRÊN TRANG WEB -->
<!-- 1. Thanh 3 nút bấm HTML -->
<div class="layer-buttons">
  <button id="btnTour" class="btn active" onclick="switchLayer('tour')">
    🗺️ Lớp 1: Du lịch & Di tích
  </button>
  <button id="btnEdu" class="btn" onclick="switchLayer('edu')">
    📚 Lớp 2: Giáo dục địa phương
  </button>
  <button id="btnRisk" class="btn" onclick="switchLayer('risk')">
    ⚠️ Lớp 3: Khí hậu & Ngập lụt
  </button>
</div>

<!-- 2. Khối nội dung tương ứng bên dưới -->
<div id="content-tour" class="content-panel active">
  <h3>Địa điểm Du lịch & Thắng cảnh tiêu biểu</h3>
  <p>Hồ Ba Bể, Hồ Núi Cốc, ATK Định Hóa...</p>
</div>
<div id="content-edu" class="content-panel hidden">
  <h3>Nội dung GDĐP Lớp 8 & Ngũ đại danh trà</h3>
  <p>Vùng chè Tân Cương, La Bằng, Trại Cài...</p>
</div>
<div id="content-risk" class="content-panel hidden">
  <h3>Thông tin Khí hậu & Nguy cơ ngập lụt, sạt lở</h3>
  <p>Trọng điểm ngập sông Cầu, sạt lở núi Tam Đảo...</p>
</div>

<!-- 3. Đoạn JavaScript xử lý bật/tắt đồng bộ cả Bản đồ và Nội dung -->
<script>
  // Tạo 3 nhóm layer trên bản đồ Leaflet
  const tourLayer = L.layerGroup().addTo(map);
  const eduLayer = L.layerGroup().addTo(map);
  const riskLayer = L.layerGroup().addTo(map);

  function switchLayer(layerName) {
    // Ẩn tất cả nội dung web
    document.querySelectorAll('.content-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));

    // Hiện nội dung được chọn
    document.getElementById('content-' + layerName).classList.remove('hidden');

    // Cập nhật lớp trên bản đồ Leaflet
    if (layerName === 'tour') {
      map.addLayer(tourLayer);
      map.removeLayer(eduLayer);
      map.removeLayer(riskLayer);
      document.getElementById('btnTour').classList.add('active');
    } else if (layerName === 'edu') {
      map.removeLayer(tourLayer);
      map.addLayer(eduLayer);
      map.removeLayer(riskLayer);
      document.getElementById('btnEdu').classList.add('active');
    } else if (layerName === 'risk') {
      map.removeLayer(tourLayer);
      map.removeLayer(eduLayer);
      map.addLayer(riskLayer);
      document.getElementById('btnRisk').classList.add('active');
    }
  }
</script>`;

  const code92Communes = `// CÁCH TẠO BẢN ĐỒ 92 XÃ Ở THÁI NGUYÊN (SAU SÁP NHẬP) HIỂN THỊ NÚT BẤM ĐÚNG VỊ TRÍ
// Bước 1: Khởi tạo mảng dữ liệu 92 xã với tọa độ GPS thực tế [lat, lng]
const communes = [
  { name: 'Xã Tân Cương', district: 'TP. Thái Nguyên', lat: 21.5480, lng: 105.7480, type: 'Vùng chè' },
  { name: 'Xã La Bằng', district: 'Huyện Đại Từ', lat: 21.5720, lng: 105.6020, type: 'Chè Tam Đảo' },
  { name: 'Xã Phú Đình', district: 'Huyện Định Hóa', lat: 21.8988, lng: 105.6322, type: 'Di tích ATK' },
  { name: 'Xã Ba Bể', district: 'Vùng Ba Bể', lat: 22.4167, lng: 105.6167, type: 'Hồ Ba Bể' },
  { name: 'Xã Vô Tranh', district: 'Huyện Phú Lương', lat: 21.7250, lng: 105.7890, type: 'Chè Khe Cốc' },
  { name: 'Xã Thần Sa', district: 'Huyện Võ Nhai', lat: 21.6730, lng: 105.9920, type: 'Mái đá Ngườm' },
  // ... tổng cộng 92 xã phường
];

// Bước 2: Dùng vòng lặp tạo Marker / Nút bấm tương tác trên bản đồ Leaflet
const communeLayer = L.layerGroup().addTo(map);

communes.forEach(c => {
  // Tạo icon nút bấm tròn tương tác
  const iconHtml = \`<div class="commune-pin">\${c.name}</div>\`;
  const icon = L.divIcon({
    className: 'custom-commune-badge',
    html: iconHtml,
    iconSize: [80, 24]
  });

  // Đặt marker chính xác vào tọa độ [lat, lng]
  const marker = L.marker([c.lat, c.lng], { icon: icon });

  // Gắn sự kiện khi bấm nút: hiện Popup & phóng to đến xã
  marker.bindPopup(\`
    <div style="font-family: Arial; padding: 4px;">
      <h4 style="margin: 0; color: #116149;">\${c.name}</h4>
      <p style="margin: 4px 0; font-size: 12px;">Thuộc: \${c.district}</p>
      <span style="background: #eaf5ef; color: #116149; padding: 2px 6px; border-radius: 4px; font-size: 11px;">
        \${c.type}
      </span>
    </div>
  \`);

  marker.on('click', () => {
    map.flyTo([c.lat, c.lng], 13, { duration: 1 });
  });

  communeLayer.addLayer(marker);
});`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Title & Introduction */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            {lang === 'vi' ? 'Giải đáp Yêu cầu Kỹ thuật' : 'Technical Implementation Guide'}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            {lang === 'vi' ? 'Theo ảnh viết tay đính kèm' : 'Handwritten Notes Answered'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {lang === 'vi'
            ? 'Hướng Dẫn Chi Tiết & Giải Pháp Cho 2 Câu Hỏi Trong Ảnh Viết Tay'
            : 'Detailed Guide for the 2 Handwritten Questions'}
        </h1>

        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {lang === 'vi'
            ? 'Dưới đây là lời giải đáp kỹ thuật, nguyên lý lập trình và mã nguồn mẫu trực quan giúp bạn hoặc thầy cô dễ dàng xây dựng giao diện 3 nút chuyển lớp nội dung và hiển thị 92 nút bấm tương tác cho 92 xã phường của Thái Nguyên (sau khi sáp nhập).'
            : 'Step-by-step programming blueprints and copyable code solutions addressing both handwritten questions regarding 3-layer toggles and 92 interactive commune markers.'}
        </p>

        {/* Quick Demo Navigation Buttons */}
        <div className="pt-2 flex flex-wrap gap-2.5">
          <button
            onClick={() => onActivateLayer('tourism')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>👉 {lang === 'vi' ? 'Thử ngay Nút 1: Lớp Du Lịch' : 'Try Layer 1: Tourism'}</span>
          </button>
          <button
            onClick={() => onActivateLayer('education')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>👉 {lang === 'vi' ? 'Thử ngay Nút 2: Lớp GDĐP Lớp 8' : 'Try Layer 2: Education'}</span>
          </button>
          <button
            onClick={() => onActivateLayer('disaster')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>👉 {lang === 'vi' ? 'Thử ngay Nút 3: Lớp Thiên Tai' : 'Try Layer 3: Disaster'}</span>
          </button>
          <button
            onClick={() => onActivateLayer('communes')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>👉 {lang === 'vi' ? 'Xem 92 Xã / Phường Tương Tác' : 'View 92 Communes'}</span>
          </button>
        </div>
      </div>

      {/* Question 1 Solution Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Câu hỏi 1 / Question 1</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
            {lang === 'vi'
              ? '“Làm sao để có thể tạo 3 nút tương ứng với 3 lớp nội dung để khi bấm vào mỗi nút sẽ hiện từng nội dung trong trang web?”'
              : '“How to create 3 buttons corresponding to 3 content layers so clicking each button displays its respective content?”'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1.5">
            <div className="font-bold text-emerald-900 text-sm">1. Khởi tạo 3 Nhóm Layer</div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Dùng Leaflet <code>L.layerGroup()</code>: một nhóm chứa các marker Di tích, nhóm thứ hai chứa Vùng chè, nhóm thứ ba chứa Vùng ngập lụt & sạt lở.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1.5">
            <div className="font-bold text-emerald-900 text-sm">2. Gắn sự kiện `onclick`</div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Mỗi nút bấm HTML gọi hàm <code>switchLayer(layerName)</code> truyền tên lớp tương ứng ('tour', 'edu', 'risk').
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1.5">
            <div className="font-bold text-emerald-900 text-sm">3. Đồng bộ Giao diện Web</div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Hàm JS sẽ bật layer bản đồ tương ứng, đồng thời thêm class <code>hidden</code> vào các khối nội dung khác và bỏ <code>hidden</code> ở khối được chọn.
            </p>
          </div>
        </div>

        {/* Code Snippet 1 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-mono font-bold">HTML + JavaScript (Dùng cho Google Sites hoặc Web bất kỳ):</span>
            <button
              onClick={() => copyToClipboard(code3Buttons, 'q1')}
              className="flex items-center gap-1 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-semibold transition-colors"
            >
              {copiedSnippet === 'q1' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép mã</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-stone-900 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
            <code>{code3Buttons}</code>
          </pre>
        </div>
      </div>

      {/* Question 2 Solution Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Câu hỏi 2 / Question 2</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
            {lang === 'vi'
              ? '“Bản đồ 92 xã ở TN (sau khi đã sáp nhập với BC) làm sao để tạo thành hiển thị các nút bấm tương tác đúng vị trí?”'
              : '“How to display interactive buttons on the map for 92 communes in Thai Nguyen (after merger with Bac Kan) at their exact locations?”'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1.5">
            <div className="font-bold text-amber-900 text-sm">1. Chuẩn bị bảng Tọa độ 92 Xã</div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Mỗi xã/phường có cặp tọa độ GPS chuẩn: <code>lat</code> (Vĩ độ Bắc) và <code>lng</code> (Kinh độ Đông), ví dụ Xã Tân Cương là <code>[21.5480, 105.7480]</code>, Ba Bể là <code>[22.4167, 105.6167]</code>.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1.5">
            <div className="font-bold text-amber-900 text-sm">2. Biến Marker thành Nút bấm</div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Sử dụng <code>L.divIcon()</code> để biến marker thông thường thành một nhãn nút bấm có tên xã, hiệu ứng hover, và bo tròn hiện đại.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1.5">
            <div className="font-bold text-amber-900 text-sm">3. Thêm Tương tác Phóng to</div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Gắn sự kiện <code>marker.on('click')</code> để gọi <code>map.flyTo([lat, lng], 13)</code> phóng to mượt mà và mở Popup chứa thông tin chi tiết.
            </p>
          </div>
        </div>

        {/* Code Snippet 2 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-mono font-bold">Mã JavaScript tạo 92 nút bấm trên bản đồ số:</span>
            <button
              onClick={() => copyToClipboard(code92Communes, 'q2')}
              className="flex items-center gap-1 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-semibold transition-colors"
            >
              {copiedSnippet === 'q2' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép mã</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-stone-900 text-amber-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
            <code>{code92Communes}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
