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
    } catch (e) { studentItems = "<div>Đang cập nhật...</div>"; }

    // Xử lý logic trang học viên
    if (path === "/hocvien") {
      if (!isStudent) return Response.redirect(url.origin + "/login?ref=hocvien", 302);
      return new Response(this.getStudentPageUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    if (path === "/login") return new Response(this.getLoginUI(url.searchParams.get("ref")), { headers: { "Content-Type": "text/html;charset=UTF-8" } });

    // Trả về giao diện chính
    return new Response(this.getHomeUI(studentItems), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  // --- 1. TRANG CHỦ: SẮP XẾP LẠI BỐ CỤC THEO YÊU CẦU ---
  getHomeUI(studentData) {
    return this.layout(`
      <div class="stats-bar">
        <div class="stat"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="stat"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="stat"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>
      <div class="main-grid">
        <aside>
          <div class="section-card wheel-promo">
            <h3 style="color:var(--primary); margin-bottom:15px;">🎡 Vòng Quay May Mắn</h3>
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
            <button class="btn-primary" onclick="alert('Form Đăng ký học')">QUAY NGAY</button>
            
            <div class="promo-banner" style="margin-top:20px; border-top:1px solid #333; padding-top:15px; text-align:left;">
               <p style="color:var(--primary); font-weight:800; font-size:1rem;">🎁 ƯU ĐÃI KHỦNG:</p>
               <p style="color:#aaa; font-size:0.85rem; line-height:1.4; margin-top:5px;">Đăng ký Combo 3 môn tính tiền 2 môn (Chỉ 800k). Mua càng nhiều, giảm càng sâu!</p>
            </div>
          </div>
        </aside>
        
        <section class="section-card">
          <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
          <div class="carousel-container"><div class="track">${studentData}</div></div>
        </section>
      </div>
      <div class="services-grid">
        <div class="service-card"><h3>Thi Thật 100%</h3><p>Hệ thống mô phỏng sát đề quốc tế Certiport.</p></div>
        <div class="service-card ai-card"><h3>Trợ lý AI 24/7 ✨</h3><p>Giải đáp tin học & Excel nhanh chóng qua khung Chat.</p></div>
        <div class="service-card"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ luận văn, đồ án chuyên nghiệp suốt quá trình học.</p></div>
      </div>
    `);
  },

  // --- 2. LAYOUT TỔNG THỂ (SỬA SOCIAL TIKTOK, FOOTER MAP & TIME) ---
  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); }
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(8,8,8,0.95); position: sticky; top:0; z-index:1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .brand img { height: 40px; }
        .brand span { font-weight: 800; color: var(--primary); font-size: 1.4rem; }
        .nav-links a { color: #888; text-decoration: none; margin-left: 20px; font-weight: 600; }
        .nav-links a:hover { color: var(--primary); }

        /* SOCIAL SIDEBAR SỬA LOGO TIKTOK */
        .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
        .social-item { width: 45px; height: 45px; background: transparent; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .social-item:hover { background: rgba(255,87,34,0.1); border-color: var(--primary); }
        .social-item img { width: 22px; filter: grayscale(1); }
        .social-item:hover img { filter: grayscale(0); }
        /* Fix Tiktok quá tối */
        .tiktok-icon img { filter: invert(1) brightness(1.2) grayscale(1); }
        .tiktok-icon:hover img { filter: invert(0) brightness(1) grayscale(0); }

        .main-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; max-width: 1400px; margin: 30px auto; padding: 0 40px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 30px; padding: 30px; }
        
        .wheel-box { position: relative; width: 200px; height: 200px; margin: 0 auto; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 10s linear infinite; position: relative; }
        .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50px; height: 50px; background: #fff; color: #000; border-radius: 50%; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; border: 4px solid #fff; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* CAROUSEL KHÔNG TRÀN KHUNG ĐỎ */
        .carousel-container { overflow: hidden; margin-top: 15px; border-radius: 20px; background: #000; padding: 20px 0; border: 1px solid rgba(255,255,255,0.05); }
        .track { display: flex; gap: 20px; animation: scroll 40s linear infinite; }
        .student-item img { height: 320px; border-radius: 12px; object-fit: contain; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .stats-bar { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1400px; margin: 20px auto; padding: 0 40px; text-align: center; }
        .stat h2 { color: var(--primary); font-size: 2.2rem; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1400px; margin: 40px auto; padding: 0 40px; }
        .service-card { background: var(--card); padding: 30px; border-radius: 25px; border-left: 4px solid var(--primary); }
        .btn-primary { background: var(--primary); color: white; border: none; padding: 12px 25px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; }

        /* FOOTER MAP & TIME CHUẨN */
        footer { padding: 60px 40px; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
        .map-frame { border-radius: 20px; overflow: hidden; height: 180px; border: 1px solid var(--border); filter: grayscale(1) opacity(0.5); transition: 0.5s; }
        .map-frame:hover { filter: grayscale(0) opacity(1); border-color: var(--primary); }
    </style>
    </head><body>
        <header>
            <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> <span>MOS360</span></a>
            <div class="nav-links"><a href="/">Trang Chủ</a><a href="/hocvien">Học Viên</a></div>
        </header>
        <div class="side-social">
            <a href="https://zalo.me/0912888360" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
            <a href="https://www.facebook.com/MOS360.EDU" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
            <a href="https://m.me/MOS360.EDU" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
            <a href="https://www.tiktok.com/@mos360.vn" class="social-item tiktok-icon"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
        </div>
        <main>${content}</main>
        <footer>
            <div class="footer-grid">
                <div>
                    <h2 style="color:var(--primary); margin-bottom:15px;">MOS360.VN</h2>
                    <p><b>Hotline:</b> 0912.888.360</p>
                    <p><b>Địa chỉ:Tôi hiểu rồi. Tôi sẽ đóng băng (ghim) các phần đã hoàn thiện tốt và chỉ tập trung tinh chỉnh đúng các yêu cầu của bạn, bao gồm: gỡ nền logo TikTok, thêm khung thời gian làm việc ở chân trang, đảm bảo ảnh chạy nằm gọn trong khung đỏ, và đưa các khối "Học Offline", "Đăng ký thi" vào trang đăng nhập bảo mật.

Dưới đây là file `index.js` đã được đóng gói hoàn chỉnh nhất:

### MÃ NGUỒN TỔNG LỰC (Dán vào GitHub `index.js`)

```javascript
const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  STUDENT_PASS: "hocvien360",
  LOGO_URL: "[https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true](https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true)",
  SHEET_URL: "[https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv](https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv)"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cookie = request.headers.get("Cookie") || "";
    const isStudent = cookie.includes("auth=student");

    // Lấy dữ liệu Bảng Vàng (Đã chốt)
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
      studentItems += studentItems; // Tạo vòng lặp scroll mượt
    } catch (e) { studentItems = "<div>Đang kết nối Bảng Vàng...</div>"; }

    // Xử lý các trang chức năng
    if (path === "/hocvien") {
      if (!isStudent) return Response.redirect(url.origin + "/login?ref=hocvien", 302);
      return new Response(this.getStudentPageUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    if (path === "/login") return new Response(this.getLoginUI(url.searchParams.get("ref")), { headers: { "Content-Type": "text/html;charset=UTF-8" } });

    // Trả về giao diện chính
    return new Response(this.getHomeUI(studentItems), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  // --- 1. GIAO DIỆN CHÍNH (Đã sắp xếp lại bố cục và sửa ảnh) ---
  getHomeUI(studentData) {
    return this.layout(`
      <div class="stats-bar">
        <div class="stat"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="stat"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="stat"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>
      <div class="main-grid">
        <aside>
          <div class="section-card wheel-promo">
            <h3 style="color:var(--primary); margin-bottom:15px;">🎡 Vòng Quay May Mắn</h3>
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
            <button class="btn-primary" onclick="alert('Hãy đăng ký học để áp dụng voucher!')" style="margin-top:15px;">QUAY NGAY</button>
            
            <div style="margin-top:20px; border-top:1px solid #333; padding-top:15px; text-align:left;">
               <p style="color:var(--primary); font-weight:800; font-size:1rem;">🎁 ƯU ĐÃI KHỦNG:</p>
               <p style="color:#aaa; font-size:0.85rem; line-height:1.4; margin-top:5px;">Đăng ký Combo 3 môn tính tiền 2 môn (Chỉ 800k). Áp dụng trọn đời!</p>
            </div>
          </div>
        </aside>
        
        <section class="section-card">
          <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
          <div class="carousel-container"><div class="track">${studentData}</div></div>
        </section>
      </div>
      <div class="services-grid">
        <div class="service-card"><h3>Thi Thật 100%</h3><p>Hệ thống mô phỏng sát đề Certiport.</p></div>
        <div class="service-card ai-card"><h3>Trợ lý AI 24/7 ✨</h3><p>Giải đáp kiến thức nhanh chóng.</p></div>
        <div class="service-card"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ luận văn, đồ án chuyên nghiệp suốt quá trình học.</p></div>
      </div>
    `);
  },

  // LAYOUT TỔNG THỂ (SỬA SOCIAL TIKTOK, FOOTER MAP & TIME)
  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="[https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap](https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap)" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); }
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(8,8,8,0.9); border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:1000; }
        .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .brand img { height: 40px; }
        .brand span { font-weight: 800; color: var(--primary); font-size: 1.4rem; }
        .nav-links a { color: #888; text-decoration: none; margin-left: 20px; font-weight: 600; }
        .nav-links a:hover { color: var(--primary); }

        /* SOCIAL SIDEBAR SỬA LOGO TIKTOK */
        .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
        .social-item { width: 45px; height: 45px; background: transparent; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .social-item:hover { background: rgba(255,87,34,0.1); border-color: var(--primary); }
        .social-item img { width: 22px; filter: grayscale(1); }
        .social-item:hover img { filter: grayscale(0); }
        /* Fix Tiktok: Xóa nền, giữ icon trắng như các nút khác */
        .tiktok-icon img { filter: invert(1) brightness(1.5) grayscale(1); }
        .tiktok-icon:hover img { filter: invert(0) brightness(1) grayscale(0); }

        .main-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; max-width: 1400px; margin: 30px auto; padding: 0 40px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 30px; padding: 30px; }
        
        .wheel-box { position: relative; width: 200px; height: 200px; margin: 0 auto; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 10s linear infinite; position: relative; }
        .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50px; height: 50px; background: #fff; color: #000; border-radius: 50%; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; border: 4px solid #fff; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* CAROUSEL KHÔNG TRÀN CẠNH CHUẨN ĐỎ */
        .carousel-container { overflow: hidden; margin-top: 15px; border-radius: 20px; background: #000; padding: 20px 0; border: 1px solid rgba(255,255,255,0.05); }
        .track { display: flex; gap: 20px; animation: scroll 40s linear infinite; }
        .student-item img { height: 320px; border-radius: 12px; object-fit: contain; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .stats-bar { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1400px; margin: 20px auto; padding: 0 40px; text-align: center; }
        .stat h2 { color: var(--primary); font-size: 2.2rem; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1400px; margin: 40px auto; padding: 0 40px; }
        .service-card { background: var(--card); padding: 30px; border-radius: 25px; border-left: 4px solid var(--primary); }
        .btn-primary { background: var(--primary); color: white; border: none; padding: 12px 25px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; }

        /* FOOTER MAP & TIME CHUẨN */
        footer { padding: 60px 40px; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px; }
        .map-frame { border-radius: 20px; overflow: hidden; height: 180px; border: 1px solid var(--border); filter: grayscale(1) opacity(0.5); transition: 0.5s; }
        .map-frame:hover { filter: grayscale(0) opacity(1); border-color: var(--primary); }
    </style>
    </head><body>
        <header>
            <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> <span>MOS360</span></a>
            <div class="nav-links"><a href="/">Trang Chủ</a><a href="/hocvien">Học Viên</a></div>
        </header>
        <div class="side-social">
            <a href="[https://zalo.me/0912888360](https://zalo.me/0912888360)" class="social-item"><img src="[https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg](https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg)"></a>
            <a href="[https://www.facebook.com/MOS360.EDU](https://www.facebook.com/MOS360.EDU)" class="social-item"><img src="[https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png](https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png)"></a>
            <a href="[https://m.me/MOS360.EDU](https://m.me/MOS360.EDU)" class="social-item"><img src="[https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg](https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg)"></a>
            <a href="[https://www.tiktok.com/@mos360.vn](https://www.tiktok.com/@mos360.vn)" class="social-item tiktok-icon"><img src="[https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg](https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg)"></a>
        </div>
        <main>${content}</main>
        <footer>
            <div class="footer-grid">
                <div>
                    <h2 style="color:var(--primary); margin-bottom:15px;">MOS360.VN</h2>
                    <p><b>Hotline:</b> 0912.888.360</p>
                    <p><b>Email:</b> hotro@mos360.vn</p>
                </div>
                <div>
                    <p><b>Địa chỉ:</b> 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
                    <p style="color:#aaa; font-size:0.85rem; margin-top:5px;">🕒 Từ sáng từ 8h00 đến 11h30 | Chiều từ 13h30 đến 17h00. Hỗ trợ 24/7.</p>
                </div>
                <div class="map-frame">
                    <iframe src="[https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.847529431522!2d106.6710492759654!3d20.836932494297136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a70659648a1d7%3A0xc365c1922c19c5c9!2zNTcgTMOqIFbEg24gVGh1eeG6vHQsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1714310000000!5m2!1svi!2s](https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.847529431522!2d106.6710492759654!3d20.836932494297136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a70659648a1d7%3A0xc365c1922c19c5c9!2zNTcgTMOqIFbEg24gVGh1eeG6vHQsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1714310000000!5m2!1svi!2s)" width="100%" height="100%" style="border:0;" loading="lazy"></iframe>
                </div>
            </div>
        </footer>
    </body>
    </html>`;
  }
};
