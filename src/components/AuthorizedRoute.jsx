import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";
import { getIsLoggedIn, getIsLoading } from "../selectors";

export default function AuthorizedRoute(props) {
  const { component: Component, ...rest } = props;
  const [[isLoading, isLoggedIn], { loginUserWithToken }] = useRedux(
    [getIsLoading, getIsLoggedIn],
    unboundActions
  );

  useEffect(() => {
    if (!isLoggedIn) {
      loginUserWithToken();
    }
  }, [isLoggedIn, loginUserWithToken]);

  return (
    <Route
      {...rest}
      render={() => {
        if (isLoading) {
          return <span>Loading...</span>;
        } else if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
