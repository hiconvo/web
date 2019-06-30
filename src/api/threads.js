import apiRequest from "./apiRequest";

export function getThreads() {
  return apiRequest(`/threads`);
}

/*
 * @param {string} threadId
 */
export function getThread(id) {
  return apiRequest(`/threads/${id}`);
}

/*
 * @param {Object} payload
 * @param {string} payload.subject
 * @param {Contact[]} payload.users
 */
export function createThread(payload) {
  return apiRequest(`/threads`, {
    body: payload,
    method: "POST"
  });
}
