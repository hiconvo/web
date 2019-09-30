const API_ORIGIN = "https://api.hiconvo.com";
// const API_ORIGIN = "http://localhost:8080";

class ApiError extends Error {
  constructor(payload, message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.payload = payload || {};
  }

  getPayload() {
    return this.payload;
  }
}

/*
 * @function apiRequest
 * @param {string} url
 * @param {{ [method]: string, [body]: any }} [data]
 * @returns {Promise}
 */
export default function apiRequest(url, data = {}) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("userToken");
    const method = data.method || "GET";
    const mode = "cors";
    const fullUrl = `${API_ORIGIN}${url}`;
    const headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token}`);

    let body;
    if (!(data.body instanceof FormData)) {
      headers.append("Content-Type", "application/json");
      body = JSON.stringify(data.body);
    } else {
      body = data.body;
    }

    fetch(fullUrl, {
      headers,
      method,
      mode,
      body
    })
      .then(response => {
        if (response.status >= 400) {
          response
            .json()
            .then(parsed => reject(new ApiError(parsed)))
            .catch(e => reject(e));
        } else if (response.status === 204) {
          resolve(response);
        } else {
          response
            .json()
            .then(parsed => resolve(parsed))
            .catch(e => reject(e));
        }
      })
      .catch(err => reject(err));
  });
}
