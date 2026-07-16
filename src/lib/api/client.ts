import axios from "axios";
import { applyInterceptors } from "./interceptor";

// API paths already include the `/api` prefix (e.g. "/api/v1/types"), so the
// base URL must NOT add another `/api` — otherwise requests double up as
// `/api/api/v1/...`. Empty base = same-origin: the browser calls `/api/v1/...`
// and nginx (prod) or Next rewrites (dev) route it to the backend.
const raw = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const baseURL = raw === "/api" ? "" : raw;

/** Primary axios instance for all Ong Match backend calls. */
export const mainClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

applyInterceptors(mainClient);
