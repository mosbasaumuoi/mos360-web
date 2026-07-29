// ============================================================
// MOS360 — Blog SEO (/blog, /blog/:slug)
// ============================================================
// Nội dung lưu trực tiếp trong code (KHÔNG qua KV) — vì bài viết ít khi
// thay đổi và việc này không tốn thêm quota "put" của Workers KV. Muốn
// thêm bài mới: thêm 1 object vào mảng BLOG_POSTS bên dưới, không cần
// đụng gì khác — route /blog và /blog/:slug tự động nhận bài mới.
// ============================================================

export const BLOG_POSTS = [
    {
        slug: "chuan-dau-ra-tin-hoc-la-gi",
        title: "Chuẩn Đầu Ra Tin Học Là Gì? Sinh Viên Cần Thi Chứng Chỉ Gì Để Đủ Điều Kiện Tốt Nghiệp?",
        seoDescription: "Chuẩn đầu ra tin học là gì, vì sao sinh viên bắt buộc phải có, và nên thi MOS hay IC3 để hoàn thành nhanh nhất. Hướng dẫn chi tiết từ MOS360 Hải Phòng.",
        publishedDate: "2026-07-17",
        excerpt: "Rất nhiều sinh viên năm cuối chỉ phát hiện ra mình còn thiếu chuẩn đầu ra tin học khi đã sắp đến hạn nộp hồ sơ xét tốt nghiệp. Tìm hiểu chuẩn đầu ra tin học là gì và cách hoàn thành nhanh nhất.",
        contentHtml: `
            <p>Rất nhiều sinh viên năm cuối chỉ phát hiện ra mình còn thiếu <strong>chuẩn đầu ra tin học</strong> khi đã sắp đến hạn nộp hồ sơ xét tốt nghiệp — lúc đó mới cuống cuồng tìm chỗ học, chỗ thi. Bài viết này sẽ giúp bạn hiểu rõ chuẩn đầu ra tin học là gì, vì sao bắt buộc phải có, và cách hoàn thành nhanh nhất mà không ảnh hưởng đến lịch học, lịch thi các môn khác.</p>

            <h2>Chuẩn đầu ra tin học là gì?</h2>
            <p>Chuẩn đầu ra tin học là một trong những điều kiện bắt buộc mà hầu hết các trường đại học, cao đẳng tại Việt Nam yêu cầu sinh viên phải đáp ứng trước khi được xét tốt nghiệp, bên cạnh chuẩn đầu ra ngoại ngữ. Mục đích là đảm bảo sinh viên ra trường có kỹ năng sử dụng máy tính, phần mềm văn phòng (Word, Excel, PowerPoint) ở mức đủ để làm việc thực tế.</p>
            <p>Tùy từng trường, chuẩn đầu ra tin học có thể được công nhận thông qua:</p>
            <ul>
                <li>Hoàn thành các học phần tin học đại cương trong chương trình đào tạo</li>
                <li>Hoặc nộp <strong>chứng chỉ tin học quốc tế</strong> được nhà trường công nhận thay thế — phổ biến nhất là <strong>MOS (Microsoft Office Specialist)</strong> và <strong>IC3 (Internet and Computing Core Certification)</strong></li>
            </ul>
            <p>Cách thứ hai thường được sinh viên lựa chọn nhiều hơn vì chủ động về thời gian, không phải chờ đăng ký học phần theo học kỳ.</p>

            <h2>Vì sao nên chọn thi chứng chỉ MOS hoặc IC3 thay vì học lại học phần?</h2>
            <ul>
                <li><strong>Chủ động thời gian</strong>: có thể ôn và thi bất cứ lúc nào trong năm, không phụ thuộc lịch mở lớp của trường</li>
                <li><strong>Nhanh hơn</strong>: ôn tập bài bản chỉ mất khoảng 1-3 tuần là có thể thi, trong khi học lại 1 học phần thường kéo dài cả học kỳ</li>
                <li><strong>Có giá trị lâu dài</strong>: chứng chỉ MOS do Microsoft cấp, IC3 do Certiport cấp — đều là chứng chỉ quốc tế, có thể đưa vào CV xin việc sau này, không chỉ dùng để "trả nợ" chuẩn đầu ra</li>
            </ul>

            <h2>Cần thi những môn nào để đạt chuẩn đầu ra?</h2>
            <p>Tùy quy định từng trường (bạn nên kiểm tra chính xác trong quyết định chuẩn đầu ra của trường mình), nhưng phổ biến nhất là:</p>
            <ul>
                <li><strong>MOS</strong>: thi 1-3 môn trong số Word, Excel, PowerPoint tùy yêu cầu ngành học, điểm đạt tối thiểu thường là <strong>700/1000</strong></li>
                <li><strong>IC3 GS6</strong>: gồm 3 cấp độ (Level 1, 2, 3), phù hợp với sinh viên khối ngành không chuyên CNTT, yêu cầu kiến thức nền tảng về máy tính, internet và ứng dụng văn phòng</li>
            </ul>

            <h2>Học và thi ở đâu tại Hải Phòng?</h2>
            <p>Tại Hải Phòng, <strong>MOS360 - Trung tâm tin học MOS &amp; IC3 &amp; AI</strong> (số 57 Lê Văn Thuyết A, phường Lê Chân) là địa chỉ chuyên đào tạo và luyện thi chuẩn đầu ra tin học cho sinh viên, với một số điểm khác biệt giúp rút ngắn thời gian ôn tập:</p>
            <ul>
                <li>Luyện tập <strong>100% bằng phần mềm mô phỏng</strong>, giao diện giống hệt bài thi thật — không bỡ ngỡ khi vào phòng thi</li>
                <li>Được giáo viên <strong>hướng dẫn 1:1</strong>, hỗ trợ trực tiếp những phần còn yếu thay vì học chung chung cả lớp</li>
                <li>Học <strong>không giới hạn số lần</strong>, mọi lúc mọi nơi — phù hợp với sinh viên có lịch học dày</li>
                <li><strong>Cam kết đầu ra 700+ điểm bằng văn bản</strong>, nếu chưa đạt sẽ được hoàn lại 100% lệ phí thi</li>
                <li>Học phí chỉ <strong>400.000đ/môn MOS</strong> và <strong>100.000đ/môn IC3</strong></li>
            </ul>

            <h2>Câu hỏi thường gặp</h2>
            <p><strong>Chứng chỉ MOS/IC3 có thời hạn sử dụng bao lâu?</strong><br>Chứng chỉ MOS có giá trị 5 năm kể từ ngày cấp — dư sức dùng cho cả việc xét chuẩn đầu ra lẫn đưa vào hồ sơ xin việc sau này.</p>
            <p><strong>Nếu thi trượt thì có phải đóng phí thi lại không?</strong><br>Tại MOS360, nếu học viên ôn tập đầy đủ theo lộ trình mà vẫn chưa đạt 700 điểm, trung tâm hoàn lại 100% lệ phí thi đã đóng.</p>
            <p><strong>Nên thi MOS hay IC3?</strong><br>Cần đối chiếu chính xác với quy định chuẩn đầu ra của trường bạn đang theo học — một số trường chỉ công nhận MOS, một số chấp nhận cả hai. Bạn có thể liên hệ MOS360 qua Zalo <strong>0912888360</strong> để được tư vấn miễn phí chứng chỉ nào phù hợp với ngành học của mình.</p>
        `
    },
    {
        slug: "kinh-nghiem-thi-mos-dat-diem-cao",
        title: "Kinh Nghiệm Thi MOS Word, Excel, PowerPoint Đạt 700+ Điểm Ngay Lần Đầu",
        seoDescription: "5 kinh nghiệm thực tế giúp bạn thi MOS đạt 700+ điểm ngay lần đầu, cùng thông tin lệ phí thi MOS 2026 và sự khác biệt giữa MOS 2019 và MOS 365.",
        publishedDate: "2026-07-17",
        excerpt: "Chứng chỉ MOS ngày càng quan trọng nhưng không ít bạn thi trượt ngay lần đầu vì ôn tập sai cách. Đây là 5 kinh nghiệm thực tế giúp bạn tự tin đạt 700+ điểm.",
        contentHtml: `
            <p>Chứng chỉ MOS (Microsoft Office Specialist) ngày càng trở nên quan trọng — không chỉ để đạt chuẩn đầu ra tin học mà còn là điểm cộng lớn trong CV xin việc. Tuy nhiên không ít bạn thi trượt ngay lần đầu vì chủ quan hoặc ôn tập sai cách. Dưới đây là những kinh nghiệm thực tế giúp bạn tự tin đạt 700+ điểm ngay lần thi đầu tiên.</p>

            <h2>Bài thi MOS có gì, tính điểm thế nào?</h2>
            <p>Mỗi bài thi MOS (Word, Excel hoặc PowerPoint) kéo dài tối đa <strong>50 phút</strong>, thang điểm tối đa <strong>1000</strong>, và bạn cần đạt tối thiểu <strong>700 điểm</strong> để được công nhận đạt (Pass). Đề thi có dạng <strong>Multi-Project</strong>: bạn sẽ làm việc trực tiếp trên 5-6 dự án (project) mô phỏng tình huống thực tế, mỗi dự án gồm nhiều yêu cầu (task) nhỏ cần hoàn thành trong chính phần mềm Word/Excel/PowerPoint thật.</p>

            <h2>5 kinh nghiệm giúp tăng điểm thi MOS</h2>
            <p><strong>1. Ôn đúng theo cấu trúc đề thi, không học lan man</strong><br>Mỗi môn thi MOS đều có danh sách kỹ năng (domain) cố định do Microsoft công bố. Ôn bám sát đúng các domain này giúp tiết kiệm thời gian rất nhiều so với việc tự học tràn lan trên YouTube.</p>
            <p><strong>2. Luyện trên phần mềm mô phỏng đề thi thật, không chỉ xem lý thuyết</strong><br>Xem video giúp hiểu khái niệm, nhưng chỉ luyện trực tiếp trên phần mềm có giao diện giống bài thi thật mới giúp bạn quen tốc độ, tránh bỡ ngỡ mất thời gian khi vào phòng thi chính thức.</p>
            <p><strong>3. Quản lý thời gian theo từng Project, không dồn vào 1-2 câu khó</strong><br>Làm hết các Task dễ trước ở tất cả Project, sau đó quay lại xử lý Task khó — tránh bị kẹt ở 1 Task khó mà hết giờ chưa kịp làm các phần dễ còn lại.</p>
            <p><strong>4. Dùng chức năng "Mark Complete" để kiểm soát tiến độ</strong><br>Đánh dấu ngay sau khi hoàn thành mỗi Task để dễ theo dõi, tránh bỏ sót — lỗi khiến nhiều bạn bị trừ điểm oan dù thực ra đã biết cách làm.</p>
            <p><strong>5. Học 1:1 với giáo viên thay vì tự mày mò</strong><br>Việc có giáo viên hướng dẫn 1:1, sửa lỗi ngay khi luyện tập giúp rút ngắn đáng kể thời gian ôn so với tự học một mình.</p>

            <h2>Lệ phí thi MOS 2026 là bao nhiêu?</h2>
            <p>Lệ phí thi chính thức (nộp cho Certiport/đơn vị khảo thí) dao động quanh mốc 900.000đ/môn tùy thời điểm và đơn vị tổ chức thi. Ngoài lệ phí thi, bạn cần thêm chi phí ôn luyện — đây là phần chi phí có thể tối ưu được nhiều nhất nếu chọn đúng nơi học.</p>
            <p>Tại <strong>MOS360 - Trung tâm tin học MOS &amp; IC3 &amp; AI</strong> (Hải Phòng), học phí ôn luyện chỉ <strong>400.000đ/môn</strong>, đã bao gồm phần mềm luyện tập mô phỏng, giáo viên hướng dẫn 1:1, học không giới hạn số lần, và <strong>cam kết đầu ra 700+ bằng văn bản</strong> — hoàn lại 100% lệ phí thi nếu chưa đạt.</p>

            <h2>MOS 2019 và MOS 365 khác nhau thế nào?</h2>
            <p>MOS 365 (Microsoft 365 Apps) là phiên bản cập nhật mới nhất, đề thi bám theo giao diện và tính năng của Microsoft 365 hiện hành, trong khi MOS 2019 đề thi theo giao diện Office 2019. Nội dung kỹ năng cốt lõi tương đồng nhau khá nhiều, nên nếu trường/đơn vị của bạn không yêu cầu cụ thể phiên bản nào, bạn có thể chọn phiên bản đang phổ biến hơn tại thời điểm đăng ký.</p>

            <h2>Kết luận</h2>
            <p>Thi đạt MOS ngay lần đầu hoàn toàn khả thi nếu ôn đúng phương pháp: bám sát domain đề thi, luyện trên phần mềm mô phỏng thật, và có người hướng dẫn khi gặp khó. Nếu bạn đang ở Hải Phòng và cần một lộ trình ôn tập rút gọn, có cam kết đầu ra rõ ràng, có thể liên hệ MOS360 qua Zalo <strong>0912888360</strong> để được tư vấn miễn phí.</p>
        `
    },
    {
        slug: "trung-tam-luyen-thi-mos-hai-phong",
        title: "Trung Tâm Luyện Thi MOS Tại Hải Phòng - Học Ở Đâu Uy Tín, Học Phí Rẻ?",
        seoDescription: "Tiêu chí chọn trung tâm luyện thi MOS uy tín tại Hải Phòng, và giới thiệu MOS360 - trung tâm tin học tại Lê Chân với học phí 400.000đ/môn, cam kết đầu ra.",
        publishedDate: "2026-07-17",
        excerpt: "Đang tìm trung tâm luyện thi MOS tại Hải Phòng? Đây là những tiêu chí cần lưu ý khi chọn nơi học, và một địa chỉ đáng cân nhắc ngay tại quận Lê Chân.",
        contentHtml: `
            <p>Nếu bạn đang tìm một <strong>trung tâm luyện thi MOS tại Hải Phòng</strong> để hoàn thành chuẩn đầu ra tin học hoặc bổ sung kỹ năng văn phòng cho CV xin việc, bài viết này sẽ giúp bạn biết cần lưu ý gì khi chọn nơi học, và giới thiệu một địa chỉ đáng cân nhắc ngay tại quận Lê Chân.</p>

            <h2>Vì sao nên học tin học văn phòng tại trung tâm thay vì tự học?</h2>
            <p>Tự học MOS qua video YouTube hoàn toàn khả thi, nhưng thường mất nhiều thời gian hơn vì không biết chính xác phạm vi kiến thức đề thi yêu cầu, không có ai sửa lỗi trực tiếp khi làm sai thao tác, và không được luyện trên phần mềm mô phỏng giống bài thi thật.</p>
            <p>Một trung tâm luyện thi tốt sẽ giải quyết đúng 3 vấn đề trên, giúp rút ngắn thời gian ôn tập từ vài tháng tự học xuống còn 1-3 tuần.</p>

            <h2>Những tiêu chí cần xem khi chọn trung tâm luyện thi MOS</h2>
            <ol>
                <li>Có phần mềm luyện tập mô phỏng đề thi thật hay chỉ dạy lý thuyết suông</li>
                <li>Có giáo viên hướng dẫn trực tiếp (1:1) hay chỉ học theo nhóm đông, không ai sửa bài riêng</li>
                <li>Có giới hạn số lần luyện tập không, hay được học thoải mái đến khi thành thạo</li>
                <li>Có cam kết đầu ra rõ ràng hay chỉ hứa suông — cam kết bằng văn bản, có chính sách hoàn phí nếu chưa đạt là dấu hiệu trung tâm tự tin về chất lượng đào tạo</li>
                <li>Học phí có minh bạch ngay từ đầu không, hay phải "hỏi giá" nhiều lần</li>
            </ol>

            <h2>MOS360 - Trung tâm tin học MOS &amp; IC3 &amp; AI tại Lê Chân, Hải Phòng</h2>
            <p>MOS360 là trung tâm chuyên đào tạo và luyện thi các chứng chỉ <strong>MOS (Word, Excel, PowerPoint 2019 &amp; 365)</strong>, <strong>IC3 GS6 (Level 1, 2, 3)</strong> và <strong>Generative AI</strong>, tọa lạc tại <strong>số 57 Lê Văn Thuyết A, phường Lê Chân, Hải Phòng</strong>.</p>
            <p><strong>Điểm khác biệt của MOS360:</strong></p>
            <ul>
                <li>Luyện tập <strong>100% bằng phần mềm mô phỏng</strong>, giao diện giống hệt bài thi thật của Certiport</li>
                <li><strong>Giáo viên hướng dẫn 1:1</strong> trực tiếp, không học chung chung theo nhóm đông</li>
                <li>Học <strong>không giới hạn số lần</strong>, mọi lúc mọi nơi — chủ động hoàn toàn về thời gian</li>
                <li><strong>Cam kết đầu ra 700+ điểm bằng văn bản</strong>, hoàn lại 100% lệ phí thi nếu chưa đạt</li>
                <li>Học phí minh bạch: <strong>400.000đ/môn MOS</strong>, <strong>100.000đ/môn IC3 hoặc AI</strong></li>
            </ul>
            <p><strong>Giờ hoạt động:</strong> Sáng 8:00 - 11:00, Chiều 14:00 - 17:00 (Thứ 2 - Thứ 7)</p>

            <h2>Câu hỏi thường gặp</h2>
            <p><strong>Học tại MOS360 có phù hợp với người mất gốc tin học không?</strong><br>Có. Vì được giáo viên hướng dẫn 1:1 và luyện tập không giới hạn số lần, học viên chưa có nền tảng vẫn có thể theo kịp lộ trình mà không lo bị bỏ lại phía sau như học nhóm đông.</p>
            <p><strong>Có học online được không hay bắt buộc đến trực tiếp?</strong><br>Phần mềm luyện tập có thể sử dụng mọi lúc mọi nơi, học viên chủ động về thời gian và địa điểm luyện tập, chỉ cần đến trực tiếp khi cần giáo viên hỗ trợ 1:1 hoặc theo lịch hẹn.</p>
            <p><strong>Đăng ký học như thế nào?</strong><br>Liên hệ trực tiếp qua Zalo/Hotline <strong>0912888360</strong> hoặc đến trực tiếp trung tâm tại số 57 Lê Văn Thuyết A, phường Lê Chân, Hải Phòng để được tư vấn miễn phí lộ trình phù hợp.</p>
        `
    },
    {
        slug: "chung-chi-ic3-gs6-la-gi",
        title: "Chứng Chỉ IC3 GS6 Là Gì? Có Cần Thiết Với Sinh Viên Không?",
        seoDescription: "IC3 GS6 là gì, gồm mấy cấp độ, dùng để làm gì và có nên học thêm Generative AI cùng lúc. Giải đáp chi tiết cho sinh viên cần đạt chuẩn đầu ra.",
        publishedDate: "2026-07-17",
        excerpt: "Bên cạnh MOS, IC3 cũng là chứng chỉ tin học quốc tế được nhiều trường công nhận cho chuẩn đầu ra. Tìm hiểu IC3 GS6 là gì và có cần thiết với bạn không.",
        contentHtml: `
            <p>Bên cạnh MOS, <strong>IC3 (Internet and Computing Core Certification)</strong> cũng là một trong những chứng chỉ tin học quốc tế được nhiều trường đại học tại Việt Nam công nhận cho chuẩn đầu ra. Tuy vậy, không ít sinh viên vẫn còn mơ hồ về việc IC3 là gì, thi để làm gì, và có khác biệt thế nào so với MOS. Bài viết này sẽ giải đáp chi tiết.</p>

            <h2>IC3 GS6 là gì?</h2>
            <p>IC3 (Internet and Computing Core Certification), phiên bản hiện hành là <strong>GS6 (Global Standard 6)</strong>, là chứng chỉ quốc tế do <strong>Certiport</strong> cấp — đánh giá kiến thức và kỹ năng nền tảng về máy tính, internet và các ứng dụng văn phòng cơ bản. Khác với MOS tập trung sâu vào kỹ năng thao tác thực hành trên Word/Excel/PowerPoint, IC3 kiểm tra kiến thức nền tảng rộng hơn: từ phần cứng, phần mềm, mạng internet, an toàn thông tin đến kỹ năng làm việc cộng tác trực tuyến.</p>

            <h2>IC3 GS6 gồm mấy cấp độ?</h2>
            <p>IC3 GS6 được chia thành 3 cấp độ (Level), tăng dần độ khó:</p>
            <ul>
                <li><strong>Level 1</strong>: kiến thức cơ bản nhất về máy tính, phần mềm, internet</li>
                <li><strong>Level 2</strong>: kỹ năng sử dụng ứng dụng văn phòng và làm việc trực tuyến ở mức khá</li>
                <li><strong>Level 3</strong>: kỹ năng nâng cao, bao gồm cả tư duy giải quyết vấn đề bằng công nghệ</li>
            </ul>
            <p>Tùy quy định từng trường, sinh viên có thể cần hoàn thành 1 hoặc cả 3 cấp độ để đạt chuẩn đầu ra.</p>

            <h2>IC3 dùng để làm gì, có bắt buộc phải thi không?</h2>
            <ul>
                <li><strong>Đạt chuẩn đầu ra tin học</strong> tại các trường đại học, cao đẳng công nhận chứng chỉ IC3 thay thế học phần tin học đại cương</li>
                <li><strong>Bổ sung vào CV</strong> như một minh chứng về năng lực sử dụng công nghệ nền tảng, đặc biệt hữu ích với sinh viên khối ngành không chuyên CNTT</li>
                <li>Với các bạn có định hướng học tập/làm việc ở môi trường quốc tế, IC3 là chứng chỉ được công nhận rộng rãi ở nhiều quốc gia</li>
            </ul>
            <p>IC3 không phải chứng chỉ bắt buộc với tất cả mọi người, nhưng nếu trường bạn công nhận IC3 cho chuẩn đầu ra, đây thường là lựa chọn nhẹ nhàng và tiết kiệm chi phí hơn so với thi MOS.</p>

            <h2>Nên học thêm Generative AI cùng lúc không?</h2>
            <p>Ngoài MOS và IC3, xu hướng gần đây nhiều trường và nhà tuyển dụng bắt đầu quan tâm đến kỹ năng sử dụng <strong>AI tạo sinh (Generative AI)</strong> trong công việc. Đây không phải chứng chỉ bắt buộc cho chuẩn đầu ra ở phần lớn các trường hiện nay, nhưng là kỹ năng thực tế rất được đánh giá cao khi đi xin việc, và chi phí học thêm thường không đáng kể nếu học cùng lúc với IC3.</p>

            <h2>Học và thi IC3 GS6 ở đâu tại Hải Phòng?</h2>
            <p><strong>MOS360 - Trung tâm tin học MOS &amp; IC3 &amp; AI</strong> (số 57 Lê Văn Thuyết A, phường Lê Chân, Hải Phòng) đào tạo đầy đủ cả 3 cấp độ IC3 GS6 và khóa Generative AI, với luyện tập bằng phần mềm mô phỏng, giáo viên hướng dẫn 1:1, học không giới hạn số lần, và <strong>học phí chỉ 100.000đ/môn</strong> cho cả IC3 và Generative AI.</p>

            <h2>Câu hỏi thường gặp</h2>
            <p><strong>Nên thi MOS hay IC3?</strong><br>Cần kiểm tra chính xác quy định chuẩn đầu ra của trường bạn — một số trường chỉ công nhận MOS, một số chấp nhận cả MOS và IC3. Nếu được chọn, IC3 thường phù hợp hơn với sinh viên khối ngành không chuyên CNTT vì kiến thức nền tảng, chi phí ôn luyện thấp hơn.</p>
            <p><strong>Có thể học cả MOS lẫn IC3 cùng lúc không?</strong><br>Hoàn toàn được. Nhiều học viên tại MOS360 học song song cả 2 chứng chỉ để vừa đạt chuẩn đầu ra vừa có thêm chứng chỉ bổ sung cho CV.</p>
            <p><strong>Đăng ký học IC3 GS6 như thế nào?</strong><br>Liên hệ Zalo/Hotline <strong>0912888360</strong> để được tư vấn miễn phí cấp độ IC3 phù hợp với yêu cầu chuẩn đầu ra của trường bạn.</p>
        `
    },
    {
        slug: "nen-hoc-mos-365-hay-mos-2019",
        title: "Nên Học MOS 365 Hay MOS 2019? Lưu Ý Quan Trọng Trước Khi Đăng Ký Thi",
        seoDescription: "Nên chọn thi MOS 365 hay MOS 2019? So sánh chi tiết 2 phiên bản và lưu ý một số trường như Đại học Hàng Hải Việt Nam hiện chỉ chấp nhận MOS 2019.",
        publishedDate: "2026-07-24",
        excerpt: "MOS 365 và MOS 2019 khác nhau ở đâu, nên chọn phiên bản nào? Đặc biệt lưu ý: một số trường như Đại học Hàng Hải Việt Nam hiện chỉ công nhận MOS 2019.",
        contentHtml: `
            <p>Khi đăng ký thi chứng chỉ MOS, rất nhiều bạn phân vân không biết nên chọn <strong>MOS 365</strong> hay <strong>MOS 2019</strong>. Hai phiên bản này giống nhau phần lớn về nội dung, nhưng lại có một khác biệt quan trọng liên quan đến việc xét chuẩn đầu ra mà không phải ai cũng biết trước khi đăng ký thi. Bài viết này sẽ giúp bạn chọn đúng ngay từ đầu, tránh mất thời gian và chi phí thi lại.</p>

            <h2>MOS 365 và MOS 2019 khác nhau ở điểm nào?</h2>
            <p>Cả hai đều là chứng chỉ <strong>Microsoft Office Specialist</strong>, đánh giá cùng một bộ kỹ năng cốt lõi trên Word, Excel, PowerPoint, chỉ khác nhau ở phiên bản giao diện phần mềm mà đề thi mô phỏng:</p>
            <ul>
                <li><strong>MOS 2019</strong>: đề thi bám theo giao diện và tính năng của bộ Office 2019 — phiên bản cài đặt cố định (offline), không tự động cập nhật tính năng mới.</li>
                <li><strong>MOS 365</strong>: đề thi bám theo giao diện và tính năng của Microsoft 365 Apps — phiên bản dùng theo hình thức thuê bao, thường xuyên được Microsoft cập nhật thêm tính năng mới.</li>
            </ul>
            <p>Về độ khó, thang điểm (tối đa 1000, đạt từ 700 trở lên) và cấu trúc bài thi Multi-Project, hai phiên bản gần như tương đương nhau, không phiên bản nào khó hơn hẳn phiên bản còn lại.</p>

            <h2>So sánh chi tiết theo từng môn thi: Word, Excel, PowerPoint</h2>
            <p>Mỗi môn thi MOS đều có 2 mã bài thi riêng cho 2 phiên bản — đây là căn cứ chính xác nhất để biết mình đang đăng ký đúng phiên bản hay không:</p>
            <table>
                <thead>
                    <tr>
                        <th>Môn thi</th>
                        <th>Mã bài thi 2019</th>
                        <th>Mã bài thi 365</th>
                        <th>Điểm khác biệt về nội dung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Word</strong></td>
                        <td>MO-100</td>
                        <td>MO-110</td>
                        <td>Cấu trúc domain kỹ năng gần như giống nhau (quản lý tài liệu, định dạng văn bản/đoạn/mục, bảng biểu, tham chiếu, hình ảnh, cộng tác). Bản 365 mô phỏng đúng giao diện Word hiện hành và có thêm thao tác liên quan cộng tác/chia sẻ tài liệu trên nền tảng đám mây.</td>
                    </tr>
                    <tr>
                        <td><strong>Excel</strong></td>
                        <td>MO-200</td>
                        <td>MO-210</td>
                        <td>Đây là môn có khác biệt rõ nhất: bản <strong>365 (MO-210) có thêm 2 hàm mảng động (dynamic array)</strong> là <strong>SORT</strong> và <strong>UNIQUE</strong> trong phạm vi đề thi — 2 hàm này <strong>không nằm trong nội dung thi MO-200 (2019)</strong>. Phần còn lại (quản lý workbook, ô/vùng dữ liệu, bảng, công thức cơ bản, biểu đồ) tương đồng giữa 2 phiên bản.</td>
                    </tr>
                    <tr>
                        <td><strong>PowerPoint</strong></td>
                        <td>MO-300</td>
                        <td>MO-310</td>
                        <td>Cấu trúc domain kỹ năng tương đồng (quản lý bài trình chiếu, định dạng slide/văn bản/hình ảnh, bảng biểu/biểu đồ/SmartArt, hiệu ứng chuyển slide và hoạt hình). Khác biệt chủ yếu ở giao diện chương trình theo đúng phiên bản đang thi.</td>
                    </tr>
                </tbody>
            </table>
            <p>Có thể thấy, <strong>Excel là môn có sự khác biệt nội dung rõ ràng nhất</strong> giữa 2 phiên bản (do liên quan trực tiếp đến hàm tính toán), trong khi Word và PowerPoint chủ yếu khác nhau ở giao diện phần mềm và một số thao tác cộng tác trên nền tảng 365. Vì vậy nếu bạn thi Excel, cần đặc biệt lưu ý xác nhận đúng phiên bản trước khi ôn tập, tránh học nhầm hàm không có trong đề.</p>

            <h2>Lưu ý quan trọng: không phải trường nào cũng chấp nhận cả 2 phiên bản</h2>
            <p>Đây là điểm nhiều bạn dễ bỏ sót nhất. Trên thực tế, <strong>không phải mọi trường đại học đều công nhận cả MOS 2019 lẫn MOS 365</strong> cho chuẩn đầu ra tin học — một số trường chỉ ghi rõ trong quyết định chuẩn đầu ra là chấp nhận <strong>MOS 2019</strong>, và <strong>chưa cập nhật công nhận MOS 365</strong>.</p>
            <p>Ví dụ cụ thể: hiện tại <strong>Đại học Hàng Hải Việt Nam</strong> là một trong những trường yêu cầu sinh viên nộp chứng chỉ <strong>MOS 2019</strong> để xét chuẩn đầu ra, và <strong>chưa chấp thuận chứng chỉ MOS 365</strong>. Nếu sinh viên trường này thi nhầm sang MOS 365, dù đạt điểm cao vẫn có nguy cơ không được nhà trường công nhận, phải thi lại đúng phiên bản MOS 2019 — vừa mất thêm lệ phí thi, vừa mất thêm thời gian ôn tập.</p>

            <h2>Vậy nên chọn thi MOS 365 hay MOS 2019?</h2>
            <p>Nguyên tắc quan trọng nhất: <strong>không tự chọn theo cảm tính hay theo phiên bản đang phổ biến</strong>, mà phải đối chiếu chính xác với văn bản quy định chuẩn đầu ra tin học của trường bạn đang theo học, thường được đăng trên website của phòng đào tạo hoặc thông báo chuẩn đầu ra. Cụ thể:</p>
            <ul>
                <li>Nếu quyết định của trường ghi rõ <strong>chỉ chấp nhận MOS 2019</strong> (như Đại học Hàng Hải Việt Nam) → bắt buộc phải thi đúng MOS 2019, thi MOS 365 sẽ không được công nhận.</li>
                <li>Nếu trường chấp nhận <strong>cả hai phiên bản</strong> → có thể chọn phiên bản nào thuận tiện hơn, ví dụ chọn MOS 365 nếu máy tính cá nhân đang cài Microsoft 365 sẵn.</li>
                <li>Nếu không chắc chắn hoặc quyết định của trường không ghi rõ phiên bản → nên liên hệ trực tiếp phòng đào tạo hoặc trung tâm luyện thi để được tư vấn trước khi đăng ký, tránh thi nhầm phiên bản.</li>
            </ul>

            <h2>Học ở đâu để chắc chắn thi đúng phiên bản trường yêu cầu?</h2>
            <p>Tại <strong>MOS360 - Trung tâm tin học MOS &amp; IC3 &amp; AI</strong> (số 57 Lê Văn Thuyết A, phường Lê Chân, Hải Phòng), học viên được tư vấn kỹ ngay từ đầu để xác định đúng phiên bản MOS phù hợp với quy định chuẩn đầu ra của từng trường, tránh tình trạng thi xong không được công nhận.</p>
            <p>Dù bạn chọn ôn luyện <strong>MOS 2019</strong> hay <strong>MOS 365</strong>, MOS360 đều cam kết:</p>
            <ul>
                <li>Luyện tập <strong>100% bằng phần mềm mô phỏng</strong> đúng giao diện phiên bản bạn đăng ký thi</li>
                <li>Giáo viên <strong>hướng dẫn 1:1</strong>, hỗ trợ sát sao từng học viên thay vì học chung chung theo nhóm đông</li>
                <li>Học <strong>không giới hạn số lần</strong>, chủ động thời gian ôn luyện</li>
                <li><strong>Cam kết đầu ra 700+ điểm bằng văn bản</strong>, hoàn lại 100% lệ phí thi nếu chưa đạt</li>
                <li>Học phí chỉ <strong>400.000đ/môn</strong>, áp dụng như nhau cho cả MOS 2019 và MOS 365</li>
            </ul>
            <p>Mục tiêu của MOS360 không chỉ là giúp học viên thi đạt điểm cao, mà là giúp học viên thi <strong>đúng ngay từ đầu</strong> — đúng phiên bản, đúng yêu cầu của trường — để không phải tốn thêm thời gian và chi phí thi lại.</p>

            <h2>Câu hỏi thường gặp</h2>
            <p><strong>Làm sao biết trường mình yêu cầu MOS 2019 hay MOS 365?</strong><br>Bạn nên tra cứu quyết định/thông báo chuẩn đầu ra tin học chính thức trên website phòng đào tạo của trường. Nếu không tìm thấy thông tin rõ ràng, nên liên hệ trực tiếp phòng đào tạo hoặc trung tâm luyện thi để được kiểm tra trước khi đăng ký.</p>
            <p><strong>Trường không ghi rõ phiên bản thì có phải thi cả 2 không?</strong><br>Không nhất thiết. Trong trường hợp này bạn nên hỏi trực tiếp phòng đào tạo để xác nhận, tránh thi cả 2 lần gây tốn kém không cần thiết.</p>
            <p><strong>MOS360 có tư vấn được chính xác phiên bản cần thi cho từng trường không?</strong><br>Có. Liên hệ Zalo/Hotline <strong>0912888360</strong> để được tư vấn miễn phí phiên bản MOS phù hợp với quy định chuẩn đầu ra của trường bạn, tránh thi nhầm phiên bản.</p>
        `
    }
];

