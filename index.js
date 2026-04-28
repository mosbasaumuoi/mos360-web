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
    } catch (e) { studentData = "Đang nạp dữ liệu..."; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/login") content = this.getLoginUI();
    else if (path === "/library") content = this.getLibraryUI();
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
                  <h3 class="wheel-title">Vòng Quay May Mắn</h3>
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
              <div class="section-card" id="bang-vang-fixed">
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
              <h4>Đồng hành trọn đời</h4>
              <p class="small-desc">Hỗ trợ định dạng luận văn đề án, tin học công sở.</p>
          </div>
      </div>

      <script>
        function spinWheel() {
            const name = document.getElementById('w-name').value;
            const phone = document.getElementById('w-phone').value;
            if(!name || !phone) { alert('Vui lòng nhập đủ thông tin!'); return; }
            const wheel = document.getElementById('main-wheel');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0, 0.1, 1)';
            wheel.style.transform = 'rotate(' + deg + 'deg)';
            setTimeout(() => { alert('Chúc mừng ' + name + '! MOS360 sẽ liên hệ qua SĐT: ' + phone); }, 4500);
        }
      </script>`;
  },

  getCoursesUI() {
    return `<div class="section-card" style="max-width:900px; margin:40px auto; text-align:left;">
          <h2 style="text-align:center; color:var(--primary); margin-bottom:20px;">KHÓA HỌC ĐỒNG GIÁ 400K</h2>
          <div class="course-grid">
              <div class="course-group"><h3>Nhóm MOS 2019</h3>
                  <label class="c-item"><input type="checkbox" class="course-check"> Word 2019 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check"> Excel 2019 <span>400k</span></label>
                  <label class="c-item"><input type="checkbox" class="course-check"> PowerPoint 2019 <span>400k</span></label>
              </div>
              <div class="course-group"><h3>Nhóm MOS 365</h3>
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

  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto;"><h2>Đăng Nhập</h2><input type="text" id="user" placeholder="Tài khoản adminmos360" style="width:100%; padding:12px; margin:10px 0; background:#000; color:#fff; border:1px solid #333; border-radius:8px;"><input type="password" id="pass" placeholder="Mật khẩu" style="width:100%; padding:12px; margin:10px 0; background:#000; color:#fff; border:1px solid #333; border-radius:8px;"><button class="btn-action" onclick="doLogin()">VÀO HỆ THỐNG</button></div><script>function doLogin(){const u=document.getElementById('user').value,p=document.getElementById('pass').value; if(u==='adminmos360'&&p==='Admin@123')alert('Chào Admin!');else if(p==='Mos360@123')alert('Chào Học viên!');else alert('Sai mật khẩu!');}</script>`; },
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

        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 300px 1fr; gap: 25px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 28px; padding: 25px; }

        .promo-box-top { background: rgba(255,87,34,0.1); border: 1px dashed var(--primary); border-radius: 15px; padding: 12px; margin-bottom: 15px; text-align: center; }
        .wheel-card { padding: 15px; }
        .wheel-title { font-size: 1rem; margin-bottom: 25px; color: var(--primary); font-weight: 800; }
        .wheel-box { position: relative; width: 160px; height: 160px; margin: 0 auto 20px; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 5px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); position: relative; }
        .wheel-pointer { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); border-top: 15px solid #FFD700; border-left: 8px solid transparent; border-right: 8px solid transparent; z-index: 10; }
        .wheel-center { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:40px; height:40px; background:#fff; border-radius:50%; color:#000; font-weight:900; display:flex; align-items:center; justify-content:center; z-index:20; font-size:0.6rem; }
        .wheel-label { position: absolute; width:100%; height:100%; display:flex; justify-content:center; align-items:flex-start; padding-top:20px; font-size:0.6rem; color:#fff; }
        .l1{transform:rotate(45deg)} .l2{transform:rotate(135deg)} .l3{transform:rotate(225deg)} .l4{transform:rotate(315deg)}
        .wheel-inputs input { width: 100%; padding: 8px; margin-bottom: 8px; background: #000; border: 1px solid #333; color: #fff; border-radius: 8px; font-size: 0.8rem; }

        /* BẢNG VÀNG - FIX LỖI TRÀN KHUNG TUYỆT ĐỐI */
        #bang-vang-fixed { height: 420px; overflow: hidden; display: flex; flex-direction: column; padding: 20px; position: relative; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; border-radius: 15px; }
        .carousel-track { display: flex; gap: 20px; animation: scroll 30s linear infinite; height: 100%; align-items: center; }
        .student-item { flex: 0 0 auto; height: 250px; display: flex; align-items: center; }
        .student-item img { height: 100%; width: auto; border-radius: 12px; object-fit: contain; box-shadow: 0 10px 30px rgba(0,0,0,0.8); pointer-events: none; }

        .services-grid { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .service-card { background: var(--card); padding: 20px; border-radius: 20px; border-left: 4px solid var(--primary); }
        .small-desc { font-size: 0.75rem; color: #888; margin-top: 5px; line-height: 1.4; }
        .chat-input-box { display: flex; background: #000; border-radius: 8px; margin-top: 10px; padding: 4px; border: 1px solid #222; }
        .chat-input-box input { flex:1; background:transparent; border:none; color:#fff; padding:8px; outline:none; font-size:0.8rem; }
        .chat-input-box button { background:var(--cyan); border:none; padding:0 12px; border-radius:6px; font-weight:800; cursor:pointer; }

        .side-social { position: fixed; right: 15px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 1000; }
        .social-item { width: 42px; height: 42px; background: #1a1a1a; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); transition: 0.3s; }
        .social-item:hover { transform: scale(1.1); border-color: var(--primary); }
        .social-item img { width: 22px; height: 22px; }

        /* MAP CHUẨN LÊ VĂN THUYẾT HẢI PHÒNG */
        .map-wrapper { height: 200px; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); }

        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px; }
        .btn-action { background: var(--primary); color: white; border: none; padding: 14px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; }

        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 768px) {
            .main-container, .services-grid, .footer-grid { grid-template-columns: 1fr; }
            .side-social { display: none; }
            .student-item { height: 180px; }
        }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"></a>
        <nav><a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a><a href="/login" style="color:var(--primary)">Đăng Nhập</a></nav>
    </header>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://facebook.com/mos360.edu" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="#" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
        <a href="#" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
        <a href="#" class="social-item"><svg viewBox="0 0 24 24" fill="white" width="22"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.12-.91.38-1.57 1.23-1.73 2.19-.11.64-.03 1.3.18 1.91.43 1.13 1.53 1.95 2.73 2.11 1.19.16 2.45-.19 3.33-1.01.62-.57.97-1.38 1-2.22.04-4.52-.01-9.04.01-13.56z"/></svg></a>
    </div>

    <main>${content}</main>

    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>Hotline: 0912.888.360</p><p>57 Lê Văn Thuyết A, Hải Phòng</p></div>
            <div style="font-size:0.85rem;">
                <h4 style="color:var(--cyan)">🕒 GIỜ LÀM VIỆC</h4>
                <p>Thứ 2 - Thứ 7: 08:00 – 17:00</p><p>Chủ Nhật & Lễ: Nghỉ</p>
            </div>
            <div class="map-wrapper">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.847522510344!2d106.68532457476214!3d20.83685649429446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af2763f03f7%3A0x6b7724128f77372b!2zNTcgTMOqIFbEg24gVGh1eeG6vHQsIEvDqm5oIETGsMahbmcsIEzDqiBDaMOibiwgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1715000000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    </body></html>`;
  }
};
