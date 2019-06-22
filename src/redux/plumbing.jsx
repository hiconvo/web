import React, { useReducer, useContext } from "react";

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
   * @returns { String: function } object of boundActions
   */
  function useActions(unboundActions = {}) {
    const { dispatch } = useContext(DataContext);

    return Object.keys(unboundActions).reduce((actionMap, actionName) => {
      actionMap[actionName] = unboundActions[actionName](dispatch);
      return actionMap;
    }, {});
  }

  return { DataProvider, useSelectors, useActions };
}
