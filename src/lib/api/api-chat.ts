import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";
import type {
  ConversationMessage,
  ConversationSummary,
  RoomMessage,
  RoomSummary,
} from "@/types/api/main/chat";

export const createConversationApi = (targetUserId: string) =>
  mainClient.post<ApiResponse<{ id: string }>>("/api/v1/conversations", { targetUserId });

export const getConversationsApi = () =>
  mainClient.get<ApiResponse<ConversationSummary[]>>("/api/v1/conversations");

export const getConversationMessagesApi = (convId: string, after?: string) =>
  mainClient.get<ApiResponse<ConversationMessage[]>>(
    `/api/v1/conversations/${convId}/messages`,
    { params: { after: after || undefined } },
  );

export const sendConversationMessageApi = (convId: string, content: string) =>
  mainClient.post<ApiResponse<ConversationMessage>>(
    `/api/v1/conversations/${convId}/messages`,
    { content },
  );

// ─── Group rooms (tag-based) ───────────────────────────────────────
export const getRoomsApi = () =>
  mainClient.get<ApiResponse<RoomSummary[]>>("/api/v1/rooms");

export const getRoomMessagesApi = (tag: string, after?: string) =>
  mainClient.get<ApiResponse<RoomMessage[]>>(
    `/api/v1/rooms/${encodeURIComponent(tag)}/messages`,
    { params: { after: after || undefined } },
  );

export const sendRoomMessageApi = (tag: string, content: string) =>
  mainClient.post<ApiResponse<RoomMessage>>(
    `/api/v1/rooms/${encodeURIComponent(tag)}/messages`,
    { content },
  );
