export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Luyện Thi Thực Chiến 1000/1000</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            :root { 
                --primary: #FF6600; 
                --bg: #030303; 
                --card: rgba(23, 23, 23, 0.7);
                --text: #ffffff;
                --glass: rgba(255, 255, 255, 0.05);
            }
            * { box-sizing: border-box; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            body { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                background: var(--bg); color: var(--text); 
                margin: 0; line-height: 1.6; overflow-x: hidden;
            }

            /* Nút liên hệ nổi bên phải - Bộ 3 quyền lực */
            .side-social {
                position: fixed; right: 25px; top: 50%; transform: translateY(-50%);
                display: flex; flex-direction: column; gap: 15px; z-index: 9999;
            }
            .social-btn {
                width: 55px; height: 55px; border-radius: 18px;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
            }
            .social-btn img { width: 30px; height: 30px; }
            .btn-zalo { background: #0068ff; }
            .btn-ms { background: linear-gradient(135deg, #0084FF, #A033FF); }
            .btn-fb { background: #1877f2; }
            .social-btn:hover { transform: scale(1.15) translateX(-10px); border-color: var(--primary); }

            /* Header */
            header { 
                padding: 20px 60px; display: flex; justify-content: flex-end; gap: 15px;
                position: sticky; top: 0; background: rgba(3, 3, 3, 0.9); backdrop-filter: blur(20px); z-index: 1000;
                border-bottom: 1px solid rgba(255,255,255,0.03);
            }
            .btn-nav { padding: 12px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.85rem; }
            .btn-trial { border: 1px solid rgba(255,255,255,0.2); color: #fff; }
            .btn-login { background: var(--primary); color: white; box-shadow: 0 8px 25px rgba(255,102,0,0.3); }

            /* Hero - Logo trung tâm cực đại */
            .hero { text-align: center; padding: 100px 20px 80px; }
            .logo-main { width: 420px; max-width: 90%; filter: drop-shadow(0 0 60px rgba(255,102,0,0.2)); margin-bottom: 30px; }
            .hero h1 { font-size: 4.8rem; font-weight: 800; letter-spacing: -4px; margin: 0; line-height: 1; background: linear-gradient(to bottom, #fff, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .hero p { color: #888; font-size: 1.4rem; margin: 25px 0 50px; font-weight: 300; }

            /* Search Bar */
            .search-container { max-width: 650px; margin: 0 auto 120px; }
            .search-box { 
                width: 100%; padding: 24px 35px; border-radius: 100px; border: 1px solid #222;
                background: rgba(255,255,255,0.03); color: white; font-size: 1.1rem; outline: none;
            }
            .search-box:focus { border-color: var(--primary); background: rgba(255,255,255,0.08); }

            /* Container & Cards */
            .container { max-width: 1300px; margin: 0 auto; padding: 0 40px 120px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
            .card { 
                background: var(--card); padding: 50px 40px; border-radius: 40px;
                border: 1px solid rgba(255,255,255,0.05); position: relative;
            }
            .card:hover { border-color: var(--primary); transform: translateY(-15px); background: rgba(30, 30, 30, 0.5); }
            .card h3 { font-size: 1.6rem; margin-bottom: 20px; color: #fff; display: flex; align-items: center; gap: 12px; }
            .card h3::before { content: ''; width: 4px; height: 28px; background: var(--primary); border-radius: 10px; }
            .badge { background: var(--primary); color: white; font-size: 0.75rem; padding: 4px 12px; border-radius: 8px; font-weight: 800; margin-left: 10px; }

            /* Footer - Chỉ tập trung Hải Phòng */
            footer { background: #000; padding: 100px 60px 40px; border-top: 1px solid #111; }
            .footer-grid { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 80px; }
            .footer-h2 { color: var(--primary); font-size: 2.2rem; font-weight: 800; margin-bottom:
