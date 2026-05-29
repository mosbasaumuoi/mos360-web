const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
  SHEET_EDIT_URL: "https://docs.google.com/spreadsheets/d/17spoqBAGtinFHQSTGbaDMapFH4nWGS0RHGGhCB5WzqI/edit?gid=0#gid=0",
  SOCIALS: {
    ZALO: "https://zalo.me/0912888360",
    FACEBOOK: "https://facebook.com/mos360",
    MESSENGER: "https://m.me/mos360",
    YOUTUBE: "https://youtube.com/@mos360",
    TIKTOK: "https://tiktok.com/@mos360"
  },
  ADMIN: {
    USER: "admin@mos360",
    PASS: "Mos360"
  }
};

// Hàm bổ trợ chuẩn hóa số điện thoại về định dạng chung đầu số 0
function normalizePhone(phoneStr) {
  if (!phoneStr) return "";
  let cleaned = phoneStr.replace(/\D/g, ""); // Xóa mọi ký tự không phải số
  if (cleaned.startsWith("84")) {
    cleaned = "0" + cleaned.substring(2);
  } else if (cleaned.startsWith("+84")) {
    cleaned = "0" + cleaned.substring(3);
  }
  return cleaned;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 3. API TRA CỨU TỰ ĐỘNG CHUẨN MÃ KHÓA HỌC + SỐ ĐIỆN THOẠI
    if (path === "/api/verify-code") {
      const rawPhone = url.searchParams.get("phone");
      const course = url.searchParams.get("course")?.trim();
      
      const phone = normalizePhone(rawPhone);
      if (!phone || !course) {
        return new Response(JSON.stringify({ success: false, msg: "Thiếu thông tin số điện thoại hoặc khóa học!" }), { headers: { "Content-Type": "application/json" } });
      }

      try {
        const exportUrl = CONFIG.SHEET_EDIT_URL.split("/edit")[0] + "/export?format=tsv&gid=0&v=" + Date.now();
        const resp = await fetch(exportUrl);
        const tsv = await resp.text();
        const rows = tsv.split("\n");

        let isValid = false;
        let reason = "Số điện thoại chưa được đăng ký hoặc kích hoạt khóa học này trên hệ thống MOS360!";
        const targetCourseClean = course.replace(/\s+/g, ' ').trim().toLowerCase();

        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i].split("\t");
          if (cols.length >= 2) {
            const sheetCourseRaw = cols[0]?.replace(/\r/g, "");
            const sheetCourseClean = sheetCourseRaw ? sheetCourseRaw.replace(/\s+/g, ' ').trim().toLowerCase() : "";
            const sheetPhoneRaw = cols[1]?.replace(/\r/g, "");
            const sheetPhone = normalizePhone(sheetPhoneRaw);
            const sheetDateStr = cols[2]?.replace(/\r/g, "").trim();

            if (sheetPhone === phone && (sheetCourseClean === targetCourseClean || sheetCourseClean.includes(targetCourseClean))) {
              if (sheetDateStr) {
                const parts = sheetDateStr.includes("/") ? sheetDateStr.split("/") : sheetDateStr.split("-");
                let startDate = sheetDateStr.includes("/") ? new Date(parts[2], parts[1] - 1, parts[0]) : new Date(parts[0], parts[1] - 1, parts[2]);
                const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24));

                if (diffDays > 30) {
                  isValid = false;
                  reason = "Khóa học kích hoạt qua số điện thoại này đã hết thời hạn 30 ngày sử dụng!";
                  break;
                }
              }
              isValid = true;
              break;
            }
          }
        }
        return new Response(JSON.stringify({ success: isValid, msg: isValid ? "Kích hoạt thành công!" : reason }), { headers: { "Content-Type": "application/json" } });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, msg: "Lỗi kết nối máy chủ dữ liệu Google Sheet API!" }), { headers: { "Content-Type": "application/json" } });
      }
    }

    // Định tuyến giao diện phòng thi nâng cấp Chế độ Học tập / Thi thử
    if (path === "/generative-ai") {
      return new Response(this.getQuizEnginePage("GENERATIVE AI"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    if (path === "/ic3-test") {
      return new Response(this.getQuizEnginePage("IC3 GS6"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    // 1. TẢI DỮ LIỆU VÀ CHUẨN HÓA ẢNH BẢNG VÀNG DRIVE TRÁNH LỖI HIỂN THỊ 
    let studentData = "";
    try {
      const exportUrl = CONFIG.SHEET_EDIT_URL.split("/edit")[0] + "/export?format=tsv&gid=0&v=" + Date.now();
      const resp = await fetch(exportUrl);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";

      rows.forEach(row => {
        const link = row.split("\t")[3]?.replace(/\r/g, "").trim(); // Giả định link ảnh cột 4 hoặc sửa theo chỉ mục chính xác của bạn
        if (link && link.startsWith("http")) {
          let finalLink = link;
          if (link.includes("drive.google.com")) {
            const imgId = link.match(/[-\w]{25,}/);
            if (imgId) {
              finalLink = `https://drive.google.com/uc?export=view&id=${imgId[0]}`;
            }
          }
          // Bổ sung onerror handler để loại bỏ ảnh hỏng tự động
          htmlContent += `<div class="student-item"><img src="${finalLink}" onerror="this.src='https://www.w3schools.com/howto/img_avatar.png';this.onerror=null;" loading="lazy"></div>`;
        }
      });

      studentData = htmlContent ? htmlContent + htmlContent + htmlContent : "<div style='color:#64748b; padding:20px;'>Hệ thống đang cập nhật danh sách...</div>";
    } catch (e) {
      studentData = "<div style='color:#64748b; padding:20px;'>Đang kết nối Bảng Vàng dữ liệu...</div>";
    }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/login") content = this.getLoginUI();
    else if (path === "/library") content = this.getLibraryUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  // Giao diện phòng thi cải tiến Chế độ Luyện tập Trực tiếp
  getQuizEnginePage(courseType) {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Phòng Luyện Thi - ${courseType}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
      <style>
        :root { --primary: #FF5722; --bg: #0b0d19; --card: #15182c; --success: #4CAF50; --error: #F44336; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: #fff; padding: 20px; margin: 0; }
        .quiz-container { max-width: 800px; margin: 0 auto; background: var(--card); border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .mode-selector { display: flex; gap: 15px; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
        .mode-btn { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); color: #fff; font-weight: bold; cursor: pointer; }
        .mode-btn.active { background: var(--primary); border-color: var(--primary); }
        .question-box { font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; line-height: 1.5; }
        .options-list { display: flex; flex-direction: column; gap: 12px; }
        .option-item { padding: 15px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); cursor: pointer; font-weight: 600; transition: all 0.2s; }
        .option-item:hover { background: rgba(255,255,255,0.08); }
        
        /* Màu trạng thái chế độ ôn tập trực tiếp */
        .option-item.correct { background: rgba(76, 175, 80, 0.2) !important; border-color: var(--success) !important; color: #81C784; }
        .option-item.wrong { background: rgba(244, 67, 54, 0.2) !important; border-color: var(--error) !important; color: #E57373; }
        
        /* 5. Khung giải thích Explanation Box trượt xuống mượt mà */
        .explanation-box { display: none; margin-top: 20px; padding: 15px 20px; background: rgba(0, 242, 255, 0.05); border-left: 4px solid #00f2ff; border-radius: 0 8px 8px 0; animation: slideDown 0.3s ease-out; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .explanation-title { font-weight: 800; color: #00f2ff; margin-bottom: 5px; font-size: 0.95rem; }
        .explanation-text { font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; }
        .nav-actions { display: flex; justify-content: space-between; margin-top: 30px; }
        .btn-nav { padding: 10px 25px; border-radius: 20px; border: none; background: var(--primary); color: white; font-weight: 700; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="quiz-container">
        <h2>Phòng luyện thi: ${courseType}</h2>
        <div class="mode-selector">
          <button class="mode-btn active" id="modeLearn" onclick="setMode('learn')">📖 CHẾ ĐỘ ÔN LUYỆN (Báo đúng/sai ngay)</button>
          <button class="mode-btn" id="modeTest" onclick="setMode('test')">⏱️ CHẾ ĐỘ THI THỬ (Nộp bài xem điểm)</button>
        </div>
        
        <div id="quiz-engine-core">
          <div class="question-box" id="qText">Đang tải câu hỏi ngân hàng dữ liệu...</div>
          <div class="options-list" id="qOptions"></div>
          
          <div class="explanation-box" id="explanationBox">
            <div class="explanation-title">💡 PHÂN TÍCH KIẾN THỨC CỐT LÕI:</div>
            <div class="explanation-text" id="explanationText">Giải thích chi tiết các thuật ngữ liên quan...</div>
          </div>
        </div>
        
        <div class="nav-actions">
          <button class="btn-nav" style="background:#475569" onclick="prevQuestion()">Câu Trước</button>
          <button class="btn-nav" onclick="nextQuestion()">Câu Tiếp Theo</button>
        </div>
      </div>

      <script>
        // Ngân hàng dữ liệu Demo mẫu (Hệ thống thực tế sẽ nạp từ dữ liệu câu hỏi của bạn)
        const sampleQuestions = [
          {
            text: "Trong Generative AI, mô hình học máy LLM viết tắt của cụm từ nào?",
            options: ["Large Learning Machine", "Large Language Model", "Logic Language Model", "Low Language Matrix"],
            correct: 1,
            explain: "LLM nghĩa là Large Language Model (Mô hình ngôn ngữ lớn), được huấn luyện trên khối lượng văn bản khổng lồ để hiểu và tạo lập ngôn ngữ tự nhiên tựa con người."
          },
          {
            text: "Trong tiêu chuẩn IC3 GS6, kỹ năng số nào giúp bảo vệ thông tin nhận dạng cá nhân (PII)?",
            options: ["Sử dụng tường lửa cá nhân", "Bật chế độ ẩn danh trình duyệt", "Quản lý mật khẩu mạnh và cơ chế 2FA", "Xóa lịch sử cookie định kỳ"],
            correct: 2,
            explain: "Quản lý chuỗi xác thực đa yếu tố (2FA) và bảo mật mật khẩu độ phức tạp cao là cốt lõi bảo vệ danh tính cá nhân số PII an toàn nhất."
          }
        ];

        let currentIndex = 0;
        let currentMode = 'learn'; // 'learn' hoặc 'test'
        let hasAnswered = false;

        function setMode(mode) {
          currentMode = mode;
          document.getElementById('modeLearn').classList.toggle('active', mode === 'learn');
          document.getElementById('modeTest').classList.toggle('active', mode === 'test');
          loadQuestion();
        }

        function loadQuestion() {
          hasAnswered = false;
          const q = sampleQuestions[currentIndex];
          document.getElementById('qText').textContent = \`Câu \${currentIndex + 1}: \${q.text}\`;
          
          const optionsDiv = document.getElementById('options-list') || document.getElementById('qOptions');
          optionsDiv.innerHTML = '';
          document.getElementById('explanationBox').style.display = 'none';

          q.options.forEach((opt, idx) => {
            const btn = document.createElement('div');
            btn.className = 'option-item';
            btn.textContent = opt;
            btn.onclick = () => selectOption(idx, btn);
            optionsDiv.appendChild(btn);
          });
        }

        function selectOption(selectedIdx, element) {
          if (hasAnswered && currentMode === 'learn') return;
          const q = sampleQuestions[currentIndex];
          
          if (currentMode === 'learn') {
            hasAnswered = true;
            const items = document.querySelectorAll('.option-item');
            
            // 5. Báo đúng/sai đổi màu nút lập tức
            if (selectedIdx === q.correct) {
              element.classList.add('correct');
            } else {
              element.classList.add('wrong');
              items[q.correct].classList.add('correct'); // Hiển thị luôn đáp án đúng
            }
            
            // 5. Trượt mở Explanation Box
            document.getElementById('explanationText').textContent = q.explain;
            document.getElementById('explanationBox').style.background = "rgba(0, 242, 255, 0.05)";
            document.getElementById('explanationBox').style.display = 'block';
          } else {
            // Chế độ thi thử: chỉ ghi nhận highlight lựa chọn thông thường
            document.querySelectorAll('.option-item').forEach(el => el.style.borderColor = 'rgba(255,255,255,0.08)');
            element.style.borderColor = '#FF5722';
          }
        }

        function nextQuestion() {
          if (currentIndex < sampleQuestions.length - 1) { currentIndex++; loadQuestion(); }
        }
        function prevQuestion() {
          if (currentIndex > 0) { currentIndex--; loadQuestion(); }
        }
        
        window.onload = loadQuestion;
      </script>
    </body>
    </html>`;
  },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
      :root { --primary: #FF5722; --bg: #06070d; --card: #111422; --text: #fff; --border: rgba(255,255,255,0.06); --cyan: #00f2ff; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(6,7,13,0.9); backdrop-filter: blur(12px); z-index: 1000; border-bottom: 1px solid var(--border); }
      .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.3rem; }
      .brand img { height: 36px; margin-right: 10px; }
      nav { display: flex; align-items: center; }
      nav a { color: #94a3b8; text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.85rem; transition: color 0.2s; }
      nav a:hover { color: #fff; }
      .admin-only-btn { display: none; background: rgba(255, 215, 0, 0.1); color: #FFD700 !important; border: 1px solid #FFD700; padding: 6px 12px; border-radius: 6px; font-weight: 800; }
      
      .main-container { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: 360px 1fr; gap: 30px; }
      .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
      
      #bang-vang-container { height: 420px; overflow: hidden; }
      .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.2); border-radius: 16px; }
      .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 45s linear infinite; width: max-content; }
      .student-item { flex: 0 0 auto; width: 280px; height: 100%; display: flex; align-items: center; justify-content: center; }
      .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
      @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

      /* 2. SỬA ICON ZALO THƯƠNG HIỆU ĐỔ BÓNG HIỆN ĐẠI */
      .social-sticky-bar { position: fixed; right: 25px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 9999; }
      .social-sticky-item { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s ease; box-shadow: 0 6px 16px rgba(0,0,0,0.4); text-decoration: none; color: white; }
      .social-sticky-item:hover { transform: scale(1.15) rotate(4deg); box-shadow: 0 8px 20px rgba(0,0,0,0.6); }
      .social-sticky-item svg { width: 28px; height: 28px; fill: white; }
      .s-zalo { background: #0068FF; box-shadow: 0 4px 14px rgba(0,104,255,0.4); }
      .s-fb { background: #1877F2; }
      .s-mess { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%); }
      .s-yt { background: #FF0000; }
      .s-tt { background: #000000; border: 1px solid rgba(255,255,255,0.15); }
      
      .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
      .btn-action { background: linear-gradient(135deg, #FF5722, #ff784e); color: white; border: none; padding: 12px; border-radius: 25px; font-weight: 800; cursor: pointer; text-decoration:none; display:inline-block; text-align:center; transition: transform 0.15s; }
      .btn-sub { padding: 10px; border-radius: 20px; font-weight: 700; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #cbd5e1; cursor: pointer; text-decoration: none; }
      footer { padding: 40px 5%; background: #030408; border-top: 1px solid var(--border); margin-top: 40px; }
      .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 30px; }
      @media (max-width: 768px) {
        header { padding: 12px 4%; flex-direction: column; gap: 10px; }
        nav { width: 100%; justify-content: center; flex-wrap: wrap; gap: 8px; }
        .main-container { grid-template-columns: 1fr; }
        .social-sticky-bar { position: relative; top: 0; transform: none; right: 0; flex-direction: row; justify-content: center; margin: 15px 4%; gap: 15px; }
      }
    </style>
    </head><body>
    <header>
      <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
      <nav>
        <a href="/">TRANG CHỦ</a>
        <a href="/courses">KHÓA HỌC</a>
        <a href="/library">KHO MOS</a>
        <a href="${CONFIG.SHEET_EDIT_URL}" target="_blank" class="admin-only-btn" id="adminPanelBtn">[QUẢN LÝ HỌC VIÊN]</a>
        <a href="/login" id="navLoginLink" style="color:var(--primary)">ĐĂNG NHẬP</a>
      </nav>
    </header>

    <nav style="background: rgba(0,242,255,0.03); padding: 12px 5%; font-size: 0.8rem; border-bottom: 1px solid var(--border); display:flex; gap:15px; overflow-x: auto;">
      <span style="color:#64748b; font-weight:bold;"> 🎯 Lối tắt phòng thi:</span>
      <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold;"> ✨ Luyện thi GENERATIVE AI</a>
      <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold;"> 🌍 Luyện thi IC3 GS6 Tổng hợp</a>
    </nav>

    <div class="social-sticky-bar" id="stickySocialBar">
      <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="social-sticky-item s-zalo" title="Zalo">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 5.865 2 10.635c0 2.871 1.636 5.414 4.195 6.942l-.634 2.373a.5.5 0 00.72.545l2.84-1.635A11.162 11.162 0 0012 19.27c5.523 0 10-3.865 10-8.635S17.523 2 12 2zm3.12 11.16h-3.47v-1.125h2.155V10.91H11.65V9.785h3.41v1.125h-2.155v.125H15.12v1.125z"/>
        </svg>
      </a>
      <a href="${CONFIG.SOCIALS.FACEBOOK}" target="_blank" class="social-sticky-item s-fb" title="Facebook">
        <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
      </a>
      <a href="${CONFIG.SOCIALS.MESSENGER}" target="_blank" class="social-sticky-item s-mess" title="Messenger">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.36 2 2 6.13 2 11.43c0 2.99 1.45 5.63 3.73 7.37.19.15.31.38.31.62l-.07 1.94c-.02.51.52.88.96.63l2.15-1.21c.18-.1.39-.13.59-.08 1.02.28 2.1.43 3.33.43 5.64 0 10-4.13 10-9.43S17.64 2 12 2zm1.02 12.35l-2.42-2.58-4.73 2.58 5.2-5.53 2.47 2.58 4.68-2.58-5.2 5.53z"/></svg>
      </a>
      <a href="${CONFIG.SOCIALS.YOUTUBE}" target="_blank" class="social-sticky-item s-yt" title="Youtube">
        <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
    <main id="mainWebBody">${content}</main>

    <footer>
      <div class="footer-grid">
        <div><h2 style="color:var(--primary)">MOS360.VN</h2><p> 📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p> 📞 Hotline: 0912.888.360</p></div>
        <div><h4> 🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
        <div style="height:160px; border-radius:15px; overflow:hidden;">
          <iframe src="https://maps.google.com/maps?q=Hai%20Phong&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" loading="lazy"></iframe>
        </div>
      </div>
    </footer>

    <script>
      // 4. CHẤP NHẬN ĐĂNG NHẬP MULTI-DEVICE CHO ADMIN QUA TIMESTAMPS/TOKEN KHÔNG BỊ EXPEL ĐĂNG XUẤT NHAU
      function applyAdminSession() {
        var adminToken = localStorage.getItem('mos360_admin_token');
        // Cho phép nhận diện cả session cũ hoặc token đa thiết bị mới
        var isActive = localStorage.getItem('mos360_admin_session') === 'active' || (adminToken && adminToken.length > 10);
        if (isActive) {
          var adminBtn = document.getElementById('adminPanelBtn');
          if(adminBtn) adminBtn.style.display = 'inline-block';
          var logLink = document.getElementById('navLoginLink');
          if (logLink) {
            logLink.textContent = "ĐĂNG XUẤT ADMIN"; logLink.href = "#";
            logLink.onclick = function() {
              localStorage.removeItem('mos360_admin_session');
              localStorage.removeItem('mos360_admin_token');
              alert("Đã đăng xuất tài khoản quản trị hệ thống!"); window.location.href = "/";
            }
          }
        }
      }
      applyAdminSession();
    </script>
    </body></html>`;
  },

  getHomeUI(studentData) {
    return `<div class="hero-banner">
      <div class="hero-content">
        <h1>HỆ THỐNG LUYỆN THI <span>CHỨNG CHỈ QUỐC TẾ</span> CHUYÊN NGHIỆP</h1>
        <p>Học trực quan, luyện đề thực chiến bám sát kho đề thi Certiport thực tế.</p>
        <div style="max-width:240px; margin:0 auto;"><a href="/courses" class="btn-action">XEM KHÓA HỌC NGAY</a></div>
      </div>
    </div>
    <div class="main-container">
      <div class="featured-highlights-box">
        <div class="featured-main-title"> Xóa tan nỗi lo <span>CHUẨN ĐẦU RA</span> </div>
        <button class="btn-action" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
      </div>
      <div class="right-col">
        <div class="section-card" id="bang-vang-container">
          <h3 style="margin-bottom:15px;"> 🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</h3>
          <div class="carousel-viewport">
            <div class="carousel-track">${studentData}</div>
          </div>
        </div>
      </div>
    </div>`;
  },
  getCoursesUI() { return ``; },
  getLoginUI() { return ``; },
  getLibraryUI() { return ``; }
};
