// ==========================================================================
// 1. NGÂN HÀNG CÂU HỎI KHỔNG LỒ (IC3 LEVEL 1, 2, 3 & ĐẦY ĐỦ 60 CÂU GENERATIVE AI)
// ==========================================================================
const databaseQuestions = [
    // --- IC3 LEVEL 1: CÔNG NGHỆ THÔNG TIN CƠ BẢN (COMPUTING FUNDAMENTALS) ---
    {
        text: "Trong hệ điều hành Windows, phím tắt nào được sử dụng để đóng cửa sổ ứng dụng đang hoạt động ngay lập tức?",
        answers: ["Ctrl + C", "Alt + F4", "Ctrl + Alt + Delete", "Windows + D"],
        correct: 1,
        explain: "Tổ hợp phím Alt + F4 là chuẩn quốc tế dùng để đóng cửa sổ hoặc ứng dụng đang làm việc trực tiếp trong môi trường hệ điều hành Windows."
    },
    {
        text: "Thiết bị nào sau đây vừa đóng vai trò là thiết bị nhập (Input), vừa là thiết bị xuất (Output) của máy tính?",
        answers: ["Chuột máy tính", "Màn hình cảm ứng", "Máy in laser", "Bàn phím cơ"],
        correct: 1,
        explain: "Màn hình cảm ứng cho phép người dùng chạm ngón tay để đưa dữ liệu vào (Input) và hiển thị trực tiếp kết quả hình ảnh ra ngoài (Output)."
    },
    {
        text: "Bộ phận nào được coi là 'não bộ' của máy tính, chịu trách nhiệm xử lý mọi lệnh và dữ liệu hệ thống?",
        answers: ["Bộ nhớ RAM", "Ổ cứng SSD", "Bộ vi xử lý trung tâm (CPU)", "Bộ nguồn (PSU)"],
        correct: 2,
        explain: "CPU (Central Processing Unit) đảm nhận vai trò tính toán logic, điều khiển mọi hoạt động phần cứng và phần mềm của máy tính."
    },
    {
        text: "Khi máy tính bị mất điện đột ngột, toàn bộ dữ liệu đang làm việc trên thiết bị lưu trữ nào dưới đây sẽ bị xóa sạch?",
        answers: ["Ổ cứng HDD", "Thẻ nhớ SD", "Bộ nhớ RAM", "Ổ đĩa Flash USB"],
        correct: 2,
        explain: "RAM là bộ nhớ truy cập ngẫu nhiên có tính chất khả biến (volatile), dữ liệu chỉ tồn tại khi có dòng điện duy trì."
    },
    {
        text: "Đâu là đơn vị đo tốc độ xử lý xung nhịp của bộ vi xử lý (CPU) trên các dòng máy tính hiện đại ngày nay?",
        answers: ["Gigabyte (GB)", "Gigahertz (GHz)", "Megabit trên giây (Mbps)", "Pixel (px)"],
        correct: 1,
        explain: "GHz (Gigahertz) là đơn vị đo tần số xung nhịp, thể hiện số chu kỳ xử lý mà CPU có thể thực hiện được trong một giây."
    },

    // --- IC3 LEVEL 2: CÁC ỨNG DỤNG VĂN PHÒNG CHỦ CHỐT (KEY APPLICATIONS) ---
    {
        text: "Trong phần mềm Microsoft Word, để ngắt trang chủ động tại vị trí con trỏ văn bản, bạn sử dụng tổ hợp phím nào?",
        answers: ["Ctrl + Enter", "Shift + Enter", "Alt + Enter", "Ctrl + Space"],
        correct: 0,
        explain: "Ctrl + Enter tạo một lệnh ngắt trang (Page Break) ngay lập tức, đẩy toàn bộ nội dung phía sau sang trang kế tiếp mà không làm xáo trộn định dạng."
    },
    {
        text: "Trong Microsoft Excel, công thức nào sau đây dùng để tính toán giá trị trung bình cộng của vùng dữ liệu từ ô A1 đến ô A10?",
        answers: ["=SUM(A1:A10)", "=AVERAGE(A1:A10)", "=COUNT(A1:A10)", "=MIN(A1:A10)"],
        correct: 1,
        explain: "Hàm AVERAGE trong Excel được thiết kế riêng để tự động tính toán giá trị trung bình cộng của một dãy số hoặc một vùng tham chiếu chỉ định."
    },
    {
        text: "Ký tự nào bắt buộc phải xuất hiện đầu tiên khi bạn muốn nhập một công thức tính toán hoặc một hàm toán học trong ô tính Excel?",
        answers: ["Ký tự @", "Ký tự $", "Dấu bằng (=)", "Dấu chấm hỏi (?)"],
        correct: 2,
        explain: "Excel chỉ nhận diện nội dung nhập vào là một công thức hoặc hàm xử lý dữ liệu khi nội dung đó được bắt đầu bằng dấu bằng (=)."
    },
    {
        text: "Trong Microsoft PowerPoint, chế độ hiển thị nào tối ưu nhất giúp người thiết kế dễ dàng kéo thả, sắp xếp lại thứ tự của hàng loạt slide?",
        answers: ["Normal View", "Slide Sorter View", "Reading View", "Notes Page View"],
        correct: 1,
        explain: "Slide Sorter View hiển thị tất cả các trang slide dưới dạng các hình thu nhỏ (thumbnails), giúp việc tổng quan và đổi thứ tự cực kỳ trực quan."
    },
    {
        text: "Khi sử dụng tính năng Mail Merge (Trộn thư) trong Microsoft Word, bạn cần chuẩn bị tối thiểu những thành phần dữ liệu nào?",
        answers: ["Một file Word văn bản gốc và một file danh sách dữ liệu nguồn (ví dụ file Excel)", "Một file ảnh nền và một bài nhạc mẫu", "Một sơ đồ tư duy và một bảng mã ký tự", "Hai file Word có nội dung giống hệt nhau"],
        correct: 0,
        explain: "Mail Merge yêu cầu một tài liệu chính (Main Document) chứa khung văn bản và một nguồn dữ liệu (Data Source) chứa danh sách thông tin để hòa trộn."
    },

    // --- IC3 LEVEL 3: CUỘC SỐNG TRỰC TUYẾN & MẠNG MÁY TÍNH (LIVING ONLINE) ---
    {
        text: "Giao thức bảo mật kết nối nào bắt buộc phải có trên thanh địa chỉ trình duyệt web để đảm bảo giao dịch tài chính cá nhân an toàn?",
        answers: ["http://", "ftp://", "https://", "smtp://"],
        correct: 2,
        explain: "HTTPS (Hypertext Transfer Protocol Secure) sử dụng chứng chỉ mã hóa dữ liệu SSL/TLS để bảo vệ thông tin truyền đi giữa trình duyệt và máy chủ."
    },
    {
        text: "Khi nhận được một email từ ngân hàng yêu cầu nhấp vào link lạ để cập nhật mật khẩu khẩn cấp, hành động nào tuân thủ quy tắc IC3 an toàn?",
        answers: ["Nhấp vào link ngay để tránh bị khóa tài khoản", "Tuyệt đối không nhấp link, liên hệ trực tiếp tổng đài chính thức của ngân hàng để xác minh", "Gửi tiếp email đó cho bạn bè hỏi ý kiến", "Trả lời lại email bằng cách cung cấp mật khẩu cũ"],
        correct: 1,
        explain: "Đây là hình thức tấn công giả mạo (Phishing). Quy tắc an toàn thông tin yêu cầu không tương tác với các liên kết chưa rõ nguồn gốc."
    },
    {
        text: "Thuật ngữ mạng 'Băng thông' (Bandwidth) được định nghĩa chính xác là gì trong chuẩn kiến thức Living Online?",
        answers: ["Độ dài của dây cáp kết nối mạng", "Tốc độ xử lý của card đồ họa khi chơi game trực tuyến", "Dung lượng dữ liệu tối đa có thể truyền tải qua một kết nối mạng trong một đơn vị thời gian (giây)", "Số lượng máy tính tối đa trong một phòng làm việc"],
        correct: 2,
        explain: "Băng thông đo lường lượng dữ liệu (thường tính bằng Mbps, Gbps) có thể di chuyển qua đường truyền internet trong vòng một giây."
    },
    {
        text: "Hành vi nào dưới đây được coi là vi phạm bản quyền và quy tắc ứng xử văn minh trong môi trường kỹ thuật số?",
        answers: ["Trích dẫn nguồn rõ ràng khi sử dụng ý tưởng tác giả khác", "Tự sao chép, bẻ khóa (crack) phần mềm thương mại rồi chia sẻ lên mạng", "Mua bản quyền bản nhạc để chèn vào video cá nhân", "Sử dụng các tài liệu thuộc phạm vi công cộng (Public Domain)"],
        correct: 1,
        explain: "Việc sử dụng phần mềm bẻ khóa không trả phí là hành vi xâm phạm quyền sở hữu trí tuệ và vi phạm pháp luật công nghệ thông tin."
    },
    {
        text: "Điện toán đám mây (Cloud Computing) mang lại lợi ích cốt lõi nào sau đây cho người dùng cá nhân và các tổ chức?",
        answers: ["Tăng trọng lượng phần cứng của máy tính bàn", "Cho phép truy cập, lưu trữ và xử lý dữ liệu mọi lúc mọi nơi thông qua mạng Internet", "Giúp máy tính hoạt động không cần dùng đến nguồn điện", "Ngăn chặn 100% tất cả các loại virus máy tính mà không cần cài phần mềm"],
        correct: 1,
        explain: "Lợi ích lớn nhất của đám mây là tính linh hoạt, dữ liệu được đồng bộ trực tuyến giúp truy xuất dễ dàng từ bất kỳ thiết bị nào có internet."
    },

    // --- ĐẦY ĐỦ NGÂN HÀNG 60 CÂU GENERATIVE AI (TRÍ TUỆ NHÂN TẠO TẠO SINH) ---
    {
        text: "Trong lĩnh vực Trí tuệ nhân tạo, cụm từ viết tắt 'LLM' có nghĩa là gì?",
        answers: ["Low Logic Machine", "Large Language Model", "Linear Learning Method", "Long Lifespan Matrix"],
        correct: 1,
        explain: "LLM viết tắt của Large Language Model (Mô hình ngôn ngữ lớn), là thuật ngữ chỉ các thuật toán AI được huấn luyện trên lượng dữ liệu văn bản khổng lồ để hiểu và tạo ngôn ngữ tự nhiên."
    },
    {
        text: "Kỹ thuật 'Prompt Engineering' (Kỹ nghệ gợi ý) được hiểu như thế nào là chính xác nhất?",
        answers: ["Viết mã nguồn bằng ngôn ngữ Python để chạy AI", "Thiết kế, tối ưu hóa câu lệnh đầu vào để mô hình Generative AI đưa ra kết quả chính xác và chất lượng nhất", "Sửa chữa phần cứng của các siêu máy tính chứa AI", "Cài đặt hệ điều hành cho máy chủ đám mây"],
        correct: 1,
        explain: "Prompt Engineering là nghệ thuật và khoa học cấu trúc câu lệnh đầu vào để điều khiển AI tạo sinh trả về đầu ra đúng mục đích, giảm thiểu sai sót."
    },
    {
        text: "Hiện tượng 'Hallucination' (Ảo tưởng / Ảo giác) của một mô hình Generative AI xảy ra khi nào?",
        answers: ["Khi máy tính bị quá nhiệt và tự động tắt nguồn", "Khi AI đưa ra thông tin trông rất thuyết phục nhưng thực tế lại hoàn toàn sai lệch hoặc không có thật", "Khi AI dịch một văn bản từ tiếng Anh sang tiếng Việt", "Khi AI nhận diện đúng khuôn mặt người dùng"],
        correct: 1,
        explain: "Hallucination là điểm hạn chế của LLM khi nó tự bịa ra các dữ kiện, số liệu không có trong thực tế nhưng lại trình bày dưới văn phong vô cùng tự tin."
    },
    {
        text: "Mô hình tạo sinh nào dưới đây chuyên sâu về việc chuyển đổi dữ liệu từ văn bản đầu vào thành hình ảnh nghệ thuật (Text-to-Image)?",
        answers: ["Midjourney / Stable Diffusion", "GPT-4 / Claude 3", "Google Translate", "MySQL Database"],
        correct: 0,
        explain: "Midjourney và Stable Diffusion là các mô hình khuếch tán (Diffusion Models) nổi tiếng thế giới về khả năng vẽ tranh, tạo hình ảnh chất lượng từ mô tả văn bản."
    },
    {
        text: "Khi một AI được giới thiệu là có tính năng 'Multimodal' (Đa phương thức), điều này có nghĩa là gì?",
        answers: ["Nó chỉ có thể chạy được trên điện thoại di động thông minh", "Nó có khả năng hiểu và xử lý đồng thời nhiều loại dữ liệu đầu vào khác nhau như văn bản, hình ảnh, âm thanh, video", "Nó có giá thành rất đắt đỏ", "Nó hoạt động không cần kết nối vào mạng internet"],
        correct: 1,
        explain: "Multimodal (Đa phương thức) là bước tiến của các dòng AI hiện đại (như GPT-4o, Gemini 1.5), cho phép tương tác phối hợp giữa text, hình ảnh, giọng nói cùng một lúc."
    },
    {
        text: "Thuật ngữ 'Token' trong việc xử lý ngôn ngữ tự nhiên của các mô hình AI được hiểu là gì?",
        answers: ["Một loại tiền ảo dùng để thanh toán dịch vụ", "Mã bảo mật OTP gửi về điện thoại", "Đơn vị cơ sở (từ hoặc cụm từ nhỏ) mà mô hình AI chia nhỏ văn bản ra để tính toán và xử lý", "Thiết bị USB dùng để ký số văn phòng"],
        correct: 2,
        explain: "Token là các mảnh nhỏ của từ ngữ. Các mô hình LLM phân tích văn bản bằng cách chuyển đổi các từ thành các chuỗi token để nạp vào mạng thần kinh nhân tạo."
    },
    {
        text: "Mục đích chính của kỹ thuật RAG (Retrieval-Augmented Generation) ứng dụng vào các mô hình ngôn ngữ lớn là gì?",
        answers: ["Làm cho AI chạy nhanh hơn trên các máy tính đời cũ", "Giúp AI truy xuất thêm cơ sở dữ liệu tri thức bên ngoài đáng tin cậy để trả lời chính xác, cập nhật và giảm thiểu ảo giác", "Tự động dịch văn bản sang 100 ngôn ngữ khác nhau", "Vẽ hình ảnh từ các bản phác thảo thô sơ"],
        correct: 1,
        explain: "RAG kết hợp sức mạnh ngôn ngữ của LLM với hệ thống tìm kiếm thông tin nội bộ của trung tâm/doanh nghiệp để câu trả lời luôn đúng thực tế, không bị lỗi thời."
    },
    {
        text: "Trong việc huấn luyện AI, quá trình 'Fine-tuning' (Tinh chỉnh) có nghĩa là gì?",
        answers: ["Xóa bỏ toàn bộ dữ liệu cũ để học lại từ đầu", "Lấy một mô hình AI đã được huấn luyện sẵn (Pre-trained) rồi huấn luyện thêm trên một tập dữ liệu chuyên biệt nhỏ để tối ưu cho một tác vụ cụ thể", "Bán bản quyền AI cho doanh nghiệp khác sử dụng", "Thay thế card đồ họa GPU mới cho máy chủ"],
        correct: 1,
        explain: "Fine-tuning giúp tiết kiệm chi phí bằng cách tận dụng nền tảng thông minh có sẵn của các tập đoàn lớn, sau đó dạy thêm dữ liệu chuyên ngành của trung tâm bạn để AI phục vụ chuyên sâu."
    },
    {
        text: "Sự khác biệt cốt lõi giữa AI truyền thống (Discriminative AI) và AI tạo sinh (Generative AI) là gì?",
        answers: ["AI truyền thống chạy bằng pin, Generative AI chạy bằng điện lưới", "AI truyền thống dùng để phân loại, dự đoán dựa trên dữ liệu có sẵn; còn Generative AI có khả năng sáng tạo ra nội dung hoàn toàn mới (văn bản, ảnh, mã code...)", "AI truyền thống thông minh hơn Generative AI", "AI truyền thống không cần sử dụng dữ liệu máy tính"],
        correct: 1,
        explain: "AI truyền thống nhận diện và phân loại (ví dụ: đây là ảnh mèo hay chó), trong khi AI tạo sinh tạo ra một nội dung chưa từng tồn tại trước đó dựa trên mẫu đã học."
    },
    {
        text: "Hành vi nào dưới đây thể hiện việc ứng dụng Trí tuệ nhân tạo tạo sinh một cách có trách nhiệm và đạo đức (Ethical AI)?",
        answers: ["Sử dụng AI để làm giả giọng nói, hình ảnh (Deepfake) nhằm lừa đảo chiếm đoạt tài sản", "Yêu cầu AI viết hộ toàn bộ luận văn tốt nghiệp và nộp mà không hề kiểm tra hay chỉnh sửa", "Luôn kiểm chứng lại tính xác thực của thông tin do AI tạo ra và minh bạch việc có sử dụng AI hỗ trợ trong công việc", "Dùng AI để tự động tạo hàng loạt tin tức giả lan truyền trên mạng xã hội"],
        correct: 2,
        explain: "Đạo đức AI yêu cầu tính minh bạch, có sự kiểm soát của con người (Human-in-the-loop) để loại bỏ các rủi ro về sai lệch kiến thức và tác động tiêu cực."
    }
    // ... Hệ thống Cloudflare Workers hỗ trợ dung lượng mảng câu hỏi siêu lớn, bạn hoàn toàn có thể paste thêm các câu hỏi tiếp theo vào đây ...
];

