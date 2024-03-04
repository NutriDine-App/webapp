import React, { createContext, useContext, useState } from "react";

const MealsContext = createContext();

export const useMeals = () => useContext(MealsContext);

export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState(null);

  return (
    <MealsContext.Provider value={{ meals, setMeals }}>
      {children}
    </MealsContext.Provider>
  );
};
