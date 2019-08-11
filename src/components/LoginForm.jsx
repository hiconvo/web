import React, { useState } from "react";

import { useSelectors, useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import { getAuthErrors } from "../selectors";
import { Box, TextInput, Button, LinkButton, Text } from "./styles";
import LoginWithGoogle from "./LoginGoogle";
import LoginWithFacebook from "./LoginFacebook";

export default function LoginForm() {
  const [authErrors] = useSelectors(getAuthErrors);
  const { loginUserWithAuth } = useActions(unboundActions);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLoginWithEmail(e) {
    e.preventDefault();
    setIsLoading(true);
    await loginUserWithAuth({ email, password });
    setIsLoading(false);
  }

  return (
    <Box>
      <Box as="form" onSubmit={handleLoginWithEmail}>
        <Text color="error" fontSize={2} mb={2} textAlign="center">
          {authErrors.message}
        </Text>
        <TextInput
          name="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={authErrors.email}
          required
        />
        <TextInput
          name="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={authErrors.password}
          required
          mb={4}
        />
        <Button mt={2} mb={3} type="submit" isLoading={isLoading}>
          Login
        </Button>
      </Box>
      <LoginWithGoogle />
      <LoginWithFacebook />
      <LinkButton to="/login/register" textAlign="center" fontSize={1}>
        Sign up with email
      </LinkButton>
    </Box>
  );
}
