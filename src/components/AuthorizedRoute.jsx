import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelectors, useActions } from "../redux";
import * as unboundAuthActions from "../actions/auth";
import { getIsLoggedIn, getIsLoading } from "../selectors";
import { Ripple, CenterContent } from "./styles";

export default function AuthorizedRoute(props) {
  const { component: Component, ...rest } = props;

  const [isLoading, isLoggedIn] = useSelectors(getIsLoading, getIsLoggedIn);
  const { loginUserWithToken } = useActions(unboundAuthActions);

  useEffect(() => {
    if (!isLoggedIn) {
      try {
        loginUserWithToken().catch(() => {});
      } catch (e) {}
    }
  }, [isLoggedIn, loginUserWithToken]);

  return (
    <Route
      {...rest}
      render={() => {
        if (isLoading) {
          return (
            <CenterContent>
              <Ripple />
            </CenterContent>
          );
        } else if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
