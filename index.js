const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mosbasaumuoi/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

const STYLES = `
<style>
    :root { --primary: #FF5722; --bg: #0A0A0A; --card: #161616; --text: #FFFFFF; --cyan: #00F2FF; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; width: 100%; }

    header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(10,10,10,0.98); position: sticky; top: 0; z-index: 9999; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.4rem; }
    .brand img { height: 40px; }
    .social-nav { display: flex; gap: 12px; }
    .social-nav img { width: 26px; height: 26px; }

    /* ĐẢO GRID: Bảng vàng bên trái (1fr), Vòng quay bên phải (320px) */
    .main-grid { max-width: 1300px; margin: 20px auto; padding: 0 15px; display: grid; grid-template-columns: 1fr 320px; gap: 25px; }
    .card { background: var(--card); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 20px; position: relative; }

    /* BẢNG VÀNG - KHỐNG CHẾ TUYỆT ĐỐI */
    .bv-wrapper { width: 100%; overflow: hidden; background: #000; border-radius: 20px; height: 450px; position: relative; }
    .bv-track { display: flex; height: 100%; animation: scroll 80s linear infinite; width: max-content; align-items: center; }
    .bv-item { flex: 0 0 auto; width: 350px; height: 100%; display: flex; align-items: center; justify-content: center; padding: 0 15px; }
    .bv-item img { max-height: 85%; max-width: 95%; object-fit: contain; border-radius: 12px; }

    /* AI CHAT */
    .ai-box { width: 100%; background: #000; border-radius: 12px; border: 1px solid #333; display: flex; min-height: 75px; padding: 10px; margin-top: 15px; }
    .ai-box input { flex: 1; background: transparent; border: none; color: white; padding: 0 15px; outline: none; font-size: 1rem; }
    .ai-box button { background: var(--cyan); border: none; padding: 0 25px; border-radius: 8px; font-weight: 800; cursor: pointer; color: #000; }

    .bottom-grid { max-width: 1300px; margin: 20px auto; padding: 0 15px; display: grid; grid-template-columns: 1fr 1.8fr 1.5fr; gap: 20px; }
    
    @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    @media (max-width: 1024px) {
        .main-grid, .bottom-grid { grid-template-columns: 1fr; }
        .bv-wrapper { height: 350px; }
        .bv-item { width: 280px; }
    }
</style>
`;

export default {
  async fetch(request, env) {
    let studentImages = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let list = "";
      rows.forEach(row => {
        const url = row.split("\t")[0]?.trim();
        if (url && url.startsWith("http")) list += `<div class="bv-item"><img src="${url}"></div>`;
      });
      studentImages = list + list;
    } catch (e) { studentImages = "Lỗi tải dữ liệu"; }

    const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    ${STYLES}
</head>
<body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
        <nav class="social-nav">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="Zalo"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="FB"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968771.png" alt="Messenger"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YT"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok"></a>
        </nav>
    </header>

    <div class="main-grid">
        <div class="card">
            <h3 style="text-align:center; color:#FFD700; margin-bottom:15px; font-weight:800;">🏆 BẢNG VÀNG CHỨNG CHỈ</h3>
            <div class="bv-wrapper">
                <div class="bv-track">${studentImages}</div>
            </div>
        </div>

        <div class="right-col">
            <div class="card" style="margin-bottom:20px; border: 1px dashed var(--primary); text-align:center;">
                <p>🔥 <b>SIÊU ƯU ĐÃI</b><br>Mua 3 tặng 1<br><span style="color:var(--primary); font-weight:800;">Giảm ngay 400k</span></p>
            </div>
            <div class="card" style="text-align:center;">
                <h3 style="font-size:0.75rem; color:#888; margin-bottom:15px;">VÒNG QUAY MAY MẮN</h3>
                <div style="position:relative; width:170px; height:170px; margin: 0 auto 20px;">
                    <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); border-top:20px solid #FFD700; border-left:8px solid transparent; border-right:8px solid transparent; z-index:10;"></div>
                    <div id="wheel" style="width:100%; height:100%; border-radius:50%; border:6px solid #222; background:conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); transition: transform 5s cubic-bezier(0.1, 0, 0.1, 1);"></div>
                </div>
                <button onclick="spin()" style="background:var(--primary); color:white; border:none; width:100%; padding:12px; border-radius:50px; font-weight:800; cursor:pointer;">QUAY NGAY</button>
            </div>
        </div>
    </div>

    <div class="bottom-grid">
        <div class="card">
            <h4>Thi Thật 100%</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:8px;">Hệ thống mô phỏng chuẩn IIG.</p>
        </div>
        <div class="card">
            <h4 style="color:var(--cyan);">AI Assistant 24/7 ✨</h4>
            <div class="ai-box">
                <input type="text" placeholder="Hỏi mẹo thi MOS 1000/1000...">
                <button>GỬI</button>
            </div>
        </div>
        <div class="card">
            <h4>Đồng Hành</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-top:8px;">Hỗ trợ các tip định dạng luận văn và tin học công sở.</p>
        </div>
    </div>

    <footer style="background:#050505; border-top:1px solid rgba(255,255,255,0.1); padding:40px 5%; margin-top:30px;">
        <div style="max-width:1300px; margin:0 auto; display:grid; grid-template-columns: 1fr 1fr 1.2fr; gap:30px;">
            <div>
                <h3 style="color:var(--primary);">MOS360.VN</h3>
                <p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
                <p>📞 Hotline: 0912.888.360</p>
            </div>
            <div>
                <h4 style="color:var(--cyan); margin-bottom:10px;">LỊCH LÀM VIỆC</h4>
                <p style="font-weight:700; color:#fff;">Thứ 2 - Thứ 7: 08:00 – 17:00</p>
                <p style="color:#666;">Chủ Nhật & Lễ: Nghỉ</p>
            </div>
            <div style="height:150px; border-radius:15px; overflow:hidden; border:1px solid #333;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.8475253633654!2d106.6663248747625!3d20.836814994297622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7061d4734891%3A0xc3f3484f479f6492!2zNTcgTMOqIFbEg24gVGh1eeG6vHQsIEvDqm4gRMawxqFuZywgTMOqIENow6JuLCBI4bqjaSBQaMOybmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1715800000000!5m2!1svi!2s8" width="100%" height="100%" style="border:0;"></iframe>
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
