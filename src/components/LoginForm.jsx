import React, { useState } from "react";

import { useSelectors, useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import { getAuthErrors } from "../selectors";
import { Box, TextInput, Button, LinkButton, Text } from "./styles";

export default function LoginForm() {
  const [authErrors] = useSelectors(getAuthErrors);
  const { loginUserWithAuth } = useActions(unboundActions);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    await loginUserWithAuth({ email, password });
    setIsLoading(false);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Box as="form" onSubmit={handleLogin}>
      <Text color="error" fontSize={2} mb={2} textAlign="center">
        {authErrors.message}
      </Text>
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
        mb={4}
      />
      <Button mt={2} mb={4} type="submit" isLoading={isLoading}>
        Login
      </Button>
      <LinkButton to="/login/register" textAlign="center" fontSize={1}>
        Sign up
      </LinkButton>
    </Box>
  );
}
