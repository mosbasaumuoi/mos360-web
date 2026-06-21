// ============================================================
// MOS360 RESULT STATS UI — Tab "Thống kê WinApp" trong Admin Dashboard
// ============================================================
// Cách dùng: import { getResultStatsTabHTML, getResultStatsTabScript } from './result-stats-ui.js'
// rồi chèn HTML vào trong khối tab của admin.js, và nối script vào cuối <script> hiện có.
// Theo đúng pattern license-ui.js đã có.
// ============================================================

export function getResultStatsTabHTML() {
    return `
    <!-- TAB THỐNG KÊ WINAPP -->
    <div id="tabResultStats" style="display:none">

      <!-- SỐ LIỆU TỔNG QUAN -->
      <div style="background:#111422;border:1px solid rgba(0,242,255,0.2);border-radius:16px;padding:24px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <h2 style="font-size:1.05rem;font-weight:800;color:#fff;">📊 Tổng quan kết quả Học/Thi từ WinApp</h2>
          <div style="display:flex;gap:6px;">
            <button class="rs-range-btn" data-range="today" onclick="loadResultStats('today')" style="padding:7px 14px;background:#00f2ff;border:none;color:#04111a;border-radius:7px;font-weight:800;cursor:pointer;font-size:0.78rem;">Hôm nay</button>
            <button class="rs-range-btn" data-range="7days" onclick="loadResultStats('7days')" style="padding:7px 14px;background:#1e2235;border:1px solid #384260;color:#94a3b8;border-radius:7px;font-weight:700;cursor:pointer;font-size:0.78rem;">7 ngày</button>
            <button class="rs-range-btn" data-range="30days" onclick="loadResultStats('30days')" style="padding:7px 14px;background:#1e2235;border:1px solid #384260;color:#94a3b8;border-radius:7px;font-weight:700;cursor:pointer;font-size:0.78rem;">30 ngày</button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:18px;" id="rsStatsCards">
          <div style="background:#090b14;border:1px solid rgba(0,242,255,0.15);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:0.7rem;color:#64748b;font-weight:700;margin-bottom:6px;">TỔNG LƯỢT NỘP BÀI</div>
            <div style="font-size:1.7rem;font-weight:800;color:#00f2ff;" id="rsTotalSubmissions">—</div>
          </div>
          <div style="background:#090b14;border:1px solid rgba(34,197,94,0.15);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:0.7rem;color:#64748b;font-weight:700;margin-bottom:6px;">HỌC VIÊN THAM GIA</div>
            <div style="font-size:1.7rem;font-weight:800;color:#22c55e;" id="rsUniqueStudents">—</div>
          </div>
          <div style="background:#090b14;border:1px solid rgba(255,215,0,0.15);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:0.7rem;color:#64748b;font-weight:700;margin-bottom:6px;">ĐIỂM TRUNG BÌNH</div>
            <div style="font-size:1.7rem;font-weight:800;color:#FFD700;" id="rsAvgScore">—</div>
          </div>
          <div style="background:#090b14;border:1px solid rgba(255,87,34,0.15);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:0.7rem;color:#64748b;font-weight:700;margin-bottom:6px;">THI / ÔN LUYỆN</div>
            <div style="font-size:1.3rem;font-weight:800;color:#FF5722;" id="rsTypeBreakdown">—</div>
          </div>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;" id="rsSubjectBreakdown"></div>
      </div>

      <!-- TRA CỨU THEO SĐT -->
      <div style="background:#111422;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;">
        <h2 style="font-size:1.05rem;font-weight:800;color:#fff;margin-bottom:4px">🔍 Tra cứu kết quả theo học viên</h2>
        <p style="font-size:0.82rem;color:#64748b;margin-bottom:18px">Nhập số điện thoại để xem toàn bộ lịch sử Học/Thi của 1 học viên cụ thể.</p>

        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <input id="rsLookupPhone" type="text" placeholder="VD: 0912345678" style="flex:1;padding:10px 14px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.9rem;font-family:monospace" onkeydown="if(event.key==='Enter')lookupResultsByPhone()">
          <select id="rsLookupSubject" style="padding:10px 12px;background:#090b14;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:0.85rem;cursor:pointer">
            <option value="">Tất cả môn</option>
            <option value="excel">📊 Excel</option>
            <option value="word">📄 Word</option>
            <option value="ppt">📽️ PowerPoint</option>
          </select>
          <button onclick="lookupResultsByPhone()" style="padding:10px 20px;background:linear-gradient(135deg,#00f2ff,#0ea5e9);color:#04111a;border:none;border-radius:8px;font-weight:800;cursor:pointer;font-size:0.85rem;white-space:nowrap">Tra cứu</button>
        </div>

        <div id="rsLookupResult" style="margin-top:18px"></div>
      </div>
    </div>`;
}

