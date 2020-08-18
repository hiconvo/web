import apiRequest from "./apiRequest";

/*
 * @param {int} pageNumber
 */
export function getNotes(pageNumber = 0) {
  return apiRequest(`/notes?page=${pageNumber}&size=60`);
}

/*
 * @param {string} id
 */
export function getNote(id) {
  return apiRequest(`/notes/${id}`);
}

/*
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.body
 * @param {string} payload.url
 * @param {string} payload.favicon
 */
export function createNote(payload) {
  return apiRequest(`/notes`, {
    body: payload,
    method: "POST"
  });
}

/*
 * @param {string} id
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.body
 * @param {string} payload.url
 * @param {string} payload.favicon
 */
export function updateNote(id, payload) {
  return apiRequest(`/notes/${id}`, {
    body: payload,
    method: "PATCH"
  });
}

/*
 * @param {string} id
 */
export function deleteNote(id) {
  return apiRequest(`/notes/${id}`, {
    body: {},
    method: "DELETE"
  });
}
