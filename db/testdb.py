
from fauna import fql
from fauna.client import Client
from fauna.encoding import QuerySuccess
from fauna.errors import FaunaException

client = Client(secret="fnAFGHl90aAARKgNxkdaLzHT16JKo607m7v83wPl")
# The client defaults to using using the value stored FAUNA_SECRET for its secret.
# Either set the FAUNA_SECRET env variable or retrieve it from a secret store.
# As a best practice, don't store your secret directly in your code.

try:
    # create a collection
    #q1 = fql('Collection.create({ name: "hackdata" })')
    #client.query(q1)

    sample = '''
{
    "Summary": "The patient is a 60-year-old male in generally excellent health, who exercises regularly and maintains a balanced diet. He has no family history of major chronic diseases. The patient has been experiencing shortness of breath when climbing stairs, however, his stress ECG findings predict a low risk for future adverse cardiac events. Blood test results, while overall within normal ranges, show some fluctuation in homocysteine levels, a slightly increased LDL cholesterol, and slightly decreased ferritin levels. His morning cortisol levels also vary, indicating potential stress or circadian rhythm concerns.",
    
    "Blood": "The patient's blood test results show a few notable trends. Homocysteine levels peaked in March and then dropped significantly by November. Elevated homocysteine can be a risk factor for heart disease, but it is now within the normal range. Ferritin, a measure of iron storage in the body, appears to be consistently on the lower end of the normal range, indicating possible iron deficiency. LDL Cholesterol is higher than normal, which may increase risk for atherosclerosis. On the other hand, the ratio of triglycerides to HDL is consistently low, which is a good indicator of metabolic health. Morning cortisol is also fluctuating, being high in April, normal in March, and low in November. This could be due to changes in stress levels or sleep patterns.",
    
    "Genes": [
    {"RS value": "NA", "Description": "Genetic information not available for this patient", "URL": "NA"}
    ],
    
    "Diet": [
    {"Category": "Fat", "Percentage": "30%", "Reason": "To maintain heart health and given the high LDL levels.", "Suggested foods": ["Avocados", "Nuts", "Fish high in Omega-3 like Salmon", "Olives"]},
    {"Category": "Protein", "Percentage": "25%", "Reason": "To maintain muscle mass and function, especially considering patient's age.", "Suggested foods": ["Lean meats", "Eggs", "Legumes", "Quinoa", "Greek yogurt"]},
    {"Category": "Carbohydrates", "Percentage": "40%", "Reason": "To sustain energy levels for physical activity. Preference given to complex carbohydrates to manage blood sugar levels.", "Suggested foods": ["Brown rice", "Sweet potatoes", "Whole grain bread", "Quinoa", "Fruits and Vegetables"]},
    {"Category": "Fiber", "Percentage": "10-15 g per 1000 kcal", "Reason": "To aid digestion and promote heart health.", "Suggested foods": ["Berries", "Green leafy vegetables", "Chia seeds", "Flaxseeds", "Legumes"]},
    {"Category": "Sugar", "Percentage": "<10% of total energy intake", "Reason": "To maintain good metabolic health and keep HbA1c within normal range.", "Suggested foods": ["Limit intake of sweetened beverages", "Cakes", "Pastries", "Candies"]}
    ]
}
    '''

    # create a document
    sql = "hackdata.create({ username: 'Scout', hdata: " + sample + "})"
    q2 = fql(sql)
    res: QuerySuccess = client.query(q2)
    doc = res.data
    print(doc)
    id = doc.id
    print(id)
except FaunaException as e:
    # handle errors
    print(e)
