const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mosbasaumuoi/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    let studentImages = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL + "?nocache=" + Date.now());
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let list = "";
      rows.forEach(row => {
        const url = row.split("\t")[0]?.trim();
        if (url && url.startsWith("http")) {
          list += `<div style="flex:0 0 auto; width:350px; height:100%; display:flex; align-items:center; justify-content:center; padding:0 15px;">
                    <img src="${url}" style="max-height:85%; max-width:100%; object-fit:contain; border-radius:12px;">
                  </div>`;
        }
      });
      studentImages = list + list;
    } catch (e) { studentImages = "Lỗi dữ liệu"; }

    const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0A0A0A; color: #fff; overflow-x: hidden; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 1024px) { 
            .main-grid { grid-template-columns: 1fr !important; }
            .bv-wrap { height: 350px !important; }
        }
    </style>
</head>
<body>
    <header style="padding:15px 5%; display:flex; justify-content:space-between; align-items:center; background:#000; border-bottom:1px solid #333; position:sticky; top:0; z-index:999;">
        <a href="/" style="display:flex; align-items:center; gap:10px; text-decoration:none; color:#fff; font-weight:800; font-size:1.4rem;">
            <img src="${CONFIG.LOGO_URL}" style="height:40px;"> MOS360
        </a>
        <div style="display:flex; gap:12px;">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" style="width:28px;"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" style="width:28px;"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968771.png" style="width:28px;"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" style="width:28px;"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" style="width:28px;"></a>
        </div>
    </header>

    <div class="main-grid" style="max-width:1300px; margin:20px auto; padding:0 15px; display:grid; grid-template-columns: 1fr 320px; gap:25px;">
        
        <div style="background:#161616; border-radius:24px; padding:20px; border:1px solid #333; overflow:hidden;">
            <h3 style="text-align:center; color:#FFD700; margin-bottom:15px; font-weight:800;">🏆 BẢNG VÀNG CHỨNG CHỈ</h3>
            <div class="bv-wrap" style="width:100%; height:450px; background:#000; border-radius:20px; overflow:hidden; position:relative;">
                <div style="display:flex; height:100%; animation: scroll 80s linear infinite; width:max-content;">
                    ${studentImages}
                </div>
            </div>
        </div>

        <div>
            <div style="background:#161616; border-radius:24px; padding:20px; border:1px dashed #FF5722; text-align:center; margin-bottom:20px;">
                <p style="font-weight:800; color:#FF5722;">🔥 ƯU ĐÃI THÁNG 4</p>
                <p style="font-size:0.9rem;">Mua 3 tính tiền 2 - Tiết kiệm 400k</p>
            </div>
            <div style="background:#161616; border-radius:24px; padding:20px; border:1px solid #333; text-align:center;">
                <p style="font-size:0.7rem; color:#888; margin-bottom:15px;">VÒNG QUAY MAY MẮN</p>
                <div style="position:relative; width:170px; height:170px; margin:0 auto 20px;">
                    <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); border-top:20px solid #FFD700; border-left:8px solid transparent; border-right:8px solid transparent; z-index:10;"></div>
                    <div id="wheel" style="width:100%; height:100%; border-radius:50%; border:6px solid #222; background:conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); transition: transform 5s cubic-bezier(0.1, 0, 0.1, 1);"></div>
                </div>
                <button onclick="spin()" style="background:#FF5722; color:#fff; border:none; width:100%; padding:12px; border-radius:50px; font-weight:800; cursor:pointer;">QUAY NGAY</button>
            </div>
        </div>
    </div>

    <div style="max-width:1300px; margin:20px auto; padding:0 15px; display:grid; grid-template-columns: 1fr 2fr 1fr; gap:20px;" class="main-grid">
        <div style="background:#161616; padding:20px; border-radius:20px; border-left:4px solid #FF5722;">
            <h4>Thi Thật 100%</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:10px;">Mô phỏng chuẩn IIG quốc tế.</p>
        </div>
        <div style="background:#161616; padding:20px; border-radius:20px; border-left:4px solid #00F2FF;">
            <h4 style="color:#00F2FF;">AI Assistant 24/7 ✨</h4>
            <div style="display:flex; background:#000; padding:10px; border-radius:12px; margin-top:10px; border:1px solid #333; min-height:80px;">
                <input type="text" placeholder="Hỏi mẹo thi MOS..." style="flex:1; background:transparent; border:none; color:#fff; outline:none; padding:0 10px;">
                <button style="background:#00F2FF; border:none; padding:0 25px; border-radius:8px; font-weight:800; cursor:pointer;">GỬI</button>
            </div>
        </div>
        <div style="background:#161616; padding:20px; border-radius:20px; border-left:4px solid #FF5722;">
            <h4>Đồng Hành</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:10px;">Tip định dạng luận văn & công sở.</p>
        </div>
    </div>

    <footer style="background:#050505; border-top:1px solid #333; padding:40px 5%; margin-top:40px;">
        <div style="max-width:1300px; margin:0 auto; display:grid; grid-template-columns: 1fr 1fr 1fr; gap:30px;" class="main-grid">
            <div>
                <h3 style="color:#FF5722; margin-bottom:10px;">MOS360.VN</h3>
                <p>📍 Số 57 Lê Văn Thuyết A, Hải Phòng</p>
                <p>📞 Hotline: 0912.888.360</p>
            </div>
            <div>
                <h4 style="color:#00F2FF; margin-bottom:10px;">LỊCH LÀM VIỆC</h4>
                <p style="font-weight:800; color:#fff; font-size:1.1rem;">Thứ 2 - Thứ 7: 08:00 – 17:00</p>
                <p style="color:#888;">Chủ Nhật & Lễ: Nghỉ</p>
            </div>
            <div style="height:150px; border-radius:15px; overflow:hidden; border:1px solid #333;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.847522510344!2d106.68532457476214!3d20.83685649429446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af2763f03f7%3A0x6b7724128f77372b!2zNTcgTMOqIFbEg24gVGh1eeG6vHQsIEvDqm5oIETGsMahbmcsIEzDqiBDaMOibiwgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1715000000000!5m2!1svi!2s6" width="100%" height="100%" style="border:0;"></iframe>
            </div>
        </div>
    </footer>

    <script>
        function spin() {
            const wheel = document.getElementById('wheel');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transform = 'rotate(' + deg + 'deg)';
        }
    </script>
</body>
</html>`;

    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
