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

/*
 * @param {Object} payload
 * @param {string} payload.token
 * @param {string} payload.provider
 */
export function oauth(payload) {
  return apiRequest(`/users/oauth`, {
    body: payload,
    method: "POST"
  });
}

/*
 * @param {Object} payload
 * @param {string} payload.userId
 * @param {string} payload.timestamp
 * @param {string} payload.signature
 */
export function magicLogin(payload) {
  return apiRequest(`/users/magic`, {
    body: payload,
    method: "POST"
  });
}
