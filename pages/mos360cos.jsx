import React, { useState, useEffect, useRef, useMemo } from 'react';
import { create } from 'zustand';

// ============================================================
// 1. ZUSTAND STORE (Quản lý trạng thái cho cả 5 màn hình)
// ============================================================
const useCosStore = create((set, get) => ({
    goal: '',
    context: '',
    competencyId: '',
    conversations: [],
    evidence: [],
    reflections: [],
    portfolio: [],
    currentStep: 'goal', // goal | conversation | evidence | reflection | portfolio
    isProcessing: false,
    sessionId: null,

    setGoal: (goal) => set({ goal }),
    setContext: (context) => set({ context }),
    setCompetencyId: (competencyId) => set({ competencyId }),
    setCurrentStep: (step) => set({ currentStep: step }),

    addConversation: (msg) =>
        set((state) => ({
            conversations: [...state.conversations, { ...msg, id: Date.now() + Math.random() }]
        })),

    addEvidence: (evidence) =>
        set((state) => ({
            evidence: [...state.evidence, { ...evidence, id: Date.now() + Math.random(), validated: false }]
        })),

    addReflection: (reflection) =>
        set((state) => ({
            reflections: [...state.reflections, { ...reflection, id: Date.now() + Math.random() }]
        })),

    addToPortfolio: (item) =>
        set((state) => ({
            portfolio: [...state.portfolio, { ...item, id: Date.now() + Math.random(), createdAt: new Date().toISOString() }]
        })),

    setProcessing: (status) => set({ isProcessing: status }),
    setSessionId: (id) => set({ sessionId: id }),

    reset: () =>
        set({
            goal: '',
            context: '',
            competencyId: '',
            conversations: [],
            evidence: [],
            reflections: [],
            portfolio: [],
            currentStep: 'goal',
            isProcessing: false,
            sessionId: null
        }),

    getProgress: () => {
        const steps = ['goal', 'conversation', 'evidence', 'reflection', 'portfolio'];
        const current = get().currentStep;
        const index = steps.indexOf(current);
        return Math.round((index / (steps.length - 1)) * 100);
    }
}));

// ============================================================
// 2. CONVERSATION SIMULATOR ENGINE (Logic phản hồi của AI)
// ============================================================
const generateWelcomeMessage = (goal, context) => {
    let msg = `👋 Chào bạn! Mình sẽ đồng hành cùng bạn để đạt được mục tiêu: **"${goal}"**\n\n`;
    if (context) msg += `📌 Mình đã ghi nhận bối cảnh: "${context}"\n\n`;
    msg += `🤔 Hãy bắt đầu bằng cách cho mình biết:\n1️⃣ Bạn đã có thông tin/tài liệu gì liên quan?\n2️⃣ Thách thức cụ thể là gì?\n3️⃣ Kỳ vọng kết quả thế nào?\n\n💡 Hãy bắt đầu bằng câu hỏi hoặc chia sẻ suy nghĩ của bạn nhé!`;
    return msg;
};

