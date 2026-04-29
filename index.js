const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

const STYLES = `
<style>
    :root { --primary: #FF5722; --bg: #0A0A0A; --card: #161616; --text: #FFFFFF; --cyan: #00F2FF; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; width: 100%; }

    header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(10,10,10,0.95); position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.2rem; }
    .brand img { height: 35px; }
    
    /* 5 Nút liên kết MXH */
    .social-nav { display: flex; gap: 12px; }
    .social-nav a img { width: 28px; height: 28px; border-radius: 6px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }

    .main-container { max-width: 1250px; margin: 20px auto; padding: 0 15px; display: grid; grid-template-columns: 320px 1fr; gap: 20px; }
    .section-card { background: var(--card); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 20px; }

    /* BẢNG VÀNG: KHÔNG TRÀN - CHẠY MƯỢT TRÊN MOBILE */
    .bv-section { height: 480px; overflow: hidden; display: flex; flex-direction: column; position: relative; width: 100%; }
    .bv-viewport { flex: 1; width: 100%; overflow: hidden; background: #000; border-radius: 16px; position: relative; display: flex; align-items: center; }
    .bv-track { display: flex; height: 100%; animation: scroll-bv 80s linear infinite; width: max-content; }
    .st-item { flex: 0 0 auto; width: 350px; height: 100%; display: flex; align-items: center; justify-content: center; padding: 0 15px; }
    .st-item img { max-height: 85%; max-width: 100%; object-fit: contain; border-radius: 12px; }

    /* AI Assistant: Rộng & Cao */
    .ai-chat-box { width: 100%; background: #000; border-radius: 12px; border: 1px solid #333; display: flex; min-height: 80px; padding: 12px; margin-top: 15px; }
    .ai-chat-box input { flex: 1; background: transparent; border: none; color: white; padding: 0 15px; outline: none; font-size: 1rem; }
    .ai-chat-box button { background: var(--cyan); border: none; padding: 0 35px; border-radius: 8px; font-weight: 800; cursor: pointer; color: #000; }

    .services-grid { max-width: 1250px; margin: 20px auto; padding: 0 15px; display: grid; grid-template-columns: 1fr 1.8fr 1.5fr; gap: 20px; }
    .service-card { background: var(--card); padding: 25px; border-radius: 20px; border-left: 4px solid var(--primary); }
    
    @keyframes scroll-bv { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    @media (max-width: 768px) {
        .main-container, .services-grid { grid-template-columns: 1fr; }
        .st-item { width: 280px; }
        .bv-section { height: 350px; }
    }
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
          htmlContent += `<div class="st-item"><img src="${link}" loading="lazy"></div>`;
        }
      });
      studentData = htmlContent + htmlContent; 
    } catch (e) { studentData = "<p style='padding:20px;'>Đang tải dữ liệu...</p>"; }

    const finalHTML = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    ${STYLES}
</head>
<body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
        <nav class="social-nav">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="Zalo"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968771.png" alt="Messenger"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok"></a>
        </nav>
        <link rel="stylesheet" href="/css/style.css">
    </header>

    <div class="main-container">
        <div class="left-col">
            <div class="section-card" style="margin-bottom:20px; border: 1px dashed var(--primary); text-align:center;">
                <p>🔥 <b>SIÊU ƯU ĐÃI ĐẶC BIỆT</b><br>Mua 3 khóa tính tiền 2<br><span style="color:var(--primary); font-weight:800; font-size:1.1rem; display:block; margin-top:5px;">Tiết kiệm ngay 400k</span></p>
            </div>
            <div class="section-card" style="text-align:center;">
                <h3 style="font-size:0.8rem; color:#888; margin-bottom:15px; text-transform:uppercase;">Vòng quay may mắn</h3>
                <div style="position:relative; width:180px; height:180px; margin: 0 auto 20px;">
                    <div style="position:absolute; top:-15px; left:50%; transform:translateX(-50%); border-top:25px solid #FFD700; border-left:10px solid transparent; border-right:10px solid transparent; z-index:10;"></div>
                    <div id="wheel" style="width:100%; height:100%; border-radius:50%; border:6px solid #222; background:conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); transition: transform 5s cubic-bezier(0.1, 0, 0.1, 1);"></div>
                </div>
                <button onclick="spin()" style="background:var(--primary); color:white; border:none; width:100%; padding:14px; border-radius:50px; font-weight:800; cursor:pointer;">QUAY NGAY</button>
            </div>
        </div>

        <div class="right-col">
            <div class="section-card bv-section">
                <h3 style="text-align:center; color:#FFD700; margin-bottom:15px; font-weight:800;">🏆 BẢNG VÀNG CHỨNG CHỈ</h3>
                <div class="bv-viewport">
                    <div class="bv-track">${studentData}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="services-grid">
        <div class="service-card">
            <h4>Thi Thật 100%</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:8px;">Hệ thống mô phỏng chuẩn IIG quốc tế.</p>
        </div>
        <div class="service-card">
            <h4 style="color:var(--cyan);">AI Assistant 24/7 ✨</h4>
            <div class="ai-chat-box">
                <input type="text" placeholder="Hỏi về lộ trình, tip thi MOS...">
                <button>GỬI</button>
            </div>
        </div>
        <div class="service-card">
            <h4>Đồng Hành</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:8px; line-height:1.5;">Hỗ trợ các tip định dạng, bố cục luận văn, đề án và tin học công sở.</p>
        </div>
    </div>

    <footer style="background:#050505; border-top:1px solid rgba(255,255,255,0.1); padding:40px 5%; margin-top:30px;">
        <div style="max-width:1250px; margin:0 auto; display:grid; grid-template-columns: 1fr 1fr 1.2fr; gap:30px;">
            <div>
                <h3 style="color:var(--primary); margin-bottom:10px;">MOS360.VN</h3>
                <p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
                <p>📞 Hotline: 0912.888.360</p>
            </div>
            <div>
                <h4 style="color:var(--cyan); margin-bottom:10px; font-size:0.9rem; letter-spacing:1px;">LỊCH LÀM VIỆC</h4>
                <p style="color:#eee; font-weight:600;">Thứ 2 - Thứ 7: 08:00 – 17:00</p>
                <p style="color:#888;">Chủ Nhật & Lễ: Nghỉ</p>
            </div>
            <div style="height:150px; border-radius:15px; overflow:hidden; border:1px solid #333;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.484252516484!2d106.677!3d20.846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDUwJzQ1LjYiTiAxMDbCsDQwJzM3LjIiRQ!5e0!3m2!1svi!2s!4v1700000000000" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>

    <script>
        function spin() {
            const wheel = document.getElementById('wheel');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transform = 'rotate(' + deg + 'deg)';
        }
    </script>
</body>
</html>`;

    return new Response(finalHTML, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
