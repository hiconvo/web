import React, { useState } from "react";

import { errorToString } from "../utils";
import { useActions } from "../redux";
import * as unboundActions from "../actions/user";
import {
  CenterContent,
  TextInput,
  Text,
  Button,
  Box
} from "../components/styles";

export default function ResetPassword({ match, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { key, timestamp, signature } = match.params;
  const { resetPassword } = useActions(unboundActions);

  async function handleResetPassword(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword({
        userID: key,
        password: password1,
        timestamp,
        signature
      });
      history.push("/convos");
    } catch (e) {
      setIsLoading(false);
      setError(errorToString(e));
    }
  }

  return (
    <CenterContent>
      <Box as="form" onSubmit={handleResetPassword}>
        <Text color="error" fontSize={2} mb={4} textAlign="center">
          {error}
        </Text>
        <TextInput
          name="Password"
          type="password"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          required
          mb={2}
        />
        <TextInput
          name="Verify password"
          type="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
          mb={4}
        />
        <Button mt={2} mb={4} type="submit" isLoading={isLoading}>
          Set password
        </Button>
      </Box>
    </CenterContent>
  );
}
