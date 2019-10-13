import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { Heading, Text, Box } from "../components/styles";

const CenterContent = styled.div`
  min-height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("footerHeight")})
  );
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
  const [isLoggedIn] = useSelectors(getIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  return (
    <CenterContent>
      <Box mb={4} alignItems="center">
        <Heading fontSize={4} fontWeight="semiBold" mb={1}>
          Convo
        </Heading>
        <Text color="darkGray">Messaging + Events</Text>
      </Box>
      <Container>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route path="/login/register" component={RegistrationForm} />
        </Switch>
      </Container>
    </CenterContent>
  );
}
