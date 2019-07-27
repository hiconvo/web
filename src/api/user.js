import apiRequest from "./apiRequest";

/*
 * @param {Object} payload
 * @param {string} [payload.email]
 * @param {string} [payload.password]
 * @param {string} [payload.firstName]
 * @param {string} [payload.lastName]
 * @param {bool}   [payload.password]
 */
export function updateUser(payload) {
  return apiRequest(`/users`, {
    body: payload,
    method: "PATCH"
  });
}

export function sendVerifyEmail() {
  return apiRequest(`/users/resend`, {
    body: {},
    method: "POST"
  });
}

/*
 * @param {Object} payload
 * @param {string} payload.signature
 * @param {string} payload.timestamp
 * @param {string} payload.userID
 */
export function verifyEmail(payload) {
  return apiRequest(`/users/verify`, {
    body: payload,
    method: "POST"
  });
}

/*
 * @param {Object} payload
 * @param {string} payload.signature
 * @param {string} payload.timestamp
 * @param {string} payload.userID
 * @param {string} payload.password
 */
export function resetPassword(payload) {
  return apiRequest(`/users/password`, {
    body: payload,
    method: "POST"
  });
}
