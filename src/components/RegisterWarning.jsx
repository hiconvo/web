import React from "react";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import { Box, Text } from "../components/styles";

export default function RegisterWarning() {
  const [user] = useSelectors(getUser);

  const isRegistered =
    user.isPasswordSet || user.isGoogleLinked || user.isFacebookLinked;
  const isVerifed = user.verified;

  if (!isRegistered || !isVerifed) {
    return (
      <Box borderRadius="normal" backgroundColor="error100" p={3} mb={4}>
        <Text color="error900">
          {!isRegistered
            ? `You need to register your account before you can create Convos or events.`
            : `You need to verify your email address before you can create Convos or events.`}
        </Text>
      </Box>
    );
  }

  return null;
}
