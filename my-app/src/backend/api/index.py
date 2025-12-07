from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/test")
def test():
    return jsonify({"message": "Backend is working!"})

if __name__ == "__main__":
    app.run()
