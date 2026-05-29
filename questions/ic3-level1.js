export const IC3_LEVEL1 = [

  {
    id: 1,
    level: "IC3_LEVEL1",
    category: "SOFTWARE",
    difficulty: "easy",
    type: "matching",
    question: "Ghép loại ứng dụng phần mềm với mục đích sử dụng phù hợp.",
    left: [
      "Phần mềm xử lý văn bản",
      "Ứng dụng bảng tính",
      "Hệ thống quản lý cơ sở dữ liệu",
      "Trình duyệt web",
      "Phần mềm trình chiếu"
    ],
    right: [
      "Nhập, chỉnh sửa và định dạng tài liệu",
      "Tính toán và hiển thị dữ liệu dạng biểu đồ",
      "Lưu trữ và quản lý tập hợp thông tin",
      "Truy cập thông tin trên Internet",
      "Hiển thị nội dung dưới dạng trình chiếu"
    ],
    answer: {
      "Phần mềm xử lý văn bản": 0,
      "Ứng dụng bảng tính": 1,
      "Hệ thống quản lý cơ sở dữ liệu": 2,
      "Trình duyệt web": 3,
      "Phần mềm trình chiếu": 4
    },
    explanation:
      "Mỗi loại phần mềm được thiết kế cho một nhóm tác vụ riêng biệt."
  },

  {
    id: 2,
    level: "IC3_LEVEL1",
    category: "HARDWARE",
    difficulty: "easy",
    type: "single",
    question:
      "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài?",
    options: [
      "Ổ đĩa cứng",
      "CPU",
      "USB Flash",
      "Bo mạch chủ"
    ],
    answer: 0,
    explanation:
      "Ổ đĩa cứng hoặc SSD là thiết bị lưu trữ dữ liệu lâu dài."
  },

  {
    id: 3,
    level: "IC3_LEVEL1",
    category: "PII",
    difficulty: "medium",
    type: "multiple",
    question:
      "Những thông tin nào được xem là PII (Personally Identifiable Information)? Chọn 4.",
    options: [
      "Lịch sử quét sinh trắc học",
      "Địa chỉ gửi thư",
      "Địa chỉ IP",
      "Số an sinh xã hội",
      "Màu tóc"
    ],
    answer: [0,1,2,3],
    explanation:
      "PII là các thông tin có thể nhận dạng hoặc truy vết đến một cá nhân."
  },

  {
    id: 4,
    level: "IC3_LEVEL1",
    category: "PRIVACY",
    difficulty: "easy",
    type: "single",
    question:
      "Cách an toàn để gửi thông tin nhận dạng cá nhân (PII) qua email là gì?",
    options: [
      "Không bao giờ gửi email",
      "Giải mã email",
      "Chỉ gửi cho người thân",
      "Mã hóa email"
    ],
    answer: 3,
    explanation:
      "Mã hóa email giúp bảo vệ dữ liệu khỏi việc bị đọc trái phép."
  },

  {
    id: 5,
    level: "IC3_LEVEL1",
    category: "NETWORK",
    difficulty: "easy",
    type: "truefalse",
    question:
      "Kết nối Ethernet thường cung cấp tốc độ ổn định hơn kết nối Wi-Fi.",
    options: ["Đúng", "Sai"],
    answer: 0,
    explanation:
      "Ethernet thường ổn định hơn và ít bị nhiễu hơn Wi-Fi."
  },

  {
    id: 6,
    level: "IC3_LEVEL1",
    category: "PRIVACY",
    difficulty: "easy",
    type: "multiple",
    question:
      "Đâu là hai hành động giúp duy trì quyền riêng tư kỹ thuật số? (Chọn 2)",
    options: [
      "Chặn cookie trong trình duyệt",
      "Chỉ dùng email trường học để gửi PII",
      "Tắt GPS khi không sử dụng",
      "Lưu tài liệu cá nhân ở mọi dịch vụ đám mây"
    ],
    answer: [0,2],
    explanation:
      "Chặn cookie và tắt GPS giúp giảm việc theo dõi người dùng."
  },

  {
    id: 7,
    level: "IC3_LEVEL1",
    category: "BROWSER",
    difficulty: "easy",
    type: "single",
    question:
      "Người dùng có thể tắt tính năng lưu mật khẩu trực tuyến ở đâu?",
    options: [
      "Trong cài đặt trình duyệt",
      "Trong hộp thư đến",
      "Trong cài đặt máy tính",
      "Trong lịch sử duyệt web"
    ],
    answer: 0,
    explanation:
      "Các trình duyệt hiện đại đều có phần quản lý mật khẩu."
  },

  {
    id: 8,
    level: "IC3_LEVEL1",
    category: "PORTS",
    difficulty: "medium",
    type: "matching",
    question:
      "Ghép loại cáp với tên gọi tương ứng.",
    left: [
      "USB-C",
      "Micro USB",
      "Lightning",
      "USB Type-A"
    ],
    right: [
      "Hình A",
      "Hình B",
      "Hình C",
      "Hình D"
    ],
    answer: {
      "USB-C": 0,
      "Micro USB": 1,
      "Lightning": 2,
      "USB Type-A": 3
    },
    explanation:
      "Nhóm câu hỏi nhận diện chuẩn kết nối phần cứng."
  },

  {
    id: 9,
    level: "IC3_LEVEL1",
    category: "BROWSER",
    difficulty: "easy",
    type: "single",
    question:
      "Lợi ích chính của chế độ duyệt web riêng tư là gì?",
    options: [
      "Không lưu lịch sử, cookie và dữ liệu tạm trên thiết bị",
      "Ẩn hoàn toàn lưu lượng mạng",
      "Vô hiệu hóa đăng nhập",
      "Ẩn danh tuyệt đối trên Internet"
    ],
    answer: 0,
    explanation:
      "Private Browsing chỉ hạn chế lưu dữ liệu cục bộ trên thiết bị."
  },

  {
    id: 10,
    level: "IC3_LEVEL1",
    category: "PASSWORD",
    difficulty: "medium",
    type: "multiple",
    question:
      "Đâu là các thực hành tốt về mật khẩu? (Chọn 3)",
    options: [
      "Dùng mật khẩu khác nhau cho từng tài khoản",
      "Ghi mật khẩu ra giấy và luôn mang theo",
      "Sử dụng xác thực đa yếu tố",
      "Dùng mật khẩu hoặc cụm mật khẩu dài"
    ],
    answer: [0,2,3],
    explanation:
      "Mật khẩu mạnh + MFA là tiêu chuẩn bảo mật hiện đại."
  },

  {
    id: 11,
    level: "IC3_LEVEL1",
    category: "DEVICES",
    difficulty: "medium",
    type: "multiple",
    question:
      "Thiết bị nào đáp ứng yêu cầu chạy bằng pin và có bàn phím vật lý tích hợp? (Chọn 2)",
    options: [
      "Máy tính để bàn Mac",
      "Điện thoại Android",
      "Laptop Windows",
      "Máy tính bảng Android",
      "Chromebook"
    ],
    answer: [2,4],
    explanation:
      "Laptop và Chromebook đều có bàn phím vật lý tích hợp."
  },

  {
    id: 12,
    level: "IC3_LEVEL1",
    category: "PII",
    difficulty: "medium",
    type: "truefalse",
    question:
      "Nơi sinh có thể được xem là thông tin nhận dạng cá nhân (PII).",
    options: ["Đúng", "Sai"],
    answer: 0,
    explanation:
      "Một số dữ liệu cá nhân có thể dùng để nhận dạng hoặc xác thực cá nhân."
  },

  {
    id: 13,
    level: "IC3_LEVEL1",
    category: "PORTS",
    difficulty: "medium",
    type: "matching",
    question:
      "Ghép cổng kết nối với hình tương ứng.",
    left: [
      "DisplayPort",
      "Ethernet",
      "USB",
      "HDMI",
      "Audio"
    ],
    right: [
      "Hình A",
      "Hình B",
      "Hình C",
      "Hình D",
      "Hình E"
    ],
    answer: {
      "DisplayPort": 3,
      "Ethernet": 4,
      "USB": 1,
      "HDMI": 2,
      "Audio": 0
    },
    explanation:
      "Nhận diện cổng kết nối là kỹ năng cơ bản của IC3 GS6."
  },

  {
    id: 14,
    level: "IC3_LEVEL1",
    category: "NETWORK",
    difficulty: "easy",
    type: "single",
    question:
      "Duyệt web riêng tư đảm bảo điều gì?",
    options: [
      "Không cần đổi mật khẩu",
      "Lịch sử duyệt web không được lưu",
      "Tài khoản luôn được ghi nhớ",
      "Tăng dung lượng lưu trữ"
    ],
    answer: 1,
    explanation:
      "Private Browsing không lưu lịch sử duyệt web trên thiết bị."
  },

  {
    id: 15,
    level: "IC3_LEVEL1",
    category: "NETWORK",
    difficulty: "easy",
    type: "single",
    question:
      "Thiết bị nào chuyển đổi tín hiệu số và tương tự để truyền qua mạng?",
    options: [
      "Ethernet Cable",
      "Router",
      "Modem",
      "Network Adapter"
    ],
    answer: 2,
    explanation:
      "Modem thực hiện quá trình điều chế và giải điều chế tín hiệu."
  }

];
