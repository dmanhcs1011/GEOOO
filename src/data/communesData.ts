export interface Commune {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  type: 'Xã' | 'Phường' | 'Thị trấn';
  featureVi: string;
  featureEn: string;
  areaKm2?: number;
  highlight?: string;
}

export const COMMUNES_92: Commune[] = [
  // TP. Thái Nguyên (15 đơn vị)
  {
    id: 'tn-phan-dinh-phung',
    name: 'Phan Đình Phùng',
    district: 'TP. Thái Nguyên',
    lat: 21.5932,
    lng: 105.8441,
    type: 'Phường',
    featureVi: 'Trung tâm hành chính tỉnh, Bảo tàng Văn hóa các Dân tộc Việt Nam',
    featureEn: 'Provincial administrative center, Vietnam Museum of Ethnic Cultures',
    highlight: 'Trung tâm chính trị văn hóa'
  },
  {
    id: 'tn-hoang-van-thu',
    name: 'Hoàng Văn Thụ',
    district: 'TP. Thái Nguyên',
    lat: 21.5975,
    lng: 105.8398,
    type: 'Phường',
    featureVi: 'Khu thương mại dịch vụ sầm uất, tuyến đường ngập úng mùa mưa',
    featureEn: 'Commercial center, low-lying street flood hotspot',
    highlight: 'Thương mại & Dịch vụ'
  },
  {
    id: 'tn-luong-ngoc-quyen',
    name: 'Lương Ngọc Quyến',
    district: 'TP. Thái Nguyên',
    lat: 21.5890,
    lng: 105.8340,
    type: 'Phường',
    featureVi: 'Tập trung Bệnh viện Đa khoa Trung ương, Đại học Y Dược',
    featureEn: 'Healthcare & educational hub with Central General Hospital',
    highlight: 'Trung tâm Y tế & Giáo dục'
  },
  {
    id: 'tn-tuc-duyen',
    name: 'Túc Duyên',
    district: 'TP. Thái Nguyên',
    lat: 21.5830,
    lng: 105.8560,
    type: 'Phường',
    featureVi: 'Vùng bãi bồi ven sông Cầu, trọng điểm ngập lụt báo động 3',
    featureEn: 'Cau River floodplain, critical flood danger zone',
    highlight: 'Trọng điểm ngập lụt Sông Cầu'
  },
  {
    id: 'tn-gia-sang',
    name: 'Gia Sàng',
    district: 'TP. Thái Nguyên',
    lat: 21.5710,
    lng: 105.8590,
    type: 'Phường',
    featureVi: 'Khu vực ven sông Cầu, công nghiệp luyện kim Gang Thép',
    featureEn: 'Cau River riverside ward, steel industrial base',
    highlight: 'Khu dân cư ven sông'
  },
  {
    id: 'tn-tich-luong',
    name: 'Tích Lương',
    district: 'TP. Thái Nguyên',
    lat: 21.5580,
    lng: 105.8450,
    type: 'Phường',
    featureVi: 'Trường Đại học Kỹ thuật Công nghiệp, cửa ngõ phía nam',
    featureEn: 'Technical University, southern gateway',
    highlight: 'Làng đại học kỹ thuật'
  },
  {
    id: 'tn-linh-son',
    name: 'Linh Sơn',
    district: 'TP. Thái Nguyên',
    lat: 21.6120,
    lng: 105.8750,
    type: 'Xã',
    featureVi: 'Vùng trồng ổi, rau an toàn bãi bồi ven sông Cầu, ngập khi lũ dâng',
    featureEn: 'Alluvial fruit orchards, agricultural flood-prone riverbank',
    highlight: 'Vùng ổi đặc sản Linh Sơn'
  },
  {
    id: 'tn-tan-cuong',
    name: 'Tân Cương',
    district: 'TP. Thái Nguyên',
    lat: 21.5480,
    lng: 105.7480,
    type: 'Xã',
    featureVi: 'Thủ phủ Vùng chè Tân Cương trứ danh Đệ nhất danh trà Việt Nam',
    featureEn: 'Heart of Tan Cuong Prime Tea Region, National GI',
    highlight: 'Đệ nhất danh trà Tân Cương'
  },
  {
    id: 'tn-phuc-triu',
    name: 'Phúc Trìu',
    district: 'TP. Thái Nguyên',
    lat: 21.5540,
    lng: 105.7120,
    type: 'Xã',
    featureVi: 'Cửa ngõ khu du lịch Hồ Núi Cốc, vùng trồng chè đồi bát úp',
    featureEn: 'Gateway to Nui Coc Lake resort, rolling tea hills',
    highlight: 'Du lịch Hồ Núi Cốc'
  },
  {
    id: 'tn-phuc-xuan',
    name: 'Phúc Xuân',
    district: 'TP. Thái Nguyên',
    lat: 21.5820,
    lng: 105.7250,
    type: 'Xã',
    featureVi: 'Vùng chè sinh thái xanh bát ngát, trải nghiệm homestay',
    featureEn: 'Eco tea plantations and community agrotourism',
    highlight: 'Vùng chè sinh thái'
  },
  {
    id: 'tn-thinh-duc',
    name: 'Thịnh Đức',
    district: 'TP. Thái Nguyên',
    lat: 21.5412,
    lng: 105.7950,
    type: 'Xã',
    featureVi: 'Khu Bảo tồn Làng Nhà Sàn Du Lịch Sinh Thái Thái Hải',
    featureEn: 'Thai Hai Tay Stilt House Eco-Cultural Reserve',
    highlight: 'Làng sinh thái Thái Hải'
  },
  {
    id: 'tn-quyet-thang',
    name: 'Quyết Thắng',
    district: 'TP. Thái Nguyên',
    lat: 21.5650,
    lng: 105.7820,
    type: 'Xã',
    featureVi: 'Thuộc Vùng chè Tân Cương mở rộng và khu Đại học Thái Nguyên',
    featureEn: 'Part of Tan Cuong tea terroir and university town',
    highlight: 'Chè Tân Cương & Giáo dục'
  },
  {
    id: 'tn-cam-gia',
    name: 'Cam Giá',
    district: 'TP. Thái Nguyên',
    lat: 21.5520,
    lng: 105.8650,
    type: 'Phường',
    featureVi: 'Cái nôi công nghiệp Gang Thép Thái Nguyên đầu tiên',
    featureEn: 'Historical cradle of Vietnamese iron and steel',
    highlight: 'Cái nôi Gang Thép'
  },
  {
    id: 'tn-dong-bam',
    name: 'Đồng Bẩm',
    district: 'TP. Thái Nguyên',
    lat: 21.6080,
    lng: 105.8520,
    type: 'Phường',
    featureVi: 'Khu đô thị sinh thái bên bờ tả sông Cầu',
    featureEn: 'Eco-urban district across the Cau River',
    highlight: 'Bờ tả Sông Cầu'
  },
  {
    id: 'tn-dong-lien',
    name: 'Đồng Liên',
    district: 'TP. Thái Nguyên',
    lat: 21.5750,
    lng: 105.8950,
    type: 'Xã',
    featureVi: 'Khu vực bãi bồi phía đông nam TP, nông nghiệp hữu cơ',
    featureEn: 'Southeastern agricultural commune, river lowlands',
    highlight: 'Vùng nông nghiệp xanh'
  },

  // TP. Sông Công (5 đơn vị)
  {
    id: 'sc-thang-loi',
    name: 'Thắng Lợi',
    district: 'TP. Sông Công',
    lat: 21.4920,
    lng: 105.8420,
    type: 'Phường',
    featureVi: 'Trung tâm hành chính thương mại của thành phố Sông Công',
    featureEn: 'Administrative center of Song Cong City',
    highlight: 'Trung tâm TP. Sông Công'
  },
  {
    id: 'sc-cai-dan',
    name: 'Cải Đan',
    district: 'TP. Sông Công',
    lat: 21.4810,
    lng: 105.8510,
    type: 'Phường',
    featureVi: 'Khu công nghiệp cơ khí phụ trợ lớn',
    featureEn: 'Mechanical manufacturing industrial zone',
    highlight: 'Công nghiệp Phụ trợ'
  },
  {
    id: 'sc-bach-quang',
    name: 'Bách Quang',
    district: 'TP. Sông Công',
    lat: 21.5080,
    lng: 105.8350,
    type: 'Phường',
    featureVi: 'Ven bờ sông Công, khu dân cư và tiểu thủ công nghiệp',
    featureEn: 'Riverside district along the Cong River',
    highlight: 'Khu dân cư bờ Sông Công'
  },
  {
    id: 'sc-binh-son',
    name: 'Bình Sơn',
    district: 'TP. Sông Công',
    lat: 21.5120,
    lng: 105.7850,
    type: 'Xã',
    featureVi: 'Vùng trồng chè và cây ăn quả đặc sản, hồ Ghềnh Chè',
    featureEn: 'Tea farms and eco-tourism at Ghenh Che Lake',
    highlight: 'Du lịch Hồ Ghềnh Chè'
  },
  {
    id: 'sc-ba-xuyen',
    name: 'Bá Xuyên',
    district: 'TP. Sông Công',
    lat: 21.4650,
    lng: 105.8620,
    type: 'Xã',
    featureVi: 'Vùng nuôi trồng thủy sản và rau sạch công nghệ cao',
    featureEn: 'High-tech agricultural and aquaculture zone',
    highlight: 'Nông nghiệp Công nghệ cao'
  },

  // TX. Phổ Yên (6 đơn vị)
  {
    id: 'py-ba-hang',
    name: 'Ba Hàng',
    district: 'TX. Phổ Yên',
    lat: 21.4180,
    lng: 105.8650,
    type: 'Phường',
    featureVi: 'Trung tâm thị xã Phổ Yên, ga Phổ Yên trên tuyến đường sắt',
    featureEn: 'Urban heart of Pho Yen town, railway station',
    highlight: 'Trung tâm TX. Phổ Yên'
  },
  {
    id: 'py-bac-son',
    name: 'Bắc Sơn',
    district: 'TX. Phổ Yên',
    lat: 21.4350,
    lng: 105.8520,
    type: 'Phường',
    featureVi: 'Vùng đồi trồng chè và phát triển dịch vụ công nghiệp',
    featureEn: 'Hilly tea production and industrial logistics',
    highlight: 'Đồi chè Bắc Sơn'
  },
  {
    id: 'py-dong-tien',
    name: 'Đồng Tiến',
    district: 'TX. Phổ Yên',
    lat: 21.4120,
    lng: 105.8820,
    type: 'Phường',
    featureVi: 'Tổ hợp công nghệ cao Samsung Electronics Yên Bình',
    featureEn: 'Samsung Electronics high-tech mega complex',
    highlight: 'Tổ hợp Công nghiệp Samsung'
  },
  {
    id: 'py-dac-son',
    name: 'Đắc Sơn',
    district: 'TX. Phổ Yên',
    lat: 21.4050,
    lng: 105.8150,
    type: 'Xã',
    featureVi: 'Di tích Đền Lục Giáp, văn hóa truyền thống xứ Phổ Yên',
    featureEn: 'Luc Giap Temple cultural historic monument',
    highlight: 'Di tích Đền Lục Giáp'
  },
  {
    id: 'py-van-phai',
    name: 'Vạn Phái',
    district: 'TX. Phổ Yên',
    lat: 21.3850,
    lng: 105.8450,
    type: 'Xã',
    featureVi: 'Vùng đất trũng ven sông Công, ngập lụt cục bộ mùa mưa',
    featureEn: 'Lowland basin along Cong River, flood risk',
    highlight: 'Vùng ven Sông Công'
  },
  {
    id: 'py-tien-phong',
    name: 'Tiên Phong',
    district: 'TX. Phổ Yên',
    lat: 21.4280,
    lng: 105.9150,
    type: 'Xã',
    featureVi: 'Vùng đồng bằng lúa nước giáp Bắc Giang',
    featureEn: 'Rice granary bordering Bac Giang province',
    highlight: 'Đồng lúa phì nhiêu'
  },

  // Huyện Đại Từ (13 đơn vị)
  {
    id: 'dt-hung-son',
    name: 'Hùng Sơn',
    district: 'Huyện Đại Từ',
    lat: 21.6350,
    lng: 105.6380,
    type: 'Thị trấn',
    featureVi: 'Trung tâm chính trị kinh tế huyện Đại Từ, chợ Chè lớn',
    featureEn: 'District capital of Dai Tu, central tea exchange',
    highlight: 'Trung tâm Huyện Đại Từ'
  },
  {
    id: 'dt-la-bang',
    name: 'La Bằng',
    district: 'Huyện Đại Từ',
    lat: 21.5720,
    lng: 105.6020,
    type: 'Xã',
    featureVi: 'Ngũ Đại Danh Trà: Vùng chè sinh thái Tam Đảo có 6 OCOP',
    featureEn: '5 Famous Teas: La Bang organic tea at Tam Dao base',
    highlight: 'Ngũ Đại Danh Trà La Bằng'
  },
  {
    id: 'dt-tan-thai',
    name: 'Tân Thái',
    district: 'Huyện Đại Từ',
    lat: 21.5667,
    lng: 105.6833,
    type: 'Xã',
    featureVi: 'Khu du lịch Hồ Núi Cốc, bến thuyền du ngoạn ngắm cảnh',
    featureEn: 'Nui Coc Lake tourism hub, boat docks and islands',
    highlight: 'Thắng cảnh Hồ Núi Cốc'
  },
  {
    id: 'dt-quan-chu',
    name: 'Quân Chu',
    district: 'Huyện Đại Từ',
    lat: 21.5030,
    lng: 105.5890,
    type: 'Thị trấn',
    featureVi: 'Thị trấn chân núi Tam Đảo, nguy cơ sạt lở taluy mùa lũ',
    featureEn: 'Township under Tam Dao slope, landslide warning area',
    highlight: 'Khu vực chân Tam Đảo'
  },
  {
    id: 'dt-ky-phu',
    name: 'Ký Phú',
    district: 'Huyện Đại Từ',
    lat: 21.5350,
    lng: 105.6120,
    type: 'Xã',
    featureVi: 'Rừng phòng hộ Tam Đảo, hồ Gò Miếu, cảnh báo lũ quét suối',
    featureEn: 'Tam Dao watershed protection forest, Go Mieu lake',
    highlight: 'Hồ Gò Miếu & Rừng Tam Đảo'
  },
  {
    id: 'dt-my-yen',
    name: 'Mỹ Yên',
    district: 'Huyện Đại Từ',
    lat: 21.5620,
    lng: 105.6350,
    type: 'Xã',
    featureVi: 'Vùng đồi chè hữu cơ và rừng nguyên sinh chân núi',
    featureEn: 'Organic tea cultivation alongside mountain reserve',
    highlight: 'Vùng chè chân núi'
  },
  {
    id: 'dt-van-yen',
    name: 'Văn Yên',
    district: 'Huyện Đại Từ',
    lat: 21.5950,
    lng: 105.6150,
    type: 'Xã',
    featureVi: 'Địa hình đồi dốc, suối nguồn từ rừng quốc gia Tam Đảo',
    featureEn: 'Steep hill slopes, streams from National Park',
    highlight: 'Suối nguồn Tam Đảo'
  },
  {
    id: 'dt-hoang-nong',
    name: 'Hoàng Nông',
    district: 'Huyện Đại Từ',
    lat: 21.6150,
    lng: 105.5850,
    type: 'Xã',
    featureVi: 'Điểm du lịch suối Cửa Tử, thác nước rừng nhiệt đới',
    featureEn: 'Cua Tu mountain stream ecotourism and waterfalls',
    highlight: 'Thắng cảnh Suối Cửa Tử'
  },
  {
    id: 'dt-cat-ne',
    name: 'Cát Nê',
    district: 'Huyện Đại Từ',
    lat: 21.4820,
    lng: 105.6350,
    type: 'Xã',
    featureVi: 'Khu vực đồi núi giáp ranh Vĩnh Phúc, trồng rừng kinh tế',
    featureEn: 'Southern commune bordering Vinh Phuc, plantation forestry',
    highlight: 'Kinh tế đồi rừng'
  },
  {
    id: 'dt-cu-van',
    name: 'Cù Vân',
    district: 'Huyện Đại Từ',
    lat: 21.6150,
    lng: 105.6950,
    type: 'Xã',
    featureVi: 'Vùng giao lưu kinh tế với TP. Thái Nguyên, chè cành lai',
    featureEn: 'Economic crossroad with Thai Nguyen City, clone teas',
    highlight: 'Cửa ngõ Đông Đại Từ'
  },
  {
    id: 'dt-an-khanh',
    name: 'An Khánh',
    district: 'Huyện Đại Từ',
    lat: 21.6050,
    lng: 105.7420,
    type: 'Xã',
    featureVi: 'Khai thác khoáng sản than mỏ Khánh Hòa',
    featureEn: 'Khanh Hoa coal opencast mining area',
    highlight: 'Vùng mỏ khoáng sản'
  },
  {
    id: 'dt-yen-lang',
    name: 'Yên Lãng',
    district: 'Huyện Đại Từ',
    lat: 21.6850,
    lng: 105.5450,
    type: 'Xã',
    featureVi: 'Vùng tiếp giáp Tuyên Quang, đồi chè và rừng keo',
    featureEn: 'Western commune bordering Tuyen Quang, acacia and tea',
    highlight: 'Ranh giới Tây Bắc Đại Từ'
  },
  {
    id: 'dt-tien-hoi',
    name: 'Tiên Hội',
    district: 'Huyện Đại Từ',
    lat: 21.6250,
    lng: 105.6150,
    type: 'Xã',
    featureVi: 'Cái nôi trồng chè lâu đời của huyện Đại Từ',
    featureEn: 'Traditional heirloom tea growing community',
    highlight: 'Làng nghề chè cổ'
  },

  // Huyện Định Hóa (11 đơn vị)
  {
    id: 'dh-cho-chu',
    name: 'Chợ Chu',
    district: 'Huyện Định Hóa',
    lat: 21.9120,
    lng: 105.6480,
    type: 'Thị trấn',
    featureVi: 'Trung tâm huyện Định Hóa, di tích lịch sử Căng Chợ Chu',
    featureEn: 'Dinh Hoa capital, Cang Cho Chu revolutionary prison site',
    highlight: 'Trung tâm Huyện Định Hóa'
  },
  {
    id: 'dh-phu-dinh',
    name: 'Phú Đình',
    district: 'Huyện Định Hóa',
    lat: 21.8988,
    lng: 105.6322,
    type: 'Xã',
    featureVi: 'Di tích quốc gia đặc biệt Lán Tỉn Keo, Nhà tưởng niệm Đèo De',
    featureEn: 'Special National Relic: Tin Keo Hut, Uncle Ho Commemorative House',
    highlight: 'Thủ đô Kháng chiến ATK'
  },
  {
    id: 'dh-diem-mac',
    name: 'Điềm Mặc',
    district: 'Huyện Định Hóa',
    lat: 21.8850,
    lng: 105.6750,
    type: 'Xã',
    featureVi: 'Nơi thành lập Hội Nhà báo Việt Nam, đồi Khau Ty Bác Hồ ở',
    featureEn: 'Founding site of Vietnam Journalists Association, Khau Ty Hill',
    highlight: 'Di tích Đồi Khau Ty'
  },
  {
    id: 'dh-bao-linh',
    name: 'Bảo Linh',
    district: 'Huyện Định Hóa',
    lat: 21.9520,
    lng: 105.6550,
    type: 'Xã',
    featureVi: 'Căn cứ địa cách mạng trong lòng dân, thung lũng lúa nếp vải',
    featureEn: 'ATK base in forested hills, traditional glutinous rice',
    highlight: 'Lúa nếp vải đặc sản'
  },
  {
    id: 'dh-lam-vy',
    name: 'Lam Vỹ',
    district: 'Huyện Định Hóa',
    lat: 21.9850,
    lng: 105.6200,
    type: 'Xã',
    featureVi: 'Địa hình đồi núi dốc đứng, khu vực nguy cơ cao sạt lở đất mùa mưa',
    featureEn: 'Steep rugged terrain, high landslide susceptibility',
    highlight: 'Vùng núi dốc sạt lở'
  },
  {
    id: 'dh-kim-phuong',
    name: 'Kim Phượng',
    district: 'Huyện Định Hóa',
    lat: 21.9420,
    lng: 105.6050,
    type: 'Xã',
    featureVi: 'Vùng biên giới giáp Tuyên Quang, nguy cơ trượt lở mái dốc',
    featureEn: 'Mountain border with Tuyen Quang, slope hazard zone',
    highlight: 'Vùng cao giáp ranh'
  },
  {
    id: 'dh-phuong-tien',
    name: 'Phượng Tiến',
    district: 'Huyện Định Hóa',
    lat: 21.9150,
    lng: 105.6120,
    type: 'Xã',
    featureVi: 'Di tích cơ quan Bộ Tổng tư lệnh Quân đội Nhân dân Việt Nam',
    featureEn: 'Military High Command headquarters historic relic',
    highlight: 'Di tích Bộ Tổng Tư lệnh'
  },
  {
    id: 'dh-yen-trach',
    name: 'Yên Trạch',
    district: 'Huyện Định Hóa',
    lat: 21.8820,
    lng: 105.5850,
    type: 'Xã',
    featureVi: 'Vùng rừng đầu nguồn và bản làng người Tày, Nùng',
    featureEn: 'Headwater protected woodland, Tay-Nung hamlets',
    highlight: 'Rừng phòng hộ đầu nguồn'
  },
  {
    id: 'dh-trung-hoi',
    name: 'Trung Hội',
    district: 'Huyện Định Hóa',
    lat: 21.8750,
    lng: 105.6550,
    type: 'Xã',
    featureVi: 'Vùng thung lũng trù phú trồng quế, chè và lúa nước',
    featureEn: 'Fertile valley producing cinnamon, tea and paddy rice',
    highlight: 'Vùng thung lũng xanh'
  },
  {
    id: 'dh-tan-thinh',
    name: 'Tân Thịnh',
    district: 'Huyện Định Hóa',
    lat: 21.9350,
    lng: 105.6850,
    type: 'Xã',
    featureVi: 'Vùng nông thôn mới, giao thông kết nối sang Chợ Đồn',
    featureEn: 'Rural commune connecting to Cho Don route',
    highlight: 'Cửa ngõ phía Bắc ATK'
  },
  {
    id: 'dh-dinh-bien',
    name: 'Định Biên',
    district: 'Huyện Định Hóa',
    lat: 21.9250,
    lng: 105.6180,
    type: 'Xã',
    featureVi: 'Di tích Lán Khuôn Tát Bác Hồ từng sinh sống và làm việc',
    featureEn: 'Khuon Tat Hut relic where Uncle Ho worked',
    highlight: 'Di tích Lán Khuôn Tát'
  },

  // Huyện Phú Lương (7 đơn vị)
  {
    id: 'pl-du',
    name: 'Đu',
    district: 'Huyện Phú Lương',
    lat: 21.7320,
    lng: 105.7520,
    type: 'Thị trấn',
    featureVi: 'Trung tâm thị trấn huyện lỵ Phú Lương, ngã ba Quốc lộ 3',
    featureEn: 'Capital town of Phu Luong on Highway 3 junction',
    highlight: 'Trung tâm Huyện Phú Lương'
  },
  {
    id: 'pl-giang-tien',
    name: 'Giang Tiên',
    district: 'Huyện Phú Lương',
    lat: 21.6750,
    lng: 105.7820,
    type: 'Thị trấn',
    featureVi: 'Thị trấn cửa ngõ phía nam kết nối TP. Thái Nguyên',
    featureEn: 'Southern gateway town connecting to Thai Nguyen City',
    highlight: 'Thị trấn Cửa ngõ Nam'
  },
  {
    id: 'pl-vo-tranh',
    name: 'Vô Tranh',
    district: 'Huyện Phú Lương',
    lat: 21.7250,
    lng: 105.7890,
    type: 'Xã',
    featureVi: 'Ngũ Đại Danh Trà: Vùng chè Khe Cốc hữu cơ quốc tế và sinh kế xanh',
    featureEn: '5 Famous Teas: Khe Coc international organic tea cooperative',
    highlight: 'Ngũ Đại Danh Trà Khe Cốc'
  },
  {
    id: 'pl-tuc-tranh',
    name: 'Tức Tranh',
    district: 'Huyện Phú Lương',
    lat: 21.7050,
    lng: 105.8120,
    type: 'Xã',
    featureVi: 'Làng nghề chè truyền thống, đồi chè bát úp uốn lượn tuyệt đẹp',
    featureEn: 'Heirloom tea craft village with picturesque undulating hills',
    highlight: 'Làng nghề Chè truyền thống'
  },
  {
    id: 'pl-dong-dat',
    name: 'Động Đạt',
    district: 'Huyện Phú Lương',
    lat: 21.7650,
    lng: 105.7650,
    type: 'Xã',
    featureVi: 'Di tích Đền Đuổm thờ Danh tướng Dương Tự Minh thời Lý',
    featureEn: 'Duom Temple national relic honoring General Duong Tu Minh',
    highlight: 'Di tích Quốc gia Đền Đuổm'
  },
  {
    id: 'pl-phu-ly',
    name: 'Phủ Lý',
    district: 'Huyện Phú Lương',
    lat: 21.7920,
    lng: 105.7250,
    type: 'Xã',
    featureVi: 'Vùng cao Phú Lương, sản xuất chè sạch và bảo vệ rừng keo',
    featureEn: 'Highland commune producing clean tea and afforestation',
    highlight: 'Vùng cao Phú Lương'
  },
  {
    id: 'pl-yen-do',
    name: 'Yên Đổ',
    district: 'Huyện Phú Lương',
    lat: 21.8150,
    lng: 105.7420,
    type: 'Xã',
    featureVi: 'Dọc Quốc lộ 3 lên Bắc Kạn, nguy cơ sạt lở taluy dương',
    featureEn: 'Along Highway 3 northwards, cut-slope landslide risk',
    highlight: 'Tuyến Quốc lộ 3'
  },

  // Huyện Đồng Hỷ (8 đơn vị)
  {
    id: 'dh-song-cau',
    name: 'Sông Cầu',
    district: 'Huyện Đồng Hỷ',
    lat: 21.6620,
    lng: 105.8850,
    type: 'Thị trấn',
    featureVi: 'Thị trấn Nông trường chè Sông Cầu lịch sử',
    featureEn: 'Historic Song Cau Tea State Farm township',
    highlight: 'Nông trường chè Sông Cầu'
  },
  {
    id: 'dh-trai-cau',
    name: 'Trại Cau',
    district: 'Huyện Đồng Hỷ',
    lat: 21.5850,
    lng: 105.9450,
    type: 'Thị trấn',
    featureVi: 'Khu vực mỏ quặng sắt Trại Cau nổi tiếng',
    featureEn: 'Trai Cau historical iron ore mining center',
    highlight: 'Vùng quặng sắt Trại Cau'
  },
  {
    id: 'dh-minh-lap',
    name: 'Minh Lập',
    district: 'Huyện Đồng Hỷ',
    lat: 21.6450,
    lng: 105.8920,
    type: 'Xã',
    featureVi: 'Ngũ Đại Danh Trà: Vùng chè Trại Cài "đậm ngậy, bền nước"',
    featureEn: '5 Famous Teas: Trai Cai rich body and enduring aroma',
    highlight: 'Ngũ Đại Danh Trà Trại Cài'
  },
  {
    id: 'dh-hoa-thuong',
    name: 'Hóa Thượng',
    district: 'Huyện Đồng Hỷ',
    lat: 21.6320,
    lng: 105.8520,
    type: 'Xã',
    featureVi: 'Trung tâm hành chính mới huyện Đồng Hỷ',
    featureEn: 'New administrative headquarters of Dong Hy',
    highlight: 'Trung tâm Huyện Đồng Hỷ'
  },
  {
    id: 'dh-khe-mo',
    name: 'Khe Mo',
    district: 'Huyện Đồng Hỷ',
    lat: 21.6250,
    lng: 105.9250,
    type: 'Xã',
    featureVi: 'Bản sắc đồng bào dân tộc Sán Dìu, đồi chè và mật ong',
    featureEn: 'San Diu ethnic identity, forest honey and tea',
    highlight: 'Văn hóa Sán Dìu'
  },
  {
    id: 'dh-quang-son',
    name: 'Quang Sơn',
    district: 'Huyện Đồng Hỷ',
    lat: 21.7120,
    lng: 105.8950,
    type: 'Xã',
    featureVi: 'Khu khai thác đá vôi và Nhà máy Xi măng Quang Sơn',
    featureEn: 'Limestone quarrying and Quang Son cement factory',
    highlight: 'Công nghiệp Xi măng'
  },
  {
    id: 'dh-tan-long',
    name: 'Tân Long',
    district: 'Huyện Đồng Hỷ',
    lat: 21.7520,
    lng: 105.8750,
    type: 'Xã',
    featureVi: 'Núi đá vôi hiểm trở, nguy cơ sụt lún karst mùa mưa',
    featureEn: 'Rugged karst cliffs, sinkhole subsidence hazard',
    highlight: 'Vùng Karst đá vôi'
  },
  {
    id: 'dh-van-han',
    name: 'Văn Hán',
    district: 'Huyện Đồng Hỷ',
    lat: 21.6050,
    lng: 105.9920,
    type: 'Xã',
    featureVi: 'Vùng trồng cây ăn quả vải, nhãn và đồi chè xanh',
    featureEn: 'Fruit orchards of lychee, longan and green tea',
    highlight: 'Vùng cây ăn quả Văn Hán'
  },

  // Huyện Võ Nhai (8 đơn vị)
  {
    id: 'vn-dinh-ca',
    name: 'Đình Cả',
    district: 'Huyện Võ Nhai',
    lat: 21.7450,
    lng: 106.0150,
    type: 'Thị trấn',
    featureVi: 'Trung tâm hành chính huyện vùng cao Võ Nhai',
    featureEn: 'District center of highland Vo Nhai',
    highlight: 'Trung tâm Huyện Võ Nhai'
  },
  {
    id: 'vn-than-sa',
    name: 'Thần Sa',
    district: 'Huyện Võ Nhai',
    lat: 21.6730,
    lng: 105.9920,
    type: 'Xã',
    featureVi: 'Di chỉ khảo cổ học Mái đá Ngườm tiền sử 40.000 năm trước',
    featureEn: 'Nguom Prehistoric Rock Shelter 40,000 years old',
    highlight: 'Di chỉ Mái đá Ngườm'
  },
  {
    id: 'vn-la-hien',
    name: 'La Hiên',
    district: 'Huyện Võ Nhai',
    lat: 21.6920,
    lng: 105.9150,
    type: 'Xã',
    featureVi: 'Đặc sản Na La Hiên nức tiếng, khai thác đá vôi',
    featureEn: 'Famed La Hien custard apples, limestone industry',
    highlight: 'Đặc sản Na La Hiên'
  },
  {
    id: 'vn-trang-xa',
    name: 'Tràng Xá',
    district: 'Huyện Võ Nhai',
    lat: 21.7150,
    lng: 106.0950,
    type: 'Xã',
    featureVi: 'Thung lũng đá vôi khép kín, nguy cơ ngập úng dài ngày',
    featureEn: 'Closed karst valley, susceptible to prolonged inundation',
    highlight: 'Thung lũng Tràng Xá'
  },
  {
    id: 'vn-dan-tien',
    name: 'Dân Tiến',
    district: 'Huyện Võ Nhai',
    lat: 21.6850,
    lng: 106.0650,
    type: 'Xã',
    featureVi: 'Vùng núi đá hiểm trở, cảnh báo lũ quét suối cạn',
    featureEn: 'Rugged mountainous zone, flash flood awareness',
    highlight: 'Địa bàn hiểm trở'
  },
  {
    id: 'vn-phu-thuong',
    name: 'Phú Thượng',
    district: 'Huyện Võ Nhai',
    lat: 21.7550,
    lng: 106.0350,
    type: 'Xã',
    featureVi: 'Danh thắng Hang Phượng Hoàng và Suối Mỏ Gà kỳ vĩ',
    featureEn: 'Phuong Hoang Cave and Mo Ga subterranean stream',
    highlight: 'Hang Phượng Hoàng - Suối Mỏ Gà'
  },
  {
    id: 'vn-nghinh-tuong',
    name: 'Nghinh Tường',
    district: 'Huyện Võ Nhai',
    lat: 21.8520,
    lng: 106.0650,
    type: 'Xã',
    featureVi: 'Khu Bảo tồn Thiên nhiên Thần Sa - Phượng Hoàng',
    featureEn: 'Than Sa Nature Reserve, biodiversity sanctuary',
    highlight: 'Khu Bảo tồn Thiên nhiên'
  },
  {
    id: 'vn-sang-moc',
    name: 'Sảng Mộc',
    district: 'Huyện Võ Nhai',
    lat: 21.8950,
    lng: 105.9850,
    type: 'Xã',
    featureVi: 'Xã vùng cao xa xôi nhất huyện Võ Nhai giáp Bắc Kạn',
    featureEn: 'Remotest mountain commune bordering Bac Kan',
    highlight: 'Vùng cao Sảng Mộc'
  },

  // Huyện Phú Bình (7 đơn vị)
  {
    id: 'pb-huong-son',
    name: 'Hương Sơn',
    district: 'Huyện Phú Bình',
    lat: 21.4920,
    lng: 105.9650,
    type: 'Thị trấn',
    featureVi: 'Trung tâm thị trấn huyện lỵ Phú Bình',
    featureEn: 'Central administrative township of Phu Binh',
    highlight: 'Trung tâm Huyện Phú Bình'
  },
  {
    id: 'pb-kha-son',
    name: 'Kha Sơn',
    district: 'Huyện Phú Bình',
    lat: 21.4250,
    lng: 105.9850,
    type: 'Xã',
    featureVi: 'Di tích lịch sử Rừng Mơ thời kỳ tiền khởi nghĩa ATK II',
    featureEn: 'Rung Mo historic site of ATK II revolutionary zone',
    highlight: 'Di tích ATK II Rừng Mơ'
  },
  {
    id: 'pb-nga-my',
    name: 'Nga My',
    district: 'Huyện Phú Bình',
    lat: 21.4420,
    lng: 105.9450,
    type: 'Xã',
    featureVi: 'Vùng trọng điểm chăn nuôi gia cầm Gà đồi Phú Bình',
    featureEn: 'Heart of Phu Binh hill-chicken livestock industry',
    highlight: 'Gà đồi Phú Bình OCOP'
  },
  {
    id: 'pb-diem-thuy',
    name: 'Điềm Thụy',
    district: 'Huyện Phú Bình',
    lat: 21.5150,
    lng: 105.9150,
    type: 'Xã',
    featureVi: 'Khu công nghiệp Điềm Thụy hiện đại và năng động',
    featureEn: 'Diem Thuy modern industrial park complex',
    highlight: 'Khu Công nghiệp Điềm Thụy'
  },
  {
    id: 'pb-uc-ky',
    name: 'Úc Kỳ',
    district: 'Huyện Phú Bình',
    lat: 21.4650,
    lng: 105.9950,
    type: 'Xã',
    featureVi: 'Làng nghề Tương nếp Úc Kỳ nổi danh miền Bắc',
    featureEn: 'Traditional fermented glutinous rice paste village',
    highlight: 'Làng nghề Tương nếp Úc Kỳ'
  },
  {
    id: 'pb-tan-khanh',
    name: 'Tân Khánh',
    district: 'Huyện Phú Bình',
    lat: 21.5450,
    lng: 105.9850,
    type: 'Xã',
    featureVi: 'Vùng chăn nuôi ngựa bạch và cây ăn quả bán sơn địa',
    featureEn: 'White horse breeding and orchard farming',
    highlight: 'Nuôi ngựa bạch đặc sản'
  },
  {
    id: 'pb-bao-ly',
    name: 'Bảo Lý',
    district: 'Huyện Phú Bình',
    lat: 21.4850,
    lng: 105.9450,
    type: 'Xã',
    featureVi: 'Vùng đồng trũng lúa cao sản ven sông Đào',
    featureEn: 'Lowland rice paddies along Dao River',
    highlight: 'Vựa lúa cao sản'
  },

  // Khu vực Vùng Ba Bể & Phía Bắc (Khu vực mở rộng sáp nhập - 12 đơn vị)
  {
    id: 'bb-ba-be',
    name: 'Ba Bể',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.4167,
    lng: 105.6167,
    type: 'Xã',
    featureVi: 'Khu Thắng cảnh Di tích Quốc gia Đặc biệt Hồ Ba Bể',
    featureEn: 'Special National Relic: Ba Be Karst Lake Center',
    highlight: 'Viên ngọc xanh Hồ Ba Bể'
  },
  {
    id: 'bb-nam-mau',
    name: 'Nam Mẫu',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.4050,
    lng: 105.6230,
    type: 'Xã',
    featureVi: 'Bản du lịch cộng đồng người Tày Pác Ngòi ven hồ Ba Bể',
    featureEn: 'Pac Ngoi Tay ethnic ecotourism lakeside village',
    highlight: 'Bản Pác Ngòi ven hồ'
  },
  {
    id: 'bb-khang-ninh',
    name: 'Khang Ninh',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.4350,
    lng: 105.6520,
    type: 'Xã',
    featureVi: 'Cửa ngõ Vườn quốc gia Ba Bể, rừng mưa nhiệt đới đá vôi',
    featureEn: 'Gateway to Ba Be National Park rainforests',
    highlight: 'Cửa ngõ Vườn Quốc Gia'
  },
  {
    id: 'bb-quang-khe',
    name: 'Quảng Khê',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.3650,
    lng: 105.6650,
    type: 'Xã',
    featureVi: 'Vùng đồi rừng đầu nguồn và canh tác lúa thung lũng',
    featureEn: 'Headwater forested hills and valley paddy',
    highlight: 'Rừng phòng hộ Ba Bể'
  },
  {
    id: 'bb-bang-phuc',
    name: 'Bằng Phúc',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.1850,
    lng: 105.7620,
    type: 'Xã',
    featureVi: 'Ngũ Đại Danh Trà: Vùng chè Shan tuyết cổ thụ vùng cao mây phủ',
    featureEn: '5 Famous Teas: Century-old Shan Tuyet ancient trees',
    highlight: 'Ngũ Đại Danh Trà Bằng Phúc'
  },
  {
    id: 'bb-dong-phuc',
    name: 'Đồng Phúc',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.1520,
    lng: 105.7850,
    type: 'Xã',
    featureVi: 'Vùng chè Shan tuyết, khí hậu mát mẻ độ cao 900m',
    featureEn: 'High-altitude Shan Tuyet tea at 900m elevation',
    highlight: 'Chè Shan tuyết Đồng Phúc'
  },
  {
    id: 'bb-yen-duong',
    name: 'Yến Dương',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.4120,
    lng: 105.7150,
    type: 'Xã',
    featureVi: 'Làng nghề trồng bí xanh thơm Ba Bể đạt OCOP 4 sao',
    featureEn: 'Ba Be aromatic squash cooperative with 4-star OCOP',
    highlight: 'Bí xanh thơm Ba Bể'
  },
  {
    id: 'bb-dia-linh',
    name: 'Địa Linh',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.4280,
    lng: 105.7520,
    type: 'Xã',
    featureVi: 'Thung lũng trồng trọt trù phú và cánh đồng hoa',
    featureEn: 'Alluvial valley farming and seasonal floral fields',
    highlight: 'Cánh đồng trù phú'
  },
  {
    id: 'bb-cho-ra',
    name: 'Chợ Rã',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.4550,
    lng: 105.7120,
    type: 'Thị trấn',
    featureVi: 'Trung tâm thị trấn huyện lỵ vùng hồ Ba Bể',
    featureEn: 'Central township of the northern Ba Be lake basin',
    highlight: 'Thị trấn trung tâm Ba Bể'
  },
  {
    id: 'bb-cho-don',
    name: 'Chợ Đồn',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.1520,
    lng: 105.5920,
    type: 'Thị trấn',
    featureVi: 'An toàn khu (ATK) Chợ Đồn di tích kháng chiến chống Pháp',
    featureEn: 'ATK Cho Don revolutionary base heritage',
    highlight: 'Di tích ATK Chợ Đồn'
  },
  {
    id: 'bb-bach-thong',
    name: 'Bạch Thông',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 22.2520,
    lng: 105.8520,
    type: 'Thị trấn',
    featureVi: 'Di tích Chiến thắng Đồn Phủ Thông lịch sử năm 1948',
    featureEn: 'Historic Phu Thong Post victory relic of 1948',
    highlight: 'Di tích Đồn Phủ Thông'
  },
  {
    id: 'bb-cho-moi',
    name: 'Chợ Mới',
    district: 'Vùng Ba Bể & Mở Rộng',
    lat: 21.8750,
    lng: 105.8350,
    type: 'Thị trấn',
    featureVi: 'Cửa ngõ kết nối phía bắc dọc Quốc lộ 3 với Thái Nguyên',
    featureEn: 'Northern transportation gateway along Highway 3',
    highlight: 'Cửa ngõ Quốc lộ 3'
  }
];
