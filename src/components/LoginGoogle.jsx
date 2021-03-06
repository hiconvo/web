import React, { useState, useEffect, useRef, useCallback } from "react";

import { getGapiAuth2 } from "../utils/gapi";
import { useActions } from "../redux";
import * as unboundAuthActions from "../actions/auth";
import * as unboundNotificationActions from "../actions/notifications";
import { Box, Button, Text } from "./styles";

import googleLogo from "../media/google-logo.svg";

export default function LoginGoogle() {
  const googleButton = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserWithOAuth, dispatchNotification } = useActions({
    ...unboundAuthActions,
    ...unboundNotificationActions
  });

  const handleLoginWithGoogle = useCallback(
    async (googleUser) => {
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
    getGapiAuth2().then((authInstance) => {
      authInstance &&
        authInstance.attachClickHandler(
          googleButton.current,
          {},
          handleLoginWithGoogle,
          () => {
            // This prevents this error from showing up when users click on
            // and invite link and are already logged in. In that case, the
            // redirect to the event page happens before this code runs, which
            // causes this to fail because the clickHandler can't be attached
            // because the target node has already been unmounted.
            if (window.location.href.includes("login")) {
              dispatchNotification({
                type: "ERROR",
                message: "Something went wrong trying to login with Google"
              });
            }
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
      <Text fontWeight="inherit" color="inherit">
        Continue with Google
      </Text>
    </Button>
  );
}
