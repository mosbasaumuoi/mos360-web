const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Cơ chế nhường đường cho link rút gọn
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login"];
    if (!webPaths.includes(path)) return fetch(request);

    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          htmlContent += `<div class="student-item"><img src="${link}"></div>`;
        }
      });
      studentData = htmlContent + htmlContent;
    } catch (e) { studentData = "Đang kết nối dữ liệu..."; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/library") content = this.getLibraryUI();
    else if (path === "/login") content = this.getLoginUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { 
      headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
  },

  getHomeUI(studentData) {
    return `
      <div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.000+</h2><p>Học viên đã học</p></div>
          <div class="stat-item"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>

      <div class="main-container">
          <div class="left-col">
              <div class="section-card mini-wheel-card">
                  <h3 style="color:var(--primary); font-size:1.1rem;">🎡 Vòng Quay May Mắn</h3>
                  <div class="wheel-box">
                      <div class="wheel-pointer"></div>
                      <div class="wheel-circle">
                          <div class="wheel-label l1"><b>50K</b></div>
                          <div class="wheel-label l2"><b>50%</b></div>
                          <div class="wheel-label l3"><b>100K</b></div>
                          <div class="wheel-label l4"><b>80%</b></div>
                      </div>
                      <div class="wheel-center">QUAY</div>
                  </div>
                  <div class="promo-box">
                      <p>🔥 <b>SIÊU ƯU ĐẶC BIỆT</b><br>Mua 3 khóa tính tiền 2<br>Tiết kiệm ngay 400.000đ</p>
                  </div>
                  <button class="btn-action" style="padding:10px; font-size:0.8rem;">NHẬN THƯỞNG</button>
              </div>
          </div>

          <div class="right-col">
              <div class="section-card">
                  <h3 style="margin-bottom:15px; text-align:left;">🏆 Bảng Vàng Chứng Chỉ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card"><h4>Thi Thật 100%</h4><p>Hệ thống mô phỏng sát đề quốc tế.</p></div>
          <div class="service-card ai-chat-card">
              <h4 style="color:var(--cyan);">AI Assistant 24/7 ✨</h4>
              <div class="chat-input-box"><input type="text" placeholder="Hỏi MOS đi..."><button>GỬI</button></div>
          </div>
          <div class="service-card"><h4>Đồng Hành</h4><p>Hỗ trợ định dạng luận văn trọn đời.</p></div>
      </div>`;
  },

  getCoursesUI() {
    return `
      <div class="section-card" style="max-width:900px; margin:40px auto; text-align:left;">
          <h2 style="text-align:center; color:var(--primary);">HỆ THỐNG KHÓA HỌC MOS ĐỒNG GIÁ 400K</h2>
          <div class="course-grid">
              <div class="course-group">
                  <h3><img src="https://img.icons8.com/color/48/microsoft-office-2019.png"/> Nhóm MOS 2019</h3>
                  <label class="c-item"><input type="checkbox" class="course-check" value="400000"> Word 2019 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check" value="400000"> Excel 2019 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check" value="400000"> PowerPoint 2019 <span>400k</span></label>
              </div>
              <div class="course-group">
                  <h3><img src="https://img.icons8.com/color/48/microsoft-office-365.png"/> Nhóm MOS 365</h3>
                  <label class="c-item"><input type="checkbox" class="course-check" value="400000"> Word 365 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check" value="400000"> Excel 365 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check" value="400000"> PowerPoint 365 <span>400k</span></label>
              </div>
          </div>
          <div class="price-summary">
              <p>Tạm tính: <span id="total-price" style="font-size:2rem; color:var(--primary);">0</span> VNĐ</p>
              <p id="promo-text" style="color:var(--cyan); font-weight:bold; display:none;">✨ ƯU ĐÃI: MUA 3 TÍNH TIỀN 2!</p>
              <button class="btn-action">ĐĂNG KÝ HỌC NGAY</button>
          </div>
      </div>
      <script>
          document.querySelectorAll('.course-check').forEach(box => {
              box.addEventListener('change', () => {
                  const selected = document.querySelectorAll('.course-check:checked');
                  let total = selected.length * 400000;
                  if(selected.length === 3) {
                      total = 800000;
                      document.getElementById('promo-text').style.display = 'block';
                  } else {
                      document.getElementById('promo-text').style.display = 'none';
                  }
                  document.getElementById('total-price').innerText = total.toLocaleString();
              });
          });
      </script>`;
  },

  getLoginUI() {
    return `<div class="section-card" style="max-width:400px; margin:100px auto;">
        <h2>Đăng Nhập</h2>
        <div style="margin-top:20px; text-align:left;">
            <label style="font-size:0.8rem; color:#888;">Tên đăng nhập</label>
            <input type="text" id="user" style="width:100%; padding:12px; margin:8px 0; background:#000; border:1px solid #333; color:#fff; border-radius:10px;">
            <label style="font-size:0.8rem; color:#888;">Mật khẩu</label>
            <input type="password" id="pass" style="width:100%; padding:12px; margin:8px 0; background:#000; border:1px solid #333; color:#fff; border-radius:10px;">
            <button class="btn-action" onclick="doLogin()">VÀO HỆ THỐNG</button>
        </div>
        <script>
            function doLogin() {
                const u = document.getElementById('user').value;
                const p = document.getElementById('pass').value;
                if(u === 'adminmos360' && p === 'Admin@123') alert('Chào Quản trị viên MOS360!');
                else if(p === 'Mos360@123') alert('Chào Học viên!');
                else alert('Sai tài khoản hoặc mật khẩu!');
            }
        </script>
    </div>`;
  },

  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:40px auto;"><h2>📚 Thư Viện MOS</h2><p>Tài liệu đang được đồng bộ...</p></div>`; },

  layout(content) {
    return `<!DOCTYPE html><html lang="vi"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.95); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #fff; font-weight: 800; }
        .brand img { height: 35px; }
        nav { display: flex; gap: 20px; }
        nav a { color: #888; text-decoration: none; font-weight: 700; font-size: 0.85rem; transition: 0.3s; }
        nav a:hover { color: var(--primary); }

        .stats-bar { display: flex; justify-content: center; gap: 60px; padding: 40px 5%; border-bottom: 1px solid var(--border); }
        .stat-item h2 { color: var(--primary); font-size: 2.5rem; font-weight: 800; }
        .stat-item p { color: #888; font-size: 0.9rem; }

        .main-container { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: 320px 1fr; gap: 30px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 28px; padding: 30px; }

        /* VÒNG QUAY MINI */
        .wheel-box { position: relative; width: 200px; height: 200px; margin: 20px auto; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 20s linear infinite; position: relative; }
        .wheel-pointer { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); border-top: 18px solid #FFD700; border-left: 10px solid transparent; border-right: 10px solid transparent; z-index: 10; }
        .wheel-center { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:50px; height:50px; background:#fff; border-radius:50%; color:#000; font-size:0.7rem; font-weight:900; display:flex; align-items:center; justify-content:center; z-index:20;}
        .wheel-label { position: absolute; top:0; left:0; width:100%; height:100%; display:flex; justify-content:center; align-items:flex-start; padding-top:25px; font-size:0.7rem; color:#fff; }

        /* BẢNG VÀNG 520x360 - TRƯỢT NHANH */
        .carousel-viewport { width: 100%; overflow: hidden; margin-top: 20px; }
        .carousel-track { display: flex; gap: 20px; animation: scroll 30s linear infinite; }
        .student-item img { height: 360px; border-radius: 15px; background: #000; border: 1px solid #333; }

        .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 1000; }
        .social-item { width: 45px; height: 45px; background: #1a1a1a; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); transition: 0.3s; }
        .social-item:hover { transform: scale(1.1); border-color: var(--primary); }
        .social-item img { width: 22px; }

        .services-grid { max-width: 1400px; margin: 40px auto; padding: 0 5%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
        .service-card { background: var(--card); padding: 25px; border-radius: 20px; border-left: 4px solid var(--primary); }
        .service-card h4 { font-size: 0.95rem; margin-bottom: 5px; }
        .service-card p { font-size: 0.8rem; color: #888; }
        .ai-chat-card { border: 1px solid var(--cyan); border-left: 4px solid var(--cyan); }
        .chat-input-box { display: flex; background: #000; border-radius: 10px; margin-top: 12px; padding: 4px; }
        .chat-input-box input { flex:1; background:transparent; border:none; color:#fff; padding:10px; outline:none; font-size:0.8rem; }
        .chat-input-box button { background:var(--cyan); border:none; padding:0 15px; border-radius:8px; font-weight:800; cursor:pointer; }

        /* KHÓA HỌC */
        .course-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 25px; }
        .course-group h3 { margin-bottom: 15px; display: flex; align-items: center; gap: 12px; font-size: 1.1rem; }
        .c-item { display: flex; justify-content: space-between; padding: 15px; background: #1a1a1a; margin-bottom: 10px; border-radius: 12px; cursor: pointer; transition: 0.2s; border: 1px solid transparent; }
        .c-item:hover { border-color: var(--primary); background: #222; }
        .course-check { width: 18px; height: 18px; cursor: pointer; }
        .price-summary { margin-top: 30px; padding: 25px; background: #1a1a1a; border-radius: 20px; text-align: center; }

        .btn-action { background: var(--primary); color: white; border: none; padding: 16px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; transition: 0.3s; }
        .btn-action:hover { filter: brightness(1.2); transform: translateY(-2px); }

        footer { padding: 60px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 80px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 50px; }
        .map-box { height: 200px; border-radius: 20px; overflow: hidden; filter: grayscale(1); transition: 0.5s; border: 1px solid var(--border); }
        .map-box:hover { filter: grayscale(0); }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 1000px) { .main-container, .services-grid, .footer-grid, .course-grid { grid-template-columns: 1fr; } .side-social { display:none; } }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> <span>MOS360</span></a>
        <nav><a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a><a href="/login" style="color:var(--primary)">Đăng Nhập</a></nav>
    </header>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://facebook.com/mos360.edu" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="#" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
        <a href="#" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
        <a href="#" class="social-item"><svg viewBox="0 0 24 24" fill="white" width="20"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.12-.91.38-1.57 1.23-1.73 2.19-.11.64-.03 1.3.18 1.91.43 1.13 1.53 1.95 2.73 2.11 1.19.16 2.45-.19 3.33-1.01.62-.57.97-1.38 1-2.22.04-4.52-.01-9.04.01-13.56z"/></svg></a>
    </div>

    <main>${content}</main>

    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary); margin-bottom:15px;">MOS360.VN</h2><p>Hotline: 0912.888.360</p><p>Địa chỉ: 57 Lê Văn Thuyết A, Hải Phòng</p></div>
            <div style="font-size:0.9rem;">
                <h4 style="color:var(--cyan); margin-bottom:12px;">🕒 GIỜ LÀM VIỆC</h4>
                <p>Thứ 2 - Thứ 7: 08:00 – 17:00</p>
                <p>(Nghỉ trưa: 11:30 – 13:30)</p>
                <p style="color:#555; margin-top:5px;">Chủ Nhật & Ngày lễ: Nghỉ</p>
            </div>
            <div class="map-box">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.455648!2d106.6800!3d20.8447" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    </body></html>`;
  }
};
