# healthr/recommendations.py
import openai

# calculate BMI based on height and weight
def calculate_bmi(height, weight):
    height_in_meters = height / 100
    bmi = weight / (height_in_meters * height_in_meters)
    return round(bmi, 1)


def generate_health_recommendation(user_input):
    prompt = f"Generate health recommendation for the following user input: {user_input}"

    # response = openai.Completion.create(
    #     engine="text-davinci-002",
    #     prompt=prompt,
    #     max_tokens=100,
    #     n=1,
    #     stop=None,
    #     temperature=0.8,
    # )

    recommendation = "Here is a sample response" # response.choices[0].text.strip()
    return recommendation
