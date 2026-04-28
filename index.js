const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  STUDENT_PASS: "hocvien360",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cookie = request.headers.get("Cookie") || "";
    const isStudent = cookie.includes("auth=student");

    // 1. LẤY DỮ LIỆU BẢNG VÀNG (Giữ nguyên)
    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          studentItems += `<div class="student-item"><img src="${link}" loading="lazy"></div>`;
        }
      });
      studentItems += studentItems; 
    } catch (e) { studentItems = "<div>Đang kết nối Bảng Vàng...</div>"; }

    // 2. ROUTING ĐA TRANG
    let bodyContent = "";
    if (path === "/courses") {
      bodyContent = this.getCoursesUI();
    } else if (path === "/library") {
      bodyContent = this.getLibraryUI();
    } else {
      bodyContent = this.getHomeUI(studentItems);
    }

    return new Response(this.layout(bodyContent, isStudent), {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  },

  // --- TRANG CHỦ: GIỮ NGUYÊN 3 GIÁ TRỊ CỐT LÕI & BẢNG VÀNG ---
  getHomeUI(studentData) {
    return `
      <div class="stats-bar">
        <div class="stat"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="stat"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="stat"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>
      <div class="main-grid">
        <aside>
          <div class="section-card">
            <h3 style="color:var(--primary)">🎡 Quay Thưởng & Ưu Đãi</h3>
            <div class="wheel-mini"></div>
            <p style="margin-top:15px; font-size:0.9rem;">🎁 <b>KHUYẾN MẠI:</b> Đăng ký 3 môn tính tiền 2 môn (Chỉ 800k). Quay để nhận thêm voucher!</p>
            <button class="btn-primary" onclick="location.href='/courses'" style="margin-top:15px; width:100%;">XEM KHÓA HỌC</button>
          </div>
          <div class="section-card" style="margin-top:20px; border-left:4px solid var(--cyan);">
            <h4>Đăng ký Học Offline</h4>
            <p style="font-size:0.8rem; color:#888;">Lớp kèm trực tiếp tại trung tâm Hải Phòng.</p>
            <button class="btn-primary" style="background:#222; margin-top:10px; width:100%;" onclick="alert('Đang mở Form Offline...')">ĐĂNG KÝ NGAY</button>
          </div>
        </aside>
        <section class="section-card">
          <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
          <div class="carousel-container"><div class="track">${studentData}</div></div>
        </section>
      </div>
      <div class="values-grid">
        <div class="value-card"><h3>Thi Thật 100%</h3><p>Thực hành trên hệ thống mô phỏng sát 100% đề thi quốc tế Certiport.</p></div>
        <div class="value-card" style="border-color:var(--cyan)"><h3>Trợ lý AI 24/7</h3><p>Giải đáp kiến thức tin học và các hàm Excel nhanh chóng qua khung Chat AI.</p></div>
        <div class="value-card"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ kỹ năng định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học.</p></div>
      </div>`;
  },

  // --- TRANG KHÓA HỌC: CHỐT ĐỒNG GIÁ 400K, MUA 3 TÍNH 2 ---
  getCoursesUI() {
    return `
      <div class="courses-section">
        <h2 style="text-align:center; margin-bottom:40px;">Danh Sách Khóa Học (Đồng giá 400k)</h2>
        <div class="groups-wrapper" style="display:flex; justify-content:center; gap:30px;">
          <div class="course-group">
            <h3>📦 Nhóm MOS 2019</h3>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Word 2019</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Excel 2019</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS PowerPoint 2019</label>
          </div>
          <div class="course-group">
            <h3>📦 Nhóm MOS 365</h3>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Word 365</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Excel 365</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS PowerPoint 365</label>
          </div>
        </div>
        <div class="total-bar" style="text-align:center; margin-top:40px;">
          <div style="font-size:1.8rem; font-weight:800; color:var(--primary);">Tổng: <span id="total-val">0</span>.000 VNĐ</div>
          <p id="promo-msg" style="color:var(--cyan); height:20px;"></p>
          <button class="btn-primary" style="padding:15px 50px; margin-top:10px;">ĐĂNG KÝ HỌC</button>
        </div>
      </div>
      <script>
        function updateTotal() {
          let n = document.querySelectorAll('.cb-course:checked').length;
          let price = (n >= 3) ? (Math.floor(n/3)*800 + (n%3)*400) : (n*400);
          document.getElementById('total-val').innerText = price;
          document.getElementById('promo-msg').innerText = (n >= 3) ? "🔥 Đã áp dụng: Mua 3 tính tiền 2!" : "";
        }
      </script>`;
  },

  getLibraryUI() {
    return `<div class="section-card"><h3>Thư viện tài liệu & AI Assistant</h3><p>Nội dung đang được đồng bộ từ KV...</p></div>`;
  },

  // --- LAYOUT CHUNG: BẢO TỒN 100% CÁC NÚT LIÊN KẾT, MAP, FOOTER ---
  layout(content, isStudent) {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${CONFIG.TITLE}</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); }
            header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(8,8,8,0.95); position: sticky; top:0; z-index:1000; border-bottom: 1px solid var(--border); }
            .nav-links a { color: #888; text-decoration: none; margin-left: 20px; font-weight: 600; }
            .nav-links a:hover { color: var(--primary); }

            /* SOCIAL SIDEBAR (GIỮ NGUYÊN) */
            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
            .social-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
            .social-item:hover { background: var(--primary); }
            .social-item img { width: 22px; }

            .main-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; max-width: 1400px; margin: 30px auto; padding: 0 40px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 30px; padding: 30px; }
            .stats-bar { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1400px; margin: 30px auto; padding: 0 40px; text-align: center; }
            .stat h2 { color: var(--primary); font-size: 2.2rem; }
            .wheel-mini { width: 180px; height: 180px; margin: 0 auto; border-radius: 50%; border: 5px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 10s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            
            .carousel-container { overflow: hidden; margin-top: 15px; }
            .track { display: flex; gap: 20px; animation: scroll 40s linear infinite; }
            .student-item img { height: 300px; border-radius: 15px; border: 1px solid var(--border); }
            @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

            .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1400px; margin: 50px auto; padding: 0 40px; }
            .value-card { background: var(--card); padding: 30px; border-radius: 25px; border-left: 4px solid var(--primary); }
            .course-group { background: var(--card); padding: 30px; border-radius: 25px; width: 400px; border-top: 4px solid var(--primary); }
            .course-group label { display: block; padding: 12px; border-bottom: 1px solid #222; cursor: pointer; }
            .btn-primary { background: var(--primary); color: white; border: none; padding: 12px 25px; border-radius: 50px; font-weight: 800; cursor: pointer; }

            footer { padding: 60px 40px; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
            .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px; }
            .map-box { border-radius: 20px; overflow: hidden; height: 180px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); }
        </style>
    </head>
    <body>
        <header>
            <a href="/"><img src="${CONFIG.LOGO_URL}" height="40"></a>
            <div class="nav-links">
                <a href="/">Trang Chủ</a>
                <a href="/courses">Khóa Học</a>
                <a href="/library">Tài Liệu</a>
                <a href="https://mos360.vn" style="background:var(--primary); color:white; padding:8px 20px; border-radius:10px;">Học Viên</a>
            </div>
        </header>

        <div class="side-social">
            <a href="https://zalo.me/0912888360" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
            <a href="https://www.facebook.com/MOS360.EDU" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
            <a href="https://m.me/MOS360.EDU" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
            <a href="https://www.youtube.com/@mos360_vn" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
            <a href="https://www.tiktok.com/@mos360.vn" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
        </div>

        <main>${content}</main>

        <footer>
            <div class="footer-grid">
                <div>
                    <h2 style="color:var(--primary); margin-bottom:10px;">MOS360.VN</h2>
                    <p><b>Hotline:</b> 0912.888.360</p>
                    <p><b>Địa chỉ:</b> 57 Lê Văn Thuyết A, An Biên, Lê Chân, Hải Phòng</p>
                </div>
                <div><p><b>Hỗ trợ:</b> Trực tuyến 24/7</p><p><b>Chứng chỉ:</b> Microsoft Quốc tế</p></div>
                <div class="map-box">
                    <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style="border:0;" loading="lazy"></iframe>
                </div>
            </div>
        </footer>
    </body>
    </html>`;
  }
};
