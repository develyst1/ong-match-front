import type { ApiResponse, PageObject } from "@/types/api/main/common";
import type { ChatMessageResponse, ChatRoomResponse } from "@/types/api/main/chat";
import type { InterestResponse } from "@/types/api/main/interest";
import type { MatchResponse } from "@/types/api/main/match";
import type { TribeResponse } from "@/types/api/main/tribe";
import type { UserResponse } from "@/types/api/main/user";
import { mainClient } from "./client";

// ─── Tribes ("องค์" / Ong categories) ──────────────────────────────
export const getTribesApi = () =>
  mainClient.get<ApiResponse<TribeResponse[]>>("/api/v1/tribes");

// ─── Interests ─────────────────────────────────────────────────────
export const getInterestsApi = (params?: Record<string, unknown>) =>
  mainClient.get<ApiResponse<InterestResponse[]>>("/api/v1/interests", {
    params,
  });

// ─── Users ─────────────────────────────────────────────────────────
export const getMeApi = () =>
  mainClient.get<ApiResponse<UserResponse>>("/api/v1/users/me");

export const getUserApi = (id: string) =>
  mainClient.get<ApiResponse<UserResponse>>(`/api/v1/users/${id}`);

export const updateMeApi = (body: Partial<UserResponse>) =>
  mainClient.put<ApiResponse<UserResponse>>("/api/v1/users/me", body);

// ─── Matches ──────────────────────────────────────────────────────
export const getMatchesApi = (params?: Record<string, unknown>) =>
  mainClient.get<ApiResponse<PageObject<MatchResponse>>>(
    "/api/v1/matches",
    { params },
  );

export const acceptMatchApi = (id: string) =>
  mainClient.post<ApiResponse<MatchResponse>>(`/api/v1/matches/${id}/accept`);

export const rejectMatchApi = (id: string) =>
  mainClient.post<ApiResponse<MatchResponse>>(`/api/v1/matches/${id}/reject`);

// ─── Chat ─────────────────────────────────────────────────────────
export const getChatRoomsApi = (params?: Record<string, unknown>) =>
  mainClient.get<ApiResponse<ChatRoomResponse[]>>("/api/v1/chat/rooms", {
    params,
  });

export const getChatMessagesApi = (
  roomId: string,
  params?: Record<string, unknown>,
) =>
  mainClient.get<ApiResponse<PageObject<ChatMessageResponse>>>(
    `/api/v1/chat/rooms/${roomId}/messages`,
    { params },
  );

export const sendChatMessageApi = (
  roomId: string,
  body: { content: string },
) =>
  mainClient.post<ApiResponse<ChatMessageResponse>>(
    `/api/v1/chat/rooms/${roomId}/messages`,
    body,
  );
