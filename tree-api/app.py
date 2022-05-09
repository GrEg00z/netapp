# app.py
from flask import Flask
from flask_cors import CORS
from api.node import node_route

app = Flask(__name__)
app.register_blueprint(node_route)

CORS(app)

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")