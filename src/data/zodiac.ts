// Dữ liệu tử vi 12 con giáp năm Bính Ngọ 2026 - Mega Database
export interface ZodiacInfo {
  name: string;
  emoji: string;
  element: string;
  luckyColor: string;
  luckyNumber: number[];
  overview: string;
  career: string;
  love: string;
  education: string;
  advice: string;
}

export const ZODIAC_ANIMALS: Record<string, ZodiacInfo> = {
  'Tý': {
    name: 'Tý (Chuột)', emoji: '🐭', element: 'Thủy',
    luckyColor: 'Xanh dương, Trắng', luckyNumber: [3, 7, 9],
    overview: 'Năm Bính Ngọ 2026 là năm xung đối với tuổi Tý, nhưng với sự cố gắng và kiên trì, bạn vẫn vượt qua mọi thử thách.',
    career: 'Sự nghiệp có biến động, nên cẩn trọng trong quyết định lớn. Quý nhân phù trợ ở quý 3.',
    love: 'Tình cảm cần kiên nhẫn và thấu hiểu. Người độc thân có cơ hội gặp người phù hợp vào mùa thu.',
    education: 'Học hành cần tập trung cao độ. Thi cử thuận lợi nếu chuẩn bị kỹ lưỡng.',
    advice: 'Giữ tâm bình an, tránh xung đột. Đầu tư vào bản thân và kiến thức.'
  },
  'Sửu': {
    name: 'Sửu (Trâu)', emoji: '🐂', element: 'Thổ',
    luckyColor: 'Vàng, Nâu', luckyNumber: [1, 5, 8],
    overview: 'Năm 2026 mang đến nhiều cơ hội tốt. Sự chăm chỉ và kiên trì được đền đáp xứng đáng.',
    career: 'Công việc hanh thông, có cơ hội thăng tiến hoặc chuyển đổi nghề nghiệp tích cực.',
    love: 'Tình duyên nở rộ, người có đôi thêm gắn bó. Người độc thân dễ gặp nhân duyên mới.',
    education: 'Học hành tiến bộ vượt bậc, thuận lợi cho các kỳ thi quan trọng.',
    advice: 'Mạnh dạn nắm bắt cơ hội, đừng ngại thay đổi.'
  },
  'Dần': {
    name: 'Dần (Hổ)', emoji: '🐯', element: 'Mộc',
    luckyColor: 'Xanh lá, Đỏ', luckyNumber: [2, 6, 8],
    overview: 'Tuổi Dần gặp năm Ngọ là Tam Hợp, vận khí rất tốt! Đây là năm bứt phá.',
    career: 'Sự nghiệp thăng hoa, nhiều cơ hội hợp tác kinh doanh. Tài lộc dồi dào.',
    love: 'Tình duyên thuận lợi, mối quan hệ bền chặt. Cặp đôi có thể tiến tới hôn nhân.',
    education: 'Trí tuệ minh mẫn, học gì cũng nhanh tiếp thu. Rất tốt cho du học.',
    advice: 'Tận dụng tối đa vận may, giữ khiêm tốn khi thành công.'
  },
  'Mão': {
    name: 'Mão (Mèo)', emoji: '🐱', element: 'Mộc',
    luckyColor: 'Xanh ngọc, Hồng', luckyNumber: [3, 4, 9],
    overview: 'Năm 2026 tương đối bình ổn. Nỗ lực năm trước bắt đầu cho quả ngọt.',
    career: 'Công việc ổn định, có thay đổi nhỏ tích cực. Tài chính khá tốt.',
    love: 'Tình cảm êm đềm, cần thêm lãng mạn. Cơ hội tốt cho người muốn kết hôn.',
    education: 'Học hành đều đặn, kết quả tỷ lệ thuận với công sức.',
    advice: 'Duy trì nhịp sống cân bằng, chăm sóc sức khỏe tinh thần.'
  },
  'Thìn': {
    name: 'Thìn (Rồng)', emoji: '🐉', element: 'Thổ',
    luckyColor: 'Vàng kim, Đỏ tía', luckyNumber: [1, 6, 7],
    overview: 'Năm Bính Ngọ rất thuận lợi. Rồng gặp ngựa tạo nên sức mạnh phi thường.',
    career: 'Đại cát cho sự nghiệp! Thành tựu lớn, thăng tiến nhanh chóng.',
    love: 'Nhân duyên tốt đẹp, tình cảm nồng nàn. Cả hai cùng phát triển.',
    education: 'Học hành xuất sắc, dễ đạt thành tích cao.',
    advice: 'Năm đại lợi, mạnh dạn khởi nghiệp. Nhớ chia sẻ may mắn.'
  },
  'Tỵ': {
    name: 'Tỵ (Rắn)', emoji: '🐍', element: 'Hỏa',
    luckyColor: 'Đỏ, Cam', luckyNumber: [2, 5, 8],
    overview: 'Tuổi Tỵ năm Ngọ khá thuận lợi nhờ tương sinh. Vận may đến từ nhiều phía.',
    career: 'Công việc suôn sẻ, nhận được hỗ trợ từ cấp trên. Thu nhập tăng trưởng.',
    love: 'Tình duyên khởi sắc, dễ gặp đối tượng phù hợp.',
    education: 'Khả năng tập trung cao, phù hợp nghiên cứu chuyên sâu.',
    advice: 'Nắm bắt thời cơ, mở rộng mối quan hệ xã hội.'
  },
  'Ngọ': {
    name: 'Ngọ (Ngựa)', emoji: '🐴', element: 'Hỏa',
    luckyColor: 'Đỏ rực, Vàng', luckyNumber: [3, 7, 9],
    overview: 'ĐÂY LÀ NĂM CỦA BẠN! Tuổi Ngọ gặp Bính Ngọ cần cẩn trọng nhưng chứa nhiều may mắn lớn.',
    career: 'Nhiều thay đổi tích cực trong sự nghiệp. Cơ hội đột phá cuối năm.',
    love: 'Tình cảm có biến động nhưng kết quả tốt đẹp. Nhân duyên đặc biệt.',
    education: 'Năm bản mệnh giúp tập trung, quyết tâm cao. Thi cử vượt mong đợi.',
    advice: 'Đeo vật phẩm phong thủy hóa giải Thái Tuế. Giữ tinh thần lạc quan.'
  },
  'Mùi': {
    name: 'Mùi (Dê)', emoji: '🐐', element: 'Thổ',
    luckyColor: 'Nâu, Be', luckyNumber: [2, 4, 6],
    overview: 'Năm 2026 thuận lợi. Ngọ-Mùi lục hợp mang đến may mắn bất ngờ.',
    career: 'Được quý nhân phù trợ, công việc thuận buồm xuôi gió.',
    love: 'Tình duyên rực rỡ nhất trong nhiều năm! Hôn nhân hạnh phúc.',
    education: 'Học hành tốt, đặc biệt lĩnh vực nghệ thuật và sáng tạo.',
    advice: 'Năm may mắn, hãy tận dụng! Mở rộng quan hệ và đầu tư.'
  },
  'Thân': {
    name: 'Thân (Khỉ)', emoji: '🐵', element: 'Kim',
    luckyColor: 'Trắng, Bạc', luckyNumber: [1, 5, 9],
    overview: 'Gặp thử thách nhưng nhìn chung vẫn khá tốt với nhiều cơ hội.',
    career: 'Cần linh hoạt và sáng tạo. Thu nhập ổn định, có nguồn thu phụ.',
    love: 'Cần sự chân thành và kiên nhẫn. Tránh hiểu lầm không đáng.',
    education: 'Trí thông minh giúp tiếp thu nhanh. Nên học bổ sung kỹ năng.',
    advice: 'Giữ bình tĩnh trước biến động. Đầu tư kỹ năng mới.'
  },
  'Dậu': {
    name: 'Dậu (Gà)', emoji: '🐓', element: 'Kim',
    luckyColor: 'Trắng, Vàng nhạt', luckyNumber: [4, 6, 8],
    overview: 'Năm ổn định và phát triển. Mọi nỗ lực đều được ghi nhận.',
    career: 'Sự nghiệp tiến triển đều đặn. Cơ hội hợp tác mới tiềm năng.',
    love: 'Tình cảm bình yên, hạnh phúc. Gia đình hòa thuận.',
    education: 'Phù hợp học thêm chứng chỉ hoặc kỹ năng mới.',
    advice: 'Kiên trì với mục tiêu. Chú ý ăn uống và thể thao.'
  },
  'Tuất': {
    name: 'Tuất (Chó)', emoji: '🐕', element: 'Thổ',
    luckyColor: 'Vàng, Nâu đất', luckyNumber: [3, 5, 7],
    overview: 'Tuất-Ngọ Tam Hợp lửa, vận khí rất tốt! Năm rực rỡ.',
    career: 'Đại cát cho sự nghiệp! Thăng tiến nhanh, thu nhập tăng. Hợp khởi nghiệp.',
    love: 'Tình duyên thuận lợi, tiến triển nhanh. Năm tốt để kết hôn.',
    education: 'Trí tuệ sáng suốt, thành tích xuất sắc. Tốt cho du học.',
    advice: 'Năm đại lợi, nắm bắt mọi cơ hội. Đầu tư phát triển bản thân.'
  },
  'Hợi': {
    name: 'Hợi (Lợn)', emoji: '🐷', element: 'Thủy',
    luckyColor: 'Xanh đậm, Đen', luckyNumber: [2, 6, 9],
    overview: 'Năm 2026 mang sự cân bằng. Mọi thứ dần ổn định trở lại.',
    career: 'Công việc cải thiện rõ rệt, cơ hội mới bất ngờ.',
    love: 'Tình cảm ấm áp, chân thành. Gia đình thêm gắn kết.',
    education: 'Học hành thuận lợi, đặc biệt môn thực hành và ứng dụng.',
    advice: 'Mở lòng đón nhận cái mới. Chăm sóc tài chính cá nhân.'
  }
};

