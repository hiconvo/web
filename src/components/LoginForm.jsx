import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";

import { getAuthErrors } from "../selectors";

export default function LoginForm() {
  const [[authErrors], { loginUserWithAuth }] = useRedux(
    [getAuthErrors],
    unboundActions
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <span>{authErrors.message}</span>
      <label>
        <span>email</span>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          name="email"
        />
        <span>{authErrors.email}</span>
      </label>
      <label>
        <span>password</span>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          name="password"
        />
        <span>{authErrors.password}</span>
      </label>
      <button type="submit">Login</button>
      <Link to="/login/register">Sign Up</Link>
    </form>
  );
}
