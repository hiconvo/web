import { useEffect, useState } from "react";

import {
  getGapiClient,
  getGapiAuth2,
  grantContactsPerm,
  hasEnabledGoogleContacts,
  setHasEnabledGoogleContacts,
  INTIAL_SCOPES,
  CONTACTS_SCOPES
} from "../utils/gapi";
import { useActions, useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";
import * as unboundAuthActions from "../actions/auth";
import * as unboundNotificationActions from "../actions/notifications";
import useWade from "./wade";

function massageConnections(connections) {
  return connections
    .filter(conn => !!conn.emailAddresses && !!conn.names)
    .map(conn => ({
      email: conn.emailAddresses[0].value,
      id: conn.emailAddresses[0].value,
      firstName: conn.names[0].givenName,
      lastName: conn.names[0].familyName,
      fullName: conn.names[0].displayName,
      avatar: conn.coverPhotos && conn.coverPhotos[0].url,
      googleContact: true
    }));
}

const alreadyEnabled = hasEnabledGoogleContacts();

let cachedResults = null;

export default function useGoogleContacts() {
  const [results, setResults] = useState([]);
  const [enabled, setEnabled] = useState(alreadyEnabled);
  const [ready, setReady] = useState(false);
  const { loginUserWithOAuth, dispatchNotification } = useActions({
    ...unboundAuthActions,
    ...unboundNotificationActions
  });
  const [isLoggedIn] = useSelectors(getIsLoggedIn);

  function initGoogleContacts() {
    setEnabled(true);
  }

  useEffect(() => {
    if (enabled && !ready) {
      getGapiAuth2().then(authInstance => {
        // If the user is signed in, ask for permission to use their contacts
        // if they haven't done so already.
        if (authInstance.isSignedIn.get()) {
          const googleUser = authInstance.currentUser.get();

          if (googleUser.hasGrantedScopes(CONTACTS_SCOPES)) {
            grantContactsPerm(googleUser).then(() => {
              setReady(true);
            });
          }
        } else {
          // The user has not signed in with Google. Log them in with the
          // contacts scopes plus the usual.
          authInstance
            .signIn({
              scope: INTIAL_SCOPES + " " + CONTACTS_SCOPES
            })
            .then(googleUser => {
              const authResponse = googleUser.getAuthResponse();

              loginUserWithOAuth({
                token: authResponse.id_token,
                provider: "google"
              })
                .then(() => {
                  setReady(true);
                })
                .catch(() => {
                  dispatchNotification({
                    message: "Something went wrong trying to login with Google",
                    type: "ERROR"
                  });
                });
            });
        }
      });
    }
  }, [enabled]);

  useEffect(() => {
    if (cachedResults) {
      setResults(cachedResults);
    } else if (ready && !cachedResults) {
      getGapiClient().then(client => {
        client.people.people.connections
          .list({
            resourceName: "people/me",
            pageSize: 100,
            personFields: "names,emailAddresses,coverPhotos",
            sortOrder: "LAST_MODIFIED_DESCENDING"
          })
          .then(response => {
            cachedResults = massageConnections(response.result.connections);
            setResults(cachedResults);

            // Save to the broser that contacts has been enabled so that
            // we don't ask again when the user comes back etc. The user
            // will have to initialize again if they logout.
            setHasEnabledGoogleContacts(true);

            dispatchNotification({
              message: "Loaded your Google contacts"
            });
          });
      });
    }
  }, [ready]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Clear the cachedResults if the user logs out.
      cachedResults = null;
    }
  }, [isLoggedIn]);

  return [enabled, initGoogleContacts, useWade(results)];
}
