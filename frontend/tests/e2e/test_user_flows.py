# frontend/tests/e2e/test_user_flows.py

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

import pytest
import re

@pytest.mark.frontend
def test_submit_form():
    driver = webdriver.Firefox()  # or whichever browser you're using

    # navigate to your app
    driver.get("http://localhost:3000/input")

    

    age_field = driver.find_element(By.ID, "age")
    age_field.clear()
    age_field.send_keys("25")

    sex_select = Select(driver.find_element(By.ID, "sex"))
    sex_select.select_by_visible_text("Male")

    # find the input field and enter some text
    input_field = driver.find_element(by="id", value="weight")  # replace with the actual name of your input field
    input_field.clear()
    input_field.send_keys("55")

    # find the input field and enter some text
    input_field = driver.find_element(by="id", value="height")  # replace with the actual name of your input field
    input_field.clear()
    input_field.send_keys("11")

    bloodData_field = driver.find_element(By.ID, "bloodData")
    bloodData_field.clear()
    bloodData_field.send_keys("Some blood data")

    familyHistoryData_field = driver.find_element(By.ID, "familyHistoryData")
    familyHistoryData_field.clear()
    familyHistoryData_field.send_keys("Some family history data")

    submit_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".btn.btn-primary"))
    )

    driver.execute_script("arguments[0].scrollIntoView(true);", submit_button)
    driver.execute_script("arguments[0].click();", submit_button)

    assert "Results" in driver.page_source
    driver.implicitly_wait(5) 
    div_element = driver.find_element(By.CSS_SELECTOR, '[data-testid="special-results-info"]')
    div_text = div_element.text
    # Extract the BMI value using regular expressions
    bmi_match = re.search(r'BMI: ([\d.]+)', div_text)
    extracted_bmi = bmi_match.group(1) if bmi_match else None

    # Assert the extracted BMI value
    expected_bmi = '4545.5'
    assert extracted_bmi == expected_bmi, f"Expected BMI: {expected_bmi}, Actual BMI: {extracted_bmi}"

    #assert "Received user information: Age: 25, Sex: male, Height: 11, Weight: 55, BMI: 4545.5" in driver.page_source



    driver.quit()
