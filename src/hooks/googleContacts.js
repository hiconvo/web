import { useEffect, useState } from "react";

import useWade from "./wade";
import useGapi from "./gapi";

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

export default function useGoogleContacts() {
  const [results, setResults] = useState([]);
  const { ready, gapi } = useGapi();

  useEffect(() => {
    if (cachedResults) {
      setResults(cachedResults);
    } else if (ready && !cachedResults) {
      gapi.client.people.people.connections
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

  return useWade(results);
}
