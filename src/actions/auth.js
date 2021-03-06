import * as API from "../api/auth";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";
import { getGapiAuth2, setHasEnabledGoogleContacts } from "../utils/gapi";

function handleAuthError(e, dispatch) {
  if (!e.getPayload) {
    dispatchNotification()({ type: "ERROR", message: errorToString(e) });
  }

  return Promise.reject(e);
}

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const loginUserWithToken = (dispatch) =>
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
        return handleAuthError(error, dispatch);
      }
    } else {
      logoutUser(dispatch)();
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const loginUserWithAuth = (dispatch) =>
  /*
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.password
   * @returns {undefined}
   */
  async (payload) => {
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
      return handleAuthError(error, dispatch);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const loginUserWithOAuth = (dispatch) =>
  /*
   * @param {Object} payload
   * @param {string} payload.token
   * @param {string} payload.provider
   * @returns {undefined}
   */
  async (payload) => {
    try {
      const oldToken = localStorage.getItem("userToken");

      const user = await API.oauth(payload);

      const newToken = user.token;
      localStorage.setItem("userToken", newToken);

      if (oldToken && oldToken !== newToken) {
        // Since the new token is set, the <AuthorizedRoute /> component
        // should log the user in with the new token and fetch all the
        // needed stuff.
        dispatch({
          type: "RECEIVE_MISMATCHED_USER",
          payload: user
        });
      } else {
        dispatch({
          type: "RECEIVE_USER",
          payload: user
        });
      }
    } catch (error) {
      return handleAuthError(error, dispatch);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const magicLogin = (dispatch) =>
  /*
   * @param {Object} payload
   * @param {string} payload.userId
   * @param {string} payload.timestamp
   * @param {string} payload.signature
   * @returns {undefined}
   */
  async (payload) => {
    try {
      const oldToken = localStorage.getItem("userToken");

      const user = await API.magicLogin(payload);

      const newToken = user.token;
      localStorage.setItem("userToken", newToken);

      if (oldToken && oldToken !== newToken) {
        // Since the new token is set, the <AuthorizedRoute /> component
        // should log the user in with the new token and fetch all the
        // needed stuff.
        dispatch({
          type: "RECEIVE_MISMATCHED_USER",
          payload: user
        });
      } else {
        dispatch({
          type: "RECEIVE_USER",
          payload: user
        });
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const logoutUser = (dispatch) =>
  /*
   * @returns {undefined}
   */
  () => {
    localStorage.clear();
    setHasEnabledGoogleContacts(false);
    getGapiAuth2().then((authInstance) => {
      if (authInstance && authInstance.isSignedIn.get()) {
        authInstance.signOut();
      }
    });
    dispatch({ type: "LOGOUT" });
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const registerUser = (dispatch) =>
  /*
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.password
   * @param {string} payload.firstName
   * @param {string} [payload.lastName]
   * @returns {undefined}
   */
  async (payload) => {
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
      return handleAuthError(error, dispatch);
    }
  };
