"""W4 - Phần 3: Lịch sử trình duyệt và cookie.

Tài liệu: 3.6 History and location, 3.7 Cookies.
"""
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from helpers import TIMEOUT, read_frame_text


def test_back_forward_refresh(driver, base_url):
    wait = WebDriverWait(driver, TIMEOUT)

    driver.get(f"{base_url}/windows")
    driver.get(f"{base_url}/nested_frames")
    wait.until(EC.url_contains("/nested_frames"))

    driver.back()
    wait.until(EC.url_contains("/windows"))

    driver.forward()
    wait.until(EC.url_contains("/nested_frames"))

    driver.refresh()
    # Sau refresh, frame được tải lại nhưng nội dung không đổi
    assert read_frame_text(driver, "frame-bottom") == "BOTTOM"


def test_them_doc_xoa_cookie(driver, base_url):
    # Phải mở trang thuộc đúng domain trước khi thêm cookie
    driver.get(f"{base_url}/windows")
    driver.delete_all_cookies()

    driver.add_cookie({"name": "nhom", "value": "nhom5"})
    driver.add_cookie({"name": "bai", "value": "W4"})

    assert driver.get_cookie("nhom")["value"] == "nhom5"
    names = {c["name"] for c in driver.get_cookies()}
    assert {"nhom", "bai"} <= names

    driver.delete_cookie("nhom")
    assert driver.get_cookie("nhom") is None

    driver.delete_all_cookies()
    assert driver.get_cookies() == []


def test_cookie_dung_chung_giua_cac_cua_so(driver, base_url):
    """Cookie thuộc về domain, nên cửa sổ/tab mới cùng domain cũng đọc được."""
    driver.get(f"{base_url}/windows")
    driver.add_cookie({"name": "phien", "value": "abc123"})

    driver.switch_to.new_window("tab")
    driver.get(f"{base_url}/windows/new")

    assert driver.get_cookie("phien")["value"] == "abc123"
