# Tuần 4 – Smoke test với Pytest và Selenium

## 1. Giới thiệu

Bài kiểm thử Smoke Test sử dụng Selenium để kiểm tra trang web The Internet.


## 2. Yêu cầu

- **Python 3** và `pip`.
- Trình duyệt **Google Chrome**.


## 3. Cách cài đặt Pytest và Selenium

**Lưu ý:** phải kích hoạt môi trường ảo trước khi cài thư viện hoặc chạy `pytest`.

**– Tạo và kích hoạt môi trường ảo**:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**– Cài thư viện**

```powershell
pip install -r tuan-04/requirements.txt
```

## 4. Cách chạy

```powershell
pytest tuan-04/test_smoke.py
```

## 5. Nội dung kiểm thử

- **Dữ liệu đầu vào:** `https://the-internet.herokuapp.com/`
- **Kết quả :** tiêu đề trang là: `The Internet`

## 6. Kết quả

Ca kiểm thử **đạt**: 1 passed trong 34,98 giây.
