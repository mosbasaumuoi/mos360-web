// ============================================================
// MOS360 LICENSE UI — Tab "Cấp mật khẩu" trong Admin Dashboard
// ============================================================
// Cách dùng: import { getLicenseTabHTML, getLicenseTabScript } from './license-ui.js'
// rồi chèn HTML vào trong khối tab của admin.js, và nối script vào cuối <script> hiện có.
// ============================================================

export function getLicenseTabHTML() {
    return `
    <!-- TAB CẤP MẬT KHẨU -->
    <div id="tabLicense" style="display:none">

      <!-- YÊU CẦU ĐANG CHỜ DUYỆT -->
      <div style="background:#111422;border:1px solid rgba(245,158,11,0.3);border-radius:16px;padding:24px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h2 style="font-size:1.05rem;font-weight:800;color:#fff;">🕐 Yêu cầu đang chờ duyệt <span id="pendingCount" style="color:#f59e0b;">(0)</span></h2>
          <button onclick="loadPendingRequests()" style="padding:6px 12px;background:#1e2235;border:1px solid #384260;color:#94a3b8;border-radius:6px;font-size:0.78rem;cursor:pointer">🔄</button>
        </div>
        <p style="font-size:0.78rem;color:#64748b;margin-bottom:16px;">Học viên tự gửi qua trang <code style="color:#00f2ff">mos360.vn/cap-mat-khau</code>. Đối chiếu đã thanh toán trước khi bấm Duyệt.</p>
        <div id="pendingList"><div style="color:#64748b;text-align:center;padding:24px;font-size:0.85rem">Đang tải...</div></div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; align-items:start;">

        <!-- FORM CẤP MẬT KHẨU THỦ CÔNG -->
        <div style="background:#111422;border:1px solid rgba(0,242,255,0.2);border-radius:16px;padding:28px;">
          <h2 style="font-size:1.1rem;font-weight:800;color:#fff;margin-bottom:4px">🔑 Cấp thủ công (không qua hàng chờ)</h2>
          <p style="font-size:0.82rem;color:#64748b;margin-bottom:24px">Dùng khi học viên gửi mã ID qua kênh khác (không qua form). Dán mã ID, chọn môn, hệ thống tự tính.</p>

          <div style="margin-bottom:16px">
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">TÊN HỌC VIÊN</label>
            <input id="licStudentName" type="text" placeholder="VD: Nguyễn Văn A" style="width:100%;padding:10px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.9rem">
          </div>

          <div style="margin-bottom:16px">
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">SỐ ĐIỆN THOẠI</label>
            <input id="licPhone" type="text" placeholder="VD: 0912345678" style="width:100%;padding:10px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.9rem">
          </div>

          <div style="margin-bottom:16px">
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:6px">MÃ ID HỌC VIÊN GỬI <span style="color:#ef4444">*</span></label>
            <textarea id="licRandomID" rows="3" placeholder="Dán chuỗi mã (Base64) học viên gửi, VD: QUFCQkNDRERFRUZGMjAyNjA2MjA=" style="width:100%;padding:10px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.85rem;font-family:monospace;resize:vertical"></textarea>
          </div>

          <div style="margin-bottom:24px">
            <label style="display:block;font-size:0.75rem;font-weight:700;color:#64748b;margin-bottom:10px">MÔN ĐÃ ĐĂNG KÝ <span style="color:#ef4444">*</span></label>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <label style="display:flex;align-items:center;gap:8px;padding:10px 16px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;flex:1;min-width:140px">
                <input type="checkbox" id="licSubjExcel" value="excel" style="width:18px;height:18px;accent-color:#22c55e;cursor:pointer">
                <span style="color:#fff;font-weight:700;font-size:0.88rem">📊 Excel</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;padding:10px 16px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;flex:1;min-width:140px">
                <input type="checkbox" id="licSubjWord" value="word" style="width:18px;height:18px;accent-color:#3b82f6;cursor:pointer">
                <span style="color:#fff;font-weight:700;font-size:0.88rem">📄 Word</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;padding:10px 16px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;flex:1;min-width:140px">
                <input type="checkbox" id="licSubjPpt" value="ppt" style="width:18px;height:18px;accent-color:#FF5722;cursor:pointer">
                <span style="color:#fff;font-weight:700;font-size:0.88rem">📽️ PowerPoint</span>
              </label>
            </div>
          </div>

          <button id="btnComputeLicense" onclick="computeLicense()" style="width:100%;padding:13px;background:linear-gradient(135deg,#00f2ff,#0ea5e9);color:#04111a;border:none;border-radius:10px;font-weight:800;font-size:0.95rem;cursor:pointer">⚡ Tính mật khẩu</button>

          <div id="licResultBox" style="display:none;margin-top:20px;padding:18px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.25);border-radius:10px">
            <div style="font-size:0.8rem;font-weight:700;color:#22c55e;margin-bottom:12px">✅ Kết quả mật khẩu</div>
            <div id="licChannelHint" style="display:none;margin-bottom:14px;padding:10px 12px;background:rgba(0,242,255,0.08);border:1px solid rgba(0,242,255,0.25);border-radius:8px;font-size:0.82rem;color:#00f2ff"></div>
            <div id="licResultList"></div>

            <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">
              <button onclick="sendViaEmail()" style="flex:1;min-width:120px;padding:10px;background:#1e2235;border:1px solid #384260;color:#fbbf24;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.82rem">✉️ Gửi Email</button>
              <button onclick="sendViaZalo()" style="flex:1;min-width:120px;padding:10px;background:#1e2235;border:1px solid #384260;color:#0068ff;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.82rem">💬 Mở Zalo</button>
              <button onclick="sendViaMessenger()" style="flex:1;min-width:120px;padding:10px;background:#1e2235;border:1px solid #384260;color:#0084ff;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.82rem">📘 Mở Messenger</button>
            </div>
          </div>
        </div>

        <!-- TRA CỨU & DANH SÁCH ĐÃ CẤP -->
        <div style="background:#111422;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;max-height:680px;display:flex;flex-direction:column">
          <h2 style="font-size:1.05rem;font-weight:800;color:#fff;margin-bottom:14px">🔍 Tra cứu theo mật khẩu</h2>
          <div style="display:flex;gap:8px;margin-bottom:18px">
            <input id="licLookupPwd" type="text" placeholder="Dán mật khẩu cần tra..." style="flex:1;padding:9px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.85rem;font-family:monospace">
            <button onclick="lookupPassword()" style="padding:9px 16px;background:#1e2235;border:1px solid #384260;color:#00f2ff;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.82rem">Tra</button>
          </div>
          <div id="licLookupResult" style="margin-bottom:20px"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <h2 style="font-size:0.95rem;font-weight:800;color:#fff">📜 Đã cấp gần đây</h2>
            <button onclick="loadLicenseList()" style="padding:6px 12px;background:#1e2235;border:1px solid #384260;color:#94a3b8;border-radius:6px;font-size:0.78rem;cursor:pointer">🔄</button>
          </div>
          <div id="licHistoryList" style="overflow-y:auto;flex:1">
            <div style="color:#64748b;text-align:center;padding:30px;font-size:0.85rem">Đang tải...</div>
          </div>
        </div>

      </div>
    </div>`;
}

