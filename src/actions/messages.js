import * as API from "../api/messages";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";

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
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
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
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };
