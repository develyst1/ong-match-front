import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";
import type {
  MyType,
  RelevelResponse,
  SubmitQuizResponse,
  ValidateTypeResponse,
} from "@/types/api/main/quiz";

// ─── Type creation + quiz flow (ong-match-back /api/v1) ─────────────
export const validateTypeApi = (body: { title: string; description: string }) =>
  mainClient.post<ApiResponse<ValidateTypeResponse>>("/api/v1/types/validate", body);

export const submitQuizApi = (id: string, body: { answers: unknown[]; elapsedSec: number }) =>
  mainClient.post<ApiResponse<SubmitQuizResponse>>(`/api/v1/quizzes/${id}/submit`, body);

export const relevelApi = (id: string) =>
  mainClient.post<ApiResponse<RelevelResponse>>(`/api/v1/types/${id}/relevel`);

export const getMyTypesApi = () =>
  mainClient.get<ApiResponse<MyType[]>>("/api/v1/types/me");
