"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getConversationMessages,
  getConversations,
  getRoomMessages,
  getRooms,
  sendConversationMessage,
  sendRoomMessage,
  startConversation,
} from "@/services/conversation.service";

export const CONVERSATIONS_QUERY_KEY = ["conversations"] as const;
export const CONVERSATION_MESSAGES_QUERY_KEY = ["conversation-messages"] as const;
export const ROOMS_QUERY_KEY = ["rooms"] as const;
export const ROOM_MESSAGES_QUERY_KEY = ["room-messages"] as const;

export const useConversations = () => {
  const { data, isLoading } = useQuery({
    queryKey: [...CONVERSATIONS_QUERY_KEY],
    queryFn: getConversations,
    refetchInterval: 5000,
  });
  return { conversations: data ?? [], isLoading };
};

export const useConversationMessages = (convId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [...CONVERSATION_MESSAGES_QUERY_KEY, convId],
    queryFn: () => getConversationMessages(convId as string),
    enabled: Boolean(convId),
    refetchInterval: 3000, // poll for new messages
  });
  return { messages: data ?? [], isLoading };
};

export const useSendConversationMessage = (convId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendConversationMessage(convId, content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [...CONVERSATION_MESSAGES_QUERY_KEY, convId] });
      qc.invalidateQueries({ queryKey: [...CONVERSATIONS_QUERY_KEY] });
    },
  });
};

export const useStartConversation = () =>
  useMutation({ mutationFn: (targetUserId: string) => startConversation(targetUserId) });

// ─── Group rooms (tag-based) ───────────────────────────────────────
export const useRooms = () => {
  const { data, isLoading } = useQuery({
    queryKey: [...ROOMS_QUERY_KEY],
    queryFn: getRooms,
    refetchInterval: 5000,
  });
  return { rooms: data ?? [], isLoading };
};

export const useRoomMessages = (tag?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [...ROOM_MESSAGES_QUERY_KEY, tag],
    queryFn: () => getRoomMessages(tag as string),
    enabled: Boolean(tag),
    refetchInterval: 3000,
  });
  return { messages: data ?? [], isLoading };
};

export const useSendRoomMessage = (tag: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendRoomMessage(tag, content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [...ROOM_MESSAGES_QUERY_KEY, tag] });
      qc.invalidateQueries({ queryKey: [...ROOMS_QUERY_KEY] });
    },
  });
};
