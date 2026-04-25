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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Hệ Thống Luyện Thi Thực Chiến</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

            header { padding: 15px 50px; display: flex; justify-content: space-between; align-items: center; background: rgba(8,8,8,0.95); border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; }
            .brand img { width: 40px; }

            .hero { text-align: center; padding: 40px 20px; }
            .hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 5px; }
            .hero p { color: #FF5722; font-weight: 600; }

            .main-container { max-width: 1300px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: 380px 1fr; gap: 25px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 30px; position: relative; }

            /* VÒNG QUAY CHUẨN - CĂN GIỮA CHỮ TUYỆT ĐỐI */
            .wheel-wrapper { position: relative; width: 280px; height: 280px; margin: 0 auto 20px; }
            .wheel-pointer { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 20px solid #FFD700; z-index: 10; }
            
            .wheel-circle { 
                width: 100%; height: 100%; border-radius: 50%; border: 6px solid #FFD700; 
                background: conic-gradient(#ff6b6b 0deg 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); 
                position: relative; animation: spin 20s linear infinite;
            }

            .wheel-text-container { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
            
            /* Mỗi nan quạt là 90 độ, ta đặt text ở góc giữa là 45, 135, 225, 315 */
            .wheel-text {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                display: flex;
                justify-content: center; /* Căn giữa theo phương ngang của nan */
                align-items: flex-start; /* Đẩy lên phía mép ngoài */
                padding-top: 35px; /* Khoảng cách từ mép vào trong */
            }
            .wheel-text b { 
                color: white; font-size: 0.8rem; font-weight: 900; 
                text-shadow: 0 2px 4px rgba(0,0,0,0.8); white-space: nowrap; 
            }

            .t1 { transform: rotate(45deg); }
            .t2 { transform: rotate(135deg); }
            .t3 { transform: rotate(225deg); }
            .t4 { transform: rotate(315deg); }

            .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: white; border-radius: 50%; z-index: 5; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #000; font-size: 0.7rem; }

            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            /* BẢNG VÀNG */
            .carousel-track { display: flex; gap: 15px; animation: scroll 40s linear infinite; width: max-content; }
            .student-item img { width: 450px; height: 320px; border-radius: 12px; object-fit: contain; background: #000; border: 1px solid var(--border); }
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            /* GRID TIỆN ÍCH - FIX LỖI MẤT AI */
            .services-grid { max-width: 1300px; margin: 30px auto; padding: 0 20px; display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 20px; }
            .service-item { background: var(--card); padding: 25px; border-radius: 20px; border: 1px solid var(--border); border-left: 4px solid var(--primary); }
            
            .ai-box { border-color: var(--cyan); border-left-width: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 160px; }
            .ai-input-wrapper { display: flex; background: #000; border: 1px solid #333; border-radius: 10px; padding: 4px; margin-top: 10px; }
            .ai-input-wrapper input { flex: 1; background: transparent; border: none; padding: 10px; color: white; outline: none; font-size: 0.9rem; }
            .ai-input-wrapper button { background: var(--cyan); border: none; padding: 0 15px; border-radius: 8px; font-weight: 800; cursor: pointer; }

            .btn-orange { background: #E64A19; color: white; border: none; padding: 15px; border-radius: 50px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 10px; }

            footer { text-align: center; padding: 40px; color: #666; font-size: 0.8rem; border-top: 1px solid var(--border); margin-top: 40px; }

            @media (max-width: 900px) { .main-container, .services-grid { grid-template-columns: 1fr; } .student-item img { width: 320px; height: 220px; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand"><img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true"> <span>MOS360</span></a>
        <div style="background:var(--primary); padding:8px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; cursor:pointer;">ĐĂNG NHẬP</div>
    </header>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p>Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="main-container">
        <div class="section-card" style="text-align:center;">
            <p style="margin-bottom:20px; font-weight:700;">🎡 Vòng Quay May Mắn</p>
            <div class="wheel-wrapper">
                <div class="wheel-pointer"></div>
                <div class="wheel-circle">
                    <div class="wheel-text-container">
                        <div class="wheel-text t1"><b>GIẢM 50K</b></div>
                        <div class="wheel-text t2"><b>GIẢM 50%</b></div>
                        <div class="wheel-text t3"><b>GIẢM 100K</b></div>
                        <div class="wheel-text t4"><b>GIẢM 80%</b></div>
                    </div>
                </div>
                <div class="wheel-center">QUAY</div>
            </div>
            <button class="btn-orange">NHẬN QUÀ NGAY</button>
        </div>

        <div class="section-card">
            <p style="margin-bottom:20px; font-weight:700;">🏆 Bảng Vàng Chứng Chỉ (Ảnh To)</p>
            <div style="overflow:hidden;">
                <div class="carousel-track">
                    ${studentData}
                </div>
            </div>
        </div>
    </div>

    <div class="services-grid">
        <div class="service-item">
            <h4 style="color:var(--primary)">Thi Thật 100%</h4>
            <p style="font-size:0.85rem; color:#aaa; margin-top:8px;">Hệ thống mô phỏng sát 100% đề thi quốc tế của Certiport.</p>
        </div>

        <div class="service-item ai-box">
            <h4 style="color:var(--cyan)">AI Assistant 24/7 ✨</h4>
            <p style="font-size:0.8rem; color:#aaa;">Hỏi đáp kiến thức tin học và các hàm Excel nhanh chóng:</p>
            <div class="ai-input-wrapper">
                <input type="text" placeholder="Nhập câu hỏi tại đây...">
                <button>GỬI</button>
            </div>
        </div>

        <div class="service-item">
            <h4 style="color:var(--primary)">Thực Chiến</h4>
            <p style="font-size:0.85rem; color:#aaa; margin-top:8px;">Hỗ trợ định dạng luận văn, đồ án chuyên nghiệp trọn đời.</p>
        </div>
    </div>

    <footer>
        <p>© 2026 MOS360.VN - 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
        <p>Hotline: 0912.888.360 | Email: info@mos360.vn</p>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
