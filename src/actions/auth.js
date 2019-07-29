import * as API from "../api/auth";

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
      const user = await API.authenticate(payload);
      localStorage.setItem("userToken", user.token);
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });
    } catch (error) {
      dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error.getPayload() });
      logoutUser(dispatch)();
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
    } catch (error) {
      dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error.getPayload() });
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
      localStorage.setItem("userToken", user.token);
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });
    } catch (error) {
      dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error.getPayload() });
      logoutUser(dispatch)();
    }
  };
