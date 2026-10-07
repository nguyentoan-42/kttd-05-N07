# 📝 Báo cáo Thu hoạch: Viết Script Selenium Đầu tiên

---

## 💡 Điều đã học

Qua bài đọc **"Write your first Selenium script"**, mình hiểu được:
- Một script Selenium cơ bản thường gồm các bước: **Khởi tạo trình duyệt** $\rightarrow$ **Mở trang web** $\rightarrow$ **Thực hiện thao tác / kiểm tra** $\rightarrow$ **Đóng trình duyệt**.
- Cách viết một bài kiểm thử đơn giản bằng ngôn ngữ **Python** kết hợp với thư viện **Selenium** và khung kiểm thử **PyTest**.

---

## ❓ Câu hỏi & Trả lời

### **Câu hỏi 1:**
> *Một script Selenium gồm những bước nào, và mỗi bước ứng với dòng nào trong bài kiểm thử của bạn?*

**Trả lời:**

Một script Selenium chuẩn bao gồm 4 bước chính, tương ứng với các dòng mã nguồn trong file `test_smoke.py` như sau:

| Bước thực hiện | Đoạn mã tương ứng (Code) | Chức năng |
| :--- | :--- | :--- |
| **1. Khởi tạo trình duyệt** | `driver = webdriver.Chrome()` | Mở ứng dụng trình duyệt Chrome lên |
| **2. Mở trang web** | `driver.get("https://the-internet.herokuapp.com/")` | Truy cập vào địa chỉ URL cần kiểm thử |
| **3. Kiểm tra kết quả** | `assert driver.title == "The Internet"` | Khẳng định/Xác minh tiêu đề trang web đúng với mong đợi |
| **4. Đóng trình duyệt** | `driver.quit()` | Giải phóng tài nguyên và đóng hoàn toàn cửa sổ trình duyệt |

---

### **Câu hỏi 2:**
> *`pytest` tự tìm bài kiểm thử dựa vào quy tắc đặt tên nào?*

**Trả lời:**

- **Quy tắc của PyTest:** 
  - PyTest tự động quét và tìm các file kiểm thử theo định dạng tên dạng: `test_*.py` hoặc `*_test.py`.
  - Bên trong file, các hàm kiểm thử bắt buộc phải đặt tên bắt đầu bằng `test_`.

- **Áp dụng trong bài làm:**
  - File kiểm thử được đặt tên là: `test_smoke.py`.
  - Hàm kiểm thử sử dụng tên: `test_smoke()`.
  
=> Nhờ tuân thủ đúng quy tắc đặt tên này, PyTest có thể tự động phát hiện và thực thi bài kiểm thử mà không gặp lỗi `Empty suite`.
