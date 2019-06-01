import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import AuthForm from "./AuthForm";
import PrimaryLayout from "./PrimaryLayout";

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Switch>
          <Route path="/login" component={AuthForm} />
          <AuthorizedRoute path="/" component={PrimaryLayout} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </DataProvider>
  );
}
