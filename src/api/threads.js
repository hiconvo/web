import apiRequest from "./apiRequest";

/*
 * @param {int} pageNumber
 */
export function getThreads(pageNumber = 0) {
  return apiRequest(`/threads?page=${pageNumber}&size=10`);
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

/*
 * @param {string} id
 * @param {Object} payload
 * @param {string} payload.subject
 */
export function updateThread(id, payload) {
  return apiRequest(`/threads/${id}`, {
    body: payload,
    method: "PATCH"
  });
}

/*
 * @param {string} threadId
 * @param {string} userId
 */
export function addUserToThread(threadId, userId) {
  return apiRequest(`/threads/${threadId}/users/${userId}`, {
    body: {},
    method: "POST"
  });
}

/*
 * @param {string} threadId
 * @param {string} userId
 */
export function removeUserFromThread(threadId, userId) {
  return apiRequest(`/threads/${threadId}/users/${userId}`, {
    body: {},
    method: "DELETE"
  });
}

/*
 * @param {string} threadId
 */
export function deleteThread(threadId) {
  return apiRequest(`/threads/${threadId}`, {
    body: {},
    method: "DELETE"
  });
}

/*
 * @param {string} threadId
 */
export function markAsRead(threadId) {
  return apiRequest(`/threads/${threadId}/reads`, {
    body: {},
    method: "POST"
  });
}
