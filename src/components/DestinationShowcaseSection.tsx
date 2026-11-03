import React, { useState } from 'react';
import {
  Volume2,
  Video,
  Link as LinkIcon,
  Check,
  MapPin,
  ExternalLink,
  RotateCcw,
  Compass
} from 'lucide-react';
import { speechService } from '../utils/speech';

export interface DestinationItem {
  id: string;
  index: number;
  nameVi: string;
  nameEn: string;
  placeId?: string;
  descVi: string;
  descEn: string;
  img1: string;
  img1CaptionVi: string;
  img2: string;
  img2CaptionVi: string;
  youtubeUrl: string;
  videoTitle: string;
  mapEmbedUrl: string;
  layoutVariant: 'variant-1' | 'variant-2' | 'variant-3';
}

export function getYoutubeEmbedUrl(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();

  if (trimmed.includes('youtube.com/embed/')) {
    return trimmed;
  }

  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&modestbranding=1`;
  }

  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0&modestbranding=1`;
  }

  const pathMatch = trimmed.match(/youtube\.com\/(?:v|embed)\/([a-zA-Z0-9_-]+)/);
  if (pathMatch && pathMatch[1]) {
    return `https://www.youtube.com/embed/${pathMatch[1]}?rel=0&modestbranding=1`;
  }

  if (/^[a-zA-Z0-9_-]{10,15}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}?rel=0&modestbranding=1`;
  }

  return trimmed;
}

export const EXACT_DESTINATIONS: DestinationItem[] = [
  // 1. Hồ Núi Cốc (Ảnh 8: image_686d4d89.png)
  {
    id: 'nui-coc-lake',
    index: 1,
    nameVi: 'Hồ Núi Cốc',
    nameEn: 'Nui Coc Lake',
    placeId: 'nui-coc-lake',
    layoutVariant: 'variant-1',
    descVi:
      'Hồ Núi Cốc là một điểm du lịch nổi tiếng của tỉnh Thái Nguyên, hấp dẫn du khách bởi mặt hồ xanh biếc, những hòn đảo lớn nhỏ và khung cảnh núi non thơ mộng. Nơi đây gắn liền với truyền thuyết tình yêu nàng Công – chàng Cốc, mang đậm nét văn hóa dân gian. Du khách đến Hồ Núi Cốc có thể đi thuyền ngắm cảnh, vui chơi giải trí và tận hưởng không khí trong lành. Đây là điểm đến lý tưởng để khám phá vẻ đẹp thiên nhiên và quảng bá du lịch Thái Nguyên.',
    descEn:
      'Nui Coc Lake is a famous tourist destination in Thai Nguyen Province, attracting visitors with its crystal-clear blue waters, numerous large and small islands, and picturesque mountain scenery. The lake is associated with the folk legend of the tragic love story between Lady Cong and Lord Coc, reflecting the region\'s rich traditional culture. Visitors to Nui Coc Lake can take boat trips to admire the scenery, enjoy recreational activities, and breathe in the fresh air. It is an ideal destination for discovering the beauty of nature and promoting tourism in Thai Nguyen.',
    img1:
      '/assets/aistudio/3ho-nui-coc_317fda3e.jpg',
    img1CaptionVi: 'Cổng chào Khu du lịch Huyền thoại Hồ Núi Cốc',
    img2:
      '/assets/aistudio/H__n__c_gi_a___i_xanh_l_c_ho_ng_h_n_794aeff3.png',
    img2CaptionVi: 'Toàn cảnh vẻ đẹp kỳ vĩ của Hồ Núi Cốc nhìn từ trên cao',
    youtubeUrl: 'https://www.youtube.com/embed/A5RVxqSRESU',
    videoTitle: 'Phát triển du lịch Hồ Núi Cốc | Báo và Phát thanh Truyền hình Thái Nguyên',
    mapEmbedUrl: 'https://maps.google.com/maps?q=21.5750,105.7100&z=13&output=embed',
  },

  // 2. Đồi chè Tân Cương (Ảnh 7 & 1: image_d6d230ee.png, image_8adb6459.png)
  {
    id: 'doi-che-tan-cuong',
    index: 2,
    nameVi: 'Đồi chè Tân Cương',
    nameEn: 'Tan Cuong Tea Hills',
    placeId: 'tea-tan-cuong',
    layoutVariant: 'variant-2',
    descVi:
      'Đồi chè Tân Cương là địa điểm du lịch nổi tiếng của tỉnh Thái Nguyên, được biết đến với những đồi chè xanh mướt trải dài trên các sườn đồi. Nơi đây có khí hậu và thổ nhưỡng phù hợp để trồng chè, tạo nên hương vị trà thơm ngon đặc trưng. Du khách đến đây có thể tham quan đồi chè, tìm hiểu quy trình trồng và chế biến chè, trải nghiệm hái chè và thưởng thức trà. Đồi chè Tân Cương không chỉ góp phần phát triển du lịch mà còn quảng bá thương hiệu chè Thái Nguyên đến với du khách trong và ngoài nước.',
    descEn:
      'Tan Cuong Tea Hills is a famous tourist destination in Thai Nguyen Province, known for its lush green tea hills stretching across the slopes. The local climate and soil are ideal for growing tea, producing tea with a distinctive and delicious flavor. Visitors can explore the tea hills, learn about the process of growing and processing tea, experience tea picking, and enjoy tasting tea. Tan Cuong Tea Hills not only contributes to tourism development but also promotes the Thai Nguyen tea brand to domestic and international visitors.',
    img1:
      'https://dltm-cdn.vnptit3.vn/resources/portal/Images/TNN/namdan.tnn/Thang82022/%C4%90i%E1%BB%83mdul%E1%BB%8Bchc%E1%BB%99ng%C4%91%E1%BB%93ngx%C3%A3T%C3%A2nC%C6%B0%C6%A1ng/1_637974763093762926.png',
    img1CaptionVi: 'Những người nông dân hái búp chè xanh trên sườn đồi Tân Cương',
    img2:
      'https://i0.wp.com/loctancuong.com/wp-content/uploads/2024/01/doi-che-thai-nguyen.jpg?resize=700%2C393&ssl=1',
    img2CaptionVi: 'Đồi chè Tân Cương với những đường cong uốn lượn tuyệt đẹp',
    youtubeUrl: 'https://www.youtube.com/embed/yG8jXfO5bE8',
    videoTitle: 'Đồi chè Tân Cương - Tiến Yên Farmstay - Thái Nguyên',
    mapEmbedUrl: 'https://maps.google.com/maps?q=21.5480,105.7480&z=14&output=embed',
  },

  // 3. Hồ Ba Bể (Ảnh 2: image_aa3aeaf4.png)
  {
    id: 'ba-be-lake',
    index: 3,
    nameVi: 'Hồ Ba Bể',
    nameEn: 'Ba Be Lake',
    placeId: 'ba-be-lake',
    layoutVariant: 'variant-3',
    descVi:
      'Hồ Ba Bể là hồ nước ngọt tự nhiên lớn nhất Việt Nam, nằm trong lõi của Vườn quốc gia Ba Bể thuộc xã Nam Mẫu, huyện Ba Bể, tỉnh Bắc Kạn. Được hình thành cách đây hơn 200 triệu năm do những biến động địa chất đặc biệt, hồ nằm ở độ cao khoảng 145 mét so với mực nước biển và được bao bọc bởi những dãy núi đá vôi hùng vĩ cùng cánh rừng nguyên sinh xanh ngút ngàn. Tên gọi Ba Bể bắt nguồn từ tiếng địa phương là "Slam Pé", có nghĩa là ba hồ, do nơi đây là điểm hội tụ của ba nhánh sông Pé Lầm, Pé Lù và Pé Lèng. Với diện tích mặt nước khoảng 500 héc-ta cùng chiều dài hơn 8 ki-lô-mét, hồ hiện lên như một bức tranh thủy mặc khổng lồ, hoang sơ và thơ mộng với dòng nước trong xanh, mát mẻ quanh năm. Không chỉ sở hữu hệ sinh thái đa dạng, là một khu Ramsar thế giới và từng được quốc tế xếp hạng trong top 20 hồ nước ngọt đẹp nhất thế giới cần được bảo vệ, hồ Ba Bể còn gắn liền với câu chuyện cổ tích "Sự tích hồ Ba Bể" đầy nhân văn cùng những nét văn hóa đặc sắc của đồng bào dân tộc Tày nơi đây.',
    descEn:
      'Ba Be Lake is the largest natural freshwater lake in Vietnam, located in the core zone of Ba Be National Park in Nam Mau Commune, Ba Be District, Bac Kan Province. Formed more than 200 million years ago due to special geological updates, the lake sits at an altitude of about 145 meters above sea level and is surrounded by majestic limestone mountains and lush, vast primeval forests. The name Ba Be originates from the local ethnic term "Slam Pe", which means "three lakes", as it is the confluence of three river branches: Pe Lam, Pe Lu, and Pe Leng. With a water surface area of around 500 hectares and a length of over 8 kilometers, the lake appears like a giant, pristine, and poetic ink wash painting with crystal-clear, cool water all year round. Not only does it possess a highly diverse ecosystem—designated as a global Ramsar site and once ranked among the world\'s top 20 beautiful freshwater lakes that need protection—but Ba Be Lake is also deeply intertwined with the profoundly humane legend of "The Story of Ba Be Lake" and the unique cultural heritage of the local Tay ethnic people.',
    img1:
      'https://www.babenationalpark.com.vn/UserFiles/image/2025/Ba-Be-Lake.png',
    img1CaptionVi: 'Mặt hồ Ba Bể xanh biếc uốn lượn giữa những dãy núi đá vôi',
    img2:
      'https://imgcdn.bokun.tools/2422f3a0-9be9-4dbe-b45a-86d696283399.jpg',
    img2CaptionVi: 'Khung cảnh thơ mộng hữu tình tại Vườn quốc gia Ba Bể',
    youtubeUrl: 'https://www.youtube.com/embed/7Tf7G9uKz1w',
    videoTitle: 'Khám phá Vườn quốc gia Ba Bể - Viên ngọc xanh Việt Bắc',
    mapEmbedUrl: 'https://maps.google.com/maps?q=22.4167,105.6167&z=13&output=embed',
  },

  // 4. Suối Cửa Tử (Ảnh 3 & 4: image_658e9ce8.png, image_923687eb.png)
  {
    id: 'suoi-cua-tu',
    index: 4,
    nameVi: 'Suối Cửa Tử',
    nameEn: 'Cua Tu Stream',
    placeId: 'tea-la-bang',
    layoutVariant: 'variant-1',
    descVi:
      'Suối Cửa Tử là một địa điểm trekking hoang sơ và đầy thử thách, nằm ở xã La Bằng, huyện Đại Từ, tỉnh Thái Nguyên, cách trung tâm thành phố Thái Nguyên khoảng 45km. Nằm nép mình bên sườn Đông của dãy Tam Đảo hùng vĩ, dòng suối này tựa như một dải lụa mượt mà len lỏi qua những vách đá vôi dựng đứng và các tán rừng cổ thụ rậm rạp. Cái tên "Cửa Tử" bắt nguồn từ địa thế độc đáo, khi sâu vào trong chỉ có một đường đi duy nhất dọc theo lòng suối, nước chảy xiết và hiểm trở. Dòng suối gồm có 7 cửa ghềnh (thường được gọi là từ Cửa 1 đến Cửa 7), mỗi chặng mang một vẻ đẹp khác nhau từ những máng trượt đá tự nhiên, những hồ nước trong vắt sâu thẳm đến các thác nước đổ xuống trắng xóa. Nhờ khí hậu quanh năm mát mẻ, dòng nước mát lạnh sảng khoái và cảnh sắc thiên nhiên nguyên thủy chưa có bàn tay nhân tạo, suối Cửa Tử đã trở thành "thánh địa" lý tưởng cho những ai đam mê mạo hiểm, trốn khỏi khói bụi đô thị để thử thách bản thân với các hoạt động lội suối, leo thác và cắm trại giữa đại ngàn.',
    descEn:
      'Cua Tu Stream is a pristine and challenging trekking destination, located in La Bang Commune, Dai Tu District, Thai Nguyen Province, about 45 kilometers from Thai Nguyen city center. Nestled along the eastern slope of the majestic Tam Dao mountain range, this stream resembles a smooth silk ribbon weaving through vertical limestone cliffs and dense, ancient forests. The name "Cua Tu" (meaning "Death\'s Door") originates from its unique, single-access terrain; venture deep inside, and there is only one way out following the stream bed, where the water flows swiftly and treacherous landscapes await. The stream consists of 7 sections (commonly referred to as Door 1 to Door 7), with each stretch offering a distinct beauty ranging from natural stone slides and deep, crystal-clear pools to cascading, white-water waterfalls. Thanks to its year-round cool climate, refreshing cold water, and untouched, primordial natural beauty, Cua Tu Stream has become an ideal "sanctuary" for adventure enthusiasts looking to escape urban dust and challenge themselves with stream wading, waterfall climbing, and camping amidst the vast wilderness.',
    img1: '/assets/aistudio/OIP_255c917f.webp',
    img1CaptionVi: 'Thác nước trắng xóa giữa vách đá và thảm thực vật xanh ngát Suối Cửa Tử',
    img2: '/assets/aistudio/OIP_a3b3e3fb.jpg',
    img2CaptionVi: 'Hồ nước tự nhiên trong vắt xanh màu ngọc bích tuyệt đẹp tại Suối Cửa Tử',
    youtubeUrl: 'https://www.youtube.com/embed/g141Zt2i7a4',
    videoTitle: 'Trekking khám phá vẻ đẹp hoang sơ của Suối Cửa Tử (La Bằng)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=21.5720,105.5800&z=14&output=embed',
  },

  // 5. Khu di tích Quốc gia đặc biệt ATK Định Hóa (Ảnh 5: image_cd0506fa.png)
  {
    id: 'atk-dinh-hoa',
    index: 5,
    nameVi: 'Khu di tích Quốc gia đặc biệt ATK Định Hóa',
    nameEn: 'ATK Dinh Hoa Special National Historical Relic Site',
    placeId: 'atk-dinh-hoa',
    layoutVariant: 'variant-2',
    descVi:
      'Khu di tích Quốc gia đặc biệt ATK Định Hóa là một "địa chỉ đỏ" thiêng liêng và là trung tâm của Chiến khu Việt Bắc năm xưa, thuộc địa bàn huyện Định Hóa, tỉnh Thái Nguyên. Nằm ở vùng giáp ranh giữa ba tỉnh Thái Nguyên, Tuyên Quang và Bắc Kạn, nơi đây sở hữu địa thế hiểm trở "tiến khả dĩ công, thoái khả dĩ thủ" với núi rừng bạt ngàn và lòng dân kiên trung, được Chủ tịch Hồ Chí Minh cùng Trung ương Đảng chọn làm căn cứ địa cách mạng trong thời kỳ kháng chiến chống thực dân Pháp (1946 - 1954). ATK Định Hóa gồm một quần thể các di tích lịch sử quan trọng như lán Tỉn Keo (nơi Bác Hồ chủ trì bộ chính trị quyết định mở chiến dịch Điện Biên Phủ), đồi Khau Tý (nơi ở và làm việc đầu tiên của Bác tại ATK), di tích Khuôn Tát, và Nhà tưởng niệm Chủ tịch Hồ Chí Minh trên đỉnh đèo De. Trải qua thời gian, chiến khu xưa nay đã trở thành khu di tích lịch sử sinh thái thu hút đông đảo du khách thập phương đến tham quan, về nguồn để tìm hiểu về một thuở gian lao nhưng anh dũng của dân tộc, đồng thời tận hưởng cảnh sắc thiên nhiên trong lành và khám phá nét văn hóa độc đáo của đồng bào các dân tộc Tày, Nùng nơi đây.',
    descEn:
      'The ATK Dinh Hoa Special National Historical Relic Site is a sacred "red address" and the heart of the former Viet Bac Revolutionary Base, located in Dinh Hoa District, Thai Nguyen Province. Situated at the border of three provinces—Thai Nguyen, Tuyen Quang, and Bac Kan—this area features a strategic and treacherous terrain well-described as "capable of advance to attack, and retreat to defend." Surrounded by vast forests and sustained by the unyielding loyalty of the local people, it was chosen by President Ho Chi Minh and the Party Central Committee as the revolutionary headquarters during the resistance war against French colonialists (1946 - 1954). ATK Dinh Hoa comprises a complex of crucial historical relics, including Tin Keo Hut (where President Ho Chi Minh chaired the Politburo meeting to launch the Dien Bien Phu Campaign), Khau Ty Hill (the President\'s first working place in ATK), the Khuon Tat relic, and the President Ho Chi Minh Commemorative House on the peak of De Pass. Over time, the old war zone has transformed into an eco-historical relic site, attracting crowds of visitors from all over who come on pilgrimage to learn about a challenging yet heroic era of the nation, while enjoying the fresh natural scenery and exploring the unique cultural heritage of the local Tay and Nung ethnic groups.',
    img1:
      'https://cdn.baophapluat.vn/w3840/uploaded/vuthilanh/2020_12_11/lan-tin-keo_wlkp.jpg',
    img1CaptionVi: 'Lán Tỉn Keo - Nơi Bác Hồ và Bộ Chính trị họp bàn kế hoạch Đông Xuân',
    img2:
      'https://file3.qdnd.vn/data/images/0/2022/10/24/nguyenminhhai/lan-tin-keo.jpg',
    img2CaptionVi: 'Cảnh sắc rừng xanh và di tích lịch sử ATK Định Hóa',
    youtubeUrl: 'https://www.youtube.com/embed/W-zUqZ6n1x0',
    videoTitle: 'Thủ đô gió ngàn ATK Định Hóa - Căn cứ địa cách mạng',
    mapEmbedUrl: 'https://maps.google.com/maps?q=21.8710,105.6235&z=14&output=embed',
  },

  // 6. Bảo tàng Văn hóa các dân tộc Việt Nam (Ảnh 6: image_d851bcd9.png)
  {
    id: 'museum-cultures',
    index: 6,
    nameVi: 'Bảo tàng Văn hóa các dân tộc Việt Nam',
    nameEn: 'Vietnam Museum of Ethnic Cultures',
    placeId: 'museum-cultures',
    layoutVariant: 'variant-3',
    descVi:
      'Bảo tàng Văn hóa các dân tộc Việt Nam là một trong bảy bảo tàng quốc gia của Việt Nam, tọa lạc ngay giữa trung tâm thành phố Thái Nguyên, tỉnh Thái Nguyên. Được thành lập vào năm 1960 với tên gọi ban đầu là Bảo tàng Việt Bắc, nơi đây là một công trình kiến trúc quy mô và là trung tâm lưu giữ, trưng bày những di sản văn hóa quý báu của đại gia đình 54 dân tộc anh em. Bảo tàng sở hữu khuôn viên rộng lớn bao gồm hệ thống trưng bày trong nhà với 5 gian phòng được thiết kế hiện đại, tái hiện sinh động cảnh quan, trang phục, công cụ lao động và đời sống tâm linh của các nhóm ngôn ngữ - tộc người từ miền núi phía Bắc đến vùng đồng bằng và Tây Nguyên. Điểm nhấn đặc biệt của bảo tàng là khu trưng bày ngoài trời rộng hàng héc-ta, nơi phục dựng nguyên bản các nếp nhà truyền thống của người Tày, Mông, Chăm, Ba Na, và vùng đồng bằng Bắc Bộ, kết hợp với các không gian trải nghiệm văn hóa ẩm thực và trò chơi dân gian. Không chỉ là điểm đến lý tưởng để nghiên cứu, giáo dục lịch sử và nhân học, bảo tàng còn là một biểu tượng văn hóa độc đáo, thu hút đông đảo du khách trong và ngoài nước đến khám phá trọn vẹn nét đẹp đa dạng trong sự thống nhất của nền văn hóa Việt Nam.',
    descEn:
      'The Vietnam Museum of Ethnic Cultures is one of the seven national museums of Vietnam, located right in the heart of Thai Nguyen city center. Founded in 1960 as Viet Bac Museum, this grand architectural institution preserves and exhibits invaluable cultural treasures of the 54 ethnic groups of Vietnam. It features 5 modern indoor exhibition halls depicting costumes, tools, and spiritual traditions, accompanied by an extensive outdoor park recreating original vernacular stilt houses, Cham structures, and cultural performance spaces.',
    img1:
      'https://dltm-cdn.vnptit3.vn/resources/portal//Images/TNN/thienvn.tnn/b%E1%BA%A3o%20t%C3%A0ng/giaikkdieuthenngayxuanngochai_637653362495836859.jpg',
    img1CaptionVi: 'Không gian trưng bày trang phục và lễ hội truyền thống 54 dân tộc',
    img2:
      'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2021/04/lang-nha-san-thai-hai-1.jpg',
    img2CaptionVi: 'Khuôn viên ngoài trời phục dựng nhà sàn truyền thống',
    youtubeUrl: 'https://www.youtube.com/embed/4o9LwGvJk70',
    videoTitle: 'Khám phá kho tàng di sản tại Bảo tàng Văn hóa các Dân tộc Việt Nam',
    mapEmbedUrl: 'https://maps.google.com/maps?q=21.5942,105.8423&z=15&output=embed',
  },
];

interface DestinationShowcaseSectionProps {
  lang: 'vi' | 'en';
  onSelectPlaceById?: (placeId: string) => void;
}

export const DestinationShowcaseSection: React.FC<DestinationShowcaseSectionProps> = ({
  lang,
  onSelectPlaceById,
}) => {
  const [activeDestId, setActiveDestId] = useState<string>('nui-coc-lake');
  const [viewMode, setViewMode] = useState<'all' | 'single'>('all');

  // Allow custom YouTube URL changes per destination
  const [customVideoUrls, setCustomVideoUrls] = useState<Record<string, string>>({});
  const [editingDestId, setEditingDestId] = useState<string | null>(null);
  const [tempUrlInput, setTempUrlInput] = useState<string>('');

  const currentDest =
    EXACT_DESTINATIONS.find((d) => d.id === activeDestId) || EXACT_DESTINATIONS[0];

  const handleStartEdit = (destId: string, currentUrl: string) => {
    setEditingDestId(destId);
    setTempUrlInput(customVideoUrls[destId] || currentUrl);
  };

  const handleSaveVideoUrl = (destId: string) => {
    if (tempUrlInput.trim()) {
      setCustomVideoUrls((prev) => ({
        ...prev,
        [destId]: tempUrlInput.trim(),
      }));
    }
    setEditingDestId(null);
  };

  const handleResetVideoUrl = (destId: string) => {
    setCustomVideoUrls((prev) => {
      const copy = { ...prev };
      delete copy[destId];
      return copy;
    });
    setEditingDestId(null);
  };

  const handleSpeak = (text: string, speakLang: 'vi' | 'en') => {
    speechService.speak(text, speakLang);
  };

  // Render each destination card strictly adhering to the Google Sites screenshots layout
  const renderItem = (item: DestinationItem) => {
    const activeVideoSrc = customVideoUrls[item.id] || item.youtubeUrl;
    const embedUrl = getYoutubeEmbedUrl(activeVideoSrc);

    return (
      <div
        key={item.id}
        id={`destination-item-${item.id}`}
        className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-xs space-y-6 scroll-mt-24"
      >
        {/* Top Control Bar for this Location */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#116149] text-white flex items-center justify-center font-black text-sm">
              0{item.index}
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-tight">
                Địa điểm {item.index}: {item.nameVi}
              </h3>
              <span className="text-[11px] text-stone-500 font-medium">
                {item.nameEn}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.placeId && onSelectPlaceById && (
              <button
                onClick={() => onSelectPlaceById(item.placeId!)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eaf5ef] hover:bg-emerald-100 text-[#116149] text-xs font-bold transition-colors cursor-pointer"
                title="Ghim & Xem trên bản đồ số"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Xem trên bản đồ</span>
              </button>
            )}

            <button
              onClick={() => handleStartEdit(item.id, item.youtubeUrl)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Thay đổi link video YouTube"
            >
              <LinkIcon className="w-3 h-3 text-[#116149]" />
              <span className="hidden sm:inline">Đổi video YouTube</span>
            </button>
          </div>
        </div>

        {/* Modal / Bar to edit YouTube Link if requested */}
        {editingDestId === item.id && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#116149] flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                <span>Dán link YouTube cho Địa điểm {item.index} ({item.nameVi}):</span>
              </span>
              <span className="text-[11px] text-stone-500">
                (Dán link từ Google Sites hoặc YouTube)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={tempUrlInput}
                onChange={(e) => setTempUrlInput(e.target.value)}
                placeholder="Ví dụ: https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#116149]"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleSaveVideoUrl(item.id)}
                  className="px-4 py-2 rounded-xl bg-[#116149] hover:bg-[#0e4e3a] text-white text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Lưu video</span>
                </button>
                <button
                  onClick={() => handleResetVideoUrl(item.id)}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium flex items-center gap-1 transition-all"
                  title="Khôi phục video mặc định"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mặc định</span>
                </button>
                <button
                  onClick={() => setEditingDestId(null)}
                  className="px-2.5 py-2 rounded-xl text-stone-500 hover:text-stone-800 text-xs"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 
          LAYOUT CHUẨN XÁC Y NHƯ TRONG CÁC ẢNH CHỤP GOOGLE SITES:
          Grid 2 cột đối xứng:
          - Khối văn bản Tiếng Việt / Tiếng Anh
          - Hình ảnh chất lượng cao
          - Trình phát Video YouTube nhúng
          - Bản đồ Google Maps nhúng
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* ============ CỘT TRÁI (LEFT COLUMN) ============ */}
          <div className="space-y-6">
            {/* Nếu là Địa điểm 2: Ảnh hái chè ở trên, rồi đến bài viết, rồi đến video YouTube */}
            {item.index === 2 ? (
              <>
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img1}
                      alt={item.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img1CaptionVi}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Tiếng Việt
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descVi, 'vi')}
                      className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đọc</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Địa điểm {item.index}: {item.nameVi}{' '}
                    </strong>
                    {item.descVi}
                  </p>
                </div>

                {/* Video YouTube: Tiến Yên Farmstay */}
                <div className="space-y-2 pt-1">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-stone-200">
                    <iframe
                      src={embedUrl}
                      title={item.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    {item.videoTitle}
                  </p>
                </div>
              </>
            ) : item.index === 3 ? (
              /* Địa điểm 3: Hồ Ba Bể (Ảnh trên, video/ảnh dưới) */
              <>
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img1}
                      alt={item.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img1CaptionVi}
                  </p>
                </div>

                {/* Video YouTube Hồ Ba Bể */}
                <div className="space-y-2 pt-1">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-stone-200">
                    <iframe
                      src={embedUrl}
                      title={item.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    {item.videoTitle}
                  </p>
                </div>
              </>
            ) : item.index === 4 ? (
              /* Địa điểm 4: Suối Cửa Tử (Ảnh thác suối trên, đoạn văn tiếng Việt dưới) */
              <>
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img1}
                      alt={item.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img1CaptionVi}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Tiếng Việt
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descVi, 'vi')}
                      className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đọc</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Địa điểm {item.index}: {item.nameVi}{' '}
                    </strong>
                    {item.descVi}
                  </p>
                </div>
              </>
            ) : item.index === 6 ? (
              /* Địa điểm 6: Bảo tàng Dân tộc (Ảnh bảo tàng trên, video dưới) */
              <>
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img1}
                      alt={item.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img1CaptionVi}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-stone-200">
                    <iframe
                      src={embedUrl}
                      title={item.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    {item.videoTitle}
                  </p>
                </div>
              </>
            ) : (
              /* Địa điểm 1 & 5: Văn bản Tiếng Việt ở trên, ảnh cổng chào/di tích ở dưới */
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Tiếng Việt
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descVi, 'vi')}
                      className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đọc</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Địa điểm {item.index}: {item.nameVi}{' '}
                    </strong>
                    {item.descVi}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-4/3 sm:aspect-16/11">
                    <img
                      src={item.img1}
                      alt={item.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img1CaptionVi}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* ============ CỘT PHẢI (RIGHT COLUMN) ============ */}
          <div className="space-y-6">
            {/* Địa điểm 1: Ảnh toàn cảnh trên, Tiếng Anh ở giữa, Video ở dưới */}
            {item.index === 1 ? (
              <>
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img2}
                      alt={item.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img2CaptionVi}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      English
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descEn, 'en')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Location {item.index}: {item.nameEn}{' '}
                    </strong>
                    {item.descEn}
                  </p>
                </div>

                {/* Video YouTube: Phát triển du lịch Hồ Núi Cốc */}
                <div className="space-y-2 pt-1">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-stone-200">
                    <iframe
                      src={embedUrl}
                      title={item.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    {item.videoTitle}
                  </p>
                </div>
              </>
            ) : item.index === 2 ? (
              /* Địa điểm 2: Ảnh đồi chè tròn trên, Tiếng Anh ở giữa, Bản đồ Google Maps nhúng ở dưới */
              <>
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img2}
                      alt={item.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img2CaptionVi}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      English
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descEn, 'en')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Location {item.index}: {item.nameEn}{' '}
                    </strong>
                    {item.descEn}
                  </p>
                </div>

                {/* Bản đồ Google Maps nhúng đúng như ảnh chụp của người dùng */}
                <div className="space-y-2 pt-1">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-100 shadow-md border border-stone-200">
                    <iframe
                      src={item.mapEmbedUrl}
                      title={`Bản đồ ${item.nameVi}`}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    Vị trí Đồi chè Tân Cương trên bản đồ Google Maps
                  </p>
                </div>
              </>
            ) : item.index === 3 ? (
              /* Địa điểm 3: Hồ Ba Bể (Đoạn văn Tiếng Việt ở trên, Tiếng Anh ở dưới) */
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Tiếng Việt
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descVi, 'vi')}
                      className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đọc</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Địa điểm {item.index}: Hồ Ba Bể là hồ nước ngọt tự nhiên lớn nhất Việt Nam,{' '}
                    </strong>
                    {item.descVi.replace('Hồ Ba Bể là hồ nước ngọt tự nhiên lớn nhất Việt Nam, ', '')}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      English
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descEn, 'en')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Location {item.index}: Ba Be Lake is the largest natural freshwater lake in Vietnam,{' '}
                    </strong>
                    {item.descEn.replace('Ba Be Lake is the largest natural freshwater lake in Vietnam, ', '')}
                  </p>
                </div>
              </>
            ) : item.index === 4 ? (
              /* Địa điểm 4: Suối Cửa Tử (Ảnh 2 ở trên, đoạn văn tiếng Anh ở dưới) */
              <>
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img2}
                      alt={item.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img2CaptionVi}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      English
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descEn, 'en')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Location {item.index}: Cua Tu Stream is a pristine and challenging trekking destination,{' '}
                    </strong>
                    {item.descEn.replace('Cua Tu Stream is a pristine and challenging trekking destination, ', '')}
                  </p>
                </div>
              </>
            ) : item.index === 5 ? (
              /* Địa điểm 5: ATK Định Hóa (Đoạn văn Tiếng Anh ở trên, ảnh toàn cảnh rừng núi ở dưới) */
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      English
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descEn, 'en')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Location {item.index}: The ATK Dinh Hoa Special National Historical Relic Site{' '}
                    </strong>
                    {item.descEn.replace('The ATK Dinh Hoa Special National Historical Relic Site ', '')}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs aspect-16/10">
                    <img
                      src={item.img2}
                      alt={item.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic text-center">
                    {item.img2CaptionVi}
                  </p>
                </div>
              </>
            ) : (
              /* Địa điểm 6: Bảo tàng Dân tộc (Đoạn văn Tiếng Việt đầy đủ chuẩn xác như ảnh 6) */
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Tiếng Việt
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descVi, 'vi')}
                      className="flex items-center gap-1 text-xs font-bold text-[#116149] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đọc</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    <strong className="text-stone-950 font-bold">
                      Bảo tàng Văn hóa các dân tộc Việt Nam là một trong bảy bảo tàng quốc gia của Việt Nam,{' '}
                    </strong>
                    {item.descVi.replace('Bảo tàng Văn hóa các dân tộc Việt Nam là một trong bảy bảo tàng quốc gia của Việt Nam, ', '')}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      English
                    </span>
                    <button
                      onClick={() => handleSpeak(item.descEn, 'en')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans text-justify">
                    {item.descEn}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="section-destinations" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-[#116149]">
              01 · DU LỊCH & ĐIỂM ĐẾN
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500 font-medium">
              Bố cục Google Sites gốc
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Điểm Đến, Cảnh Quan Và Trải Nghiệm Du Lịch Thái Nguyên
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
            Thiết kế bố cục chuẩn theo mẫu Google Sites gốc: đầy đủ hình ảnh thực tế, nội dung song ngữ, video YouTube nhúng trực quan và bản đồ tương tác.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'all'
                ? 'bg-white text-[#116149] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Dạng cuộn đầy đủ
          </button>
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'single'
                ? 'bg-white text-[#116149] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Xem từng điểm
          </button>
        </div>
      </div>

      {/* Quick Navigation Buttons to jump to any destination */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sticky top-16 z-40 bg-[#f5f8f5]/95 backdrop-blur-md py-2 -mx-2 px-2">
        {EXACT_DESTINATIONS.map((dest) => {
          const isActive = dest.id === activeDestId;
          return (
            <button
              key={dest.id}
              onClick={() => {
                setActiveDestId(dest.id);
                if (viewMode === 'all') {
                  const el = document.getElementById(`destination-item-${dest.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#116149] text-white border-[#116149] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                  isActive ? 'bg-white text-[#116149]' : 'bg-[#eaf5ef] text-[#116149]'
                }`}
              >
                0{dest.index}
              </span>
              <span>{dest.nameVi}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      {viewMode === 'all' ? (
        <div className="space-y-8">
          {EXACT_DESTINATIONS.map((dest) => renderItem(dest))}
        </div>
      ) : (
        renderItem(currentDest)
      )}
    </div>
  );
};
