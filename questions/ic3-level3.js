export const IC3_LEVEL3 = [
  // ============================================================
  // TEST 1 (45 câu)
  // ============================================================

  // ----- SECURITY & PRIVACY (8 câu) -----
  {
    id: 1,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Tùy chọn nào sau đây là hành động giúp xóa dữ liệu cá nhân khỏi thiết bị một cách triệt để nhất?",
    options: ["Quét nhanh", "Tắt thiết bị", "Cập nhật phần mềm", "Khôi phục cài đặt gốc"],
    answer: 3,
    explanation: "Khôi phục cài đặt gốc (Factory Reset) sẽ xóa sạch dữ liệu người dùng và đưa thiết bị về trạng thái xuất xưởng."
  },
  {
    id: 2,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Khi bạn thấy một trang web yêu cầu cài đặt 'Plugin' để xem video nhưng trình duyệt cảnh báo đó là tệp tin độc hại, bạn nên:",
    options: ["Bỏ qua cảnh báo", "Cài đặt ngay để xem video", "Đóng trang web và không cài đặt", "Tắt phần mềm diệt virus"],
    answer: 2,
    explanation: "Đây là dấu hiệu phổ biến của các cuộc tấn công qua Malware giả dạng trình phát video."
  },
  {
    id: 3,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Phương pháp nào là cách hiệu quả nhất để ngăn chặn truy cập trái phép vào dữ liệu ngay cả khi ổ cứng bị đánh cắp?",
    options: ["Đặt mật khẩu BIOS", "Mã hóa toàn bộ ổ đĩa (Full Disk Encryption)", "Tắt máy tính khi không sử dụng", "Sử dụng màn hình khóa"],
    answer: 1,
    explanation: "Mã hóa toàn bộ ổ đĩa đảm bảo rằng nếu ổ cứng bị tháo rời hoặc đánh cắp, dữ liệu bên trong vẫn không thể đọc được nếu không có khóa giải mã."
  },
  {
    id: 4,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Tấn công 'Man-in-the-Middle' (Người đứng giữa) hoạt động như thế nào?",
    options: [
      "Kẻ tấn công xen vào giữa luồng giao tiếp giữa hai bên để đánh cắp hoặc thay đổi thông tin",
      "Kẻ tấn công làm sập server",
      "Kẻ tấn công gửi thư rác",
      "Kẻ tấn công phá hỏng màn hình"
    ],
    answer: 0,
    explanation: "Kẻ tấn công đứng giữa người gửi và người nhận, nghe lén hoặc giả mạo thông tin mà cả hai bên đều không hay biết."
  },
  {
    id: 5,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "single",
    question: "Điều gì xảy ra khi bạn sử dụng một mật khẩu duy nhất cho tất cả các tài khoản trực tuyến?",
    options: [
      "Tăng cường tính bảo mật cho tài khoản",
      "Tạo ra rủi ro 'Hiệu ứng Domino' (nếu một tài khoản bị hack, tất cả đều bị ảnh hưởng)",
      "Giúp máy tính chạy nhanh hơn",
      "Giúp các trang web xác thực nhanh hơn"
    ],
    answer: 1,
    explanation: "Sử dụng mật khẩu trùng lặp là sai lầm nghiêm trọng nhất. Kẻ tấn công chỉ cần lấy được mật khẩu từ một nguồn yếu là có thể chiếm đoạt toàn bộ danh tính số của bạn."
  },
  {
    id: 6,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Cookie trong trình duyệt web chủ yếu được dùng để làm gì?",
    options: [
      "Lưu trữ thông tin phiên làm việc và tùy chọn của người dùng để cá nhân hóa trải nghiệm",
      "Làm virus để phá hủy máy tính",
      "Làm chậm tốc độ internet",
      "Thay thế cho mật khẩu ngân hàng"
    ],
    answer: 0,
    explanation: "Cookie ghi nhớ trạng thái (như đăng nhập, giỏ hàng) để web biết bạn là ai khi chuyển trang. Tuy nhiên, cần quản lý chúng vì lý do riêng tư."
  },
  {
    id: 7,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Khi nhận được email lạ yêu cầu bạn nhấn vào liên kết để 'xác minh tài khoản ngân hàng ngay lập tức', hành động an toàn nhất là gì?",
    options: ["Nhấn vào liên kết để kiểm tra", "Xóa email và không bao giờ nhấn vào liên kết", "Gửi email cho bạn bè để hỏi", "Trả lời email để hỏi lại người gửi"],
    answer: 1,
    explanation: "Đây là chiêu trò Phishing kinh điển. Tuyệt đối không tương tác với các link lạ từ email không xác định."
  },
  {
    id: 8,
    level: "IC3_LEVEL3",
    test: 1,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Giao thức bảo mật nào hiện nay được khuyến nghị sử dụng để mã hóa các kết nối không dây (Wi-Fi) thay cho WEP đã cũ?",
    options: ["WPA3", "WEP", "Open", "HTTP"],
    answer: 0,
    explanation: "WPA3 là chuẩn bảo mật không dây mới nhất và an toàn nhất hiện nay, thay thế cho WPA2 và WEP (đã bị bẻ khóa dễ dàng)."
  },

  // ----- DIGITAL CITIZENSHIP (6 câu) -----
  {
    id: 9,
    level: "IC3_LEVEL3",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "easy",
    type: "single",
    question: "Người dùng nên làm gì với các thiết bị CNTT đã lỗi thời để bảo vệ môi trường?",
    options: ["Lưu trữ trong kho", "Sử dụng làm đồ nghệ thuật", "Ném vào thùng rác", "Tái chế đúng cách"],
    answer: 3,
    explanation: "Tái chế là cách tốt nhất để thu hồi kim loại quý và xử lý an toàn các chất độc hại trong linh kiện điện tử."
  },
  {
    id: 10,
    level: "IC3_LEVEL3",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "single",
    question: "Việc sử dụng hình ảnh của người khác trên mạng mà không xin phép vi phạm điều gì?",
    options: ["Quyền tác giả và quyền riêng tư", "Luật giao thông", "Quy định về bộ nhớ", "Tốc độ internet"],
    answer: 0,
    explanation: "Hình ảnh cá nhân là thông tin định danh và tài sản cá nhân, việc sử dụng trái phép vi phạm quyền riêng tư và bản quyền."
  },
  {
    id: 11,
    level: "IC3_LEVEL3",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "multiple",
    question: "Đâu là những ví dụ về hành vi vi phạm đạo đức số? (Chọn 2)",
    options: ["Ghi nguồn đầy đủ khi trích dẫn tài liệu", "Phát tán tin giả để gây hại cho cá nhân khác", "Tôn trọng ý kiến người khác trong tranh luận", "Sử dụng phần mềm không bản quyền (bẻ khóa)"],
    answer: [1, 3],
    explanation: "Phát tán tin giả và sử dụng phần mềm trái phép (vi phạm sở hữu trí tuệ) là các hành vi phi đạo đức trong môi trường số."
  },
  {
    id: 12,
    level: "IC3_LEVEL3",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "single",
    question: "Hành động nào thể hiện trách nhiệm đạo đức của công dân số khi thấy bạn bè bị bắt nạt trực tuyến?",
    options: [
      "Tham gia bình luận chế giễu thêm",
      "Giữ im lặng hoàn toàn",
      "Chụp màn hình làm bằng chứng, báo cáo cho đơn vị quản lý và hỗ trợ nạn nhân",
      "Chia sẻ video bắt nạt cho nhiều người hơn"
    ],
    answer: 2,
    explanation: "Im lặng hoặc tham gia bắt nạt chỉ làm trầm trọng thêm tình hình. Báo cáo vi phạm là hành động của một công dân số có trách nhiệm."
  },
  {
    id: 13,
    level: "IC3_LEVEL3",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "multiple",
    question: "Đâu là các nguyên tắc ứng xử văn minh (Netiquette) trực tuyến? (Chọn 3)",
    options: [
      "Tôn trọng ý kiến khác biệt",
      "Sử dụng ngôn ngữ lịch sự, không xúc phạm",
      "Viết chữ in hoa toàn bộ để thể hiện quyền lực",
      "Không spam tin nhắn hoặc chia sẻ tin chưa kiểm chứng"
    ],
    answer: [0, 1, 3],
    explanation: "Viết hoa toàn bộ trong tin nhắn mạng thường bị coi là hành động 'la hét' vào người khác, vi phạm quy tắc ứng xử lịch sự."
  },
  {
    id: 14,
    level: "IC3_LEVEL3",
    test: 1,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "single",
    question: "Khi bạn thấy một người khác chia sẻ thông tin cá nhân (như số điện thoại, địa chỉ nhà) của người khác lên mạng mà không được phép (Hành vi Doxing), bạn nên làm gì?",
    options: ["Chia sẻ thêm để mọi người biết", "Báo cáo (Report) vi phạm đó với nền tảng mạng xã hội", "Chỉnh sửa thêm thông tin để làm nó rõ ràng hơn", "Giữ im lặng và coi như không thấy"],
    answer: 1,
    explanation: "Doxing là hành vi vi phạm quyền riêng tư nghiêm trọng. Hành động đúng đắn là báo cáo vi phạm để quản trị viên xóa bỏ nội dung đó."
  },

  // ----- AI & TECHNOLOGY (5 câu) -----
  {
    id: 15,
    level: "IC3_LEVEL3",
    test: 1,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Tại sao thuật toán của AI có thể tạo ra kết quả thiên vị (bias)?",
    options: ["Do AI tự suy nghĩ tiêu cực", "Do dữ liệu huấn luyện chứa đựng các định kiến của con người", "Do tốc độ tính toán quá nhanh", "Do lỗi phần cứng máy chủ"],
    answer: 1,
    explanation: "AI học từ dữ liệu đầu vào. Nếu dữ liệu lịch sử phản ánh các định kiến xã hội, AI sẽ học và tái lập các định kiến đó."
  },
  {
    id: 16,
    level: "IC3_LEVEL3",
    test: 1,
    category: "AI_TECHNOLOGY",
    difficulty: "medium",
    type: "single",
    question: "Trong ngữ cảnh AI, 'Training Data' (Dữ liệu huấn luyện) dùng để làm gì?",
    options: [
      "Dùng để giải trí cho người dùng",
      "Dùng để AI học hỏi các quy luật và mô hình từ đó",
      "Dùng để làm đầy ổ cứng",
      "Dùng để thay thế Internet"
    ],
    answer: 1,
    explanation: "AI không 'tự suy nghĩ' ngay từ đầu, nó cần lượng lớn dữ liệu đầu vào để phân tích và rút ra các quy luật (patterns)."
  },
  {
    id: 17,
    level: "IC3_LEVEL3",
    test: 1,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "multiple",
    question: "Các yếu tố nào ảnh hưởng đến độ tin cậy của mô hình AI? (Chọn 2)",
    options: ["Tính đại diện và chất lượng của dữ liệu huấn luyện", "Sự minh bạch của thuật toán", "Kích thước của màn hình máy tính", "Màu sắc của thiết bị"],
    answer: [0, 1],
    explanation: "Dữ liệu tốt và minh bạch (explainability) là yếu tố quyết định AI có thể tin cậy được hay không."
  },
  {
    id: 18,
    level: "IC3_LEVEL3",
    test: 1,
    category: "AI_TECHNOLOGY",
    difficulty: "medium",
    type: "single",
    question: "Ứng dụng nào sau đây thường sử dụng AI để gợi ý nội dung cho người dùng?",
    options: ["Trình duyệt tệp tin", "Các nền tảng phát trực tuyến (Streaming) như Netflix/YouTube", "Bàn phím không dây", "Dây cáp mạng"],
    answer: 1,
    explanation: "Các thuật toán học máy phân tích lịch sử xem của bạn để gợi ý các nội dung tương tự mà bạn có khả năng cao sẽ quan tâm."
  },
  {
    id: 19,
    level: "IC3_LEVEL3",
    test: 1,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Deepfake là gì?",
    options: ["Một dạng kỹ thuật dùng AI để tạo ra hình ảnh, âm thanh giả mạo giống thật", "Một chương trình diệt virus", "Một dạng phần mềm kế toán", "Một tiêu chuẩn màn hình máy tính"],
    answer: 0,
    explanation: "Deepfake sử dụng mạng thần kinh nhân tạo để thay đổi khuôn mặt hoặc giọng nói của một người trong video, tạo ra những nội dung giả mạo vô cùng tinh vi."
  },

  // ----- INFORMATION LITERACY (4 câu) -----
  {
    id: 20,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "single",
    question: "Bạn thấy một bài viết khẳng định: 'Uống nước chanh mỗi sáng giúp chữa khỏi hoàn toàn mọi loại virus'. Đây là ví dụ về loại thông tin nào?",
    options: ["Thông tin đã được kiểm chứng khoa học", "Thông tin sai lệch (Misinformation/Fake news)", "Ý kiến cá nhân khách quan", "Báo cáo tài chính"],
    answer: 1,
    explanation: "Đây là thông tin sai lệch về y tế, không có căn cứ khoa học, có thể gây nguy hiểm nếu người dùng tin theo và bỏ qua các phương pháp y tế chính thống."
  },
  {
    id: 21,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "multiple",
    question: "Đâu là các đặc điểm của tin giả (Fake news)? (Chọn 2)",
    options: [
      "Sử dụng hình ảnh cắt ghép không khớp với nội dung",
      "Dẫn nguồn từ các cơ quan thông tấn uy tín",
      "Tiêu đề gây sốc, thiếu kiểm chứng",
      "Nội dung được xác thực bởi nhiều bên"
    ],
    answer: [0, 2],
    explanation: "Tin giả thường có tiêu đề giật gân, thiếu nguồn tin cậy và sử dụng tư liệu hình ảnh sai lệch để đánh lừa cảm xúc người xem."
  },
  {
    id: 22,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "multiple",
    question: "Người dùng nên tìm kiếm những phẩm chất nào trong kết quả tìm kiếm trực tuyến? (Chọn 2)",
    options: ["Không liên quan (Irrelevance)", "Quan trọng (Importance)", "Hiện hành (Currency)", "Thiên kiến (Bias)", "Tính khách quan (Objectivity)"],
    answer: ["Hiện hành (Currency)", "Tính khách quan (Objectivity)"],
    explanation: "Hai phẩm chất quan trọng nhất của nguồn tin đáng tin cậy: Currency (thông tin cập nhật, không lỗi thời) và Objectivity (khách quan, không thiên vị). Đây là một phần của framework CRAAP."
  },
  {
    id: 23,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "multiple",
    question: "Khi tìm kiếm thông tin đáng tin cậy trên mạng, người dùng nên cẩn trọng với điều nào? (Chọn 2)",
    options: [
      "Ý kiến của bạn bè và thành viên gia đình được trình bày dưới dạng cơ sở lập luận.",
      "Các bài báo trên Web đã được đánh giá bởi các học giả đáng tin cậy.",
      "Những trang Web có chú thích nguồn của thông tin.",
      "Các bài đăng trên mạng xã hội không trích dẫn nguồn của chúng.",
      "Bài báo khoa học có thông tin rõ ràng về tác giả và lí lịch của họ."
    ],
    answer: [
      "Ý kiến của bạn bè và thành viên gia đình được trình bày dưới dạng cơ sở lập luận.",
      "Các bài đăng trên mạng xã hội không trích dẫn nguồn của chúng."
    ],
    explanation: "Hai dấu hiệu thiếu tin cậy: (1) ý kiến cá nhân không có bằng chứng được trình bày như sự thật, (2) bài đăng không trích dẫn nguồn — không thể kiểm chứng."
  },

  // ----- CLOUD COMPUTING (4 câu) -----
  {
    id: 24,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Lợi ích lớn nhất của việc lưu trữ tệp trên đám mây (Cloud) so với ổ cứng cục bộ là gì?",
    options: ["Tăng độ bền phần cứng", "Khả năng truy cập mọi lúc mọi nơi", "Không bao giờ bị hack", "Hoàn toàn miễn phí"],
    answer: 1,
    explanation: "Đám mây cho phép đồng bộ và truy cập dữ liệu từ bất kỳ thiết bị nào có internet."
  },
  {
    id: 25,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Dịch vụ 'SaaS' (Software as a Service) có nghĩa là gì?",
    options: ["Phần mềm được cung cấp qua Internet theo dạng thuê bao", "Phần cứng luôn được gửi về nhà", "Người dùng phải tự viết mã nguồn", "Dịch vụ sửa chữa phần cứng"],
    answer: 0,
    explanation: "SaaS là mô hình phân phối phần mềm mà ở đó ứng dụng được lưu trữ trên server của nhà cung cấp và người dùng truy cập qua trình duyệt."
  },
  {
    id: 26,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CLOUD_COMPUTING",
    difficulty: "hard",
    type: "single",
    question: "Điều nào sau đây KHÔNG phải là một lợi thế của điện toán đám mây?",
    options: [
      "Khả năng mở rộng tài nguyên linh hoạt",
      "Giảm chi phí đầu tư phần cứng ban đầu",
      "Yêu cầu phải có kết nối Internet liên tục để truy cập",
      "Tự động cập nhật phần mềm"
    ],
    answer: 2,
    explanation: "Việc bắt buộc phải có kết nối Internet ổn định là một 'yêu cầu/hạn chế' hơn là một lợi thế của đám mây so với lưu trữ cục bộ."
  },
  {
    id: 27,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "IaaS (Infrastructure as a Service) cung cấp cho người dùng điều gì?",
    options: ["Máy chủ ảo, lưu trữ và mạng ảo hóa", "Chỉ cung cấp ứng dụng", "Chỉ cung cấp phần cứng vật lý tại nhà", "Không cung cấp gì cả"],
    answer: 0,
    explanation: "IaaS cung cấp hạ tầng máy tính cơ bản (server, storage, network) dưới dạng dịch vụ qua Internet."
  },

  // ----- NETWORKING (3 câu) -----
  {
    id: 28,
    level: "IC3_LEVEL3",
    test: 1,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Giao thức HTTPS khác với HTTP ở điểm cốt lõi nào?",
    options: ["HTTPS nhanh hơn HTTP", "HTTPS sử dụng mã hóa để bảo mật dữ liệu truyền tải", "HTTP chỉ dùng cho hình ảnh", "HTTPS không cần server"],
    answer: 1,
    explanation: "Chữ 'S' trong HTTPS là viết tắt của 'Secure'. Nó sử dụng SSL/TLS để mã hóa đường truyền, bảo vệ dữ liệu khỏi bị nghe lén."
  },
  {
    id: 29,
    level: "IC3_LEVEL3",
    test: 1,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Trong mạng máy tính, 'Bandwidth' (Băng thông) được hiểu là gì?",
    options: [
      "Tốc độ tối đa mà dữ liệu có thể truyền qua một kết nối mạng trong một đơn vị thời gian",
      "Chiều rộng của sợi cáp mạng",
      "Số lượng máy tính trong một phòng",
      "Giá cước internet hàng tháng"
    ],
    answer: 0,
    explanation: "Băng thông giống như độ rộng của một con đường, quyết định lưu lượng dữ liệu có thể đi qua cùng một lúc."
  },
  {
    id: 30,
    level: "IC3_LEVEL3",
    test: 1,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Giao thức nào được sử dụng để phân giải tên miền (ví dụ: google.com) thành địa chỉ IP mà máy tính hiểu được?",
    options: ["DNS", "DHCP", "FTP", "SMTP"],
    answer: 0,
    explanation: "DNS (Domain Name System) đóng vai trò như 'danh bạ điện thoại' của Internet, chuyển đổi tên miền thân thiện với con người thành địa chỉ IP."
  },

  // ----- COLLABORATION (3 câu) -----
  {
    id: 31,
    level: "IC3_LEVEL3",
    test: 1,
    category: "COLLABORATION",
    difficulty: "medium",
    type: "single",
    question: "Trong một ứng dụng trò chuyện nhóm (như Slack, Microsoft Teams, hoặc Discord), tính năng nào được sử dụng để phân tách các cuộc thảo luận thành các chủ đề, dự án hoặc phòng ban riêng biệt nhằm tránh làm nhiễu thông tin?",
    options: ["Kênh / Phòng chat (Channels / Rooms)", "Tin nhắn trực tiếp (Direct Messages)", "Luồng thông báo (Activity Feed)", "Thẻ đánh dấu (Tags)"],
    answer: "Kênh / Phòng chat (Channels / Rooms)",
    explanation: "Các kênh hoặc phòng chat riêng biệt (Channels/Rooms) được thiết lập để quản lý luồng thông tin theo nhóm chuyên biệt, giúp nhân viên bộ phận nào chỉ nhận thông báo và thảo luận đúng chủ đề của bộ phận đó."
  },
  {
    id: 32,
    level: "IC3_LEVEL3",
    test: 1,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn tham gia vào một nhóm gồm 10 sinh viên đang cùng thực hiện một dự án nghiên cứu lớn về sức khỏe và cả nhóm chuẩn bị thảo luận trực tuyến qua phần mềm hội thảo video. Bạn nên thực hiện hai hành động chuẩn bị nào dưới đây trước khi tham gia buổi họp lần đầu tiên? (Chọn 2)",
    options: [
      "Kiểm tra trước thiết bị công nghệ, đường truyền mạng và phần mềm hội thảo video để đảm bảo tính ổn định",
      "Điều chỉnh hướng và vị trí đặt camera sao cho ống kính nằm ngang tầm mắt của bạn",
      "Chuẩn bị sẵn một lượng lớn đồ ăn nhẹ để có thể thoải mái ăn uống trong suốt thời gian diễn ra cuộc họp",
      "Bố trí nguồn ánh sáng mạnh ở ngay phía sau lưng để tạo hiệu ứng đổ bóng che khuất khuôn mặt của bạn"
    ],
    answer: [
      "Kiểm tra trước thiết bị công nghệ, đường truyền mạng và phần mềm hội thảo video để đảm bảo tính ổn định",
      "Điều chỉnh hướng và vị trí đặt camera sao cho ống kính nằm ngang tầm mắt của bạn"
    ],
    explanation: "Trước khi họp trực tuyến, việc test trước công nghệ giúp tránh các lỗi kỹ thuật gián đoạn cuộc họp, và đặt camera ngang tầm mắt giúp tạo góc nhìn trực diện chuyên nghiệp."
  },
  {
    id: 33,
    level: "IC3_LEVEL3",
    test: 1,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn đang lãnh đạo một nhóm dự án gồm nhiều thành viên có sự đa dạng lớn về giới tính, độ tuổi và đến từ các nền văn hóa khác nhau. Để tổ chức một buổi hội thảo video lên ý tưởng từ xa tuân thủ chuẩn mực đạo đức số (Netiquette) và tôn trọng sự đa dạng, hai hành động nào bạn nên thực hiện? (Chọn 2)",
    options: [
      "Yêu cầu một thành viên nói giọng địa phương (hoặc ngoại ngữ có âm điệu nặng) chỉ được trả lời qua hộp chat để tránh làm mất thời gian nghe của các thành viên khác",
      "Chủ động liên hệ và hỗ trợ riêng cho thành viên chưa từng có kinh nghiệm họp trực tuyến để hướng dẫn họ cách sử dụng các nút điều khiển trước khi cuộc họp chính thức bắt đầu",
      "Để tránh xung đột và giữ tập trung tuyệt đối cho nhóm, người lãnh đạo chỉ cho phép thảo luận dựa trên danh sách ý tưởng cá nhân do chính mình chuẩn bị sẵn",
      "Khuyến khích mọi người sử dụng các tính năng tương tác như giơ tay (Raise Hand) để tạo cơ hội công bằng cho tất cả các thành viên trong nhóm đều được phát biểu"
    ],
    answer: [
      "Chủ động liên hệ và hỗ trợ riêng cho thành viên chưa từng có kinh nghiệm họp trực tuyến để hướng dẫn họ cách sử dụng các nút điều khiển trước khi cuộc họp chính thức bắt đầu",
      "Khuyến khích mọi người sử dụng các tính năng tương tác như giơ tay (Raise Hand) để tạo cơ hội công bằng cho tất cả các thành viên trong nhóm đều được phát biểu"
    ],
    explanation: "Chuẩn mực đạo đức số và quản trị nhân sự hiện đại yêu cầu tạo ra môi trường bình đẳng, bao dung. Việc hỗ trợ người yếu thế về công nghệ trước cuộc họp và sử dụng tính năng 'Giơ tay' (Raise Hand) giúp phân phối lượt nói công bằng, văn minh."
  },

  // ----- CRITICAL THINKING (3 câu) -----
  {
    id: 34,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "single",
    question: "Dấu hiệu nào sau đây cho thấy một trang web có thể là trang web lừa đảo (Phishing)?",
    options: ["Tên miền có lỗi chính tả tinh vi", "Có biểu tượng ổ khóa HTTPS", "Tốc độ tải trang nhanh", "Giao diện hiện đại"],
    answer: 0,
    explanation: "Tên miền giả mạo thường thay đổi 1-2 ký tự (ví dụ: 'g0ogle.com' thay vì 'google.com')."
  },
  {
    id: 35,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CRITICAL_THINKING",
    difficulty: "medium",
    type: "single",
    question: "Khi mua hàng trực tuyến, bước nào giúp bạn nhận diện trang web giả mạo tốt nhất?",
    options: [
      "Kiểm tra tên miền trong thanh địa chỉ để đảm bảo không bị làm giả (typosquatting)",
      "Kiểm tra xem trang web có nhiều hình ảnh đẹp hay không",
      "Kiểm tra xem trang web có nhạc nền hay không",
      "Kiểm tra xem trang web có cho phép đăng ký nhanh không"
    ],
    answer: 0,
    explanation: "Tên miền (Domain) là địa chỉ định danh. Tin tặc thường tạo các tên miền gần giống hệt địa chỉ thật để đánh lừa người dùng."
  },
  {
    id: 36,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "single",
    question: "Khi thực hiện tìm kiếm trên Internet, cách nào giúp giảm thiểu kết quả không liên quan?",
    options: ["Sử dụng các từ khóa cụ thể và toán tử tìm kiếm (ví dụ: dấu ngoặc kép)", "Chỉ tìm kiếm một từ duy nhất", "Gõ cả câu hỏi dài lê thê", "Không bao giờ dùng dấu cách"],
    answer: 0,
    explanation: "Sử dụng dấu ngoặc kép để tìm cụm từ chính xác hoặc các toán tử giúp lọc kết quả chính xác hơn nhiều so với từ khóa chung chung."
  },

  // ----- CYBERSECURITY (3 câu) -----
  {
    id: 37,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CYBERSECURITY",
    difficulty: "medium",
    type: "matching",
    question: "Bạn muốn trở thành công dân kĩ thuật số có trách nhiệm. Ghép nối từng loại hoạt động trực tuyến bất hợp pháp với ví dụ về hành vi của nó.",
    left: [
      "Người bán ô tô trực tuyến tuyên bố họ đang trong quân đội, nhưng sẽ giao xe cho bạn sau khi bạn thanh toán.",
      "Bạn nhận được một yêu cầu kết bạn trùng lặp trên Facebook từ một người đã là bạn của bạn.",
      "Bạn nhận được Email thông báo tài khoản ngân hàng bị xâm phạm và hướng dẫn nhấp vào một liên kết để đăng nhập và chứng minh danh tính."
    ],
    right: ["Gian lận trên Internet (Internet Fraud)", "Lừa đảo (Phishing)", "Giả mạo (Spoofing)"],
    answer: {
      "Người bán ô tô trực tuyến tuyên bố họ đang trong quân đội, nhưng sẽ giao xe cho bạn sau khi bạn thanh toán.": "Gian lận trên Internet (Internet Fraud)",
      "Bạn nhận được một yêu cầu kết bạn trùng lặp trên Facebook từ một người đã là bạn của bạn.": "Lừa đảo (Phishing)",
      "Bạn nhận được Email thông báo tài khoản ngân hàng bị xâm phạm và hướng dẫn nhấp vào một liên kết để đăng nhập và chứng minh danh tính.": "Giả mạo (Spoofing)"
    },
    explanation: "Internet Fraud = gian lận mua bán trực tuyến. Phishing = đánh lừa qua tài khoản giả mạo để lấy thông tin. Spoofing = giả mạo tổ chức uy tín (ngân hàng, cơ quan...) để đánh cắp thông tin đăng nhập."
  },
  {
    id: 38,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CYBERSECURITY",
    difficulty: "easy",
    type: "single",
    question: "___ xảy ra khi ai đó sử dụng các từ hoặc hình ảnh có hại trên mạng để đe doạ, làm tổn thương, xấu hổ hoặc cố tình gây ra ảnh hưởng tiêu cực đến người khác.",
    options: ["Cyberbullying", "Challenging", "Policing", "Tweeting"],
    answer: "Cyberbullying",
    explanation: "Cyberbullying (bắt nạt trực tuyến) là hành vi sử dụng công nghệ số để quấy rối, đe dọa, làm bẽ mặt hay gây tổn hại tâm lý cho người khác — một vấn đề nghiêm trọng đặc biệt với thanh thiếu niên."
  },
  {
    id: 39,
    level: "IC3_LEVEL3",
    test: 1,
    category: "CYBERSECURITY",
    difficulty: "medium",
    type: "matching",
    question: "Một người bạn của bạn bị bắt nạt. Bạn ấy cần báo cáo hành vi bắt nạt với ai? Nối từng hành vi bắt nạt với cơ quan có thẩm quyền phù hợp.",
    left: [
      "Kẻ bắt nạt đăng những lời lẽ tấn công bạn trên một tài khoản mạng xã hội bị tấn công.",
      "Kẻ bắt nạt viết lời lẽ từ bài đăng trên mạng xã hội liên tục khoá trong lớp thể dục của người bạn kia.",
      "Kẻ bắt nạt đe dọa sẽ gây tổn thương thể chất tới bạn của bạn."
    ],
    right: ["Nhà cung cấp mạng xã hội", "Khoa trong trường", "Cơ quan hành pháp"],
    answer: {
      "Kẻ bắt nạt đăng những lời lẽ tấn công bạn trên một tài khoản mạng xã hội bị tấn công.": "Nhà cung cấp mạng xã hội",
      "Kẻ bắt nạt viết lời lẽ từ bài đăng trên mạng xã hội liên tục khoá trong lớp thể dục của người bạn kia.": "Khoa trong trường",
      "Kẻ bắt nạt đe dọa sẽ gây tổn thương thể chất tới bạn của bạn.": "Cơ quan hành pháp"
    },
    explanation: "Báo cáo đúng kênh: tấn công trên mạng xã hội → báo platform. Bắt nạt trong trường học → báo ban quản lý trường. Đe dọa bạo lực thể chất → báo cảnh sát ngay lập tức."
  },

  // ----- IoT (2 câu) -----
  {
    id: 40,
    level: "IC3_LEVEL3",
    test: 1,
    category: "IOT",
    difficulty: "medium",
    type: "single",
    question: "Đặc điểm nhận diện chính của một thiết bị Internet vạn vật (IoT) là gì?",
    options: ["Có khả năng kết nối mạng để thu thập và truyền tải dữ liệu", "Phải là máy tính chạy Windows", "Luôn yêu cầu bàn phím vật lý", "Chỉ dùng để giải trí"],
    answer: 0,
    explanation: "Thiết bị IoT là các thiết bị vật lý được tích hợp cảm biến, phần mềm và khả năng kết nối để trao đổi dữ liệu qua mạng."
  },
  {
    id: 41,
    level: "IC3_LEVEL3",
    test: 1,
    category: "IOT",
    difficulty: "medium",
    type: "single",
    question: "Tại sao thiết bị IoT trong gia đình cần được đặt mật khẩu mạnh?",
    options: ["Để máy nhanh hơn", "Để tránh bị tin tặc dùng làm 'bàn đạp' tấn công vào mạng nội bộ", "Để tiết kiệm điện", "Để tăng dung lượng bộ nhớ"],
    answer: 1,
    explanation: "Tin tặc thường xâm nhập vào mạng gia đình thông qua các thiết bị IoT yếu bảo mật, sau đó từ đó tấn công sang máy tính hoặc điện thoại trong cùng mạng."
  },

  // ----- OPERATING SYSTEM (2 câu) -----
  {
    id: 42,
    level: "IC3_LEVEL3",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Tại sao cần cập nhật hệ điều hành (OS updates) thường xuyên?",
    options: ["Để thay đổi hình nền", "Để vá các lỗ hổng bảo mật", "Để tăng dung lượng ổ cứng", "Để máy tính nặng hơn"],
    answer: 1,
    explanation: "Các bản cập nhật (patches) là tuyến phòng thủ quan trọng nhất để sửa lỗi bảo mật mà hacker có thể lợi dụng."
  },
  {
    id: 43,
    level: "IC3_LEVEL3",
    test: 1,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Sự khác biệt chính giữa 'Firmware' và 'Software' là gì?",
    options: ["Firmware được cài sẵn trong phần cứng, khó thay đổi hơn software", "Software chỉ chạy trên máy tính, Firmware chạy trên giấy", "Không có sự khác biệt", "Software luôn luôn miễn phí"],
    answer: 0,
    explanation: "Firmware là phần mềm cấp thấp tích hợp trực tiếp vào phần cứng (như BIOS), trong khi Software là các ứng dụng linh hoạt chạy trên hệ điều hành."
  },

  // ----- INFORMATION SEARCH (2 câu) -----
  {
    id: 44,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INFORMATION_SEARCH",
    difficulty: "medium",
    type: "matching",
    question: "Bạn phải thực hiện tìm kiếm nhiều loại thông tin. Ghép nối từng loại tìm kiếm với công cụ tìm kiếm phù hợp nhất.",
    left: [
      "Liệt kê các vị trí trang Web phù hợp với từ khóa.",
      "Xác định nhạc, phim, quảng cáo và chương trình truyền hình dựa trên một mẫu âm thanh ngắn.",
      "Báo cáo lần xuất hiện đầu tiên và lần xuất hiện tiếp theo của một hình ảnh trực tuyến."
    ],
    right: ["Google", "Shazam", "TinEye"],
    answer: {
      "Liệt kê các vị trí trang Web phù hợp với từ khóa.": "Google",
      "Xác định nhạc, phim, quảng cáo và chương trình truyền hình dựa trên một mẫu âm thanh ngắn.": "Shazam",
      "Báo cáo lần xuất hiện đầu tiên và lần xuất hiện tiếp theo của một hình ảnh trực tuyến.": "TinEye"
    },
    explanation: "Google = công cụ tìm kiếm web đa năng. Shazam = nhận diện bài hát/âm thanh. TinEye = tìm kiếm hình ảnh ngược (reverse image search) và theo dõi lịch sử xuất hiện của ảnh."
  },
  {
    id: 45,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INFORMATION_SEARCH",
    difficulty: "hard",
    type: "single",
    question: "Trong các công cụ tìm kiếm dữ liệu nâng cao, người ta có thể sử dụng toán tử tìm kiếm nào sau đây để tìm kiếm các từ đồng nghĩa của một từ khóa?",
    options: ["Dấu sao (*)", "Dấu ngã (~)", "Toán tử logic AND", "Dấu chấm hỏi (?)"],
    answer: "Dấu ngã (~)",
    explanation: "Theo quy chuẩn tìm kiếm nâng cao (như của Google trước đây), dấu ngã (~) đặt trước từ khóa dùng để yêu cầu hệ thống tìm kiếm cả từ khóa đó và các từ đồng nghĩa (synonyms) của nó."
  },

  // ----- INTELLECTUAL PROPERTY (2 câu) -----
  {
    id: 46,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INTELLECTUAL_PROPERTY",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi phát biểu sau đây, hãy chọn Bảo vệ nếu là phát biểu giúp bảo vệ tài sản trí tuệ, hoặc Rủi ro nếu là phát biểu mang lại rủi ro.",
    left: [
      "Đăng kí bản quyền, nhãn hiệu và bằng sáng chế.",
      "Yêu cầu từng nhân viên kí thỏa thuận không tiết lộ.",
      "Cấp quyền truy cập không giới hạn các sản phẩm của bạn cho bên thứ ba.",
      "Thảo luận ý tưởng của bạn với thật nhiều người để đánh giá sự quan tâm."
    ],
    right: ["Bảo vệ", "Rủi ro"],
    answer: {
      "Đăng kí bản quyền, nhãn hiệu và bằng sáng chế.": "Bảo vệ",
      "Yêu cầu từng nhân viên kí thỏa thuận không tiết lộ.": "Bảo vệ",
      "Cấp quyền truy cập không giới hạn các sản phẩm của bạn cho bên thứ ba.": "Rủi ro",
      "Thảo luận ý tưởng của bạn với thật nhiều người để đánh giá sự quan tâm.": "Rủi ro"
    },
    explanation: "Đăng ký IP và NDA là các biện pháp bảo vệ pháp lý. Cấp quyền không giới hạn cho bên thứ ba và chia sẻ ý tưởng chưa được bảo vệ với nhiều người đều tạo rủi ro bị sao chép hoặc đánh cắp IP."
  },
  {
    id: 47,
    level: "IC3_LEVEL3",
    test: 1,
    category: "INTELLECTUAL_PROPERTY",
    difficulty: "medium",
    type: "single",
    question: "Để tránh bị đồng sở hữu tài sản trí tuệ, người dùng phải làm gì?",
    options: [
      "Mã hóa dữ liệu để một chủ sở hữu chung mất quyền truy cập.",
      "Thuê một chuyên gia CNTT để bảo vệ thông tin tài sản.",
      "Xác định chỉ một người là chủ sở hữu và lập giấy tờ hợp pháp với luật sư.",
      "Đặt mật khẩu mạnh cho tất cả các máy tính liên quan đến lưu trữ nội dung."
    ],
    answer: "Xác định chỉ một người là chủ sở hữu và lập giấy tờ hợp pháp với luật sư.",
    explanation: "Để tránh tranh chấp đồng sở hữu, cần xác định rõ một chủ sở hữu duy nhất ngay từ đầu và lập văn bản pháp lý chính thức — đây là cách duy nhất có giá trị pháp lý."
  },

  // ============================================================
  // TEST 2 (45 câu)
  // ============================================================

  // ----- SECURITY & PRIVACY (8 câu) -----
  {
    id: 48,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "single",
    question: "Tại sao việc thực hiện 'Sao lưu dữ liệu' (Backup) định kỳ là lớp phòng thủ cuối cùng trước các cuộc tấn công Ransomware?",
    options: [
      "Vì sao lưu giúp bạn khôi phục lại dữ liệu gốc mà không cần phải trả tiền chuộc cho tin tặc",
      "Vì sao lưu làm cho máy tính chạy nhanh hơn",
      "Vì sao lưu giúp ngăn chặn virus xâm nhập vào máy tính",
      "Vì sao lưu giúp ẩn địa chỉ IP của bạn"
    ],
    answer: 0,
    explanation: "Ransomware mã hóa dữ liệu của bạn để tống tiền. Nếu bạn có bản sao lưu dữ liệu sạch và ngoại tuyến, bạn có thể xóa sạch máy tính và khôi phục lại dữ liệu mà không cần phụ thuộc vào tin tặc."
  },
  {
    id: 49,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Phương pháp 'Social Engineering' (Kỹ thuật xã hội) tấn công vào đâu?",
    options: [
      "Tấn công vào lỗ hổng phần mềm",
      "Tấn công vào tâm lý con người để thao túng cung cấp thông tin",
      "Tấn công vào phần cứng",
      "Tấn công vào đường dây điện"
    ],
    answer: 1,
    explanation: "Kỹ thuật xã hội không cần hacker giỏi kỹ thuật, chúng khai thác lòng tin hoặc sự thiếu hiểu biết của con người để đánh cắp mật khẩu/dữ liệu."
  },
  {
    id: 50,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "single",
    question: "Tấn công 'DDoS' (Distributed Denial of Service) nhắm vào mục tiêu gì?",
    options: [
      "Đánh cắp mật khẩu",
      "Làm quá tải hệ thống khiến dịch vụ ngừng hoạt động",
      "Chỉnh sửa mã nguồn trang web",
      "Mã hóa dữ liệu để tống tiền"
    ],
    answer: 1,
    explanation: "DDoS sử dụng mạng lưới các máy tính bị nhiễm độc (botnet) để gửi lưu lượng truy cập ồ ạt, khiến máy chủ mục tiêu bị tê liệt."
  },
  {
    id: 51,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Mã hóa đầu cuối (End-to-End Encryption) trong các ứng dụng nhắn tin có nghĩa là gì?",
    options: [
      "Chỉ người gửi và người nhận mới có thể đọc được tin nhắn",
      "Tin nhắn được đọc bởi mọi người",
      "Tin nhắn bị gửi tới máy chủ của chính phủ",
      "Tin nhắn không cần Internet"
    ],
    answer: 0,
    explanation: "Với mã hóa đầu cuối, ngay cả nhà cung cấp dịch vụ nhắn tin cũng không thể giải mã và đọc được nội dung tin nhắn của bạn."
  },
  {
    id: 52,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Mục đích của việc sử dụng 'Phần mềm diệt virus' (Antivirus) là gì?",
    options: [
      "Tăng tốc độ bộ xử lý",
      "Phát hiện, ngăn chặn và loại bỏ phần mềm độc hại",
      "Thay thế hệ điều hành",
      "Chỉ dùng để quét ảnh"
    ],
    answer: 1,
    explanation: "Antivirus quét các tệp tin và tiến trình để tìm kiếm các dấu hiệu của phần mềm độc hại, bảo vệ máy tính khỏi các mã độc."
  },
  {
    id: 53,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "multiple",
    question: "Việc sử dụng VPN (Virtual Private Network) mang lại lợi ích gì về bảo mật? (Chọn 2)",
    options: [
      "Mã hóa dữ liệu truyền tải giữa thiết bị và internet",
      "Ẩn địa chỉ IP thực của người dùng",
      "Tăng dung lượng lưu trữ của máy tính",
      "Tự động xóa mọi virus trên máy"
    ],
    answer: [0, 1],
    explanation: "VPN bảo mật dữ liệu khỏi sự nghe lén (mã hóa) và ẩn danh tính thực (địa chỉ IP) của người dùng trên môi trường mạng."
  },
  {
    id: 54,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Đâu là nguy cơ lớn nhất khi dùng chung máy tính công cộng để đăng nhập tài khoản cá nhân?",
    options: [
      "Máy tính công cộng quá chậm",
      "Keylogger hoặc phần mềm độc hại có thể ghi lại thông tin đăng nhập của bạn",
      "Máy tính công cộng không có loa",
      "Bạn sẽ phải trả phí sử dụng"
    ],
    answer: 1,
    explanation: "Máy tính công cộng không được kiểm soát chặt chẽ, dễ bị cài các phần mềm độc hại ghi lại phím bấm (Keylogger) để lấy cắp mật khẩu."
  },
  {
    id: 55,
    level: "IC3_LEVEL3",
    test: 2,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "multiple",
    question: "Để tăng cường bảo mật tài khoản, bạn nên làm gì? (Chọn 3)",
    options: ["Sử dụng xác thực hai yếu tố (2FA)", "Đặt mật khẩu dài, phức tạp", "Dùng chung mật khẩu cho nhiều tài khoản", "Thường xuyên cập nhật mật khẩu mới"],
    answer: [0, 1, 3],
    explanation: "2FA, mật khẩu mạnh và cập nhật định kỳ là những chiến lược bảo mật tối ưu nhất cho tài khoản cá nhân."
  },

  // ----- DIGITAL CITIZENSHIP (6 câu) -----
  {
    id: 56,
    level: "IC3_LEVEL3",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "multiple",
    question: "Đâu là hai hành động giúp nâng cao danh tính kỹ thuật số chuyên nghiệp của bạn? (Chọn 2)",
    options: ["Chia sẻ thông tin không kiểm chứng", "Xây dựng mạng lưới kết nối chuyên nghiệp (LinkedIn)", "Đăng tải ảnh cá nhân không phù hợp", "Giữ hồ sơ năng lực (Portfolio) công khai và minh bạch"],
    answer: [1, 3],
    explanation: "Việc kết nối đúng chuyên gia và thể hiện năng lực qua hồ sơ công khai giúp xây dựng uy tín cá nhân trên môi trường mạng."
  },
  {
    id: 57,
    level: "IC3_LEVEL3",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "single",
    question: "Việc sử dụng ngôn từ bạo lực hoặc xúc phạm người khác trên mạng xã hội sẽ dẫn đến hậu quả gì?",
    options: [
      "Có thể bị khóa tài khoản, bị cộng đồng tẩy chay và ảnh hưởng danh tiếng cá nhân",
      "Được nhiều người hâm mộ",
      "Không gây ra hậu quả gì",
      "Làm cho máy tính nhanh hơn"
    ],
    answer: 0,
    explanation: "Danh tính kỹ thuật số là lâu dài. Những phát ngôn sai lệch về đạo đức sẽ để lại dấu vết vĩnh viễn, ảnh hưởng tiêu cực đến sự nghiệp và các mối quan hệ xã hội."
  },
  {
    id: 58,
    level: "IC3_LEVEL3",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "single",
    question: "Tại sao việc tái sử dụng thiết bị CNTT (như quyên góp máy tính cũ cho trường học) lại có lợi?",
    options: ["Giảm rác thải điện tử và thu hẹp khoảng cách số", "Để tăng dung lượng bộ nhớ", "Để máy tính hỏng nhanh hơn", "Để mất dữ liệu nhanh hơn"],
    answer: 0,
    explanation: "Tái sử dụng là cấp độ cao nhất trong việc bảo vệ môi trường, giúp kéo dài vòng đời thiết bị và hỗ trợ cộng đồng chưa có điều kiện tiếp cận công nghệ."
  },
  {
    id: 59,
    level: "IC3_LEVEL3",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "multiple",
    question: "Đâu là các nguyên tắc ứng xử văn minh (Netiquette) trực tuyến? (Chọn 3)",
    options: [
      "Tôn trọng ý kiến khác biệt",
      "Sử dụng ngôn ngữ lịch sự, không xúc phạm",
      "Viết chữ in hoa toàn bộ để thể hiện quyền lực",
      "Không spam tin nhắn hoặc chia sẻ tin chưa kiểm chứng"
    ],
    answer: [0, 1, 3],
    explanation: "Viết hoa toàn bộ trong tin nhắn mạng thường bị coi là hành động 'la hét' vào người khác, vi phạm quy tắc ứng xử lịch sự."
  },
  {
    id: 60,
    level: "IC3_LEVEL3",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "hard",
    type: "single",
    question: "Khi bạn thấy một người khác chia sẻ thông tin cá nhân (như số điện thoại, địa chỉ nhà) của người khác lên mạng mà không được phép (Hành vi Doxing), bạn nên làm gì?",
    options: ["Chia sẻ thêm để mọi người biết", "Báo cáo (Report) vi phạm đó với nền tảng mạng xã hội", "Chỉnh sửa thêm thông tin để làm nó rõ ràng hơn", "Giữ im lặng và coi như không thấy"],
    answer: 1,
    explanation: "Doxing là hành vi vi phạm quyền riêng tư nghiêm trọng. Hành động đúng đắn là báo cáo vi phạm để quản trị viên xóa bỏ nội dung đó."
  },
  {
    id: 61,
    level: "IC3_LEVEL3",
    test: 2,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "single",
    question: "Tùy chọn quyền riêng tư nào của Facebook cho phép người dùng chia sẻ thông tin với tất cả bạn bè của họ, ngoại trừ một số lựa chọn?",
    options: ["Only me", "Friends", "Specific friends", "Public", "Friends except"],
    answer: "Friends except",
    explanation: "'Friends except' cho phép chia sẻ với toàn bộ danh sách bạn bè NGOẠI TRỪ những người bạn chỉ định — hữu ích khi không muốn một số người cụ thể thấy bài đăng."
  },

  // ----- AI & TECHNOLOGY (5 câu) -----
  {
    id: 62,
    level: "IC3_LEVEL3",
    test: 2,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Mục đích chính của việc sử dụng 'Sandbox' khi thử nghiệm phần mềm mới là gì?",
    options: ["Tăng tốc độ máy tính", "Chạy phần mềm trong môi trường cô lập để đảm bảo an toàn cho hệ thống chính", "Làm đẹp giao diện người dùng", "Kết nối Internet nhanh hơn"],
    answer: 1,
    explanation: "Sandbox (hộp cát) tạo ra một môi trường biệt lập, nơi phần mềm nghi vấn có thể chạy mà không gây hại cho dữ liệu hoặc hệ điều hành chính của máy tính."
  },
  {
    id: 63,
    level: "IC3_LEVEL3",
    test: 2,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Tại sao tính 'minh bạch' (transparency) lại quan trọng trong các hệ thống AI?",
    options: [
      "Để người dùng hiểu tại sao AI đưa ra quyết định cụ thể đó",
      "Để làm cho AI chạy nhanh hơn",
      "Để AI có thể tự lập trình chính nó",
      "Để làm cho giao diện AI đẹp hơn"
    ],
    answer: 0,
    explanation: "Minh bạch giúp con người tin tưởng và kiểm soát AI, tránh tình trạng 'hộp đen' nơi các quyết định quan trọng bị đưa ra mà không rõ lý do."
  },
  {
    id: 64,
    level: "IC3_LEVEL3",
    test: 2,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Sự khác biệt giữa Machine Learning và Deep Learning là gì?",
    options: [
      "Deep Learning là một tập con của Machine Learning sử dụng các mạng thần kinh nhân tạo nhiều lớp",
      "Không có sự khác biệt",
      "Machine Learning khó học hơn Deep Learning",
      "Deep Learning chỉ chạy trên điện thoại"
    ],
    answer: 0,
    explanation: "Cả hai đều liên quan đến AI, nhưng Deep Learning tập trung vào các mạng thần kinh sâu có khả năng tự học các đặc trưng phức tạp từ dữ liệu."
  },
  {
    id: 65,
    level: "IC3_LEVEL3",
    test: 2,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Khái niệm 'Generative AI' (AI tạo sinh) đề cập đến điều gì?",
    options: ["AI có khả năng tạo ra nội dung mới như văn bản, hình ảnh, âm thanh", "AI chỉ dùng để tính toán số học", "AI dùng để sửa phần cứng", "AI dùng để làm mát máy tính"],
    answer: 0,
    explanation: "AI tạo sinh (như ChatGPT, Midjourney) khác với AI phân tích thông thường ở chỗ nó có thể 'sáng tạo' ra dữ liệu mới dựa trên dữ liệu đã học."
  },
  {
    id: 66,
    level: "IC3_LEVEL3",
    test: 2,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "multiple",
    question: "Các trụ cột chính của cuộc cách mạng công nghiệp 4.0 bao gồm: (Chọn 3)",
    options: ["Internet vạn vật (IoT)", "Trí tuệ nhân tạo (AI)", "Điện toán đám mây (Cloud)", "Dùng máy đánh chữ"],
    answer: [0, 1, 2],
    explanation: "IoT kết nối, Cloud lưu trữ và AI xử lý là bộ ba công nghệ nền tảng thúc đẩy sự thông minh hóa trong sản xuất và đời sống."
  },

  // ----- INFORMATION LITERACY (4 câu) -----
  {
    id: 67,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "multiple",
    question: "Người dùng nên tìm kiếm điều gì để xác định độ tin cậy của tác giả? (Chọn 3)",
    options: [
      "Các bình luận trên mạng xã hội thảo luận về dữ liệu của tác giả.",
      "Kinh nghiệm sống của tác giả.",
      "Các bài viết khác cùng chủ đề.",
      "Trình độ học vấn của tác giả.",
      "Thông tin về cuộc sống gia đình của tác giả."
    ],
    answer: [
      "Kinh nghiệm sống của tác giả.",
      "Các bài viết khác cùng chủ đề.",
      "Trình độ học vấn của tác giả."
    ],
    explanation: "Ba yếu tố đánh giá độ tin cậy tác giả: kinh nghiệm thực tế, học vấn chuyên môn và lịch sử công bố trong lĩnh vực. Bình luận mạng xã hội và thông tin cá nhân không phản ánh chuyên môn."
  },
  {
    id: 68,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INFORMATION_LITERACY",
    difficulty: "easy",
    type: "single",
    question: "Tài nguyên nào tốt nhất để một người sử dụng khi viết báo cáo về các hành tinh?",
    options: ["Một tiểu thuyết hư cầu", "Một bài đăng trên mạng xã hội", "Một trang Blog", "Một tạp chí khoa học"],
    answer: "Một tạp chí khoa học",
    explanation: "Tạp chí khoa học (scientific journal) có quy trình peer review (bình duyệt đồng nghiệp), đảm bảo độ chính xác và đáng tin cậy cao nhất cho báo cáo học thuật về chủ đề khoa học như hành tinh."
  },
  {
    id: 69,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "multiple",
    question: "Câu chuyện về tài liệu ôn tập đại học xuất hiện trên News Feed mạng xã hội với nội dung: 'Nghiên cứu trên 1000 sinh viên cho thấy cải thiện 25% điểm thi. Giáo sư nói: Nếu sinh viên không dùng tài liệu này, họ có thể không đạt điểm cao.' Câu chuyện chứa hai nguy biện Logic nào? (Chọn 2)",
    options: [
      "Nguy biện tấn công cá nhân (Ad Hominem) — công kích cá nhân chứ không tập trung vào vấn đề.",
      "Nguy biện song đề sai (False Dilemma) — hạn chế các lựa chọn có thể có.",
      "Nguy biện lời dụng người nổi tiếng (Appeal To Authority) — dựa vào uy tín của chuyên gia.",
      "Nguy biện viện vào truyền thống (Appeal To Tradition) — bỏ qua những vấn đề trong quá khứ."
    ],
    answer: [
      "Nguy biện song đề sai (False Dilemma) — hạn chế các lựa chọn có thể có.",
      "Nguy biện viện vào truyền thống (Appeal To Tradition) — bỏ qua những vấn đề trong quá khứ."
    ],
    explanation: "False Dilemma: câu chuyện ám chỉ chỉ có hai lựa chọn (dùng tài liệu hoặc không đậu), bỏ qua các phương án khác. Appeal To Tradition: ngụ ý rằng phương pháp học truyền thống không đạt hiệu quả bằng tài liệu này — một lập luận thiên vị."
  },
  {
    id: 70,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INFORMATION_LITERACY",
    difficulty: "hard",
    type: "single",
    question: "Khi làm việc với các hệ thống AI (như ChatGPT), tại sao 'Prompt Engineering' (kỹ thuật đặt câu lệnh) lại trở thành một kỹ năng thiết yếu?",
    options: [
      "Vì AI chỉ hoạt động khi bạn gõ đúng từ khóa bằng tiếng Anh",
      "Vì chất lượng đầu ra của AI phụ thuộc trực tiếp vào tính chính xác và ngữ cảnh của câu lệnh đầu vào",
      "Vì nó giúp máy tính của bạn chạy nhanh hơn",
      "Vì nó giúp bạn hack được hệ thống AI"
    ],
    answer: 1,
    explanation: "AI là một công cụ hỗ trợ tư duy. Câu lệnh càng rõ ràng, chi tiết về ngữ cảnh, thì kết quả AI trả về càng sát với nhu cầu và có độ chính xác cao."
  },

  // ----- CLOUD COMPUTING (4 câu) -----
  {
    id: 71,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Tại sao sao lưu dữ liệu trên đám mây (Cloud backup) lại an toàn trước các thảm họa vật lý (như cháy, hỏng máy tính)?",
    options: [
      "Vì dữ liệu được lưu trữ ở các trung tâm dữ liệu xa vị trí địa lý của bạn",
      "Vì đám mây không bao giờ bị hỏng",
      "Vì dữ liệu trên đám mây được lưu bằng giấy",
      "Vì đám mây không cần điện"
    ],
    answer: 0,
    explanation: "Dữ liệu được lưu trữ phân tán và tại các địa điểm cách biệt, giúp đảm bảo an toàn nếu thiết bị tại chỗ hoặc nơi làm việc gặp sự cố vật lý."
  },
  {
    id: 72,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Dịch vụ đồng bộ hóa đám mây (như Google Drive, OneDrive) giúp ích gì khi bạn làm việc trên nhiều thiết bị?",
    options: [
      "Dữ liệu luôn được cập nhật phiên bản mới nhất trên mọi thiết bị bạn đăng nhập",
      "Làm mất dữ liệu",
      "Không có tác dụng gì",
      "Chỉ làm tăng hóa đơn tiền điện"
    ],
    answer: 0,
    explanation: "Đồng bộ hóa đảm bảo sự nhất quán. Bạn có thể soạn thảo tiếp công việc trên điện thoại ngay từ nơi bạn đã dừng lại trên máy tính."
  },
  {
    id: 73,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Khi chọn dịch vụ lưu trữ đám mây, yếu tố nào cần được ưu tiên hàng đầu?",
    options: [
      "Số lượng trò chơi có sẵn",
      "Tính bảo mật, chính sách bảo mật và uy tín của nhà cung cấp",
      "Màu sắc của logo nhà cung cấp",
      "Khả năng chỉnh sửa ảnh chuyên nghiệp"
    ],
    answer: 1,
    explanation: "Với dữ liệu cá nhân hoặc công việc, sự an toàn và quyền riêng tư mà nhà cung cấp cam kết là yếu tố sống còn."
  },
  {
    id: 74,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Sao lưu (Backup) dữ liệu 3-2-1 có nghĩa là gì?",
    options: [
      "3 bản sao, 2 phương tiện khác nhau, 1 bản lưu trữ bên ngoài (offsite)",
      "3 lần nhấn, 2 phút, 1 giây",
      "3 ổ cứng, 2 máy tính, 1 người",
      "Không có định nghĩa này"
    ],
    answer: 0,
    explanation: "Quy tắc 3-2-1 là tiêu chuẩn vàng trong lưu trữ dữ liệu để đảm bảo khả năng phục hồi tốt nhất trước mọi rủi ro."
  },

  // ----- NETWORKING (3 câu) -----
  {
    id: 75,
    level: "IC3_LEVEL3",
    test: 2,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Cổng (Port) 80 và 443 trong mạng máy tính thường được sử dụng tương ứng cho các dịch vụ nào?",
    options: ["HTTP và HTTPS", "FTP và SSH", "Email và DNS", "Máy in và Scanner"],
    answer: 0,
    explanation: "Port 80 là mặc định cho HTTP (web không mã hóa), còn 443 là cổng mặc định cho HTTPS (web có mã hóa an toàn)."
  },
  {
    id: 76,
    level: "IC3_LEVEL3",
    test: 2,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Sự khác biệt giữa mạng LAN và mạng WAN là gì?",
    options: ["LAN phạm vi nhỏ (nhà, văn phòng), WAN phạm vi lớn (quốc gia, toàn cầu)", "WAN chỉ dùng cho máy tính cũ", "LAN không dùng cáp", "Không có sự khác biệt"],
    answer: 0,
    explanation: "LAN (Local Area Network) giới hạn trong khoảng cách ngắn, trong khi WAN (Wide Area Network) kết nối các vùng địa lý cách xa nhau."
  },
  {
    id: 77,
    level: "IC3_LEVEL3",
    test: 2,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Giao thức nào cung cấp kết nối từ xa an toàn để quản trị máy chủ?",
    options: ["SSH (Secure Shell)", "Telnet", "HTTP", "FTP"],
    answer: 0,
    explanation: "SSH thay thế cho Telnet (vốn truyền dữ liệu dạng văn bản thuần, dễ bị nghe lén) bằng cách mã hóa toàn bộ phiên kết nối."
  },

  // ----- COLLABORATION (3 câu) -----
  {
    id: 78,
    level: "IC3_LEVEL3",
    test: 2,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn tham gia vào một nhóm gồm 10 sinh viên đang cùng thực hiện một dự án nghiên cứu lớn về sức khỏe và cả nhóm chuẩn bị thảo luận trực tuyến qua phần mềm hội thảo video. Bạn nên thực hiện hai hành động chuẩn bị nào dưới đây trước khi tham gia buổi họp lần đầu tiên? (Chọn 2)",
    options: [
      "Kiểm tra trước thiết bị công nghệ, đường truyền mạng và phần mềm hội thảo video để đảm bảo tính ổn định",
      "Điều chỉnh hướng và vị trí đặt camera sao cho ống kính nằm ngang tầm mắt của bạn",
      "Chuẩn bị sẵn một lượng lớn đồ ăn nhẹ để có thể thoải mái ăn uống trong suốt thời gian diễn ra cuộc họp",
      "Bố trí nguồn ánh sáng mạnh ở ngay phía sau lưng để tạo hiệu ứng đổ bóng che khuất khuôn mặt của bạn"
    ],
    answer: [
      "Kiểm tra trước thiết bị công nghệ, đường truyền mạng và phần mềm hội thảo video để đảm bảo tính ổn định",
      "Điều chỉnh hướng và vị trí đặt camera sao cho ống kính nằm ngang tầm mắt của bạn"
    ],
    explanation: "Trước khi họp trực tuyến, việc test trước công nghệ giúp tránh các lỗi kỹ thuật gián đoạn cuộc họp, và đặt camera ngang tầm mắt giúp tạo góc nhìn trực diện chuyên nghiệp."
  },
  {
    id: 79,
    level: "IC3_LEVEL3",
    test: 2,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn đang lãnh đạo một nhóm dự án gồm nhiều thành viên có sự đa dạng lớn về giới tính, độ tuổi và đến từ các nền văn hóa khác nhau. Để tổ chức một buổi hội thảo video lên ý tưởng từ xa tuân thủ chuẩn mực đạo đức số (Netiquette) và tôn trọng sự đa dạng, hai hành động nào bạn nên thực hiện? (Chọn 2)",
    options: [
      "Yêu cầu một thành viên nói giọng địa phương (hoặc ngoại ngữ có âm điệu nặng) chỉ được trả lời qua hộp chat để tránh làm mất thời gian nghe của các thành viên khác",
      "Chủ động liên hệ và hỗ trợ riêng cho thành viên chưa từng có kinh nghiệm họp trực tuyến để hướng dẫn họ cách sử dụng các nút điều khiển trước khi cuộc họp chính thức bắt đầu",
      "Để tránh xung đột và giữ tập trung tuyệt đối cho nhóm, người lãnh đạo chỉ cho phép thảo luận dựa trên danh sách ý tưởng cá nhân do chính mình chuẩn bị sẵn",
      "Khuyến khích mọi người sử dụng các tính năng tương tác như giơ tay (Raise Hand) để tạo cơ hội công bằng cho tất cả các thành viên trong nhóm đều được phát biểu"
    ],
    answer: [
      "Chủ động liên hệ và hỗ trợ riêng cho thành viên chưa từng có kinh nghiệm họp trực tuyến để hướng dẫn họ cách sử dụng các nút điều khiển trước khi cuộc họp chính thức bắt đầu",
      "Khuyến khích mọi người sử dụng các tính năng tương tác như giơ tay (Raise Hand) để tạo cơ hội công bằng cho tất cả các thành viên trong nhóm đều được phát biểu"
    ],
    explanation: "Chuẩn mực đạo đức số và quản trị nhân sự hiện đại yêu cầu tạo ra môi trường bình đẳng, bao dung. Việc hỗ trợ người yếu thế về công nghệ trước cuộc họp và sử dụng tính năng 'Giơ tay' (Raise Hand) giúp phân phối lượt nói công bằng, văn minh."
  },
  {
    id: 80,
    level: "IC3_LEVEL3",
    test: 2,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "matching",
    question: "Ghép nối các hành động cộng tác trên tài liệu trực tuyến với thuật ngữ mô tả tương ứng (Chỉnh sửa - Editing VS Đồng tác giả - Co-authoring):",
    left: [
      "Sử dụng công cụ kiểm tra và sửa lỗi chính tả trực tiếp trên tài liệu Word Online của một người bạn cùng lớp",
      "Đọc, kiểm tra và để lại các nhận xét góp ý (Comment) trên tài liệu Google Docs cho một người bạn",
      "Chụp một bức ảnh mới và chèn trực tiếp bức ảnh đó vào bài trình chiếu Google Slides do bạn cùng lớp khởi tạo",
      "Chủ động xây dựng, soạn thảo mới 5 trang slide cho bài trình chiếu PowerPoint nhóm đang được lưu trữ trên OneDrive"
    ],
    right: ["Chỉnh sửa (Editing)", "Đồng tác giả (Co-authoring)"],
    answer: {
      "Sử dụng công cụ kiểm tra và sửa lỗi chính tả trực tiếp trên tài liệu Word Online của một người bạn cùng lớp": "Chỉnh sửa (Editing)",
      "Đọc, kiểm tra và để lại các nhận xét góp ý (Comment) trên tài liệu Google Docs cho một người bạn": "Chỉnh sửa (Editing)",
      "Chụp một bức ảnh mới và chèn trực tiếp bức ảnh đó vào bài trình chiếu Google Slides do bạn cùng lớp khởi tạo": "Đồng tác giả (Co-authoring)",
      "Chủ động xây dựng, soạn thảo mới 5 trang slide cho bài trình chiếu PowerPoint nhóm đang được lưu trữ trên OneDrive": "Đồng tác giả (Co-authoring)"
    },
    explanation: "Hành động sửa lỗi, định dạng hay nhận xét trên nội dung có sẵn gọi là Chỉnh sửa (Editing). Hành động trực tiếp đóng góp, tạo mới nội dung, hình ảnh hoặc các trang slide vào dự án chung gọi là Đồng tác giả (Co-authoring)."
  },

  // ----- CRITICAL THINKING (3 câu) -----
  {
    id: 81,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn đọc câu chuyện về một chuyên gia nói rằng: 'Sinh viên không dùng tài liệu này sẽ trượt đại học'. Câu chuyện chứa các ngụy biện nào? (Chọn 2)",
    options: ["Ngụy biện tấn công cá nhân (Ad hominem)", "Ngụy biện song đề sai (False Dilemma)", "Ngụy biện lợi dụng người nói tiếng (Appeal to Authority)", "Ngụy biện vin vào truyền thống"],
    answer: [1, 2],
    explanation: "Câu chuyện dựa vào uy tín của chuyên gia (Appeal to Authority) và ép học sinh vào tình huống chỉ có 2 lựa chọn: dùng tài liệu hoặc trượt (False Dilemma)."
  },
  {
    id: 82,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "matching",
    question: "Bạn đang thực hiện nghiên cứu trực tuyến. Bạn thấy một loạt Video có vẻ hỗ trợ giả thuyết của mình. Hai phương pháp chỉnh sửa âm thanh nào cho biết rằng Video đã bị chỉnh sửa để thay đổi thông điệp gốc? Chọn Đúng nếu phương pháp cho thấy chỉnh sửa có chủ ý, Sai nếu không.",
    left: [
      "Âm thanh gốc đã được thay thế bằng nhạc nền.",
      "Phụ đề đã được thêm vào âm thanh gốc.",
      "Từ ngữ được sắp xếp lại hoặc thêm vào.",
      "Giọng thuyết minh giới thiệu người quay phim đã được thêm vào cuối Video."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Âm thanh gốc đã được thay thế bằng nhạc nền.": "Đúng",
      "Phụ đề đã được thêm vào âm thanh gốc.": "Sai",
      "Từ ngữ được sắp xếp lại hoặc thêm vào.": "Đúng",
      "Giọng thuyết minh giới thiệu người quay phim đã được thêm vào cuối Video.": "Sai"
    },
    explanation: "Thay thế âm thanh gốc và sắp xếp lại từ ngữ là những kỹ thuật thao túng rõ ràng làm thay đổi thông điệp. Thêm phụ đề (hỗ trợ tiếp cận) và giọng thuyết minh cuối video (ghi nhận tác giả) là bình thường."
  },
  {
    id: 83,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "single",
    question: "Khi làm việc với các hệ thống AI (như ChatGPT), tại sao 'Prompt Engineering' (kỹ thuật đặt câu lệnh) lại trở thành một kỹ năng thiết yếu?",
    options: [
      "Vì AI chỉ hoạt động khi bạn gõ đúng từ khóa bằng tiếng Anh",
      "Vì chất lượng đầu ra của AI phụ thuộc trực tiếp vào tính chính xác và ngữ cảnh của câu lệnh đầu vào",
      "Vì nó giúp máy tính của bạn chạy nhanh hơn",
      "Vì nó giúp bạn hack được hệ thống AI"
    ],
    answer: 1,
    explanation: "AI là một công cụ hỗ trợ tư duy. Câu lệnh càng rõ ràng, chi tiết về ngữ cảnh, thì kết quả AI trả về càng sát với nhu cầu và có độ chính xác cao."
  },

  // ----- CYBERSECURITY (3 câu) -----
  {
    id: 84,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CYBERSECURITY",
    difficulty: "easy",
    type: "single",
    question: "Phát biểu sau đây là Đúng hay Sai: 'Nếu một cá nhân tận mắt chứng kiến hành vi nguy hiểm, bất hợp pháp hoặc gây hại, thì hành động thích hợp là báo cho nhà chức trách.'",
    options: ["Đúng", "Sai"],
    answer: "Đúng",
    explanation: "Đúng. Báo cáo hành vi nguy hiểm hoặc bất hợp pháp trực tuyến cho nhà chức trách (cơ quan thực thi pháp luật, nền tảng mạng xã hội...) là trách nhiệm của công dân kỹ thuật số có ý thức."
  },
  {
    id: 85,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CYBERSECURITY",
    difficulty: "medium",
    type: "matching",
    question: "Một trách nhiệm của việc trở thành công dân kĩ thuật số tốt là báo cáo hành vi nguy hiểm. Chọn Đúng nếu hành vi là nguy hiểm/bất hợp pháp/có hại, Sai nếu không.",
    left: [
      "Sau khi lướt qua một vài trang Web chơi Game, một trang bật lên (Pop Up) yêu cầu trả tiền để mở khóa máy tính của bạn.",
      "Yêu cầu bạn phải tạo một tài khoản để truy cập các chương trình giảm giá. Tài khoản muốn tên, địa chỉ, điện thoại và ngày sinh của bạn.",
      "Tạo nhiều hồ sơ trên một trang mạng xã hội — một hồ sơ cho mục đích cá nhân và một hồ sơ cho mục đích kinh doanh.",
      "Bạn nhận được Email thông báo tài khoản ngân hàng bị xâm phạm và hướng dẫn nhấp vào liên kết để đăng nhập."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Sau khi lướt qua một vài trang Web chơi Game, một trang bật lên (Pop Up) yêu cầu trả tiền để mở khóa máy tính của bạn.": "Đúng",
      "Yêu cầu bạn phải tạo một tài khoản để truy cập các chương trình giảm giá. Tài khoản muốn tên, địa chỉ, điện thoại và ngày sinh của bạn.": "Sai",
      "Tạo nhiều hồ sơ trên một trang mạng xã hội — một hồ sơ cho mục đích cá nhân và một hồ sơ cho mục đích kinh doanh.": "Sai",
      "Bạn nhận được Email thông báo tài khoản ngân hàng bị xâm phạm và hướng dẫn nhấp vào liên kết để đăng nhập.": "Đúng"
    },
    explanation: "Pop-up đòi tiền chuộc = Ransomware → nguy hiểm. Email ngân hàng đòi nhấp link = Phishing → nguy hiểm. Thu thập thông tin để đăng ký giảm giá là bình thường. Tạo hai hồ sơ riêng biệt là hợp pháp."
  },
  {
    id: 86,
    level: "IC3_LEVEL3",
    test: 2,
    category: "CYBERSECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Nếu một thách thức Internet gây ra rủi ro về sức khỏe và liên quan đến hoạt động bất hợp pháp, thì điều đó nên được báo cho ai? (Chọn 2)",
    options: ["Nền tảng truyền thông xã hội của bài viết", "Một người bạn", "Một cuộc trò chuyện nhóm", "Ông bà", "Cảnh sát"],
    answer: ["Nền tảng truyền thông xã hội của bài viết", "Cảnh sát"],
    explanation: "Nội dung gây hại và bất hợp pháp cần được báo cáo cho: (1) nền tảng mạng xã hội (để gỡ xuống nhanh chóng), (2) cảnh sát (vì vi phạm pháp luật cần cơ quan thực thi xử lý)."
  },

  // ----- IoT (2 câu) -----
  {
    id: 87,
    level: "IC3_LEVEL3",
    test: 2,
    category: "IOT",
    difficulty: "medium",
    type: "single",
    question: "Thách thức về quyền riêng tư của các thiết bị IoT gia đình là gì?",
    options: [
      "Chúng có thể thu thập dữ liệu hành vi người dùng mà người dùng không biết",
      "Chúng làm cho nhà quá hiện đại",
      "Chúng không thể kết nối mạng",
      "Chúng quá nặng"
    ],
    answer: 0,
    explanation: "Nhiều thiết bị IoT liên tục thu thập dữ liệu (âm thanh, chuyển động) và truyền về server hãng, dẫn đến lo ngại về việc bị giám sát tại gia."
  },
  {
    id: 88,
    level: "IC3_LEVEL3",
    test: 2,
    category: "IOT",
    difficulty: "medium",
    type: "single",
    question: "Lợi ích chính của 'Smart Home' (Nhà thông minh) là gì?",
    options: ["Tăng tiện nghi, tự động hóa và tiết kiệm năng lượng", "Làm cho ngôi nhà to hơn", "Thay thế hoàn toàn con người trong mọi việc", "Làm cho internet chậm đi"],
    answer: 0,
    explanation: "Nhà thông minh tích hợp IoT giúp tự động hóa ánh sáng, nhiệt độ và an ninh, mang lại sự tiện ích và tối ưu hóa năng lượng."
  },

  // ----- OPERATING SYSTEM (2 câu) -----
  {
    id: 89,
    level: "IC3_LEVEL3",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Lợi ích chính của việc sử dụng 'Virtual Machine' (Máy ảo) là gì?",
    options: ["Chạy nhiều hệ điều hành trên cùng một phần cứng vật lý", "Giúp máy tính chạy mát hơn", "Thay thế hoàn toàn CPU", "Tự động kết nối mạng xã hội"],
    answer: 0,
    explanation: "Máy ảo cho phép cô lập các môi trường phần mềm, cho phép thử nghiệm hoặc chạy các OS khác nhau trên một máy chủ duy nhất."
  },
  {
    id: 90,
    level: "IC3_LEVEL3",
    test: 2,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Tại sao nên sử dụng tài khoản User (Standard User) thay vì Administrator để làm việc hàng ngày?",
    options: ["Để máy tính chạy nhanh hơn", "Giới hạn quyền hạn, ngăn chặn phần mềm độc hại cài đặt trái phép", "Để tiết kiệm điện", "Để có thể cài mọi ứng dụng"],
    answer: 1,
    explanation: "Tài khoản Standard giúp bảo vệ hệ thống vì phần mềm độc hại sẽ không có quyền thay đổi các tệp tin hệ thống quan trọng."
  },

  // ----- INFORMATION SEARCH (2 câu) -----
  {
    id: 91,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INFORMATION_SEARCH",
    difficulty: "medium",
    type: "matching",
    question: "Bạn phải thực hiện tìm kiếm nhiều thông tin. Nối từng mục đích tìm kiếm với loại tìm kiếm tương ứng.",
    left: [
      "Các tùy chọn bên thứ ba khi mua phần mềm.",
      "Một trang cụ thể.",
      "Số liệu thống kê dân số."
    ],
    right: ["Giao dịch (Transaction)", "Điều hướng (Navigation)", "Thông tin (Information)"],
    answer: {
      "Các tùy chọn bên thứ ba khi mua phần mềm.": "Giao dịch (Transaction)",
      "Một trang cụ thể.": "Điều hướng (Navigation)",
      "Số liệu thống kê dân số.": "Thông tin (Information)"
    },
    explanation: "Ba loại tìm kiếm: Transaction (giao dịch) = tìm để mua/bán/so sánh sản phẩm. Navigation (điều hướng) = tìm để đến một trang cụ thể. Information (thông tin) = tìm để học hỏi, nghiên cứu."
  },
  {
    id: 92,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INFORMATION_SEARCH",
    difficulty: "medium",
    type: "matching",
    question: "Bạn đang cố gắng thiết kế một yêu cầu tìm kiếm hiệu quả và cần chọn đúng công cụ. Chọn Đúng nếu công cụ tìm kiếm sẽ trả về kết quả mong muốn, Sai nếu không.",
    left: [
      "Shazam có thể xác định tên của một bài hát.",
      "TinEye có thể báo cáo lần xuất hiện đầu tiên của một hình ảnh trực tuyến.",
      "Google xác minh các bài đăng tin tức giả mạo hoặc gây hiểu lầm.",
      "Shodan cho phép bạn tìm kiếm TV thông minh, nhà máy điện, tủ lạnh hoặc bất kì loại thiết bị IoT nào được kết nối với Internet."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Shazam có thể xác định tên của một bài hát.": "Đúng",
      "TinEye có thể báo cáo lần xuất hiện đầu tiên của một hình ảnh trực tuyến.": "Đúng",
      "Google xác minh các bài đăng tin tức giả mạo hoặc gây hiểu lầm.": "Sai",
      "Shodan cho phép bạn tìm kiếm TV thông minh, nhà máy điện, tủ lạnh hoặc bất kì loại thiết bị IoT nào được kết nối với Internet.": "Đúng"
    },
    explanation: "Shazam và TinEye làm đúng chức năng mô tả. Shodan là công cụ tìm kiếm thiết bị IoT kết nối Internet — Đúng. Google là công cụ tìm kiếm thông thường, không có chức năng fact-checking/xác minh tin giả — Sai."
  },

  // ----- INTELLECTUAL PROPERTY (2 câu) -----
  {
    id: 93,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INTELLECTUAL_PROPERTY",
    difficulty: "medium",
    type: "single",
    question: "Tùy chọn nào sau đây là một ví dụ về tài sản cá nhân?",
    options: [
      "Hình ảnh từ một chuyến đi đường.",
      "Một Video được quay bằng Camera của công ty.",
      "Một tài liệu kỹ thuật được viết trên thiết bị của công ty.",
      "Một Blog được viết cho một doanh nghiệp."
    ],
    answer: "Hình ảnh từ một chuyến đi đường.",
    explanation: "Hình ảnh chụp trong chuyến đi cá nhân là tài sản riêng của bạn. Video quay bằng máy công ty, tài liệu viết trên thiết bị công ty và Blog viết cho doanh nghiệp đều thuộc về tổ chức/công ty."
  },
  {
    id: 94,
    level: "IC3_LEVEL3",
    test: 2,
    category: "INTELLECTUAL_PROPERTY",
    difficulty: "medium",
    type: "multiple",
    question: "Các chủ doanh nghiệp nên cân nhắc làm gì để bảo vệ tài sản công ty tốt nhất? (Chọn 2)",
    options: [
      "Một luật sư gian xảo",
      "Hiểu biết CPA",
      "Một biểu mẫu không tiết lộ cho nhân viên và đối tác ký.",
      "Bằng kinh doanh",
      "Đăng ký tên doanh nghiệp, tên miền và sản phẩm của họ."
    ],
    answer: [
      "Một biểu mẫu không tiết lộ cho nhân viên và đối tác ký.",
      "Đăng ký tên doanh nghiệp, tên miền và sản phẩm của họ."
    ],
    explanation: "NDA (thỏa thuận không tiết lộ) bảo vệ bí mật kinh doanh. Đăng ký tên doanh nghiệp, domain và nhãn hiệu ngăn người khác sử dụng danh tính thương hiệu của bạn."
  },
  // ============================================================
  // TEST 3 (45 câu) - BỔ SUNG 41 CÂU
  // ============================================================

  // ----- SECURITY & PRIVACY (8 câu) -----
  {
    id: 95,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "single",
    question: "Tấn công 'DDoS' (Distributed Denial of Service) nhắm vào mục tiêu gì?",
    options: [
      "Đánh cắp mật khẩu",
      "Làm quá tải hệ thống khiến dịch vụ ngừng hoạt động",
      "Chỉnh sửa mã nguồn trang web",
      "Mã hóa dữ liệu để tống tiền"
    ],
    answer: 1,
    explanation: "DDoS sử dụng mạng lưới các máy tính bị nhiễm độc (botnet) để gửi lưu lượng truy cập ồ ạt, khiến máy chủ mục tiêu bị tê liệt."
  },
  {
    id: 96,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Mã hóa đầu cuối (End-to-End Encryption) trong các ứng dụng nhắn tin có nghĩa là gì?",
    options: [
      "Chỉ người gửi và người nhận mới có thể đọc được tin nhắn",
      "Tin nhắn được đọc bởi mọi người",
      "Tin nhắn bị gửi tới máy chủ của chính phủ",
      "Tin nhắn không cần Internet"
    ],
    answer: 0,
    explanation: "Với mã hóa đầu cuối, ngay cả nhà cung cấp dịch vụ nhắn tin cũng không thể giải mã và đọc được nội dung tin nhắn của bạn."
  },
  {
    id: 97,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "single",
    question: "Tại sao việc thực hiện 'Sao lưu dữ liệu' (Backup) định kỳ là lớp phòng thủ cuối cùng trước các cuộc tấn công Ransomware?",
    options: [
      "Vì sao lưu giúp bạn khôi phục lại dữ liệu gốc mà không cần phải trả tiền chuộc cho tin tặc",
      "Vì sao lưu làm cho máy tính chạy nhanh hơn",
      "Vì sao lưu giúp ngăn chặn virus xâm nhập vào máy tính",
      "Vì sao lưu giúp ẩn địa chỉ IP của bạn"
    ],
    answer: 0,
    explanation: "Ransomware mã hóa dữ liệu của bạn để tống tiền. Nếu bạn có bản sao lưu dữ liệu sạch và ngoại tuyến, bạn có thể xóa sạch máy tính và khôi phục lại dữ liệu mà không cần phụ thuộc vào tin tặc."
  },
  {
    id: 98,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Phương pháp 'Social Engineering' (Kỹ thuật xã hội) tấn công vào đâu?",
    options: [
      "Tấn công vào lỗ hổng phần mềm",
      "Tấn công vào tâm lý con người để thao túng cung cấp thông tin",
      "Tấn công vào phần cứng",
      "Tấn công vào đường dây điện"
    ],
    answer: 1,
    explanation: "Kỹ thuật xã hội không cần hacker giỏi kỹ thuật, chúng khai thác lòng tin hoặc sự thiếu hiểu biết của con người để đánh cắp mật khẩu/dữ liệu."
  },
  {
    id: 99,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "multiple",
    question: "Việc sử dụng VPN (Virtual Private Network) mang lại lợi ích gì về bảo mật? (Chọn 2)",
    options: [
      "Mã hóa dữ liệu truyền tải giữa thiết bị và internet",
      "Ẩn địa chỉ IP thực của người dùng",
      "Tăng dung lượng lưu trữ của máy tính",
      "Tự động xóa mọi virus trên máy"
    ],
    answer: [0, 1],
    explanation: "VPN bảo mật dữ liệu khỏi sự nghe lén (mã hóa) và ẩn danh tính thực (địa chỉ IP) của người dùng trên môi trường mạng."
  },
  {
    id: 100,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "hard",
    type: "single",
    question: "Điều gì xảy ra khi bạn sử dụng một mật khẩu duy nhất cho tất cả các tài khoản trực tuyến?",
    options: [
      "Tăng cường tính bảo mật cho tài khoản",
      "Tạo ra rủi ro 'Hiệu ứng Domino' (nếu một tài khoản bị hack, tất cả đều bị ảnh hưởng)",
      "Giúp máy tính chạy nhanh hơn",
      "Giúp các trang web xác thực nhanh hơn"
    ],
    answer: 1,
    explanation: "Sử dụng mật khẩu trùng lặp là sai lầm nghiêm trọng nhất. Kẻ tấn công chỉ cần lấy được mật khẩu từ một nguồn yếu là có thể chiếm đoạt toàn bộ danh tính số của bạn."
  },
  {
    id: 101,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Cookie trong trình duyệt web chủ yếu được dùng để làm gì?",
    options: [
      "Lưu trữ thông tin phiên làm việc và tùy chọn của người dùng để cá nhân hóa trải nghiệm",
      "Làm virus để phá hủy máy tính",
      "Làm chậm tốc độ internet",
      "Thay thế cho mật khẩu ngân hàng"
    ],
    answer: 0,
    explanation: "Cookie ghi nhớ trạng thái (như đăng nhập, giỏ hàng) để web biết bạn là ai khi chuyển trang. Tuy nhiên, cần quản lý chúng vì lý do riêng tư."
  },
  {
    id: 102,
    level: "IC3_LEVEL3",
    test: 3,
    category: "SECURITY_PRIVACY",
    difficulty: "medium",
    type: "single",
    question: "Khi nhận được email lạ yêu cầu bạn nhấn vào liên kết để 'xác minh tài khoản ngân hàng ngay lập tức', hành động an toàn nhất là gì?",
    options: ["Nhấn vào liên kết để kiểm tra", "Xóa email và không bao giờ nhấn vào liên kết", "Gửi email cho bạn bè để hỏi", "Trả lời email để hỏi lại người gửi"],
    answer: 1,
    explanation: "Đây là chiêu trò Phishing kinh điển. Tuyệt đối không tương tác với các link lạ từ email không xác định."
  },

  // ----- DIGITAL CITIZENSHIP (6 câu) -----
  {
    id: 103,
    level: "IC3_LEVEL3",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "matching",
    question: "Với mỗi phát biểu về rác thải điện tử (E-waste), hãy chọn Đúng hoặc Sai.",
    left: [
      "Hơn 60% rác thải điện tử được tái chế.",
      "Rác thải điện tử là loại chất thải phát triển chậm nhất trên toàn thế giới.",
      "Rác thải điện tử chứa các kim loại quý như vàng và bạc có thể được phục hồi và tái sử dụng.",
      "Rác thải điện tử chứa các kim loại độc hại như chì và thủy ngân có thể gây bệnh cho con người nếu ngấm vào nguồn nước ngầm."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Hơn 60% rác thải điện tử được tái chế.": "Sai",
      "Rác thải điện tử là loại chất thải phát triển chậm nhất trên toàn thế giới.": "Sai",
      "Rác thải điện tử chứa các kim loại quý như vàng và bạc có thể được phục hồi và tái sử dụng.": "Đúng",
      "Rác thải điện tử chứa các kim loại độc hại như chì và thủy ngân có thể gây bệnh cho con người nếu ngấm vào nguồn nước ngầm.": "Đúng"
    },
    explanation: "Thực tế: chỉ ~20% e-waste được tái chế đúng cách. E-waste là loại chất thải phát triển NHANH nhất. E-waste chứa cả kim loại quý (có thể tái chế) và kim loại độc hại (nguy hiểm cho môi trường nếu không xử lý đúng)."
  },
  {
    id: 104,
    level: "IC3_LEVEL3",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "multiple",
    question: "Kim loại quý nào được tái chế từ rác thải điện tử? (Chọn 3)",
    options: ["Titanium", "Đồng (Copper)", "Sắt (Iron)", "Thiếc (Tin)", "Bạc (Silver)", "Vàng (Gold)"],
    answer: ["Đồng (Copper)", "Bạc (Silver)", "Vàng (Gold)"],
    explanation: "Thiết bị điện tử chứa đồng (trong mạch điện), bạc (tiếp điểm điện) và vàng (kết nối bo mạch chủ). Tái chế e-waste đúng cách giúp thu hồi các kim loại quý hiếm này."
  },
  {
    id: 105,
    level: "IC3_LEVEL3",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "multiple",
    question: "Người dùng có thể thực hiện những phương pháp công nghệ lành mạnh nào để bảo vệ môi trường? (Chọn 3)",
    options: [
      "Hãy thử thanh toán không cần giấy tờ.",
      "Sử dụng các ứng dụng có thể giúp theo dõi mức tiêu thụ nhiên liệu và nước.",
      "Tái chế thiết bị cũ.",
      "In tất cả các tài liệu mong muốn.",
      "Vứt bỏ các thiết bị cũ."
    ],
    answer: [
      "Hãy thử thanh toán không cần giấy tờ.",
      "Sử dụng các ứng dụng có thể giúp theo dõi mức tiêu thụ nhiên liệu và nước.",
      "Tái chế thiết bị cũ."
    ],
    explanation: "Ba hành động thân thiện với môi trường: thanh toán kỹ thuật số giảm giấy, theo dõi tiêu thụ tài nguyên giúp tiết kiệm, tái chế thiết bị cũ ngăn e-waste. In tất cả và vứt bỏ thiết bị đều gây hại cho môi trường."
  },
  {
    id: 106,
    level: "IC3_LEVEL3",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "multiple",
    question: "Hành động nào có nhiều khả năng làm cho người khác nhận thức được những tiến bộ công nghệ? (Chọn 2)",
    options: [
      "Xem phim được sản xuất bằng công nghệ.",
      "Tham gia một số nhóm công nghệ trên mạng xã hội và đọc các bài đăng của họ.",
      "Đăng kí một nguồn cấp tin tức công nghệ.",
      "Sử dụng thiết bị máy tính hàng ngày."
    ],
    answer: [
      "Tham gia một số nhóm công nghệ trên mạng xã hội và đọc các bài đăng của họ.",
      "Đăng kí một nguồn cấp tin tức công nghệ."
    ],
    explanation: "Tham gia cộng đồng công nghệ và đọc tin tức công nghệ là cách chủ động, có mục đích để nâng cao nhận thức về tiến bộ kỹ thuật. Xem phim hay dùng máy tính hàng ngày không nhằm mục đích học hỏi về công nghệ mới."
  },
  {
    id: 107,
    level: "IC3_LEVEL3",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "single",
    question: "Cách nào giúp giảm tác động môi trường của trung tâm dữ liệu?",
    options: ["Sử dụng năng lượng tái tạo và hệ thống làm mát hiệu quả", "Xây dựng thêm nhiều máy chủ cũ", "Tắt toàn bộ điều hòa", "Lưu trữ dữ liệu trên giấy"],
    answer: 0,
    explanation: "Các trung tâm dữ liệu hiện đại tối ưu hóa hiệu quả năng lượng (PUE) và dùng năng lượng xanh để giảm phát thải carbon."
  },
  {
    id: 108,
    level: "IC3_LEVEL3",
    test: 3,
    category: "DIGITAL_CITIZENSHIP",
    difficulty: "medium",
    type: "single",
    question: "Tại sao việc tái sử dụng thiết bị CNTT (như quyên góp máy tính cũ cho trường học) lại có lợi?",
    options: ["Giảm rác thải điện tử và thu hẹp khoảng cách số", "Để tăng dung lượng bộ nhớ", "Để máy tính hỏng nhanh hơn", "Để mất dữ liệu nhanh hơn"],
    answer: 0,
    explanation: "Tái sử dụng là cấp độ cao nhất trong việc bảo vệ môi trường, giúp kéo dài vòng đời thiết bị và hỗ trợ cộng đồng chưa có điều kiện tiếp cận công nghệ."
  },

  // ----- AI & TECHNOLOGY (5 câu) -----
  {
    id: 109,
    level: "IC3_LEVEL3",
    test: 3,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Sự khác biệt giữa Machine Learning và Deep Learning là gì?",
    options: [
      "Deep Learning là một tập con của Machine Learning sử dụng các mạng thần kinh nhân tạo nhiều lớp",
      "Không có sự khác biệt",
      "Machine Learning khó học hơn Deep Learning",
      "Deep Learning chỉ chạy trên điện thoại"
    ],
    answer: 0,
    explanation: "Cả hai đều liên quan đến AI, nhưng Deep Learning tập trung vào các mạng thần kinh sâu có khả năng tự học các đặc trưng phức tạp từ dữ liệu."
  },
  {
    id: 110,
    level: "IC3_LEVEL3",
    test: 3,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Khái niệm 'Generative AI' (AI tạo sinh) đề cập đến điều gì?",
    options: ["AI có khả năng tạo ra nội dung mới như văn bản, hình ảnh, âm thanh", "AI chỉ dùng để tính toán số học", "AI dùng để sửa phần cứng", "AI dùng để làm mát máy tính"],
    answer: 0,
    explanation: "AI tạo sinh (như ChatGPT, Midjourney) khác với AI phân tích thông thường ở chỗ nó có thể 'sáng tạo' ra dữ liệu mới dựa trên dữ liệu đã học."
  },
  {
    id: 111,
    level: "IC3_LEVEL3",
    test: 3,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "multiple",
    question: "Các trụ cột chính của cuộc cách mạng công nghiệp 4.0 bao gồm: (Chọn 3)",
    options: ["Internet vạn vật (IoT)", "Trí tuệ nhân tạo (AI)", "Điện toán đám mây (Cloud)", "Dùng máy đánh chữ"],
    answer: [0, 1, 2],
    explanation: "IoT kết nối, Cloud lưu trữ và AI xử lý là bộ ba công nghệ nền tảng thúc đẩy sự thông minh hóa trong sản xuất và đời sống."
  },
  {
    id: 112,
    level: "IC3_LEVEL3",
    test: 3,
    category: "AI_TECHNOLOGY",
    difficulty: "medium",
    type: "single",
    question: "Mục đích chính của việc sử dụng 'Sandbox' khi thử nghiệm phần mềm mới là gì?",
    options: ["Tăng tốc độ máy tính", "Chạy phần mềm trong môi trường cô lập để đảm bảo an toàn cho hệ thống chính", "Làm đẹp giao diện người dùng", "Kết nối Internet nhanh hơn"],
    answer: 1,
    explanation: "Sandbox (hộp cát) tạo ra một môi trường biệt lập, nơi phần mềm nghi vấn có thể chạy mà không gây hại cho dữ liệu hoặc hệ điều hành chính của máy tính."
  },
  {
    id: 113,
    level: "IC3_LEVEL3",
    test: 3,
    category: "AI_TECHNOLOGY",
    difficulty: "hard",
    type: "single",
    question: "Tại sao tính 'minh bạch' (transparency) lại quan trọng trong các hệ thống AI?",
    options: [
      "Để người dùng hiểu tại sao AI đưa ra quyết định cụ thể đó",
      "Để làm cho AI chạy nhanh hơn",
      "Để AI có thể tự lập trình chính nó",
      "Để làm cho giao diện AI đẹp hơn"
    ],
    answer: 0,
    explanation: "Minh bạch giúp con người tin tưởng và kiểm soát AI, tránh tình trạng 'hộp đen' nơi các quyết định quan trọng bị đưa ra mà không rõ lý do."
  },

  // ----- INFORMATION LITERACY (4 câu) -----
  {
    id: 114,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "single",
    question: "Tài nguyên nào tốt nhất để một người sử dụng khi viết báo cáo về các hành tinh?",
    options: ["Một tiểu thuyết hư cầu", "Một bài đăng trên mạng xã hội", "Một trang Blog", "Một tạp chí khoa học"],
    answer: "Một tạp chí khoa học",
    explanation: "Tạp chí khoa học (scientific journal) có quy trình peer review (bình duyệt đồng nghiệp), đảm bảo độ chính xác và đáng tin cậy cao nhất cho báo cáo học thuật về chủ đề khoa học như hành tinh."
  },
  {
    id: 115,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "single",
    question: "Lí do nào có nhiều khả năng nhất khiến một số trang Web miền .edu hiển thị thông tin sai lệch?",
    options: [
      "Trường hướng tới mục tiêu tối đa hóa lợi nhuận cho các cổ đông.",
      "Họ muốn thông tin sai lệch cho quần chúng.",
      "Họ thích xuyên tạc về sinh viên của họ.",
      "Các nhà giáo dục của họ không đáng tin cậy."
    ],
    answer: "Trường hướng tới mục tiêu tối đa hóa lợi nhuận cho các cổ đông.",
    explanation: "Một số trường tư vì lợi nhuận (for-profit) có thể đưa ra thông tin thiên vị để thu hút sinh viên và tối đa hóa doanh thu — điều này làm giảm độ tin cậy của trang Web .edu của họ."
  },
  {
    id: 116,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "matching",
    question: "Bạn đã được giao xác thực quan điểm về kết quả tìm kiếm. Với mỗi phát biểu, hãy chọn Đúng hoặc Sai.",
    left: [
      "Khuynh hướng cánh tả ủng hộ bình đẳng xã hội, chủ nghĩa tự do và các ý tưởng cách mạng.",
      "Khuynh hướng cánh hữu ủng hộ doanh nghiệp tự do, quyền sở hữu tư nhân và các ý tưởng bảo thủ.",
      "Những câu chuyện được đăng tải bởi một mạng truyền thông lớn luôn thể hiện cả hai mặt với một góc nhìn bình đẳng.",
      "Tất cả các bài đăng trên Internet đều có góc nhìn trung lập."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Khuynh hướng cánh tả ủng hộ bình đẳng xã hội, chủ nghĩa tự do và các ý tưởng cách mạng.": "Đúng",
      "Khuynh hướng cánh hữu ủng hộ doanh nghiệp tự do, quyền sở hữu tư nhân và các ý tưởng bảo thủ.": "Đúng",
      "Những câu chuyện được đăng tải bởi một mạng truyền thông lớn luôn thể hiện cả hai mặt với một góc nhìn bình đẳng.": "Sai",
      "Tất cả các bài đăng trên Internet đều có góc nhìn trung lập.": "Sai"
    },
    explanation: "Cánh tả và cánh hữu có đặc điểm như mô tả — Đúng. Ngay cả các hãng truyền thông lớn cũng có thiên kiến biên tập — Sai. Không có nội dung nào hoàn toàn trung lập 100% — Sai."
  },
  {
    id: 117,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INFORMATION_LITERACY",
    difficulty: "medium",
    type: "multiple",
    question: "Lựa chọn nào đóng vai trò tốt nhất trong việc định hình quan điểm của một người? (Chọn 3)",
    options: ["Đội thể thao yêu thích", "Trình độ học vấn", "Thực phẩm yêu thích", "Tuổi tác", "Địa vị xã hội"],
    answer: ["Trình độ học vấn", "Tuổi tác", "Địa vị xã hội"],
    explanation: "Ba yếu tố có tác động lớn nhất đến quan điểm cá nhân: học vấn (định hình tư duy phân tích), tuổi tác (kinh nghiệm sống), và địa vị xã hội (hoàn cảnh, quyền lợi). Đội bóng yêu thích và thức ăn là sở thích cá nhân, ít ảnh hưởng đến quan điểm tổng thể."
  },

  // ----- CLOUD COMPUTING (4 câu) -----
  {
    id: 118,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Tại sao sao lưu dữ liệu trên đám mây (Cloud backup) lại an toàn trước các thảm họa vật lý (như cháy, hỏng máy tính)?",
    options: [
      "Vì dữ liệu được lưu trữ ở các trung tâm dữ liệu xa vị trí địa lý của bạn",
      "Vì đám mây không bao giờ bị hỏng",
      "Vì dữ liệu trên đám mây được lưu bằng giấy",
      "Vì đám mây không cần điện"
    ],
    answer: 0,
    explanation: "Dữ liệu được lưu trữ phân tán và tại các địa điểm cách biệt, giúp đảm bảo an toàn nếu thiết bị tại chỗ hoặc nơi làm việc gặp sự cố vật lý."
  },
  {
    id: 119,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Dịch vụ đồng bộ hóa đám mây (như Google Drive, OneDrive) giúp ích gì khi bạn làm việc trên nhiều thiết bị?",
    options: [
      "Dữ liệu luôn được cập nhật phiên bản mới nhất trên mọi thiết bị bạn đăng nhập",
      "Làm mất dữ liệu",
      "Không có tác dụng gì",
      "Chỉ làm tăng hóa đơn tiền điện"
    ],
    answer: 0,
    explanation: "Đồng bộ hóa đảm bảo sự nhất quán. Bạn có thể soạn thảo tiếp công việc trên điện thoại ngay từ nơi bạn đã dừng lại trên máy tính."
  },
  {
    id: 120,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Khi chọn dịch vụ lưu trữ đám mây, yếu tố nào cần được ưu tiên hàng đầu?",
    options: [
      "Số lượng trò chơi có sẵn",
      "Tính bảo mật, chính sách bảo mật và uy tín của nhà cung cấp",
      "Màu sắc của logo nhà cung cấp",
      "Khả năng chỉnh sửa ảnh chuyên nghiệp"
    ],
    answer: 1,
    explanation: "Với dữ liệu cá nhân hoặc công việc, sự an toàn và quyền riêng tư mà nhà cung cấp cam kết là yếu tố sống còn."
  },
  {
    id: 121,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CLOUD_COMPUTING",
    difficulty: "medium",
    type: "single",
    question: "Sao lưu (Backup) dữ liệu 3-2-1 có nghĩa là gì?",
    options: [
      "3 bản sao, 2 phương tiện khác nhau, 1 bản lưu trữ bên ngoài (offsite)",
      "3 lần nhấn, 2 phút, 1 giây",
      "3 ổ cứng, 2 máy tính, 1 người",
      "Không có định nghĩa này"
    ],
    answer: 0,
    explanation: "Quy tắc 3-2-1 là tiêu chuẩn vàng trong lưu trữ dữ liệu để đảm bảo khả năng phục hồi tốt nhất trước mọi rủi ro."
  },

  // ----- NETWORKING (3 câu) -----
  {
    id: 122,
    level: "IC3_LEVEL3",
    test: 3,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Cổng (Port) 80 và 443 trong mạng máy tính thường được sử dụng tương ứng cho các dịch vụ nào?",
    options: ["HTTP và HTTPS", "FTP và SSH", "Email và DNS", "Máy in và Scanner"],
    answer: 0,
    explanation: "Port 80 là mặc định cho HTTP (web không mã hóa), còn 443 là cổng mặc định cho HTTPS (web có mã hóa an toàn)."
  },
  {
    id: 123,
    level: "IC3_LEVEL3",
    test: 3,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Sự khác biệt giữa mạng LAN và mạng WAN là gì?",
    options: ["LAN phạm vi nhỏ (nhà, văn phòng), WAN phạm vi lớn (quốc gia, toàn cầu)", "WAN chỉ dùng cho máy tính cũ", "LAN không dùng cáp", "Không có sự khác biệt"],
    answer: 0,
    explanation: "LAN (Local Area Network) giới hạn trong khoảng cách ngắn, trong khi WAN (Wide Area Network) kết nối các vùng địa lý cách xa nhau."
  },
  {
    id: 124,
    level: "IC3_LEVEL3",
    test: 3,
    category: "NETWORKING",
    difficulty: "medium",
    type: "single",
    question: "Giao thức nào cung cấp kết nối từ xa an toàn để quản trị máy chủ?",
    options: ["SSH (Secure Shell)", "Telnet", "HTTP", "FTP"],
    answer: 0,
    explanation: "SSH thay thế cho Telnet (vốn truyền dữ liệu dạng văn bản thuần, dễ bị nghe lén) bằng cách mã hóa toàn bộ phiên kết nối."
  },

  // ----- COLLABORATION (3 câu) -----
  {
    id: 125,
    level: "IC3_LEVEL3",
    test: 3,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn tham gia vào một nhóm gồm 10 sinh viên đang cùng thực hiện một dự án nghiên cứu lớn về sức khỏe và cả nhóm chuẩn bị thảo luận trực tuyến qua phần mềm hội thảo video. Bạn nên thực hiện hai hành động chuẩn bị nào dưới đây trước khi tham gia buổi họp lần đầu tiên? (Chọn 2)",
    options: [
      "Kiểm tra trước thiết bị công nghệ, đường truyền mạng và phần mềm hội thảo video để đảm bảo tính ổn định",
      "Điều chỉnh hướng và vị trí đặt camera sao cho ống kính nằm ngang tầm mắt của bạn",
      "Chuẩn bị sẵn một lượng lớn đồ ăn nhẹ để có thể thoải mái ăn uống trong suốt thời gian diễn ra cuộc họp",
      "Bố trí nguồn ánh sáng mạnh ở ngay phía sau lưng để tạo hiệu ứng đổ bóng che khuất khuôn mặt của bạn"
    ],
    answer: [
      "Kiểm tra trước thiết bị công nghệ, đường truyền mạng và phần mềm hội thảo video để đảm bảo tính ổn định",
      "Điều chỉnh hướng và vị trí đặt camera sao cho ống kính nằm ngang tầm mắt của bạn"
    ],
    explanation: "Trước khi họp trực tuyến, việc test trước công nghệ giúp tránh các lỗi kỹ thuật gián đoạn cuộc họp, và đặt camera ngang tầm mắt giúp tạo góc nhìn trực diện chuyên nghiệp."
  },
  {
    id: 126,
    level: "IC3_LEVEL3",
    test: 3,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn đang lãnh đạo một nhóm dự án gồm nhiều thành viên có sự đa dạng lớn về giới tính, độ tuổi và đến từ các nền văn hóa khác nhau. Để tổ chức một buổi hội thảo video lên ý tưởng từ xa tuân thủ chuẩn mực đạo đức số (Netiquette) và tôn trọng sự đa dạng, hai hành động nào bạn nên thực hiện? (Chọn 2)",
    options: [
      "Yêu cầu một thành viên nói giọng địa phương (hoặc ngoại ngữ có âm điệu nặng) chỉ được trả lời qua hộp chat để tránh làm mất thời gian nghe của các thành viên khác",
      "Chủ động liên hệ và hỗ trợ riêng cho thành viên chưa từng có kinh nghiệm họp trực tuyến để hướng dẫn họ cách sử dụng các nút điều khiển trước khi cuộc họp chính thức bắt đầu",
      "Để tránh xung đột và giữ tập trung tuyệt đối cho nhóm, người lãnh đạo chỉ cho phép thảo luận dựa trên danh sách ý tưởng cá nhân do chính mình chuẩn bị sẵn",
      "Khuyến khích mọi người sử dụng các tính năng tương tác như giơ tay (Raise Hand) để tạo cơ hội công bằng cho tất cả các thành viên trong nhóm đều được phát biểu"
    ],
    answer: [
      "Chủ động liên hệ và hỗ trợ riêng cho thành viên chưa từng có kinh nghiệm họp trực tuyến để hướng dẫn họ cách sử dụng các nút điều khiển trước khi cuộc họp chính thức bắt đầu",
      "Khuyến khích mọi người sử dụng các tính năng tương tác như giơ tay (Raise Hand) để tạo cơ hội công bằng cho tất cả các thành viên trong nhóm đều được phát biểu"
    ],
    explanation: "Chuẩn mực đạo đức số và quản trị nhân sự hiện đại yêu cầu tạo ra môi trường bình đẳng, bao dung. Việc hỗ trợ người yếu thế về công nghệ trước cuộc họp và sử dụng tính năng 'Giơ tay' (Raise Hand) giúp phân phối lượt nói công bằng, văn minh."
  },
  {
    id: 127,
    level: "IC3_LEVEL3",
    test: 3,
    category: "COLLABORATION",
    difficulty: "hard",
    type: "matching",
    question: "Ghép nối các hành động cộng tác trên tài liệu trực tuyến với thuật ngữ mô tả tương ứng (Chỉnh sửa - Editing VS Đồng tác giả - Co-authoring):",
    left: [
      "Sử dụng công cụ kiểm tra và sửa lỗi chính tả trực tiếp trên tài liệu Word Online của một người bạn cùng lớp",
      "Đọc, kiểm tra và để lại các nhận xét góp ý (Comment) trên tài liệu Google Docs cho một người bạn",
      "Chụp một bức ảnh mới và chèn trực tiếp bức ảnh đó vào bài trình chiếu Google Slides do bạn cùng lớp khởi tạo",
      "Chủ động xây dựng, soạn thảo mới 5 trang slide cho bài trình chiếu PowerPoint nhóm đang được lưu trữ trên OneDrive"
    ],
    right: ["Chỉnh sửa (Editing)", "Đồng tác giả (Co-authoring)"],
    answer: {
      "Sử dụng công cụ kiểm tra và sửa lỗi chính tả trực tiếp trên tài liệu Word Online của một người bạn cùng lớp": "Chỉnh sửa (Editing)",
      "Đọc, kiểm tra và để lại các nhận xét góp ý (Comment) trên tài liệu Google Docs cho một người bạn": "Chỉnh sửa (Editing)",
      "Chụp một bức ảnh mới và chèn trực tiếp bức ảnh đó vào bài trình chiếu Google Slides do bạn cùng lớp khởi tạo": "Đồng tác giả (Co-authoring)",
      "Chủ động xây dựng, soạn thảo mới 5 trang slide cho bài trình chiếu PowerPoint nhóm đang được lưu trữ trên OneDrive": "Đồng tác giả (Co-authoring)"
    },
    explanation: "Hành động sửa lỗi, định dạng hay nhận xét trên nội dung có sẵn gọi là Chỉnh sửa (Editing). Hành động trực tiếp đóng góp, tạo mới nội dung, hình ảnh hoặc các trang slide vào dự án chung gọi là Đồng tác giả (Co-authoring)."
  },

  // ----- CRITICAL THINKING (3 câu) -----
  {
    id: 128,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "matching",
    question: "Bạn đang thực hiện nghiên cứu trực tuyến. Bạn thấy một loạt Video có vẻ hỗ trợ giả thuyết của mình. Hai phương pháp chỉnh sửa âm thanh nào cho biết rằng Video đã bị chỉnh sửa để thay đổi thông điệp gốc? Chọn Đúng nếu phương pháp cho thấy chỉnh sửa có chủ ý, Sai nếu không.",
    left: [
      "Âm thanh gốc đã được thay thế bằng nhạc nền.",
      "Phụ đề đã được thêm vào âm thanh gốc.",
      "Từ ngữ được sắp xếp lại hoặc thêm vào.",
      "Giọng thuyết minh giới thiệu người quay phim đã được thêm vào cuối Video."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Âm thanh gốc đã được thay thế bằng nhạc nền.": "Đúng",
      "Phụ đề đã được thêm vào âm thanh gốc.": "Sai",
      "Từ ngữ được sắp xếp lại hoặc thêm vào.": "Đúng",
      "Giọng thuyết minh giới thiệu người quay phim đã được thêm vào cuối Video.": "Sai"
    },
    explanation: "Thay thế âm thanh gốc và sắp xếp lại từ ngữ là những kỹ thuật thao túng rõ ràng làm thay đổi thông điệp. Thêm phụ đề (hỗ trợ tiếp cận) và giọng thuyết minh cuối video (ghi nhận tác giả) là bình thường."
  },
  {
    id: 129,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "multiple",
    question: "Bạn đọc câu chuyện về một chuyên gia nói rằng: 'Sinh viên không dùng tài liệu này sẽ trượt đại học'. Câu chuyện chứa các ngụy biện nào? (Chọn 2)",
    options: ["Ngụy biện tấn công cá nhân (Ad hominem)", "Ngụy biện song đề sai (False Dilemma)", "Ngụy biện lợi dụng người nói tiếng (Appeal to Authority)", "Ngụy biện vin vào truyền thống"],
    answer: [1, 2],
    explanation: "Câu chuyện dựa vào uy tín của chuyên gia (Appeal to Authority) và ép học sinh vào tình huống chỉ có 2 lựa chọn: dùng tài liệu hoặc trượt (False Dilemma)."
  },
  {
    id: 130,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CRITICAL_THINKING",
    difficulty: "hard",
    type: "single",
    question: "Khi làm việc với các hệ thống AI (như ChatGPT), tại sao 'Prompt Engineering' (kỹ thuật đặt câu lệnh) lại trở thành một kỹ năng thiết yếu?",
    options: [
      "Vì AI chỉ hoạt động khi bạn gõ đúng từ khóa bằng tiếng Anh",
      "Vì chất lượng đầu ra của AI phụ thuộc trực tiếp vào tính chính xác và ngữ cảnh của câu lệnh đầu vào",
      "Vì nó giúp máy tính của bạn chạy nhanh hơn",
      "Vì nó giúp bạn hack được hệ thống AI"
    ],
    answer: 1,
    explanation: "AI là một công cụ hỗ trợ tư duy. Câu lệnh càng rõ ràng, chi tiết về ngữ cảnh, thì kết quả AI trả về càng sát với nhu cầu và có độ chính xác cao."
  },

  // ----- CYBERSECURITY (3 câu) -----
  {
    id: 131,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CYBERSECURITY",
    difficulty: "easy",
    type: "single",
    question: "Phát biểu sau đây là Đúng hay Sai: 'Nếu một cá nhân tận mắt chứng kiến hành vi nguy hiểm, bất hợp pháp hoặc gây hại, thì hành động thích hợp là báo cho nhà chức trách.'",
    options: ["Đúng", "Sai"],
    answer: "Đúng",
    explanation: "Đúng. Báo cáo hành vi nguy hiểm hoặc bất hợp pháp trực tuyến cho nhà chức trách (cơ quan thực thi pháp luật, nền tảng mạng xã hội...) là trách nhiệm của công dân kỹ thuật số có ý thức."
  },
  {
    id: 132,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CYBERSECURITY",
    difficulty: "medium",
    type: "matching",
    question: "Một trách nhiệm của việc trở thành công dân kĩ thuật số tốt là báo cáo hành vi nguy hiểm. Chọn Đúng nếu hành vi là nguy hiểm/bất hợp pháp/có hại, Sai nếu không.",
    left: [
      "Sau khi lướt qua một vài trang Web chơi Game, một trang bật lên (Pop Up) yêu cầu trả tiền để mở khóa máy tính của bạn.",
      "Yêu cầu bạn phải tạo một tài khoản để truy cập các chương trình giảm giá. Tài khoản muốn tên, địa chỉ, điện thoại và ngày sinh của bạn.",
      "Tạo nhiều hồ sơ trên một trang mạng xã hội — một hồ sơ cho mục đích cá nhân và một hồ sơ cho mục đích kinh doanh.",
      "Bạn nhận được Email thông báo tài khoản ngân hàng bị xâm phạm và hướng dẫn nhấp vào liên kết để đăng nhập."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Sau khi lướt qua một vài trang Web chơi Game, một trang bật lên (Pop Up) yêu cầu trả tiền để mở khóa máy tính của bạn.": "Đúng",
      "Yêu cầu bạn phải tạo một tài khoản để truy cập các chương trình giảm giá. Tài khoản muốn tên, địa chỉ, điện thoại và ngày sinh của bạn.": "Sai",
      "Tạo nhiều hồ sơ trên một trang mạng xã hội — một hồ sơ cho mục đích cá nhân và một hồ sơ cho mục đích kinh doanh.": "Sai",
      "Bạn nhận được Email thông báo tài khoản ngân hàng bị xâm phạm và hướng dẫn nhấp vào liên kết để đăng nhập.": "Đúng"
    },
    explanation: "Pop-up đòi tiền chuộc = Ransomware → nguy hiểm. Email ngân hàng đòi nhấp link = Phishing → nguy hiểm. Thu thập thông tin để đăng ký giảm giá là bình thường. Tạo hai hồ sơ riêng biệt là hợp pháp."
  },
  {
    id: 133,
    level: "IC3_LEVEL3",
    test: 3,
    category: "CYBERSECURITY",
    difficulty: "medium",
    type: "multiple",
    question: "Nếu một thách thức Internet gây ra rủi ro về sức khỏe và liên quan đến hoạt động bất hợp pháp, thì điều đó nên được báo cho ai? (Chọn 2)",
    options: ["Nền tảng truyền thông xã hội của bài viết", "Một người bạn", "Một cuộc trò chuyện nhóm", "Ông bà", "Cảnh sát"],
    answer: ["Nền tảng truyền thông xã hội của bài viết", "Cảnh sát"],
    explanation: "Nội dung gây hại và bất hợp pháp cần được báo cáo cho: (1) nền tảng mạng xã hội (để gỡ xuống nhanh chóng), (2) cảnh sát (vì vi phạm pháp luật cần cơ quan thực thi xử lý)."
  },

  // ----- IoT (2 câu) -----
  {
    id: 134,
    level: "IC3_LEVEL3",
    test: 3,
    category: "IOT",
    difficulty: "medium",
    type: "single",
    question: "Thách thức về quyền riêng tư của các thiết bị IoT gia đình là gì?",
    options: [
      "Chúng có thể thu thập dữ liệu hành vi người dùng mà người dùng không biết",
      "Chúng làm cho nhà quá hiện đại",
      "Chúng không thể kết nối mạng",
      "Chúng quá nặng"
    ],
    answer: 0,
    explanation: "Nhiều thiết bị IoT liên tục thu thập dữ liệu (âm thanh, chuyển động) và truyền về server hãng, dẫn đến lo ngại về việc bị giám sát tại gia."
  },
  {
    id: 135,
    level: "IC3_LEVEL3",
    test: 3,
    category: "IOT",
    difficulty: "medium",
    type: "single",
    question: "Lợi ích chính của 'Smart Home' (Nhà thông minh) là gì?",
    options: ["Tăng tiện nghi, tự động hóa và tiết kiệm năng lượng", "Làm cho ngôi nhà to hơn", "Thay thế hoàn toàn con người trong mọi việc", "Làm cho internet chậm đi"],
    answer: 0,
    explanation: "Nhà thông minh tích hợp IoT giúp tự động hóa ánh sáng, nhiệt độ và an ninh, mang lại sự tiện ích và tối ưu hóa năng lượng."
  },

  // ----- OPERATING SYSTEM (2 câu) -----
  {
    id: 136,
    level: "IC3_LEVEL3",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Lợi ích chính của việc sử dụng 'Virtual Machine' (Máy ảo) là gì?",
    options: ["Chạy nhiều hệ điều hành trên cùng một phần cứng vật lý", "Giúp máy tính chạy mát hơn", "Thay thế hoàn toàn CPU", "Tự động kết nối mạng xã hội"],
    answer: 0,
    explanation: "Máy ảo cho phép cô lập các môi trường phần mềm, cho phép thử nghiệm hoặc chạy các OS khác nhau trên một máy chủ duy nhất."
  },
  {
    id: 137,
    level: "IC3_LEVEL3",
    test: 3,
    category: "OPERATING_SYSTEM",
    difficulty: "medium",
    type: "single",
    question: "Tại sao nên sử dụng tài khoản User (Standard User) thay vì Administrator để làm việc hàng ngày?",
    options: ["Để máy tính chạy nhanh hơn", "Giới hạn quyền hạn, ngăn chặn phần mềm độc hại cài đặt trái phép", "Để tiết kiệm điện", "Để có thể cài mọi ứng dụng"],
    answer: 1,
    explanation: "Tài khoản Standard giúp bảo vệ hệ thống vì phần mềm độc hại sẽ không có quyền thay đổi các tệp tin hệ thống quan trọng."
  },

  // ----- INFORMATION SEARCH (2 câu) -----
  {
    id: 138,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INFORMATION_SEARCH",
    difficulty: "medium",
    type: "matching",
    question: "Bạn phải thực hiện tìm kiếm nhiều thông tin. Nối từng mục đích tìm kiếm với loại tìm kiếm tương ứng.",
    left: [
      "Các tùy chọn bên thứ ba khi mua phần mềm.",
      "Một trang cụ thể.",
      "Số liệu thống kê dân số."
    ],
    right: ["Giao dịch (Transaction)", "Điều hướng (Navigation)", "Thông tin (Information)"],
    answer: {
      "Các tùy chọn bên thứ ba khi mua phần mềm.": "Giao dịch (Transaction)",
      "Một trang cụ thể.": "Điều hướng (Navigation)",
      "Số liệu thống kê dân số.": "Thông tin (Information)"
    },
    explanation: "Ba loại tìm kiếm: Transaction (giao dịch) = tìm để mua/bán/so sánh sản phẩm. Navigation (điều hướng) = tìm để đến một trang cụ thể. Information (thông tin) = tìm để học hỏi, nghiên cứu."
  },
  {
    id: 139,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INFORMATION_SEARCH",
    difficulty: "medium",
    type: "matching",
    question: "Bạn đang cố gắng thiết kế một yêu cầu tìm kiếm hiệu quả và cần chọn đúng công cụ. Chọn Đúng nếu công cụ tìm kiếm sẽ trả về kết quả mong muốn, Sai nếu không.",
    left: [
      "Shazam có thể xác định tên của một bài hát.",
      "TinEye có thể báo cáo lần xuất hiện đầu tiên của một hình ảnh trực tuyến.",
      "Google xác minh các bài đăng tin tức giả mạo hoặc gây hiểu lầm.",
      "Shodan cho phép bạn tìm kiếm TV thông minh, nhà máy điện, tủ lạnh hoặc bất kì loại thiết bị IoT nào được kết nối với Internet."
    ],
    right: ["Đúng", "Sai"],
    answer: {
      "Shazam có thể xác định tên của một bài hát.": "Đúng",
      "TinEye có thể báo cáo lần xuất hiện đầu tiên của một hình ảnh trực tuyến.": "Đúng",
      "Google xác minh các bài đăng tin tức giả mạo hoặc gây hiểu lầm.": "Sai",
      "Shodan cho phép bạn tìm kiếm TV thông minh, nhà máy điện, tủ lạnh hoặc bất kì loại thiết bị IoT nào được kết nối với Internet.": "Đúng"
    },
    explanation: "Shazam và TinEye làm đúng chức năng mô tả. Shodan là công cụ tìm kiếm thiết bị IoT kết nối Internet — Đúng. Google là công cụ tìm kiếm thông thường, không có chức năng fact-checking/xác minh tin giả — Sai."
  },

  // ----- INTELLECTUAL PROPERTY (2 câu) -----
  {
    id: 140,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INTELLECTUAL_PROPERTY",
    difficulty: "medium",
    type: "single",
    question: "Tùy chọn nào sau đây là một ví dụ về tài sản cá nhân?",
    options: [
      "Hình ảnh từ một chuyến đi đường.",
      "Một Video được quay bằng Camera của công ty.",
      "Một tài liệu kỹ thuật được viết trên thiết bị của công ty.",
      "Một Blog được viết cho một doanh nghiệp."
    ],
    answer: "Hình ảnh từ một chuyến đi đường.",
    explanation: "Hình ảnh chụp trong chuyến đi cá nhân là tài sản riêng của bạn. Video quay bằng máy công ty, tài liệu viết trên thiết bị công ty và Blog viết cho doanh nghiệp đều thuộc về tổ chức/công ty."
  },
  {
    id: 141,
    level: "IC3_LEVEL3",
    test: 3,
    category: "INTELLECTUAL_PROPERTY",
    difficulty: "medium",
    type: "multiple",
    question: "Các chủ doanh nghiệp nên cân nhắc làm gì để bảo vệ tài sản công ty tốt nhất? (Chọn 2)",
    options: [
      "Một luật sư gian xảo",
      "Hiểu biết CPA",
      "Một biểu mẫu không tiết lộ cho nhân viên và đối tác ký.",
      "Bằng kinh doanh",
      "Đăng ký tên doanh nghiệp, tên miền và sản phẩm của họ."
    ],
    answer: [
      "Một biểu mẫu không tiết lộ cho nhân viên và đối tác ký.",
      "Đăng ký tên doanh nghiệp, tên miền và sản phẩm của họ."
    ],
    explanation: "NDA (thỏa thuận không tiết lộ) bảo vệ bí mật kinh doanh. Đăng ký tên doanh nghiệp, domain và nhãn hiệu ngăn người khác sử dụng danh tính thương hiệu của bạn."
  }
];
export default IC3_LEVEL3;
