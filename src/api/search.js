import apiRequest from "./apiRequest";

/*
 * @param {string} query
 */
export function userSearch(query) {
  return apiRequest(`/users/search?query=${encodeURIComponent(query)}`);
}
