import React from "react";

import LoginWithGoogle from "./LoginGoogle";
import LoginWithFacebook from "./LoginFacebook";
import { Box, LinkButton, Icon } from "./styles";

export default function OauthForm() {
  return (
    <Box>
      <LoginWithGoogle />
      <LoginWithFacebook />
      <LinkButton to="/login/email" variant="white">
        <Icon name="email" fontSize="2.2rem" mr={2} />
        Continue with email
      </LinkButton>
      <LinkButton to="/forgot">I forgot my password</LinkButton>
    </Box>
  );
}
