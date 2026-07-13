"use client";

import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";
import { BaseCard } from "@/components/ui/Card";
import { initials, timeFromNow } from "@/lib/utils";
import type { ChatRoom } from "@/types/app/chat";

interface ChatRoomItemProps {
  room: ChatRoom;
  active?: boolean;
  onClick: () => void;
}

export default function ChatRoomItem({
  room,
  active,
  onClick,
}: ChatRoomItemProps) {
  const isGroup = room.type === "GROUP";
  return (
    <BaseCard
      withBorder={active}
      padding="sm"
      radius="lg"
      shadow="none"
      style={{
        cursor: "pointer",
        background: active
          ? "var(--mantine-color-ong-green-0)"
          : "transparent",
      }}
      onClick={onClick}
    >
      <Group gap="sm" wrap="nowrap">
        <Avatar
          size={48}
          radius="xl"
          color={isGroup ? "ong-green" : "blue"}
          src={room.avatarUrl || null}
        >
          {isGroup ? "💬" : initials(room.name)}
        </Avatar>
        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
          <Group justify="space-between" gap="xs">
            <Text fw={600} size="sm" truncate>
              {room.name}
            </Text>
            <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
              {timeFromNow(room.lastMessageAt)}
            </Text>
          </Group>
          <Group justify="space-between" gap="xs">
            <Text size="xs" c="dimmed" truncate>
              {room.lastMessage ?? "—"}
            </Text>
            {room.unreadCount > 0 && (
              <Badge color="ong-green" size="sm" radius="xl" variant="filled">
                {room.unreadCount}
              </Badge>
            )}
          </Group>
        </Stack>
      </Group>
    </BaseCard>
  );
}