const generateAiResponse = (userInput, store) => {
    const input = userInput.toLowerCase();
    if (input.includes('tóm tắt') || input.includes('summary') || input.includes('tổng kết')) {
        return `📝 **Tóm tắt hiện tại:**\n\n1. 🎯 Mục tiêu: **${store.goal}**\n2. 📌 Bối cảnh: ${store.context || 'Chưa có thông tin'}\n3. 💬 Số lượt trao đổi: ${store.conversations.filter(c => c.role === 'user').length}\n\n💡 Bạn muốn đi sâu vào khía cạnh nào nữa không?`;
    }
    if (input.includes('giúp') || input.includes('help')) {
        return `🤝 **Mình sẵn sàng hỗ trợ!** Bạn có thể làm rõ mục tiêu, cung cấp thêm bối cảnh hoặc đặt câu hỏi cụ thể để chúng ta cùng giải quyết nhé.`;
    }
    if (input.includes('evidence') || input.includes('bằng chứng') || input.includes('lưu lại')) {
        return `📌 **Tạo Evidence — Bằng chứng năng lực**\n\nDựa trên thảo luận, mình thấy bạn đã xác định tốt mục tiêu. Hãy bấm nút **"📌 Tạo Evidence"** phía dưới để hệ thống trích xuất dữ liệu lưu trữ nhé!`;
    }

    const responses = [
        `🤔 **Điều đó rất thú vị!** Hãy phân tích sâu hơn: Lý do hoặc bằng chứng nào hỗ trợ cho quan điểm này của bạn?`,
        `🧠 **Một góc nhìn khác:** Nếu thay đổi một cấu trúc hoặc yếu tố cố định, kết quả liệu có tối ưu hơn không?`,
        `💡 **Gợi ý khung tư duy:** Vấn đề cốt lõi là gì? Bạn có những lựa chọn nào? Lựa chọn nào sát nhất với mục tiêu?`,
        `🌟 **Bạn đang tư duy rất hệ thống!** Nếu phải giải thích ngắn gọn điều này cho một người mới, bạn sẽ tóm gọn nó như thế nào?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
};

// ============================================================
// 3. SUB-COMPONENTS (Giao diện cấu trúc từ Tailwind CSS)
// ============================================================

// --- Thanh Tiến Độ ---
const ProgressBar = () => {
    const progress = useCosStore(state => state.getProgress());
    const currentStep = useCosStore(state => state.currentStep);
    const steps = ['goal', 'conversation', 'evidence', 'reflection', 'portfolio'];
    const labels = ['🎯 Goal', '💬 Conversation', '📌 Evidence', '🪞 Reflection', '🌱 Portfolio'];

    return (
        <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs text-gray-500">
                <span>Tiến độ hành trình</span>
                <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="grid grid-cols-5 text-center text-[10px] sm:text-xs text-gray-400 mt-1">
                {steps.map((step, i) => (
                    <span key={step} className={`truncate px-1 ${currentStep === step ? 'text-blue-600 font-bold' : ''}`}>
                        {labels[i]}
                    </span>
                ))}
            </div>
        </div>
    );
};

// --- MÀN HÌNH 1: THIẾT LẬP MỤC TIÊU ---
const GoalStep = () => {
    const { goal, context, competencyId, setGoal, setContext, setCompetencyId, setProcessing, isProcessing } = useCosStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!goal.trim()) return;

        setProcessing(true);
        useCosStore.setState({
            sessionId: 'session_' + Date.now(),
            currentStep: 'conversation'
        });

        useCosStore.getState().addConversation({
            role: 'assistant',
            content: generateWelcomeMessage(goal, context)
        });
        setProcessing(false);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 animate-fade-in">
            <div className="text-center mb-6">
                <span className="text-4xl block mb-2">🎯</span>
                <h2 className="text-2xl font-bold text-gray-800">Mục tiêu của bạn hôm nay là gì?</h2>
                <p className="text-gray-500 text-sm mt-1">Hãy để lại thông tin, mình sẽ đồng hành cùng bạn từng bước.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium block mb-1">Mục tiêu <span className="text-red-500">*</span></label>
                    <textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Ví dụ: Tôi muốn học cách tối ưu hóa Prompt viết bài chuyên nghiệp..." className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]" required />
                </div>
                <div>
                    <label className="text-sm font-medium block mb-1">Bối cảnh <span className="text-gray-400 text-xs">(Không bắt buộc)</span></label>
                    <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Thông tin thêm về ngữ cảnh hiện tại..." className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors min-h-[80px]" />
                </div>
                <div>
                    <label className="text-sm font-medium block mb-1">Competency <span className="text-gray-400 text-xs">(Không bắt buộc)</span></label>
                    <select value={competencyId} onChange={(e) => setCompetencyId(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 bg-white transition-colors">
                        <option value="">Chọn Competency...</option>
                        <option value="AI-MND-001">AI-MND-001 — AI Mindset</option>
                        <option value="AI-THK-001">AI-THK-001 — AI Thinking</option>
                        <option value="AI-COM-001">AI-COM-001 — AI Communication</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full font-semibold shadow-md transition-all transform hover:-translate-y-0.5" disabled={isProcessing || !goal.trim()}>
                    {isProcessing ? '⏳ Đang khởi tạo...' : '🚀 Bắt đầu hành trình'}
                </button>
            </form>
        </div>
    );
};

// --- MÀN HÌNH 2: CUỘC HỘI THOẠI ---
const ConversationStep = () => {
    const { conversations, isProcessing, setCurrentStep, goal, context, sessionId } = useCosStore();
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversations]);

    const handleSend = async () => {
        if (!input.trim() || isProcessing) return;
        const store = useCosStore.getState();

        store.addConversation({ role: 'user', content: input });
        setInput('');
        store.setProcessing(true);

        setTimeout(() => {
            const reply = generateAiResponse(input, store);
            store.addConversation({ role: 'assistant', content: reply });
            store.setProcessing(false);
        }, 800);
    };

    const handleCreateEvidence = () => {
        if (conversations.length < 3) return;
        setIsGenerating(true);

        const store = useCosStore.getState();
        const userMessages = store.conversations.filter(c => c.role === 'user');
        const evidenceContent = `📋 **Tóm tắt năng lực thực chiến**\n\n🎯 Mục tiêu: ${store.goal}\n📌 Bối cảnh: ${store.context || 'Không có'}\n\n💬 Các luận điểm đã trao đổi:\n${userMessages.map((c, i) => `${i + 1}. ${c.content}`).join('\n')}\n\n⏱️ Thời gian ghi nhận: ${new Date().toLocaleString('vi-VN')}`;

        store.addEvidence({ type: 'summary', content: evidenceContent, sessionId });
        store.addToPortfolio({ type: 'evidence', title: `Evidence ${new Date().toLocaleDateString('vi-VN')}`, content: evidenceContent });

        setTimeout(() => {
            setIsGenerating(false);
            setCurrentStep('evidence');
        }, 800);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-5 border border-gray-100 flex flex-col h-[550px]">
            <div className="flex justify-between items-center pb-3 border-b mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <span className="font-bold text-gray-700 text-sm sm:text-base">AI Competency Coach</span>
                </div>
                <button onClick={() => setCurrentStep('evidence')} className="text-xs text-blue-600 hover:underline">📌 Xem Evidence</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-xl mb-4">
                {conversations.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-2xl max-w-[85%] text-sm whitespace-pre-wrap shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="space-y-3">
                <div className="flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Nhập câu hỏi hoặc chia sẻ tiến độ..." className="flex-1 border-2 border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500" disabled={isProcessing} />
                    <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl text-sm font-semibold transition-colors" disabled={isProcessing || !input.trim()}>
                        {isProcessing ? '⏳' : 'Gửi'}
                    </button>
                </div>
                <div className="flex justify-between gap-2 flex-wrap pt-1">
                    <button onClick={handleCreateEvidence} className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-xs font-medium transition-colors border" disabled={conversations.length < 3 || isGenerating}>
                        {isGenerating ? '⏳ Đang kết xuất...' : '📌 Tạo Evidence'}
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => setCurrentStep('reflection')} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1">🪞 Suy ngẫm</button>
                        <button onClick={() => setCurrentStep('portfolio')} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1">🌱 Portfolio</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MÀN HÌNH 3: BẰNG CHỨNG NĂNG LỰC ---
const EvidenceStep = () => {
    const { evidence, setCurrentStep } = useCosStore();

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="text-lg">📌</span> Evidence — Bằng chứng năng lực</h3>
                <button onClick={() => setCurrentStep('conversation')} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-600 transition-colors">💬 Trở lại chat</button>
            </div>

            {evidence.length === 0 ? (
                <div className="text-center py-12 text-gray-400 space-y-3">
                    <span className="text-4xl block">📭</span>
                    <p className="text-sm">Chưa ghi nhận bằng chứng nào từ cuộc hội thoại.</p>
                    <button onClick={() => setCurrentStep('conversation')} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold">Tương tác thêm để tạo</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {evidence.map((ev, idx) => (
                        <div key={idx} className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 relative hover:border-blue-400 transition-colors">
                            <span className="absolute top-3 right-3 text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">Tóm tắt</span>
                            <pre className="font-sans text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{ev.content}</pre>
                        </div>
                    ))}
                    <button onClick={() => setCurrentStep('reflection')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm">
                        🪞 Tiến đến bước Reflection (Suy ngẫm)
                    </button>
                </div>
            )}
        </div>
    );
};

// --- MÀN HÌNH 4: REFLECTION (SUY NGẪM) ---
const ReflectionStep = () => {
    const { setCurrentStep, addReflection, addToPortfolio, sessionId, goal } = useCosStore();
    const [answers, setAnswers] = useState({ whatWorked: '', whatFailed: '', whatLearned: '', nextAction: '' });

    const handleSubmit = () => {
        const reflectionContent = `🪞 **Reflection Journal**\n📅 Ngày thực hiện: ${new Date().toLocaleDateString('vi-VN')}\n🎯 Mục tiêu: ${goal}\n\n✅ Điều hiệu quả:\n${answers.whatWorked || 'N/A'}\n\n🔧 Điều cần cải thiện:\n${answers.whatFailed || 'N/A'}\n\n📚 Bài học rút ra:\n${answers.whatLearned || 'N/A'}\n\n🚀 Hành động tiếp theo:\n${answers.nextAction || 'N/A'}`;

        addReflection({ ...answers, sessionId });
        addToPortfolio({ type: 'reflection', title: `Reflection ${new Date().toLocaleDateString('vi-VN')}`, content: reflectionContent });

        setCurrentStep('portfolio');
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="text-center mb-6">
                <span className="text-4xl block mb-1">🪞</span>
                <h3 className="text-xl font-bold text-gray-800">Reflection — Bạn đã học được gì?</h3>
                <p className="text-xs text-gray-500 mt-1">Viết ra suy ngẫm giúp biến trải nghiệm thành năng lực thực tế.</p>
            </div>

            <div className="space-y-4">
                {[
                    { label: '✅ Điều gì đã hoạt động hiệu quả?', key: 'whatWorked', holder: 'Những gì bạn đã làm tốt hoặc giải quyết được...' },
                    { label: '🔧 Điều gì chưa thực sự hiệu quả?', key: 'whatFailed', holder: 'Khó khăn hoặc điểm cần cải thiện tối ưu thêm...' },
                    { label: '📚 Bạn rút ra được bài học cốt lõi nào?', key: 'whatLearned', holder: 'Kinh nghiệm hoặc kiến thức mới đúc kết...' },
                    { label: '🚀 Hành động cụ thể tiếp theo là gì?', key: 'nextAction', holder: 'Ứng dụng điều vừa học vào công việc thực tế ra sao...' }
                ].map((item) => (
                    <div key={item.key}>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">{item.label}</label>
                        <textarea value={answers[item.key]} onChange={(e) => setAnswers({ ...answers, [item.key]: e.target.value })} placeholder={item.holder} className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500" rows={2} />
                    </div>
                ))}

                <div className="pt-2 space-y-2">
                    <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm">
                        ✅ Hoàn thành và lưu vào Portfolio
                    </button>
                    <button onClick={() => setCurrentStep('portfolio')} className="w-full text-xs text-gray-400 hover:text-gray-600 text-center block py-1">Xem trực tiếp Portfolio</button>
                </div>
            </div>
        </div>
    );
};

// --- MÀN HÌNH 5: PORTFOLIO (HỒ SƠ NĂNG LỰC) ---
const PortfolioStep = () => {
    const { portfolio, reset } = useCosStore();

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="text-lg">🌱</span> Portfolio — Hành trình của bạn</h3>
                <button onClick={() => reset()} className="text-xs text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all font-medium">🔄 Bắt đầu lượt mới</button>
            </div>

            {portfolio.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <span className="text-4xl block mb-2">🍃</span>
                    <p className="text-sm">Portfolio trống. Hãy hoàn thành quy trình để thu hoạch thành quả!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-3">
                        {portfolio.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-xl p-4 shadow-xs bg-white hover:shadow-sm transition-shadow">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === 'evidence' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                                        {item.type === 'evidence' ? '📌 Evidence' : '🪞 Reflection'}
                                    </span>
                                    <span className="text-[10px] text-gray-400">{new Date(item.createdAt).toLocaleString('vi-VN')}</span>
                                </div>
                                <div className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed bg-gray-50 p-2.5 rounded-lg border max-h-[150px] overflow-y-auto font-mono">
                                    {item.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                        <p className="text-xs text-blue-800 font-medium">
                            🧬 Tuyệt vời! Bạn đã tích lũy thành công <span className="font-bold text-sm text-blue-600">{portfolio.length}</span> mục năng lực vào hệ thống dữ liệu cá nhân.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// 4. MAIN CONTAINER ENGINE (Điều phối hiển thị 5 màn hình)
// ============================================================
export default function Mos360CosApp() {
    const currentStep = useCosStore(state => state.currentStep);

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 font-sans antialiased">
            <div className="max-w-5xl mx-auto">
                {/* Header ứng dụng */}
                <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🧬</span>
                        <h1 className="text-lg font-black text-gray-800 tracking-tight">
                            MOS360 <span className="text-blue-600">COS</span>
                        </h1>
                        <span className="bg-gray-200 text-gray-600 text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase">v0.1-React</span>
                    </div>
                </header>

                {/* Thanh tiến trình chung */}
                <ProgressBar />

                {/* Cửa sổ điều phối Màn hình (Step Routing) */}
                <main className="mt-4">
                    {currentStep === 'goal' && <GoalStep />}
                    {currentStep === 'conversation' && <ConversationStep />}
                    {currentStep === 'evidence' && <EvidenceStep />}
                    {currentStep === 'reflection' && <ReflectionStep />}
                    {currentStep === 'portfolio' && <PortfolioStep />}
                </main>
            </div>
        </div>
    );
}