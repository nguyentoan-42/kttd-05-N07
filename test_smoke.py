from selenium import webdriver

def test_smoke():
    #mo cua so trinh duyet Chrome
    driver = webdriver.Chrome()
    #mo trong web
    driver.get("http://the-internet.herokuapp.com/")
    #kiem tra tieu de cua trang web
    assert driver.title == "The Internet"
    #Dang trinh duyet
    driver.quit()
