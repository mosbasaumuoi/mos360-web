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
                    <div style="flex-shrink:0; width:520px; margin-right:30px;">
                        <img src="${link}" style="width:100%; height:360px; object-fit:contain; border-radius:15px; border:2px solid #333; background:#000;">
                    </div>`;
            }
        });
        return htmlContent + htmlContent; 
    } catch (e) {
        return "<span>Đang tải bảng vàng...</span>";
    }
}

export default {
    async fetch(request, env, ctx) {
        const certs = await fetchCertificates();
        const html = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>MOS360 - Chinh phục chứng chỉ quốc tế</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
            <style>
                body { background: #080808; color: white; font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; overflow-x: hidden; }
                @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                .card { background: #111; padding: 25px; border-radius: 25px; border: 1px solid #222; }
                .btn-orange { background: #FF5722; color: white; padding: 12px 25px; border-radius: 12px; font-weight: 800; text-decoration: none; border: none; cursor: pointer; }
                
                /* VÒNG QUAY CÓ NAN QUẠT VÀ GIẢI THƯỞNG */
                .wheel-outer { width: 300px; height: 300px; border-radius: 50%; border: 10px solid #FFD700; margin: 20px auto; position: relative; overflow: hidden; animation: spin 10s linear infinite; box-shadow: 0 0 20px rgba(255,215,0,0.3); }
                .wheel-sector { position: absolute; width: 50%; height: 50%; transform-origin: 100% 100%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: white; text-align: center; padding-bottom: 40px; box-sizing: border-box; }
                .sector-1 { background: #ff6b6b; transform: rotate(0deg) skewY(-30deg); }
                .sector-2 { background: #4ecdc4; transform: rotate(60deg) skewY(-30deg); }
                .sector-3 { background: #ffbe0b; transform: rotate(120deg) skewY(-30deg); }
                .sector-4 { background: #ff006e; transform: rotate(180deg) skewY(-30deg); }
                .sector-5 { background: #8338ec; transform: rotate(240deg) skewY(-30deg); }
                .sector-6 { background: #3a86ff; transform: rotate(300deg) skewY(-30deg); }
                .sector-text { transform: skewY(30deg) rotate(15deg); width: 60px; }
                
                .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; font-weight: 900; font-size: 12px; z-index: 10; border: 4px solid #FFD700; }
                
                .social-bar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 1000; }
                .social-bar img { width: 42px; transition: 0.3s; cursor: pointer; border-radius: 8px; }
                .social-bar img:hover { transform: scale(1.1); }
            </style>
        </head>
        <body>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:15px 60px; background:#000; border-bottom:1px solid #222;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" style="width:40px;">
                    <h1 style="margin:0; font-size:24px;">MOS360</h1>
                </div>
                <button class="btn-orange">Đăng nhập</button>
            </div>

            <div style="display:grid; grid-template-columns: 420px 1fr; gap:30px; padding:30px 60px; max-width:1600px; margin:auto;">
                <div class="card" style="text-align:center;">
                    <h3 style="color:#FF5722; margin-top:0;">🎡 Vòng Quay May Mắn</h3>
                    <div class="wheel-outer">
                        <div class="wheel-sector sector-1"><div class="sector-text">THẺ 50K</div></div>
                        <div class="wheel-sector sector-2"><div class="sector-text">VOUCHER</div></div>
                        <div class="wheel-sector sector-3"><div class="sector-text">FREE HP</div></div>
                        <div class="wheel-sector sector-4"><div class="sector-text">GIẢM 20%</div></div>
                        <div class="wheel-sector sector-5"><div class="sector-text">QUÀ TẶNG</div></div>
                        <div class="wheel-sector sector-6"><div class="sector-text">CHÚC MAY MẮN</div></div>
                        <div class="wheel-center">QUAY</div>
                    </div>
                    <button class="btn-orange" style="width:90%; margin-top:10px;">NHẬN QUÀ NGAY</button>
                </div>

                <div class="card" style="overflow:hidden;">
                    <h3 style="margin-top:0; color:#FFD700;">🏆 Bảng Vàng Chứng Chỉ</h3>
                    <div style="width:100%; overflow:hidden; margin-top:20px;">
                        <div style="display:flex; animation: scroll 40s linear infinite; width:max-content;">
                            ${certs}
                        </div>
                    </div>
                    <p style="margin-top:20px; color:#FF5722;">🎁 ƯU ĐÃI NHÓM: <span style="color:#888;">Nhóm 3 người giảm ngay 100k mỗi bạn.</span></p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1.5fr 1fr; gap:25px; padding:0 60px 60px; max-width:1600px; margin:auto;">
                <div class="card" style="border-bottom:4px solid #FF5722;">
                    <h3>Thi Thật 100%</h3>
                    <p style="color:#888; font-size:14px;">Thực hành trên hệ thống mô phỏng sát 100% đề thi quốc tế của Certiport.</p>
                </div>

                <div class="card" style="border:2px solid #00f2ff; background:#161616;">
                    <h3 style="color:#00f2ff; margin-top:0;">🤖 AI Assistant 24/7 ✨</h3>
                    <div style="display:flex; background:#000; border:1px solid #333; border-radius:12px; padding:5px; margin-top:15px;">
                        <input type="text" placeholder="Hỏi AI về Excel..." style="flex:1; background:transparent; border:none; padding:12px; color:white; outline:none;">
                        <button style="background:#00f2ff; border:none; padding:0 20px; border-radius:8px; font-weight:bold; color:black;">GỬI</button>
                    </div>
                </div>

                <div class="card" style="border-bottom:4px solid #FF5722;">
                    <h3>Đồng Hành Trọn Đời</h3>
                    <p style="color:#888; font-size:14px;">Hỗ trợ định dạng luận văn, đồ án chuyên nghiệp vĩnh viễn.</p>
                </div>
            </div>

            <div style="padding:40px 60px; background:#000; border-top:1px solid #222;">
                <div style="max-width:1600px; margin:auto; display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <h2 style="color:#FF5722; margin:0;">MOS360.VN</h2>
                        <p style="color:#888; margin:10px 0;">Hotline: 0912.888.360 | Địa chỉ: 57 Lê Văn Thuyết A, Hải Phòng</p>
                    </div>
                    <div style="width:400px; height:180px; border-radius:15px; overflow:hidden; border:1px solid #333;">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.87870425785!2d106.6800!3d20.8400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDUwJzI0LjAiTiAxMDbCsDQwJzQ4LjAiRQ!5e0!3m2!1svi!2s!4v1" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>

            <div class="social-bar">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png">
                <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" style="background:white; padding:2px;">
            </div>
        </body>
        </html>`;
        
        return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
    },
};
