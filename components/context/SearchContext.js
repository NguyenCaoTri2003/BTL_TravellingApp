import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    place: 'Anywhere',
    date: 1,
    guests: 1,
  });

  const setSearchDetails = (data) => {
    setSearchData(data);
  };

  return (
    <SearchContext.Provider value={{ searchData, setSearchDetails }}>
      {children}
    </SearchContext.Provider>
  );
}; 
