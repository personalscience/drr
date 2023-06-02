import React, { useContext} from 'react';
import { Table } from 'react-bootstrap';

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



const Diet = () => {


    const { sessionData } = useContext(AppContext);
    const location = useLocation();

    if (!sessionData) {
      return (
        <div>
          <h1><FormattedMessage id="diet.error" /></h1>
        </div>
      );
    };

  
    const { message, recommendation } = sessionData;

    if (!recommendation) {
      return (
        <div style={specialUserInfoStyle} data-testid="special-results-info">
          <h1><FormattedMessage id="diet.title" /></h1>
          <p><FormattedMessage id="diet.error" /></p>
        </div>
      );
    } 

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Percentage</th>
            <th>Reason</th>
            <th>Suggested Foods</th>
          </tr>
        </thead>
        <tbody>
          {recommendation['AI Response']?.Diet?.map((item, index) => (
            <tr key={index}>
              <td>{item.Category}</td>
              <td>{item.Percentage}</td>
              <td>{item.Reason}</td>
              <td>{item['Suggested foods'].join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <div style={specialUserInfoStyle} data-testid="special-results-info">
        <h1>Results</h1>
        <p>{message}</p>
        <p>BMI: {recommendation.bmi}</p>
      </div>
      <div style={specialResultsStyle} data-testid="special-results">
        <h2><FormattedMessage id="results.recommendations" /></h2>
        <p>AI Recommendation: {recommendation['AI Response']}</p>
      </div> */}
    </div >
  );
};

export default Diet;