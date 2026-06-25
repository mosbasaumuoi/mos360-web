// ============================================================
// MOS360 AI PRODUCTIVITY FOUNDATION — QUESTION BANK
// 300 câu hỏi theo 8 Competencies
// Version: 1.0.0
// ============================================================

// ============================================================
// 1. CONFIGURATION
// ============================================================
const AI_QB_CONFIG = {
  courseId: "AI_PRODUCTIVITY",
  totalQuestions: 300,
  totalCompetencies: 8,
  difficultyDistribution: {
    easy: 100,
    medium: 100,
    hard: 100
  },
  passingScore: 70,
  timeLimit: 60 // phút
};

// ============================================================
// 2. COMPETENCY 1 — THINK WITH AI (35 câu)
// ============================================================
const COMPETENCY_1 = [
  // Easy (12 câu)
  {
    id: 1,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "AI là viết tắt của cụm từ nào?",
    options: [
      "Artificial Intelligence",
      "Automated Interface",
      "Advanced Integration",
      "Applied Internet"
    ],
    answer: 0,
    explanation: "AI là viết tắt của Artificial Intelligence (Trí tuệ nhân tạo)."
  },
  {
    id: 2,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "Vai trò chính của AI trong công việc hiện đại là gì?",
    options: [
      "Hỗ trợ và tăng cường năng lực con người",
      "Thay thế hoàn toàn con người",
      "Loại bỏ nhu cầu làm việc",
      "Tự động hóa mọi quyết định"
    ],
    answer: 0,
    explanation: "AI là công cụ hỗ trợ, không phải thay thế con người."
  },
  {
    id: 3,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "AI Copilot có nghĩa là gì?",
    options: [
      "AI đóng vai trò trợ lý đồng hành cùng con người",
      "AI tự lái máy bay",
      "AI thay thế phi công",
      "AI điều khiển phương tiện"
    ],
    answer: 0,
    explanation: "Copilot nghĩa là đồng lái — AI hỗ trợ con người trong công việc."
  },
  {
    id: 4,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "Đâu là tư duy đúng về AI trong học tập?",
    options: [
      "AI là công cụ hỗ trợ học tập",
      "AI có thể thay thế hoàn toàn việc học",
      "Không cần học nữa vì có AI",
      "AI luôn đưa ra câu trả lời đúng"
    ],
    answer: 0,
    explanation: "AI hỗ trợ học tập, nhưng người học vẫn cần tư duy phản biện."
  },
  {
    id: 5,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "Điều nào KHÔNG phải là đặc điểm của AI?",
    options: [
      "Có cảm xúc và suy nghĩ như con người",
      "Học từ dữ liệu",
      "Nhận diện mẫu",
      "Xử lý ngôn ngữ tự nhiên"
    ],
    answer: 0,
    explanation: "AI không có cảm xúc hay ý thức như con người."
  },
  {
    id: 6,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "Tư duy AI-First là gì?",
    options: [
      "Xem AI là công cụ mặc định để giải quyết vấn đề",
      "Chỉ sử dụng AI cho mọi việc",
      "Tin hoàn toàn vào AI",
      "Không bao giờ sử dụng AI"
    ],
    answer: 0,
    explanation: "AI-First là tư duy ưu tiên sử dụng AI như công cụ hỗ trợ."
  },
  {
    id: 7,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "Khi sử dụng AI, trách nhiệm cuối cùng thuộc về ai?",
    options: [
      "Người sử dụng AI",
      "Nhà phát triển AI",
      "Chính AI",
      "Không ai chịu trách nhiệm"
    ],
    answer: 0,
    explanation: "Con người luôn chịu trách nhiệm về quyết định sử dụng AI."
  },
  {
    id: 8,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "AI Assistant khác gì với AI Copilot?",
    options: [
      "Assistant thường là trợ lý tổng quát, Copilot chuyên biệt hơn",
      "Copilot mạnh hơn Assistant",
      "Assistant thay thế con người",
      "Không có sự khác biệt"
    ],
    answer: 0,
    explanation: "Assistant là trợ lý tổng quát, Copilot được thiết kế chuyên biệt hơn."
  },
  {
    id: 9,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "Điều gì giúp con người và AI cộng tác hiệu quả?",
    options: [
      "Hiểu rõ điểm mạnh và giới hạn của nhau",
      "Để AI làm mọi việc",
      "Không tương tác với AI",
      "Chỉ sử dụng AI một lần"
    ],
    answer: 0,
    explanation: "Cộng tác hiệu quả đòi hỏi hiểu rõ năng lực của cả hai bên."
  },
  {
    id: 10,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "AI có thể thay thế hoàn toàn kỹ năng của con người không?",
    options: [
      "Không, AI bổ sung chứ không thay thế",
      "Có, AI có thể làm mọi thứ",
      "Có, trong tương lai gần",
      "Không ai biết được"
    ],
    answer: 0,
    explanation: "AI là công cụ bổ sung, không thay thế kỹ năng con người."
  },
  {
    id: 11,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "Yếu tố quan trọng nhất khi sử dụng AI là gì?",
    options: [
      "Tư duy phản biện và kiểm chứng",
      "Tin tưởng tuyệt đối",
      "Sử dụng càng nhiều càng tốt",
      "Không cần kiểm tra kết quả"
    ],
    answer: 0,
    explanation: "Luôn cần tư duy phản biện và kiểm chứng kết quả từ AI."
  },
  {
    id: 12,
    competency: 1,
    level: "easy",
    category: "MINDSET",
    type: "single",
    question: "AI Productivity hướng đến mục tiêu gì?",
    options: [
      "Tăng năng suất làm việc với sự hỗ trợ của AI",
      "Tự động hóa mọi công việc",
      "Loại bỏ nhân công",
      "Giảm chi phí tối đa"
    ],
    answer: 0,
    explanation: "AI Productivity tập trung vào tăng năng suất với AI làm công cụ hỗ trợ."
  },

  // Medium (12 câu)
  {
    id: 13,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Khi AI đưa ra kết quả không chính xác, bạn nên làm gì?",
    options: [
      "Kiểm tra dữ liệu và yêu cầu AI phân tích lại",
      "Chấp nhận kết quả",
      "Ngừng sử dụng AI",
      "Đổ lỗi cho AI"
    ],
    answer: 0,
    explanation: "Cần kiểm tra dữ liệu và cải thiện prompt để có kết quả tốt hơn."
  },
  {
    id: 14,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "AI Hallucination (ảo giác) là gì?",
    options: [
      "AI tạo ra thông tin không có thực",
      "AI không hoạt động",
      "AI bị lỗi phần cứng",
      "AI mơ mộng"
    ],
    answer: 0,
    explanation: "Hallucination là hiện tượng AI tạo ra thông tin sai lệch nhưng có vẻ hợp lý."
  },
  {
    id: 15,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Lợi ích của việc kết hợp AI với kinh nghiệm con người là gì?",
    options: [
      "Tạo ra quyết định tốt hơn",
      "Loại bỏ cần kinh nghiệm",
      "AI làm mọi việc",
      "Giảm trách nhiệm"
    ],
    answer: 0,
    explanation: "Kết hợp AI với kinh nghiệm con người tạo ra quyết định sáng suốt hơn."
  },
  {
    id: 16,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Điều nào phản ánh đúng mối quan hệ Human-AI Collaboration?",
    options: [
      "Con người và AI làm việc cùng nhau, bổ sung cho nhau",
      "AI thay thế con người",
      "Con người thay thế AI",
      "Họ không liên quan"
    ],
    answer: 0,
    explanation: "Collaboration là sự cộng tác, không phải thay thế."
  },
  {
    id: 17,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Tại sao cần hiểu giới hạn của AI?",
    options: [
      "Để sử dụng AI đúng cách và an toàn",
      "Không cần hiểu, chỉ cần dùng",
      "AI không có giới hạn",
      "Để chê bai AI"
    ],
    answer: 0,
    explanation: "Hiểu giới hạn giúp sử dụng AI hiệu quả và tránh rủi ro."
  },
  {
    id: 18,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Kỹ năng nào quan trọng nhất khi làm việc với AI?",
    options: [
      "Tư duy phản biện",
      "Tin tưởng tuyệt đối",
      "Phụ thuộc hoàn toàn",
      "Không cần kỹ năng"
    ],
    answer: 0,
    explanation: "Tư duy phản biện là kỹ năng cốt lõi khi làm việc với AI."
  },
  {
    id: 19,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "AI Bias là gì?",
    options: [
      "Thiên lệch trong dữ liệu dẫn đến kết quả sai lệch",
      "AI bị lỗi",
      "AI có quan điểm riêng",
      "AI có cảm xúc"
    ],
    answer: 0,
    explanation: "Bias là sự thiên lệch từ dữ liệu huấn luyện, gây ra kết quả không công bằng."
  },
  {
    id: 20,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Cách tốt nhất để giảm thiểu rủi ro từ AI là gì?",
    options: [
      "Kiểm chứng kết quả và sử dụng đúng mục đích",
      "Không sử dụng AI",
      "Tin hoàn toàn vào AI",
      "Sử dụng AI cho mọi việc"
    ],
    answer: 0,
    explanation: "Kiểm chứng và sử dụng đúng mục đích giảm thiểu rủi ro."
  },
  {
    id: 21,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Vai trò của con người trong vòng đời của AI là gì?",
    options: [
      "Giám sát, đánh giá và cải thiện",
      "Chỉ sử dụng kết quả",
      "Không tham gia",
      "Tin tưởng tuyệt đối"
    ],
    answer: 0,
    explanation: "Con người đóng vai trò giám sát và cải thiện trong vòng đời AI."
  },
  {
    id: 22,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "AI có thể hiểu được ngữ cảnh văn hóa và xã hội như con người không?",
    options: [
      "Không, AI còn hạn chế trong việc hiểu ngữ cảnh phức tạp",
      "Có, AI hiểu mọi thứ",
      "Có thể một phần",
      "Tùy vào loại AI"
    ],
    answer: 0,
    explanation: "AI hiểu ngữ cảnh có giới hạn và cần con người kiểm chứng."
  },
  {
    id: 23,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Tại sao các doanh nghiệp cần đào tạo AI Literacy cho nhân viên?",
    options: [
      "Để sử dụng AI hiệu quả và an toàn",
      "Để thay thế nhân viên",
      "Để tốn thời gian",
      "Không cần thiết"
    ],
    answer: 0,
    explanation: "AI Literacy giúp nhân viên sử dụng AI đúng cách và an toàn."
  },
  {
    id: 24,
    competency: 1,
    level: "medium",
    category: "MINDSET",
    type: "single",
    question: "Điều nào quan trọng khi đánh giá kết quả từ AI?",
    options: [
      "Xem xét tính logic và thực tế",
      "Chấp nhận ngay",
      "Không cần kiểm tra",
      "Tin vào AI"
    ],
    answer: 0,
    explanation: "Luôn cần đánh giá tính logic và thực tế của kết quả AI."
  },

  // Hard (11 câu)
  {
    id: 25,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "Trong bối cảnh AI, 'Explainability' (khả năng giải thích) có nghĩa là gì?",
    options: [
      "Khả năng hiểu và giải thích cách AI đưa ra quyết định",
      "AI có thể nói chuyện",
      "AI giải thích mọi thứ",
      "AI làm việc minh bạch"
    ],
    answer: 0,
    explanation: "Explainability là khả năng hiểu và giải thích quá trình ra quyết định của AI."
  },
  {
    id: 26,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "Khi nào con người nên can thiệp vào quá trình AI?",
    options: [
      "Khi có dấu hiệu bất thường hoặc rủi ro cao",
      "Không bao giờ",
      "Luôn luôn",
      "Chỉ khi AI yêu cầu"
    ],
    answer: 0,
    explanation: "Can thiệp khi phát hiện bất thường hoặc tình huống rủi ro cao."
  },
  {
    id: 27,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "AI Alignment là gì?",
    options: [
      "Đảm bảo AI hoạt động phù hợp với giá trị và mục tiêu con người",
      "AI tự điều chỉnh",
      "AI đồng bộ hóa",
      "AI kết nối với nhau"
    ],
    answer: 0,
    explanation: "AI Alignment đảm bảo AI hoạt động vì lợi ích và giá trị của con người."
  },
  {
    id: 28,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "Trong Human-AI Collaboration, nguyên tắc 'Human-in-the-loop' là gì?",
    options: [
      "Con người luôn tham gia và phê duyệt các quyết định quan trọng",
      "AI làm mọi việc",
      "Con người không tham gia",
      "AI tự quyết định"
    ],
    answer: 0,
    explanation: "Human-in-the-loop đảm bảo con người giám sát và phê duyệt các quyết định quan trọng."
  },
  {
    id: 29,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "Làm thế nào để xây dựng văn hóa AI trong doanh nghiệp?",
    options: [
      "Đào tạo, thử nghiệm và khuyến khích sử dụng AI đúng cách",
      "Bắt buộc sử dụng AI",
      "Không cần đào tạo",
      "Chỉ người có chuyên môn mới dùng AI"
    ],
    answer: 0,
    explanation: "Văn hóa AI được xây dựng qua đào tạo, thử nghiệm và khuyến khích."
  },
  {
    id: 30,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "AI Trust (niềm tin vào AI) cần dựa trên điều gì?",
    options: [
      "Minh bạch, độ tin cậy và hiệu quả thực tế",
      "Lòng tin mù quáng",
      "Sự phổ biến",
      "Lời quảng cáo"
    ],
    answer: 0,
    explanation: "Niềm tin vào AI cần dựa trên minh bạch, độ tin cậy và hiệu quả thực tế."
  },
  {
    id: 31,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "Khi AI đưa ra kết luận trái ngược với kinh nghiệm của bạn, bạn nên làm gì?",
    options: [
      "Phân tích nguyên nhân và đánh giá lại dữ liệu",
      "Tin vào AI",
      "Bỏ qua AI",
      "Chấp nhận kết luận của AI"
    ],
    answer: 0,
    explanation: "Khi có mâu thuẫn, cần phân tích nguyên nhân và đánh giá lại dữ liệu."
  },
  {
    id: 32,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "AI Agency là gì trong bối cảnh công việc?",
    options: [
      "Khả năng AI tự động thực hiện các tác vụ được ủy quyền",
      "AI có quyền lực",
      "AI tự quyết định",
      "AI thay thế con người"
    ],
    answer: 0,
    explanation: "Agency là khả năng AI thực hiện các tác vụ được ủy quyền một cách tự động."
  },
  {
    id: 33,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "Đâu là thách thức lớn nhất khi tích hợp AI vào doanh nghiệp?",
    options: [
      "Sự thay đổi văn hóa và quy trình làm việc",
      "Chi phí phần cứng",
      "Thiếu công cụ",
      "Vấn đề bảo mật"
    ],
    answer: 0,
    explanation: "Thách thức lớn nhất thường là sự thay đổi văn hóa và quy trình, không phải kỹ thuật."
  },
  {
    id: 34,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "AI Augmentation khác với AI Automation như thế nào?",
    options: [
      "Augmentation hỗ trợ con người, Automation thay thế tác vụ lặp lại",
      "Giống nhau",
      "Automation hỗ trợ, Augmentation thay thế",
      "Không liên quan"
    ],
    answer: 0,
    explanation: "Augmentation tăng cường năng lực con người, Automation tự động hóa tác vụ."
  },
  {
    id: 35,
    competency: 1,
    level: "hard",
    category: "MINDSET",
    type: "single",
    question: "Nguyên tắc nào giúp đảm bảo sử dụng AI có trách nhiệm?",
    options: [
      "Minh bạch, công bằng, an toàn và trách nhiệm giải trình",
      "Hiệu quả cao nhất",
      "Chi phí thấp nhất",
      "Tốc độ nhanh nhất"
    ],
    answer: 0,
    explanation: "Sử dụng AI có trách nhiệm cần dựa trên minh bạch, công bằng, an toàn và trách nhiệm."
  }
];

