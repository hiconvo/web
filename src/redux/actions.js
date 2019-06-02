import API from "../api";

/*
 * @param {function} dispatch
 * @returns {undefined}
 */
export const loginUserWithToken = async dispatch => {
  if (localStorage.getItem("userToken")) {
    try {
      const user = await API.getUser();
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });
    } catch (error) {
      dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error });
      logoutUser(dispatch);
    }
  } else {
    logoutUser(dispatch);
  }
};

/*
 * @param {function} dispatch
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} payload.firstName
 * @param {string} [payload.lastName]
 * @returns {undefined}
 */
export const loginUserWithAuth = async (dispatch, payload) => {
  try {
    const user = await API.authenticate(payload);
    localStorage.setItem("userToken", user.token);
    dispatch({
      type: "RECEIVE_USER",
      payload: user
    });
  } catch (error) {
    dispatch({ type: "RECEIVE_AUTH_ERROR", payload: error });
    logoutUser(dispatch);
  }
};

/*
 * @param {function} dispatch
 * @returns {undefined}
 */
export const logoutUser = dispatch => {
  localStorage.removeItem("userToken");
  dispatch({ type: "LOGOUT" });
};
