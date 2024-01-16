import React, { useContext, createContext } from "react";


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  
  const [search, setSearch] = React.useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);