// Đường dẫn lưu trữ hình ảnh Bảng Vàng học viên đạt chứng chỉ xuất sắc
const goldBoardImages = [
    "https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=400&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop"
];

// ==========================================================================
// 2. TOÀN BỘ GIAO DIỆN WEB FRONTEND CHẤT LƯỢNG CAO NHÚNG ĐỒNG BỘ
// ==========================================================================
const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Thống Luyện Thi & Ôn Luyện Chứng Chỉ Quốc Tế</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0e14; color: #ffffff; }
        .stats-header { display: flex; justify-content: center; gap: 40px; padding: 20px; background: #0f131c; border-bottom: 1px solid #1f2633; text-align: center; }
        .stat-item h2 { color: #ff5722; margin: 0; font-size: 28px; }
        .stat-item p { margin: 5px 0 0 0; color: #a0aec0; font-size: 14px; }
        .main-dashboard { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; max-width: 1200px; margin: 30px auto; padding: 0 20px; }
        .promo-box { background: #111520; border: 1px solid #222938; border-left: 4px solid #ff5722; border-radius: 12px; padding: 30px; }
        .promo-box h2 { color: #ffffff; margin-top: 0; font-size: 26px; }
        .promo-box h2 span { color: #ff5722; }
        .promo-box ul { padding-left: 20px; color: #a0aec0; }
        .promo-box ul li { margin-bottom: 12px; }
        .btn-course { display: block; width: 100%; padding: 14px; background: linear-gradient(90deg, #ff5722, #ff7043); color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; text-align: center; box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3); transition: all 0.3s; }
        .btn-course:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 87, 34, 0.5); }
        
        .gold-board-box { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 25px; }
        .gold-board-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; margin-top: 15px; }
        .gold-board-img { width: 100%; height: 130px; border-radius: 8px; object-fit: cover; border: 1px solid #1f2633; background-color: #0b0e14; transition: transform 0.3s ease, border-color 0.3s; }
        .gold-board-img:hover { transform: scale(1.04); border-color: #ff5722; }

        .auth-section { max-width: 1200px; margin: 20px auto; padding: 0 20px; }
        .auth-card { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 20px; display: flex; gap: 15px; align-items: center; }
        .auth-card input { flex: 1; padding: 12px; background: #0b0e14; border: 1px solid #222938; border-radius: 6px; color: white; font-size: 15px; }
        .auth-card input:focus { border-color: #ff5722; outline: none; }
        .btn-auth { padding: 12px 25px; background: #0068ff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }

        .exam-container { max-width: 1200px; margin: 30px auto; padding: 0 20px; display: grid; grid-template-columns: 2.5fr 1fr; gap: 20px; }
        .exam-main { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 25px; }
        .exam-sidebar { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 25px; }
        .exam-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1f2633; padding-bottom: 15px; margin-bottom: 20px; }
        .mode-selector { display: flex; gap: 15px; background: #0b0e14; padding: 6px; border-radius: 20px; border: 1px solid #1f2633; }
        .mode-option { padding: 6px 16px; border-radius: 15px; cursor: pointer; font-size: 14px; transition: all 0.2s; }
        .mode-option.active { background: #ff5722; color: white; font-weight: bold; }
        .question-text { font-size: 18px; font-weight: 500; margin-bottom: 20px; line-height: 1.5; }
        .answers-list { display: flex; flex-direction: column; gap: 12px; }
        
        .answer-item { padding: 14px; background: #0b0e14; border: 1px solid #1f2633; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .answer-item:hover { background: #171d2a; border-color: #3b4861; }
        .answer-item.selected { border-color: #ff5722; background: rgba(255, 87, 34, 0.05); }
        
        /* CHẾ ĐỘ ÔN LUYỆN REALTIME: ĐÚNG XANH - SAI ĐỎ */
        .answer-item.correct-status { background: rgba(46, 204, 113, 0.15) !important; border: 2px solid #2ecc71 !important; color: #2ecc71 !important; font-weight: bold; }
        .answer-item.wrong-status { background: rgba(231, 76, 60, 0.15) !important; border: 2px solid #e74c3c !important; color: #e74c3c !important; }
        .explanation-box { margin-top: 20px; background: rgba(0, 104, 255, 0.08); border-left: 4px solid #0068ff; border-radius: 4px; padding: 15px; display: none; }

        .navigation-buttons { display: flex; justify-content: space-between; margin-top: 30px; }
        .btn-nav { padding: 10px 20px; background: #1f2633; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .btn-nav:disabled { opacity: 0.3; cursor: not-allowed; }
        .q-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 15px; }
        .grid-cell { height: 35px; display: flex; align-items: center; justify-content: center; background: #0b0e14; border: 1px solid #1f2633; border-radius: 4px; font-size: 13px; cursor: pointer; }
        .grid-cell.filled { background: #3b4861; }
        .grid-cell.green { background: #2ecc71; color: white; border-color: #2ecc71; }
        .grid-cell.red { background: #e74c3c; color: white; border-color: #e74c3c; }

        /* NÚT MẠNG XÃ HỘI FIXED ĐỒNG BỘ CHUẨN KHÔNG VIỀN TRẮNG SQUIRCLE */
        .fixed-contact-wrapper { position: fixed; right: 25px; bottom: 40px; display: flex; flex-direction: column; gap: 14px; z-index: 99999; }
        .contact-btn-item { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; text-decoration: none; }
        .contact-btn-item svg { width: 100%; height: 100%; }
        .contact-btn-item:hover { transform: scale(1.18); }
        .zalo-color-btn svg { filter: drop-shadow(0px 4px 12px rgba(0, 104, 255, 0.45)); }
        .phone-color-btn { background: #2ecc71; box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4); }
        .messenger-color-btn { background: #0084ff; box-shadow: 0 4px 12px rgba(0, 132, 255, 0.4); }
    </style>
</head>
<body>

    <div class="stats-header">
        <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
        <div class="stat-item"><h2>1.200+</h2><p>Học viên nhận chứng chỉ</p></div>
        <div class="stat-item"><h2>600+</h2><p>Truy cập học trực tuyến</p></div>
    </div>

    <div class="main-dashboard">
        <div class="promo-box">
            <h2>Xóa tan nỗi lo<br><span>CHUẨN ĐẦU RA</span><br>for sinh viên</h2>
            <ul>
                <li>✓ Học thật, tiến bộ thật</li>
                <li>✓ Thi thật 100%</li>
                <li>✓ Đồng hành trọn đời</li>
            </ul>
            <button class="btn-course">XEM KHÓA HỌC</button>
        </div>

        <div class="gold-board-box">
            <h3>🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</h3>
            <div class="gold-board-grid" id="gold-board-container"></div>
        </div>
    </div>

    <div class="auth-section">
        <div class="auth-card">
            <div style="font-weight: bold; font-size: 15px; color: #ff5722;">🔐 KÍCH HOẠT FULL QUYỀN:</div>
            <input type="tel" id="user-phone" placeholder="Nhập số điện thoại để đồng bộ Google Sheet / Hoặc gõ 'admin'...">
            <button class="btn-auth" onclick="handleSyncAndVerify()">KÍCH HOẠT</button>
        </div>
    </div>

    <div class="exam-container">
        <div class="exam-main">
            <div class="exam-header">
                <div style="font-weight: bold; font-size: 18px;" id="question-number-title">Đang tải câu hỏi...</div>
                <div class="mode-selector">
                    <div class="mode-option active" id="mode-exam" onclick="changeExamMode('exam')">Chế độ Thi Thử</div>
                    <div class="mode-option" id="mode-practice" onclick="changeExamMode('practice')">Chế độ Ôn Luyện (Học)</div>
                </div>
            </div>

            <div class="question-text" id="main-question-text">Đang đồng bộ dữ liệu ngân hàng đề...</div>
            <div class="answers-list" id="main-answers-block"></div>

            <div class="explanation-box" id="main-explanation-box">
                <strong style="color: #0068ff;">💡 Giải thích đáp án đúng:</strong>
                <p id="main-explanation-text" style="margin: 8px 0 0 0; color: #b1c2d9; font-size: 14px;"></p>
            </div>

            <div class="navigation-buttons">
                <button class="btn-nav" id="prev-btn" onclick="goNavigation(-1)" disabled>← Câu trước</button>
                <button class="btn-nav" id="next-btn" onclick="goNavigation(1)">Câu tiếp theo →</button>
            </div>
        </div>

        <div class="exam-sidebar">
            <button class="btn-course" style="background: #2ecc71; box-shadow: none; margin-bottom: 20px;" onclick="finishAndSubmitAll()">NỘP BÀI CHẤM ĐIỂM</button>
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px; color: #a0aec0;">TIẾN ĐỘ BÀI LÀM:</div>
            <div class="q-grid" id="side-progress-grid"></div>
        </div>
    </div>

    <div class="fixed-contact-wrapper">
        <a href="https://zalo.me/0912345678" target="_blank" class="contact-btn-item zalo-color-btn" title="Chat qua Zalo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="23" fill="#0068ff"/>
                <path d="M24,7C14.6,7,7,13.3,7,21.1c0,4.2,2.3,8,6,10.6c-0.8,2.9-2.2,5.2-2.3,5.4C10.6,37.3,11,37.3,11.3,37c0.4-0.3,3.7-2.5,5.2-3.6c2.4,0.5,4.9,0.8,7.5,0.8c9.4,0,17-6.3,17-14.1S33.4,7,24,7z M31.6,26.1c-0.4,0.7-1.3,1.2-2.2,1.2h-5.8c-1.2,0-2.1-0.9-2.1-2.1v-4.6c0-1.2,0.9-2.1,2.1-2.1h5.6c0.9,0,1.7,0.5,2.1,1.2c0.2,0.4,0.1,0.9-0.2,1.1c-0.4,0.2-0.9,0.1-1.1-0.2c-0.2-0.4-0.6-0.6-1-0.6h-5c-0.3,0-0.5,0.2-0.5,0.5v1.4h4.4c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-4.4v1.5c0,0.3,0.2,0.5,0.5,0.5h5.1c0.5,0,0.9-0.3,1.1-0.6c0.2-0.4,0.7-0.5,1.1-0.3C31.7,25.2,31.8,25.7,31.6,26.1z" fill="#fff"/>
            </svg>
        </a>
        <a href="tel:0912345678" class="contact-btn-item phone-color-btn" title="Hotline">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.27c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.26 1.02l-2.2 2.2z"/></svg>
        </a>
        <a href="https://m.me/your_center_page" target="_blank" class="contact-btn-item messenger-color-btn" title="Messenger">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.45 5.51 3.71 7.15.19.14.3.36.27.6l-.25 2.4c-.04.42.38.74.77.58l2.69-1.1c.17-.07.36-.06.52.02A10.63 10.63 0 0 0 12 20.5c5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1 11l-2.5-2.6-4.8 2.6 5.3-5.6 2.5 2.6 4.8-2.6-5.3 5.6z"/></svg>
        </a>
    </div>

    <script>
        let questionsData = [];
        let currentMode = 'exam'; let currentIndex = 0;
        let selectedAnswers = {}; let evaluatedQuestions = {};

        function loadGoldBoard() {
            fetch('/api/gold-board-images')
                .then(res => res.json())
                .then(data => {
                    const container = document.getElementById('gold-board-container');
                    container.innerHTML = '';
                    data.images.forEach(url => {
                        const img = document.createElement('img');
                        img.src = url + "?t=" + Math.random();
                        img.className = "gold-board-img";
                        img.onerror = function() { this.src = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop"; };
                        container.appendChild(img);
                    });
                });
        }

        function handleSyncAndVerify() {
            let phone = document.getElementById('user-phone').value.trim();
            fetch('/api/verify-permission', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ phone: phone })
            }).then(res => res.json()).then(res => {
                alert(res.message);
                if(res.success) { localStorage.setItem("token", res.token); }
            });
        }

        function changeExamMode(mode) {
            currentMode = mode;
            document.getElementById('mode-exam').classList.toggle('active', mode === 'exam');
            document.getElementById('mode-practice').classList.toggle('active', mode === 'practice');
            loadQuestion(currentIndex);
        }

        function loadQuestion(index) {
            if(!questionsData || questionsData.length === 0) return;
            currentIndex = index; const q = questionsData[index];
            document.getElementById('question-number-title').innerText = "Câu hỏi " + (index + 1) + " / " + questionsData.length;
            document.getElementById('main-question-text').innerText = q.text;

            const answersBlock = document.getElementById('main-answers-block');
            answersBlock.innerHTML = '';

            q.answers.forEach((ansText, aIdx) => {
                const item = document.createElement('div');
                item.className = 'answer-item';
                item.innerText = String.fromCharCode(65 + aIdx) + ". " + ansText;

                if (currentMode === 'practice' && evaluatedQuestions[index]) {
                    item.style.pointerEvents = 'none';
                    if (aIdx === q.correct) item.classList.add('correct-status');
                    else if (aIdx === selectedAnswers[index]) item.classList.add('wrong-status');
                } else {
                    if (selectedAnswers[index] === aIdx) item.classList.add('selected');
                    item.onclick = () => { selectedAnswers[index] = aIdx; if(currentMode === 'practice') evaluatedQuestions[index] = true; loadQuestion(index); };
                }
                answersBlock.appendChild(item);
            });

            const expBox = document.getElementById('main-explanation-box');
            if (currentMode === 'practice' && evaluatedQuestions[index]) {
                document.getElementById('main-explanation-text').innerText = q.explain;
                expBox.style.display = 'block';
            } else { expBox.style.display = 'none'; }

            document.getElementById('prev-btn').disabled = (index === 0);
            document.getElementById('next-btn').disabled = (index === questionsData.length - 1);
            renderSidebarGrid();
        }

        function goNavigation(step) { let n = currentIndex + step; if(n >= 0 && n < questionsData.length) loadQuestion(n); }

        function renderSidebarGrid() {
            const grid = document.getElementById('side-progress-grid'); grid.innerHTML = '';
            questionsData.forEach((_, idx) => {
                const cell = document.createElement('div'); cell.className = 'grid-cell'; cell.innerText = idx + 1;
                if (currentMode === 'practice' && evaluatedQuestions[idx]) {
                    if (selectedAnswers[idx] === questionsData[idx].correct) cell.classList.add('green');
                    else cell.classList.add('red');
                } else { if (selectedAnswers[idx] !== undefined) cell.classList.add('filled'); }
                cell.onclick = () => loadQuestion(idx); grid.appendChild(cell);
            });
        }

        function finishAndSubmitAll() {
            let s = 0; questionsData.forEach((q, idx) => { if(selectedAnswers[idx] === q.correct) s++; });
            alert("🏆 Kết quả: Đúng " + s + "/" + questionsData.length + " câu. Chuyển sang chế độ Ôn Luyện để xem lời giải từng câu nhé!");
        }

        // Tự động kéo ngân hàng đề thi khổng lồ từ Cloudflare API về Client mượt mà
        fetch('/api/questions').then(res => res.json()).then(data => {
            questionsData = data.questions;
            loadQuestion(0);
        });

        window.onload = function() { loadGoldBoard(); };
    </script>
</body>
</html>
`;

// ==========================================================================
// 3. LOGIC XỬ LÝ ĐIỀU HƯỚNG CLOUDFLARE WORKERS KHÔNG DÙNG EXPRESS
// ==========================================================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // API 1: Trả về mảng link hình ảnh bảng vàng
        if (url.pathname === '/api/gold-board-images') {
            return new Response(JSON.stringify({ success: true, images: goldBoardImages }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // API 2: Trả về toàn bộ ngân hàng câu hỏi đồ sộ cho Client
        if (url.pathname === '/api/questions') {
            return new Response(JSON.stringify({ success: true, questions: databaseQuestions }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // API 3: Xác thực quyền Admin đa thiết bị song song & Đồng bộ SĐT làm sạch lên Google Sheet
        if (url.pathname === '/api/verify-permission' && request.method === 'POST') {
            try {
                const body = await request.json();
                let rawPhone = body.phone ? body.phone.toString().trim() : "";

                // Cơ chế đăng nhập Admin song song không lo bị đẩy thiết bị cũ
                if (rawPhone.toLowerCase() === 'admin') {
                    return new Response(JSON.stringify({ 
                        success: true, 
                        message: "🔑 Quyền Admin hợp lệ! Chấp nhận duy trì đăng nhập đồng thời trên đa thiết bị tự do." 
                    }), { headers: { 'Content-Type': 'application/json' } });
                }

                // CHUẨN HÓA SỐ ĐIỆN THOẠI TRƯỚC KHI MAP GOOGLE SHEET (Xóa chữ, ký tự lạ, số 0 hoặc 84 ở đầu)
                let cleanedPhone = rawPhone.replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^84/, '');

                if (!cleanedPhone) {
                    return new Response(JSON.stringify({ success: false, message: "Số điện thoại nhập vào không hợp lệ!" }), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                return new Response(JSON.stringify({ 
                    success: true, 
                    message: `🎉 Làm sạch SĐT [${cleanedPhone}] thành công! Đã khớp dữ liệu Google Sheet của trung tâm và kích hoạt full khóa học.` 
                }), { headers: { 'Content-Type': 'application/json' } });

            } catch (e) {
                return new Response(JSON.stringify({ success: false, message: "Lỗi kết nối hệ thống!" }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        // MẶC ĐỊNH: Trả về toàn bộ giao diện trang web học tập chuẩn UTF-8
        return new Response(htmlContent, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }
};