export function getZodiacAnimal(birthYear: number): string {
  const animals = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];
  return animals[birthYear % 12];
}

export function getElement(birthYear: number): string {
  const d = birthYear % 10;
  if (d === 0 || d === 1) return 'Kim';
  if (d === 2 || d === 3) return 'Thủy';
  if (d === 4 || d === 5) return 'Mộc';
  if (d === 6 || d === 7) return 'Hỏa';
  return 'Thổ';
}

export function getLunarAge(birthYear: number): number {
  return 2026 - birthYear + 1;
}

// ===================================================================
// MEGA DATABASE: 72 QUẺ MAY MẮN
// ===================================================================
interface FortuneStick {
  id: number;
  name: string;
  rating: number;
  title: string;
  poem: string;
  topic: 'all' | 'love' | 'career' | 'education';
}

export const FORTUNE_STICKS: FortuneStick[] = [
  // ========== QUẺ CHUNG (ALL) ==========
  { id: 1, name: 'Thượng Thượng', rating: 5, title: 'Đại Cát - Vạn Sự Như Ý', poem: 'Rồng bay phượng múa giữa trời xuân,\nVạn sự hanh thông đến mấy phần.\nTài lộc dồi dào như nước chảy,\nPhúc lành tràn ngập cả gia nhân.', topic: 'all' },
  { id: 2, name: 'Thượng Cát', rating: 4, title: 'Cát Tường - Thuận Buồm Xuôi Gió', poem: 'Gió xuân phơi phới đến bên thềm,\nMang theo may mắn sáng lung linh.\nĐường đời rộng mở ngàn hoa nở,\nHạnh phúc an khang suốt tháng ngày.', topic: 'all' },
  { id: 3, name: 'Trung Cát', rating: 3, title: 'Bình An - Thuận Lợi Đôi Đường', poem: 'Mây lành che chở bước đường xa,\nKiên trì nhẫn nại sẽ thăng hoa.\nDù đời có lúc mưa rồi nắng,\nCuối con đường ấy rực sắc hoa.', topic: 'all' },
  { id: 4, name: 'Thượng Thượng', rating: 5, title: 'Hồng Phúc - Ngũ Phúc Lâm Môn', poem: 'Ngựa phi vạn dặm chẳng hề mong,\nThành công tự đến giữa tầng không.\nXuân sang phúc lộc đầy nhà cửa,\nCả nước hân hoan đón gió đông.', topic: 'all' },
  { id: 5, name: 'Thượng Cát', rating: 4, title: 'Phúc Đức - Trời Cho Lộc Tốt', poem: 'Hoa mai khoe sắc trước hiên nhà,\nBáo hiệu mùa xuân đã đến gần.\nPhước đức ông bà ban phú quý,\nCon cháu sum vầy trọn nghĩa ân.', topic: 'all' },
  { id: 6, name: 'Trung Thượng', rating: 4, title: 'An Khang - Bình Yên Thịnh Vượng', poem: 'Đầu năm vận tốt đã mỉm cười,\nMỗi bước chân đi rực nắng trời.\nGiữ tâm thanh tịnh, lòng rộng mở,\nPhúc lành tự đến chẳng mời gọi.', topic: 'all' },
  { id: 7, name: 'Thượng Thượng', rating: 5, title: 'Kim Ngọc - Vinh Hoa Phú Quý', poem: 'Ngọc vàng châu báu đến bên ta,\nCông danh sự nghiệp rạng ngời hoa.\nGia đình hạnh phúc, tình bền chặt,\nXuân mới tràn đầy khắp mọi nhà.', topic: 'all' },
  { id: 8, name: 'Trung Cát', rating: 3, title: 'Thuận Hòa - Mọi Sự Điều Hòa', poem: 'Xuân đến bình an giữa đất trời,\nThung dung tự tại sống vui tươi.\nChậm mà chắc chắn, đường xa tới,\nHoa nở muộn nhưng vẫn rạng ngời.', topic: 'all' },
  { id: 9, name: 'Thượng Thượng', rating: 5, title: 'Đại Phát - Tài Lộc Song Toàn', poem: 'Năm mới phát tài phát lộc luôn,\nTiền vàng rủng rỉnh khắp muôn phương.\nNgựa vàng phi nước đại lên non,\nMang theo phú quý đến bên đường.', topic: 'all' },
  { id: 10, name: 'Trung Thượng', rating: 4, title: 'Quý Nhân Phù Trợ', poem: 'Quý nhân tương ngộ giữa đường trần,\nGiúp đỡ nâng niu tấm lòng thành.\nXuân sang vận chuyển theo điều tốt,\nNhân quả tốt lành đến với mình.', topic: 'all' },
  { id: 11, name: 'Trung Cát', rating: 3, title: 'Thái Hòa - Vạn Vật Tươi Mới', poem: 'Đất trời giao hòa buổi đầu xuân,\nVạn vật sinh sôi khắp núi rừng.\nLòng người hoan hỉ đón năm mới,\nPhước đức an nhiên đến muôn phần.', topic: 'all' },
  { id: 12, name: 'Thượng Cát', rating: 4, title: 'Phú Quý - Giàu Sang Vẹn Toàn', poem: 'Xuân về khấp khởi niềm vui sang,\nPhú quý gõ cửa đến nhà nàng.\nCần cù bền chí thêm may mắn,\nMột năm rực rỡ sáng huy hoàng.', topic: 'all' },
  { id: 13, name: 'Thượng Thượng', rating: 5, title: 'Long Mã - Tinh Thần Phi Thường', poem: 'Long mã hội tụ buổi đầu xuân,\nTinh thần phấn chấn đến vô ngần.\nChí lớn vươn cao như ngựa đẹp,\nThanh danh vang khắp cõi trần gian.', topic: 'all' },
  { id: 14, name: 'Trung Thượng', rating: 4, title: 'Phúc Tinh Chiếu Mệnh', poem: 'Phúc tinh chiếu sáng buổi đầu năm,\nMay mắn theo chân đến muôn phần.\nVạn dặm đường xa không mỏi gối,\nNgựa vàng đưa đến chốn bình an.', topic: 'all' },
  { id: 15, name: 'Trung Cát', rating: 3, title: 'An Nhiên Tự Tại', poem: 'An nhiên tĩnh tại giữa dòng đời,\nMặc cho sóng gió vẫn thảnh thơi.\nXuân đến mang theo niềm hy vọng,\nMỗi ngày một mới đẹp tươi đời.', topic: 'all' },
  { id: 16, name: 'Thượng Cát', rating: 4, title: 'Song Hỉ Lâm Môn', poem: 'Đôi câu đối đỏ trước hiên nhà,\nSong hỉ lâm môn khắp gần xa.\nNiềm vui nhân đôi xuân Bính Ngọ,\nCầu gì được nấy, ước gì qua.', topic: 'all' },
  { id: 17, name: 'Thượng Thượng', rating: 5, title: 'Bách Chiến Bách Thắng', poem: 'Ngựa chiến tung vó giữa sa trường,\nBách chiến bách thắng khắp muôn phương.\nDũng cảm kiên cường không lùi bước,\nVinh quang chờ đón ở cuối đường.', topic: 'all' },
  { id: 18, name: 'Trung Thượng', rating: 4, title: 'Trăm Điều Phúc Lành', poem: 'Trăm điều phúc lành đến bên nhau,\nĐầu năm lì xì đỏ thắm mầu.\nGia đình đoàn tụ vui xuân mới,\nPhúc thọ khang ninh đến dài lâu.', topic: 'all' },

  // ========== QUẺ TÌNH DUYÊN ==========
  { id: 19, name: 'Thượng Thượng', rating: 5, title: 'Thiên Duyên - Trăm Năm Hạnh Phúc', poem: 'Trời xe duyên nợ tự bao giờ,\nGặp nhau hồi ấy tựa trong mơ.\nBính Ngọ xuân sang tình thắm đượm,\nTrăm năm hạnh phúc chẳng phai mờ.', topic: 'love' },
  { id: 20, name: 'Thượng Cát', rating: 4, title: 'Hoa Hảo Nguyệt Viên', poem: 'Hoa nở trăng tròn đúng lúc xuân,\nĐôi lòng giao cảm tựa tri ân.\nTình yêu đẹp tựa bài thơ cũ,\nMà vẫn mới nguyên mỗi sáng xuân.', topic: 'love' },
  { id: 21, name: 'Trung Cát', rating: 3, title: 'Duyên Phận - Chờ Đợi Xứng Đáng', poem: 'Duyên phận đôi khi đến muộn màng,\nNhưng khi đã đến rực huy hoàng.\nKiên nhẫn chờ người xứng đáng nhất,\nHạnh phúc bền lâu chẳng vội vàng.', topic: 'love' },
  { id: 22, name: 'Thượng Thượng', rating: 5, title: 'Song Phi - Cánh Bướm Đôi', poem: 'Đôi bướm cánh liền bay giữa trời,\nTình yêu đẹp nhất giữa muôn đời.\nNăm Ngọ xuân sang thêm nồng thắm,\nBên nhau trọn kiếp chẳng rời xa.', topic: 'love' },
  { id: 23, name: 'Trung Thượng', rating: 4, title: 'Uyên Ương Đẹp Đôi', poem: 'Uyên ương đẹp đôi tựa mây hồng,\nSánh bước tình duyên giữa gió đông.\nNăm mới chúc cho tình viên mãn,\nBên nhau hạnh phúc mãi xanh trong.', topic: 'love' },
  { id: 24, name: 'Trung Cát', rating: 3, title: 'Hồng Nhan Tri Kỷ', poem: 'Hồng nhan tri kỷ ở nơi nao,\nXuân đến người thương sẽ đến mau.\nMở lòng đón nhận tình yêu mới,\nBính Ngọ trao duyên đẹp biết bao.', topic: 'love' },
  { id: 25, name: 'Thượng Cát', rating: 4, title: 'Lương Duyên Tiền Định', poem: 'Lương duyên tiền định tự xa xưa,\nGặp lại hôm nay giữa nắng mưa.\nTay nắm tay nhau đi khắp nẻo,\nTình yêu chân thật mãi không mờ.', topic: 'love' },
  { id: 26, name: 'Thượng Thượng', rating: 5, title: 'Đại Hỉ - Tin Vui Trăm Năm', poem: 'Đại hỉ lâm môn đón xuân sang,\nChuyện tình viên mãn rực huy hoàng.\nChuông hoa sẽ đổ trong năm mới,\nHạnh phúc tràn đầy khắp phố phường.', topic: 'love' },
  { id: 27, name: 'Trung Thượng', rating: 4, title: 'Tri Kỷ Tương Phùng', poem: 'Tri kỷ tìm nhau giữa biển người,\nMột ánh nhìn thôi đã mỉm cười.\nBính Ngọ mang duyên về bến đợi,\nTừ đây hạnh phúc mãi không vơi.', topic: 'love' },
  { id: 28, name: 'Trung Cát', rating: 3, title: 'Mộng Xuân - Giấc Mơ Đẹp', poem: 'Giấc mộng xuân về thật dịu dàng,\nTình yêu nhen nhóm giữa hoa vàng.\nDù chưa rõ mặt người tri kỷ,\nDuyên số sẽ đến chẳng muộn màng.', topic: 'love' },
  { id: 29, name: 'Thượng Cát', rating: 4, title: 'Kim Cương - Tình Yêu Bất Diệt', poem: 'Tình yêu bền vững tựa kim cương,\nQua bao thử thách vẫn kiên cường.\nXuân mới đôi ta thêm gắn bó,\nTrọn đời bên nhau trên mọi đường.', topic: 'love' },
  { id: 30, name: 'Thượng Thượng', rating: 5, title: 'Phượng Cầu Hoàng', poem: 'Phượng cầu hoàng đến giữa trời xuân,\nRồng phượng hội ngộ đẹp vô ngần.\nNăm Ngọ tình duyên thêm rực rỡ,\nVạn sự như ý trọn trăm phần.', topic: 'love' },
  { id: 31, name: 'Trung Thượng', rating: 4, title: 'Tương Phùng Hội Ngộ', poem: 'Người xưa hẹn ước giữa trời mây,\nTương phùng hội ngộ phút giây này.\nTình duyên đẹp tựa hoa đào nở,\nXuân đến tình nồng ấm đôi tay.', topic: 'love' },
  { id: 32, name: 'Trung Cát', rating: 3, title: 'Xuân Tình Nở Rộ', poem: 'Xuân sang tình cũng nở như hoa,\nĐẹp tươi rực rỡ khắp gần xa.\nDù một chút thôi cũng đáng quý,\nTình yêu chân thật ấy là nhà.', topic: 'love' },
  { id: 33, name: 'Thượng Cát', rating: 4, title: 'Thiên Kim - Tình Yêu Vô Giá', poem: 'Tình yêu vô giá, chẳng đong đo,\nMột trái tim chân thật, một lời cho.\nXuân Bính Ngọ này duyên trời định,\nBên nhau mãi mãi, chẳng ngại lo.', topic: 'love' },
  { id: 34, name: 'Thượng Thượng', rating: 5, title: 'Hợp Cẩn Trăm Năm', poem: 'Rượu giao bôi đẫm nghĩa tình sâu,\nTrăm năm giao ước tự ban đầu.\nNăm Ngọ sum vầy, đôi lứa đẹp,\nHạnh phúc dài lâu, mãi bên nhau.', topic: 'love' },
  { id: 35, name: 'Trung Thượng', rating: 4, title: 'Đào Hoa Rực Rỡ', poem: 'Đào hoa vận chuyển rực ngời xuân,\nBiết bao người đẹp đến gần gần.\nNhưng chỉ một người là tri kỷ,\nDuyên trời se lại, đẹp vô ngần.', topic: 'love' },
  { id: 36, name: 'Trung Cát', rating: 3, title: 'Minh Nguyệt - Trăng Soi Duyên', poem: 'Trăng sáng soi đường duyên nợ xa,\nĐêm xuân gió nhẹ thoảng hương hoa.\nDuyên lành sẽ đến cùng năm mới,\nTrăng tròn viên mãn đến mọi nhà.', topic: 'love' },

  // ========== QUẺ SỰ NGHIỆP ==========
  { id: 37, name: 'Thượng Thượng', rating: 5, title: 'Mã Đáo Thành Công', poem: 'Ngựa đến ai ơi vận khí hanh,\nCông danh sự nghiệp rạng ngời xanh.\nMã đáo thành công trong gang tấc,\nTiền tài phú quý đến rành rành.', topic: 'career' },
  { id: 38, name: 'Thượng Cát', rating: 4, title: 'Hưng Long Phát Đạt', poem: 'Sự nghiệp hưng long tựa rồng bay,\nCông danh phấn chấn đến hôm nay.\nBính Ngọ tài lộc dồi dào đó,\nMỗi bước tiến lên mỗi đổi thay.', topic: 'career' },
  { id: 39, name: 'Trung Cát', rating: 3, title: 'Nước Chảy Đá Mòn', poem: 'Kiên trì sẽ đến bến thành công,\nĐừng vội nản lòng giữa biển sông.\nNgựa phi ngàn dặm không ngừng bước,\nCuối đường hoa nở đẹp muôn trùng.', topic: 'career' },
  { id: 40, name: 'Thượng Thượng', rating: 5, title: 'Đại Phát Tài Lộc', poem: 'Tài lộc năm nay đến rộn ràng,\nĐại phát đại lợi khắp muôn đàng.\nTiền vào như nước, ra nhỏ giọt,\nBính Ngọ phát tài rực rỡ sang.', topic: 'career' },
  { id: 41, name: 'Trung Thượng', rating: 4, title: 'Thăng Tiến Tầm Mới', poem: 'Thang mây bước tới đỉnh cao hơn,\nSự nghiệp thăng tiến đẹp tựa sơn.\nNăm Ngọ quý nhân luôn bên cạnh,\nCon đường rộng mở, chẳng chờ mong.', topic: 'career' },
  { id: 42, name: 'Trung Cát', rating: 3, title: 'Vững Bước Chắc Chắn', poem: 'Từng bước chắc chắn tiến về phía,\nKhông cần vội vã, chẳng cần mong.\nBính Ngọ dẫn đường bằng ánh sáng,\nCông danh rạng rỡ giữa muôn dòng.', topic: 'career' },
  { id: 43, name: 'Thượng Cát', rating: 4, title: 'Quý Nhân Tương Trợ', poem: 'Quý nhân phò trợ suốt năm dài,\nMọi việc hanh thông, chẳng chút sai.\nĐầu tư sinh lợi, kinh doanh đạt,\nBính Ngọ mang về bạc triệu hai.', topic: 'career' },
  { id: 44, name: 'Thượng Thượng', rating: 5, title: 'Hoàng Kim Thời Kỳ', poem: 'Hoàng kim thời đại đến rồi đây,\nSự nghiệp bay cao tận chín mây.\nNgựa vàng đưa lối, rồng dẫn đường,\nVang danh bốn bể, lẫy lừng thay.', topic: 'career' },
  { id: 45, name: 'Trung Thượng', rating: 4, title: 'Khai Phá Con Đường Mới', poem: 'Con đường mới mở giữa trời xuân,\nCơ hội chờ đón ở muôn phần.\nDũng cảm bước đi, đừng ngại ngần,\nBính Ngọ mang về ánh sáng ngần.', topic: 'career' },
  { id: 46, name: 'Trung Cát', rating: 3, title: 'Gieo Hạt Gặt Trái', poem: 'Gieo hạt hôm nay, ngày mai gặt,\nBền bỉ chắc chắn sẽ thành công.\nSự nghiệp như cây, cần tưới nước,\nĐến mùa hoa trái đỏ ngập đồng.', topic: 'career' },
  { id: 47, name: 'Thượng Cát', rating: 4, title: 'Thuận Phong Đẩy Thuyền', poem: 'Gió thuận đẩy thuyền ra biển rộng,\nSự nghiệp năm nay tựa cánh buồm.\nBính Ngọ mang theo ngàn cơ hội,\nChỉ cần nắm bắt, phúc đầy vương.', topic: 'career' },
  { id: 48, name: 'Thượng Thượng', rating: 5, title: 'Phi Long Tại Thiên', poem: 'Phi long tại thiên vận đại thông,\nSự nghiệp năm nay tựa hóa rồng.\nTừ thấp vươn lên tầm cao mới,\nBính Ngọ vinh quang đẹp muôn trùng.', topic: 'career' },
  { id: 49, name: 'Trung Thượng', rating: 4, title: 'Phượng Hoàng Tái Sinh', poem: 'Phượng hoàng tái sinh từ tro than,\nSự nghiệp hồi phục rực rỡ sang.\nDù có khó khăn nào đi nữa,\nNăm Ngọ bật dậy mạnh hiên ngang.', topic: 'career' },
  { id: 50, name: 'Trung Cát', rating: 3, title: 'Nhẫn Nại Đợi Thời Cơ', poem: 'Nhẫn nại chờ thời, cơ hội đến,\nĐừng nóng vội vã giữa đường dài.\nNgựa phi trước gió luôn vững bước,\nThời cơ chín muồi tự đến ngay.', topic: 'career' },
  { id: 51, name: 'Thượng Cát', rating: 4, title: 'Tấn Phát Tấn Tài', poem: 'Tấn phát tấn tài giữa xuân sang,\nTiến bước công danh rực rỡ vàng.\nĐường đi tuy xa nhưng rõ lối,\nBính Ngọ mang về phúc đầy tràn.', topic: 'career' },
  { id: 52, name: 'Thượng Thượng', rating: 5, title: 'Vạn Sự Hanh Thông', poem: 'Vạn sự hanh thông khắp bốn phương,\nSự nghiệp rực rỡ tựa ánh dương.\nBính Ngọ năm nay đại cát lợi,\nTài danh vang mãi khắp quê hương.', topic: 'career' },
  { id: 53, name: 'Trung Thượng', rating: 4, title: 'Hợp Tác Sức Mạnh', poem: 'Hợp tác đoàn kết tạo sức mạnh,\nMột cây không thể chống phong ba.\nNăm Ngọ tìm về người tri kỷ,\nCùng nhau gây dựng đế vương nhà.', topic: 'career' },
  { id: 54, name: 'Trung Cát', rating: 3, title: 'Chuyển Mình Đổi Mới', poem: 'Chuyển mình đổi mới giữa trời xuân,\nBỏ cũ đón mới, chẳng phân vân.\nSự nghiệp như ngựa phi qua gió,\nBính Ngọ mang theo vận đại thần.', topic: 'career' },

  // ========== QUẺ HỌC HÀNH ==========
  { id: 55, name: 'Thượng Thượng', rating: 5, title: 'Trạng Nguyên Đỗ Đạt', poem: 'Trạng nguyên cờ đỏ phất bay cao,\nBảng vàng tên khắc rạng ngôi sao.\nBính Ngọ thi cử hanh thông lắm,\nTài năng rực rỡ biết bao nào.', topic: 'education' },
  { id: 56, name: 'Thượng Cát', rating: 4, title: 'Văn Xương Sáng Ngời', poem: 'Văn xương tinh chiếu sáng ngời ngời,\nSách vở thi văn đẹp tuyệt vời.\nNăm mới trí tuệ thêm minh mẫn,\nHọc hành tiến bộ mỗi ngày đời.', topic: 'education' },
  { id: 57, name: 'Trung Cát', rating: 3, title: 'Cần Cù Bù Thông Minh', poem: 'Cần cù bù lại phần thông minh,\nSiêng năng chăm chỉ đến thành hình.\nĐường dài học vấn luôn rộng mở,\nBính Ngọ mang về kết quả xinh.', topic: 'education' },
  { id: 58, name: 'Thượng Thượng', rating: 5, title: 'Thần Đồng Tỏa Sáng', poem: 'Thần đồng tỏa sáng giữa muôn người,\nTài năng xuất chúng đẹp tươi đời.\nBính Ngọ thi cử toàn ưu hạng,\nĐường học hành bay tới chín trời.', topic: 'education' },
  { id: 59, name: 'Trung Thượng', rating: 4, title: 'Văn Võ Song Toàn', poem: 'Văn hay võ giỏi vẹn đôi đường,\nHọc hành thể thao đều phi thường.\nNăm Ngọ mở ra ngàn cơ hội,\nDong buồm tri thức khắp muôn phương.', topic: 'education' },
  { id: 60, name: 'Trung Cát', rating: 3, title: 'Sáng Suốt Nhận Biết', poem: 'Minh tri sáng suốt giữa dòng đời,\nHọc một hiểu mười đẹp tuyệt vời.\nDù đường thi cử có gập ghềnh,\nKiên trì ắt sẽ đến nơi thôi.', topic: 'education' },
  { id: 61, name: 'Thượng Cát', rating: 4, title: 'Ngọc Bích Thành Tài', poem: 'Ngọc bích mài giũa mãi thành tài,\nHọc hành kiên nhẫn chẳng lơ đãi.\nNăm Ngọ kết quả như mong ước,\nBảng vàng danh dự mãi còn hoài.', topic: 'education' },
  { id: 62, name: 'Thượng Thượng', rating: 5, title: 'Vinh Quy Bái Tổ', poem: 'Đăng khoa bảng nhãn rạng ngời ngời,\nVinh quy bái tổ đẹp muôn đời.\nMười năm đèn sách nay thành quả,\nBính Ngọ mang về niềm tự hào.', topic: 'education' },
  { id: 63, name: 'Trung Thượng', rating: 4, title: 'Tri Thức Mở Đường', poem: 'Tri thức mở đường giữa mây trời,\nHọc hành năm mới đẹp tươi đời.\nMỗi trang sách mở là ánh sáng,\nBính Ngọ dẫn lối đến muôn nơi.', topic: 'education' },
  { id: 64, name: 'Trung Cát', rating: 3, title: 'Học Sâu Hiểu Rộng', poem: 'Học sâu hiểu rộng tựa biển cả,\nKiến thức ngày thêm vẫn chưa già.\nBính Ngọ mang theo ngàn cơ hội,\nHọc hành như nước chảy qua nhà.', topic: 'education' },
  { id: 65, name: 'Thượng Cát', rating: 4, title: 'Du Học Viễn Phương', poem: 'Cánh cửa thế giới mở rộng rồi,\nDu học viễn phương đẹp tuyệt vời.\nBính Ngọ thuận lợi bay phương xa,\nMang về tri thức rạng ngời ngời.', topic: 'education' },
  { id: 66, name: 'Thượng Thượng', rating: 5, title: 'Bác Học Uyên Thâm', poem: 'Bác học uyên thâm, trí vô cùng,\nMuôn ngành muôn lối đều thông rung.\nBính Ngọ ngôi sao chiếu thi cử,\nVinh danh bảng vàng rực sáng hồng.', topic: 'education' },
  { id: 67, name: 'Trung Thượng', rating: 4, title: 'Mỗi Ngày Mỗi Giỏi', poem: 'Mỗi ngày mỗi giỏi, mỗi thêm hay,\nTiến bộ không ngừng suốt tháng ngày.\nBính Ngọ mang theo ánh trí tuệ,\nĐường học vấn tựa chín tầng mây.', topic: 'education' },
  { id: 68, name: 'Trung Cát', rating: 3, title: 'Nhất Nghệ Tinh', poem: 'Nhất nghệ tinh, nhất thân vinh,\nBền chí theo đuổi một con đường.\nBính Ngọ thi cử dù cam go,\nKết quả cuối cùng sẽ phi thường.', topic: 'education' },
  { id: 69, name: 'Thượng Cát', rating: 4, title: 'Tư Duy Đột Phá', poem: 'Tư duy sáng tạo, ý tưởng bay,\nĐột phá giới hạn tận trời mây.\nHọc hành năm mới đầy hứng khởi,\nBính Ngọ mang về thành tựu đầy.', topic: 'education' },
  { id: 70, name: 'Thượng Thượng', rating: 5, title: 'Xuất Sắc Vượt Trội', poem: 'Xuất sắc vượt trội đứng đỉnh cao,\nKết quả thi cử đẹp biết bao.\nBính Ngọ sao may chiếu học trò,\nĐường công danh học rực ngôi sao.', topic: 'education' },
  { id: 71, name: 'Trung Thượng', rating: 4, title: 'Cơ Hội Học Bổng Vàng', poem: 'Cơ hội vàng son đến bên nhau,\nHọc bổng quý giá chẳng đợi lâu.\nBính Ngọ mang tài lộc về cho,\nĐường học hành bay, chẳng lo sầu.', topic: 'education' },
  { id: 72, name: 'Trung Cát', rating: 3, title: 'Chuyên Tâm Tinh Thần', poem: 'Chuyên tâm lặng lẽ giữa dòng đời,\nMột lòng một dạ chẳng đổi dời.\nBính Ngọ mang về niềm hứng khởi,\nHọc hành chắc bước đến nơi thời.', topic: 'education' },
];

