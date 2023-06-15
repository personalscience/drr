import sys
import os
import pytest

from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from healthr.recommendations import generate_health_recommendation, calculate_bmi, calculate_bmr, create_prompt

@pytest.fixture(autouse=True)
def setup_and_teardown():
    # Setup: set the environment variable
    os.environ['DEFAULT_PROMPT_TEMPLATE'] = "Generate health recommendation for a {sex} of age {age} with the following user input: "
    os.environ['DEFAULT_PROMPT_SUFFIX'] = ""
    yield  # This is where the testing happens

    # Teardown: delete the environment variable
    del os.environ['DEFAULT_PROMPT_TEMPLATE']
    del os.environ['DEFAULT_PROMPT_SUFFIX']


def test_create_prompt():
    user_input = {
    'age': 30,
    'sex': 'male',
    'height': 180,
    'weight': 75,
    'bloodData': 'N/A',
    'familyHistoryData': 'nothing serious',
    'exerciseData': 'runs 5 miles daily',
  }

    expected_prompt = "Generate health recommendation for a male of age 30 with the following user input: "
    actual_prompt = create_prompt(user_input)
    print(f'\n{actual_prompt}\n')
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

from healthr.bloodtest import find_biomarkers  # adjust this import to fit your actual module structure

def test_find_biomarkers():
    # Test data, replace with a real data sample that suits your case
    test_data = [
        {
            "simpleLabel": "Test Biomarker",
            "label": "Test Label",
            "parent": ["Test Parent"],
            "weight": {"Test Category": 0.5},
            "targetType": "Test Type",
            "nonNumerical": False,
            "result": 100,
            "historic": [{"result": 100, "timestamp": "2022-11-10T16:52:59.527Z"}],
            "unit": "Test Unit",
            "ranges": {"optimal": [90, 110], "inRange": [80, 120], "outOfRange": [0, 160]},
            "otherScores": [{"comparison": "test score", "score": None}],
            "infoLink": "https://test.com/pages/test"
        }
        # Add more test data objects if needed
    ]

    # Expected output (a list of dictionaries)
    expected_output = [{"Biomarker": "Test Biomarker", "Value": 100}]

    assert find_biomarkers(test_data) == expected_output

