import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme, Reset } from "./styles";
import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import Login from "../pages/Login";
import Main from "../pages/Main";

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Reset>
          <HashRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <AuthorizedRoute path="/" component={Main} />
              <Redirect to="/" />
            </Switch>
          </HashRouter>
        </Reset>
      </ThemeProvider>
    </DataProvider>
  );
}
