from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/')
def api():
    return jsonify({"test": "Testing Python Api"})


@app.route("/say_hello")
def say_hello():
    return jsonify({"message": "The Api says hello"})
