export type PlaceCategory = 'history' | 'tea' | 'culture' | 'disaster';

export interface Place {
  id: string;
  category: PlaceCategory;
  nameVi: string;
  nameEn: string;
  typeVi: string;
  typeEn: string;
  locationVi: string;
  locationEn: string;
  lat: number;
  lng: number;
  color: string;
  img: string;
  descVi: string;
  descEn: string;
  speechVi: string;
  speechEn: string;
  keyTakeawayVi: string;
  keyTakeawayEn: string;
  googleMapsQuery: string;
  historicalSignificance?: string;
  safetyTipVi?: string;
  safetyTipEn?: string;
  tags: string[];
}

export interface TeaRegion {
  id: string;
  nameVi: string;
  nameEn: string;
  locationVi: string;
  locationEn: string;
  lat: number;
  lng: number;
  flavorProfileVi: string;
  flavorProfileEn: string;
  featuresVi: string[];
  featuresEn: string[];
  ocopInfo: string;
  highlight: string;
  img: string;
}

export interface QuizQuestion {
  id: number;
  qVi: string;
  qEn: string;
  optionsVi: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationVi: string;
  explanationEn: string;
  category: string;
}

export interface CurriculumSection {
  id: string;
  number: string;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  icon: string;
  topics: {
    titleVi: string;
    titleEn: string;
    contentVi: string;
    contentEn: string;
    placeId?: string;
    img?: string;
  }[];
}

