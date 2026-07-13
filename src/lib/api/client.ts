import axios from "axios";
import { applyInterceptors } from "./interceptor";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

/** Primary axios instance for all Ong Match backend calls. */
export const mainClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

applyInterceptors(mainClient);
