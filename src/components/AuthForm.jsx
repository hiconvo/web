import React, { useState, useContext, useEffect } from "react";

import { Actions, DataContext } from "../redux";

function getEmailError(store) {
  return (store.errors.auth && store.errors.auth.email) || "";
}

function getPasswordError(store) {
  return (store.errors.auth && store.errors.auth.password) || "";
}

function getGeneralError(store) {
  return (store.errors.auth && store.errors.auth.message) || "";
}

export default function Auth(props) {
  const { store, dispatch } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailError = getEmailError(store);
  const passwordError = getPasswordError(store);
  const generalError = getGeneralError(store);
  const isLoggedIn = Boolean(store.user);

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/");
    }
  }, [isLoggedIn, props.history]);

  function handleLogin(e) {
    e.preventDefault();
    Actions.loginUserWithAuth(dispatch, { email, password });
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
