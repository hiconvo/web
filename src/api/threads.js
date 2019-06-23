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
