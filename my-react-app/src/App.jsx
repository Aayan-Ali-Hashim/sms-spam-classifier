import { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading when the button is clicked

    // Send the message to the server for prediction
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    const data = await response.json();
    setPrediction(data.prediction); // Store the prediction result
    
    // Add delay before hiding the loader (optional, gives time for the user to see the result)
    setTimeout(() => {
      setLoading(false); // Stop loading after a delay of 2 seconds (2000 ms)
    }, 1000); // You can adjust the delay to your preference
  };

  return (
    <div className="App">
      <h1 className='animate__animated animate__fadeInDown'>
        SMS Spam Classifier
      </h1>
      <div className='container'>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message here"
        ></textarea>
        <button className='mybutton animate__animated animate__fadeInUp' onClick={handleSubmit}>Check Spam/Ham</button>

        {loading ? (
          <div className="loader"></div> // Show loader while loading is true
        ) : (
          prediction && <p>Your message is: {prediction}</p> // Show prediction when available
        )}
      </div>
    </div>
  );
}

export default App;
