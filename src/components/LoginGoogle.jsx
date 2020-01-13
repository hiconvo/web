import React, { useState, useEffect, useRef, useCallback } from "react";

import { getGapiAuth2 } from "../utils/gapi";
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

  const handleLoginWithGoogle = useCallback(
    async googleUser => {
      setIsLoading(true);

      const authResponse = googleUser.getAuthResponse();

      try {
        await loginUserWithOAuth({
          token: authResponse.id_token,
          provider: "google"
        });
      } catch (e) {}

      setIsLoading(false);
    },
    [loginUserWithOAuth]
  );

  useEffect(() => {
    getGapiAuth2().then(authInstance => {
      authInstance.attachClickHandler(
        googleButton.current,
        {},
        handleLoginWithGoogle,
        () => {
          dispatchNotification({
            type: "ERROR",
            message: "Something went wrong trying to login with Google"
          });
        }
      );
    });
  }, [dispatchNotification, handleLoginWithGoogle]);

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
