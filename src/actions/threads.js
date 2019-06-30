import * as API from "../api/threads";
import { createMessage } from "./messages";

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

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const createThread = dispatch =>
  /*
   * @param {Object} payload
   * @param {string} payload.subject
   * @param {Contact[]} payload.users
   * @param {string} payload.body
   * @returns {Object} Thread
   */
  async payload => {
    let thread;
    try {
      thread = await API.createThread({
        subject: payload.subject,
        users: payload.users
      });
      dispatch({
        type: "RECEIVE_THREADS",
        payload: [thread]
      });
    } catch (error) {
      dispatch({ type: "RECEIVE_GLOBAL_ERROR", payload: error.getPayload() });
      return Promise.reject();
    }

    try {
      await createMessage(dispatch)(thread.id, { body: payload.body });
      return thread;
    } catch (error) {
      dispatch({ type: "RECEIVE_GLOBAL_ERROR", payload: error.getPayload() });
      return Promise.reject();
    }
  };
