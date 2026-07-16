import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";

export interface AuthResult {
  token: string;
  user: { id: string; email: string };
}

export const registerApi = (body: { email: string; password: string; displayName?: string }) =>
  mainClient.post<ApiResponse<AuthResult>>("/api/v1/auth/register", body);

export const loginApi = (body: { email: string; password: string }) =>
  mainClient.post<ApiResponse<AuthResult>>("/api/v1/auth/login", body);
