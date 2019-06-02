import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useRedux } from "../redux";
import { getIsLoggedIn } from "../selectors";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

export default function Login(props) {
  // eslint-disable-next-line no-unused-vars
  const [[isLoggedIn], _] = useRedux([getIsLoggedIn], {});

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/");
    }
  }, [isLoggedIn, props.history]);

  return (
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route path="/login/register" component={RegistrationForm} />
    </Switch>
  );
}
