from flask import Flask, request, jsonify
from flask_cors import CORS
from healthr.recommendations import generate_health_recommendation, calculate_bmi
from healthr.bloodtest import find_biomarkers
from healthr.siphox_calls import get_customer_report

from dotenv import load_dotenv
import os

# Load the environment variables
load_dotenv()

# Get the API key from the environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Read the prompt string from the text file
with open('./assets/promptstring2.txt', 'r') as file:
    prompt_string = file.read()

# Set the environment variable
os.environ['PROMPT_STRING'] = prompt_string


app = Flask(__name__)
CORS(app)

@app.route('/api/user_info', methods=['POST'])
def user_info():
    data = request.json
    # Perform necessary processing or saving of data
    return jsonify({"status": "success", "message": "Data received"}), 200

@app.route('/api/siphox_blood_data', methods=['POST'])
def get_siphox_blood_data():
    data = get_customer_report("646b934fae46dcbd6be92385", "SPOTR09QQH")

    biomarkers = find_biomarkers(data)
    bloodData = ""
    for item in biomarkers:
        bloodData = bloodData + f'{item["Biomarker"]}, {item["Value"]}\n'

    return bloodData

@app.route('/api/calculate_bmi', methods=['POST'])
def calculate_bmi_route():
    user_input = request.json
    bmi = calculate_bmi(user_input["height"], user_input["weight"])
    return jsonify({"bmi": bmi})

@app.route('/recommendation', methods=['POST'])
def recommendation():
    user_input = request.json
    recommendation = generate_health_recommendation(user_input, OPENAI_API_KEY)
    return recommendation

if __name__ == "__main__":
    host = os.getenv('FLASK_RUN_HOST', '127.0.0.1')
    app.run(debug=True, host=host, port=5001)
