# healthr/recommendations.py
import openai

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
