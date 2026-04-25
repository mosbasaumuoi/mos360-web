const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv";

async function fetchCertificates() {
    try {
        const response = await fetch(sheetUrl);
        const tsvData = await response.text();
        const rows = tsvData.split('\n').slice(1);
        let htmlContent = "";
        rows.forEach(row => {
            const columns = row.split('\t');
            const link = columns[0] ? columns[0].trim() : "";
            if (link && link.startsWith('http')) {
                // Ép kích thước ảnh cực to trực tiếp trong thẻ img
                htmlContent += `
                    <div class="cert-card">
                        <img src="${link}" style="width: 500px; height: auto; border-radius: 15px; border: 2px solid #333; display: block;">
                    </div>`;
            }
        });
        return htmlContent + htmlContent; 
    } catch (e) {
        return "<span>Đang tải dữ liệu...</span>";
    }
}

export const renderWeb = async () => {
    const certs = await fetchCertificates();

    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>MOS360 - Bảng Vàng & AI Assistant</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
        <style>
            :root { --orange: #FF5722; --cyan: #00f2ff; --bg: #080808; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: var(--bg); color: white; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

            /* HEADER */
            .navbar { padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; }
            .login-btn { background: var(--orange); padding: 10px 25px; border-radius: 10px; font-weight: 800; text-decoration: none; color: white; }

            /* MAIN SECTION - BẢNG VÀNG */
            .main-section { max-width: 1500px; margin: 40px auto; display: grid; grid-template-columns: 320px 1fr; gap: 30px; padding: 0 40px; }
            .card-box { background: #111; border: 1px solid #222; border-radius: 30px; padding: 35px; }

            /* CAROUSEL - LÀM ẢNH TO VƯỢT TRỘI */
            .cert-viewport { width: 100%; overflow: hidden; margin-top: 20px; }
            .cert-track { display: flex; gap: 40px; animation: scroll 50s linear infinite; width: max-content; }
            .cert-card { flex-shrink: 0; width: 500px; } /* Chiều ngang mỗi ảnh là 500px */
            @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

            /* 3 CỘT DỊCH VỤ - KHUNG CHAT AI */
            .services-area { max-width: 1500px; margin: 0 auto 60px; display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 25px; padding: 0 40px; }
            .service-item { background: #111; padding: 30px; border-radius: 25px; border: 1px solid #222; border-left: 5px solid var(--orange); }
            
            /* CSS RIÊNG CHO Ô CHAT AI */
            .ai-box { border: 2px solid var(--cyan) !important; border-left: 5px solid var(--cyan) !important; position: relative; background: #161616; }
            .ai-input-container { margin-top: 20px; display: flex; background: #000; border-radius: 15px; border: 1px solid #333; padding: 5px; }
            .ai-input-field { 
                flex: 1; background: transparent; border: none; padding: 15px; color: white; 
                outline: none; font-size: 15px; width: 100%; 
            }
            .ai-send-button { 
                background: var(--cyan); border: none; padding: 0 20px; border-radius: 10px; 
                color: black; font-weight: 800; cursor: pointer; transition: 0.3s;
            }
            .ai-send-button:hover { background: white; }

            .side-nav { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; }
            .side-nav img { width: 45px; transition: 0.3s; }
            .side-nav img:hover { transform: scale(1.1); }
        </style>
    </head>
    <body>
        <div class="navbar">
            <h1 style="font-size: 26px;">MOS360</h1>
            <a href="https://mos360.vn" class="login-btn">ĐĂNG NHẬP</a>
        </div>

        <div class="main-section">
            <div class="card-box" style="text-align: center;">
                <h3 style="color: var(--orange); margin-bottom: 20px;">🎡 Vòng Quay</h3>
                <div style="width: 220px; height: 220px; border-radius: 50%; border: 10px solid gold; margin: 0 auto; background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #ffbe0b, #ff006e, #ff6b6b); animation: spin 10s linear infinite;"></div>
                <button style="background: var(--orange); border:none; width:100%; padding:18px; border-radius:40px; color:white; font-weight:800; margin-top:30px; cursor:pointer;">NHẬN QUÀ NGAY</button>
            </div>

            <div class="card-box">
                <h3 style="font-size: 22px;">🏆 BẢNG VÀNG CHỨNG CHỈ 1000/1000</h3>
                <div class="cert-viewport">
                    <div class="cert-track">${certs}</div>
                </div>
            </div>
        </div>

        <div class="services-area">
            <div class="service-item">
                <h3>Thi Thật 100%</h3>
                <p style="color:#888; font-size:14px; margin-top:10px;">Phần mềm mô phỏng sát đề thi quốc tế Certiport.</p>
            </div>

            <div class="service-item ai-box">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 24px;">🤖</span>
                    <h3 style="color: var(--cyan);">AI Assistant 24/7 ✨</h3>
                </div>
                <p style="color:#aaa; font-size:14px; margin-top:8px;">Hỏi đáp kiến thức Tin học và tra cứu tài liệu:</p>
                
                <div class="ai-input-container">
                    <input type="text" class="ai-input-field" placeholder="Nhập câu hỏi tại đây...">
                    <button class="ai-send-button">GỬI</button>
                </div>
            </div>

            <div class="service-item">
                <h3>Hỗ Trợ Luận Văn</h3>
                <p style="color:#888; font-size:14px; margin-top:10px;">Định dạng văn bản chuẩn chuyên nghiệp trọn đời.</p>
            </div>
        </div>

        <div class="side-nav">
            <a href="https://zalo.me/0912888360" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
            <a href="https://www.facebook.com/MOS360.EDU" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        </div>

        <style> @keyframes spin { to { transform: rotate(360deg); } } </style>
    </body>
    </html>`;
};