export function getResultStatsTabScript() {
    return `
// ── THỐNG KÊ WINAPP ─────────────────────────────────────
var SUBJECT_ICON_VI = { excel: '📊 Excel', word: '📄 Word', ppt: '📽️ PowerPoint' };

async function loadResultStats(range) {
    range = range || 'today';

    // Cập nhật trạng thái active của nút range
    document.querySelectorAll('.rs-range-btn').forEach(function(btn) {
        if (btn.getAttribute('data-range') === range) {
            btn.style.background = '#00f2ff';
            btn.style.color = '#04111a';
            btn.style.border = 'none';
            btn.style.fontWeight = '800';
        } else {
            btn.style.background = '#1e2235';
            btn.style.color = '#94a3b8';
            btn.style.border = '1px solid #384260';
            btn.style.fontWeight = '700';
        }
    });

    document.getElementById('rsTotalSubmissions').textContent = '...';
    document.getElementById('rsUniqueStudents').textContent = '...';
    document.getElementById('rsAvgScore').textContent = '...';
    document.getElementById('rsTypeBreakdown').textContent = '...';

    try {
        var res = await fetch('/api/results/stats?range=' + range);
        var data = await res.json();
        if (!data.success) {
            document.getElementById('rsTotalSubmissions').textContent = '—';
            return;
        }
        document.getElementById('rsTotalSubmissions').textContent = data.totalSubmissions;
        document.getElementById('rsUniqueStudents').textContent = data.uniqueStudents;
        document.getElementById('rsAvgScore').textContent = data.avgScore + '/1000';
        document.getElementById('rsTypeBreakdown').textContent =
            (data.byType.test || 0) + ' thi · ' + (data.byType.learn || 0) + ' ôn';

        var subjBox = document.getElementById('rsSubjectBreakdown');
        var subjects = ['excel', 'word', 'ppt'];
        subjBox.innerHTML = subjects.map(function(s) {
            var count = data.bySubject[s] || 0;
            return '<div style="flex:1;min-width:120px;background:#090b14;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;">' +
                '<span style="font-size:0.85rem;color:#e2e8f0;font-weight:700">' + SUBJECT_ICON_VI[s] + '</span>' +
                '<span style="font-size:1.1rem;font-weight:800;color:#00f2ff">' + count + '</span>' +
                '</div>';
        }).join('');
    } catch (e) {
        document.getElementById('rsTotalSubmissions').textContent = '—';
    }
}

async function lookupResultsByPhone() {
    var phone = document.getElementById('rsLookupPhone').value.trim();
    var subject = document.getElementById('rsLookupSubject').value;
    var box = document.getElementById('rsLookupResult');

    if (!phone) { alert('Vui lòng nhập số điện thoại!'); return; }

    box.innerHTML = '<div style="color:#64748b;text-align:center;padding:20px;font-size:0.85rem">Đang tra cứu...</div>';

    try {
        var url = '/api/results?phone=' + encodeURIComponent(phone);
        if (subject) url += '&subject=' + encodeURIComponent(subject);
        var res = await fetch(url);
        var data = await res.json();

        if (!data.success) {
            box.innerHTML = '<div style="padding:14px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:8px;color:#ef4444;font-size:0.85rem">❌ ' + (data.msg || 'Lỗi tra cứu') + '</div>';
            return;
        }

        if (!data.results.length) {
            box.innerHTML = '<div style="color:#64748b;text-align:center;padding:24px;font-size:0.85rem">Học viên này chưa nộp bài lần nào</div>';
            return;
        }

        var studentName = data.results[0].studentName || 'Không rõ tên';
        var header = '<div style="margin-bottom:14px;padding:12px 16px;background:rgba(0,242,255,0.06);border:1px solid rgba(0,242,255,0.2);border-radius:10px">' +
            '<span style="color:#fff;font-weight:800;font-size:0.95rem">' + escapeHtmlRS(studentName) + '</span>' +
            '<span style="color:#64748b;font-size:0.82rem;margin-left:10px">' + phone + ' · ' + data.results.length + ' lượt làm bài</span>' +
            '</div>';

        var rows = data.results.map(function(r) {
            var dt = new Date(r.submittedAt);
            var dateStr = dt.toLocaleString('vi-VN');
            var typeLabel = r.type === 'test' ? '🎯 Thi' : '📖 Ôn luyện';
            var scoreColor = r.score >= 700 ? '#22c55e' : '#ef4444';

            var domainsHtml = '';
            if (Array.isArray(r.domains) && r.domains.length) {
                domainsHtml = '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">' +
                    r.domains.map(function(d) {
                        var pct = d.percent !== undefined ? d.percent : 0;
                        var dColor = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';
                        return '<span style="font-size:0.72rem;padding:3px 9px;border-radius:100px;background:rgba(255,255,255,0.04);color:' + dColor + ';border:1px solid rgba(255,255,255,0.08)">' +
                            escapeHtmlRS(d.name) + ': ' + pct + '%</span>';
                    }).join('') +
                    '</div>';
            }

            return '<div style="padding:14px 16px;background:#090b14;border:1px solid rgba(255,255,255,0.06);border-radius:10px;margin-bottom:10px">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">' +
                '<div>' +
                '<span style="font-weight:700;color:#e2e8f0;font-size:0.88rem">' + SUBJECT_ICON_VI[r.subject] + '</span>' +
                '<span style="color:#64748b;font-size:0.78rem;margin-left:10px">' + typeLabel + ' · ' + dateStr + '</span>' +
                '</div>' +
                '<span style="font-size:1.1rem;font-weight:800;color:' + scoreColor + '">' + r.score + '/1000' +
                (r.correctCount !== null && r.totalCount !== null ? ' <span style="font-size:0.72rem;color:#64748b;font-weight:600">(' + r.correctCount + '/' + r.totalCount + ' câu)</span>' : '') +
                '</span>' +
                '</div>' +
                domainsHtml +
                '</div>';
        }).join('');

        box.innerHTML = header + rows;
    } catch (e) {
        box.innerHTML = '<div style="color:#ef4444;text-align:center;padding:20px;font-size:0.85rem">Lỗi kết nối</div>';
    }
}

function escapeHtmlRS(s) {
    return (s || '').replace(/[&<>"']/g, function(c) {
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
}
`;
}