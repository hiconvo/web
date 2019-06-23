import apiRequest from "./apiRequest";

/*
 * @param {string} threadId
 */
export function getMessages(threadId) {
  return apiRequest(`/threads/${threadId}/messages`);
}

/*
 * @param {string} threadId
 * @param {Object} payload
 * @param {string} payload.body
 */
export function putMessage(threadId, payload) {
  return apiRequest(`/threads/${threadId}/messages`, {
    body: payload,
    method: "POST"
  });
}
