import sys
import os
import pytest

from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from healthr.recommendations import generate_health_recommendation, calculate_bmi, create_prompt

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

