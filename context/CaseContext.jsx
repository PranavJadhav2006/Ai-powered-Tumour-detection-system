import React, { createContext, useState, useContext } from 'react';

const CaseContext = createContext(null);

export const CaseProvider = ({ children }) => {
  const [caseData, setCaseData] = useState(null);

  const updateCaseData = (data) => {
    setCaseData(data);
  };

  return (
    <CaseContext.Provider value={{ caseData, updateCaseData }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => {
  return useContext(CaseContext);
};