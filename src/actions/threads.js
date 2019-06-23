import * as API from "../api/threads";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchThreads = dispatch =>
  /*
   * @returns {undefined}
   */
  async () => {
    try {
      const response = await API.getThreads();
      dispatch({
        type: "RECEIVE_THREADS",
        payload: response.threads
      });
    } catch (error) {
      dispatch({ type: "RECEIVE_GLOBAL_ERROR", payload: error.getPayload() });
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const setSelectedThread = dispatch =>
  /*
   * @returns {undefined}
   */
  threadId => {
    dispatch({
      type: "RECEIVE_SELECTED_THREAD",
      payload: threadId
    });
  };
