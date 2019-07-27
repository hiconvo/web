import * as API from "../api/user";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const updateUser = dispatch =>
  /*
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.firstName
   * @param {string} payload.lastName
   * @param {bool} payload.password
   * @returns {undefined}
   */
  async payload => {
    try {
      const user = await API.updateUser(payload);
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });
      dispatchNotification()({ type: "SUCCESS", message: "Updated profile" });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const sendResetPasswordEmail = dispatch =>
  /*
   * @returns {undefined}
   */
  async () => {
    try {
      const user = await API.updateUser({ password: true });
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });
      dispatchNotification()({
        type: "SUCCESS",
        message: "Sent password reset email"
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
export const sendVerifyEmail = dispatch =>
  /*
   * @returns {undefined}
   */
  async () => {
    try {
      const user = await API.sendVerifyEmail();
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });
      dispatchNotification()({ type: "SUCCESS", message: "Sent verify email" });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };
