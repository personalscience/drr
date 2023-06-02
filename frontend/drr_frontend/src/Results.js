import React, { useContext} from 'react';
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



const Results = () => {


    const { sessionData } = useContext(AppContext);
    const location = useLocation();

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
      </div>
      <div style={specialResultsStyle} data-testid="special-results">
        <h2><FormattedMessage id="results.recommendations" /></h2>
        <p>AI Recommendation: {recommendation['AI Response']?.Blood}</p>
      </div>
    </div>
  );
};

export default Results;
