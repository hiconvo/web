import { useEffect, useState } from "react";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"
];
const SCOPES = "https://www.googleapis.com/auth/contacts.readonly";

let hasLoaded = false;

export default function useGapi() {
  const [gapi, setGapi] = useState({ ready: false, gapi: null });

  useEffect(() => {
    if (!hasLoaded) {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          })
          .then(() => {
            setGapi({
              ready: true,
              gapi: window.gapi
            });

            hasLoaded = true;
          });
      });
    }
  }, []);

  return gapi;
}
