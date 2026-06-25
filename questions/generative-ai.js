// ============================================================
// GENERATIVE_AI — NGÂN HÀNG CÂU HỎI
// ============================================================
//
// ID RANGE:
// 1  → 19  : FOUNDATION
// 20 → 38  : PROMPTING
// 39 → 64  : ETHICS / RESPONSIBLE AI
// 65 → 73  : FOUNDATION 2
// 74 → 82  : TOOLS
// 83 → 91  : PROMPTING ADVANCED
// 92 → 109 : ETHICS 2
// ============================================================

export const GENERATIVE_AI = [

  // ============================================================
  // FOUNDATION (ID 1 → 19)
  // ============================================================

  {
    id: 1,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Generative AI được định nghĩa là gì?",
    options: [
      "AI dự đoán xu hướng tương lai",
      "AI tạo ra nội dung mới dựa trên dữ liệu đã học",
      "AI phân tích dữ liệu lớn",
      "AI mô phỏng hành vi người dùng"
    ],
    answer: 1,
    explanation: "Generative AI là loại trí tuệ nhân tạo có khả năng tạo ra nội dung mới như văn bản, hình ảnh, âm thanh hoặc mã nguồn dựa trên dữ liệu đã được huấn luyện."
  },

  {
    id: 2,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Điểm khác biệt chính giữa Generative AI và AI dự đoán (Predictive AI) là gì?",
    options: [
      "AI dự đoán tạo ra nội dung mới",
      "AI dự đoán chỉ được dùng cho hình ảnh",
      "Generative AI tạo nội dung mới, còn Predictive AI dự đoán kết quả hoặc xu hướng",
      "Generative AI luôn hoạt động nhanh hơn"
    ],
    answer: 2,
    explanation: "Generative AI tạo ra nội dung mới, trong khi Predictive AI chủ yếu dùng để dự đoán hoặc phân loại dựa trên dữ liệu."
  },

  {
    id: 3,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Công cụ AI nào dưới đây chủ yếu được thiết kế để tạo hình ảnh thay vì hỗ trợ hội thoại bằng văn bản?",
    options: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Midjourney"
    ],
    answer: 3,
    explanation: "Midjourney chuyên tạo hình ảnh từ mô tả văn bản, trong khi ChatGPT, Claude và Gemini chủ yếu hỗ trợ hội thoại và tạo nội dung."
  },

  {
    id: 4,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "LLM là viết tắt của cụm từ nào?",
    options: [
      "Large Language Model",
      "Long Learning Machine",
      "Logical Language Method",
      "Large Logic Memory"
    ],
    answer: 0,
    explanation: "LLM (Large Language Model) là mô hình ngôn ngữ lớn có khả năng hiểu và tạo nội dung bằng ngôn ngữ tự nhiên."
  },

  {
    id: 5,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Đầu vào (input) phổ biến nhất của các mô hình ngôn ngữ lớn (LLM) là gì?",
    options: [
      "Prompt văn bản",
      "RAM",
      "Video 4K",
      "BIOS"
    ],
    answer: 0,
    explanation: "Người dùng thường tương tác với LLM thông qua Prompt bằng văn bản để yêu cầu AI thực hiện một nhiệm vụ."
  },

  {
    id: 6,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Bạn yêu cầu AI viết một email xin nghỉ phép. Kết quả nào dưới đây là đầu ra của Generative AI?",
    options: [
      "Một email hoàn chỉnh",
      "Mainboard",
      "Ổ SSD",
      "CPU"
    ],
    answer: 0,
    explanation: "Generative AI có thể tạo ra nội dung mới như email, bài viết, báo cáo, hình ảnh hoặc mã nguồn theo yêu cầu của người dùng."
  },

  {
    id: 7,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Mô hình AI nào nổi tiếng với khả năng tạo hình ảnh từ mô tả văn bản?",
    options: [
      "Stable Diffusion",
      "Excel",
      "Notepad",
      "Access"
    ],
    answer: 0,
    explanation: "Stable Diffusion là một mô hình Generative AI phổ biến dùng để tạo hình ảnh từ mô tả bằng văn bản."
  },

  {
    id: 8,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Generative AI hiện nay có thể tạo ra những loại nội dung nào?",
    options: [
      "Chỉ văn bản",
      "Chỉ hình ảnh",
      "Chỉ âm thanh",
      "Văn bản, hình ảnh, âm thanh và nhiều loại nội dung khác"
    ],
    answer: 3,
    explanation: "Các mô hình Generative AI hiện đại có thể tạo nhiều loại nội dung như văn bản, hình ảnh, âm thanh, video và mã nguồn."
  },

  {
    id: 9,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Kiến trúc Transformer nổi tiếng nhờ khả năng gì?",
    options: [
      "Xử lý ngôn ngữ tự nhiên",
      "Tăng tốc ổ cứng",
      "Mã hóa BIOS",
      "Nâng cấp RAM"
    ],
    answer: 0,
    explanation: "Transformer là nền tảng của hầu hết các mô hình ngôn ngữ lớn (LLM) hiện đại nhờ khả năng xử lý và tạo ngôn ngữ tự nhiên hiệu quả."
  },

  {
    id: 10,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Mô hình đa phương thức (Multimodal) có khả năng gì?",
    options: [
      "Xử lý nhiều loại dữ liệu như văn bản và hình ảnh",
      "Chỉ xử lý văn bản",
      "Chỉ xử lý âm thanh",
      "Chỉ xử lý hình ảnh"
    ],
    answer: 0,
    explanation: "Multimodal AI có thể tiếp nhận và xử lý nhiều loại dữ liệu khác nhau như văn bản, hình ảnh, âm thanh hoặc video trong cùng một hệ thống."
  },

  {
    id: 11,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Ví dụ nào dưới đây là một mô hình AI đa phương thức (Multimodal)?",
    options: [
      "Gemini",
      "Notepad",
      "Paint",
      "WordPad"
    ],
    answer: 0,
    explanation: "Gemini là mô hình AI đa phương thức có thể xử lý đồng thời văn bản, hình ảnh và nhiều loại dữ liệu khác."
  },

  {
    id: 12,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Trong AI, Token được hiểu là gì?",
    options: [
      "Đơn vị dữ liệu mà mô hình AI xử lý",
      "Loại CPU",
      "Loại GPU",
      "Bộ nhớ RAM"
    ],
    answer: 0,
    explanation: "Token là đơn vị nhỏ mà AI sử dụng để đọc và tạo văn bản. Số lượng Token ảnh hưởng đến độ dài nội dung AI có thể xử lý hoặc tạo ra trong một lần."
  },

  {
    id: 13,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Các mô hình ngôn ngữ lớn (LLM) được huấn luyện trên nguồn dữ liệu nào?",
    options: [
      "Khối lượng dữ liệu rất lớn",
      "Một file Word",
      "Một ảnh PNG",
      "Một bảng Excel"
    ],
    answer: 0,
    explanation: "LLM được huấn luyện trên lượng dữ liệu rất lớn để học cách hiểu và tạo ngôn ngữ tự nhiên."
  },

  {
    id: 14,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Vì sao việc huấn luyện các mô hình AI lớn thường tốn nhiều chi phí?",
    options: [
      "Cần tài nguyên tính toán mạnh như GPU và lượng dữ liệu lớn",
      "Cần nhiều giấy in",
      "Cần máy fax",
      "Cần ổ đĩa mềm"
    ],
    answer: 0,
    explanation: "Việc huấn luyện AI hiện đại cần lượng dữ liệu rất lớn cùng hệ thống GPU mạnh để thực hiện hàng tỷ phép tính."
  },

  {
    id: 15,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Khi sử dụng AI, thuật ngữ 'Token' thường dùng để chỉ điều gì?",
    options: [
      "Đơn vị dữ liệu mà AI xử lý",
      "Loại GPU",
      "Loại RAM",
      "Loại CPU"
    ],
    answer: 0,
    explanation: "Token là đơn vị dữ liệu mà AI sử dụng để đọc và tạo văn bản. Hiểu về Token giúp người dùng biết vì sao AI có giới hạn về độ dài câu trả lời."
  },

  {
    id: 16,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Đâu KHÔNG phải là đầu ra của Generative AI?",
    options: [
      "Văn bản",
      "Hình ảnh",
      "Âm thanh",
      "Nguồn điện"
    ],
    answer: 3,
    explanation: "Generative AI tạo ra nội dung số như văn bản, hình ảnh, âm thanh hoặc video, chứ không tạo ra các đối tượng vật lý như nguồn điện."
  },

  {
    id: 17,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Mục tiêu chính của Generative AI là gì?",
    options: [
      "Tạo ra nội dung mới có ý nghĩa",
      "Tăng tốc Internet",
      "Nâng cấp phần cứng",
      "Tăng dung lượng RAM"
    ],
    answer: 0,
    explanation: "Generative AI được thiết kế để tạo ra nội dung mới dựa trên dữ liệu đã học nhằm hỗ trợ học tập, làm việc và sáng tạo."
  },

  {
    id: 18,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "easy",
    type: "single",
    question: "Generative AI hiện nay được ứng dụng phổ biến nhất trong lĩnh vực nào?",
    options: [
      "Học tập, sáng tạo nội dung và hỗ trợ công việc",
      "Sửa chữa bo mạch điện tử",
      "Sản xuất CPU",
      "Lắp ráp ổ cứng"
    ],
    answer: 0,
    explanation: "Generative AI đang được ứng dụng rộng rãi để viết nội dung, hỗ trợ học tập, phân tích thông tin, lập kế hoạch và nâng cao năng suất làm việc."
  },

  {
    id: 19,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Dữ liệu huấn luyện (Training Data) có vai trò gì trong AI?",
    options: [
      "Giúp mô hình học các quy luật từ dữ liệu",
      "Tăng tốc độ Internet",
      "Tăng dung lượng RAM",
      "Thay đổi hệ điều hành"
    ],
    answer: 0,
    explanation: "AI học từ dữ liệu huấn luyện để nhận biết quy luật và tạo ra dự đoán hoặc nội dung mới."
  },


  // ============================================================
  // PROMPTING (ID 20 → 38)
  // ============================================================

  {
    id: 20,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Prompt trong Generative AI là gì?",
    options: [
      "Yêu cầu hoặc hướng dẫn gửi cho AI",
      "Kết quả do AI tạo ra",
      "Bộ nhớ của AI",
      "Máy chủ AI"
    ],
    answer: 0,
    explanation: "Prompt là yêu cầu hoặc hướng dẫn mà người dùng gửi cho AI để AI thực hiện một nhiệm vụ hoặc tạo nội dung theo mong muốn."
  },

  {
    id: 21,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Một Prompt hiệu quả thường có đặc điểm nào?",
    options: [
      "Rõ ràng, cụ thể và có mục tiêu",
      "Mơ hồ để AI tự suy luận",
      "Ngắn nhất có thể",
      "Không cần nêu yêu cầu"
    ],
    answer: 0,
    explanation: "Prompt càng rõ ràng và cụ thể thì AI càng dễ hiểu đúng yêu cầu và tạo ra kết quả phù hợp."
  },

  {
    id: 22,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Prompt càng chi tiết thì thường mang lại lợi ích gì?",
    options: [
      "Kết quả sát với yêu cầu hơn",
      "AI sẽ ngừng hoạt động",
      "Làm mất dữ liệu",
      "Giảm tốc độ Internet"
    ],
    answer: 0,
    explanation: "Việc bổ sung đầy đủ mục tiêu, ngữ cảnh và yêu cầu giúp AI tạo ra kết quả chính xác và hữu ích hơn."
  },

  {
    id: 23,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Vai trò của ngữ cảnh (Context) trong Prompt là gì?",
    options: [
      "Giúp AI hiểu rõ tình huống để trả lời phù hợp",
      "Tăng dung lượng RAM",
      "Giảm kích thước dữ liệu",
      "Tăng tốc CPU"
    ],
    answer: 0,
    explanation: "Context giúp AI hiểu bối cảnh của yêu cầu, từ đó đưa ra câu trả lời phù hợp và chính xác hơn."
  },

  {
    id: 24,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Prompt nào dưới đây sẽ cho kết quả tốt hơn?",
    options: [
      "Viết email xin nghỉ phép lịch sự, khoảng 150 từ.",
      "Viết gì đó đi.",
      "Email.",
      "Nghỉ phép."
    ],
    answer: 0,
    explanation: "Prompt nêu rõ mục tiêu, nội dung và yêu cầu cụ thể sẽ giúp AI tạo ra kết quả chất lượng hơn."
  },

  {
    id: 25,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Role Prompting là kỹ thuật gì?",
    options: [
      "Yêu cầu AI trả lời theo một vai trò cụ thể",
      "Huấn luyện lại mô hình AI",
      "Giảm số lượng Token",
      "Nén dữ liệu trước khi gửi"
    ],
    answer: 0,
    explanation: "Role Prompting là kỹ thuật yêu cầu AI đóng vai một nhân vật hoặc chuyên gia để tạo ra câu trả lời phù hợp với vai trò đó."
  },

  {
    id: 26,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Vì sao nên xác định rõ đối tượng người đọc trong Prompt?",
    options: [
      "Để AI điều chỉnh cách diễn đạt phù hợp",
      "Để tăng tốc Internet",
      "Để giảm số lượng Token",
      "Để thay đổi giao diện AI"
    ],
    answer: 0,
    explanation: "Khi biết đối tượng người đọc, AI có thể lựa chọn ngôn ngữ, mức độ chi tiết và cách trình bày phù hợp."
  },

  {
    id: 27,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Việc yêu cầu AI trả lời theo một định dạng cụ thể mang lại lợi ích gì?",
    options: [
      "Kết quả có cấu trúc rõ ràng và dễ sử dụng hơn",
      "Tăng dung lượng RAM",
      "Tăng hiệu năng GPU",
      "Tăng tốc độ mạng"
    ],
    answer: 0,
    explanation: "Bạn có thể yêu cầu AI trình bày kết quả dưới dạng bảng, danh sách, JSON hoặc các định dạng khác để dễ đọc và dễ sử dụng."
  },

  {
    id: 28,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Đâu là ví dụ về yêu cầu định dạng đầu ra trong Prompt?",
    options: [
      "Trả lời dưới dạng bảng gồm 3 cột.",
      "Trả lời nhanh.",
      "Làm đi.",
      "Viết giúp."
    ],
    answer: 0,
    explanation: "Chỉ định rõ định dạng đầu ra giúp AI tạo kết quả đúng cấu trúc mong muốn và tiết kiệm thời gian chỉnh sửa."
  },

  {
    id: 29,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Zero-shot Prompting là gì?",
    options: [
      "Yêu cầu AI thực hiện nhiệm vụ mà không cung cấp ví dụ mẫu",
      "Cung cấp nhiều ví dụ trước khi yêu cầu AI",
      "Huấn luyện lại mô hình AI",
      "Xóa dữ liệu huấn luyện"
    ],
    answer: 0,
    explanation: "Zero-shot Prompting là cách yêu cầu AI thực hiện một nhiệm vụ mới mà không cần cung cấp ví dụ minh họa."
  },

  {
    id: 30,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Few-shot Prompting là gì?",
    options: [
      "Cung cấp một vài ví dụ mẫu trước khi AI thực hiện nhiệm vụ",
      "Không sử dụng ví dụ",
      "Huấn luyện lại AI",
      "Tạo dữ liệu mới"
    ],
    answer: 0,
    explanation: "Few-shot Prompting giúp AI hiểu rõ định dạng hoặc cách trả lời mong muốn thông qua một số ví dụ."
  },

  {
    id: 31,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Lợi ích lớn nhất của Few-shot Prompting là gì?",
    options: [
      "Giúp AI hiểu yêu cầu tốt hơn và tạo kết quả chính xác hơn",
      "Tăng tốc CPU",
      "Giảm dung lượng RAM",
      "Giảm chất lượng câu trả lời"
    ],
    answer: 0,
    explanation: "Các ví dụ mẫu giúp AI hiểu đúng định dạng và mong muốn của người dùng."
  },

  {
    id: 32,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Prompt Engineering được hiểu là gì?",
    options: [
      "Thiết kế và cải thiện Prompt để AI tạo kết quả tốt hơn",
      "Lập trình hệ điều hành",
      "Thiết kế phần cứng",
      "Xây dựng mạng máy tính"
    ],
    answer: 0,
    explanation: "Prompt Engineering là kỹ năng xây dựng và tối ưu Prompt để khai thác hiệu quả khả năng của AI."
  },

  {
    id: 33,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Một Prompt hiệu quả thường bao gồm những thành phần nào?",
    options: [
      "Mục tiêu, ngữ cảnh và định dạng đầu ra",
      "Tên CPU",
      "Tên GPU",
      "Dung lượng ổ cứng"
    ],
    answer: 0,
    explanation: "Ba thành phần quan trọng giúp AI hiểu đúng yêu cầu là mục tiêu, ngữ cảnh và định dạng mong muốn."
  },

  {
    id: 34,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Điều gì thường xảy ra nếu Prompt quá mơ hồ?",
    options: [
      "Kết quả dễ không đúng mong muốn",
      "AI hoạt động nhanh hơn",
      "RAM tăng lên",
      "GPU mạnh hơn"
    ],
    answer: 0,
    explanation: "Prompt thiếu rõ ràng khiến AI phải suy đoán nhiều hơn và dễ tạo ra kết quả không phù hợp."
  },

  {
    id: 35,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Vì sao nên thử nhiều cách viết Prompt khác nhau?",
    options: [
      "Để tìm ra cách diễn đạt mang lại kết quả tốt nhất",
      "Để tăng điện năng tiêu thụ",
      "Để giảm tốc độ xử lý",
      "Để xóa lịch sử trò chuyện"
    ],
    answer: 0,
    explanation: "Việc liên tục điều chỉnh Prompt (Prompt Iteration) là cách hiệu quả để cải thiện chất lượng câu trả lời của AI."
  },

  {
    id: 36,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "easy",
    type: "single",
    question: "Mục tiêu cuối cùng của Prompt Engineering là gì?",
    options: [
      "Nhận được kết quả chính xác, hữu ích và phù hợp với mục tiêu",
      "Tăng dung lượng ổ cứng",
      "Tăng số lượng Token",
      "Giảm hiệu suất AI"
    ],
    answer: 0,
    explanation: "Một Prompt tốt giúp khai thác tối đa khả năng của AI và giảm thời gian chỉnh sửa kết quả."
  },

  {
    id: 37,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Bạn muốn AI trả lời dưới dạng bảng gồm 3 cột. Bạn nên bổ sung điều gì vào Prompt?",
    options: [
      "Yêu cầu rõ định dạng đầu ra",
      "Chỉ viết câu hỏi",
      "Viết Prompt ngắn hơn",
      "Không cần bổ sung gì"
    ],
    answer: 0,
    explanation: "Việc chỉ định định dạng đầu ra (bảng, JSON, danh sách...) giúp AI tạo kết quả đúng nhu cầu và dễ sử dụng."
  },

  {
    id: 38,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Sau khi AI trả lời chưa đúng ý, cách làm nào hiệu quả nhất?",
    options: [
      "Chỉnh sửa Prompt và yêu cầu AI thực hiện lại",
      "Đổi máy tính",
      "Khởi động lại trình duyệt",
      "Xóa toàn bộ cuộc trò chuyện"
    ],
    answer: 0,
    explanation: "Prompt tốt thường được cải thiện qua nhiều lần thử. Điều chỉnh Prompt giúp AI hiểu rõ yêu cầu hơn."
  },


  // ============================================================
  // ETHICS / RESPONSIBLE AI (ID 39 → 64)
  // ============================================================

  {
    id: 39,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Hallucination trong AI là gì?",
    options: [
      "AI tạo ra thông tin không chính xác nhưng trình bày như đúng",
      "AI bị tắt đột ngột",
      "AI không có Internet",
      "AI xử lý quá nhanh"
    ],
    answer: 0,
    explanation: "Hallucination là hiện tượng AI tạo ra thông tin sai hoặc không có thật nhưng vẫn trả lời rất tự tin. Vì vậy người dùng cần kiểm chứng trước khi sử dụng."
  },

  {
    id: 40,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Khi AI trả lời một thông tin quan trọng, bạn nên làm gì?",
    options: [
      "Kiểm chứng bằng nguồn đáng tin cậy trước khi sử dụng",
      "Tin tưởng hoàn toàn",
      "Sao chép nguyên văn",
      "Không cần đọc lại"
    ],
    answer: 0,
    explanation: "AI có thể tạo ra thông tin chưa chính xác. Với các nội dung quan trọng, luôn cần kiểm chứng từ nguồn đáng tin cậy."
  },

  {
    id: 41,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Bias trong AI có thể gây ra hậu quả gì?",
    options: [
      "Đưa ra kết quả thiếu công bằng hoặc thiên lệch",
      "Tăng tốc độ xử lý",
      "Giảm dung lượng dữ liệu",
      "Tăng độ chính xác tuyệt đối"
    ],
    answer: 0,
    explanation: "Bias khiến AI có thể ưu tiên hoặc bất lợi cho một nhóm đối tượng, dẫn đến kết quả thiếu khách quan."
  },

  {
    id: 42,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Nguyên nhân phổ biến nhất dẫn đến AI Bias là gì?",
    options: [
      "Dữ liệu huấn luyện bị thiên lệch",
      "Tốc độ Internet",
      "Dung lượng RAM",
      "Loại CPU"
    ],
    answer: 0,
    explanation: "AI học từ dữ liệu. Nếu dữ liệu thiên lệch thì kết quả AI cũng có thể bị thiên lệch."
  },

  {
    id: 43,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Deepfake là gì?",
    options: [
      "Nội dung giả mạo được tạo bằng AI",
      "Loại phần cứng mới",
      "Mạng máy tính tốc độ cao",
      "Hệ điều hành AI"
    ],
    answer: 0,
    explanation: "Deepfake là hình ảnh, video hoặc giọng nói được AI tạo ra với mục đích mô phỏng rất giống thật."
  },

  {
    id: 44,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Rủi ro lớn nhất của Deepfake là gì?",
    options: [
      "Lan truyền thông tin sai lệch hoặc phục vụ lừa đảo",
      "Tăng tốc GPU",
      "Giảm dung lượng ổ cứng",
      "Tăng tuổi thọ thiết bị"
    ],
    answer: 0,
    explanation: "Deepfake có thể bị lợi dụng để giả mạo người khác, phát tán thông tin sai sự thật hoặc thực hiện các hành vi lừa đảo."
  },

  {
    id: 45,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Điều nào KHÔNG nên làm khi sử dụng các công cụ AI công cộng?",
    options: [
      "Nhập dữ liệu bí mật của cá nhân hoặc tổ chức",
      "Yêu cầu AI giải thích kiến thức",
      "Nhờ AI tóm tắt tài liệu",
      "Lập dàn ý cho bài viết"
    ],
    answer: 0,
    explanation: "Không nên nhập thông tin bí mật, dữ liệu khách hàng hoặc tài liệu nội bộ lên các hệ thống AI công cộng."
  },

  {
    id: 46,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "PII là viết tắt của cụm từ nào?",
    options: [
      "Personally Identifiable Information",
      "Personal Internet Integration",
      "Private Internal Interface",
      "Public Information Index"
    ],
    answer: 0,
    explanation: "PII (Personally Identifiable Information) là thông tin có thể dùng để xác định danh tính của một cá nhân."
  },

  {
    id: 47,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Thông tin nào dưới đây được xem là PII?",
    options: [
      "Số CCCD hoặc số hộ chiếu",
      "Tên môn học",
      "Tên phần mềm",
      "Tên trình duyệt"
    ],
    answer: 0,
    explanation: "Các thông tin như CCCD, hộ chiếu, số điện thoại hoặc địa chỉ email cá nhân đều thuộc nhóm PII và cần được bảo vệ."
  },

  {
    id: 48,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Khi sử dụng AI để tạo nội dung, vì sao cần quan tâm đến bản quyền (Copyright)?",
    options: [
      "Để tránh sử dụng hoặc sao chép tác phẩm của người khác trái phép",
      "Để AI trả lời nhanh hơn",
      "Để tăng dung lượng lưu trữ",
      "Để tăng tốc Internet"
    ],
    answer: 0,
    explanation: "Khi sử dụng AI, người dùng vẫn cần tôn trọng quyền sở hữu trí tuệ và kiểm tra nguồn gốc nội dung trước khi công bố hoặc sử dụng."
  },

  {
    id: 49,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Khi sử dụng AI để tạo nội dung, người dùng cần đặc biệt lưu ý điều gì?",
    options: [
      "Khả năng vi phạm bản quyền",
      "Màu nền màn hình",
      "Loại chuột đang sử dụng",
      "Dung lượng RAM"
    ],
    answer: 0,
    explanation: "AI có thể tạo ra nội dung tương tự các tác phẩm đã có. Người dùng cần kiểm tra bản quyền và nguồn gốc trước khi công bố hoặc sử dụng."
  },

  {
    id: 50,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Responsible AI được hiểu là gì?",
    options: [
      "Sử dụng AI một cách có trách nhiệm",
      "Chỉ sử dụng AI miễn phí",
      "Chỉ sử dụng AI ngoại tuyến",
      "Sử dụng AI mà không cần kiểm soát"
    ],
    answer: 0,
    explanation: "Responsible AI hướng tới việc sử dụng AI an toàn, công bằng, minh bạch và mang lại lợi ích cho con người."
  },

  {
    id: 51,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Human Oversight trong AI có nghĩa là gì?",
    options: [
      "Con người giám sát và chịu trách nhiệm đối với kết quả AI",
      "AI giám sát con người",
      "Máy chủ AI",
      "Hệ thống mạng AI"
    ],
    answer: 0,
    explanation: "AI chỉ là công cụ hỗ trợ. Với những quyết định quan trọng, con người vẫn là người chịu trách nhiệm cuối cùng."
  },

  {
    id: 52,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Tính minh bạch (Transparency) trong AI mang lại lợi ích gì?",
    options: [
      "Giúp người dùng hiểu và đánh giá kết quả AI tốt hơn",
      "Tăng dung lượng dữ liệu",
      "Tăng tốc CPU",
      "Giảm số lượng Token"
    ],
    answer: 0,
    explanation: "Minh bạch giúp người dùng hiểu cách AI đưa ra kết quả và tăng khả năng kiểm chứng."
  },

  {
    id: 53,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Đâu là ví dụ về việc sử dụng AI có trách nhiệm?",
    options: [
      "Kiểm tra thông tin trước khi công bố",
      "Đăng ngay mọi nội dung AI tạo",
      "Không đọc lại kết quả",
      "Tin tuyệt đối vào AI"
    ],
    answer: 0,
    explanation: "Người dùng cần kiểm tra và chịu trách nhiệm đối với nội dung trước khi chia sẻ hoặc sử dụng."
  },

  {
    id: 54,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Rủi ro lớn nhất khi đưa dữ liệu nhạy cảm vào AI công cộng là gì?",
    options: [
      "Rò rỉ thông tin",
      "AI chạy nhanh hơn",
      "Giảm dung lượng lưu trữ",
      "Tăng tuổi thọ thiết bị"
    ],
    answer: 0,
    explanation: "Không nên nhập thông tin khách hàng, tài liệu nội bộ hoặc dữ liệu bí mật lên các dịch vụ AI công cộng."
  },

  {
    id: 55,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Điều nào KHÔNG phải là nguyên tắc của Responsible AI?",
    options: [
      "Che giấu hoàn toàn cách AI hoạt động",
      "Công bằng",
      "Minh bạch",
      "An toàn"
    ],
    answer: 0,
    explanation: "Responsible AI khuyến khích tính minh bạch, không phải che giấu cách AI hoạt động."
  },

  {
    id: 56,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Nếu AI không chắc chắn hoặc không cung cấp nguồn đáng tin cậy, bạn nên làm gì?",
    options: [
      "Kiểm chứng bằng nguồn khác trước khi sử dụng",
      "Tin ngay kết quả",
      "Bỏ qua mọi nguồn khác",
      "Dừng việc học"
    ],
    answer: 0,
    explanation: "Tư duy phản biện và kiểm chứng thông tin luôn cần thiết khi làm việc với AI."
  },

  {
    id: 57,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Mục tiêu cuối cùng của Responsible AI là gì?",
    options: [
      "Mang lại lợi ích cho con người và xã hội một cách an toàn",
      "Tăng số lượng GPU",
      "Tăng số Token",
      "Giảm kích thước mô hình"
    ],
    answer: 0,
    explanation: "Responsible AI hướng tới việc phát triển và sử dụng AI một cách an toàn, công bằng, minh bạch và có trách nhiệm."
  },

  {
    id: 58,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Mục tiêu chính của AI Fairness (tính công bằng) là gì?",
    options: [
      "Giảm thiên lệch và đối xử công bằng với các nhóm người dùng",
      "Tăng tốc độ xử lý",
      "Giảm số lượng Token",
      "Tăng dung lượng dữ liệu"
    ],
    answer: 0,
    explanation: "AI Fairness hướng tới việc giảm thiên lệch trong dữ liệu và kết quả để mọi nhóm người dùng được đối xử công bằng."
  },

  {
    id: 59,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Biện pháp nào giúp giảm AI Bias hiệu quả nhất?",
    options: [
      "Sử dụng dữ liệu đa dạng và cân bằng",
      "Chỉ sử dụng một nguồn dữ liệu",
      "Giảm số lượng dữ liệu huấn luyện",
      "Bỏ qua quá trình kiểm thử"
    ],
    answer: 0,
    explanation: "Dữ liệu đa dạng và cân bằng giúp mô hình học đầy đủ hơn, từ đó giảm nguy cơ tạo ra kết quả thiên lệch."
  },

  {
    id: 60,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Vì sao cần đánh giá mô hình AI định kỳ?",
    options: [
      "Để phát hiện sai lệch hoặc rủi ro mới",
      "Để tăng RAM",
      "Để giảm số lượng người dùng",
      "Để thay đổi giao diện"
    ],
    answer: 0,
    explanation: "Dữ liệu và môi trường sử dụng luôn thay đổi, vì vậy mô hình AI cần được đánh giá định kỳ để đảm bảo chất lượng và an toàn."
  },

  {
    id: 61,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Điều gì có thể xảy ra nếu AI được sử dụng mà không có sự giám sát?",
    options: [
      "Gia tăng rủi ro sai lệch hoặc bị lạm dụng",
      "Độ chính xác luôn đạt 100%",
      "Loại bỏ hoàn toàn rủi ro",
      "Không cần kiểm tra kết quả"
    ],
    answer: 0,
    explanation: "AI cần được con người giám sát để giảm rủi ro, phát hiện sai sót và hạn chế việc sử dụng sai mục đích."
  },

  {
    id: 62,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Accountability trong AI đề cập đến điều gì?",
    options: [
      "Con người hoặc tổ chức chịu trách nhiệm về việc sử dụng AI",
      "Tốc độ xử lý của AI",
      "Kích thước mô hình",
      "Số lượng Token"
    ],
    answer: 0,
    explanation: "AI không chịu trách nhiệm pháp lý. Trách nhiệm cuối cùng vẫn thuộc về cá nhân hoặc tổ chức sử dụng AI."
  },

  {
    id: 63,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Khi sử dụng AI để hỗ trợ tuyển dụng, rủi ro nào cần đặc biệt lưu ý?",
    options: [
      "Thiên lệch trong đánh giá ứng viên",
      "Tăng dung lượng ổ cứng",
      "Giảm tốc độ mạng",
      "Tăng độ sáng màn hình"
    ],
    answer: 0,
    explanation: "Nếu dữ liệu hoặc mô hình thiên lệch, AI có thể đưa ra các đánh giá không công bằng đối với ứng viên."
  },

  {
    id: 64,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "medium",
    type: "single",
    question: "Trong môi trường làm việc, AI nên được xem là gì?",
    options: [
      "Công cụ hỗ trợ con người ra quyết định",
      "Người chịu trách nhiệm pháp lý",
      "Nhà quản lý chính thức",
      "Nguồn thông tin luôn chính xác"
    ],
    answer: 0,
    explanation: "AI hỗ trợ phân tích và đề xuất, nhưng con người vẫn là người đưa ra quyết định cuối cùng."
  },


  // ============================================================
  // FOUNDATION 2 (ID 65 → 73)
  // ============================================================

  {
    id: 65,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Mục tiêu của quá trình huấn luyện mô hình AI là gì?",
    options: [
      "Giúp mô hình học cách xử lý các mẫu dữ liệu",
      "Tăng kích thước màn hình",
      "Giảm số lượng tập tin",
      "Tăng tốc mạng LAN"
    ],
    answer: 0,
    explanation: "Quá trình huấn luyện giúp AI học từ dữ liệu để thực hiện tốt các nhiệm vụ được giao."
  },

  {
    id: 66,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Inference trong AI là gì?",
    options: [
      "Quá trình AI sử dụng mô hình đã học để tạo ra kết quả",
      "Cài đặt hệ điều hành",
      "Sao lưu dữ liệu",
      "Mã hóa ổ cứng"
    ],
    answer: 0,
    explanation: "Inference là giai đoạn AI sử dụng kiến thức đã học để trả lời câu hỏi hoặc tạo nội dung mới."
  },

  {
    id: 67,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Yếu tố nào ảnh hưởng lớn nhất đến chất lượng câu trả lời của AI?",
    options: [
      "Prompt và chất lượng dữ liệu",
      "Màu nền giao diện",
      "Loại chuột",
      "Tên máy tính"
    ],
    answer: 0,
    explanation: "Một Prompt tốt kết hợp với mô hình được huấn luyện bằng dữ liệu chất lượng sẽ tạo ra kết quả tốt hơn."
  },

  {
    id: 68,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Đặc điểm nổi bật của mô hình AI mã nguồn mở (Open Source AI Model) là gì?",
    options: [
      "Cho phép cộng đồng nghiên cứu, sử dụng và phát triển",
      "Chỉ sử dụng nội bộ",
      "Không thể chỉnh sửa",
      "Không thể tải xuống"
    ],
    answer: 0,
    explanation: "Các mô hình mã nguồn mở giúp cộng đồng dễ dàng nghiên cứu, tùy chỉnh và phát triển thêm."
  },

  {
    id: 69,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Điểm mạnh lớn nhất của Generative AI hiện nay là gì?",
    options: [
      "Hỗ trợ con người tạo và xử lý nội dung với năng suất cao",
      "Thay thế hoàn toàn chuyên gia",
      "Không bao giờ mắc lỗi",
      "Không cần dữ liệu đầu vào"
    ],
    answer: 0,
    explanation: "Generative AI giúp tăng năng suất học tập và làm việc nhưng vẫn cần con người kiểm tra và đưa ra quyết định cuối cùng."
  },

  {
    id: 70,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "AI Governance được hiểu là gì?",
    options: [
      "Khung quản trị và kiểm soát việc sử dụng AI",
      "Một mô hình AI mới",
      "Một hệ quản trị cơ sở dữ liệu",
      "Một ngôn ngữ lập trình"
    ],
    answer: 0,
    explanation: "AI Governance là tập hợp các chính sách, quy trình và cơ chế giúp tổ chức triển khai AI một cách an toàn, minh bạch và có trách nhiệm."
  },

  {
    id: 71,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Đâu là ví dụ về AI Governance trong doanh nghiệp?",
    options: [
      "Ban hành quy trình sử dụng AI nội bộ",
      "Mua thêm RAM",
      "Tăng tốc Internet",
      "Nâng cấp chuột"
    ],
    answer: 0,
    explanation: "AI Governance không chỉ là công nghệ mà còn bao gồm chính sách, quy trình và cơ chế giám sát việc sử dụng AI."
  },

  {
    id: 72,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Vì sao cần quan tâm đến nguồn dữ liệu dùng để huấn luyện AI?",
    options: [
      "Vì chất lượng dữ liệu ảnh hưởng trực tiếp đến chất lượng kết quả AI",
      "Vì dữ liệu giúp tăng RAM",
      "Vì dữ liệu quyết định loại CPU",
      "Vì dữ liệu làm tăng tốc Internet"
    ],
    answer: 0,
    explanation: "Nếu dữ liệu huấn luyện không đầy đủ hoặc bị thiên lệch thì AI cũng có thể tạo ra kết quả thiếu chính xác hoặc thiếu công bằng."
  },

  {
    id: 73,
    level: "GENERATIVE_AI",
    category: "FOUNDATION",
    difficulty: "medium",
    type: "single",
    question: "Đâu là ví dụ về việc sử dụng AI thiếu trách nhiệm?",
    options: [
      "Tạo nội dung giả mạo để lừa đảo",
      "Kiểm chứng thông tin trước khi chia sẻ",
      "Bảo vệ dữ liệu cá nhân",
      "Trích dẫn nguồn khi cần thiết"
    ],
    answer: 0,
    explanation: "Việc sử dụng AI để tạo nội dung giả mạo hoặc lừa đảo là hành vi thiếu trách nhiệm và có thể vi phạm pháp luật."
  },


  // ============================================================
  // TOOLS (ID 74 → 82)
  // ============================================================

  {
    id: 74,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Bạn cần viết một email chuyên nghiệp gửi khách hàng. Công cụ AI nào phù hợp nhất?",
    options: [
      "ChatGPT hoặc Claude",
      "Midjourney",
      "DALL·E",
      "Stable Diffusion"
    ],
    answer: 0,
    explanation: "ChatGPT và Claude đều mạnh về xử lý ngôn ngữ, phù hợp để soạn email, báo cáo và nội dung chuyên nghiệp."
  },

  {
    id: 75,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Bạn muốn tạo một hình minh họa cho bài thuyết trình. Công cụ AI nào phù hợp nhất?",
    options: [
      "Midjourney hoặc DALL·E",
      "Excel",
      "Notepad",
      "Outlook"
    ],
    answer: 0,
    explanation: "Midjourney và DALL·E được thiết kế để tạo hình ảnh từ mô tả bằng văn bản."
  },

  {
    id: 76,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Bạn có một tài liệu PDF dài 200 trang và muốn AI trả lời dựa trên chính tài liệu đó. Công cụ nào phù hợp nhất?",
    options: [
      "NotebookLM",
      "Paint",
      "Calculator",
      "Notepad"
    ],
    answer: 0,
    explanation: "NotebookLM được thiết kế để phân tích và trả lời dựa trên tài liệu do người dùng cung cấp."
  },

  {
    id: 77,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Nếu bạn thường xuyên làm việc với Word, Excel và PowerPoint, công cụ AI nào sẽ mang lại nhiều lợi ích nhất?",
    options: [
      "Microsoft Copilot",
      "Midjourney",
      "Stable Diffusion",
      "OBS Studio"
    ],
    answer: 0,
    explanation: "Microsoft Copilot được tích hợp sâu vào Microsoft 365, giúp tăng năng suất khi làm việc với tài liệu văn phòng."
  },

  {
    id: 78,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Bạn muốn tạo logo hoặc poster từ mô tả bằng văn bản. Công cụ nào phù hợp nhất?",
    options: [
      "Midjourney",
      "Word",
      "Excel",
      "PowerPoint"
    ],
    answer: 0,
    explanation: "Midjourney nổi bật trong việc tạo hình ảnh sáng tạo từ Prompt."
  },

  {
    id: 79,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Bạn cần AI hỗ trợ viết báo cáo, tóm tắt tài liệu và giải thích kiến thức. Công cụ nào phù hợp nhất?",
    options: [
      "ChatGPT hoặc Claude",
      "Adobe Illustrator",
      "Photoshop",
      "Paint"
    ],
    answer: 0,
    explanation: "Các mô hình ngôn ngữ lớn như ChatGPT và Claude rất phù hợp với các công việc xử lý văn bản."
  },

  {
    id: 80,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Khi lựa chọn công cụ AI, yếu tố nào quan trọng nhất?",
    options: [
      "Công cụ phù hợp với mục tiêu công việc",
      "Công cụ mới nhất",
      "Công cụ có nhiều quảng cáo",
      "Công cụ có giao diện đẹp"
    ],
    answer: 0,
    explanation: "Không có công cụ AI tốt nhất cho mọi việc. Điều quan trọng là chọn đúng công cụ cho đúng nhu cầu."
  },

  {
    id: 81,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Bạn muốn AI trả lời dựa trên tài liệu nội bộ thay vì kiến thức chung trên Internet. Bạn nên ưu tiên công cụ nào?",
    options: [
      "NotebookLM",
      "Paint",
      "Excel",
      "Calculator"
    ],
    answer: 0,
    explanation: "NotebookLM có khả năng phân tích và trả lời dựa trên tài liệu do người dùng cung cấp."
  },

  {
    id: 82,
    level: "GENERATIVE_AI",
    category: "TOOLS",
    difficulty: "medium",
    type: "single",
    question: "Lợi ích lớn nhất của việc kết hợp nhiều công cụ AI là gì?",
    options: [
      "Tận dụng điểm mạnh của từng công cụ để nâng cao hiệu quả công việc",
      "Không cần kiểm tra kết quả",
      "Thay thế hoàn toàn con người",
      "Không cần kiến thức chuyên môn"
    ],
    answer: 0,
    explanation: "Mỗi công cụ AI có thế mạnh riêng. Biết lựa chọn và kết hợp đúng sẽ giúp tăng năng suất và chất lượng công việc."
  },


  // ============================================================
  // PROMPTING ADVANCED (ID 83 → 91)
  // ============================================================

  {
    id: 83,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Bạn muốn AI viết nội dung theo phong cách của một chuyên gia Marketing. Nên sử dụng kỹ thuật nào?",
    options: [
      "Yêu cầu AI đóng vai chuyên gia Marketing",
      "Viết Prompt ngắn hơn",
      "Giảm số lượng Token",
      "Đổi ngôn ngữ giao diện"
    ],
    answer: 0,
    explanation: "Role/Persona Prompting giúp AI điều chỉnh cách trả lời theo vai trò mong muốn."
  },

  {
    id: 84,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Khi yêu cầu AI lập kế hoạch học tập, thông tin nào giúp kết quả sát thực tế hơn?",
    options: [
      "Mục tiêu, thời gian và trình độ hiện tại",
      "Tên máy tính",
      "Dung lượng RAM",
      "Loại bàn phím"
    ],
    answer: 0,
    explanation: "Cung cấp đầy đủ ngữ cảnh giúp AI xây dựng kế hoạch phù hợp với nhu cầu thực tế."
  },

  {
    id: 85,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Bạn muốn AI trả lời dưới dạng JSON hoặc bảng dữ liệu. Điều này giúp ích gì?",
    options: [
      "Dễ tự động xử lý và tái sử dụng kết quả",
      "Tăng tốc Internet",
      "Giảm dung lượng RAM",
      "Làm AI thông minh hơn"
    ],
    answer: 0,
    explanation: "Đầu ra có cấu trúc giúp dễ nhập vào Excel, hệ thống quản lý hoặc các ứng dụng khác."
  },

  {
    id: 86,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Nếu AI tạo kết quả chưa đầy đủ, bạn nên làm gì?",
    options: [
      "Yêu cầu AI bổ sung hoặc làm rõ từng phần",
      "Kết thúc cuộc trò chuyện",
      "Tin ngay kết quả",
      "Đổi công cụ AI khác ngay lập tức"
    ],
    answer: 0,
    explanation: "Đối thoại nhiều lượt là cách làm việc hiệu quả với AI, giúp cải thiện dần chất lượng câu trả lời."
  },

  {
    id: 87,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Khi một Prompt quá dài và chứa nhiều yêu cầu khác nhau, cách xử lý nào thường hiệu quả hơn?",
    options: [
      "Chia thành nhiều yêu cầu nhỏ theo từng bước",
      "Viết dài hơn nữa",
      "Xóa toàn bộ ngữ cảnh",
      "Chỉ giữ lại câu cuối"
    ],
    answer: 0,
    explanation: "Chia bài toán thành nhiều bước giúp AI xử lý chính xác hơn và người dùng dễ kiểm soát kết quả."
  },

  {
    id: 88,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Sau nhiều lần chỉnh Prompt, kết quả AI ngày càng sát yêu cầu. Đây là kỹ năng nào?",
    options: [
      "Cải tiến Prompt theo từng vòng (Iterative Prompting)",
      "Huấn luyện AI",
      "Nâng cấp phần cứng",
      "Tăng tốc GPU"
    ],
    answer: 0,
    explanation: "Iterative Prompting là quá trình liên tục cải thiện Prompt dựa trên kết quả nhận được."
  },

  {
    id: 89,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Khi một Prompt yêu cầu AI đưa ra một quyết định hoặc dự đoán với nhiều yếu tố phức tạp, điều gì thường giúp kết quả tốt hơn?",
    options: [
      "Yêu cầu AI phân tích từng yếu tố trước khi đưa ra kết luận",
      "Yêu cầu AI trả lời ngay mà không cần phân tích",
      "Giảm số lượng yếu tố đầu vào",
      "Không cần thêm hướng dẫn"
    ],
    answer: 0,
    explanation: "Yêu cầu AI phân tích từng yếu tố giúp kết quả có cơ sở hơn, đặc biệt với các bài toán phức tạp."
  },

  {
    id: 90,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Khi yêu cầu AI tạo nội dung cho một đối tượng chuyên môn cao, yếu tố nào cần được ưu tiên trong Prompt?",
    options: [
      "Cung cấp đủ ngữ cảnh chuyên ngành để AI trả lời chính xác và sâu sắc",
      "Dùng Prompt ngắn nhất có thể",
      "Chỉ yêu cầu câu trả lời ngắn gọn",
      "Không cần giải thích thuật ngữ"
    ],
    answer: 0,
    explanation: "Ngữ cảnh chuyên ngành giúp AI hiểu đúng yêu cầu và sử dụng thuật ngữ phù hợp."
  },

  {
    id: 91,
    level: "GENERATIVE_AI",
    category: "PROMPTING",
    difficulty: "hard",
    type: "single",
    question: "Khi AI liên tục trả lời một kiểu thông tin không mong muốn, cách xử lý tốt nhất là gì?",
    options: [
      "Điều chỉnh Prompt bằng cách chỉ rõ điều không muốn",
      "Tiếp tục gửi cùng Prompt nhưng nhiều lần",
      "Khởi động lại thiết bị",
      "Cài lại trình duyệt"
    ],
    answer: 0,
    explanation: "Bạn có thể hướng dẫn AI bằng cách nêu rõ những gì bạn không muốn trong Prompt (ví dụ: 'Không sử dụng thuật ngữ phức tạp')."
  },


  // ============================================================
  // ETHICS 2 (ID 92 → 109)
  // ============================================================

  {
    id: 92,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "AI Safety tập trung vào mục tiêu nào?",
    options: [
      "Đảm bảo AI hoạt động an toàn và giảm rủi ro",
      "Tăng kích thước mô hình",
      "Giảm dung lượng dữ liệu",
      "Tăng tốc độ mạng"
    ],
    answer: 0,
    explanation: "AI Safety hướng tới việc giảm thiểu rủi ro và giúp hệ thống AI hoạt động an toàn, đáng tin cậy."
  },

  {
    id: 93,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Khi một doanh nghiệp triển khai AI, việc nào dưới đây giúp giảm rủi ro nhất?",
    options: [
      "Kiểm thử mô hình trước khi đưa vào sử dụng",
      "Tăng số lượng Token",
      "Nâng cấp màn hình",
      "Giảm kích thước bàn phím"
    ],
    answer: 0,
    explanation: "Kiểm thử trước khi triển khai giúp phát hiện lỗi, giảm rủi ro và nâng cao độ tin cậy của hệ thống AI."
  },

  {
    id: 94,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Bạn sử dụng AI công cộng để xử lý một tệp chứa thông tin khách hàng. Rủi ro lớn nhất là gì?",
    options: [
      "Thông tin nhạy cảm có thể bị rò rỉ nếu không tuân thủ chính sách bảo mật",
      "Máy tính hoạt động chậm hơn",
      "Dung lượng RAM giảm",
      "AI trả lời nhanh hơn"
    ],
    answer: 0,
    explanation: "Không nên đưa dữ liệu nhạy cảm lên các dịch vụ AI công cộng nếu chưa được phép hoặc chưa có biện pháp bảo vệ phù hợp."
  },

  {
    id: 95,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Khi doanh nghiệp bắt đầu sử dụng AI, ưu tiên nào quan trọng nhất?",
    options: [
      "Thiết lập quy định sử dụng AI và bảo vệ dữ liệu",
      "Tăng số lượng giao diện",
      "Giảm đào tạo người dùng",
      "Bỏ qua quy trình kiểm tra"
    ],
    answer: 0,
    explanation: "Việc xây dựng chính sách sử dụng AI và bảo vệ dữ liệu là nền tảng để triển khai AI an toàn và bền vững."
  },

  {
    id: 96,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Trong các quyết định quan trọng như tuyển dụng hoặc đánh giá học viên, ai nên là người đưa ra quyết định cuối cùng?",
    options: [
      "Con người",
      "AI",
      "Hệ thống tự động",
      "Không cần người kiểm tra"
    ],
    answer: 0,
    explanation: "AI chỉ đóng vai trò hỗ trợ. Với các quyết định có ảnh hưởng lớn đến con người, quyền quyết định cuối cùng phải thuộc về con người."
  },

  {
    id: 97,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Bạn sử dụng AI để xử lý dữ liệu cá nhân của khách hàng. Điều gì cần được ưu tiên nhất?",
    options: [
      "Bảo vệ quyền riêng tư và bảo mật dữ liệu",
      "Thu thập càng nhiều dữ liệu càng tốt",
      "Chia sẻ dữ liệu cho mọi bên",
      "Bỏ qua sự đồng ý của người dùng"
    ],
    answer: 0,
    explanation: "Khi làm việc với dữ liệu cá nhân, người sử dụng AI cần ưu tiên bảo vệ quyền riêng tư và tuân thủ các quy định về bảo mật."
  },

  {
    id: 98,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Khi sử dụng nội dung do AI tạo ra, cách làm nào thể hiện tính minh bạch?",
    options: [
      "Thông báo rõ nội dung có sự hỗ trợ của AI khi cần thiết",
      "Che giấu việc sử dụng AI",
      "Ẩn nguồn dữ liệu",
      "Không công bố hạn chế của AI"
    ],
    answer: 0,
    explanation: "Minh bạch giúp tăng sự tin cậy và giúp người đọc hiểu rõ nguồn gốc của nội dung."
  },

  {
    id: 99,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Điều nào giúp giảm nguy cơ lạm dụng AI trong doanh nghiệp?",
    options: [
      "Có quy định sử dụng AI rõ ràng và cơ chế giám sát phù hợp",
      "Cho phép sử dụng AI không kiểm soát",
      "Bỏ qua việc đào tạo nhân viên",
      "Không cần kiểm tra kết quả AI"
    ],
    answer: 0,
    explanation: "Chính sách rõ ràng cùng với giám sát phù hợp giúp doanh nghiệp sử dụng AI an toàn và hiệu quả."
  },

  {
    id: 100,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Vì sao doanh nghiệp nên đào tạo nhân viên về AI Ethics?",
    options: [
      "Để sử dụng AI an toàn, đúng quy định và có trách nhiệm",
      "Để giảm số lượng người dùng",
      "Để tăng tốc độ mạng",
      "Để thay thế toàn bộ quy trình làm việc"
    ],
    answer: 0,
    explanation: "Đào tạo giúp nhân viên hiểu các rủi ro, sử dụng AI đúng cách và giảm thiểu các sự cố liên quan đến bảo mật hoặc đạo đức."
  },

  {
    id: 101,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Khi sử dụng AI trong giáo dục, điều gì quan trọng nhất?",
    options: [
      "AI hỗ trợ học tập nhưng không thay thế tư duy và vai trò của giáo viên",
      "AI thay thế hoàn toàn giáo viên",
      "Không cần kiểm tra nội dung AI tạo ra",
      "Không cần tư duy phản biện"
    ],
    answer: 0,
    explanation: "AI nên đóng vai trò là công cụ hỗ trợ học tập. Người học và giáo viên vẫn cần kiểm chứng thông tin và duy trì tư duy phản biện."
  },

  {
    id: 102,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Ví dụ nào thể hiện việc bảo vệ quyền riêng tư dữ liệu?",
    options: [
      "Chỉ cho phép người được ủy quyền truy cập thông tin cá nhân",
      "Công khai toàn bộ hồ sơ khách hàng",
      "Chia sẻ mật khẩu cho đồng nghiệp",
      "Đăng thông tin cá nhân lên Internet"
    ],
    answer: 0,
    explanation: "Quyền riêng tư dữ liệu yêu cầu kiểm soát việc thu thập, lưu trữ và chia sẻ thông tin cá nhân."
  },

  {
    id: 103,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Vì sao AI nên được phát triển theo hướng lấy con người làm trung tâm (Human-Centered AI)?",
    options: [
      "Để AI phục vụ lợi ích của con người và xã hội",
      "Để thay thế hoàn toàn mọi công việc",
      "Để tăng chi phí vận hành",
      "Để giảm số lượng người dùng"
    ],
    answer: 0,
    explanation: "Mục tiêu của Human-Centered AI là sử dụng AI để hỗ trợ con người, tôn trọng quyền lợi của người dùng và tạo ra giá trị tích cực cho xã hội."
  },

  {
    id: 104,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Một hậu quả tiềm ẩn của AI Bias trong tuyển dụng có thể là gì?",
    options: [
      "Đánh giá ứng viên thiếu công bằng",
      "Tăng tốc độ phỏng vấn",
      "Giảm chi phí đào tạo",
      "Giảm số lượng ứng viên"
    ],
    answer: 0,
    explanation: "Nếu AI được huấn luyện trên dữ liệu thiên vị, nó có thể đánh giá ứng viên dựa trên các tiêu chí không công bằng."
  },

  {
    id: 105,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Khi một mô hình AI đưa ra quyết định quan trọng, điều gì cần được đảm bảo?",
    options: [
      "Kết quả có thể giải thích được và có thể kiểm chứng",
      "Không cần giải thích vì AI luôn đúng",
      "Kết quả được giữ bí mật tuyệt đối",
      "Không cần lưu lại lịch sử"
    ],
    answer: 0,
    explanation: "Khi AI ảnh hưởng đến con người, cần đảm bảo kết quả có thể giải thích và kiểm chứng để đảm bảo tính minh bạch và công bằng."
  },

  {
    id: 106,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Vì sao việc sử dụng AI để tạo nội dung cần được ghi nhận nguồn?",
    options: [
      "Để tránh vi phạm bản quyền và đảm bảo tính minh bạch",
      "Để tăng tốc độ tạo nội dung",
      "Để AI thông minh hơn",
      "Để giảm dung lượng lưu trữ"
    ],
    answer: 0,
    explanation: "Ghi nhận nguồn giúp tôn trọng quyền sở hữu trí tuệ và đảm bảo tính minh bạch khi sử dụng nội dung AI tạo ra."
  },

  {
    id: 107,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Khi xây dựng một sản phẩm AI, đội ngũ phát triển cần ưu tiên điều gì để giảm thiểu rủi ro?",
    options: [
      "Đánh giá tác động và rủi ro từ sớm",
      "Chỉ tập trung vào tốc độ phát triển",
      "Không cần kiểm thử",
      "Chỉ sử dụng một nguồn dữ liệu"
    ],
    answer: 0,
    explanation: "Đánh giá tác động và rủi ro từ sớm giúp phát hiện và giảm thiểu các vấn đề tiềm ẩn ngay từ giai đoạn thiết kế."
  },

  {
    id: 108,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Khi sử dụng AI, người dùng cần duy trì thái độ nào?",
    options: [
      "Tư duy phản biện và không tin tuyệt đối vào AI",
      "Tin tưởng hoàn toàn",
      "Không cần kiểm tra kết quả",
      "Chấp nhận mọi kết quả"
    ],
    answer: 0,
    explanation: "AI có thể mắc lỗi hoặc tạo ra thông tin sai lệch. Người dùng cần có tư duy phản biện và kiểm chứng thông tin."
  },

  {
    id: 109,
    level: "GENERATIVE_AI",
    category: "ETHICS",
    difficulty: "hard",
    type: "single",
    question: "Trách nhiệm cuối cùng đối với kết quả của AI thuộc về ai?",
    options: [
      "Con người sử dụng AI",
      "AI",
      "Nhà cung cấp Internet",
      "Nhà sản xuất phần cứng"
    ],
    answer: 0,
    explanation: "AI là công cụ hỗ trợ. Con người vẫn phải chịu trách nhiệm đối với các quyết định và nội dung được tạo ra từ AI."
  }
];

export default GENERATIVE_AI;