import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { theme, Reset } from "./styles";
import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import Frame from "./Frame";
import Login from "../pages/Login";
import Events from "../pages/Events";
import Contacts from "../pages/Contacts";
import Thread from "../pages/Thread";
import NewEvent from "../pages/NewEvent";
import Settings from "../pages/Settings";
import VerifyEmail from "../pages/VerifyEmail";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Rsvp from "../pages/Rsvp";
import Feed from "../pages/Feed";

const ModalBackground = styled(BaseModalBackground).attrs(props => ({
  ...props,
  id: "ModalBackground"
}))``;

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Reset>
          <ModalProvider backgroundComponent={ModalBackground}>
            <BrowserRouter>
              <Frame>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/forgot" component={ForgotPassword} />
                  <Route
                    path="/verify/:email/:key/:timestamp/:signature"
                    exact
                    component={VerifyEmail}
                  />
                  <Route
                    path="/reset/:key/:timestamp/:signature"
                    exact
                    component={ResetPassword}
                  />
                  <Route
                    path="/rsvp/:eventId/:key/:timestamp/:signature"
                    exact
                    component={Rsvp}
                  />
                  <AuthorizedRoute path="/settings" component={Settings} />
                  <AuthorizedRoute
                    path="/convos/:id"
                    exact
                    component={Thread}
                  />
                  <AuthorizedRoute
                    path="/events/new"
                    exact
                    component={NewEvent}
                  />
                  <AuthorizedRoute
                    path="/events/:id/edit"
                    exact
                    component={NewEvent}
                  />
                  <AuthorizedRoute path="/convos" exact component={Feed} />
                  <AuthorizedRoute
                    path="/events/:id"
                    exact
                    component={Events}
                  />
                  <AuthorizedRoute path="/events" exact component={Events} />
                  <AuthorizedRoute
                    path="/contacts"
                    exact
                    component={Contacts}
                  />
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
