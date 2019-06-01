import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Actions, DataContext } from "../redux";

export default function AuthorizedRoute(props) {
  const { component: Component, ...rest } = props;
  const { store, dispatch } = useContext(DataContext);
  const isLoading = store.loading.global;
  const isLoggedIn = Boolean(store.user);

  useEffect(() => {
    if (!isLoggedIn) {
      Actions.loginUserWithToken(dispatch);
    }
  }, [isLoggedIn, dispatch]);

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
