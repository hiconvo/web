import React, { useState } from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import {
  Box,
  Input,
  Button,
  LinkButton,
  Text,
  CenterContent,
  Icon
} from "./styles";

export default function RegistrationForm() {
  const { registerUser } = useActions(unboundActions);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [securityMessage, setSecurityMessage] = useState("");
  const [authErrors, setAuthErrors] = useState({});

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
    } catch (e) {
      if (e.getPayload) {
        setAuthErrors(e.getPayload());
      }
    }

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
      <Input
        name="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={authErrors.firstName}
        required
      />
      <Input
        name="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        error={authErrors.lastName}
      />
      <Input
        name="Email"
        type="email"
        inputmode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={authErrors.email}
        required
      />
      <Input
        name="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={authErrors.password}
        required
        mb={4}
      />
      <Button
        variant="primary"
        mt={2}
        mb={4}
        type="submit"
        isLoading={isLoading}
      >
        <Text fontWeight="inherit" color="inherit" fontSize="inherit">
          Sign up
        </Text>
      </Button>
      <LinkButton to="/login/email" textAlign="center" fontSize={1}>
        <Icon name="arrow_back" mr={1} />
        Back
      </LinkButton>
    </Box>
  );
}
