from collections import defaultdict
from typing import Optional



import json

from fastapi import FastAPI, Response, Body, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel,  ValidationError as PydanticValidationError
from healthr.recommendations import RecommendationInput, generate_health_recommendation, calculate_bmi, update_health_recommendations, chat
from healthr.bloodtest import find_biomarkers
from healthr.siphox_calls import get_customer_report
from healthr.prompts import *

from dotenv import load_dotenv
import os
import uvicorn

# Load the environment variables
load_dotenv()

# Get the API key from the environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

origins = [
    "http://localhost:3000"  # React app's address
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # This can be more specific for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory = defaultdict(dict)

class UserInfoInput(BaseModel):
    pass  # Replace this with your User info structure

@app.post('/api/user_info')
def user_info(user_info: UserInfoInput):
    # Perform necessary processing or saving of data
    return {"status": "success", "message": "Data received"}

@app.post('/api/siphox_blood_data')
def get_siphox_blood_data():
    data = get_customer_report("646b934fae46dcbd6be92385", "SPOTR09QQH")

    biomarkers = find_biomarkers(data)
    bloodData = ""
    for item in biomarkers:
        bloodData = bloodData + f'{item["Biomarker"]}, {item["Value"]}\n'

    return Response(content=bloodData, media_type="text/plain")

class BmiInput(BaseModel):
    height: float
    weight: float

@app.post('/api/calculate_bmi')
def calculate_bmi_route(bmi_input: BmiInput):
    bmi = calculate_bmi(bmi_input.height, bmi_input.weight)
    return {"bmi": bmi}

@app.post("/api/recommendation")
async def recommendation(request: Request):
    body = await request.body()
    data = json.loads(body)

    try:
        user_input = RecommendationInput(**data)
    except PydanticValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    print(f"User input values: {user_input.dict()}")
    recommendation = generate_health_recommendation(user_input)
    return recommendation


class ChatMessage(BaseModel):
    message: str
    recipient_id: str

@app.post("/api/webhooks/rest/webhook")
def converse(chat_message: ChatMessage):
    request_obj = chat_message.dict()
    print(request_obj)
    user_input = memory["user_id"].get("user_input")
    chat_history = update_chat_history(request_obj["message"], "user")
    recommendation = memory["user_id"].get("recommendation")
    chat_response = chat(user_input, chat_history, recommendation)
    chat_history = update_chat_history(chat_response, "assistant")
    new_recommendation = update_health_recommendations(user_input, chat_history, recommendation)
    memory["user_id"]["recommendation"] = new_recommendation

    return {"text": chat_response, "recipient_id": "user", "updated_recommendation": new_recommendation}


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
    uvicorn.run("main:app", host=host, port=port, log_level="info")
