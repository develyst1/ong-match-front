import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";
import type { ConversationMessage, ConversationSummary } from "@/types/api/main/chat";

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
