# Convo Web

[![Netlify Status](https://img.shields.io/netlify/4115c483-6e1a-4afd-af8c-9157755eda04)](https://app.netlify.com/sites/hiconvo-app/deploys) [![Plausible](https://img.shields.io/badge/plausible-popularity%20contest-blueviolet)](https://plausible.io/app.hiconvo.com)

This repo holds the source code for Convo's web app [app.hiconvo.com](https://app.hiconvo.com).

## Development

```
# Install dependencies
yarn

# Start the server
yarn start
```

### Code Smells

- `<InfoBoxMemberItem />` takes `member` prop instead of `user`, which is inconsistent.
