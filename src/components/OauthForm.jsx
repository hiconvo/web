import React from "react";

import LoginWithGoogle from "./LoginGoogle";
import LoginWithFacebook from "./LoginFacebook";
import { Box, LinkButton, Icon, Text } from "./styles";

export default function OauthForm() {
  return (
    <Box>
      <LoginWithGoogle />
      <LoginWithFacebook />
      <LinkButton to="/login/email" variant="white" preserveQuery>
        <Icon name="email" fontSize="2.2rem" mr={2} />
        <Text fontWeight="inherit" color="inherit">
          Continue with email
        </Text>
      </LinkButton>
      <LinkButton to="/forgot">I forgot my password</LinkButton>
    </Box>
  );
}