// ── Trang danh sách /blog ───────────────────────────────────
export function getBlogListUI() {
    const cards = BLOG_POSTS.map((p) => `
        <a href="/blog/${p.slug}" class="section-card" style="display:block; text-decoration:none; margin-bottom:16px; transition:transform .15s;">
            <div style="font-size:0.75rem; color:var(--muted); font-weight:700; margin-bottom:6px;">${formatDateVi(p.publishedDate)}</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--text); margin-bottom:8px; line-height:1.4;">${p.title}</div>
            <div style="font-size:0.88rem; color:var(--muted); line-height:1.6;">${p.excerpt}</div>
            <div style="margin-top:12px; font-size:0.82rem; font-weight:700; color:var(--primary);">Đọc tiếp →</div>
        </a>`).join("");

    return `
    <div style="max-width:720px; margin:36px auto 60px; padding:0 16px;">
        <div style="text-align:center; margin-bottom:32px;">
            <h1 style="font-size:1.7rem; font-weight:800; color:var(--text); margin-bottom:8px;">Blog MOS360</h1>
            <p style="color:var(--muted); font-size:0.9rem;">Chia sẻ kinh nghiệm thi MOS, IC3 và chuẩn đầu ra tin học</p>
        </div>
        ${cards}
    </div>`;
}

