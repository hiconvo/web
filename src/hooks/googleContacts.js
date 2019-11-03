import { useEffect, useState } from "react";

import { getGapiClient, getGapiAuth2, SCOPES } from "../utils/gapi";
import { useActions } from "../redux";
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

  function initGoogleContacts() {
    setEnabled(true);
    window.localStorage.setItem("googleContacts", "true");
  }

  useEffect(() => {
    if (enabled && !ready) {
      getGapiClient().then(() => {
        getGapiAuth2().then(authInstance => {
          if (authInstance.isSignedIn.get()) {
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
                    dispatchNotification({
                      message: "Connected your Google contacts"
                    });
                  })
                  .catch(() => {
                    dispatchNotification({
                      message:
                        "Something went wrong trying to login with Google",
                      type: "ERROR"
                    });
                  });
              });
          }
        });
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
          });
      });
    }
  }, [ready]);

  return [enabled, initGoogleContacts, useWade(results)];
}
