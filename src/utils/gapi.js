const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"
];
export const CONTACTS_SCOPES =
  "https://www.googleapis.com/auth/contacts.readonly";
export const INTIAL_SCOPES = "profile email";

export function hasEnabledGoogleContacts() {
  return "true" === window.localStorage.getItem("googleContacts");
}

export function setHasEnabledGoogleContacts(val) {
  if (val) {
    window.localStorage.setItem("googleContacts", "true");
  } else {
    window.localStorage.removeItem("googleContacts");
  }
}

export function getGapiClient() {
  return new Promise(resolve => {
    if (window.gapi.client) {
      resolve(window.gapi.client);
    } else {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: hasEnabledGoogleContacts()
              ? INTIAL_SCOPES + " " + CONTACTS_SCOPES
              : INTIAL_SCOPES,
            discoveryDocs: DISCOVERY_DOCS
          })
          .then(() => {
            resolve(window.gapi.client);
          });
      });
    }
  });
}

export function getGapiAuth2() {
  return new Promise(resolve => {
    getGapiClient().then(() => {
      const auth2 = window.gapi.auth2.getAuthInstance();

      resolve(auth2);
    });
  });
}

export function grantContactsPerm(googleUser) {
  return new Promise((resolve, reject) => {
    const options = new window.gapi.auth2.SigninOptionsBuilder({
      scope: CONTACTS_SCOPES
    });

    googleUser
      .grant(options)
      .then(success => resolve(success), error => reject(error));
  });
}
