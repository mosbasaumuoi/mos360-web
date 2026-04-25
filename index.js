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
        return "<span>Đang tải dữ liệu...</span>";
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
                .card { background: #111; padding: 25px; border-radius: 25px; border: 1px solid #222; position: relative; }
                .btn-orange { background: #FF5722; color: white; padding: 12px 25px; border-radius: 12px; font-weight: 800; text-decoration: none; display: inline-block; cursor: pointer; border: none; }
                .wheel-container { width: 300px; height: 300px; border-radius: 50%; border: 8px solid #FFD700; margin: 20px auto; position: relative; background: conic-gradient(#ff6b6b 0% 25%, #4ecdc4 25% 50%, #ffbe0b 50% 75%, #ff006e 75% 100%); animation: spin 10s linear infinite; box-shadow: 0 0 20px rgba(255,215,0,0.3); }
                .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; font-weight: 800; font-size: 12px; z-index: 10; animation: none; }
                .social-bar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 1000; }
                .social-bar img { width: 42px; transition: 0.3s; cursor: pointer; }
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

            <p style="text-align:center; color:#888; margin: 20px 0;">Luyện thi MOS 1000/1000 - Đồng hành thực chiến trọn đời</p>

            <div style="display:grid; grid-template-columns: 450px 1fr; gap:30px; padding:0 60px 40px; max-width:1600px; margin:auto;">
                <div class="card" style="text-align:center;">
                    <h3 style="color:#FF5722; margin-top:0;">🎡 Vòng Quay May Mắn</h3>
                    <div class="wheel-container">
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
                    <p style="color:#888; font-size:14px; line-height:1.6;">Thực hành trực tiếp trên hệ thống mô phỏng sát 100% đề thi quốc tế của Certiport.</p>
                </div>

                <div class="card" style="border:2px solid #00f2ff; background:#161616;">
                    <h3 style="color:#00f2ff; margin-top:0;">🤖 AI Assistant 24/7 ✨</h3>
                    <p style="color:#ccc; font-size:13px;">Hỏi đáp kiến thức tin học và các hàm Excel nhanh chóng:</p>
                    <div style="display:flex; background:#000; border:1px solid #333; border-radius:12px; padding:5px; margin-top:10px;">
                        <input type="text" placeholder="Nhập nội dung cần hỏi..." style="flex:1; background:transparent; border:none; padding:12px; color:white; outline:none;">
                        <button style="background:#00f2ff; border:none; padding:0 20px; border-radius:8px; font-weight:bold; cursor:pointer;">GỬI</button>
                    </div>
                </div>

                <div class="card" style="border-bottom:4px solid #FF5722;">
                    <h3>Đồng Hành Trọn Đời</h3>
                    <p style="color:#888; font-size:14px; line-height:1.6;">Hỗ trợ kỹ năng định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học tập.</p>
                </div>
            </div>

            <div style="padding:40px 60px; background:#000; border-top:1px solid #222;">
                <div style="max-width:1600px; margin:auto; display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <h2 style="color:#FF5722; margin:0;">MOS360.VN</h2>
                        <p style="color:#888; margin:10px 0;">Hotline: 0912.888.360 | Email: info@mos360.vn</p>
                        <p style="color:#888;">Địa chỉ: 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
                    </div>
                    <div style="width:400px; height:180px; border-radius:15px; overflow:hidden; border:1px solid #333;">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.452336683526!2d106.6775!3d20.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2s!4v1714000000000" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>

            <div class="social-bar">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/TikTok_logo.svg" style="background:white; border-radius:50%;">
            </div>
        </body>
        </html>`;
        
        return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
    },
};
