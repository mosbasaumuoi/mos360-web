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
                    <div style="flex-shrink:0; width:550px; margin-right:40px;">
                        <img src="${link}" style="width:100%; height:380px; object-fit:contain; border-radius:20px; border:3px solid #333; background:#000; box-shadow: 0 15px 30px rgba(0,0,0,0.7);">
                    </div>`;
            }
        });
        return htmlContent + htmlContent; 
    } catch (e) {
        return "<span style='color:white;'>Đang tải dữ liệu chứng chỉ MOS360...</span>";
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
                body { background: #080808 !important; color: white !important; font-family: 'Plus Jakarta Sans', sans-serif !important; margin: 0; overflow-x: hidden; }
                @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                .service-card { background: #111; padding: 30px; border-radius: 30px; border: 1px solid #222; transition: 0.3s; height: 100%; }
                input::placeholder { color: #666; }
            </style>
        </head>
        <body>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:25px 60px; background:#000; border-bottom:1px solid #222;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" style="width:50px;">
                    <h1 style="margin:0; font-size:28px; letter-spacing:-1px;">MOS360</h1>
                </div>
                <a href="https://mos360.vn" style="background:#FF5722; color:white; padding:12px 28px; border-radius:15px; font-weight:800; text-decoration:none;">ĐĂNG NHẬP</a>
            </div>

            <div style="display:grid; grid-template-columns: 400px 1fr; gap:35px; padding:50px 60px; max-width:1700px; margin:auto;">
                
                <div class="service-card" style="text-align:center;">
                    <h3 style="color:#FF5722; margin-bottom:25px;">🎡 Vòng Quay May Mắn</h3>
                    <div style="width:280px; height:280px; border-radius:50%; border:10px solid #FFD700; margin:auto; background:conic-gradient(#ff6b6b, #4ecdc4, #ffbe0b, #ff006e, #ff6b6b); animation: spin 10s linear infinite; box-shadow: 0 0 30px rgba(255,215,0,0.2);"></div>
                    <button style="width:100%; background:#FF5722; border:none; padding:18px; border-radius:40px; color:white; font-weight:800; margin-top:35px; cursor:pointer; font-size:17px;">NHẬN QUÀ NGAY</button>
                </div>

                <div class="service-card" style="overflow:hidden;">
                    <h3 style="margin-top:0; font-size:24px; color:#FFD700;">🏆 BẢNG VÀNG CHỨNG CHỈ 1000/1000</h3>
                    <div style="width:100%; overflow:hidden; margin-top:35px;">
                        <div style="display:flex; animation: scroll 45s linear infinite; width:max-content;">
                            ${certs}
                        </div>
                    </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1.8fr 1fr; gap:30px; padding:0 60px 80px; max-width:1700px; margin:auto;">
                
                <div class="service-card" style="border-left:8px solid #FF5722;">
                    <h3 style="font-size:22px;">Thi Thật 100%</h3>
                    <p style="color:#888; line-height:1.7;">Thực hành trực tiếp trên hệ thống mô phỏng sát 100% đề thi quốc tế Certiport.</p>
                </div>

                <div class="service-card" style="border:2px solid #00f2ff; background:#151515; box-shadow: 0 0 25px rgba(0,242,255,0.15);">
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
                        <span style="font-size:32px;">🤖</span>
                        <h3 style="color:#00f2ff; margin:0; font-size:24px;">AI Assistant 24/7 ✨</h3>
                    </div>
                    <p style="color:#ccc; font-size:14px; margin-bottom:20px;">Hỏi đáp kiến thức tin học và các hàm Excel phức tạp ngay tức thì:</p>
                    <div style="display:flex; background:#000; border:1px solid #333; border-radius:15px; padding:6px;">
                        <input type="text" placeholder="Nhập nội dung cần hỏi..." style="flex:1; background:transparent; border:none; padding:15px; color:white; outline:none; font-size:16px;">
                        <button style="background:#00f2ff; border:none; padding:0 30px; border-radius:10px; font-weight:800; cursor:pointer; color:black;">GỬI</button>
                    </div>
                </div>

                <div class="service-card" style="border-left:8px solid #FF5722;">
                    <h3 style="font-size:22px;">Đồng Hành Trọn Đời</h3>
                    <p style="color:#888; line-height:1.7;">Hỗ trợ kỹ năng định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học tập.</p>
                </div>
            </div>

            <div style="position:fixed; right:20px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:15px; z-index:999;">
                <a href="https://zalo.me/0912888360" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" style="width:48px;"></a>
                <a href="https://www.facebook.com/MOS360.EDU" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" style="width:48px;"></a>
                <a href="https://m.me/MOS360.EDU" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" style="width:48px;"></a>
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
