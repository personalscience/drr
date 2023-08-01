import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [sessionData, setSessionData] = useState(null);

  return (
    <AppContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </AppContext.Provider>
  );
}


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
