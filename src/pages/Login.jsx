import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const CenterContent = styled.div`
  height: calc(100vh - ${themeGet("headerHeight")});
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Container = styled.div`
  max-width: 30rem;
  width: 100%;
  padding: ${themeGet("space.2")};
`;

export default function Login(props) {
  const [isLoggedIn] = useSelectors(getIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/");
    }
  }, [isLoggedIn, props.history]);

  return (
    <CenterContent>
      <Container>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route path="/login/register" component={RegistrationForm} />
        </Switch>
      </Container>
    </CenterContent>
  );
}
