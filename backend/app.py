from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/user_info', methods=['POST'])
def user_info():
    data = request.json
    # Perform necessary processing or saving of data
    return jsonify({"status": "success", "message": "Data received"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)
