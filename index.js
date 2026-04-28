const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          studentItems += `<div class="st-card"><img src="${link}" loading="lazy"></div>`;
        }
      });
      studentItems += studentItems; 
    } catch (e) { studentItems = "<div>Đang nạp dữ liệu...</div>"; }

    let pageContent = (path === "/courses") ? this.getCoursesUI() : (path === "/library" ? this.getLibraryUI() : this.getHomeUI(studentItems));

    return new Response(this.layout(pageContent), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  getHomeUI(studentData) {
    return `
      <div class="stats-row">
        <div class="s-item"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="s-item"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="s-item"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>
      <div class="hero-grid">
        <div class="left-col">
          <div class="box-card wheel-section">
            <h3 class="box-title">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-wrapper">
              <div class="wheel-arrow"></div>
              <div class="wheel-main">
                <div class="w-txt t1">GIẢM 50k</div><div class="w-txt t2">GIẢM 50%</div>
                <div class="w-txt t3">GIẢM 100k</div><div class="w-txt t4">GIẢM 80%</div>
              </div>
              <div class="wheel-btn">QUAY</div>
            </div>
            <button class="btn-cta" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
          </div>
          <div class="box-card offline-box">
             <h4>Học Offline Hải Phòng</h4>
             <button class="btn-sub" onclick="window.open('https://zalo.me/0912888360')">ĐĂNG KÝ NGAY</button>
          </div>
        </div>
        <div class="box-card right-col">
          <h3 class="box-title">🏆 Bàng Vàng Chứng Chỉ</h3>
          <div class="slider-box"><div class="slider-track">${studentData}</div></div>
        </div>
      </div>
      <div class="info-grid">
        <div class="i-card"><h3>Thi Thật 100%</h3><p>Mô phỏng sát 100% đề thi quốc tế Certiport.</p></div>
        <div class="i-card" style="border-color:var(--cyan)"><h3>Trợ lý AI 24/7 ✨</h3><p>Giải đáp kiến thức tin học nhanh chóng qua AI.</p></div>
        <div class="i-card"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ luận văn, đồ án chuyên nghiệp trọn đời.</p></div>
      </div>`;
  },

  getCoursesUI() {
    return `
      <div class="c-container">
        <h2 style="text-align:center; margin-bottom:40px; font-size:2rem;">Hệ Thống Khóa Học (Đồng giá 400k)</h2>
        <div class="c-flex">
          <div class="c-group">
            <h3 style="color:var(--primary)">📦 Nhóm MOS 2019</h3>
            <label><input type="checkbox" class="c-cb" onchange="calc()"> MOS Word 2019</label>
            <label><input type="checkbox" class="c-cb" onchange="calc()"> MOS Excel 2019</label>
            <label><input type="checkbox" class="c-cb" onchange="calc()"> MOS PowerPoint 2019</label>
          </div>
          <div class="c-group">
            <h3 style="color:var(--cyan)">📦 Nhóm MOS 365</h3>
            <label><input type="checkbox" class="c-cb" onchange="calc()"> MOS Word 365</label>
            <label><input type="checkbox" class="c-cb" onchange="calc()"> MOS Excel 365</label>
            <label><input type="checkbox" class="c-cb" onchange="calc()"> MOS PowerPoint 365</label>
          </div>
        </div>
        <div class="c-total">
          <div id="price-tag">Tổng: 0.000 VNĐ</div>
          <p id="promo" style="color:var(--cyan); margin:10px 0; font-weight:bold; height:20px;"></p>
          <button class="btn-cta" style="width:300px">ĐĂNG KÝ HỌC NGAY</button>
        </div>
      </div>
      <script>
        function calc(){
          let n = document.querySelectorAll('.c-cb:checked').length;
          let p = (n >= 3) ? (Math.floor(n/3)*800 + (n%3)*400) : (n*400);
          document.getElementById('price-tag').innerText = "Tổng: " + p + ".000 VNĐ";
          document.getElementById('promo').innerText = (n >= 3) ? "🎉 Ưu đãi: Mua 3 tính tiền 2 đã áp dụng!" : "";
        }
      </script>`;
  },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet">
    <style>
      :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
      
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.9); border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:1000; }
      .logo-box { display: flex; align-items: center; gap: 10px; text-decoration:none; }
      .logo-box img { height: 40px; }
      .logo-box span { font-weight: 800; color: var(--primary); font-size: 1.4rem; letter-spacing: -1px; }
      .nav a { color: #888; text-decoration: none; margin-left: 20px; font-weight: 700; transition: 0.3s; }
      .nav a:hover { color: var(--primary); }
      
      .stats-row { display: flex; justify-content: center; gap: 80px; padding: 40px 0; }
      .s-item h2 { color: var(--primary); font-size: 2.8rem; margin-bottom: 5px; }
      .s-item p { color: #888; font-weight: 700; }

      .hero-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; max-width: 1400px; margin: 0 auto; padding: 0 5%; }
      .box-card { background: var(--card); border: 1px solid var(--border); border-radius: 30px; padding: 30px; position: relative; }
      .box-title { font-size: 1.1rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }

      /* VÒNG QUAY CHUẨN */
      .wheel-wrapper { position: relative; width: 220px; height: 220px; margin: 0 auto 20px; }
      .wheel-arrow { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 20px solid var(--primary); z-index: 10; }
      .wheel-main { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: rotate 10s linear infinite; }
      .w-txt { position: absolute; width: 100%; height: 100%; top:0; left:0; display: flex; justify-content: center; padding-top: 35px; font-weight: 800; font-size: 0.75rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
      .t1{transform:rotate(45deg)}.t2{transform:rotate(135deg)}.t3{transform:rotate(225deg)}.t4{transform:rotate(315deg)}
      .wheel-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 60px; height: 60px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem; border: 4px solid #fff; z-index: 5; }

      /* BẢNG VÀNG CHUẨN */
      .slider-box { overflow: hidden; border-radius: 20px; background: #000; padding: 20px 0; border: 1px solid rgba(255,255,255,0.05); }
      .slider-track { display: flex; gap: 20px; animation: scroll 40s linear infinite; }
      .st-card img { height: 320px; border-radius: 12px; object-fit: contain; }
      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1400px; margin: 40px auto; padding: 0 5%; }
      .i-card { background: var(--card); padding: 30px; border-radius: 25px; border-left: 4px solid var(--primary); }

      /* KHÓA HỌC CHUẨN */
      .c-flex { display: flex; justify-content: center; gap: 30px; }
      .c-group { background: var(--card); padding: 40px; border-radius: 30px; width: 450px; border: 1px solid var(--border); }
      .c-group label { display: block; padding: 15px; border-bottom: 1px solid #222; font-size: 1.2rem; cursor: pointer; font-weight: bold; }
      .c-total { text-align: center; margin-top: 50px; padding-bottom: 50px; }
      #price-tag { font-size: 2.5rem; font-weight: 800; color: var(--primary); }

      .btn-cta { background: var(--primary); color: #fff; border: none; padding: 15px 30px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; transition: 0.3s; }
      .btn-sub { background: #222; color: #fff; border: none; padding: 10px; border-radius: 10px; width: 100%; cursor: pointer; font-weight: 700; margin-top: 10px; }

      /* SIDEBAR LIÊN KẾT ĐỦ 5 NÚT */
      .side-links { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 2000; }
      .link-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
      .link-item img { width: 22px; }
      .link-item:hover { background: var(--primary); transform: scale(1.1); }

      /* MAP HOVER SÁNG */
      footer { padding: 60px 5% 40px; background: #050505; border-top: 1px solid var(--border); }
      .f-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 50px; }
      .map-frame { border-radius: 20px; overflow: hidden; height: 180px; border: 1px solid var(--border); filter: grayscale(1) opacity(0.6); transition: 0.5s; }
      .map-frame:hover { filter: grayscale(0) opacity(1); border-color: var(--primary); }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo-box"><img src="${CONFIG.LOGO_URL}"> <span>MOS360</span></a>
      <div class="nav"><a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a><a href="https://mos360.vn" style="background:var(--primary); color:#fff; padding:8px 20px; border-radius:12px;">Học Viên</a></div>
    </header>

    <div class="side-links">
      <a href="https://zalo.me/0912888360" class="link-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
      <a href="https://facebook.com/MOS360.EDU" class="link-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
      <a href="https://m.me/MOS360.EDU" class="link-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
      <a href="https://youtube.com/@mos360_vn" class="link-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
      <a href="https://tiktok.com/@mos360.vn" class="link-item" style="filter:invert(1)"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>

    <main>${content}</main>

    <footer>
      <div class="f-grid">
        <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>Hotline: 0912.888.360</p><p>Địa chỉ: 57 Lê Văn Thuyết A, An Biên, Lê Chân, Hải Phòng</p></div>
        <div><p>Hỗ trợ trực tuyến 24/7</p><p>Chứng chỉ Microsoft Quốc tế</p></div>
        <div class="map-frame">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.8967406456723!2d106.67756857589578!3d20.835848593361543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af993439977%3A0x6e8a087968565261!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1715420000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </footer>
    </body></html>`;
  }
};
