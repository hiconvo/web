import React, { useReducer, useContext, useMemo } from "react";

/*
 * @function initRedux
 * @param {function} reducer
 * @param {Object} initialState
 * @returns {{ DataProvier: Component, useSelectors: function, useActions: function }}
 */
export default function initRedux(reducer, initialState) {
  const DataContext = React.createContext(null);
  /*
   * @Component DataProvider
   */
  function DataProvider({ children }) {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <DataContext.Provider value={{ store, dispatch }}>
        {children}
      </DataContext.Provider>
    );
  }

  /*
   * @function useSelectors
   * @param {selector[]} selectors
   * @returns any[] array of selected
   */
  function useSelectors(...selectors) {
    const { store } = useContext(DataContext);
    return selectors.map(selector => selector(store));
  }

  /*
   * @function useActions
   * @param { String: (dispatch) => function } unboundActions
   * @param dependencies[] dependecies
   * @returns { String: function } object of boundActions
   */
  function useActions(unboundActions = {}, deps) {
    const { dispatch } = useContext(DataContext);

    return useMemo(
      () =>
        Object.keys(unboundActions).reduce((actionMap, actionName) => {
          actionMap[actionName] = unboundActions[actionName](dispatch);
          return actionMap;
        }, {}),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      deps ? [dispatch, ...deps] : [dispatch]
    );
  }

  return { DataProvider, useSelectors, useActions };
}