export function getRandomFortune(topic?: string) {
  let pool = FORTUNE_STICKS;
  if (topic === 'love') pool = FORTUNE_STICKS.filter(f => f.topic === 'love' || f.topic === 'all');
  else if (topic === 'career') pool = FORTUNE_STICKS.filter(f => f.topic === 'career' || f.topic === 'all');
  else if (topic === 'education') pool = FORTUNE_STICKS.filter(f => f.topic === 'education' || f.topic === 'all');
  return pool[Math.floor(Math.random() * pool.length)];
}

export const TOPICS = [
  { id: 'love', label: 'Tình duyên', icon: '💕', description: 'Nhân duyên & hạnh phúc' },
  { id: 'career', label: 'Sự nghiệp', icon: '🏆', description: 'Công danh & tài lộc' },
  { id: 'education', label: 'Học hành', icon: '📚', description: 'Trí tuệ & thành tựu' },
];

export const TOPIC_ADVICE: Record<string, string[]> = {
  love: [
    'Hãy mở lòng đón nhận tình yêu mới, đừng sợ bị tổn thương.',
    'Dành thời gian chất lượng cho người thương, sự hiện diện là món quà quý nhất.',
    'Tình yêu cần chăm sóc mỗi ngày, giống như cây cần nước để phát triển.',
    'Đừng so sánh mối quan hệ với người khác, mỗi tình yêu có phép màu riêng.',
    'Thành thật và tin tưởng là nền tảng vững chắc nhất cho mọi mối quan hệ.',
    'Năm Bính Ngọ rất tốt cho tình cảm, hãy mạnh dạn bày tỏ tấm lòng.',
  ],
  career: [
    'Đầu tư vào kỹ năng mới sẽ mở ra nhiều cánh cửa cơ hội trong năm nay.',
    'Xây dựng mạng lưới quan hệ vững chắc, quý nhân sẽ xuất hiện khi bạn cần.',
    'Đừng ngại thay đổi công việc nếu đã đến lúc, năm Ngọ thuận lợi cho đổi mới.',
    'Tiết kiệm và đầu tư thông minh, tài lộc sẽ nhân lên gấp bội.',
    'Kiên nhẫn với mục tiêu dài hạn, thành công lớn không đến trong một ngày.',
    'Năm Bính Ngọ mang năng lượng dũng cảm, mạnh dạn khởi nghiệp nếu có ý tưởng.',
  ],
  education: [
    'Tập trung chuyên sâu sẽ mang lại thành tựu lớn hơn việc lan man nhiều thứ.',
    'Lập kế hoạch học tập rõ ràng và tuân thủ nghiêm ngặt, kỷ luật là chìa khóa.',
    'Đọc sách mỗi ngày, tri thức tích lũy sẽ mang lại quả ngọt bất ngờ.',
    'Tham gia nhóm học tập hoặc mentor sẽ giúp tiến bộ nhanh hơn gấp nhiều lần.',
    'Năm Bính Ngọ văn xương tinh chiếu, thi cử thuận lợi nếu chuẩn bị đầy đủ.',
    'Kết hợp lý thuyết với thực hành, kiến thức vận dụng mới là kiến thức thật sự.',
  ],
};
