import apiRequest from "./apiRequest";

/*
 * @param {string} threadId
 */
export function getThreadMessages(threadId) {
  return apiRequest(`/threads/${threadId}/messages`);
}

/*
 * @param {string} threadId
 * @param {Object} payload
 * @param {string} payload.body
 */
export function putThreadMessage(threadId, payload) {
  return apiRequest(`/threads/${threadId}/messages`, {
    body: payload,
    method: "POST"
  });
}

/*
 * @param {string} eventId
 */
export function getEventMessages(eventId) {
  return apiRequest(`/events/${eventId}/messages`);
}

/*
 * @param {string} eventId
 * @param {Object} payload
 * @param {string} payload.body
 */
export function putEventMessage(eventId, payload) {
  return apiRequest(`/events/${eventId}/messages`, {
    body: payload,
    method: "POST"
  });
}
