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
                // ÉP ẢNH CỰC TO 550PX - KHÔNG DÙNG CSS NGOÀI
                htmlContent += `
                    <div style="flex-shrink:0; width:550px; margin-right:30px;">
                        <img src="${link}" style="width:100%; height:380px; object-fit:contain; border-radius:15px; border:3px solid #333; background:#000; box-shadow: 0 10px 25px rgba(0,0,0,0.6);">
                    </div>`;
            }
        });
        return htmlContent + htmlContent; // Nhân đôi để chạy vô tận
    } catch (e) {
        return "<span style='color:white;'>Đang kết nối dữ liệu MOS360...</span>";
    }
}

export const renderWeb = async () => {
    const certs = await fetchCertificates();

    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
        <style>
            body { background: #080808; color: white; font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; overflow-x: hidden; }
            @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            @keyframes spin { to { transform: rotate(360deg); } }
        </style>
    </head>
    <body>
        <header style="display:flex; justify-content:space-between; align-items:center; padding:20px 50px; border-bottom:1px solid #222; background:#000;">
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" style="width:45px;">
                <h1 style="margin:0; font-size:26px; letter-spacing:-1px;">MOS360</h1>
            </div>
            <a href="https://mos360.vn" target="_blank" style="background:#FF5722; color:white; padding:12px 25px; border-radius:12px; font-weight:800; text-decoration:none;">ĐĂNG NHẬP</a>
        </header>

        <div style="display:grid; grid-template-columns: 350px 1fr; gap:30px; padding:40px; max-width:1600px; margin:auto;">
            
            <div style="background:#111; padding:30px; border-radius:30px; text-align:center; border:1px solid #222;">
                <h3 style="color:#FF5722; margin-bottom:20px;">🎡 Vòng Quay May Mắn</h3>
                <div style="width:250px; height:250px; border-radius:50%; border:8px solid gold; margin:auto; background:conic-gradient(#ff6b6b, #4ecdc4, #ffbe0b, #ff006e, #ff6b6b); animation: spin 10s linear infinite;"></div>
                <button style="width:100%; background:#FF5722; border:none; padding:18px; border-radius:40px; color:white; font-weight:bold; margin-top:30px; cursor:pointer; font-size:16px;">NHẬN QUÀ NGAY</button>
            </div>

            <div style="background:#111; padding:30px; border-radius:30px; border:1px solid #222; overflow:hidden;">
                <h3 style="margin-top:0; font-size:22px; color: #FFD700;">🏆 BẢNG VÀNG VINH DANH</h3>
                <div style="width:100%; overflow:hidden; margin-top:20px;">
                    <div style="display:flex; animation: scroll 40s linear infinite; width:max-content;">
                        ${certs}
                    </div>
                </div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1.6fr 1fr; gap:25px; padding:0 40px 60px; max-width:1600px; margin:auto;">
            
            <div style="background:#111; padding:30px; border-radius:25px; border:1px solid #222; border-left:6px solid #FF5722;">
                <h3>Thi Thật 100%</h3>
                <p style="color:#888; font-size:14px;">Mô phỏng chuẩn quốc tế Certiport.</p>
            </div>

            <div style="background:#161616; padding:30px; border-radius:25px; border:2px solid #00f2ff; box-shadow: 0 0 20px rgba(0,242,255,0.2);">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
                    <span style="font-size:30px;">🤖</span>
                    <h3 style="color:#00f2ff; margin:0;">AI Assistant 24/7 ✨</h3>
                </div>
                <p style="color:#ccc; font-size:14px; margin-bottom:15px;">Hỏi AI về kiến thức Excel và Tin học văn phòng:</p>
                <div style="display:flex; background:#000; border:1px solid #333; border-radius:15px; padding:5px;">
                    <input type="text" placeholder="Nhập câu hỏi của bạn..." style="flex:1; background:transparent; border:none; padding:15px; color:white; outline:none; font-size:16px;">
                    <button style="background:#00f2ff; border:none; padding:0 25px; border-radius:10px; font-weight:800; cursor:pointer; color:black;">GỬI</button>
                </div>
            </div>

            <div style="background:#111; padding:30px; border-radius:25px; border:1px solid #222; border-left:6px solid #FF5722;">
                <h3>Hỗ Trợ Luận Văn</h3>
                <p style="color:#888; font-size:14px;">Định dạng chuẩn chuyên nghiệp trọn đời.</p>
            </div>
        </div>

        <div style="position:fixed; right:20px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:15px;">
            <a href="https://zalo.me/0912888360" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" style="width:45px;"></a>
            <a href="https://www.facebook.com/MOS360.EDU" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" style="width:45px;"></a>
            <a href="https://m.me/MOS360.EDU" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" style="width:45px;"></a>
        </div>
    </body>
    </html>`;
};
