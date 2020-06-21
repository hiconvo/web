import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { theme, Reset } from "./styles";
import { DataProvider } from "../redux";
import AuthorizedRoute from "./AuthorizedRoute";
import DataLoader from "./DataLoader";
import Frame from "./Frame";
import Login from "../pages/Login";
import Events from "../pages/Events";
import NewEvent from "../pages/NewEvent";
import Thread from "../pages/Thread";
import NewThread from "../pages/NewThread";
import Contacts from "../pages/Contacts";
import Settings from "../pages/Settings";
import VerifyEmail from "../pages/VerifyEmail";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Rsvp from "../pages/Rsvp";
import Feed from "../pages/Feed";
import Magic from "../pages/Magic";
import MagicInvite from "../pages/MagicInvite";
import Unsubscribe from "../pages/Unsubscribe";

const ModalBackground = styled(BaseModalBackground).attrs((props) => ({
  ...props,
  id: "ModalBackground"
}))``;

export default function App() {
  return (
    <DataProvider>
      <DataLoader>
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
                    <Route
                      path="/magic/:key/:timestamp/:signature"
                      exact
                      component={Magic}
                    />
                    <AuthorizedRoute
                      path="/invite/:key/:timestamp/:signature"
                      exact
                      component={MagicInvite}
                    />
                    <Route
                      path="/unsubscribe/:key/:timestamp/:signature"
                      exact
                      component={Unsubscribe}
                    />
                    <AuthorizedRoute
                      path="/convos/new"
                      exact
                      component={NewThread}
                    />
                    <AuthorizedRoute
                      path="/convos/:id"
                      exact
                      component={Thread}
                    />
                    <AuthorizedRoute path="/convos" exact component={Feed} />
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
                    <AuthorizedRoute path="/settings" component={Settings} />
                    <Redirect to="/convos" />
                  </Switch>
                </Frame>
              </BrowserRouter>
            </ModalProvider>
          </Reset>
        </ThemeProvider>
      </DataLoader>
    </DataProvider>
  );
}
