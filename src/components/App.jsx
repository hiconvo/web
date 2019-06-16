import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme, Reset } from "./styles";
import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import Frame from "./Frame";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Settings from "../pages/Settings";

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Reset>
          <HashRouter>
            <Frame>
              <Switch>
                <Route path="/login" component={Login} />
                <AuthorizedRoute path="/settings" component={Settings} />
                <AuthorizedRoute path="/" component={Main} />
                <Redirect to="/" />
              </Switch>
            </Frame>
          </HashRouter>
        </Reset>
      </ThemeProvider>
    </DataProvider>
  );
}
