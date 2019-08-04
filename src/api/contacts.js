import apiRequest from "./apiRequest";

export function getContacts() {
  return apiRequest(`/contacts`);
}

/*
 * @param {string} userId
 */
export function createContact(userId) {
  return apiRequest(`/contacts/${userId}`, {
    body: {},
    method: "POST"
  });
}

/*
 * @param {string} userId
 */
export function deleteContact(userId) {
  return apiRequest(`/contacts/${userId}`, {
    body: {},
    method: "DELETE"
  });
}
