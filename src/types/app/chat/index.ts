// Frontend domain types for Chat rooms ("Ong Rooms" + private) and messages.

import type { ChatRoomType } from "@/types/api/main/chat";

export interface ChatRoom {
  id: string;
  type: ChatRoomType;
  tribeId?: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  participantsCount: number;
  /** True for real backend 1:1 conversations (vs mock group rooms). */
  isReal?: boolean;
  /** The other user's id, for real conversations. */
  peerId?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl?: string;
  content: string;
  createdAt: string;
  isMine: boolean;
}

export interface ChatRoomListParams {
  type?: ChatRoomType;
  tribeId?: string;
}

export interface ChatMessageListParams {
  roomId: string;
  page?: number;
  pageSize?: number;
}
