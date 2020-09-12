import React, { useState } from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/user";
import { CenterContent, Input, Text, Button, Box } from "../components/styles";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [securityMessage, setSecurityMessage] = useState("");
  const { forgotPassword } = useActions(unboundActions);

  async function handleForgotPassword(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await forgotPassword({
        email
      });
      setSecurityMessage(response.message);
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
    <CenterContent>
      <Box as="form" onSubmit={handleForgotPassword}>
        <Input
          name="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          mb={2}
        />
        <Button
          variant="primary"
          mt={2}
          mb={4}
          type="submit"
          isLoading={isLoading}
        >
          Reset my password
        </Button>
      </Box>
    </CenterContent>
  );
}
