from collections import defaultdict

from flask import Flask, request, jsonify
from flask_cors import CORS
from healthr.recommendations import generate_health_recommendation, calculate_bmi, update_health_recommendations, chat
from healthr.bloodtest import find_biomarkers
from healthr.siphox_calls import get_customer_report
from healthr.prompts import *

from dotenv import load_dotenv
import os

# Load the environment variables
load_dotenv()

# Get the API key from the environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

memory = defaultdict(dict)

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

@app.route('/api/recommendation', methods=['POST'])
def recommendation():
    user_input = request.json
    memory["user_id"]["user_input"] = user_input
    recommendation = generate_health_recommendation(user_input, OPENAI_API_KEY)
    memory["user_id"]["recommendation"] = recommendation
    return jsonify(recommendation)

@app.route("/api/webhooks/rest/webhook", methods=['POST'])
def converse():
    request_obj = request.json
    print(request_obj)
    user_input = memory["user_id"].get("user_input")
    chat_history = update_chat_history(request_obj["message"], "user")
    recommendation = memory["user_id"].get("recommendation")
    chat_response = chat(user_input, chat_history, recommendation)
    chat_history = update_chat_history(chat_response, "assistant")
    new_recommendation = update_health_recommendations(user_input, chat_history, recommendation)
    memory["user_id"]["recommendation"] = new_recommendation

    return jsonify({"text": chat_response, "recipient_id": "user", "updated_recommendation": new_recommendation})


def update_chat_history(text, role):
    chat_history = memory["user_id"].get("chat_history")
    if chat_history is None:
        chat_history = []
    chat_history.append({"role": role, "content": text})
    memory["user_id"]["chat_history"] = chat_history
    return chat_history

if __name__ == "__main__":
    host = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
    port = int(os.getenv('FLASK_RUN_PORT', '5005')) # Default port is 5005 if FLASK_RUN_PORT is not set 
    app.run(debug=False, host=host, port=port)

