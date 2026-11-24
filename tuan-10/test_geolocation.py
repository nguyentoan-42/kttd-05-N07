import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# BÀI 1: ĐỊNH VỊ GIẢ LẬP (GEOLOCATION)
# ChromeOptions, execute_cdp_cmd (Browser.grantPermissions, Emulation.setGeolocationOverride), click, WebDriverWait, text
def test_geolocation_override():
    # 7.17 Chrome Options - ChromeOptions
    # Khởi tạo đối tượng cấu hình cho trình duyệt Chrome
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)

    # execute_cdp_cmd - Browser.grantPermissions
    # Cấp sẵn quyền truy cập vị trí (geolocation)
    driver.execute_cdp_cmd(
        "Browser.grantPermissions",
        {"permissions": ["geolocation"]}
    )

    # execute_cdp_cmd - Emulation.setGeolocationOverride
    # Giả lập tọa độ GPS (ví dụ: Hà Nội với vĩ độ 21.0285, kinh độ 105.8542)
    driver.execute_cdp_cmd(
        "Emulation.setGeolocationOverride",
        {
            "latitude": 21.0285,
            "longitude": 105.8542,
            "accuracy": 100
        }
    )

    driver.get("https://the-internet.herokuapp.com/geolocation")

    # Tìm nút "Where am I?" rồi bấm vào để trang web bắt đầu lấy tọa độ
    driver.find_element(By.TAG_NAME, "button").click()

    # 5.1 Explicit Waits - WebDriverWait
    # Chờ tối đa 10 giây cho đến khi thẻ hiển thị vĩ độ có id="lat-value" xuất hiện
    wait = WebDriverWait(driver, 10)
    lat_element = wait.until(
        EC.visibility_of_element_located((By.ID, "lat-value"))
    )
    long_element = driver.find_element(By.ID, "long-value")

    # Lấy nội dung chữ hiển thị trên màn hình và kiểm tra xem có khớp tọa độ đã giả lập không
    assert "21.0285" in lat_element.text
    assert "105.8542" in long_element.text

    driver.quit()


# BÀI 2: KẾT NỐI TỪ XA
# 7.19 Remote WebDriver, ChromeOptions
def test_remote_webdriver():
    # Phải có Selenium Server đang chạy ở port 4444 thì đoạn này mới hoạt động
    try:
        # 7.17 Chrome Options - ChromeOptions
        options = webdriver.ChromeOptions()

        # 7.19 Remote WebDriver
        # Thay vì driver = webdriver.Chrome(), ta kết nối tới máy chủ từ xa
        driver = webdriver.Remote(
            command_executor='http://127.0.0.1:4444/wd/hub',
            options=options
        )
        driver.get("https://the-internet.herokuapp.com/geolocation")
        assert "The Internet" in driver.title
        driver.quit()
    except Exception:
        print("Bỏ qua bài test này vì không có Selenium Server port 4444")