"use client";

import { useEffect, useState } from "react";
import { ActionIcon, Box, Group, ScrollArea, Stack, Text, Tooltip } from "@mantine/core";
import { IconLayoutSidebar, IconMessageCircle } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/common";
import { useChatRooms } from "@/hooks/chat";
import type { ChatRoom } from "@/types/app/chat";
import { APP_TEXT } from "@/constant/text/common";
import ChatRoomItem from "./ChatRoomItem";
import ChatThread from "./ChatThread";

export default function ChatContent({ initialRoomId }: { initialRoomId?: string }) {
  const { rooms } = useChatRooms();
  const [selected, setSelected] = useState<ChatRoom | undefined>(
    rooms.find((r) => r.id === initialRoomId),
  );
  const [listOpen, setListOpen] = useState(true);

  useEffect(() => {
    if (initialRoomId && !selected) {
      const found = rooms.find((r) => r.id === initialRoomId);
      if (found) setSelected(found);
    }
  }, [initialRoomId, rooms, selected]);

  const groupRooms = rooms.filter((r) => r.type === "GROUP");
  const privateRooms = rooms.filter((r) => r.type === "PRIVATE");

  const pick = (room: ChatRoom) => {
    setSelected(room);
    setListOpen(false); // collapse the list so the thread goes near-fullscreen
  };

  return (
    <Box
      style={{
        display: "flex",
        gap: 12,
        height: "calc(100dvh - 120px)",
        minHeight: 420,
      }}
    >
      {/* Collapsible conversation list */}
      {listOpen && (
        <BaseCard withBorder shadow="none" p="xs" style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <ScrollArea style={{ flex: 1 }}>
            <Stack gap="xs" p="xs">
              <Text fw={700} size="xs" c="dimmed" tt="uppercase">{APP_TEXT.chat.ongRooms}</Text>
              {groupRooms.map((room) => (
                <ChatRoomItem key={room.id} room={room} active={selected?.id === room.id} onClick={() => pick(room)} />
              ))}
              <Text fw={700} size="xs" c="dimmed" tt="uppercase" mt="sm">{APP_TEXT.chat.privateChats}</Text>
              {privateRooms.map((room) => (
                <ChatRoomItem key={room.id} room={room} active={selected?.id === room.id} onClick={() => pick(room)} />
              ))}
              {rooms.length === 0 && (
                <Text size="sm" c="dimmed" ta="center" py="md">{APP_TEXT.chat.noRoom}</Text>
              )}
            </Stack>
          </ScrollArea>
        </BaseCard>
      )}

      {/* Thread — fills the rest */}
      <BaseCard withBorder shadow="none" p={0} style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Group gap="xs" px="sm" py="xs" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
          <Tooltip label={listOpen ? "ซ่อนรายการแชต" : "แสดงรายการแชต"}>
            <ActionIcon variant="subtle" color="gray" onClick={() => setListOpen((o) => !o)}>
              <IconLayoutSidebar size={20} />
            </ActionIcon>
          </Tooltip>
          <Text fw={700} size="sm" lineClamp={1}>
            {selected ? selected.name : APP_TEXT.chat.title}
          </Text>
        </Group>

        <Box style={{ flex: 1, minHeight: 0 }}>
          {selected ? (
            <ChatThread room={selected} />
          ) : (
            <EmptyState
              icon={<IconMessageCircle size={30} stroke={1.8} />}
              title="เลือกห้องแชต"
              description="เลือกไทป์รูม หรือแชตส่วนตัวจากรายการ"
            />
          )}
        </Box>
      </BaseCard>
    </Box>
  );
}
