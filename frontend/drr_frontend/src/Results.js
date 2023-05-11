import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const { message, recommendation } = location.state || 'No data available';

  return (
    <div>
      <h1>Results</h1>
      <p>{message}</p>
      <p>Recommendation: {JSON.stringify(recommendation, null, 2)}</p>
    </div>
  );
};

export default Results;
