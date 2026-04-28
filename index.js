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

    // Lấy dữ liệu Bảng Vàng từ Sheets
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
      studentItems += studentItems; // Tạo vòng lặp scroll
    } catch (e) { studentItems = "<div>Đang kết nối Bảng Vàng...</div>"; }

    // Router đa trang
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

  // --- TRANG CHỦ: VÒNG QUAY CHI TIẾT & BẢNG VÀNG SẠCH SẼ ---
  getHomeUI(studentData) {
    return `
      <div class="stats-bar">
        <div class="stat"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="stat"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="stat"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>
      <div class="main-grid">
        <aside>
          <div class="section-card wheel-promo">
            <h3 style="color:var(--primary); margin-bottom:15px;">🎡 Quay Thưởng & Ưu Đãi</h3>
            <div class="wheel-box">
              <div class="wheel-pointer"></div>
              <div class="wheel-circle">
                <div class="wheel-labels">
                  <div class="l1"><b>GIẢM 50k</b></div>
                  <div class="l2"><b>GIẢM 50%</b></div>
                  <div class="l3"><b>GIẢM 100k</b></div>
                  <div class="l4"><b>GIẢM 80%</b></div>
                </div>
              </div>
              <div class="wheel-center">QUAY</div>
            </div>
            <p style="font-size:0.85rem; color:#888;">🎁 Đăng ký 3 môn tính tiền 2 môn. Quay ngay để nhận voucher!</p>
            <button class="btn-primary" onclick="location.href='/courses'" style="margin-top:15px; width:100%;">XEM KHÓA HỌC</button>
          </div>
          <div class="section-card" style="margin-top:20px; border-left:4px solid var(--cyan);">
            <h4>Học Offline Hải Phòng</h4>
            <button class="btn-primary" style="background:#222; margin-top:10px; width:100%;" onclick="alert('Form Đăng ký Offline')">ĐĂNG KÝ NGAY</button>
          </div>
        </aside>
        <section class="section-card">
          <h3 style="margin-bottom:20px;">🏆 Bảng Vàng Chứng Chỉ</h3>
          <div class="carousel-container"><div class="track">${studentData}</div></div>
        </section>
      </div>
      <div class="values-grid">
        <div class="value-card"><h3>Thi Thật 100%</h3><p>Mô phỏng sát 100% đề thi quốc tế Certiport.</p></div>
        <div class="value-card" style="border-color:var(--cyan)"><h3>Trợ lý AI 24/7</h3><p>Giải đáp kiến thức tin học nhanh chóng qua khung Chat AI.</p></div>
        <div class="value-card"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học.</p></div>
      </div>`;
  },

  getCoursesUI() {
    return `<div class="courses-section">
      <h2 style="text-align:center; margin-bottom:30px;">Hệ Thống Khóa Học (Đồng giá 400k)</h2>
      <div class="course-flex" style="display:flex; justify-content:center; gap:20px;">
        <div class="course-group"><h3>MOS 2019</h3><label><input type="checkbox" class="cb-c" onchange="calc()"> Word 2019</label><label><input type="checkbox" class="cb-c" onchange="calc()"> Excel 2019</label><label><input type="checkbox" class="cb-c" onchange="calc()"> PowerPoint 2019</label></div>
        <div class="course-group"><h3>MOS 365</h3><label><input type="checkbox" class="cb-c" onchange="calc()"> Word 365</label><label><input type="checkbox" class="cb-c" onchange="calc()"> Excel 365</label><label><input type="checkbox" class="cb-c" onchange="calc()"> PowerPoint 365</label></div>
      </div>
      <div class="total-bar" style="text-align:center; margin-top:30px;"><p style="font-size:1.8rem; color:var(--primary); font-weight:800;">Tổng: <span id="total-v">0</span>.000 VNĐ</p><button class="btn-primary" style="margin-top:10px;">ĐĂNG KÝ HỌC</button></div>
    </div><script>function calc(){let n=document.querySelectorAll('.cb-c:checked').length; document.getElementById('total-v').innerText=(n>=3)?(Math.floor(n/3)*800+(n%3)*400):(n*400);}</script>`;
  },

  getLibraryUI() {
    return `<div class="section-card"><h3>Thư viện tài liệu</h3><p>Nội dung đang được đồng bộ...</p></div>`;
  },

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
            .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
            .brand img { height: 35px; }
            .brand span { font-weight: 800; color: var(--primary); font-size: 1.2rem; }
            .nav-links a { color: #888; text-decoration: none; margin-left: 20px; font-weight: 600; }
            .nav-links a:hover { color: var(--primary); }

            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
            .social-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            .social-item img { width: 22px; }

            .main-grid { display: grid; grid-template-columns: 360px 1fr; gap: 30px; max-width: 1400px; margin: 30px auto; padding: 0 40px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 30px; padding: 30px; }
            
            /* CSS VÒNG QUAY CHI TIẾT */
            .wheel-box { position: relative; width: 200px; height: 200px; margin: 0 auto; }
            .wheel-pointer { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 18px solid var(--primary); z-index: 20; }
            .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 10s linear infinite; position: relative; }
            .wheel-labels div { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: flex-start; padding-top: 30px; }
            .wheel-labels b { font-size: 0.7rem; color: #fff; font-weight: 800; text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; }
            .l1 { transform: rotate(45deg); } .l2 { transform: rotate(135deg); } .l3 { transform: rotate(225deg); } .l4 { transform: rotate(315deg); }
            .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #000; font-size: 0.7rem; z-index: 10; border: 4px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.3); }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            
            /* CSS CAROUSEL SỬA LỖI TRÀN CẠNH */
            .carousel-container { overflow: hidden; margin-top: 15px; border-radius: 15px; border: 1px solid var(--border); padding: 15px 0; }
            .track { display: flex; gap: 15px; animation: scroll 40s linear infinite; }
            .student-item img { height: 300px; border-radius: 12px; object-fit: contain; background: #000; }
            @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

            .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1400px; margin: 40px auto; padding: 0 40px; }
            .value-card { background: var(--card); padding: 25px; border-radius: 20px; border-left: 4px solid var(--primary); }
            
            .course-group label { display: block; padding: 10px; border-bottom: 1px solid #222; }
            .btn-primary { background: var(--primary); color: white; border: none; padding: 12px 25px; border-radius: 50px; font-weight: 800; cursor: pointer; }

            /* CSS BẢN ĐỒ TƯƠNG TÁC HOVER SÁNG */
            footer { padding: 60px 40px; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
            .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 30px; }
            .map-box { border-radius: 20px; overflow: hidden; height: 160px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9) opacity(0.7); transition: 0.5s; }
            .map-box:hover { filter: grayscale(0) invert(0) opacity(1); box-shadow: 0 0 15px rgba(255,255,255,0.2); }
            
            /* CSS FIX LOGIC TIKTOK QUÁ TỐI */
            .tiktok-icon img { filter: brightness(0) invert(1); }
        </style>
    </head>
    <body>
        <header>
            <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}" height="35"> <span>MOS360</span></a>
            <div class="nav-links">
                <a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a><a href="https://mos360.vn" style="background:var(--primary); color:white; padding:8px 18px; border-radius:10px;">Học Viên</a>
            </div>
        </header>

        <div class="side-social">
            <a href="https://zalo.me/0912888360" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
            <a href="https://www.facebook.com/MOS360.EDU" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
            <a href="https://www.youtube.com/@mos360_vn" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
            <a href="https://www.tiktok.com/@mos360.vn" class="social-item tiktok-icon"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
        </div>

        <main>${content}</main>

        <footer>
            <div class="footer-grid">
                <div><h2 style="color:var(--primary); margin-bottom:10px;">MOS360.VN</h2><p><b>Hotline:</b> 0912.888.360</p></div>
                <div><p><b>Địa chỉ:</b> 57 Lê Văn Thuyết A, Lê Chân, Hải Phòng</p></div>
                <div class="map-box">
                    <iframe src="https://www.google.com/maps/embed?pb=?..." width="100%" height="100%" style="border:0;" loading="lazy"></iframe>
                </div>
            </div>
        </footer>
    </body>
    </html>`;
  }
};
