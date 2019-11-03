const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"
];
export const SCOPES =
  "profile email https://www.googleapis.com/auth/contacts.readonly";

export function getGapiAuth2() {
  return new Promise(resolve => {
    if (window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance();

      resolve(auth2);
    } else {
      window.gapi.load("auth2", () => {
        const auth2 = window.gapi.auth2.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          cookiepolicy: "single_host_origin"
        });

        resolve(auth2);
      });
    }
  });
}

export function getGapiClient() {
  return new Promise(resolve => {
    if (window.gapi.client) {
      resolve(window.gapi.client);
    } else {
      window.gapi.load("client", () => {
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: SCOPES,
            discoveryDocs: DISCOVERY_DOCS
          })
          .then(() => {
            resolve(window.gapi.client);
          });
      });
    }
  });
}
