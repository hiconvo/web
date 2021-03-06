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
import Links from "../pages/Links";
import UpdateLink from "../pages/UpdateLink";
import NewEvent from "../pages/NewEvent";
import Contacts from "../pages/Contacts";
import Settings from "../pages/Settings";
import VerifyEmail from "../pages/VerifyEmail";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Rsvp from "../pages/Rsvp";
import Magic from "../pages/Magic";
import MagicInvite from "../pages/MagicInvite";
import Unsubscribe from "../pages/Unsubscribe";
import NewNote from "../pages/NewNote";
import Note from "../pages/Note";
import SearchLinks from "../pages/SearchLinks";

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
                      path="/links/:id/edit"
                      exact
                      component={UpdateLink}
                    />
                    <AuthorizedRoute
                      path="/links/search"
                      exact
                      component={SearchLinks}
                    />
                    <AuthorizedRoute
                      path="/links/tags"
                      exact
                      component={SearchLinks}
                    />
                    <AuthorizedRoute path="/links" component={Links} />
                    <AuthorizedRoute path="/notes/new" component={NewNote} />
                    <AuthorizedRoute path="/notes/:id" component={Note} />
                    <AuthorizedRoute
                      path="/contacts"
                      exact
                      component={Contacts}
                    />
                    <AuthorizedRoute path="/settings" component={Settings} />
                    <Redirect to="/events" />
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