export const PLACES: Place[] = [
  {
    id: 'atk-dinh-hoa',
    category: 'history',
    nameVi: 'Khu Di tích Quốc gia Đặc biệt ATK Định Hóa',
    nameEn: 'ATK Dinh Hoa Special National Historical Relic Site',
    typeVi: 'Di tích Lịch sử Cách mạng · Căn cứ kháng chiến',
    typeEn: 'Revolutionary Historical Relic · Resistance Base',
    locationVi: 'Xã Phú Đình & các xã lân cận, Huyện Định Hóa, Thái Nguyên',
    locationEn: 'Phu Dinh Commune, Dinh Hoa District, Thai Nguyen',
    lat: 21.8710,
    lng: 105.6235,
    color: '#dc2626',
    img: 'https://cdn.baophapluat.vn/w3840/uploaded/vuthilanh/2020_12_11/lan-tin-keo_wlkp.jpg',
    descVi: 'ATK Định Hóa là vùng căn cứ cách mạng quan trọng trong cuộc kháng chiến chống thực dân Pháp (1946–1954). Nằm ở ngã ba giáp ranh giữa Thái Nguyên, Tuyên Quang và Bắc Kạn, nơi đây có địa thế "tiến khả dĩ công, thoái khả dĩ thủ". Nổi bật với lán Tỉn Keo - nơi Chủ tịch Hồ Chí Minh cùng Bộ Chính trị thông qua kế hoạch tác chiến Đông Xuân 1953–1954 mở màn Chiến dịch Điện Biên Phủ, đồi Khau Ty, đồi Khuôn Tát và Nhà tưởng niệm Bác Hồ trên đỉnh đèo De.',
    descEn: 'ATK Dinh Hoa is a crucial revolutionary base during the resistance against the French (1946–1954). Located at the strategic junction of Thai Nguyen, Tuyen Quang, and Bac Kan, it has a defensive terrain ("advance to attack, retreat to defend"). Notable relics include Tin Keo Hut where President Ho Chi Minh and the Politburo approved the 1953–1954 Winter-Spring plan leading to the Dien Bien Phu victory, Khau Ty Hill, and Uncle Ho Commemorative House atop De Pass.',
    speechVi: 'Chào mừng các bạn đến với Di tích Quốc gia Đặc biệt ATK Định Hóa – Thủ đô gió ngàn của cuộc kháng chiến chống Pháp. Nơi đây từng là đầu não chỉ huy của Bác Hồ và Trung ương Đảng, giúp thế hệ trẻ hiểu sâu sắc về lòng yêu nước và giá trị của độc lập dân tộc.',
    speechEn: 'Welcome to ATK Dinh Hoa Special National Relic, the heart of the revolutionary base during the anti-French resistance war. Here, President Ho Chi Minh and the Party Central Committee led our nation to victory.',
    keyTakeawayVi: 'Tôn trọng di tích lịch sử, bảo vệ cảnh quan rừng ATK, tìm hiểu tư liệu cách mạng chính thống.',
    keyTakeawayEn: 'Preserve historical monuments, protect forest ecology, and study verified revolutionary records.',
    googleMapsQuery: 'Khu di tích Tỉn Keo, Phú Đình, Định Hóa, Thái Nguyên',
    tags: ['Di tích cách mạng', 'Chủ tịch Hồ Chí Minh', 'Lán Tỉn Keo', 'Lịch sử kháng chiến']
  },
  {
    id: 'nui-coc-lake',
    category: 'history',
    nameVi: 'Khu du lịch Hồ Núi Cốc',
    nameEn: 'Nui Coc Lake Landscape & Ecotourism Area',
    typeVi: 'Thắng cảnh Thiên nhiên · Du lịch sinh thái',
    typeEn: 'Natural Landscape · Ecotourism Destination',
    locationVi: 'Xã Tân Thái, Huyện Đại Từ & TP. Thái Nguyên',
    locationEn: 'Tan Thai Commune, Dai Tu District & Thai Nguyen City',
    lat: 21.5750,
    lng: 105.7100,
    color: '#0284c7',
    img: '/assets/aistudio/3ho-nui-coc_317fda3e.jpg',
    descVi: 'Hồ Núi Cốc là hồ chứa nước nhân tạo được khởi công từ năm 1973 và hoàn thành năm 1982, có diện tích mặt nước khoảng 25 km² với 89 hòn đảo lớn nhỏ. Nơi đây vừa phục vụ thủy lợi, cấp nước công nghiệp và sinh hoạt, vừa là khu du lịch sinh thái nổi tiếng gắn với chuyện tình huyền thoại Nàng Công – Chàng Cốc.',
    descEn: 'Nui Coc Lake is an artificial reservoir created between 1973 and 1982, covering about 25 square kilometers with 89 islands. It serves irrigation and drinking water supply while being a renowned ecotourism destination steeped in the folk legend of Cong and Coc.',
    speechVi: 'Hồ Núi Cốc là thắng cảnh biểu tượng của Thái Nguyên, mang vẻ đẹp thơ mộng giữa lòng núi non. Mặt nước hồ xanh biếc cùng các đảo cây xanh không chỉ cung cấp nguồn nước quý giá mà còn là điểm du lịch sinh thái hấp dẫn.',
    speechEn: 'Nui Coc Lake is an iconic landmark of Thai Nguyen, blending poetic waters with green islands. It provides vital irrigation and invites travelers to explore the folk romance of Nang Cong and Chang Coc.',
    keyTakeawayVi: 'Giữ gìn vệ sinh môi trường hồ nước ngọt, không xả rác khi du ngoạn thuyền bè.',
    keyTakeawayEn: 'Protect freshwater lake cleanliness and strictly avoid littering while boating.',
    googleMapsQuery: 'Khu du lịch Hồ Núi Cốc, Thái Nguyên',
    tags: ['Thắng cảnh', 'Nàng Công Chàng Cốc', 'Hồ nhân tạo', 'Thủy lợi']
  },
  {
    id: 'ba-be-lake',
    category: 'history',
    nameVi: 'Hồ Ba Bể (Vườn Quốc gia Ba Bể)',
    nameEn: 'Ba Be Lake (Ba Be National Park)',
    typeVi: 'Di tích Quốc gia Đặc biệt · Hồ tự nhiên trên núi đá vôi',
    typeEn: 'Special National Relic · Natural Karst Mountain Lake',
    locationVi: 'Xã Ba Bể (khu vực hồ Ba Bể), Tỉnh Thái Nguyên',
    locationEn: 'Ba Be Commune, Thai Nguyen Province',
    lat: 22.4167,
    lng: 105.6167,
    color: '#0d9488',
    img: 'https://www.babenationalpark.com.vn/UserFiles/image/2025/Ba-Be-Lake.png',
    descVi: 'Hồ Ba Bể là một trong những hồ nước ngọt tự nhiên lớn nhất thế giới nằm trên núi đá vôi (độ cao ~145m so với mực nước biển), được hình thành từ hơn 200 triệu năm trước. Mặt hồ gồm 3 phân khu liên hoàn: Pé Lèng, Pé Lù và Pé Lầm. Hệ sinh thái rừng đặc dụng và vườn quốc gia lưu giữ hàng trăm loài động thực vật quý hiếm cùng nét văn hóa nhà sàn đặc sắc của người Tày ven hồ.',
    descEn: 'Ba Be Lake is one of the world\'s largest natural freshwater karst lakes (145m elevation), formed over 200 million years ago. It consists of three interconnected basins: Pe Leng, Pe Lu, and Pe Lam. Surrounding Ba Be National Park shelters diverse flora and fauna along with authentic Tay stilt-house villages.',
    speechVi: 'Chào mừng các bạn đến với Hồ Ba Bể – viên ngọc bích giữa núi rừng Việt Bắc. Đây là hồ nước ngọt tự nhiên kỳ vĩ được tạo thành từ quá trình địa chất karst, nơi giao hòa giữa thiên nhiên hùng vĩ và văn hóa đồng bào Tày.',
    speechEn: 'Welcome to Ba Be Lake, the emerald jewel of the Viet Bac mountains. Formed by ancient karst hydrology, it combines pristine limestone peaks with Tay indigenous culture.',
    keyTakeawayVi: 'Ý thức bảo tồn đa dạng sinh học Vườn Quốc gia, tôn trọng nếp sống cộng đồng bản địa.',
    keyTakeawayEn: 'Foster biodiversity conservation in the National Park and respect indigenous heritage.',
    googleMapsQuery: 'Hồ Ba Bể, Thái Nguyên',
    tags: ['Hồ Ba Bể', 'Vườn quốc gia', 'Di sản thiên nhiên', 'Văn hóa Tày']
  },
  {
    id: 'museum-cultures',
    category: 'culture',
    nameVi: 'Bảo tàng Văn hóa các Dân tộc Việt Nam',
    nameEn: 'Vietnam Museum of Ethnic Cultures',
    typeVi: 'Bảo tàng Quốc gia · Di sản Văn hóa 54 Dân tộc',
    typeEn: 'National Museum · Heritage of 54 Ethnic Groups',
    locationVi: 'Đường Đội Cấn, Phường Phan Đình Phùng, TP. Thái Nguyên',
    locationEn: 'Doi Can Street, Phan Dinh Phung Ward, Thai Nguyen City',
    lat: 21.5942,
    lng: 105.8423,
    color: '#8b5cf6',
    img: 'https://dltm-cdn.vnptit3.vn/resources/portal//Images/TNN/thienvn.tnn/b%E1%BA%A3o%20t%C3%A0ng/giaikkdieuthenngayxuanngochai_637653362495836859.jpg',
    descVi: 'Được thành lập từ năm 1960 với tên gọi ban đầu là Bảo tàng Việt Bắc, đây là một trong 7 bảo tàng quốc gia của Việt Nam. Bảo tàng trưng bày hơn 40.000 hiện vật quý giá tái hiện văn hóa, trang phục, phong tục, nghi lễ tâm linh của 54 dân tộc anh em theo 5 nhóm ngôn ngữ chính (Việt - Mường, Tày - Thái, Môn - Khmer, Mông - Dao, Nam Đảo). Khuôn viên ngoài trời phục dựng chân thực nhà sàn Tày, nhà người Mông, nhà rông Tây Nguyên và tháp Chăm.',
    descEn: 'Founded in 1960 as Viet Bac Museum, this is one of Vietnam\'s seven national museums. It houses over 40,000 valuable artifacts showcasing the costumes, rituals, and lifestyles of all 54 ethnic groups. The outdoor park exhibits authentic stilt houses, Hmong clay dwellings, Tay Nguyen communal halls, and Cham architecture.',
    speechVi: 'Bảo tàng Văn hóa các Dân tộc Việt Nam tọa lạc ngay trung tâm thành phố Thái Nguyên là kho tàng sống động về lịch sử và văn hóa các dân tộc. Nơi đây bồi đắp lòng tự hào và sự tôn trọng đối với đại gia đình các dân tộc Việt Nam.',
    speechEn: 'The Vietnam Museum of Ethnic Cultures in Thai Nguyen city center is a vibrant treasure trove documenting Vietnam’s 54 ethnic traditions, promoting national unity and cultural respect.',
    keyTakeawayVi: 'Học tập về sự đa dạng văn hóa dân tộc, giữ gìn và phát huy di sản văn hóa truyền thống.',
    keyTakeawayEn: 'Learn about ethnic cultural diversity and appreciate the stewardship of cultural heritage.',
    googleMapsQuery: 'Bảo tàng Văn hóa các dân tộc Việt Nam, Thái Nguyên',
    tags: ['Bảo tàng quốc gia', '54 dân tộc', 'Di sản văn hóa', 'Nhà sàn']
  },
  {
    id: 'thai-hai-village',
    category: 'culture',
    nameVi: 'Khu Bảo tồn Làng Nhà Sàn Dân tộc Thái Hải',
    nameEn: 'Thai Hai Stilt House Ethnic Culture & Ecological Conservation Area',
    typeVi: 'Khu Bảo tồn Văn hóa Dân tộc Tày · Làng Du lịch Tốt nhất Thế giới UNWTO',
    typeEn: 'Tay Culture Reserve · UNWTO Best Tourism Village',
    locationVi: 'Xã Thịnh Đức, Thành phố Thái Nguyên',
    locationEn: 'Thinh Duc Commune, Thai Nguyen City',
    lat: 21.5412,
    lng: 105.7950,
    color: '#9333ea',
    img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2021/04/lang-nha-san-thai-hai-1.jpg',
    descVi: 'Làng sinh thái Thái Hải quy tụ hơn 30 ngôi nhà sàn nguyên bản hàng trăm năm tuổi của người Tày, Nùng được di chuyển từ vùng ATK Định Hóa về phục dựng. Người dân nơi đây sống cùng nhau như một đại gia đình cộng đồng, bảo tồn tiếng nói, trang phục chàm, nghi lễ Then, ẩm thực cơm lam, cá suối và phong cách sống hài hòa với rừng cây sinh thái.',
    descEn: 'Thai Hai Village gathers over 30 authentic ancient stilt houses preserved from Dinh Hoa. Tay and Nung residents live together as an extended commune, upholding indigenous Tay language, indigo attire, Then rituals, bamboo rice cooking, and harmony with the natural woodland.',
    speechVi: 'Đến với làng nhà sàn Thái Hải, các em được sống trong không gian văn hóa Tày thuần khiết với những nếp nhà sàn cổ, tiếng đàn tính mộc mạc và tình đoàn kết gắn bó của cộng đồng cư dân vùng chè.',
    speechEn: 'Visiting Thai Hai stilt village allows students to immerse in authentic Tay community life, ancient stilt architecture, soothing Tinh lute music, and sustainable ecotourism.',
    keyTakeawayVi: 'Trân trọng lối sống cộng đồng bền vững, nét đẹp trang phục truyền thống và nhà sàn dân tộc.',
    keyTakeawayEn: 'Value sustainable communal living, traditional costumes, and vernacular wooden architecture.',
    googleMapsQuery: 'Làng nhà sàn Thái Hải, Thái Nguyên',
    tags: ['Làng Thái Hải', 'Nhà sàn Tày', 'Hát Then', 'Du lịch sinh thái']
  },
  {
    id: 'nguom-rock-shelter',
    category: 'history',
    nameVi: 'Di chỉ Khảo cổ Mái Đá Ngườm',
    nameEn: 'Nguom Prehistoric Rock Shelter Archaeological Site',
    typeVi: 'Di tích Khảo cổ học Thời kỳ Tiền sử · Thần Sa Võ Nhai',
    typeEn: 'Prehistoric Paleolithic Archaeological Site · Than Sa Vo Nhai',
    locationVi: 'Xã Thần Sa, Huyện Võ Nhai, Thái Nguyên',
    locationEn: 'Than Sa Commune, Vo Nhai District, Thai Nguyen',
    lat: 21.6730,
    lng: 105.9920,
    color: '#b45309',
    img: 'https://file3.qdnd.vn/data/images/0/2022/10/24/nguyenminhhai/mai-da-nguom.jpg',
    descVi: 'Mái đá Ngườm nằm trong thung lũng đá vôi Thần Sa, là một trong những di chỉ khảo cổ học quan trọng bậc nhất của Việt Nam và Đông Nam Á. Các nhà khảo cổ đã phát hiện nhiều tầng văn hóa có niên đại từ 30.000 đến 40.000 năm trước với hàng nghìn công cụ đá hạt cuội cuội ghè đẽo (Văn hóa Ngườm và Sơn Vi), minh chứng Thái Nguyên là cái nôi cư trú của người tiền sử.',
    descEn: 'Nguom Rock Shelter in the Than Sa limestone valley is one of Vietnam and Southeast Asia\'s most significant prehistoric sites. Archaeologists unearthed stratified artifact layers dating back 30,000 to 40,000 years, establishing Thai Nguyen as a prehistoric cradle of early humans.',
    speechVi: 'Mái đá Ngườm tại vùng núi Võ Nhai là chứng tích lịch sử hàng chục ngàn năm của người nguyên thủy trên mảnh đất Thái Nguyên. Đây là nguồn tư liệu khoa học vô giá giúp học sinh hiểu về cội nguồn quê hương.',
    speechEn: 'Nguom Rock Shelter stands as ancient evidence of tens of thousands of years of human habitation in Vo Nhai, offering invaluable archaeological insights into our local origins.',
    keyTakeawayVi: 'Tôn trọng và bảo vệ các di chỉ khảo cổ học, không xâm hại các tầng địa chất cổ.',
    keyTakeawayEn: 'Preserve prehistoric archaeological deposits and protect geological heritage.',
    googleMapsQuery: 'Mái đá Ngườm, Thần Sa, Võ Nhai, Thái Nguyên',
    tags: ['Khảo cổ học', 'Người tiền sử', 'Võ Nhai', 'Văn hóa Ngườm']
  },
  {
    id: 'pac-ngoi-village',
    category: 'culture',
    nameVi: 'Bản Du lịch Cộng đồng Pác Ngòi',
    nameEn: 'Pac Ngoi Community Ecotourism Village',
    typeVi: 'Văn hóa Bản địa · Du lịch cộng đồng người Tày',
    typeEn: 'Indigenous Community · Tay Ecotourism Village',
    locationVi: 'Xã Nam Mẫu (vùng ven hồ Ba Bể), Thái Nguyên',
    locationEn: 'Nam Mau Commune (Ba Be Lake shore), Thai Nguyen',
    lat: 22.4050,
    lng: 105.6230,
    color: '#059669',
    img: 'https://imgcdn.bokun.tools/2422f3a0-9be9-4dbe-b45a-86d696283399.jpg',
    descVi: 'Pác Ngòi là bản cổ của người Tày nằm nép mình bên triền núi đá và ven bờ hồ Ba Bể. Nơi đây gìn giữ gần như nguyên vẹn kiến trúc nhà sàn mái ngói âm dương, trang phục chàm thủ công, các điệu hát Then và đàn Tính ngọt ngào. Du khách đến Pác Ngòi được trải nghiệm chèo bè mảng tre và thưởng thức cá hồ nướng than hoa.',
    descEn: 'Pac Ngoi is an ancient Tay village nestled between limestone cliffs and Ba Be Lake shores. It preserves intact traditional yin-yang tiled wooden stilt houses, indigo weaving, Then folk melodies, bamboo rafting, and local lakeside cuisine.',
    speechVi: 'Pác Ngòi mang đậm nét mộc mạc và hiếu khách của đồng bào Tày ven hồ Ba Bể. Bản sắc văn hóa độc đáo nơi đây là chìa khóa để phát triển du lịch cộng đồng gắn liền với bảo vệ tài nguyên thiên nhiên.',
    speechEn: 'Pac Ngoi showcases the warm hospitality of Tay lake-dwellers, demonstrating how preserving ethnic heritage powers sustainable community tourism.',
    keyTakeawayVi: 'Hòa mình vào nếp sống đồng bào, giữ gìn cảnh quan tự nhiên không ô nhiễm.',
    keyTakeawayEn: 'Engage respectfully with local villagers and prevent pollution in the pristine lake basin.',
    googleMapsQuery: 'Bản Pác Ngòi, Ba Bể, Thái Nguyên',
    tags: ['Bản Pác Ngòi', 'Nhà sàn cổ', 'Người Tày', 'Bè mảng']
  },

  // 5 Famous Tea Regions (Ngũ Đại Danh Trà)
  {
    id: 'tea-tan-cuong',
    category: 'tea',
    nameVi: 'Vùng chè Tân Cương (Đệ nhất Danh trà)',
    nameEn: 'Tan Cuong Tea Region (The Prime Tea Land)',
    typeVi: 'Ngũ Đại Danh Trà · Chỉ dẫn Địa lý Quốc gia',
    typeEn: '5 Famous Tea Regions · National Geographical Indication',
    locationVi: 'Xã Tân Cương, Xã Phúc Xuân & Xã Phúc Trìu, TP. Thái Nguyên',
    locationEn: 'Tan Cuong, Phuc Xuan & Phuc Triu Communes, Thai Nguyen City',
    lat: 21.5480,
    lng: 105.7480,
    color: '#15803d',
    img: 'https://dltm-cdn.vnptit3.vn/resources/portal/Images/TNN/namdan.tnn/Thang82022/%C4%90i%E1%BB%83mdul%E1%BB%8Bchc%E1%BB%99ng%C4%91%E1%BB%93ngx%C3%A3T%C3%A2nC%C6%B0%C6%A1ng/1_637974763093762926.png',
    descVi: 'Tân Cương là cái nôi nổi tiếng nhất của chè Thái Nguyên, được thiên nhiên ban tặng chất đất sỏi cơm màu đỏ son pha sét dưới chân núi Tam Đảo và nguồn nước sông Công. Trà Tân Cương nổi danh với sắc nước xanh non ánh vàng óng ả, hương thơm thoang thoảng cốm non, vị tiền chát dịu nhẹ và hậu ngọt đậm đà, sâu lắng đọng mãi nơi cuống họng.',
    descEn: 'Tan Cuong is the beating heart of Thai Nguyen tea, blessed with fertile reddish clay-gravel soil fed by the Cong River under the Tam Dao foothills. Tan Cuong tea is famed for its luminescent pale green-gold liquor, delicate fresh young rice fragrance, subtle gentle astringency, and profound, lingering sweetness.',
    speechVi: 'Đây là vùng chè Tân Cương – biểu tượng rạng rỡ của thương hiệu Đệ nhất danh trà Thái Nguyên. Mỗi búp chè một tôm hai lá qua bàn tay khéo léo của nghệ nhân đã tạo nên thức trà nức tiếng gần xa.',
    speechEn: 'This is the Tan Cuong tea region, the prime emblem of Thai Nguyen tea excellence. Each tender bud harvested with precision creates an aromatic brew with deep young-rice floral notes.',
    keyTakeawayVi: 'Quy trình sản xuất chè sạch, tôn vinh công lao của người nông dân xứ Trà.',
    keyTakeawayEn: 'Appreciate sustainable clean tea agriculture and honor the hard work of local tea farmers.',
    googleMapsQuery: 'Đồi chè Tân Cương, Thái Nguyên',
    tags: ['Tân Cương', 'Hương cốm non', 'Đệ nhất danh trà', 'OCOP 5 sao']
  },
  {
    id: 'tea-la-bang',
    category: 'tea',
    nameVi: 'Vùng chè La Bằng (Tam Đảo)',
    nameEn: 'La Bang Tea Region (Tam Dao Foothills)',
    typeVi: 'Ngũ Đại Danh Trà · Chè Sinh thái Dưới chân Núi Tam Đảo',
    typeEn: '5 Famous Tea Regions · Organic Tea under Mount Tam Dao',
    locationVi: 'Xã La Bằng, Huyện Đại Từ, Thái Nguyên',
    locationEn: 'La Bang Commune, Dai Tu District, Thai Nguyen',
    lat: 21.5720,
    lng: 105.6020,
    color: '#166534',
    img: 'https://i0.wp.com/loctancuong.com/wp-content/uploads/2024/01/doi-che-thai-nguyen.jpg?resize=700%2C393&ssl=1',
    descVi: 'Nằm nép mình ngay dưới chân sườn đông dãy núi Tam Đảo hùng vĩ, La Bằng sở hữu tiểu khí hậu mát mẻ quanh năm, độ ẩm cao và nguồn nước suối nguồn Kênh Tây trong vắt. Vùng chè áp dụng tiêu chuẩn VietGAP và hữu cơ nghiêm ngặt, sở hữu tới 6 sản phẩm đạt chứng nhận OCOP danh giá. Trà La Bằng có vị đậm, hương bùi thanh mát.',
    descEn: 'Nestled at the eastern base of the Tam Dao mountain range, La Bang enjoys a cool microclimate, pristine mountain stream waters, and strict organic farming standards. Boasting 6 OCOP-certified tea products, La Bang tea offers a nutty aroma, crisp palate, and lasting fresh aftertaste.',
    speechVi: 'Vùng chè La Bằng dưới chân núi Tam Đảo là hình mẫu của mô hình canh tác chè an toàn và du lịch sinh thái. Khí hậu mát lành vùng núi đã tôi luyện nên những búp chè đậm đà hương sắc.',
    speechEn: 'La Bang tea at the foothills of Tam Dao exemplifies organic cultivation and sustainable agro-tourism, enriched by cool mountain air and pure mountain streams.',
    keyTakeawayVi: 'Áp dụng khoa học kỹ thuật và nông nghiệp hữu cơ để bảo vệ nguồn đất, nước.',
    keyTakeawayEn: 'Promote organic agriculture to preserve mountain soil and pure water resources.',
    googleMapsQuery: 'Vùng chè La Bằng, Đại Từ, Thái Nguyên',
    tags: ['La Bằng', 'Chân núi Tam Đảo', '6 sản phẩm OCOP', 'Chè hữu cơ']
  },
  {
    id: 'tea-trai-cai',
    category: 'tea',
    nameVi: 'Vùng chè Trại Cài (Sông Sỏi)',
    nameEn: 'Trai Cai Tea Region (Dong Hy)',
    typeVi: 'Ngũ Đại Danh Trà · Hương vị Đậm đà Sông Sỏi',
    typeEn: '5 Famous Tea Regions · Rich Flavor from Soi River',
    locationVi: 'Xã Minh Lập & các xã lân cận Huyện Đồng Hỷ, Thái Nguyên',
    locationEn: 'Minh Lap Commune, Dong Hy District, Thai Nguyen',
    lat: 21.6450,
    lng: 105.8920,
    color: '#14532d',
    img: 'https://media.baothainguyen.vn/upload/news/1_2022/7_1_2022/tra-trai-cai.jpg',
    descVi: 'Trại Cài là vùng chè cổ danh tiếng nằm ven thung lũng sông Sỏi thuộc huyện Đồng Hỷ. Đất đai phù sa cổ và thổ nhưỡng đặc thù mang lại cho trà Trại Cài vị đậm đà rất riêng: đậm ngậy, bền nước, màu nước xanh vàng sóng sánh và hương thơm nồng nàn giữ được qua nhiều lần châm nước.',
    descEn: 'Trai Cai is an illustrious tea terroir situated along the Soi River valley in Dong Hy. Ancient alluvial soils yield tea known for its bold body, rich savory undertones, long-lasting brew cycles, and deep golden-green tint.',
    speechVi: 'Trà Trại Cài nổi tiếng với câu khen ngợi của người sành trà: đậm ngậy và rất bền nước. Thổ nhưỡng ven sông Sỏi đã tạo nên nét độc đáo khó lẫn trong Ngũ đại danh trà Thái Nguyên.',
    speechEn: 'Trai Cai tea is praised by tea masters for its full body and remarkable infusion longevity, nurtured by the mineral-rich soils of the Soi River valley.',
    keyTakeawayVi: 'Mỗi vùng đất có thổ nhưỡng riêng tạo nên bản sắc ẩm thực độc đáo.',
    keyTakeawayEn: 'Unique local terroir shapes distinctive agricultural gastronomy and traditions.',
    googleMapsQuery: 'Vùng chè Trại Cài, Đồng Hỷ, Thái Nguyên',
    tags: ['Trại Cài', 'Đồng Hỷ', 'Đậm ngậy bền nước', 'Sông Sỏi']
  },
  {
    id: 'tea-khe-coc',
    category: 'tea',
    nameVi: 'Vùng chè Khe Cốc (Vô Tranh)',
    nameEn: 'Khe Coc Tea Region (Vo Tranh, Phu Luong)',
    typeVi: 'Ngũ Đại Danh Trà · Chè Hữu cơ & Sinh kế Vững bền',
    typeEn: '5 Famous Tea Regions · Organic Farming & Sustainable Livelihood',
    locationVi: 'Xã Vô Tranh, Huyện Phú Lương, Thái Nguyên',
    locationEn: 'Vo Tranh Commune, Phu Luong District, Thai Nguyen',
    lat: 21.7250,
    lng: 105.7890,
    color: '#047857',
    img: 'https://media.baothainguyen.vn/upload/news/10_2023/16_10_2023/khe-coc.jpg',
    descVi: 'Nằm giữa vùng đồi bát úp trù phú của huyện Phú Lương, Khe Cốc nổi lên như một hình mẫu về hợp tác xã chè hữu cơ đạt chuẩn quốc tế. Cây chè gắn bó mật thiết với sinh kế hàng nghìn hộ gia đình, kết hợp phương pháp sao sấy củi lửa gia truyền với công nghệ hút chân không hiện đại, cho vị trà ngọt dịu và thơm thảo.',
    descEn: 'Set among the rolling hills of Phu Luong, Khe Coc stands as a pioneer in certified organic tea cooperatives. Linking tea cultivation directly to thousands of farmers\' livelihoods, it balances wood-fired pan-frying tradition with vacuum preservation.',
    speechVi: 'Khe Cốc, Vô Tranh là điểm sáng về chè hữu cơ gắn với sinh kế đồng bào. Sự tận tâm của người làm chè Phú Lương đã đưa những búp trà xanh vươn ra thị trường quốc tế.',
    speechEn: 'Khe Coc is a shining example of organic tea cooperatives empowering local communities, taking Phu Luong mountain tea to global markets.',
    keyTakeawayVi: 'Mô hình hợp tác xã nông nghiệp giúp nâng cao giá trị nông sản quê hương.',
    keyTakeawayEn: 'Agricultural cooperatives elevate the value of hometown agricultural heritage.',
    googleMapsQuery: 'Hợp tác xã chè Khe Cốc, Vô Tranh, Phú Lương, Thái Nguyên',
    tags: ['Khe Cốc', 'Phú Lương', 'Chè hữu cơ', 'Sinh kế bền vững']
  },
  {
    id: 'tea-bang-phuc',
    category: 'tea',
    nameVi: 'Vùng chè Shan Tuyết Bằng Phúc',
    nameEn: 'Bang Phuc Shan Tuyet Ancient Tea Region',
    typeVi: 'Ngũ Đại Danh Trà · Cổ thụ Vùng cao Mây phủ',
    typeEn: '5 Famous Tea Regions · High Mountain Cloud-shrouded Ancient Trees',
    locationVi: 'Xã Bằng Phúc & Đồng Phúc, Vùng cao Thái Nguyên',
    locationEn: 'Bang Phuc & Dong Phuc Communes, Thai Nguyen Highlands',
    lat: 22.1850,
    lng: 105.7620,
    color: '#0f766e',
    img: 'https://media.baothainguyen.vn/upload/news/11_2021/28_11_2021/shan-tuyet.jpg',
    descVi: 'Nằm ở độ cao trên 800 - 1.000m so với mực nước biển, nơi quanh năm sương mù bao phủ và chênh lệch nhiệt độ ngày đêm lớn. Những cây chè Shan tuyết cổ thụ hàng trăm năm tuổi có thân phủ rêu mốc, búp chè mập mạp bọc một lớp lông tuyết trắng mịn màng. Nước trà vàng sóng sánh như mật ong rừng, vị ngọt hậu đậm sâu và thanh khiết.',
    descEn: 'Perched over 800-1000m above sea level with mist blanketed peaks, Bang Phuc is home to century-old ancient Shan Tuyet tea trees. Lichen-encrusted trunks yield plump tea shoots wrapped in white velvety down. The tea liquor pours like wild forest honey, offering honeyed notes and an enduring purity.',
    speechVi: 'Chè Shan tuyết Bằng Phúc là báu vật vùng núi cao mây phủ. Búp chè ngậm sương đêm mang trong mình hương vị hoang sơ của đại ngàn và bàn tay chăm sóc của đồng bào Dao, Tày.',
    speechEn: 'Bang Phuc Shan Tuyet tea is a high-altitude mountain treasure. Grown amidst morning mist, its ancient buds carry the pristine spirit of northern highlands.',
    keyTakeawayVi: 'Bảo vệ nguồn gen quý cây chè cổ thụ và tri thức bản địa của đồng bào vùng cao.',
    keyTakeawayEn: 'Conserve ancient tea genetic reserves and ethnic indigenous wisdom.',
    googleMapsQuery: 'Xã Bằng Phúc, Thái Nguyên',
    tags: ['Bằng Phúc', 'Chè Shan tuyết', 'Cổ thụ', 'Núi cao mây phủ']
  },

  // Climate and Natural Disaster Hazards
  {
    id: 'flood-cau-river',
    category: 'disaster',
    nameVi: 'Vùng Trũng Ngập Lụt Ven Sông Cầu (TP. Thái Nguyên)',
    nameEn: 'Cau River Lowland Flood Zone (Thai Nguyen City)',
    typeVi: 'Khí hậu – Thủy văn · Vùng Trọng điểm Ngập sâu Mùa mưa bão',
    typeEn: 'Climate & Hydrology · Critical Deep Flood Zone in Storm Season',
    locationVi: 'Phường Linh Sơn, Túc Duyên, Gia Sàng, Tích Lương, Quán Triều',
    locationEn: 'Linh Son, Tuc Duyen, Gia Sang, Tich Luong Wards',
    lat: 21.5880,
    lng: 105.8580,
    color: '#e11d48',
    img: 'https://media.baothainguyen.vn/upload/news/9_2024/10_9_2024/ngap-lut-song-cau.jpg',
    descVi: 'Sông Cầu là dòng sông lớn nhất chảy qua Thái Nguyên với lưu vực thượng nguồn dốc từ vùng núi phía Bắc. Khi xảy ra bão lớn hoặc mưa to kéo dài, mực nước sông Cầu có thể dâng vượt báo động 3 đến 2-3 mét. Các vùng trũng thấp như bãi sông Túc Duyên, cầu sắt Tiến Bộ, Gia Sàng, Linh Sơn có nguy cơ ngập sâu 1-4 mét, gây cô lập giao thông và thiệt hại tài sản.',
    descEn: 'The Cau River is Thai Nguyen’s primary river basin. During severe tropical depressions and extended downpours, river levels frequently surge 2-3 meters above Danger Level 3. Low-lying riverine wards like Tuc Duyen floodplains, Tien Bo railway bridge, Gia Sang, and Linh Son can be submerged under 1-4 meters of floodwaters.',
    speechVi: 'Khu vực ven sông Cầu là nơi có nguy cơ ngập lụt cao nhất khi lũ dâng. Học sinh và người dân cần chú ý cảnh báo lũ của Trung tâm Khí tượng Thủy văn, tuyệt đối không ra bờ sông khi nước chảy xiết.',
    speechEn: 'The Cau River floodplain is highly prone to deep inundation during monsoon storms. Students must follow official meteorological bulletins and never venture near raging currents.',
    keyTakeawayVi: 'Theo dõi dự báo thời tiết; chủ động kê cao tài sản và sơ tán khi có lệnh của chính quyền.',
    keyTakeawayEn: 'Monitor meteorological forecasts, elevate vital household belongings, and evacuate promptly.',
    safetyTipVi: 'Không đi lại, chèo thuyền đánh cá hoặc bơi lội khi lũ sông đang dâng cao.',
    safetyTipEn: 'Never wade, swim, or navigate wooden boats across flooded river channels.',
    googleMapsQuery: 'Cầu Bến Tượng, Sông Cầu, Thái Nguyên',
    tags: ['Ngập lụt Sông Cầu', 'Túc Duyên', 'Lũ báo động 3', 'Phòng chống thiên tai']
  },
  {
    id: 'flood-urban-streets',
    category: 'disaster',
    nameVi: 'Khu vực Ngập úng Đô thị Trung tâm TP. Thái Nguyên',
    nameEn: 'Urban Flash Flood Hotspots (Central Thai Nguyen City)',
    typeVi: 'Hạ tầng Đô thị · Ngập úng Cục bộ do Mưa cường độ lớn',
    typeEn: 'Urban Infrastructure · Localized Inundation from Torrential Rain',
    locationVi: 'Tuyến đường Hoàng Văn Thụ, Lương Ngọc Quyến, Minh Cầu, Hùng Vương',
    locationEn: 'Hoang Van Thu, Luong Ngoc Quyen, Minh Cau Streets',
    lat: 21.5960,
    lng: 105.8390,
    color: '#ea580c',
    img: 'https://media.baothainguyen.vn/upload/news/9_2024/9_9_2024/ngap-duong-pho.jpg',
    descVi: 'Các tuyến đường trục chính ở trung tâm thành phố như đường Lương Ngọc Quyến (khu vực Bệnh viện Đa khoa Trung ương, Cổng trường ĐH Y Dược), đường Hoàng Văn Thụ, Minh Cầu, Phan Đình Phùng có địa hình trũng cục bộ. Khi mưa rào dồn dập vượt 100mm trong vài giờ, hệ thống thoát nước bị quá tải gây ngập sâu từ 0.3m đến 1m làm chết máy xe cộ và nguy cơ rò điện.',
    descEn: 'Major downtown arteries like Luong Ngoc Quyen (Central Hospital & Medical University), Hoang Van Thu, and Minh Cau suffer from localized topographical dips. Rainfall exceeding 100mm in hours overwhelms urban storm drains, creating 0.3m-1m deep street floods, vehicle stalls, and electrocution hazards.',
    speechVi: 'Khi trời mưa to gây ngập úng đường phố nội thị, các em học sinh không được lội nước gần cột điện hoặc nắp cống hở để phòng tránh tai nạn thương tâm.',
    speechEn: 'During intense urban street flooding, students should avoid wading near submerged power poles or uncovered drains to prevent severe electrocution or drowning accidents.',
    keyTakeawayVi: 'Khi ngập úng đường phố: Tránh xa cột điện, không lội qua vũng nước sâu đục không rõ đáy.',
    keyTakeawayEn: 'In flooded streets, keep distance from utility poles and avoid murky deep puddle depressions.',
    safetyTipVi: 'Dừng đỗ phương tiện ở vùng cao, ngắt cầu dao gia đình nếu nước tràn vào nhà.',
    safetyTipEn: 'Park vehicles on high curbs and switch off main circuit breakers if water invades homes.',
    googleMapsQuery: 'Đường Lương Ngọc Quyến, Thái Nguyên',
    tags: ['Ngập úng đô thị', 'Lương Ngọc Quyến', 'Hoàng Văn Thụ', 'Thoát nước']
  },
  {
    id: 'landslide-tam-dao-dai-tu',
    category: 'disaster',
    nameVi: 'Vùng Nguy cơ Sạt lở Đất Chân núi Tam Đảo (Huyện Đại Từ)',
    nameEn: 'Tam Dao Foothills Landslide & Flash Flood Zone (Dai Tu District)',
    typeVi: 'Địa chất – Độ dốc · Nguy cơ Sạt lở Mái dốc & Lũ quét',
    typeEn: 'Geology & Slope · Mountain Slope Landslide & Flash Flood Risk',
    locationVi: 'Các xã Quân Chu, Ký Phú, Mỹ Yên, Văn Yên, La Bằng',
    locationEn: 'Quan Chu, Ky Phu, My Yen, Van Yen Communes',
    lat: 21.5030,
    lng: 105.5890,
    color: '#d97706',
    img: 'https://media.baothainguyen.vn/upload/news/8_2024/sat-lo-tam-dao.jpg',
    descVi: 'Khu vực ven dãy núi Tam Đảo phía tây Thái Nguyên có sườn núi dốc đứng, rừng phòng hộ xen kẽ nương đồi và nhiều dòng suối bắt nguồn từ trên núi cao. Trong mùa mưa lũ kéo dài từ tháng 6 đến tháng 9, lượng mưa tích tụ lớn làm đất đá bão hòa nước, nguy cơ cao xảy ra sạt lở taluy đường và lũ ống, lũ quét bất ngờ trên các dòng suối.',
    descEn: 'The eastern flank of Tam Dao mountains features steep mountain gradients and mountain torrents. During peak monsoon (June to September), heavy soil saturation creates high hazards of road cut landslides, hill collapses, and sudden flash floods rushing down ravines.',
    speechVi: 'Khu vực chân núi Tam Đảo thuộc huyện Đại Từ có địa hình dốc cao. Khi trời mưa lớn nhiều ngày, học sinh cần cảnh giác với hiện tượng sụt trượt đất đá và tiếng gầm rú bất thường của suối nguồn.',
    speechEn: 'The Tam Dao mountain slopes in Dai Tu are prone to rapid rockslides. After prolonged rains, students must heed unusual sounds of rumbling streams and cracked hillsides.',
    keyTakeawayVi: 'Quan sát các vết nứt trên sườn đồi; di dời khẩn cấp khi thấy bùn đá chảy bất thường.',
    keyTakeawayEn: 'Watch for ground fissures along hillsides and evacuate immediately upon mud surges.',
    safetyTipVi: 'Tuyệt đối không đi qua ngầm tràn, suối sâu khi nước đang cuồn cuộn đổi màu đục.',
    safetyTipEn: 'Never attempt to cross flooded spillways or muddy rushing mountain streams.',
    googleMapsQuery: 'Xã Quân Chu, Đại Từ, Thái Nguyên',
    tags: ['Sạt lở đất', 'Dãy Tam Đảo', 'Huyện Đại Từ', 'Lũ quét suối nguồn']
  },
  {
    id: 'landslide-dinh-hoa-phu-luong',
    category: 'disaster',
    nameVi: 'Vùng Nguy cơ Sạt lở Đất Huyện Định Hóa & Phú Lương',
    nameEn: 'Dinh Hoa & Phu Luong Landslide Risk Hotspots',
    typeVi: 'Địa hình Đồi dốc · Sạt lở Taluy Giao thông và Khu dân cư',
    typeEn: 'Steep Terrain · Highway Slope Failures & Village Encroachment',
    locationVi: 'Xã Lam Vỹ, Kim Phượng, Phượng Tiến (Định Hóa); Động Đạt, QL3 (Phú Lương)',
    locationEn: 'Lam Vy, Kim Phuong (Dinh Hoa); Dong Dat, National Route 3 (Phu Luong)',
    lat: 21.9420,
    lng: 105.6200,
    color: '#c2410c',
    img: 'https://media.baothainguyen.vn/upload/news/9_2024/sat-lo-dinh-hoa.jpg',
    descVi: 'Huyện Định Hóa và Phú Lương có nhiều xã địa hình chia cắt phức tạp với các sườn núi dốc đứng. Nhiều mái taluy dương trên các trục đường liên xã và Quốc lộ 3 bị xói lở khi mưa dầm. Các hộ dân sinh sống sát vách đồi đối mặt với nguy cơ đất đá tràn vào nhà trong đêm.',
    descEn: 'Dinh Hoa and Phu Luong districts feature heavily dissected topography with steep mountain walls. Extended rain softens upper cut slopes along National Highway 3 and district roads, posing hazards of rockfalls and hillside collapses onto hillside residences.',
    speechVi: 'Tại Định Hóa và Phú Lương, những con đường miền núi uốn lượn ven vách đá có thể gặp nguy cơ sạt lở taluy trong mùa mưa. Hãy luôn chú ý biển cảnh báo sạt trượt khi lưu thông.',
    speechEn: 'Winding mountain routes in Dinh Hoa and Phu Luong face embankment slides during monsoon spells. Observe roadside warning signs and avoid travelling at night during storms.',
    keyTakeawayVi: 'Không dựng lều trại, nhà tạm dưới chân vách đá dốc đứng không có kè bảo vệ.',
    keyTakeawayEn: 'Do not build temporary dwellings beneath unprotected steep rock cuts.',
    safetyTipVi: 'Cắm biển cảnh báo và báo cho chính quyền xã ngay khi phát hiện vết nứt toác trên taluy đồi.',
    safetyTipEn: 'Report soil fissures to communal emergency responders promptly.',
    googleMapsQuery: 'Xã Lam Vỹ, Định Hóa, Thái Nguyên',
    tags: ['Định Hóa', 'Phú Lương', 'Sạt lở Quốc lộ 3', 'Phòng tránh thiên tai']
  },
  {
    id: 'sinkhole-vo-nhai-dong-hy',
    category: 'disaster',
    nameVi: 'Vùng Nguy cơ Karst Sụt Lún & Lũ Lụt Rừng Núi Đá (Võ Nhai - Đồng Hỷ)',
    nameEn: 'Karst Sinkhole & Flash Flood Zone (Vo Nhai - Dong Hy)',
    typeVi: 'Địa chất Karst · Hang động Đá vôi & Ngập úng Thung lũng Kín',
    typeEn: 'Karst Geology · Limestone Cavities & Closed Valley Inundation',
    locationVi: 'Xã La Hiên, Tràng Xá, Dân Tiến (Võ Nhai); Quang Sơn, Tân Long (Đồng Hỷ)',
    locationEn: 'La Hien, Trang Xa, Dan Tien (Vo Nhai); Quang Son (Dong Hy)',
    lat: 21.6920,
    lng: 106.0150,
    color: '#9f1239',
    img: 'https://media.baothainguyen.vn/upload/news/10_2024/vo-nhai-lu.jpg',
    descVi: 'Võ Nhai và Đồng Hỷ đặc trưng bởi cảnh quan núi đá vôi karst hiểm trở với nhiều hang ngầm và thung lũng kín. Khi mưa lớn dài ngày, các hố cát-tơ thoát nước ngầm bị nghẽn khiến thung lũng biến thành lòng hồ chứa ngập sâu hàng mét, cô lập nhiều xóm bản. Hiện tượng sụt lún hố sâu bất ngờ trên ruộng vườn cũng là nguy cơ địa chất cần đề phòng.',
    descEn: 'Vo Nhai and Dong Hy are characterized by jagged karst limestone peaks with subterranean cave systems and closed polje valleys. When sinkhole drains clog during intense downpours, valleys rapidly fill like lakes, isolating hamlet communities.',
    speechVi: 'Vùng núi đá vôi Võ Nhai và Đồng Hỷ có hệ thống dòng chảy ngầm phức tạp. Sau mưa lớn, nước trong các thung lũng kín dâng lên rất nhanh do hố sụt thoát không kịp, gây ngập cục bộ.',
    speechEn: 'Karst regions in Vo Nhai and Dong Hy feature intricate underground rivers. In storm seasons, clogged sinkholes cause rapid flooding inside closed mountain basins.',
    keyTakeawayVi: 'Tránh xa các miệng hố sụt karst khi đất đang ẩm ướt; kiểm tra an toàn giếng khoan và nền nhà.',
    keyTakeawayEn: 'Stay clear of karst sinkholes during rain and check ground stability regularly.',
    safetyTipVi: 'Tuyệt đối không vào hang đá trú ẩn khi trời giông bão lớn vì nguy cơ nước lũ dâng ngập hang.',
    safetyTipEn: 'Never seek shelter inside caves during storms due to swift flash flood inundation.',
    googleMapsQuery: 'Xã La Hiên, Võ Nhai, Thái Nguyên',
    tags: ['Núi đá Võ Nhai', 'Karst sụt lún', 'Thung lũng ngập', 'An toàn mùa mưa']
  }
];

