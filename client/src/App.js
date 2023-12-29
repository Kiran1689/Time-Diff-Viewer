// App.js
import React, { useState } from 'react';
import './App.css';
//import logoImage from './time_flies.gif';
import animatedGif from './time--flies.gif';

const App = () => {
  const [timestamp1, setTimestamp1] = useState('');
  const [timestamp2, setTimestamp2] = useState('');
  const [differenceInSeconds, setDifferenceInSeconds] = useState(null);
  const [error, setError] = useState(null);

  const calculateDifference = async () => {
    try {

      setDifferenceInSeconds(null);
      setError(null);

      const response = await fetch('https://time-cal-server.vercel.app/calculate-difference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp1, timestamp2 }),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        } else {
          throw new Error(`Failed to fetch. Server returned ${response.status} ${response.statusText}`);
        }
      }
  
      const result = await response.json();
      setDifferenceInSeconds(result.differenceInSeconds);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  
  return (
    <div className="app-container">
      <h2 className="title">Timestamp Difference Calculator</h2>

      <div className="content-container">
        <div className="right-section">
          <img src={animatedGif} alt="GIF Description" className="main-gif" />
        </div>

        <div className="left-section">
          <div className="card">
            <div>
              <input
                type="text"
                placeholder="Enter Timestamp 1"
                value={timestamp1}
                onChange={(e) => setTimestamp1(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Enter Timestamp 2"
                value={timestamp2}
                onChange={(e) => setTimestamp2(e.target.value)}
                className="input"
              />
              <button onClick={calculateDifference} 
                className="button">
                <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                Calculate Difference
              </button>
            </div>
            <div>
              {error && <p className="error">{error}</p>}
              {differenceInSeconds !== null && <p className="result">Time difference: {differenceInSeconds} seconds</p>}
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        Made with <span style={{ color: '#a1ff14', fontSize: '24px' }}>&hearts;</span> by Kiran
      </footer>
    </div>
  );
};

export default App;
