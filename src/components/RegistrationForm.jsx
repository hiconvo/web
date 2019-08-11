import React, { useState } from "react";

import { useActions, useSelectors } from "../redux";
import * as unboundActions from "../actions/auth";
import { getAuthErrors } from "../selectors";
import {
  Box,
  TextInput,
  Button,
  LinkButton,
  Text,
  CenterContent
} from "./styles";

export default function RegistrationForm() {
  const [authErrors] = useSelectors(getAuthErrors);
  const { registerUser } = useActions(unboundActions);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [securityMessage, setSecurityMessage] = useState("");

  async function handleRegistration(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const maybeUser = await registerUser({
        firstName,
        lastName,
        email,
        password
      });
      if (maybeUser.message) {
        setSecurityMessage(maybeUser.message);
      }
    } catch (e) {}

    setIsLoading(false);
  }

  if (securityMessage) {
    return (
      <CenterContent>
        <Text fontSize={3}>{securityMessage}</Text>
      </CenterContent>
    );
  }

  return (
    <Box as="form" onSubmit={handleRegistration}>
      <Text color="error" fontSize={2} mb={2} textAlign="center">
        {authErrors.message}
      </Text>
      <TextInput
        name="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        error={authErrors.firstName}
        required
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
        required
      />
      <TextInput
        name="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={authErrors.password}
        required
        mb={4}
      />
      <Button mt={2} mb={4} type="submit" isLoading={isLoading}>
        Sign up
      </Button>
      <LinkButton to="/login" textAlign="center" fontSize={1}>
        Login
      </LinkButton>
    </Box>
  );
}
