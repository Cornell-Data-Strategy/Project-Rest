from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/api/menu', methods=['GET'])
def get_menu():
    print("API was called!")  
    menu_items = [
        {"id": 1, "name": "Chicken Wings", "price": 12.99},
        {"id": 2, "name": "Burger", "price": 9.99},
        {"id": 3, "name": "Pasta", "price": 14.99},
        {"id": 4, "name": "Pizza", "price": 16.49},
        {"id": 5, "name": "Grilled Salmon", "price": 18.99}
    ]
    return jsonify(menu_items)

if __name__ == '__main__':
    print("Flask is starting...") 
    app.run(debug=True, port=5000)
