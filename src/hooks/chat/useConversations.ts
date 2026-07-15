"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getConversationMessages,
  getConversations,
  sendConversationMessage,
  startConversation,
} from "@/services/conversation.service";

export const CONVERSATIONS_QUERY_KEY = ["conversations"] as const;
export const CONVERSATION_MESSAGES_QUERY_KEY = ["conversation-messages"] as const;

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
