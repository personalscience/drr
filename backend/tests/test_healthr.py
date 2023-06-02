import sys
import os
import pytest

from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from healthr.recommendations import generate_health_recommendation, calculate_bmi, calculate_bmr, create_prompt

@pytest.fixture(autouse=True)
def setup_and_teardown():
    # Setup: set the environment variable
    os.environ['PROMPT_STRING'] = "Generate health recommendation for a {sex} of age {age} with the following user input: "

    yield  # This is where the testing happens

    # Teardown: delete the environment variable
    del os.environ['PROMPT_STRING']


def test_create_prompt():
    user_input = {
        'bloodData': 'some blood data',
        'familyHistoryData': 'some family history data',
        'age': 30,
        'sex': 'male',
    }
    expected_prompt = "Generate health recommendation for a male of age 30 with the following user input: "
    actual_prompt = create_prompt(user_input)
    assert actual_prompt == expected_prompt


def test_calculate_bmi():
    assert calculate_bmi(55, 11) == 36.4

def test_calculate_bmr():
    # Test case 1: Male, weight = 79.5 kg, height = 182 cm, age = 60
    gender = "male"
    weight = 79.5
    height = 182
    age = 60
    expected_bmr = 1664.625

    # Call the function and assert the result
    assert calculate_bmr(weight, height, age, gender) == pytest.approx(expected_bmr, abs=0.1)

    # Test case 2: Female, weight = 65.2 kg, height = 160 cm, age = 45
    gender = "female"
    weight = 65.2
    height = 160
    age = 45
    expected_bmr = 1363.712

    # Call the function and assert the result
    assert calculate_bmr(weight, height, age, gender) == pytest.approx(expected_bmr, abs=0.1)

