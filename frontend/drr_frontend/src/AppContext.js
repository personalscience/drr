
import React, { createContext, useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [sessionData, setSessionData] = React.useState(null);
  const [formValues, setFormValues] = useState(initialState.formValues);
  const [unitSystem, setUnitSystem] = useState('metric');

  return (
    <AppContext.Provider value={{unitSystem, setUnitSystem, formValues, setFormValues, sessionData, setSessionData }}>
      {children}
    </AppContext.Provider>
  );
};

// In AppContext.js
const initialState = {
  formValues: {
    age: '40',
    sex: 'male',
    height: '180',
    weight: '75',
    bloodData: 'N/A',
    familyHistoryData: 'nothing serious',
    exerciseData: 'runs 5 miles daily',
  },
  sessionData: null,
};
