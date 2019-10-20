import React, { useState, useEffect, useRef } from "react";

import { useActions } from "../redux";
import * as unboundAuthActions from "../actions/auth";
import * as unboundNotificationActions from "../actions/notifications";
import { Box, Button } from "./styles";

import googleLogo from "../media/google-logo.svg";

export default function LoginGoogle() {
  const googleButton = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserWithOAuth, dispatchNotification } = useActions({
    ...unboundAuthActions,
    ...unboundNotificationActions
  });

  async function handleLoginWithGoogle(googleUser) {
    setIsLoading(true);

    const authResponse = googleUser.getAuthResponse();

    try {
      await loginUserWithOAuth({
        token: authResponse.id_token,
        provider: "google"
      });
    } catch (e) {}

    setIsLoading(false);
  }

  useEffect(() => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id:
          "622841681899-gi5un2upb17a7c7i204objv9hkdr5sp5.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin"
      });

      auth2.attachClickHandler(
        googleButton.current,
        {},
        handleLoginWithGoogle,
        error => {
          // TODO: Capture error with sentry
          dispatchNotification({
            type: "ERROR",
            message: "Something went wrong trying to login with Google"
          });
        }
      );
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Button
      variant="white"
      mb={3}
      ref={googleButton}
      isLoading={isLoading}
      color="bodytext"
    >
      <Box as="img" src={googleLogo} width="2.2rem" mr={2} />
      Continue with Google
    </Button>
  );
}
