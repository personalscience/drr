# Health Recommendation App

This is an initial prototype for an app that does this:

1. Let users enter or upload basic current health information, including any medications, supplements.  Also request information about medical history, including family history. Optionally let the user upload specific details like blood chemistry, genomics, microbiome, etc. 
3. Respond with general observations and recommendations. Point to any markers that might be out of range and suggest actions.
4. Ask about dietary preferences and current exercise levels. 
5. Propose general guidelines for daily macronutrient percentages (protein, carbs, etc.) and calories.
6. Propose additional tests that could reveal more in-depth information.

## Sample Output

![A summary table personalized to this user](docs/images/patient_summary_genomics.jpg)

![Specific dietary recommendations](docs/images/diet_recommendations_avoid.jpg)

## Install

Create a project directory and download everything from this repo.

You'll need Python and npm.

```sh
python3 -m venv venv
source venv/bin/activate
pip install -r ./backend/requirements.txt
```

## Run

Start the backend:

```sh
python backend/app.py
```

Start the frontend:

```sh
cd health-recommendation-app/frontend/health_recommendation_frontend
npm start
```


