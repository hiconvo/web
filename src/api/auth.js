import apiRequest from "./apiRequest";

export function getUser() {
  return apiRequest(`/users`);
}

export function authenticate(username, password) {
  return apiRequest(`/authenticate`, {
    body: { username, password },
    method: "POST"
  });
}
