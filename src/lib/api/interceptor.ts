import type { AxiosInstance } from "axios";

/**
 * Attach auth-token + 401-redirect interceptors to an axios instance.
 * Kept separate from client.ts so it can be unit-tested in isolation.
 */
export function applyInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("ong-match-token");
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        typeof window !== "undefined" &&
        error?.response?.status === 401 &&
        !window.location.pathname.startsWith("/login")
      ) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );
}
