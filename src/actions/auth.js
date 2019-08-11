import * as API from "../api/auth";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const loginUserWithToken = dispatch =>
  /*
   * @returns {undefined}
   */
  async () => {
    if (localStorage.getItem("userToken")) {
      try {
        const user = await API.getUser();
        dispatch({
          type: "RECEIVE_USER",
          payload: user
        });
      } catch (error) {
        dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error.getPayload() });
        logoutUser(dispatch)();
      }
    } else {
      logoutUser(dispatch)();
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const loginUserWithAuth = dispatch =>
  /*
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.password
   * @returns {undefined}
   */
  async payload => {
    try {
      const maybeUser = await API.authenticate(payload);
      if (maybeUser.id) {
        localStorage.setItem("userToken", maybeUser.token);
        dispatch({
          type: "RECEIVE_USER",
          payload: maybeUser
        });
      } else if (maybeUser.message) {
        dispatchNotification(dispatch)({
          type: "ERROR",
          message: maybeUser.message
        });
      }

      return maybeUser;
    } catch (error) {
      dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error.getPayload() });
      logoutUser(dispatch)();
      return {};
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const loginUserWithOAuth = dispatch =>
  /*
   * @param {Object} payload
   * @param {string} payload.token
   * @param {string} payload.provider
   * @returns {undefined}
   */
  async payload => {
    try {
      const user = await API.oauth(payload);
      localStorage.setItem("userToken", user.token);
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      logoutUser(dispatch)();
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const logoutUser = dispatch =>
  /*
   * @returns {undefined}
   */
  () => {
    localStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const registerUser = dispatch =>
  /*
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.password
   * @param {string} payload.firstName
   * @param {string} [payload.lastName]
   * @returns {undefined}
   */
  async payload => {
    try {
      const user = await API.createUser(payload);
      if (user.message) {
        return user;
      } else {
        localStorage.setItem("userToken", user.token);
        dispatch({
          type: "RECEIVE_USER",
          payload: user
        });
      }
    } catch (error) {
      dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error.getPayload() });
      logoutUser(dispatch)();
    }
  };
