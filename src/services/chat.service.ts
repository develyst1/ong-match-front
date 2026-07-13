import type {
  ChatMessage,
  ChatMessageListParams,
  ChatRoom,
  ChatRoomListParams,
} from "@/types/app/chat";
import type {
  ChatMessageResponse,
  ChatRoomResponse,
} from "@/types/api/main/chat";
import {
  getChatMessagesApi,
  getChatRoomsApi,
  sendChatMessageApi,
} from "@/lib/api/api-main";
import {
  MOCK_CHAT_MESSAGES,
  MOCK_CHAT_ROOMS,
  mockDelay,
} from "@/lib/api/mock-data";

const toRoom = (r: ChatRoomResponse): ChatRoom => ({ ...r });
const toMessage = (m: ChatMessageResponse): ChatMessage => ({ ...m });

export const getChatRooms = async (
  params?: ChatRoomListParams,
): Promise<ChatRoom[]> => {
  try {
    const res = await getChatRoomsApi(
      params as Record<string, unknown> | undefined,
    );
    return (res.data?.data ?? []).map(toRoom);
  } catch {
    let list = MOCK_CHAT_ROOMS.map(toRoom);
    if (params?.type) list = list.filter((r) => r.type === params.type);
    if (params?.tribeId)
      list = list.filter((r) => r.tribeId === params.tribeId);
    return mockDelay(list);
  }
};

export const getChatMessages = async (
  params: ChatMessageListParams,
): Promise<ChatMessage[]> => {
  try {
    const res = await getChatMessagesApi(params.roomId, {
      page: params.page,
      pageSize: params.pageSize,
    });
    return (res.data?.data?.content ?? []).map(toMessage);
  } catch {
    const msgs = MOCK_CHAT_MESSAGES[params.roomId] ?? [];
    return mockDelay(msgs.map(toMessage));
  }
};

export const sendChatMessage = async (
  roomId: string,
  content: string,
): Promise<ChatMessage> => {
  try {
    const res = await sendChatMessageApi(roomId, { content });
    return toMessage(res.data.data);
  } catch {
    return mockDelay(
      toMessage({
        id: `local-${Date.now()}`,
        roomId,
        senderId: "u-me",
        senderName: "คุณ",
        content,
        createdAt: new Date().toISOString(),
        isMine: true,
      }),
    );
  }
};
