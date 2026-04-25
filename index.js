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
                htmlContent += `
                    <div class="student-item">
                        <img src="${link}">
                    </div>`;
            }
        });
        return htmlContent + htmlContent;
    } catch (e) {
        return "<span>Đang tải...</span>";
    }
}

export const renderWeb = async () => {
    const studentData = await fetchCertificates();

    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --ai: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: var(--bg); color: white; font-family: 'Plus Jakarta Sans', sans-serif; }

            /* BẢNG VÀNG - ÉP ẢNH SIÊU TO */
            .main-layout { max-width: 1400px; margin: 40px auto; display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px; padding: 0 20px; }
            .card { background: #121212; border: 1px solid #222; border-radius: 24px; padding: 30px; overflow: hidden; }
            
            .carousel { width: 100%; overflow: hidden; margin-top: 20px; }
            .track { display: flex; gap: 25px; animation: scroll 30s linear infinite; }
            .student-item { width: 450px; flex-shrink: 0; } /* Ép chiều rộng ảnh 450px */
            .student-item img { 
                width: 100%; 
                height: 300px; /* Ép chiều cao ảnh */
                object-fit: contain; 
                border-radius: 12px; 
                background: #000;
                border: 2px solid #333;
            }

            /* KHUNG CHAT AI - HIỆN THỊ CHẮC CHẮN */
            .services { max-width: 1400px; margin: 20px auto; display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 20px; padding: 0 20px; }
            .ai-card { 
                background: #121212; border: 2px solid var(--ai) !important; border-radius: 24px; padding: 25px; 
                box-shadow: 0 0 20px rgba(0, 242, 255, 0.2);
            }
            .chat-container { margin-top: 20px; background: #000; padding: 15px; border-radius: 16px; border: 1px solid #333; }
            .chat-input-group { display: flex; gap: 10px; margin-top: 10px; }
            input { flex: 1; background: #1a1a1a; border: 1px solid #444; padding: 12px; border-radius: 10px; color: white; outline: none; }
            input:focus { border-color: var(--ai); }
            .send-btn { background: var(--ai); border: none; padding: 10px 20px; border-radius: 10px; font-weight: 800; cursor: pointer; }

            @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; }
            .social-item img { width: 35px; border-radius: 50%; }
        </style>
    </head>
    <body>
        <div style="padding: 20px 40px; display: flex; justify-content: space-between; align-items: center;">
            <h1 style="font-size: 1.8rem;">MOS360</h1>
            <div style="background: var(--primary); padding: 10px 20px; border-radius: 10px; font-weight: 800;">Đăng nhập</div>
        </div>

        <div class="main-layout">
            <div class="card" style="text-align: center;">
                <h2 style="color: var(--primary);">Vòng Quay May Mắn</h2>
                <div style="width: 250px; height: 250px; border-radius: 50%; border: 10px solid gold; margin: 30px auto; background: conic-gradient(red, orange, yellow, green, blue, indigo, violet); animation: spin 5s linear infinite;"></div>
                <button style="width: 100%; padding: 15px; border-radius: 30px; background: var(--primary); color: white; border: none; font-weight: 800;">NHẬN QUÀ NGAY</button>
            </div>

            <div class="card">
                <h2>🏆 Bảng Vàng Chứng Chỉ</h2>
                <div class="carousel">
                    <div class="track">${studentData}</div>
                </div>
            </div>
        </div>

        <div class="services">
            <div class="card" style="border-left: 5px solid var(--primary);">
                <h3>Thi Thật 100%</h3>
                <p style="color: #888; font-size: 0.9rem; margin-top: 10px;">Mô phỏng sát đề thi Certiport.</p>
            </div>

            <div class="ai-card">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">🤖</span>
                    <h3 style="color: var(--ai);">AI Assistant 24/7</h3>
                </div>
                <div class="chat-container">
                    <p style="font-size: 0.8rem; color: #00f2ff;">Hệ thống AI đang sẵn sàng...</p>
                    <div class="chat-input-group">
                        <input type="text" placeholder="Hỏi AI về hàm Excel, tài liệu...">
                        <button class="send-btn">GỬI</button>
                    </div>
                </div>
            </div>

            <div class="card" style="border-left: 5px solid var(--primary);">
                <h3>Đồng Hành Trọn Đời</h3>
                <p style="color: #888; font-size: 0.9rem; margin-top: 10px;">Hỗ trợ đồ án, luận văn vĩnh viễn.</p>
            </div>
        </div>

        <div class="side-social">
            <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
            <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        </div>

        <style> @keyframes spin { to { transform: rotate(360deg); } } </style>
    </body>
    </html>`;
};
