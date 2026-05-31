import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [repoUrl, setRepoUrl] = useState('');
  
  return (
    <AppContext.Provider value={{ repoUrl, setRepoUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
