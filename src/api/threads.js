import apiRequest from "./apiRequest";

export function getThreads() {
  return apiRequest(`/threads`);
}

export function getThread(id) {
  return apiRequest(`/threads/${id}`);
}
