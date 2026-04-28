const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mosbasaumuoi.github.io/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

// --- PHẦN 1: GIAO DIỆN (CSS) ---
const STYLES = `
<style>
    :root { --primary: #FF5722; --bg: #0A0A0A; --card: #161616; --text: #FFFFFF; --border: rgba(255,255,255,0.1); --cyan: #00F2FF; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

    header { padding: 12px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(10,10,10,0.85); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
    .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.2rem; }
    .brand img { height: 35px; }
    nav a { color: #BBB; text-decoration: none; font-weight: 700; font-size: 0.8rem; margin-left: 20px; text-transform: uppercase; }

    .stats-bar { display: flex; justify-content: center; gap: 40px; padding: 30px 5%; text-align: center; }
    .stat-item h2 { color: var(--primary); font-size: 2rem; }

    .main-container { max-width: 1250px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: 320px 1fr; gap: 25px; }
    .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 25px; }

    .promo-box-top { background: rgba(255,87,34,0.15); border: 1px dashed var(--primary); padding: 15px; border-radius: 15px; margin-bottom: 20px; text-align: center; }
    .highlight-text { color: var(--primary); font-weight: 800; display: block; margin-top: 5px; }

    /* Vòng quay */
    .wheel-card { display: flex; flex-direction: column; align-items: center; }
    .wheel-title-mini { font-size: 0.85rem; color: #888; margin-bottom: 15px; }
    .wheel-box { position: relative; width: 180px; height: 180px; margin-bottom: 20px; }
    .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 6px solid #222; position: relative; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); }
    .wheel-pointer { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 20px solid #FFD700; z-index: 10; }
    .wheel-center { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:35px; height:35px; background:white; border-radius:50%; color:black; font-weight:900; display:flex; align-items:center; justify-content:center; z-index:20; font-size:0.6rem; }
    .wheel-label { position: absolute; width:100%; height:100%; display:flex; justify-content:center; align-items:flex-start; padding-top:15px; font-size:0.55rem; color:#fff; }
    .l1{transform:rotate(45deg)} .l2{transform:rotate(135deg)} .l3{transform:rotate(225deg)} .l4{transform:rotate(315deg)}

    /* Bảng vàng - Tốc độ 45s (Chậm) và Khống chế khung */
    .bang-vang-section { height: 460px; display: flex; flex-direction: column; overflow: hidden; }
    .carousel-viewport { flex: 1; width: 100%; overflow: hidden; position: relative; background: #000; border-radius: 15px; display: flex; align-items: center; }
    .carousel-track { display: flex; gap: 30px; animation: scroll 45s linear infinite; height: 100%; align-items: center; }
    .student-item { flex: 0 0 auto; height: 100%; display: flex; align-items: center; justify-content: center; }
    .student-item img { max-height: 85%; width: auto; object-fit: contain; border-radius: 10px; border: 2px solid #222; }

    /* AI Chat - Mở rộng */
    .ai-chat-card { grid-column: span 1; }
    .chat-input-box { display: flex; background: #000; border-radius: 12px; margin-top: 15px; padding: 8px; border: 1px solid #333; min-height: 60px; }
    .chat-input-box input { flex:1; background:transparent; border:none; color:#fff; padding:0 15px; outline:none; font-size:0.9rem; }
    .chat-input-box button { background:var(--cyan); border:none; padding: 0 25px; border-radius:8px; font-weight:800; cursor:pointer; color:#000; }

    .services-grid { max-width: 1250px; margin: 30px auto; padding: 0 20px; display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 20px; }
    .service-card { background: var(--card); padding: 25px; border-radius: 20px; border-left: 4px solid var(--primary); }
    .small-desc { font-size: 0.8rem; color: #aaa; margin-top: 8px; line-height: 1.5; }

    .btn-action { background: var(--primary); color: white; border: none; padding: 12px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; }
    .course-grid-internal { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    
    @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @media (max-width: 768px) { .main-container, .services-grid, .course-grid-internal { grid-template-columns: 1fr; } }
</style>
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Tải dữ liệu Bảng Vàng
    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) htmlContent += `<div class="student-item"><img src="${link}" loading="lazy"></div>`;
      });
      studentData = htmlContent + htmlContent;
    } catch (e) { studentData = "<p>Đang tải dữ liệu...</p>"; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/khomos") content = this.getKhoMosUI();
    else if (path === "/login") content = this.getLoginUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  // --- PHẦN 2: NỘI DUNG CHI TIẾT (HTML) ---
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
                  <p>🔥 <b>SIÊU ƯU ĐÃI ĐẶC BIỆT</b><br>Mua 3 khóa tính tiền 2<br><span class="highlight-text">Tiết kiệm ngay 400k</span></p>
              </div>
              <div class="section-card wheel-card">
                  <h3 class="wheel-title-mini">VÒNG QUAY MAY MẮN</h3>
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
                      <input type="tel" placeholder="Số điện thoại" id="w-phone" style="width:100%; padding:10px; margin-bottom:10px; background:#000; border:1px solid #333; color:#fff; border-radius:8px;">
                  </div>
                  <button class="btn-action" onclick="spinWheel()">QUAY NGAY</button>
              </div>
          </div>

          <div class="right-col">
              <div class="section-card bang-vang-section">
                  <h3 style="text-align:center; color:#FFD700; margin-bottom:15px;">🏆 BẢNG VÀNG CHỨNG CHỈ</h3>
                  <div class="carousel-viewport"><div class="carousel-track">${studentData}</div></div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card"><h4>Thi Thật 100%</h4><p class="small-desc">Giao diện mô phỏng chuẩn IIG quốc tế.</p></div>
          <div class="service-card ai-chat-card">
              <h4 style="color:var(--cyan);">AI Assistant 24/7 ✨</h4>
              <div class="chat-input-box"><input type="text" placeholder="Hỏi MOS360 về lộ trình học..."><button>GỬI</button></div>
          </div>
          <div class="service-card"><h4>Đồng Hành</h4><p class="small-desc">Hỗ trợ các tip định dạng, bố cục luận văn, đề án và tin học công sở.</p></div>
      </div>
    `;
  },

  getCoursesUI() {
    return `
      <div class="section-card" style="max-width:900px; margin:40px auto;">
          <h2 style="text-align:center; color:var(--primary); margin-bottom:20px;">CHỌN KHÓA HỌC (ĐỒNG GIÁ 400K)</h2>
          <div class="course-grid-internal">
              <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px;">
                  <h3 style="color:var(--cyan); margin-bottom:15px;"><img src="https://cdn-icons-png.flaticon.com/512/1554/1554527.png" width="20"> MOS 2019 (Offline)</h3>
                  <label style="display:block; padding:10px; background:#000; margin-bottom:8px; border-radius:8px;"><input type="checkbox" class="course-check"> Word 2019</label>
                  <label style="display:block; padding:10px; background:#000; margin-bottom:8px; border-radius:8px;"><input type="checkbox" class="course-check"> Excel 2019</label>
                  <label style="display:block; padding:10px; background:#000; margin-bottom:8px; border-radius:8px;"><input type="checkbox" class="course-check"> PowerPoint 2019</label>
              </div>
              <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px;">
                  <h3 style="color:var(--cyan); margin-bottom:15px;"><img src="https://cdn-icons-png.flaticon.com/512/2675/2675848.png" width="20"> MOS 365 (Online)</h3>
                  <label style="display:block; padding:10px; background:#000; margin-bottom:8px; border-radius:8px;"><input type="checkbox" class="course-check"> Word 365</label>
                  <label style="display:block; padding:10px; background:#000; margin-bottom:8px; border-radius:8px;"><input type="checkbox" class="course-check"> Excel 365</label>
                  <label style="display:block; padding:10px; background:#000; margin-bottom:8px; border-radius:8px;"><input type="checkbox" class="course-check"> PowerPoint 365</label>
              </div>
          </div>
          <div style="text-align:center; margin-top:30px;">
              <p>Tổng thanh toán: <span id="total-price" style="font-size:2.5rem; color:var(--primary); font-weight:800;">0</span> VNĐ</p>
              <button class="btn-action" style="max-width:300px; margin-top:15px;">ĐĂNG KÝ NGAY</button>
          </div>
      </div>
      <script>
          document.querySelectorAll('.course-check').forEach(box => {
              box.addEventListener('change', () => {
                  const count = document.querySelectorAll('.course-check:checked').length;
                  let total = count * 400000;
                  if(count >= 3) total = (count * 400000) - (Math.floor(count/3) * 400000);
                  document.getElementById('total-price').innerText = total.toLocaleString();
              });
          });
      </script>
    `;
  },

  layout(content) {
    return `<!DOCTYPE html><html lang="vi"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    ${STYLES}
    </head><body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
        <nav><a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/khomos">Kho MOS</a><a href="/login" style="color:var(--primary)">Học Viên</a></nav>
    </header>
    <main>${content}</main>
    <footer style="padding:40px 5%; background:#050505; border-top:1px solid var(--border); margin-top:50px;">
        <div style="max-width:1250px; margin:0 auto; display:grid; grid-template-columns:1.2fr 1fr 1fr; gap:30px;">
            <div>
                <h2 style="color:var(--primary); margin-bottom:10px;">MOS360.VN</h2>
                <p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
                <p>📞 Hotline: 0912.888.360</p>
            </div>
            <div>
                <h4 style="color:var(--cyan); margin-bottom:10px;">LỊCH LÀM VIỆC</h4>
                <p>Thứ 2 - Thứ 7: 08:00 – 21:00</p><p>Chủ Nhật: 08:00 – 17:00</p>
            </div>
            <div style="height:180px; border-radius:15px; overflow:hidden; border:1px solid #333;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14909.11111!2d106.6777!3d20.8444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af!2zNTcgTMOqIFbEg24gVGh1eeG6v3QgQSwgQW4gQmmnbiwgSMO0bmcgQsOgbGcsIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2svn!4v1700000000000" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    <script>
        function spinWheel() {
            const wheel = document.getElementById('main-wheel');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transition = 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)';
            wheel.style.transform = 'rotate(' + deg + 'deg)';
        }
    </script>
    </body></html>`;
  },
  getKhoMosUI() { return `<div class="section-card" style="max-width:800px; margin:40px auto; text-align:center;"><h2>📦 KHO TÀI LIỆU MOS</h2><p>Dữ liệu đang cập nhật...</p></div>`; },
  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto; text-align:center;"><h2>HỌC VIÊN ĐĂNG NHẬP</h2><input type="text" placeholder="Số điện thoại" style="width:100%; padding:12px; margin:15px 0; background:#000; border:1px solid #333; color:white; border-radius:8px;"><button class="btn-action">VÀO HỆ THỐNG</button></div>`; }
};
