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
      return Promise.reject(error);
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
      return Promise.reject(error);
    }

    try {
      await createMessage(dispatch)(thread.id, { body: payload.body });

      return thread;
    } catch (error) {
      return Promise.reject(error);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const updateThread = dispatch =>
  /*
   * @param {Object} payload
   * @param {string} payload.id
   * @param {string} payload.subject
   * @returns {Object} Thread
   */
  async payload => {
    let thread;
    try {
      thread = await API.updateThread(payload.id, { subject: payload.subject });
      dispatch({
        type: "RECEIVE_THREADS",
        payload: [thread]
      });
    } catch (e) {
      return Promise.reject(e);
    }

    return thread;
  };
