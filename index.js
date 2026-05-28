const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login", "/generative-ai", "/ic3-test"];
    if (!webPaths.includes(path)) return fetch(request);

    if (path === "/generative-ai") {
        return new Response(this.getGenerativeAIUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    if (path === "/ic3-test") {
        return new Response(this.getIC3QuizUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    // Giữ nguyên tính năng Bảng Vàng cập nhật tự động từ Google Sheets của bạn
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
    <title>MOS360 - Phòng Thi Thử Quốc Tế IC3 GS6</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #090a0f; color: #f1f5f9; line-height: 1.6; padding: 20px; }
        .container { max-width: 1260px; margin: 0 auto; background-color: #121520; border-radius: 18px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6); overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
        
        .level-bar { background-color: #181d2a; padding: 18px 25px; display: flex; gap: 14px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); overflow-x: auto; }
        .level-bar span { color: #94a3b8; font-weight: 600; font-size: 14px; margin-right: 8px; flex-shrink: 0; }
        .lvl-btn { padding: 10px 22px; background-color: #22293a; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; font-weight: 700; font-size: 13.5px; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .lvl-btn:hover { background-color: #2d364d; color: #fff; }
        .lvl-btn.active { background-color: #FF5722; color: white; border-color: #FF5722; box-shadow: 0 0 15px rgba(255,87,34,0.4); }

        header { background: linear-gradient(135deg, #131722, #1f2637); color: white; padding: 25px 30px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
        header h1 { font-size: 22px; margin-bottom: 4px; font-weight: 800; color: #fff; letter-spacing: 0.5px; }
        header p { font-size: 13px; color: #94a3b8; }
        
        .timer-box { background: rgba(255, 87, 34, 0.1); border: 2px solid #FF5722; padding: 10px 20px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 800; color: #ff784e; box-shadow: 0 0 15px rgba(255,87,34,0.15); }

        .quiz-layout { display: grid; grid-template-columns: 1fr 340px; gap: 20px; padding: 25px; }
        @media (max-width: 992px) { .quiz-layout { grid-template-columns: 1fr; } }
        
        .main-quiz { background-color: #171b26; border: 1px solid rgba(255,255,255,0.05); border-radius: 14px; padding: 25px; display: flex; flex-direction: column; min-height: 500px; position: relative; }
        .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .question-number { font-size: 13px; font-weight: 700; color: #00f2ff; background-color: rgba(0,242,255,0.1); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(0,242,255,0.2); }
        .score-display { font-size: 13px; font-weight: 600; color: #94a3b8; }
        
        .question-text { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 24px; line-height: 1.6; white-space: pre-line; }
        .options-container { display: flex; flex-direction: column; gap: 12px; }
        
        .option { display: flex; align-items: center; padding: 15px 20px; background-color: #1e2333; border: 2px solid #282f44; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; }
        .option:hover { background-color: #252c40; border-color: #3b4563; }
        .option.selected { background-color: rgba(0,242,255,0.05); border-color: #00f2ff; }
        .option.correct { background-color: rgba(22,163,74,0.15); border-color: #16a34a; }
        .option.incorrect { background-color: rgba(220,38,38,0.15); border-color: #dc2626; }
        
        .option-label { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background-color: #171b26; border: 1px solid #3b4563; border-radius: 50%; margin-right: 15px; font-weight: 700; font-size: 13px; color: #94a3b8; flex-shrink: 0; }
        .option.selected .option-label { background-color: #00f2ff; color: #000; border-color: #00f2ff; }
        .option.correct .option-label { background-color: #16a34a; color: white; border-color: #16a34a; }
        .option.incorrect .option-label { background-color: #dc2626; color: white; border-color: #dc2626; }
        .option-text { font-size: 14.5px; color: #cbd5e1; }

        .answer-key { margin-top: 25px; padding: 20px; background-color: rgba(22,163,74,0.08); border-left: 5px solid #16a34a; border-radius: 6px; display: none; }
        .answer-key.show { display: block; }
        .answer-key h4 { color: #4ade80; margin-bottom: 6px; font-size: 15px; font-weight: 700; }
        .answer-key p { font-size: 13.5px; color: #94a3b8; line-height: 1.5; }

        .action-buttons { display: flex; justify-content: space-between; margin-top: auto; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.05); gap: 15px; }
        .btn { padding: 12px 24px; font-size: 13.5px; font-weight: 700; border-radius: 8px; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-prev { background-color: #1e2333; color: #94a3b8; border: 1px solid #282f44; }
        .btn-prev:hover:not(:disabled) { background-color: #252c40; color: #fff; }
        .btn-next { background-color: #22293a; color: white; border: 1px solid #3b4563; }
        .btn-next:hover:not(:disabled) { background-color: #2d364d; }
        .btn-check { background-color: #FF5722; color: #fff; font-size: 14px; padding: 12px 28px; box-shadow: 0 4px 12px rgba(255,87,34,0.25); }
        .btn-check:hover:not(:disabled) { background-color: #e64a19; }
        .btn:disabled { opacity: 0.2; cursor: not-allowed; }

        .sidebar { background-color: #171b26; border: 1px solid rgba(255,255,255,0.05); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; height: 580px; }
        .sidebar-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; overflow-y: auto; padding-right: 5px; flex-grow: 1; margin-bottom: 15px; }
        .nav-item { display: flex; align-items: center; justify-content: center; height: 38px; background-color: #1e2333; border: 1px solid #282f44; border-radius: 6px; font-size: 13px; font-weight: 700; color: #94a3b8; cursor: pointer; }
        .nav-item:hover { border-color: #3b4563; color: #fff; }
        .nav-item.current { border: 2px solid #00f2ff; color: #00f2ff; background-color: #171b26; }
        .nav-item.answered { background-color: #2a354d; border-color: #4c5d85; color: #fff; }
        .nav-item.correct { background-color: rgba(22,163,74,0.2); border-color: #16a34a; color: #4ade80; }
        .nav-item.incorrect { background-color: rgba(220,38,38,0.2); border-color: #dc2626; color: #f87171; }

        .btn-submit-exam { width: 100%; background: linear-gradient(135deg, #00f2ff, #00a2ff); color: #000; font-weight: 800; padding: 12px; border-radius: 8px; border: none; cursor: pointer; margin-bottom: 15px; font-size: 14px; letter-spacing: 0.5px; transition: all 0.2s; box-shadow: 0 4px 15px rgba(0,242,255,0.2); }
        .btn-submit-exam:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,242,255,0.3); }
        
        .stats-summary { padding: 15px; background-color: #1e2333; border-radius: 8px; border: 1px solid #282f44; }
        .stat-line { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px; color: #94a3b8; }
        .progress-container { margin-bottom: 20px; background-color: #1e2333; height: 6px; border-radius: 4px; overflow: hidden; }
        .progress-bar { background: #FF5722; height: 100%; width: 0%; transition: width 0.3s ease; }

        /* Kết quả Modal Xịn Xò */
        .result-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(13,16,26,0.96); z-index: 100; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; display: none; }
        .result-overlay.show { display: flex; animation: fadeIn 0.4s ease-out; }
        .result-score { font-size: 64px; font-weight: 800; margin: 15px 0; letter-spacing: 1px; }
        .status-badge { padding: 8px 24px; border-radius: 30px; font-weight: 800; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        .badge-pass { background: rgba(0, 242, 255, 0.15); color: #00f2ff; border: 2px solid #00f2ff; box-shadow: 0 0 20px rgba(0,242,255,0.2); }
        .badge-fail { background: rgba(220, 38, 38, 0.15); color: #ff5252; border: 2px solid #dc2626; box-shadow: 0 0 20px rgba(220,38,38,0.2); }
        .btn-restart { background: #FF5722; color: white; padding: 12px 30px; font-weight: 700; border-radius: 8px; border: none; cursor: pointer; transition: 0.2s; font-size: 14px; }
        .btn-restart:hover { background: #e64a19; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="level-bar">
            <span>Chọn Đề Thi Thử:</span>
            <button class="lvl-btn active" id="btn-lvl1" onclick="switchLevel(1)">IC3 GS6 Level 1</button>
            <button class="lvl-btn" id="btn-lvl2" onclick="switchLevel(2)">IC3 GS6 Level 2</button>
            <button class="lvl-btn" id="btn-lvl3" onclick="switchLevel(3)">IC3 GS6 Level 3</button>
        </div>

        <header>
            <div>
                <h1 id="header-title">IC3 GS6 Level 1 - 🌍 Công nghệ số cốt lõi</h1>
                <p id="header-desc">Đề mô phỏng chuẩn Certiport: 45 Câu hỏi | 50 Phút | Điểm Đạt: 700/1000</p>
            </div>
            <div class="timer-box">
                <span>⏱️</span>
                <span id="countdown-timer">50:00</span>
            </div>
        </header>

        <div class="quiz-layout">
            <div class="main-quiz">
                <div class="result-overlay" id="result-overlay">
                    <h2 id="result-title">Kết Quả Bài Thi Thử</h2>
                    <div class="result-score" id="final-score-display">0</div>
                    <div class="status-badge" id="status-badge">PASS</div>
                    <p id="result-summary" style="color: #94a3b8; max-width: 500px; margin-bottom: 30px; font-size: 14.5px;"></p>
                    <button class="btn-restart" onclick="restartExam()">Làm Đề Mới (Đảo Câu Hỏi)</button>
                </div>

                <div class="progress-container"><div class="progress-bar" id="progress-bar"></div></div>
                <div class="quiz-header">
                    <span class="question-number">Câu hỏi <span id="q-num">1</span>/45</span>
                    <span class="score-display" id="live-score-box" style="display:none;">Đúng: <span id="score-correct" style="color:#4ade80;">0</span> | Sai: <span id="score-incorrect" style="color:#f87171;">0</span></span>
                    <span class="score-display" id="exam-mode-badge" style="color: #64748b; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Thực chiến: Ẩn kết quả</span>
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
                    <button class="btn btn-check" id="btn-check" onclick="checkAnswer()" style="display:none;">Kiểm tra câu này</button>
                    <button class="btn btn-next" id="btn-next" onclick="changeQuestion(1)">Câu tiếp theo →</button>
                </div>
            </div>
            <div class="sidebar">
                <button class="btn-submit-exam" id="btn-submit-exam" onclick="confirmSubmitExam()">NỘP BÀI THI & CHẤM ĐIỂM</button>
                <div class="sidebar-title">Bảng Tiến Độ</div>
                <div class="nav-grid" id="nav-grid"></div>
                <div class="stats-summary">
                    <div class="stat-line"><span>Đã chọn:</span><span id="stat-answered">0/45</span></div>
                    <div class="stat-line"><span>Mục tiêu Pass:</span><span style="color:#00f2ff; font-weight:bold;">700 Điểm</span></div>
                </div>
            </div>
        </div>
    </div>`;

    let scriptContent = `<script>
        // NGÂN HÀNG ĐỀ ĐẦY ĐỦ ĐÃ ĐƯỢC MỞ RỘNG VÀ CHUYỂN ĐỔI CHUẨN XÁC TỪ FILE PDF CỦA BẠN
        var database = {
            1: [
                { text: "[DẠNG GHÉP NỐI ĐÃ CHUYỂN ĐỔI]\\nHãy chọn cặp ghép ĐÚNG khi nói về mục đích cốt lõi của các ứng dụng phần mềm:", options: ["Phần mềm xử lý văn bản - Tính toán và hiển thị dữ liệu số dạng biểu đồ", "Ứng dụng bảng tính - Nhập, chỉnh sửa, định dạng tài liệu văn bản", "Trình duyệt web - Truy cập thông tin trên internet và thế giới trực tuyến", "Hệ thống quản lý cơ sở dữ liệu - Tạo các bài thuyết trình điện tử đa phương tiện"], correct: 2, explanation: "Trình duyệt web mục đích chính là truy cập internet. Các phương án khác đều bị đảo lộn vế sai chức năng." },
                { text: "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài (ngay cả khi tắt máy)?", options: ["Ổ đĩa cứng (HDD/SSD)", "Bộ xử lý trung tâm (CPU)", "Bộ nhớ tạm thời (RAM)", "Bo mạch chủ (Motherboard)"], correct: 0, explanation: "Ổ đĩa cứng là thiết bị lưu trữ thứ cấp lâu dài, không mất dữ liệu khi ngắt điện." },
                { text: "Bốn thông tin nào sau đây được coi là thông tin nhận dạng cá nhân cần bảo mật nghiêm ngặt (PII)?", options: ["Số căn cước công dân, Số điện thoại, Địa chỉ nhà, Ngày sinh", "Lịch sử duyệt web, Tên trình duyệt, Độ phân giải màn hình", "Nhãn hiệu máy tính, Dung lượng ổ cứng, Tên nhà mạng", "Tốc độ CPU, Phiên bản Windows, Danh sách phần mềm đã cài"], correct: 0, explanation: "PII (Personally Identifiable Information) là các thông tin nhạy cảm định danh trực tiếp danh tính một con người." },
                { text: "Khi bạn gửi một email và điền các địa chỉ liên hệ vào dòng CC (Carbon Copy), điều gì sẽ xảy ra?", options: ["Người nhận ở dòng To không thể xem danh sách CC.", "Tất cả người nhận (To và CC) đều nhìn thấy công khai địa chỉ của nhau.", "Email sẽ chuyển thành dạng ẩn danh hoàn toàn đối với mọi người.", "Người ở dòng CC có quyền thu hồi thư đã gửi từ hòm thư người khác."], correct: 1, explanation: "CC gửi bản sao công khai, mọi người nhận đều xem được địa chỉ email của nhau." },
                { text: "Hành vi nào dưới đây được phân loại chính
