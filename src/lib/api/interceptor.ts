import type { AxiosInstance } from "axios";

/**
 * Attach auth-token + 401-redirect interceptors to an axios instance.
 * Kept separate from client.ts so it can be unit-tested in isolation.
 */
export function applyInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      config.headers = config.headers ?? {};
      const token = window.localStorage.getItem("ong-match-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Backend identifies the caller by email (Phase 1 auth shortcut).
      const email = window.localStorage.getItem("ong-match-email") ?? "guest@ongmatch.th";
      config.headers["x-user-email"] = email;
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
