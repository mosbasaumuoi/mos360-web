const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  STUDENT_PASS: "hocvien360",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png"
};

const UI = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --cyan: #00f2ff; --border: rgba(255,255,255,0.1); }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; }
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.9); border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:100; backdrop-filter: blur(10px); }
        .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; color: var(--primary); text-decoration: none; font-size: 22px; }
        
        .hero { text-align: center; padding: 60px 20px; }
        .hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; }
        .hero p { color: #888; margin-bottom: 30px; }

        .main-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* LAYOUT CHÍNH NHƯ ẢNH 5accdc.png */
        .top-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 25px; margin-bottom: 40px; }
        
        .card-box { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 30px; position: relative; }
        .card-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; justify-content: center; }

        /* VÒNG QUAY */
        .wheel-area { text-align: center; }
        .wheel-img { width: 250px; height: 250px; margin: 0 auto 20px; background: url('https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/vongquay.png') no-repeat center; background-size: contain; }
        .btn-quay { background: var(--primary); color: #fff; border: none; padding: 12px 40px; border-radius: 50px; font-weight: 800; cursor: pointer; width: 100%; }

        /* BẢNG VÀNG */
        .gold-board { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .cert-item { background: #000; border-radius: 15px; overflow: hidden; border: 1px solid #222; }
        .cert-img { width: 100%; aspect-ratio: 1/1; background: #1a1a1a; }
        .promo-tag { background: #E65100; color: #fff; padding: 10px; border-radius: 10px; font-size: 0.8rem; margin-top: 15px; text-align: left; border-left: 4px solid #fff; }

        /* 3 KHỐI DƯỚI */
        .bottom-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 60px; }
        .feat-card { background: var(--card); border: 1px solid var(--border); padding: 25px; border-radius: 20px; }
        .feat-card h4 { color: var(--primary); margin: 0 0 10px 0; }
        .feat-card.active { border-color: var(--cyan); }
        .search-mini { width: 100%; background: #000; border: 1px solid #333; padding: 10px; border-radius: 8px; color: #fff; margin-top: 10px; }

        /* FOOTER */
        footer { border-top: 1px solid var(--border); padding: 50px 0; color: #888; font-size: 0.9rem; }
        .footer-content { display: flex; justify-content: space-between; align-items: flex-start; }
        .map-box { width: 250px; height: 150px; background: #1a1a1a; border-radius: 10px; margin-top: 10px; }
    </style>
</head>
<body>
    <header>
        <a href="/" class="logo"><img src="\${CONFIG.LOGO_URL}" height="35"> <span>MOS360</span></a>
        <button style="background:var(--primary); border:none; color:#fff; padding:8px 18px; border-radius:10px; font-weight:700;">Đăng nhập</button>
    </header>

    <div class="main-container">
        <section class="hero">
            <h1>Chuẩn đầu ra cho sinh viên</h1>
            <p>Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
        </section>

        <div class="top-grid">
            <div class="card-box wheel-area">
                <div class="card-title">🎡 Vòng Quay May Mắn</div>
                <div class="wheel-img"></div>
                <button class="btn-quay">NHẬN QUÀ NGAY</button>
            </div>

            <div class="card-box">
                <div class="card-title">🏆 Bảng Vàng Chứng Chỉ</div>
                <div class="gold-board">
                    <div class="cert-item"><div class="cert-img"></div></div>
                    <div class="cert-item"><div class="cert-img"></div></div>
                </div>
                <div class="promo-tag">
                    <strong>🎁 ƯU ĐÃI NHÓM:</strong><br>Nhóm 3 người giảm ngay 100k mỗi bạn.
                </div>
            </div>
        </div>

        <div class="bottom-features">
            <div class="feat-card">
                <h4>Thi Thật 100%</h4>
                <p>Thực hành trực tiếp trên hệ thống mô phỏng sát 100% đề thi quốc tế của Certiport.</p>
            </div>
            <div class="feat-card active">
                <h4>AI Assistant 24/7 ✨</h4>
                <p>Giải đáp kiến thức tin học và các hàm Excel nhanh chóng:</p>
                <input type="text" class="search-mini" placeholder="Nhập câu hỏi tại đây...">
            </div>
            <div class="feat-card">
                <h4>Đồng Hành Trọn Đời</h4>
                <p>Hỗ trợ kỹ năng định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học tập.</p>
            </div>
        </div>

        <footer>
            <div class="footer-content">
                <div>
                    <strong style="color:#fff">MOS360.VN</strong><br>Hotline: 0912.888.360
                </div>
                <div>Địa chỉ: 57 Lê Văn Thuyết A, An Biên, Hải Phòng</div>
                <div class="map-box">
                    <img src="https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/map-demo.png" style="width:100%; height:100%; border-radius:10px; object-fit:cover;">
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.split("/")[1];

    if (key && !["", "api-search"].includes(key)) {
        const rawData = await env.Links_mos360.get(key);
        if (rawData) return Response.redirect(rawData, 301);
    }

    return new Response(UI, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
