import { useEffect, useState } from "react";

import useWade from "./wade";

const SCOPES = "https://www.googleapis.com/auth/contacts.readonly";

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

let cachedResults = null;
let hasLoaded = false;

export default function useGoogleContacts() {
  const [results, setResults] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  function initGoogleContacts() {
    setEnabled(true);
  }

  useEffect(() => {
    if (enabled && !hasLoaded) {
      window.gapi.load("client", () => {
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: SCOPES
          })
          .then(() => {
            setReady(true);

            hasLoaded = true;
          });
      });
    }
  }, [enabled]);

  useEffect(() => {
    if (cachedResults) {
      setResults(cachedResults);
    } else if (ready && !cachedResults) {
      window.gapi.client.people.people.connections
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
    }
  }, [ready]);

  return [enabled, initGoogleContacts, useWade(results)];
}
