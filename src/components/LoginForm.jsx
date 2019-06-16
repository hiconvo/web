import React, { useState } from "react";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";
import { getAuthErrors } from "../selectors";
import { Box, TextInput, Button, LinkButton } from "./styles";

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
    <Box as="form" width="30rem" onSubmit={handleLogin}>
      <span>{authErrors.message}</span>
      <TextInput
        name="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={authErrors.email}
      />
      <TextInput
        name="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        error={authErrors.password}
      />
      <Button mt={2} mb={4} type="submit">
        Login
      </Button>
      <LinkButton to="/login/register" textAlign="right" fontSize={1}>
        Sign up
      </LinkButton>
    </Box>
  );
}
