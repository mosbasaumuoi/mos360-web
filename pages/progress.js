export function getProgressUI() {
    return `
<div style="max-width:900px; margin:30px auto; padding:0 15px;">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
        <div>
            <h1 style="font-size:1.5rem; font-weight:800; color:#fff;">📈 BẢNG TIẾN ĐỘ CÁ NHÂN</h1>
            <p style="color:#64748b; font-size:0.85rem; margin-top:4px;">Thống kê kết quả ôn luyện theo từng chủ đề</p>
        </div>
        <div style="display:flex; gap:10px;">
            <select id="progressCourse" onchange="loadProgress()" style="padding:9px 14px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.85rem; cursor:pointer;">
                <option value="IC3 GS6">IC3 GS6</option>
                <option value="GENERATIVE AI">GENERATIVE AI</option>
            </select>
            <button onclick="clearProgress()" style="padding:9px 14px; background:#1e2235; border:1px solid rgba(239,68,68,0.3); color:#ef4444; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem;">🗑️ Xóa lịch sử</button>
        </div>
    </div>

    <!-- Overall Stats -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:14px; margin-bottom:24px;" id="overallStats">
        <div style="background:#111422; border:1px solid rgba(0,242,255,0.15); border-radius:12px; padding:16px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700; margin-bottom:6px;">TỔNG CÂU ĐÃ LÀM</div>
            <div style="font-size:1.8rem; font-weight:800; color:#00f2ff;" id="totalAnswered">0</div>
        </div>
        <div style="background:#111422; border:1px solid rgba(34,197,94,0.15); border-radius:12px; padding:16px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700; margin-bottom:6px;">TỈ LỆ ĐÚNG</div>
            <div style="font-size:1.8rem; font-weight:800; color:#22c55e;" id="totalAccuracy">0%</div>
        </div>
        <div style="background:#111422; border:1px solid rgba(255,87,34,0.15); border-radius:12px; padding:16px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700; margin-bottom:6px;">SỐ BUỔI ÔN</div>
            <div style="font-size:1.8rem; font-weight:800; color:#FF5722;" id="totalSessions">0</div>
        </div>
        <div style="background:#111422; border:1px solid rgba(255,215,0,0.15); border-radius:12px; padding:16px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700; margin-bottom:6px;">ĐIỂM CAO NHẤT</div>
            <div style="font-size:1.8rem; font-weight:800; color:#FFD700;" id="bestScore">0</div>
        </div>
    </div>

    <!-- Category breakdown -->
    <div style="background:#111422; border:1px solid rgba(255,255,255,0.06); border-radius:14px; padding:20px; margin-bottom:20px;">
        <h3 style="color:#fff; font-size:1rem; font-weight:800; margin-bottom:16px;">📊 KẾT QUẢ THEO CHỦ ĐỀ</h3>
        <div id="categoryChart">
            <div style="color:#64748b; text-align:center; padding:20px;">Chưa có dữ liệu ôn luyện</div>
        </div>
    </div>

    <!-- Session history -->
    <div style="background:#111422; border:1px solid rgba(255,255,255,0.06); border-radius:14px; padding:20px;">
        <h3 style="color:#fff; font-size:1rem; font-weight:800; margin-bottom:16px;">🕐 LỊCH SỬ CÁC BUỔI ÔN</h3>
        <div id="sessionHistory">
            <div style="color:#64748b; text-align:center; padding:20px;">Chưa có buổi ôn nào</div>
        </div>
    </div>
</div>

<script>
var CATEGORY_LABELS = {
    'HARDWARE': '💻 Phần cứng',
    'SOFTWARE': '📦 Phần mềm',
    'OPERATING_SYSTEM': '🖥️ Hệ điều hành',
    'NETWORK': '🌐 Mạng máy tính',
    'SECURITY': '🔐 Bảo mật',
    'CLOUD_COMPUTING': '☁️ Điện toán đám mây',
    'IOT': '📡 IoT',
    'DIGITAL_CITIZENSHIP': '🌍 Kỹ năng số',
    'CRITICAL_THINKING': '🧠 Tư duy phê phán',
    'DATA': '📊 Dữ liệu',
    'AI_DIGITAL': '🤖 AI & Kỹ thuật số'
};

function getProgressKey(course) {
    return 'mos360_progress_' + course.replace(/\\s+/g,'_');
}

function loadProgress() {
    var course = document.getElementById('progressCourse').value;
    var key = getProgressKey(course);
    var raw = localStorage.getItem(key);
    var data = raw ? JSON.parse(raw) : { sessions: [], categoryStats: {} };

    // Overall stats
    var totalAnswered = 0, totalCorrect = 0, bestScore = 0;
    data.sessions.forEach(function(s) {
        totalAnswered += s.total || 0;
        totalCorrect += s.correct || 0;
        if (s.score > bestScore) bestScore = s.score;
    });
    document.getElementById('totalAnswered').textContent = totalAnswered;
    document.getElementById('totalAccuracy').textContent = totalAnswered ? Math.round(totalCorrect/totalAnswered*100) + '%' : '0%';
    document.getElementById('totalSessions').textContent = data.sessions.length;
    document.getElementById('bestScore').textContent = bestScore;

    // Category chart
    var catDiv = document.getElementById('categoryChart');
    var cats = data.categoryStats || {};
    var catKeys = Object.keys(cats);
    if (!catKeys.length) {
        catDiv.innerHTML = '<div style="color:#64748b; text-align:center; padding:20px;">Chưa có dữ liệu theo chủ đề</div>';
    } else {
        catDiv.innerHTML = catKeys.sort().map(function(cat) {
            var stat = cats[cat];
            var pct = stat.total ? Math.round(stat.correct/stat.total*100) : 0;
            var color = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';
            return '<div style="margin-bottom:14px;">' +
                '<div style="display:flex; justify-content:space-between; margin-bottom:5px;">' +
                    '<span style="font-size:0.88rem; font-weight:700; color:#e2e8f0;">' + (CATEGORY_LABELS[cat] || cat) + '</span>' +
                    '<span style="font-size:0.85rem; font-weight:800; color:' + color + ';">' + pct + '% (' + stat.correct + '/' + stat.total + ')</span>' +
                '</div>' +
                '<div style="background:#1e2235; border-radius:6px; height:8px; overflow:hidden;">' +
                    '<div style="background:' + color + '; height:100%; width:' + pct + '%; border-radius:6px; transition:width 0.5s;"></div>' +
                '</div>' +
            '</div>';
        }).join('');
    }

    // Session history
    var sessDiv = document.getElementById('sessionHistory');
    if (!data.sessions.length) {
        sessDiv.innerHTML = '<div style="color:#64748b; text-align:center; padding:20px;">Chưa có buổi ôn nào</div>';
    } else {
        var sorted = data.sessions.slice().reverse();
        sessDiv.innerHTML = '<div style="display:flex; flex-direction:column; gap:8px;">' +
            sorted.map(function(s, i) {
                var color = s.score >= 700 ? '#22c55e' : '#ef4444';
                var badge = s.score >= 700 ? '✅ ĐẠT' : '❌ CHƯA ĐẠT';
                return '<div style="display:flex; align-items:center; gap:12px; padding:12px 16px; background:#1a1f35; border-radius:10px; border:1px solid rgba(255,255,255,0.04);">' +
                    '<span style="font-size:0.8rem; color:#64748b; min-width:20px;">' + (sorted.length-i) + '</span>' +
                    '<span style="font-size:0.82rem; color:#94a3b8; flex:1;">' + (s.date||'') + '</span>' +
                    '<span style="font-size:0.82rem; color:#94a3b8;">' + (s.mode==='exam'?'🎯 Thi thử':'📖 Ôn luyện') + '</span>' +
                    '<span style="font-size:0.82rem; color:#94a3b8;">' + (s.correct||0) + '/' + (s.total||0) + ' câu</span>' +
                    '<span style="font-size:0.85rem; font-weight:800; color:' + color + ';">' + s.score + '/1000</span>' +
                    '<span style="font-size:0.75rem; padding:3px 8px; border-radius:12px; background:rgba(255,255,255,0.05); color:' + color + ';">' + badge + '</span>' +
                '</div>';
            }).join('') +
        '</div>';
    }
}

function clearProgress() {
    var course = document.getElementById('progressCourse').value;
    if (!confirm('Xóa toàn bộ lịch sử ôn luyện cho ' + course + '?')) return;
    localStorage.removeItem(getProgressKey(course));
    loadProgress();
}

// Hàm này được gọi từ quiz engine sau mỗi lần nộp bài
window.saveProgressSession = function(course, mode, correct, total, score, categoryResults) {
    var key = getProgressKey(course);
    var raw = localStorage.getItem(key);
    var data = raw ? JSON.parse(raw) : { sessions: [], categoryStats: {} };

    // Thêm session mới
    var now = new Date();
    data.sessions.push({
        date: now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit'}),
        mode: mode,
        correct: correct,
        total: total,
        score: score
    });

    // Cập nhật category stats
    if (categoryResults) {
        Object.keys(categoryResults).forEach(function(cat) {
            if (!data.categoryStats[cat]) data.categoryStats[cat] = { correct: 0, total: 0 };
            data.categoryStats[cat].correct += categoryResults[cat].correct || 0;
            data.categoryStats[cat].total += categoryResults[cat].total || 0;
        });
    }

    localStorage.setItem(key, JSON.stringify(data));
};

window.addEventListener('DOMContentLoaded', loadProgress);
</script>`;
}
