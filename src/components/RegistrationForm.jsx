import React, { useState } from "react";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";
import { getAuthErrors } from "../selectors";
import { Box, TextInput, Button, LinkButton } from "./styles";

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
    <Box as="form" width="30rem" onSubmit={handleRegistration}>
      <span>{authErrors.message}</span>
      <TextInput
        name="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        error={authErrors.firstName}
      />
      <TextInput
        name="Last name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        error={authErrors.lastName}
      />
      <TextInput
        name="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={authErrors.email}
      />
      <TextInput
        name="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={authErrors.password}
      />
      <Button mt={2} mb={4} type="submit">
        Sign up
      </Button>
      <LinkButton to="/login" textAlign="center" fontSize={1}>
        Login
      </LinkButton>
    </Box>
  );
}