export const FIVE_TEAS: TeaRegion[] = [
  {
    id: 'tan-cuong',
    nameVi: 'Vùng chè Tân Cương',
    nameEn: 'Tan Cuong Tea Region',
    locationVi: 'Xã Tân Cương, Phúc Xuân, Phúc Trìu (TP. Thái Nguyên)',
    locationEn: 'Tan Cuong, Phuc Xuan, Phuc Triu (Thai Nguyen City)',
    lat: 21.5480,
    lng: 105.7480,
    flavorProfileVi: 'Hương cốm non tinh tế, nước xanh non ánh vàng óng, vị chát dịu nhẹ đầu lưỡi, hậu ngọt thanh rất sâu và lâu phai.',
    flavorProfileEn: 'Delicate young green rice aroma, luminous yellow-tinted green liquor, gentle upfront astringency, deep lingering sweetness.',
    featuresVi: [
      'Được mệnh danh là "Đệ nhất danh trà" của Việt Nam',
      'Đất sỏi đỏ son pha sét dưới dãy Tam Đảo, tưới bởi sông Công',
      'Được cấp Chứng nhận Chỉ dẫn Địa lý Quốc gia từ năm 2007',
      'Đa dạng dòng trà: Trà Đinh ngọc, Trà Tôm nõn, Trà Móc câu'
    ],
    featuresEn: [
      'Renowned as the "First Class Tea" of Vietnam',
      'Reddish gravel-clay soil nourished by Cong River under Tam Dao',
      'Awarded National Protected Geographical Indication since 2007',
      'Exquisite variants: Dinh Tea (Single bud), Tom Non, Moccau'
    ],
    ocopInfo: 'Sản phẩm OCOP 5 sao Quốc gia',
    highlight: 'Hạt nhân thương hiệu Trà Thái Nguyên vang danh thế giới',
    img: 'https://dltm-cdn.vnptit3.vn/resources/portal/Images/TNN/namdan.tnn/Thang82022/%C4%90i%E1%BB%83mdul%E1%BB%8Bchc%E1%BB%99ng%C4%91%E1%BB%93ngx%C3%A3T%C3%A2nC%C6%B0%C6%A1ng/1_637974763093762926.png'
  },
  {
    id: 'la-bang',
    nameVi: 'Vùng chè La Bằng',
    nameEn: 'La Bang Tea Region',
    locationVi: 'Xã La Bằng, Huyện Đại Từ',
    locationEn: 'La Bang Commune, Dai Tu District',
    lat: 21.5720,
    lng: 105.6020,
    flavorProfileVi: 'Hương bùi tự nhiên thoang thoảng hoa rừng, vị đậm đà thanh tao, màu nước sánh vàng như giọt nắng mùa thu.',
    flavorProfileEn: 'Natural nutty wildflower notes, crisp savory body, amber gold liquor reminiscent of autumn sunshine.',
    featuresVi: [
      'Tọa lạc ngay sườn đông Tam Đảo, độ ẩm cao quanh năm',
      'Nguồn nước ngầm mát lành từ các khe suối rừng nguyên sinh',
      'Tiên phong áp dụng canh tác hữu cơ và mã vùng trồng số hóa',
      'Có tới 6 sản phẩm được chứng nhận OCOP'
    ],
    featuresEn: [
      'Perched on eastern Tam Dao slope with high year-round humidity',
      'Pure freshwater streams emerging from ancient primeval forests',
      'Pioneer in organic agriculture & digital traceability QR codes',
      'Boasts 6 distinguished OCOP certified products'
    ],
    ocopInfo: '6 Sản phẩm OCOP (3 đến 4 sao)',
    highlight: 'Sự hòa quyện tuyệt vời giữa thiên nhiên Tam Đảo và quy trình hữu cơ',
    img: 'https://i0.wp.com/loctancuong.com/wp-content/uploads/2024/01/doi-che-thai-nguyen.jpg?resize=700%2C393&ssl=1'
  },
  {
    id: 'trai-cai',
    nameVi: 'Vùng chè Trại Cài',
    nameEn: 'Trai Cai Tea Region',
    locationVi: 'Xã Minh Lập, Huyện Đồng Hỷ',
    locationEn: 'Minh Lap Commune, Dong Hy District',
    lat: 21.6450,
    lng: 105.8920,
    flavorProfileVi: 'Vị đậm ngậy, hương thơm nồng nàn, bền nước vượt trội qua 5–6 lần châm, màu nước xanh mướt giữ nguyên độ sánh.',
    flavorProfileEn: 'Rich, creamy mouthfeel, heady aromatic bouquet, exceptional endurance across 5-6 infusions with emerald clarity.',
    featuresVi: [
      'Đất phù sa bồi đắp từ thung lũng sông Sỏi',
      'Phương pháp ủ vò thủ công gia truyền gìn giữ độ tinh chất',
      'Được người sành trà miền Bắc vô cùng ưa chuộng vì độ "đượm"',
      'Mỗi chén trà mở ra cảm giác sảng khoái và ấm nồng'
    ],
    featuresEn: [
      'Rich alluvial sediment from the winding Soi River basin',
      'Generational artisanal rolling techniques preserving tea catechins',
      'Prized by northern connoisseurs for its full-bodied warmth',
      'Each cup unlocks invigorating freshness and comfort'
    ],
    ocopInfo: 'Chứng nhận Nhãn hiệu tập thể & OCOP 4 sao',
    highlight: 'Đậm đà, ngậy nước, hương vị bền bỉ cùng thời gian',
    img: 'https://media.baothainguyen.vn/upload/news/1_2022/7_1_2022/tra-trai-cai.jpg'
  },
  {
    id: 'khe-coc',
    nameVi: 'Vùng chè Khe Cốc',
    nameEn: 'Khe Coc Tea Region',
    locationVi: 'Xã Vô Tranh, Huyện Phú Lương',
    locationEn: 'Vo Tranh Commune, Phu Luong District',
    lat: 21.7250,
    lng: 105.7890,
    flavorProfileVi: 'Hương thơm ngọt ngào cỏ mật, vị chát êm dịu, hậu vị ngọt sâu và sảng khoái, lưu hương rất lâu.',
    flavorProfileEn: 'Sweet meadow grass fragrance, silky gentle astringency, enduring honeyed aftertaste.',
    featuresVi: [
      'Đồi đất bát úp màu mỡ thuộc miền bán sơn địa Phú Lương',
      'Hợp tác xã kiểu mẫu với chuỗi liên kết hàng trăm hộ dân',
      'Đạt chứng nhận hữu cơ quốc tế và OCOP 4 sao',
      'Phát triển mô hình du lịch trải nghiệm hái chè cùng nghệ nhân'
    ],
    featuresEn: [
      'Fertile dome-shaped rolling hills in midland Phu Luong',
      'Model agricultural cooperative uniting hundreds of farming households',
      'Awarded international organic certificates & 4-star OCOP',
      'Popular agro-tourism where guests hand-pluck buds with masters'
    ],
    ocopInfo: 'OCOP 4 sao & Chứng nhận Hữu cơ Quốc tế',
    highlight: 'Hình mẫu chè hữu cơ gắn với sinh kế bền vững và du lịch trải nghiệm',
    img: 'https://media.baothainguyen.vn/upload/news/10_2023/16_10_2023/khe-coc.jpg'
  },
  {
    id: 'bang-phuc',
    nameVi: 'Vùng chè Shan Tuyết Bằng Phúc',
    nameEn: 'Bang Phuc Shan Tuyet Tea Region',
    locationVi: 'Xã Bằng Phúc & Đồng Phúc, Vùng cao Thái Nguyên',
    locationEn: 'Bang Phuc & Dong Phuc Communes, Highland Thai Nguyen',
    lat: 22.1850,
    lng: 105.7620,
    flavorProfileVi: 'Hương thơm hoang dã của mây núi và sương sớm, nước sánh như mật ong rừng, vị ngọt hậu tinh khiết vô cùng thanh sạch.',
    flavorProfileEn: 'Wild alpine bouquet of morning mist, golden liquor like forest honey, celestial purity with lasting sweetness.',
    featuresVi: [
      'Cây chè cổ thụ hàng trăm năm tuổi cao lớn như cây rừng',
      'Độ cao trên 800 - 1.000m, quanh năm mây mù bao phủ',
      'Búp chè ngậm tuyết trắng xóa, hoàn toàn sinh trưởng tự nhiên',
      'Được đồng bào Dao, Tày thu hái công phu từ ngọn cây cổ thụ'
    ],
    featuresEn: [
      'Centuries-old ancient tea trees standing tall like forest giants',
      'Elevations over 800-1000m shrouded in perpetual cloud cover',
      'Silver-white downy hairs blanket each thick, robust shoot',
      'Harvested with great skill by Tay and Dao highland climbers'
    ],
    ocopInfo: 'Sản phẩm OCOP đặc sản vùng cao Thái Nguyên',
    highlight: 'Báu vật thiên nhiên hoang sơ ngậm sương mây xứ núi',
    img: 'https://media.baothainguyen.vn/upload/news/11_2021/28_11_2021/shan-tuyet.jpg'
  }
];

