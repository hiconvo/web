import { useEffect, useState } from "react";

import { getGapiClient, getGapiAuth2, SCOPES } from "../utils/gapi";
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

const alreadyEnabled = "true" === window.localStorage.getItem("googleContacts");
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
    console.log("wut", enabled, ready);
    if (enabled && !ready) {
      console.log("trying to get gapi auth2");
      getGapiAuth2().then(authInstance => {
        if (authInstance.isSignedIn.get()) {
          console.log("setting ready");
          setReady(true);
        } else {
          authInstance
            .signIn({
              scope: SCOPES
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
    console.log("triggered");
    if (cachedResults) {
      console.log("cachedResults");
      setResults(cachedResults);
    } else if (ready && !cachedResults) {
      console.log("getting gapi client");
      getGapiClient().then(client => {
        console.log("got client");
        client.people.people.connections
          .list({
            resourceName: "people/me",
            pageSize: 100,
            personFields: "names,emailAddresses,coverPhotos",
            sortOrder: "LAST_MODIFIED_DESCENDING"
          })
          .then(response => {
            console.log("got response");
            cachedResults = massageConnections(response.result.connections);
            setResults(cachedResults);
            window.localStorage.setItem("googleContacts", "true");
            dispatchNotification({
              message: "Loaded your Google contacts"
            });
          });
      });
    }
  }, [ready]);

  useEffect(() => {
    if (!isLoggedIn) {
      cachedResults = null;
    }
  }, [isLoggedIn]);

  return [enabled, initGoogleContacts, useWade(results)];
}
