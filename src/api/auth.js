import apiRequest from "./apiRequest";

export function getUser() {
  return apiRequest(`/users`);
}

/*
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} payload.firstName
 * @param {string} [payload.lastName]
 */
export function createUser(payload) {
  return apiRequest(`/users`, {
    body: payload,
    method: "POST"
  });
}

/*
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export function authenticate(payload) {
  return apiRequest(`/users/auth`, {
    body: payload,
    method: "POST"
  });
}
