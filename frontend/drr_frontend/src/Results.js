import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const message = location.state?.message || 'No data available';

  return (
    <div>
      <h1>Results</h1>
      <p>{message}</p>
    </div>
  );
};

export default Results;
