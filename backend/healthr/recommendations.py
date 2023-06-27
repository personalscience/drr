# healthr/recommendations.py
from typing import List, Dict

from . import _drr_log
# bloodtest.py

import openai
import os
import json
from flask import jsonify
from .prompts import DEFAULT_PROMPT_TEMPLATE, DEFAULT_PROMPT_SUFFIX, UPDATE_PROMPT, CONVERSE_PROMPT
from .bloodtest import find_biomarkers
from .siphox_calls import get_customer_report
from collections import defaultdict

from pydantic import BaseModel

# user_input is from formik
# const validationSchema = yup.object({
#   age: yup.number().required("Age is required"),
#   sex: yup.string().required("Sex is required"),
#   height: yup.number().required("Height is required"),
#   weight: yup.number().required("Weight is required"),
#   bloodData: yup.string().required("Blood Data is required"),
#   familyHistoryData: yup.string().required("Family History Data is required"),
#   exerciseData: yup.string().required("Exercise is required"),
# });

class RecommendationInput(BaseModel):
    age: int
    sex: str
    height: float
    weight: float
    familyHistoryData: str
    exerciseData: str
    bloodData: str


# calculate BMR (all units are metric)

def calculate_bmr(weight, height, age, gender):
    if gender == "male":
        bmr = 66.5 + (13.75 * weight) + (5 * height) - (6.75 * age)
    elif gender == "female":
        bmr = 655 + (9.56 * weight) + (1.85 * height) - (4.68 * age)
    else:
        raise ValueError("Invalid gender. Please enter 'male' or 'female'.")

    return bmr


# calculate BMI based on height and weight
# see https://www.healthline.com/nutrition/how-many-calories-per-day#calculator
def calculate_bmi(height, weight):
    try:
        height = float(height)
        weight = float(weight)
    except ValueError:
        raise ValueError("height and weight must be numeric")

    height_in_meters = height / 100
    bmi = weight / (height_in_meters * height_in_meters)
    return round(bmi, 1)




def create_prompt(user_input):
    # Assuming user_input is a dictionary with keys 'age', 'sex', etc.
    DEFAULT_PROMPT_TEMPLATE = os.environ.get('DEFAULT_PROMPT_TEMPLATE')
    DEFAULT_PROMPT_SUFFIX = os.environ.get('DEFAULT_PROMPT_SUFFIX')

    prompt = DEFAULT_PROMPT_TEMPLATE.format_map(defaultdict(lambda: 'unknown', user_input))
    prompt += DEFAULT_PROMPT_SUFFIX

    _drr_log(f'\033[91m\nPrompt: {prompt}\n\033[0m', logger_name="create_prompt")

    return prompt


def retrieve_gpt_response(chat_ml_input: List[Dict[str, str]]) -> str:
    # openai_response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=chat_ml_input
    # )
    #  response = openai_response.choices[0].message.content.strip()


    asset_path = os.getenv('DRR_ASSET_PATH')
    demo_mode = os.getenv('DRR_DEMO_MODE', 'true').lower()

    if asset_path is None or demo_mode == 'true':
        # load data from file
        default_asset_path = os.getenv('DRR_ASSET_PATH', 'assets')
        file_path = os.path.join(default_asset_path, 'sampleResponse.json')
        with open(file_path, 'r') as f:
            response = json.load(f)
    else:
        # make the API call
        openai_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=chat_ml_input)
        _drr_log('...Calling OpenAI API...', logger_name="retrieve_gpt_response()")
        response = openai_response.choices[0].message.content.strip()
        
    return response


def get_siphonix_report():
    ## The following section is hardcoded and must be fixed.
    data = get_customer_report("646b934fae46dcbd6be92385", "SPOTR09QQH")

    biomarkers = find_biomarkers(data)
    bloodData = ""
    for item in biomarkers:
        bloodData = bloodData + f'{item["Biomarker"]}, {item["Value"]}\n'
    return bloodData


def chat(user_input, chat_history, current_health_plan):
    chat_ml_obj = [{"role": "system", "content": CONVERSE_PROMPT.format(health_plan=current_health_plan, user_input=user_input)}]
    chat_ml_obj.extend(chat_history)
    _drr_log(chat_ml_obj)
    response = retrieve_gpt_response(chat_ml_obj)
    return response


def update_health_recommendations(user_input, chat_history, current_health_plan):
    prompt = UPDATE_PROMPT.format(user_input=user_input, chat_history=chat_history, health_plan=current_health_plan)
    response = retrieve_gpt_response([{"role": "system", "content": prompt}])
    return response

from typing import Dict, Any, Optional

def generate_health_recommendation(user_input: RecommendationInput, open_ai_key: Optional[str] = None) -> Dict[str, Any]:
    prompt = create_prompt(user_input)
    response = retrieve_gpt_response([{"role": "system", "content": prompt}])
    height = user_input.height
    weight = user_input.weight
    bloodData = user_input.bloodData
    bmi = calculate_bmi(height, weight)
    recommendation = f"BMI = {bmi} Prompt = {prompt}  AI Response = {response}"

    return {"recommendation": recommendation, "bmi": bmi, "Blood": bloodData, "AI Response": response}


if __name__ == "__main__":
    user_input = RecommendationInput(
        age=32, 
        sex="Female", 
        height=180, 
        weight=80, 
        familyHistoryData="heart disease", 
        exerciseData="exercise twice a week", 
        bloodData="more data from blood"
    )
    res = generate_health_recommendation(user_input)
    _drr_log(res)
