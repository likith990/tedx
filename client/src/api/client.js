
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const TOKEN_KEY = "tedx_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}


export function pingServer() {
  fetch(`${API_BASE}/api/health`).catch(() => {});
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
  }

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body, opts = {}) => request(path, { method: "POST", body, ...opts }),
  put: (path, body, opts = {}) => request(path, { method: "PUT", body, ...opts }),
  del: (path, opts = {}) => request(path, { method: "DELETE", ...opts }),
};

export const authApi = {
  login: (username, password) =>
    request("/api/auth/login", { method: "POST", body: { username, password } }),
};

export const speakersApi = {
  list: () => api.get("/api/speakers"),
  create: (data) => api.post("/api/speakers", data, { auth: true }),
  update: (id, data) => api.put(`/api/speakers/${id}`, data, { auth: true }),
  remove: (id) => api.del(`/api/speakers/${id}`, { auth: true }),
};

export const teamApi = {
  list: () => api.get("/api/team"),
  create: (data) => api.post("/api/team", data, { auth: true }),
  update: (id, data) => api.put(`/api/team/${id}`, data, { auth: true }),
  remove: (id) => api.del(`/api/team/${id}`, { auth: true }),
};

export const venueApi = {
  get: () => api.get("/api/venue"),
  save: (data) => api.put("/api/venue", data, { auth: true }),
  remove: () => api.del("/api/venue", { auth: true }),
};