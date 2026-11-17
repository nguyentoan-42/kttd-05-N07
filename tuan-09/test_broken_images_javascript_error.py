import os
import pytest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


BASE_URL = "https://the-internet.herokuapp.com"


@pytest.fixture
def driver():
    """
    Tao Chrome WebDriver.
    - Mac dinh: chay Chrome local.
    - Neu co SELENIUM_REMOTE_URL: chay qua Selenium Remote WebDriver.
    Dong thoi bat Browser Console Logs de kiem tra loi JavaScript.
    """
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")

    # Bat thu thap log tu Chrome Browser Console
    chrome_options.set_capability(
        "goog:loggingPrefs",
        {"browser": "ALL"}
    )

    remote_url = os.getenv("SELENIUM_REMOTE_URL")

    if remote_url:
        browser = webdriver.Remote(
            command_executor=remote_url,
            options=chrome_options
        )
    else:
        browser = webdriver.Chrome(options=chrome_options)

    yield browser
    browser.quit()


def test_broken_images(driver):
    """
    Kiem thu trang Broken Images:
    1. Mo trang /broken_images.
    2. Tim tat ca the img bang By.TAG_NAME.
    3. Lay src cua tung anh bang get_attribute().
    4. Dung execute_script() kiem tra naturalWidth.
       naturalWidth == 0: anh khong tai duoc.
    """
    driver.get(f"{BASE_URL}/broken_images")

    images = driver.find_elements(By.TAG_NAME, "img")

    assert len(images) > 0, "Trang khong co the img nao de kiem tra."

    broken_images = []

    for index, image in enumerate(images, start=1):
        # image la mot WebElement
        image_src = image.get_attribute("src")

        # naturalWidth = 0 thuong cho biet anh bi loi/khong tai duoc
        natural_width = driver.execute_script(
            "return arguments[0].naturalWidth;",
            image
        )

        print(
            f"Image {index}: src={image_src}, "
            f"naturalWidth={natural_width}"
        )

        if natural_width == 0:
            broken_images.append(image_src)

    print(f"\nTong so anh: {len(images)}")
    print(f"So anh bi loi: {len(broken_images)}")

    for src in broken_images:
        print(f"Broken image: {src}")

    # Trang demo nay duoc tao ra de co anh bi loi
    assert len(broken_images) > 0, (
        "Khong phat hien anh bi loi. "
        "Co the trang da thay doi hoac anh chua tai xong."
    )


def test_javascript_error(driver):
    """
    Kiem thu loi JavaScript:
    1. Mo trang /javascript_error.
    2. Lay Browser Console Logs bang get_log('browser').
    3. Loc cac log co muc SEVERE.
    4. Kiem tra co loi JavaScript duoc ghi nhan hay khong.
    """
    driver.get(f"{BASE_URL}/javascript_error")

    # Lay log tu Chrome Browser Console
    browser_logs = driver.get_log("browser")

    print("\n===== BROWSER CONSOLE LOGS =====")

    for log in browser_logs:
        print(
            f"Level: {log.get('level')} | "
            f"Message: {log.get('message')}"
        )

    # Loc cac log loi nghiem trong
    severe_logs = [
        log for log in browser_logs
        if log.get("level") == "SEVERE"
    ]

    print(f"\nSo loi SEVERE: {len(severe_logs)}")

    for error in severe_logs:
        print(f"JavaScript error: {error.get('message')}")

    assert len(severe_logs) > 0, (
        "Khong tim thay loi SEVERE trong Browser Console. "
        "Hay kiem tra lai Chrome logging capability."
    )
