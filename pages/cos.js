// pages/cos.js — MOS360 COS (Competency Operating System)
// Dùng React.createElement thuần — không cần Babel, không cần bundler

export function getCosUI() {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MOS360 COS — Competency Operating System</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
        .step-active { color: #2563eb; font-weight: 700; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">

<header style="position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);border-bottom:1px solid #e2e8f0;padding:12px 16px;display:flex;align-items:center;gap:12px;">
    <a href="/" style="font-size:13px;font-weight:700;color:#64748b;text-decoration:none;">← MOS360</a>
    <span style="color:#cbd5e1">|</span>
    <span style="font-size:14px;font-weight:900;color:#1e293b;">🧬 COS <span style="color:#2563eb;">Beta</span></span>
</header>

<div id="cos-root" style="padding:24px 16px;max-width:700px;margin:0 auto;"></div>

<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script>
// ── STATE (simple object + re-render) ──────────────────────────
var state = {
    goal: '', context: '', competencyId: '',
    conversations: [], evidence: [], reflections: [], portfolio: [],
    currentStep: 'goal', isProcessing: false, sessionId: null
};

function setState(patch) {
    Object.assign(state, typeof patch === 'function' ? patch(state) : patch);
    renderApp();
}

// ── AI LOGIC ──────────────────────────────────────────────────
function welcomeMsg(goal, ctx) {
    var m = '👋 Chào bạn! Mình sẽ đồng hành để đạt mục tiêu: "' + goal + '"\\n\\n';
    if (ctx) m += '📌 Bối cảnh: "' + ctx + '"\\n\\n';
    m += '🤔 Hãy cho mình biết:\\n1️⃣ Bạn đã có tài liệu gì liên quan?\\n2️⃣ Thách thức cụ thể là gì?\\n3️⃣ Kỳ vọng kết quả thế nào?\\n\\n💡 Bắt đầu bằng câu hỏi hoặc chia sẻ suy nghĩ nhé!';
    return m;
}

function aiReply(input) {
    var s = input.toLowerCase();
    if (s.includes('tóm tắt') || s.includes('tổng kết'))
        return '📝 Tóm tắt:\\n🎯 Mục tiêu: ' + state.goal + '\\n💬 Lượt trao đổi: ' + state.conversations.filter(function(c){return c.role==='user';}).length;
    if (s.includes('giúp') || s.includes('help'))
        return '🤝 Mình sẵn sàng! Bạn muốn làm rõ điều gì?';
    if (s.includes('evidence') || s.includes('bằng chứng'))
        return '📌 Hãy bấm nút "📌 Tạo Evidence" bên dưới để lưu lại cuộc hội thoại này nhé!';
    var r = [
        '🤔 Thú vị! Bằng chứng nào hỗ trợ cho quan điểm này của bạn?',
        '🧠 Nếu thay đổi một yếu tố cố định, kết quả có tối ưu hơn không?',
        '💡 Vấn đề cốt lõi là gì? Bạn có những lựa chọn nào?',
        '🌟 Nếu giải thích ngắn gọn cho người mới, bạn sẽ tóm gọn thế nào?'
    ];
    return r[Math.floor(Math.random() * r.length)];
}

// ── PROGRESS ──────────────────────────────────────────────────
function getProgress() {
    var steps = ['goal','conversation','evidence','reflection','portfolio'];
    var i = steps.indexOf(state.currentStep);
    return Math.round((i / (steps.length - 1)) * 100);
}

// ── RENDER HELPERS ───────────────────────────────────────────
function el(tag, props) {
    var args = [tag, props];
    for (var i = 2; i < arguments.length; i++) args.push(arguments[i]);
    return React.createElement.apply(React, args);
}

function btn(label, onClick, cls, disabled) {
    return el('button', {
        onClick: onClick,
        disabled: !!disabled,
        style: { opacity: disabled ? 0.45 : 1, cursor: disabled ? 'not-allowed' : 'pointer' },
        className: cls || 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors'
    }, label);
}

// ── PROGRESS BAR ─────────────────────────────────────────────
function ProgressBar() {
    var pct = getProgress();
    var steps = ['goal','conversation','evidence','reflection','portfolio'];
    var labels = ['🎯 Goal','💬 Chat','📌 Evidence','🪞 Reflect','🌱 Portfolio'];
    return el('div', { className: 'mb-6 space-y-2' },
        el('div', { className: 'flex justify-between text-xs text-gray-500' },
            el('span', null, 'Tiến độ hành trình'),
            el('span', null, pct + '%')
        ),
        el('div', { className: 'h-1.5 w-full bg-gray-200 rounded-full overflow-hidden' },
            el('div', { className: 'h-full bg-blue-600 transition-all duration-500', style: { width: pct + '%' } })
        ),
        el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', textAlign: 'center', fontSize: '10px', color: '#94a3b8', marginTop: 4 } },
            steps.map(function(s, i) {
                return el('span', { key: s, style: { color: state.currentStep === s ? '#2563eb' : undefined, fontWeight: state.currentStep === s ? 700 : undefined, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, labels[i]);
            })
        )
    );
}

// ── GOAL STEP ────────────────────────────────────────────────
function GoalStep() {
    return el('div', { className: 'bg-white rounded-2xl shadow-sm p-6 border border-gray-100' },
        el('div', { className: 'text-center mb-6' },
            el('span', { style: { fontSize: 40, display: 'block', marginBottom: 8 } }, '🎯'),
            el('h2', { className: 'text-2xl font-bold text-gray-800' }, 'Mục tiêu của bạn hôm nay là gì?'),
            el('p', { className: 'text-gray-500 text-sm mt-1' }, 'Hãy để lại thông tin, mình sẽ đồng hành từng bước.')
        ),
        el('div', { className: 'space-y-4' },
            el('div', null,
                el('label', { className: 'text-sm font-medium block mb-1' }, 'Mục tiêu ', el('span', { className: 'text-red-500' }, '*')),
                el('textarea', {
                    value: state.goal,
                    onChange: function(e) { setState({ goal: e.target.value }); },
                    placeholder: 'Ví dụ: Tôi muốn học cách tối ưu hóa Prompt viết bài...',
                    className: 'w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors',
                    rows: 3
                })
            ),
            el('div', null,
                el('label', { className: 'text-sm font-medium block mb-1' }, 'Bối cảnh ', el('span', { className: 'text-gray-400 text-xs' }, '(Không bắt buộc)')),
                el('textarea', {
                    value: state.context,
                    onChange: function(e) { setState({ context: e.target.value }); },
                    placeholder: 'Thông tin thêm về ngữ cảnh hiện tại...',
                    className: 'w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors',
                    rows: 2
                })
            ),
            el('div', null,
                el('label', { className: 'text-sm font-medium block mb-1' }, 'Competency ', el('span', { className: 'text-gray-400 text-xs' }, '(Không bắt buộc)')),
                el('select', {
                    value: state.competencyId,
                    onChange: function(e) { setState({ competencyId: e.target.value }); },
                    className: 'w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 bg-white'
                },
                    el('option', { value: '' }, 'Chọn Competency...'),
                    el('option', { value: 'AI-MND-001' }, 'AI-MND-001 — AI Mindset'),
                    el('option', { value: 'AI-THK-001' }, 'AI-THK-001 — AI Thinking'),
                    el('option', { value: 'AI-COM-001' }, 'AI-COM-001 — AI Communication')
                )
            ),
            el('button', {
                onClick: function() {
                    if (!state.goal.trim()) return;
                    var sid = 'session_' + Date.now();
                    setState({
                        sessionId: sid,
                        currentStep: 'conversation',
                        conversations: [{ role: 'assistant', content: welcomeMsg(state.goal, state.context), id: Date.now() }]
                    });
                },
                disabled: !state.goal.trim(),
                className: 'w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full font-semibold shadow-md transition-all',
                style: { opacity: state.goal.trim() ? 1 : 0.45, cursor: state.goal.trim() ? 'pointer' : 'not-allowed' }
            }, '🚀 Bắt đầu hành trình')
        )
    );
}

// ── CONVERSATION STEP ─────────────────────────────────────────
var convInput = '';

function ConversationStep() {
    var canEvidence = state.conversations.length >= 3;

    function sendMsg() {
        var txt = convInput.trim();
        if (!txt || state.isProcessing) return;
        convInput = '';
        var newConvs = state.conversations.concat([{ role: 'user', content: txt, id: Date.now() }]);
        setState({ conversations: newConvs, isProcessing: true });
        setTimeout(function() {
            setState(function(s) {
                return { isProcessing: false, conversations: s.conversations.concat([{ role: 'assistant', content: aiReply(txt), id: Date.now() + 1 }]) };
            });
        }, 800);
    }

    function createEvidence() {
        if (!canEvidence) return;
        var userMsgs = state.conversations.filter(function(c){ return c.role === 'user'; });
        var content = '📋 Tóm tắt năng lực thực chiến\\n\\n🎯 Mục tiêu: ' + state.goal +
            '\\n📌 Bối cảnh: ' + (state.context || 'Không có') +
            '\\n\\n💬 Các luận điểm:\\n' + userMsgs.map(function(c,i){ return (i+1)+'. '+c.content; }).join('\\n') +
            '\\n\\n⏱️ ' + new Date().toLocaleString('vi-VN');
        setState(function(s) {
            return {
                currentStep: 'evidence',
                evidence: s.evidence.concat([{ type: 'summary', content: content, id: Date.now() }]),
                portfolio: s.portfolio.concat([{ type: 'evidence', title: 'Evidence ' + new Date().toLocaleDateString('vi-VN'), content: content, createdAt: new Date().toISOString(), id: Date.now()+1 }])
            };
        });
    }

    return el('div', { className: 'bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col', style: { height: 520 } },
        // Header
        el('div', { className: 'flex justify-between items-center p-4 border-b' },
            el('span', { className: 'font-bold text-gray-700 flex items-center gap-2' }, '💬 AI Competency Coach'),
            btn('📌 Xem Evidence', function(){ setState({ currentStep: 'evidence' }); }, 'text-xs text-blue-600 hover:underline bg-transparent border-0 cursor-pointer')
        ),
        // Messages
        el('div', {
            id: 'chat-messages',
            className: 'flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3 chat-scroll'
        },
            state.conversations.map(function(msg, i) {
                var isUser = msg.role === 'user';
                return el('div', { key: msg.id || i, style: { display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' } },
                    el('div', {
                        style: {
                            padding: '10px 14px', borderRadius: 16, maxWidth: '85%',
                            fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.6,
                            background: isUser ? '#2563eb' : '#fff',
                            color: isUser ? '#fff' : '#1e293b',
                            border: isUser ? 'none' : '1px solid #e2e8f0',
                            borderTopRightRadius: isUser ? 4 : 16,
                            borderTopLeftRadius: isUser ? 16 : 4,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                        }
                    }, msg.content)
                );
            }),
            state.isProcessing ? el('div', { style: { display: 'flex', justifyContent: 'flex-start' } },
                el('div', { style: { padding: '10px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, borderTopLeftRadius: 4, fontSize: 13, color: '#94a3b8' } }, '⏳ Đang suy nghĩ...')
            ) : null,
            el('div', { id: 'chat-end' })
        ),
        // Input area
        el('div', { className: 'p-3 space-y-2 border-t' },
            el('div', { style: { display: 'flex', gap: 8 } },
                el('input', {
                    id: 'conv-input',
                    type: 'text',
                    defaultValue: '',
                    onKeyDown: function(e) {
                        if (e.key === 'Enter') { convInput = e.target.value; e.target.value = ''; sendMsg(); }
                        else convInput = e.target.value;
                    },
                    onChange: function(e) { convInput = e.target.value; },
                    placeholder: 'Nhập câu hỏi hoặc chia sẻ tiến độ...',
                    className: 'flex-1 border-2 border-gray-200 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-blue-500',
                    disabled: state.isProcessing
                }),
                el('button', {
                    onClick: function() {
                        var inp = document.getElementById('conv-input');
                        convInput = inp.value; inp.value = ''; sendMsg();
                    },
                    disabled: state.isProcessing,
                    className: 'bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl text-sm font-semibold',
                    style: { opacity: state.isProcessing ? 0.5 : 1 }
                }, state.isProcessing ? '⏳' : 'Gửi')
            ),
            el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                el('button', {
                    onClick: createEvidence,
                    disabled: !canEvidence,
                    className: 'text-xs px-4 py-2 rounded-lg border bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition-colors',
                    style: { opacity: canEvidence ? 1 : 0.4, cursor: canEvidence ? 'pointer' : 'not-allowed' }
                }, '📌 Tạo Evidence'),
                el('div', { style: { display: 'flex', gap: 8 } },
                    el('button', { onClick: function(){ setState({ currentStep: 'reflection' }); }, className: 'text-xs text-gray-500 hover:text-gray-700 px-2 py-1' }, '🪞 Suy ngẫm'),
                    el('button', { onClick: function(){ setState({ currentStep: 'portfolio' }); }, className: 'text-xs text-gray-500 hover:text-gray-700 px-2 py-1' }, '🌱 Portfolio')
                )
            )
        )
    );
}

// ── EVIDENCE STEP ─────────────────────────────────────────────
function EvidenceStep() {
    return el('div', { className: 'bg-white rounded-2xl shadow-sm p-6 border border-gray-100' },
        el('div', { className: 'flex justify-between items-center mb-4 pb-2 border-b' },
            el('h3', { className: 'font-bold text-gray-800' }, '📌 Evidence — Bằng chứng năng lực'),
            btn('💬 Trở lại chat', function(){ setState({ currentStep: 'conversation' }); }, 'text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-600 transition-colors')
        ),
        state.evidence.length === 0
            ? el('div', { className: 'text-center py-12 text-gray-400 space-y-3' },
                el('span', { style: { fontSize: 40, display: 'block' } }, '📭'),
                el('p', { className: 'text-sm' }, 'Chưa có bằng chứng nào. Hãy trao đổi thêm rồi tạo Evidence.'),
                btn('Quay lại chat', function(){ setState({ currentStep: 'conversation' }); }, 'bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold mt-2')
            )
            : el('div', { className: 'space-y-4' },
                state.evidence.map(function(ev, i) {
                    return el('div', { key: ev.id || i, className: 'border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-blue-400 transition-colors relative' },
                        el('span', { className: 'absolute top-3 right-3 text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full' }, 'Tóm tắt'),
                        el('pre', { style: { fontFamily: 'inherit', fontSize: 13, color: '#374151', whiteSpace: 'pre-wrap', lineHeight: 1.7 } }, ev.content)
                    );
                }),
                btn('🪞 Tiến đến Reflection', function(){ setState({ currentStep: 'reflection' }); }, 'w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm mt-2')
            )
    );
}

// ── REFLECTION STEP ───────────────────────────────────────────
var reflAnswers = { whatWorked: '', whatFailed: '', whatLearned: '', nextAction: '' };

function ReflectionStep() {
    var fields = [
        { label: '✅ Điều gì đã hoạt động hiệu quả?', key: 'whatWorked', holder: 'Những gì bạn đã làm tốt...' },
        { label: '🔧 Điều gì chưa hiệu quả?', key: 'whatFailed', holder: 'Khó khăn hoặc điểm cần cải thiện...' },
        { label: '📚 Bài học cốt lõi rút ra?', key: 'whatLearned', holder: 'Kinh nghiệm hoặc kiến thức mới...' },
        { label: '🚀 Hành động tiếp theo?', key: 'nextAction', holder: 'Ứng dụng vào công việc thực tế...' }
    ];

    function submit() {
        var content = '🪞 Reflection Journal\\n📅 ' + new Date().toLocaleDateString('vi-VN') +
            '\\n🎯 Mục tiêu: ' + state.goal +
            '\\n\\n✅ Hiệu quả:\\n' + (reflAnswers.whatWorked || 'N/A') +
            '\\n\\n🔧 Cần cải thiện:\\n' + (reflAnswers.whatFailed || 'N/A') +
            '\\n\\n📚 Bài học:\\n' + (reflAnswers.whatLearned || 'N/A') +
            '\\n\\n🚀 Tiếp theo:\\n' + (reflAnswers.nextAction || 'N/A');
        setState(function(s) {
            return {
                currentStep: 'portfolio',
                reflections: s.reflections.concat([Object.assign({}, reflAnswers, { sessionId: s.sessionId, id: Date.now() })]),
                portfolio: s.portfolio.concat([{ type: 'reflection', title: 'Reflection ' + new Date().toLocaleDateString('vi-VN'), content: content, createdAt: new Date().toISOString(), id: Date.now()+1 }])
            };
        });
    }

    return el('div', { className: 'bg-white rounded-2xl shadow-sm p-6 border border-gray-100' },
        el('div', { className: 'text-center mb-6' },
            el('span', { style: { fontSize: 40, display: 'block', marginBottom: 6 } }, '🪞'),
            el('h3', { className: 'text-xl font-bold text-gray-800' }, 'Reflection — Bạn đã học được gì?'),
            el('p', { className: 'text-xs text-gray-500 mt-1' }, 'Viết ra suy ngẫm giúp biến trải nghiệm thành năng lực.')
        ),
        el('div', { className: 'space-y-4' },
            fields.map(function(f) {
                return el('div', { key: f.key },
                    el('label', { className: 'text-xs font-semibold text-gray-700 block mb-1' }, f.label),
                    el('textarea', {
                        defaultValue: reflAnswers[f.key],
                        onChange: function(e) { reflAnswers[f.key] = e.target.value; },
                        placeholder: f.holder,
                        className: 'w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500',
                        rows: 2
                    })
                );
            }),
            el('div', { className: 'pt-2 space-y-2' },
                btn('✅ Hoàn thành và lưu vào Portfolio', submit, 'w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm'),
                el('button', { onClick: function(){ setState({ currentStep: 'portfolio' }); }, className: 'w-full text-xs text-gray-400 hover:text-gray-600 text-center block py-1' }, 'Xem trực tiếp Portfolio')
            )
        )
    );
}

// ── PORTFOLIO STEP ────────────────────────────────────────────
function PortfolioStep() {
    return el('div', { className: 'bg-white rounded-2xl shadow-sm p-6 border border-gray-100' },
        el('div', { className: 'flex justify-between items-center mb-4 pb-2 border-b' },
            el('h3', { className: 'font-bold text-gray-800' }, '🌱 Portfolio — Hành trình của bạn'),
            btn('🔄 Bắt đầu lượt mới', function(){
                setState({ goal:'', context:'', competencyId:'', conversations:[], evidence:[], reflections:[], portfolio:[], currentStep:'goal', isProcessing:false, sessionId:null });
                reflAnswers = { whatWorked:'', whatFailed:'', whatLearned:'', nextAction:'' };
            }, 'text-xs text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium')
        ),
        state.portfolio.length === 0
            ? el('div', { className: 'text-center py-12 text-gray-400' },
                el('span', { style: { fontSize: 40, display: 'block', marginBottom: 8 } }, '🍃'),
                el('p', { className: 'text-sm' }, 'Portfolio trống. Hoàn thành quy trình để thu hoạch thành quả!')
            )
            : el('div', { className: 'space-y-3' },
                state.portfolio.map(function(item, i) {
                    var isEv = item.type === 'evidence';
                    return el('div', { key: item.id || i, className: 'border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow' },
                        el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
                            el('span', { style: { fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: isEv ? '#d1fae5' : '#ede9fe', color: isEv ? '#065f46' : '#5b21b6' } }, isEv ? '📌 Evidence' : '🪞 Reflection'),
                            el('span', { style: { fontSize: 10, color: '#94a3b8' } }, new Date(item.createdAt).toLocaleString('vi-VN'))
                        ),
                        el('pre', { style: { fontFamily: 'inherit', fontSize: 12, color: '#475569', whiteSpace: 'pre-wrap', background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', maxHeight: 150, overflowY: 'auto', lineHeight: 1.6 } }, item.content)
                    );
                }),
                el('div', { className: 'p-4 bg-blue-50 rounded-xl border border-blue-100 text-center mt-2' },
                    el('p', { className: 'text-xs text-blue-800 font-medium' },
                        '🧬 Tuyệt vời! Bạn đã tích lũy ',
                        el('strong', { style: { color: '#2563eb', fontSize: 15 } }, state.portfolio.length),
                        ' mục năng lực.'
                    )
                )
            )
    );
}

// ── MAIN APP ──────────────────────────────────────────────────
function App() {
    // Scroll chat to bottom after render
    setTimeout(function() {
        var el2 = document.getElementById('chat-end');
        if (el2) el2.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    return el('div', null,
        el(ProgressBar),
        el('div', { style: { marginTop: 16 } },
            state.currentStep === 'goal'         ? el(GoalStep) :
            state.currentStep === 'conversation' ? el(ConversationStep) :
            state.currentStep === 'evidence'     ? el(EvidenceStep) :
            state.currentStep === 'reflection'   ? el(ReflectionStep) :
            el(PortfolioStep)
        )
    );
}

// ── MOUNT ─────────────────────────────────────────────────────
var root = ReactDOM.createRoot(document.getElementById('cos-root'));
function renderApp() {
    root.render(el(App));
}
renderApp();
</script>
</body>
</html>`;
}