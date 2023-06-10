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
    if (sessionData?.recommendation) {
      try {
        const parsedResponse = JSON.parse(sessionData.recommendation['AI Response']);
        setAIResponse(parsedResponse);
      } catch (error) {
        console.error("Invalid JSON string:", error);
      }
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
              <td>{item.Category}</td>
              <td>{item["Recommended Percentage"]}</td> {/* Update this line */}
              <td>{item.Reason}</td>
              <td>{item['Suggested Foods'].join(', ')}</td> {/* Update this line */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div >
  );
};

export default Diet;
