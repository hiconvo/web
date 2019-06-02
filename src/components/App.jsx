import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import Login from "../pages/Login";
import Main from "../pages/Main";

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthorizedRoute path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </DataProvider>
  );
}
