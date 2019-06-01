const API_ORIGIN = "https://api.hiconvo.com";

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
          response.json().then(parsed => reject(parsed));
        } else if (response.status === 204) {
          resolve(response);
        } else if (response.headers.get("Content-Type") === "text/csv") {
          const contentDisposition = response.headers.get(
            "Content-Disposition"
          );
          const fileName = contentDisposition
            .split("filename=")[1]
            .slice(1, -1);
          response.blob().then(blob =>
            resolve({
              url: URL.createObjectURL(blob),
              fileName
            })
          );
        } else {
          response.json().then(parsed => resolve(parsed));
        }
      })
      .catch(err => reject(err));
  });
}
