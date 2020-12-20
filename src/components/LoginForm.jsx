import React, { useState } from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import {
  Box,
  Input,
  Button,
  LinkButton,
  Text,
  Icon,
  Paragraph
} from "./styles";

export default function LoginForm() {
  const { loginUserWithAuth } = useActions(unboundActions);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authErrors, setAuthErrors] = useState({});

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLoginWithEmail(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUserWithAuth({ email, password });
    } catch (e) {
      if (e.getPayload) {
        setAuthErrors(e.getPayload());
      }
    }
    setIsLoading(false);
  }

  return (
    <Box>
      <LinkButton to="/login/register" variant="white" preserveQuery>
        <Icon name="email" fontSize="2.2rem" mr={2} />
        Sign up with email
      </LinkButton>
      <Paragraph textAlign="center" fontSize={2} mt={4} mb={3} color="darkGray">
        &mdash; Or login to your account below &mdash;
      </Paragraph>
      <Box as="form" onSubmit={handleLoginWithEmail}>
        <Text color="error" fontSize={2} mb={2} textAlign="center">
          {authErrors.message}
        </Text>
        <Input
          name="Email"
          type="email"
          inputmode="email"
          value={email}
          onChange={handleEmailChange}
          error={authErrors.email}
          required
          autoFocus
        />
        <Input
          name="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={authErrors.password}
          required
          mb={4}
        />
        <Button
          variant="primary"
          mt={2}
          mb={3}
          type="submit"
          isLoading={isLoading}
        >
          <Text fontWeight="inherit" color="inherit" fontSize="inherit">
            Login
          </Text>
        </Button>
      </Box>
      <LinkButton to="/login" preserveQuery>
        <Icon name="arrow_back" mr={1} />
        Back
      </LinkButton>
    </Box>
  );
}
