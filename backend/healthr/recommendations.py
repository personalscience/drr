# healthr/recommendations.py
import openai

# calculate BMI based on height and weight
def calculate_bmi(height, weight):
    try:
        height = float(height)
        weight = float(weight)
    except ValueError:
        raise ValueError("height and weight must be numeric")

    height_in_meters = height / 100
    bmi = weight / (height_in_meters * height_in_meters)
    return round(bmi, 1)


def generate_health_recommendation(user_input, open_ai_key):
    prompt = f"Generate health recommendation for the following user input: {user_input}"

    # response = openai.Completion.create(
    #     engine="text-davinci-002",
    #     prompt=prompt,
    #     max_tokens=100,
    #     n=1,
    #     stop=None,
    #     temperature=0.8,
    # )


    bloodData = user_input['bloodData']
    familyHistoryData = user_input['familyHistoryData']
    age = user_input['age']
    sex = user_input['sex']

    height = user_input.get('height')
    weight = user_input.get('weight')

    if height is None or weight is None:
    # Handle missing height or weight here...
        recommendation = f"height or weight are none"

    else:
        bmi = calculate_bmi(height, weight)
        recommendation = f"BMI = {bmi} \n Data = {bloodData}" # response.choices[0].text.strip()
    return recommendation