export const CURRICULUM_SECTIONS: CurriculumSection[] = [
  {
    id: 'sec-1',
    number: '01',
    titleVi: 'Di tích Lịch sử và Địa danh Tiêu biểu',
    titleEn: 'Historical Sites & Notable Landmarks',
    summaryVi: 'Tìm hiểu các di tích lịch sử cách mạng hào hùng, các danh thắng tự nhiên và ý thức bảo vệ cảnh quan quê hương.',
    summaryEn: 'Explore historic revolutionary strongholds, breathtaking natural landscapes, and civic stewardship.',
    icon: 'Landmark',
    topics: [
      {
        titleVi: 'ATK Định Hóa – Thủ đô Gió ngàn Kháng chiến',
        titleEn: 'ATK Dinh Hoa – Revolutionary Wind Capital',
        contentVi: 'Trong thời kỳ kháng chiến chống thực dân Pháp (1946–1954), Định Hóa được chọn làm An toàn khu (ATK) trung tâm. Tại đây, Bác Hồ, Tổng Bí thư Trường Chinh và Đại tướng Võ Nguyên Giáp đã đưa ra những quyết sách quan trọng bậc nhất cho vận mệnh dân tộc. Các di tích tiêu biểu như Lán Tỉn Keo, Đồi Khau Ty, Hang Sa Duyên, Đèo De luôn là địa chỉ đỏ giáo dục truyền thống yêu nước cho các thế hệ học sinh.',
        contentEn: 'During the anti-French resistance (1946–1954), Dinh Hoa was selected as the central Safe Zone (ATK). President Ho Chi Minh and military leaders engineered historic campaigns that secured national sovereignty. Crucial sites include Tin Keo Hut, Khau Ty Hill, and De Pass.',
        placeId: 'atk-dinh-hoa',
        img: 'https://cdn.baophapluat.vn/w3840/uploaded/vuthilanh/2020_12_11/lan-tin-keo_wlkp.jpg'
      },
      {
        titleVi: 'Hồ Núi Cốc – Thắng cảnh & Thủy lợi Xứ Thái',
        titleEn: 'Nui Coc Lake – Scenic Ecotourism & Reservoir',
        contentVi: 'Hồ Núi Cốc được tạo nên bởi bàn tay con người ngăn dòng sông Công, gắn liền với huyền thoại Nàng Công hóa thành dòng sông xanh và Chàng Cốc hóa thành ngọn núi chờ đợi. Hồ điều tiết nước ngọt cho hàng vạn hecta lúa màu, phục vụ công nghiệp và là khu du lịch sinh thái nổi tiếng.',
        contentEn: 'Engineered by damming the Cong River, Nui Coc Lake is interwoven with the folk myth of Lady Cong and Lord Coc. The reservoir provides irrigation, municipal water, and vibrant eco-leisure facilities.',
        placeId: 'nui-coc-lake',
        img: 'https://phapluat.tuoitrethudo.vn/stores/news_dataimages/ngovihai/032021/11/11/in_article/2457_ho-nui-coc-thai-nguyen.jpg?rt=20210311112505'
      },
      {
        titleVi: 'Hồ Ba Bể – Kỳ quan Thiên nhiên Núi Đá Vôi',
        titleEn: 'Ba Be Lake – Natural Karst Geological Wonder',
        contentVi: 'Là một trong những hồ nước ngọt tự nhiên trên núi lớn nhất thế giới, hồ Ba Bể có phong cảnh sơn thủy hữu tình, hang động Puông, thác Đầu Đẳng và thảm thực vật nhiệt đới phong phú, là điểm tựa sinh thái quý giá của tỉnh.',
        contentEn: 'Among the world’s most pristine natural karst lakes, Ba Be is surrounded by dramatic limestone peaks, Puong Cave, Dau Dang Waterfall, and high-altitude rainforest ecosystems.',
        placeId: 'ba-be-lake',
        img: 'https://www.babenationalpark.com.vn/UserFiles/image/2025/Ba-Be-Lake.png'
      }
    ]
  },
  {
    id: 'sec-2',
    number: '02',
    titleVi: 'Di sản Văn hóa Vật thể và Phi vật thể',
    titleEn: 'Tangible & Intangible Cultural Heritage',
    summaryVi: 'Khám phá sự đa dạng văn hóa của 54 dân tộc anh em và các di sản văn hóa phi vật thể quý báu của tỉnh Thái Nguyên.',
    summaryEn: 'Discover the rich tapestry of ethnic cultures and world-recognized intangible traditions.',
    icon: 'Sparkles',
    topics: [
      {
        titleVi: 'Bảo tàng Văn hóa các Dân tộc Việt Nam',
        titleEn: 'Vietnam Museum of Ethnic Cultures',
        contentVi: 'Tọa lạc bên bờ sông Cầu lịch sử, bảo tàng là trung tâm nghiên cứu và bảo tồn di sản văn hóa 54 dân tộc Việt Nam. Học sinh có thể trực tiếp quan sát công cụ canh tác, trang phục dệt thổ cẩm, kiến trúc nhà ở truyền thống và đời sống tâm linh phong phú.',
        contentEn: 'Located along the Cau River, this national museum preserves living heritage, intricate textile looms, architecture, and spiritual rituals of Vietnam’s 54 ethnic nationalities.',
        placeId: 'museum-cultures',
        img: 'https://dltm-cdn.vnptit3.vn/resources/portal//Images/TNN/thienvn.tnn/b%E1%BA%A3o%20t%C3%A0ng/giaikkdieuthenngayxuanngochai_637653362495836859.jpg'
      },
      {
        titleVi: 'Khu Bảo tồn Làng Nhà Sàn Thái Hải',
        titleEn: 'Thai Hai Village Ecological Reserve',
        contentVi: 'Mô hình bảo tồn sống động nơi người Tày sinh hoạt dưới nếp nhà sàn cổ, nấu ăn bằng bếp lửa truyền thống, giữ gìn đạo đức hiếu nghĩa và bảo tồn các bài hát then cổ, được Tổ chức Du lịch Thế giới vinh danh.',
        contentEn: 'A living ethnic sanctuary where Tay families reside in restored ancestral stilt homes, practicing ancient folk gastronomy and preserving Then oral epics.',
        placeId: 'thai-hai-village',
        img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2021/04/lang-nha-san-thai-hai-1.jpg'
      }
    ]
  },
  {
    id: 'sec-3',
    number: '03',
    titleVi: 'Phong tục, Lễ hội & Văn hóa Dân tộc',
    titleEn: 'Customs, Festivals & Ethnic Traditions',
    summaryVi: 'Lễ hội Lồng Tồng xuống đồng, tiếng then đàn tính, tục ném còn và các nét đẹp tâm linh gắn kết cộng đồng làng bản.',
    summaryEn: 'Long Tong agricultural festival, ethereal Then singing, Tinh gourd lute, and communal games.',
    icon: 'PartyPopper',
    topics: [
      {
        titleVi: 'Lễ hội Lồng Tồng (Lễ hội Xuống đồng)',
        titleEn: 'Long Tong Festival (Going to the Field)',
        contentVi: 'Lễ hội Lồng Tồng diễn ra vào những ngày đầu xuân sau Tết Nguyên Đán tại các bản làng người Tày, Nùng. Người dân làm lễ tạ ơn Trời Đất, Thành hoàng làng, cầu cho mưa thuận gió hòa, mùa màng bội thu. Phần hội rộn rã với hội ném còn, đẩy gậy, kéo co, chọi gà và giao duyên hát Sli, hát Lượn.',
        contentEn: 'Celebrated in early lunar spring across Tay and Nung villages, Long Tong gives thanks to heaven and earth for benevolent rains and bumper harvests, followed by con ball throwing and folk contests.',
        img: 'https://media.baothainguyen.vn/upload/news/2_2023/long-tong.jpg'
      },
      {
        titleVi: 'Nghệ thuật Hát Then và Đàn Tính',
        titleEn: 'Then Singing & Tinh Lute Intangible Heritage',
        contentVi: 'Thực hành Then của người Tày, Nùng, Thái ở Việt Nam đã được UNESCO ghi danh là Di sản Văn hóa Phi vật thể đại diện của nhân loại. Cây đàn tính làm từ nửa quả bầu khô kết hợp giọng then mộc mạc không chỉ dùng trong các nghi lễ cầu mùa, giải hạn mà còn là khúc hát tâm tình của người vùng cao.',
        contentEn: 'Then singing and the Tinh gourd lute are recognized as UNESCO Intangible Cultural Heritage. Chanted during ceremonies for blessings, peace, and harvests, Then is the soul of Tay-Nung identity.',
        img: 'https://media.baothainguyen.vn/upload/news/12_2022/hat-then.jpg'
      }
    ]
  },
  {
    id: 'sec-4',
    number: '04',
    titleVi: 'Làng nghề & Sản phẩm – Ngũ Đại Danh Trà',
    titleEn: 'Traditional Crafts & The 5 Famous Tea Terroirs',
    summaryVi: 'Kỹ nghệ trồng, chăm sóc, thu hái và bí quyết chế biến danh trà Thái Nguyên cùng 5 vùng trà đặc sản nức danh.',
    summaryEn: 'Artisanal harvesting, pan-frying secrets, and the distinct characteristics of the 5 legendary teas.',
    icon: 'Coffee',
    topics: [
      {
        titleVi: 'Quy trình Kỹ thuật Sản xuất Trà Thủ công',
        titleEn: 'Traditional Tea Crafting Workflow',
        contentVi: 'Quy trình sản xuất gồm 6 bước công phu: 1. Thu hái búp chuẩn "1 tôm 2 lá" vào sáng sớm khi sương vừa ráo -> 2. Làm héo nhẹ để búp chè dẻo dai -> 3. Xào diệt men bằng chảo gang hoặc tôn quay -> 4. Vò chè để làm dập tế bào lá và tạo hình cánh xoăn -> 5. Sao lăn khô tạo cánh trà đanh chắc -> 6. Lấy hương bằng lửa củi nhỏ tạo mùi thơm cốm đặc trưng.',
        contentEn: 'Six artisanal steps: 1. Early morning harvesting of the top bud and two tender leaves -> 2. Gentle withering -> 3. High-heat pan de-enzyming -> 4. Hand or drum rolling -> 5. Final drying -> 6. Low-heat wood-fired scent elevation unlocking young rice aromas.',
        img: 'https://i0.wp.com/loctancuong.com/wp-content/uploads/2024/01/doi-che-thai-nguyen.jpg?resize=700%2C393&ssl=1'
      },
      {
        titleVi: 'Khám phá Ngũ Đại Danh Trà Thái Nguyên',
        titleEn: 'Exploring the 5 Famous Tea Terroirs',
        contentVi: 'Năm vùng chè tiêu biểu: Tân Cương (Thơm cốm non, tiền chát hậu ngọt), La Bằng (Hương bùi ngát, đất núi Tam Đảo), Trại Cài (Đậm ngậy bền nước bên sông Sỏi), Khe Cốc (Chè hữu cơ sinh thái xanh), Bằng Phúc (Chè Shan tuyết cổ thụ ngậm mây sương vùng cao).',
        contentEn: 'Five legendary regions: Tan Cuong (young rice fragrance), La Bang (Tam Dao organic mountain flavor), Trai Cai (rich full body & Soi River mineral), Khe Coc (sustainable cooperative tea), and Bang Phuc (ancient Shan Tuyet tree tea).',
        placeId: 'tea-tan-cuong',
        img: 'https://dltm-cdn.vnptit3.vn/resources/portal/Images/TNN/namdan.tnn/Thang82022/%C4%90i%E1%BB%83mdul%E1%BB%8Bchc%E1%BB%99ng%C4%91%E1%BB%93ngx%C3%A3T%C3%A2nC%C6%B0%C6%A1ng/1_637974763093762926.png'
      }
    ]
  },
  {
    id: 'sec-5',
    number: '05',
    titleVi: 'Lịch sử Khảo cổ, Địa lý & Thiên tai',
    titleEn: 'Archaeology, Geography & Disaster Safety',
    summaryVi: 'Dấu ấn cư trú của người tiền sử tại Mái đá Ngườm, đặc điểm địa hình đồi núi, hệ thống sông ngòi và kỹ năng phòng chống lũ quét, sạt lở.',
    summaryEn: 'Prehistoric human migration at Nguom Rock, complex mountainous terrains, and disaster preparedness.',
    icon: 'ShieldAlert',
    topics: [
      {
        titleVi: 'Mái đá Ngườm – Dấu tích Người Tiền sử',
        titleEn: 'Nguom Rock Shelter – Prehistoric Cradle',
        contentVi: 'Di chỉ khảo cổ học Mái đá Ngườm (Võ Nhai) minh chứng con người đã sinh sống tại Thái Nguyên từ thời kỳ đồ đá cũ (30.000–40.000 năm trước). Hàng vạn công cụ đá cuội ghè đẽo cho thấy đời sống săn bắt, hái lượm và thích ứng với môi trường tự nhiên của tổ tiên.',
        contentEn: 'Nguom Rock Shelter in Vo Nhai proves human presence in Thai Nguyen dating back 30,000–40,000 years to the Upper Paleolithic era, yielding thousands of primitive pebble stone tools.',
        placeId: 'nguom-rock-shelter',
        img: 'https://file3.qdnd.vn/data/images/0/2022/10/24/nguyenminhhai/mai-da-nguom.jpg'
      },
      {
        titleVi: 'Khí hậu, Lũ lụt & Kỹ năng Phòng tránh Sạt lở',
        titleEn: 'Climate, Flooding & Landslide Survival Skills',
        contentVi: 'Thái Nguyên có mùa mưa lớn từ tháng 5 đến tháng 10. Mưa tập trung gây ngập úng ven sông Cầu và sạt lở taluy ở các huyện miền núi. Học sinh cần nắm vững quy tắc 4 Không: Không bơi lội trong dòng nước lũ; Không đi qua ngầm tràn khi nước chảy xiết; Không đứng gần gốc cây to và vách núi dốc đứng khi giông bão; Không chạm vào dây điện hay cột điện khi đường ngập ngụa.',
        contentEn: 'Thai Nguyen monsoon peaks from May through October, causing heavy surges along the Cau River and slope collapses. Students must observe the 4 Golden Safety Rules: never swim in floods; never cross flooded spillways; avoid steep talus slopes during rainstorms; avoid submerged power cables.',
        placeId: 'flood-cau-river',
        img: 'https://media.baothainguyen.vn/upload/news/9_2024/10_9_2024/ngap-lut-song-cau.jpg'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    qVi: 'Vùng chè nào của Thái Nguyên nổi tiếng với đặc trưng "nước xanh non ánh vàng, hương thơm cốm non, tiền chát dịu hậu ngọt sâu"?',
    qEn: 'Which tea region in Thai Nguyen is famous for its pale green liquor, delicate fresh young rice fragrance, and deep lingering sweet aftertaste?',
    optionsVi: ['Đồi chè Tân Cương', 'Vùng chè Mộc Châu', 'Vùng chè Bảo Lộc', 'Đồi chè Suối Giàng'],
    optionsEn: ['Tan Cuong Tea Region', 'Moc Chau Tea Region', 'Bao Loc Tea Region', 'Suoi Giang Tea Region'],
    correctIndex: 0,
    explanationVi: 'Tân Cương (TP. Thái Nguyên) là vùng lõi làm nên thương hiệu "Đệ nhất danh trà" với hương cốm non và vị hậu ngọt sâu lắng đặc trưng.',
    explanationEn: 'Tan Cuong is the beating heart of Thai Nguyen tea, famed for its distinct young-rice aroma and lingering sweetness.',
    category: 'tea'
  },
  {
    id: 2,
    qVi: 'Trong cuộc kháng chiến chống thực dân Pháp, di tích ATK Định Hóa được mệnh danh là gì?',
    qEn: 'During the resistance against the French, what honorific title was ATK Dinh Hoa known as?',
    optionsVi: ['Thủ đô Hoa vàng', 'Thủ đô Gió ngàn', 'Cửa ngõ biên cương', 'Thành đồng Tổ quốc'],
    optionsEn: ['Golden Flower Capital', 'Capital of Wind and Forests', 'Border Fortress Gate', 'Steel Citadel of the Homeland'],
    correctIndex: 1,
    explanationVi: 'ATK Định Hóa được mệnh danh là "Thủ đô Gió ngàn" – nơi Bác Hồ và Trung ương Đảng đặt cơ quan đầu não kháng chiến.',
    explanationEn: 'ATK Dinh Hoa was celebrated as the "Wind Capital" where Ho Chi Minh and military commanders led the war of independence.',
    category: 'history'
  },
  {
    id: 3,
    qVi: 'Hồ nước ngọt tự nhiên lớn nhất miền Bắc nằm giữa vùng núi đá vôi hiện thuộc địa giới tỉnh Thái Nguyên là hồ nào?',
    qEn: 'Which largest natural freshwater karst lake in northern Vietnam is located within the current provincial borders of Thai Nguyen?',
    optionsVi: ['Hồ Tây', 'Hồ Thác Bà', 'Hồ Ba Bể', 'Hồ Núi Cốc'],
    optionsEn: ['West Lake', 'Thac Ba Lake', 'Ba Be Lake', 'Nui Coc Lake'],
    correctIndex: 2,
    explanationVi: 'Hồ Ba Bể là hồ nước ngọt tự nhiên trên núi đá vôi kỳ vĩ hình thành trên 200 triệu năm trước, thuộc Vườn quốc gia Ba Bể.',
    explanationEn: 'Ba Be Lake is the world-renowned natural freshwater karst mountain lake formed over 200 million years ago.',
    category: 'geography'
  },
  {
    id: 4,
    qVi: 'Đâu KHÔNG PHẢI là một trong "Ngũ đại danh trà" của vùng đất Thái Nguyên?',
    qEn: 'Which of the following is NOT one of Thai Nguyen’s "Five Famous Tea Regions"?',
    optionsVi: ['Chè La Bằng (Đại Từ)', 'Chè Cầu Đất (Đà Lạt)', 'Chè Trại Cài (Đồng Hỷ)', 'Chè Khe Cốc (Phú Lương)'],
    optionsEn: ['La Bang Tea (Dai Tu)', 'Cau Dat Tea (Da Lat)', 'Trai Cai Tea (Dong Hy)', 'Khe Coc Tea (Phu Luong)'],
    correctIndex: 1,
    explanationVi: 'Ngũ đại danh trà Thái Nguyên gồm 5 vùng: Tân Cương, La Bằng, Trại Cài, Khe Cốc và Bằng Phúc. Cầu Đất thuộc Lâm Đồng.',
    explanationEn: 'The Five Famous Tea Regions of Thai Nguyen are Tan Cuong, La Bang, Trai Cai, Khe Coc, and Bang Phuc. Cau Dat belongs to Lam Dong.',
    category: 'tea'
  },
  {
    id: 5,
    qVi: 'Khi đi tham quan di tích lịch sử và danh lam thắng cảnh, hành động nào sau đây là ĐÚNG ĐẮN?',
    qEn: 'When visiting historical monuments and natural scenic sites, which action is RESPONSIBLE and CORRECT?',
    optionsVi: [
      'Khắc tên lên thân cây và bia đá để lưu niệm',
      'Giữ gìn vệ sinh, không xả rác và tuân thủ nội quy di tích',
      'Leo trèo lên các hiện vật trưng bày để chụp ảnh',
      'Bẻ cành hái hoa trong khuôn viên'
    ],
    optionsEn: [
      'Carving initials onto trees or ancient steles',
      'Keeping clean, not littering, and respecting heritage rules',
      'Climbing onto fragile artifacts for selfies',
      'Picking wild flowers and snapping branches'
    ],
    correctIndex: 1,
    explanationVi: 'Bảo vệ di tích và giữ gìn môi trường sinh thái là trách nhiệm văn minh của mỗi học sinh để gìn giữ di sản cho mai sau.',
    explanationEn: 'Safeguarding cultural relics and preserving scenic ecosystems is the civic responsibility of every student.',
    category: 'ethics'
  },
  {
    id: 6,
    qVi: 'Khi có tin cảnh báo lũ sông Cầu dâng cao hoặc mưa dầm sạt lở đất, việc làm nào nguy hiểm CẦN TRÁNH TUYỆT ĐỐI?',
    qEn: 'When alerts for Cau River flooding or hillside landslides are issued, which action is EXTREMELY DANGEROUS and must be strictly avoided?',
    optionsVi: [
      'Theo dõi thông tin dự báo trên đài truyền hình, loa truyền thanh địa phương',
      'Ra bờ sông xem nước lũ, bơi lội hoặc cố vượt qua ngầm tràn nước chảy xiết',
      'Kê cao đồ đạc và chuẩn bị đèn pin, nước sạch',
      'Sơ tán cùng gia đình theo hướng dẫn của lực lượng cứu hộ'
    ],
    optionsEn: [
      'Monitoring weather forecasts via official regional bulletins',
      'Going to riverbanks to watch surges, swimming, or crossing flooded spillways',
      'Elevating essential belongings and packing flashlights and clean water',
      'Evacuating calmly with family according to emergency authorities'
    ],
    correctIndex: 1,
    explanationVi: 'Nước lũ chảy xiết có thể cuốn trôi người và xe cộ trong chớp mắt. Tuyệt đối không hiếu kỳ ra xem lũ hoặc lội qua dòng nước xoáy.',
    explanationEn: 'Raging flood currents can sweep away people and vehicles in seconds. Never venture out to spectate floods or ford swift waters.',
    category: 'safety'
  },
  {
    id: 7,
    qVi: 'Di sản Thực hành Then của người Tày, Nùng ở Thái Nguyên đã được tổ chức nào công nhận là Di sản Văn hóa Phi vật thể đại diện của nhân loại?',
    qEn: 'Then practice of the Tay and Nung peoples in Thai Nguyen has been inscribed as Intangible Cultural Heritage of Humanity by which organization?',
    optionsVi: ['UNESCO', 'UNICEF', 'WHO', 'WWF'],
    optionsEn: ['UNESCO', 'UNICEF', 'WHO', 'WWF'],
    correctIndex: 0,
    explanationVi: 'UNESCO đã chính thức ghi danh Thực hành Then của người Tày, Nùng, Thái ở Việt Nam là Di sản Văn hóa Phi vật thể của nhân loại năm 2019.',
    explanationEn: 'UNESCO officially inscribed Then practices of the Tay, Nung, and Thai ethnic groups onto the Representative List in 2019.',
    category: 'culture'
  },
  {
    id: 8,
    qVi: 'Di chỉ khảo cổ học Mái đá Ngườm (Huyện Võ Nhai) có niên đại cách ngày nay khoảng bao nhiêu năm?',
    qEn: 'Approximately how long ago did prehistoric humans inhabit the Nguom Rock Shelter archaeological site in Vo Nhai?',
    optionsVi: ['Khoảng 500 – 1.000 năm', 'Khoảng 2.000 – 3.000 năm', 'Khoảng 30.000 – 40.000 năm', 'Khoảng 200 – 300 năm'],
    optionsEn: ['About 500 – 1,000 years ago', 'About 2,000 – 3,000 years ago', 'About 30,000 – 40,000 years ago', 'About 200 – 300 years ago'],
    correctIndex: 2,
    explanationVi: 'Mái đá Ngườm có các lớp văn hóa đá cũ cách ngày nay 30.000 - 40.000 năm, chứng minh con người tiền sử đã cư ngụ lâu đời tại Thái Nguyên.',
    explanationEn: 'Nguom Rock Shelter artifacts date back 30,000 - 40,000 years, certifying Thai Nguyen as an ancient prehistoric settlement.',
    category: 'history'
  },
  {
    id: 9,
    qVi: 'Tiêu chuẩn hái búp chè tươi truyền thống làm nên các dòng trà thượng hạng của Thái Nguyên là gì?',
    qEn: 'What is the traditional plucking standard for premium grade Thai Nguyen specialty tea?',
    optionsVi: [
      'Cắt cả cành già dài 50cm',
      'Hái tiêu chuẩn "1 tôm 2 lá" non vào buổi sớm',
      'Hái lá già sát gốc cây',
      'Dùng máy cắt xén cả hoa và quả'
    ],
    optionsEn: [
      'Cutting long 50cm mature branches',
      'Plucking the "1 bud and 2 tender leaves" standard in early morning',
      'Plucking tough basal foliage near roots',
      'Shearing bushes randomly including blooms and seeds'
    ],
    correctIndex: 1,
    explanationVi: 'Búp chè "1 tôm 2 lá" chứa hàm lượng tanin, axit amin và hương thơm thanh khiết nhất, tạo nên phẩm cấp trà ngon tuyệt đỉnh.',
    explanationEn: 'The "one bud and two leaves" standard concentrates delicate catechins, amino acids, and essential aromas.',
    category: 'tea'
  },
  {
    id: 10,
    qVi: 'Lễ hội Lồng Tồng truyền thống của đồng bào Tày, Nùng thường được tổ chức vào thời gian nào trong năm?',
    qEn: 'When is the traditional Long Tong (Going-to-the-Field) festival of the Tay and Nung peoples usually held?',
    optionsVi: [
      'Đầu mùa xuân (tháng Giêng âm lịch sau Tết)',
      'Giữa mùa hè oi bức',
      'Đêm rằm Trung thu',
      'Ngày cuối cùng của năm'
    ],
    optionsEn: [
      'Early spring (first lunar month after Tet)',
      'Mid-summer heat',
      'Mid-Autumn Festival night',
      'On the final day of the year'
    ],
    correctIndex: 0,
    explanationVi: 'Lễ hội Lồng Tồng diễn ra vào tháng Giêng đầu xuân để tạ ơn thần linh và bắt đầu vụ mùa canh tác mới trong năm.',
    explanationEn: 'Long Tong is celebrated in the first lunar month of spring to inaugurate the new planting season and pray for fertile crops.',
    category: 'culture'
  }
];

export const SAFETY_GUIDES = [
  {
    id: 'flood',
    titleVi: 'Kỹ Năng An Toàn Khi Xảy Ra Lũ Lụt & Ngập Úng',
    titleEn: 'Safety Protocols During Floods & Urban Inundation',
    icon: 'Waves',
    tipsVi: [
      'Thường xuyên theo dõi bản tin dự báo mực nước sông Cầu và cảnh báo ngập trên loa phát thanh hoặc điện thoại.',
      'Kê cao bàn học, sách vở, thiết bị điện tử lên tầng 2 hoặc nơi cao ráo trước khi nước tràn vào.',
      'Tuyệt đối không lội nước, bơi lội, chèo bè hoặc câu cá ở khu vực nước lũ sông đang dâng cao.',
      'Cẩn thận nguy cơ rò rỉ điện: Ngắt ngay cầu dao điện tổng nếu tầng trệt bị ngập nước.',
      'Khi phải di chuyển qua vùng ngập nông, đi sát lề đường an toàn, dùng gậy dò đường để tránh hố ga mất nắp.'
    ],
    tipsEn: [
      'Constantly monitor Cau River flood bulletins via regional emergency radio or phone channels.',
      'Elevate school supplies, laptops, and electrical equipment to second floors before floodwaters encroach.',
      'Never wade, swim, raft, or fish in rising river currents or swift overflow streams.',
      'Prevent electrical leakage: switch off main power breakers if ground levels become waterlogged.',
      'When traversing shallow inundated sidewalks, probe forward with a stick to check for missing manhole grates.'
    ]
  },
  {
    id: 'landslide',
    titleVi: 'Kỹ Năng Phòng Tránh Sạt Lở Đất & Lũ Quét Vùng Núi',
    titleEn: 'Landslide & Mountain Flash Flood Survival Measures',
    icon: 'Mountain',
    tipsVi: [
      'Dấu hiệu nhận biết: Nước suối đột ngột đổi sang màu đỏ đục, có tiếng gầm rống từ sườn núi, xuất hiện vết nứt toác trên mặt đất.',
      'Khi phát hiện sạt lở: Nhanh chóng chạy vuông góc với hướng sạt trượt, chạy lên sườn đồi cao hơn (không chạy xuôi theo lòng khe suối).',
      'Không đi qua ngầm tràn, cầu tạm khi nước lũ đang tràn qua bề mặt cầu.',
      'Gia đình ở chân vách núi dốc phải chủ động sơ tán sang nhà người thân ở vùng an toàn khi có mưa dầm kéo dài 2-3 ngày.',
      'Sau thiên tai, không vội vàng quay lại hiện trường sạt lở vì đất đá còn bão hòa nước rất dễ trượt lở tiếp lần thứ hai.'
    ],
    tipsEn: [
      'Warning signs: mountain stream water turning murky reddish-brown, deep rumbling sounds, or new ground fissures.',
      'Escape maneuver: sprint perpendicular to the slide path towards higher ground; never run down along ravines.',
      'Never attempt to traverse low-level bridges or culverts when swift water is washing over the road deck.',
      'Households near steep cuts should preemptively evacuate to safe community shelters after 48 hours of continuous rain.',
      'Do not rush back to slide zones immediately, as soaked slope debris often triggers lethal secondary collapses.'
    ]
  }
];
