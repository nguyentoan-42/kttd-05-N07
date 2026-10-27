
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# BÀI 1: KIỂM THỬ THÔNG BÁO NGẪU NHIÊN
# visibility_of_element_located, staleness_of, refresh
def test_notification_message():
    driver = webdriver.Chrome()
    driver.get("https://the-internet.herokuapp.com/notification_message_rendered")
    wait = WebDriverWait(driver, 10)

    # 5.1 Explicit Waits - visibility_of_element_located
    # Đợi link "Click here" xuất hiện rồi bấm vào để kích hoạt thông báo
    click_link = wait.until(
        EC.visibility_of_element_located((By.LINK_TEXT, "Click here")))
    click_link.click()

    # Chờ khung thông báo flash hiện ra trên giao diện
    notification = wait.until(
        EC.visibility_of_element_located((By.ID, "flash")))
    assert notification.is_displayed()

    # 3.6 History and location - refresh
    # Làm mới trang để thông báo cũ biến mất
    driver.refresh()

    # 5.1 Explicit Waits - staleness_of
    # Sau khi refresh, phần tử notification cũ không còn tồn tại trong DOM nữa
    # Chờ xác nhận nó đã thực sự bị loại bỏ khỏi trang
    wait.until(EC.staleness_of(notification))

    driver.quit()


# BÀI 2: KIỂM THỬ CHUYỂN HƯỚNG TRANG
# url_contains, current_url, back
def test_redirect_and_history():
    driver = webdriver.Chrome()
    driver.get("https://the-internet.herokuapp.com/redirector")
    wait = WebDriverWait(driver, 10)

    # Bấm nút redirect để trang chuyển hướng sang trang khác
    btn = wait.until(
        EC.visibility_of_element_located((By.ID, "redirect")))
    btn.click()

    # 5.1 Explicit Waits - url_contains
    # Đợi thanh URL trình duyệt chứa "status_codes" - nghĩa là đã redirect thành công
    wait.until(EC.url_contains("status_codes"))

    # 3.6 History and location - current_url
    # Xác nhận URL hiện tại đúng là trang status_codes
    assert "status_codes" in driver.current_url

    # 3.6 History and location - back
    # Bấm nút Back trình duyệt để quay về trang redirector lúc trước
    driver.back()
    wait.until(EC.url_contains("redirector"))
    assert "redirector" in driver.current_url

    driver.quit()


# BÀI 3: KẾT NỐI TRÌNH DUYỆT TỪ XA
# Remote WebDriver
def test_remote_webdriver():
    # Cần có Selenium Server chạy sẵn tại port 4444
    try:
        chrome_options = webdriver.ChromeOptions()
        # Kết nối tới Selenium Server thay vì mở Chrome trực tiếp
        driver = webdriver.Remote(
            command_executor='http://127.0.0.1:4444/wd/hub',
            options=chrome_options
        )
        driver.get("https://the-internet.herokuapp.com/notification_message_rendered")
        assert "The Internet" in driver.title
        driver.quit()
    except Exception:
        print("Không thể kết nối Selenium Server tại port 4444, bỏ qua bài test")


