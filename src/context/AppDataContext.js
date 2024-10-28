import { createContext, useContext } from "react";

const AppDataContext = createContext();

export const AppDataContextProvider = ({ children }) => {
  const values = {};

  return (
    <AppDataContext.Provider value={values}>{children}</AppDataContext.Provider>
  );
};

export const useAppData = () => {
  return useContext(AppDataContext);
};
