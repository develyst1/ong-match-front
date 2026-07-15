import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";
import type { AuthResponse, LoginBody, RegisterBody } from "@/types/api/main/auth";

export const loginApi = (body: LoginBody) =>
  mainClient.post<ApiResponse<AuthResponse>>("/api/v1/auth/login", body);

export const registerApi = (body: RegisterBody) =>
  mainClient.post<ApiResponse<AuthResponse>>("/api/v1/auth/register", body);
