import React, { useReducer, useContext } from "react";

/*
 * @function initRedux
 * @param {function} reducer
 * @param {Object} initialState
 * @returns {{ DataProvier: Component, useRedux: function }}
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
   * @function useRedux
   * @param {selector[]} selectors
   * @param {{ String: (dispatch) => function }} unboundActions
   * @returns {[any[], { String: function }]} array of selected and object of boundActions
   */
  function useRedux(selectors = [], unboundActions = {}) {
    const { store, dispatch } = useContext(DataContext);

    const selected = selectors.map(selector => selector(store));
    const actions = Object.keys(unboundActions).reduce(
      (actionMap, actionName) => {
        actionMap[actionName] = unboundActions[actionName](dispatch);
        return actionMap;
      },
      {}
    );

    return [selected, actions];
  }

  return { DataProvider, useRedux };
}
