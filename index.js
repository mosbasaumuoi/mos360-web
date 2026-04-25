export default {
  async fetch(request, env) {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv";

    let studentData = "";
    try {
      const response = await fetch(sheetUrl);
      const tsvData = await response.text();
      const rows = tsvData.split('\n').slice(1); 
      
      let htmlContent = "";
      rows.forEach(row => {
        const columns = row.split('\t');
        const link = columns[0] ? columns[0].trim() : "";
        if (link && link.startsWith('http')) {
          htmlContent += `
            <div class="student-item">
              <img src="${link}" onerror="this.src='https://via.placeholder.com/520x360?text=MOS360'">
            </div>`;
        }
      });
      studentData = htmlContent + htmlContent; 
    } catch (e) {
      studentData = "<p style='color:#888;'>Đang tải danh sách chứng chỉ...</p>";
    }

    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>MOS360 - Luyện thi thực chiến</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
            
            /* RESET & LOCK OVERFLOW */
            * { box-sizing: border-box; margin: 0; padding: 0; }
            html, body { width: 100%; overflow-x: hidden; background: var(--bg); color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; }

            header { width: 100%; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.2rem; }
            .brand img { width: 35px; }

            .hero { text-align: center; padding: 40px 20px; }
            .hero h1 { font-size: 2.2rem; font-weight: 800; margin-bottom: 10px; }
            .hero p { color: var(--primary); font-weight: 700; font-size: 1rem; }

            /* LAYOUT CHÍNH */
            .main-grid { 
                max-width: 1300px; 
                margin: 0 auto; 
                padding: 0 20px; 
                display: grid; 
                grid-template-columns: 350px 1fr; 
                gap: 20px; 
                width: 100%;
            }

            .card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 25px; position: relative; }

            /* VÒNG QUAY - GIỮ NGUYÊN CÔNG THỨC CĂN CHỈNH */
            .wheel-outer { position: relative; width: 260px; height: 260px; margin: 0 auto 20px; }
            .wheel-pin { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 22px solid #FFD700; z-index: 20; }
            .wheel-main { 
                width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; 
                background: conic-gradient(#ff6b6b 0deg 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); 
                position: relative; animation: spin 20s linear infinite; 
            }
            .wheel-txt-layer { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
            .wheel-txt { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: flex-start; padding-top: 35px; }
            .wheel-txt b { color: white; font-size: 0.75rem; font-weight: 900; text-shadow: 0 2px 4px rgba(0,0,0,0.8); transform: rotate(0deg); }
            .wt1 { transform: rotate(45deg); } .wt2 { transform: rotate(135deg); } .wt3 { transform: rotate(225deg); } .wt4 { transform: rotate(315deg); }
            .wheel-hub { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 55px; height: 55px; background: white; border-radius: 50%; z-index: 10; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #000; font-size: 0.7rem; box-shadow: 0 0 15px rgba(0,0,0,0.3); }

            /* BẢNG VÀNG - FIX LỖI TRÀN ẢNH */
            .slider-box { width: 100%; overflow: hidden; border-radius: 15px; margin-top: 15px; }
            .slider-track { display: flex; gap: 15px; animation: scroll 40s linear infinite; width: max-content; }
            .student-item { width: 450px; flex-shrink: 0; }
            .student-item img { width: 100%; height: 320px; border-radius: 12px; object-fit: contain; background: #000; border: 1px solid var(--border); }

            /* AI & SERVICES */
            .services-grid { max-width: 1300px; margin: 30px auto; padding: 0 20px; display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 20px; }
            .service-item { background: var(--card); padding: 20px; border-radius: 20px; border: 1px solid var(--border); border-left: 4px solid var(--primary); }
            .ai-item { border-color: var(--cyan); border-left-width: 4px; }
            .ai-input { display: flex; background: #000; border: 1px solid #333; border-radius: 10px; padding: 5px; margin-top: 10px; }
            .ai-input input { flex: 1; background: transparent; border: none; padding: 8px; color: white; outline: none; }
            .ai-input button { background: var(--cyan); border: none; padding: 0 15px; border-radius: 6px; font-weight: 800; cursor: pointer; }

            .btn-orange { background: #E64A19; color: white; border: none; padding: 15px; border-radius: 50px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 15px; text-transform: uppercase; }

            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            footer { text-align: center; padding: 30px; border-top: 1px solid var(--border); margin-top: 40px; font-size: 0.8rem; color: #666; }

            /* RESPONSIVE */
            @media (max-width: 950px) {
                .main-grid, .services-grid { grid-template-columns: 1fr; }
                .student-item { width: 85vw; }
                .student-item img { height: 220px; }
            }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand"><img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true"> <span>MOS360</span></a>
        <div style="background:var(--primary); padding:8px 18px; border-radius:8px; font-weight:700; font-size:0.85rem;">ĐĂNG NHẬP</div>
    </header>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p>Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="main-grid">
        <div class="card" style="text-align:center;">
            <p style="font-weight:700; margin-bottom:15px; font-size:0.9rem;">🎡 Vòng Quay May Mắn</p>
            <div class="wheel-outer">
                <div class="wheel-pin"></div>
                <div class="wheel-main">
                    <div class="wheel-txt-layer">
                        <div class="wheel-txt wt1"><b>GIẢM 50K</b></div>
                        <div class="wheel-txt wt2"><b>GIẢM 50%</b></div>
                        <div class="wheel-txt wt3"><b>GIẢM 100K</b></div>
                        <div class="wheel-txt wt4"><b>GIẢM 80%</b></div>
                    </div>
                </div>
                <div class="wheel-hub">QUAY</div>
            </div>
            <button class="btn-orange">NHẬN QUÀ NGAY</button>
        </div>

        <div class="card">
            <p style="font-weight:700; margin-bottom:10px; font-size:0.9rem;">🏆 Bảng Vàng Chứng Chỉ</p>
            <div class="slider-box">
                <div class="slider-track">
                    ${studentData}
                </div>
            </div>
        </div>
    </div>

    <div class="services-grid">
        <div class="service-item">
            <h4 style="color:var(--primary)">Thi Thật 100%</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:5px;">Hệ thống mô phỏng chuẩn quốc tế Certiport.</p>
        </div>

        <div class="service-item ai-item">
            <h4 style="color:var(--cyan)">AI Assistant 24/7 ✨</h4>
            <div class="ai-input">
                <input type="text" placeholder="Hỏi về Excel, Word...">
                <button>GỬI</button>
            </div>
        </div>

        <div class="service-item">
            <h4 style="color:var(--primary)">Thực Chiến</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:5px;">Hỗ trợ đồ án & kỹ năng văn phòng trọn đời.</p>
        </div>
    </div>

    <footer>
        <p>© 2026 MOS360.VN - 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
        <p>Hotline: 0912.888.360 | Chuyên nghiệp - Tận tâm - Thực chiến</p>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
