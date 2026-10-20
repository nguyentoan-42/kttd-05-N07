"""W4 - Phần 1: Nhiều cửa sổ (/windows).

Tài liệu: 3.4 Windows and frames, 5.1 Explicit Waits.
Hàm chính: window_handles, current_window_handle, switch_to.window, switch_to.new_window.
"""
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from helpers import TIMEOUT, open_and_switch_to_new_window


def _heading(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((By.TAG_NAME, "h3"))
    ).text


def _click_here(driver):
    driver.find_element(By.LINK_TEXT, "Click Here").click()


def test_mo_cua_so_moi_va_quay_ve(driver, base_url):
    driver.get(f"{base_url}/windows")
    original = driver.current_window_handle
    assert _heading(driver) == "Opening a new window"

    new_handle = open_and_switch_to_new_window(driver, lambda: _click_here(driver))

    assert driver.current_window_handle == new_handle
    WebDriverWait(driver, TIMEOUT).until(EC.title_is("New Window"))
    assert _heading(driver) == "New Window"
    assert "/windows/new" in driver.current_url

    # Đóng cửa sổ mới. Sau close() driver KHÔNG tự quay về, phải switch thủ công.
    driver.close()
    driver.switch_to.window(original)

    assert len(driver.window_handles) == 1
    assert _heading(driver) == "Opening a new window"


def test_chuyen_qua_lai_giua_hai_cua_so(driver, base_url):
    driver.get(f"{base_url}/windows")
    original = driver.current_window_handle

    new_handle = open_and_switch_to_new_window(driver, lambda: _click_here(driver))
    assert _heading(driver) == "New Window"

    driver.switch_to.window(original)
    assert driver.current_window_handle == original
    assert _heading(driver) == "Opening a new window"

    driver.switch_to.window(new_handle)
    assert _heading(driver) == "New Window"
    assert len(driver.window_handles) == 2


def test_mo_nhieu_cua_so(driver, base_url):
    driver.get(f"{base_url}/windows")
    original = driver.current_window_handle

    for _ in range(3):
        driver.switch_to.window(original)  # luôn click từ cửa sổ gốc
        open_and_switch_to_new_window(driver, lambda: _click_here(driver))

    assert len(driver.window_handles) == 4

    for handle in driver.window_handles:
        driver.switch_to.window(handle)
        expected = "Opening a new window" if handle == original else "New Window"
        assert _heading(driver) == expected


def test_mo_tab_moi_bang_switch_to_new_window(driver, base_url):
    """Selenium 4: tự mở tab mới bằng code, không cần click link."""
    driver.get(f"{base_url}/windows")
    original = driver.current_window_handle

    driver.switch_to.new_window("tab")
    driver.get(f"{base_url}/windows/new")

    assert driver.current_window_handle != original
    assert _heading(driver) == "New Window"
    assert len(driver.window_handles) == 2
