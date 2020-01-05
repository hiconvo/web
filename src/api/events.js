import apiRequest from "./apiRequest";

/*
 * @param {int} pageNumber
 */
export function getEvents(pageNumber = 0) {
  return apiRequest(`/events?page=${pageNumber}&size=-1`);
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
 * @param {datetime} payload.timestamp
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
 * @param {datetime} payload.timestamp
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
 * @param {string} userId
 */
export function addRSVPToEvent(eventId, userId) {
  return apiRequest(`/events/${eventId}/rsvps`, {
    body: {},
    method: "POST"
  });
}

/*
 * @param {string} eventId
 * @param {string} userId
 */
export function removeRSVPFromEvent(eventId) {
  return apiRequest(`/events/${eventId}/rsvps`, {
    body: {},
    method: "DELETE"
  });
}

/*
 * @param {string} eventId
 * @param {Object} payload
 * @param {string} payload.message
 */
export function deleteEvent(eventId, payload) {
  return apiRequest(`/events/${eventId}`, {
    body: payload,
    method: "DELETE"
  });
}

/*
 * @param {Object} payload
 * @param {Object} payload.eventID
 * @param {Object} payload.userID
 * @param {Object} payload.timestamp
 * @param {Object} payload.signature
 */
export function magicRsvp(payload) {
  return apiRequest(`/events/rsvps`, {
    body: payload,
    method: "POST"
  });
}

/*
 * @param {string} eventId
 */
export function markAsRead(eventId) {
  return apiRequest(`/events/${eventId}/reads`, {
    body: {},
    method: "POST"
  });
}
