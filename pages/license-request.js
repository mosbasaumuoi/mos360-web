// ============================================================
// MOS360 — Trang công khai "Yêu cầu cấp mật khẩu" (/cap-mat-khau)
// Không cần đăng nhập. Học viên tự điền form, gửi vào hàng chờ
// duyệt (KV: pending:{ts}_{rand}) — admin duyệt thủ công trong
// Dashboard sau khi đối chiếu đã thanh toán.
// ============================================================

export function getLicenseRequestUI() {
    return `
    <div class="section-card" style="max-width:560px; margin:40px auto 60px; padding:32px 26px;">
        <div style="text-align:center; margin-bottom:6px;">
            <span style="font-size:2rem;">🔑</span>
        </div>
        <h2 style="text-align:center; color:var(--text); margin-bottom:6px; font-size:1.4rem;">Yêu cầu cấp mật khẩu phần mềm</h2>
        <p style="text-align:center; color:var(--muted); font-size:0.85rem; margin-bottom:28px; line-height:1.6;">
            Dùng cho phần mềm luyện thi MOS Word / Excel / PowerPoint cài trực tiếp trên máy.<br>
            Điền đầy đủ thông tin bên dưới — MOS360 sẽ đối chiếu thanh toán và gửi mật khẩu cho bạn.
        </p>

        <div id="reqFormBox">
            <div style="margin-bottom:16px;">
                <label style="font-size:0.8rem; color:var(--muted); font-weight:bold; display:block; margin-bottom:6px;">HỌ VÀ TÊN <span style="color:#dc2626">*</span></label>
                <input type="text" id="reqName" placeholder="VD: Nguyễn Văn A" style="width:100%; padding:13px; background:#E2ECFA; border:1px solid var(--border); color:var(--text); border-radius:10px; font-size:0.95rem;">
            </div>

            <div style="margin-bottom:16px;">
                <label style="font-size:0.8rem; color:var(--muted); font-weight:bold; display:block; margin-bottom:6px;">SỐ ĐIỆN THOẠI <span style="color:#dc2626">*</span></label>
                <input type="tel" id="reqPhone" placeholder="VD: 0912345678" style="width:100%; padding:13px; background:#E2ECFA; border:1px solid var(--border); color:var(--text); border-radius:10px; font-size:0.95rem;">
            </div>

            <div style="margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <label style="font-size:0.8rem; color:var(--muted); font-weight:bold;">MÃ ID TỪ APP <span style="color:#dc2626">*</span></label>
                    <button type="button" onclick="pasteRandomID()" style="padding:5px 11px; background:#E2ECFA; border:1px solid var(--border); color:var(--cyan); border-radius:7px; font-size:0.75rem; font-weight:700; cursor:pointer;">📋 Dán từ Clipboard</button>
                </div>
                <textarea id="reqRandomID" rows="2" placeholder="Mở phần mềm trên máy, copy nguyên mã ID hiện trên màn hình, rồi bấm 'Dán từ Clipboard' ở trên hoặc Ctrl+V vào đây" style="width:100%; padding:13px; background:#E2ECFA; border:1px solid var(--border); color:var(--text); border-radius:10px; font-size:0.88rem; font-family:monospace; resize:vertical;"></textarea>
                <div style="font-size:0.74rem; color:var(--muted); margin-top:5px;">⚠️ Mật khẩu được khoá theo đúng máy đã gửi mã — không dùng được trên máy khác.</div>
            </div>

            <div style="margin-bottom:16px;">
                <label style="font-size:0.8rem; color:var(--muted); font-weight:bold; display:block; margin-bottom:8px;">MÔN ĐÃ ĐĂNG KÝ <span style="color:#dc2626">*</span></label>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <label style="display:flex; align-items:center; gap:7px; padding:11px 14px; background:#E2ECFA; border:1px solid var(--border); border-radius:10px; cursor:pointer; flex:1; min-width:110px;">
                        <input type="checkbox" id="reqSubjExcel" value="excel" style="width:17px;height:17px;accent-color:#22c55e;cursor:pointer">
                        <span style="font-weight:700; font-size:0.86rem; color:var(--text);">📊 Excel</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:7px; padding:11px 14px; background:#E2ECFA; border:1px solid var(--border); border-radius:10px; cursor:pointer; flex:1; min-width:110px;">
                        <input type="checkbox" id="reqSubjWord" value="word" style="width:17px;height:17px;accent-color:#0052CC;cursor:pointer">
                        <span style="font-weight:700; font-size:0.86rem; color:var(--text);">📄 Word</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:7px; padding:11px 14px; background:#E2ECFA; border:1px solid var(--border); border-radius:10px; cursor:pointer; flex:1; min-width:110px;">
                        <input type="checkbox" id="reqSubjPpt" value="ppt" style="width:17px;height:17px;accent-color:#FF5722;cursor:pointer">
                        <span style="font-weight:700; font-size:0.86rem; color:var(--text);">📽️ PowerPoint</span>
                    </label>
                </div>
            </div>

            <div style="margin-bottom:24px;">
                <label style="font-size:0.8rem; color:var(--muted); font-weight:bold; display:block; margin-bottom:8px;">NHẬN KẾT QUẢ QUA <span style="color:#dc2626">*</span></label>
                <div style="display:flex; gap:8px; margin-bottom:10px;">
                    <button type="button" id="chEmail" onclick="selectChannel('email')" class="req-channel-btn" style="flex:1; padding:10px; border-radius:8px; border:1px solid var(--border); background:#E2ECFA; color:var(--muted); font-weight:700; font-size:0.82rem; cursor:pointer;">✉️ Email</button>
                    <button type="button" id="chZalo" onclick="selectChannel('zalo')" class="req-channel-btn" style="flex:1; padding:10px; border-radius:8px; border:1px solid var(--border); background:#E2ECFA; color:var(--muted); font-weight:700; font-size:0.82rem; cursor:pointer;">💬 Zalo</button>
                    <button type="button" id="chFacebook" onclick="selectChannel('facebook')" class="req-channel-btn" style="flex:1; padding:10px; border-radius:8px; border:1px solid var(--border); background:#E2ECFA; color:var(--muted); font-weight:700; font-size:0.82rem; cursor:pointer;">📘 Facebook</button>
                </div>
                <input type="text" id="reqContact" placeholder="Chọn 1 kênh ở trên trước" style="width:100%; padding:13px; background:#E2ECFA; border:1px solid var(--border); color:var(--text); border-radius:10px; font-size:0.9rem;">
            </div>

            <button class="btn-action" id="btnSendRequest" onclick="submitLicenseRequest()">📨 GỬI YÊU CẦU</button>
        </div>

        <div id="reqSuccessBox" style="display:none; text-align:center; padding:30px 10px;">
            <div style="font-size:2.6rem; margin-bottom:12px;">✅</div>
            <div style="color:var(--text); font-weight:800; font-size:1.05rem; margin-bottom:8px;">Đã gửi yêu cầu thành công!</div>
            <div style="color:var(--muted); font-size:0.88rem; line-height:1.6;">MOS360 sẽ đối chiếu thanh toán và gửi mật khẩu cho bạn qua kênh đã chọn trong thời gian sớm nhất.</div>
        </div>

        <div id="reqErrorBox" style="display:none; margin-top:14px; padding:12px 14px; background:rgba(220,38,38,0.08); border:1px solid rgba(220,38,38,0.25); border-radius:10px; color:#dc2626; font-size:0.85rem;"></div>
    </div>

    <script>
        var selectedChannel = '';
        var channelPlaceholder = {
            email: 'Nhập địa chỉ email của bạn',
            zalo: 'Nhập số điện thoại Zalo của bạn',
            facebook: 'Dán link trang cá nhân Facebook của bạn'
        };

        // Nếu URL có sẵn ?id=... (vd app C# sau này mở thẳng trình duyệt kèm mã ID),
        // tự điền luôn vào ô — học viên không cần copy/dán thủ công nữa.
        (function autoFillFromURL() {
            var params = new URLSearchParams(window.location.search);
            var idFromUrl = params.get('id');
            if (idFromUrl) {
                document.getElementById('reqRandomID').value = idFromUrl;
            }
        })();

        // Dán mã ID từ Clipboard — học viên copy (Ctrl+C) bên app C#, quay sang đây bấm 1 nút.
        async function pasteRandomID() {
            try {
                var text = await navigator.clipboard.readText();
                if (!text || !text.trim()) {
                    alert('Clipboard đang trống. Hãy copy (Ctrl+C) mã ID trong app trước, rồi quay lại bấm nút này.');
                    return;
                }
                document.getElementById('reqRandomID').value = text.trim();
            } catch (e) {
                // Trình duyệt chặn đọc clipboard (chưa cấp quyền / không hỗ trợ / không phải HTTPS)
                alert('Không tự dán được (trình duyệt chặn quyền đọc Clipboard). Vui lòng bấm vào ô bên dưới và nhấn Ctrl+V để dán thủ công.');
                document.getElementById('reqRandomID').focus();
            }
        }

        function selectChannel(ch) {
            selectedChannel = ch;
            ['email','zalo','facebook'].forEach(function(c) {
                var btn = document.getElementById('ch' + c.charAt(0).toUpperCase() + c.slice(1));
                if (c === ch) {
                    btn.style.background = 'var(--primary)';
                    btn.style.color = '#fff';
                    btn.style.borderColor = 'var(--primary)';
                } else {
                    btn.style.background = '#E2ECFA';
                    btn.style.color = 'var(--muted)';
                    btn.style.borderColor = 'var(--border)';
                }
            });
            var contactInput = document.getElementById('reqContact');
            contactInput.placeholder = channelPlaceholder[ch];
            if (ch === 'zalo') {
                var phone = document.getElementById('reqPhone').value.trim();
                if (phone && !contactInput.value) contactInput.value = phone;
            }
        }

        async function submitLicenseRequest() {
            var name = document.getElementById('reqName').value.trim();
            var phone = document.getElementById('reqPhone').value.trim();
            var randomID = document.getElementById('reqRandomID').value.trim();
            var contact = document.getElementById('reqContact').value.trim();
            var errBox = document.getElementById('reqErrorBox');
            errBox.style.display = 'none';

            var subjects = [];
            if (document.getElementById('reqSubjExcel').checked) subjects.push('excel');
            if (document.getElementById('reqSubjWord').checked) subjects.push('word');
            if (document.getElementById('reqSubjPpt').checked) subjects.push('ppt');

            if (!name) return showReqError('Vui lòng nhập họ tên.');
            if (!phone) return showReqError('Vui lòng nhập số điện thoại.');
            if (!randomID) return showReqError('Vui lòng dán mã ID từ phần mềm trên máy.');
            if (subjects.length === 0) return showReqError('Vui lòng chọn ít nhất 1 môn đã đăng ký.');
            if (!selectedChannel) return showReqError('Vui lòng chọn kênh nhận kết quả (Email / Zalo / Facebook).');
            if (!contact) return showReqError('Vui lòng nhập thông tin liên hệ cho kênh đã chọn.');

            var btn = document.getElementById('btnSendRequest');
            btn.disabled = true; btn.textContent = '⏳ Đang gửi...';
            try {
                var res = await fetch('/api/license/request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentName: name, phone, randomID, subjects,
                        receiveChannel: selectedChannel, receiveContact: contact
                    })
                });
                var data = await res.json();
                if (!data.success) { showReqError(data.msg || 'Có lỗi xảy ra, vui lòng thử lại.'); return; }
                document.getElementById('reqFormBox').style.display = 'none';
                document.getElementById('reqSuccessBox').style.display = 'block';
            } catch (e) {
                showReqError('Không kết nối được tới máy chủ. Vui lòng kiểm tra mạng và thử lại.');
            } finally {
                btn.disabled = false; btn.textContent = '📨 GỬI YÊU CẦU';
            }
        }

        function showReqError(msg) {
            var errBox = document.getElementById('reqErrorBox');
            errBox.textContent = '❌ ' + msg;
            errBox.style.display = 'block';
            errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    </script>`;
}