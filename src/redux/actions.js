import API from "../api";

export const loginUserWithToken = dispatch => {
  return API.getUser()
    .then(user =>
      dispatch({
        type: "RECEIVE_USER",
        user
      })
    )
    .catch(error => {
      dispatch({ type: "RECEIVE_AUTH_ERROR", error });
      dispatch(logoutUser());
    });
};

export const loginUserWithAuth = ({ username, password }) => dispatch => {
  return API.authenticate(username, password)
    .then(payload => {
      localStorage.setItem("userToken", payload.token);
      return dispatch(loginUserWithToken());
    })
    .catch(error => {
      dispatch({ type: "RECEIVE_AUTH_ERROR", error });
      dispatch(logoutUser());
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("userToken");
  return dispatch({ type: "LOGOUT" });
};
