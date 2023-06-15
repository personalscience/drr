import React, { useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from './AppContext';

import { FormattedMessage } from 'react-intl';


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

function Recommendations({ recommendations }) {
  const [aiResponse, setAIResponse] = useState(null);

  useEffect(() => {
    if (recommendations['AI Response']) {
      setAIResponse(recommendations['AI Response']);
    }
  }, [recommendations]);
  

  return (
    <div>
      <h2>Summary</h2>
      <p>{aiResponse?.Summary}</p>
    </div>
  );
}
const Results = () => {
  const { sessionData } = useContext(AppContext);
  const location = useLocation();
  const [aiResponse, setAIResponse] = useState(null); // Add this line

  useEffect(() => {
    if (sessionData?.recommendation) {
      setAIResponse(sessionData.recommendation['AI Response']);
    }
  }, [sessionData]);
  

  if (!sessionData) {
    return (
      <div>
        <h1><FormattedMessage id="results.error.enterdata" /></h1>
      </div>
    );
  };

  const { message, recommendation } = sessionData;

  if (!recommendation) {
    return (
      <div style={specialUserInfoStyle} data-testid="special-results-info">
        <h1><FormattedMessage id="results.title" /></h1>
        <p><FormattedMessage id="results.error.enterdata" /></p>
      </div>
    );
  } 

  return (
    <div>
      <div style={specialUserInfoStyle} data-testid="special-results-info">
        <h1>Results</h1>
        <p>{message}</p>
        <p>BMI: {recommendation.bmi}</p>
        <p>Blood: {recommendation.Blood}</p>
      </div>
      <div style={specialResultsStyle} data-testid="special-results">
        <h2><FormattedMessage id="results.recommendations" /></h2>
        <Recommendations recommendations={recommendation} /> 
      </div>
    </div>
  );
};

export default Results;
