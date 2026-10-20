# W4 – Nhiều cửa sổ & frame lồng nhau (Selenium + pytest)

Bài tập môn Kiểm thử phần mềm – Nhóm 5.

- **Trang thực hành:** <https://the-internet.herokuapp.com/windows> và <https://the-internet.herokuapp.com/nested_frames>
- **Mục tài liệu selenium-python:** 3.4 Windows and frames · 3.6 History and location · 3.7 Cookies · 7.19 Remote WebDriver · 5.1 Explicit Waits · 7.1 Exceptions
- **Hàm chính:** `window_handles`, `switch_to.window`, `switch_to.frame`, `switch_to.default_content`, `EC.frame_to_be_available_and_switch_to_it`

## Cấu trúc thư mục

```
W4_windows_frames/
├── conftest.py                  # fixture driver, tuỳ chọn --headless, --remote-url
├── helpers.py                   # hàm dùng chung: mở & chuyển cửa sổ, đi vào frame
├── pytest.ini
├── requirements.txt
├── tests/
│   ├── test_windows.py          # 3.4 – nhiều cửa sổ (4 test)
│   ├── test_nested_frames.py    # 3.4 – frame lồng nhau (8 test)
│   ├── test_history_cookies.py  # 3.6, 3.7 – lịch sử, cookie (3 test)
│   └── test_exceptions.py       # 7.1, 5.1 – các lỗi thường gặp (5 test)
└── mock_site/                   # bản sao 2 trang để chạy khi không có mạng
```



## Chạy test

```bash
python -m pytest                       # chạy tất cả, có mở Chrome
python -m pytest --headless            # chạy ẩn trình duyệt
python -m pytest tests/test_windows.py # chạy 1 file
python -m pytest -k frame              # chạy test có chữ "frame" trong tên
python -m pytest --html=report.html --self-contained-html   # xuất báo cáo HTML
```

**Chạy không cần mạng** (dùng `mock_site`):

```bash
cd mock_site && python -m http.server 8765      # mở 1 terminal riêng
# terminal khác, tại thư mục W4_windows_frames:
set BASE_URL=http://localhost:8765              # PowerShell: $env:BASE_URL="http://localhost:8765"
python -m pytest
```

**Remote WebDriver (7.19)** – chạy trên Selenium Grid bằng Docker:

```bash
docker run -d -p 4444:4444 --shm-size=2g selenium/standalone-chrome
python -m pytest --remote-url http://localhost:4444
```

## Kết quả chạy

```
collected 20 items
tests/test_exceptions.py ....................... 5 passed
tests/test_history_cookies.py .................. 3 passed
tests/test_nested_frames.py .................... 8 passed
tests/test_windows.py .......................... 4 passed
============================= 20 passed in ~17s ==============================
```

(Chạy với Chrome headless trên bản sao cục bộ `mock_site`. Khi trình bày, nhóm chụp lại kết quả chạy trên trang thật.)

## Tóm tắt kiến thức

### 3.4 Windows and frames

Mỗi cửa sổ/tab có một **handle** (chuỗi định danh). Selenium chỉ điều khiển **một** cửa sổ tại một thời điểm, nên phải tự chuyển.

| Hàm | Ý nghĩa |
|---|---|
| `driver.current_window_handle` | handle cửa sổ đang điều khiển |
| `driver.window_handles` | danh sách handle tất cả cửa sổ đang mở |
| `driver.switch_to.window(h)` | chuyển sang cửa sổ `h` |
| `driver.switch_to.new_window("tab")` | (Selenium 4) mở tab mới và chuyển sang luôn |
| `driver.close()` | đóng cửa sổ hiện tại (driver **không** tự quay về) |
| `driver.quit()` | đóng toàn bộ trình duyệt |

Frame là trang HTML lồng trong trang khác. Muốn tìm phần tử trong frame phải **vào frame trước**.

| Hàm | Ý nghĩa |
|---|---|
| `driver.switch_to.frame(x)` | vào frame theo name/id, chỉ số, hoặc WebElement |
| `driver.switch_to.parent_frame()` | lùi ra 1 cấp |
| `driver.switch_to.default_content()` | về thẳng trang gốc |

Cấu trúc `/nested_frames`: `frame-top` chứa `frame-left`, `frame-middle`, `frame-right`; `frame-bottom` nằm ngang hàng với `frame-top`.

### 3.6 History and location
`driver.back()`, `driver.forward()`, `driver.refresh()`, `driver.current_url`.

### 3.7 Cookies
`add_cookie({...})`, `get_cookie(name)`, `get_cookies()`, `delete_cookie(name)`, `delete_all_cookies()`. Phải mở trang thuộc đúng domain trước khi thêm cookie. Cookie dùng chung giữa các tab cùng domain.

### 5.1 Explicit Waits
`WebDriverWait(driver, 10).until(điều_kiện)` chờ đến khi điều kiện đúng hoặc hết giờ (ném `TimeoutException`). Điều kiện dùng trong bài:
- `EC.frame_to_be_available_and_switch_to_it(frame)` – chờ frame tải xong rồi vào luôn
- `EC.number_of_windows_to_be(n)` – chờ đủ n cửa sổ
- `EC.title_is(...)`, `EC.url_contains(...)`, `EC.visibility_of_element_located(...)`

Không nên trộn implicit wait với explicit wait (thời gian chờ có thể cộng dồn).

### 7.1 Exceptions
| Exception | Khi nào xảy ra (trong bài) |
|---|---|
| `NoSuchFrameException` | sai tên frame, hoặc quên `default_content()` trước khi sang frame khác cấp |
| `NoSuchElementException` | tìm phần tử nằm trong frame khi chưa vào frame |
| `NoSuchWindowException` | dùng driver sau khi `close()` mà chưa chuyển cửa sổ |
| `TimeoutException` | `WebDriverWait` hết giờ mà điều kiện chưa đúng |

### 7.19 Remote WebDriver
`webdriver.Remote(command_executor="http://host:4444", options=options)` điều khiển trình duyệt chạy ở máy khác (Selenium Grid). Code test giữ nguyên, chỉ đổi cách tạo driver (xem `conftest.py`).

