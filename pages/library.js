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
            <button onclick="clearAllLinks()" style="padding:9px 18px;background:#fef2f2;border:1px solid #fecaca;color:#dc2626;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">🗑️ Xóa tất cả</button>
            <button id="btnDeleteSelected" onclick="deleteSelected()" style="display:none;padding:9px 18px;background:#7f1d1d;border:1px solid #ef4444;color:#fff;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">🗑️ Xóa đã chọn (<span id="selectedCount">0</span>)</button>
        </div>
    </div>

    <!-- ══ VIDEO GIẢI ĐỀ MOS (yêu cầu đăng nhập) ══ -->
    <div style="background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px 22px;margin-bottom:26px;box-shadow:0 2px 8px rgba(15,23,42,0.05);">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
            <div>
                <h2 style="font-size:1.15rem;font-weight:800;color:var(--text);margin:0;">🎬 Video Giải Đề Test (MOS 2019 / MOS 365)</h2>
                <p style="color:var(--muted);font-size:0.8rem;margin-top:3px;">Học viên đã được cấp mật khẩu MOS đăng nhập để xem video giải đề chi tiết. Phiên đăng nhập có hiệu lực 12 tiếng — sau đó cần đăng nhập lại để tiếp tục xem.</p>
            </div>
            <div id="vlAuthBar" style="font-size:0.82rem;"></div>
        </div>

        <div id="vlLoginBox" style="display:none;background:#F8FAFD;border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;">
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;">
                <div style="flex:1;min-width:180px;">
                    <label style="font-size:0.75rem;font-weight:700;color:var(--muted);display:block;margin-bottom:5px;">Họ và tên</label>
                    <input id="vlName" type="text" autocomplete="username" placeholder="Nguyễn Văn A" style="width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;font-size:0.85rem;font-family:inherit;outline:none;box-sizing:border-box;">
                </div>
                <div style="flex:1;min-width:180px;">
                    <label style="font-size:0.75rem;font-weight:700;color:var(--muted);display:block;margin-bottom:5px;">Mật khẩu</label>
                    <input id="vlPass" type="password" autocomplete="current-password" placeholder="••••••••" style="width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;font-size:0.85rem;font-family:inherit;outline:none;box-sizing:border-box;">
                </div>
                <button id="vlLoginBtn" style="padding:10px 22px;background:linear-gradient(135deg,#0052CC,#0066ff);border:none;color:#fff;border-radius:9px;font-weight:700;cursor:pointer;font-size:0.85rem;white-space:nowrap;">Đăng nhập</button>
            </div>
            <div id="vlLoginErr" style="display:none;margin-top:10px;padding:9px 12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#b91c1c;font-size:0.8rem;font-weight:600;"></div>
        </div>

        <div id="vlTabs" style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;"></div>
        <div id="vlGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;"></div>
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
                    <th id="libCheckCol" style="display:none;padding:11px 12px;width:36px;"><input type="checkbox" id="checkAll" onchange="toggleCheckAll(this)" style="cursor:pointer;width:15px;height:15px;"></th>
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

<!-- ══ MODAL XÁC NHẬN XÓA TẤT CẢ ══ -->
<div id="clearModal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9200;align-items:center;justify-content:center;padding:16px;">
    <div style="background:#fff;border-radius:16px;padding:28px;max-width:420px;width:100%;box-shadow:0 16px 48px rgba(15,23,42,0.18);">
        <h3 style="font-size:1rem;font-weight:800;color:#b91c1c;margin-bottom:12px;">🗑️ Xóa toàn bộ thư viện?</h3>
        <p style="font-size:0.88rem;color:#64748b;margin-bottom:20px;">Hành động này sẽ <strong>xóa vĩnh viễn tất cả links</strong> trong KV Store. Không thể hoàn tác!</p>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button onclick="document.getElementById('clearModal').style.display='none'" style="padding:9px 20px;border:1.5px solid #e2e8f0;background:#fff;border-radius:10px;font-weight:700;cursor:pointer;">Huỷ</button>
            <button id="clearConfirmBtn" style="padding:9px 20px;background:#ef4444;border:none;color:#fff;border-radius:10px;font-weight:800;cursor:pointer;">Xóa tất cả</button>
        </div>
    </div>
</div>

