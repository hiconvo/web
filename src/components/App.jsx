import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ModalProvider } from "styled-react-modal";

import { theme, Reset } from "./styles";
import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import Frame from "./Frame";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Contacts from "../pages/Contacts";
import Events from "../pages/Events";
import NewThread from "../pages/NewThread";
import Settings from "../pages/Settings";
import VerifyEmail from "../pages/VerifyEmail";
import ResetPassword from "../pages/ResetPassword";

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Reset>
          <ModalProvider>
            <BrowserRouter>
              <Frame>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route
                    path="/verify/:key/:timestamp/:signature"
                    exact
                    component={VerifyEmail}
                  />
                  <Route
                    path="/reset/:key/:timestamp/:signature"
                    exact
                    component={ResetPassword}
                  />
                  <AuthorizedRoute path="/settings" component={Settings} />
                  <AuthorizedRoute path="/convos" exact component={Main} />
                  <AuthorizedRoute
                    path="/convos/new"
                    exact
                    component={NewThread}
                  />
                  <AuthorizedRoute
                    path="/contacts"
                    exact
                    component={Contacts}
                  />
                  <AuthorizedRoute path="/events" exact component={Events} />
                  <Redirect to="/convos" />
                </Switch>
              </Frame>
            </BrowserRouter>
          </ModalProvider>
        </Reset>
      </ThemeProvider>
    </DataProvider>
  );
}
