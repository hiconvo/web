import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors, useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import { getAuthErrors } from "../selectors";
import { Box, TextInput, Button, LinkButton, Text } from "./styles";

import googleLogo from "../media/google-logo.svg";
import facebookLogo from "../media/facebook-logo.svg";

const OAuthButton = styled(Button)`
  background-color: ${themeGet("colors.trueWhite")};
  box-shadow: ${themeGet("shadows.normal")};
  color: ${themeGet("colors.bodytext")};
  margin-bottom: ${themeGet("space.3")};

  &:hover {
    background-color: ${themeGet("colors.lightGray")};
  }
`;

export default function LoginForm() {
  const googleButton = useRef(null);
  const [authErrors] = useSelectors(getAuthErrors);
  const { loginUserWithAuth, loginUserWithOAuth } = useActions(unboundActions);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLoginWithEmail(e) {
    e.preventDefault();
    setIsLoading(true);
    await loginUserWithAuth({ email, password });
    setIsLoading(false);
  }

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

  function handleLoginWithFacebook(e) {
    e.preventDefault();
    setIsLoading(true);

    window.FB.login(
      async response => {
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
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.FB.init({
      appId: "406328056661427",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v3.3"
    });
  }, []);

  return (
    <Box>
      <Box as="form" onSubmit={handleLoginWithEmail}>
        <Text color="error" fontSize={2} mb={2} textAlign="center">
          {authErrors.message}
        </Text>
        <TextInput
          name="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={authErrors.email}
          required
        />
        <TextInput
          name="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={authErrors.password}
          required
          mb={4}
        />
        <Button mt={2} mb={3} type="submit" isLoading={isLoading}>
          Login
        </Button>
      </Box>
      <OAuthButton ref={googleButton}>
        <Box as="img" src={googleLogo} width="2.2rem" mr={2} />
        Login with Google
      </OAuthButton>
      <OAuthButton onClick={handleLoginWithFacebook}>
        <Box as="img" src={facebookLogo} width="2.2rem" mr={2} />
        Login with Facebook
      </OAuthButton>
      <LinkButton to="/login/register" textAlign="center" fontSize={1}>
        Sign up with email
      </LinkButton>
    </Box>
  );
}