// ── Trang chi tiết /blog/:slug ──────────────────────────────
export function getBlogPostUI(post) {
    return `
    <div style="max-width:720px; margin:36px auto 60px; padding:0 16px;">
        <a href="/blog" style="font-size:0.82rem; color:var(--muted); text-decoration:none; font-weight:700;">← Tất cả bài viết</a>
        <h1 style="font-size:1.6rem; font-weight:800; color:var(--text); margin:14px 0 8px; line-height:1.4;">${post.title}</h1>
        <div style="font-size:0.78rem; color:var(--muted); font-weight:700; margin-bottom:24px;">${formatDateVi(post.publishedDate)}</div>
        <div class="blog-article" style="font-size:0.95rem; line-height:1.8; color:var(--text);">
            ${post.contentHtml}
        </div>
        <div class="section-card" style="margin-top:32px; text-align:center; padding:28px;">
            <div style="font-weight:800; font-size:1.05rem; margin-bottom:8px; color:var(--text);">Cần tư vấn lộ trình học phù hợp?</div>
            <div style="color:var(--muted); font-size:0.85rem; margin-bottom:16px;">Liên hệ MOS360 qua Zalo/Hotline để được tư vấn miễn phí</div>
            <a href="https://zalo.me/0912888360" class="btn-action" style="max-width:260px; margin:0 auto;">💬 Liên hệ Zalo 0912888360</a>
        </div>
    </div>
    <style>
        .blog-article h2 { font-size:1.2rem; font-weight:800; color:var(--text); margin:28px 0 12px; }
        .blog-article p { margin-bottom:14px; }
        .blog-article ul, .blog-article ol { margin:0 0 14px 22px; }
        .blog-article li { margin-bottom:6px; }
        .blog-article table { width:100%; border-collapse:collapse; margin:8px 0 18px; font-size:0.85rem; }
        .blog-article th, .blog-article td { border:1px solid #e2e2e2; padding:8px 10px; text-align:left; vertical-align:top; }
        .blog-article th { background:rgba(0,0,0,0.035); font-weight:800; }
        @media (max-width:520px) { .blog-article table, .blog-article thead, .blog-article tbody, .blog-article th, .blog-article td, .blog-article tr { display:block; } .blog-article thead tr { display:none; } .blog-article td { border:none; border-bottom:1px solid #eee; padding:6px 0; } .blog-article td:first-child { font-weight:800; padding-top:12px; } }
    </style>`;
}

function formatDateVi(isoDate) {
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y}`;
}