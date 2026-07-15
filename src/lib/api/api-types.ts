import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";
import type {
  MyType,
  RelevelResponse,
  SubmitQuizResponse,
  SuggestTypesResponse,
  ValidateTypeResponse,
} from "@/types/api/main/quiz";

// ─── Type creation + quiz flow (ong-match-back /api/v1) ─────────────
export const suggestTypesApi = (body: { story: string }) =>
  mainClient.post<ApiResponse<SuggestTypesResponse>>("/api/v1/types/suggest", body);

export const validateTypeApi = (body: { title: string; description: string }) =>
  mainClient.post<ApiResponse<ValidateTypeResponse>>("/api/v1/types/validate", body);

export const setTypeRequirementApi = (id: string, minLevel: number) =>
  mainClient.put<ApiResponse<{ minContactLevel: number }>>(`/api/v1/types/${id}/requirement`, { minLevel });

export const submitQuizApi = (id: string, body: { answers: unknown[]; elapsedSec: number }) =>
  mainClient.post<ApiResponse<SubmitQuizResponse>>(`/api/v1/quizzes/${id}/submit`, body);

export const relevelApi = (id: string) =>
  mainClient.post<ApiResponse<RelevelResponse>>(`/api/v1/types/${id}/relevel`);

export const getMyTypesApi = () =>
  mainClient.get<ApiResponse<MyType[]>>("/api/v1/types/me");
