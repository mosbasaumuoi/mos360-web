const CONFIG = {
  TITLE: "MOS360 - Hệ Thống Luyện Thi Chuyên Nghiệp",
  STUDENT_PASS: "hocvien360",
  SINGLE_PRICE: 400, // 400k
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const key = path.split("/")[1];
    const cookie = request.headers.get("Cookie") || "";
    const isStudent = cookie.includes("auth=student");

    // GĐ 1: Điều hướng link KV (Tài liệu/Tiện ích)
    if (key && !["", "courses", "library", "login", "api"].includes(key)) {
      const link = await env.Links_mos360.get(key);
      if (link) return Response.redirect(link, 301);
    }

    // Router điều hướng trang
    if (path === "/courses") return this.renderCourses();
    if (path === "/library") return this.renderLibrary(env);
    if (path === "/login") return this.renderLogin();

    // Mặc định trả về Trang Chủ
    return this.renderHome(isStudent);
  },

  // --- 1. TRANG CHỦ: VÒNG QUAY & GIÁ TRỊ CỐT LÕI ---
  renderHome(isStudent) {
    return this.layout(`
      <section class="hero-section">
        <div class="stats-bar">
          <div class="stat"><h2>100%</h2><p>Đỗ Lần Đầu</p></div>
          <div class="stat"><h2>1000+</h2><p>Học Viên</p></div>
          <div class="stat"><h2>600+</h2><p>Truy Cập/Ngày</p></div>
        </div>
        
        <div class="main-grid">
          <div class="promo-box">
             <h3 style="color:var(--primary)">🎡 Vòng Quay & Ưu Đãi</h3>
             <div class="wheel-mini"></div>
             <div class="promo-info">
                <p>🎁 <b>Khuyến Mại:</b> Đăng ký Combo 3 môn chỉ tính tiền 2 môn (Tiết kiệm 400k)!</p>
                <button class="btn-main" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
             </div>
          </div>
          
          <div class="values-grid">
             <div class="v-card"><h4>🎯 Thực Chiến</h4><p>Học trên phần mềm mô phỏng 100%.</p></div>
             <div class="v-card"><h4>🤝 Đồng Hành</h4><p>Hỗ trợ đồ án, luận văn trọn đời.</p></div>
             <div class="v-card"><h4>💎 Uy Tín</h4><p>Chứng chỉ quốc tế giá trị vĩnh viễn.</p></div>
          </div>
        </div>
      </section>
    `, isStudent);
  },

  // --- 2. TRANG KHÓA HỌC: LOGIC CỘNG TIỀN (CHỐT 400K) ---
  renderCourses() {
    return this.layout(`
      <div class="course-container">
        <h2>Danh Sách Khóa Học MOS</h2>
        <p>Chọn môn học để tự động tính tổng học phí (Ưu đãi: Mua 3 tính 2)</p>

        <div class="group-box">
          <h3>📦 Nhóm MOS 2019</h3>
          <label><input type="checkbox" class="course-cb" data-price="400" onchange="calc()"> Word 2019 - 400k</label><br>
          <label><input type="checkbox" class="course-cb" data-price="400" onchange="calc()"> Excel 2019 - 400k</label><br>
          <label><input type="checkbox" class="course-cb" data-price="400" onchange="calc()"> PowerPoint 2019 - 400k</label>
        </div>

        <div class="group-box">
          <h3>📦 Nhóm MOS 365</h3>
          <label><input type="checkbox" class="course-cb" data-price="400" onchange="calc()"> Word 365 - 400k</label><br>
          <label><input type="checkbox" class="course-cb" data-price="400" onchange="calc()"> Excel 365 - 400k</label><br>
          <label><input type="checkbox" class="course-cb" data-price="400" onchange="calc()"> PowerPoint 365 - 400k</label>
        </div>

        <div class="sticky-calc">
           <div class="total-text">Tổng tiền: <span id="total-price">0</span>k</div>
           <button class="btn-main" onclick="alert('Đang chuyển hướng Form Đăng ký...')">ĐĂNG KÝ NGAY</button>
        </div>
      </div>
      <script>
        function calc() {
          let cbs = document.querySelectorAll('.course-cb:checked');
          let count = cbs.length;
          let total = 0;
          if (count === 3) { total = 800; } // Mua 3 tính 2
          else if (count === 6) { total = 1600; }
          else { total = count * 400; }
          document.getElementById('total-price').innerText = total;
        }
      </script>
    `);
  },

  // --- 3. TRANG THƯ VIỆN: AI & TÌM KIẾM TÀI LIỆU ---
  renderLibrary() {
    return this.layout(`
      <div class="library-container">
        <div class="ai-box">
           <h3>AI Assistant ✨</h3>
           <div class="chat-area">Chào bạn, tôi là AI MOS360. Bạn cần giúp gì về hàm Excel?</div>
           <input type="text" placeholder="Nhập câu hỏi...">
        </div>
        <div class="search-box">
           <h3>Tìm Kiếm Tài Liệu</h3>
           <input type="text" id="searchDocs" placeholder="Nhập tên tài liệu (ví dụ: G-metrix, Excel...)" onkeyup="search()">
           <div id="results"></div>
        </div>
      </div>
    `);
  },

  // --- LAYOUT CHUNG (FOOTER, HEADER, CSS) ---
  layout(content, isStudent = false) {
    return new Response(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${CONFIG.TITLE}</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); }
          body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); margin:0; }
          nav { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: #000; border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:100; }
          .nav-links a { color: #888; text-decoration: none; margin-left: 20px; font-weight: 600; }
          .nav-links a:hover { color: var(--primary); }
          
          .stats-bar { display: flex; justify-content: space-around; padding: 40px; background: var(--card); margin: 20px 5%; border-radius: 24px; }
          .stat h2 { color: var(--primary); font-size: 2.5rem; margin:0; }
          
          .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; padding: 0 5%; }
          .promo-box, .v-card, .group-box { background: var(--card); padding: 30px; border-radius: 20px; border: 1px solid var(--border); margin-bottom: 20px; }
          
          .btn-main { background: var(--primary); color: #fff; border: none; padding: 12px 30px; border-radius: 10px; font-weight: 800; cursor: pointer; }
          
          .sticky-calc { position: fixed; bottom: 20px; right: 20px; background: var(--primary); padding: 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(255,87,34,0.3); }
          .total-text { font-size: 1.5rem; font-weight: 800; margin-bottom: 10px; }
          
          footer { padding: 60px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 100px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
          .wheel-mini { width: 150px; height: 150px; margin: 0 auto; background: conic-gradient(red, yellow, blue, green); border-radius: 50%; animation: rotate 5s infinite linear; }
          @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <nav>
          <a href="/"><img src="${CONFIG.LOGO_URL}" height="40"></a>
          <div class="nav-links">
            <a href="/">Trang Chủ</a>
            <a href="/courses">Khóa Học</a>
            <a href="/library">Tài Liệu</a>
            ${isStudent ? '<a href="/student">Học Viên</a>' : '<a href="/login" style="color:var(--primary)">Đăng Nhập</a>'}
          </div>
        </nav>
        <main>${content}</main>
        <footer>
          <div><h3>MOS360.VN</h3><p>Đồng hành thực chiến trọn đời.</p></div>
          <div><h4>Liên kết</h4><p>Facebook</p><p>Zalo</p></div>
          <div><h4>Địa chỉ</h4><p>An Biên, Hải Phòng</p></div>
        </footer>
      </body>
      </html>
    `, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
