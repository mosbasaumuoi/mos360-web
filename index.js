const CONFIG = {
  TITLE: "MOS360 - Web Tích Hợp",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // --- KHU VỰC 1: XỬ LÝ TRANG CHỦ (WEB TÍCH HỢP) ---
    if (url.pathname === "/" || url.pathname === "/index.html") {
      try {
        const resp = await fetch(CONFIG.SHEET_URL);
        const tsv = await resp.text();
        const studentItems = tsv.split("\n").slice(1).map(row => {
          const link = row.split("\t")[0]?.trim();
          return (link && link.startsWith("http")) ? `<img src="${link}" style="height:250px; margin:10px; border-radius:10px;">` : "";
        }).join("");

        return new Response(this.layout(studentItems + studentItems), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      } catch (e) {
        return fetch(request); // Nếu lỗi Sheet, trả về trang mặc định
      }
    }

    // --- KHU VỰC 2: XỬ LÝ LINK RÚT GỌN (CHỐNG LỖI 522) ---
    // Thay vì fetch(request) thông thường, ta phải tạo một Request mới 
    // để xóa bỏ các Header gây nhiễu từ Cloudflare Worker.
    const modifiedRequest = new Request(request.url, {
      method: request.method,
      headers: new Headers(request.headers),
      redirect: "follow"
    });

    // Xóa header 'cf-connecting-ip' để tránh Hosting chặn Cloudflare
    modifiedRequest.headers.delete("cf-worker"); 

    return fetch(modifiedRequest);
  },

  layout(studentData) {
    return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      body { background:#000; color:#fff; font-family:sans-serif; margin:0; text-align:center; }
      header { padding:15px; border-bottom:1px solid #333; }
      .slider { overflow:hidden; white-space:nowrap; padding:40px 0; }
      .track { display:inline-block; animation: scroll 40s linear infinite; }
      @keyframes scroll { from {transform:translateX(0);} to {transform:translateX(-50%);} }
    </style></head><body>
      <header><h1>MOS360</h1></header>
      <div class="slider"><div class="track">${studentData}</div></div>
    </body></html>`;
  }
};
