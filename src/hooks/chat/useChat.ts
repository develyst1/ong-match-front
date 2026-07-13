"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChatMessages,
  getChatRooms,
  sendChatMessage,
} from "@/services/chat.service";
import type {
  ChatMessageListParams,
  ChatRoomListParams,
} from "@/types/app/chat";

export const CHAT_ROOMS_QUERY_KEY = ["chatRooms"] as const;
export const CHAT_MESSAGES_QUERY_KEY = ["chatMessages"] as const;

export const useChatRooms = (params?: ChatRoomListParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...CHAT_ROOMS_QUERY_KEY, params],
    queryFn: () => getChatRooms(params),
  });

  return { rooms: data ?? [], isLoading, isError, error };
};

export const useChatMessages = (params: ChatMessageListParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...CHAT_MESSAGES_QUERY_KEY, params.roomId, params],
    queryFn: () => getChatMessages(params),
    enabled: Boolean(params.roomId),
  });

  return { messages: data ?? [], isLoading, isError, error };
};

export const useSendChatMessage = (roomId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendChatMessage(roomId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...CHAT_MESSAGES_QUERY_KEY, roomId],
      });
      queryClient.invalidateQueries({ queryKey: [...CHAT_ROOMS_QUERY_KEY] });
    },
  });
};
