import requests
import os



def get_customer_report(customer_id: str, report_id: str) -> dict:
    """
    This function makes a GET request to the SiphoX API and returns the JSON response.

    Parameters:
    customer_id (str): The customer ID.
    report_id (str): The report ID.

    Returns:
    dict: The JSON response from the API call.
    """

    token = os.getenv("SIPHOX_API_TOKEN")
    headers = {"Authorization": f"Token {token}"}
    url = f"https://connect.siphoxhealth.com/api/v1/customers/{customer_id}/reports/{report_id}"
    response = requests.get(url, headers=headers)
    # Raise an exception if the request was unsuccessful
    if not response.ok:
        response.raise_for_status()

    return response.json()



