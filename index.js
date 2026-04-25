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
                // ÉP ẢNH TO 550PX - THÊM VIỀN TRẮNG ĐỂ DỄ PHÂN BIỆT BẢN MỚI
                htmlContent += `
                    <div style="flex-shrink:0; width:550px; margin-right:30px;">
                        <img src="${link}" style="width:100%; height:380px; object-fit:contain; border-radius:15px; border:4px solid #fff; background:#000;">
                    </div>`;
            }
        });
        return htmlContent + htmlContent;
    } catch (e) {
        return "<span>Lỗi kết nối dữ liệu...</span>";
    }
}

export default {
    async fetch(request, env, ctx) {
        const certs = await fetchCertificates();
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>MOS360 NEW VERSION</title>
            <style>
                body { background: #080808; color: white; font-family: sans-serif; margin: 0; }
                @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                @keyframes spin { to { transform: rotate(360deg); } }
            </style>
        </head>
        <body>
            <div style="padding:20px 50px; border-bottom:1px solid #222; display:flex; justify-content:space-between; align-items:center;">
                <h1 style="color:#FF5722;">MOS360 - BẢN CẬP NHẬT</h1>
                <div style="background:#FF5722; padding:10px 20px; border-radius:10px; font-weight:bold;">ĐĂNG NHẬP</div>
            </div>

            <div style="display:grid; grid-template-columns: 350px 1fr; gap:30px; padding:40px;">
                <div style="background:#111; padding:30px; border-radius:30px; text-align:center;">
                    <div style="width:250px; height:250px; border-radius:50%; border:8px solid gold; margin:auto; background:conic-gradient(red, yellow, blue, red); animation: spin 5s linear infinite;"></div>
                </div>
                <div style="background:#111; padding:30px; border-radius:30px; overflow:hidden;">
                    <h2 style="color:yellow;">ẢNH CHỨNG CHỈ ĐÃ PHÓNG TO</h2>
                    <div style="width:100%; overflow:hidden;">
                        <div style="display:flex; animation: scroll 30s linear infinite; width:max-content;">${certs}</div>
                    </div>
                </div>
            </div>

            <div style="max-width:800px; margin:20px auto; background:#161616; padding:30px; border-radius:25px; border:2px solid #00f2ff;">
                <h3 style="color:#00f2ff;">🤖 AI ASSISTANT ĐÃ XUẤT HIỆN</h3>
                <div style="display:flex; background:#000; padding:5px; border-radius:15px; border:1px solid #333;">
                    <input type="text" placeholder="Gõ câu hỏi tại đây..." style="flex:1; background:transparent; border:none; padding:15px; color:white; outline:none;">
                    <button style="background:#00f2ff; border:none; padding:0 30px; border-radius:10px; font-weight:bold; cursor:pointer;">GỬI</button>
                </div>
            </div>
        </body>
        </html>`;
        
        return new Response(html, {
            headers: { 
                "content-type": "text/html;charset=UTF-8",
                "Cache-Control": "no-cache, no-store, must-revalidate" // ÉP TRÌNH DUYỆT KHÔNG LƯU BẢN CŨ
            },
        });
    },
};
