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
          htmlContent += `<div class="student-item"><img src="${link}" loading="lazy"></div>`;
        }
      });
      studentData = htmlContent + htmlContent; // Nhân đôi để chạy carousel vô tận
    } catch (e) { studentData = "<p>Đang tải dữ liệu học viên...</p>"; }

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
          <div class="stat-item"><h2>100%</h2><p>ĐẬU LẦN ĐẦU</p></div>
          <div class="stat-item"><h2>1.000+</h2><p>HỌC VIÊN</p></div>
          <div class="stat-item"><h2>600+</h2><p>TRUY CẬP/NGÀY</p></div>
      </div>

      <div class="main-container">
          <div class="left-col">
              <div class="promo-box-top">
                  <p>🔥 <b>ƯU ĐÃI ĐẶC BIỆT:</b> Mua 3 tặng 1 - Tiết kiệm ngay 400k</p>
              </div>
              
              <div class="section-card wheel-card">
                  <h3 class="wheel-title">VÒNG QUAY MAY MẮN</h3>
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
                      <input type="text" placeholder="Họ và tên" id="w-name">
                      <input type="tel" placeholder="Số điện thoại" id="w-phone">
                  </div>
                  <button class="btn-action" onclick="spinWheel()">THỬ VẬN MAY NGAY</button>
              </div>
          </div>

          <div class="right-col">
              <div class="section-card bang-vang-section">
                  <h3 class="bv-title">🏆 BẢNG VÀNG VINH DANH</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
                  <p class="bv-note">Chứng chỉ thật - Kết quả thật từ học viên MOS360</p>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card">
              <h4>Thi Thật 100%</h4>
              <p class="small-desc">Giao diện mô phỏng chuẩn IIG quốc tế.</p>
          </div>
          <div class="service-card ai-chat-card">
              <h4 style="color:var(--cyan);">AI Assistant 24/7 ✨</h4>
              <div class="chat-input-box">
                  <input type="text" placeholder="Hỏi về lộ trình MOS...">
                  <button>GỬI</button>
              </div>
          </div>
          <div class="service-card">
              <h4>Hỗ Trợ Trọn Đời</h4>
              <p class="small-desc">Cấp tài khoản luyện thi đến khi lấy bằng.</p>
          </div>
      </div>

      <script>
        function spinWheel() {
            const name = document.getElementById('w-name').value;
            const phone = document.getElementById('w-phone').value;
            if(!name || !phone) { alert('Bạn hãy nhập thông tin để nhận quà nhé!'); return; }
            const wheel = document.getElementById('main-wheel');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transition = 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)';
            wheel.style.transform = 'rotate(' + deg + 'deg)';
            setTimeout(() => { alert('Chúc mừng ' + name + '! MOS360 sẽ gửi mã giảm giá đến SĐT: ' + phone); }, 5500);
        }
      </script>`;
  },

  layout(content) {
    return `<!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>${CONFIG.TITLE}</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #0A0A0A; --card: #161616; --text: #FFFFFF; --border: rgba(255,255,255,0.1); --cyan: #00F2FF; }
            * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }

            /* Header mờ ảo hiện đại */
            header { padding: 12px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(10,10,10,0.8); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand img { height: 32px; filter: drop-shadow(0 0 5px rgba(255,87,34,0.3)); }
            nav a { color: #BBB; text-decoration: none; font-weight: 700; font-size: 0.8rem; margin-left: 15px; text-transform: uppercase; transition: 0.3s; }
            nav a:hover { color: var(--primary); }

            /* Stats Bar */
            .stats-bar { display: flex; justify-content: center; gap: 20px; padding: 30px 5%; text-align: center; }
            .stat-item h2 { color: var(--primary); font-size: 1.8rem; font-weight: 800; }
            .stat-item p { color: #888; font-size: 0.7rem; letter-spacing: 1px; }

            /* Grid Layout */
            .main-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 20px; overflow: hidden; }

            .promo-box-top { background: linear-gradient(90deg, rgba(255,87,34,0.2), transparent); border-left: 4px solid var(--primary); padding: 15px; border-radius: 12px; margin-bottom: 20px; font-size: 0.9rem; }

            /* Vòng quay */
            .wheel-card { text-align: center; }
            .wheel-title { font-size: 1rem; margin-bottom: 20px; color: var(--primary); }
            .wheel-box { position: relative; width: 200px; height: 200px; margin: 0 auto 20px; }
            .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #222; position: relative; overflow: hidden; transition: transform 5s cubic-bezier(0.15, 0, 0.15, 1); background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); }
            .wheel-pointer { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 20px solid var(--primary); z-index: 10; }
            .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 45px; height: 45px; background: white; border-radius: 50%; color: black; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; z-index: 5; box-shadow: 0 0 15px rgba(0,0,0,0.5); }
            .wheel-inputs input { width: 100%; padding: 12px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white; border-radius: 10px; }

            /* BẢNG VÀNG - KHÔNG TRÀN KHUNG */
            .bang-vang-section { height: 450px; display: flex; flex-direction: column; background: radial-gradient(circle at top right, #1a1a1a, #161616); }
            .bv-title { margin-bottom: 15px; text-align: center; color: #FFD700; }
            .carousel-viewport { flex: 1; width: 100%; overflow: hidden; position: relative; border-radius: 16px; background: rgba(0,0,0,0.3); display: flex; align-items: center; }
            .carousel-track { display: flex; gap: 20px; animation: scroll 40s linear infinite; padding: 0 20px; align-items: center; }
            .student-item { flex: 0 0 auto; height: 280px; width: auto; }
            .student-item img { height: 100%; width: auto; object-fit: contain; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
            .bv-note { text-align: center; font-size: 0.75rem; color: #666; margin-top: 15px; }

            /* Dịch vụ */
            .services-grid { max-width: 1200px; margin: 30px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .service-card { background: var(--card); padding: 20px; border-radius: 20px; border-bottom: 3px solid var(--primary); transition: 0.3s; }
            .service-card:hover { transform: translateY(-5px); background: #1c1c1c; }
            .chat-input-box { display: flex; background: #000; padding: 5px; border-radius: 10px; margin-top: 10px; border: 1px solid #333; }
            .chat-input-box input { flex: 1; background: transparent; border: none; color: white; padding: 8px; font-size: 0.8rem; outline: none; }
            .chat-input-box button { background: var(--cyan); border: none; padding: 0 15px; border-radius: 8px; font-weight: 800; color: #000; cursor: pointer; }

            /* Nút bấm chuyển đổi cao */
            .btn-action { background: var(--primary); color: white; border: none; padding: 15px; border-radius: 12px; font-weight: 800; cursor: pointer; width: 100%; box-shadow: 0 4px 15px rgba(255,87,34,0.4); transition: 0.3s; text-transform: uppercase; letter-spacing: 1px; }
            .btn-action:hover { transform: scale(1.02); filter: brightness(1.1); }

            /* Footer & Map */
            footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); }
            .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 40px; }
            .map-wrapper { height: 180px; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); }

            @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

            /* RESPONSIVE - TỐI ƯU ĐIỆN THOẠI */
            @media (max-width: 768px) {
                .main-container { grid-template-columns: 1fr; }
                .stats-bar { padding: 20px 10px; }
                .stat-item h2 { font-size: 1.4rem; }
                .services-grid { grid-template-columns: 1fr; }
                .footer-grid { grid-template-columns: 1fr; gap: 30px; }
                .student-item { height: 200px; } /* Thu nhỏ ảnh trên mobile để ko tràn */
                .bang-vang-section { height: 350px; }
                header { padding: 10px 15px; }
                nav a { margin-left: 10px; font-size: 0.7rem; }
            }
        </style>
    </head>
    <body>
        <header>
            <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}" alt="MOS360"></a>
            <nav>
                <a href="/">Trang Chủ</a>
                <a href="/courses">Khóa Học</a>
                <a href="/login" style="color:var(--primary)">Học Viên</a>
            </nav>
        </header>

        <main>${content}</main>

        <footer>
            <div class="footer-grid">
                <div>
                    <h2 style="color:var(--primary); margin-bottom:15px;">MOS360.VN</h2>
                    <p>📍 57 Lê Văn Thuyết, Kênh Dương, Lê Chân, Hải Phòng</p>
                    <p>📞 Hotline: 0912.888.360</p>
                </div>
                <div>
                    <h4 style="color:var(--cyan); margin-bottom:10px;">THỜI GIAN LÀM VIỆC</h4>
                    <p>Thứ 2 - Thứ 7: 08:00 – 21:00</p>
                    <p>Chủ Nhật: 08:00 – 17:00</p>
                </div>
                <div class="map-wrapper">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.023245450415!2d106.6791653!3d20.8309117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af93e920d3f%3A0x67390299f90f23d1!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEvDqm5oETGsMahbmcsIEzDqiBDaMOibiwgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1700000000000" 
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </footer>
    </body>
    </html>`;
  },

  // Giữ các hàm UI khác ngắn gọn nhưng đẹp mắt
  getCoursesUI() { return `<div class="section-card" style="max-width:800px; margin:40px auto; text-align:center;"><h2>CÁC KHÓA HỌC MOS/IC3</h2><p>Dữ liệu đang được cập nhật...</p></div>`; },
  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto;"><h2>ĐĂNG NHẬP</h2><input type="text" placeholder="Tài khoản" style="width:100%; padding:12px; margin:15px 0; background:#000; border:1px solid #333; color:white; border-radius:8px;"><button class="btn-action">VÀO HỌC</button></div>`; },
  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:40px auto;"><h2>THƯ VIỆN TÀI LIỆU</h2></div>`; }
};
