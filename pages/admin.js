import { CONFIG } from '../config.js';

import { getLicenseTabHTML, getLicenseTabScript } from './license-ui.js';

export function getAdminDashboardUI() {
    return `
<div style="max-width:1400px; margin:20px auto; padding:0 15px;">

    <!-- Header Dashboard -->
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
        <div>
            <h1 style="font-size:1.6rem; font-weight:800; color:#fff;">📊 ADMIN DASHBOARD</h1>
            <p style="color:#64748b; font-size:0.85rem; margin-top:4px;">Quản lý học viên MOS360</p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button onclick="document.getElementById('tabStudents').style.display='block';document.getElementById('tabPromo').style.display='none';document.getElementById('tabLicense').style.display='none';" style="padding:9px 18px; background:#1e2235; border:1px solid #384260; color:#00f2ff; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">👥 Học viên</button>
            <button onclick="document.getElementById('tabStudents').style.display='none';document.getElementById('tabPromo').style.display='block';document.getElementById('tabLicense').style.display='none';" style="padding:9px 18px; background:rgba(255,87,34,0.15); border:1px solid rgba(255,87,34,0.4); color:#FF5722; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">🔥 Khuyến mãi</button>
            <button onclick="document.getElementById('tabStudents').style.display='none';document.getElementById('tabPromo').style.display='none';document.getElementById('tabLicense').style.display='block';loadLicenseList();" style="padding:9px 18px; background:rgba(0,242,255,0.12); border:1px solid rgba(0,242,255,0.35); color:#00f2ff; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">🔑 Cấp mật khẩu</button>
            <button onclick="loadDashboard()" style="padding:9px 18px; background:#1e2235; border:1px solid #384260; color:#94a3b8; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">🔄 Làm mới</button>
            <button onclick="showAddStudentModal()" style="padding:9px 18px; background:linear-gradient(135deg,#FF5722,#ff784e); border:none; color:#fff; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">➕ Thêm học viên</button>
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
    </div>

    <!-- TAB CẤP MẬT KHẨU -->
    ${getLicenseTabHTML()}

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
        </select>
    </div>

    <!-- Table -->
    <div style="background:#111422; border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden;">
        <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse;" id="studentTable">
                <thead>
                    <tr style="background:#1a1f35; border-bottom:1px solid rgba(255,255,255,0.06);">
                        <th style="padding:12px 16px; text-align:left; font-size:0.75rem; color:#64748b; font-weight:800; letter-spacing:0.5px;">#</th>
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
                    <tr><td colspan="8" style="padding:40px; text-align:center; color:#64748b;">Đang tải dữ liệu...</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal Thêm học viên -->
    <div id="addModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:9999; align-items:center; justify-content:center;">
        <div style="background:#111422; border:1px solid #384260; border-radius:16px; padding:28px; width:90%; max-width:460px;">
            <h3 style="color:#fff; margin-bottom:20px; font-size:1.2rem;">➕ Thêm học viên mới</h3>
            <div style="display:flex; flex-direction:column; gap:14px;">
                <div>
                    <label style="font-size:0.8rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:6px;">KHÓA HỌC</label>
                    <select id="newCourse" style="width:100%; padding:12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.9rem;">
                        <option value="MOS WORD 2019">MOS WORD 2019</option>
                        <option value="MOS EXCEL 2019">MOS EXCEL 2019</option>
                        <option value="MOS PPT 2019">MOS PPT 2019</option>
                        <option value="MOS WORD 365">MOS WORD 365</option>
                        <option value="MOS EXCEL 365">MOS EXCEL 365</option>
                        <option value="MOS PPT 365">MOS PPT 365</option>
                        <option value="IC3 GS6">IC3 GS6</option>
                        <option value="GENERATIVE AI">GENERATIVE AI</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:0.8rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:6px;">SỐ ĐIỆN THOẠI</label>
                    <input type="text" id="newPhone" placeholder="0912345678" style="width:100%; padding:12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.9rem;">
                </div>
                <div>
                    <label style="font-size:0.8rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:6px;">NGÀY HẾT HẠN</label>
                    <input type="date" id="newExpire" style="width:100%; padding:12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.9rem;">
                </div>
            </div>
            <div style="display:flex; gap:10px; margin-top:20px;">
                <button onclick="submitAddStudent()" style="flex:1; padding:12px; background:linear-gradient(135deg,#FF5722,#ff784e); border:none; color:#fff; border-radius:8px; font-weight:800; cursor:pointer;">XÁC NHẬN THÊM</button>
                <button onclick="document.getElementById('addModal').style.display='none'" style="flex:1; padding:12px; background:#1e2235; border:1px solid #384260; color:#94a3b8; border-radius:8px; font-weight:700; cursor:pointer;">HỦY</button>
            </div>
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
    document.getElementById('tableBody').innerHTML = '<tr><td colspan="8" style="padding:40px; text-align:center; color:#64748b;">Đang tải...</td></tr>';
    try {
        var res = await adminFetch('/api/admin/students');
        var data = await res.json();
        allStudents = data.students || [];
        updateStats();
        renderTable(allStudents);
    } catch(e) {
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="8" style="padding:40px; text-align:center; color:#ef4444;">Lỗi tải dữ liệu!</td></tr>';
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
        tbody.innerHTML = '<tr><td colspan="8" style="padding:40px; text-align:center; color:#64748b;">Không có dữ liệu</td></tr>';
        return;
    }
    tbody.innerHTML = students.map(function(s, i) {
        var st = getStatus(s.expire);
        var rowBg = st === 'expired' ? 'rgba(239,68,68,0.03)' : st === 'expiring' ? 'rgba(255,87,34,0.03)' : 'transparent';
        return '<tr style="border-bottom:1px solid rgba(255,255,255,0.04); background:' + rowBg + ';">' +
            '<td style="padding:12px 16px; color:#64748b; font-size:0.85rem;">' + (i+1) + '</td>' +
            '<td style="padding:12px 16px; font-weight:700; font-size:0.88rem; color:#e2e8f0;">' + (s.course||'') + '</td>' +
            '<td style="padding:12px 16px; font-family:monospace; color:#00f2ff; font-size:0.9rem;">' + (s.phone||'') + '</td>' +
            '<td style="padding:12px 16px; color:#94a3b8; font-size:0.85rem;">' + (s.date||'') + '</td>' +
            '<td style="padding:12px 16px; color:#94a3b8; font-size:0.85rem;">' + (s.expire||'') + '</td>' +
            '<td style="padding:12px 16px; color:#94a3b8; font-size:0.85rem;" id="dev-' + i + '"><span style="color:#384260;">—</span></td>' +
            '<td style="padding:12px 16px;">' + statusBadge(s.expire) + '</td>' +
            '<td style="padding:12px 16px;">' +
                '<div style="display:flex; gap:6px; flex-wrap:wrap;">' +
                '<button onclick="openRenewModal(' + JSON.stringify(s).replace(/"/g,"&quot;") + ',' + i + ')" style="padding:5px 10px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">🔄 Gia hạn</button>' +
                '<button onclick="resetDevices(&quot;' + s.phone + '&quot;,&quot;' + s.course + '&quot;)" style="padding:5px 10px; background:rgba(255,87,34,0.1); border:1px solid rgba(255,87,34,0.3); color:#FF5722; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">📱 Reset TB</button>' +
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
        var matchSearch = !search || (s.phone||'').includes(search) || (s.course||'').toLowerCase().includes(search);
        var matchStatus = status === 'all' || getStatus(s.expire) === status;
        var matchCourse = course === 'all' || (s.course||'') === course;
        return matchSearch && matchStatus && matchCourse;
    });
    renderTable(filtered);
}

function showAddStudentModal() {
    var today = new Date();
    var next30 = new Date(today.getTime() + 30*24*60*60*1000);
    document.getElementById('newExpire').value = next30.toISOString().split('T')[0];
    document.getElementById('addModal').style.display = 'flex';
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

async function submitAddStudent() {
    var course = document.getElementById('newCourse').value;
    var phone = document.getElementById('newPhone').value.trim();
    var expire = document.getElementById('newExpire').value;
    if (!phone || !expire) { alert('Vui lòng điền đầy đủ thông tin!'); return; }
    var parts = expire.split('-');
    var expireFormatted = parts[2] + '/' + parts[1] + '/' + parts[0];
    var today = new Date();
    var dateFormatted = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
    try {
        var res = await adminFetch('/api/admin/add-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ course, phone, date: dateFormatted, expire: expireFormatted })
        });
        var data = await res.json();
        if (data.success) {
            alert('✅ Thêm học viên thành công!');
            document.getElementById('addModal').style.display = 'none';
            loadDashboard();
        } else { alert('❌ Lỗi: ' + data.msg); }
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

window.addEventListener('DOMContentLoaded', () => { loadDashboard(); loadPromo(); });

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

${getLicenseTabScript()}
</script>`;
}