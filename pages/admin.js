import { CONFIG } from '../config.js';

import { getLicenseTabHTML, getLicenseTabScript } from './license-ui.js';
import { getResultStatsTabHTML, getResultStatsTabScript } from './result-stats-ui.js';

export function getAdminDashboardUI() {
    return `
<div style="max-width:1400px; margin:20px auto; padding:0 15px;">

    <!-- Header Dashboard -->
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
        <div>
            <h1 style="font-size:1.6rem; font-weight:800; color:#fff;">📊 ADMIN DASHBOARD</h1>
            <p style="color:#64748b; font-size:0.85rem; margin-top:4px;">Quản lý học viên MOS360</p>
        </div>

        <!-- WIDGET THỐNG KÊ TRUY CẬP -->
        <div id="visitStatsWidget" style="background:linear-gradient(135deg,#0a0f2e,#111422);border:1px solid rgba(0,242,255,0.2);border-radius:12px;padding:14px 20px;margin-bottom:16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <div style="text-align:center;min-width:80px">
            <div style="font-size:0.65rem;font-weight:800;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:2px">THỐNG KÊ TRUY CẬP</div>
            <div id="visitTotal" style="font-size:1.6rem;font-weight:900;color:#00f2ff;font-family:monospace;letter-spacing:2px">—</div>
            <div style="font-size:0.62rem;color:#64748b">Tổng tất cả</div>
          </div>
          <div style="width:1px;height:40px;background:rgba(255,255,255,0.08)"></div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div style="text-align:center"><div id="visitToday" style="font-size:1.1rem;font-weight:800;color:#22c55e;font-family:monospace">—</div><div style="font-size:0.62rem;color:#64748b">Hôm nay</div></div>
            <div style="text-align:center"><div id="visitYest" style="font-size:1.1rem;font-weight:800;color:#94a3b8;font-family:monospace">—</div><div style="font-size:0.62rem;color:#64748b">Hôm qua</div></div>
            <div style="text-align:center"><div id="visitWeek" style="font-size:1.1rem;font-weight:800;color:#f59e0b;font-family:monospace">—</div><div style="font-size:0.62rem;color:#64748b">Tuần này</div></div>
            <div style="text-align:center"><div id="visitMonth" style="font-size:1.1rem;font-weight:800;color:#a78bfa;font-family:monospace">—</div><div style="font-size:0.62rem;color:#64748b">Tháng này</div></div>
          </div>
          <button onclick="loadVisitStats()" style="margin-left:auto;padding:5px 10px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:#64748b;border-radius:6px;font-size:0.72rem;cursor:pointer">🔄</button>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button onclick="switchTab('tabStudents')" style="padding:9px 18px; background:#1e2235; border:1px solid #384260; color:#00f2ff; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">👥 Học viên Online</button>
            <button onclick="switchTab('tabMosReg');loadMosRegistrations();" style="padding:9px 18px; background:rgba(34,197,94,0.12); border:1px solid rgba(34,197,94,0.35); color:#22c55e; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">💰 Đăng ký học MOS</button>
            <button onclick="switchTab('tabPromo')" style="padding:9px 18px; background:rgba(255,87,34,0.15); border:1px solid rgba(255,87,34,0.4); color:#FF5722; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">🔥 Khuyến mãi</button>
            <button onclick="switchTab('tabLicense');loadLicenseList();loadPendingRequests();loadFailedRequests();" style="padding:9px 18px; background:rgba(0,242,255,0.12); border:1px solid rgba(0,242,255,0.35); color:#00f2ff; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">🔑 Mật khẩu MOS</button>
            <button onclick="switchTab('tabResultStats');loadResultStats('today');" style="padding:9px 18px; background:rgba(34,197,94,0.12); border:1px solid rgba(34,197,94,0.35); color:#22c55e; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">📊 Kết quả MOS</button>
            <button onclick="loadDashboard()" style="padding:9px 18px; background:#1e2235; border:1px solid #384260; color:#94a3b8; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">🔄 Làm mới</button>
        </div>
    </div>

    <!-- Modal Sửa Đăng ký học MOS -->
    <div id="editMosRegModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:9999; align-items:center; justify-content:center; padding:16px;">
        <div style="background:#111422; border:1px solid #384260; border-radius:16px; padding:28px; width:100%; max-width:480px; max-height:90vh; overflow-y:auto;">
            <h3 style="color:#fff; margin-bottom:6px; font-size:1.2rem;">✏️ Sửa đăng ký học MOS</h3>
            <p style="color:#64748b; font-size:0.8rem; margin-bottom:18px;">Mã đăng ký: <code id="editMosMaDangKy" style="color:#00f2ff"></code> — không đổi được.</p>
            <div style="display:flex; flex-direction:column; gap:12px;">
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">HỌ TÊN</label>
                    <input type="text" id="editMosTen" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">SỐ ĐIỆN THOẠI</label>
                        <input type="text" id="editMosSdt" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">EMAIL</label>
                        <input type="email" id="editMosEmail" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                </div>
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">KHÓA HỌC (cách nhau bằng dấu phẩy)</label>
                    <input type="text" id="editMosKhoaHoc" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">SỐ TIỀN (VNĐ)</label>
                        <input type="number" id="editMosSoTien" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#22c55e; font-weight:700; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">SỐ TIỀN CỌC (VNĐ)</label>
                        <input type="number" id="editMosSoTienCoc" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#f59e0b; font-weight:700; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                </div>
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">MÃ GIẢM GIÁ</label>
                    <input type="text" id="editMosMagg" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                </div>
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">GHI CHÚ</label>
                    <textarea id="editMosGhiChu" rows="2" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box; resize:vertical;"></textarea>
                </div>
            </div>
            <div style="display:flex; gap:10px; margin-top:22px;">
                <button onclick="submitEditMosReg()" style="flex:1; padding:12px; background:linear-gradient(135deg,#00b8d4,#00f2ff); border:none; color:#0a0f2e; border-radius:8px; font-weight:800; cursor:pointer;">💾 LƯU THAY ĐỔI</button>
                <button onclick="document.getElementById('editMosRegModal').style.display='none'" style="flex:1; padding:12px; background:#1e2235; border:1px solid #384260; color:#94a3b8; border-radius:8px; font-weight:700; cursor:pointer;">HỦY</button>
            </div>
        </div>
    </div>


      <div style="background:#111422;border:1px solid rgba(34,197,94,0.2);border-radius:16px;padding:28px;margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <h2 style="font-size:1.1rem;font-weight:800;color:#fff">💰 Đăng ký học MOS — Thanh toán</h2>
          <button onclick="loadMosRegistrations()" style="padding:6px 12px;background:#1e2235;border:1px solid #384260;color:#94a3b8;border-radius:6px;font-size:0.78rem;cursor:pointer">🔄</button>
        </div>
        <p style="font-size:0.82rem;color:#64748b;margin-bottom:16px">Đối chiếu sao kê ngân hàng theo đúng <b>Mã đăng ký</b> trong nội dung chuyển khoản, rồi bấm Xác nhận — hệ thống tự gửi email hướng dẫn cho học viên.</p>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
            <thead>
              <tr style="text-align:left;color:#64748b;font-size:0.72rem;font-weight:700;border-bottom:1px solid rgba(255,255,255,0.08)">
                <th style="padding:8px 6px;width:36px">STT</th>
                <th style="padding:8px 6px">HỌ TÊN</th>
                <th style="padding:8px 6px">SĐT / EMAIL</th>
                <th style="padding:8px 6px">KHÓA HỌC</th>
                <th style="padding:8px 6px">MÃ ĐĂNG KÝ</th>
                <th style="padding:8px 6px">SỐ TIỀN</th>
                <th style="padding:8px 6px">TRẠNG THÁI</th>
                <th style="padding:8px 6px"></th>
              </tr>
            </thead>
            <tbody id="mosRegTableBody"><tr><td colspan="8" style="padding:20px;text-align:center;color:#64748b">Đang tải...</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB KHUYẾN MÃI -->
    <div id="tabPromo" style="display:none">
      <div style="background:#111422;border:1px solid rgba(255,87,34,0.2);border-radius:16px;padding:28px;max-width:700px">
        <h2 style="font-size:1.1rem;font-weight:800;color:#fff;margin-bottom:4px">🔥 Quản lý Khuyến mãi</h2>
        <p style="font-size:0.82rem;color:#64748b;margin-bottom:24px">Bật/tắt và chỉnh nội dung — áp dụng ngay lên trang chủ, không cần deploy lại.</p>

        <!-- Bật/tắt -->
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:14px;background:rgba(255,87,34,0.06);border:1px solid rgba(255,87,34,0.2);border-radius:10px">
          <input type="checkbox" id="promoActive" style="width:20px;height:20px;accent-color:#FF5722;cursor:pointer" onchange="updatePromoPreview()">
          <label for="promoActive" style="font-weight:800;color:#fff;cursor:pointer;font-size:0.95rem">Bật khuyến mãi</label>
          <span style="font-size:0.78rem;color:#64748b">— Tắt = ẩn hoàn toàn khỏi trang chủ</span>
        </div>

        <div style="display:grid;grid-template-columns:80px 1fr;gap:12px;margin-bottom:14px">
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">ICON / BADGE</label>
            <input id="promoBadge" type="text" value="🔥" oninput="updatePromoPreview()" style="width:100%;padding:9px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:1.2rem;text-align:center">
          </div>
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">TIÊU ĐỀ <span style="color:#ef4444">*</span></label>
            <input id="promoTitle" type="text" placeholder="VD: Tháng 6 — Giảm 30% khi đăng ký nhóm" oninput="updatePromoPreview()" style="width:100%;padding:9px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.88rem">
          </div>
        </div>

        <div style="margin-bottom:14px">
          <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">MÔ TẢ NGẮN (hiện trên banner)</label>
          <input id="promoSubtitle" type="text" placeholder="VD: Đăng ký nhóm 5 người — tiết kiệm ngay 150.000đ/người" oninput="updatePromoPreview()" style="width:100%;padding:9px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.88rem">
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">MÀU CHỦ ĐẠO</label>
            <div style="display:flex;gap:8px;align-items:center">
              <input id="promoColor" type="color" value="#FF5722" onchange="updatePromoPreview()" style="width:44px;height:36px;border:none;border-radius:8px;cursor:pointer;padding:2px">
              <input type="text" oninput="document.getElementById('promoColor').value=this.value;updatePromoPreview()" placeholder="#FF5722" style="flex:1;padding:9px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.85rem">
            </div>
          </div>
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">NGÀY HẾT HẠN</label>
            <input id="promoDeadline" type="datetime-local" onchange="updatePromoPreview()" style="width:100%;padding:9px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.85rem">
          </div>
        </div>

        <div style="display:flex;gap:20px;margin-bottom:20px">
          <label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:0.85rem;color:#94a3b8">
            <input type="checkbox" id="promoShowBanner" checked style="accent-color:#FF5722"> Hiện banner trên cùng
          </label>
          <label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:0.85rem;color:#94a3b8">
            <input type="checkbox" id="promoShowSection" checked style="accent-color:#FF5722"> Hiện section chi tiết
          </label>
        </div>

        <div style="margin-bottom:20px">
          <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">
            CÁC MỨC GIẢM GIÁ (JSON) — <span style="font-weight:400">để trống nếu không cần</span>
          </label>
          <textarea id="promoDiscounts" rows="6" placeholder='[
  {"label":"–30%","title":"Nhóm 10 người","note":"Tiết kiệm 240.000đ/người"},
  {"label":"–10%","title":"Nhóm 5 người","note":"Tiết kiệm 80.000đ/người"}
]' style="width:100%;padding:10px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#94a3b8;font-size:0.8rem;font-family:monospace;resize:vertical"></textarea>
        </div>

        <!-- Preview -->
        <div style="margin-bottom:20px">
          <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:8px">PREVIEW BANNER</label>
          <div id="promoPreview" style="border-radius:8px;overflow:hidden"></div>
        </div>

        <div style="display:flex;gap:10px">
          <button id="btnSavePromo" onclick="savePromo()" style="flex:1;padding:12px;background:linear-gradient(135deg,#FF5722,#ff784e);color:#fff;border:none;border-radius:10px;font-weight:800;font-size:0.95rem;cursor:pointer">💾 Lưu & Kích hoạt</button>
          <button onclick="document.getElementById('promoActive').checked=false;savePromo()" style="padding:12px 20px;background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3);border-radius:10px;font-weight:700;font-size:0.88rem;cursor:pointer">⏹ Tắt KM</button>
        </div>
      </div>

      <!-- BẢNG MÃ GIẢM GIÁ — khác với banner ở trên: đây là danh sách mã
           cụ thể, có thời hạn riêng từng mã, học viên CHỌN (không gõ tay)
           trên form đăng ký. Chỉ mã còn hiệu lực mới hiện trong dropdown. -->
      <div style="background:#111422;border:1px solid rgba(0,242,255,0.2);border-radius:16px;padding:28px;max-width:900px;margin-top:20px">
        <h2 style="font-size:1.1rem;font-weight:800;color:#fff;margin-bottom:4px">🎟️ Bảng mã giảm giá</h2>
        <p style="font-size:0.82rem;color:#64748b;margin-bottom:20px">Học viên gõ <b>Mã</b> khi đăng ký. Cột <b>Áp dụng</b> quyết định mã hiện ở form nào (Học MOS / Học Online / Cả hai) — cấu trúc mã giống hệt nhau cho cả 2 loại. "Mã con" (MP1/MP2/MP3) chỉ dùng nội bộ để xác định số môn được áp dụng giá <b>Cọc</b> — học viên không nhìn thấy. Chọn "-- Không --" nếu đây là mã <b>Giảm giá cố định</b> thông thường (dùng cột Giảm).</p>

        <div style="overflow-x:auto;margin-bottom:16px">
          <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
            <thead>
              <tr style="text-align:left;color:#64748b;font-size:0.72rem;font-weight:700">
                <th style="padding:8px 6px;min-width:180px">NỘI DUNG</th>
                <th style="padding:8px 6px;min-width:110px">MÃ</th>
                <th style="padding:8px 6px;min-width:100px">ÁP DỤNG</th>
                <th style="padding:8px 6px;min-width:90px">MÃ CON</th>
                <th style="padding:8px 6px;min-width:100px">CỌC (VNĐ)</th>
                <th style="padding:8px 6px;min-width:110px">HỌC PHÍ MÔN DƯ</th>
                <th style="padding:8px 6px;min-width:100px">GIẢM (VNĐ)</th>
                <th style="padding:8px 6px;min-width:130px">TỪ NGÀY</th>
                <th style="padding:8px 6px;min-width:130px">ĐẾN NGÀY</th>
                <th style="padding:8px 6px;text-align:center">BẬT</th>
                <th style="padding:8px 6px"></th>
              </tr>
            </thead>
            <tbody id="promoCodesTableBody"></tbody>
          </table>
        </div>

        <div style="display:flex;gap:10px">
          <button onclick="addPromoCodeRow()" style="padding:10px 18px;background:#1e2235;border:1px solid #384260;color:#00f2ff;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">➕ Thêm mã mới</button>
          <button onclick="savePromoCodes()" style="flex:1;padding:10px 18px;background:linear-gradient(135deg,#00b8d4,#00f2ff);color:#0a0f2e;border:none;border-radius:8px;font-weight:800;font-size:0.9rem;cursor:pointer">💾 Lưu bảng mã</button>
        </div>
      </div>
    </div>

    <!-- TAB CẤP MẬT KHẨU -->
    ${getLicenseTabHTML()}
    ${getResultStatsTabHTML()}

    <!-- TAB HỌC VIÊN -->
    <div id="tabStudents">
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; margin-bottom:24px;" id="statsCards">
        <div class="stat-card" style="background:#111422; border:1px solid rgba(0,242,255,0.2); border-radius:14px; padding:20px;">
            <div style="font-size:0.75rem; color:#64748b; font-weight:700; letter-spacing:0.5px;">TỔNG HỌC VIÊN ACTIVE</div>
            <div style="font-size:2.2rem; font-weight:800; color:#00f2ff; margin-top:6px;" id="statTotal">—</div>
        </div>
        <div class="stat-card" style="background:#111422; border:1px solid rgba(255,87,34,0.2); border-radius:14px; padding:20px;">
            <div style="font-size:0.75rem; color:#64748b; font-weight:700; letter-spacing:0.5px;">SẮP HẾT HẠN (≤7 ngày)</div>
            <div style="font-size:2.2rem; font-weight:800; color:#FF5722; margin-top:6px;" id="statExpiring">—</div>
        </div>
        <div class="stat-card" style="background:#111422; border:1px solid rgba(239,68,68,0.2); border-radius:14px; padding:20px;">
            <div style="font-size:0.75rem; color:#64748b; font-weight:700; letter-spacing:0.5px;">ĐÃ HẾT HẠN</div>
            <div style="font-size:2.2rem; font-weight:800; color:#ef4444; margin-top:6px;" id="statExpired">—</div>
        </div>
        <div class="stat-card" style="background:#111422; border:1px solid rgba(34,197,94,0.2); border-radius:14px; padding:20px;">
            <div style="font-size:0.75rem; color:#64748b; font-weight:700; letter-spacing:0.5px;">TỔNG ĐĂNG KÝ</div>
            <div style="font-size:2.2rem; font-weight:800; color:#22c55e; margin-top:6px;" id="statAll">—</div>
        </div>
    </div>

    <!-- Filters & Search -->
    <div style="background:#111422; border:1px solid rgba(255,255,255,0.06); border-radius:14px; padding:16px; margin-bottom:16px; display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <input type="text" id="searchInput" placeholder="🔍 Tìm SĐT hoặc khóa học..." oninput="filterTable()"
            style="flex:1; min-width:200px; padding:10px 14px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.9rem;">
        <select id="filterStatus" onchange="filterTable()"
            style="padding:10px 14px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.9rem; cursor:pointer;">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">⏳ Chờ duyệt (đăng ký online)</option>
            <option value="active">✅ Còn hạn</option>
            <option value="expiring">⚠️ Sắp hết hạn</option>
            <option value="expired">❌ Đã hết hạn</option>
        </select>
        <select id="filterCourse" onchange="filterTable()"
            style="padding:10px 14px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.9rem; cursor:pointer;">
            <option value="all">Tất cả khóa học</option>
            <option value="MOS WORD 2019">MOS WORD 2019</option>
            <option value="MOS EXCEL 2019">MOS EXCEL 2019</option>
            <option value="MOS PPT 2019">MOS PPT 2019</option>
            <option value="MOS WORD 365">MOS WORD 365</option>
            <option value="MOS EXCEL 365">MOS EXCEL 365</option>
            <option value="MOS PPT 365">MOS PPT 365</option>
            <option value="IC3 GS6">IC3 GS6</option>
            <option value="GENERATIVE AI">GENERATIVE AI</option>
            <option value="AI PRODUCTIVITY">AI PRODUCTIVITY</option>
        </select>
    </div>

    <!-- Table -->
    <div style="background:#111422; border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden;">
        <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse;" id="studentTable">
                <thead>
                    <tr style="background:#1a1f35; border-bottom:1px solid rgba(255,255,255,0.06);">
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">#</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">HỌ TÊN</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">KHÓA HỌC</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">SỐ ĐIỆN THOẠI</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">NGÀY ĐK</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">HẾT HẠN</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">THIẾT BỊ</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">TRẠNG THÁI</th>
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">THAO TÁC</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr><td colspan="9" style="padding:40px; text-align:center; color:#64748b;">Đang tải dữ liệu...</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal Gia hạn -->
    <div id="renewModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:9999; align-items:center; justify-content:center;">
        <div style="background:#111422; border:1px solid #384260; border-radius:16px; padding:28px; width:90%; max-width:420px;">
            <h3 style="color:#fff; margin-bottom:6px; font-size:1.2rem;">🔄 Gia hạn học viên</h3>
            <p style="color:#64748b; font-size:0.85rem; margin-bottom:20px;" id="renewInfo"></p>
            <div>
                <label style="font-size:0.8rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:6px;">NGÀY HẾT HẠN MỚI</label>
                <input type="date" id="renewDate" style="width:100%; padding:12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.9rem;">
            </div>
            <input type="hidden" id="renewPhone">
            <input type="hidden" id="renewCourse">
            <input type="hidden" id="renewRow">
            <div style="display:flex; gap:10px; margin-top:20px;">
                <button onclick="submitRenew()" style="flex:1; padding:12px; background:linear-gradient(135deg,#22c55e,#16a34a); border:none; color:#fff; border-radius:8px; font-weight:800; cursor:pointer;">XÁC NHẬN GIA HẠN</button>
                <button onclick="document.getElementById('renewModal').style.display='none'" style="flex:1; padding:12px; background:#1e2235; border:1px solid #384260; color:#94a3b8; border-radius:8px; font-weight:700; cursor:pointer;">HỦY</button>
            </div>
        </div>
    </div>
    <!-- Modal Sửa thông tin -->
    <div id="editModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:9999; align-items:center; justify-content:center; padding:16px;">
        <div style="background:#111422; border:1px solid #384260; border-radius:16px; padding:28px; width:100%; max-width:480px; max-height:90vh; overflow-y:auto;">
            <h3 style="color:#fff; margin-bottom:6px; font-size:1.2rem;">✏️ Sửa thông tin học viên</h3>
            <p style="color:#64748b; font-size:0.8rem; margin-bottom:18px;">Sửa xong bấm Lưu — dữ liệu cập nhật thẳng vào Google Sheet.</p>
            <div style="display:flex; flex-direction:column; gap:12px;">
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">HỌ TÊN</label>
                    <input type="text" id="editName" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">SỐ ĐIỆN THOẠI</label>
                        <input type="text" id="editPhone" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">KHÓA HỌC</label>
                        <select id="editCourse" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                            <option>MOS WORD 2019</option><option>MOS EXCEL 2019</option><option>MOS PPT 2019</option>
                            <option>MOS WORD 365</option><option>MOS EXCEL 365</option><option>MOS PPT 365</option>
                            <option>IC3 GS6</option><option>GENERATIVE AI</option><option>AI PRODUCTIVITY</option>
                        </select>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">TRƯỜNG</label>
                        <input type="text" id="editSchool" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">LỚP / KHOA</label>
                        <input type="text" id="editClassInfo" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                </div>
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">KÊNH BIẾT ĐẾN</label>
                    <input type="text" id="editChannel" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">MÃ GIẢM GIÁ</label>
                        <input type="text" id="editPromoCode" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">LINK FACEBOOK</label>
                        <input type="text" id="editFacebook" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                </div>
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">NGƯỜI GIỚI THIỆU / TRƯỞNG NHÓM</label>
                    <input type="text" id="editReferrer" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                </div>
                <div>
                    <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">GHI CHÚ</label>
                    <textarea id="editNote" rows="2" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box; resize:vertical;"></textarea>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">NGÀY ĐĂNG KÝ</label>
                        <input type="text" id="editDate" placeholder="dd/mm/yyyy" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="font-size:0.75rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:5px;">HẾT HẠN <span style="font-weight:400;">(để trống = Chờ duyệt)</span></label>
                        <input type="text" id="editExpire" placeholder="dd/mm/yyyy" style="width:100%; padding:10px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.88rem; box-sizing:border-box;">
                    </div>
                </div>
            </div>
            <input type="hidden" id="editOldPhone">
            <input type="hidden" id="editOldCourse">
            <div style="display:flex; gap:10px; margin-top:22px;">
                <button onclick="submitEdit()" style="flex:1; padding:12px; background:linear-gradient(135deg,#00b8d4,#00f2ff); border:none; color:#0a0f2e; border-radius:8px; font-weight:800; cursor:pointer;">💾 LƯU THAY ĐỔI</button>
                <button onclick="document.getElementById('editModal').style.display='none'" style="flex:1; padding:12px; background:#1e2235; border:1px solid #384260; color:#94a3b8; border-radius:8px; font-weight:700; cursor:pointer;">HỦY</button>
            </div>
        </div>
    </div>
    </div><!-- end tabStudents -->

</div>

<script>
var allStudents = [];
var ADMIN_TOKEN = 'mos360admin2026';

function adminFetch(url, options) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers['X-Admin-Token'] = ADMIN_TOKEN;
    // Also add token to URL
    var sep = url.includes('?') ? '&' : '?';
    return fetch(url + sep + 'token=' + ADMIN_TOKEN, options);
}

function parseExpire(str) {
    if (!str) return null;
    str = str.trim();
    var parts = str.includes('/') ? str.split('/') : str.split('-');
    if (parts.length < 3) return null;
    var y = parseInt(parts[2]); if (y < 100) y += 2000;
    if (str.includes('/')) return new Date(y, parseInt(parts[1])-1, parseInt(parts[0]), 23,59,59);
    return new Date(y, parseInt(parts[1])-1, parseInt(parts[2]), 23,59,59);
}

function getStatus(expireStr) {
    // Hạn dùng để trống = học viên online mới tự đăng ký qua web, admin
    // chưa đối chiếu thanh toán và Gia hạn — chưa đăng nhập được.
    if (!expireStr || !expireStr.trim()) return 'pending';
    var d = parseExpire(expireStr);
    if (!d) return 'unknown';
    var now = new Date();
    if (d < now) return 'expired';
    var diff = (d - now) / (1000*60*60*24);
    if (diff <= 7) return 'expiring';
    return 'active';
}

function statusBadge(expireStr) {
    var s = getStatus(expireStr);
    if (s === 'pending') return '<span style="background:rgba(148,163,184,0.15); color:#94a3b8; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">⏳ Chờ duyệt</span>';
    if (s === 'expired') return '<span style="background:rgba(239,68,68,0.15); color:#ef4444; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">❌ Hết hạn</span>';
    if (s === 'expiring') return '<span style="background:rgba(255,87,34,0.15); color:#FF5722; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">⚠️ Sắp hết</span>';
    return '<span style="background:rgba(34,197,94,0.15); color:#22c55e; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">✅ Còn hạn</span>';
}

async function getDeviceCount(phone, course) {
    try {
        var res = await adminFetch('/api/admin/devices?phone=' + encodeURIComponent(phone) + '&course=' + encodeURIComponent(course));
        var data = await res.json();
        return data.count || 0;
    } catch(e) { return '?'; }
}

async function loadDashboard() {
    document.getElementById('tableBody').innerHTML = '<tr><td colspan="9" style="padding:40px; text-align:center; color:#64748b;">Đang tải...</td></tr>';
    try {
        var res = await adminFetch('/api/admin/students');
        var data = await res.json();
        allStudents = data.students || [];
        updateStats();
        renderTable(allStudents);
    } catch(e) {
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="9" style="padding:40px; text-align:center; color:#ef4444;">Lỗi tải dữ liệu!</td></tr>';
    }
}

function updateStats() {
    var total = 0, expiring = 0, expired = 0;
    allStudents.forEach(function(s) {
        var st = getStatus(s.expire);
        if (st === 'active') total++;
        else if (st === 'expiring') { total++; expiring++; }
        else if (st === 'expired') expired++;
    });
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statExpiring').textContent = expiring;
    document.getElementById('statExpired').textContent = expired;
    document.getElementById('statAll').textContent = allStudents.length;
}

function renderTable(students) {
    var tbody = document.getElementById('tableBody');
    if (!students.length) {
        tbody.innerHTML = '<tr><td colspan="9" style="padding:40px; text-align:center; color:#64748b;">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = students.map(function(s, i) {
        var st = getStatus(s.expire);
        var rowBg = st === 'expired' ? 'rgba(239,68,68,0.03)' : st === 'expiring' ? 'rgba(255,87,34,0.03)' : 'transparent';
        return '<tr style="border-bottom:1px solid rgba(255,255,255,0.04); background:' + rowBg + ';">' +
            '<td style="padding:12px 16px; color:#64748b; font-size:0.85rem;">' + (i+1) + '</td>' +
            '<td style="padding:12px 16px; color:#e2e8f0; font-size:0.85rem;">' + (s.name || '<span style="color:#384260;">—</span>') + '</td>' +
            '<td style="padding:12px 16px; font-weight:700; font-size:0.88rem; color:#e2e8f0;">' + (s.course||'') + '</td>' +
            '<td style="padding:12px 16px; font-family:monospace; color:#00f2ff; font-size:0.9rem;">' + (s.phone||'') + '</td>' +
            '<td style="padding:12px 16px; color:#94a3b8; font-size:0.85rem;">' + (s.date||'') + '</td>' +
            '<td style="padding:12px 16px; color:#94a3b8; font-size:0.85rem;">' + (s.expire||'') + '</td>' +
            '<td style="padding:12px 16px; color:#94a3b8; font-size:0.85rem;" id="dev-' + i + '"><span style="color:#384260;">—</span></td>' +
            '<td style="padding:12px 16px;">' + statusBadge(s.expire) + '</td>' +
            '<td style="padding:12px 16px;">' +
                '<div style="display:flex; gap:6px; flex-wrap:wrap;">' +
                '<button onclick="openRenewModal(' + JSON.stringify(s).replace(/"/g,"&quot;") + ',' + i + ')" style="padding:5px 10px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">🔄 Gia hạn</button>' +
                '<button onclick="openEditModal(' + JSON.stringify(s).replace(/"/g,"&quot;") + ')" style="padding:5px 10px; background:rgba(0,242,255,0.1); border:1px solid rgba(0,242,255,0.3); color:#00f2ff; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">✏️ Sửa</button>' +
                '<button onclick="resetDevices(&quot;' + s.phone + '&quot;,&quot;' + s.course + '&quot;)" style="padding:5px 10px; background:rgba(255,87,34,0.1); border:1px solid rgba(255,87,34,0.3); color:#FF5722; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">📱 Reset TB</button>' +
                '<button onclick="confirmDeleteStudent(' + JSON.stringify(s).replace(/"/g,"&quot;") + ')" style="padding:5px 10px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); color:#ef4444; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">🗑️ Xóa</button>' +
                '</div>' +
            '</td>' +
        '</tr>';
    }).join('');
    // Load device counts async
    students.forEach(function(s, i) {
        getDeviceCount(s.phone, s.course).then(function(count) {
            var el = document.getElementById('dev-' + i);
            if (el) el.innerHTML = '<span style="color:' + (count >= 3 ? '#ef4444' : '#94a3b8') + ';">' + count + '/3</span>';
        });
    });
}

function filterTable() {
    var search = document.getElementById('searchInput').value.toLowerCase();
    var status = document.getElementById('filterStatus').value;
    var course = document.getElementById('filterCourse').value;
    var filtered = allStudents.filter(function(s) {
        var matchSearch = !search || (s.phone||'').includes(search) || (s.course||'').toLowerCase().includes(search) || (s.name||'').toLowerCase().includes(search);
        var matchStatus = status === 'all' || getStatus(s.expire) === status;
        var matchCourse = course === 'all' || (s.course||'') === course;
        return matchSearch && matchStatus && matchCourse;
    });
    renderTable(filtered);
}

function openRenewModal(student, rowIdx) {
    document.getElementById('renewInfo').textContent = student.phone + ' — ' + student.course;
    document.getElementById('renewPhone').value = student.phone;
    document.getElementById('renewCourse').value = student.course;
    document.getElementById('renewRow').value = rowIdx;
    var next = new Date(); next.setDate(next.getDate() + 30);
    document.getElementById('renewDate').value = next.toISOString().split('T')[0];
    document.getElementById('renewModal').style.display = 'flex';
}

async function submitRenew() {
    var phone = document.getElementById('renewPhone').value;
    var course = document.getElementById('renewCourse').value;
    var date = document.getElementById('renewDate').value;
    if (!date) { alert('Vui lòng chọn ngày hết hạn mới!'); return; }
    var parts = date.split('-');
    var expireFormatted = parts[2] + '/' + parts[1] + '/' + parts[0];
    try {
        var res = await adminFetch('/api/admin/renew', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, course, expire: expireFormatted })
        });
        var data = await res.json();
        if (data.success) {
            alert('✅ Gia hạn thành công!');
            document.getElementById('renewModal').style.display = 'none';
            loadDashboard();
        } else { alert('❌ Lỗi: ' + data.msg); }
    } catch(e) { alert('Lỗi kết nối!'); }
}

function openEditModal(student) {
    document.getElementById('editOldPhone').value = student.phone || '';
    document.getElementById('editOldCourse').value = student.course || '';
    document.getElementById('editName').value = student.name || '';
    document.getElementById('editPhone').value = student.phone || '';
    document.getElementById('editCourse').value = student.course || '';
    document.getElementById('editSchool').value = student.school || '';
    document.getElementById('editClassInfo').value = student.classInfo || '';
    document.getElementById('editChannel').value = student.channel || '';
    document.getElementById('editPromoCode').value = student.promoCode || '';
    document.getElementById('editFacebook').value = student.facebook || '';
    document.getElementById('editReferrer').value = student.referrer || '';
    document.getElementById('editNote').value = student.note || '';
    document.getElementById('editDate').value = student.date || '';
    document.getElementById('editExpire').value = student.expire || '';
    document.getElementById('editModal').style.display = 'flex';
}

async function submitEdit() {
    var payload = {
        oldPhone: document.getElementById('editOldPhone').value,
        oldCourse: document.getElementById('editOldCourse').value,
        name: document.getElementById('editName').value.trim(),
        phone: document.getElementById('editPhone').value.trim(),
        course: document.getElementById('editCourse').value,
        school: document.getElementById('editSchool').value.trim(),
        classInfo: document.getElementById('editClassInfo').value.trim(),
        channel: document.getElementById('editChannel').value.trim(),
        promoCode: document.getElementById('editPromoCode').value.trim(),
        facebook: document.getElementById('editFacebook').value.trim(),
        referrer: document.getElementById('editReferrer').value.trim(),
        note: document.getElementById('editNote').value.trim(),
        date: document.getElementById('editDate').value.trim(),
        expire: document.getElementById('editExpire').value.trim()
    };
    if (!payload.phone || !payload.course) { alert('Vui lòng nhập đủ SĐT và Khóa học!'); return; }
    try {
        var res = await adminFetch('/api/admin/update-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        var data = await res.json();
        if (data.success) {
            alert('✅ Đã lưu thay đổi!');
            document.getElementById('editModal').style.display = 'none';
            loadDashboard();
        } else { alert('❌ Lỗi: ' + data.msg); }
    } catch(e) { alert('Lỗi kết nối!'); }
}

async function confirmDeleteStudent(student) {
    if (!confirm('Xóa học viên "' + (student.name || student.phone) + '" — ' + student.course + '?\\nHành động này KHÔNG thể hoàn tác.')) return;
    try {
        var res = await adminFetch('/api/admin/delete-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: student.phone, course: student.course })
        });
        var data = await res.json();
        if (data.success) { alert('✅ Đã xóa học viên!'); loadDashboard(); }
        else { alert('❌ Lỗi: ' + data.msg); }
    } catch(e) { alert('Lỗi kết nối!'); }
}

async function resetDevices(phone, course) {
    if (!confirm('Reset thiết bị cho ' + phone + ' - ' + course + '?')) return;
    try {
        var res = await adminFetch('/api/admin/reset-devices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, course })
        });
        var data = await res.json();
        if (data.success) { alert('✅ Reset thiết bị thành công!'); loadDashboard(); }
        else { alert('❌ Lỗi: ' + data.msg); }
    } catch(e) { alert('Lỗi kết nối!'); }
}

window.addEventListener('DOMContentLoaded', () => { loadDashboard(); loadPromo(); loadPromoCodes(); });

// ── QUẢN LÝ KHUYẾN MÃI ─────────────────────────────────
async function loadPromo() {
  try {
    var res = await adminFetch('/api/admin/promo');
    var data = await res.json();
    if (!data.success) return;
    var p = data.promo;
    document.getElementById('promoActive').checked   = !!p.active;
    document.getElementById('promoBadge').value      = p.badge    || '🔥';
    document.getElementById('promoTitle').value      = p.title    || '';
    document.getElementById('promoSubtitle').value   = p.subtitle || '';
    document.getElementById('promoColor').value      = p.color    || '#FF5722';
    document.getElementById('promoDeadline').value   = p.deadline || '';
    document.getElementById('promoShowBanner').checked  = p.showBanner  !== false;
    document.getElementById('promoShowSection').checked = p.showSection !== false;
    document.getElementById('promoDiscounts').value  = JSON.stringify(p.discounts || [], null, 2);
    updatePromoPreview();
  } catch(e) { console.error('loadPromo:', e); }
}

async function savePromo() {
  var btn = document.getElementById('btnSavePromo');
  btn.disabled = true; btn.textContent = '⏳ Đang lưu...';
  try {
    var discounts = [];
    try { discounts = JSON.parse(document.getElementById('promoDiscounts').value || '[]'); } catch(e) {}
    var payload = {
      active:      document.getElementById('promoActive').checked,
      badge:       document.getElementById('promoBadge').value.trim(),
      title:       document.getElementById('promoTitle').value.trim(),
      subtitle:    document.getElementById('promoSubtitle').value.trim(),
      color:       document.getElementById('promoColor').value,
      deadline:    document.getElementById('promoDeadline').value,
      showBanner:  document.getElementById('promoShowBanner').checked,
      showSection: document.getElementById('promoShowSection').checked,
      discounts:   discounts
    };
    var res = await adminFetch('/api/admin/promo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    var data = await res.json();
    alert(data.success ? '✅ Đã lưu! Refresh trang chủ để thấy thay đổi.' : '❌ ' + data.msg);
  } catch(e) { alert('❌ Lỗi kết nối!'); }
  finally { btn.disabled = false; btn.textContent = '💾 Lưu & Kích hoạt'; }
}

function updatePromoPreview() {
  var active   = document.getElementById('promoActive').checked;
  var badge    = document.getElementById('promoBadge').value;
  var title    = document.getElementById('promoTitle').value;
  var subtitle = document.getElementById('promoSubtitle').value;
  var color    = document.getElementById('promoColor').value;
  var deadline = document.getElementById('promoDeadline').value;
  var prev     = document.getElementById('promoPreview');
  if (!active || !title) {
    prev.innerHTML = '<div style="color:#475569;font-size:0.85rem;text-align:center;padding:20px">Bật khuyến mãi và nhập tiêu đề để xem preview</div>';
    return;
  }
  var dl = deadline ? new Date(deadline) : null;
  var countdown = '';
  if (dl) {
    var diff = dl - new Date();
    if (diff > 0) {
      countdown = ' · Còn ' + Math.floor(diff/86400000) + ' ngày';
    }
  }
  prev.innerHTML = '<div style="background:linear-gradient(90deg,'+color+','+color+'cc);padding:10px 16px;border-radius:8px;font-size:0.85rem;font-weight:700;color:#fff">'
    + badge + ' ' + title
    + (subtitle ? ' — ' + subtitle : '')
    + countdown + ' <span style="opacity:0.7">← Banner preview</span></div>';
}

// ── CHUYỂN TAB (dùng chung cho mọi nút tab) ──────────────
function switchTab(showId) {
  ['tabStudents', 'tabMosReg', 'tabPromo', 'tabLicense', 'tabResultStats'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = (id === showId) ? 'block' : 'none';
  });
}

// ── ĐĂNG KÝ HỌC MOS — THANH TOÁN ──────────────────────────
async function loadMosRegistrations() {
  var body = document.getElementById('mosRegTableBody');
  try {
    var res = await adminFetch('/api/admin/mos-registrations');
    var data = await res.json();
    if (!data.success) { body.innerHTML = '<tr><td colspan="8" style="padding:20px;text-align:center;color:#ef4444">Lỗi: ' + esc(data.msg) + '</td></tr>'; return; }
    var items = (data.items || []).filter(function(it){ return it.maDangKy; }); // chỉ hiện đăng ký có tính tiền
    if (items.length === 0) { body.innerHTML = '<tr><td colspan="8" style="padding:20px;text-align:center;color:#475569">Chưa có đăng ký nào</td></tr>'; return; }
    // Mới nhất lên đầu
    items = items.slice().reverse();
    body.innerHTML = items.map(function(it, idx) {
      var isPaid = /Đã xác nhận/i.test(it.trangThai);
      var statusColor = isPaid ? '#22c55e' : (it.isExpired ? '#ef4444' : '#f59e0b');
      var statusText = isPaid ? ('✅ Đã xác nhận' + (it.ngayXacNhan ? ' (' + it.ngayXacNhan + ')' : ''))
        : (it.isExpired ? '⏰ Hết hạn (quá 30p)' : '⏳ Chờ thanh toán');
      return '<tr style="border-top:1px solid rgba(255,255,255,0.06)">' +
        '<td style="padding:8px 6px;color:#64748b;font-size:0.8rem">' + (idx + 1) + '</td>' +
        '<td style="padding:8px 6px;color:#fff;font-weight:700">' + esc(it.ten) + '</td>' +
        '<td style="padding:8px 6px;color:#94a3b8;font-size:0.8rem">' + esc(it.sdt) + (it.email ? '<br>' + esc(it.email) : '') + '</td>' +
        '<td style="padding:8px 6px;color:#94a3b8;font-size:0.8rem">' + esc(it.khoaHoc) + (it.soTienCoc > 0 ? '<br><span style="background:rgba(245,158,11,0.15);color:#f59e0b;padding:1px 7px;border-radius:8px;font-size:0.68rem;font-weight:700">🔵 Có cọc ' + it.soTienCoc.toLocaleString('vi-VN') + 'đ</span>' : '') + '</td>' +
        '<td style="padding:8px 6px"><code style="color:#00f2ff">' + esc(it.maDangKy) + '</code></td>' +
        '<td style="padding:8px 6px;color:#22c55e;font-weight:700">' + (it.soTien || 0).toLocaleString('vi-VN') + 'đ</td>' +
        '<td style="padding:8px 6px;color:' + statusColor + ';font-size:0.8rem;font-weight:700">' + statusText + '</td>' +
        '<td style="padding:8px 6px;white-space:nowrap">' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
          (isPaid ? '' : '<button onclick="confirmMosPayment(&quot;' + it.maDangKy + '&quot;, this)" style="padding:6px 10px;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#22c55e;border-radius:6px;font-size:0.76rem;font-weight:700;cursor:pointer">✅ Xác nhận</button>') +
          '<button onclick="openEditMosRegModal(' + JSON.stringify(it).replace(/"/g,"&quot;") + ')" style="padding:6px 10px;background:rgba(0,242,255,0.1);border:1px solid rgba(0,242,255,0.3);color:#00f2ff;border-radius:6px;font-size:0.76rem;font-weight:700;cursor:pointer">✏️ Sửa</button>' +
          '<button onclick="deleteMosRegistration(&quot;' + it.maDangKy + '&quot;,&quot;' + esc(it.ten) + '&quot;)" style="padding:6px 10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);color:#ef4444;border-radius:6px;font-size:0.76rem;font-weight:700;cursor:pointer">🗑️ Xóa</button>' +
          '</div></td></tr>';
    }).join('');
  } catch(e) { body.innerHTML = '<tr><td colspan="8" style="padding:20px;text-align:center;color:#ef4444">Lỗi kết nối!</td></tr>'; }
}

function openEditMosRegModal(item) {
  document.getElementById('editMosMaDangKy').textContent = item.maDangKy || '';
  document.getElementById('editMosTen').value = item.ten || '';
  document.getElementById('editMosSdt').value = item.sdt || '';
  document.getElementById('editMosEmail').value = item.email || '';
  document.getElementById('editMosKhoaHoc').value = item.khoaHoc || '';
  document.getElementById('editMosSoTien').value = item.soTien || 0;
  document.getElementById('editMosSoTienCoc').value = item.soTienCoc || 0;
  document.getElementById('editMosMagg').value = item.magiamgia || '';
  document.getElementById('editMosGhiChu').value = item.ghiChu || '';
  document.getElementById('editMosRegModal').style.display = 'flex';
}

async function submitEditMosReg() {
  var maDangKy = document.getElementById('editMosMaDangKy').textContent.trim();
  var payload = {
    maDangKy: maDangKy,
    ten: document.getElementById('editMosTen').value.trim(),
    sdt: document.getElementById('editMosSdt').value.trim(),
    email: document.getElementById('editMosEmail').value.trim(),
    khoahoc: document.getElementById('editMosKhoaHoc').value.trim(),
    magiamgia: document.getElementById('editMosMagg').value.trim(),
    ghichu: document.getElementById('editMosGhiChu').value.trim(),
    soTien: parseInt(document.getElementById('editMosSoTien').value) || 0,
    soTienCoc: parseInt(document.getElementById('editMosSoTienCoc').value) || 0
  };
  if (!payload.ten || !payload.sdt) { alert('Vui lòng nhập đủ Họ tên và SĐT!'); return; }
  try {
    var res = await adminFetch('/api/admin/mos-registrations/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    var data = await res.json();
    if (data.success) {
      alert('✅ Đã lưu thay đổi!');
      document.getElementById('editMosRegModal').style.display = 'none';
      loadMosRegistrations();
    } else { alert('❌ Lỗi: ' + data.msg); }
  } catch(e) { alert('Lỗi kết nối!'); }
}

async function deleteMosRegistration(maDangKy, ten) {
  if (!confirm('Xóa đăng ký của "' + ten + '" (mã ' + maDangKy + ')?\\nHành động này KHÔNG thể hoàn tác.')) return;
  try {
    var res = await adminFetch('/api/admin/mos-registrations/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maDangKy: maDangKy })
    });
    var data = await res.json();
    if (data.success) { alert('✅ Đã xóa!'); loadMosRegistrations(); }
    else { alert('❌ Lỗi: ' + data.msg); }
  } catch(e) { alert('Lỗi kết nối!'); }
}

async function confirmMosPayment(maDangKy, btnEl) {
  if (!confirm('Xác nhận ĐÃ NHẬN thanh toán cho mã ' + maDangKy + '?\\nHệ thống sẽ tự gửi email hướng dẫn cho học viên.')) return;
  if (btnEl) { btnEl.disabled = true; btnEl.textContent = '⏳ Đang xử lý...'; }
  try {
    var res = await adminFetch('/api/admin/mos-registrations/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maDangKy: maDangKy })
    });
    var data = await res.json();
    alert(data.success ? ('✅ ' + data.msg) : ('❌ ' + data.msg));
    loadMosRegistrations();
  } catch(e) {
    alert('❌ Lỗi kết nối!');
    if (btnEl) { btnEl.disabled = false; btnEl.textContent = '✅ Xác nhận'; }
  }
}

// ── BẢNG MÃ GIẢM GIÁ ──────────────────────────────────────
var promoCodesList = [];

async function loadPromoCodes() {
  try {
    var res = await adminFetch('/api/admin/promo-codes');
    var data = await res.json();
    promoCodesList = (data.codes || []).map(function(c) {
      return {
        content: c.content || '', code: c.code || '', depositMonths: c.depositMonths || 0,
        deposit: c.deposit || 0, tuitionPerExtra: c.tuitionPerExtra || 0,
        discountAmount: c.discountAmount || 0, startDate: c.startDate || '', endDate: c.endDate || '',
        active: c.active !== false, scope: c.scope || 'hoc'
      };
    });
    renderPromoCodesTable();
  } catch(e) { promoCodesList = []; renderPromoCodesTable(); }
}

function renderPromoCodesTable() {
  var body = document.getElementById('promoCodesTableBody');
  if (!body) return;
  var todayStr = new Date().toISOString().slice(0,10);
  if (promoCodesList.length === 0) {
    body.innerHTML = '<tr><td colspan="11" style="padding:20px;text-align:center;color:#475569">Chưa có mã nào — bấm "➕ Thêm mã mới" để bắt đầu</td></tr>';
    return;
  }
  body.innerHTML = promoCodesList.map(function(c, i) {
    var expired = c.endDate && c.endDate < todayStr;
    return '<tr style="border-top:1px solid rgba(255,255,255,0.06)' + (expired ? ';opacity:0.5' : '') + '">' +
      '<td style="padding:6px"><input value="' + esc(c.content) + '" oninput="promoCodesList[' + i + '].content=this.value" placeholder="VD: Giảm 10% học viên mới" style="width:100%;padding:7px 8px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#fff;font-size:0.82rem;box-sizing:border-box"></td>' +
      '<td style="padding:6px"><input value="' + esc(c.code) + '" oninput="promoCodesList[' + i + '].code=this.value.toUpperCase()" placeholder="MOSFREE1" style="width:100%;padding:7px 8px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#00f2ff;font-family:monospace;font-weight:700;font-size:0.82rem;box-sizing:border-box"></td>' +
      '<td style="padding:6px"><select onchange="promoCodesList[' + i + '].scope=this.value;if(this.value===\\'online\\'){promoCodesList[' + i + '].depositMonths=0;}renderPromoCodesTable()" style="width:100%;padding:7px 6px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#c084fc;font-weight:700;font-size:0.78rem;box-sizing:border-box">' +
        [['hoc','Học MOS'],['online','Học Online'],['both','Cả hai']].map(function(v) { return '<option value="' + v[0] + '"' + ((c.scope||'hoc') === v[0] ? ' selected' : '') + '>' + v[1] + '</option>'; }).join('') +
      '</select></td>' +
      '<td style="padding:6px"><select onchange="promoCodesList[' + i + '].depositMonths=parseInt(this.value)||0;renderPromoCodesTable()" style="width:100%;padding:7px 6px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#f59e0b;font-weight:700;font-size:0.8rem;box-sizing:border-box">' +
        [[0,''],[1,'MP1'],[2,'MP2'],[3,'MP3']].map(function(v) { return '<option value="' + v[0] + '"' + ((c.depositMonths||0) === v[0] ? ' selected' : '') + '>' + (v[1] || '-- Không --') + '</option>'; }).join('') +
      '</select></td>' +
      '<td style="padding:6px"><input type="number" min="0" step="1000" value="' + (c.deposit || 0) + '" ' + (c.depositMonths ? '' : 'disabled') + ' oninput="promoCodesList[' + i + '].deposit=parseInt(this.value)||0" style="width:100%;padding:7px 8px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#f59e0b;font-weight:700;font-size:0.82rem;box-sizing:border-box' + (c.depositMonths ? '' : ';opacity:0.35') + '"></td>' +
      '<td style="padding:6px"><input type="number" min="0" step="1000" value="' + (c.tuitionPerExtra || 0) + '" ' + (c.depositMonths ? '' : 'disabled') + ' oninput="promoCodesList[' + i + '].tuitionPerExtra=parseInt(this.value)||0" style="width:100%;padding:7px 8px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#f59e0b;font-weight:700;font-size:0.82rem;box-sizing:border-box' + (c.depositMonths ? '' : ';opacity:0.35') + '"></td>' +
      '<td style="padding:6px"><input type="number" min="0" step="1000" value="' + (c.discountAmount || 0) + '" ' + (c.depositMonths ? 'disabled' : '') + ' oninput="promoCodesList[' + i + '].discountAmount=parseInt(this.value)||0" placeholder="50000" style="width:100%;padding:7px 8px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#22c55e;font-weight:700;font-size:0.82rem;box-sizing:border-box' + (c.depositMonths ? ';opacity:0.35' : '') + '"></td>' +
      '<td style="padding:6px"><input type="date" value="' + esc(c.startDate) + '" onchange="promoCodesList[' + i + '].startDate=this.value" style="width:100%;padding:6px 8px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#fff;font-size:0.78rem;box-sizing:border-box"></td>' +
      '<td style="padding:6px"><input type="date" value="' + esc(c.endDate) + '" onchange="promoCodesList[' + i + '].endDate=this.value" style="width:100%;padding:6px 8px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#fff;font-size:0.78rem;box-sizing:border-box"></td>' +
      '<td style="padding:6px;text-align:center"><input type="checkbox" ' + (c.active ? 'checked' : '') + ' onchange="promoCodesList[' + i + '].active=this.checked" style="width:18px;height:18px;accent-color:#00f2ff;cursor:pointer"></td>' +
      '<td style="padding:6px;text-align:center"><button onclick="deletePromoCodeRow(' + i + ')" style="padding:5px 10px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;font-size:0.72rem;cursor:pointer">🗑️</button></td>' +
      '</tr>';
  }).join('');
}

function esc(s) { return String(s || '').replace(/"/g, '&quot;'); }

function addPromoCodeRow() {
  var today = new Date().toISOString().slice(0,10);
  var nextMonth = new Date(Date.now() + 30*86400000).toISOString().slice(0,10);
  promoCodesList.push({ content: '', code: '', depositMonths: 0, deposit: 0, tuitionPerExtra: 0, discountAmount: 0, startDate: today, endDate: nextMonth, active: true, scope: 'hoc' });
  renderPromoCodesTable();
}

function deletePromoCodeRow(i) {
  promoCodesList.splice(i, 1);
  renderPromoCodesTable();
}

async function savePromoCodes() {
  // Kiểm tra nhanh: mã không được để trống, không được trùng nhau
  var codes = promoCodesList.map(function(c){ return c.code.trim(); }).filter(Boolean);
  if (codes.length !== promoCodesList.length) { alert('⚠️ Có dòng chưa nhập Mã — vui lòng điền đủ hoặc xoá dòng trống.'); return; }
  var dup = codes.filter(function(c, i){ return codes.indexOf(c) !== i; });
  if (dup.length) { alert('⚠️ Mã bị trùng: ' + dup.join(', ')); return; }

  try {
    var res = await adminFetch('/api/admin/promo-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codes: promoCodesList })
    });
    var data = await res.json();
    alert(data.success ? '✅ Đã lưu bảng mã giảm giá!' : '❌ ' + data.msg);
  } catch(e) { alert('❌ Lỗi kết nối!'); }
}

// THONG KE TRUY CAP
async function loadVisitStats() {
    try {
        var res = await adminFetch('/api/admin/visit-stats');
        var data = await res.json();
        if (!data.ok) return;
        var fmt = function(n) { return n.toLocaleString('vi-VN'); };
        var el = document.getElementById('visitTotal');   if(el) el.textContent = fmt(data.total);
        el = document.getElementById('visitToday');  if(el) el.textContent = fmt(data.today);
        el = document.getElementById('visitYest');   if(el) el.textContent = fmt(data.yesterday);
        el = document.getElementById('visitWeek');   if(el) el.textContent = fmt(data.week);
        el = document.getElementById('visitMonth');  if(el) el.textContent = fmt(data.month);
    } catch(e) {}
}
loadVisitStats();

${getLicenseTabScript()}
${getResultStatsTabScript()}
</script>`;
}