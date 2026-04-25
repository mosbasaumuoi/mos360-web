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
                    <div style="flex-shrink:0; width:520px; margin-right:35px;">
                        <img src="${link}" style="width:100%; height:360px; object-fit:contain; border-radius:15px; border:3px solid #333; background:#000; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    </div>`;
            }
        });
        return htmlContent + htmlContent; 
    } catch (e) {
        return "<span style='color:white;'>Đang tải dữ liệu...</span>";
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
                .card { background: #111; padding: 30px; border-radius: 30px; border: 1px solid #222; }
                .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 15px; background: #000; }
                .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
                a { color: inherit; text-decoration: none; }
            </style>
        </head>
        <body>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:20px 60px; background:#000; border-bottom:1px solid #222;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" style="width:45px;">
                    <h1 style="margin:0; font-size:26px;">MOS360</h1>
                </div>
                <a href="https://mos360.vn" style="background:#FF5722; color:white; padding:12px 25px; border-radius:12px; font-weight:800;">ĐĂNG NHẬP</a>
            </div>

            <div style="display:grid; grid-template-columns: 380px 1fr; gap:30px; padding:40px 60px; max-width:1600px; margin:auto;">
                <div class="card" style="text-align:center;">
                    <h3 style="color:#FF5722; margin-bottom:20px;">🎡 Vòng Quay May Mắn</h3>
                    <div style="width:260px; height:260px; border-radius:50%; border:8px solid #FFD700; margin:auto; background:conic-gradient(#ff6b6b, #4ecdc4, #ffbe0b, #ff006e, #ff6b6b); animation: spin 10s linear infinite;"></div>
                    <button style="width:100%; background:#FF5722; border:none; padding:18px; border-radius:40px; color:white; font-weight:bold; margin-top:30px; cursor:pointer;">NHẬN QUÀ NGAY</button>
                </div>

                <div class="card" style="overflow:hidden;">
                    <h3 style="margin-top:0; font-size:22px; color:#FFD700;">🏆 BẢNG VÀNG CHỨNG CHỈ (ẢNH TO)</h3>
                    <div style="width:100%; overflow:hidden; margin-top:25px;">
                        <div style="display:flex; animation: scroll 40s linear infinite; width:max-content;">
                            ${certs}
                        </div>
                    </div>
                </div>
            </div>

            <div style="padding:0 60px 40px; max-width:1600px; margin:auto;">
                <h3 style="margin-bottom:20px; color: #00f2ff;">📺 Bài Giảng Hướng Dẫn Mới Nhất</h3>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    <div class="card">
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/videoseries?list=PLyvCAdzO-f7Lp9-Y3E9E0_E-7m5S8E7X9" allowfullscreen></iframe>
                        </div>
                        <h4 style="margin: 15px 0 5px;">Hướng dẫn giải đề thi MOS Excel</h4>
                    </div>
                    <div class="card">
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/videoseries?list=PLyvCAdzO-f7L8D6z3_Y1J7XfN0G0kX0m9" allowfullscreen></iframe>
                        </div>
                        <h4 style="margin: 15px 0 5px;">Mẹo thi MOS Word đạt điểm tuyệt đối</h4>
                    </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1.5fr 1fr; gap:25px; padding:0 60px 60px; max-width:1600px; margin:auto;">
                <div class="card" style="border-top:4px solid #FF5722;">
                    <h3>Thi Thật 100%</h3>
                    <p style="color:#888; font-size:14px;">Phần mềm mô phỏng Certiport sát đề thi thật 100%.</p>
                </div>

                <div class="card" style="border:2px solid #00f2ff; background:#151515;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <span style="font-size:30px;">🤖</span>
                        <h3 style="color:#00f2ff; margin:0;">AI Assistant 24/7</h3>
                    </div>
                    <div style="display:flex; background:#000; border:1px solid #333; border-radius:15px; padding:5px;">
                        <input type="text" placeholder="Hỏi AI về bài tập Excel..." style="flex:1; background:transparent; border:none; padding:12px; color:white; outline:none;">
                        <button style="background:#00f2ff; border:none; padding:0 20px; border-radius:10px; font-weight:800; cursor:pointer;">GỬI</button>
                    </div>
                </div>

                <div class="card" style="border-top:4px solid #FF5722;">
                    <h3>Đồng Hành Trọn Đời</h3>
                    <p style="color:#888; font-size:14px;">Hỗ trợ định dạng luận văn, đồ án vĩnh viễn.</p>
                </div>
            </div>

            <div style="border-top:1px solid #222; padding:40px 60px; background:#000;">
                <div style="max-width:1600px; margin:auto; display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <h2 style="color:#FF5722; margin:0;">MOS360.VN</h2>
                        <p style="color:#888; margin-top:10px;">Hotline: 0912.888.360</p>
                        <p style="color:#888;">Email: info@mos360.vn</p>
                    </div>
                    <div style="text-align:right;">
                        <p style="color:#888;">Địa chỉ: 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
                        <p style="color:#666; font-size: 12px; margin-top: 20px;">© 2024 MOS360 - Đã đăng ký bản quyền.</p>
                    </div>
                </div>
            </div>

            <div style="position:fixed; right:20px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:15px; z-index:999;">
                <a href="https://zalo.me/0912888360" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" style="width:45px;"></a>
                <a href="https://www.facebook.com/MOS360.EDU" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" style="width:45px;"></a>
                <a href="https://m.me/MOS360.EDU" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" style="width:45px;"></a>
            </div>
        </body>
        </html>`;
        
        return new Response(html, {
            headers: { 
                "content-type": "text/html;charset=UTF-8",
                "Cache-Control": "no-cache, no-store, must-revalidate"
            },
        });
    },
};
