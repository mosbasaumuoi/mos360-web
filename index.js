const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Bổ sung thêm route /ic3-test vào danh sách đường dẫn hợp lệ
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login", "/generative-ai", "/ic3-test"];
    if (!webPaths.includes(path)) return fetch(request);

    if (path === "/generative-ai") {
        return new Response(this.getGenerativeAIUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    if (path === "/ic3-test") {
        return new Response(this.getIC3QuizUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL + "&v=" + Date.now());
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.replace(/\r/g, "").trim();
        if (link && link.startsWith("http")) {
          let finalLink = link;
          if (link.includes("drive.google.com")) {
            const imgId = link.match(/[-\w]{25,}/);
            finalLink = "https://lh3.googleusercontent.com/d/$$" + imgId;
          }
          htmlContent += '<div class="student-item"><img src="' + finalLink + '" loading="lazy"></div>';
        }
      });
      studentData = htmlContent + htmlContent; 
    } catch (e) { studentData = "<p>Đang tải dữ liệu...</p>"; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/login") content = this.getLoginUI();
    else if (path === "/library") content = this.getLibraryUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>` + CONFIG.TITLE + `</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
        header { padding: 10px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.2rem; }
        .brand img { height: 35px; margin-right: 10px; }
        nav a { color: #888; text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.8rem; }
        .stats-bar { display: flex; justify-content: center; gap: 30px; padding: 25px; text-align: center; }
        .stat-item h2 { color: var(--primary); font-size: 2rem; }
        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 320px 1fr; gap: 25px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 28px; padding: 25px; }
        #bang-vang-container { height: 450px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.4); border-radius: 20px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 100s linear infinite; }
        .student-item { flex: 0 0 auto; width: 320px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .side-socials { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
        .s-btn { width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .s-btn img { width: 25px; height: 25px; }
        .services-grid { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .service-card { background: var(--card); padding: 25px; border-radius: 20px; border-left: 4px solid var(--primary); }
        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 40px; }
        .btn-action { background: var(--primary); color: white; border: none; padding: 12px; border-radius: 30px; font-weight: 800; cursor: pointer; width: 100%; }
        @media (max-width: 800px) { .main-container, .services-grid, .footer-grid { grid-template-columns: 1fr; } }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="` + CONFIG.LOGO_URL + `"> MOS360</a>
        <nav><a href="/">TRANG CHỦ</a><a href="/courses">KHÓA HỌC</a><a href="/library">KHO MOS</a><a href="/login" style="color:var(--primary)">ĐĂNG NHẬP</a></nav>
    </header>
    <nav style="background: rgba(255,255,255,0.03); padding: 5px 5%; font-size: 0.8rem; border-bottom: 1px solid var(--border); display:flex; gap:15px; overflow-x: auto;">
        <span style="color:#666; flex-shrink: 0;">🎯 Chuyên mục HOT:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold; margin:0;">✨ Trắc nghiệm Generative AI</a>
        <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold; margin:0;">🌍 [MỚI] Luyện Đề IC3 GS6 (Level 1/2/3)</a>
    </nav>
    <main>` + content + `</main>
    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:180px; border-radius:15px; overflow:hidden;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.665792945241!2d106.6791653!3d20.8431818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af99d2557e9%3A0x679c2980c6c7478d!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2s!4v1714368000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    </body></html>`;
  },

  getHomeUI(studentData) {
    return `<div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.000+</h2><p>Học viên đã nhận chứng chỉ</p></div>
          <div class="stat-item"><h2>500+</h2><p>Truy cập thường xuyên</p></div>
      </div>
      <div class="main-container">
          <div class="left-col" style="background:var(--card); padding:20px; border-radius:20px; border:1px solid var(--border);">
              <h3 style="color:var(--primary); margin-bottom:15px;">Khóa học nổi bật</h3>
              <p style="font-size:0.9rem; line-height:1.6; color:#aaa;">Học và ôn thi trực quan bám sát cấu trúc đề thi quốc tế thực tế.</p>
              <button class="btn-action" style="margin-top:20px;" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
          </div>
          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 class="bv-title">🏆 Bảng Vàng Chứng Chỉ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">` + studentData + `</div>
                  </div>
              </div>
          </div>
      </div>`;
  },

  getCoursesUI() { return `<div class="section-card" style="max-width:600px; margin:40px auto; text-align:center;"><h2>Khóa học đang mở</h2><p style="margin:20px 0; color:#888;">Hệ thống đang tải danh sách lớp tháng này...</p></div>`; },
  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto; text-align:center;"><h2>Đăng Nhập</h2><input type="password" placeholder="Mật khẩu" style="width:100%; padding:15px; margin:20px 0; background:#000; border:1px solid #333; color:#fff; border-radius:10px;"><button class="btn-action">VÀO HỆ THỐNG</button></div>`; },
  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Tài Liệu MOS & IC3</h2><p>Nội dung đang được cập nhật...</p></div>`; },
  getGenerativeAIUI() { return `<div style="padding:50px; text-align:center; color:#fff;"><h1>Giao diện Generative AI</h1><p><a href="/ic3-test" style="color:var(--cyan)">Bấm vào đây để làm bài trắc nghiệm IC3 GS6 mới gộp</a></p></div>`; },

  // GIAO DIỆN TRẮC NGHIỆM TỔNG HỢP IC3 GS6 LEVEL 1, 2, 3 MỚI
  getIC3QuizUI() {
    let htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOS360 - Luyện Đề IC3 GS6 Tổng Hợp</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #f5f7fa; color: #333; line-height: 1.6; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); overflow: hidden; }
        
        /* Bộ chọn Level mượt mà */
        .level-selector-bar { background-color: #1e293b; padding: 15px 25px; display: flex; gap: 12px; align-items: center; border-bottom: 1px solid #334155; }
        .level-selector-bar span { color: #94a3b8; font-weight: 600; font-size: 14px; margin-right: 10px; }
        .lvl-btn { padding: 10px 18px; background-color: #334155; color: #e2e8f0; border: none; border-radius: 6px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s ease; }
        .lvl-btn:hover { background-color: #475569; }
        .lvl-btn.active { background-color: #3b82f6; color: white; box-shadow: 0 0 10px rgba(59,130,246,0.5); }

        header { background: linear-gradient(135deg, #0f172a, #1e3a8a); color: white; padding: 25px 30px; }
        header h1 { font-size: 22px; margin-bottom: 6px; font-weight: 700; }
        header p { font-size: 13px; opacity: 0.8; }

        .quiz-layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; padding: 25px; }
        @media (max-width: 992px) { .quiz-layout { grid-template-columns: 1fr; } }
        
        .main-quiz { background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; display: flex; flex-direction: column; min-height: 400px; }
        .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9; }
        .question-number { font-size: 13px; font-weight: 600; color: #2563eb; background-color: #dbeafe; padding: 6px 14px; border-radius: 20px; }
        .score-display { font-size: 13px; font-weight: 600; color: #334155; }
        
        .question-text { font-size: 17px; font-weight: 600; color: #1e293b; margin-bottom: 20px; line-height: 1.5; }
        .options-container { display: flex; flex-direction: column; gap: 12px; }
        
        .option { display: flex; align-items: center; padding: 14px 20px; background-color: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; }
        .option:hover { background-color: #f1f5f9; border-color: #cbd5e1; }
        .option.selected { background-color: #eff6ff; border-color: #3b82f6; }
        .option.correct { background-color: #dcfce7; border-color: #16a34a; }
        .option.incorrect { background-color: #fee2e2; border-color: #dc2626; }
        
        .option-label { display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 50%; margin-right: 15px; font-weight: 600; font-size: 13px; flex-shrink: 0; }
        .option.selected .option-label { background-color: #3b82f6; color: white; border-color: #3b82f6; }
        .option.correct .option-label { background-color: #16a34a; color: white; border-color: #16a34a; }
        .option.incorrect .option-label { background-color: #dc2626; color: white; border-color: #dc2626; }
        .option-text { font-size: 14.5px; color: #334155; }

        .answer-key { margin-top: 25px; padding: 20px; background-color: #f0fdf4; border-left: 5px solid #16a34a; border-radius: 4px; display: none; }
        .answer-key.show { display: block; }
        .answer-key h4 { color: #15803d; margin-bottom: 6px; font-size: 15px; }
        .answer-key p { font-size: 13.5px; color: #166534; }

        .action-buttons { display: flex; justify-content: space-between; margin-top: auto; padding-top: 25px; border-top: 1px solid #f1f5f9; gap: 15px; }
        .btn { padding: 10px 20px; font-size: 13.5px; font-weight: 600; border-radius: 6px; cursor: pointer; border: none; }
        .btn-prev { background-color: #fff; color: #64748b; border: 1px solid #cbd5e1; }
        .btn-prev:hover:not(:disabled) { background-color: #f1f5f9; }
        .btn-next { background-color: #2563eb; color: white; margin-left: auto; }
        .btn-next:hover:not(:disabled) { background-color: #1d4ed8; }
        .btn-check { background-color: #1e293b; color: white; }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .sidebar { background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; max-height: 520px; }
        .sidebar-title { font-size: 15px; font-weight: 600; color: #1e293b; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; overflow-y: auto; padding-right: 5px; flex-grow: 1; margin-bottom: 15px; }
        .nav-item { display: flex; align-items: center; justify-content: center; height: 38px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12.5px; font-weight: 600; color: #475569; cursor: pointer; }
        .nav-item.current { border: 2px solid #2563eb; color: #2563eb; background-color: #fff; }
        .nav-item.correct { background-color: #dcfce7; border-color: #bbf7d0; color: #16a34a; }
        .nav-item.incorrect { background-color: #fee2e2; border-color: #fecaca; color: #dc2626; }

        .stats-summary { padding: 15px; background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; }
        .stat-line { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px; color: #475569; }
        .progress-container { margin-bottom: 20px; background-color: #e2e8f0; height: 6px; border-radius: 4px; overflow: hidden; }
        .progress-bar { background: #2563eb; height: 100%; width: 0%; transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="container">
        <div class="level-selector-bar">
            <span>Chọn cấp độ luyện tập:</span>
            <button class="lvl-btn active" id="btn-lvl1" onclick="switchLevel(1)">IC3 Level 1</button>
            <button class="lvl-btn" id="btn-lvl2" onclick="switchLevel(2)">IC3 Level 2</button>
            <button class="lvl-btn" id="btn-lvl3" onclick="switchLevel(2)">IC3 Level 3</button>
        </div>

        <header>
            <h1 id="header-title">IC3 GS6 Level 1 - 🌍 Công nghệ số cốt lõi</h1>
            <p id="header-desc">Hệ thống mô phỏng bài tập trắc nghiệm chuẩn quốc tế dựa trên tài liệu ôn thi chính thức.</p>
        </header>

        <div class="quiz-layout">
            <div class="main-quiz">
                <div class="progress-container"><div class="progress-bar" id="progress-bar"></div></div>
                <div class="quiz-header">
                    <span class="question-number">Câu hỏi <span id="q-num">1</span>/<span id="q-total">10</span></span>
                    <span class="score-display">Đúng: <span id="score-correct" style="color:#16a34a;">0</span> | Sai: <span id="score-incorrect" style="color:#dc2626;">0</span></span>
                </div>
                <div class="question-box">
                    <div class="question-text" id="question-text">Đang tải...</div>
                    <div class="options-container" id="options-container"></div>
                </div>
                <div class="answer-key" id="answer-key">
                    <h4><span id="result-icon">✨</span> <span id="result-text">Đáp án chính xác</span></h4>
                    <p id="explanation-text"></p>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-prev" id="btn-prev" onclick="changeQuestion(-1)" disabled>← Câu trước</button>
                    <button class="btn btn-check" id="btn-check" onclick="checkAnswer()">Kiểm tra đáp án</button>
                    <button class="btn btn-next" id="btn-next" onclick="changeQuestion(1)">Câu tiếp theo →</button>
                </div>
            </div>
            <div class="sidebar">
                <div class="sidebar-title">Danh sách câu hỏi</div>
                <div class="nav-grid" id="nav-grid"></div>
                <div class="stats-summary">
                    <div class="stat-line"><span>Đã làm:</span><span id="stat-answered">0/10</span></div>
                    <div class="stat-line"><span>Tỷ lệ chính xác:</span><span id="stat-accuracy">0%</span></div>
                </div>
            </div>
        </div>
    </div>`;

    let scriptContent = `<script>
        // Kho dữ liệu câu hỏi đồng bộ trực tiếp từ file tài liệu của bạn
        var database = {
            1: [
                { text: "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài (ngay cả khi tắt máy)?", options: ["Bộ xử lý trung tâm (CPU)", "Bộ nhớ truy cập ngẫu nhiên (RAM)", "Ổ đĩa cứng (HDD/SSD)", "Bo mạch chủ (Motherboard)"], correct: 2, explanation: "Ổ đĩa cứng (Hard drive) là thiết bị lưu trữ dữ liệu lâu dài, thông tin không bị mất đi khi ngắt nguồn điện." },
                { text: "Bốn thông tin nào sau đây được coi là thông tin nhận dạng cá nhân cần bảo mật (PII)?", options: ["Số căn cước công dân, Số điện thoại, Địa chỉ nhà, Ngày sinh", "Lịch sử duyệt web, Tên trình duyệt, Độ phân giải màn hình", "Nhãn hiệu máy tính, Dung lượng ổ cứng, Tên nhà mạng", "Tốc độ CPU, Phiên bản Windows, Danh sách phần mềm đã cài"], correct: 0, explanation: "PII (Personally Identifiable Information) gồm bất kỳ thông tin nào có thể dùng để định danh và xác định một cá nhân cụ thể." },
                { text: "Hệ điều hành (Operating System) nằm ở phân loại nào trong hệ thống máy tính?", options: ["Phần cứng (Hardware)", "Phần mềm hệ thống (System Software)", "Phần mềm ứng dụng (Application Software)", "Thiết bị ngoại vi (Peripheral)"], correct: 1, explanation: "Hệ điều hành là phần mềm hệ thống đứng ra điều phối phần cứng và làm nền tảng cho phần mềm ứng dụng." },
                { text: "Tùy chọn nào sau đây giúp xóa toàn bộ dữ liệu cá nhân một cách triệt để trước khi thanh lý thiết bị?", options: ["Tắt nguồn thiết bị", "Xóa các thư mục ngoài Desktop", "Khôi phục cài đặt gốc và xóa sạch dữ liệu (Factory Reset)", "Gỡ cài đặt các ứng dụng mạng xã hội"], correct: 2, explanation: "Factory Reset sẽ xóa sạch toàn bộ cấu hình, tài khoản và dữ liệu cá nhân bám trên bộ nhớ máy." },
                { text: "Loại phần mềm nào phân phối miễn phí hoàn toàn nhưng không cho phép người dùng xem hoặc sửa đổi mã nguồn?", options: ["Phần mềm nguồn mở (Open Source)", "Phần mềm thương mại mã nguồn đóng miễn phí (Freeware / Closed Source)", "Phần mềm miền công cộng (Public Domain)", "Phần mềm chia sẻ dùng thử (Shareware)"], correct: 1, explanation: "Freeware là phần mềm miễn phí cho người dùng cuối nhưng mã nguồn đóng và được bảo hộ độc quyền thương mại." },
                { text: "Khi bạn gửi một email và điền các địa chỉ liên hệ vào dòng CC (Carbon Copy), điều gì sẽ xảy ra?", options: ["Người nhận ở dòng To không thể xem danh sách CC.", "Tất cả người nhận (To và CC) đều nhìn thấy công khai địa chỉ của nhau.", "Email sẽ chuyển thành dạng ẩn danh hoàn toàn.", "Người ở dòng CC có quyền thu hồi thư đã gửi."], correct: 1, explanation: "CC (Carbon Copy) gửi bản sao công khai, tất cả mọi người nhận đều thấy địa chỉ email của nhau." },
                { text: "Hành vi nào dưới đây được phân loại chính xác là hành vi bắt nạt trên mạng (Cyberbullying)?", options: ["Hủy kết bạn sau khi tranh luận", "Báo cáo nội dung vi phạm tiêu chuẩn cộng đồng", "Tạo nhóm, trang web hoặc đăng tải ảnh/video cắt ghép nhằm xúc phạm danh dự người khác", "Tắt thông báo trò chuyện từ một nhóm quá phiền"], correct: 2, explanation: "Bắt nạt qua mạng là sử dụng công nghệ số để đe dọa, xúc phạm hoặc cố tình làm tổn hại tinh thần đối phương." },
                { text: "Khi mua sắm trên mạng, các dịch vụ trực tuyến như 'Lưu trữ đám mây' (Cloud Storage) thuộc loại hình sản phẩm nào?", options: ["Hàng hóa vật lý", "Dịch vụ kỹ thuật số (Digital Services)", "Phần cứng thô", "Mạng viễn thông cố định"], correct: 1, explanation: "Các giải pháp phần mềm chạy trực tuyến và không cầm nắm được về mặt vật lý là dịch vụ số kỹ thuật số." },
                { text: "Trong Windows, mục cài đặt nào cho phép thay đổi hình nền, màu sắc giao diện hệ thống?", options: ["Settings -> Personalization", "Settings -> System -> Display", "Control Panel -> Hardware", "Task Manager"], correct: 0, explanation: "Personalization (Cá nhân hóa) quản lý toàn bộ chủ đề hiển thị, hình nền nền, màn hình khóa." },
                { text: "Bộ nhớ RAM của máy tính có đặc tính kỹ thuật cốt lõi nào sau đây?", options: ["Lưu trữ vĩnh viễn dữ liệu", "Dữ liệu bị xóa sạch hoàn toàn khi ngắt nguồn điện hoặc tắt máy (Bộ nhớ tạm thời)", "Dung lượng luôn lớn hơn ổ đĩa cứng", "Xử lý trực tiếp các tác vụ đồ họa 3D phức tạp thay cho GPU"], correct: 1, explanation: "RAM là bộ nhớ truy xuất tạm thời (khả biến), mất điện dữ liệu sẽ lập tức biến mất." }
            ],
            2: [
                { text: "Nhiều hàng hóa và dịch vụ được bán trực tuyến. Tùy chọn nào sau đây thuộc nhóm Dịch vụ số kỹ thuật số? (Chọn đáp án đúng nhất)", options: ["Lưu trữ đám mây (Cloud storage) và Hỗ trợ máy tính từ xa", "Tai nghe không dây Bose Earbuds", "Điện thoại thông minh Samsung Galaxy", "Bàn phím cơ chuyên dụng lắp rời"], correct: 0, explanation: "Lưu trữ đám mây và hỗ trợ kĩ thuật từ xa là các loại hình dịch vụ số, không có cấu tạo vật lý như tai nghe hay điện thoại." },
                { text: "Loại tài khoản nào được yêu cầu bắt buộc để có thể đăng câu hỏi hoặc bình luận trong diễn đàn cộng đồng của Microsoft?", options: ["Domain Account", "Windows Local Account", "Microsoft Account", "Azure Active Directory Account"], correct: 2, explanation: "Bạn cần một tài khoản Microsoft cá nhân (Microsoft Account) để đăng nhập và tương tác trên cộng đồng Microsoft hỗ trợ." },
                { text: "Tùy chọn nào sau đây mô tả đúng nhất về đặc tính dịch vụ (ví dụ cắt tóc, sửa ống nước) phân biệt với hàng hóa?", options: ["Là sản phẩm phi vật chất, không thể lưu kho hoặc cầm nắm vật lý trực tiếp", "Là sản phẩm có thể sản xuất hàng loạt lưu kho", "Là sản phẩm có hạn sử dụng vĩnh viễn", "Là sản phẩm tự động tái tạo không tốn chi phí"], correct: 0, explanation: "Dịch vụ mang tính chất phi vật thể, thực hiện trực tiếp theo nhu cầu và không thể đóng gói lưu kho như hàng hóa vật lý." },
                { text: "Khi bạn nhập một tài liệu, tính năng nào tự động hoàn thành từ dựa trên các chữ cái đầu tiên bạn vừa nhập?", options: ["AutoFit (Tự khớp)", "AutoFormat (Tự định dạng)", "AutoComplete (Tự động hoàn tất)", "AutoFill (Tự động điền)"], correct: 2, explanation: "AutoComplete phân tích chữ cái đầu (ví dụ gõ 'Y') rồi tự hiển thị gợi ý từ đầy đủ ('Yes') cho bạn nhấn Enter." },
                { text: "Khi tham gia cuộc họp video từ xa, hành động nào đảm bảo tạo cơ hội công bằng cho tất cả thành viên phát biểu ý kiến?", options: ["Bật mic nói xen ngang liên tục", "Sử dụng tính năng giơ tay ảo (Raise Hand) có sẵn trên ứng dụng họp", "Chỉ thảo luận các ý kiến nằm trong danh sách cá nhân của mình", "Im lặng hoàn toàn suốt cuộc họp từ đầu đến cuối"], correct: 1, explanation: "Tính năng Giơ tay giúp người điều phối cuộc họp biết bạn muốn phát biểu theo thứ tự mà không ngắt lời người khác." }
            ],
            3: [
                { text: "Để một ứng dụng phần mềm có thể ra lệnh và hoạt động nhịp nhàng trên thiết bị, phần cứng và phần mềm của máy tính phải hiểu chung điểm gì?", options: ["Chương trình đặc biệt (Special Program)", "Ngôn ngữ nhị phân (Binary Language gồm các chuỗi 0 và 1)", "Mã bổ sung (Supplemental Code)", "Giao thức mạng LAN"], correct: 1, explanation: "Bản chất cốt lõi của phần cứng chỉ xử lý các bóng bán dẫn tắt/mở tương ứng với mã nhị phân 0 và 1, phần mềm phải biên dịch về mã này." },
                { text: "Định dạng tập tin Video kỹ thuật số nào phổ biến nhất và được hỗ trợ bởi hầu hết các trình duyệt và thiết bị hiện nay?", options: ["AVI", "MP4", "WMV", "FLV"], correct: 1, explanation: "MP4 (MPEG-4 Part 14) là tiêu chuẩn nén video quốc tế phổ biến nhất, nhẹ và tương thích mọi nền tảng." },
                { text: "Chuỗi lập luận: 'Nếu sinh viên không dùng bộ tài liệu này, họ sẽ trượt đại học' dựa vào uy tín một chuyên gia giấu tên vi phạm lỗi ngụy biện nào?", options: ["Tấn công cá nhân (Ad hominem)", "Song đề sai (False Dilemma) & Lợi dụng người nổi tiếng (Appeal to Authority)", "Vin vào truyền thống (Appeal to Tradition)", "Khái quát hóa vội vã"], correct: 1, explanation: "Chỉ đưa ra 2 lựa chọn cực đoan là ngụy biện song đề sai, đồng thời mượn danh chuyên gia mơ hồ là ngụy biện lợi dụng uy tín Authority." },
                { text: "Bạn muốn đưa trình duyệt Google Chrome về lại trạng thái cấu hình ban đầu của nhà sản xuất. Bạn chọn mục nào trong Settings?", options: ["Default browser (Trình duyệt mặc định)", "On startup (Khi khởi động)", "Reset and clean up (Đặt lại và dọn dẹp)", "Appearance (Hình thức hiển thị)"], correct: 2, explanation: "Tính năng 'Reset and clean up' cho phép xóa cookies, bộ nhớ tạm và tắt các tiện ích mở rộng lộn xộn, đưa Chrome về ban đầu." }
            ]
        };

        var currentLevel = 1;
        var questions = database[1];
        var currentQuestion = 0;
        var scoreCorrect = 0;
        var scoreIncorrect = 0;
        var userAnswers = [];

        function switchLevel(lvl) {
            currentLevel = lvl;
            questions = database[lvl];
            currentQuestion = 0;
            scoreCorrect = 0;
            scoreIncorrect = 0;
            userAnswers = new Array(questions.length).fill(null);
            
            // Cập nhật trạng thái nút bấm active
            document.querySelectorAll('.lvl-btn').forEach(function(btn) { btn.classList.remove('active'); });
            if(lvl === 1) {
                document.getElementById('btn-lvl1').classList.add('active');
                document.getElementById('header-title').textContent = "IC3 GS6 Level 1 - 🌍 Công nghệ số cốt lõi";
            } else if(lvl === 2) {
                document.getElementById('btn-lvl2').classList.add('active');
                document.getElementById('header-title').textContent = "IC3 GS6 Level 2 - 💻 Sáng tạo nội dung số";
            } else {
                document.getElementById('btn-lvl3').classList.add('active');
                document.getElementById('header-title').textContent = "IC3 GS6 Level 3 - 🚀 Tư duy số & Đời sống trực tuyến";
            }

            createNavigationButtons();
            updateQuestion();
        }

        function createNavigationButtons() {
            var navGrid = document.getElementById('nav-grid');
            navGrid.innerHTML = '';
            document.getElementById('q-total').textContent = questions.length;
            for (var i = 0; i < questions.length; i++) {
                var btn = document.createElement('div');
                btn.className = 'nav-item';
                btn.textContent = i + 1;
                btn.id = 'nav-item-' + i;
                btn.onclick = (function(index) { return function() { jumpToQuestion(index); }; })(i);
                navGrid.appendChild(btn);
            }
        }

        function updateQuestion() {
            var currentQ = questions[currentQuestion];
            document.getElementById('q-num').textContent = currentQuestion + 1;
            document.getElementById('question-text').textContent = currentQ.text;

            var optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';
            var selectedOptionIndex = null;
            var status = userAnswers[currentQuestion];

            currentQ.options.forEach(function(option, index) {
                var optDiv = document.createElement('div');
                optDiv.className = 'option';
                optDiv.id = 'option-' + index;
                
                var labelText = String.fromCharCode(65 + index);
                optDiv.innerHTML = '<div class="option-label">' + labelText + '</div><div class="option-text">' + option + '</div>';

                if (status === null) {
                    optDiv.onclick = function() {
                        window.latestSelectedIdx = index; 
                        document.querySelectorAll('.options-container .option').forEach(function(o, idx) {
                            if (idx === index) o.classList.add('selected');
                            else o.classList.remove('selected');
                        });
                    };
                } else {
                    if (index === currentQ.correct) {
                        optDiv.classList.add('correct');
                    } else if (status === 0 && index === currentQ.userChoice) {
                        optDiv.classList.add('incorrect');
                    }
                }
                optionsContainer.appendChild(optDiv);
            });

            var answerKey = document.getElementById('answer-key');
            if (status !== null) {
                answerKey.classList.add('show');
                document.getElementById('explanation-text').textContent = currentQ.explanation;
                var resultIcon = document.getElementById('result-icon');
                var resultText = document.getElementById('result-text');
                
                if (status === 1) {
                    resultIcon.textContent = '✅';
                    resultText.textContent = 'Chính xác! Đáp án đúng là ' + String.fromCharCode(65 + currentQ.correct);
                    answerKey.style.backgroundColor = '#f0fdf4';
                    answerKey.style.borderLeftColor = '#16a34a';
                } else {
                    resultIcon.textContent = '❌';
                    resultText.textContent = 'Chưa chính xác! Đáp án đúng là ' + String.fromCharCode(65 + currentQ.correct);
                    answerKey.style.backgroundColor = '#fef2f2';
                    answerKey.style.borderLeftColor = '#dc2626';
                }
                document.getElementById('btn-check').disabled = true;
            } else {
                window.latestSelectedIdx = null; 
                answerKey.classList.remove('show');
                document.getElementById('btn-check').disabled = false;
            }

            document.getElementById('btn-prev').disabled = (currentQuestion === 0);
            document.getElementById('btn-next').disabled = (currentQuestion === questions.length - 1);

            for (var i = 0; i < questions.length; i++) {
                var navItem = document.getElementById('nav-item-' + i);
                if (navItem) {
                    navItem.classList.remove('current', 'correct', 'incorrect');
                    if (i === currentQuestion) navItem.classList.add('current');
                    else if (userAnswers[i] === 1) navItem.classList.add('correct');
                    else if (userAnswers[i] === 0) navItem.classList.add('incorrect');
                }
            }

            var progress = ((currentQuestion + 1) / questions.length) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';
            updateStats();
        }

        function checkAnswer() {
            if (window.latestSelectedIdx === null || window.latestSelectedIdx === undefined) {
                alert('Vui lòng chọn một phương án trả lời!');
                return;
            }
            var currentQ = questions[currentQuestion];
            currentQ.userChoice = window.latestSelectedIdx;

            if (window.latestSelectedIdx === currentQ.correct) {
                userAnswers[currentQuestion] = 1;
                scoreCorrect++;
            } else {
                userAnswers[currentQuestion] = 0;
                scoreIncorrect++;
            }
            updateQuestion();
        }

        function changeQuestion(direction) {
            var nextQ = currentQuestion + direction;
            if (nextQ >= 0 && nextQ < questions.length) {
                currentQuestion = nextQ;
                updateQuestion();
            }
        }

        function jumpToQuestion(index) {
            currentQuestion = index;
            updateQuestion();
        }

        function updateStats() {
            document.getElementById('score-correct').textContent = scoreCorrect;
            document.getElementById('score-incorrect').textContent = scoreIncorrect;
            var answeredCount = userAnswers.filter(function(ans) { return ans !== null; }).length;
            document.getElementById('stat-answered').textContent = answeredCount + '/' + questions.length;
            var accuracy = answeredCount === 0 ? 0 : Math.round((scoreCorrect / answeredCount) * 100);
            document.getElementById('stat-accuracy').textContent = accuracy + '%';
        }

        function init() {
            switchLevel(1);
        }
        window.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>`;
    return htmlContent + scriptContent;
  }
};
