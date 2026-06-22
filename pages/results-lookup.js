// ============================================================
// MOS360 — Trang tra cứu kết quả học viên (/ket-qua)
// Công khai — học viên nhập SĐT lần đầu, lần sau tự động load.
// ============================================================

export function getResultsLookupUI() {
    return `
<div style="max-width:680px; margin:36px auto 60px; padding:0 16px;">

    <!-- HEADER -->
    <div style="text-align:center; margin-bottom:28px;">
        <div style="font-size:2.2rem; margin-bottom:8px;">📊</div>
        <h2 style="color:var(--text); font-size:1.4rem; font-weight:800; margin-bottom:6px;">Kết quả luyện tập & thi thử</h2>
        <p style="color:var(--muted); font-size:0.85rem; line-height:1.6;">Xem lại toàn bộ lịch sử bài làm của bạn trên phần mềm MOS360.</p>
    </div>

    <!-- FORM NHẬP SĐT (ẩn đi sau khi đã xác thực) -->
    <div id="rlPhoneBox" class="section-card" style="padding:28px; margin-bottom:20px;">
        <div style="font-size:0.82rem; color:var(--muted); margin-bottom:16px; line-height:1.6;">
            Nhập số điện thoại đã đăng ký học tại MOS360 để xem kết quả của bạn.
        </div>
        <div style="display:flex; gap:8px;">
            <input type="tel" id="rlPhoneInput" placeholder="VD: 0912345678"
                style="flex:1; padding:12px 14px; background:#E2ECFA; border:1px solid var(--border); color:var(--text); border-radius:10px; font-size:0.95rem;"
                onkeydown="if(event.key==='Enter') lookupMyResults()">
            <button onclick="lookupMyResults()" id="rlBtnLookup"
                class="btn-action" style="width:auto; padding:12px 22px; white-space:nowrap;">Xem kết quả</button>
        </div>
        <div id="rlPhoneError" style="display:none; margin-top:10px; color:#dc2626; font-size:0.82rem;"></div>
    </div>

    <!-- KHU KẾT QUẢ -->
    <div id="rlResultBox" style="display:none;">

        <!-- HEADER HỌC VIÊN -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:8px;">
            <div>
                <div id="rlStudentName" style="font-size:1.05rem; font-weight:800; color:var(--text);"></div>
                <div id="rlStudentPhone" style="font-size:0.8rem; color:var(--muted); margin-top:2px;"></div>
            </div>
            <button onclick="rlLogout()"
                style="padding:6px 14px; background:transparent; border:1px solid var(--border); color:var(--muted); border-radius:8px; font-size:0.78rem; cursor:pointer;">
                Đổi số điện thoại
            </button>
        </div>

        <!-- THỐNG KÊ TỔNG NHANH -->
        <div id="rlSummaryCards" style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:18px;"></div>

        <!-- BỘ LỌC -->
        <div style="display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap;">
            <select id="rlFilterSubject" onchange="rlApplyFilter()"
                style="padding:8px 12px; background:var(--card); border:1px solid var(--border); color:var(--text); border-radius:8px; font-size:0.82rem; cursor:pointer;">
                <option value="">Tất cả môn</option>
                <option value="excel">📊 Excel</option>
                <option value="word">📄 Word</option>
                <option value="ppt">📽️ PowerPoint</option>
            </select>
            <select id="rlFilterType" onchange="rlApplyFilter()"
                style="padding:8px 12px; background:var(--card); border:1px solid var(--border); color:var(--text); border-radius:8px; font-size:0.82rem; cursor:pointer;">
                <option value="">Thi & Ôn luyện</option>
                <option value="test">🎯 Thi thử</option>
                <option value="learn">📖 Ôn luyện</option>
            </select>
        </div>

        <!-- DANH SÁCH KẾT QUẢ -->
        <div id="rlResultList"></div>
    </div>

    <!-- TRẠNG THÁI LOADING -->
    <div id="rlLoading" style="display:none; text-align:center; padding:40px; color:var(--muted); font-size:0.88rem;">
        ⏳ Đang tải kết quả...
    </div>
</div>

<script>
var RL_STORAGE_KEY = 'mos360_rl_phone';
var RL_ALL_RESULTS = [];
var RL_SUBJECT_LABEL = { excel: '📊 Excel', word: '📄 Word', ppt: '📽️ PowerPoint' };

// Khởi tạo: nếu đã có SĐT trong localStorage thì tự động load luôn
(function rlInit() {
    var saved = localStorage.getItem(RL_STORAGE_KEY);
    if (saved) {
        document.getElementById('rlPhoneBox').style.display = 'none';
        rlFetchAndRender(saved);
    }
})();

async function lookupMyResults() {
    var phone = document.getElementById('rlPhoneInput').value.trim();
    var errBox = document.getElementById('rlPhoneError');
    errBox.style.display = 'none';
    if (!phone) { errBox.textContent = 'Vui lòng nhập số điện thoại.'; errBox.style.display = 'block'; return; }

    var btn = document.getElementById('rlBtnLookup');
    btn.disabled = true; btn.textContent = '⏳ Đang tải...';
    try {
        var ok = await rlFetchAndRender(phone);
        if (ok) {
            localStorage.setItem(RL_STORAGE_KEY, phone);
            document.getElementById('rlPhoneBox').style.display = 'none';
        }
    } finally {
        btn.disabled = false; btn.textContent = 'Xem kết quả';
    }
}

async function rlFetchAndRender(phone) {
    document.getElementById('rlLoading').style.display = 'block';
    document.getElementById('rlResultBox').style.display = 'none';
    try {
        var res = await fetch('/api/results?phone=' + encodeURIComponent(phone) + '&limit=200');
        var data = await res.json();
        if (!data.success) {
            rlShowPhoneError(data.msg || 'Có lỗi xảy ra, vui lòng thử lại.');
            return false;
        }
        RL_ALL_RESULTS = data.results || [];
        rlRenderResults(phone);
        return true;
    } catch (e) {
        rlShowPhoneError('Không kết nối được tới máy chủ. Vui lòng kiểm tra mạng và thử lại.');
        return false;
    } finally {
        document.getElementById('rlLoading').style.display = 'none';
    }
}

function rlRenderResults(phone) {
    var box = document.getElementById('rlResultBox');
    box.style.display = 'block';

    // Tên học viên (lấy từ bản ghi đầu tiên)
    var studentName = (RL_ALL_RESULTS[0] && RL_ALL_RESULTS[0].studentName) || '';
    document.getElementById('rlStudentName').textContent = studentName || 'Học viên';
    document.getElementById('rlStudentPhone').textContent = '📱 ' + phone;

    // Thống kê tổng nhanh
    var totalTest = RL_ALL_RESULTS.filter(function(r) { return r.type === 'test'; }).length;
    var passed = RL_ALL_RESULTS.filter(function(r) { return r.type === 'test' && r.score >= 700; }).length;
    var scores = RL_ALL_RESULTS.map(function(r) { return r.score; });
    var best = scores.length ? Math.max.apply(null, scores) : 0;

    document.getElementById('rlSummaryCards').innerHTML = [
        { label: 'Lượt thi thử', val: totalTest, color: '#00f2ff' },
        { label: 'Đạt (≥700đ)', val: passed + '/' + totalTest, color: '#22c55e' },
        { label: 'Điểm cao nhất', val: best || '—', color: '#FFD700' }
    ].map(function(c) {
        return '<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;text-align:center;">' +
            '<div style="font-size:0.68rem;color:var(--muted);font-weight:700;margin-bottom:5px;">' + c.label.toUpperCase() + '</div>' +
            '<div style="font-size:1.5rem;font-weight:800;color:' + c.color + '">' + c.val + '</div></div>';
    }).join('');

    rlApplyFilter();
}

function rlApplyFilter() {
    var subj = document.getElementById('rlFilterSubject').value;
    var type = document.getElementById('rlFilterType').value;
    var filtered = RL_ALL_RESULTS.filter(function(r) {
        return (!subj || r.subject === subj) && (!type || r.type === type);
    });
    rlRenderList(filtered);
}

function rlRenderList(results) {
    var box = document.getElementById('rlResultList');
    if (!results.length) {
        box.innerHTML = '<div style="text-align:center;padding:32px;color:var(--muted);font-size:0.85rem;">Chưa có kết quả nào phù hợp với bộ lọc.</div>';
        return;
    }
    box.innerHTML = results.map(function(r) {
        var dt = new Date(r.submittedAt);
        var dateStr = dt.toLocaleDateString('vi-VN') + ' ' + dt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        var isPassed = r.score >= 700;
        var isTest = r.type === 'test';
        var scoreColor = isPassed ? '#22c55e' : '#ef4444';
        var scoreLabel = isTest ? (isPassed ? '✅ ĐẠT' : '❌ CHƯA ĐẠT') : '';

        var domainsHtml = '';
        if (Array.isArray(r.domains) && r.domains.length) {
            domainsHtml = '<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;">' +
                r.domains.map(function(d) {
                    var pct = d.percent || 0;
                    var dColor = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';
                    var barW = Math.min(pct, 100);
                    return '<div style="flex:1;min-width:140px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:8px 10px;">' +
                        '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">' +
                        '<span style="font-size:0.7rem;color:var(--muted);">' + rlEscape(d.name) + '</span>' +
                        '<span style="font-size:0.7rem;font-weight:700;color:' + dColor + '">' + pct + '%</span></div>' +
                        '<div style="height:4px;background:var(--border);border-radius:2px;overflow:hidden;">' +
                        '<div style="height:100%;width:' + barW + '%;background:' + dColor + ';border-radius:2px;transition:width .4s;"></div></div></div>';
                }).join('') + '</div>';
        }

        return '<div class="section-card" style="padding:16px 18px;margin-bottom:10px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
            '<span style="font-weight:800;color:var(--text);font-size:0.9rem;">' + (RL_SUBJECT_LABEL[r.subject] || r.subject) + '</span>' +
            '<span style="font-size:0.75rem;padding:3px 9px;border-radius:10px;background:' + (isTest ? 'rgba(255,87,34,0.1)' : 'rgba(100,116,139,0.15)') + ';color:' + (isTest ? '#FF5722' : 'var(--muted)') + ';font-weight:700;">' +
            (isTest ? '🎯 Thi thử' : '📖 Ôn luyện') + '</span></div>' +
            '<div style="text-align:right;">' +
            '<div style="font-size:1.3rem;font-weight:800;color:' + scoreColor + '">' + r.score + '<span style="font-size:0.7rem;color:var(--muted);font-weight:600;">/1000</span></div>' +
            (scoreLabel ? '<div style="font-size:0.72rem;font-weight:700;color:' + scoreColor + '">' + scoreLabel + '</div>' : '') +
            '</div></div>' +
            (r.correctCount !== null && r.totalCount !== null
                ? '<div style="font-size:0.76rem;color:var(--muted);margin-top:5px;">Đúng <b style="color:var(--text)">' + r.correctCount + '</b>/' + r.totalCount + ' câu · ' + dateStr + '</div>'
                : '<div style="font-size:0.76rem;color:var(--muted);margin-top:5px;">' + dateStr + '</div>') +
            domainsHtml + '</div>';
    }).join('');
}

function rlLogout() {
    localStorage.removeItem(RL_STORAGE_KEY);
    RL_ALL_RESULTS = [];
    document.getElementById('rlResultBox').style.display = 'none';
    document.getElementById('rlPhoneBox').style.display = 'block';
    document.getElementById('rlPhoneInput').value = '';
}

function rlShowPhoneError(msg) {
    document.getElementById('rlLoading').style.display = 'none';
    document.getElementById('rlPhoneBox').style.display = 'block';
    var err = document.getElementById('rlPhoneError');
    err.textContent = '❌ ' + msg;
    err.style.display = 'block';
}

function rlEscape(s) {
    return (s || '').replace(/[&<>"']/g, function(c) {
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
}
</script>`;
}