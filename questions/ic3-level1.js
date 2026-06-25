export const IC3_LEVEL1 = [
  // ============================================================
  // TEST 1 (45 câu)
  // ============================================================

  // ----- HARDWARE (9 câu) -----
  {
    id: 1,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question: "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài?",
    options: ["Ổ đĩa cứng", "Bộ xử lý trung tâm (CPU)", "Đĩa flash USB", "Bo mạch chủ"],
    answer: "Ổ đĩa cứng",
    explanation: "Ổ đĩa cứng (HDD/SSD) gắn trong là thiết bị phần cứng chính dùng để lưu trữ dữ liệu và hệ điều hành lâu dài trên máy tính để bàn."
  },
  {
    id: 2,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "medium",
    type: "image-select",
    question: "Đâu là ba thiết bị nhập khi được kết nối với máy tính không có màn hình cảm ứng? (Chọn 3)",
    options: [
      { label: "Bàn phím", img: "ic3_lv1_q02_opt_a" },
      { label: "Màn hình", img: "ic3_lv1_q02_opt_b" },
      { label: "Chuột", img: "ic3_lv1_q02_opt_c" },
      { label: "Máy quét", img: "ic3_lv1_q02_opt_d" },
      { label: "Máy in", img: "ic3_lv1_q02_opt_e" }
    ],
    answer: [0, 2, 3],
    explanation: "Bàn phím, chuột và máy quét là các thiết bị dùng để đưa dữ liệu vào máy tính (Thiết bị nhập/Input devices)."
  },
  {
    id: 3,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question: "Loại USB nào có đầu nối có thể đảo ngược khi sử dụng?",
    options: ["USB", "USB-C", "Lightning connector", "Micro USB"],
    answer: "USB-C",
    explanation: "Đầu nối USB-C được thiết kế đối xứng giúp người dùng có thể cắm theo bất kỳ chiều nào (đảo ngược được) mà không lo bị ngược."
  },
  {
    id: 4,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Hãy kéo và thả từng loại đầu cáp kết nối vào đúng tên gọi tương ứng.",
    left: ["ic3_lv1_q04_opt_a", "ic3_lv1_q04_opt_b", "ic3_lv1_q04_opt_c", "ic3_lv1_q04_opt_d"],
    right: ["Cáp Lightning (Apple)", "Cáp Micro USB", "Cáp USB-C", "Cáp USB chuẩn A (Standard USB)"],
    answer: {
      "ic3_lv1_q04_opt_a": "Cáp Lightning (Apple)",
      "ic3_lv1_q04_opt_b": "Cáp Micro USB",
      "ic3_lv1_q04_opt_c": "Cáp USB-C",
      "ic3_lv1_q04_opt_d": "Cáp USB chuẩn A (Standard USB)"
    },
    explanation: "Đầu cáp Lightning được sử dụng trên nhiều thiết bị Apple. Đầu Micro USB có dạng hình thang nhỏ. Đầu USB-C có thiết kế đối xứng và có thể cắm theo cả hai chiều. Đầu USB chuẩn A là đầu USB hình chữ nhật truyền thống thường thấy trên máy tính."
  },
  {
    id: 5,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Xác định đúng chức năng của các thiết bị phần cứng sau bằng cách chọn Nhập (Input) hoặc Xuất (Output):",
    left: ["Microphone", "Printer (Máy in)", "Keyboard (Bàn phím)", "Scanner (Máy quét)", "Webcam"],
    right: ["Nhập", "Xuất"],
    answer: {
      "Microphone": "Nhập",
      "Printer (Máy in)": "Xuất",
      "Keyboard (Bàn phím)": "Nhập",
      "Scanner (Máy quét)": "Nhập",
      "Webcam": "Nhập"
    },
    explanation: "Microphone, Keyboard, Scanner và Webcam là thiết bị đưa thông tin vào máy tính (Nhập). Máy in nhận dữ liệu từ máy tính để đưa ra môi trường ngoài (Xuất)."
  },
  {
    id: 6,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "hard",
    type: "single",
    question: "Loại cáp nào có thể truyền dữ liệu với tốc độ lên đến 480 Megabit/giây (Mbps)?",
    options: ["Lightning connector", "USB-C", "Micro USB", "Ethernet Cable"],
    answer: "Micro USB",
    explanation: "Cáp kết nối chuẩn USB 2.0 (như Micro USB thông thường) có tốc độ băng thông truyền tải dữ liệu tiêu chuẩn tối đa là 480 Mbps."
  },
  {
    id: 7,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn dự định mua một thiết bị máy tính cầm tay. Thiết bị phải có khả năng chạy bằng pin và phải được trang bị bàn phím vật lý tích hợp. Đâu là hai thiết bị đáp ứng được những yêu cầu trên? (Chọn 2)",
    options: ["Máy tính để bàn Mac", "Điện thoại thông minh chạy Android", "Máy tính xách tay chạy Windows (Laptop)", "Máy tính bảng chạy Android", "Chromebook"],
    answer: ["Máy tính xách tay chạy Windows (Laptop)", "Chromebook"],
    explanation: "Máy tính xách tay và Chromebook đều chạy bằng pin và có bàn phím vật lý dạng vỏ sò gắn liền, đáp ứng chính xác hai điều kiện của đề bài."
  },
  {
    id: 8,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "hard",
    type: "matching",
    question: "Quan sát hình ảnh và thực hiện kéo thả chính xác từng loại cổng kết nối với tên gọi tương ứng của chúng.",
    left: ["ic3_lv1_q08_opt_a", "ic3_lv1_q08_opt_b", "ic3_lv1_q08_opt_c", "ic3_lv1_q08_opt_d", "ic3_lv1_q08_opt_e"],
    right: ["Audio Port", "USB Port", "HDMI Port", "Display Port", "Ethernet Port"],
    answer: {
      "ic3_lv1_q08_opt_a": "HDMI Port",
      "ic3_lv1_q08_opt_b": "Ethernet Port",
      "ic3_lv1_q08_opt_c": "Audio Port",
      "ic3_lv1_q08_opt_d": "Display Port",
      "ic3_lv1_q08_opt_e": "USB Port"
    },
    explanation: "Audio Port là cổng âm thanh 3.5mm dạng tròn. USB Port là cổng USB hình chữ nhật dùng để kết nối thiết bị ngoại vi. HDMI Port dùng để truyền hình ảnh và âm thanh kỹ thuật số. Display Port là cổng xuất hình ảnh thường thấy trên máy tính và màn hình hiện đại. Ethernet Port là cổng mạng RJ45 dùng để kết nối mạng có dây."
  },
  {
    id: 9,
    level: "IC3_LEVEL1",
    test: 1,
    category: "HARDWARE",
    difficulty: "hard",
    type: "matching",
    question: "Ghép từng thiết bị lưu trữ dữ liệu máy tính với định nghĩa tương ứng chính xác của nó:",
    left: [
      "Thiết bị lưu trữ dữ liệu bên trong cơ điện từ giúp lưu trữ và truy xuất dữ liệu bằng đĩa từ quay nhanh",
      "Thiết bị lưu trữ dữ liệu bên ngoài hoạt động dựa trên kết nối USB với máy tính",
      "Thiết bị lưu trữ dữ liệu bên ngoài gọn nhẹ, sử dụng bộ nhớ flash",
      "Thiết bị lưu trữ dữ liệu bên trong giúp lưu trữ và truy xuất dữ liệu bằng bộ nhớ flash"
    ],
    right: ["Ổ đĩa cứng (HDD)", "Ổ cứng di động (External HDD/SSD)", "Ổ đĩa flash USB", "Ổ cứng thể rắn (SSD)"],
    answer: {
      "Thiết bị lưu trữ dữ liệu bên trong cơ điện từ giúp lưu trữ và truy xuất dữ liệu bằng đĩa từ quay nhanh": "Ổ đĩa cứng (HDD)",
      "Thiết bị lưu trữ dữ liệu bên ngoài hoạt động dựa trên kết nối USB với máy tính": "Ổ cứng di động (External HDD/SSD)",
      "Thiết bị lưu trữ dữ liệu bên ngoài gọn nhẹ, sử dụng bộ nhớ flash": "Ổ đĩa flash USB",
      "Thiết bị lưu trữ dữ liệu bên trong giúp lưu trữ và truy xuất dữ liệu bằng bộ nhớ flash": "Ổ cứng thể rắn (SSD)"
    },
    explanation: "Đây là các khái niệm phân biệt rõ ràng giữa bộ nhớ từ (HDD) truyền thống và bộ nhớ flash (USB, SSD) dựa trên vị trí lắp đặt gắn trong hay gắn ngoài."
  },

  // ----- SOFTWARE (7 câu) -----
  {
    id: 10,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "matching",
    question: "Ghép từng loại ứng dụng phần mềm với mục đích tương ứng:",
    left: [
      "Nhập, chỉnh sửa, định dạng và xuất văn bản ở định dạng tài liệu",
      "Sắp xếp, phân tích cũng như lưu trữ dữ liệu số và văn bản, tính toán và hiển thị dữ liệu dưới dạng biểu đồ",
      "Truy cập thông tin trên internet",
      "Lưu trữ, sắp xếp, điều kiện và điều chỉnh các tập hợp thông tin liên quan",
      "Hiển thị văn bản, hình ảnh và thông tin đa phương tiện dưới dạng trình chiếu điện tử"
    ],
    right: ["Phần mềm xử lý văn bản", "Ứng dụng bảng tính", "Trình duyệt web", "Hệ thống quản lý cơ sở dữ liệu", "Phần mềm trình chiếu"],
    answer: {
      "Nhập, chỉnh sửa, định dạng và xuất văn bản ở định dạng tài liệu": "Phần mềm xử lý văn bản",
      "Sắp xếp, phân tích cũng như lưu trữ dữ liệu số và văn bản, tính toán và hiển thị dữ liệu dưới dạng biểu đồ": "Ứng dụng bảng tính",
      "Truy cập thông tin trên internet": "Trình duyệt web",
      "Lưu trữ, sắp xếp, điều kiện và điều chỉnh các tập hợp thông tin liên quan": "Hệ thống quản lý cơ sở dữ liệu",
      "Hiển thị văn bản, hình ảnh và thông tin đa phương tiện dưới dạng trình chiếu điện tử": "Phần mềm trình chiếu"
    },
    explanation: "Đây là các khái niệm và mục đích sử dụng cơ bản của các loại phần mềm ứng dụng phổ biến theo chuẩn IC3 GS6."
  },
  {
    id: 11,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Ba phát biểu nào dưới đây đúng với phần mềm nguồn mở? (Chọn 3)",
    options: [
      "Nó cho phép người dùng sửa đổi phần mềm để phù hợp với nhu cầu cụ thể của họ",
      "Nó an toàn hơn phần mềm độc quyền",
      "Giấy phép của nó là trung lập về công nghệ",
      "Nó kém an toàn hơn phần mềm độc quyền",
      "Nó thân thiện với người dùng hơn phần mềm độc quyền"
    ],
    answer: [
      "Nó cho phép người dùng sửa đổi phần mềm để phù hợp với nhu cầu cụ thể của họ",
      "Nó an toàn hơn phần mềm độc quyền",
      "Giấy phép của nó là trung lập về công nghệ"
    ],
    explanation: "Phần mềm nguồn mở mở mã nguồn để cộng đồng kiểm tra, chỉnh sửa (giúp tăng tính an toàn qua việc vá lỗi liên tục) và có tính trung lập về công nghệ."
  },
  {
    id: 12,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SOFTWARE",
    difficulty: "easy",
    type: "single",
    question: "Người dùng có thể tắt tính năng lưu trữ mật khẩu trực tuyến ở đâu?",
    options: ["Trong cài đặt trình duyệt của họ", "Trong hộp thư đến", "Trong cài đặt máy tính của họ", "Trong lịch sử của họ"],
    answer: "Trong cài đặt trình duyệt của họ",
    explanation: "Tính năng tự động lưu và điền mật khẩu web do trình duyệt quản lý, bạn có thể bật/tắt nó trong phần cài đặt (Settings) của trình duyệt."
  },
  {
    id: 13,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "single",
    question: "Đâu là câu phát biểu đúng về các ứng dụng dựa trên môi trường web (Web-based apps)?",
    options: [
      "Phiên bản web của ứng dụng dành cho máy tính để bàn sở hữu tất cả các tính năng giống như phiên bản trên máy tính để bàn",
      "Bạn phải có kết nối internet để sử dụng ứng dụng web",
      "Trước khi có thể sử dụng ứng dụng web, bạn phải cài đặt ứng dụng đó trên máy tính của mình",
      "Các ứng dụng web xử lý cục bộ thông tin trên máy tính của bạn"
    ],
    answer: "Bạn phải có kết nối internet để sử dụng ứng dụng web",
    explanation: "Ứng dụng web chạy trực tiếp trên máy chủ thông qua trình duyệt, vì vậy yêu cầu bắt buộc là thiết bị của bạn phải có kết nối internet."
  },
  {
    id: 14,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Ba phát biểu nào dưới đây đúng với phần mềm độc quyền (Proprietary software)? (Chọn 3)",
    options: [
      "Nó dễ bị phần mềm độc hại tấn công hơn phần mềm nguồn mở",
      "Giấy phép của nó là trung lập về công nghệ",
      "Nó cho phép người dùng sửa đổi phần mềm để phù hợp với nhu cầu cụ thể của họ",
      "Nó kém an toàn hơn phần mềm nguồn mở",
      "Nó thân thiện với người dùng hơn phần mềm nguồn mở"
    ],
    answer: [
      "Nó dễ bị phần mềm độc hại tấn công hơn phần mềm nguồn mở",
      "Nó kém an toàn hơn phần mềm nguồn mở",
      "Nó thân thiện với người dùng hơn phần mềm nguồn mở"
    ],
    explanation: "Theo tài liệu IC3 GS6 Level 1 chuẩn, phần mềm độc quyền thường có xu hướng tập trung tối ưu hóa giao diện thân thiện với người dùng, nhưng do mã nguồn đóng nên tốc độ phát hiện, vá lỗi bảo mật cộng đồng có thể kém linh hoạt hơn nguồn mở."
  },
  {
    id: 15,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "matching",
    question: "Ghép từng công cụ của trình duyệt web phổ biến với hành động (mục đích) tương ứng của nó:",
    left: [
      "Quản lý các tab đang mở",
      "Liệt kê các trang web bạn đã truy cập gần đây",
      "Tải lại trang web hiện tại",
      "Hiển thị URL của trang web hiện tại",
      "Hiển thị lại một trang web đã truy cập trước đó"
    ],
    right: [
      "Address box (Thanh địa chỉ)",
      "Refresh button (Nút làm mới)",
      "History (Lịch sử duyệt web)",
      "Back button (Nút quay lại)",
      "Tab manager / Browser Tabs (Quản lý Tab)"
    ],
    answer: {
      "Quản lý các tab đang mở": "Tab manager / Browser Tabs (Quản lý Tab)",
      "Liệt kê các trang web bạn đã truy cập gần đây": "History (Lịch sử duyệt web)",
      "Tải lại trang web hiện tại": "Refresh button (Nút làm mới)",
      "Hiển thị URL của trang web hiện tại": "Address box (Thanh địa chỉ)",
      "Hiển thị lại một trang web đã truy cập trước đó": "Back button (Nút quay lại)"
    },
    explanation: "Đây là mục đích sử dụng cơ bản của các thành phần giao diện trên trình duyệt web."
  },
  {
    id: 16,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SOFTWARE",
    difficulty: "easy",
    type: "single",
    question: "Bạn cần lưu danh sách các trang web để có thể dễ dàng quay trở lại vào lần sau. Bạn nên sử dụng tính năng nào của trình duyệt web?",
    options: ["Duyệt đa trang một lúc (Multi-tabbing)", "Mục yêu thích hoặc đánh dấu trang (Favorites/Bookmarks)", "Lịch sử hoặc dòng thời gian (History/Timeline)", "Hộp địa chỉ (Address box)"],
    answer: "Mục yêu thích hoặc đánh dấu trang (Favorites/Bookmarks)",
    explanation: "Tính năng Bookmark (Đánh dấu trang) hoặc Favorites giúp người dùng lưu trữ lại các đường link trang web quan trọng để truy cập lại một cách nhanh chóng."
  },

  // ----- DIGITAL CITIZENSHIP (7 câu) -----
  {
    id: 17,
    level: "IC3_LEVEL1",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu, hãy chọn Đúng nếu đó là ví dụ về bắt nạt trên mạng (Cyberbullying) hoặc Sai nếu không phải.",
    left: [
      "D đăng ảnh riêng tư của E lên mạng mà không có sự cho phép của cô",
      "A liên tục gửi những tin nhắn ác ý riêng cho B",
      "F tạo một tài khoản Instagram để đăng tải những tin đồn về các học sinh trong trường",
      "C đăng tải một ý kiến gây tranh cãi trên một diễn đàn trực tuyến công khai"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "D đăng ảnh riêng tư của E lên mạng mà không có sự cho phép của cô": "Đúng",
      "A liên tục gửi những tin nhắn ác ý riêng cho B": "Đúng",
      "F tạo một tài khoản Instagram để đăng tải những tin đồn về các học sinh trong trường": "Đúng",
      "C đăng tải một ý kiến gây tranh cãi trên một diễn đàn trực tuyến công khai": "Sai"
    },
    explanation: "Bắt nạt trên mạng bao gồm các hành vi cố ý làm tổn hại, quấy rối, bôi nhọ cá nhân qua môi trường kỹ thuật số. Việc bày tỏ ý kiến tranh cãi công khai không mang tính chất tấn công cá nhân thì không phải là bắt nạt."
  },
  {
    id: 18,
    level: "IC3_LEVEL1",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Là một người sử dụng máy tính có đạo đức, bạn cần xác định những ví dụ về cách hành xử đúng mực trên mạng (Netiquette) trong môi trường làm việc văn phòng. Với mỗi câu phát biểu, hãy chọn Có nếu đó là ví dụ về cách hành xử đúng mực hoặc Không nếu không phải.",
    left: [
      "Chia sẻ các tập tin lớn từ dịch vụ lưu trữ đám mây hoặc vị trí máy chủ thay vì đính kèm trong email",
      "Luôn luôn sử dụng tính năng Cc (Carbon Copy) cho đồng nghiệp khi gửi email để giúp họ nắm được thông tin",
      "Áp dụng các tiêu chuẩn và giá trị trong các tương tác trực tuyến tương tự như khi bạn tương tác trực tiếp"
    ],
    right: ["Có", "Không"],
    answer: {
      "Chia sẻ các tập tin lớn từ dịch vụ lưu trữ đám mây hoặc vị trí máy chủ thay việc đính kèm trong email": "Có",
      "Luôn luôn sử dụng tính năng Cc (Carbon Copy) cho đồng nghiệp khi gửi email để giúp họ nắm được thông tin": "Không",
      "Áp dụng các tiêu chuẩn và giá trị trong các tương tác trực tuyến tương tự như khi bạn tương tác trực tiếp": "Có"
    },
    explanation: "Việc sử dụng link đám mây giúp email nhẹ hơn và áp dụng chuẩn đạo đức ngoài đời vào mạng là đúng đắn. Tuy nhiên, việc 'luôn luôn' Cc cho đồng nghiệp bất kể việc gì sẽ gây loãng thông tin và spam hộp thư của họ (Chọn Không)."
  },
  {
    id: 19,
    level: "IC3_LEVEL1",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về vấn đề bản quyền và đạo văn dưới đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Bạn chỉ phải trích dẫn nguồn khi sử dụng nguyên văn câu chữ chính xác như trong tác phẩm gốc của người khác",
      "Bạn sẽ bị quy vào tội đạo văn nếu sử dụng ý tưởng mà không trích dẫn nguồn đầy đủ",
      "Trong tác phẩm viết, bạn bắt buộc phải sử dụng phần chú thích cuối trang (Footnote) để trích dẫn nguồn thay vì danh mục tham khảo",
      "Bạn có thể mạo nhận tác phẩm hoặc ý tưởng của người khác làm của riêng mình nếu thay đổi vài từ mà không cần trích dẫn nguồn"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bạn chỉ phải trích dẫn nguồn khi sử dụng nguyên văn câu chữ chính xác như trong tác phẩm gốc của người khác": "Sai",
      "Bạn sẽ bị quy vào tội đạo văn nếu sử dụng ý tưởng mà không trích dẫn nguồn đầy đủ": "Đúng",
      "Trong tác phẩm viết, bạn bắt buộc phải sử dụng phần chú thích cuối trang (Footnote) để trích dẫn nguồn thay vì danh mục tham khảo": "Sai",
      "Bạn có thể mạo nhận tác phẩm hoặc ý tưởng của người khác làm của riêng mình nếu thay đổi vài từ mà không cần trích dẫn nguồn": "Sai"
    },
    explanation: "Khi mượn ý tưởng hoặc diễn đạt lại (Paraphrase) ta vẫn phải trích dẫn nguồn để không phạm lỗi đạo văn. Có nhiều kiểu trích dẫn (APA, MLA,...) không nhất thiết chỉ dùng footnote."
  },
  {
    id: 20,
    level: "IC3_LEVEL1",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "easy",
    type: "single",
    question: "Bạn vô tình đăng tải một bức ảnh hài hước nhưng có phần đáng xấu hổ của một người bạn lên mạng xã hội. Thông tin (dấu chân kỹ thuật số) đó sẽ tồn tại trên Internet trong vòng bao lâu?",
    options: [
      "Cho đến khi người bạn của bạn thực hiện lệnh xóa thông tin đó",
      "Vĩnh viễn, ngay cả sau khi bạn đã thực hiện thao tác gỡ/xóa bài đăng gốc",
      "Tự động biến mất hoàn toàn sau 24 giờ",
      "Biến mất khỏi hệ thống lưu trữ sau thời hạn bản quyền 07 năm"
    ],
    answer: "Vĩnh viễn, ngay cả sau khi bạn đã thực hiện thao tác gỡ/xóa bài đăng gốc",
    explanation: "Một khi thông tin, hình ảnh đã được đưa lên không gian Internet công cộng, người khác có thể đã tải về, chụp màn hình hoặc lưu trữ lại. Do đó nó có khả năng tồn tại vĩnh viễn dù bài đăng gốc bị xóa."
  },
  {
    id: 21,
    level: "IC3_LEVEL1",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "easy",
    type: "single",
    question: "Bạn hãy cho biết, duyệt web ở chế độ riêng tư (ẩn danh) đảm bảo điều gì sau đây?",
    options: [
      "Mật khẩu không bao giờ cần phải thay đổi",
      "Lịch sử duyệt web của người dùng không được lưu trữ lại trên thiết bị",
      "Thông tin tài khoản và mật khẩu luôn được tự động lưu lại bảo mật",
      "Giúp tăng thêm dung lượng lưu trữ khả dụng đáng kể trên đĩa cứng máy tính"
    ],
    answer: "Lịch sử duyệt web của người dùng không được lưu trữ lại trên thiết bị",
    explanation: "Duyệt web riêng tư đảm bảo các thông tin như lịch sử duyệt web, cookie và dữ liệu biểu mẫu không bị ghi lại cục bộ sau khi đóng cửa sổ."
  },
  {
    id: 22,
    level: "IC3_LEVEL1",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần xác định thông tin nhận dạng cá nhân (PII - Personally Identifiable Information) mà bạn không nên để lộ công khai trên mạng. Với mỗi thông tin dưới đây, hãy chọn Có nếu đó là thông tin định danh cá nhân quan trọng, hoặc Không nếu không phải.",
    left: ["Ngày sinh", "Màu mắt", "Nơi sinh"],
    right: ["Có", "Không"],
    answer: { "Ngày sinh": "Có", "Màu mắt": "Không", "Nơi sinh": "Có" },
    explanation: "Ngày sinh và Nơi sinh là các thông tin định danh pháp lý rất quan trọng giúp cấu thành PII. Màu mắt là đặc điểm sinh học phổ biến, không dùng để xác minh danh tính cá nhân bảo mật trực tuyến."
  },
  {
    id: 23,
    level: "IC3_LEVEL1",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "easy",
    type: "single",
    question: "Bạn hãy cho biết khi sử dụng tất cả chữ in hoa trong một thư điện tử (Email) sẽ truyền đạt điều gì?",
    options: ["Khẩn cấp", "La hét", "Nhấn mạnh", "Tầm quan trọng"],
    answer: "La hét",
    explanation: "Theo quy tắc ứng xử trên Internet (Netiquette), việc viết hoa toàn bộ các ký tự trong email hoặc tin nhắn được hiểu tương đương với hành vi 'la hét' (shouting) vào mặt người đọc, thể hiện sự thô lỗ hoặc giận dữ."
  },

  // ----- OPERATING SYSTEM (6 câu) -----
  {
    id: 24,
    level: "IC3_LEVEL1",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần xác định các chức năng do Hệ điều hành của máy tính quản lý. Với mỗi tác vụ dưới đây, hãy chọn Đúng hoặc Sai.",
    left: ["Cấp phát tài nguyên phần cứng", "Tìm kiếm trên internet", "Giao tiếp với các thiết bị ngoại vi", "Chỉnh sửa tập tin văn bản"],
    right: ["Đúng", "Sai"],
    answer: {
      "Cấp phát tài nguyên phần cứng": "Đúng",
      "Tìm kiếm trên internet": "Sai",
      "Giao tiếp với các thiết bị ngoại vi": "Đúng",
      "Chỉnh sửa tập tin văn bản": "Sai"
    },
    explanation: "Hệ điều hành quản lý phần cứng và giao tiếp ngoại vi. Việc tìm kiếm internet hay chỉnh sửa văn bản là công việc của các phần mềm ứng dụng cụ thể (Trình duyệt, Trình soạn thảo)."
  },
  {
    id: 25,
    level: "IC3_LEVEL1",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần xác định các tính năng tiêu chuẩn của thanh tác vụ (Taskbar) trong Hệ điều hành Windows. Với mỗi câu phát biểu, hãy chọn Có nếu có thể thực hiện hành động từ thanh tác vụ hoặc chọn Không nếu không thể.",
    left: [
      "Khởi động trình quản lý tác vụ (Task Manager)",
      "Điều chỉnh âm lượng đầu ra âm thanh",
      "Thu nhỏ tất cả các chương trình đang mở để hiển thị màn hình nền (Desktop)",
      "Hiển thị cài đặt kết nối mạng"
    ],
    right: ["Có", "Không"],
    answer: {
      "Khởi động trình quản lý tác vụ (Task Manager)": "Có",
      "Điều chỉnh âm lượng đầu ra âm thanh": "Có",
      "Thu nhỏ tất cả các chương trình đang mở để hiển thị màn hình nền (Desktop)": "Có",
      "Hiển thị cài đặt kết nối mạng": "Có"
    },
    explanation: "Tất cả các hành động này đều có thể thực hiện trực tiếp thông qua thanh Taskbar hoặc khay hệ thống (System Tray) trên Windows."
  },
  {
    id: 26,
    level: "IC3_LEVEL1",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "hard",
    type: "multiple",
    question: "Điều nào dưới đây là ĐÚNG với hệ điều hành mã nguồn mở Linux? (Chọn 3)",
    options: [
      "Không thể được sử dụng trên bất cứ thứ gì ngoại trừ các thiết bị di động",
      "Là phần mềm độc quyền",
      "Có khả năng chạy và tương thích tốt trên nhiều loại phần cứng",
      "Có tính bảo mật và độ ổn định cao",
      "Người dùng có thể tự do sửa đổi phần mềm thông qua mã nguồn của chương trình"
    ],
    answer: [
      "Có khả năng chạy và tương thích tốt trên nhiều loại phần cứng",
      "Có tính bảo mật và độ ổn định cao",
      "Người dùng có thể tự do sửa đổi phần mềm thông qua mã nguồn của chương trình"
    ],
    explanation: "Linux là hệ điều hành mã nguồn mở nổi tiếng với tính an toàn, linh hoạt, chạy được từ siêu máy tính, máy tính bàn đến các thiết bị IoT phần cứng đa dạng."
  },
  {
    id: 27,
    level: "IC3_LEVEL1",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "easy",
    type: "matching",
    question: "Ứng với mỗi Hệ điều hành phổ biến, hãy chọn tên nhà phát triển/công ty chủ quản tương ứng:",
    left: ["iOS", "Windows", "Android", "Chrome OS", "Mac OS"],
    right: ["Apple", "Microsoft", "Google"],
    answer: {
      "iOS": "Apple",
      "Windows": "Microsoft",
      "Android": "Google",
      "Chrome OS": "Google",
      "Mac OS": "Apple"
    },
    explanation: "iOS và Mac OS độc quyền của Apple; Windows phát triển bởi Microsoft; Android và Chrome OS thuộc quyền quản lý của Google."
  },
  {
    id: 28,
    level: "IC3_LEVEL1",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "hard",
    type: "single",
    question: "Bạn cần tạo một bản sao chính xác của hệ điều hành Windows trên máy tính để đảm bảo rằng bạn có thể khôi phục toàn bộ máy tính, ứng dụng và tập tin về trạng thái hiện tại trong trường hợp hệ thống gặp sự cố phá hủy nghiêm trọng. Bạn nên lựa chọn giải pháp nào?",
    options: ["Tạo một đĩa sửa lỗi hệ thống (System Repair Disc)", "Tạo ảnh hệ thống (Create a System Image)", "Thiết lập trình sao lưu thông thường của Windows (Windows Backup)", "Bật tính năng Lịch sử tập tin (File History)"],
    answer: "Tạo ảnh hệ thống (Create a System Image)",
    explanation: "System Image (Ảnh hệ thống) là một bản sao chính xác (nhân bản ổ đĩa) bao gồm hệ điều hành, các cài đặt hệ thống, các chương trình phần mềm đã cài và tất cả dữ liệu, giúp khôi phục nguyên vẹn trạng thái khi máy lỗi nặng."
  },
  {
    id: 29,
    level: "IC3_LEVEL1",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "hard",
    type: "multiple",
    question: "Khi đề cập đến hệ điều hành mã nguồn mở Linux, ba đặc điểm nào dưới đây phản ánh chính xác bản chất của hệ điều hành này? (Chọn 3)",
    options: [
      "Hệ điều hành Linux hoàn toàn không thể cài đặt hay sử dụng trên các thiết bị di động",
      "Linux là một hệ điều hành độc quyền thương mại đóng thuộc một tập đoàn duy nhất",
      "Linux là hệ điều hành linh hoạt, có khả năng tùy biến tương thích để chạy trên hầu hết mọi kiến trúc phần cứng",
      "Hệ điều hành Linux nổi tiếng với cấu trúc nhân bảo mật cao và có tính ổn định cao",
      "Người dùng có quyền can thiệp, chỉnh sửa sâu vào hệ thống thông qua mã nguồn mở của chương trình"
    ],
    answer: [
      "Linux là hệ điều hành linh hoạt, có khả năng tùy biến tương thích để chạy trên hầu hết mọi kiến trúc phần cứng",
      "Hệ điều hành Linux nổi tiếng với cấu trúc nhân bảo mật cao và có tính ổn định cao",
      "Người dùng có quyền can thiệp, chỉnh sửa sâu vào hệ thống thông qua mã nguồn mở của chương trình"
    ],
    explanation: "Linux là hệ điều hành mã nguồn mở, bảo mật mạnh mẽ, chạy được trên cả siêu máy tính, PC, máy chủ lẫn thiết bị di động (nền tảng của Android chính là nhân Linux)."
  },

  // ----- SECURITY (6 câu) -----
  {
    id: 30,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Khi nào người dùng nên cân nhắc việc thay đổi mật khẩu của họ? (Chọn 3)",
    options: [
      "Họ đã được thông báo rằng có quyền truy cập trái phép vào tài khoản của họ",
      "Khi họ muốn đóng tài khoản của mình",
      "Phần mềm độc hại đang chạy trên máy tính của họ",
      "Họ đã cập nhật mật khẩu của họ gần đây",
      "Họ đã không thay đổi mật khẩu của họ trong một thời gian dài"
    ],
    answer: [
      "Họ đã được thông báo rằng có quyền truy cập trái phép vào tài khoản của họ",
      "Phần mềm độc hại đang chạy trên máy tính của họ",
      "Họ đã không thay đổi mật khẩu của họ trong một thời gian dài"
    ],
    explanation: "Thay đổi mật khẩu ngay lập tức khi phát hiện rò rỉ, thiết bị nhiễm mã độc, hoặc định kỳ sau một thời gian dài sử dụng để tăng cường bảo mật."
  },
  {
    id: 31,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn cần tạo một mật khẩu mạnh. Đâu là ba nguyên tắc bạn cần tuân thủ? (Chọn 3)",
    options: [
      "Bao gồm các chữ cái, chữ số và ký hiệu",
      "Bao gồm các số dễ nhớ như ngày sinh và số điện thoại",
      "Bao gồm chữ viết hoa và chữ viết thường",
      "Sử dụng tám ký tự trở lên",
      "Bao gồm họ hoặc tên của bạn"
    ],
    answer: [
      "Bao gồm các chữ cái, chữ số và ký hiệu",
      "Bao gồm chữ viết hoa và chữ viết thường",
      "Sử dụng tám ký tự trở lên"
    ],
    explanation: "Mật khẩu mạnh cần tối thiểu 8 ký tự, kết hợp chữ hoa, chữ thường, số và các ký hiệu đặc biệt. Không nên chứa các thông tin cá nhân dễ đoán như họ tên, ngày sinh, số điện thoại."
  },
  {
    id: 32,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn cần đảm bảo an toàn cho mật khẩu của mình. Đâu là ba nguyên tắc bảo mật bạn cần tuân thủ? (Chọn 3)",
    options: [
      "Sử dụng mật khẩu khác nhau cho mỗi tài khoản",
      "Sử dụng mật khẩu phức tạp và ghi vào một cuốn sổ mà bạn luôn mang theo bên mình",
      "Sử dụng xác thực đa yếu tố (MFA / 2FA), nếu có",
      "Sử dụng mật khẩu dài nhất hoặc cụm mật khẩu được hệ thống mật khẩu cho phép",
      "Sử dụng các từ có thể tìm thấy trong từ điển của một ngôn ngữ khác với ngôn ngữ chính của bạn"
    ],
    answer: [
      "Sử dụng mật khẩu khác nhau cho mỗi tài khoản",
      "Sử dụng xác thực đa yếu tố (MFA / 2FA), nếu có",
      "Sử dụng mật khẩu dài nhất hoặc cụm mật khẩu được hệ thống mật khẩu cho phép"
    ],
    explanation: "Không nên ghi mật khẩu ra sổ mang theo người vì dễ thất lạc; cũng không nên dùng các từ có trong từ điển vì dễ bị tấn công dạng từ điển (Dictionary attack). Mật khẩu dài và xác thực đa yếu tố là các biện pháp an toàn cốt lõi."
  },
  {
    id: 33,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SECURITY",
    difficulty: "medium",
    type: "single",
    question: "Lịch sử duyệt web và các trang web được đánh dấu trang cung cấp cho hacker một bản đồ của tất cả các trang web mà người dùng truy cập. Cùng với các trang web thường xuyên truy cập, hacker có thể sử dụng gì để truy cập vào tài khoản nếu mật khẩu được lưu vào thiết bị bị tấn công?",
    options: ["Cookies", "Cutouts", "History", "Settings"],
    answer: "Cookies",
    explanation: "Cookies lưu trữ các phiên đăng nhập (Session) và thông tin xác thực. Nếu lấy được Cookies của trình duyệt, hacker có thể vượt qua bước đăng nhập để vào tài khoản của người dùng."
  },
  {
    id: 34,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SECURITY",
    difficulty: "easy",
    type: "multiple",
    question: "Đâu là ba hành động tối ưu giúp người dùng bảo vệ hệ thống mật khẩu cá nhân của mình một cách tốt nhất trước các nguy cơ bảo mật? (Chọn 3)",
    options: [
      "Sử dụng các dãy số thứ tự tiến lùi liên tiếp trong chuỗi mật khẩu (ví dụ: 123456)",
      "Sử dụng chung một mật khẩu duy nhất cho tất cả các tài khoản trực tuyến cá nhân để tránh quên",
      "Tạo một mật khẩu hoàn toàn mới, riêng biệt cho mỗi tài khoản trực tuyến khác nhau",
      "Luôn giữ bí mật tuyệt đối mật khẩu và không chia sẻ cho bất kỳ ai",
      "Thực hiện thay đổi mật khẩu định kỳ theo khoảng thời gian khuyến nghị"
    ],
    answer: [
      "Tạo một mật khẩu hoàn toàn mới, riêng biệt cho mỗi tài khoản trực tuyến khác nhau",
      "Luôn giữ bí mật tuyệt đối mật khẩu và không chia sẻ cho bất kỳ ai",
      "Thực hiện thay đổi mật khẩu định kỳ theo khoảng thời gian khuyến nghị"
    ],
    explanation: "Bảo mật tài khoản yêu cầu: mật khẩu không trùng lặp, giữ kín không chia sẻ và thay đổi định kỳ. Sử dụng số thứ tự hay dùng chung một mật khẩu cho mọi nơi là lỗ hổng bảo mật nghiêm trọng."
  },
  {
    id: 35,
    level: "IC3_LEVEL1",
    test: 1,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn cần tạo một mật khẩu mạnh để bảo vệ tài khoản cá nhân trực tuyến khỏi các cuộc tấn công dò mật khẩu. Đâu là ba nguyên tắc bạn cần tuân thủ? (Chọn 3)",
    options: [
      "Bao gồm sự kết hợp giữa các chữ cái, chữ số và các ký hiệu đặc biệt",
      "Bao gồm các dãy số dễ nhớ liên quan trực tiếp đến cá nhân như ngày sinh hoặc số điện thoại",
      "Sử dụng độ dài mật khẩu tối thiểu từ tám (8) ký tự trở lên",
      "Sử dụng phối hợp cả chữ viết hoa (Uppercase) và chữ viết thường (Lowercase)",
      "Bao gồm phần họ hoặc tên đệm của bạn để hệ thống dễ nhận diện"
    ],
    answer: [
      "Bao gồm sự kết hợp giữa các chữ cái, chữ số và các ký hiệu đặc biệt",
      "Sử dụng độ dài mật khẩu tối thiểu từ tám (8) ký tự trở lên",
      "Sử dụng phối hợp cả chữ viết hoa (Uppercase) và chữ viết thường (Lowercase)"
    ],
    explanation: "Một mật khẩu mạnh tiêu chuẩn cần có ít nhất 8 ký tự, bao gồm đầy đủ 4 nhóm: chữ hoa, chữ thường, chữ số và ký tự đặc biệt. Tránh sử dụng thông tin cá nhân như ngày sinh, họ tên vì hacker rất dễ khai thác qua phương thức Social Engineering."
  },

  // ----- NETWORK (4 câu) -----
  {
    id: 36,
    level: "IC3_LEVEL1",
    test: 1,
    category: "NETWORK",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về sự khác biệt giữa mạng có dây và không dây, hãy chọn Đúng hoặc Sai.",
    left: [
      "Kết nối wi-fi thường ít xảy ra độ trễ khi truyền dữ liệu hơn so với kết nối ethernet",
      "Kết nối ethernet thường cung cấp tốc độ kết nối mạng nhanh hơn kết nối wi-fi",
      "Kết nối wi-fi được mã hóa an toàn hơn so với kết nối ethernet"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Kết nối wi-fi thường ít xảy ra độ trễ khi truyền dữ liệu hơn so với kết nối ethernet": "Sai",
      "Kết nối ethernet thường cung cấp tốc độ kết nối mạng nhanh hơn kết nối wi-fi": "Đúng",
      "Kết nối wi-fi được mã hóa an toàn hơn so với kết nối ethernet": "Sai"
    },
    explanation: "Mạng có dây (Ethernet) luôn đem lại tốc độ nhanh hơn, độ trễ thấp hơn và tính bảo mật vật lý cao hơn so với mạng không dây (Wi-Fi)."
  },
  {
    id: 37,
    level: "IC3_LEVEL1",
    test: 1,
    category: "NETWORK",
    difficulty: "easy",
    type: "single",
    question: "Bạn đang gặp khó khăn khi gửi và nhận thông tin. Làm cách nào nhanh nhất để bạn có thể xác định xem thiết bị của mình có được kết nối với internet hay không?",
    options: ["Tải xuống ứng dụng Speedtest", "Thử lưu một tập tin", "Mở trình duyệt web để truy cập một trang web bất kỳ", "Hãy thử gửi một tin nhắn SMS thông thường"],
    answer: "Mở trình duyệt web để truy cập một trang web bất kỳ",
    explanation: "Mở trình duyệt và tải một trang web công khai là cách nhanh chóng, trực quan nhất để kiểm tra xem kết nối internet hiện tại có đang hoạt động hay không."
  },
  {
    id: 38,
    level: "IC3_LEVEL1",
    test: 1,
    category: "NETWORK",
    difficulty: "medium",
    type: "single",
    question: "Thiết bị nào chuyển đổi dữ liệu từ kỹ thuật số (Digital) sang tương tự (Analog) và ngược lại để truyền tín hiệu qua mạng?",
    options: ["Ethernet Cable", "Router", "Modem", "Network Adapter"],
    answer: "Modem",
    explanation: "Modem viết tắt từ Modulator/Demodulator, làm nhiệm vụ điều chế và giải điều chế tín hiệu, biến đổi tín hiệu số (digital) của máy tính thành tín hiệu tương tự (analog) truyền qua đường dây và ngược lại."
  },
  {
    id: 39,
    level: "IC3_LEVEL1",
    test: 1,
    category: "NETWORK",
    difficulty: "medium",
    type: "matching",
    question: "Xác định sự khác biệt giữa Internet và mạng nội bộ (Intranet). Với mỗi câu phát biểu dưới đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Mạng nội bộ không giới hạn số lượng người dùng và bất kỳ ai bên ngoài cũng có thể tự do truy cập được",
      "Kết nối mạng nội bộ (Intranet) thường an toàn và bảo mật hơn so với kết nối Internet",
      "Internet thuộc quyền sở hữu độc quyền của một tổ hợp công ty liên doanh toàn cầu"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Mạng nội bộ không giới hạn số lượng người dùng và bất kỳ ai bên ngoài cũng có thể tự do truy cập được": "Sai",
      "Kết nối mạng nội bộ (Intranet) thường an toàn và bảo mật hơn so với kết nối Internet": "Đúng",
      "Internet thuộc quyền sở hữu độc quyền của một tổ hợp công ty liên doanh toàn cầu": "Sai"
    },
    explanation: "Mạng nội bộ giới hạn nghiêm ngặt quyền truy cập cho nhân sự nội bộ nên bảo mật hơn Internet công cộng. Không có một tổ chức đơn lẻ nào sở hữu toàn bộ Internet toàn cầu."
  },

  // ----- INFORMATION LITERACY (4 câu) -----
  {
    id: 40,
    level: "IC3_LEVEL1",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "multiple",
    question: "Đâu là ba yếu tố phải có trong trích dẫn về một cuốn sách đã xuất bản? (Chọn 3)",
    options: ["Tình trạng thương hiệu", "Tên tác giả", "Tên sách", "Tình trạng bản quyền", "Ngày xuất bản"],
    answer: ["Tên tác giả", "Tên sách", "Ngày xuất bản"],
    explanation: "Một trích dẫn nguồn sách chuẩn bắt buộc phải bao gồm các thông tin cốt lõi: Tên tác giả, Tên tác phẩm (sách) và Năm/Ngày xuất bản."
  },
  {
    id: 41,
    level: "IC3_LEVEL1",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về phương pháp trích dẫn nguồn hợp lệ, hãy chọn Đúng hoặc Sai:",
    left: [
      "Bạn phải trích dẫn nguồn nếu tóm tắt lại nội dung bài viết của một người khác",
      "Bạn nên đặt dấu ngoặc kép xung quanh các cụm từ gồm ba từ trở lên được trích dẫn trực tiếp từ bài viết của người khác",
      "Bạn phải trích dẫn nguồn nếu lấy thông tin trực tiếp từ một bài phát biểu công khai",
      "Bạn phải trích dẫn nguồn nếu diễn đạt lại (paraphrase) bài viết của một người khác"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bạn phải trích dẫn nguồn nếu tóm tắt lại nội dung bài viết của một người khác": "Đúng",
      "Bạn nên đặt dấu ngoặc kép xung quanh các cụm từ gồm ba từ trở lên được trích dẫn trực tiếp từ bài viết của người khác": "Đúng",
      "Bạn phải trích dẫn nguồn nếu lấy thông tin trực tiếp từ một bài phát biểu công khai": "Đúng",
      "Bạn phải trích dẫn nguồn nếu diễn đạt lại (paraphrase) bài viết của một người khác": "Đúng"
    },
    explanation: "Tất cả các hành động mượn thông tin, dù là tóm tắt, trích trực tiếp hay diễn đạt lại ý tưởng đều bắt buộc phải ghi nhận trích dẫn nguồn rõ ràng."
  },
  {
    id: 42,
    level: "IC3_LEVEL1",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "matching",
    question: "Quy kết nguồn và chống đạo văn là kỹ năng bắt buộc của công dân số. Với mỗi phát biểu về việc trích dẫn nguồn học thuật dưới đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Bạn chỉ phải thực hiện trích dẫn nguồn khi sao chép và sử dụng nguyên văn 100% câu chữ chính xác từ tác phẩm gốc của người khác",
      "Bạn sẽ bị quy vào lỗi vi phạm đạo văn (Plagiarism) nếu lấy ý tưởng của người khác đưa vào bài viết mà không ghi rõ trích dẫn nguồn đầy đủ",
      "Trong tất cả mọi tác phẩm viết nghiên cứu, bạn bắt buộc phải sử dụng duy nhất phần chú thích ở chân trang (Footnote) để làm hình thức trích dẫn nguồn",
      "Bạn có thể mạo nhận tác phẩm hoặc ý tưởng độc quyền của người khác làm sản phẩm tự sáng tạo của riêng mình mà không cần thực hiện trích dẫn nếu dùng cho mục đích phi thương mại"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bạn chỉ phải thực hiện trích dẫn nguồn khi sao chép và sử dụng nguyên văn 100% câu chữ chính xác từ tác phẩm gốc của người khác": "Sai",
      "Bạn sẽ bị quy vào lỗi vi phạm đạo văn (Plagiarism) nếu lấy ý tưởng của người khác đưa vào bài viết mà không ghi rõ trích dẫn nguồn đầy đủ": "Đúng",
      "Trong tất cả mọi tác phẩm viết nghiên cứu, bạn bắt buộc phải sử dụng duy nhất phần chú thích ở chân trang (Footnote) để làm hình thức trích dẫn nguồn": "Sai",
      "Bạn có thể mạo nhận tác phẩm hoặc ý tưởng độc quyền của người khác làm sản phẩm tự sáng tạo của riêng mình mà không cần thực hiện trích dẫn nếu dùng cho mục đích phi thương mại": "Sai"
    },
    explanation: "Đạo văn tính cả hành vi lấy ý tưởng mà không dẫn nguồn dù đã viết lại bằng lời văn khác. Có nhiều phương pháp trích dẫn (như đặt trong ngoặc đơn kề bên văn bản theo chuẩn APA/MLA), không bắt buộc phải dùng Footnote cuối trang."
  },
  {
    id: 43,
    level: "IC3_LEVEL1",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "matching",
    question: "Học sinh cần nắm vững các quy định trích dẫn nguồn tài liệu tham khảo khi làm tiểu luận. Với mỗi phát biểu về phương pháp trích dẫn sau đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Bạn bắt buộc phải trích dẫn nguồn đầy đủ nếu thực hiện tóm tắt (Summarize) nội dung chính bài viết của một người khác",
      "Bạn nên chủ động đặt dấu ngoặc kép (Quotation marks) xung quanh các cụm từ liên tục gồm từ ba (3) từ trở lên khi trích dẫn nguyên văn bài viết của người khác",
      "Bạn bắt buộc phải thực hiện trích dẫn nguồn tác giả nếu lấy trực tiếp một câu nói từ một bài phát biểu công khai của họ",
      "Bạn vẫn phải thực hiện trích dẫn nguồn một cách nghiêm túc nếu bạn diễn đạt lại (Paraphrase) bài viết của người khác theo ngôn từ của mình"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bạn bắt buộc phải trích dẫn nguồn đầy đủ nếu thực hiện tóm tắt (Summarize) nội dung chính bài viết của một người khác": "Đúng",
      "Bạn nên chủ động đặt dấu ngoặc kép (Quotation marks) xung quanh các cụm từ liên tục gồm từ ba (3) từ trở lên khi trích dẫn nguyên văn bài viết của người khác": "Đúng",
      "Bạn bắt buộc phải thực hiện trích dẫn nguồn tác giả nếu lấy trực tiếp một câu nói từ một bài phát biểu công khai của họ": "Đúng",
      "Bạn vẫn phải thực hiện trích dẫn nguồn một cách nghiêm túc nếu bạn diễn đạt lại (Paraphrase) bài viết của người khác theo ngôn từ của mình": "Đúng"
    },
    explanation: "Mọi hành vi mượn ý tưởng, dữ liệu, tóm tắt, trích dẫn trực tiếp hay diễn đạt lại từ công trình, bài phát biểu của người khác đều bắt buộc phải ghi nhận trích dẫn nguồn để đảm bảo tính liêm chính học thuật."
  },

  // ----- COLLABORATION (2 câu) -----
  {
    id: 44,
    level: "IC3_LEVEL1",
    test: 1,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "single",
    question: "Trong lớp học, bạn đang đọc bài nghiên cứu của một người bạn để đưa ra các đề xuất cải tiến, sửa chữa lỗi chính tả và để lại các nhận xét, đánh giá khách quan. Bạn đang thực hiện quy trình nào dưới đây?",
    options: ["Đồng tác giả (Co-authoring)", "Bình duyệt/Đánh giá ngang hàng (Peer review)", "Quy kết nguồn (Attribution)", "Xác minh dữ kiện (Fact checking)"],
    answer: "Bình duyệt/Đánh giá ngang hàng (Peer review)",
    explanation: "Peer review (Bình duyệt / Đánh giá ngang hàng) là quy trình các học sinh hoặc chuyên gia trong cùng một lĩnh vực kiểm tra, đánh giá, nhận xét tác phẩm của nhau nhằm nâng cao chất lượng trước khi xuất bản."
  },
  {
    id: 45,
    level: "IC3_LEVEL1",
    test: 1,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "multiple",
    question: "Trường bạn yêu cầu thiết kế trang Web theo dõi tham gia câu lạc bộ. Bạn tập hợp nhóm để đưa ra ý tưởng giải quyết vấn đề (brainstorming). Hành động nào có ích cho quá trình này? (Chọn 2)",
    options: [
      "Khuyến khích các ý tưởng táo bạo.",
      "Chỉ chia sẻ những ý tưởng mà bạn cảm thấy rất tự tin.",
      "Không chỉ trích các ý tưởng của những thành viên khác trong nhóm.",
      "Đặt giới hạn mỗi thành viên chỉ đưa ra một hoặc hai ý tưởng."
    ],
    answer: ["Khuyến khích các ý tưởng táo bạo.", "Không chỉ trích các ý tưởng của những thành viên khác trong nhóm."],
    explanation: "Nguyên tắc brainstorming hiệu quả: (1) khuyến khích mọi ý tưởng, kể cả táo bạo — để kích thích sáng tạo, (2) không phán xét trong giai đoạn tạo ý tưởng — để mọi người tự do đề xuất."
  },

  // ============================================================
  // TEST 2 (45 câu)
  // ============================================================

  // ----- HARDWARE (9 câu) -----
  {
    id: 46,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Quan sát hình ảnh và thực hiện kéo thả chính xác từng linh kiện phần cứng máy tính vào tên gọi tương ứng.",
    left: ["ic3_lv1_q46_opt_a", "ic3_lv1_q46_opt_b", "ic3_lv1_q46_opt_c", "ic3_lv1_q46_opt_d"],
    right: ["Bo mạch chủ (Motherboard)", "Ổ đĩa cứng (HDD)", "Ổ cứng thể rắn (SSD)", "Bộ xử lý trung tâm (CPU)"],
    answer: {
      "ic3_lv1_q46_opt_a": "Bộ xử lý trung tâm (CPU)",
      "ic3_lv1_q46_opt_b": "Ổ đĩa cứng (HDD)",
      "ic3_lv1_q46_opt_c": "Ổ cứng thể rắn (SSD)",
      "ic3_lv1_q46_opt_d": "Bo mạch chủ (Motherboard)"
    },
    explanation: "Bo mạch chủ (Motherboard) là bảng mạch chính kết nối và cho phép các linh kiện trong máy tính giao tiếp với nhau. Ổ đĩa cứng (HDD) lưu trữ dữ liệu bằng đĩa từ cơ học. Ổ cứng thể rắn (SSD) sử dụng bộ nhớ flash, cho tốc độ truy xuất nhanh hơn HDD. Bộ xử lý trung tâm (CPU) là thành phần thực hiện các phép tính và xử lý lệnh của máy tính."
  },
  {
    id: 47,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn dự định mua một thiết bị máy tính cầm tay phục vụ học tập di động. Thiết bị này bắt buộc phải đáp ứng hai tiêu chí: có khả năng chạy độc lập bằng pin và tích hợp sẵn bàn phím vật lý cố định (không tháo rời). Đâu là hai thiết bị đáp ứng đúng yêu cầu? (Chọn 2)",
    options: [
      "Máy tính để bàn chạy hệ điều hành macOS (iMac)",
      "Điện thoại thông minh chạy hệ điều hành Android",
      "Máy tính xách tay tiêu chuẩn chạy Windows (Laptop)",
      "Máy tính bảng thuần màn hình cảm ứng chạy Android",
      "Máy tính Chromebook chạy hệ điều hành ChromeOS"
    ],
    answer: ["Máy tính xách tay tiêu chuẩn chạy Windows (Laptop)", "Máy tính Chromebook chạy hệ điều hành ChromeOS"],
    explanation: "Cả Laptop chạy Windows và Chromebook đều có cấu trúc vỏ sò tích hợp sẵn bàn phím cứng gắn liền và trang bị pin sạc dung lượng lớn bên trong máy giúp làm việc di động. Máy tính bảng cảm ứng không có sẵn bàn phím vật lý cố định, còn iMac là máy để bàn cần cắm nguồn điện liên tục."
  },
  {
    id: 48,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Hãy ghép nối từng loại thiết bị lưu trữ dữ liệu phần cứng với định nghĩa/mô tả cơ chế hoạt động tương ứng của chúng:",
    left: [
      "Thiết bị lưu trữ dữ liệu bên ngoài cực kỳ gọn nhẹ, sử dụng bộ nhớ flash gắn trực tiếp vào cổng giao tiếp",
      "Thiết bị lưu trữ dữ liệu dạng hộp bên ngoài hoạt động dựa trên kết nối dây cáp USB với máy tính để mở rộng dung lượng di động",
      "Thiết bị lưu trữ dữ liệu thể rắn lắp bên trong máy tính, giúp lưu trữ và truy xuất dữ liệu tốc độ cao bằng chip nhớ flash",
      "Thiết bị lưu trữ dữ liệu cơ điện từ lắp cố định bên trong máy tính, thực hiện lưu và đọc dữ liệu dựa trên các đĩa từ quay nhanh"
    ],
    right: ["Ổ đĩa flash USB (USB Flash Drive)", "Ổ cứng di động (External Hard Drive)", "Ổ cứng thể rắn (SSD - Solid State Drive)", "Ổ đĩa cứng cơ học (HDD - Hard Disk Drive)"],
    answer: {
      "Thiết bị lưu trữ dữ liệu bên ngoài cực kỳ gọn nhẹ, sử dụng bộ nhớ flash gắn trực tiếp vào cổng giao tiếp": "Ổ đĩa flash USB (USB Flash Drive)",
      "Thiết bị lưu trữ dữ liệu dạng hộp bên ngoài hoạt động dựa trên kết nối dây cáp USB với máy tính để mở rộng dung lượng di động": "Ổ cứng di động (External Hard Drive)",
      "Thiết bị lưu trữ dữ liệu thể rắn lắp bên trong máy tính, giúp lưu trữ và truy xuất dữ liệu tốc độ cao bằng chip nhớ flash": "Ổ cứng thể rắn (SSD - Solid State Drive)",
      "Thiết bị lưu trữ dữ liệu cơ điện từ lắp cố định bên trong máy tính, thực hiện lưu và đọc dữ liệu dựa trên các đĩa từ quay nhanh": "Ổ đĩa cứng cơ học (HDD - Hard Disk Drive)"
    },
    explanation: "HDD sử dụng phiến đĩa từ cơ học quay vòng. SSD sử dụng chip nhớ flash gắn trong tốc độ cao. Ổ cứng di động là HDD/SSD gắn ngoài qua box USB, còn USB Flash Drive là dạng thanh nhớ siêu nhỏ gọn."
  },
  {
    id: 49,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần hiểu rõ bản chất kiến trúc mạng để phân biệt giữa mạng Internet toàn cầu và mạng nội bộ Intranet của tổ chức. Với mỗi phát biểu, hãy chọn Đúng hoặc Sai:",
    left: [
      "Mạng nội bộ Intranet hoàn toàn không giới hạn số lượng người dùng và bất kỳ ai ở ngoài công cộng cũng có thể tự do truy cập được",
      "Kết nối mạng nội bộ Intranet thường cung cấp mức độ an toàn và bảo mật thông tin nội bộ cao hơn so với mạng Internet công cộng",
      "Mạng Internet toàn cầu thuộc quyền sở hữu pháp lý và điều hành riêng biệt của một tổ hợp công ty liên doanh viễn thông duy nhất"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Mạng nội bộ Intranet hoàn toàn không giới hạn số lượng người dùng và bất kỳ ai ở ngoài công cộng cũng có thể tự do truy cập được": "Sai",
      "Kết nối mạng nội bộ Intranet thường cung cấp mức độ an toàn và bảo mật thông tin nội bộ cao hơn so với mạng Internet công cộng": "Đúng",
      "Mạng Internet toàn cầu thuộc quyền sở hữu pháp lý và điều hành riêng biệt của một tổ hợp công ty liên doanh viễn thông duy nhất": "Sai"
    },
    explanation: "Mạng nội bộ (Intranet) là mạng đóng, chỉ nhân viên được cấp quyền mới vào được nên độ an toàn rất cao. Internet là mạng công cộng toàn cầu, không thuộc sở hữu độc quyền của bất kỳ một quốc gia hay công ty đơn lẻ nào."
  },
  {
    id: 50,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Một cơ sở hạ tầng mạng trường học chất lượng cao đem lại nhiều lợi ích thiết thực cho giáo dục. Với mỗi phát biểu dưới đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Đảm bảo toàn bộ học sinh và giáo viên trong khuôn viên trường luôn có thể kết nối thông suốt, ổn định với mạng nội bộ của nhà trường",
      "Cho phép học sinh kết nối, điều khiển từ xa và sử dụng trực tiếp tài nguyên của phòng máy tính vật lý nhà trường từ bất kỳ địa điểm nào trên thế giới mà không cần cấu hình bảo mật đặc biệt",
      "Hỗ trợ mở rộng quy mô, nâng cấp hệ thống kết nối mạng của nhà trường một cách dễ dàng mà không cần phải đập đi thiết kế lại toàn bộ từ đầu khi số lượng học sinh tăng lên"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Đảm bảo rằng học sinh có thể kết nối thông suốt với mạng của nhà trường": "Đúng",
      "Cho phép học sinh kết nối với phòng máy tính của nhà trường từ mọi nơi": "Sai",
      "Hỗ trợ mở rộng hệ thống mạng của nhà trường mà không cần thiết kế lại khi số lượng học sinh tăng lên": "Đúng"
    },
    explanation: "Hạ tầng mạng tốt mang lại khả năng kết nối ổn định diện rộng tại chỗ và tính mở rộng linh hoạt (Scalability). Việc kết nối từ bên ngoài Internet vào máy tính nội bộ của trường đòi hỏi các giao thức bảo mật cao cấp như VPN, không phải là tính năng mở tự động tự do."
  },
  {
    id: 51,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question: "Thiết bị mạng nào đóng vai trò chuyển đổi qua lại giữa tín hiệu kỹ thuật số (Digital) từ máy tính sang tín hiệu tương tự (Analog) để truyền dẫn dữ liệu qua hệ thống dây cáp viễn thông?",
    options: ["Ethernet Cable", "Router", "Modem", "Network Adapter"],
    answer: "Modem",
    explanation: "Modem thực hiện chức năng biến đổi tín hiệu số từ máy tính thành tín hiệu tương tự để truyền đi xa trên mạng dây cáp và ngược lại (Modulate/Demodulate)."
  },
  {
    id: 52,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Khi kết nối máy tính với màn hình hiển thị gắn ngoài (External Monitor) hoặc máy chiếu, những loại cổng/giao tiếp phần cứng nào sau đây phổ biến nhất hiện nay hỗ trợ truyền tải cả tín hiệu hình ảnh lẫn âm thanh chất lượng cao? (Chọn 2)",
    options: ["VGA", "HDMI", "PS/2", "DisplayPort"],
    answer: ["HDMI", "DisplayPort"],
    explanation: "HDMI và DisplayPort là hai chuẩn kết nối kỹ thuật số hiện đại, hỗ trợ truyền tải đồng thời cả luồng hình ảnh độ nét cao lẫn âm thanh băng thông rộng. Cổng VGA là chuẩn analog cũ chỉ truyền hình ảnh, còn PS/2 là cổng kết nối chuột/bàn phím cổ điển."
  },
  {
    id: 53,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "hard",
    type: "multiple",
    question: "Hai nguyên tắc thiết kế chung cho phần cứng máy tính là gì? (Chọn 2)",
    options: [
      "Liên kết với internet vạn vật: Triển khai chức năng trực tuyến bất cứ khi nào có thể để cải thiện trải nghiệm người dùng",
      "Sử dụng công bằng: Thiết kế hữu ích và có thể bán được cho nhiều người với các khả năng khác nhau",
      "Duy trì chi phí thấp: Sử dụng các bộ phận ít tốn kém hơn bất cứ khi nào có thể để giảm chi phí lắp ráp",
      "Khả năng chịu lỗi: Giảm thiểu các mối nguy hiểm và hậu quả bất lợi của các hành động ngẫu nhiên hoặc ngoài ý muốn"
    ],
    answer: [
      "Sử dụng công bằng: Thiết kế hữu ích và có thể bán được cho nhiều người với các khả năng khác nhau",
      "Khả năng chịu lỗi: Giảm thiểu các mối nguy hiểm và hậu quả bất lợi của các hành động ngẫu nhiên hoặc ngoài ý muốn"
    ],
    explanation: "Đây là 2 trong 7 nguyên tắc cốt lõi của Thiết kế toàn cầu (Universal Design) áp dụng cho phần cứng: Equitable Use (Sử dụng công bằng - ai cũng có thể tiếp cận dùng được) và Tolerance for Error (Khả năng chịu lỗi - giảm thiểu rủi ro khi người dùng bấm hoặc thao tác nhầm)."
  },
  {
    id: 54,
    level: "IC3_LEVEL1",
    test: 2,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Xác định ưu điểm của máy in phun và máy in laser bằng cách ghép loại máy in tương ứng với từng ưu điểm:",
    left: [
      "Phù hợp để in ảnh chất lượng cao",
      "Thích hợp để in tài liệu số lượng lớn với chi phí thấp",
      "Thân thiện với môi trường hơn",
      "Tài liệu khô mực ngay khi in ra"
    ],
    right: ["Máy in laser", "Máy in phun"],
    answer: {
      "Phù hợp để in ảnh chất lượng cao": "Máy in phun",
      "Thích hợp để in tài liệu số lượng lớn với chi phí thấp": "Máy in laser",
      "Thân thiện với môi trường hơn": "Máy in phun",
      "Tài liệu khô mực ngay khi in ra": "Máy in laser"
    },
    explanation: "Máy in phun (Inkjet) sử dụng các giọt mực lỏng li ti giúp chuyển đổi dải màu mịn màng nên in ảnh xuất sắc hơn nhưng bản in cần thời gian ngắn để khô mực. Máy in laser nung bột mực (Toner) tĩnh điện giúp mực bám chết và khô ngay lập tức, cho tốc độ in văn bản cực nhanh với chi phí trên mỗi trang cực rẻ."
  },

  // ----- SOFTWARE (8 câu) -----
  {
    id: 55,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về phần mềm mã nguồn mở (Open source), hãy chọn Đúng hoặc Sai:",
    left: [
      "Bất kỳ ai cũng có thể kiểm tra, sửa đổi và cải tiến mã nguồn của phần mềm mã nguồn mở",
      "Tất cả phần mềm miễn phí (Freeware) đều là phần mềm mã nguồn mở",
      "Bạn phải đồng ý với thỏa thuận cấp phép người dùng cuối (EULA) trước khi sử dụng phần mềm mã nguồn mở"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bất kỳ ai cũng có thể kiểm tra, sửa đổi và cải tiến mã nguồn của phần mềm mã nguồn mở": "Đúng",
      "Tất cả phần mềm miễn phí (Freeware) đều là phần mềm mã nguồn mở": "Sai",
      "Bạn phải đồng ý với thỏa thuận cấp phép người dùng cuối (EULA) trước khi sử dụng phần mềm mã nguồn mở": "Sai"
    },
    explanation: "Mã nguồn mở mở công khai cho mọi người chỉnh sửa. Phần mềm miễn phí (Freeware) nhiều khi đóng mã nguồn chứ không phải cứ miễn phí là nguồn mở. Thỏa thuận EULA thường áp dụng nghiêm ngặt cho phần mềm độc quyền thương mại."
  },
  {
    id: 56,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi loại phần mềm dưới đây, hãy xác định xem đó là phần mềm Hệ thống (System Software) hay phần mềm Ứng dụng (Application Software):",
    left: [
      "Bộ phát đa phương tiện (Media Player)",
      "Trình quản lý phân vùng ổ đĩa (Disk Partition Manager)",
      "Trình duyệt web (Web Browser)",
      "Trình điều khiển card đồ họa (Graphics Driver)"
    ],
    right: ["Phần mềm Ứng dụng", "Phần mềm Hệ thống"],
    answer: {
      "Bộ phát đa phương tiện (Media Player)": "Phần mềm Ứng dụng",
      "Trình quản lý phân vùng ổ đĩa (Disk Partition Manager)": "Phần mềm Hệ thống",
      "Trình duyệt web (Web Browser)": "Phần mềm Ứng dụng",
      "Trình điều khiển card đồ họa (Graphics Driver)": "Phần mềm Hệ thống"
    },
    explanation: "Phần mềm Hệ thống bao gồm Driver phần cứng và các công cụ quản lý đĩa/hệ thống cốt lõi. Phần mềm Ứng dụng phục vụ nhu cầu cụ thể của người dùng như xem phim giải trí (Media Player) hoặc lướt web."
  },
  {
    id: 57,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "matching",
    question: "Ghép từng công cụ của trình duyệt web phổ biến với hành động (mục đích) tương ứng của nó:",
    left: [
      "Quản lý các tab đang mở",
      "Liệt kê các trang web bạn đã truy cập gần đây",
      "Tải lại trang web hiện tại",
      "Hiển thị URL của trang web hiện tại",
      "Hiển thị lại một trang web đã truy cập trước đó"
    ],
    right: [
      "Address box (Thanh địa chỉ)",
      "Refresh button (Nút làm mới)",
      "History (Lịch sử duyệt web)",
      "Back button (Nút quay lại)",
      "Tab manager / Browser Tabs (Quản lý Tab)"
    ],
    answer: {
      "Quản lý các tab đang mở": "Tab manager / Browser Tabs (Quản lý Tab)",
      "Liệt kê các trang web bạn đã truy cập gần đây": "History (Lịch sử duyệt web)",
      "Tải lại trang web hiện tại": "Refresh button (Nút làm mới)",
      "Hiển thị URL của trang web hiện tại": "Address box (Thanh địa chỉ)",
      "Hiển thị lại một trang web đã truy cập trước đó": "Back button (Nút quay lại)"
    },
    explanation: "Đây là mục đích sử dụng cơ bản của các thành phần giao diện trên trình duyệt web."
  },
  {
    id: 58,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "easy",
    type: "single",
    question: "Bạn cần lưu danh sách các trang web để có thể dễ dàng quay trở lại vào lần sau. Bạn nên sử dụng tính năng nào của trình duyệt web?",
    options: ["Duyệt đa trang một lúc (Multi-tabbing)", "Mục yêu thích hoặc đánh dấu trang (Favorites/Bookmarks)", "Lịch sử hoặc dòng thời gian (History/Timeline)", "Hộp địa chỉ (Address box)"],
    answer: "Mục yêu thích hoặc đánh dấu trang (Favorites/Bookmarks)",
    explanation: "Tính năng Bookmark (Đánh dấu trang) hoặc Favorites giúp người dùng lưu trữ lại các đường link trang web quan trọng để truy cập lại một cách nhanh chóng."
  },
  {
    id: 59,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về phần mềm mã nguồn mở (Open source), hãy chọn Đúng hoặc Sai:",
    left: [
      "Bất kỳ ai cũng có thể kiểm tra, sửa đổi và cải tiến mã nguồn của phần mềm mã nguồn mở",
      "Tất cả phần mềm miễn phí (Freeware) đều là phần mềm mã nguồn mở",
      "Bạn phải đồng ý với thỏa thuận cấp phép người dùng cuối (EULA) trước khi sử dụng phần mềm mã nguồn mở"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bất kỳ ai cũng có thể kiểm tra, sửa đổi và cải tiến mã nguồn của phần mềm mã nguồn mở": "Đúng",
      "Tất cả phần mềm miễn phí (Freeware) đều là phần mềm mã nguồn mở": "Sai",
      "Bạn phải đồng ý với thỏa thuận cấp phép người dùng cuối (EULA) trước khi sử dụng phần mềm mã nguồn mở": "Sai"
    },
    explanation: "Mã nguồn mở mở công khai cho mọi người chỉnh sửa. Phần mềm miễn phí (Freeware) nhiều khi đóng mã nguồn chứ không phải cứ miễn phí là nguồn mở. Thỏa thuận EULA thường áp dụng nghiêm ngặt cho phần mềm độc quyền thương mại."
  },
  {
    id: 60,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi loại phần mềm dưới đây, hãy xác định xem đó là phần mềm Hệ thống (System Software) hay phần mềm Ứng dụng (Application Software):",
    left: [
      "Bộ phát đa phương tiện (Media Player)",
      "Trình quản lý phân vùng ổ đĩa (Disk Partition Manager)",
      "Trình duyệt web (Web Browser)",
      "Trình điều khiển card đồ họa (Graphics Driver)"
    ],
    right: ["Phần mềm Ứng dụng", "Phần mềm Hệ thống"],
    answer: {
      "Bộ phát đa phương tiện (Media Player)": "Phần mềm Ứng dụng",
      "Trình quản lý phân vùng ổ đĩa (Disk Partition Manager)": "Phần mềm Hệ thống",
      "Trình duyệt web (Web Browser)": "Phần mềm Ứng dụng",
      "Trình điều khiển card đồ họa (Graphics Driver)": "Phần mềm Hệ thống"
    },
    explanation: "Phần mềm Hệ thống bao gồm Driver phần cứng và các công cụ quản lý đĩa/hệ thống cốt lõi. Phần mềm Ứng dụng phục vụ nhu cầu cụ thể của người dùng như xem phim giải trí (Media Player) hoặc lướt web."
  },
  {
    id: 61,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "easy",
    type: "single",
    question: "Phần mềm giao tiếp và cung cấp ___ cho phần cứng.",
    options: ["Chỉ dẫn (Instructions)", "Phần mềm độc hại (Malware)", "Hỗ trợ (Assistance)", "Đề nghị (Suggestions)"],
    answer: "Chỉ dẫn (Instructions)",
    explanation: "Phần mềm (software) đóng vai trò trung gian, cung cấp các chỉ dẫn (instructions) để phần cứng biết cần phải làm gì."
  },
  {
    id: 62,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SOFTWARE",
    difficulty: "easy",
    type: "single",
    question: "Để một ứng dụng hoạt động, phần cứng và phần mềm của máy tính phải có chung điểm gì?",
    options: ["Mã bổ sung (Supplemental Code)", "Mạng (Network)", "Chương trình đặc biệt (Special Program)", "Ngôn ngữ nhị phân (Binary Language)"],
    answer: "Ngôn ngữ nhị phân (Binary Language)",
    explanation: "Phần cứng và phần mềm đều hoạt động dựa trên ngôn ngữ nhị phân (0 và 1) — đây là ngôn ngữ duy nhất máy tính có thể hiểu và thực thi."
  },

  // ----- DIGITAL CITIZENSHIP (7 câu) -----
  {
    id: 63,
    level: "IC3_LEVEL1",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "easy",
    type: "single",
    question: "Hãy chọn cụm từ thích hợp nhất để hoàn thành khẳng định sau: 'Luật bản quyền cung cấp cho tác giả quyền hợp pháp độc quyền đối với ________ của họ, giúp họ có quyền kiểm soát tuyệt đối việc in ấn, sao chép, phân tích hoặc phê bình tác phẩm đó.'",
    options: ["Quyền sở hữu (Ownership)", "Sự sáng tạo/Tác phẩm sáng tạo (Creation)"],
    answer: "Sự sáng tạo/Tác phẩm sáng tạo (Creation)",
    explanation: "Bản quyền (Copyright) bảo vệ trực tiếp các biểu hiện sáng tạo dưới dạng tác phẩm cụ thể (Creation) ngay khi nó được hình thành vật lý, cung cấp quyền độc quyền cho tác giả."
  },
  {
    id: 64,
    level: "IC3_LEVEL1",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "easy",
    type: "single",
    question: "Hãy điền từ thích hợp vào khoảng trống: 'Lỗi chính tả và ngữ pháp (Spelling and Grammar) kém trong văn bản giao tiếp trực tuyến sẽ khiến một người trông giống như một người ________ và làm cho những người khác không tin tưởng hoặc coi trọng thông tin của họ.'",
    options: ["Am hiểu công nghệ (Tech savvy)", "Có trách nhiệm (Responsible)", "Chuyên nghiệp (Professional)", "Không chuyên nghiệp (Unprofessional)"],
    answer: "Không chuyên nghiệp (Unprofessional)",
    explanation: "Viết sai chính tả, lủng củng ngữ pháp thể hiện sự thiếu chỉn chu, cẩu thả, tạo ấn tượng không chuyên nghiệp (Unprofessional) trong môi trường học thuật và công sở."
  },
  {
    id: 65,
    level: "IC3_LEVEL1",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "single",
    question: "Lúc đêm muộn, bạn lướt mạng xã hội và thấy một học sinh cùng trường đăng bài thông báo rằng: 'Trường học đã bị phá hoại và giờ học ngày mai sẽ bị lùi lại muộn hai tiếng'. Bạn cần xác định xem thông tin này có đáng tin cậy và chính xác hay không, bạn nên làm gì?",
    options: [
      "Nhắn tin báo mẹ kiểm tra và chủ động đặt báo thức muộn hơn hai tiếng so với ngày thường",
      "Truy cập trực tiếp trang web chính thức của nhà trường hoặc các trang báo tin tức địa phương uy tín để kiểm tra thông tin chính thống",
      "Bấm chia sẻ/đăng lại thông tin đó, gắn thẻ (tag) nhiều bạn bè vào để hỏi xem có ai biết chuyện này không",
      "Để lại bình luận trực tiếp dưới bài đăng đó và hỏi người bạn kia lấy nguồn thông tin từ đâu"
    ],
    answer: "Truy cập trực tiếp trang web chính thức của nhà trường hoặc các trang báo tin tức địa phương uy tín để kiểm tra thông tin chính thống",
    explanation: "Thông tin trên mạng xã hội từ một cá nhân rất dễ là tin đồn thất thiệt. Để xác thực, một công dân số thông thái cần đối chiếu với các nguồn tin cậy, chính thống như cổng thông tin điện tử của nhà trường hoặc báo chí địa phương."
  },
  {
    id: 66,
    level: "IC3_LEVEL1",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "matching",
    question: "Bạn cần thêm một tác phẩm nghệ thuật/hình ảnh vào bài trình chiếu ở lớp học nhưng KHÔNG có thời gian để xin giấy phép sử dụng từ tác giả. Với mỗi trường hợp dưới đây, hãy chọn Có nếu bạn có thể sử dụng tác phẩm đó một cách hợp pháp hoặc chọn Không nếu không được phép:",
    left: [
      "Tác phẩm nghệ thuật đó đang được bảo vệ nghiêm ngặt bởi luật bản quyền",
      "Tác giả của bức ảnh là một người bạn quen biết ngoài đời của bạn",
      "Chủ sở hữu bản quyền đã chủ động tuyên bố chuyển tác phẩm nghệ thuật đó sang phạm vi công cộng (Public Domain)"
    ],
    right: ["Có", "Không"],
    answer: {
      "Tác phẩm nghệ thuật đó đang được bảo vệ nghiêm ngặt bởi luật bản quyền": "Không",
      "Tác giả của bức ảnh là một người bạn quen biết ngoài đời của bạn": "Không",
      "Chủ sở hữu bản quyền đã chủ động tuyên bố chuyển tác phẩm nghệ thuật đó sang phạm vi công cộng (Public Domain)": "Có"
    },
    explanation: "Nếu tác phẩm đã thuộc về Phạm vi công cộng (Public Domain), bất kỳ ai cũng có thể sử dụng tự do và hợp pháp mà không cần xin phép. Việc tác giả là người quen hay tác phẩm đang có bản quyền đều không cho phép bạn sử dụng tự do khi chưa có sự đồng ý chính thức."
  },
  {
    id: 67,
    level: "IC3_LEVEL1",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "matching",
    question: "Dấu chân kỹ thuật số (Digital footprint) là tập hợp các dữ liệu để lại từ hoạt động trực tuyến của bạn. Với mỗi phát biểu sau đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Các công ty mà bạn chia sẻ dữ liệu cá nhân (để đổi lấy quyền dùng ứng dụng miễn phí) tuyệt đối không được phép cung cấp dữ liệu đó cho bên thứ ba",
      "Nếu sử dụng bộ lọc mạng hoặc đăng tải ẩn danh, hệ thống sẽ hoàn toàn không thể truy vết được các nhận xét trực tuyến của bạn",
      "Thực hiện cập nhật trình duyệt web định kỳ 6 tháng một lần sẽ giúp xóa sạch toàn bộ dấu chân kỹ thuật số của bạn trên Internet",
      "Các nhà tuyển dụng hoặc trường đại học có quyền tìm kiếm và xem xét các hình ảnh, thông điệp cũ do ứng viên đăng tải trên mạng xã hội từ khi họ dưới 18 tuổi"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Các công ty mà bạn chia sẻ dữ liệu cá nhân (để đổi lấy quyền dùng ứng dụng miễn phí) tuyệt đối không được phép cung cấp dữ liệu đó cho bên thứ ba": "Sai",
      "Nếu sử dụng bộ lọc mạng hoặc đăng tải ẩn danh, hệ thống sẽ hoàn toàn không thể truy vết được các nhận xét trực tuyến của bạn": "Sai",
      "Thực hiện cập nhật trình duyệt web định kỳ 6 tháng một lần sẽ giúp xóa sạch toàn bộ dấu chân kỹ thuật số của bạn trên Internet": "Sai",
      "Các nhà tuyển dụng hoặc trường đại học có quyền tìm kiếm và xem xét các hình ảnh, thông điệp cũ do ứng viên đăng tải trên mạng xã hội từ khi họ dưới 18 tuổi": "Đúng"
    },
    explanation: "Nhiều công ty có điều khoản bán hoặc chia sẻ dữ liệu cho bên thứ ba trong chính sách bảo mật. Đăng tải ẩn danh vẫn có thể bị truy vết qua địa chỉ IP hoặc logs của nhà mạng. Cập nhật trình duyệt không xóa được dữ liệu đã lưu trên máy chủ web. Nhà tuyển dụng hoàn toàn có thể tra cứu lịch sử trực tuyến (dấu chân kỹ thuật số) để đánh giá tư cách ứng viên."
  },
  {
    id: 68,
    level: "IC3_LEVEL1",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về các hình ảnh được bảo vệ bởi giấy phép tài sản sáng tạo công cộng (Creative Commons - CC) và không thuộc phạm vi công cộng, hãy chọn Đúng hoặc Sai:",
    left: [
      "Khi sử dụng hình ảnh này, bạn bắt buộc phải thực hiện trích dẫn nguồn và tác giả của hình ảnh đó",
      "Bạn được phép tải và sử dụng các hình ảnh này mà không phải trả phí mua bản quyền thương mại",
      "Bạn được phép sử dụng hình ảnh này vô điều kiện cho mọi mục đích mà không cần quan tâm đến các ký hiệu đi kèm (như NC, ND...)"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Khi sử dụng hình ảnh này, bạn bắt buộc phải thực hiện trích dẫn nguồn và tác giả của hình ảnh đó": "Đúng",
      "Bạn được phép tải và sử dụng các hình ảnh này mà không phải trả phí mua bản quyền thương mại": "Đúng",
      "Bạn được phép sử dụng hình ảnh này vô điều kiện cho mọi mục đích mà không cần quan tâm đến các ký hiệu đi kèm (như NC, ND...)": "Sai"
    },
    explanation: "Giấy phép Creative Commons cho phép sử dụng miễn phí nhưng có điều kiện kèm theo (bắt buộc trích dẫn nguồn - thuộc tính BY, tuân thủ điều kiện phi thương mại - NC, hoặc không phái sinh - ND chứ không phải là sử dụng vô điều kiện)."
  },
  {
    id: 69,
    level: "IC3_LEVEL1",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về Luật bản quyền dưới đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Luật bản quyền bảo vệ quyền kiểm soát của tác giả đối với việc sao chép tác phẩm gốc của họ",
      "Luật bản quyền chỉ áp dụng để bảo vệ các tác phẩm nghệ thuật truyền thống như tranh vẽ và tượng điêu khắc",
      "Quyền bản quyền chỉ chính thức tồn tại sau khi tác giả hoàn tất quy trình đăng ký và nộp lệ phí với cơ quan quản lý nhà nước"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Luật bản quyền bảo vệ quyền kiểm soát của tác giả đối với việc sao chép tác phẩm gốc của họ": "Đúng",
      "Luật bản quyền chỉ áp dụng để bảo vệ các tác phẩm nghệ thuật truyền thống như tranh vẽ và tượng điêu khắc": "Sai",
      "Quyền bản quyền chỉ chính thức tồn tại sau khi tác giả hoàn tất quy trình đăng ký và nộp lệ phí với cơ quan quản lý nhà nước": "Sai"
    },
    explanation: "Luật bản quyền bảo vệ rất nhiều loại hình tác phẩm (văn học, phần mềm, âm nhạc, mã nguồn,...). Bản quyền tự động hình thành ngay khi tác phẩm được sáng tạo và thể hiện dưới một hình thức vật chất nhất định, không bắt buộc phải đăng ký mới có quyền."
  },

  // ----- OPERATING SYSTEM (6 câu) -----
  {
    id: 70,
    level: "IC3_LEVEL1",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "hard",
    type: "matching",
    question: "Bạn cần xây dựng quy ước đặt tên tập tin (File naming convention) đồng bộ cho hệ thống quản lý tệp dùng chung của trường nhằm hỗ trợ tốt nhất cho đa nền tảng hệ điều hành và ứng dụng phần mềm. Với mỗi phát biểu, hãy chọn Có nếu quy ước đó đúng chuẩn hoặc Không nếu không giúp ích:",
    left: [
      "TUYỆT ĐỐI KHÔNG sử dụng các ký tự đặc biệt như (~ ! @ # $ % ^ & * ( ) ' ; < > ? , [ ] { } `) trong tên file",
      "Sử dụng tên tập tin càng dài, càng chi tiết và diễn giải cụ thể nội dung càng tốt",
      "Sử dụng dấu gạch dưới (_) hoặc dấu gạch ngang (-) thay vì chèn khoảng trắng/khoảng cách tự do giữa các từ",
      "Đối với chuỗi tên tập tin có chứa yếu tố ngày tháng, hãy áp dụng định dạng chuẩn hóa thống nhất (ví dụ: YYYYMMDD)"
    ],
    right: ["Có", "Không"],
    answer: {
      "TUYỆT ĐỐI KHÔNG sử dụng các ký tự đặc biệt như (~ ! @ # $ % ^ & * ( ) ' ; < > ? , [ ] { } `) trong tên file": "Có",
      "Sử dụng tên tập tin càng dài, càng chi tiết và diễn giải cụ thể nội dung càng tốt": "Không",
      "Sử dụng dấu gạch dưới (_) hoặc dấu gạch ngang (-) thay vì chèn khoảng trắng/khoảng cách tự do giữa các từ": "Có",
      "Đối với chuỗi tên tập tin có chứa yếu tố ngày tháng, hãy áp dụng định dạng chuẩn hóa thống nhất (ví dụ: YYYYMMDD)": "Có"
    },
    explanation: "Quy ước đặt tên file chuẩn quốc tế yêu cầu: Tránh ký tự đặc biệt hệ thống (gây lỗi code), tránh khoảng trắng tự do (thay bằng gạch nối), tên file ngắn gọn súc tích và ngày tháng xếp theo thứ tự năm-tháng-ngày để tự động sắp xếp khoa học."
  },
  {
    id: 71,
    level: "IC3_LEVEL1",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Bạn tên là Sam Grey. Bạn đang cập nhật dự án của trường và muốn lưu một phiên bản mới. Bạn cần đặt tên tập tin đáp ứng các tiêu chí: chứa tên tác giả, dễ đọc, hỗ trợ tốt trên môi trường web và tương thích tốt trên mọi hệ điều hành (cross-platform). Tên tập tin nào tối ưu nhất?",
    options: ["SamGreyProject1v3.docx", "SamGreyv3.docx", "Sam_Grey_Project1_version3.docx", "Samgreyprojectoneversionthree15/04/2025.docx"],
    answer: "Sam_Grey_Project1_version3.docx",
    explanation: "Tên file `Sam_Grey_Project1_version3.docx` rất rõ ràng, dùng dấu gạch dưới `_` thay cho khoảng trắng, tránh được các lỗi xử lý đường dẫn (URL) trên môi trường web và đảm bảo không chứa các ký tự cấm (như dấu gạch chéo `/` trong tùy chọn ngày tháng vốn gây lỗi hệ thống)."
  },
  {
    id: 72,
    level: "IC3_LEVEL1",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần xác định các tính năng tiêu chuẩn hệ thống quản lý của thanh tác vụ (Taskbar) trong Hệ điều hành Windows. Với mỗi câu phát biểu, hãy chọn Có nếu có thể trực tiếp thực hiện hành động từ thanh tác vụ hoặc chọn Không nếu không thể:",
    left: [
      "Khởi động nhanh công cụ trình quản lý tác vụ (Task Manager)",
      "Điều chỉnh mức âm lượng đầu ra (Volume) của thiết bị âm thanh",
      "Thu nhỏ nhanh tất cả các chương trình đang mở để hiển thị màn hình nền (Desktop)",
      "Hiển thị trạng thái kết nối mạng và thay đổi mạng Wi-Fi nhanh"
    ],
    right: ["Có", "Không"],
    answer: {
      "Khởi động nhanh công cụ trình quản lý tác vụ (Task Manager)": "Có",
      "Điều chỉnh mức âm lượng đầu ra (Volume) của thiết bị âm thanh": "Có",
      "Thu nhỏ nhanh tất cả các chương trình đang mở để hiển thị màn hình nền (Desktop)": "Có",
      "Hiển thị trạng thái kết nối mạng và thay đổi mạng Wi-Fi nhanh": "Có"
    },
    explanation: "Thanh tác vụ Windows (Taskbar) tích hợp sẵn khay hệ thống cho phép chỉnh nhanh âm lượng, Wi-Fi, nút Aero Peek (ở góc ngoài cùng bên phải) để ẩn nhanh các cửa sổ, và chuột phải vào Taskbar để mở nhanh Task Manager."
  },
  {
    id: 73,
    level: "IC3_LEVEL1",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần phân loại các phần mềm máy tính để quản trị tài nguyên hệ thống. Với mỗi phần mềm dưới đây, hãy xác định xem đó là Phần mềm Hệ thống (System Software) hay Phần mềm Ứng dụng (Application Software):",
    left: [
      "Trình phát đa phương tiện xem phim nghe nhạc (Media Player)",
      "Trình quản lý phân vùng định dạng ổ đĩa (Disk Partition Manager)",
      "Trình duyệt web lướt mạng Internet (Web Browser)",
      "Trình điều khiển card đồ họa màn hình (Graphics Card Driver)"
    ],
    right: ["Phần mềm Hệ thống (System Software)", "Phần mềm Ứng dụng (Application Software)"],
    answer: {
      "Trình phát đa phương tiện xem phim nghe nhạc (Media Player)": "Phần mềm Ứng dụng (Application Software)",
      "Trình quản lý phân vùng định dạng ổ đĩa (Disk Partition Manager)": "Phần mềm Hệ thống (System Software)",
      "Trình duyệt web lướt mạng Internet (Web Browser)": "Phần mềm Ứng dụng (Application Software)",
      "Trình điều khiển card đồ họa màn hình (Graphics Card Driver)": "Phần mềm Hệ thống (System Software)"
    },
    explanation: "Phần mềm hệ thống gồm Driver điều khiển phần cứng và các công cụ tiện ích tối ưu đĩa (Partition Manager). Phần mềm ứng dụng là các chương trình trực tiếp phục vụ nhu cầu làm việc, giải trí của con người như Trình duyệt web hay Trình phát nhạc."
  },
  {
    id: 74,
    level: "IC3_LEVEL1",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "easy",
    type: "matching",
    question: "Hãy ghép nối chính xác từng hệ điều hành phổ biến với tên công ty/tập đoàn công nghệ chịu trách nhiệm phát triển độc quyền hoặc dẫn dắt nền tảng đó:",
    left: ["Windows", "macOS", "iOS", "Android", "ChromeOS"],
    right: ["Microsoft", "Apple", "Google"],
    answer: {
      "Windows": "Microsoft",
      "macOS": "Apple",
      "iOS": "Apple",
      "Android": "Google",
      "ChromeOS": "Google"
    },
    explanation: "Windows thuộc Microsoft; macOS và iOS là hệ sinh thái đóng của Apple; Android và ChromeOS do Google phát triển và làm chủ quản."
  },
  {
    id: 75,
    level: "IC3_LEVEL1",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Tính năng nào trên hệ điều hành di động (như Android hoặc iOS) giúp tự động xoay màn hình hiển thị từ chế độ dọc (Portrait) sang chế độ ngang (Landscape) khi người dùng quay nghiêng thiết bị?",
    options: ["Cảm biến tiệm cận (Proximity Sensor)", "Con quay hồi chuyển / Cảm biến gia tốc (Gyroscope / Accelerometer)", "Định vị toàn cầu (GPS)", "Cảm biến ánh sáng (Ambient Light Sensor)"],
    answer: "Con quay hồi chuyển / Cảm biến gia tốc (Gyroscope / Accelerometer)",
    explanation: "Cảm biến gia tốc và con quay hồi chuyển có nhiệm vụ đo lường hướng và góc nghiêng vật lý của thiết bị so với trọng lực, từ đó ra lệnh cho hệ điều hành tự động xoay giao diện hiển thị cho phù hợp."
  },

  // ----- SECURITY (6 câu) -----
  {
    id: 76,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SECURITY",
    difficulty: "medium",
    type: "single",
    question: "Bạn hãy cho biết, lợi ích của việc duyệt web \"ở chế độ riêng tư\" hoặc \"ẩn danh\" là gì?",
    options: [
      "Không thể sử dụng vân tay kỹ thuật số để theo dõi các hoạt động trên trình duyệt của bạn",
      "Những người khác sẽ không biết được các hoạt động duyệt web của bạn dù sử dụng cùng một thiết bị",
      "Cookie sẽ không báo cáo thông tin về bạn cho bên thứ ba",
      "Trình duyệt web của bạn chặn quảng cáo"
    ],
    answer: "Những người khác sẽ không biết được các hoạt động duyệt web của bạn dù sử dụng cùng một thiết bị",
    explanation: "Mục đích cốt lõi của chế độ riêng tư là không để lại dấu vết dữ liệu (lịch sử, cookie) trên chính thiết bị đó, tránh việc người dùng chung thiết bị phát hiện."
  },
  {
    id: 77,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn cần tạo một mật khẩu mạnh. Đâu là ba nguyên tắc bạn cần tuân thủ? (Chọn 3)",
    options: [
      "Bao gồm các chữ cái, chữ số và ký hiệu",
      "Bao gồm các số dễ nhớ như ngày sinh và số điện thoại",
      "Bao gồm chữ viết hoa và chữ viết thường",
      "Sử dụng tám ký tự trở lên",
      "Bao gồm họ hoặc tên của bạn"
    ],
    answer: [
      "Bao gồm các chữ cái, chữ số và ký hiệu",
      "Bao gồm chữ viết hoa và chữ viết thường",
      "Sử dụng tám ký tự trở lên"
    ],
    explanation: "Mật khẩu mạnh cần tối thiểu 8 ký tự, kết hợp chữ hoa, chữ thường, số và các ký hiệu đặc biệt. Không nên chứa các thông tin cá nhân dễ đoán như họ tên, ngày sinh, số điện thoại."
  },
  {
    id: 78,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn cần đảm bảo an toàn cho mật khẩu của mình. Đâu là ba nguyên tắc bảo mật bạn cần tuân thủ? (Chọn 3)",
    options: [
      "Sử dụng mật khẩu khác nhau cho mỗi tài khoản",
      "Sử dụng mật khẩu phức tạp và ghi vào một cuốn sổ mà bạn luôn mang theo bên mình",
      "Sử dụng xác thực đa yếu tố (MFA / 2FA), nếu có",
      "Sử dụng mật khẩu dài nhất hoặc cụm mật khẩu được hệ thống mật khẩu cho phép",
      "Sử dụng các từ có thể tìm thấy trong từ điển của một ngôn ngữ khác với ngôn ngữ chính của bạn"
    ],
    answer: [
      "Sử dụng mật khẩu khác nhau cho mỗi tài khoản",
      "Sử dụng xác thực đa yếu tố (MFA / 2FA), nếu có",
      "Sử dụng mật khẩu dài nhất hoặc cụm mật khẩu được hệ thống mật khẩu cho phép"
    ],
    explanation: "Không nên ghi mật khẩu ra sổ mang theo người vì dễ thất lạc; cũng không nên dùng các từ có trong từ điển vì dễ bị tấn công dạng từ điển (Dictionary attack). Mật khẩu dài và xác thực đa yếu tố là các biện pháp an toàn cốt lõi."
  },
  {
    id: 79,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SECURITY",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần xác định thông tin nhận dạng cá nhân (PII - Personally Identifiable Information) mà bạn không nên để lộ công khai trên mạng. Với mỗi thông tin dưới đây, hãy chọn Có nếu đó là thông tin định danh cá nhân quan trọng, hoặc Không nếu không phải.",
    left: ["Ngày sinh", "Màu mắt", "Nơi sinh"],
    right: ["Có", "Không"],
    answer: { "Ngày sinh": "Có", "Màu mắt": "Không", "Nơi sinh": "Có" },
    explanation: "Ngày sinh và Nơi sinh là các thông tin định danh pháp lý rất quan trọng giúp cấu thành PII. Màu mắt là đặc điểm sinh học phổ biến, không dùng để xác minh danh tính cá nhân bảo mật trực tuyến."
  },
  {
    id: 80,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SECURITY",
    difficulty: "easy",
    type: "single",
    question: "Bạn hãy cho biết, duyệt web ở chế độ riêng tư (ẩn danh) đảm bảo điều gì sau đây?",
    options: [
      "Mật khẩu không bao giờ cần phải thay đổi",
      "Lịch sử duyệt web của người dùng không được lưu trữ lại trên thiết bị",
      "Thông tin tài khoản và mật khẩu luôn được tự động lưu lại bảo mật",
      "Giúp tăng thêm dung lượng lưu trữ khả dụng đáng kể trên đĩa cứng máy tính"
    ],
    answer: "Lịch sử duyệt web của người dùng không được lưu trữ lại trên thiết bị",
    explanation: "Duyệt web riêng tư đảm bảo các thông tin như lịch sử duyệt web, cookie và dữ liệu biểu mẫu không bị ghi lại cục bộ sau khi đóng cửa sổ."
  },
  {
    id: 81,
    level: "IC3_LEVEL1",
    test: 2,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Khi nào người dùng nên cân nhắc việc thay đổi mật khẩu của họ? (Chọn 3)",
    options: [
      "Họ đã được thông báo rằng có quyền truy cập trái phép vào tài khoản của họ",
      "Khi họ muốn đóng tài khoản của mình",
      "Phần mềm độc hại đang chạy trên máy tính của họ",
      "Họ đã cập nhật mật khẩu của họ gần đây",
      "Họ đã không thay đổi mật khẩu của họ trong một thời gian dài"
    ],
    answer: [
      "Họ đã được thông báo rằng có quyền truy cập trái phép vào tài khoản của họ",
      "Phần mềm độc hại đang chạy trên máy tính của họ",
      "Họ đã không thay đổi mật khẩu của họ trong một thời gian dài"
    ],
    explanation: "Thay đổi mật khẩu ngay lập tức khi phát hiện rò rỉ, thiết bị nhiễm mã độc, hoặc định kỳ sau một thời gian dài sử dụng để tăng cường bảo mật."
  },

  // ----- NETWORK (4 câu) -----
  {
    id: 82,
    level: "IC3_LEVEL1",
    test: 2,
    category: "NETWORK",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về những lợi ích của cơ sở hạ tầng mạng trường học chất lượng cao, hãy chọn Đúng hoặc Sai:",
    left: [
      "Đảm bảo rằng học sinh có thể truy cập và kết nối thông suốt với các tài nguyên học tập của nhà trường",
      "Cho phép học sinh kết nối và điều khiển phòng máy tính vật lý của nhà trường từ mọi nơi trên thế giới không giới hạn",
      "Hỗ trợ mở rộng quy mô hệ thống mạng của nhà trường dễ dàng mà không cần thiết kế lại từ đầu khi số lượng học sinh tăng lên"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Đảm bảo rằng học sinh có thể truy cập và kết nối thông suốt với các tài nguyên học tập của nhà trường": "Đúng",
      "Cho phép học sinh kết nối và điều khiển phòng máy tính vật lý của nhà trường từ mọi nơi trên thế giới không giới hạn": "Sai",
      "Hỗ trợ mở rộng quy mô hệ thống mạng của nhà trường dễ dàng mà không cần thiết kế lại từ đầu khi số lượng học sinh tăng lên": "Đúng"
    },
    explanation: "Hạ tầng mạng tốt giúp kết nối thông suốt và dễ dàng mở rộng (Scalability). Việc điều khiển phòng máy vật lý từ xa một cách tự do không giới hạn là sai vì liên quan đến bảo mật hệ thống nghiêm ngặt."
  },
  {
    id: 83,
    level: "IC3_LEVEL1",
    test: 2,
    category: "NETWORK",
    difficulty: "medium",
    type: "single",
    question: "Bạn đang gặp khó khăn khi gửi và nhận thông tin học tập trên máy tính. Cách nhanh nhất và trực quan nhất để bạn xác định xem thiết bị của mình có thực sự kết nối được với internet hay không là gì?",
    options: ["Tải xuống và cài đặt thêm một ứng dụng bên thứ ba như Speedtest", "Thử thực hiện lưu (Save) một tập tin văn bản cục bộ lên ổ đĩa cứng", "Mở trình duyệt web bất kỳ lên và thử truy cập vào một trang web phổ thông", "Thử mở ứng dụng soạn thảo để viết và gửi tin nhắn SMS nội bộ"],
    answer: "Mở trình duyệt web bất kỳ lên và thử truy cập vào một trang web phổ thông",
    explanation: "Cách kiểm tra mạng internet cơ bản, nhanh chóng và phổ biến nhất của mọi người dùng là mở trình duyệt web (Chrome, Edge...) và gõ một địa chỉ trang web bất kỳ xem dữ liệu có tải về được không."
  },
  {
    id: 84,
    level: "IC3_LEVEL1",
    test: 2,
    category: "NETWORK",
    difficulty: "medium",
    type: "matching",
    question: "Xác định sự khác biệt giữa Internet và mạng nội bộ (Intranet). Với mỗi câu phát biểu dưới đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Mạng nội bộ không giới hạn số lượng người dùng và bất kỳ ai bên ngoài cũng có thể tự do truy cập được",
      "Kết nối mạng nội bộ (Intranet) thường an toàn và bảo mật hơn so với kết nối Internet",
      "Internet thuộc quyền sở hữu độc quyền của một tổ hợp công ty liên doanh toàn cầu"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Mạng nội bộ không giới hạn số lượng người dùng và bất kỳ ai bên ngoài cũng có thể tự do truy cập được": "Sai",
      "Kết nối mạng nội bộ (Intranet) thường an toàn và bảo mật hơn so với kết nối Internet": "Đúng",
      "Internet thuộc quyền sở hữu độc quyền của một tổ hợp công ty liên doanh toàn cầu": "Sai"
    },
    explanation: "Mạng nội bộ giới hạn nghiêm ngặt quyền truy cập cho nhân sự nội bộ nên bảo mật hơn Internet công cộng. Không có một tổ chức đơn lẻ nào sở hữu toàn bộ Internet toàn cầu."
  },
  {
    id: 85,
    level: "IC3_LEVEL1",
    test: 2,
    category: "NETWORK",
    difficulty: "medium",
    type: "single",
    question: "Thiết bị nào chuyển đổi dữ liệu từ kỹ thuật số (Digital) sang tương tự (Analog) và ngược lại để truyền tín hiệu qua mạng?",
    options: ["Ethernet Cable", "Router", "Modem", "Network Adapter"],
    answer: "Modem",
    explanation: "Modem viết tắt từ Modulator/Demodulator, làm nhiệm vụ điều chế và giải điều chế tín hiệu, biến đổi tín hiệu số (digital) của máy tính thành tín hiệu tương tự (analog) truyền qua đường dây và ngược lại."
  },

  // ----- INFORMATION LITERACY (3 câu) -----
  {
    id: 86,
    level: "IC3_LEVEL1",
    test: 2,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn đang biên soạn một nghiên cứu và thu thập dữ liệu từ nhiều nguồn khác nhau. Đâu là hai lý do quan trọng nhất bạn nên đưa tài liệu gốc vào mục tài liệu tham khảo cuối bài? (Chọn 2)",
    options: [
      "Điều này thể hiện toàn bộ bài nghiên cứu là tác phẩm gốc tự nghĩ ra hoàn toàn của bạn",
      "Điều này giúp người đọc dễ dàng tra cứu và tìm thấy nguồn thông tin ban đầu",
      "Điều này thể hiện sự tôn trọng, đạo đức khoa học đối với các tác giả của nghiên cứu mà bạn đang tham khảo",
      "Điều này cung cấp khoản thanh toán hoặc hỗ trợ tài chính tự động cho những tác giả thực hiện nghiên cứu đó"
    ],
    answer: [
      "Điều này giúp người đọc dễ dàng tra cứu và tìm thấy nguồn thông tin ban đầu",
      "Điều này thể hiện sự tôn trọng, đạo đức khoa học đối với các tác giả của nghiên cứu mà bạn đang tham khảo"
    ],
    explanation: "Trích dẫn tài liệu tham khảo nhằm mục đích minh bạch nguồn thông tin giúp người đọc đối chứng, đồng thời thể hiện sự tôn trọng bản quyền và sở hữu trí tuệ."
  },
  {
    id: 87,
    level: "IC3_LEVEL1",
    test: 2,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "matching",
    question: "Bạn đang biên soạn một nghiên cứu và cần thêm tài liệu tham khảo cho bài viết của mình. Với mỗi trường hợp dưới đây, hãy chọn Có nếu bạn phải thêm nguồn trích dẫn tham khảo hoặc Không nếu không cần thiết:",
    left: [
      "Bạn sử dụng ý tưởng cốt lõi từ một bài báo của tác giả khác",
      "Bạn diễn đạt lại (Paraphrase) nội dung từ một bài viết trên tạp chí khoa học",
      "Nội dung bạn viết hoàn toàn mới mẻ, mang tính phát kiến và riêng biệt của cá nhân bạn",
      "Bạn sao chép nguyên văn một đoạn văn ngắn từ một trang web công cộng"
    ],
    right: ["Có", "Không"],
    answer: {
      "Bạn sử dụng ý tưởng cốt lõi từ một bài báo của tác giả khác": "Có",
      "Bạn diễn đạt lại (Paraphrase) nội dung từ một bài viết trên tạp chí khoa học": "Có",
      "Nội dung bạn viết hoàn toàn mới mẻ, mang tính phát kiến và riêng biệt của cá nhân bạn": "Không",
      "Bạn sao chép nguyên văn một đoạn văn ngắn từ một trang web công cộng": "Có"
    },
    explanation: "Khi mượn ý tưởng, sao chép nguyên văn hay diễn đạt lại (paraphrase) lời văn của người khác, ta bắt buộc phải thêm nguồn tham khảo. Nếu là nội dung do chính ta tự nghĩ ra hoàn toàn mới thì không cần trích dẫn."
  },
  {
    id: 88,
    level: "IC3_LEVEL1",
    test: 2,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "multiple",
    question: "Khi tiếp cận các tài liệu trực tuyến, người dùng có thể thực hiện những hành động nào dưới đây để xác định và đánh giá tính hợp lệ, độ tin cậy của thông tin? (Chọn 3)",
    options: [
      "Xác định rõ ràng thông tin về tác giả và thẩm quyền/chuyên môn của họ đối với chủ đề đang viết",
      "Kiểm tra xem tác giả đó trong quá khứ có từng viết những cuốn sách tiểu thuyết nổi tiếng hay không",
      "Bỏ qua hoặc làm mất uy tín của tác giả nếu những người bạn của mình không thích tác giả đó",
      "Xác minh nguồn gốc, xuất xứ rõ ràng của thông tin (thông tin đến từ tổ chức hay nền tảng nào)",
      "Kiểm tra xem thông tin đã được cập nhật mới nhất hay là thông tin lỗi thời từ lâu"
    ],
    answer: [
      "Xác định rõ ràng thông tin về tác giả và thẩm quyền/chuyên môn của họ đối với chủ đề đang viết",
      "Xác minh nguồn gốc, xuất xứ rõ ràng của thông tin (thông tin đến từ tổ chức hay nền tảng nào)",
      "Kiểm tra xem thông tin đã được cập nhật mới nhất hay là thông tin lỗi thời từ lâu"
    ],
    explanation: "Đánh giá độ tin cậy của một nguồn thông tin trên mạng dựa trên 3 trụ cột chính: Uy tín chuyên môn của tác giả, Nguồn gốc xuất xứ dữ liệu, và Tính cập nhật (Thời gian xuất bản/chỉnh sửa mới nhất)."
  },

  // ----- COLLABORATION (2 câu) -----
  {
    id: 89,
    level: "IC3_LEVEL1",
    test: 2,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "single",
    question: "Tính năng nào của dịch vụ lưu trữ đám mây cho phép nhiều người dùng ở các vị trí địa lý khác nhau có thể cùng chỉnh sửa nội dung trên một tài liệu văn bản tại một thời điểm?",
    options: ["Đồng bộ hóa nền (Background Sync)", "Cộng tác thời gian thực (Real-time Collaboration)", "Tải lên tệp tự động (Auto Upload)", "Chia sẻ liên kết tĩnh (Static Link Sharing)"],
    answer: "Cộng tác thời gian thực (Real-time Collaboration)",
    explanation: "Cộng tác thời gian thực (như trên Google Docs, Microsoft 365) cho phép mọi thay đổi của từng người dùng hiển thị ngay lập tức lên màn hình của các thành viên khác, giúp làm việc nhóm từ xa hiệu quả."
  },
  {
    id: 90,
    level: "IC3_LEVEL1",
    test: 2,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "single",
    question: "Khi tổ chức một cuộc họp trực tuyến toàn cầu với các thành viên ở nhiều quốc gia khác nhau, yếu tố nào dưới đây là rào cản hậu cần quan trọng nhất cần được tính toán khi lên lịch?",
    options: ["Màu sắc giao diện phần mềm họp", "Sự khác biệt về múi giờ (Time zones)", "Độ phân giải màn hình máy tính của giáo viên", "Dung lượng bộ nhớ RAM của người chủ trì"],
    answer: "Sự khác biệt về múi giờ (Time zones)",
    explanation: "Sự chênh lệch múi giờ (Time zones) là thách thức hậu cần lớn nhất khi làm việc từ xa quốc tế, đòi hỏi người chủ trì chọn khung giờ phù hợp để không rơi vào ban đêm hoặc giờ nghỉ ngơi của các quốc gia thành viên khác."
  },

  // ============================================================
  // TEST 3 (45 câu)
  // ============================================================

  // ----- HARDWARE (8 câu) -----
  {
    id: 91,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần khắc phục các sự cố trên máy tính và điện thoại. Hãy ghép mỗi vấn đề với cách khắc phục phù hợp.",
    left: [
      "Màn hình máy tính bị đóng băng khi đang làm việc với tập tin dự án.",
      "Màn trập máy ảnh trên điện thoại phát ra âm thanh nhưng bạn không đang chụp ảnh.",
      "Khi khởi động máy tính, bạn nghe tiếng tích tắc nhịp nhàng bên trong thùng máy.",
      "Các trang Web hiển thị nội dung chậm khi bạn đang tìm kiếm thông tin trên Internet."
    ],
    right: [
      "Kiểm tra mức sử dụng tài nguyên trên Task Manager.",
      "Kiểm tra các quyền ứng dụng.",
      "Kiểm tra hiện tượng mòn đầu đọc/ghi trên ổ đĩa cứng.",
      "Kiểm tra kết nối mạng."
    ],
    answer: {
      "Màn hình máy tính bị đóng băng khi đang làm việc với tập tin dự án.": "Kiểm tra mức sử dụng tài nguyên trên Task Manager.",
      "Màn trập máy ảnh trên điện thoại phát ra âm thanh nhưng bạn không đang chụp ảnh.": "Kiểm tra các quyền ứng dụng.",
      "Khi khởi động máy tính, bạn nghe tiếng tích tắc nhịp nhàng bên trong thùng máy.": "Kiểm tra hiện tượng mòn đầu đọc/ghi trên ổ đĩa cứng.",
      "Các trang Web hiển thị nội dung chậm khi bạn đang tìm kiếm thông tin trên Internet.": "Kiểm tra kết nối mạng."
    },
    explanation: "Màn hình đóng băng → CPU/RAM quá tải → Task Manager. Âm thanh máy ảnh bất thường → ứng dụng đang dùng camera ngầm → kiểm tra quyền. Tiếng tích tắc → ổ cứng có thể hỏng. Web chậm → lỗi mạng."
  },
  {
    id: 92,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Người dùng nhấn nút nguồn nhưng máy tính không khởi động. Người dùng có thể thực hiện hành động nào để khắc phục sự cố? (Chọn 3)",
    options: [
      "Đảm bảo đã cắm dây nguồn",
      "Chuyển sang một máy tính mới",
      "Đảm bảo ổ cắm đang hoạt động",
      "Xem cầu dao có bị nổ không",
      "Chờ 24 giờ trước khi thử bật lại máy tính"
    ],
    answer: ["Đảm bảo đã cắm dây nguồn", "Đảm bảo ổ cắm đang hoạt động", "Xem cầu dao có bị nổ không"],
    explanation: "Trình tự kiểm tra nguồn điện cơ bản: (1) dây nguồn đã cắm chưa, (2) ổ cắm có điện không, (3) cầu dao có bị nhảy không. Đây là các bước troubleshooting đầu tiên trước khi kết luận máy hỏng."
  },
  {
    id: 93,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "medium",
    type: "single",
    question: "Ngày nay, các thiết bị có thể trở nên lỗi thời rất nhanh. Người dùng nên làm gì với thiết bị mà họ muốn loại bỏ?",
    options: ["Lưu trữ cho các thế hệ tương lai", "Tái chế", "Ném đi", "Sử dụng cho một dự án nghệ thuật"],
    answer: "Tái chế",
    explanation: "Tái chế thiết bị điện tử đúng cách ngăn kim loại nặng (chì, thủy ngân…) ô nhiễm môi trường và cho phép thu hồi vật liệu có giá trị như vàng, đồng, bạc."
  },
  {
    id: 94,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question: "Trình duyệt bạn dùng là Chrome. Bạn muốn thêm tiện ích mở rộng để tự động hiển thị trang Web tiếng Tây Ban Nha bằng tiếng Anh. Tiện ích nào phù hợp?",
    options: ["Dark Reader", "Google Translate", "Read-a-Loud", "Screencastify"],
    answer: "Google Translate",
    explanation: "Google Translate Extension trên Chrome tự động phát hiện và dịch trang Web sang ngôn ngữ bạn chọn, bao gồm dịch tiếng Tây Ban Nha sang tiếng Anh."
  },
  {
    id: 95,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question: "Chương trình nào có thể được dùng để đóng một ứng dụng đang bị đóng băng?",
    options: ["Task Manager", "Windows Update", "Settings", "Finder"],
    answer: "Task Manager",
    explanation: "Task Manager (Ctrl+Shift+Esc trên Windows) cho phép xem và kết thúc (End Task) bất kỳ ứng dụng đang không phản hồi nào."
  },
  {
    id: 96,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question: "Biểu tượng nào mà một số trình duyệt Web hiển thị ở bên trái thanh địa chỉ để cho biết trang Web an toàn?",
    options: ["Bell", "Lightbulb", "Lock", "Key"],
    answer: "Lock",
    explanation: "Biểu tượng ổ khóa (Lock) xuất hiện khi trang Web dùng HTTPS — kết nối được mã hóa SSL/TLS, bảo vệ dữ liệu giữa trình duyệt và máy chủ."
  },
  {
    id: 97,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question: "Người dùng có thể tin tưởng vào tiêu đề URL nào khi nhập thông tin thẻ tín dụng?",
    options: [".com", "https://", "www.", "http://"],
    answer: "https://",
    explanation: "HTTPS (HyperText Transfer Protocol Secure) mã hóa dữ liệu truyền tải, bảo vệ thông tin nhạy cảm như số thẻ tín dụng khỏi bị đánh cắp."
  },
  {
    id: 98,
    level: "IC3_LEVEL1",
    test: 3,
    category: "HARDWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Loại tập tin WAV thường được dùng cho những loại phương tiện nào? (Chọn 3)",
    options: ["DVDs", "Social Media Posts", "Web Videos", "CDs", "TV", "Web Pages"],
    answer: ["DVDs", "CDs", "TV"],
    explanation: "WAV là định dạng audio không nén chất lượng cao, thường dùng trong sản xuất chuyên nghiệp cho DVD, CD và phát sóng truyền hình — không phù hợp với web do kích thước file lớn."
  },

  // ----- SOFTWARE (7 câu) -----
  {
    id: 99,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "single",
    question: "Loại phần mềm nào không cho phép chia sẻ hoặc sửa đổi mã nguồn?",
    options: ["Closed Source", "Shareware", "Public Domain", "Freeware"],
    answer: "Closed Source",
    explanation: "Phần mềm Closed Source (mã nguồn đóng) không công khai mã nguồn; người dùng không được phép xem, chỉnh sửa hay phân phối lại mã."
  },
  {
    id: 100,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "single",
    question: "Loại phần mềm nào sau đây không được cấp phép, không được bảo vệ bản quyền?",
    options: ["Phần mềm miễn phí (Freeware)", "Miền công cộng (Public Domain)", "Copyleft", "Cho phép (Permissive)"],
    answer: "Miền công cộng (Public Domain)",
    explanation: "Phần mềm Public Domain không có bản quyền, không cần cấp phép — bất kỳ ai cũng có thể dùng, sửa đổi hay phân phối tự do."
  },
  {
    id: 101,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Loại giấy phép kĩ thuật số nào thường cho phép sử dụng miễn phí? (Chọn 2)",
    options: ["Creative Commons", "Per-seat", "Per-user", "Public Domain", "Site"],
    answer: ["Creative Commons", "Public Domain"],
    explanation: "Creative Commons và Public Domain đều cho phép sử dụng tác phẩm miễn phí, mặc dù Creative Commons có thể đi kèm một số điều kiện nhất định."
  },
  {
    id: 102,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "multiple",
    question: "Tùy chọn nào sau đây là lí do cho việc tạo phiên bản (Version) phần mềm? (Chọn 2)",
    options: [
      "Cho phép khách hàng nhận ra các phiên bản cập nhật.",
      "Cho phép các thiết bị máy tính sử dụng ít bộ nhớ hơn.",
      "Cho phép các nhà bán lẻ tính thêm tiền.",
      "Cho phép các nhà xuất bản phần mềm theo dõi doanh số bán hàng.",
      "Cho phép lập trình viên theo dõi các thay đổi."
    ],
    answer: ["Cho phép khách hàng nhận ra các phiên bản cập nhật.", "Cho phép lập trình viên theo dõi các thay đổi."],
    explanation: "Đánh số phiên bản giúp người dùng nhận biết bản mới nhất và giúp nhóm phát triển quản lý lịch sử thay đổi của mã nguồn."
  },
  {
    id: 103,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SOFTWARE",
    difficulty: "easy",
    type: "single",
    question: "Tùy chọn nào sau đây được chỉ định cho mỗi phiên bản (Version) phần mềm?",
    options: ["Mã hóa khác biệt", "Hướng dẫn chuyên đề", "Cài đặt không thể thay đổi", "Tên phiên bản duy nhất"],
    answer: "Tên phiên bản duy nhất",
    explanation: "Mỗi phiên bản phần mềm được gán một tên/số phiên bản duy nhất (ví dụ: Windows 11, Chrome 124) để phân biệt với các bản trước và sau."
  },
  {
    id: 104,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "single",
    question: "Phần mềm phiên bản nào cho phép người dùng truy cập một ứng dụng qua Internet?",
    options: ["Online", "Wi-Fi", "Local", "Diagnostic"],
    answer: "Online",
    explanation: "Phần mềm Online (hay SaaS – Software as a Service) cho phép người dùng truy cập và sử dụng ứng dụng trực tiếp qua trình duyệt Internet mà không cần cài đặt."
  },
  {
    id: 105,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SOFTWARE",
    difficulty: "medium",
    type: "single",
    question: "Bạn mua một chương trình phần mềm để thực hiện dự án. Sau khi hoàn thành, một người bạn muốn mượn phần mềm. Bạn không biết việc cho mượn có được phép không. Nơi nào phù hợp nhất để tìm thông tin này?",
    options: ["Bảng đánh giá phần mềm điện tử (ESRB)", "Danh sách kiểm soát truy nhập (ACL)", "Hệ thống quản lí nội dung (CMS)", "Thỏa thuận giấy phép người dùng cuối (EULA)"],
    answer: "Thỏa thuận giấy phép người dùng cuối (EULA)",
    explanation: "EULA (End User License Agreement) là tài liệu pháp lý quy định rõ quyền và giới hạn sử dụng phần mềm, bao gồm việc có được phép chia sẻ hay chuyển nhượng không."
  },

  // ----- DIGITAL CITIZENSHIP (6 câu) -----
  {
    id: 106,
    level: "IC3_LEVEL1",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "matching",
    question: "Dấu chân kỹ thuật số (Digital footprint) là tập hợp các dữ liệu để lại từ hoạt động trực tuyến của bạn. Với mỗi phát biểu sau đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Các công ty mà bạn chia sẻ dữ liệu cá nhân (để đổi lấy quyền dùng ứng dụng miễn phí) tuyệt đối không được phép cung cấp dữ liệu đó cho bên thứ ba",
      "Nếu sử dụng bộ lọc mạng hoặc đăng tải ẩn danh, hệ thống sẽ hoàn toàn không thể truy vết được các nhận xét trực tuyến của bạn",
      "Thực hiện cập nhật trình duyệt web định kỳ 6 tháng một lần sẽ giúp xóa sạch toàn bộ dấu chân kỹ thuật số của bạn trên Internet",
      "Các nhà tuyển dụng hoặc trường đại học có quyền tìm kiếm và xem xét các hình ảnh, thông điệp cũ do ứng viên đăng tải trên mạng xã hội từ khi họ dưới 18 tuổi"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Các công ty mà bạn chia sẻ dữ liệu cá nhân (để đổi lấy quyền dùng ứng dụng miễn phí) tuyệt đối không được phép cung cấp dữ liệu đó cho bên thứ ba": "Sai",
      "Nếu sử dụng bộ lọc mạng hoặc đăng tải ẩn danh, hệ thống sẽ hoàn toàn không thể truy vết được các nhận xét trực tuyến của bạn": "Sai",
      "Thực hiện cập nhật trình duyệt web định kỳ 6 tháng một lần sẽ giúp xóa sạch toàn bộ dấu chân kỹ thuật số của bạn trên Internet": "Sai",
      "Các nhà tuyển dụng hoặc trường đại học có quyền tìm kiếm và xem xét các hình ảnh, thông điệp cũ do ứng viên đăng tải trên mạng xã hội từ khi họ dưới 18 tuổi": "Đúng"
    },
    explanation: "Nhiều công ty có điều khoản bán hoặc chia sẻ dữ liệu cho bên thứ ba trong chính sách bảo mật. Đăng tải ẩn danh vẫn có thể bị truy vết qua địa chỉ IP hoặc logs của nhà mạng. Cập nhật trình duyệt không xóa được dữ liệu đã lưu trên máy chủ web. Nhà tuyển dụng hoàn toàn có thể tra cứu lịch sử trực tuyến (dấu chân kỹ thuật số) để đánh giá tư cách ứng viên."
  },
  {
    id: 107,
    level: "IC3_LEVEL1",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi câu phát biểu về các hình ảnh được bảo vệ bởi giấy phép tài sản sáng tạo công cộng (Creative Commons - CC) và không thuộc phạm vi công cộng, hãy chọn Đúng hoặc Sai:",
    left: [
      "Khi sử dụng hình ảnh này, bạn bắt buộc phải thực hiện trích dẫn nguồn và tác giả của hình ảnh đó",
      "Bạn được phép tải và sử dụng các hình ảnh này mà không phải trả phí mua bản quyền thương mại",
      "Bạn được phép sử dụng hình ảnh này vô điều kiện cho mọi mục đích mà không cần quan tâm đến các ký hiệu đi kèm (như NC, ND...)"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Khi sử dụng hình ảnh này, bạn bắt buộc phải thực hiện trích dẫn nguồn và tác giả của hình ảnh đó": "Đúng",
      "Bạn được phép tải và sử dụng các hình ảnh này mà không phải trả phí mua bản quyền thương mại": "Đúng",
      "Bạn được phép sử dụng hình ảnh này vô điều kiện cho mọi mục đích mà không cần quan tâm đến các ký hiệu đi kèm (như NC, ND...)": "Sai"
    },
    explanation: "Giấy phép Creative Commons cho phép sử dụng miễn phí nhưng có điều kiện kèm theo (bắt buộc trích dẫn nguồn - thuộc tính BY, tuân thủ điều kiện phi thương mại - NC, hoặc không phái sinh - ND chứ không phải là sử dụng vô điều kiện)."
  },
  {
    id: 108,
    level: "IC3_LEVEL1",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "multiple",
    question: "Nội dung nào dưới đây là đúng khi nói về các tài nguyên thuộc Phạm vi công cộng / Miễn công cộng (Public Domain)? (Chọn 3)",
    options: [
      "Tác phẩm tự động trở thành phạm vi công cộng khoảng từ 50 đến 100 năm sau khi tác giả ban đầu qua đời (tùy theo luật quốc gia)",
      "Các tác phẩm này vẫn tiếp tục được bảo vệ nghiêm ngặt bởi luật sở hữu trí tuệ thương mại độc quyền",
      "Tài nguyên thuộc phạm vi công cộng hoàn toàn miễn phí để sao chép, sử dụng và chia sẻ rộng rãi",
      "Nó thuộc sở hữu chung của toàn công chúng chứ không thuộc về bất kỳ cá nhân hay công ty riêng biệt nào",
      "Bất kỳ ai cũng có thể bỏ tiền mua để sở hữu độc quyền tác phẩm đó sau thời hạn 50 năm"
    ],
    answer: [
      "Tác phẩm tự động trở thành phạm vi công cộng khoảng từ 50 đến 100 năm sau khi tác giả ban đầu qua đời (tùy theo luật quốc gia)",
      "Tài nguyên thuộc phạm vi công cộng hoàn toàn miễn phí để sao chép, sử dụng và chia sẻ rộng rãi",
      "Nó thuộc sở hữu chung của toàn công chúng chứ không thuộc về bất kỳ cá nhân hay công ty riêng biệt nào"
    ],
    explanation: "Tác phẩm thuộc Phạm vi công cộng (Public Domain) thuộc sở hữu của toàn xã hội, bất kỳ ai cũng có thể dùng miễn phí mà không lo ngại bản quyền. Tác phẩm sẽ rơi vào phạm vi này sau khi thời hạn bảo hộ bản quyền kết thúc (thường tính từ 50-100 năm sau năm tác giả mất)."
  },
  {
    id: 109,
    level: "IC3_LEVEL1",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Bạn đang tìm kiếm thông tin trực tuyến về chủ đề 'Cách tự trồng và chăm sóc rau sạch tại nhà'. Hệ thống trả về nhiều kết quả, bạn cần đánh giá mức độ liên quan và đáng tin cậy của chúng. Với mỗi nguồn, hãy chọn Có nếu có liên quan trực tiếp hoặc Không nếu không phù hợp:",
    left: [
      "Một bài viết giật gân trên tạp chí lá cải giải trí nói về khu vườn của những người nổi tiếng",
      "Một bài hướng dẫn chi tiết, có cơ sở khoa học do một trường đại học nông nghiệp danh tiếng xuất bản",
      "Một trang web thương mại chạy quảng cáo được tài trợ của cửa hàng đồ gia dụng để bán hạt giống"
    ],
    right: ["Có", "Không"],
    answer: {
      "Một bài viết giật gân trên tạp chí lá cải giải trí nói về khu vườn của những người nổi tiếng": "Không",
      "Một bài hướng dẫn chi tiết, có cơ sở khoa học do một trường đại học nông nghiệp danh tiếng xuất bản": "Có",
      "Một trang web thương mại chạy quảng cáo được tài trợ của cửa hàng đồ gia dụng để bán hạt giống": "Không"
    },
    explanation: "Bài viết từ trường đại học mang tính giáo dục, có chuyên môn sâu sắc về cách trồng rau (Có liên quan học thuật). Tạp chí lá cải chỉ mang tính giải trí, còn trang web bán hạt giống tập trung vào quảng cáo thương mại hơn là cung cấp kiến thức kỹ thuật khách quan."
  },
  {
    id: 110,
    level: "IC3_LEVEL1",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "multiple",
    question: "Đâu là ba khía cạnh quan trọng cấu thành nên nghi thức giao tiếp văn minh, lịch sự bằng văn bản (Netiquette) trong môi trường trực tuyến? (Chọn 3)",
    options: [
      "Kiểm tra và đảm bảo viết đúng chính tả (Spelling)",
      "Sử dụng đúng cấu trúc ngữ pháp (Grammar) để tránh hiểu lầm",
      "Sử dụng thật nhiều từ viết tắt tiếng lóng (Abbreviations)",
      "Thể hiện thái độ tôn trọng (Respect) đối với người tiếp nhận thông tin",
      "Liên tục thúc giục tiến độ phản hồi tin nhắn một cách nghiêm khắc (Timelines)"
    ],
    answer: [
      "Kiểm tra và đảm bảo viết đúng chính tả (Spelling)",
      "Sử dụng đúng cấu trúc ngữ pháp (Grammar) để tránh hiểu lầm",
      "Thể hiện thái độ tôn trọng (Respect) đối với người tiếp nhận thông tin"
    ],
    explanation: "Nghi thức giao tiếp trực tuyến lịch sự qua văn bản yêu cầu tính chỉn chu, chuyên nghiệp bao gồm: Viết đúng chính tả, câu từ chuẩn ngữ pháp và luôn giữ thái độ tôn trọng đối phương. Lạm dụng tiếng lóng viết tắt hoặc thúc giục thái quá đều là hành vi bất lịch sự."
  },
  {
    id: 111,
    level: "IC3_LEVEL1",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Bạn muốn bảo vệ an toàn cho thông tin cá nhân và dữ liệu riêng tư kỹ thuật số của mình khi duyệt web. Với mỗi công cụ, hãy xác định xem nó Có giúp ích cho việc bảo vệ quyền riêng tư hay Không:",
    left: [
      "Bật tính năng chặn cửa sổ bật lên (Pop-up blocker) trên trình duyệt",
      "Sử dụng mạng ảo mật cá nhân VPN (Virtual Private Network) khi kết nối Wi-Fi công cộng",
      "Bật tính năng tự động điền (Auto-fill) thông tin thẻ tín dụng và mật khẩu đăng nhập",
      "Cấu hình xóa lịch sử duyệt web và Cookie tự động sau khi đóng cửa sổ trình duyệt"
    ],
    right: ["Có", "Không"],
    answer: {
      "Bật tính năng chặn cửa sổ bật lên (Pop-up blocker) trên trình duyệt": "Có",
      "Sử dụng mạng ảo mật cá nhân VPN (Virtual Private Network) khi kết nối Wi-Fi công cộng": "Có",
      "Bật tính năng tự động điền (Auto-fill) thông tin thẻ tín dụng và mật khẩu đăng nhập": "Không",
      "Cấu hình xóa lịch sử duyệt web và Cookie tự động sau khi đóng cửa sổ trình duyệt": "Có"
    },
    explanation: "VPN giúp mã hóa đường truyền, Pop-up blocker chặn mã độc thu thập dữ liệu, tự động xóa Cookie giúp tránh bị theo dõi dấu chân số. Trong khi đó, tính năng Auto-fill lưu sẵn mật khẩu/thẻ tín dụng trên máy sẽ làm tăng rủi ro lộ thông tin nếu thiết bị rơi vào tay người khác."
  },

  // ----- OPERATING SYSTEM (6 câu) -----
  {
    id: 112,
    level: "IC3_LEVEL1",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "multiple",
    question: "Tại sao người dùng cần biết hệ điều hành và phiên bản đang dùng? (Chọn 2)",
    options: [
      "Các bản cập nhật phiên bản khả dụng",
      "Các tác vụ khác nhau giữa các hệ điều hành",
      "Phần mềm có giá đắt",
      "Nhiều ứng dụng miễn phí"
    ],
    answer: ["Các bản cập nhật phiên bản khả dụng", "Các tác vụ khác nhau giữa các hệ điều hành"],
    explanation: "Biết phiên bản hệ điều hành giúp người dùng cài đúng bản cập nhật bảo mật và hiểu rằng các thao tác có thể khác nhau giữa Windows, macOS, Linux..."
  },
  {
    id: 113,
    level: "IC3_LEVEL1",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "image-select",
    question: "Bạn cần tìm phiên bản Windows máy tính đang chạy. Bạn nên thực hiện hành động này ở khu vực nào của cửa sổ Cài đặt (Settings)?",
    options: [
      { label: "Hệ thống (System)", img: "ic3_lv1_q113_opt_a" },
      { label: "Thiết bị (Devices)", img: "ic3_lv1_q113_opt_b" },
      { label: "Điện thoại (Phone)", img: "ic3_lv1_q113_opt_c" },
      { label: "Ứng dụng (Apps)", img: "ic3_lv1_q113_opt_d" }
    ],
    answer: 0,
    explanation: "Biểu tượng 'Hệ thống (System)' trong Settings chứa mục 'About' hiển thị phiên bản Windows, tên thiết bị và thông số phần cứng cơ bản."
  },
  {
    id: 114,
    level: "IC3_LEVEL1",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "image-select",
    question: "Trong hình ảnh System Information sau đây, thông tin nào dùng để xác định số kiểu máy (Model Number) của PC?",
    options: [
      { label: "10.0.18363 Build 18363", img: "ic3_lv1_q114_opt_a" },
      { label: "x64-based PC", img: "ic3_lv1_q114_opt_b" },
      { label: "81Y6", img: "ic3_lv1_q114_opt_c" },
      { label: "UEFI", img: "ic3_lv1_q114_opt_d" }
    ],
    answer: 2,
    explanation: "Trong cửa sổ System Information, mục 'System Model' hiển thị Model Number do nhà sản xuất quy định. Trong hình, giá trị đó là '81Y6'."
  },
  {
    id: 115,
    level: "IC3_LEVEL1",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "easy",
    type: "single",
    question: "Hãy chọn từ thích hợp: 'Số kiểu máy tính (Computer Model Number) là một số được cá nhân hóa do nhà sản xuất ___ của nó cấp cho một máy tính.'",
    options: ["Model", "OS", "Software", "Hardware"],
    answer: "Hardware",
    explanation: "Model Number được nhà sản xuất phần cứng (Hardware manufacturer) ấn định cho từng dòng máy cụ thể, không phải do phần mềm hay hệ điều hành tạo ra."
  },
  {
    id: 116,
    level: "IC3_LEVEL1",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "easy",
    type: "single",
    question: "Bạn đang sử dụng chương trình mới lần đầu tiên và cần lưu công việc. Dựa trên chuẩn phần mềm phổ biến, bạn nên tìm tính năng Save ở menu nào?",
    options: ["View", "Help", "File", "Share", "Edit"],
    answer: "File",
    explanation: "Theo chuẩn giao diện phần mềm (Windows/macOS), lệnh Save và Save As luôn nằm trong menu File — đây là quy ước chung cho hầu hết mọi ứng dụng."
  },
  {
    id: 117,
    level: "IC3_LEVEL1",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Bạn tuỳ chỉnh Google Chrome và muốn đưa Chrome về trạng thái mặc định bằng một lệnh trong menu Settings. Bạn nên chọn lệnh nào?",
    options: ["On startup (khi khởi động)", "You and Google (bạn và Google)", "Appearance (hình thức hiển thị)", "Reset and clean up (đặt lại và dọn dẹp)"],
    answer: "Reset and clean up (đặt lại và dọn dẹp)",
    explanation: "Tùy chọn 'Reset and clean up' trong Settings của Chrome cho phép đặt lại toàn bộ cài đặt về mặc định ban đầu chỉ với vài bước."
  },

  // ----- SECURITY (4 câu) -----
  {
    id: 118,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Khi nào người dùng nên cân nhắc việc thay đổi mật khẩu của họ? (Chọn 3)",
    options: [
      "Họ đã được thông báo rằng có quyền truy cập trái phép vào tài khoản của họ",
      "Khi họ muốn đóng tài khoản của mình",
      "Phần mềm độc hại đang chạy trên máy tính của họ",
      "Họ đã cập nhật mật khẩu của họ gần đây",
      "Họ đã không thay đổi mật khẩu của họ trong một thời gian dài"
    ],
    answer: [
      "Họ đã được thông báo rằng có quyền truy cập trái phép vào tài khoản của họ",
      "Phần mềm độc hại đang chạy trên máy tính của họ",
      "Họ đã không thay đổi mật khẩu của họ trong một thời gian dài"
    ],
    explanation: "Thay đổi mật khẩu ngay lập tức khi phát hiện rò rỉ, thiết bị nhiễm mã độc, hoặc định kỳ sau một thời gian dài sử dụng để tăng cường bảo mật."
  },
  {
    id: 119,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn cần tạo một mật khẩu mạnh. Đâu là ba nguyên tắc bạn cần tuân thủ? (Chọn 3)",
    options: [
      "Bao gồm các chữ cái, chữ số và ký hiệu",
      "Bao gồm các số dễ nhớ như ngày sinh và số điện thoại",
      "Bao gồm chữ viết hoa và chữ viết thường",
      "Sử dụng tám ký tự trở lên",
      "Bao gồm họ hoặc tên của bạn"
    ],
    answer: [
      "Bao gồm các chữ cái, chữ số và ký hiệu",
      "Bao gồm chữ viết hoa và chữ viết thường",
      "Sử dụng tám ký tự trở lên"
    ],
    explanation: "Mật khẩu mạnh cần tối thiểu 8 ký tự, kết hợp chữ hoa, chữ thường, số và các ký hiệu đặc biệt. Không nên chứa các thông tin cá nhân dễ đoán như họ tên, ngày sinh, số điện thoại."
  },
  {
    id: 120,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn cần đảm bảo an toàn cho mật khẩu của mình. Đâu là ba nguyên tắc bảo mật bạn cần tuân thủ? (Chọn 3)",
    options: [
      "Sử dụng mật khẩu khác nhau cho mỗi tài khoản",
      "Sử dụng mật khẩu phức tạp và ghi vào một cuốn sổ mà bạn luôn mang theo bên mình",
      "Sử dụng xác thực đa yếu tố (MFA / 2FA), nếu có",
      "Sử dụng mật khẩu dài nhất hoặc cụm mật khẩu được hệ thống mật khẩu cho phép",
      "Sử dụng các từ có thể tìm thấy trong từ điển của một ngôn ngữ khác với ngôn ngữ chính của bạn"
    ],
    answer: [
      "Sử dụng mật khẩu khác nhau cho mỗi tài khoản",
      "Sử dụng xác thực đa yếu tố (MFA / 2FA), nếu có",
      "Sử dụng mật khẩu dài nhất hoặc cụm mật khẩu được hệ thống mật khẩu cho phép"
    ],
    explanation: "Không nên ghi mật khẩu ra sổ mang theo người vì dễ thất lạc; cũng không nên dùng các từ có trong từ điển vì dễ bị tấn công dạng từ điển (Dictionary attack). Mật khẩu dài và xác thực đa yếu tố là các biện pháp an toàn cốt lõi."
  },
  {
    id: 121,
    level: "IC3_LEVEL1",
    test: 3,
    category: "SECURITY",
    difficulty: "medium",
    type: "matching",
    question: "Bạn cần xác định thông tin nhận dạng cá nhân (PII - Personally Identifiable Information) mà bạn không nên để lộ công khai trên mạng. Với mỗi thông tin dưới đây, hãy chọn Có nếu đó là thông tin định danh cá nhân quan trọng, hoặc Không nếu không phải.",
    left: ["Ngày sinh", "Màu mắt", "Nơi sinh"],
    right: ["Có", "Không"],
    answer: { "Ngày sinh": "Có", "Màu mắt": "Không", "Nơi sinh": "Có" },
    explanation: "Ngày sinh và Nơi sinh là các thông tin định danh pháp lý rất quan trọng giúp cấu thành PII. Màu mắt là đặc điểm sinh học phổ biến, không dùng để xác minh danh tính cá nhân bảo mật trực tuyến."
  },

  // ----- NETWORK (4 câu) -----
  {
    id: 122,
    level: "IC3_LEVEL1",
    test: 3,
    category: "NETWORK",
    difficulty: "medium",
    type: "multiple",
    question: "Các nhà cung cấp dịch vụ lưu trữ đám mây (Cloud storage) sử dụng hai cơ chế phòng thủ cốt lõi nào dưới đây để bảo mật dữ liệu của người dùng trước các cuộc tấn công mạng? (Chọn 2)",
    options: ["Tường lửa (Firewalls)", "Lưới an toàn kỹ thuật số (Safety Nets)", "Phần mềm độc hại giả lập (Malware)", "Mã hóa dữ liệu (Encryption)"],
    answer: ["Tường lửa (Firewalls)", "Mã hóa dữ liệu (Encryption)"],
    explanation: "Để bảo vệ dữ liệu trên đám mây, các hệ thống luôn sử dụng Tường lửa (Firewall) để chặn các truy cập bất hợp pháp từ môi trường mạng bên ngoài, kết hợp với Mã hóa (Encryption) để đảm bảo dữ liệu nếu bị đánh cắp cũng không thể đọc được."
  },
  {
    id: 123,
    level: "IC3_LEVEL1",
    test: 3,
    category: "NETWORK",
    difficulty: "easy",
    type: "single",
    question: "Phát biểu sau đây là Đúng hay Sai: 'Một lợi ích của lập phiên bản đám mây là người dùng có thể lưu trữ nhiều phiên bản của một tập tin.'",
    options: ["Đúng", "Sai"],
    answer: "Đúng",
    explanation: "Cloud Versioning (lập phiên bản đám mây) cho phép lưu lịch sử các lần thay đổi của tập tin, giúp người dùng khôi phục về bất kỳ phiên bản trước đó nào."
  },
  {
    id: 124,
    level: "IC3_LEVEL1",
    test: 3,
    category: "NETWORK",
    difficulty: "hard",
    type: "single",
    question: "Bạn lưu và chỉnh sửa tệp trên Google Drive với Cloud Versioning bật. Bạn xóa phiên bản trực tiếp (live version) mà không chỉ định số khởi tạo (Generation Number). Kết quả nào xảy ra?",
    options: [
      "Một bản sao của phiên bản không hiện hành thay thế phiên bản trực tiếp và nhận số khởi tạo mới.",
      "Phiên bản trực tiếp bị xóa vĩnh viễn.",
      "Phiên bản trực tiếp trở thành phiên bản không hiện hành và số khởi tạo được giữ nguyên.",
      "Phiên bản không hiện hành bị xóa vĩnh viễn."
    ],
    answer: "Phiên bản trực tiếp trở thành phiên bản không hiện hành và số khởi tạo được giữ nguyên.",
    explanation: "Trong Google Cloud Storage với versioning, khi xóa object không chỉ định generation number thì live version trở thành noncurrent version — dữ liệu không bị mất và generation number vẫn giữ nguyên."
  },
  {
    id: 125,
    level: "IC3_LEVEL1",
    test: 3,
    category: "NETWORK",
    difficulty: "medium",
    type: "multiple",
    question: "Trường hợp nào sẽ tạo ra một phiên bản đám mây mới trong Google Docs? (Chọn 2)",
    options: [
      "Xem nội dung của một thư mục",
      "Tải lên một tập tin mới",
      "Tải xuống tập tin",
      "Sao chép một thư mục",
      "Thêm nhận xét (Comments) vào Google Doc"
    ],
    answer: ["Tải lên một tập tin mới", "Thêm nhận xét (Comments) vào Google Doc"],
    explanation: "Upload file mới hoặc thay đổi nội dung (kể cả thêm comment) đều tạo phiên bản mới trong Google Drive. Chỉ xem, tải xuống hay sao chép không tạo phiên bản mới."
  },

  // ----- INFORMATION LITERACY (5 câu) -----
  {
    id: 126,
    level: "IC3_LEVEL1",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "matching",
    question: "Bạn đang tìm kiếm thông tin trực tuyến về chủ đề 'Cách tự trồng và chăm sóc rau sạch tại nhà'. Hệ thống trả về nhiều kết quả, bạn cần đánh giá mức độ liên quan và đáng tin cậy của chúng. Với mỗi nguồn, hãy chọn Có nếu có liên quan trực tiếp hoặc Không nếu không phù hợp:",
    left: [
      "Một bài viết giật gân trên tạp chí lá cải giải trí nói về khu vườn của những người nổi tiếng",
      "Một bài hướng dẫn chi tiết, có cơ sở khoa học do một trường đại học nông nghiệp danh tiếng xuất bản",
      "Một trang web thương mại chạy quảng cáo được tài trợ của cửa hàng đồ gia dụng để bán hạt giống"
    ],
    right: ["Có", "Không"],
    answer: {
      "Một bài viết giật gân trên tạp chí lá cải giải trí nói về khu vườn của những người nổi tiếng": "Không",
      "Một bài hướng dẫn chi tiết, có cơ sở khoa học do một trường đại học nông nghiệp danh tiếng xuất bản": "Có",
      "Một trang web thương mại chạy quảng cáo được tài trợ của cửa hàng đồ gia dụng để bán hạt giống": "Không"
    },
    explanation: "Bài viết từ trường đại học mang tính giáo dục, có chuyên môn sâu sắc về cách trồng rau (Có liên quan học thuật). Tạp chí lá cải chỉ mang tính giải trí, còn trang web bán hạt giống tập trung vào quảng cáo thương mại hơn là cung cấp kiến thức kỹ thuật khách quan."
  },
  {
    id: 127,
    level: "IC3_LEVEL1",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "multiple",
    question: "Khi thực hiện viết một bài tiểu luận nghiên cứu và cần tham khảo một cuốn sách, những yếu tố cốt lõi nào dưới đây bắt buộc phải xuất hiện trong phần trích dẫn nguồn (Citation)? (Chọn 3)",
    options: ["Tên tác giả (Author's name)", "Tên nhà xuất bản (Publisher's name)", "Ngày ký và nộp lệ phí bản quyền (Copyright date)", "Tên sách (Book title)", "Ngày xuất bản/Năm xuất bản (Publication date)"],
    answer: ["Tên tác giả (Author's name)", "Tên sách (Book title)", "Ngày xuất bản/Năm xuất bản (Publication date)"],
    explanation: "Theo các chuẩn trích dẫn phổ biến (APA, MLA, Harvard), 3 thông tin quan trọng nhất định phải có khi trích dẫn một cuốn sách là: Tên tác giả, Tên tác phẩm (Tên sách) và Năm/Ngày xuất bản."
  },
  {
    id: 128,
    level: "IC3_LEVEL1",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "matching",
    question: "Bạn đang thực hiện một dự án nghiên cứu và cần xác minh nguyên nhân khiến một tác phẩm từng có bản quyền rơi vào phạm vi công cộng (Public Domain). Với mỗi phát biểu, hãy chọn Đúng hoặc Sai:",
    left: [
      "Thời hạn bảo hộ độc quyền của Luật Bản quyền đối với tác phẩm đó đã chính thức hết hạn",
      "Chủ sở hữu bản quyền quên hoặc không thực hiện đúng quy trình gia hạn thời gian bảo hộ bản quyền",
      "Chủ sở hữu bản quyền chủ động đưa ra tuyên bố tự nguyện từ bỏ quyền lợi và chuyển tác phẩm sang phạm vi công cộng"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Thời hạn bảo hộ độc quyền của Luật Bản quyền đối với tác phẩm đó đã chính thức hết hạn": "Đúng",
      "Chủ sở hữu bản quyền quên hoặc không thực hiện đúng quy trình gia hạn thời gian bảo hộ bản quyền": "Sai",
      "Chủ sở hữu bản quyền chủ động đưa ra tuyên bố tự nguyện từ bỏ quyền lợi và chuyển tác phẩm sang phạm vi công cộng": "Đúng"
    },
    explanation: "Một tác phẩm đi vào phạm vi công cộng chủ yếu qua hai con đường hợp pháp: Hết thời hạn bảo hộ theo luật định (ví dụ: 50-70 năm sau khi tác giả qua đời) hoặc do tác giả chủ động hiến tặng tài sản sáng tạo đó cho cộng đồng."
  },
  {
    id: 129,
    level: "IC3_LEVEL1",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "matching",
    question: "Quy kết nguồn và chống đạo văn là kỹ năng bắt buộc của công dân số. Với mỗi phát biểu về việc trích dẫn nguồn học thuật dưới đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Bạn chỉ phải thực hiện trích dẫn nguồn khi sao chép và sử dụng nguyên văn 100% câu chữ chính xác từ tác phẩm gốc của người khác",
      "Bạn sẽ bị quy vào lỗi vi phạm đạo văn (Plagiarism) nếu lấy ý tưởng của người khác đưa vào bài viết mà không ghi rõ trích dẫn nguồn đầy đủ",
      "Trong tất cả mọi tác phẩm viết nghiên cứu, bạn bắt buộc phải sử dụng duy nhất phần chú thích ở chân trang (Footnote) để làm hình thức trích dẫn nguồn",
      "Bạn có thể mạo nhận tác phẩm hoặc ý tưởng độc quyền của người khác làm sản phẩm tự sáng tạo của riêng mình mà không cần thực hiện trích dẫn nếu dùng cho mục đích phi thương mại"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bạn chỉ phải thực hiện trích dẫn nguồn khi sao chép và sử dụng nguyên văn 100% câu chữ chính xác từ tác phẩm gốc của người khác": "Sai",
      "Bạn sẽ bị quy vào lỗi vi phạm đạo văn (Plagiarism) nếu lấy ý tưởng của người khác đưa vào bài viết mà không ghi rõ trích dẫn nguồn đầy đủ": "Đúng",
      "Trong tất cả mọi tác phẩm viết nghiên cứu, bạn bắt buộc phải sử dụng duy nhất phần chú thích ở chân trang (Footnote) để làm hình thức trích dẫn nguồn": "Sai",
      "Bạn có thể mạo nhận tác phẩm hoặc ý tưởng độc quyền của người khác làm sản phẩm tự sáng tạo của riêng mình mà không cần thực hiện trích dẫn nếu dùng cho mục đích phi thương mại": "Sai"
    },
    explanation: "Đạo văn tính cả hành vi lấy ý tưởng mà không dẫn nguồn dù đã viết lại bằng lời văn khác. Có nhiều phương pháp trích dẫn (như đặt trong ngoặc đơn kề bên văn bản theo chuẩn APA/MLA), không bắt buộc phải dùng Footnote cuối trang."
  },
  {
    id: 130,
    level: "IC3_LEVEL1",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "matching",
    question: "Học sinh cần nắm vững các quy định trích dẫn nguồn tài liệu tham khảo khi làm tiểu luận. Với mỗi phát biểu về phương pháp trích dẫn sau đây, hãy chọn Đúng hoặc Sai:",
    left: [
      "Bạn bắt buộc phải trích dẫn nguồn đầy đủ nếu thực hiện tóm tắt (Summarize) nội dung chính bài viết của một người khác",
      "Bạn nên chủ động đặt dấu ngoặc kép (Quotation marks) xung quanh các cụm từ liên tục gồm từ ba (3) từ trở lên khi trích dẫn nguyên văn bài viết của người khác",
      "Bạn bắt buộc phải thực hiện trích dẫn nguồn tác giả nếu lấy trực tiếp một câu nói từ một bài phát biểu công khai của họ",
      "Bạn vẫn phải thực hiện trích dẫn nguồn một cách nghiêm túc nếu bạn diễn đạt lại (Paraphrase) bài viết của người khác theo ngôn từ của mình"
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Bạn bắt buộc phải trích dẫn nguồn đầy đủ nếu thực hiện tóm tắt (Summarize) nội dung chính bài viết của một người khác": "Đúng",
      "Bạn nên chủ động đặt dấu ngoặc kép (Quotation marks) xung quanh các cụm từ liên tục gồm từ ba (3) từ trở lên khi trích dẫn nguyên văn bài viết của người khác": "Đúng",
      "Bạn bắt buộc phải thực hiện trích dẫn nguồn tác giả nếu lấy trực tiếp một câu nói từ một bài phát biểu công khai của họ": "Đúng",
      "Bạn vẫn phải thực hiện trích dẫn nguồn một cách nghiêm túc nếu bạn diễn đạt lại (Paraphrase) bài viết của người khác theo ngôn từ của mình": "Đúng"
    },
    explanation: "Mọi hành vi mượn ý tưởng, dữ liệu, tóm tắt, trích dẫn trực tiếp hay diễn đạt lại từ công trình, bài phát biểu của người khác đều bắt buộc phải ghi nhận trích dẫn nguồn để đảm bảo tính liêm chính học thuật."
  },

  // ----- COLLABORATION (5 câu) -----
  {
    id: 131,
    level: "IC3_LEVEL1",
    test: 3,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "multiple",
    question: "Trường bạn yêu cầu thiết kế trang Web theo dõi tham gia câu lạc bộ. Bạn tập hợp nhóm để đưa ra ý tưởng giải quyết vấn đề (brainstorming). Hành động nào có ích cho quá trình này? (Chọn 2)",
    options: [
      "Khuyến khích các ý tưởng táo bạo.",
      "Chỉ chia sẻ những ý tưởng mà bạn cảm thấy rất tự tin.",
      "Không chỉ trích các ý tưởng của những thành viên khác trong nhóm.",
      "Đặt giới hạn mỗi thành viên chỉ đưa ra một hoặc hai ý tưởng."
    ],
    answer: ["Khuyến khích các ý tưởng táo bạo.", "Không chỉ trích các ý tưởng của những thành viên khác trong nhóm."],
    explanation: "Nguyên tắc brainstorming hiệu quả: (1) khuyến khích mọi ý tưởng, kể cả táo bạo — để kích thích sáng tạo, (2) không phán xét trong giai đoạn tạo ý tưởng — để mọi người tự do đề xuất."
  },
  {
    id: 132,
    level: "IC3_LEVEL1",
    test: 3,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "multiple",
    question: "Bạn là trưởng nhóm thiết kế. Nhóm đang sáng tác áp phích cho sự kiện gây quỹ. Khách hàng muốn thay đổi mà nhóm cho là sẽ làm áp phích kém hiệu quả hơn. Bạn nên thực hiện ba hành động nào? (Chọn 3)",
    options: [
      "Yêu cầu khách hàng giải thích lý do thay đổi và tác động của chúng đối với áp phích.",
      "Hướng cuộc thảo luận tập trung vào các lựa chọn thiết kế, không phản ứng theo cảm xúc.",
      "Nhắc nhở khách hàng rằng nhóm có kiến thức và kinh nghiệm để thiết kế áp phích tốt.",
      "Tạo mẫu áp phích theo những thay đổi của khách hàng và gửi cho họ.",
      "Nói với khách hàng rằng bạn không muốn thực hiện các thay đổi đó.",
      "Bới với khách hàng rằng ý tưởng của họ không hoàn nghĩnh."
    ],
    answer: [
      "Yêu cầu khách hàng giải thích lý do thay đổi và tác động của chúng đối với áp phích.",
      "Hướng cuộc thảo luận tập trung vào các lựa chọn thiết kế, không phản ứng theo cảm xúc.",
      "Tạo mẫu áp phích theo những thay đổi của khách hàng và gửi cho họ."
    ],
    explanation: "Giao tiếp chuyên nghiệp với khách hàng: (1) hiểu rõ lý do yêu cầu thay đổi, (2) thảo luận dựa trên dữ liệu thiết kế, (3) tôn trọng quyết định khách hàng bằng cách thực hiện yêu cầu. Phản đối cảm tính hoặc từ chối không phải cách chuyên nghiệp."
  },
  {
    id: 133,
    level: "IC3_LEVEL1",
    test: 3,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "multiple",
    question: "Giáo viên hướng dẫn bạn tham gia chỉnh sửa và góp ý bài viết nghiên cứu của một người bạn cùng lớp. Đâu là hai công cụ trên phần mềm xử lý văn bản bạn nên sử dụng? (Chọn 2)",
    options: ["Ghi chú nối kết (Linked Notes)", "Chế độ thiết kế cấu trúc (Design View)", "Nhận xét/Bình luận (Comments)", "Trình soát chính tả và ngữ pháp (Spelling & Grammar)"],
    answer: ["Nhận xét/Bình luận (Comments)", "Trình soát chính tả và ngữ pháp (Spelling & Grammar)"],
    explanation: "Khi bình duyệt và sửa đổi bài giúp bạn, công cụ Comment (để lại góp ý) và Kiểm tra chính tả là hai công cụ thiết thực, phù hợp nhất."
  },
  {
    id: 134,
    level: "IC3_LEVEL1",
    test: 3,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "single",
    question: "Trong phần mềm xử lý văn bản Microsoft Word, người dùng có thể tìm thấy các tùy chọn để kết hợp, so sánh nhiều tài liệu (Combine/Compare) nằm trong nhóm lệnh nào dưới thẻ Review?",
    options: ["Proofing", "Changes", "Tracking", "Compare"],
    answer: "Compare",
    explanation: "Tính năng Compare nằm trong thẻ Review, chứa các công cụ điều hướng để so sánh hai phiên bản tài liệu (Compare) hoặc kết hợp các sửa đổi từ nhiều tác giả vào một tài liệu duy nhất (Combine)."
  },
  {
    id: 135,
    level: "IC3_LEVEL1",
    test: 3,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "multiple",
    question: "Lớp học trực tuyến của bạn đang thực hiện một buổi hội thảo video (Video Conference). Bạn cùng ba học sinh khác sẽ thay phiên nhau bật camera trình bày thông tin và chia sẻ màn hình báo cáo cá nhân. Đâu là 3 hành động bạn nên làm trước khi bắt đầu thuyết trình? (Chọn 3)",
    options: [
      "Luyện tập lại bài thuyết trình cá nhân của mình ngay trong lúc những người khác đang tiến hành phát biểu",
      "Đóng tất cả các chương trình, tài liệu bảo mật và các tab trình duyệt không liên quan",
      "Kiểm tra hệ thống âm thanh, camera và chạy thử tính năng chia sẻ màn hình (Share screen)",
      "Cấp quyền điều khiển để các học sinh khác có thể đồng thời chia sẻ đè lên màn hình của bạn",
      "Rà soát và bảo đảm toàn bộ hình ảnh, nội dung trong slide thuyết trình đều phù hợp với môi trường giáo dục"
    ],
    answer: [
      "Đóng tất cả các chương trình, tài liệu bảo mật và các tab trình duyệt không liên quan",
      "Kiểm tra hệ thống âm thanh, camera và chạy thử tính năng chia sẻ màn hình (Share screen)",
      "Rà soát và bảo đảm toàn bộ hình ảnh, nội dung trong slide thuyết trình đều phù hợp với môi trường giáo dục"
    ],
    explanation: "Trước khi thuyết trình trực tuyến, bạn cần tắt bớt các tab riêng tư để tránh lộ dữ liệu cá nhân khi share screen, kiểm tra kỹ thuật thiết bị phần cứng để bảo đảm quá trình diễn ra trơn tru và chuẩn bị nội dung chuẩn mực, lịch sự phù hợp với người nghe."
  }
];

export default IC3_LEVEL1;