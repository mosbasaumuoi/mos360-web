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
                        <img src="${link}" onerror="this.src='https://via.placeholder.com/400x300?text=MOS360+Certificate'">
                    </div>`;
            }
        });
        return htmlContent + htmlContent;
    } catch (e) {
        return "<p style='color:#888;'>Đang tải dữ liệu chứng chỉ...</p>";
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
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.1); --ai-cyan: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; line-height: 1.5; }

            /* HEADER */
            header { padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); background: #000; }
            .brand { font-weight: 800; font-size: 1.5rem; color: white; text-decoration: none; }
            .login-btn { background: var(--primary); color: white; padding: 10px 25px; border-radius: 12px; text-decoration: none; font-weight: 700; transition: 0.3s; }

            /* SOCIAL SIDEBAR */
            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 100; }
            .social-item { width: 48px; height: 48px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: 0.3s; }
            .social-item:hover { border-color: var(--primary); transform: translateY(-5px); }
            .social-item img { width: 24px; }

            /* MAIN SECTION */
            .hero-title { text-align: center; padding: 50px 20px 20px; font-size: 2.5rem; font-weight: 800; }
            .main-container { max-width: 1300px; margin: 0 auto; padding: 20px 40px; display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 40px; position: relative; overflow: hidden; }

            /* BẢNG VÀNG - ẢNH TO VÀ RÕ */
            .carousel-viewport { width: 100%; overflow: hidden; margin-top: 25px; border-radius: 20px; }
            .carousel-track { display: flex; gap: 20px; animation: scroll 45s linear infinite; width: max-content; }
            .student-item { width: 380px; flex-shrink: 0; } /* Tăng chiều ngang ảnh */
            .student-item img { 
                width: 100%; 
                aspect-ratio: 1.5/1; 
                border-radius: 12px; 
                object-fit: cover; 
                border: 2px solid rgba(255,255,255,0.05);
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            /* VÒNG QUAY */
            .wheel-box { width: 300px; height: 300px; margin: 0 auto 30px; border-radius: 50%; border: 10px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 20s linear infinite; display: flex; align-items: center; justify-content: center; font-weight: 900; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            /* DỊCH VỤ & KHUNG CHAT AI */
            .services-grid { max-width: 1300px; margin: 40px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1.8fr 1fr; gap: 25px; }
            .service-card { background: var(--card); padding: 35px; border-radius: 30px; border: 1px solid var(--border); border-left: 5px solid var(--primary); display: flex; flex-direction: column; transition: 0.3s; }
            
            /* THIẾT KẾ RIÊNG CHO KHUNG CHAT AI */
            .service-card.ai-highlight { 
                border: 2px solid var(--ai-cyan); 
                border-left: 5px solid var(--ai-cyan);
                box-shadow: 0 0 40px rgba(0, 242, 255, 0.15);
                background: linear-gradient(145deg, #121212 0%, #1a1a1a 100%);
            }
            .ai-header { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
            .ai-robot-icon { width: 40px; height: 40px; background: var(--ai-cyan); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
            .ai-highlight h3 { color: var(--ai-cyan); font-size: 1.4rem; }

            .ai-chat-area { margin-top: auto; position: relative; }
            .ai-input-box { 
                width: 100%; 
                background: #000; 
                border: 1px solid rgba(0, 242, 255, 0.3); 
                padding: 15px 55px 15px 20px; 
                border-radius: 18px; 
                color: white; 
                outline: none; 
                font-size: 0.95rem;
                transition: 0.3s;
            }
            .ai-input-box:focus { border-color: var(--ai-cyan); box-shadow: 0 0 15px rgba(0, 242, 255, 0.2); }
            .ai-send-btn { 
                position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
                background: var(--ai-cyan); border: none; width: 38px; height: 38px; 
                border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center;
                transition: 0.2s;
            }
            .ai-send-btn:hover { background: #fff; transform: translateY(-50%) scale(1.1); }

            .btn-action { background: #E64A19; color: white; border: none; padding: 20px; border-radius: 100px; font-weight: 800; width: 100%; cursor: pointer; text-transform: uppercase; margin-top: 20px; }

            footer { padding: 50px 40px; border-top: 1px solid var(--border); text-align: center; color: #666; }

            @media (max-width: 1100px) { .services-grid, .main-container { grid-template-columns: 1fr; } .student-item { width: 300px; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand">MOS360</a>
        <a href="https://mos360.vn" target="_blank" class="login-btn">Đăng nhập</a>
    </header>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://www.facebook.com/MOS360.EDU" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="https://m.me/MOS360.EDU" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
        <a href="https://www.youtube.com/@mos360_vn" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
        <a href="https://www.tiktok.com/@mos360.vn" target="_blank" class="social-item"><img src="https://www.tiktok.com/favicon.ico" style="filter:invert(1)"></a>
    </div>

    <h1 class="hero-title">Chuẩn đầu ra cho sinh viên</h1>

    <div class="main-container">
        <div class="section-card" style="text-align:center;">
            <h3 style="color:var(--primary); margin-bottom:20px;">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-box">QUAY</div>
            <button class="btn-action">NHẬN QUÀ NGAY</button>
        </div>

        <div class="section-card">
            <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="carousel-viewport">
                <div class="carousel-track">${studentData}</div>
            </div>
            <p style="margin-top:20px; color:#888; font-size:0.9rem;">Học viên đạt điểm tuyệt đối được cập nhật tự động.</p>
        </div>
    </div>

    <div class="services-grid">
        <div class="service-card">
            <h3>Thi Thật 100%</h3>
            <p style="color:#aaa;">Thực hành trên hệ thống mô phỏng sát đề thi quốc tế của Certiport.</p>
        </div>
        
        <div class="service-card ai-highlight">
            <div class="ai-header">
                <div class="ai-robot-icon">🤖</div>
                <h3>AI Assistant 24/7</h3>
            </div>
            <p style="color:#ccc; font-size:0.9rem; margin-bottom:20px;">Hỏi AI về kiến thức tin học, hàm Excel hoặc tra cứu tài liệu học tập ngay:</p>
            
            <div class="ai-chat-area">
                <input type="text" class="ai-input-box" placeholder="Ví dụ: Cách dùng hàm VLOOKUP?">
                <button class="ai-send-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>

        <div class="service-card">
            <h3>Đồng Hành Trọn Đời</h3>
            <p style="color:#aaa;">Hỗ trợ kỹ năng định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học.</p>
        </div>
    </div>

    <footer>
        <p>© 2026 MOS360 - Luyện thi MOS 1000/1000</p>
    </footer>

    </body>
    </html>`;
};
