import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { baseMinHeight } from "./styles";
import { useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";
import LoginForm from "../components/LoginForm";
import OauthForm from "../components/OauthForm";
import RegistrationForm from "../components/RegistrationForm";
import { Heading, Text, Box } from "../components/styles";

const CenterContent = styled.div`
  ${baseMinHeight}
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${themeGet("media.tablet")} {
    justify-content: unset;
  }
`;

const Container = styled.div`
  max-width: 30rem;
  width: 100%;
  padding: ${themeGet("space.2")};
`;

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn] = useSelectors(getIsLoggedIn);
  const query = new URLSearchParams(location.search);
  const next = query.get("next");
  const copy = next
    ? "Login or sign up to continue"
    : "Login or sign up for Convo";

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem("userToken")) {
      if (next) {
        history.push(next);
      } else {
        history.push("/");
      }
    }
  }, [isLoggedIn, history, next]);

  return (
    <CenterContent>
      <Box mb={4} alignItems="center">
        <Heading fontSize={4} fontWeight="semiBold" mb={1}>
          {next ? "You're invited" : "Convo"}
        </Heading>
        <Text color="darkGray">
          {copy}{" "}
          <span role="img" aria-label="sparkles">
            ✨
          </span>
        </Text>
      </Box>
      <Container>
        <Switch>
          <Route exact path="/login" component={OauthForm} />
          <Route exact path="/login/email" component={LoginForm} />
          <Route path="/login/register" component={RegistrationForm} />
        </Switch>
      </Container>
    </CenterContent>
  );
}
