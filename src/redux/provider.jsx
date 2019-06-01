import React, { useReducer } from "react";
import DataContext from "./context";
import reducer, { initialState } from "./reducer";

export default function DataProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ store, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
