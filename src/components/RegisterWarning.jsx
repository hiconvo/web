import React from "react";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import { Box, Paragraph } from "../components/styles";

export default function RegisterWarning() {
  const [user] = useSelectors(getUser);

  const isRegistered =
    user.isPasswordSet || user.isGoogleLinked || user.isFacebookLinked;
  const isVerifed = user.verified;

  if (!isRegistered || !isVerifed) {
    return (
      <Box borderRadius="normal" backgroundColor="error100" p={3} mb={4}>
        <Paragraph color="error900" mb={0} fontSize={1}>
          {!isRegistered
            ? `You need to register your account before you can create Convos or events. Click the person icon in the upper right corner to register.`
            : `For security reasons, you'll need to verify your email address before you can create Convos or events. Click the link in the email that was sent to you to verify.`}
        </Paragraph>
      </Box>
    );
  }

  return null;
}
