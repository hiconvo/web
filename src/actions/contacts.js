import * as API from "../api/contacts";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchContacts = dispatch =>
  /*
   * @returns {undefined}
   */
  async () => {
    try {
      const response = await API.getContacts();
      dispatch({ type: "RECEIVE_CONTACTS", payload: response.contacts });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const addToContacts = dispatch =>
  /*
   * @param {string} userId
   * @returns {undefined}
   */
  async userId => {
    try {
      const response = await API.createContact(userId);
      dispatch({ type: "RECEIVE_CONTACT", payload: response });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Added ${response.fullName} to contacts`
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
export const removeFromContacts = dispatch =>
  /*
   * @param {string} userId
   * @returns {undefined}
   */
  async userId => {
    try {
      const response = await API.deleteContact(userId);
      dispatch({ type: "REMOVE_CONTACT", payload: response });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Removed ${response.fullName} from contacts`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };
