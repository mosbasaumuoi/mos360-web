const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Cập nhật danh sách các tuyến đường web an toàn
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login", "/generative-ai", "/ic3-test"];
    if (!webPaths.includes(path)) return fetch(request);

    if (path === "/generative-ai") {
        return new Response(this.getGenerativeAIUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    if (path === "/ic3-test") {
        return new Response(this.getIC3QuizUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    // Giữ nguyên logic Bảng Vàng từ Google Sheets cũ của bạn
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
        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 40px; }
        .btn-action { background: var(--primary); color: white; border: none; padding: 12px; border-radius: 30px; font-weight: 800; cursor: pointer; width: 100%; }
        @media (max-width: 800px) { .main-container, .footer-grid { grid-template-columns: 1fr; } }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="` + CONFIG.LOGO_URL + `"> MOS360</a>
        <nav><a href="/">TRANG CHỦ</a><a href="/courses">KHÓA HỌC</a><a href="/library">KHO MOS</a><a href="/login" style="color:var(--primary)">ĐĂNG NHẬP</a></nav>
    </header>
    <nav style="background: rgba(255,255,255,0.03); padding: 8px 5%; font-size: 0.8rem; border-bottom: 1px solid var(--border); display:flex; gap:15px; overflow-x: auto;">
        <span style="color:#666; flex-shrink: 0;">🎯 Chuyên mục HOT:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold; margin:0;">✨ Trắc nghiệm Generative AI</a>
        <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold; margin:0;">🌍 [MỚI] Luyện Đề IC3 GS6 Tổng Hợp (Level 1/2/3)</a>
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
  getGenerativeAIUI() { return `<div style="padding:100px 5%; text-align:center; color:#fff; background:var(--card); border-radius:20px; max-width:800px; margin:40px auto; border:1px solid var(--border);"><h1>✨ Trắc nghiệm Generative AI</h1><p style="margin:20px 0; color:#888;">Hệ thống bài tập cũ của bạn.</p><p><a href="/ic3-test" style="color:var(--cyan); text-decoration:none; font-weight:bold;">👉 Bấm để sang trang Trắc Nghiệm IC3 GS6 mới gộp</a></p></div>`; },

  getIC3QuizUI() {
    let htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOS360 - Trắc nghiệm IC3 GS6 (Level 1-2-3)</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #0c0d10; color: #f1f5f9; line-height: 1.6; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background-color: #151821; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
        
        .level-bar { background-color: #1e2330; padding: 18px 25px; display: flex; gap: 14px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); overflow-x: auto; }
        .level-bar span { color: #94a3b8; font-weight: 600; font-size: 14px; margin-right: 8px; flex-shrink: 0; }
        .lvl-btn { padding: 10px 20px; background-color: #282f42; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .lvl-btn:hover { background-color: #343d54; color: #fff; }
        .lvl-btn.active { background-color: #FF5722; color: white; border-color: #FF5722; box-shadow: 0 0 15px rgba(255,87,34,0.4); }

        header { background: linear-gradient(135deg, #161b26, #242c3d); color: white; padding: 25px 30px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        header h1 { font-size: 22px; margin-bottom: 6px; font-weight: 800; color: #fff; letter-spacing: 0.5px; }
        header p { font-size: 13px; color: #94a3b8; }

        .quiz-layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; padding: 25px; }
        @media (max-width: 992px) { .quiz-layout { grid-template-columns: 1fr; } }
        
        .main-quiz { background-color: #1b1f2b; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 25px; display: flex; flex-direction: column; min-height: 480px; }
        .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .question-number { font-size: 13px; font-weight: 700; color: #00f2ff; background-color: rgba(0,242,255,0.1); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(0,242,255,0.2); }
        .score-display { font-size: 13px; font-weight: 600; color: #94a3b8; }
        
        .question-text { font-size: 16.5px; font-weight: 700; color: #fff; margin-bottom: 22px; line-height: 1.6; white-space: pre-line; }
        .options-container { display: flex; flex-direction: column; gap: 12px; }
        
        .option { display: flex; align-items: center; padding: 14px 20px; background-color: #222736; border: 2px solid #2d3448; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; }
        .option:hover { background-color: #2a3144; border-color: #404b69; }
        .option.selected { background-color: rgba(0,242,255,0.05); border-color: #00f2ff; }
        .option.correct { background-color: rgba(22,163,74,0.15); border-color: #16a34a; }
        .option.incorrect { background-color: rgba(220,38,38,0.15); border-color: #dc2626; }
        
        .option-label { display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background-color: #1b1f2b; border: 1px solid #404b69; border-radius: 50%; margin-right: 15px; font-weight: 700; font-size: 13px; color: #94a3b8; flex-shrink: 0; }
        .option.selected .option-label { background-color: #00f2ff; color: #000; border-color: #00f2ff; }
        .option.correct .option-label { background-color: #16a34a; color: white; border-color: #16a34a; }
        .option.incorrect .option-label { background-color: #dc2626; color: white; border-color: #dc2626; }
        .option-text { font-size: 14.5px; color: #cbd5e1; }

        .answer-key { margin-top: 25px; padding: 20px; background-color: rgba(22,163,74,0.08); border-left: 5px solid #16a34a; border-radius: 6px; display: none; }
        .answer-key.show { display: block; }
        .answer-key h4 { color: #4ade80; margin-bottom: 6px; font-size: 15px; font-weight: 700; }
        .answer-key p { font-size: 13.5px; color: #94a3b8; line-height: 1.5; }

        .action-buttons { display: flex; justify-content: space-between; margin-top: auto; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.05); gap: 15px; }
        .btn { padding: 11px 22px; font-size: 13.5px; font-weight: 700; border-radius: 8px; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-prev { background-color: #222736; color: #94a3b8; border: 1px solid #2d3448; }
        .btn-prev:hover:not(:disabled) { background-color: #2a3144; color: #fff; }
        .btn-next { background-color: #FF5722; color: white; margin-left: auto; }
        .btn-next:hover:not(:disabled) { background-color: #e64a19; }
        .btn-check { background-color: #fff; color: #111827; }
        .btn-check:hover:not(:disabled) { background-color: #e5e7eb; }
        .btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .sidebar { background-color: #1b1f2b; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; height: 540px; }
        .sidebar-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; overflow-y: auto; padding-right: 5px; flex-grow: 1; margin-bottom: 15px; }
        .nav-item { display: flex; align-items: center; justify-content: center; height: 38px; background-color: #222736; border: 1px solid #2d3448; border-radius: 6px; font-size: 13px; font-weight: 700; color: #94a3b8; cursor: pointer; }
        .nav-item:hover { border-color: #404b69; color: #fff; }
        .nav-item.current { border: 2px solid #00f2ff; color: #00f2ff; background-color: #1b1f2b; }
        .nav-item.correct { background-color: rgba(22,163,74,0.2); border-color: #16a34a; color: #4ade80; }
        .nav-item.incorrect { background-color: rgba(220,38,38,0.2); border-color: #dc2626; color: #f87171; }

        .stats-summary { padding: 15px; background-color: #222736; border-radius: 8px; border: 1px solid #2d3448; }
        .stat-line { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px; color: #94a3b8; }
        .progress-container { margin-bottom: 20px; background-color: #222736; height: 6px; border-radius: 4px; overflow: hidden; }
        .progress-bar { background: #00f2ff; height: 100%; width: 0%; transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="container">
        <div class="level-bar">
            <span>Cấp độ ôn tập:</span>
            <button class="lvl-btn active" id="btn-lvl1" onclick="switchLevel(1)">IC3 Level 1</button>
            <button class="lvl-btn" id="btn-lvl2" onclick="switchLevel(2)">IC3 Level 2</button>
            <button class="lvl-btn" id="btn-lvl3" onclick="switchLevel(3)">IC3 Level 3</button>
        </div>

        <header>
            <h1 id="header-title">IC3 GS6 Level 1 - 🌍 Công nghệ số cốt lõi</h1>
            <p id="header-desc">Hệ thống trắc nghiệm khách quan chuẩn quốc tế bám sát tài liệu ôn tập của bạn.</p>
        </header>

        <div class="quiz-layout">
            <div class="main-quiz">
                <div class="progress-container"><div class="progress-bar" id="progress-bar"></div></div>
                <div class="quiz-header">
                    <span class="question-number">Câu hỏi <span id="q-num">1</span>/<span id="q-total">10</span></span>
                    <span class="score-display">Đúng: <span id="score-correct" style="color:#4ade80;">0</span> | Sai: <span id="score-incorrect" style="color:#f87171;">0</span></span>
                </div>
                <div class="question-box">
                    <div class="question-text" id="question-text">Đang nạp dữ liệu...</div>
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
        // NGÂN HÀNG ĐỀ ĐẦY ĐỦ 3 LEVEL ĐÃ ĐƯỢC CHUYỂN ĐỔI, TỐI ƯU HÓA TỪ FILE TÀI LIỆU CỦA BẠN
        var database = {
            1: [
                { text: "[DẠNG GHÉP NỐI ĐÃ CHUYỂN ĐỔI]\\nHãy chọn cặp ghép ĐÚNG khi nói về mục đích cốt lõi của các ứng dụng phần mềm:", options: ["Phần mềm xử lý văn bản - Tính toán và hiển thị dữ liệu số dạng biểu đồ", "Ứng dụng bảng tính - Nhập, chỉnh sửa, định dạng tài liệu văn bản", "Trình duyệt web - Truy cập thông tin trên internet và thế giới trực tuyến", "Hệ thống quản lý cơ sở dữ liệu - Tạo các bài thuyết trình điện tử đa phương tiện"], correct: 2, explanation: "Trình duyệt web mục đích chính là truy cập internet. Các phương án khác đều bị đảo lộn vế sai chức năng." },
                { text: "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài (ngay cả khi tắt máy)?", options: ["Ổ đĩa cứng (HDD/SSD)", "Bộ xử lý trung tâm (CPU)", "Bộ nhớ tạm thời (RAM)", "Bo mạch chủ (Motherboard)"], correct: 0, explanation: "Ổ đĩa cứng là thiết bị lưu trữ thứ cấp lâu dài, không mất dữ liệu khi ngắt điện." },
                { text: "Bốn thông tin nào sau đây được coi là thông tin nhận dạng cá nhân cần bảo mật nghiêm ngặt (PII)?", options: ["Số căn cước công dân, Số điện thoại, Địa chỉ nhà, Ngày sinh", "Lịch sử duyệt web, Tên trình duyệt, Độ phân giải màn hình", "Nhãn hiệu máy tính, Dung lượng ổ cứng, Tên nhà mạng", "Tốc độ CPU, Phiên bản Windows, Danh sách phần mềm đã cài"], correct: 0, explanation: "PII (Personally Identifiable Information) là các thông tin nhạy cảm định danh trực tiếp danh tính một con người." },
                { text: "Khi bạn gửi một email và điền các địa chỉ liên hệ vào dòng CC (Carbon Copy), điều gì sẽ xảy ra?", options: ["Người nhận ở dòng To không thể xem danh sách CC.", "Tất cả người nhận (To và CC) đều nhìn thấy công khai địa chỉ của nhau.", "Email sẽ chuyển thành dạng ẩn danh hoàn toàn đối với mọi người.", "Người ở dòng CC có quyền thu hồi thư đã gửi từ hòm thư người khác."], correct: 1, explanation: "CC gửi bản sao công khai, mọi người nhận đều xem được địa chỉ email của nhau." },
                { text: "Hành vi nào dưới đây được phân loại chính xác là hành vi bắt nạt trên mạng (Cyberbullying)?", options: ["Hủy kết bạn sau khi tranh luận trên một diễn đàn mở", "Báo cáo nội dung vi phạm tiêu chuẩn cộng đồng của nền tảng", "Tạo nhóm, trang web hoặc đăng tải ảnh/video cắt ghép nhằm xúc phạm danh dự người khác", "Tắt thông báo trò chuyện từ một nhóm quá phiền phức"], correct: 2, explanation: "Sử dụng công nghệ số bôi nhọ, đe dọa, làm nhục người khác một cách có hệ thống là Cyberbullying." },
                { text: "Hệ điều hành (Operating System) nằm ở phân loại nào trong hệ thống máy tính?", options: ["Phần cứng (Hardware)", "Phần mềm hệ thống (System Software)", "Phần mềm ứng dụng (Application Software)", "Thiết bị ngoại vi (Peripheral)"], correct: 1, explanation: "Hệ điều hành quản lý phần cứng và làm nền tảng chạy ứng dụng nên thuộc phần mềm hệ thống." },
                { text: "Tùy chọn nào sau đây giúp xóa toàn bộ dữ liệu cá nhân một cách triệt để trước khi thanh lý thiết bị cũ?", options: ["Tắt nguồn thiết bị", "Xóa các thư mục ngoài Desktop", "Khôi phục cài đặt gốc và xóa sạch dữ liệu (Factory Reset)", "Gỡ cài đặt các ứng dụng mạng xã hội"], correct: 2, explanation: "Factory Reset định dạng lại phân vùng dữ liệu và đưa máy về trạng thái xuất xưởng sạch sẽ." },
                { text: "Loại phần mềm nào phân phối miễn phí hoàn toàn nhưng người dùng không được xem hoặc sửa đổi mã nguồn?", options: ["Phần mềm nguồn mở (Open Source)", "Phần mềm thương mại mã nguồn đóng miễn phí (Freeware)", "Phần mềm miền công cộng (Public Domain)", "Phần mềm chia sẻ dùng thử hạn chế (Shareware)"], correct: 1, explanation: "Freeware miễn phí sử dụng nhưng mã nguồn đóng và được bảo hộ độc quyền thương mại sở hữu trí tuệ." },
                { text: "Trong Windows, mục cài đặt nào cho phép bạn thay đổi hình nền và màu sắc chủ đề giao diện hệ thống?", options: ["Settings -> Personalization", "Settings -> System -> Display", "Control Panel -> Hardware", "Task Manager -> Performance"], correct: 0, explanation: "Personalization là trung tâm cá nhân hóa giao diện (hình nền, màu sắc, màn hình khóa)." },
                { text: "Bộ nhớ RAM của máy tính có đặc tính kỹ thuật cốt lõi nào sau đây?", options: ["Lưu trữ vĩnh viễn dữ liệu", "Dữ liệu bị xóa sạch hoàn toàn khi ngắt nguồn điện hoặc tắt máy (Bộ nhớ tạm thời)", "Dung lượng luôn lớn hơn ổ đĩa cứng", "Xử lý trực tiếp các tác vụ đồ họa 3D phức tạp thay cho GPU"], correct: 1, explanation: "RAM là bộ nhớ khả biến (volatile), dữ liệu chỉ tồn tại tạm thời khi có dòng điện nuôi mạch." }
            ],
            2: [
                { text: "Nhiều hàng hóa và dịch vụ được bán trực tuyến. Ba tùy chọn nào sau đây thuộc nhóm Dịch vụ số kỹ thuật số (Digital Services)?", options: ["Lưu trữ đám mây (Cloud storage), Hỗ trợ máy tính từ xa, Ứng dụng trực tuyến", "Tai nghe không dây, Điện thoại thông minh, Chuột cơ lắp rời", "Bàn phím không dây, Bo mạch chủ, Ổ cứng di động USB", "Cáp mạng internet, Màn hình LED, Nguồn máy tính"], correct: 0, explanation: "Các giải pháp phần mềm chạy trực tuyến và không cầm nắm được về mặt vật lý là dịch vụ số kỹ thuật số." },
                { text: "Loại tài khoản nào được yêu cầu bắt buộc để có thể đăng câu hỏi hoặc bình luận trong diễn đàn cộng đồng của Microsoft?", options: ["Domain Account", "Windows Local Account", "Microsoft Account", "Azure Active Directory Account"], correct: 2, explanation: "Hệ thống hỗ trợ Microsoft Community yêu cầu tài khoản Microsoft Account cá nhân định danh." },
                { text: "Tùy chọn nào sau đây mô tả đúng nhất về đặc tính dịch vụ đời sống (ví dụ cắt tóc, sửa ống nước) phân biệt với hàng hóa?", options: ["Là sản phẩm phi vật chất, không thể lưu kho hoặc cầm nắm vật lý trực tiếp", "Là sản phẩm có thể sản xuất hàng loạt lưu kho số lượng lớn", "Là sản phẩm có hạn sử dụng vĩnh viễn không suy giảm", "Là sản phẩm tự động tái tạo không tốn chi phí vận hành"], correct: 0, explanation: "Dịch vụ mang tính chất phi vật thể, thực hiện trực tiếp theo nhu cầu và không thể đóng gói lưu kho thương mại." },
                { text: "Khi cô Wilkins nhập một bảng tính, cô nhận thấy khi cô nhập chữ cái 'Y', từ 'Yes' tự động xuất hiện. Tính năng nào xử lý việc này?", options: ["Tự khớp (AutoFit)", "Tự định dạng (AutoFormat)", "Tự động hoàn tất (AutoComplete)", "Tự động điền (AutoFill)"], correct: 2, explanation: "AutoComplete phân tích chữ cái đầu rồi tự hiển thị gợi ý từ đầy đủ có sẵn trong cột cho bạn." },
                { text: "Khi tham gia cuộc họp video từ xa, hành động nào đảm bảo tạo cơ hội công bằng cho tất cả thành viên phát biểu ý kiến?", options: ["Bật mic nói xen ngang liên tục", "Sử dụng tính năng giơ tay ảo (Raise Hand) có sẵn trên ứng dụng họp", "Chỉ thảo luận các ý kiến nằm trong danh sách cá nhân của mình", "Im lặng hoàn toàn suốt cuộc họp từ đầu đến cuối không tương tác"], correct: 1, explanation: "Tính năng Giơ tay giúp người điều phối cuộc họp biết bạn muốn phát biểu theo thứ tự khoa học không ngắt lời." },
                { text: "Trên thiết bị Windows, từ khu vực cài đặt nào người ta có thể thay đổi màu nền của màn hình trực quan?", options: ["Settings -> Personalization", "Control Panel -> Display", "Settings -> System -> Apps", "Taskbar Settings"], correct: 0, explanation: "Personalization (Cá nhân hóa) là nơi điều chỉnh nền, màu sắc hiển thị hệ thống." },
                { text: "Phát biểu nào sau đây đúng nhất về bản chất của việc nén tập tin (File Compression)?", options: ["Làm tăng dung lượng file để bảo mật", "Giảm dung lượng file giúp dễ dàng lưu trữ và truyền tải qua mạng nhanh hơn", "Chuyển đổi file văn bản thành file video", "Xóa hoàn toàn file gốc khỏi hệ thống máy tính"], correct: 1, explanation: "Nén file sử dụng thuật toán gom cụm dữ liệu trùng lặp để giảm kích thước lưu trữ hữu hiệu." },
                { text: "Khi làm việc nhóm trên Google Docs, hành động nào thể hiện sự tôn trọng quyền tác giả của thành viên khác?", options: ["Tự ý xóa toàn bộ bài của họ mà không thông báo", "Để lại bình luận góp ý (Comment) hoặc sử dụng chế độ đề xuất chỉnh sửa (Suggesting)", "Sao chép bài của họ rồi ký tên mình vào", "Chia sẻ file công khai ra ngoài khi chưa được phép"], correct: 1, explanation: "Sử dụng tính năng Comment/Suggesting giúp thảo luận minh bạch, không phá hỏng cấu trúc bài viết gốc của đồng đội." },
                { text: "Thiết bị nào sau đây đóng vai trò là 'bộ não' điều phối, thực hiện các lệnh toán học và logic của máy tính?", options: ["Bộ xử lý trung tâm (CPU)", "Bộ nhớ RAM", "Ổ cứng SSD", "Card đồ họa rời (GPU)"], correct: 0, explanation: "CPU (Central Processing Unit) thực hiện xử lý tất cả các câu lệnh và dữ liệu cốt lõi của hệ thống máy tính." },
                { text: "Khi một người dùng nhận được cuộc gọi điện thoại khẩn cấp khi đang họp video trực tuyến, họ nên làm gì để văn minh nhất?", options: ["Nói to vào mic để giải thích tình huống", "Tắt camera và tắt tiếng (Mute mic) trước khi nghe máy để không làm phiền phòng họp", "Cứ thế nghe máy bình thường", "Rời khỏi cuộc họp ngay lập tức không quay lại"], correct: 1, explanation: "Tắt tiếng (Mute) và tắt hình giúp bảo vệ không gian âm thanh chung của phòng họp trực tuyến." }
            ],
            3: [
                { text: "Để một ứng dụng phần mềm có thể ra lệnh và hoạt động nhịp nhàng trên thiết bị, phần cứng và phần mềm của máy tính phải hiểu chung điểm gì?", options: ["Chương trình đặc biệt (Special Program)", "Ngôn ngữ nhị phân (Binary Language gồm các chuỗi 0 và 1)", "Mã bổ sung (Supplemental Code)", "Giao thức mạng LAN nội bộ"], correct: 1, explanation: "Bản chất phần cứng chỉ xử lý dòng điện tắt/mở (0/1). Phần mềm bắt buộc phải biên dịch về mã nhị phân." },
                { text: "Định dạng tập tin Video kỹ thuật số nào phổ biến nhất và được hỗ trợ bởi hầu hết các trình duyệt và thiết bị hiện nay?", options: ["AVI", "MP4", "WMV", "FLV"], correct: 1, explanation: "MP4 (MPEG-4) là tiêu chuẩn nén video quốc tế thông dụng nhất, nhẹ và tương thích hoàn hảo mọi nền tảng." },
                { text: "Chuỗi lập luận: 'Nếu sinh viên không dùng bộ tài liệu này, họ sẽ trượt đại học' dựa vào uy tín một chuyên gia giấu tên vi phạm các lỗi ngụy biến nào? (Chọn phương án đúng nhất)", options: ["Tấn công cá nhân (Ad hominem)", "Song đề sai (False Dilemma) & Lợi dụng người nổi tiếng (Appeal to Authority)", "Vin vào truyền thống (Appeal to Tradition)", "Khái quát hóa vội vã"], correct: 1, explanation: "Ép buộc vào 2 lựa chọn cực đoan là song đề sai, mượn danh chuyên gia mơ hồ là lợi dụng uy tín." },
                { text: "Bạn muốn đưa trình duyệt Google Chrome về lại trạng thái cấu hình sạch sẽ ban đầu của nhà sản xuất. Bạn chọn mục nào trong Settings?", options: ["Default browser (Trình duyệt mặc định)", "On startup (Khi khởi động)", "Reset and clean up (Đặt lại và dọn dẹp)", "Appearance (Hình thức hiển thị)"], correct: 2, explanation: "Tính năng 'Reset and clean up' khôi phục toàn bộ cài đặt gốc, xóa bộ nhớ đệm lỗi của Chrome." },
                { text: "Hành động nào sau đây là giải pháp bảo vệ môi trường chuẩn nhất đối với các thiết bị công nghệ cũ lỗi thời không còn sử dụng?", options: ["Vứt vào thùng rác sinh hoạt thông thường", "Đốt để lấy linh kiện đồng bên trong", "Đem đến các trung tâm thu gom rác thải công nghệ để tái chế (Recycle) đúng quy trình", "Chôn sâu dưới đất sau vườn nhà"], correct: 2, explanation: "Rác thải điện tử chứa kim loại nặng độc hại, bắt buộc phải qua quy trình tái chế chuyên dụng để bảo vệ nguồn nước và đất." },
                { text: "Loại phần mềm ứng dụng nào phân phối mã nguồn công khai, cho phép cộng đồng tự do chỉnh sửa và phát triển lại?", options: ["Phần mềm nguồn đóng (Closed Source)", "Phần mềm nguồn mở (Open Source)", "Phần mềm thương mại độc quyền", "Phần mềm chia sẻ giới hạn tính năng"], correct: 1, explanation: "Open Source (Nguồn mở) công khai mã nguồn hoàn toàn (ví dụ: Linux, WordPress) cho cộng đồng cùng phát triển." },
                { text: "Khi một trang web sử dụng giao thức bảo mật dữ liệu truyền tải trên đường truyền, địa chỉ URL của nó sẽ bắt đầu bằng cụm từ nào?", options: ["http://", "https://", "ftp://", "www."], correct: 1, explanation: "Chữ 's' trong 'https' viết tắt của 'Secure' (Bảo mật), biểu thị dữ liệu được mã hóa qua SSL/TLS." },
                { text: "Việc sử dụng bản sao phần mềm lậu, bẻ khóa (Crack) vi phạm nghiêm trọng điều khoản nào sau đây?", options: ["Bản quyền tác giả và quyền sở hữu trí tuệ (Intellectual Property Rights)", "Chính sách bảo hành phần cứng máy tính", "Dung lượng băng thông mạng internet nhà mạng", "Tiêu chuẩn tiết kiệm điện năng của thiết bị"], correct: 0, explanation: "Xài phần mềm crack là hành vi xâm phạm bản quyền tài sản trí tuệ thương mại bất hợp pháp." },
                { text: "Khi bạn tạo mật khẩu cho tài khoản trực tuyến, tiêu chí nào sau đây tạo nên một mật khẩu mạnh mẽ (Strong Password) khó bị hacker dò quét nhất?", options: ["Chỉ gồm 8 chữ số ngày sinh dễ nhớ", "Mật khẩu ngắn gọn gồm tên của bạn viết hoa", "Kết hợp tối thiểu 8 ký tự gồm: Chữ hoa, chữ thường, chữ số và ký tự đặc biệt (@,#,$,...)", "Sử dụng chuỗi ký tự tăng dần liên tiếp như '12345678'"], correct: 2, explanation: "Mật khẩu phức tạp hóa các lớp ký tự tăng trưởng độ khó của thuật toán dò quét mật khẩu (Brute-force)." },
                { text: "Hệ thống điện toán đám mây (Cloud Computing) mang lại lợi ích cốt lõi nào sau đây cho người dùng doanh nghiệp?", options: ["Làm máy tính chạy nhanh hơn mà không cần nâng cấp RAM", "Có thể truy cập dữ liệu và ứng dụng làm việc từ bất kỳ đâu qua kết nối Internet", "Tự động sửa chữa phần cứng máy tính khi bị hỏng hóc vật lý", "Giảm 100% tiền cước internet hàng tháng"], correct: 1, explanation: "Bản chất của Cloud là lưu trữ tập trung trên máy chủ trực tuyến, cho phép truy xuất linh hoạt mọi lúc mọi nơi." }
            ]
        };

        var currentLevel = 1;
        var rawQuestions = []; // Mảng chứa câu hỏi gốc
        var questions = [];    // Mảng chứa câu hỏi đã xáo trộn ngẫu nhiên
        var currentQuestion = 0;
        var scoreCorrect = 0;
        var scoreIncorrect = 0;
        var userAnswers = [];

        // Hàm xáo trộn mảng ngẫu nhiên (Fisher-Yates Shuffle) - Giúp học viên không học vẹt
        function shuffleArray(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            var newArray = JSON.parse(JSON.stringify(array)); 
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = newArray[currentIndex];
                newArray[currentIndex] = newArray[randomIndex];
                newArray[randomIndex] = temporaryValue;
            }
            return newArray;
        }

        function switchLevel(lvl) {
            currentLevel = lvl;
            rawQuestions = database[lvl];
            
            // Tiến hành xáo trộn câu hỏi mỗi khi đổi cấp độ
            questions = shuffleArray(rawQuestions);
            
            currentQuestion = 0;
            scoreCorrect = 0;
            scoreIncorrect = 0;
            userAnswers = new Array(questions.length).fill(null);
            
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
                    answerKey.style.backgroundColor = 'rgba(22,163,74,0.1)';
                    answerKey.style.borderLeftColor = '#16a34a';
                } else {
                    resultIcon.textContent = '❌';
                    resultText.textContent = 'Chưa chính xác! Đáp án đúng là ' + String.fromCharCode(65 + currentQ.correct);
                    answerKey.style.backgroundColor = 'rgba(220,38,38,0.1)';
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
