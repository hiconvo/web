import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";

import { getAuthErrors } from "../selectors";

export default function RegistrationForm() {
  const [[authErrors], { registerUser }] = useRedux(
    [getAuthErrors],
    unboundActions
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegistration(e) {
    e.preventDefault();
    registerUser({ firstName, lastName, email, password });
  }

  return (
    <form onSubmit={handleRegistration}>
      <span>{authErrors.message}</span>
      <label>
        <span>first name</span>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          name="firstName"
        />
        <span>{authErrors.firstName}</span>
      </label>
      <label>
        <span>last name</span>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          name="lastName"
        />
        <span>{authErrors.lastName}</span>
      </label>
      <label>
        <span>email</span>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
        />
        <span>{authErrors.email}</span>
      </label>
      <label>
        <span>password</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
        />
        <span>{authErrors.password}</span>
      </label>
      <button type="submit">Sign Up</button>
      <Link to="/login">Login</Link>
    </form>
  );
}
