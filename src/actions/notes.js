import * as API from "../api/notes";
import { errorToString } from "../utils";
import { dispatchNotification } from "./notifications";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchNotes = (dispatch) =>
  /*
   * @returns {undefined}
   */
  async (pageNumber = 0) => {
    try {
      const response = await API.getNotes(pageNumber);
      dispatch({
        type: "RECEIVE_NOTES",
        payload: response.notes,
        pageNumber
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
export const fetchNote = (dispatch) =>
  /*
   * @returns {undefined}
   */
  async (id) => {
    let note;
    try {
      note = await API.getNote(id);
      dispatch({
        type: "RECEIVE_NOTES_MERGE",
        payload: [note]
      });
    } catch (e) {
      return Promise.reject(e);
    }
    return note;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const createNote = (dispatch) =>
  /*
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.body
   * @param {string} payload.url
   * @param {string} payload.favicon
   * @returns {Object} Note
   */
  async (payload) => {
    let note;
    try {
      note = await API.createNote(payload);
      dispatch({
        type: "RECEIVE_NOTES_MERGE",
        payload: [note]
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
    return note;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const updateNote = (dispatch) =>
  /*
   * @param {Object} payload
   * @param {string} payload.id
   * @param {string} [payload.name]
   * @param {string} [payload.body]
   * @param {string} [payload.url]
   * @param {string} [payload.favicon]
   * @param {bool} [payload.pin]
   * @returns {Object} Note
   */
  async (payload) => {
    try {
      const note = await API.updateNote(payload.id, payload);
      dispatch({
        type: "RECEIVE_NOTES_MERGE",
        payload: [note]
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
export const deleteNote = (dispatch) =>
  /*
   * @param {Object} payload
   * @param {Object} payload.note
   * @returns {undefined}
   */
  async (payload) => {
    try {
      await API.deleteNote(payload.note.id);
      dispatch({
        type: "DELETE_NOTE",
        payload: payload.note.id
      });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Deleted ${payload.note.name}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };
