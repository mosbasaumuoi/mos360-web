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
        <title>MOS360 - Bảng Vàng Chứng Chỉ</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }

            header { padding: 15px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.95); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.4rem; }
            .brand img { width: 40px; }

            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
            .social-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: 0.3s; }
            .social-item:hover { border-color: var(--primary); transform: scale(1.15); }
            .social-item img, .social-item svg { width: 22px; height: 22px; }

            .hero { text-align: center; padding: 60px 20px 30px; }
            .hero h1 { font-size: 3.2rem; font-weight: 800; }

            .main-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 420px 1fr; gap: 30px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 40px; text-align: center; overflow: hidden; }

            /* VÒNG QUAY - CĂN CHỈNH TRUNG TÂM NAN TUYỆT ĐỐI */
            .wheel-box { position: relative; width: 300px; height: 300px; margin: 0 auto 25px; }
            .wheel-pointer { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #FFD700; z-index: 40; }
            .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 8px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); position: relative; animation: spin 20s linear infinite; }
            .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 72px; height: 72px; background: white; border-radius: 50%; z-index: 50; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #000; font-size: 0.8rem; }
            
            /* Giải pháp căn giữa: Xoay toàn bộ container nhãn và dùng Flexbox căn đỉnh */
            .wheel-label-container { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
            .wheel-label { 
                position: absolute; 
                top: 0; left: 0; width: 100%; height: 100%;
                display: flex;
                justify-content: center; 
                align-items: flex-start;
                padding-top: 40px; /* Khoảng cách từ mép nan vào trung tâm */
            }
            .wheel-label b { 
                font-size: 0.85rem; 
                font-weight: 900; 
                color: white; 
                text-shadow: 0 2px 4px rgba(0,0,0,0.6); 
                white-space: nowrap;
            }
            /* Mỗi nan 90 độ, đặt góc xoay ở trung tuyến (45, 135, 225, 315) */
            .l1 { transform: rotate(45deg); } 
            .l2 { transform: rotate(135deg); } 
            .l3 { transform: rotate(225deg); } 
            .l4 { transform: rotate(315deg); } 
            
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            /* BẢNG VÀNG - ẢNH TO */
            .carousel-viewport { width: 100%; overflow: hidden; margin-top: 20px; }
            .carousel-track { display: flex; gap: 20px; animation: scroll 45s linear infinite; width: max-content; }
            .carousel-track:hover { animation-play-state: paused; }
            .student-item { width: 520px; flex-shrink: 0; }
            .student-item img { width: 100%; height: 360px; border-radius: 15px; border: 2px solid var(--border); object-fit: contain; background: #000; transition: 0.3s; }
            
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            .services-grid { max-width: 1400px; margin: 50px auto; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .service-card { background: var(--card); padding: 35px; border-radius: 28px; border: 1px solid var(--border); border-left: 4px solid var(--primary); display: flex; flex-direction: column; justify-content: center; }
            .ai-chat-card { border: 2px solid var(--cyan); border-left: 4px solid var(--cyan); background: #161616; }
            .chat-input-box { display: flex; background: #000; border: 1px solid #333; border-radius: 12px; padding: 5px; margin-top: 15px; }
            .chat-input-box input { flex: 1; background: transparent; border: none; padding: 10px; color: white; outline: none; }
            .chat-input-box button { background: var(--cyan); border: none; padding: 0 15px; border-radius: 8px; font-weight: 800; cursor: pointer; color: #000; }

            .btn-action { background: #E64A19; color: white; border: none; padding: 18px; border-radius: 100px; font-weight: 800; width: 100%; cursor: pointer; text-transform: uppercase; margin-top: 15px; }

            footer { padding: 60px 40px; background: #050505; border-top: 1px solid var(--border); }
            .footer-content { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
            .map-container { border-radius: 20px; overflow: hidden; height: 220px; filter: grayscale(1) invert(0.9); border: 1px solid var(--border); }

            @media (max-width: 1024px) { .main-container, .services-grid, .footer-content { grid-template-columns: 1fr; } .student-item { width: 320px; } .student-item img { height: 240px; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand"><img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true"> <span>MOS360</span></a>
        <a href="https://mos360.vn" target="_blank" style="background:var(--primary); color:white; padding:10px 22px; border-radius:10px; text-decoration:none; font-weight:700;">Đăng nhập</a>
    </header>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://www.facebook.com/MOS360.EDU" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="https://m.me/MOS360.EDU" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
        <a href="https://www.youtube.com/@mos360_vn" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
        <a href="https://www.tiktok.com/@mos360.vn" target="_blank" class="social-item"><svg viewBox="0 0 24 24" fill="white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.12-.91.38-1.57 1.23-1.73 2.19-.11.64-.03 1.3.18 1.91.43 1.13 1.53 1.95 2.73 2.11 1.19.16 2.45-.19 3.33-1.01.62-.57.97-1.38 1-2.22.04-4.52-.01-9.04.01-13.56z"/></svg></a>
    </div>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p style="color:#888;">Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="main-container">
        <div class="section-card">
            <h3 style="color:var(--primary); margin-bottom:20px;">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-box">
                <div class="wheel-pointer"></div>
                <div class="wheel-circle">
                    <div class="wheel-label-container">
                        <div class="wheel-label l1"><b>GIẢM 50K</b></div>
                        <div class="wheel-label l2"><b>GIẢM 50%</b></div>
                        <div class="wheel-label l3"><b>GIẢM 100K</b></div>
                        <div class="wheel-label l4"><b>GIẢM 80%</b></div>
                    </div>
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
            <div style="margin-top:20px; border-top:1px solid var(--border); padding-top:15px;">
                <p style="color:var(--primary); font-weight:800;">🎁 ƯU ĐÃI NHÓM:</p>
                <p style="color:#888; font-size:0.85rem;">Nhóm 3 người giảm ngay 100k mỗi bạn.</p>
            </div>
        </div>
    </div>

    <div class="services-grid">
        <div class="service-card">
            <h3>Thi Thật 100%</h3>
            <p>Thực hành trực tiếp trên hệ thống mô phỏng sát 100% đề thi quốc tế của Certiport.</p>
        </div>
        <div class="service-card ai-chat-card">
            <h3 style="color:var(--cyan);">AI Assistant 24/7 ✨</h3>
            <p>Giải đáp kiến thức tin học và các hàm Excel nhanh chóng:</p>
            <div class="chat-input-box">
                <input type="text" placeholder="Nhập câu hỏi tại đây...">
                <button>GỬI</button>
            </div>
        </div>
        <div class="service-card">
            <h3>Đồng Hành Trọn Đời</h3>
            <p>Hỗ trợ kỹ năng định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học tập.</p>
        </div>
    </div>

    <footer>
        <div class="footer-content">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p style="color:#666">Hotline: 0912.888.360</p></div>
            <div><p style="color:#888">Địa chỉ: 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p></div>
            <div class="map-container"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.455243452423!2d106.6784869759648!3d20.85168439375501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af10f8a09d3%3A0x9599580456079995!2zNTcgTMOqIFbEg24gVGh1eeG6vXQgQSwgQW4gQmnDqm4sIEzDqiBDaMOibiwgSOG6o2kgUGjDsm5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
