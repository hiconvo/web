/*
 * @param {function} dispatch
 * @returns {function}
 */
export const setSelectedResource = dispatch =>
  /*
   * @param {string} resourceId
   * @returns {undefined}
   */
  id => {
    dispatch({
      type: "RECEIVE_SELECTED_RESOURCE",
      payload: id
    });
  };
