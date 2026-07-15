import type { ConversationMessage, ConversationSummary } from "@/types/api/main/chat";
import {
  createConversationApi,
  getConversationMessagesApi,
  getConversationsApi,
  sendConversationMessageApi,
} from "@/lib/api/api-chat";

/** Create/return the 1:1 conversation with a user. Errors (e.g. gate 403) surface to the caller. */
export const startConversation = async (targetUserId: string): Promise<string> => {
  const res = await createConversationApi(targetUserId);
  return res.data.data.id;
};

export const getConversations = async (): Promise<ConversationSummary[]> => {
  try {
    return (await getConversationsApi()).data.data;
  } catch {
    return [];
  }
};

export const getConversationMessages = async (convId: string): Promise<ConversationMessage[]> => {
  try {
    return (await getConversationMessagesApi(convId)).data.data;
  } catch {
    return [];
  }
};

export const sendConversationMessage = async (convId: string, content: string): Promise<void> => {
  await sendConversationMessageApi(convId, content);
};
