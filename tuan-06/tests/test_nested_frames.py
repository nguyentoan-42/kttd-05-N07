"""W4 - Phần 2: Frame lồng nhau (/nested_frames).

Cấu trúc trang:
    trang gốc
    ├── frame-top
    │   ├── frame-left    -> "LEFT"
    │   ├── frame-middle  -> "MIDDLE" (trong <div id="content">)
    │   └── frame-right   -> "RIGHT"
    └── frame-bottom      -> "BOTTOM"

Tài liệu: 3.4 Windows and frames, 5.1 Explicit Waits.
Hàm chính: switch_to.frame, switch_to.parent_frame, switch_to.default_content,
EC.frame_to_be_available_and_switch_to_it.
"""
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from helpers import TIMEOUT, read_frame_text, switch_to_frame_path


@pytest.mark.parametrize(
    "frame_path, expected",
    [
        (("frame-top", "frame-left"), "LEFT"),
        (("frame-top", "frame-middle"), "MIDDLE"),
        (("frame-top", "frame-right"), "RIGHT"),
        (("frame-bottom",), "BOTTOM"),
    ],
    ids=["left", "middle", "right", "bottom"],
)
def test_doc_noi_dung_tung_frame(driver, base_url, frame_path, expected):
    driver.get(f"{base_url}/nested_frames")
    assert read_frame_text(driver, *frame_path) == expected


def test_frame_middle_theo_id_content(driver, base_url):
    driver.get(f"{base_url}/nested_frames")
    switch_to_frame_path(driver, "frame-top", "frame-middle")
    assert driver.find_element(By.ID, "content").text == "MIDDLE"
    driver.switch_to.default_content()


def test_parent_frame_lui_mot_cap(driver, base_url):
    """Từ frame-middle lùi về frame-top bằng parent_frame() rồi sang frame-right."""
    driver.get(f"{base_url}/nested_frames")
    wait = WebDriverWait(driver, TIMEOUT)

    switch_to_frame_path(driver, "frame-top", "frame-middle")
    assert driver.find_element(By.ID, "content").text == "MIDDLE"

    driver.switch_to.parent_frame()  # đang ở frame-top
    wait.until(EC.frame_to_be_available_and_switch_to_it("frame-right"))
    assert driver.find_element(By.TAG_NAME, "body").text.strip() == "RIGHT"
    driver.switch_to.default_content()


def test_vao_frame_bang_webelement(driver, base_url):
    """switch_to.frame nhận được cả WebElement, không chỉ tên/id."""
    driver.get(f"{base_url}/nested_frames")
    wait = WebDriverWait(driver, TIMEOUT)

    top = wait.until(EC.presence_of_element_located((By.NAME, "frame-top")))
    driver.switch_to.frame(top)
    left = driver.find_element(By.NAME, "frame-left")
    driver.switch_to.frame(left)

    assert driver.find_element(By.TAG_NAME, "body").text.strip() == "LEFT"
    driver.switch_to.default_content()


def test_default_content_ve_trang_goc(driver, base_url):
    driver.get(f"{base_url}/nested_frames")
    switch_to_frame_path(driver, "frame-top", "frame-middle")

    driver.switch_to.default_content()

    # Ở trang gốc chỉ thấy 2 frame cấp 1: frame-top và frame-bottom
    names = [f.get_attribute("name") for f in driver.find_elements(By.TAG_NAME, "frame")]
    assert names == ["frame-top", "frame-bottom"]
