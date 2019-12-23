import * as API from "../api/threads";
import { createThreadMessage } from "./messages";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";

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
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
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
   * @param {string} payload.blob
   * @returns {Object} Thread
   */
  async payload => {
    let thread;
    try {
      thread = await API.createThread({
        subject: payload.subject,
        users: payload.users
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    try {
      const message = await createThreadMessage(dispatch)(thread.id, {
        body: payload.body,
        blob: payload.blob
      });

      thread.preview = message;

      dispatch({
        type: "RECEIVE_THREADS",
        payload: [thread]
      });

      return thread;
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
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
      dispatchNotification()({ type: "SUCCESS", message: "Changed subject" });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return thread;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const addUserToThread = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.thread
   * @param {Object} payload.user
   * @returns {Object} Thread
   */
  async payload => {
    let thread;
    try {
      thread = await API.addUserToThread(payload.thread.id, payload.user.id);
      dispatch({
        type: "RECEIVE_THREADS",
        payload: [thread]
      });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Added ${payload.user.fullName} to ${payload.thread.subject}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return thread;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const removeUserFromThread = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.thread
   * @param {Object} payload.user
   * @param {bool} payload.removeThread
   * @returns {Object} Thread
   */
  async payload => {
    let thread;
    try {
      thread = await API.removeUserFromThread(
        payload.thread.id,
        payload.user.id
      );

      if (payload.removeThread) {
        dispatch({
          type: "DELETE_THREAD",
          payload: thread.id
        });
      } else {
        dispatch({
          type: "RECEIVE_THREADS",
          payload: [thread]
        });
      }

      dispatchNotification()({
        type: "SUCCESS",
        message: `Removed ${payload.user.fullName} from ${payload.thread.subject}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return thread;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const deleteThread = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.thread
   * @returns {undefined}
   */
  async payload => {
    try {
      await API.deleteThread(payload.thread.id);
      dispatch({
        type: "DELETE_THREAD",
        payload: payload.thread.id
      });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Deleted ${payload.thread.subject}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const markThreadAsRead = dispatch =>
  /*
   * @param {Object} payload.id
   * @returns {Object} Thread
   */
  async payload => {
    let thread;
    try {
      thread = await API.markAsRead(payload.id);
      dispatch({
        type: "RECEIVE_THREADS",
        payload: [thread]
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return thread;
  };
