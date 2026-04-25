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
                        <img src="${link}" onerror="this.src='https://via.placeholder.com/400x300?text=MOS360'">
                    </div>`;
            }
        });
        return htmlContent + htmlContent;
    } catch (e) {
        return "<p>Đang cập nhật danh sách...</p>";
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
        <title>MOS360 - Bảng Vàng & AI Assistant</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --ai-cyan: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

            /* SOCIAL SIDEBAR */
            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
            .social-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: 0.3s; }
            .social-item:hover { border-color: var(--primary); transform: scale(1.1); }
            .social-item img { width: 22px; }

            /* LAYOUT CHÍNH */
            .main-container { max-width: 1200px; margin: 40px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 40px; text-align: center; overflow: hidden; position: relative; }

            /* BẢNG VÀNG ẢNH CỰC ĐẠI */
            .carousel-viewport { width: 100%; overflow: hidden; margin-top: 20px; }
            .carousel-track { display: flex; gap: 20px; animation: scroll 40s linear infinite; width: max-content; }
            .student-item { width: 320px; flex-shrink: 0; }
            .student-item img { width: 100%; aspect-ratio: 1.4/1; border-radius: 12px; border: 1px solid var(--border); object-fit: cover; }
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            /* VÒNG QUAY */
            .wheel-box { position: relative; width: 280px; height: 280px; margin: 0 auto 25px; border-radius: 50%; border: 8px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 20s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            /* DỊCH VỤ & Ô CHAT AI */
            .services-grid { max-width: 1200px; margin: 50px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 25px; align-items: stretch; }
            .service-card { background: var(--card); padding: 30px; border-radius: 28px; border: 1px solid var(--border); border-left: 4px solid var(--primary); display: flex; flex-direction: column; }
            
            /* CẤU CỨU AI ASSISTANT */
            .service-card.ai-box { 
                border: 2px solid var(--ai-cyan); 
                border-left: 4px solid var(--ai-cyan);
                box-shadow: 0 0 30px rgba(0, 242, 255, 0.15);
                transform: scale(1.05);
                z-index: 10;
            }
            .ai-badge { background: var(--ai-cyan); color: #000; font-size: 0.6rem; font-weight: 800; padding: 3px 10px; border-radius: 10px; align-self: flex-start; margin-bottom: 10px; }
            .ai-box h3 { color: var(--ai-cyan); margin-bottom: 10px; }
            
            /* Ô INPUT AI */
            .ai-chat-wrapper { margin-top: auto; padding-top: 20px; }
            .ai-input-group { position: relative; display: flex; align-items: center; }
            .ai-input { 
                width: 100%; background: #1a1a1a; border: 1px solid rgba(0, 242, 255, 0.3); 
                padding: 14px 50px 14px 18px; border-radius: 15px; color: white; outline: none;
                font-size: 0.9rem; transition: 0.3s;
            }
            .ai-input:focus { border-color: var(--ai-cyan); box-shadow: 0 0 10px rgba(0, 242, 255, 0.2); }
            .ai-send-btn { 
                position: absolute; right: 10px; background: var(--ai-cyan); border: none; 
                width: 34px; height: 34px; border-radius: 10px; cursor: pointer; display: flex;
                align-items: center; justify-content: center; transition: 0.3s;
            }
            .ai-send-btn:hover { transform: scale(1.1); background: #fff; }

            .btn-action { background: #E64A19; color: white; border: none; padding: 18px; border-radius: 100px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 15px; }
            header { padding: 15px 50px; display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); }
            
            @media (max-width: 1000px) { .services-grid, .main-container { grid-template-columns: 1fr; } .service-card.ai-box { transform: none; } }
        </style>
    </head>
    <body>
        <header>
            <a href="#" style="text-decoration:none; color:white; font-weight:800; font-size:1.4rem;">MOS360</a>
            <a href="https://mos360.vn" target="_blank" style="background:var(--primary); color:white; padding:10px 22px; border-radius:10px; text-decoration:none; font-weight:700;">Đăng nhập</a>
        </header>

        <div class="side-social">
            <a href="https://zalo.me/0912888360" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
            <a href="https://www.facebook.com/MOS360.EDU" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
            <a href="https://m.me/MOS360.EDU" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
            <a href="https://www.youtube.com/@mos360_vn" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
            <a href="https://www.tiktok.com/@mos360.vn" target="_blank" class="social-item"><img src="https://www.tiktok.com/favicon.ico" style="filter:invert(1)"></a>
        </div>

        <div class="main-container">
            <div class="section-card">
                <h3 style="color:var(--primary); margin-bottom:20px;">🎡 Vòng Quay May Mắn</h3>
                <div class="wheel-box"></div>
                <button class="btn-action">NHẬN QUÀ NGAY</button>
            </div>

            <div class="section-card" style="text-align:left;">
                <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
                <div class="carousel-viewport"><div class="carousel-track">${studentData}</div></div>
            </div>
        </div>

        <div class="services-grid">
            <div class="service-card">
                <h3>Thi Thật 100%</h3>
                <p>Hệ thống mô phỏng sát đề thi quốc tế Certiport.</p>
            </div>
            
            <div class="service-card ai-box">
                <span class="ai-badge">HỎI ĐÁP AI</span>
                <h3>AI Assistant 24/7 ✨</h3>
                <p style="font-size: 0.85rem; color: #ccc;">Tra cứu tài liệu hoặc giải đáp hàm Excel ngay lập tức:</p>
                <div class="ai-chat-wrapper">
                    <div class="ai-input-group">
                        <input type="text" class="ai-input" placeholder="Hỏi AI về hàm VLOOKUP...">
                        <button class="ai-send-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="service-card">
                <h3>Đồng Hành Trọn Đời</h3>
                <p>Hỗ trợ định dạng luận văn, đồ án chuyên nghiệp.</p>
            </div>
        </div>
    </body>
    </html>`;
};
