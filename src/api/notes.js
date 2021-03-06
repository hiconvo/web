import apiRequest from "./apiRequest";

/*
 * @param {int} pageNumber
 */
export function getNotes(pageNumber = 0, filter = "", tag = "") {
  const filterQuery = filter ? `&filter=${filter}` : "";
  const tagQuery = tag ? `&tag=${tag}` : "";
  return apiRequest(
    `/notes?page=${pageNumber}&size=40${filterQuery}${tagQuery}`
  );
}

/*
 * @param {string} query
 */
export function searchNotes(query) {
  return apiRequest(`/notes?search=${query}`);
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
