import React, { useState, useEffect, useRef } from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import { Box, Button, Text } from "./styles";

import facebookLogo from "../media/facebook-logo.svg";

export default function LoginFacebook() {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserWithOAuth } = useActions(unboundActions);
  const fbHasLoaded = useRef(false);

  function handleLoginWithFacebook(e) {
    e.preventDefault();
    setIsLoading(true);

    window.FB.login(
      async (response) => {
        if (response.authResponse) {
          try {
            await loginUserWithOAuth({
              token: response.authResponse.accessToken,
              provider: "facebook"
            });
          } catch (e) {}
          setIsLoading(false);
        } else {
          // User said no
          setIsLoading(false);
        }
      },
      { scope: "public_profile,email" }
    );
  }

  useEffect(() => {
    if (window.FB && !fbHasLoaded.current) {
      window.FB.init({
        appId: "406328056661427",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.3"
      });

      fbHasLoaded.current = true;
    }
  });

  return (
    <Button
      variant="white"
      mb={3}
      onClick={handleLoginWithFacebook}
      isLoading={isLoading}
      color="bodytext"
    >
      <Box as="img" src={facebookLogo} width="2.2rem" mr={2} />
      <Text fontWeight="inherit" color="inherit">
        Continue with Facebook
      </Text>
    </Button>
  );
}
