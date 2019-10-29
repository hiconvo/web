import React, { useState, useEffect, useRef } from "react";

import useGapi from "../hooks/gapi";
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
  const { ready, gapi } = useGapi();

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
    if (ready) {
      gapi.auth2
        .getAuthInstance()
        .attachClickHandler(
          googleButton.current,
          {},
          handleLoginWithGoogle,
          () => {
            // TODO: Capture error with sentry
            dispatchNotification({
              type: "ERROR",
              message: "Something went wrong trying to login with Google"
            });
          }
        );
    }
    // eslint-disable-next-line
  }, [ready, gapi]);

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
