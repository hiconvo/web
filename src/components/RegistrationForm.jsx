import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";

import {
  getFirstNameError,
  getLastNameError,
  getEmailError,
  getPasswordError,
  getGeneralError
} from "../selectors";

export default function RegistrationForm() {
  const [
    [firstNameError, lastNameError, emailError, passwordError, generalError],
    { registerUser }
  ] = useRedux(
    [
      getFirstNameError,
      getLastNameError,
      getEmailError,
      getPasswordError,
      getGeneralError
    ],
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
      <span>{generalError}</span>
      <label>
        <span>first name</span>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          name="firstName"
        />
        <span>{firstNameError}</span>
      </label>
      <label>
        <span>last name</span>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          name="lastName"
        />
        <span>{lastNameError}</span>
      </label>
      <label>
        <span>email</span>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
        />
        <span>{emailError}</span>
      </label>
      <label>
        <span>password</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
        />
        <span>{passwordError}</span>
      </label>
      <button type="submit">Sign Up</button>
      <Link to="/login">Login</Link>
    </form>
  );
}