<!-- ══ MODAL XEM VIDEO (HLS player) ══ -->
<div id="vlPlayerModal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.85);z-index:9500;align-items:center;justify-content:center;padding:16px;">
    <div style="background:#000;border-radius:14px;width:100%;max-width:900px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.45);">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#0f172a;">
            <div id="vlPlayerTitle" style="color:#fff;font-weight:700;font-size:0.9rem;"></div>
            <button onclick="vlClosePlayer()" style="background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;line-height:1;">×</button>
        </div>
        <div id="vlPlayerMsg" style="display:none;padding:14px 16px;color:#fecaca;background:#450a0a;font-size:0.85rem;font-weight:600;"></div>
        <video id="vlVideo" controls playsinline style="width:100%;max-height:70vh;background:#000;display:block;"></video>
    </div>
</div>

<!-- ══ TOAST ══ -->
<div id="libToast" style="display:none;position:fixed;bottom:28px;right:28px;background:#0f172a;color:#fff;padding:13px 20px;border-radius:12px;font-size:0.85rem;font-weight:700;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.25);max-width:320px;"></div>

<style>
.lib-row { transition: background .15s; }
.lib-row:hover { background: #F8FAFD; }
</style>
<script>
(function() {
    // ── CONFIG ──────────────────────────────────────────────────
    var IS_ADMIN = localStorage.getItem('mos360_admin_session') === 'active';
    // User thường chỉ được xem danh mục "Đăng ký" (server cũng chặn tương tự
    // ở /api/links/list) — ẩn các option danh mục khác trong bộ lọc để tránh
    // gây hiểu nhầm khi chọn phải danh mục không có kết quả.
    if (!IS_ADMIN) {
        document.querySelectorAll('#libCatFilter option').forEach(function(opt) {
            if (opt.value !== '' && opt.value !== 'form') opt.style.display = 'none';
        });
    }
    var CAT_LABELS = { video:'\uD83C\uDFAC Video', software:'\uD83D\uDCBF Ph\u1EA7n m\u1EC1m', tool:'\uD83D\uDD27 Ti\u1EC7n \u00EDch', form:'\uD83D\uDCDD \u0110\u0103ng k\u00FD', doc:'\uD83D\uDCC4 T\u00E0i li\u1EC7u', other:'\uD83D\uDCE6 Kh\u00E1c', admin:'\u2699\uFE0F Qu\u1EA3n tr\u1ECB' };
    var CAT_COLORS = { video:'#3b82f6', software:'#8b5cf6', tool:'#f59e0b', form:'#10b981', doc:'#0052CC', other:'#64748b', admin:'#B8860B' };
    var allLinks = [];
    var editKey = null;
    var PAGE_SIZE = 20;
    var currentPage = 1;

    // ── INIT ─────────────────────────────────────────────────────
    window.loadLinks = loadLinks;
    window.filterLinks = filterLinks;
    window.showAddModal = showAddModal;

    if (IS_ADMIN) {
        document.getElementById('libAdminBar').style.display = 'flex';
        document.getElementById('libAdminCol').style.display = 'table-cell';
        document.getElementById('libCheckCol').style.display = 'table-cell';
    }

    loadLinks();

    // ── CHECKBOX & DELETE SELECTED ──────────────────────────────
    window.toggleCheckAll = function(cb) {
        var checks = document.querySelectorAll('.lib-check');
        checks.forEach(function(c) { c.checked = cb.checked; });
        updateSelectedCount();
    };

    window.updateSelectedCount = function() {
        var checked = document.querySelectorAll('.lib-check:checked');
        var btn = document.getElementById('btnDeleteSelected');
        var countEl = document.getElementById('selectedCount');
        if (countEl) countEl.textContent = checked.length;
        if (btn) btn.style.display = checked.length > 0 ? 'block' : 'none';
        // Sync check-all state
        var all = document.querySelectorAll('.lib-check');
        var checkAll = document.getElementById('checkAll');
        if (checkAll) checkAll.checked = all.length > 0 && checked.length === all.length;
        // Hiện cột checkbox cells
        document.querySelectorAll('.lib-check-cell').forEach(function(td) {
            td.style.display = 'table-cell';
        });
    };

    window.deleteSelected = async function() {
        var checked = document.querySelectorAll('.lib-check:checked');
        if (!checked.length) return;
        var keys = Array.from(checked).map(function(c) { return c.getAttribute('data-key'); });
        if (!confirm('X\u00F3a ' + keys.length + ' links đã chọn?')) return;

        var btn = document.getElementById('btnDeleteSelected');
        btn.textContent = '\u23F3 Đang xóa...'; btn.disabled = true;

        var ok = 0, fail = 0;
        for (var i = 0; i < keys.length; i++) {
            try {
                var res = await fetch('/api/links/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': 'mos360_admin' },
                    body: JSON.stringify({ key: keys[i] })
                });
                var data = await res.json();
                if (data.ok) ok++; else fail++;
            } catch(e) { fail++; }
        }

        toast('\u2705 Đã xóa ' + ok + ' links' + (fail ? ', ' + fail + ' lỗi' : ''));
        btn.style.display = 'none';
        btn.textContent = '\uD83D\uDDD1\uFE0F Xóa đã chọn (<span id="selectedCount">0</span>)';
        btn.disabled = false;
        await loadLinks();
    };

    // ── EVENT DELEGATION cho admin buttons ──────────────────────
    document.addEventListener('click', function(e) {
        var btn = e.target.closest('button[data-action]');
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        var key = btn.getAttribute('data-key');
        var title = btn.getAttribute('data-title');
        var url = btn.getAttribute('data-url');
        if (action === 'edit') window.editLink(key);
        else if (action === 'delete') window.deleteLink(key, title);
        else if (action === 'copy') window.copyText(url);
    });

    // ── LOAD FROM KV API ─────────────────────────────────────────
    async function loadLinks() {
        showLoading(true);
        try {
            var res = await fetch('/api/links/list', {
                headers: IS_ADMIN ? { 'X-Admin-Auth': 'mos360_admin' } : {}
            });
            var data = await res.json();
            allLinks = data.links || [];
            renderStats();
            filterLinks();
        } catch(e) {
            showLoading(false);
            toast('\u274C Kh\u00F4ng th\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u', 'error');
        }
    }

    function renderStats() {
        var total = allLinks.length;
        var totalClicks = allLinks.reduce(function(s,l){ return s + (l.clicks||0); }, 0);
        var cats = {};
        allLinks.forEach(function(l){ cats[l.cat] = (cats[l.cat]||0)+1; });
        var topCat = Object.keys(cats).sort(function(a,b){ return cats[b]-cats[a]; })[0] || '-';

        document.getElementById('libStats').innerHTML = [
            stat('\uD83D\uDCDA', 'T\u1ED5ng link', total),
            stat('\uD83D\uDC46', 'T\u1ED5ng click', totalClicks.toLocaleString('vi-VN')),
            stat('\uD83D\uDCC2', 'Danh m\u1EE5c', Object.keys(cats).length),
            stat('\uD83C\uDFC6', 'Ph\u1ED5 bi\u1EBFn nh\u1EA5t', CAT_LABELS[topCat] || topCat)
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

        window._libFiltered = filtered;
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
            var updated = l.updated ? new Date(l.updated).toLocaleDateString('vi-VN') : (l.created ? new Date(l.created).toLocaleDateString('vi-VN') : '\u2014');

            var adminActions = IS_ADMIN
                ? '<td style="padding:10px 12px;text-align:center;white-space:nowrap;">'
                  + '<button data-action="edit" data-key="' + esc(l.key) + '" style="padding:5px 12px;border:1px solid #dbeafe;background:#eff6ff;color:#1d4ed8;border-radius:7px;cursor:pointer;font-weight:700;font-size:0.75rem;margin-right:5px;">\u270F\uFE0F S\u1EEDa</button>'
                  + '<button data-action="delete" data-key="' + esc(l.key) + '" data-title="' + esc(l.title||l.key) + '" style="padding:5px 12px;border:1px solid #fee2e2;background:#fef2f2;color:#dc2626;border-radius:7px;cursor:pointer;font-weight:700;font-size:0.75rem;">\uD83D\uDDD1\uFE0F</button>'
                  + '</td>'
                : '';

            return '<tr class="lib-row" style="border-bottom:1px solid #f1f5f9;"> '
                + (IS_ADMIN ? '<td class="lib-check-cell" style="display:none;padding:12px 12px;"><input type="checkbox" class="lib-check" data-key="' + esc(l.key) + '" onchange="updateSelectedCount()" style="cursor:pointer;width:15px;height:15px;"></td>' : '')
                + '<td style="padding:12px 16px;font-family:monospace;font-size:0.82rem;white-space:nowrap;">'
                +   '<a href="' + short + '" target="_blank" style="color:#FF5722;font-weight:800;text-decoration:none;">' + l.key + '</a>'
                +   '<button data-action="copy" data-url="' + esc(short) + '" title="Copy link" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:0.75rem;margin-left:4px;padding:2px;">\u2398</button>'
                + '</td>'
                + '<td style="padding:12px 16px;max-width:380px;">'
                +   '<div style="font-weight:700;font-size:0.88rem;color:var(--text);margin-bottom:2px;">' + esc(l.title||'(ch\u01B0a \u0111\u1EB7t t\u00EAn)') + '</div>'
                +   '<div style="font-size:0.75rem;color:#94a3b8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:340px;">' + esc(l.url) + '</div>'
                +   (l.note ? '<div style="font-size:0.72rem;color:#a78bfa;margin-top:2px;">\uD83D\uDCDD ' + esc(l.note) + '</div>' : '')
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
            html += '<button onclick="goPage(' + i + ')" style="padding:7px 14px;border:1.5px solid ' + (active ? '#FF5722' : 'var(--border)') + ';background:' + (active ? '#FF5722' : '#fff') + ';color:' + (active ? '#fff' : 'var(--muted)') + ';border-radius:8px;font-weight:700;cursor:pointer;font-size:0.82rem;">' + i + '</button>';
        }
        pager.innerHTML = html;
    }

    window.goPage = function(p) {
        currentPage = p;
        var f = window._libFiltered || allLinks;
        renderPage(f);
        renderPager(f);
    };

    // ── MODAL ADD/EDIT ─────────────────────────────────────────────
    function showAddModal() {
        editKey = null;
        document.getElementById('modalTitle').textContent = '\u2795 Th\u00EAm link m\u1EDBi';
        document.getElementById('mKey').value = '';
        document.getElementById('mKey').readOnly = false;
        document.getElementById('mTitle').value = '';
        document.getElementById('mUrl').value = '';
        document.getElementById('mCat').value = 'other';
        document.getElementById('mNote').value = '';
        document.getElementById('mError').style.display = 'none';
        document.getElementById('mKeyHint').textContent = 'Ch\u1EC9 ch\u1EEF th\u01B0\u1EDDng, s\u1ED1, g\u1EA1ch ngang. \u0110\u1EC3 tr\u1ED1ng s\u1EBD t\u1EF1 t\u1EA1o.';
        document.getElementById('libModal').style.display = 'flex';
    }

    window.editLink = function(key) {
        var link = allLinks.find(function(l){ return l.key === key; });
        if (!link) return;
        editKey = key;
        document.getElementById('modalTitle').textContent = '\u270F\uFE0F S\u1EEDa link: ' + key;
        document.getElementById('mKey').value = key;
        document.getElementById('mKey').readOnly = true;
        document.getElementById('mTitle').value = link.title || '';
        document.getElementById('mUrl').value = link.url || '';
        document.getElementById('mCat').value = link.cat || 'other';
        document.getElementById('mNote').value = link.note || '';
        document.getElementById('mError').style.display = 'none';
        document.getElementById('mKeyHint').textContent = 'Key kh\u00F4ng th\u1EC3 \u0111\u1ED5i sau khi t\u1EA1o.';
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

        if (!title) return showError('Vui l\u00F2ng nh\u1EADp t\u00EAn link.');
        if (!url || !url.startsWith('http')) return showError('URL ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng http:// ho\u1EB7c https://');

        var btn = document.getElementById('mSaveBtn');
        btn.textContent = '\u23F3 \u0110ang l\u01B0u...'; btn.disabled = true;

        try {
            var res = await fetch('/api/links/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': localStorage.getItem('mos360_admin_session') === 'active' ? 'mos360_admin' : '' },
                body: JSON.stringify({ key: key||null, title, url, cat, note, editKey })
            });
            var data = await res.json();
            if (!data.ok) { showError(data.msg || 'L\u1ED7i kh\u00F4ng x\u00E1c \u0111\u1ECBnh'); }
            else {
                closeModal();
                toast('\u2705 \u0110\u00E3 l\u01B0u link: go.mos360.vn/' + data.key);
                await loadLinks();
            }
        } catch(e) {
            showError('L\u1ED7i k\u1EBFt n\u1ED1i m\u00E1y ch\u1EE7.');
        } finally {
            btn.textContent = '\uD83D\uDCBE L\u01B0u'; btn.disabled = false;
        }
    };

    // ── DELETE ─────────────────────────────────────────────────────
    window.deleteLink = function(key, title) {
        document.getElementById('delKeyLabel').textContent = 'S\u1EBD xo\u00E1: go.mos360.vn/' + key + ' \u2014 "' + title + '"';
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
                if (data.ok) { toast('\uD83D\uDDD1\uFE0F \u0110\u00E3 xo\u00E1: ' + key); await loadLinks(); }
                else toast('\u274C ' + (data.msg||'L\u1ED7i xo\u00E1'), 'error');
            } catch(e) { toast('\u274C L\u1ED7i k\u1EBFt n\u1ED1i', 'error'); }
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
        el.textContent = '\u26A0\uFE0F ' + msg;
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
        navigator.clipboard.writeText(text).then(function(){ toast('\u2398 \u0110\u00E3 copy: ' + text); });
    };

    function esc(s) {
        return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }

    // \u2500\u2500 IMPORT JSON \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    window.importJSON = async function(event) {
        var file = event.target.files[0];
        if (!file) return;
        try {
            var text = await file.text();
            var data = JSON.parse(text);
            var links = Array.isArray(data) ? data : (data.links || []);
            if (!links.length) { toast('\u26a0\ufe0f File kh\u00f4ng c\u00f3 link n\u00e0o', 'error'); return; }

            // Lọc links hợp lệ
            var valid = links.filter(function(l) { return l.key && l.url && l.title; });
            var skipped = links.length - valid.length;

            toast('\u23F3 \u0110ang import ' + valid.length + ' links...');

            // Gửi bulk thay vì từng link → nhanh hơn và không bị ngắt
            var res = await fetch('/api/links/bulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Auth': 'mos360_admin'
                },
                body: JSON.stringify({ links: valid })
            });
            var result = await res.json();
            var msg = (result.ok || result.count) + ' th\u00e0nh c\u00f4ng'
                + (skipped ? ', ' + skipped + ' b\u1ECF qua' : '')
                + (result.fail ? ', ' + result.fail + ' l\u1ED7i' : '');
            if (result.ok !== false) {
                toast('\u2705 Import xong: ' + msg);
            } else {
                toast('\u274C ' + (result.msg || 'L\u1ED7i import'), 'error');
            }
            await loadLinks();
        } catch(e) {
            toast('\u274c File JSON kh\u00f4ng h\u1ee3p l\u1ec7', 'error');
        }
        event.target.value = '';
    };

    // \u2500\u2500 EXPORT JSON \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
    // ── CLEAR ALL ────────────────────────────────────────────────
    window.clearAllLinks = function() {
        document.getElementById('clearModal').style.display = 'flex';
        document.getElementById('clearConfirmBtn').onclick = async function() {
            document.getElementById('clearModal').style.display = 'none';
            var btn = document.getElementById('clearConfirmBtn');
            try {
                var res = await fetch('/api/links/clear', {
                    method: 'POST',
                    headers: { 'X-Admin-Auth': 'mos360_admin' }
                });
                var data = await res.json();
                if (data.ok) {
                    toast('\u2705 \u0110\u00E3 x\u00F3a ' + data.deleted + ' links');
                    await loadLinks();
                } else {
                    toast('\u274C ' + (data.msg || 'L\u1ED7i x\u00F3a'), 'error');
                }
            } catch(e) {
                toast('\u274C L\u1ED7i k\u1EBFt n\u1ED1i', 'error');
            }
        };
    };

    })();
    </script>

    <script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js"></script>
    <script>
    (function() {
        // ── HELPERS (bản riêng — script này là closure độc lập với khối
        // <script> phía trên nên không dùng chung được esc()/toast()) ──
        function esc(s) {
            return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }
        function toast(msg, type) {
            var el = document.getElementById('libToast');
            if (!el) return;
            el.textContent = msg;
            el.style.background = type === 'error' ? '#b91c1c' : '#0f172a';
            el.style.display = 'block';
            clearTimeout(el._t);
            el._t = setTimeout(function() { el.style.display = 'none'; }, 3000);
        }

        // ── STATE ──────────────────────────────────────────────────
        var vlCatalog = [];
        var vlLoggedIn = false;
        var vlUserName = null;
        var vlActiveGroup = null;
        var vlHls = null;
        var vlCurrentVideoId = null;
        var vlHasRetriedOnce = false;

        // ── INIT ───────────────────────────────────────────────────
        vlRefreshAuthBar();
        vlLoadCatalog();
        vlCheckSession();

        // ── AUTH BAR ───────────────────────────────────────────────
        function vlRefreshAuthBar() {
            var bar = document.getElementById('vlAuthBar');
            if (vlLoggedIn) {
                bar.innerHTML = '<span style="color:var(--muted);font-weight:600;">👋 Xin chào, <strong style="color:var(--text);">'
                    + esc(vlUserName || '') + '</strong></span> '
                    + '<button id="vlLogoutBtn" style="margin-left:10px;padding:6px 14px;border:1.5px solid var(--border);background:#fff;color:var(--muted);border-radius:8px;font-weight:700;cursor:pointer;font-size:0.78rem;">Đăng xuất</button>';
                document.getElementById('vlLoginBox').style.display = 'none';
                var lb = document.getElementById('vlLogoutBtn');
                if (lb) lb.onclick = vlDoLogout;
            } else {
                bar.innerHTML = '<button id="vlLoginPromptBtn" style="padding:6px 14px;background:#FF5722;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.78rem;">🔑 Đăng nhập để xem video</button>';
                var pb = document.getElementById('vlLoginPromptBtn');
                if (pb) pb.onclick = function() {
                    document.getElementById('vlLoginBox').style.display = 'block';
                    document.getElementById('vlLoginBox').scrollIntoView({ behavior: 'smooth', block: 'center' });
                };
            }
        }

        // ── SESSION CHECK ──────────────────────────────────────────
        async function vlCheckSession() {
            try {
                var res = await fetch('/api/video-library/me');
                var data = await res.json();
                vlLoggedIn = !!data.loggedIn;
                vlUserName = data.name || null;
                vlRefreshAuthBar();
            } catch (e) { /* im lặng, coi như chưa đăng nhập */ }
        }

        // ── LOGIN / LOGOUT ─────────────────────────────────────────
        var vlLoginBtnEl = document.getElementById('vlLoginBtn');
        if (vlLoginBtnEl) vlLoginBtnEl.onclick = vlDoLogin;
        var vlPassEl = document.getElementById('vlPass');
        if (vlPassEl) vlPassEl.onkeydown = function(e) { if (e.key === 'Enter') vlDoLogin(); };

        async function vlDoLogin() {
            var nameEl = document.getElementById('vlName');
            var passEl = document.getElementById('vlPass');
            var errEl = document.getElementById('vlLoginErr');
            var btn = document.getElementById('vlLoginBtn');
            var name = (nameEl.value || '').trim();
            var pass = (passEl.value || '').trim();
            errEl.style.display = 'none';

            if (!name || !pass) {
                errEl.textContent = '⚠️ Vui lòng nhập đầy đủ Họ tên và mật khẩu.';
                errEl.style.display = 'block';
                return;
            }

            btn.textContent = '⏳ Đang kiểm tra...'; btn.disabled = true;
            try {
                var res = await fetch('/api/video-library/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, password: pass })
                });
                var data = await res.json();
                if (data.success) {
                    vlLoggedIn = true;
                    vlUserName = data.name;
                    passEl.value = '';
                    vlRefreshAuthBar();
                    toast('✅ Đăng nhập thành công!');
                    // Nếu đang chờ xem 1 video cụ thể thì mở luôn sau khi đăng nhập
                    if (window._vlPendingPlay) {
                        var pending = window._vlPendingPlay;
                        window._vlPendingPlay = null;
                        vlPlay(pending);
                    }
                } else {
                    errEl.textContent = '⚠️ ' + (data.msg || 'Đăng nhập thất bại');
                    errEl.style.display = 'block';
                }
            } catch (e) {
                errEl.textContent = '⚠️ Lỗi kết nối máy chủ, vui lòng thử lại.';
                errEl.style.display = 'block';
            } finally {
                btn.textContent = 'Đăng nhập'; btn.disabled = false;
            }
        }

        async function vlDoLogout() {
            try { await fetch('/api/video-library/logout', { method: 'POST' }); } catch (e) {}
            vlLoggedIn = false;
            vlUserName = null;
            vlRefreshAuthBar();
            toast('Đã đăng xuất');
        }

        // ── CATALOG ────────────────────────────────────────────────
        async function vlLoadCatalog() {
            try {
                var res = await fetch('/api/video-library/catalog');
                var data = await res.json();
                vlCatalog = data.catalog || [];
                var groups = [];
                vlCatalog.forEach(function(v) { if (groups.indexOf(v.group) < 0) groups.push(v.group); });
                vlActiveGroup = groups[0] || null;
                vlRenderTabs(groups);
                vlRenderGrid();
            } catch (e) {
                document.getElementById('vlGrid').innerHTML = '<div style="grid-column:1/-1;color:var(--muted);font-size:0.85rem;">⚠️ Không tải được danh mục video.</div>';
            }
        }

        function vlRenderTabs(groups) {
            var labelOf = {};
            vlCatalog.forEach(function(v) { labelOf[v.group] = v.groupLabel; });
            var html = groups.map(function(g) {
                var active = g === vlActiveGroup;
                return '<button data-group="' + esc(g) + '" style="padding:8px 18px;border:1.5px solid ' + (active ? '#0052CC' : 'var(--border)') + ';background:' + (active ? '#0052CC' : '#fff') + ';color:' + (active ? '#fff' : 'var(--muted)') + ';border-radius:9px;font-weight:700;cursor:pointer;font-size:0.82rem;">' + esc(labelOf[g] || g) + '</button>';
            }).join('');
            var tabsEl = document.getElementById('vlTabs');
            tabsEl.innerHTML = html;
            tabsEl.querySelectorAll('button[data-group]').forEach(function(btn) {
                btn.onclick = function() {
                    vlActiveGroup = btn.getAttribute('data-group');
                    vlRenderTabs(groups);
                    vlRenderGrid();
                };
            });
        }

        var SUBJECT_ICON = { word: '📄', excel: '📊', ppt: '📽️' };

        function vlRenderGrid() {
            var items = vlCatalog.filter(function(v) { return v.group === vlActiveGroup; });
            var grid = document.getElementById('vlGrid');
            if (!items.length) {
                grid.innerHTML = '<div style="grid-column:1/-1;color:var(--muted);font-size:0.85rem;">Chưa có video nào.</div>';
                return;
            }
            grid.innerHTML = items.map(function(v) {
                return '<div style="border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px;background:#F8FAFD;">'
                    + '<div style="font-size:0.78rem;font-weight:800;color:#0052CC;">' + (SUBJECT_ICON[v.subject] || '🎬') + ' ' + esc(v.subjectLabel) + '</div>'
                    + '<div style="font-size:0.86rem;font-weight:700;color:var(--text);line-height:1.35;min-height:38px;">' + esc(v.title) + '</div>'
                    + '<button data-vid="' + esc(v.id) + '" data-vtitle="' + esc(v.title) + '" class="vl-play-btn" style="padding:9px 14px;background:linear-gradient(135deg,#FF5722,#ff784e);border:none;color:#fff;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.82rem;">▶ Xem video</button>'
                    + '</div>';
            }).join('');
            grid.querySelectorAll('.vl-play-btn').forEach(function(btn) {
                btn.onclick = function() {
                    vlPlay({ id: btn.getAttribute('data-vid'), title: btn.getAttribute('data-vtitle') });
                };
            });
        }

        // ── PLAYER ─────────────────────────────────────────────────
        function vlPlay(video) {
            if (!vlLoggedIn) {
                window._vlPendingPlay = video;
                document.getElementById('vlLoginBox').style.display = 'block';
                document.getElementById('vlLoginBox').scrollIntoView({ behavior: 'smooth', block: 'center' });
                toast('⚠️ Vui lòng đăng nhập để xem video này', 'error');
                return;
            }
            vlCurrentVideoId = video.id;
            vlHasRetriedOnce = false;
            document.getElementById('vlPlayerTitle').textContent = video.title;
            document.getElementById('vlPlayerMsg').style.display = 'none';
            document.getElementById('vlPlayerModal').style.display = 'flex';
            vlStartStream(true);
        }

        window.vlClosePlayer = function() {
            document.getElementById('vlPlayerModal').style.display = 'none';
            vlTeardownPlayer();
            vlCurrentVideoId = null;
        };

        function vlTeardownPlayer() {
            if (vlHls) { try { vlHls.destroy(); } catch (e) {} vlHls = null; }
            var videoEl = document.getElementById('vlVideo');
            if (videoEl) { videoEl.pause(); videoEl.removeAttribute('src'); videoEl.load(); }
        }

        // Trình duyệt đã đăng nhập sẽ luôn gửi kèm cookie phiên ở mỗi request
        // stream (m3u8/ts) — server cho phép truy cập kể cả sau khi token hết
        // hạn, miễn còn cookie hợp lệ. Nhờ vậy KHÔNG cần làm mới URL định kỳ,
        // video phát liên tục dù dài bao lâu, không bị giật/gián đoạn.
        // vlStartStream chỉ gọi lại (retryLoad=true) khi hls.js báo lỗi mạng
        // thật sự (vd phiên đăng nhập 12h đã hết hạn) — và chỉ thử lại 1 lần,
        // giữ nguyên vị trí đang xem.
        async function vlStartStream(isFirstLoad, retryLoad) {
            if (!vlCurrentVideoId) return;
            var videoEl = document.getElementById('vlVideo');
            var msgEl = document.getElementById('vlPlayerMsg');
            var resumeAt = retryLoad ? videoEl.currentTime : 0;
            var wasPlaying = retryLoad ? !videoEl.paused : true;

            try {
                var res = await fetch('/api/video-library/stream-token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: vlCurrentVideoId })
                });
                var data = await res.json();
                if (!data.success) {
                    if (data.needLogin) {
                        vlLoggedIn = false;
                        vlRefreshAuthBar();
                        window.vlClosePlayer();
                        document.getElementById('vlLoginBox').style.display = 'block';
                        toast('⚠️ Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại', 'error');
                    } else {
                        msgEl.textContent = '⚠️ ' + (data.msg || 'Không tải được video');
                        msgEl.style.display = 'block';
                    }
                    return;
                }

                if (vlHls) { try { vlHls.destroy(); } catch (e) {} vlHls = null; }

                if (window.Hls && window.Hls.isSupported()) {
                    vlHls = new window.Hls();
                    vlHls.loadSource(data.url);
                    vlHls.attachMedia(videoEl);
                    vlHls.on(window.Hls.Events.MANIFEST_PARSED, function() {
                        if (resumeAt > 0) videoEl.currentTime = resumeAt;
                        if (wasPlaying) videoEl.play().catch(function(){});
                    });
                    vlHls.on(window.Hls.Events.ERROR, function(evt, dataErr) {
                        if (!dataErr || !dataErr.fatal) return;
                        // Chỉ thử lại đúng 1 lần cho mỗi lượt xem, tránh vòng lặp lỗi liên tục
                        if (!vlHasRetriedOnce) {
                            vlHasRetriedOnce = true;
                            vlStartStream(false, true);
                            return;
                        }
                        msgEl.textContent = '⚠️ Có lỗi khi phát video. Vui lòng tải lại trang và thử lại.';
                        msgEl.style.display = 'block';
                    });
                } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
                    // Safari hỗ trợ HLS gốc
                    videoEl.src = data.url;
                    videoEl.addEventListener('loadedmetadata', function onLoaded() {
                        if (resumeAt > 0) videoEl.currentTime = resumeAt;
                        if (wasPlaying) videoEl.play().catch(function(){});
                        videoEl.removeEventListener('loadedmetadata', onLoaded);
                    });
                } else {
                    msgEl.textContent = '⚠️ Trình duyệt của bạn không hỗ trợ phát video này.';
                    msgEl.style.display = 'block';
                    return;
                }
            } catch (e) {
                msgEl.textContent = '⚠️ Lỗi kết nối máy chủ, vui lòng thử lại.';
                msgEl.style.display = 'block';
            }
        }
    })();
    </script>
`;
}