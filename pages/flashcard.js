export function getFlashcardUI(courseType, questionBank, imageBaseUrl, imageMap) {
    const bankJSON = JSON.stringify(
        questionBank.map(item => ({
            q: item.question,
            o: item.type === 'image-select'
                ? (item.options || []).map(opt => {
                    const key = typeof opt === 'object' ? (opt.img || opt.image || opt.key || opt.src || '') : opt;
                    const resolvedUrl = imageMap[key] ? imageBaseUrl + imageMap[key] : (opt.url || key);
                    return { label: typeof opt === 'object' ? (opt.label || '') : '', url: resolvedUrl };
                })
                : item.options || [],
            o_left: (item.left || []).map(k =>
                imageMap[k] ? imageBaseUrl + imageMap[k] : k
            ),
            o_right: item.right || [],
            c: item.answer,
            e: item.explanation || "",
            t: item.type || "single",
            lv: item.level || "",
            cat: item.category || "",
            img: item.image_key && imageMap[item.image_key] ? imageBaseUrl + imageMap[item.image_key] : ""
        }))
    );

    return `<!DOCTYPE html><html><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Flashcard: ${courseType}</title>
<style>
* { box-sizing:border-box; margin:0; padding:0; font-family:'Segoe UI',-apple-system,sans-serif; }
body { background:#08090e; color:#e2e8f0; min-height:100vh; display:flex; flex-direction:column; }
header { background:#111422; border-bottom:1px solid rgba(255,255,255,0.06); padding:14px 20px; display:flex; align-items:center; justify-content:space-between; }
.fc-container { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; }
.fc-progress { font-size:0.8rem; color:#64748b; font-weight:700; margin-bottom:16px; letter-spacing:0.5px; }
.fc-card-wrap { width:100%; max-width:600px; perspective:1000px; cursor:pointer; min-height:60vh; }
.fc-card { width:100%; min-height:60vh; position:relative; transform-style:preserve-3d; transition:transform 0.5s ease; border-radius:20px; }
.fc-card.flipped { transform:rotateY(180deg); }
.fc-front, .fc-back { position:absolute; inset:0; backface-visibility:hidden; border-radius:20px; padding:28px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; min-height:320px; overflow-y:auto; max-height:60vh; }
.fc-front { background:#161927; border:2px solid rgba(0,242,255,0.2); }
.fc-back { background:#131c2e; border:2px solid rgba(34,197,94,0.3); transform:rotateY(180deg); }
.fc-matching-imgs { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:12px; }
.fc-matching-imgs img { width:72px; height:72px; object-fit:contain; border-radius:8px; border:1px solid rgba(0,242,255,0.2); background:#1e2235; }
.fc-hint { font-size:0.75rem; color:#384260; font-weight:700; letter-spacing:0.5px; margin-bottom:12px; }
.fc-question { font-size:1.1rem; font-weight:700; color:#fff; line-height:1.5; }
.fc-img { max-width:100%; max-height:180px; object-fit:contain; border-radius:10px; margin-bottom:12px; }
.fc-answer-label { font-size:0.75rem; color:#22c55e; font-weight:800; letter-spacing:0.5px; margin-bottom:10px; }
.fc-answer { font-size:1rem; font-weight:700; color:#fff; line-height:1.5; margin-bottom:12px; }
.fc-explanation { font-size:0.85rem; color:#94a3b8; line-height:1.5; border-top:1px solid rgba(255,255,255,0.06); padding-top:12px; margin-top:4px; }
.fc-controls { display:flex; gap:12px; margin-top:20px; width:100%; max-width:600px; }
.fc-btn { flex:1; padding:13px; border:none; border-radius:12px; font-weight:800; font-size:0.9rem; cursor:pointer; transition:all 0.15s; }
.fc-btn-wrong { background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); }
.fc-btn-wrong:hover { background:rgba(239,68,68,0.25); }
.fc-btn-right { background:rgba(34,197,94,0.15); color:#22c55e; border:1px solid rgba(34,197,94,0.3); }
.fc-btn-right:hover { background:rgba(34,197,94,0.25); }
.fc-btn-flip { background:linear-gradient(135deg,#1e2235,#23293f); color:#00f2ff; border:1px solid rgba(0,242,255,0.2); }
.fc-options { margin-top:10px; width:100%; text-align:left; }
.fc-opt { background:#1e2235; border:1px solid #29304a; border-radius:8px; padding:10px 14px; margin-bottom:7px; font-size:0.88rem; color:#94a3b8; display:flex; gap:8px; }
.fc-opt.correct { border-color:#22c55e; background:rgba(34,197,94,0.08); color:#22c55e; }
.fc-stats { display:flex; gap:20px; margin-top:16px; font-size:0.85rem; font-weight:700; }
.fc-stat { text-align:center; }
.fc-stat span { display:block; font-size:1.2rem; font-weight:800; }
.fc-done { text-align:center; padding:40px 20px; }
.filter-bar { display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap; justify-content:center; }
.filter-bar select { padding:8px 12px; background:#1e2235; border:1px solid #384260; color:#fff; border-radius:8px; font-size:0.85rem; cursor:pointer; }
@media(max-width:500px) { .fc-front,.fc-back { padding:20px; min-height:280px; } .fc-question { font-size:1rem; } }
</style></head><body>

<header>
    <a href="/courses" style="color:#64748b; text-decoration:none; font-size:0.85rem; font-weight:700;">← Khóa học</a>
    <span style="font-weight:800; color:#fff;">📇 Flashcard: ${courseType}</span>
    <a href="/progress" style="color:#00f2ff; text-decoration:none; font-size:0.85rem; font-weight:700;">📈 Tiến độ</a>
</header>

<div class="fc-container">
    <div class="filter-bar" id="filterBar">
        <select id="fcLevel" onchange="initFlashcard()">
            <option value="ALL">Tất cả Level</option>
            <option value="IC3_LEVEL1">Level 1 – Cơ bản</option>
            <option value="IC3_LEVEL2">Level 2 – Trung cấp</option>
            <option value="IC3_LEVEL3">Level 3 – Nâng cao</option>
        </select>
        <select id="fcMode" onchange="initFlashcard()">
            <option value="all">Tất cả câu</option>
            <option value="wrong">Ôn câu sai</option>
        </select>
    </div>

    <div class="fc-progress" id="fcProgress">Câu 1 / 0</div>

    <div class="fc-card-wrap" onclick="flipCard()">
        <div class="fc-card" id="fcCard">
            <div class="fc-front">
                <div class="fc-hint">NHẤN ĐỂ XEM ĐÁP ÁN</div>
                <img id="fcImg" class="fc-img" style="display:none;" src="" alt="">
                <div class="fc-question" id="fcQuestion">Đang tải...</div>
                <div class="fc-matching-imgs" id="fcMatchingImages"></div>
            </div>
            <div class="fc-back">
                <div class="fc-answer-label">✅ ĐÁP ÁN</div>
                <div class="fc-answer" id="fcAnswer"></div>
                <div class="fc-options" id="fcOptions"></div>
                <div class="fc-explanation" id="fcExplanation"></div>
            </div>
        </div>
    </div>

    <div class="fc-controls" id="fcControls" style="display:none;">
        <button class="fc-btn fc-btn-wrong" onclick="markCard(false)">❌ Chưa nhớ</button>
        <button class="fc-btn fc-btn-flip" onclick="flipCard()">🔄 Lật thẻ</button>
        <button class="fc-btn fc-btn-right" onclick="markCard(true)">✅ Đã nhớ</button>
    </div>

    <div class="fc-stats" id="fcStats" style="display:none;">
        <div class="fc-stat"><span id="fcCorrectCount" style="color:#22c55e;">0</span>Đã nhớ</div>
        <div class="fc-stat"><span id="fcWrongCount" style="color:#ef4444;">0</span>Chưa nhớ</div>
        <div class="fc-stat"><span id="fcLeftCount" style="color:#00f2ff;">0</span>Còn lại</div>
    </div>

    <div class="fc-done" id="fcDone" style="display:none;">
        <div style="font-size:3rem; margin-bottom:16px;">🎉</div>
        <h2 style="color:#fff; margin-bottom:8px;">Hoàn thành!</h2>
        <p style="color:#64748b; margin-bottom:20px;" id="fcDoneMsg"></p>
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button onclick="initFlashcard()" style="padding:12px 24px; background:linear-gradient(135deg,#00f2ff,#00a2ff); color:#000; border:none; border-radius:10px; font-weight:800; cursor:pointer;">🔄 Làm lại</button>
            <button onclick="reviewWrong()" id="btnReviewWrong" style="display:none; padding:12px 24px; background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); border-radius:10px; font-weight:800; cursor:pointer;">❌ Ôn câu chưa nhớ</button>
            <a href="/progress" style="padding:12px 24px; background:#1e2235; color:#94a3b8; border:1px solid #384260; border-radius:10px; font-weight:800; text-decoration:none; display:inline-block;">📈 Xem tiến độ</a>
        </div>
    </div>
</div>

<script>
var fullBank = ${bankJSON};

// DEBUG: log image-select url để kiểm tra
(function() {
    var imgSel = fullBank.filter(function(q){ return q.t === 'image-select'; });
    if (imgSel.length) {
        console.log('[DEBUG] image-select o[0] full:', JSON.stringify(imgSel[0].o[0]));
        console.log('[DEBUG] image-select o[0].url:', imgSel[0].o[0] && imgSel[0].o[0].url);
        console.log('[DEBUG] image-select o[0].label:', imgSel[0].o[0] && imgSel[0].o[0].label);
    }
})();

var deck = [];
var cur = 0;
var isFlipped = false;
var correctCount = 0;
var wrongList = [];
var courseType = '${courseType}';

function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length-1; i > 0; i--) {
        var j = Math.floor(Math.random()*(i+1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
}

function getCorrectText(q) {
    if (q.t === 'matching') {
        // Mặt sau dùng renderMatchingBack() để hiện ảnh+text, ở đây chỉ trả chuỗi đơn giản
        return '';
    }
    if (q.t === 'image-select') {
        var correct = Array.isArray(q.c) ? q.c : [q.c];
        return 'Đáp án: ' + correct.map(function(i){ return 'Hình ' + String.fromCharCode(65+i); }).join(', ');
    }
    if (Array.isArray(q.c)) {
        if (q.o && q.o.length) return q.c.map(function(i){ return q.o[i]; }).join(', ');
        return q.c.join(', ');
    }
    if (typeof q.c === 'number' && q.o && q.o.length) return q.o[q.c];
    if (typeof q.c === 'string') return q.c;
    return String(q.c);
}

function initFlashcard() {
    var lv = document.getElementById('fcLevel') ? document.getElementById('fcLevel').value : 'ALL';
    var mode = document.getElementById('fcMode') ? document.getElementById('fcMode').value : 'all';

    var courseHasLevels = courseType === 'IC3 GS6';
    if (!courseHasLevels) document.getElementById('filterBar').querySelector('#fcLevel').parentElement.style.display = 'none';

    var filtered = fullBank;
    if (lv !== 'ALL') filtered = filtered.filter(function(b){ return b.lv === lv; });

    if (mode === 'wrong') {
        var wrongRaw = localStorage.getItem('mos360_fc_wrong_' + courseType);
        var wrongTexts = wrongRaw ? JSON.parse(wrongRaw) : [];
        filtered = filtered.filter(function(b){ return wrongTexts.indexOf(b.q) >= 0; });
    }

    deck = shuffleArray(filtered);
    cur = 0; correctCount = 0; wrongList = [];
    isFlipped = false;

    document.getElementById('fcDone').style.display = 'none';
    document.getElementById('fcCard').parentElement.style.display = 'block';
    document.getElementById('fcControls').style.display = 'flex';
    document.getElementById('fcStats').style.display = 'flex';

    if (!deck.length) {
        document.getElementById('fcQuestion').textContent = 'Không có thẻ nào!';
        document.getElementById('fcProgress').textContent = '0 / 0';
        document.getElementById('fcControls').style.display = 'none';
        document.getElementById('fcStats').style.display = 'none';
        return;
    }
    renderCard();
}

function renderCard() {
    if (cur >= deck.length) { showDone(); return; }
    var q = deck[cur];
    isFlipped = false;
    document.getElementById('fcCard').classList.remove('flipped');
    document.getElementById('fcProgress').textContent = 'Câu ' + (cur+1) + ' / ' + deck.length;

    // Front: câu hỏi + ảnh đơn
    document.getElementById('fcQuestion').textContent = q.q;
    var imgEl = document.getElementById('fcImg');
    if (q.img) { imgEl.src = q.img; imgEl.style.display = 'block'; }
    else { imgEl.style.display = 'none'; }

    // Front: ảnh matching / image-select hiện ở mặt trước
    var matchImgsDiv = document.getElementById('fcMatchingImages');
    matchImgsDiv.innerHTML = '';
    if (q.t === 'matching' && q.o_left && q.o_left.length) {
        q.o_left.forEach(function(imgUrl) {
            if (imgUrl && imgUrl.startsWith('http')) {
                var img = document.createElement('img');
                img.src = imgUrl;
                matchImgsDiv.appendChild(img);
            } else if (imgUrl) {
                var span = document.createElement('span');
                span.textContent = imgUrl;
                span.style.cssText = 'font-size:0.85rem; color:#94a3b8; padding:4px 8px; background:#1e2235; border-radius:6px;';
                matchImgsDiv.appendChild(span);
            }
        });
    } else if (q.t === 'image-select' && q.o && q.o.length) {
        // Mặt trước: hiện lưới ảnh + label bên dưới
        var grid = document.createElement('div');
        grid.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:12px;';
        q.o.forEach(function(opt, i) {
            var imgUrl = typeof opt === 'object' ? opt.url : opt;
            var optLabel = typeof opt === 'object' && opt.label ? opt.label : '';
            var wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:4px; max-width:90px;';
            var img = document.createElement('img');
            img.src = imgUrl;
            img.style.cssText = 'width:80px; height:80px; object-fit:contain; border-radius:8px; border:1px solid rgba(0,242,255,0.2); background:#1e2235;';
            var letter = document.createElement('span');
            letter.textContent = String.fromCharCode(65+i);
            letter.style.cssText = 'font-size:0.75rem; font-weight:800; color:#64748b;';
            wrapper.appendChild(img);
            wrapper.appendChild(letter);
            if (optLabel) {
                var lbl = document.createElement('span');
                lbl.textContent = optLabel;
                lbl.style.cssText = 'font-size:0.7rem; color:#94a3b8; text-align:center; line-height:1.3;';
                wrapper.appendChild(lbl);
            }
            grid.appendChild(wrapper);
        });
        matchImgsDiv.appendChild(grid);
    }

    // Back: đáp án + giải thích
    var answerEl = document.getElementById('fcAnswer');
    var answerText = getCorrectText(q);
    if (q.t === 'matching' || q.t === 'image-select') {
        // dùng ảnh ở fcOptions, ẩn text fcAnswer
        answerEl.textContent = '';
        answerEl.style.display = 'none';
    } else {
        answerEl.style.display = '';
        answerEl.textContent = answerText;
    }
    document.getElementById('fcExplanation').textContent = q.e || '';

    // Back: options hint
    var optsDiv = document.getElementById('fcOptions');
    optsDiv.innerHTML = '';
    if (q.t === 'single' || q.t === 'multiple') {
        q.o.forEach(function(opt, i) {
            var isCorrect = Array.isArray(q.c) ? q.c.indexOf(i) >= 0 : q.c === i;
            var div = document.createElement('div');
            div.className = 'fc-opt' + (isCorrect ? ' correct' : '');
            div.innerHTML = '<span style="font-weight:800;">' + String.fromCharCode(65+i) + '.</span>' + opt;
            optsDiv.appendChild(div);
        });
    } else if (q.t === 'matching' && q.o_left && q.o_left.length) {
        // Render từng cặp: ảnh/text bên trái → text bên phải
        optsDiv.style.textAlign = 'left';
        var correct = q.c || {};
        q.o_left.forEach(function(leftVal, i) {
            var rightKeys = Object.keys(correct);
            var matchKey = rightKeys[i] || '';
            var rightVal = correct[matchKey] || '';
            var row = document.createElement('div');
            row.style.cssText = 'display:flex; align-items:flex-start; gap:8px; margin-bottom:8px; background:#1e2235; border-radius:8px; padding:8px 12px; text-align:left;';
            // Left: ảnh hoặc text
            if (leftVal && leftVal.startsWith('http')) {
                var img = document.createElement('img');
                img.src = leftVal;
                img.style.cssText = 'width:60px; height:60px; object-fit:contain; border-radius:6px; flex-shrink:0;';
                row.appendChild(img);
            } else {
                var span = document.createElement('span');
                span.textContent = leftVal || ('Hình ' + String.fromCharCode(65+i));
                span.style.cssText = 'font-size:0.85rem; color:#94a3b8; flex:1; text-align:left; line-height:1.4; word-break:break-word;';
                row.appendChild(span);
            }
            // Arrow
            var arrow = document.createElement('span');
            arrow.textContent = '→';
            arrow.style.cssText = 'color:#22c55e; font-weight:800; font-size:1rem; flex-shrink:0; padding-top:1px;';
            row.appendChild(arrow);
            // Right: tên gọi
            var rightSpan = document.createElement('span');
            rightSpan.textContent = rightVal;
            rightSpan.style.cssText = 'font-size:0.88rem; color:#fff; font-weight:700; text-align:left; flex-shrink:0; max-width:45%; line-height:1.4; word-break:break-word;';
            row.appendChild(rightSpan);
            optsDiv.appendChild(row);
        });
    } else if (q.t === 'image-select' && q.o && q.o.length) {
        var correct = Array.isArray(q.c) ? q.c : [q.c];
        var grid = document.createElement('div');
        grid.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:8px;';
        q.o.forEach(function(opt, i) {
            var isCorrect = correct.indexOf(i) >= 0;
            var imgUrl = typeof opt === 'object' ? opt.url : opt;
            var imgLabel = typeof opt === 'object' ? (opt.label || '') : '';
            var wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:4px;';
            var img = document.createElement('img');
            img.src = imgUrl;
            img.style.cssText = 'width:80px; height:80px; object-fit:contain; border-radius:8px; border:2px solid ' + (isCorrect ? '#22c55e' : '#29304a') + '; background:#1e2235;';
            var label = document.createElement('span');
            label.textContent = String.fromCharCode(65+i) + (imgLabel ? ' ' + imgLabel : '');
            label.style.cssText = 'font-size:0.72rem; font-weight:800; color:' + (isCorrect ? '#22c55e' : '#64748b') + '; text-align:center; max-width:88px;';
            wrapper.appendChild(img);
            wrapper.appendChild(label);
            grid.appendChild(wrapper);
        });
        optsDiv.appendChild(grid);
    }

    updateStats();
}

function flipCard() {
    isFlipped = !isFlipped;
    document.getElementById('fcCard').classList.toggle('flipped', isFlipped);
}

function markCard(remembered) {
    if (!isFlipped) { flipCard(); return; }
    var q = deck[cur];
    if (remembered) {
        correctCount++;
    } else {
        wrongList.push(q.q);
    }
    cur++;
    updateStats();
    renderCard();
}

function updateStats() {
    document.getElementById('fcCorrectCount').textContent = correctCount;
    document.getElementById('fcWrongCount').textContent = wrongList.length;
    document.getElementById('fcLeftCount').textContent = Math.max(0, deck.length - cur);
}

function showDone() {
    document.getElementById('fcCard').parentElement.style.display = 'none';
    document.getElementById('fcControls').style.display = 'none';
    document.getElementById('fcStats').style.display = 'none';
    document.getElementById('fcDone').style.display = 'block';
    document.getElementById('fcDoneMsg').textContent =
        'Đã nhớ: ' + correctCount + '/' + deck.length + ' thẻ (' + Math.round(correctCount/deck.length*100) + '%)';

    // Lưu câu sai để ôn lại
    localStorage.setItem('mos360_fc_wrong_' + courseType, JSON.stringify(wrongList));
    if (wrongList.length > 0) document.getElementById('btnReviewWrong').style.display = 'inline-block';
    else document.getElementById('btnReviewWrong').style.display = 'none';
}

function reviewWrong() {
    document.getElementById('fcMode').value = 'wrong';
    initFlashcard();
}

window.addEventListener('DOMContentLoaded', initFlashcard);
</script>
</body></html>`;
}