import React, { useState, useEffect, useContext} from 'react';
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
  const [aiResponse, setAIResponse] = useState(null); // Add this line

  useEffect(() => {
    if (sessionData?.recommendation?.["AI Response"]) {
      setAIResponse(sessionData.recommendation["AI Response"]);
    }
  }, [sessionData]);
  
  

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
          {Array.isArray(aiResponse?.Diet) && aiResponse?.Diet?.map((item, index) => (
            <tr key={index}>
              <td>{item.Category.trim()}</td>
              <td>{item["Percent"]}</td>
              <td>{item.Reason.trim()}</td>
              <td>{Array.isArray(item['Foods']) ? item['Foods'].map(food => food.trim()).join(', ') : item['Foods'].trim()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div >
  );
};

export default Diet;
