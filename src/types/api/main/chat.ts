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

// ─── Real 1:1 chat (Phase 3.1) ─────────────────────────────────────
export interface ConversationSummary {
  id: string;
  peer_id: string;
  peer_name: string | null;
  peer_avatar: string | null;
  last_message: string | null;
  last_message_at: string | null;
}

export interface ConversationMessage {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  isMine: boolean;
}
