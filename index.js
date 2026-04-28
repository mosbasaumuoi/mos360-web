const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
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
    } catch (e) { studentData = "Đang kết nối dữ Center..."; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/library") content = this.getLibraryUI();
    else if (path === "/login") content = this.getLoginUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
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
              <div class="promo-box-top">
                  <p>🔥 <b>SIÊU ƯU ĐÃI ĐẶC BIỆT</b><br>Mua 3 khóa tính tiền 2 - Tiết kiệm 400k</p>
              </div>
              <div class="section-card wheel-card">
                  <h3 class="wheel-title">🎡 Vòng Quay May Mắn</h3>
                  <div class="wheel-box">
                      <div class="wheel-pointer"></div>
                      <div class="wheel-circle" id="main-wheel">
                          <div class="wheel-label l1"><b>GIẢM 50K</b></div>
                          <div class="wheel-label l2"><b>GIẢM 50%</b></div>
                          <div class="wheel-label l3"><b>GIẢM 100K</b></div>
                          <div class="wheel-label l4"><b>GIẢM 80%</b></div>
                      </div>
                      <div class="wheel-center">MOS</div>
                  </div>
                  <div class="wheel-inputs">
                      <input type="text" placeholder="Họ tên của bạn" id="w-name">
                      <input type="text" placeholder="Số điện thoại của bạn" id="w-phone">
                  </div>
                  <button class="btn-action" onclick="spinWheel()">QUAY NGAY</button>
              </div>
          </div>

          <div class="right-col">
              <div class="section-card bang-vang-card">
                  <h3 class="bv-title">🏆 Bảng Vàng Chứng Chỉ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card">
              <h4>Thi Thật 100%</h4>
              <p class="small-desc">Hệ thống mô phỏng sát đề quốc tế.</p>
          </div>
          <div class="service-card ai-chat-card">
              <h4 style="color:var(--cyan);">AI Assistant 24/7 ✨</h4>
              <div class="chat-input-box"><input type="text" placeholder="Hỏi MOS đi..."><button>GỬI</button></div>
          </div>
          <div class="service-card">
              <h4>Đồng Hành</h4>
              <p class="small-desc">Hỗ trợ định dạng luận văn trọn đời.</p>
          </div>
      </div>

      <script>
        function spinWheel() {
            const name = document.getElementById('w-name').value;
            const phone = document.getElementById('w-phone').value;
            if(!name || !phone) { alert('Vui lòng nhập đủ thông tin để quay!'); return; }
            const wheel = document.getElementById('main-wheel');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0, 0.1, 1)';
            wheel.style.transform = 'rotate(' + deg + 'deg)';
            setTimeout(() => { alert('Chúc mừng ' + name + '! MOS360 sẽ liên hệ quà tặng qua SĐT: ' + phone); }, 4500);
        }
      </script>`;
  },

  getCoursesUI() {
    return `
      <div class="section-card" style="max-width:900px; margin:40px auto; text-align:left;">
          <h2 style="text-align:center; color:var(--primary); margin-bottom:20px;">KHÓA HỌC ĐỒNG GIÁ 400K</h2>
          <div class="course-grid">
              <div class="course-group">
                  <h3>Nhóm MOS 2019</h3>
                  <label class="c-item"><input type="checkbox" class="course-check"> Word 2019 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check"> Excel 2019 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check"> PowerPoint 2019 <span>400k</span></label>
              </div>
              <div class="course-group">
                  <h3>Nhóm MOS 365</h3>
                  <label class="c-item"><input type="checkbox" class="course-check"> Word 365 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check"> Excel 365 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check"> PowerPoint 365 <span>400k</span></label>
              </div>
          </div>
          <div class="price-summary">
              <p>Tạm tính: <span id="total-price" style="font-size:2rem; color:var(--primary);">0</span> VNĐ</p>
              <p id="promo-text" style="color:var(--cyan); display:none;">✨ ƯU ĐÃI: MUA 3 TÍNH TIỀN 2!</p>
              <button class="btn-action">ĐĂNG KÝ NGAY</button>
          </div>
      </div>
      <script>
          document.querySelectorAll('.course-check').forEach(box => {
              box.addEventListener('change', () => {
                  const count = document.querySelectorAll('.course-check:checked').length;
                  let total = count * 400000;
                  if(count === 3) total = 800000;
                  document.getElementById('promo-text').style.display = count === 3 ? 'block' : 'none';
                  document.getElementById('total-price').innerText = total.toLocaleString();
              });
          });
      </script>`;
  },

  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto;"><h2>Đăng Nhập</h2><input type="text" placeholder="Tài khoản" style="width:100%; padding:12px; margin:10px 0; border-radius:8px;"><input type="password" placeholder="Mật khẩu" style="width:100%; padding:12px; margin:10px 0; border-radius:8px;"><button class="btn-action">VÀO HỆ THỐNG</button></div>`; },

  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:40px auto;"><h2>📚 Thư Viện</h2><p>Dữ liệu đang nạp...</p></div>`; },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.95); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand img { height: 35px; }
        nav a { color: #888; text-decoration: none; font-weight: 700; font-size: 0.85rem; margin-left: 20px; }

        .stats-bar { display: flex; justify-content: center; gap: 40px; padding: 30px 5%; }
        .stat-item h2 { color: var(--primary); font-size: 2.2rem; }
        .stat-item p { color: #888; font-size: 0.8rem; }

        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 320px 1fr; gap: 25px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 28px; padding: 25px; }

        /* VÒNG QUAY CSS */
        .promo-box-top { background: rgba(255,87,34,0.1); border: 1px dashed var(--primary); border-radius: 15px; padding: 12px; margin-bottom: 15px; text-align: center; }
        .wheel-box { position: relative; width: 220px; height: 220px; margin: 0 auto 20px; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); position: relative; }
        .wheel-pointer { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); border-top: 15px solid #FFD700; border-left: 8px solid transparent; border-right: 8px solid transparent; z-index: 10; }
        .wheel-center { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:50px; height:50px; background:#fff; border-radius:50%; color:#000; font-weight:900; display:flex; align-items:center; justify-content:center; z-index:20; font-size:0.7rem; }
        .wheel-label { position: absolute; width:100%; height:100%; display:flex; justify-content:center; align-items:flex-start; padding-top:25px; font-size:0.7rem; color:#fff; }
        .l1{transform:rotate(45deg)} .l2{transform:rotate(135deg)} .l3{transform:rotate(225deg)} .l4{transform:rotate(315deg)}
        .wheel-inputs input { width: 100%; padding: 10px; margin-bottom: 8px; background: #000; border: 1px solid #333; color: #fff; border-radius: 8px; }

        /* BẢNG VÀNG CSS */
        .bang-vang-card { overflow: hidden; }
        .carousel-viewport { width: 100%; overflow: hidden; border-radius: 15px; }
        .carousel-track { display: flex; gap: 15px; animation: scroll 30s linear infinite; }
        .student-item img { height: 350px; border-radius: 12px; object-fit: contain; }

        /* GIÁ TRỊ CỐT LÕI CSS */
        .services-grid { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .service-card { background: var(--card); padding: 20px; border-radius: 20px; border-left: 4px solid var(--primary); }
        .small-desc { font-size: 0.75rem; color: #888; margin-top: 5px; }
        .chat-input-box { display: flex; background: #000; border-radius: 8px; margin-top: 10px; padding: 4px; }
        .chat-input-box input { flex:1; background:transparent; border:none; color:#fff; padding:8px; outline:none; font-size:0.8rem; }
        .chat-input-box button { background:var(--cyan); border:none; padding:0 12px; border-radius:6px; font-weight:800; }

        /* KHÓA HỌC CSS */
        .course-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .c-item { display: flex; justify-content: space-between; padding: 12px; background: #1a1a1a; margin-bottom: 8px; border-radius: 10px; cursor: pointer; }

        /* MAP CSS */
        .map-wrapper { height: 200px; border-radius: 20px; overflow: hidden; filter: grayscale(1); transition: 0.5s; border: 1px solid var(--border); }
        .map-wrapper:hover { filter: grayscale(0); }

        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px; }
        .btn-action { background: var(--primary); color: white; border: none; padding: 14px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; }

        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 768px) {
            .main-container, .services-grid, .footer-grid, .course-grid { grid-template-columns: 1fr; }
            .student-item img { height: 250px; }
        }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"></a>
        <nav><a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a><a href="/login" style="color:var(--primary)">Đăng Nhập</a></nav>
    </header>

    <main>${content}</main>

    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>Hotline: 0912.888.360</p><p>57 Lê Văn Thuyết A, Hải Phòng</p></div>
            <div style="font-size:0.85rem;">
                <h4 style="color:var(--cyan)">🕒 GIỜ LÀM VIỆC</h4>
                <p>Thứ 2 - Thứ 7: 08:00 – 17:00</p><p>Chủ Nhật & Lễ: Nghỉ</p>
            </div>
            <div class="map-wrapper">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.452636244431!2d106.6811403!3d20.8517621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af2767098e9%3A0xc391b8a53a6504a5!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEvDqm4gRMawxqFuZywgTMOqIENow6JuLCBI4bqjaSBQaMO_bmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    </body></html>`;
  }
};
