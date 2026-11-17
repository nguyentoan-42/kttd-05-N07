
import pytest
import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service


# ==================================================
# CẤU HÌNH CỐC CỐC
# ==================================================

# Đường dẫn trình duyệt Cốc Cốc trên máy bạn
COCCOC_PATH = r"C:\Users\MCOM\AppData\Local\CocCoc\Browser\Application\browser.exe"

# Đường dẫn ChromeDriver sau khi tải và giải nén
CHROMEDRIVER_PATH = (
    r"C:\Users\MCOM\Documents\T06-Khai"
    r"\drivers\chromedriver.exe"
)


# ==================================================
# HÀM KHỞI TẠO TRÌNH DUYỆT CỐC CỐC
# ==================================================

def create_coccoc_driver():

    # Kiểm tra đường dẫn Cốc Cốc
    if not os.path.isfile(COCCOC_PATH):
        raise FileNotFoundError(
            f"Không tìm thấy Cốc Cốc: {COCCOC_PATH}"
        )

    # Kiểm tra ChromeDriver
    if not os.path.isfile(CHROMEDRIVER_PATH):
        raise FileNotFoundError(
            f"Không tìm thấy ChromeDriver: {CHROMEDRIVER_PATH}"
        )

    # Khởi tạo ChromeOptions
    options = webdriver.ChromeOptions()

    # Chỉ định trình duyệt Cốc Cốc
    options.binary_location = COCCOC_PATH

    # Bật ghi nhật ký Console
    options.set_capability(
        "goog:loggingPrefs",
        {"browser": "ALL"}
    )

    # Khởi tạo Service
    service = Service(CHROMEDRIVER_PATH)

    # Mở trình duyệt Cốc Cốc
    driver = webdriver.Chrome(
        service=service,
        options=options
    )

    return driver


# ==================================================
# BÀI 1: KIỂM TRA ẢNH HỎNG (BROKEN IMAGES)
# ==================================================

def test_broken_images():

    driver = create_coccoc_driver()

    try:
        # Truy cập trang kiểm tra ảnh hỏng
        driver.get(
            "https://the-internet.herokuapp.com/broken_images"
        )

        # Tìm tất cả thẻ img
        images = driver.find_elements(
            By.TAG_NAME,
            "img"
        )

        assert len(images) > 0, "Không tìm thấy ảnh trên trang"

        broken_images = []

        for img in images:

            # Lấy đường dẫn ảnh
            src = img.get_attribute("src")

            # Kiểm tra chiều rộng thực tế của ảnh
            natural_width = driver.execute_script(
                "return arguments[0].naturalWidth;",
                img
            )

            # Nếu chiều rộng bằng 0 thì ảnh bị hỏng
            if natural_width == 0:
                broken_images.append(src)

        print("\n===== BÀI 1: BROKEN IMAGES =====")

        print("Tổng số ảnh:", len(images))
        print("Số ảnh bị hỏng:", len(broken_images))

        for image in broken_images:
            print("Ảnh lỗi:", image)

        # Đảm bảo phát hiện ít nhất một ảnh hỏng
        assert len(broken_images) > 0, (
            "Không phát hiện ảnh bị hỏng"
        )

        print("KẾT QUẢ: TEST PASSED")

    finally:
        driver.quit()


# ==================================================
# BÀI 2: BẮT LỖI JAVASCRIPT TRONG CONSOLE
# ==================================================

def test_javascript_error():

    driver = create_coccoc_driver()

    try:
        # Truy cập trang có lỗi JavaScript
        driver.get(
            "https://the-internet.herokuapp.com/javascript_error"
        )

        # Lấy nhật ký Console của trình duyệt
        logs = driver.get_log("browser")

        # Lọc những lỗi nghiêm trọng
        severe_logs = [
            log for log in logs
            if log["level"] == "SEVERE"
        ]

        print("\n===== BÀI 2: JAVASCRIPT ERROR =====")

        print("Tổng số log:", len(logs))
        print("Số lỗi nghiêm trọng:", len(severe_logs))

        for log in severe_logs:
            print("JavaScript Error:", log["message"])

        # Kiểm tra có lỗi JavaScript hay không
        assert len(severe_logs) > 0, (
            "Không tìm thấy lỗi JavaScript SEVERE"
        )

        print("KẾT QUẢ: TEST PASSED")

    finally:
        driver.quit()


# ==================================================
# BÀI 3: KẾT NỐI REMOTE WEBDRIVER
# ==================================================

def test_remote_webdriver():

    options = webdriver.ChromeOptions()

    # Chỉ định Cốc Cốc trên máy Selenium Server
    options.binary_location = COCCOC_PATH

    # Bật ghi log Console
    options.set_capability(
        "goog:loggingPrefs",
        {"browser": "ALL"}
    )

    driver = None

    try:
        # Kết nối Selenium Server tại port 4444
        driver = webdriver.Remote(
            command_executor="http://127.0.0.1:4444/wd/hub",
            options=options
        )

        # Truy cập trang web
        driver.get(
            "https://the-internet.herokuapp.com/broken_images"
        )

        # Kiểm tra tiêu đề trang
        assert "The Internet" in driver.title

        print("\n===== BÀI 3: REMOTE WEBDRIVER =====")
        print("Tiêu đề trang:", driver.title)
        print("KẾT QUẢ: TEST PASSED")

    except Exception as e:

        pytest.skip(
            f"Bỏ qua bài test vì Selenium Server chưa chạy: {e}"
        )

    finally:
        if driver is not None:
            driver.quit()
