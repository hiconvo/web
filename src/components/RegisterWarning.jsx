import React from "react";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import { Box, Text } from "../components/styles";

export default function RegisterWarning() {
  const [user] = useSelectors(getUser);

  if (!(user.isPasswordSet || user.isGoogleLinked || user.isFacebookLinked)) {
    return (
      <Box borderRadius="normal" backgroundColor="error100" p={3} mb={4}>
        <Text color="error900">
          You need to register your account before you can create Convos or
          events.
        </Text>
      </Box>
    );
  }

  return null;
}
