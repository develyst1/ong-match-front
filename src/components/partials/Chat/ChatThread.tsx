"use client";

import {
  Avatar,
  Box,
  Group,
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { IconMessageCircle, IconSend, IconUsersGroup } from "@tabler/icons-react";
import { EmptyState } from "@/components/common";
import {
  useChatMessages,
  useSendChatMessage,
  useConversationMessages,
  useSendConversationMessage,
  useRoomMessages,
  useSendRoomMessage,
} from "@/hooks/chat";
import { initials, timeFromNow } from "@/lib/utils";
import type { ChatRoom } from "@/types/app/chat";
import { APP_TEXT } from "@/constant/text/common";

interface ChatThreadProps {
  room: ChatRoom;
}

interface BubbleMsg {
  id: string;
  content: string;
  senderName: string;
  senderAvatarUrl?: string;
  createdAt: string;
  isMine: boolean;
}

export default function ChatThread({ room }: ChatThreadProps) {
  const isGroup = room.type === "GROUP";
  const useGroup = !!room.isReal && isGroup; // real tag-room
  const usePrivate = !!room.isReal && !isGroup; // real 1:1
  const useMock = !room.isReal; // legacy mock room

  // Every hook runs but only the matching one is enabled, so we branch cleanly.
  const mock = useChatMessages({ roomId: useMock ? room.id : "" });
  const convo = useConversationMessages(usePrivate ? room.id : undefined);
  const group = useRoomMessages(useGroup ? room.id : undefined);
  const sendMock = useSendChatMessage(room.id);
  const sendPrivate = useSendConversationMessage(room.id);
  const sendGroup = useSendRoomMessage(room.id);
  const [draft, setDraft] = useState("");

  let messages: BubbleMsg[];
  let isLoading: boolean;
  if (useGroup) {
    messages = group.messages.map((m) => ({
      id: m.id,
      content: m.content,
      senderName: m.isMine ? "คุณ" : m.sender_name ?? "สมาชิก",
      createdAt: m.created_at,
      isMine: m.isMine,
    }));
    isLoading = group.isLoading;
  } else if (usePrivate) {
    messages = convo.messages.map((m) => ({
      id: m.id,
      content: m.content,
      senderName: m.isMine ? "คุณ" : room.name,
      senderAvatarUrl: m.isMine ? undefined : room.avatarUrl,
      createdAt: m.created_at,
      isMine: m.isMine,
    }));
    isLoading = convo.isLoading;
  } else {
    messages = mock.messages.map((m) => ({
      id: m.id,
      content: m.content,
      senderName: m.senderName,
      senderAvatarUrl: m.senderAvatarUrl,
      createdAt: m.createdAt,
      isMine: m.isMine,
    }));
    isLoading = mock.isLoading;
  }

  const handleSend = () => {
    const value = draft.trim();
    if (!value) return;
    if (useGroup) sendGroup.mutate(value);
    else if (usePrivate) sendPrivate.mutate(value);
    else sendMock.mutate(value);
    setDraft("");
  };

  return (
    <Stack gap={0} h={{ base: "60vh", md: "70vh" }}>
      <Group justify="space-between" p="sm" bd="1px solid var(--mantine-color-gray-2)">
        <Group gap="sm">
          <Avatar
            size={40}
            radius="xl"
            color={room.type === "GROUP" ? "ong-green" : "blue"}
            src={room.avatarUrl || null}
          >
            {room.type === "GROUP" ? (
              <IconUsersGroup size={20} stroke={1.8} />
            ) : (
              initials(room.name)
            )}
          </Avatar>
          <Stack gap={2}>
            <Text fw={700} size="sm">
              {room.name}
            </Text>
            <Text size="xs" c="dimmed">
              {room.type === "GROUP" ? `${room.participantsCount.toLocaleString()} คน` : "แชตส่วนตัว"}
            </Text>
          </Stack>
        </Group>
      </Group>

      <ScrollArea style={{ flex: 1 }} p="md">
        {isLoading ? (
          <Stack gap="sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={40} radius="xl" width={i % 2 ? "60%" : "40%"} />
            ))}
          </Stack>
        ) : messages.length === 0 ? (
          <EmptyState
            icon={<IconMessageCircle size={30} stroke={1.8} />}
            title="เริ่มบทสนทนา"
            description={APP_TEXT.chat.placeholder}
          />
        ) : (
          <Stack gap="xs">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
          </Stack>
        )}
      </ScrollArea>

      <Box p="sm" bd="1px solid var(--mantine-color-gray-2)">
        <TextInput
          value={draft}
          onChange={(e) => setDraft(e.currentTarget.value)}
          placeholder={APP_TEXT.chat.placeholder}
          radius="xl"
          rightSection={
            <Box
              onClick={handleSend}
              style={{ cursor: draft.trim() ? "pointer" : "not-allowed" }}
              c={draft.trim() ? "ong-green" : "gray"}
            >
              <IconSend size={18} />
            </Box>
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
      </Box>
    </Stack>
  );
}

function MessageBubble({
  msg,
}: {
  msg: {
    content: string;
    senderName: string;
    senderAvatarUrl?: string;
    createdAt: string;
    isMine: boolean;
  };
}) {
  return (
    <Group justify={msg.isMine ? "flex-end" : "flex-start"} gap="xs" align="flex-start">
      {!msg.isMine && (
        <Avatar size={28} radius="xl" src={msg.senderAvatarUrl || null}>
          {initials(msg.senderName)}
        </Avatar>
      )}
      <Stack gap={2} maw="70%" align={msg.isMine ? "flex-end" : "flex-start"}>
        {!msg.isMine && (
          <Text size="xs" c="dimmed" fw={500}>
            {msg.senderName}
          </Text>
        )}
        <Paper
          px="md"
          py="xs"
          radius="lg"
          bg={msg.isMine ? "ong-green" : "gray.1"}
          c={msg.isMine ? "white" : "dark"}
        >
          <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
            {msg.content}
          </Text>
        </Paper>
        <Text size="10px" c="dimmed">
          {timeFromNow(msg.createdAt)}
        </Text>
      </Stack>
    </Group>
  );
}
