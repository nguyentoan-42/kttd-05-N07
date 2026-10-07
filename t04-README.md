# Tuần 4 – Smoke test với Pytest và Selenium

**Sinh viên thực hiện:** Nguyễn Bảo Phúc  
**Mã SV:** A51738  
**Lớp / Nhóm:** Kiểm thử phần mềm (N07)  

---

## 1. Giới thiệu
Bài kiểm tra Smoke Test sử dụng Selenium và Pytest để tự động kiểm tra tính khả dụng của mục tiêu trang web The Internet.

## 2. Yêu cầu
- Python 3 và pip.
- Trình duyệt Google Chrome (phiên bản mới nhất).

## 3. Cách cài đặt Pytest và Selenium
*Lưu ý: Phải kích hoạt môi trường ảo trước khi cài đặt thư viện hoặc chạy pytest.*

– **Tạo và kích hoạt môi trường ảo:**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
– Cài thư viện từ file requirements:

PowerShell
pip install -r tuan-04/requirements.txt
 4. Cách chạy
PowerShell
pytest tuan-04/test_smoke.py -v
## 5. Nội dung kiểm thử
Dữ liệu đầu vào: https://the-internet.herokuapp.com/

Kết quả mong đợi: Tiêu đề trang (title) hiển thị đúng là The Internet.

## 6. Kết quả
Ca kiểm thử đạt: 1 passed trong 34.98 giây (All assertions Passed).
