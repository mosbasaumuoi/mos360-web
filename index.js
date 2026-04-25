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
        <title>MOS360 - Luyện thi MOS 1000</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }

            header { padding: 15px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.95); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.4rem; }
            .brand img { width: 40px; }

            .hero { text-align: center; padding: 60px 20px 30px; }
            .hero h1 { font-size: 3.2rem; font-weight: 800; margin-bottom: 8px; }
            .hero p { color: #aaa; font-size: 1.1rem; }

            .main-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 420px 1fr; gap: 30px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 40px; text-align: center; }

            /* GIẢI PHÁP VÒNG QUAY MỚI: CĂN GIỮA TUYỆT ĐỐI */
            .wheel-box { position: relative; width: 300px; height: 300px; margin: 0 auto 30px; }
            .wheel-pointer { 
                position: absolute; top: -12px; left: 50%; transform: translateX(-50%); 
                width: 0; height: 0; border-left: 15px solid transparent; 
                border-right: 15px solid transparent; border-top: 25px solid #FFD700; z-index: 100; 
            }
            
            .wheel-circle { 
                width: 100%; height: 100%; border-radius: 50%; border: 8px solid #FFD700; 
                background: conic-gradient(#ff6b6b 0deg 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); 
                position: relative; animation: spin 20s linear infinite; overflow: hidden;
            }

            /* Container cho mỗi nhãn, xoay theo nan */
            .slice-label {
                position: absolute;
                width: 50%; height: 50%;
                top: 50%; left: 50%;
                transform-origin: 0 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .slice-label span {
                transform: rotate(45deg); /* Xoay ngược lại 45 độ để chữ nằm ngang theo nan quạt */
                font-weight: 900;
                font-size: 0.85rem;
                color: white;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                white-space: nowrap;
                margin-left: 60px; /* Đẩy chữ ra xa tâm */
            }

            /* Định vị 4 vùng nhãn vào 4 nan */
            .s1 { transform: rotate(-90deg); }
            .s2 { transform: rotate(0deg); }
            .s3 { transform: rotate(90deg); }
            .s4 { transform: rotate(180deg); }

            .wheel-center { 
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                width: 70px; height: 70px; background: white; border-radius: 50%; z-index: 50; 
                display: flex; align-items: center; justify-content: center; 
                font-weight: 900; color: #000; font-size: 0.8rem; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
            
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            /* BẢNG VÀNG - ĐÃ GIỮ NGUYÊN */
            .carousel-viewport { width: 100%; overflow: hidden; margin-top: 20px; }
            .carousel-track { display: flex; gap: 20px; animation: scroll 45s linear infinite; width: max-content; }
            .student-item { width: 520px; flex-shrink: 0; }
            .student-item img { width: 100%; height: 360px; border-radius: 15px; border: 2px solid var(--border); object-fit: contain; background: #000; }
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            .btn-action { background: #E64A19; color: white; border: none; padding: 18px; border-radius: 100px; font-weight: 800; width: 100%; cursor: pointer; text-transform: uppercase; margin-top: 15px; transition: 0.3s; }
            .btn-action:hover { background: #FF5722; transform: scale(1.02); }

            .services-grid { max-width: 1400px; margin: 50px auto; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .service-card { background: var(--card); padding: 35px; border-radius: 28px; border: 1px solid var(--border); border-left: 4px solid var(--primary); }

            footer { padding: 40px; background: #050505; border-top: 1px solid var(--border); text-align: center; }

            @media (max-width: 1024px) { .main-container, .services-grid { grid-template-columns: 1fr; } .student-item { width: 320px; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand"><img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true"> <span>MOS360</span></a>
        <a href="https://mos360.vn" target="_blank" style="background:var(--primary); color:white; padding:10px 22px; border-radius:10px; text-decoration:none; font-weight:700;">Đăng nhập</a>
    </header>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p>Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="main-container">
        <div class="section-card">
            <h3 style="color:var(--primary); margin-bottom:25px;">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-box">
                <div class="wheel-pointer"></div>
                <div class="wheel-circle">
                    <div class="slice-label s1"><span>GIẢM 50K</span></div>
                    <div class="slice-label s2"><span>GIẢM 50%</span></div>
                    <div class="slice-label s3"><span>GIẢM 100K</span></div>
                    <div class="slice-label s4"><span>GIẢM 80%</span></div>
                </div>
                <div class="wheel-center">QUAY</div>
            </div>
            <button class="btn-action">NHẬN QUÀ NGAY</button>
        </div>

        <div class="section-card" style="text-align:left;">
            <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="carousel-viewport">
                <div class="carousel-track">
                    ${studentData}
                </div>
            </div>
        </div>
    </div>

    <div class="services-grid">
        <div class="service-card"><h3>Thi Thật 100%</h3><p>Hệ thống mô phỏng sát 100% đề thi quốc tế.</p></div>
        <div class="service-card" style="border-color:var(--cyan)"><h3>AI Assistant 24/7</h3><p>Hỗ trợ giải đáp kiến thức tin học tức thì.</p></div>
        <div class="service-card"><h3>Thực Chiến</h3><p>Hỗ trợ định dạng luận văn, đồ án chuyên nghiệp.</p></div>
    </div>

    <footer>
        <p style="color:#666;">© 2026 MOS360.VN - Hotline: 0912.888.360</p>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
