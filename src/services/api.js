import axios from "axios";

let accessToken = null;
export const setApiAccessToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: "http://localhost:8000", // Root backend URL
  withCredentials: true, // REQUIRED for refresh token cookie
});

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (
      err.response?.status === 401 &&
      !original._retry &&
      !original.url.includes("/auth/refresh")
    ) {
      original._retry = true;
      try {
        const r = await api.post("/auth/refresh");
        setApiAccessToken(r.data.access);
        original.headers.Authorization = `Bearer ${r.data.access}`;
        return api(original);
      } catch {
        setApiAccessToken(null);
        window.location.replace("/login");
      }
    }

    return Promise.reject(err);
  }
);

export default api;
