from flask import Flask, request, jsonify
from healthr.recommendations import generate_health_recommendation


from dotenv import load_dotenv
import os

# Load the environment variables
load_dotenv()

# Get the API key from the environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route('/api/user_info', methods=['POST'])
def user_info():
    data = request.json
    # Perform necessary processing or saving of data
    return jsonify({"status": "success", "message": "Data received"}), 200

@app.route('/recommendation', methods=['POST'])
def recommendation():
    user_input = request.json
    recommendation = generate_health_recommendation(user_input)
    return jsonify({"recommendation": recommendation})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
