// pages/library.js — Thư Viện MOS360 + Quản lý Short URL (KV: MOS360_LINKS_KV)
// Key format: slug (vd: "hdcaimos360") → JSON { url, title, cat, clicks, created, updated }

export function getLibraryUI() {
    return `
<div style="max-width:1100px;margin:30px auto;padding:0 16px;">

    <!-- ══ HEADER ══ -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
        <div>
            <h1 style="font-size:1.5rem;font-weight:800;color:var(--text);">📚 Thư Viện MOS360</h1>
            <p style="color:var(--muted);font-size:0.83rem;margin-top:3px;">Kho link tài nguyên — video, phần mềm, tiện ích, đăng ký. Short URL qua <strong>go.mos360.vn</strong></p>
        </div>
        <div id="libAdminBar" style="display:none;gap:8px;flex-wrap:wrap;align-items:center;">
            <button onclick="showAddModal()" style="padding:9px 18px;background:linear-gradient(135deg,#FF5722,#ff784e);border:none;color:#fff;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">➕ Thêm link</button>
            <label style="padding:9px 18px;background:#F0F4FA;border:1px solid var(--border);color:#0052CC;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">
                📥 Import JSON
                <input type="file" accept=".json" onchange="importJSON(event)" style="display:none;">
            </label>
            <button onclick="exportJSON()" style="padding:9px 18px;background:#F0F4FA;border:1px solid var(--border);color:var(--muted);border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">📤 Export JSON</button>
            <button onclick="loadLinks()" style="padding:9px 18px;background:#F0F4FA;border:1px solid var(--border);color:var(--muted);border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">🔄 Làm mới</button>
        </div>
    </div>

    <!-- ══ BỘ LỌC ══ -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;align-items:center;">
        <input id="libSearch" oninput="filterLinks()" placeholder="🔍 Tìm theo tên, key, URL..." style="flex:1;min-width:200px;padding:9px 14px;border:1.5px solid var(--border);border-radius:10px;font-size:0.85rem;font-family:inherit;outline:none;">
        <select id="libCatFilter" onchange="filterLinks()" style="padding:9px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.85rem;background:#fff;font-family:inherit;cursor:pointer;">
            <option value="">Tất cả danh mục</option>
            <option value="admin">⚙️ Quản trị</option>
            <option value="video">🎬 Video</option>
            <option value="software">💿 Phần mềm</option>
            <option value="tool">🔧 Tiện ích</option>
            <option value="form">📝 Đăng ký</option>
            <option value="doc">📄 Tài liệu</option>
            <option value="other">📦 Khác</option>
        </select>
        <select id="libSort" onchange="filterLinks()" style="padding:9px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.85rem;background:#fff;font-family:inherit;cursor:pointer;">
            <option value="updated">Mới cập nhật</option>
            <option value="clicks">Nhiều click nhất</option>
            <option value="name">Tên A→Z</option>
        </select>
        <span id="libCount" style="font-size:0.78rem;color:var(--muted);white-space:nowrap;padding:6px 12px;background:#F0F4FA;border-radius:8px;font-weight:700;">0 link</span>
    </div>

    <!-- ══ STATS BAR ══ -->
    <div id="libStats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;"></div>

    <!-- ══ TABLE ══ -->
    <div style="background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(15,23,42,0.05);">
        <div id="libLoading" style="padding:48px;text-align:center;color:var(--muted);">⏳ Đang tải dữ liệu...</div>
        <div id="libEmpty" style="display:none;padding:48px;text-align:center;color:var(--muted);">
            <div style="font-size:2.5rem;margin-bottom:12px;">📭</div>
            <div style="font-weight:700;">Chưa có link nào</div>
            <div style="font-size:0.82rem;margin-top:6px;">Bấm <strong>Thêm link</strong> để bắt đầu xây dựng thư viện</div>
        </div>
        <table id="libTable" style="display:none;width:100%;border-collapse:collapse;">
            <thead>
                <tr style="background:#F8FAFD;border-bottom:1px solid var(--border);">
                    <th style="padding:11px 16px;text-align:left;font-size:0.75rem;font-weight:800;color:var(--muted);letter-spacing:.4px;white-space:nowrap;">SHORT KEY</th>
                    <th style="padding:11px 16px;text-align:left;font-size:0.75rem;font-weight:800;color:var(--muted);letter-spacing:.4px;">TÊN / URL ĐẦY ĐỦ</th>
                    <th style="padding:11px 16px;text-align:left;font-size:0.75rem;font-weight:800;color:var(--muted);letter-spacing:.4px;white-space:nowrap;">DANH MỤC</th>
                    <th style="padding:11px 8px;text-align:center;font-size:0.75rem;font-weight:800;color:var(--muted);letter-spacing:.4px;">CLICKS</th>
                    <th style="padding:11px 16px;text-align:left;font-size:0.75rem;font-weight:800;color:var(--muted);letter-spacing:.4px;white-space:nowrap;">CẬP NHẬT</th>
                    <th id="libAdminCol" style="display:none;padding:11px 16px;text-align:center;font-size:0.75rem;font-weight:800;color:var(--muted);letter-spacing:.4px;">THAO TÁC</th>
                </tr>
            </thead>
            <tbody id="libBody"></tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div id="libPager" style="display:flex;justify-content:center;gap:8px;margin-top:16px;flex-wrap:wrap;"></div>

</div>

<!-- ══ MODAL THÊM / SỬA ══ -->
<div id="libModal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9000;align-items:center;justify-content:center;padding:16px;">
    <div style="background:#fff;border-radius:20px;padding:28px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(15,23,42,0.2);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3 id="modalTitle" style="font-size:1.1rem;font-weight:800;">➕ Thêm link mới</h3>
            <button onclick="closeModal()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--muted);line-height:1;">×</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
            <div>
                <label style="font-size:0.78rem;font-weight:700;color:var(--muted);display:block;margin-bottom:5px;">SHORT KEY <span style="color:#ef4444">*</span> <span style="font-weight:400;color:#94a3b8;">— dùng cho go.mos360.vn/<em>key</em></span></label>
                <div style="display:flex;align-items:center;border:1.5px solid var(--border);border-radius:10px;overflow:hidden;background:#F8FAFD;">
                    <span style="padding:10px 12px;font-size:0.82rem;color:var(--muted);white-space:nowrap;border-right:1px solid var(--border);background:#F0F4FA;">go.mos360.vn/</span>
                    <input id="mKey" type="text" placeholder="hdcaimos360" style="flex:1;padding:10px 12px;border:none;background:transparent;font-size:0.9rem;font-family:inherit;outline:none;" oninput="this.value=this.value.toLowerCase().replace(/[^a-z0-9_-]/g,'')">
                </div>
                <div id="mKeyHint" style="font-size:0.73rem;color:#94a3b8;margin-top:4px;">Chỉ chữ thường, số, gạch ngang. Để trống sẽ tự tạo.</div>
            </div>

            <div>
                <label style="font-size:0.78rem;font-weight:700;color:var(--muted);display:block;margin-bottom:5px;">TIÊU ĐỀ / TÊN LINK <span style="color:#ef4444">*</span></label>
                <input id="mTitle" type="text" placeholder="VD: Hướng dẫn cài đặt MOS360" style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.9rem;font-family:inherit;outline:none;">
            </div>

            <div>
                <label style="font-size:0.78rem;font-weight:700;color:var(--muted);display:block;margin-bottom:5px;">URL ĐẦY ĐỦ <span style="color:#ef4444">*</span></label>
                <textarea id="mUrl" rows="2" placeholder="https://..." style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.85rem;font-family:inherit;outline:none;resize:vertical;"></textarea>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div>
                    <label style="font-size:0.78rem;font-weight:700;color:var(--muted);display:block;margin-bottom:5px;">DANH MỤC</label>
                    <select id="mCat" style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.85rem;background:#fff;font-family:inherit;cursor:pointer;">
                        <option value="video">🎬 Video</option>
                        <option value="software">💿 Phần mềm</option>
                        <option value="tool">🔧 Tiện ích</option>
                        <option value="form">📝 Đăng ký</option>
                        <option value="doc">📄 Tài liệu</option>
                        <option value="other">📦 Khác</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:0.78rem;font-weight:700;color:var(--muted);display:block;margin-bottom:5px;">GHI CHÚ</label>
                    <input id="mNote" type="text" placeholder="Tuỳ chọn..." style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.85rem;font-family:inherit;outline:none;">
                </div>
            </div>
        </div>

        <div id="mError" style="display:none;margin-top:14px;padding:10px 14px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#b91c1c;font-size:0.82rem;font-weight:700;"></div>

        <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end;">
            <button onclick="closeModal()" style="padding:10px 22px;border:1.5px solid var(--border);background:#fff;border-radius:10px;font-weight:700;cursor:pointer;font-size:0.85rem;">Huỷ</button>
            <button id="mSaveBtn" onclick="saveLink()" style="padding:10px 28px;background:linear-gradient(135deg,#FF5722,#ff784e);border:none;color:#fff;border-radius:10px;font-weight:800;cursor:pointer;font-size:0.85rem;">💾 Lưu</button>
        </div>
    </div>
</div>

<!-- ══ MODAL XÁC NHẬN XOÁ ══ -->
<div id="delModal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9100;align-items:center;justify-content:center;padding:16px;">
    <div style="background:#fff;border-radius:16px;padding:28px;max-width:420px;width:100%;box-shadow:0 16px 48px rgba(15,23,42,0.18);">
        <h3 style="font-size:1rem;font-weight:800;color:#b91c1c;margin-bottom:12px;">🗑️ Xoá link này?</h3>
        <p id="delKeyLabel" style="font-size:0.88rem;color:var(--text);margin-bottom:20px;"></p>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button onclick="document.getElementById('delModal').style.display='none'" style="padding:9px 20px;border:1.5px solid var(--border);background:#fff;border-radius:10px;font-weight:700;cursor:pointer;">Huỷ</button>
            <button id="delConfirmBtn" style="padding:9px 20px;background:#ef4444;border:none;color:#fff;border-radius:10px;font-weight:800;cursor:pointer;">Xoá</button>
        </div>
    </div>
</div>

<!-- ══ TOAST ══ -->
<div id="libToast" style="display:none;position:fixed;bottom:28px;right:28px;background:#0f172a;color:#fff;padding:13px 20px;border-radius:12px;font-size:0.85rem;font-weight:700;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.25);max-width:320px;"></div>

<script>
(function() {
    // ── CONFIG ──────────────────────────────────────────────────
    var IS_ADMIN = localStorage.getItem('mos360_admin_session') === 'active';
    // Ẩn danh mục Quản trị với user thường
    if (!IS_ADMIN) {
        var adminOpt = document.querySelector('#libCatFilter option[value="admin"]');
        if (adminOpt) adminOpt.style.display = 'none';
    }
    var CAT_LABELS = { video:'🎬 Video', software:'💿 Phần mềm', tool:'🔧 Tiện ích', form:'📝 Đăng ký', doc:'📄 Tài liệu', other:'📦 Khác', admin:'⚙️ Quản trị' };
    var CAT_COLORS = { video:'#3b82f6', software:'#8b5cf6', tool:'#f59e0b', form:'#10b981', doc:'#0052CC', other:'#64748b', admin:'#B8860B' };
    var allLinks = [];
    var editKey = null;
    var PAGE_SIZE = 20;
    var currentPage = 1;

    // ── INIT ─────────────────────────────────────────────────────
    window.loadLinks = loadLinks;
    window.filterLinks = filterLinks;
    window.showAddModal = showAddModal;
    window.closeModal = closeModal;
    window.saveLink = saveLink;
    window.editLink = editLink;
    window.deleteLink = deleteLink;

    if (IS_ADMIN) {
        document.getElementById('libAdminBar').style.display = 'flex';
        document.getElementById('libAdminCol').style.display = 'table-cell';
    }

    loadLinks();

    // ── LOAD FROM KV API ─────────────────────────────────────────
    async function loadLinks() {
        showLoading(true);
        try {
            var res = await fetch('/api/links/list');
            var data = await res.json();
            allLinks = data.links || [];
            renderStats();
            filterLinks();
        } catch(e) {
            showLoading(false);
            toast('❌ Không thể tải dữ liệu', 'error');
        }
    }

    function renderStats() {
        var total = allLinks.length;
        var totalClicks = allLinks.reduce(function(s,l){ return s + (l.clicks||0); }, 0);
        var cats = {};
        allLinks.forEach(function(l){ cats[l.cat] = (cats[l.cat]||0)+1; });
        var topCat = Object.keys(cats).sort(function(a,b){ return cats[b]-cats[a]; })[0] || '-';

        document.getElementById('libStats').innerHTML = [
            stat('📚', 'Tổng link', total),
            stat('👆', 'Tổng click', totalClicks.toLocaleString('vi-VN')),
            stat('📂', 'Danh mục', Object.keys(cats).length),
            stat('🏆', 'Phổ biến nhất', CAT_LABELS[topCat] || topCat)
        ].join('');
    }

    function stat(icon, label, value) {
        return '<div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px 16px;">'
            + '<div style="font-size:1.1rem;margin-bottom:4px;">' + icon + '</div>'
            + '<div style="font-size:1.2rem;font-weight:800;color:var(--text);">' + value + '</div>'
            + '<div style="font-size:0.73rem;color:var(--muted);font-weight:600;margin-top:2px;">' + label + '</div>'
            + '</div>';
    }

    // ── FILTER + RENDER ───────────────────────────────────────────
    function filterLinks() {
        var q = (document.getElementById('libSearch').value || '').toLowerCase();
        var cat = document.getElementById('libCatFilter').value;
        var sort = document.getElementById('libSort').value;

        var filtered = allLinks.filter(function(l) {
            var matchQ = !q || (l.key||'').toLowerCase().includes(q)
                    || (l.title||'').toLowerCase().includes(q)
                    || (l.url||'').toLowerCase().includes(q);
            var matchCat = !cat || l.cat === cat;
            // Ẩn danh mục "admin" với user thường
            var matchAdmin = IS_ADMIN || l.cat !== 'admin';
            return matchQ && matchCat && matchAdmin;
        });

        filtered.sort(function(a,b) {
            if (sort === 'clicks') return (b.clicks||0) - (a.clicks||0);
            if (sort === 'name') return (a.title||'').localeCompare(b.title||'', 'vi');
            return (b.updated||b.created||0) - (a.updated||a.created||0);
        });

        document.getElementById('libCount').textContent = filtered.length + ' link';
        currentPage = 1;
        renderPage(filtered);
        renderPager(filtered);
    }

    function renderPage(filtered) {
        var start = (currentPage - 1) * PAGE_SIZE;
        var slice = filtered.slice(start, start + PAGE_SIZE);
        var tbody = document.getElementById('libBody');
        showLoading(false);

        if (!filtered.length) {
            document.getElementById('libEmpty').style.display = 'block';
            document.getElementById('libTable').style.display = 'none';
            return;
        }
        document.getElementById('libEmpty').style.display = 'none';
        document.getElementById('libTable').style.display = 'table';

        tbody.innerHTML = slice.map(function(l) {
            var short = 'https://go.mos360.vn/' + l.key;
            var catColor = CAT_COLORS[l.cat] || '#64748b';
            var catLabel = CAT_LABELS[l.cat] || l.cat;
            var updated = l.updated ? new Date(l.updated).toLocaleDateString('vi-VN') : (l.created ? new Date(l.created).toLocaleDateString('vi-VN') : '—');

            var adminActions = IS_ADMIN
                ? '<td style="padding:10px 12px;text-align:center;white-space:nowrap;">'
                  + '<button onclick="editLink(\'' + esc(l.key) + '\')" style="padding:5px 12px;border:1px solid #dbeafe;background:#eff6ff;color:#1d4ed8;border-radius:7px;cursor:pointer;font-weight:700;font-size:0.75rem;margin-right:5px;">✏️ Sửa</button>'
                  + '<button onclick="deleteLink(\'' + esc(l.key) + '\',\'' + esc(l.title||l.key) + '\')" style="padding:5px 12px;border:1px solid #fee2e2;background:#fef2f2;color:#dc2626;border-radius:7px;cursor:pointer;font-weight:700;font-size:0.75rem;">🗑️</button>'
                  + '</td>'
                : '';

            return '<tr style="border-bottom:1px solid #f1f5f9;transition:background .15s;" onmouseover="this.style.background=\'#F8FAFD\'" onmouseout="this.style.background=\'\'"> '
                + '<td style="padding:12px 16px;font-family:monospace;font-size:0.82rem;white-space:nowrap;">'
                +   '<a href="' + short + '" target="_blank" style="color:#FF5722;font-weight:800;text-decoration:none;">' + l.key + '</a>'
                +   '<button onclick="copyText(\'' + short + '\')" title="Copy link" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:0.75rem;margin-left:4px;padding:2px;">⎘</button>'
                + '</td>'
                + '<td style="padding:12px 16px;max-width:380px;">'
                +   '<div style="font-weight:700;font-size:0.88rem;color:var(--text);margin-bottom:2px;">' + esc(l.title||'(chưa đặt tên)') + '</div>'
                +   '<div style="font-size:0.75rem;color:#94a3b8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:340px;">' + esc(l.url) + '</div>'
                +   (l.note ? '<div style="font-size:0.72rem;color:#a78bfa;margin-top:2px;">📝 ' + esc(l.note) + '</div>' : '')
                + '</td>'
                + '<td style="padding:12px 16px;">'
                +   '<span style="font-size:0.73rem;font-weight:800;padding:3px 10px;border-radius:20px;background:' + catColor + '20;color:' + catColor + ';">' + catLabel + '</span>'
                + '</td>'
                + '<td style="padding:12px 8px;text-align:center;font-size:0.9rem;font-weight:800;color:' + (l.clicks > 99 ? '#FF5722' : 'var(--text)') + ';">'
                +   (l.clicks || 0)
                + '</td>'
                + '<td style="padding:12px 16px;font-size:0.78rem;color:var(--muted);white-space:nowrap;">' + updated + '</td>'
                + adminActions
                + '</tr>';
        }).join('');
    }

    function renderPager(filtered) {
        var pages = Math.ceil(filtered.length / PAGE_SIZE);
        var pager = document.getElementById('libPager');
        if (pages <= 1) { pager.innerHTML = ''; return; }
        var html = '';
        for (var i = 1; i <= pages; i++) {
            var active = i === currentPage;
            html += '<button onclick="goPage(' + i + ',window._libFiltered)" style="padding:7px 14px;border:1.5px solid ' + (active ? '#FF5722' : 'var(--border)') + ';background:' + (active ? '#FF5722' : '#fff') + ';color:' + (active ? '#fff' : 'var(--muted)') + ';border-radius:8px;font-weight:700;cursor:pointer;font-size:0.82rem;">' + i + '</button>';
        }
        pager.innerHTML = html;
        window._libFiltered = filtered;
    }

    window.goPage = function(p, filtered) {
        currentPage = p;
        renderPage(filtered || allLinks);
        renderPager(filtered || allLinks);
    };

    // ── MODAL ADD/EDIT ─────────────────────────────────────────────
    function showAddModal() {
        editKey = null;
        document.getElementById('modalTitle').textContent = '➕ Thêm link mới';
        document.getElementById('mKey').value = '';
        document.getElementById('mKey').readOnly = false;
        document.getElementById('mTitle').value = '';
        document.getElementById('mUrl').value = '';
        document.getElementById('mCat').value = 'other';
        document.getElementById('mNote').value = '';
        document.getElementById('mError').style.display = 'none';
        document.getElementById('mKeyHint').textContent = 'Chỉ chữ thường, số, gạch ngang. Để trống sẽ tự tạo.';
        document.getElementById('libModal').style.display = 'flex';
    }

    window.editLink = function(key) {
        var link = allLinks.find(function(l){ return l.key === key; });
        if (!link) return;
        editKey = key;
        document.getElementById('modalTitle').textContent = '✏️ Sửa link: ' + key;
        document.getElementById('mKey').value = key;
        document.getElementById('mKey').readOnly = true;
        document.getElementById('mTitle').value = link.title || '';
        document.getElementById('mUrl').value = link.url || '';
        document.getElementById('mCat').value = link.cat || 'other';
        document.getElementById('mNote').value = link.note || '';
        document.getElementById('mError').style.display = 'none';
        document.getElementById('mKeyHint').textContent = 'Key không thể đổi sau khi tạo.';
        document.getElementById('libModal').style.display = 'flex';
    };

    window.closeModal = function() {
        document.getElementById('libModal').style.display = 'none';
        editKey = null;
    };

    window.saveLink = async function() {
        var key   = document.getElementById('mKey').value.trim();
        var title = document.getElementById('mTitle').value.trim();
        var url   = document.getElementById('mUrl').value.trim();
        var cat   = document.getElementById('mCat').value;
        var note  = document.getElementById('mNote').value.trim();

        if (!title) return showError('Vui lòng nhập tên link.');
        if (!url || !url.startsWith('http')) return showError('URL phải bắt đầu bằng http:// hoặc https://');

        var btn = document.getElementById('mSaveBtn');
        btn.textContent = '⏳ Đang lưu...'; btn.disabled = true;

        try {
            var res = await fetch('/api/links/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': localStorage.getItem('mos360_admin_session') === 'active' ? 'mos360_admin' : '' },
                body: JSON.stringify({ key: key||null, title, url, cat, note, editKey })
            });
            var data = await res.json();
            if (!data.ok) { showError(data.msg || 'Lỗi không xác định'); }
            else {
                closeModal();
                toast('✅ Đã lưu link: go.mos360.vn/' + data.key);
                await loadLinks();
            }
        } catch(e) {
            showError('Lỗi kết nối máy chủ.');
        } finally {
            btn.textContent = '💾 Lưu'; btn.disabled = false;
        }
    };

    // ── DELETE ─────────────────────────────────────────────────────
    window.deleteLink = function(key, title) {
        document.getElementById('delKeyLabel').textContent = 'Sẽ xoá: go.mos360.vn/' + key + ' — "' + title + '"';
        document.getElementById('delModal').style.display = 'flex';
        document.getElementById('delConfirmBtn').onclick = async function() {
            document.getElementById('delModal').style.display = 'none';
            try {
                var res = await fetch('/api/links/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': localStorage.getItem('mos360_admin_session') === 'active' ? 'mos360_admin' : '' },
                    body: JSON.stringify({ key })
                });
                var data = await res.json();
                if (data.ok) { toast('🗑️ Đã xoá: ' + key); await loadLinks(); }
                else toast('❌ ' + (data.msg||'Lỗi xoá'), 'error');
            } catch(e) { toast('❌ Lỗi kết nối', 'error'); }
        };
    };

    // ── HELPERS ───────────────────────────────────────────────────
    function showLoading(on) {
        document.getElementById('libLoading').style.display = on ? 'block' : 'none';
        if (on) {
            document.getElementById('libTable').style.display = 'none';
            document.getElementById('libEmpty').style.display = 'none';
        }
    }

    function showError(msg) {
        var el = document.getElementById('mError');
        el.textContent = '⚠️ ' + msg;
        el.style.display = 'block';
    }

    function toast(msg, type) {
        var el = document.getElementById('libToast');
        el.textContent = msg;
        el.style.background = type === 'error' ? '#b91c1c' : '#0f172a';
        el.style.display = 'block';
        clearTimeout(el._t);
        el._t = setTimeout(function(){ el.style.display = 'none'; }, 3000);
    }

    window.copyText = function(text) {
        navigator.clipboard.writeText(text).then(function(){ toast('⎘ Đã copy: ' + text); });
    };

    function esc(s) {
        return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }

    // ── IMPORT JSON ──────────────────────────────────────────────
    window.importJSON = async function(event) {
        var file = event.target.files[0];
        if (!file) return;
        try {
            var text = await file.text();
            var data = JSON.parse(text);
            var links = Array.isArray(data) ? data : (data.links || []);
            if (!links.length) { toast('\u26a0\ufe0f File kh\u00f4ng c\u00f3 link n\u00e0o', 'error'); return; }

            var ok = 0, fail = 0;
            for (var i = 0; i < links.length; i++) {
                var l = links[i];
                if (!l.key || !l.url || !l.title) { fail++; continue; }
                try {
                    var res = await fetch('/api/links/save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Admin-Auth': 'mos360_admin'
                        },
                        body: JSON.stringify({
                            key: l.key,
                            title: l.title,
                            url: l.url,
                            cat: l.cat || 'other',
                            note: l.note || ''
                        })
                    });
                    var result = await res.json();
                    if (result.ok) ok++; else fail++;
                } catch(e) { fail++; }
            }
            var msg = ok + ' th\u00e0nh c\u00f4ng' + (fail ? ', ' + fail + ' l\u1ed7i' : '');
            toast('\u2705 Import xong: ' + msg);
            await loadLinks();
        } catch(e) {
            toast('\u274c File JSON kh\u00f4ng h\u1ee3p l\u1ec7', 'error');
        }
        event.target.value = '';
    };

    // ── EXPORT JSON ──────────────────────────────────────────────
        window.exportJSON = function() {
            if (!allLinks.length) { toast('Chua co link nao de export', 'error'); return; }
            var blob = new Blob([JSON.stringify({ links: allLinks }, null, 2)], { type: 'application/json' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            var dateStr = new Date().toISOString().slice(0, 10);
            a.download = 'mos360-links-' + dateStr + '.json';
            a.click();
            toast('Da export ' + allLinks.length + ' link');
        };
    })();
    </script>
`;
}