// ============================================================
// 3. COMPETENCY 2 — COMMUNICATE WITH AI (40 câu)
// ============================================================
const COMPETENCY_2 = [
  // Easy (13 câu)
  {
    id: 36,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ giao tiếp bằng cách nào?",
    options: [
      "Soạn thảo email, tin nhắn và tài liệu",
      "Thay thế hoàn toàn giao tiếp",
      "Loại bỏ nhu cầu giao tiếp",
      "Tự động trả lời mọi tin nhắn"
    ],
    answer: 0,
    explanation: "AI hỗ trợ soạn thảo và cải thiện chất lượng giao tiếp."
  },
  {
    id: 37,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể điều chỉnh giọng văn (Tone of Voice) như thế nào?",
    options: [
      "Thay đổi cách diễn đạt phù hợp với đối tượng và mục đích",
      "Chỉ viết một giọng duy nhất",
      "Không thể điều chỉnh",
      "Tự động thay đổi màu sắc"
    ],
    answer: 0,
    explanation: "AI có thể điều chỉnh giọng văn để phù hợp với đối tượng và mục đích."
  },
  {
    id: 38,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi viết email chuyên nghiệp, AI có thể giúp gì?",
    options: [
      "Tạo bản nháp, đề xuất tiêu đề và chỉnh sửa ngữ pháp",
      "Tự động gửi email",
      "Thay thế người viết",
      "Không hỗ trợ được gì"
    ],
    answer: 0,
    explanation: "AI giúp tạo và cải thiện chất lượng email chuyên nghiệp."
  },
  {
    id: 39,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ dịch thuật như thế nào?",
    options: [
      "Dịch văn bản giữa nhiều ngôn ngữ",
      "Dịch thay con người",
      "Không hỗ trợ dịch",
      "Chỉ dịch tiếng Anh"
    ],
    answer: 0,
    explanation: "AI hỗ trợ dịch thuật đa ngôn ngữ nhanh chóng."
  },
  {
    id: 40,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "Lợi ích của việc dùng AI để tóm tắt văn bản là gì?",
    options: [
      "Tiết kiệm thời gian đọc và nắm ý chính nhanh",
      "Tóm tắt thay con người",
      "Không cần đọc nữa",
      "Mất thời gian hơn"
    ],
    answer: 0,
    explanation: "Tóm tắt giúp tiết kiệm thời gian và nắm được ý chính nhanh chóng."
  },
  {
    id: 41,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể viết báo cáo không?",
    options: [
      "Có, AI có thể tạo báo cáo từ dữ liệu đầu vào",
      "Không, báo cáo cần con người",
      "Chỉ viết được một phần",
      "Tùy thuộc vào báo cáo"
    ],
    answer: 0,
    explanation: "AI có thể tạo báo cáo từ dữ liệu đầu vào và hướng dẫn của con người."
  },
  {
    id: 42,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi AI hỗ trợ viết, vai trò của con người là gì?",
    options: [
      "Kiểm tra, chỉnh sửa và phê duyệt nội dung",
      "Để AI làm mọi việc",
      "Không cần tham gia",
      "Chỉ đọc kết quả"
    ],
    answer: 0,
    explanation: "Con người giữ vai trò kiểm tra và phê duyệt nội dung cuối cùng."
  },
  {
    id: 43,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ ghi chú cuộc họp không?",
    options: [
      "Có, ghi chép và tóm tắt nội dung cuộc họp",
      "Không, chỉ con người mới ghi chép được",
      "Chỉ ghi âm được",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI có thể ghi chép và tóm tắt nội dung cuộc họp hiệu quả."
  },
  {
    id: 44,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "Điều nào quan trọng khi sử dụng AI để viết?",
    options: [
      "Cung cấp hướng dẫn và bối cảnh rõ ràng",
      "Để AI tự viết",
      "Không cần kiểm tra",
      "Tin vào kết quả"
    ],
    answer: 0,
    explanation: "Cần hướng dẫn rõ ràng để AI cho kết quả tốt."
  },
  {
    id: 45,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể giúp cải thiện kỹ năng viết của bạn không?",
    options: [
      "Có, bằng cách gợi ý và sửa lỗi",
      "Không, viết là kỹ năng cá nhân",
      "Chỉ sửa lỗi chính tả",
      "Tùy thuộc vào AI"
    ],
    answer: 0,
    explanation: "AI giúp cải thiện kỹ năng viết qua gợi ý và sửa lỗi."
  },
  {
    id: 46,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết blog không?",
    options: [
      "Có, đề xuất ý tưởng và viết bản nháp",
      "Không, blog cần sáng tạo",
      "Chỉ viết được một phần",
      "Tùy vào chủ đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đề xuất ý tưởng và viết bản nháp cho blog."
  },
  {
    id: 47,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi AI sửa lỗi ngữ pháp, bạn nên làm gì?",
    options: [
      "Xem xét và quyết định có chấp nhận hay không",
      "Luôn chấp nhận",
      "Luôn từ chối",
      "Không kiểm tra"
    ],
    answer: 0,
    explanation: "Cần xem xét quyết định chấp nhận hay từ chối đề xuất của AI."
  },
  {
    id: 48,
    competency: 2,
    level: "easy",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết phản hồi cho khách hàng không?",
    options: [
      "Có, tạo bản nháp phản hồi nhanh",
      "Không, phản hồi cần cá nhân hóa",
      "Chỉ cho email",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI có thể tạo bản nháp phản hồi để con người tùy chỉnh thêm."
  },

  // Medium (13 câu)
  {
    id: 49,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "Làm thế nào để AI viết email có giọng văn phù hợp với văn hóa doanh nghiệp?",
    options: [
      "Cung cấp mẫu email và hướng dẫn cụ thể",
      "Để AI tự học",
      "Không cần điều chỉnh",
      "Chỉ viết một phong cách"
    ],
    answer: 0,
    explanation: "Cần cung cấp mẫu và hướng dẫn để AI tạo nội dung phù hợp."
  },
  {
    id: 50,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể giúp viết báo cáo tài chính không?",
    options: [
      "Có, tổng hợp dữ liệu và tạo báo cáo sơ bộ",
      "Không, tài chính cần chuyên gia",
      "Chỉ cho số liệu",
      "Tùy thuộc vào AI"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tổng hợp dữ liệu, nhưng cần chuyên gia kiểm tra."
  },
  {
    id: 51,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi AI gợi ý nội dung không phù hợp, bạn nên làm gì?",
    options: [
      "Điều chỉnh prompt và cung cấp thêm bối cảnh",
      "Chấp nhận gợi ý",
      "Bỏ qua AI",
      "Đổ lỗi cho AI"
    ],
    answer: 0,
    explanation: "Điều chỉnh prompt và cung cấp thêm thông tin để có kết quả tốt hơn."
  },
  {
    id: 52,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết nội dung marketing như thế nào?",
    options: [
      "Đề xuất ý tưởng, viết bản nháp và tối ưu SEO",
      "Tự động đăng bài",
      "Thay thế marketer",
      "Chỉ viết tiêu đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đa dạng trong nội dung marketing từ ý tưởng đến tối ưu."
  },
  {
    id: 53,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "Tại sao cần cá nhân hóa nội dung do AI tạo ra?",
    options: [
      "Để phù hợp với đối tượng và bối cảnh cụ thể",
      "Không cần, AI đã làm tốt",
      "Chỉ cần thay tên",
      "Không cần thiết"
    ],
    answer: 0,
    explanation: "Cá nhân hóa giúp nội dung phù hợp hơn với đối tượng mục tiêu."
  },
  {
    id: 54,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể giúp viết kịch bản thuyết trình không?",
    options: [
      "Có, tạo dàn ý và nội dung chính",
      "Không, thuyết trình cần kỹ năng",
      "Chỉ viết được một phần",
      "Tùy vào chủ đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo dàn ý và nội dung cơ bản cho thuyết trình."
  },
  {
    id: 55,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "Điều gì ảnh hưởng đến chất lượng nội dung do AI tạo ra?",
    options: [
      "Chất lượng prompt và dữ liệu đầu vào",
      "Ngày trong tuần",
      "Màu sắc giao diện",
      "Thời tiết"
    ],
    answer: 0,
    explanation: "Chất lượng đầu vào quyết định chất lượng đầu ra của AI."
  },
  {
    id: 56,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết hợp đồng hoặc văn bản pháp lý không?",
    options: [
      "Hỗ trợ tạo bản nháp, nhưng cần luật sư kiểm tra",
      "Có, AI thay thế luật sư",
      "Không, không được phép",
      "Chỉ cho mẫu đơn giản"
    ],
    answer: 0,
    explanation: "AI chỉ hỗ trợ bản nháp, cần chuyên gia pháp lý kiểm tra."
  },
  {
    id: 57,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "Lợi ích của việc dùng AI để viết nội dung đa ngôn ngữ là gì?",
    options: [
      "Tiếp cận nhiều đối tượng hơn với chi phí thấp",
      "Thay thế phiên dịch viên",
      "Không cần kiểm tra",
      "Nhanh và rẻ"
    ],
    answer: 0,
    explanation: "AI giúp tạo nội dung đa ngôn ngữ để tiếp cận nhiều đối tượng hơn."
  },
  {
    id: 58,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi AI tạo ra nội dung dài, bạn nên làm gì?",
    options: [
      "Kiểm tra tính logic và chỉnh sửa cho mạch lạc",
      "Đăng ngay",
      "Không cần chỉnh sửa",
      "Tin vào AI"
    ],
    answer: 0,
    explanation: "Cần kiểm tra và chỉnh sửa để đảm bảo tính mạch lạc."
  },
  {
    id: 59,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết mô tả sản phẩm không?",
    options: [
      "Có, tạo mô tả từ thông tin sản phẩm",
      "Không, cần trải nghiệm thực tế",
      "Chỉ cho sản phẩm số",
      "Tùy vào sản phẩm"
    ],
    answer: 0,
    explanation: "AI có thể tạo mô tả sản phẩm từ thông tin và đặc điểm sản phẩm."
  },
  {
    id: 60,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "Tại sao cần đa dạng hóa nội dung khi sử dụng AI?",
    options: [
      "Tránh lặp lại và nhàm chán cho độc giả",
      "AI không đa dạng được",
      "Không cần đa dạng",
      "Chỉ cần một phong cách"
    ],
    answer: 0,
    explanation: "Đa dạng hóa giúp nội dung thú vị và tránh nhàm chán."
  },
  {
    id: 61,
    competency: 2,
    level: "medium",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết nội dung cho mạng xã hội không?",
    options: [
      "Có, tạo bài đăng theo nhiều định dạng và giọng văn",
      "Không, mạng xã hội cần con người",
      "Chỉ cho Facebook",
      "Tùy vào nền tảng"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo nội dung cho các nền tảng mạng xã hội khác nhau."
  },

  // Hard (14 câu)
  {
    id: 62,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Chiến lược nào giúp AI viết nội dung có tính thuyết phục cao?",
    options: [
      "Kết hợp dữ liệu, câu chuyện và cấu trúc logic",
      "Chỉ dùng số liệu",
      "Chỉ dùng cảm xúc",
      "Viết thật dài"
    ],
    answer: 0,
    explanation: "Nội dung thuyết phục cần kết hợp dữ liệu, câu chuyện và logic."
  },
  {
    id: 63,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Làm thế nào để AI viết được nội dung mang đậm bản sắc thương hiệu?",
    options: [
      "Xây dựng style guide và cung cấp mẫu nội dung",
      "Để AI tự học",
      "Chỉ cần logo",
      "Không cần hướng dẫn"
    ],
    answer: 0,
    explanation: "Cần cung cấp style guide và mẫu nội dung để AI học bản sắc thương hiệu."
  },
  {
    id: 64,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi sử dụng AI để viết nội dung nhạy cảm, cần lưu ý gì?",
    options: [
      "Kiểm tra kỹ lưỡng và đảm bảo tính nhạy cảm văn hóa",
      "Tin vào AI",
      "Không cần kiểm tra",
      "Viết nhanh để kịp"
    ],
    answer: 0,
    explanation: "Nội dung nhạy cảm cần kiểm tra kỹ về văn hóa và xã hội."
  },
  {
    id: 65,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể tạo ra nội dung sáng tạo vượt ngoài khuôn mẫu không?",
    options: [
      "Có, nhưng cần hướng dẫn và phản hồi từ con người",
      "Không, chỉ lặp lại",
      "Tùy thuộc vào AI",
      "Không cần con người"
    ],
    answer: 0,
    explanation: "AI có thể sáng tạo nhưng cần hướng dẫn và phản hồi từ con người."
  },
  {
    id: 66,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Nguyên tắc nào quan trọng khi AI hỗ trợ viết nội dung quảng cáo?",
    options: [
      "Trung thực và tuân thủ quy định quảng cáo",
      "Chỉ cần hấp dẫn",
      "Không cần kiểm tra",
      "Tự do sáng tạo"
    ],
    answer: 0,
    explanation: "Nội dung quảng cáo cần trung thực và tuân thủ quy định."
  },
  {
    id: 67,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Làm thế nào để tối ưu nội dung AI cho SEO?",
    options: [
      "Kết hợp từ khóa, cấu trúc và giá trị nội dung",
      "Chỉ cần nhiều từ khóa",
      "Viết dài",
      "Không cần tối ưu"
    ],
    answer: 0,
    explanation: "SEO hiệu quả cần kết hợp từ khóa, cấu trúc và giá trị nội dung."
  },
  {
    id: 68,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết kịch bản video như thế nào?",
    options: [
      "Tạo cấu trúc, nhân vật và thoại từ ý tưởng",
      "Quay video thay người",
      "Chỉ viết intro",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo cấu trúc và nội dung kịch bản video."
  },
  {
    id: 69,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi AI viết nội dung có lỗi thực tế, cách xử lý nào tốt nhất?",
    options: [
      "Kiểm tra nguồn và sửa chữa thông tin",
      "Giữ nguyên",
      "Tin vào AI",
      "Xóa bỏ nội dung"
    ],
    answer: 0,
    explanation: "Cần kiểm tra nguồn và sửa chữa thông tin sai lệch."
  },
  {
    id: 70,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Làm thế nào để duy trì tính nhất quán khi dùng AI viết loạt bài?",
    options: [
      "Xây dựng hệ thống guideline và template",
      "Viết mỗi bài khác nhau",
      "Không cần nhất quán",
      "Chỉ dùng một AI"
    ],
    answer: 0,
    explanation: "Cần guideline và template để duy trì tính nhất quán."
  },
  {
    id: 71,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể thay thế hoàn toàn người viết nội dung không?",
    options: [
      "Không, AI cần con người kiểm soát và sáng tạo",
      "Có, AI làm được mọi việc",
      "Có thể một phần",
      "Đang phát triển"
    ],
    answer: 0,
    explanation: "AI là công cụ hỗ trợ, không thay thế hoàn toàn người viết."
  },
  {
    id: 72,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Yếu tố nào giúp AI viết được nội dung cảm xúc và đồng cảm?",
    options: [
      "Cung cấp ngữ cảnh và mục tiêu cảm xúc rõ ràng",
      "AI tự có cảm xúc",
      "Không thể viết được",
      "Chỉ cần từ ngữ"
    ],
    answer: 0,
    explanation: "Cần cung cấp ngữ cảnh và mục tiêu cảm xúc để AI viết phù hợp."
  },
  {
    id: 73,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "AI có thể hỗ trợ viết nội dung đa kênh như thế nào?",
    options: [
      "Tối ưu hóa nội dung cho từng kênh riêng biệt",
      "Viết một nội dung cho tất cả",
      "Không hỗ trợ",
      "Chỉ viết cho web"
    ],
    answer: 0,
    explanation: "AI có thể tối ưu nội dung cho từng kênh truyền thông khác nhau."
  },
  {
    id: 74,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Khi AI đề xuất thay đổi phong cách viết, bạn nên làm gì?",
    options: [
      "Đánh giá phù hợp với đối tượng và mục đích",
      "Luôn chấp nhận",
      "Luôn từ chối",
      "Không cần đánh giá"
    ],
    answer: 0,
    explanation: "Cần đánh giá xem thay đổi có phù hợp với đối tượng không."
  },
  {
    id: 75,
    competency: 2,
    level: "hard",
    category: "COMMUNICATION",
    type: "single",
    question: "Lợi ích của việc tích hợp AI vào quy trình sản xuất nội dung là gì?",
    options: [
      "Tăng tốc độ và khả năng mở rộng sản xuất nội dung",
      "Giảm chất lượng",
      "Thay thế đội ngũ",
      "Không có lợi ích"
    ],
    answer: 0,
    explanation: "AI giúp tăng tốc và mở rộng quy mô sản xuất nội dung."
  }
];

// ============================================================
// 4. COMPETENCY 3 — RESEARCH WITH AI (35 câu)
// ============================================================
const COMPETENCY_3 = [
  // Easy (12 câu)
  {
    id: 76,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ tìm kiếm thông tin như thế nào?",
    options: [
      "Tìm kiếm, tổng hợp và sắp xếp thông tin từ nhiều nguồn",
      "Thay thế hoàn toàn tìm kiếm",
      "Chỉ tìm kiếm trên Google",
      "Không hỗ trợ tìm kiếm"
    ],
    answer: 0,
    explanation: "AI giúp tìm kiếm và tổng hợp thông tin hiệu quả."
  },
  {
    id: 77,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể tổng hợp nhiều tài liệu thành báo cáo không?",
    options: [
      "Có, tổng hợp và trích xuất ý chính",
      "Không, cần con người",
      "Chỉ tổng hợp được một phần",
      "Tùy thuộc vào tài liệu"
    ],
    answer: 0,
    explanation: "AI có thể tổng hợp và trích xuất ý chính từ nhiều tài liệu."
  },
  {
    id: 78,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "Khi sử dụng AI để nghiên cứu, điều quan trọng nhất là gì?",
    options: [
      "Kiểm tra độ tin cậy của thông tin",
      "Tin vào mọi thông tin",
      "Không cần kiểm tra nguồn",
      "Chấp nhận mọi kết quả"
    ],
    answer: 0,
    explanation: "Luôn cần kiểm tra độ tin cậy của thông tin từ AI."
  },
  {
    id: 79,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ kiểm chứng thông tin như thế nào?",
    options: [
      "So sánh và đối chiếu với nhiều nguồn khác nhau",
      "Tự xác nhận mọi thông tin",
      "Không thể kiểm chứng",
      "Chỉ kiểm tra chính tả"
    ],
    answer: 0,
    explanation: "AI giúp so sánh và đối chiếu thông tin từ nhiều nguồn."
  },
  {
    id: 80,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể giúp trích xuất kiến thức từ tài liệu không?",
    options: [
      "Có, trích xuất thông tin quan trọng",
      "Không, chỉ đọc được",
      "Chỉ trích xuất được một phần",
      "Tùy thuộc vào tài liệu"
    ],
    answer: 0,
    explanation: "AI có thể trích xuất và tổ chức thông tin quan trọng từ tài liệu."
  },
  {
    id: 81,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ học tập như thế nào?",
    options: [
      "Giải thích khái niệm, tạo câu hỏi và tóm tắt",
      "Học thay con người",
      "Chỉ tìm tài liệu",
      "Không hỗ trợ học tập"
    ],
    answer: 0,
    explanation: "AI hỗ trợ học tập qua giải thích, tạo câu hỏi và tóm tắt."
  },
  {
    id: 82,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "Lợi ích của việc dùng AI trong nghiên cứu là gì?",
    options: [
      "Tiết kiệm thời gian và tăng hiệu quả",
      "Thay thế hoàn toàn nghiên cứu",
      "Không có lợi ích",
      "Làm chậm quá trình"
    ],
    answer: 0,
    explanation: "AI giúp tiết kiệm thời gian và tăng hiệu quả nghiên cứu."
  },
  {
    id: 83,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể tạo câu hỏi ôn tập từ tài liệu không?",
    options: [
      "Có, tạo câu hỏi từ nội dung tài liệu",
      "Không, cần giáo viên",
      "Chỉ tạo được một ít",
      "Tùy vào tài liệu"
    ],
    answer: 0,
    explanation: "AI có thể tạo câu hỏi ôn tập từ nội dung tài liệu."
  },
  {
    id: 84,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ so sánh các nghiên cứu không?",
    options: [
      "Có, so sánh phương pháp và kết luận",
      "Không, mỗi nghiên cứu khác nhau",
      "Chỉ so sánh số liệu",
      "Tùy thuộc vào nghiên cứu"
    ],
    answer: 0,
    explanation: "AI có thể so sánh phương pháp và kết luận của các nghiên cứu."
  },
  {
    id: 85,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "Khi AI cung cấp thông tin không rõ nguồn, bạn nên làm gì?",
    options: [
      "Tìm kiếm nguồn gốc hoặc kiểm tra với nguồn khác",
      "Chấp nhận ngay",
      "Bỏ qua thông tin",
      "Tin vào AI"
    ],
    answer: 0,
    explanation: "Cần tìm nguồn gốc hoặc kiểm tra với nguồn khác khi thông tin không rõ."
  },
  {
    id: 86,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể giúp tổ chức tài liệu tham khảo không?",
    options: [
      "Có, tạo danh sách và trích dẫn tự động",
      "Không, cần quản lý thủ công",
      "Chỉ tạo danh sách",
      "Tùy thuộc vào tài liệu"
    ],
    answer: 0,
    explanation: "AI có thể tạo danh sách và trích dẫn tự động cho tài liệu tham khảo."
  },
  {
    id: 87,
    competency: 3,
    level: "easy",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ đọc hiểu văn bản học thuật không?",
    options: [
      "Có, tóm tắt và giải thích thuật ngữ",
      "Không, văn bản học thuật quá phức tạp",
      "Chỉ tóm tắt được",
      "Tùy vào văn bản"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đọc hiểu qua tóm tắt và giải thích thuật ngữ."
  },

  // Medium (12 câu)
  {
    id: 88,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "Làm thế nào để AI tổng hợp thông tin chính xác từ nhiều nguồn?",
    options: [
      "Cung cấp tài liệu chất lượng và hướng dẫn cụ thể",
      "Để AI tự làm",
      "Không cần hướng dẫn",
      "Chỉ dùng một nguồn"
    ],
    answer: 0,
    explanation: "Cần cung cấp tài liệu chất lượng và hướng dẫn rõ ràng."
  },
  {
    id: 89,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể phát hiện thông tin sai lệch như thế nào?",
    options: [
      "So sánh với nhiều nguồn và phát hiện mâu thuẫn",
      "Tự phát hiện mọi sai lệch",
      "Không thể phát hiện",
      "Chỉ kiểm tra ngữ pháp"
    ],
    answer: 0,
    explanation: "AI phát hiện sai lệch qua so sánh và tìm mâu thuẫn giữa các nguồn."
  },
  {
    id: 90,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "Khi AI tóm tắt tài liệu bỏ qua thông tin quan trọng, bạn nên làm gì?",
    options: [
      "Đọc kỹ lại và yêu cầu tóm tắt bổ sung",
      "Chấp nhận tóm tắt",
      "Không cần kiểm tra",
      "Tự tóm tắt lại"
    ],
    answer: 0,
    explanation: "Cần kiểm tra và yêu cầu tóm tắt bổ sung nếu thiếu thông tin."
  },
  {
    id: 91,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ nghiên cứu khoa học như thế nào?",
    options: [
      "Tìm kiếm tài liệu, tổng hợp và phân tích dữ liệu",
      "Thực hiện thí nghiệm thay người",
      "Chỉ tìm tài liệu",
      "Viết báo cáo thay người"
    ],
    answer: 0,
    explanation: "AI hỗ trợ nghiên cứu qua tìm kiếm, tổng hợp và phân tích dữ liệu."
  },
  {
    id: 92,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "Tại sao cần trích dẫn nguồn khi sử dụng AI trong nghiên cứu?",
    options: [
      "Đảm bảo tính minh bạch và trung thực",
      "Không cần trích dẫn",
      "Chỉ trích dẫn cho đẹp",
      "Trích dẫn làm mất thời gian"
    ],
    answer: 0,
    explanation: "Trích dẫn đảm bảo minh bạch và trung thực trong nghiên cứu."
  },
  {
    id: 93,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể giúp phân tích dữ liệu trong nghiên cứu không?",
    options: [
      "Có, xử lý và phân tích dữ liệu lớn",
      "Không, cần phần mềm chuyên dụng",
      "Chỉ xử lý số liệu",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể xử lý và phân tích dữ liệu lớn trong nghiên cứu."
  },
  {
    id: 94,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "Điều gì cần lưu ý khi AI tổng hợp kiến thức từ internet?",
    options: [
      "Kiểm tra độ tin cậy và cập nhật của nguồn",
      "Tin vào mọi thông tin",
      "Không cần kiểm tra",
      "Chỉ tin nguồn tiếng Anh"
    ],
    answer: 0,
    explanation: "Cần kiểm tra độ tin cậy và cập nhật của nguồn thông tin."
  },
  {
    id: 95,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ viết luận văn không?",
    options: [
      "Hỗ trợ tìm tài liệu và cấu trúc, nhưng cần viết thực tế",
      "Viết thay hoàn toàn",
      "Không được phép",
      "Chỉ tìm tài liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tìm tài liệu và cấu trúc, nhưng người học vẫn cần viết."
  },
  {
    id: 96,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "Lợi ích của AI trong nghiên cứu thị trường là gì?",
    options: [
      "Phân tích xu hướng và hành vi khách hàng nhanh hơn",
      "Thay thế khảo sát",
      "Chỉ tổng hợp số liệu",
      "Không có lợi ích"
    ],
    answer: 0,
    explanation: "AI giúp phân tích xu hướng và hành vi khách hàng nhanh chóng."
  },
  {
    id: 97,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ đánh giá chất lượng tài liệu không?",
    options: [
      "Có, đánh giá dựa trên tiêu chí uy tín",
      "Không, cần chuyên gia",
      "Chỉ đánh giá số lượng",
      "Tùy vào tài liệu"
    ],
    answer: 0,
    explanation: "AI có thể đánh giá chất lượng tài liệu dựa trên các tiêu chí uy tín."
  },
  {
    id: 98,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "Khi nghiên cứu, AI có thể giúp đặt câu hỏi như thế nào?",
    options: [
      "Tạo câu hỏi dựa trên nội dung đã đọc",
      "Hỏi thay con người",
      "Không cần đặt câu hỏi",
      "Chỉ đặt câu hỏi chung chung"
    ],
    answer: 0,
    explanation: "AI có thể tạo câu hỏi dựa trên nội dung để hỗ trợ nghiên cứu."
  },
  {
    id: 99,
    competency: 3,
    level: "medium",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ phát hiện xu hướng nghiên cứu mới không?",
    options: [
      "Có, phân tích dữ liệu và nhận diện mẫu",
      "Không, xu hướng cần con người",
      "Chỉ phân tích dữ liệu",
      "Tùy vào lĩnh vực"
    ],
    answer: 0,
    explanation: "AI có thể phân tích dữ liệu để nhận diện xu hướng nghiên cứu mới."
  },

  // Hard (11 câu)
  {
    id: 100,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "Chiến lược nào giúp AI hỗ trợ nghiên cứu tổng quan (literature review)?",
    options: [
      "Tìm kiếm có hệ thống, tổng hợp và trích xuất ý chính",
      "Đọc tất cả tài liệu",
      "Chỉ tìm bài báo mới",
      "Tổng hợp ngẫu nhiên"
    ],
    answer: 0,
    explanation: "Cần tìm kiếm có hệ thống và tổng hợp để làm literature review."
  },
  {
    id: 101,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "Làm thế nào để AI tránh thiên vị khi tổng hợp thông tin?",
    options: [
      "Sử dụng đa dạng nguồn và kiểm tra chéo",
      "Chỉ dùng một nguồn",
      "Tin vào nguồn phổ biến",
      "Không cần kiểm tra"
    ],
    answer: 0,
    explanation: "Cần đa dạng hóa nguồn và kiểm tra chéo để tránh thiên vị."
  },
  {
    id: 102,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ viết đề cương nghiên cứu như thế nào?",
    options: [
      "Tạo cấu trúc và đề xuất nội dung dựa trên mục tiêu",
      "Viết thay hoàn toàn",
      "Không hỗ trợ",
      "Chỉ tạo cấu trúc"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo cấu trúc và đề xuất nội dung cho đề cương."
  },
  {
    id: 103,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "Khi AI phát hiện mâu thuẫn giữa các nguồn, bạn nên làm gì?",
    options: [
      "Phân tích sâu hơn và tìm nguyên nhân",
      "Chọn nguồn mình thích",
      "Bỏ qua mâu thuẫn",
      "Tin vào nguồn mới nhất"
    ],
    answer: 0,
    explanation: "Cần phân tích sâu để hiểu nguyên nhân của mâu thuẫn."
  },
  {
    id: 104,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ nghiên cứu định tính (qualitative research) không?",
    options: [
      "Hỗ trợ phân tích văn bản và trích xuất chủ đề",
      "Không, chỉ nghiên cứu định lượng",
      "Chỉ phân tích số liệu",
      "Tùy vào phương pháp"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích văn bản và trích xuất chủ đề cho nghiên cứu định tính."
  },
  {
    id: 105,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "Làm thế nào để đảm bảo AI tổng hợp được kiến thức chuyên sâu?",
    options: [
      "Cung cấp tài liệu chuyên ngành và hướng dẫn cụ thể",
      "Để AI tự học",
      "Chỉ dùng wikipedia",
      "Không cần hướng dẫn"
    ],
    answer: 0,
    explanation: "Cần cung cấp tài liệu chuyên ngành và hướng dẫn cụ thể."
  },
  {
    id: 106,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể hỗ trợ phân tích sentiment (cảm xúc) trong nghiên cứu?",
    options: [
      "Có, phân tích cảm xúc từ văn bản",
      "Không, cảm xúc khó đo lường",
      "Chỉ phân tích từ ngữ",
      "Tùy thuộc vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể phân tích cảm xúc từ văn bản trong nghiên cứu."
  },
  {
    id: 107,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "Khi AI đề xuất kết luận không phù hợp với dữ liệu, bạn nên làm gì?",
    options: [
      "Phân tích lại dữ liệu và điều chỉnh phương pháp",
      "Chấp nhận kết luận",
      "Bỏ qua kết luận",
      "Sửa dữ liệu cho phù hợp"
    ],
    answer: 0,
    explanation: "Cần phân tích lại dữ liệu và điều chỉnh phương pháp nếu cần."
  },
  {
    id: 108,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "AI có thể giúp phát hiện gaps (khoảng trống) trong nghiên cứu không?",
    options: [
      "Có, phân tích tài liệu và nhận diện khoảng trống",
      "Không, cần chuyên gia",
      "Chỉ nhận diện được một phần",
      "Tùy vào lĩnh vực"
    ],
    answer: 0,
    explanation: "AI có thể phân tích tài liệu để nhận diện khoảng trống nghiên cứu."
  },
  {
    id: 109,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "Lợi ích của việc sử dụng AI trong nghiên cứu đa ngành là gì?",
    options: [
      "Kết nối thông tin giữa các ngành khác nhau",
      "Không có lợi ích",
      "Chỉ tổng hợp được một ngành",
      "Gây khó khăn"
    ],
    answer: 0,
    explanation: "AI giúp kết nối thông tin và tri thức giữa các ngành khác nhau."
  },
  {
    id: 110,
    competency: 3,
    level: "hard",
    category: "RESEARCH",
    type: "single",
    question: "Nguyên tắc nào quan trọng khi sử dụng AI trong nghiên cứu học thuật?",
    options: [
      "Minh bạch, trung thực và trích dẫn đầy đủ",
      "Sử dụng AI bí mật",
      "Không cần trích dẫn",
      "Chỉ trích dẫn khi cần"
    ],
    answer: 0,
    explanation: "Cần minh bạch, trung thực và trích dẫn đầy đủ khi sử dụng AI trong học thuật."
  }
];

// ============================================================
// 5. COMPETENCY 4 — OFFICE WITH AI (40 câu)
// ============================================================
const COMPETENCY_4 = [
  // Easy (13 câu)
  {
    id: 111,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ trong Word như thế nào?",
    options: [
      "Gợi ý nội dung, sửa lỗi và định dạng văn bản",
      "Tạo file Word tự động",
      "Thay thế người dùng",
      "Không hỗ trợ Word"
    ],
    answer: 0,
    explanation: "AI hỗ trợ soạn thảo và định dạng văn bản trong Word."
  },
  {
    id: 112,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp gì trong Excel?",
    options: [
      "Phân tích dữ liệu và tạo biểu đồ",
      "Tự động nhập dữ liệu",
      "Thay thế người dùng",
      "Không hỗ trợ Excel"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và tạo biểu đồ trong Excel."
  },
  {
    id: 113,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ tạo PowerPoint như thế nào?",
    options: [
      "Tạo slide và đề xuất bố cục",
      "Tự động tạo bài thuyết trình",
      "Thay thế người dùng",
      "Không hỗ trợ PowerPoint"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo slide và đề xuất bố cục trong PowerPoint."
  },
  {
    id: 114,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ trong Outlook như thế nào?",
    options: [
      "Tóm tắt email và đề xuất phản hồi",
      "Tự động gửi email",
      "Thay thế người dùng",
      "Không hỗ trợ Outlook"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tóm tắt và đề xuất phản hồi trong Outlook."
  },
  {
    id: 115,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "Microsoft Copilot là gì?",
    options: [
      "Trợ lý AI tích hợp trong Microsoft 365",
      "Một ngôn ngữ lập trình",
      "Phần mềm diệt virus",
      "Công cụ thiết kế"
    ],
    answer: 0,
    explanation: "Copilot là trợ lý AI tích hợp trong Microsoft 365."
  },
  {
    id: 116,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp tạo báo cáo tự động không?",
    options: [
      "Có, từ dữ liệu và mẫu có sẵn",
      "Không, cần làm thủ công",
      "Chỉ tạo được báo cáo đơn giản",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể tạo báo cáo tự động từ dữ liệu và mẫu."
  },
  {
    id: 117,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ dịch tài liệu Word không?",
    options: [
      "Có, dịch văn bản sang nhiều ngôn ngữ",
      "Không, chỉ dịch được tin nhắn",
      "Chỉ dịch được tiếng Anh",
      "Tùy vào tài liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ dịch văn bản trong Word sang nhiều ngôn ngữ."
  },
  {
    id: 118,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp phân tích dữ liệu trong Excel không?",
    options: [
      "Có, phát hiện xu hướng và đưa ra gợi ý",
      "Không, chỉ nhập dữ liệu được",
      "Chỉ phân tích số đơn giản",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích xu hướng và đưa ra gợi ý trong Excel."
  },
  {
    id: 119,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp thiết kế slide đẹp không?",
    options: [
      "Có, đề xuất bố cục và màu sắc",
      "Không, cần người thiết kế",
      "Chỉ tạo nội dung",
      "Tùy vào chủ đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đề xuất bố cục và màu sắc cho slide."
  },
  {
    id: 120,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp sắp xếp lịch trong Outlook không?",
    options: [
      "Có, đề xuất thời gian họp phù hợp",
      "Không, cần tự sắp xếp",
      "Chỉ thông báo lịch",
      "Tùy vào lịch"
    ],
    answer: 0,
    explanation: "AI có thể đề xuất thời gian họp phù hợp trong Outlook."
  },
  {
    id: 121,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ viết công thức Excel không?",
    options: [
      "Có, đề xuất và giải thích công thức",
      "Không, cần tự viết",
      "Chỉ sửa lỗi công thức",
      "Tùy vào công thức"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đề xuất và giải thích công thức Excel."
  },
  {
    id: 122,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể tạo bảng biểu từ văn bản không?",
    options: [
      "Có, chuyển đổi văn bản thành bảng",
      "Không, cần tạo thủ công",
      "Chỉ tạo được bảng đơn giản",
      "Tùy vào văn bản"
    ],
    answer: 0,
    explanation: "AI có thể chuyển đổi văn bản thành bảng trong Word/Excel."
  },
  {
    id: 123,
    competency: 4,
    level: "easy",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ tóm tắt tài liệu dài không?",
    options: [
      "Có, tóm tắt nội dung chính",
      "Không, chỉ đọc được",
      "Chỉ tóm tắt được một phần",
      "Tùy vào tài liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tóm tắt nội dung chính của tài liệu dài."
  },

  // Medium (14 câu)
  {
    id: 124,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "Làm thế nào để AI tạo báo cáo Excel chuyên nghiệp?",
    options: [
      "Cung cấp dữ liệu sạch và yêu cầu cụ thể",
      "Để AI tự làm",
      "Không cần định dạng",
      "Chỉ cần dữ liệu thô"
    ],
    answer: 0,
    explanation: "Cần dữ liệu sạch và yêu cầu cụ thể để AI tạo báo cáo tốt."
  },
  {
    id: 125,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp tự động hóa quy trình trong Office không?",
    options: [
      "Có, kết hợp AI với các công cụ tự động hóa",
      "Không, Office không hỗ trợ",
      "Chỉ tự động hóa được một phần",
      "Tùy vào công cụ"
    ],
    answer: 0,
    explanation: "AI có thể kết hợp với tự động hóa để tối ưu quy trình Office."
  },
  {
    id: 126,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ làm báo cáo tài chính trong Excel không?",
    options: [
      "Có, tính toán và trực quan hóa dữ liệu",
      "Không, tài chính cần chuyên gia",
      "Chỉ tính toán đơn giản",
      "Tùy vào báo cáo"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tính toán và trực quan hóa dữ liệu tài chính."
  },
  {
    id: 127,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp viết đề cương tài liệu dài không?",
    options: [
      "Có, tạo dàn ý và cấu trúc",
      "Không, cần tự viết",
      "Chỉ tạo tiêu đề",
      "Tùy vào tài liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo dàn ý và cấu trúc cho tài liệu dài."
  },
  {
    id: 128,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "Khi AI tạo slide PowerPoint, bạn nên làm gì?",
    options: [
      "Kiểm tra và điều chỉnh nội dung",
      "Sử dụng ngay",
      "Không cần chỉnh sửa",
      "Tin vào AI"
    ],
    answer: 0,
    explanation: "Cần kiểm tra và điều chỉnh nội dung do AI tạo."
  },
  {
    id: 129,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ quản lý email thông minh không?",
    options: [
      "Có, phân loại và ưu tiên email",
      "Không, chỉ đọc được",
      "Chỉ phân loại thư rác",
      "Tùy vào email"
    ],
    answer: 0,
    explanation: "AI có thể phân loại và ưu tiên email để quản lý thông minh."
  },
  {
    id: 130,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp trích xuất dữ liệu từ PDF vào Excel không?",
    options: [
      "Có, trích xuất và chuyển đổi dữ liệu",
      "Không, PDF không đọc được",
      "Chỉ trích xuất được văn bản",
      "Tùy vào PDF"
    ],
    answer: 0,
    explanation: "AI có thể trích xuất dữ liệu từ PDF sang Excel."
  },
  {
    id: 131,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "Lợi ích của việc tích hợp AI vào Microsoft Office là gì?",
    options: [
      "Tiết kiệm thời gian và tăng chất lượng công việc",
      "Không có lợi ích",
      "Làm chậm công việc",
      "Chỉ đẹp hơn"
    ],
    answer: 0,
    explanation: "AI giúp tiết kiệm thời gian và tăng chất lượng công việc trong Office."
  },
  {
    id: 132,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ tạo biểu đồ từ dữ liệu không?",
    options: [
      "Có, chọn loại biểu đồ phù hợp",
      "Không, cần chọn thủ công",
      "Chỉ tạo biểu đồ cột",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI giúp chọn loại biểu đồ phù hợp với dữ liệu."
  },
  {
    id: 133,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ viết email bằng nhiều ngôn ngữ không?",
    options: [
      "Có, dịch và viết đa ngôn ngữ",
      "Không, chỉ viết tiếng Anh",
      "Chỉ dịch được",
      "Tùy vào ngôn ngữ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ viết và dịch email đa ngôn ngữ."
  },
  {
    id: 134,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp quản lý dự án trong Excel không?",
    options: [
      "Có, tạo Gantt chart và theo dõi tiến độ",
      "Không, cần phần mềm chuyên dụng",
      "Chỉ tạo lịch",
      "Tùy vào dự án"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo biểu đồ Gantt và theo dõi tiến độ trong Excel."
  },
  {
    id: 135,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "Khi AI tự động định dạng tài liệu, cần kiểm tra điều gì?",
    options: [
      "Tính nhất quán và đúng quy chuẩn",
      "Không cần kiểm tra",
      "Chỉ kiểm tra lỗi chính tả",
      "Kiểm tra số trang"
    ],
    answer: 0,
    explanation: "Cần kiểm tra tính nhất quán và đúng quy chuẩn định dạng."
  },
  {
    id: 136,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ chuẩn bị nội dung thuyết trình không?",
    options: [
      "Có, tạo kịch bản và gợi ý hình ảnh",
      "Không, cần tự chuẩn bị",
      "Chỉ tạo nội dung",
      "Tùy vào chủ đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo kịch bản và gợi ý hình ảnh cho thuyết trình."
  },
  {
    id: 137,
    competency: 4,
    level: "medium",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp phân tích dữ liệu đa chiều không?",
    options: [
      "Có, với dữ liệu phù hợp và yêu cầu rõ ràng",
      "Không, chỉ phân tích đơn giản",
      "Chỉ phân tích một chiều",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể phân tích đa chiều với dữ liệu và yêu cầu rõ ràng."
  },

  // Hard (13 câu)
  {
    id: 138,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "Chiến lược nào giúp tối ưu AI trong Excel cho dữ liệu lớn?",
    options: [
      "Kết hợp Power Query và AI để xử lý dữ liệu",
      "Chỉ dùng công thức",
      "Xử lý thủ công",
      "Không cần tối ưu"
    ],
    answer: 0,
    explanation: "Kết hợp Power Query và AI tối ưu xử lý dữ liệu lớn trong Excel."
  },
  {
    id: 139,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "AI có thể tự động tạo báo cáo từ nhiều nguồn dữ liệu không?",
    options: [
      "Có, tổng hợp từ các nguồn khác nhau",
      "Không, cần nhập thủ công",
      "Chỉ lấy từ một nguồn",
      "Tùy vào nguồn"
    ],
    answer: 0,
    explanation: "AI có thể tổng hợp dữ liệu từ nhiều nguồn để tạo báo cáo."
  },
  {
    id: 140,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "Làm thế nào để đảm bảo AI không làm sai dữ liệu quan trọng?",
    options: [
      "Kiểm tra dữ liệu đầu vào và xác thực kết quả",
      "Tin vào AI",
      "Không kiểm tra",
      "Chỉ kiểm tra một phần"
    ],
    answer: 0,
    explanation: "Cần kiểm tra dữ liệu đầu vào và xác thực kết quả từ AI."
  },
  {
    id: 141,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ tạo dashboard tự động không?",
    options: [
      "Có, từ dữ liệu và yêu cầu",
      "Không, cần công cụ chuyên dụng",
      "Chỉ tạo được bảng",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo dashboard tự động từ dữ liệu và yêu cầu."
  },
  {
    id: 142,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "Khi AI đề xuất công thức Excel phức tạp, bạn nên làm gì?",
    options: [
      "Hiểu và kiểm tra công thức trước khi áp dụng",
      "Áp dụng ngay",
      "Bỏ qua",
      "Chỉ dùng công thức đơn giản"
    ],
    answer: 0,
    explanation: "Cần hiểu và kiểm tra công thức trước khi áp dụng vào dữ liệu thực."
  },
  {
    id: 143,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ phân tích dữ liệu dự báo trong Excel không?",
    options: [
      "Có, sử dụng các mô hình dự báo",
      "Không, cần phần mềm chuyên dụng",
      "Chỉ dự báo đơn giản",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể sử dụng mô hình để dự báo dữ liệu trong Excel."
  },
  {
    id: 144,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "Lợi ích của việc tích hợp AI với Office 365 là gì?",
    options: [
      "Tăng hiệu suất làm việc và khả năng cộng tác",
      "Không có lợi ích",
      "Chỉ tiện hơn một chút",
      "Tốn thêm chi phí"
    ],
    answer: 0,
    explanation: "Tích hợp AI vào Office 365 tăng hiệu suất và cộng tác nhóm."
  },
  {
    id: 145,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ tạo slide tự động từ tài liệu Word không?",
    options: [
      "Có, trích xuất nội dung và tạo slide",
      "Không, cần làm thủ công",
      "Chỉ trích xuất được tiêu đề",
      "Tùy vào tài liệu"
    ],
    answer: 0,
    explanation: "AI có thể trích xuất nội dung từ Word để tạo slide PowerPoint."
  },
  {
    id: 146,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "Khi AI tạo báo cáo từ nhiều dữ liệu, cần lưu ý gì?",
    options: [
      "Kiểm tra tính chính xác và nhất quán của dữ liệu",
      "Chấp nhận báo cáo",
      "Không cần kiểm tra",
      "Chỉ kiểm tra số liệu"
    ],
    answer: 0,
    explanation: "Cần kiểm tra tính chính xác và nhất quán của dữ liệu trong báo cáo."
  },
  {
    id: 147,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "AI có thể giúp tự động hóa workflow trong Office không?",
    options: [
      "Có, kết hợp AI với Power Automate",
      "Không, Office không hỗ trợ",
      "Chỉ tự động hóa được một phần",
      "Tùy vào workflow"
    ],
    answer: 0,
    explanation: "AI kết hợp với Power Automate giúp tự động hóa workflow trong Office."
  },
  {
    id: 148,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "Làm thế nào để AI hỗ trợ phân tích dữ liệu nhạy cảm trong Excel?",
    options: [
      "Sử dụng chế độ bảo mật và kiểm tra cẩn thận",
      "Xử lý bình thường",
      "Không cần bảo mật",
      "Chỉ phân tích trên máy chủ"
    ],
    answer: 0,
    explanation: "Cần sử dụng chế độ bảo mật và kiểm tra cẩn thận với dữ liệu nhạy cảm."
  },
  {
    id: 149,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "AI có thể hỗ trợ tạo báo cáo theo yêu cầu tùy chỉnh không?",
    options: [
      "Có, nếu được cung cấp yêu cầu chi tiết",
      "Không, chỉ tạo báo cáo mẫu",
      "Chỉ tạo báo cáo cố định",
      "Tùy vào yêu cầu"
    ],
    answer: 0,
    explanation: "AI có thể tạo báo cáo tùy chỉnh với yêu cầu chi tiết từ người dùng."
  },
  {
    id: 150,
    competency: 4,
    level: "hard",
    category: "OFFICE",
    type: "single",
    question: "Nguyên tắc nào quan trọng khi sử dụng AI trong Office?",
    options: [
      "Luôn kiểm tra và xác thực kết quả",
      "Tin tưởng tuyệt đối",
      "Không cần kiểm tra",
      "Sử dụng mặc định"
    ],
    answer: 0,
    explanation: "Luôn kiểm tra và xác thực kết quả khi sử dụng AI trong Office."
  }
];

// ============================================================
// 6. COMPETENCY 5 — PLAN WITH AI (35 câu)
// ============================================================
const COMPETENCY_5 = [
  // Easy (12 câu)
  {
    id: 151,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ chuẩn bị cuộc họp như thế nào?",
    options: [
      "Tạo agenda và tài liệu chuẩn bị",
      "Thay thế người họp",
      "Tự động tổ chức cuộc họp",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo agenda và tài liệu chuẩn bị cho cuộc họp."
  },
  {
    id: 152,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp ghi chú cuộc họp như thế nào?",
    options: [
      "Ghi chép và tóm tắt nội dung",
      "Ghi âm thay người",
      "Tự động gửi biên bản",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ ghi chép và tóm tắt nội dung cuộc họp."
  },
  {
    id: 153,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp theo dõi Action Items không?",
    options: [
      "Có, trích xuất và phân công nhiệm vụ",
      "Không, cần làm thủ công",
      "Chỉ ghi nhận có",
      "Tùy vào cuộc họp"
    ],
    answer: 0,
    explanation: "AI hỗ trợ trích xuất và phân công Action Items từ cuộc họp."
  },
  {
    id: 154,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ lập kế hoạch tuần không?",
    options: [
      "Có, sắp xếp ưu tiên và phân bổ thời gian",
      "Không, cần tự lập",
      "Chỉ tạo danh sách",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI hỗ trợ sắp xếp ưu tiên và phân bổ thời gian cho kế hoạch tuần."
  },
  {
    id: 155,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp ưu tiên công việc như thế nào?",
    options: [
      "Đánh giá mức độ quan trọng và khẩn cấp",
      "Chọn công việc ngẫu nhiên",
      "Ưu tiên công việc dễ nhất",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI đánh giá mức độ quan trọng và khẩn cấp để ưu tiên công việc."
  },
  {
    id: 156,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ quản lý thời gian không?",
    options: [
      "Có, đề xuất lịch trình và nhắc nhở",
      "Không, chỉ con người quản lý được",
      "Chỉ nhắc nhở",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đề xuất lịch trình và nhắc nhở để quản lý thời gian."
  },
  {
    id: 157,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp phân tích khối lượng công việc không?",
    options: [
      "Có, đánh giá và đề xuất phân bổ",
      "Không, cần tự đánh giá",
      "Chỉ đếm số lượng",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI có thể đánh giá khối lượng công việc và đề xuất phân bổ."
  },
  {
    id: 158,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ đặt mục tiêu công việc không?",
    options: [
      "Có, gợi ý mục tiêu SMART",
      "Không, mục tiêu cần con người",
      "Chỉ ghi nhận mục tiêu",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI hỗ trợ gợi ý mục tiêu SMART (Specific, Measurable, Achievable, Relevant, Time-bound)."
  },
  {
    id: 159,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp tổng hợp biên bản cuộc họp không?",
    options: [
      "Có, tóm tắt và làm rõ các quyết định",
      "Không, biên bản cần chi tiết",
      "Chỉ tóm tắt",
      "Tùy vào cuộc họp"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tóm tắt và làm rõ các quyết định trong biên bản cuộc họp."
  },
  {
    id: 160,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ theo dõi tiến độ dự án không?",
    options: [
      "Có, cập nhật và báo cáo tiến độ",
      "Không, cần báo cáo thủ công",
      "Chỉ ghi nhận tiến độ",
      "Tùy vào dự án"
    ],
    answer: 0,
    explanation: "AI hỗ trợ cập nhật và báo cáo tiến độ dự án."
  },
  {
    id: 161,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ lập danh sách việc cần làm không?",
    options: [
      "Có, tạo và sắp xếp danh sách",
      "Không, cần tự tạo",
      "Chỉ gợi ý công việc",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tạo và sắp xếp danh sách việc cần làm."
  },
  {
    id: 162,
    competency: 5,
    level: "easy",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp nhắc nhở công việc quan trọng không?",
    options: [
      "Có, gửi thông báo và nhắc nhở",
      "Không, cần tự nhớ",
      "Chỉ nhắc một lần",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI hỗ trợ gửi thông báo và nhắc nhở công việc quan trọng."
  },

  // Medium (12 câu)
  {
    id: 163,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "Làm thế nào để AI tạo agenda cuộc họp hiệu quả?",
    options: [
      "Cung cấp mục tiêu và các chủ đề thảo luận",
      "Để AI tự tạo",
      "Không cần hướng dẫn",
      "Chỉ cần thời gian"
    ],
    answer: 0,
    explanation: "Cần cung cấp mục tiêu và chủ đề thảo luận để AI tạo agenda hiệu quả."
  },
  {
    id: 164,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ quản lý nhiều dự án cùng lúc không?",
    options: [
      "Có, tổ chức và theo dõi tiến độ nhiều dự án",
      "Không, chỉ quản lý được một",
      "Chỉ theo dõi tiến độ",
      "Tùy vào dự án"
    ],
    answer: 0,
    explanation: "AI có thể tổ chức và theo dõi tiến độ nhiều dự án cùng lúc."
  },
  {
    id: 165,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "Khi AI tóm tắt cuộc họp, cần lưu ý điều gì?",
    options: [
      "Kiểm tra độ chính xác của các quyết định",
      "Tin vào AI",
      "Không cần kiểm tra",
      "Chỉ kiểm tra ngày giờ"
    ],
    answer: 0,
    explanation: "Cần kiểm tra độ chính xác của các quyết định trong tóm tắt."
  },
  {
    id: 166,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ lập kế hoạch nhân sự không?",
    options: [
      "Có, phân bổ nguồn lực dựa trên năng lực",
      "Không, cần chuyên gia",
      "Chỉ đếm số lượng",
      "Tùy vào nhân sự"
    ],
    answer: 0,
    explanation: "AI có thể phân bổ nguồn lực dựa trên năng lực và nhu cầu công việc."
  },
  {
    id: 167,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp xác định rủi ro trong kế hoạch không?",
    options: [
      "Có, phân tích và cảnh báo rủi ro tiềm ẩn",
      "Không, rủi ro khó dự đoán",
      "Chỉ cảnh báo rủi ro rõ ràng",
      "Tùy vào kế hoạch"
    ],
    answer: 0,
    explanation: "AI có thể phân tích và cảnh báo các rủi ro tiềm ẩn trong kế hoạch."
  },
  {
    id: 168,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ ước lượng thời gian hoàn thành công việc không?",
    options: [
      "Có, dựa trên dữ liệu lịch sử",
      "Không, khó ước lượng",
      "Chỉ ước lượng chung",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI có thể ước lượng thời gian dựa trên dữ liệu lịch sử."
  },
  {
    id: 169,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ chuẩn bị tài liệu cho cuộc họp không?",
    options: [
      "Có, tổng hợp và chuẩn bị tài liệu liên quan",
      "Không, cần tự chuẩn bị",
      "Chỉ tổng hợp tài liệu",
      "Tùy vào cuộc họp"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tổng hợp và chuẩn bị tài liệu cho cuộc họp."
  },
  {
    id: 170,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp tối ưu lịch làm việc không?",
    options: [
      "Có, sắp xếp lịch hợp lý và hiệu quả",
      "Không, cần tự sắp xếp",
      "Chỉ sắp xếp thời gian",
      "Tùy vào lịch"
    ],
    answer: 0,
    explanation: "AI hỗ trợ sắp xếp lịch làm việc hợp lý và hiệu quả."
  },
  {
    id: 171,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ phân bổ ngân sách cho dự án không?",
    options: [
      "Có, đề xuất phân bổ dựa trên dữ liệu",
      "Không, cần chuyên gia tài chính",
      "Chỉ ước tính chi phí",
      "Tùy vào dự án"
    ],
    answer: 0,
    explanation: "AI có thể đề xuất phân bổ ngân sách dựa trên dữ liệu và yêu cầu."
  },
  {
    id: 172,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp ghi nhớ các quyết định trong cuộc họp không?",
    options: [
      "Có, trích xuất và lưu trữ các quyết định",
      "Không, cần ghi chép thủ công",
      "Chỉ ghi nhớ các quyết định lớn",
      "Tùy vào cuộc họp"
    ],
    answer: 0,
    explanation: "AI trích xuất và lưu trữ các quyết định từ cuộc họp."
  },
  {
    id: 173,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ lập kế hoạch dài hạn không?",
    options: [
      "Có, xây dựng lộ trình và các mốc quan trọng",
      "Không, kế hoạch dài hạn cần con người",
      "Chỉ lập kế hoạch ngắn hạn",
      "Tùy vào kế hoạch"
    ],
    answer: 0,
    explanation: "AI hỗ trợ xây dựng lộ trình và các mốc quan trọng cho kế hoạch dài hạn."
  },
  {
    id: 174,
    competency: 5,
    level: "medium",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp đo lường hiệu quả công việc không?",
    options: [
      "Có, phân tích KPI và báo cáo kết quả",
      "Không, cần tự đo lường",
      "Chỉ thu thập dữ liệu",
      "Tùy vào công việc"
    ],
    answer: 0,
    explanation: "AI phân tích KPI và báo cáo kết quả để đo lường hiệu quả công việc."
  },

  // Hard (11 câu)
  {
    id: 175,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "Chiến lược nào giúp AI tối ưu lịch họp cho nhiều người?",
    options: [
      "Phân tích lịch trống và đề xuất thời gian tối ưu",
      "Chọn thời gian cố định",
      "Không cần tối ưu",
      "Hỏi từng người"
    ],
    answer: 0,
    explanation: "AI có thể phân tích lịch trống và đề xuất thời gian phù hợp cho nhiều người."
  },
  {
    id: 176,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ quản lý khủng hoảng trong dự án không?",
    options: [
      "Có, phân tích tình huống và đề xuất giải pháp",
      "Không, khủng hoảng cần xử lý thủ công",
      "Chỉ cảnh báo khủng hoảng",
      "Tùy vào tình huống"
    ],
    answer: 0,
    explanation: "AI có thể phân tích tình huống và đề xuất giải pháp trong khủng hoảng."
  },
  {
    id: 177,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "AI có thể giúp dự báo nguồn lực cần thiết cho dự án không?",
    options: [
      "Có, dựa trên dữ liệu dự án tương tự",
      "Không, khó dự báo",
      "Chỉ dự báo gần đúng",
      "Tùy vào dự án"
    ],
    answer: 0,
    explanation: "AI dự báo nguồn lực dựa trên dữ liệu từ các dự án tương tự."
  },
  {
    id: 178,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "Làm thế nào để AI hỗ trợ ra quyết định trong lập kế hoạch?",
    options: [
      "Phân tích dữ liệu và các kịch bản khác nhau",
      "Để AI quyết định thay",
      "Không cần phân tích",
      "Chọn phương án đơn giản"
    ],
    answer: 0,
    explanation: "AI phân tích dữ liệu và các kịch bản để hỗ trợ ra quyết định."
  },
  {
    id: 179,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ tối ưu quy trình làm việc nhóm không?",
    options: [
      "Có, phân tích và đề xuất cải thiện quy trình",
      "Không, quy trình cần con người",
      "Chỉ đánh giá quy trình",
      "Tùy vào nhóm"
    ],
    answer: 0,
    explanation: "AI phân tích và đề xuất cải thiện quy trình làm việc nhóm."
  },
  {
    id: 180,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "Khi AI đề xuất thay đổi kế hoạch, bạn nên làm gì?",
    options: [
      "Xem xét lý do và đánh giá tác động",
      "Luôn chấp nhận",
      "Luôn từ chối",
      "Bỏ qua đề xuất"
    ],
    answer: 0,
    explanation: "Cần xem xét lý do và đánh giá tác động trước khi thay đổi kế hoạch."
  },
  {
    id: 181,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ phân tích hiệu quả cuộc họp không?",
    options: [
      "Có, đánh giá mức độ đạt được mục tiêu",
      "Không, cuộc họp khó đánh giá",
      "Chỉ đếm số lượng",
      "Tùy vào cuộc họp"
    ],
    answer: 0,
    explanation: "AI đánh giá mức độ đạt được mục tiêu của cuộc họp."
  },
  {
    id: 182,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ quản lý thay đổi trong dự án không?",
    options: [
      "Có, đánh giá tác động và đề xuất điều chỉnh",
      "Không, quản lý thay đổi cần kinh nghiệm",
      "Chỉ ghi nhận thay đổi",
      "Tùy vào thay đổi"
    ],
    answer: 0,
    explanation: "AI đánh giá tác động và đề xuất điều chỉnh khi có thay đổi."
  },
  {
    id: 183,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "Lợi ích của việc tích hợp AI vào quản lý dự án là gì?",
    options: [
      "Tăng độ chính xác và giảm rủi ro dự án",
      "Không có lợi ích",
      "Chỉ tiết kiệm thời gian",
      "Làm phức tạp quản lý"
    ],
    answer: 0,
    explanation: "AI giúp tăng độ chính xác và giảm rủi ro trong quản lý dự án."
  },
  {
    id: 184,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "AI có thể hỗ trợ lập kế hoạch chiến lược không?",
    options: [
      "Có, phân tích thị trường và đề xuất định hướng",
      "Không, chiến lược cần tầm nhìn",
      "Chỉ phân tích dữ liệu",
      "Tùy vào chiến lược"
    ],
    answer: 0,
    explanation: "AI phân tích thị trường và đề xuất định hướng cho kế hoạch chiến lược."
  },
  {
    id: 185,
    competency: 5,
    level: "hard",
    category: "PLANNING",
    type: "single",
    question: "Nguyên tắc nào quan trọng khi sử dụng AI trong lập kế hoạch?",
    options: [
      "Kết hợp AI với kinh nghiệm thực tế",
      "Để AI làm thay",
      "Tin vào mọi gợi ý",
      "Không cần kiểm tra"
    ],
    answer: 0,
    explanation: "Cần kết hợp AI với kinh nghiệm thực tế trong lập kế hoạch."
  }
];

// ============================================================
// 7. COMPETENCY 6 — DECIDE WITH AI (40 câu)
// ============================================================
const COMPETENCY_6 = [
  // Easy (13 câu)
  {
    id: 186,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định như thế nào?",
    options: [
      "Phân tích dữ liệu và đề xuất phương án",
      "Thay thế hoàn toàn người ra quyết định",
      "Loại bỏ nhu cầu quyết định",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và đề xuất phương án để ra quyết định."
  },
  {
    id: 187,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "AI có thể phân tích rủi ro trong quyết định không?",
    options: [
      "Có, đánh giá và cảnh báo rủi ro",
      "Không, rủi ro khó dự đoán",
      "Chỉ đánh giá rủi ro tài chính",
      "Tùy vào quyết định"
    ],
    answer: 0,
    explanation: "AI có thể đánh giá và cảnh báo các rủi ro trong quyết định."
  },
  {
    id: 188,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "AI có thể giúp so sánh các phương án không?",
    options: [
      "Có, so sánh ưu và nhược điểm",
      "Không, chỉ con người so sánh được",
      "Chỉ so sánh số liệu",
      "Tùy vào phương án"
    ],
    answer: 0,
    explanation: "AI hỗ trợ so sánh ưu và nhược điểm của các phương án."
  },
  {
    id: 189,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ đánh giá nhiều kịch bản không?",
    options: [
      "Có, phân tích nhiều tình huống khác nhau",
      "Không, chỉ phân tích một kịch bản",
      "Chỉ đánh giá kịch bản tốt nhất",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể phân tích và so sánh nhiều kịch bản khác nhau."
  },
  {
    id: 190,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Quyết định cuối cùng khi sử dụng AI nên thuộc về ai?",
    options: [
      "Con người — người sử dụng AI",
      "AI",
      "Nhà phát triển",
      "Không ai"
    ],
    answer: 0,
    explanation: "Con người luôn là người ra quyết định cuối cùng."
  },
  {
    id: 191,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Bạn cần lựa chọn giữa hai nhà cung cấp. AI có thể hỗ trợ hiệu quả nhất bằng cách nào?",
    options: [
      "So sánh các tiêu chí như giá, chất lượng, thời gian giao hàng và rủi ro",
      "Tự quyết định chọn nhà cung cấp",
      "Ký hợp đồng thay doanh nghiệp",
      "Loại bỏ nhà cung cấp có giá cao hơn"
    ],
    answer: 0,
    explanation: "AI giúp phân tích nhiều tiêu chí để hỗ trợ người dùng đưa ra quyết định phù hợp."
  },
  {
    id: 192,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Điều gì giúp AI đưa ra các đề xuất quyết định chính xác hơn?",
    options: [
      "Cung cấp đầy đủ dữ liệu, mục tiêu và các tiêu chí đánh giá",
      "Chỉ nhập một câu hỏi ngắn",
      "Không cung cấp bối cảnh",
      "Để AI tự suy đoán"
    ],
    answer: 0,
    explanation: "AI hoạt động hiệu quả hơn khi có đủ dữ liệu và hiểu rõ mục tiêu."
  },
  {
    id: 193,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Nếu AI đề xuất một phương án không phù hợp với tình hình thực tế, bạn nên làm gì?",
    options: [
      "Điều chỉnh dữ liệu hoặc bổ sung bối cảnh rồi yêu cầu AI phân tích lại",
      "Làm theo ngay",
      "Ngừng sử dụng AI",
      "Xóa toàn bộ dữ liệu"
    ],
    answer: 0,
    explanation: "Việc bổ sung bối cảnh giúp AI đưa ra các gợi ý sát với thực tế hơn."
  },
  {
    id: 194,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ người quản lý đánh giá nhiều phương án bằng cách nào?",
    options: [
      "Liệt kê ưu điểm, hạn chế và rủi ro của từng phương án",
      "Chọn sẵn phương án cuối cùng",
      "Thay đổi dữ liệu đầu vào",
      "Phê duyệt quyết định"
    ],
    answer: 0,
    explanation: "AI giúp người dùng nhìn thấy nhiều góc độ trước khi đưa ra quyết định."
  },
  {
    id: 195,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Khi AI phân tích dữ liệu kinh doanh, điều gì vẫn cần con người thực hiện?",
    options: [
      "Đánh giá tính khả thi của phương án trong bối cảnh thực tế",
      "Tin hoàn toàn vào kết quả AI",
      "Không cần xem dữ liệu gốc",
      "Chỉ kiểm tra lỗi chính tả"
    ],
    answer: 0,
    explanation: "AI không thể thay thế kinh nghiệm và hiểu biết thực tế của người ra quyết định."
  },
  {
    id: 196,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Bạn cần ưu tiên 20 công việc trong ngày. AI có thể hỗ trợ như thế nào?",
    options: [
      "Phân loại công việc theo mức độ ưu tiên và thời hạn",
      "Hoàn thành toàn bộ công việc thay bạn",
      "Xóa các công việc ít quan trọng",
      "Đưa ra quyết định thay người quản lý"
    ],
    answer: 0,
    explanation: "AI giúp sắp xếp công việc khoa học để hỗ trợ quá trình ra quyết định."
  },
  {
    id: 197,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Lợi ích của việc yêu cầu AI phân tích nhiều kịch bản khác nhau là gì?",
    options: [
      "Có thêm góc nhìn trước khi đưa ra quyết định",
      "Không cần phân tích thêm",
      "AI sẽ luôn chọn đúng phương án",
      "Giảm trách nhiệm của người quản lý"
    ],
    answer: 0,
    explanation: "Phân tích nhiều kịch bản giúp người dùng đánh giá rủi ro và cơ hội toàn diện hơn."
  },
  {
    id: 198,
    competency: 6,
    level: "easy",
    category: "DECISION",
    type: "single",
    question: "Nếu AI đưa ra hai kết luận trái ngược nhau, cách xử lý phù hợp nhất là gì?",
    options: [
      "Đối chiếu với dữ liệu và tiêu chí ra quyết định trước khi lựa chọn",
      "Luôn chọn kết luận đầu tiên",
      "Ghép hai kết luận lại",
      "Bỏ qua toàn bộ kết quả"
    ],
    answer: 0,
    explanation: "Người dùng cần đánh giá kết quả dựa trên dữ liệu và mục tiêu thực tế."
  },

  // Medium (14 câu)
  {
    id: 199,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "Điều nào phản ánh việc sử dụng AI hiệu quả trong quá trình ra quyết định?",
    options: [
      "Tiết kiệm thời gian phân tích nhưng vẫn giữ quyền quyết định cuối cùng",
      "Để AI quyết định mọi vấn đề",
      "Không cần kiểm tra dữ liệu",
      "Chỉ sử dụng một phương án AI đề xuất"
    ],
    answer: 0,
    explanation: "AI giúp tăng tốc quá trình phân tích, nhưng quyết định cuối cùng vẫn thuộc về con người."
  },
  {
    id: 200,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "Một nhà quản lý sử dụng AI đúng cách sẽ đạt được điều gì?",
    options: [
      "Ra quyết định nhanh hơn với nhiều thông tin hỗ trợ hơn",
      "Không cần kinh nghiệm quản lý",
      "Không cần chịu trách nhiệm về quyết định",
      "Có thể bỏ qua dữ liệu thực tế"
    ],
    answer: 0,
    explanation: "AI hỗ trợ quá trình phân tích, còn kinh nghiệm và trách nhiệm vẫn thuộc về nhà quản lý."
  },
  {
    id: 201,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ phân tích SWOT không?",
    options: [
      "Có, tổng hợp điểm mạnh, điểm yếu, cơ hội và thách thức",
      "Không, SWOT cần con người",
      "Chỉ phân tích cơ hội",
      "Tùy vào doanh nghiệp"
    ],
    answer: 0,
    explanation: "AI có thể tổng hợp và phân tích SWOT từ dữ liệu đầu vào."
  },
  {
    id: 202,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ đánh giá KPI không?",
    options: [
      "Có, theo dõi và báo cáo KPI tự động",
      "Không, KPI cần con người đánh giá",
      "Chỉ thu thập dữ liệu KPI",
      "Tùy vào KPI"
    ],
    answer: 0,
    explanation: "AI có thể theo dõi và báo cáo KPI tự động."
  },
  {
    id: 203,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể giúp dự đoán kết quả của quyết định không?",
    options: [
      "Có, dựa trên dữ liệu lịch sử và mô hình",
      "Không, kết quả khó dự đoán",
      "Chỉ dự đoán gần đúng",
      "Tùy vào quyết định"
    ],
    answer: 0,
    explanation: "AI có thể dự đoán kết quả dựa trên dữ liệu và mô hình phân tích."
  },
  {
    id: 204,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong tài chính không?",
    options: [
      "Có, phân tích dữ liệu tài chính và đề xuất",
      "Không, tài chính cần chuyên gia",
      "Chỉ phân tích số liệu",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu tài chính và đề xuất quyết định."
  },
  {
    id: 205,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong marketing không?",
    options: [
      "Có, phân tích hành vi khách hàng và đề xuất",
      "Không, marketing cần sáng tạo",
      "Chỉ phân tích dữ liệu",
      "Tùy vào chiến dịch"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích hành vi khách hàng và đề xuất chiến lược marketing."
  },
  {
    id: 206,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "Khi AI đề xuất phương án có rủi ro cao, bạn nên làm gì?",
    options: [
      "Phân tích kỹ hơn và yêu cầu AI giải thích",
      "Chấp nhận rủi ro",
      "Bỏ qua ngay",
      "Chọn phương án an toàn hơn"
    ],
    answer: 0,
    explanation: "Cần phân tích kỹ hơn và yêu cầu AI giải thích trước khi ra quyết định."
  },
  {
    id: 207,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định nhóm không?",
    options: [
      "Có, tổng hợp ý kiến và phân tích",
      "Không, quyết định nhóm cần con người",
      "Chỉ thu thập ý kiến",
      "Tùy vào nhóm"
    ],
    answer: 0,
    explanation: "AI có thể tổng hợp ý kiến và phân tích để hỗ trợ quyết định nhóm."
  },
  {
    id: 208,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể giúp tối ưu hóa quyết định trong chuỗi cung ứng không?",
    options: [
      "Có, phân tích và đề xuất tối ưu",
      "Không, chuỗi cung ứng phức tạp",
      "Chỉ phân tích",
      "Tùy vào chuỗi"
    ],
    answer: 0,
    explanation: "AI có thể phân tích và đề xuất tối ưu trong chuỗi cung ứng."
  },
  {
    id: 209,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ đánh giá tác động môi trường của quyết định không?",
    options: [
      "Có, phân tích dữ liệu môi trường",
      "Không, cần chuyên gia",
      "Chỉ phân tích tác động cơ bản",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu môi trường để đánh giá tác động."
  },
  {
    id: 210,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong nhân sự không?",
    options: [
      "Có, phân tích dữ liệu nhân sự và đề xuất",
      "Không, nhân sự cần con người",
      "Chỉ phân tích dữ liệu",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu nhân sự và đề xuất quyết định."
  },
  {
    id: 211,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể giúp đánh giá hiệu quả của quyết định không?",
    options: [
      "Có, đo lường và báo cáo kết quả",
      "Không, cần tự đánh giá",
      "Chỉ thu thập dữ liệu",
      "Tùy vào quyết định"
    ],
    answer: 0,
    explanation: "AI có thể đo lường và báo cáo kết quả để đánh giá hiệu quả quyết định."
  },
  {
    id: 212,
    competency: 6,
    level: "medium",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong khủng hoảng không?",
    options: [
      "Có, phân tích nhanh và đề xuất giải pháp",
      "Không, khủng hoảng cần con người",
      "Chỉ phân tích dữ liệu",
      "Tùy vào tình huống"
    ],
    answer: 0,
    explanation: "AI có thể phân tích nhanh và đề xuất giải pháp trong khủng hoảng."
  },

  // Hard (13 câu)
  {
    id: 213,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "Chiến lược nào giúp AI hỗ trợ ra quyết định chiến lược?",
    options: [
      "Phân tích dữ liệu lớn và dự báo xu hướng dài hạn",
      "Chỉ phân tích ngắn hạn",
      "Không cần chiến lược",
      "Chọn phương án an toàn"
    ],
    answer: 0,
    explanation: "AI hỗ trợ chiến lược qua phân tích dữ liệu lớn và dự báo xu hướng."
  },
  {
    id: 214,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong điều kiện không chắc chắn không?",
    options: [
      "Có, sử dụng mô hình xác suất và kịch bản",
      "Không, cần dữ liệu chính xác",
      "Chỉ phân tích khi đủ dữ liệu",
      "Tùy vào tình huống"
    ],
    answer: 0,
    explanation: "AI có thể sử dụng mô hình xác suất và kịch bản trong điều kiện không chắc chắn."
  },
  {
    id: 215,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể giúp phát hiện bias (thiên vị) trong quyết định không?",
    options: [
      "Có, phân tích và cảnh báo bias tiềm ẩn",
      "Không, bias khó phát hiện",
      "Chỉ phát hiện bias dữ liệu",
      "Tùy vào quyết định"
    ],
    answer: 0,
    explanation: "AI có thể phân tích và cảnh báo các bias tiềm ẩn trong quyết định."
  },
  {
    id: 216,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong môi trường cạnh tranh không?",
    options: [
      "Có, phân tích đối thủ và dự báo phản ứng",
      "Không, cạnh tranh khó dự đoán",
      "Chỉ phân tích thị trường",
      "Tùy vào ngành"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích đối thủ và dự báo phản ứng trong môi trường cạnh tranh."
  },
  {
    id: 217,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "Khi AI đưa ra dự đoán khác với trực giác, bạn nên làm gì?",
    options: [
      "Phân tích dữ liệu và kiểm tra giả định",
      "Tin vào trực giác",
      "Tin vào AI",
      "Bỏ qua cả hai"
    ],
    answer: 0,
    explanation: "Cần phân tích dữ liệu và kiểm tra giả định khi có sự khác biệt."
  },
  {
    id: 218,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ tối ưu đa mục tiêu trong quyết định không?",
    options: [
      "Có, cân bằng giữa các mục tiêu khác nhau",
      "Không, chỉ tối ưu một mục tiêu",
      "Chỉ ưu tiên mục tiêu chính",
      "Tùy vào mục tiêu"
    ],
    answer: 0,
    explanation: "AI có thể cân bằng và tối ưu nhiều mục tiêu trong quyết định."
  },
  {
    id: 219,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong dài hạn không?",
    options: [
      "Có, mô phỏng và dự báo dài hạn",
      "Không, dài hạn khó dự đoán",
      "Chỉ phân tích ngắn hạn",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể mô phỏng và dự báo để hỗ trợ quyết định dài hạn."
  },
  {
    id: 220,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "Lợi ích của việc sử dụng AI trong ra quyết định nhóm là gì?",
    options: [
      "Tăng tính khách quan và giảm xung đột",
      "Không có lợi ích",
      "Chỉ tiết kiệm thời gian",
      "Làm phức tạp hơn"
    ],
    answer: 0,
    explanation: "AI giúp tăng tính khách quan và giảm xung đột trong quyết định nhóm."
  },
  {
    id: 221,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong thời gian thực không?",
    options: [
      "Có, với dữ liệu thời gian thực và phân tích nhanh",
      "Không, cần xử lý chậm",
      "Chỉ phân tích khi có đủ dữ liệu",
      "Tùy vào hệ thống"
    ],
    answer: 0,
    explanation: "AI có thể hỗ trợ quyết định thời gian thực với dữ liệu và phân tích nhanh."
  },
  {
    id: 222,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể giúp đánh giá đạo đức của quyết định không?",
    options: [
      "Hỗ trợ phân tích, nhưng đánh giá đạo đức cần con người",
      "Có, AI đánh giá đạo đức",
      "Không, đạo đức chỉ của con người",
      "Tùy vào quyết định"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích, nhưng đánh giá đạo đức vẫn cần con người."
  },
  {
    id: 223,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "Nguyên tắc nào quan trọng khi sử dụng AI trong ra quyết định?",
    options: [
      "Minh bạch, trách nhiệm và đánh giá kỹ lưỡng",
      "Tin tưởng tuyệt đối",
      "Không cần kiểm tra",
      "Quyết định nhanh"
    ],
    answer: 0,
    explanation: "Cần minh bạch, trách nhiệm và đánh giá kỹ lưỡng khi sử dụng AI trong ra quyết định."
  },
  {
    id: 224,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "AI có thể hỗ trợ ra quyết định trong môi trường pháp lý không?",
    options: [
      "Hỗ trợ phân tích, nhưng cần chuyên gia pháp lý",
      "Có, AI thay thế luật sư",
      "Không, pháp lý cần con người",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích nhưng cần chuyên gia pháp lý kiểm tra."
  },
  {
    id: 225,
    competency: 6,
    level: "hard",
    category: "DECISION",
    type: "single",
    question: "Khi AI đề xuất phương án mới, cách đánh giá nào tốt nhất?",
    options: [
      "Phân tích lợi ích, rủi ro và khả năng thực hiện",
      "Chấp nhận ngay",
      "Bỏ qua",
      "Chỉ phân tích lợi ích"
    ],
    answer: 0,
    explanation: "Cần phân tích toàn diện lợi ích, rủi ro và khả năng thực hiện."
  }
];

// ============================================================
// 8. COMPETENCY 7 — WORKFLOW WITH AI (40 câu)
// ============================================================
const COMPETENCY_7 = [
  // Easy (13 câu)
  {
    id: 226,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI Workflow là gì?",
    options: [
      "Quy trình làm việc có sự hỗ trợ của AI",
      "Một phần mềm mới",
      "Công cụ lập trình",
      "Phương pháp học tập"
    ],
    answer: 0,
    explanation: "AI Workflow là quy trình làm việc được tích hợp sự hỗ trợ của AI."
  },
  {
    id: 227,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "Lợi ích chính của AI Workflow là gì?",
    options: [
      "Tự động hóa các công việc lặp lại và tăng năng suất",
      "Thay thế hoàn toàn con người",
      "Giảm chất lượng công việc",
      "Không có lợi ích"
    ],
    answer: 0,
    explanation: "AI Workflow giúp tự động hóa và tăng năng suất làm việc."
  },
  {
    id: 228,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ trong workflow như thế nào?",
    options: [
      "Tự động hóa và tối ưu các bước lặp lại",
      "Thực hiện mọi công việc thay con người",
      "Loại bỏ nhu cầu công việc",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tự động hóa và tối ưu các bước lặp lại trong workflow."
  },
  {
    id: 229,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "Bước đầu tiên khi thiết kế AI Workflow là gì?",
    options: [
      "Xác định quy trình hiện tại và các điểm có thể cải thiện",
      "Mua phần mềm AI",
      "Bắt đầu tự động hóa ngay",
      "Không cần phân tích"
    ],
    answer: 0,
    explanation: "Cần xác định quy trình hiện tại và điểm cần cải thiện trước."
  },
  {
    id: 230,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ trong xử lý email hàng ngày như thế nào?",
    options: [
      "Phân loại, ưu tiên và đề xuất phản hồi",
      "Tự động trả lời tất cả",
      "Xóa email cũ",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân loại, ưu tiên và đề xuất phản hồi cho email."
  },
  {
    id: 231,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể tự động hóa báo cáo hàng tuần không?",
    options: [
      "Có, tổng hợp dữ liệu và tạo báo cáo tự động",
      "Không, cần làm thủ công",
      "Chỉ tạo được báo cáo đơn giản",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể tự động tổng hợp dữ liệu và tạo báo cáo hàng tuần."
  },
  {
    id: 232,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình tuyển dụng không?",
    options: [
      "Có, sàng lọc CV và đề xuất ứng viên",
      "Không, tuyển dụng cần con người",
      "Chỉ lưu trữ CV",
      "Tùy vào vị trí"
    ],
    answer: 0,
    explanation: "AI hỗ trợ sàng lọc CV và đề xuất ứng viên phù hợp."
  },
  {
    id: 233,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình chăm sóc khách hàng không?",
    options: [
      "Có, chatbot và phân tích phản hồi",
      "Không, cần con người",
      "Chỉ trả lời câu hỏi đơn giản",
      "Tùy vào khách hàng"
    ],
    answer: 0,
    explanation: "AI hỗ trợ chăm sóc khách hàng qua chatbot và phân tích phản hồi."
  },
  {
    id: 234,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý dự án không?",
    options: [
      "Có, theo dõi tiến độ và nhắc nhở",
      "Không, cần phần mềm chuyên dụng",
      "Chỉ theo dõi thời gian",
      "Tùy vào dự án"
    ],
    answer: 0,
    explanation: "AI hỗ trợ theo dõi tiến độ và nhắc nhở trong quản lý dự án."
  },
  {
    id: 235,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể tự động tạo lịch họp không?",
    options: [
      "Có, đề xuất thời gian và gửi lời mời",
      "Không, cần tự sắp xếp",
      "Chỉ đề xuất thời gian",
      "Tùy vào lịch"
    ],
    answer: 0,
    explanation: "AI có thể đề xuất thời gian và gửi lời mời họp tự động."
  },
  {
    id: 236,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình kế toán không?",
    options: [
      "Có, tự động hóa các tác vụ kế toán lặp lại",
      "Không, kế toán cần độ chính xác cao",
      "Chỉ nhập liệu",
      "Tùy vào nghiệp vụ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tự động hóa các tác vụ kế toán lặp lại."
  },
  {
    id: 237,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình marketing không?",
    options: [
      "Có, tự động hóa chiến dịch và phân tích",
      "Không, marketing cần sáng tạo",
      "Chỉ gửi email",
      "Tùy vào chiến dịch"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tự động hóa chiến dịch và phân tích trong marketing."
  },
  {
    id: 238,
    competency: 7,
    level: "easy",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình bán hàng không?",
    options: [
      "Có, phân tích khách hàng và đề xuất",
      "Không, bán hàng cần kỹ năng",
      "Chỉ quản lý lead",
      "Tùy vào sản phẩm"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích khách hàng và đề xuất trong bán hàng."
  },

  // Medium (13 câu)
  {
    id: 239,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "Làm thế nào để thiết kế AI Workflow hiệu quả?",
    options: [
      "Xác định mục tiêu, lập bản đồ quy trình và chọn công cụ phù hợp",
      "Mua nhiều công cụ AI",
      "Tự động hóa mọi thứ",
      "Không cần kế hoạch"
    ],
    answer: 0,
    explanation: "Cần xác định mục tiêu, lập bản đồ quy trình và chọn công cụ phù hợp."
  },
  {
    id: 240,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình sản xuất nội dung không?",
    options: [
      "Có, từ ý tưởng đến xuất bản",
      "Không, nội dung cần con người",
      "Chỉ viết bản nháp",
      "Tùy vào loại nội dung"
    ],
    answer: 0,
    explanation: "AI hỗ trợ toàn bộ quy trình sản xuất nội dung từ ý tưởng đến xuất bản."
  },
  {
    id: 241,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý nhân sự không?",
    options: [
      "Có, từ tuyển dụng đến đánh giá hiệu suất",
      "Không, nhân sự cần con người",
      "Chỉ quản lý hồ sơ",
      "Tùy vào quy mô"
    ],
    answer: 0,
    explanation: "AI hỗ trợ quy trình nhân sự từ tuyển dụng đến đánh giá hiệu suất."
  },
  {
    id: 242,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình phân tích dữ liệu không?",
    options: [
      "Có, thu thập, xử lý và trực quan hóa",
      "Không, cần chuyên gia",
      "Chỉ xử lý số liệu",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ toàn bộ quy trình phân tích dữ liệu từ thu thập đến trực quan hóa."
  },
  {
    id: 243,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình đào tạo nhân viên không?",
    options: [
      "Có, cá nhân hóa nội dung và theo dõi tiến độ",
      "Không, đào tạo cần con người",
      "Chỉ cung cấp tài liệu",
      "Tùy vào chương trình"
    ],
    answer: 0,
    explanation: "AI hỗ trợ cá nhân hóa nội dung và theo dõi tiến độ đào tạo."
  },
  {
    id: 244,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình kiểm tra chất lượng không?",
    options: [
      "Có, tự động kiểm tra và phát hiện lỗi",
      "Không, cần kiểm tra thủ công",
      "Chỉ kiểm tra một phần",
      "Tùy vào sản phẩm"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tự động kiểm tra và phát hiện lỗi trong quy trình chất lượng."
  },
  {
    id: 245,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình hậu cần (logistics) không?",
    options: [
      "Có, tối ưu hóa vận chuyển và kho bãi",
      "Không, logistics phức tạp",
      "Chỉ theo dõi đơn hàng",
      "Tùy vào quy mô"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tối ưu hóa vận chuyển và quản lý kho bãi trong logistics."
  },
  {
    id: 246,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý rủi ro không?",
    options: [
      "Có, phát hiện và đánh giá rủi ro tự động",
      "Không, rủi ro cần con người",
      "Chỉ cảnh báo rủi ro",
      "Tùy vào lĩnh vực"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phát hiện và đánh giá rủi ro tự động trong quy trình."
  },
  {
    id: 247,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình bảo trì thiết bị không?",
    options: [
      "Có, dự đoán và lên lịch bảo trì",
      "Không, bảo trì cần kỹ thuật",
      "Chỉ nhắc lịch bảo trì",
      "Tùy vào thiết bị"
    ],
    answer: 0,
    explanation: "AI hỗ trợ dự đoán và lên lịch bảo trì thiết bị tự động."
  },
  {
    id: 248,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý hợp đồng không?",
    options: [
      "Có, phân tích và theo dõi hợp đồng",
      "Không, hợp đồng cần pháp lý",
      "Chỉ lưu trữ hợp đồng",
      "Tùy vào loại hợp đồng"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và theo dõi hợp đồng trong quy trình quản lý."
  },
  {
    id: 249,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình ra quyết định nhóm không?",
    options: [
      "Có, tổng hợp và phân tích ý kiến",
      "Không, quyết định nhóm cần con người",
      "Chỉ thu thập ý kiến",
      "Tùy vào nhóm"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tổng hợp và phân tích ý kiến trong quyết định nhóm."
  },
  {
    id: 250,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình sáng tạo không?",
    options: [
      "Có, đề xuất ý tưởng và tạo nguyên mẫu",
      "Không, sáng tạo là của con người",
      "Chỉ đề xuất ý tưởng",
      "Tùy vào lĩnh vực"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đề xuất ý tưởng và tạo nguyên mẫu trong quy trình sáng tạo."
  },
  {
    id: 251,
    competency: 7,
    level: "medium",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình đổi mới sáng tạo không?",
    options: [
      "Có, phân tích xu hướng và đề xuất cải tiến",
      "Không, đổi mới cần con người",
      "Chỉ phân tích dữ liệu",
      "Tùy vào lĩnh vực"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích xu hướng và đề xuất cải tiến trong đổi mới."
  },

  // Hard (14 câu)
  {
    id: 252,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "Chiến lược nào giúp tối ưu AI Workflow trong doanh nghiệp?",
    options: [
      "Áp dụng từng bước, đo lường và cải tiến liên tục",
      "Triển khai toàn bộ ngay lập tức",
      "Không cần đo lường",
      "Sao chép từ công ty khác"
    ],
    answer: 0,
    explanation: "Cần áp dụng từng bước, đo lường và cải tiến liên tục để tối ưu workflow."
  },
  {
    id: 253,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý thay đổi không?",
    options: [
      "Có, phân tích tác động và đề xuất điều chỉnh",
      "Không, quản lý thay đổi cần con người",
      "Chỉ ghi nhận thay đổi",
      "Tùy vào thay đổi"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích tác động và đề xuất điều chỉnh trong quản lý thay đổi."
  },
  {
    id: 254,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình phân tích nguyên nhân gốc rễ không?",
    options: [
      "Có, phân tích dữ liệu và xác định nguyên nhân",
      "Không, cần chuyên gia",
      "Chỉ phân tích bề mặt",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu để xác định nguyên nhân gốc rễ của vấn đề."
  },
  {
    id: 255,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình lập kế hoạch chiến lược không?",
    options: [
      "Có, phân tích môi trường và đề xuất chiến lược",
      "Không, chiến lược cần tầm nhìn",
      "Chỉ phân tích thị trường",
      "Tùy vào doanh nghiệp"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích môi trường và đề xuất chiến lược."
  },
  {
    id: 256,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình kiểm toán nội bộ không?",
    options: [
      "Có, phân tích dữ liệu và phát hiện bất thường",
      "Không, kiểm toán cần chuyên gia",
      "Chỉ thu thập dữ liệu",
      "Tùy vào quy mô"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và phát hiện bất thường trong kiểm toán."
  },
  {
    id: 257,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "Làm thế nào để đo lường hiệu quả của AI Workflow?",
    options: [
      "So sánh thời gian, chất lượng và chi phí trước và sau khi áp dụng",
      "Chỉ đo thời gian",
      "Không cần đo lường",
      "Đo lường bằng cảm nhận"
    ],
    answer: 0,
    explanation: "Cần so sánh thời gian, chất lượng và chi phí trước và sau khi áp dụng AI."
  },
  {
    id: 258,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình tối ưu hóa chuỗi cung ứng không?",
    options: [
      "Có, dự báo và tối ưu hóa toàn bộ chuỗi",
      "Không, chuỗi cung ứng phức tạp",
      "Chỉ dự báo nhu cầu",
      "Tùy vào ngành"
    ],
    answer: 0,
    explanation: "AI hỗ trợ dự báo và tối ưu hóa toàn bộ chuỗi cung ứng."
  },
  {
    id: 259,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý tri thức không?",
    options: [
      "Có, thu thập, tổ chức và chia sẻ tri thức",
      "Không, tri thức cần con người",
      "Chỉ lưu trữ tài liệu",
      "Tùy vào tổ chức"
    ],
    answer: 0,
    explanation: "AI hỗ trợ thu thập, tổ chức và chia sẻ tri thức trong tổ chức."
  },
  {
    id: 260,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình ra quyết định chiến lược không?",
    options: [
      "Có, phân tích dữ liệu và mô phỏng kịch bản",
      "Không, chiến lược cần con người",
      "Chỉ phân tích dữ liệu",
      "Tùy vào chiến lược"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và mô phỏng kịch bản cho chiến lược."
  },
  {
    id: 261,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình báo cáo tuân thủ không?",
    options: [
      "Có, tự động thu thập và tạo báo cáo",
      "Không, tuân thủ cần con người",
      "Chỉ thu thập dữ liệu",
      "Tùy vào quy định"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tự động thu thập và tạo báo cáo tuân thủ."
  },
  {
    id: 262,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "Khi AI Workflow gặp lỗi, cách xử lý nào tốt nhất?",
    options: [
      "Xác định nguyên nhân, sửa lỗi và cải thiện quy trình",
      "Dừng toàn bộ workflow",
      "Bỏ qua lỗi",
      "Sử dụng workflow khác"
    ],
    answer: 0,
    explanation: "Cần xác định nguyên nhân, sửa lỗi và cải thiện quy trình."
  },
  {
    id: 263,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý chất lượng tổng thể không?",
    options: [
      "Có, từ giám sát đến cải tiến liên tục",
      "Không, chất lượng cần con người",
      "Chỉ giám sát chất lượng",
      "Tùy vào tiêu chuẩn"
    ],
    answer: 0,
    explanation: "AI hỗ trợ toàn bộ quy trình quản lý chất lượng từ giám sát đến cải tiến."
  },
  {
    id: 264,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "AI có thể hỗ trợ quy trình quản lý năng lượng không?",
    options: [
      "Có, tối ưu hóa tiêu thụ năng lượng",
      "Không, cần chuyên gia năng lượng",
      "Chỉ theo dõi tiêu thụ",
      "Tùy vào quy mô"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tối ưu hóa tiêu thụ năng lượng trong tổ chức."
  },
  {
    id: 265,
    competency: 7,
    level: "hard",
    category: "WORKFLOW",
    type: "single",
    question: "Nguyên tắc nào quan trọng khi thiết kế AI Workflow?",
    options: [
      "Lấy con người làm trung tâm, AI là công cụ hỗ trợ",
      "Lấy AI làm trung tâm",
      "Tự động hóa mọi thứ",
      "Không cần con người"
    ],
    answer: 0,
    explanation: "Cần lấy con người làm trung tâm và AI là công cụ hỗ trợ."
  }
];

// ============================================================
// 9. COMPETENCY 8 — GROW WITH AI (35 câu)
// ============================================================
const COMPETENCY_8 = [
  // Easy (12 câu)
  {
    id: 266,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI Productivity Challenge là gì?",
    options: [
      "Bài kiểm tra tổng hợp năng lực làm việc với AI",
      "Một cuộc thi lập trình",
      "Khóa học nâng cao",
      "Chứng chỉ AI"
    ],
    answer: 0,
    explanation: "AI Productivity Challenge là bài kiểm tra tổng hợp năng lực làm việc với AI."
  },
  {
    id: 267,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "Mục tiêu của AI Productivity Challenge là gì?",
    options: [
      "Đánh giá khả năng ứng dụng AI vào công việc thực tế",
      "Kiểm tra lý thuyết AI",
      "Đo lường tốc độ đánh máy",
      "Kiểm tra khả năng lập trình"
    ],
    answer: 0,
    explanation: "Challenge đánh giá khả năng ứng dụng AI vào công việc thực tế."
  },
  {
    id: 268,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết tình huống kinh doanh như thế nào?",
    options: [
      "Phân tích và đề xuất giải pháp",
      "Tự quyết định thay người",
      "Bỏ qua vấn đề",
      "Không hỗ trợ"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất giải pháp cho tình huống kinh doanh."
  },
  {
    id: 269,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề trong văn phòng không?",
    options: [
      "Có, phân tích và đề xuất cải tiến",
      "Không, cần con người",
      "Chỉ báo cáo vấn đề",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất cải tiến cho vấn đề văn phòng."
  },
  {
    id: 270,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề marketing không?",
    options: [
      "Có, phân tích dữ liệu và đề xuất chiến lược",
      "Không, marketing cần sáng tạo",
      "Chỉ phân tích dữ liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và đề xuất chiến lược marketing."
  },
  {
    id: 271,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề nhân sự không?",
    options: [
      "Có, phân tích và đề xuất giải pháp nhân sự",
      "Không, nhân sự cần con người",
      "Chỉ phân tích dữ liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất giải pháp cho vấn đề nhân sự."
  },
  {
    id: 272,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề tài chính không?",
    options: [
      "Có, phân tích dữ liệu và đề xuất giải pháp",
      "Không, tài chính cần chuyên gia",
      "Chỉ phân tích số liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và đề xuất giải pháp tài chính."
  },
  {
    id: 273,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề vận hành không?",
    options: [
      "Có, tối ưu hóa quy trình và đề xuất cải tiến",
      "Không, vận hành cần con người",
      "Chỉ phân tích quy trình",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tối ưu hóa quy trình và đề xuất cải tiến vận hành."
  },
  {
    id: 274,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề khách hàng không?",
    options: [
      "Có, phân tích và đề xuất giải pháp",
      "Không, khách hàng cần con người",
      "Chỉ trả lời câu hỏi",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất giải pháp cho vấn đề khách hàng."
  },
  {
    id: 275,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề công nghệ không?",
    options: [
      "Có, phân tích và đề xuất giải pháp kỹ thuật",
      "Không, công nghệ cần chuyên gia",
      "Chỉ phân tích vấn đề",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất giải pháp cho vấn đề công nghệ."
  },
  {
    id: 276,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề chiến lược không?",
    options: [
      "Có, phân tích và đề xuất định hướng",
      "Không, chiến lược cần tầm nhìn",
      "Chỉ phân tích thị trường",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất định hướng chiến lược."
  },
  {
    id: 277,
    competency: 8,
    level: "easy",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề đổi mới không?",
    options: [
      "Có, đề xuất ý tưởng và giải pháp mới",
      "Không, đổi mới cần con người",
      "Chỉ phân tích xu hướng",
      "Tùy vào lĩnh vực"
    ],
    answer: 0,
    explanation: "AI hỗ trợ đề xuất ý tưởng và giải pháp mới cho đổi mới."
  },

  // Medium (12 câu)
  {
    id: 278,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "Trong Business Case, AI có thể giúp phân tích như thế nào?",
    options: [
      "Phân tích dữ liệu và đề xuất giải pháp cụ thể",
      "Tự quyết định thay người",
      "Bỏ qua phân tích",
      "Chỉ báo cáo dữ liệu"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và đề xuất giải pháp cụ thể."
  },
  {
    id: 279,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề phức tạp không?",
    options: [
      "Có, phân tích đa chiều và đề xuất giải pháp",
      "Không, vấn đề phức tạp cần con người",
      "Chỉ phân tích một chiều",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích đa chiều và đề xuất giải pháp cho vấn đề phức tạp."
  },
  {
    id: 280,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề đa ngành không?",
    options: [
      "Có, tổng hợp kiến thức từ nhiều lĩnh vực",
      "Không, chỉ chuyên môn hóa",
      "Chỉ phân tích một ngành",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ tổng hợp kiến thức từ nhiều lĩnh vực để giải quyết vấn đề."
  },
  {
    id: 281,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề khủng hoảng không?",
    options: [
      "Có, phân tích nhanh và đề xuất giải pháp",
      "Không, khủng hoảng cần con người",
      "Chỉ phân tích tình huống",
      "Tùy vào khủng hoảng"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích nhanh và đề xuất giải pháp trong khủng hoảng."
  },
  {
    id: 282,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề có tính thời gian cao không?",
    options: [
      "Có, xử lý nhanh và chính xác",
      "Không, cần thời gian suy nghĩ",
      "Chỉ xử lý khi có đủ thời gian",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI có thể xử lý nhanh và chính xác các vấn đề có tính thời gian cao."
  },
  {
    id: 283,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề liên quan đến dữ liệu lớn không?",
    options: [
      "Có, xử lý và phân tích dữ liệu lớn",
      "Không, dữ liệu lớn cần công cụ khác",
      "Chỉ xử lý được một phần",
      "Tùy vào dữ liệu"
    ],
    answer: 0,
    explanation: "AI có thể xử lý và phân tích dữ liệu lớn hiệu quả."
  },
  {
    id: 284,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề toàn cầu không?",
    options: [
      "Có, phân tích dữ liệu đa quốc gia",
      "Không, vấn đề toàn cầu phức tạp",
      "Chỉ phân tích khu vực",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu đa quốc gia để giải quyết vấn đề toàn cầu."
  },
  {
    id: 285,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề xã hội không?",
    options: [
      "Có, phân tích dữ liệu và đề xuất giải pháp",
      "Không, vấn đề xã hội cần con người",
      "Chỉ phân tích dữ liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và đề xuất giải pháp cho vấn đề xã hội."
  },
  {
    id: 286,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề môi trường không?",
    options: [
      "Có, phân tích dữ liệu môi trường",
      "Không, môi trường cần chuyên gia",
      "Chỉ phân tích dữ liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu môi trường để đề xuất giải pháp."
  },
  {
    id: 287,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề y tế không?",
    options: [
      "Có, hỗ trợ chẩn đoán và đề xuất điều trị",
      "Không, y tế cần bác sĩ",
      "Chỉ phân tích dữ liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ chẩn đoán và đề xuất điều trị trong y tế."
  },
  {
    id: 288,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề giáo dục không?",
    options: [
      "Có, cá nhân hóa học tập và đề xuất cải tiến",
      "Không, giáo dục cần con người",
      "Chỉ cung cấp tài liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ cá nhân hóa học tập và đề xuất cải tiến giáo dục."
  },
  {
    id: 289,
    competency: 8,
    level: "medium",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề nông nghiệp không?",
    options: [
      "Có, phân tích dữ liệu và đề xuất giải pháp",
      "Không, nông nghiệp cần chuyên gia",
      "Chỉ phân tích dữ liệu",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích dữ liệu và đề xuất giải pháp cho nông nghiệp."
  },

  // Hard (11 câu)
  {
    id: 290,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "Trong AI Productivity Challenge, yếu tố nào được đánh giá quan trọng nhất?",
    options: [
      "Khả năng ứng dụng tổng hợp các năng lực AI",
      "Tốc độ trả lời câu hỏi",
      "Số lượng công cụ AI biết sử dụng",
      "Kiến thức lý thuyết AI"
    ],
    answer: 0,
    explanation: "Challenge đánh giá khả năng ứng dụng tổng hợp các năng lực AI."
  },
  {
    id: 291,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề có nhiều bên liên quan không?",
    options: [
      "Có, phân tích và đề xuất giải pháp cân bằng",
      "Không, vấn đề đa bên phức tạp",
      "Chỉ phân tích lợi ích",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất giải pháp cân bằng cho đa bên liên quan."
  },
  {
    id: 292,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề mang tính chính trị không?",
    options: [
      "Hỗ trợ phân tích dữ liệu, nhưng cần con người quyết định",
      "Có, AI quyết định thay",
      "Không, chính trị chỉ của con người",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích, nhưng quyết định cuối cùng thuộc về con người."
  },
  {
    id: 293,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề có tác động dài hạn không?",
    options: [
      "Có, mô phỏng và dự báo tác động",
      "Không, tác động dài hạn khó dự đoán",
      "Chỉ phân tích ngắn hạn",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ mô phỏng và dự báo tác động dài hạn."
  },
  {
    id: 294,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề về đạo đức không?",
    options: [
      "Hỗ trợ phân tích, nhưng con người quyết định đạo đức",
      "Có, AI quyết định đạo đức",
      "Không, đạo đức chỉ của con người",
      "Tùy vào tình huống"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích, nhưng quyết định đạo đức cần con người."
  },
  {
    id: 295,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề về pháp lý không?",
    options: [
      "Hỗ trợ phân tích, nhưng cần chuyên gia pháp lý",
      "Có, AI thay thế luật sư",
      "Không, pháp lý chỉ của con người",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích nhưng cần chuyên gia pháp lý kiểm tra."
  },
  {
    id: 296,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề về bảo mật không?",
    options: [
      "Có, phát hiện và đề xuất giải pháp bảo mật",
      "Không, bảo mật cần chuyên gia",
      "Chỉ phát hiện mối đe dọa",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phát hiện và đề xuất giải pháp bảo mật."
  },
  {
    id: 297,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề về quyền riêng tư không?",
    options: [
      "Hỗ trợ phân tích và đề xuất giải pháp",
      "Có, AI bảo vệ quyền riêng tư",
      "Không, quyền riêng tư chỉ của con người",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất giải pháp cho quyền riêng tư."
  },
  {
    id: 298,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "Khi giải quyết Business Case, cách sử dụng AI hiệu quả nhất là gì?",
    options: [
      "Kết hợp AI với kinh nghiệm và đánh giá thực tế",
      "Để AI làm thay",
      "Không sử dụng AI",
      "Chỉ sử dụng AI một phần"
    ],
    answer: 0,
    explanation: "Cần kết hợp AI với kinh nghiệm và đánh giá thực tế."
  },
  {
    id: 299,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "AI có thể hỗ trợ giải quyết vấn đề không có dữ liệu không?",
    options: [
      "Hạn chế, cần ít nhất một số dữ liệu để phân tích",
      "Có, AI tự tạo dữ liệu",
      "Không, không thể",
      "Tùy vào vấn đề"
    ],
    answer: 0,
    explanation: "AI cần dữ liệu để phân tích, nhưng có thể làm việc với ít dữ liệu."
  },
  {
    id: 300,
    competency: 8,
    level: "hard",
    category: "CHALLENGE",
    type: "single",
    question: "Nguyên tắc cuối cùng khi hoàn thành AI Productivity Challenge là gì?",
    options: [
      "Luôn đánh giá và cải thiện quy trình làm việc với AI",
      "Kết thúc và không cần học nữa",
      "Chỉ cần đạt điểm",
      "Không cần đánh giá"
    ],
    answer: 0,
    explanation: "Luôn cần đánh giá và cải thiện quy trình làm việc với AI để phát triển liên tục."
  }
];

// ============================================================
// 10. EXPORT — Tổng hợp Question Bank
// ============================================================
const AI_PRODUCTIVITY_QUESTIONS = [
  ...COMPETENCY_1,
  ...COMPETENCY_2,
  ...COMPETENCY_3,
  ...COMPETENCY_4,
  ...COMPETENCY_5,
  ...COMPETENCY_6,
  ...COMPETENCY_7,
  ...COMPETENCY_8
];

// ============================================================
// 11. HELPER FUNCTIONS
// ============================================================
function getQuestionsByCompetency(competencyId) {
  return AI_PRODUCTIVITY_QUESTIONS.filter(q => q.competency === competencyId);
}

function getQuestionsByLevel(level) {
  return AI_PRODUCTIVITY_QUESTIONS.filter(q => q.level === level);
}

function getQuestionsByCategory(category) {
  return AI_PRODUCTIVITY_QUESTIONS.filter(q => q.category === category);
}

function getQuestionsByType(type) {
  return AI_PRODUCTIVITY_QUESTIONS.filter(q => q.type === type);
}

function getRandomQuestions(count) {
  const shuffled = [...AI_PRODUCTIVITY_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getCompetencyStats() {
  const stats = {};
  for (let i = 1; i <= 8; i++) {
    const questions = getQuestionsByCompetency(i);
    stats[i] = {
      total: questions.length,
      easy: questions.filter(q => q.level === 'easy').length,
      medium: questions.filter(q => q.level === 'medium').length,
      hard: questions.filter(q => q.level === 'hard').length
    };
  }
  return stats;
}

// ============================================================
// 12. EXPORT
// ============================================================
// CommonJS: module.exports = { 
//   AI_PRODUCTIVITY_QUESTIONS,
//   getQuestionsByCompetency,
//   getQuestionsByLevel,
//   getQuestionsByCategory,
//   getQuestionsByType,
//   getRandomQuestions,
//   getCompetencyStats,
//   AI_QB_CONFIG
// };

// ES Modules: export { 
//   AI_PRODUCTIVITY_QUESTIONS,
//   getQuestionsByCompetency,
//   getQuestionsByLevel,
//   getQuestionsByCategory,
//   getQuestionsByType,
//   getRandomQuestions,
//   getCompetencyStats,
//   AI_QB_CONFIG
// };

// ============================================================
// HOW TO USE:
// 1. Copy this entire file to courses/ai-productivity-questionbank.js
// 2. Import functions: 
//    import { AI_PRODUCTIVITY_QUESTIONS, getQuestionsByCompetency } from './courses/ai-productivity-questionbank.js'
// 3. Use in practice, quiz, mock test components
// ============================================================
// ============================================================
// MOS360 PLATFORM EXPORT
// ============================================================
export default AI_PRODUCTIVITY_QUESTIONS;
