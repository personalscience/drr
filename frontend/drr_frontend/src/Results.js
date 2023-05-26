import React, { useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from './AppContext';


const specialResultsStyle = {
  backgroundColor: '#f0f0ff',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const specialUserInfoStyle = {
  backgroundColor: '#f0f0f0',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};



const Results = () => {


    const { sessionData } = useContext(AppContext);

    if (!sessionData) {
      return (
        <div>
          <h1>Please enter your details first</h1>
        </div>
      );
    };

    const location = useLocation();
    const { message, recommendation } = sessionData;

    if (!recommendation) {
      return (
        <div style={specialUserInfoStyle} data-testid="special-results-info">
          <h1>Results</h1>
          <p>You have to enter your inputs first</p>
        </div>
      );
    } 

  return (
    <div>
      <div style={specialUserInfoStyle} data-testid="special-results-info">
        <h1>Results</h1>
      <p>{message}</p>
      <p>BMI: {recommendation.bmi}</p>
      </div>
      <div style={specialResultsStyle} data-testid="special-results">
        <h2>Recommendations</h2>
        <p>AI Recommendation: {recommendation['AI Response']}</p>
      </div>
    </div>
  );
};

export default Results;
