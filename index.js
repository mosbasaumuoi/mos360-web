export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - AI Learning Platform</title>
        <style>
            :root { --primary: #FF6600; --bg: #050505; --card: #111111; --text: #f0f0f0; --ai: #7000ff; }
            body { font-family: 'Inter', 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); margin: 0; line-height: 1.7; }

            /* Header mỏng nhẹ */
            header { 
                padding: 20px 40px; display: flex; justify-content: flex-end; gap: 15px;
                position: fixed; top: 0; width: 100%; box-sizing: border-box; z-index: 100;
            }
            .btn { padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; transition: 0.4s; font-size: 0.85rem; }
            .btn-trial { border: 1px solid rgba(255,102,0,0.5); color: var(--primary); }
            .btn-login { background: var(--primary); color: white; }
            .btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255,102,0,0.2); }

            /* Hero Section theo Tỷ Lệ Vàng */
            .hero { text-align: center; padding: 120px 20px 60px; position: relative; }
            .logo-wrapper { position: relative; display: inline-block; margin-bottom: 30px; }
            .logo-wrapper::before { 
                content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                width: 250px; height: 250px; background: radial-gradient(circle, rgba(255,102,0,0.15) 0%, rgba(255,102,0,0) 70%);
                z-index: -1;
            }
            .logo-big { width: 320px; height: auto; transition: 0.5s; }
            
            .hero h1 { font-size: 3.5rem; font-weight: 800; letter-spacing: -1px; margin: 0; color: #fff; }
            .hero p { font-size: 1.2rem; color: #777; margin-top: 10px; font-weight: 300; }

            /* Search tinh gọn */
            .search-section { max-width: 650px; margin: 0 auto 80px; padding: 0 20px; }
            .search-box { 
                width: 100%; padding: 20px 30px; border-radius: 100px; border: 1px solid #222; 
                background: #0f0f0f; color: white; font-size: 1rem; outline: none; transition: 0.3s;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }
            .search-box:focus { border-color: var(--primary); box-shadow: 0 0 20px rgba(255,102,0,0.1); }

            .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
            
            /* Grid Features */
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 100px; }
            .card { 
                background: var(--card); padding: 40px; border-radius: 24px; border: 1px solid #1a1a1a;
                transition: 0.4s; position: relative;
            }
            .card:hover { border-color: var(--primary); background: #151515; }
            .card h3 { font-size: 1.25rem; margin-bottom: 15px; color: #fff; display: flex; align-items: center; gap: 10px; }
            .card p { color: #888; font-size: 0.95rem; margin: 0; }
            .dot { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; display: inline-block; }

            /* Footer Pro */
            footer { background: #080808; padding: 100px 40px; border-top: 1px solid #111; }
            .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 80px; }
            
            .f-info h2 { font-size: 1.5rem; margin-bottom: 30px; color: var(--primary); letter-spacing: 1px; }
            .f-item { margin-bottom: 20px; }
            .f-item label { display: block; font-size: 0.75rem; color: #555; text-transform: uppercase; margin-bottom: 5px; }
            .f-item span { font-size: 1rem; color: #bbb; }

            .map-box { border-radius: 30px; overflow: hidden; border: 1px
