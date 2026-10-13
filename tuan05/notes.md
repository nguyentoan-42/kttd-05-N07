1. Điều đã học tuần này bằng lời của mình

  - Tuần này mình đã tìm hiểu về tự động hóa kiểm thử web với Selenium, cách viết file test_login.py để kiểm thử các trường hợp đăng nhập (thành công, sai mật khẩu, sai tên đăng nhập) và cách sử dụng công cụ DevTools để phân tích cấu trúc DOM.

2. Trả lời câu hỏi phần đọc

  - Câu hỏi 1 (Về cách xác định phần tử): Với ô tên đăng nhập ở trang /login, nên xác định bằng id (By.ID, "username") là ổn định nhất vì id là duy nhất trên trang và ít bị thay đổi khi giao diện cập nhật.
  - Câu hỏi 2 (Về thao tác nhập chữ): Muốn nhập chữ vào một ô thì dùng lệnh send_keys().
  - Câu hỏi 3 (Về cách xem phần tử trên DevTools): Để biết id của một ô nhập, ta nhấp chuột phải vào ô đó chọn Inspect (hoặc dùng phím F12), sau đó quan sát thẻ HTML tương ứng trong tab Elements để tìm thuộc tính id.

3. Nhật ký sử dụng AI

  - Đã hỏi AI điều gì: 3 trường hợp đăng nhập, cách sửa lỗi thiếu thư viện webdriver-manager trong VS Code, và cách trả lời các câu hỏi về định vị phần tử, thao tác nhập chữ và dùng DevTools.
  - Câu trả lời có đúng không: Câu trả lời chưa hoàn toàn chính xác, có khác cách làm so với video hướng dẫn
  - Mình hiểu thêm được gì: Mình hiểu thêm về cách xây dựng test case tự động với Python-Selenium, cách định vị phần tử tối ưu bằng id và cách sử dụng DevTools hiệu quả trong kiểm thử phần mềm.