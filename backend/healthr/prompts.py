DEFAULT_PROMPT_TEMPLATE = "You and I are medical doctors discussing one of my patients. He's a {age}-year-old {sex} with family history of {familyHistoryData}. Exercise: {exerciseData}. Blood pressure is 120 / 70.  Weight {weight} kg, {height} meters tall.  Blood test results {bloodData}"

DEFAULT_PROMPT_SUFFIX = ''' 

You will return a JSON string that has the following keys and values

"Summary": "a 500-word summary of the patient's overall Health",
"Blood": "500 word describing any anamolies and trends in the data if applicable.  If there is nothing notable, just return 'all ranges appear to be normal',
"Genes": "a list of key-value pairs that includes SNP (RS value), Description (less than 256 chars), URL to 23andme if applicable",
"Diet": "a dietary recommendation Suggest overall macronutrient percentages for the categories fat, protein, carbohydrate, plus fiber and sugar. return a list of the key-value pairs {category: name of category}, {percent: recommended daily percentages of each category or grams}, {reason: a brief reason for why your recommendation is different or specific to this individual compared to average}, and {foods: suggested foods that conform to the recommendations, with an emphasis on unusual foods that don't usually appear on lists of healthy food}."
'''


CONVERSE_PROMPT = """Pretend to be a health coach helping a patient to create healthy habits. You are provided with the current health plan {health_plan} and health information {user_input}, 
but the patient may have follow-up questions or need to change the plan in some way. Be empathetic and try to keep your responses short and to the point."""

UPDATE_PROMPT = """Given the following conversation history and the health plan, update the health plan to reflect the patient's new goals and preferences. 
You will return a JSON string that has the following keys and values
""" + DEFAULT_PROMPT_TEMPLATE + """
"Health Plan": {health_plan}
"Conversation History": {chat_history}
"""

import os
os.environ['DEFAULT_PROMPT_TEMPLATE'] = DEFAULT_PROMPT_TEMPLATE
os.environ['DEFAULT_PROMPT_SUFFIX'] = DEFAULT_PROMPT_SUFFIX
