from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # This allows cross-origin requests from your React app

# Load your model, vectorizer, and label encoder
model = joblib.load('spam_classifier_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')
label_encoder = joblib.load('label_encoder.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data['message']
    
    # Preprocess the message
    message_vectorized = vectorizer.transform([message])
    
    # Predict the label (0 for 'ham', 1 for 'spam')
    prediction = model.predict(message_vectorized)
    predicted_label = label_encoder.inverse_transform(prediction)[0]
    
    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(debug=True)
