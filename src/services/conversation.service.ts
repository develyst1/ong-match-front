import type {
  ConversationMessage,
  ConversationSummary,
  RoomMessage,
  RoomSummary,
} from "@/types/api/main/chat";
import {
  createConversationApi,
  getConversationMessagesApi,
  getConversationsApi,
  getRoomMessagesApi,
  getRoomsApi,
  sendConversationMessageApi,
  sendRoomMessageApi,
} from "@/lib/api/api-chat";

export const getRooms = async (): Promise<RoomSummary[]> => {
  try {
    return (await getRoomsApi()).data.data;
  } catch {
    return [];
  }
};

export const getRoomMessages = async (tag: string): Promise<RoomMessage[]> => {
  try {
    return (await getRoomMessagesApi(tag)).data.data;
  } catch {
    return [];
  }
};

export const sendRoomMessage = async (tag: string, content: string): Promise<void> => {
  await sendRoomMessageApi(tag, content);
};

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
