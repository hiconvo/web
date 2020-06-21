import * as API from "../api/messages";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchThreadMessages = (dispatch) =>
  /*
   * @param {string} threadId
   * @returns {undefined}
   */
  async (threadId) => {
    try {
      const response = await API.getThreadMessages(threadId);
      dispatch({ type: "RECEIVE_MESSAGES", payload: response.messages });
    } catch (e) {
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const createThreadMessage = (dispatch) =>
  /*
   * @param {string} threadId
   * @param {Object} payload
   * @param {string} payload.body
   * @param {string} payload.blob
   * @returns {Object} message
   */
  async (threadId, payload) => {
    try {
      const message = await API.putThreadMessage(threadId, payload);
      dispatch({ type: "RECEIVE_MESSAGES", payload: [message] });
      return message;
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const deleteThreadMessage = (dispatch) =>
  /*
   * @param {string} threadId
   * @param {string} messageId
   * @returns {Object} message
   */
  async (threadId, messageId) => {
    try {
      const message = await API.deleteThreadMessage(threadId, messageId);
      dispatch({ type: "DELETE_MESSAGES", payload: [message] });
      return message;
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchEventMessages = (dispatch) =>
  /*
   * @param {string} eventId
   * @returns {undefined}
   */
  async (eventId) => {
    try {
      const response = await API.getEventMessages(eventId);
      dispatch({ type: "RECEIVE_MESSAGES", payload: response.messages });
    } catch (e) {
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const createEventMessage = (dispatch) =>
  /*
   * @param {string} eventId
   * @param {Object} payload
   * @param {string} payload.body
   * @returns {undefined}
   */
  async (eventId, payload) => {
    try {
      const message = await API.putEventMessage(eventId, payload);
      dispatch({ type: "RECEIVE_MESSAGES", payload: [message] });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const deleteEventMessage = (dispatch) =>
  /*
   * @param {string} eventId
   * @param {string} messageId
   * @returns {Object} message
   */
  async (eventId, messageId) => {
    try {
      const message = await API.deleteEventMessage(eventId, messageId);
      dispatch({ type: "DELETE_MESSAGES", payload: [message] });
      return message;
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };
