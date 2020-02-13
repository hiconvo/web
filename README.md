# Convo Web

[![Netlify Status](https://img.shields.io/netlify/4115c483-6e1a-4afd-af8c-9157755eda04)](https://app.netlify.com/sites/hiconvo-app/deploys) [![Plausible](https://img.shields.io/badge/plausible-popularity%20contest-blueviolet)](https://plausible.io/app.convo.events)

This repo holds the source code for Convo's web app [app.convo.events](https://app.convo.events).

## Development

In order to run the project locally, you need to create an `.env` file and place it at the root of the project. The `.env` file should contain a Google API key and a Google Client ID. It should look something like this:

```
REACT_APP_GOOGLE_API_KEY=<YOUR API KEY>
REACT_APP_GOOGLE_CLIENT_ID=<YOUR CLIENT ID>
```

If you don't include this file, Google maps won't work.

To start development, all you have to do is run the following commands.

```
# Install dependencies
yarn

# Start the server
yarn start
```

