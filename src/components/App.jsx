import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ModalProvider } from "styled-react-modal";

import { theme, Reset } from "./styles";
import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import Frame from "./Frame";
import Login from "../pages/Login";
import Main from "../pages/Main";
import NewThread from "../pages/NewThread";
import Settings from "../pages/Settings";

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Reset>
          <ModalProvider>
            <HashRouter>
              <Frame>
                <Switch>
                  <Route path="/login" component={Login} />
                  <AuthorizedRoute path="/settings" component={Settings} />
                  <AuthorizedRoute path="/convos" exact component={Main} />
                  <AuthorizedRoute
                    path="/convos/new"
                    exact
                    component={NewThread}
                  />
                  <Redirect to="/convos" />
                </Switch>
              </Frame>
            </HashRouter>
          </ModalProvider>
        </Reset>
      </ThemeProvider>
    </DataProvider>
  );
}
