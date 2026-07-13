// Backend response shapes for chat rooms and messages.

export type ChatRoomType = "PRIVATE" | "GROUP";

export interface ChatRoomResponse {
  id: string;
  type: ChatRoomType;
  tribeId?: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  participantsCount: number;
}

export interface ChatMessageResponse {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl?: string;
  content: string;
  createdAt: string;
  isMine: boolean;
}
