# frontend/tests/e2e/test_user_flows.py

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def test_submit_form():
    driver = webdriver.Firefox()  # or whichever browser you're using

    # navigate to your app
    driver.get("http://localhost:3000/input")

    # find the input field and enter some text
    input_field = driver.find_element(by="id", value="weight")  # replace with the actual name of your input field
    input_field.clear()
    input_field.send_keys("55")

    # find the input field and enter some text
    input_field = driver.find_element(by="id", value="height")  # replace with the actual name of your input field
    input_field.clear()
    input_field.send_keys("11")

    # find the submit button and click it
    submit_button = driver.find_element(by="css selector", value=".btn.btn-primary")  # replace with the actual name of your submit button
    submit_button.click()

    # check that the new page has the expected content
    # check that the new page has the expected header
    assert "Results" in driver.page_source

    # check that the new page displays the user's information
    assert "Received user information: Age: , Sex: , Height: 11, Weight: 55, BMI: 4545.5" in driver.page_source


    driver.close()
