import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { useRedux } from "../redux";
import { getIsLoggedIn } from "../selectors";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const CenterContent = styled.div`
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export default function Login(props) {
  // eslint-disable-next-line no-unused-vars
  const [[isLoggedIn], _] = useRedux([getIsLoggedIn], {});

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/");
    }
  }, [isLoggedIn, props.history]);

  return (
    <CenterContent>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route path="/login/register" component={RegistrationForm} />
      </Switch>
    </CenterContent>
  );
}
