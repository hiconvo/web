import * as API from "../api/messages";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchMessages = dispatch =>
  /*
   * @param {string} threadId
   * @returns {undefined}
   */
  async threadId => {
    try {
      const response = await API.getMessages(threadId);
      dispatch({ type: "RECEIVE_MESSAGES", payload: response.messages });
    } catch (error) {
      dispatch({ type: "RECEIVE_GLOBAL_ERROR", payload: error.getPayload() });
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const createMessage = dispatch =>
  /*
   * @param {string} threadId
   * @param {Object} payload
   * @param {string} payload.body
   * @returns {undefined}
   */
  async (threadId, payload) => {
    try {
      const message = await API.putMessage(threadId, payload);
      dispatch({ type: "RECEIVE_MESSAGES", payload: [message] });
    } catch (error) {
      dispatch({ type: "RECEIVE_GLOBAL_ERROR", payload: error.getPayload() });
      return Promise.reject();
    }
  };
