# healthr/recommendations.py
import openai
import os
import json
from flask import jsonify

from healthr.bloodtest import find_biomarkers
from healthr.siphox_calls import get_customer_report


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

def create_prompt(user_input):

    prompt_template = os.getenv("PROMPT_STRING")
    if prompt_template is None:
        raise EnvironmentError("PROMPT_STRING environment variable not set")

    # Assuming user_input is a dictionary with keys 'user1', 'user2', 'user3'
    prompt = prompt_template.format(**user_input)

    return prompt


def generate_health_recommendation(user_input, open_ai_key):
    prompt =  create_prompt(user_input)


# Uncomment this section to use the real API, but note that it will cost some money.
    # openai_response = openai.Completion.create(
    #     engine="text-davinci-002",
    #     prompt=prompt,
    #     max_tokens=100,
    #     n=1,
    #     stop=None,
    #     temperature=0.8,
    # )

    # Open and read the JSON file
    with open(os.path.join(os.getcwd(), 'assets', 'sampleResponse.json'), 'r') as f:
        response = json.load(f)

    # response = openai_response.choices[0].text.strip()
   # response = "The most notable anamolies in the data are the high levels of triglycerides and LDL cholesterol. This may be indicative of an underlying condition such as metabolic syndrome or diabetes. The patient's high-sensitivity CRP levels may also be indicative of inflammation, which could be caused by a number of underlying conditions."

    height = user_input.get('height')
    weight = user_input.get('weight')
    bloodData = user_input.get('bloodData')
 #   bloodData = "more data from blood"


## The following section is hardcoded and must be fixed.
    data = get_customer_report("646b934fae46dcbd6be92385", "SPOTR09QQH")

    biomarkers = find_biomarkers(data)
    bloodData = ""
    for item in biomarkers:
        bloodData = bloodData + f'{item["Biomarker"]}, {item["Value"]}\n'
###


    bmi = 0
    recommendation = ""

    if height is None or weight is None:
    # Handle missing height or weight here...
        recommendation = f"height or weight are none"

    else:
        bmi = calculate_bmi(height, weight)
        recommendation = f"BMI = {bmi} Prompt = {prompt}  AI Response = {response}" # {response.choices[0].text.strip()}"
    
    return jsonify({"recommendation": recommendation, "bmi": bmi, "Blood": bloodData, "AI Response": response})
