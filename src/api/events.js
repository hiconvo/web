import apiRequest from "./apiRequest";

export function getEvents() {
  return apiRequest(`/events`);
}

/*
 * @param {string} eventId
 */
export function getEvent(id) {
  return apiRequest(`/events/${id}`);
}

/*
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.placeId
 * @param {string} payload.address
 * @param {datetime} payload.time
 * @param {Contact[]} payload.users
 * @param {string} payload.description
 */
export function createEvent(payload) {
  return apiRequest(`/events`, {
    body: payload,
    method: "POST"
  });
}

/*
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.placeId
 * @param {string} payload.address
 * @param {string} payload.subject
 * @param {datetime} payload.time
 * @param {string} payload.description
 */
export function updateEvent(id, payload) {
  return apiRequest(`/events/${id}`, {
    body: payload,
    method: "PATCH"
  });
}

/*
 * @param {string} eventId
 * @param {string} userId
 */
export function addUserToEvent(eventId, userId) {
  return apiRequest(`/events/${eventId}/users/${userId}`, {
    body: {},
    method: "POST"
  });
}

/*
 * @param {string} eventId
 * @param {string} userId
 */
export function removeUserFromEvent(eventId, userId) {
  return apiRequest(`/events/${eventId}/users/${userId}`, {
    body: {},
    method: "DELETE"
  });
}

/*
 * @param {string} eventId
 */
export function deleteEvent(eventId) {
  return apiRequest(`/events/${eventId}`, {
    body: {},
    method: "DELETE"
  });
}
