import React, { useState, useEffect } from "react";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";

import {
  getEmailError,
  getPasswordError,
  getGeneralError,
  getIsLoggedIn
} from "../selectors";

export default function AuthForm(props) {
  const [
    [emailError, passwordError, generalError, isLoggedIn],
    { loginUserWithAuth }
  ] = useRedux(
    [getEmailError, getPasswordError, getGeneralError, getIsLoggedIn],
    unboundActions
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/");
    }
  }, [isLoggedIn, props.history]);

  function handleLogin(e) {
    e.preventDefault();
    loginUserWithAuth({ email, password });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleLogin}>
      <span>{generalError}</span>
      <label>
        <span>email</span>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          name="email"
        />
        <span>{emailError}</span>
      </label>
      <label>
        <span>password</span>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          name="password"
        />
        <span>{passwordError}</span>
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