export function getLicenseTabScript() {
    return `
// ── CẤP MẬT KHẨU EXCEL/WORD/PPT ─────────────────────────
var lastLicenseResults = null;
var SUBJECT_LABEL_VI = { excel: 'Excel', word: 'Word', ppt: 'PowerPoint' };

async function computeLicense() {
    var btn = document.getElementById('btnComputeLicense');
    var randomID = document.getElementById('licRandomID').value.trim();
    var studentName = document.getElementById('licStudentName').value.trim();
    var phone = document.getElementById('licPhone').value.trim();

    var subjects = [];
    if (document.getElementById('licSubjExcel').checked) subjects.push('excel');
    if (document.getElementById('licSubjWord').checked) subjects.push('word');
    if (document.getElementById('licSubjPpt').checked) subjects.push('ppt');

    if (!randomID) { alert('Vui lòng dán mã ID học viên gửi!'); return; }
    if (subjects.length === 0) { alert('Vui lòng chọn ít nhất 1 môn!'); return; }

    btn.disabled = true; btn.textContent = '⏳ Đang tính...';
    try {
        var res = await adminFetch('/api/license/compute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ randomID, subjects, studentName, phone })
        });
        var data = await res.json();
        if (!data.success) { alert('❌ Lỗi: ' + data.msg); return; }

        lastLicenseResults = { studentName, phone, mac: data.mac, results: data.results };
        renderLicenseResult(data.results, null);
        loadLicenseList();
    } catch (e) {
        alert('❌ Lỗi kết nối: ' + e.message);
    } finally {
        btn.disabled = false; btn.textContent = '⚡ Tính mật khẩu';
    }
}

var CHANNEL_LABEL_VI = { email: '✉️ Email', zalo: '💬 Zalo', facebook: '📘 Facebook' };

function renderLicenseResult(results, channelInfo) {
    var box = document.getElementById('licResultBox');
    var list = document.getElementById('licResultList');
    var hint = document.getElementById('licChannelHint');
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (channelInfo && channelInfo.receiveChannel) {
        hint.style.display = 'block';
        hint.innerHTML = '📨 Học viên muốn nhận qua <b>' + (CHANNEL_LABEL_VI[channelInfo.receiveChannel] || channelInfo.receiveChannel) +
            '</b> — liên hệ: <code style="background:#090b14;padding:2px 8px;border-radius:4px">' + channelInfo.receiveContact + '</code>';
    } else {
        hint.style.display = 'none';
    }

    list.innerHTML = results.map(function(r) {
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06)">' +
            '<div><div style="color:#94a3b8;font-size:0.78rem;font-weight:700">' + r.label + '</div>' +
            '<div style="color:#64748b;font-size:0.72rem">Hạn: ' + r.expireDateDisplay + '</div></div>' +
            '<div style="display:flex;align-items:center;gap:8px">' +
            '<code style="background:#090b14;color:#22c55e;padding:6px 12px;border-radius:6px;font-size:0.95rem;font-weight:800;letter-spacing:0.5px">' + r.password + '</code>' +
            '<button onclick="copyText(\\'' + r.password + '\\')" style="padding:6px 10px;background:#1e2235;border:1px solid #384260;color:#fff;border-radius:6px;cursor:pointer;font-size:0.78rem">📋</button>' +
            '</div></div>';
    }).join('');
}

// ── DUYỆT YÊU CẦU TỪ HÀNG CHỜ ───────────────────────────
async function loadPendingRequests() {
    var box = document.getElementById('pendingList');
    var countEl = document.getElementById('pendingCount');
    try {
        var res = await adminFetch('/api/license/pending');
        var data = await res.json();
        if (!data.success || !data.items.length) {
            countEl.textContent = '(0)';
            box.innerHTML = '<div style="color:#64748b;text-align:center;padding:24px;font-size:0.85rem">Chưa có yêu cầu nào đang chờ 🎉</div>';
            return;
        }
        countEl.textContent = '(' + data.items.length + ')';
        box.innerHTML = data.items.map(function(it) {
            var subjTags = it.subjects.map(function(s) { return SUBJECT_LABEL_VI[s]; }).join(', ');
            var dateStr = new Date(it.requestedAt).toLocaleString('vi-VN');
            var idShort = it.randomID.length > 28 ? it.randomID.slice(0, 28) + '…' : it.randomID;
            return '<div style="background:#090b14;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;margin-bottom:10px">' +
                '<div style="display:flex;justify-content:space-between;align-items:start;gap:10px;flex-wrap:wrap">' +
                '<div style="flex:1;min-width:200px">' +
                '<div style="font-weight:800;color:#fff;font-size:0.92rem">' + escapeHtml(it.studentName) + '</div>' +
                '<div style="color:#64748b;font-size:0.76rem;margin-top:3px">' + escapeHtml(it.phone) + ' · ' + dateStr + '</div>' +
                '<div style="margin-top:6px"><span style="background:rgba(0,242,255,0.1);color:#00f2ff;padding:2px 8px;border-radius:10px;font-size:0.72rem;font-weight:700">' + subjTags + '</span></div>' +
                '<div style="color:#475569;font-size:0.7rem;margin-top:6px;font-family:monospace">ID: ' + escapeHtml(idShort) + '</div>' +
                '<div style="color:#94a3b8;font-size:0.76rem;margin-top:4px">📨 ' + (CHANNEL_LABEL_VI[it.receiveChannel] || it.receiveChannel) + ': ' + escapeHtml(it.receiveContact) + '</div>' +
                '</div>' +
                '<button onclick="approveRequest(\\'' + it.key + '\\', this)" style="padding:9px 16px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#04111a;border:none;border-radius:8px;font-weight:800;cursor:pointer;font-size:0.82rem;white-space:nowrap">✅ Duyệt</button>' +
                '</div></div>';
        }).join('');
    } catch (e) {
        box.innerHTML = '<div style="color:#ef4444;text-align:center;padding:20px;font-size:0.85rem">Lỗi tải danh sách</div>';
    }
}

async function approveRequest(key, btnEl) {
    if (!confirm('Duyệt yêu cầu này và tính mật khẩu ngay?\\n(Chỉ duyệt khi đã xác nhận thanh toán)')) return;
    if (btnEl) { btnEl.disabled = true; btnEl.textContent = '⏳...'; }
    try {
        var res = await adminFetch('/api/license/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: key })
        });
        var data = await res.json();
        if (!data.success) { alert('❌ Lỗi: ' + data.msg); if (btnEl) { btnEl.disabled = false; btnEl.textContent = '✅ Duyệt'; } return; }

        lastLicenseResults = {
            studentName: data.studentName, phone: data.phone, mac: data.mac, results: data.results,
            receiveChannel: data.receiveChannel, receiveContact: data.receiveContact
        };
        renderLicenseResult(data.results, { receiveChannel: data.receiveChannel, receiveContact: data.receiveContact });
        loadPendingRequests();
        loadLicenseList();
    } catch (e) {
        alert('❌ Lỗi kết nối: ' + e.message);
        if (btnEl) { btnEl.disabled = false; btnEl.textContent = '✅ Duyệt'; }
    }
}

function escapeHtml(s) {
    return (s || '').replace(/[&<>"']/g, function(c) {
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('✅ Đã copy: ' + text);
    });
}

function buildLicenseMessage() {
    if (!lastLicenseResults) return '';
    var r = lastLicenseResults;
    var name = r.studentName || 'bạn';
    var lines = ['Chào ' + name + ', MOS360 gửi bạn mật khẩu kích hoạt phần mềm (hạn sử dụng 60 ngày):', ''];
    r.results.forEach(function(item) {
        lines.push(SUBJECT_LABEL_VI[item.subject] + ': ' + item.password + ' (hạn ' + item.expireDateDisplay + ')');
    });
    lines.push('', 'Lưu ý: mật khẩu chỉ dùng được trên máy đã gửi mã. Hỗ trợ: https://mos360.vn');
    return lines.join('\\n');
}

function sendViaEmail() {
    if (!lastLicenseResults) { alert('Chưa có kết quả mật khẩu!'); return; }
    var to = (lastLicenseResults.receiveChannel === 'email' && lastLicenseResults.receiveContact) ? lastLicenseResults.receiveContact : '';
    var subject = encodeURIComponent('MOS360 - Mật khẩu kích hoạt phần mềm');
    var body = encodeURIComponent(buildLicenseMessage());
    window.open('mailto:' + to + '?subject=' + subject + '&body=' + body, '_blank');
}

function sendViaZalo() {
    if (!lastLicenseResults) { alert('Chưa có kết quả mật khẩu!'); return; }
    navigator.clipboard.writeText(buildLicenseMessage());
    var contactNote = (lastLicenseResults.receiveChannel === 'zalo' && lastLicenseResults.receiveContact)
        ? '\\nGửi tới số Zalo: ' + lastLicenseResults.receiveContact : '';
    alert('✅ Đã copy nội dung mật khẩu vào clipboard.' + contactNote + '\\nZalo Web sẽ mở — bạn chỉ cần dán (Ctrl+V) vào khung chat và gửi.');
    window.open('https://zalo.me', '_blank');
}

function sendViaMessenger() {
    if (!lastLicenseResults) { alert('Chưa có kết quả mật khẩu!'); return; }
    navigator.clipboard.writeText(buildLicenseMessage());
    var contactNote = (lastLicenseResults.receiveChannel === 'facebook' && lastLicenseResults.receiveContact)
        ? '\\nGửi tới: ' + lastLicenseResults.receiveContact : '';
    alert('✅ Đã copy nội dung mật khẩu vào clipboard.' + contactNote + '\\nMessenger sẽ mở — bạn chỉ cần dán (Ctrl+V) vào khung chat và gửi.');
    window.open('https://m.me/mos360.vn', '_blank');
}

async function lookupPassword() {
    var pwd = document.getElementById('licLookupPwd').value.trim();
    var box = document.getElementById('licLookupResult');
    if (!pwd) { alert('Nhập mật khẩu cần tra!'); return; }
    box.innerHTML = '<div style="color:#64748b;font-size:0.82rem">Đang tra...</div>';
    try {
        var res = await adminFetch('/api/license/lookup?password=' + encodeURIComponent(pwd));
        var data = await res.json();
        if (!data.success) {
            box.innerHTML = '<div style="padding:12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:8px;color:#ef4444;font-size:0.82rem">❌ ' + data.msg + '</div>';
            return;
        }
        var info = data.info;
        box.innerHTML = '<div style="padding:14px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.25);border-radius:8px;font-size:0.82rem">' +
            '<div style="color:#fff;font-weight:700;margin-bottom:6px">' + (info.studentName || 'Không tên') + '</div>' +
            '<div style="color:#94a3b8;line-height:1.7">' +
            'SĐT: ' + (info.phone || '-') + '<br>' +
            'Môn: <span style="color:#00f2ff;font-weight:700">' + SUBJECT_LABEL_VI[info.subject] + '</span><br>' +
            'Máy (MAC): ' + info.mac + '<br>' +
            'Hạn dùng: ' + formatExpire(info.expireDate) + '<br>' +
            'Ngày cấp: ' + new Date(info.issuedAt).toLocaleString('vi-VN') +
            '</div></div>';
    } catch (e) {
        box.innerHTML = '<div style="color:#ef4444;font-size:0.82rem">Lỗi tra cứu</div>';
    }
}

function formatExpire(yyyymmdd) {
    if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd || '-';
    return yyyymmdd.slice(6,8) + '/' + yyyymmdd.slice(4,6) + '/' + yyyymmdd.slice(0,4);
}

async function loadLicenseList() {
    var box = document.getElementById('licHistoryList');
    try {
        var res = await adminFetch('/api/license/list?limit=50');
        var data = await res.json();
        if (!data.success || !data.items.length) {
            box.innerHTML = '<div style="color:#64748b;text-align:center;padding:30px;font-size:0.85rem">Chưa có mật khẩu nào được cấp</div>';
            return;
        }
        box.innerHTML = data.items.map(function(h) {
            var dateStr = new Date(h.issuedAt).toLocaleString('vi-VN');
            var expireStr = h.expireDate ? h.expireDate.slice(0,4) + '-' + h.expireDate.slice(4,6) + '-' + h.expireDate.slice(6) : '';
            var isExpired = expireStr && expireStr < new Date().toISOString().slice(0,10);
            return '<div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06)">' +
                '<div style="display:flex;justify-content:space-between;align-items:start;gap:8px">' +
                '<div style="flex:1;min-width:0">' +
                '<div style="font-weight:700;color:#fff;font-size:0.85rem">' + (h.studentName || 'Không tên') + '</div>' +
                '<div style="color:#64748b;font-size:0.75rem;margin:4px 0">' + (h.phone || '') + ' · ' +
                '<span style="background:rgba(0,242,255,0.1);color:#00f2ff;padding:2px 8px;border-radius:10px;font-size:0.7rem;font-weight:700">' + SUBJECT_LABEL_VI[h.subject] + '</span> · ' +
                '<code style="color:#22c55e">' + h.password + '</code></div>' +
                '<div style="font-size:0.7rem;color:' + (isExpired ? '#ef4444' : '#475569') + '">' +
                (isExpired ? '⚠️ Đã hết hạn' : '⏱ Hạn') + ': ' + (expireStr || '—') + ' · Cấp: ' + dateStr + '</div>' +
                '</div>' +
                '<div style="display:flex;gap:6px;flex-shrink:0">' +
                '<button onclick="renewLicense(\\'' + h.password + '\\', \\'' + (h.studentName||'').replace(/'/g,'') + '\\')" ' +
                'style="padding:5px 10px;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#22c55e;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer;white-space:nowrap">🔄 Gia hạn</button>' +
                '<button onclick="revokeLicense(\\'' + h.password + '\\', \\'' + (h.studentName||'').replace(/'/g,'') + '\\')" ' +
                'style="padding:5px 10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);color:#ef4444;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer;white-space:nowrap">🗑 Xoá</button>' +
                '</div></div></div>';
        }).join('');
    } catch (e) {
        box.innerHTML = '<div style="color:#ef4444;text-align:center;padding:20px;font-size:0.85rem">Lỗi tải danh sách</div>';
    }
}

async function renewLicense(oldPassword, studentName) {
    if (!confirm('Gia hạn thêm 60 ngày kể từ HÔM NAY cho ' + (studentName || 'học viên này') + '?\n\nLưu ý: mật khẩu CŨ sẽ bị vô hiệu — nhớ gửi mật khẩu MỚI cho học viên sau khi gia hạn.')) return;
    try {
        var res = await adminFetch('/api/license/renew', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: oldPassword })
        });
        var data = await res.json();
        if (!data.success) { alert('❌ Lỗi: ' + data.msg); return; }

        // Hiển thị kết quả gia hạn đúng format như kết quả cấp mới
        renderLicenseResult([{
            subject: data.subject,
            label: SUBJECT_LABEL_VI[data.subject] || data.subject,
            password: data.newPassword,
            expireDateDisplay: data.expireDateDisplay
        }], null);
        alert('✅ Gia hạn thành công!\nMật khẩu mới: ' + data.newPassword + '\nHạn đến: ' + data.expireDateDisplay + '\n\nHãy gửi mật khẩu mới này cho học viên.');
        loadLicenseList();
    } catch (e) {
        alert('❌ Lỗi kết nối: ' + e.message);
    }
}

async function revokeLicense(password, studentName) {
    if (!confirm('Xoá mật khẩu ' + password + ' của ' + (studentName || 'học viên này') + '?\n\nHành động này không thể hoàn tác — học viên sẽ mất quyền truy cập ngay lập tức.')) return;
    try {
        var res = await adminFetch('/api/license/revoke', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        var data = await res.json();
        if (!data.success) { alert('❌ Lỗi: ' + data.msg); return; }
        loadLicenseList();
    } catch (e) {
        alert('❌ Lỗi kết nối: ' + e.message);
    }
}
`;
}