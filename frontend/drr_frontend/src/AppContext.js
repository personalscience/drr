import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [sessionData, setSessionData] = React.useState(null);

  return (
    <AppContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </AppContext.Provider>
  );
};
