const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

const STYLES = `
<style>
    :root { --primary: #FF5722; --bg: #0A0A0A; --card: #161616; --text: #FFFFFF; --border: rgba(255,255,255,0.1); --cyan: #00F2FF; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

    header { padding: 12px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(10,10,10,0.9); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
    .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; }
    .brand img { height: 32px; }
    
    .social-nav { display: flex; gap: 12px; }
    .social-nav img { width: 24px; height: 24px; border-radius: 5px; }

    .main-container { max-width: 1250px; margin: 20px auto; padding: 0 15px; display: grid; grid-template-columns: 300px 1fr; gap: 20px; }
    .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 20px; }

    /* BẢNG VÀNG - KHỐNG CHẾ CHỐNG TRÀN TUYỆT ĐỐI */
    .bang-vang-section { height: 450px; overflow: hidden; display: flex; flex-direction: column; }
    .carousel-viewport { 
        flex: 1; 
        width: 100%; 
        overflow: hidden; 
        position: relative; 
        background: #000; 
        border-radius: 12px;
        display: flex;
        align-items: center;
    }
    .carousel-track { 
        display: flex; 
        gap: 30px; 
        animation: scroll 60s linear infinite; 
        height: 100%;
        align-items: center;
        width: max-content;
    }
    .student-item { 
        height: 100%; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        flex-shrink: 0;
    }
    .student-item img { 
        max-height: 80%; 
        max-width: 100%; 
        width: auto; 
        object-fit: contain; 
        border-radius: 8px;
    }

    /* AI Chat & Services */
    .services-grid { max-width: 1250px; margin: 20px auto; padding: 0 15px; display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 15px; }
    .service-card { background: var(--card); padding: 20px; border-radius: 15px; border-left: 4px solid var(--primary); }
    .chat-box { display: flex; background: #000; border: 1px solid #333; border-radius: 10px; margin-top: 10px; padding: 10px; min-height: 60px; }
    .chat-box input { flex: 1; background: transparent; border: none; color: #fff; outline: none; padding: 0 10px; }
    .chat-box button { background: var(--cyan); border: none; padding: 0 20px; border-radius: 6px; font-weight: bold; cursor: pointer; }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .main-container, .services-grid { grid-template-columns: 1fr; }
        header { padding: 10px 15px; }
        .social-nav { gap: 8px; }
        .bang-vang-section { height: 350px; }
        .student-item img { max-height: 70%; }
    }

    @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
</style>
`;

export default {
  async fetch(request, env) {
    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          htmlContent += `<div class="student-item"><img src="${link}" alt="Chung chi"></div>`;
        }
      });
      studentData = htmlContent + htmlContent; 
    } catch (e) { studentData = "Đang tải dữ liệu..."; }

    const content = `
      <div class="main-container">
          <div class="left-col">
              <div class="section-card" style="margin-bottom:20px; text-align:center; border: 1px dashed var(--primary);">
                  <p>🔥 <b>SIÊU ƯU ĐÃI ĐẶC BIỆT</b><br>Mua 3 khóa tính tiền 2<br><span style="color:var(--primary); font-weight:800;">Tiết kiệm ngay 400k</span></p>
              </div>
              <div class="section-card" style="text-align:center;">
                  <h3 style="font-size:0.8rem; color:#888; margin-bottom:15px;">VÒNG QUAY MAY MẮN</h3>
                  <div style="position:relative; width:160px; height:160px; margin: 0 auto 15px;">
                      <div style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); border-top:15px solid #FFD700; border-left:8px solid transparent; border-right:8px solid transparent; z-index:10;"></div>
                      <div id="wheel" style="width:100%; height:100%; border-radius:50%; border:5px solid #222; background:conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg);"></div>
                  </div>
                  <button class="btn-action" style="background:var(--primary); color:white; border:none; width:100%; padding:10px; border-radius:50px; font-weight:800; cursor:pointer;" onclick="spin()">QUAY NGAY</button>
              </div>
          </div>
          <div class="right-col">
              <div class="section-card bang-vang-section">
                  <h3 style="text-align:center; color:#FFD700; margin-bottom:10px;">🏆 BẢNG VÀNG CHỨNG CHỈ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card"><h4>Thi Thật 100%</h4><p style="font-size:0.75rem; color:#888; margin-top:5px;">Mô phỏng chuẩn IIG quốc tế.</p></div>
          <div class="service-card">
              <h4 style="color:var(--cyan);">AI Assistant 24/7 ✨</h4>
              <div class="chat-box"><input type="text" placeholder="Hỏi về lộ trình MOS..."><button>GỬI</button></div>
          </div>
          <div class="service-card"><h4>Đồng Hành</h4><p style="font-size:0.75rem; color:#888; margin-top:5px; line-height:1.4;">Hỗ trợ các tip định dạng, bố cục luận văn, đề án và tin học công sở.</p></div>
      </div>
    `;

    return new Response(`<!DOCTYPE html><html><head>
      <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${CONFIG.TITLE}</title>
      ${STYLES}
      </head><body>
      <header>
          <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
          <nav class="social-nav">
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png"></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png"></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968771.png"></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"></a>
          </nav>
      </header>
      ${content}
      <footer style="padding:30px 5%; background:#050505; border-top:1px solid var(--border); margin-top:30px;">
          <div style="max-width:1250px; margin:0 auto; display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px;">
              <div><h3>MOS360.VN</h3><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p></div>
              <div><h4>LỊCH LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00</p><p>CN & Lễ: Nghỉ</p></div>
              <div style="height:150px; border-radius:10px; overflow:hidden;"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d465.7483486333912!2d106.6775618!3d20.850438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1710000000000" width="100%" height="100%" style="border:0;"></iframe></div>
          </div>
      </footer>
      <script>
          function spin() {
              const wheel = document.getElementById('wheel');
              const deg = 3600 + Math.random() * 360;
              wheel.style.transition = 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)';
              wheel.style.transform = 'rotate(' + deg + 'deg)';
          }
      </script>
      </body></html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
