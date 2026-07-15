"use client";

import { useEffect, useState } from "react";
import { ActionIcon, Box, Group, ScrollArea, Stack, Text, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconLayoutSidebar, IconMessageCircle } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/common";
import { useConversations, useRooms } from "@/hooks/chat";
import type { ChatRoom } from "@/types/app/chat";
import type { ConversationSummary, RoomSummary } from "@/types/api/main/chat";
import { APP_TEXT } from "@/constant/text/common";
import ChatRoomItem from "./ChatRoomItem";
import ChatThread from "./ChatThread";

/** Map a real backend conversation to the shared ChatRoom shape. */
function convToRoom(c: ConversationSummary): ChatRoom {
  return {
    id: c.id,
    type: "PRIVATE",
    name: c.peer_name ?? "ไม่ระบุชื่อ",
    avatarUrl: c.peer_avatar ?? undefined,
    lastMessage: c.last_message ?? undefined,
    lastMessageAt: c.last_message_at ?? undefined,
    unreadCount: 0,
    participantsCount: 2,
    isReal: true,
    peerId: c.peer_id,
  };
}

/** Map a tag-room to the shared ChatRoom shape (id = tag). */
function tagRoomToRoom(r: RoomSummary): ChatRoom {
  return {
    id: r.tag,
    type: "GROUP",
    name: `#${r.tag}`,
    lastMessage: r.last_message ?? undefined,
    lastMessageAt: r.last_message_at ?? undefined,
    unreadCount: 0,
    participantsCount: r.members,
    isReal: true,
  };
}

export default function ChatContent({ initialRoomId }: { initialRoomId?: string }) {
  const { rooms } = useRooms();
  const { conversations } = useConversations();
  const [selected, setSelected] = useState<ChatRoom | undefined>(undefined);
  const [listOpen, setListOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 48em)", true);

  // Desktop: list (toggle) + thread side by side. Mobile: master-detail —
  // show the list OR the open thread, never both squeezed together.
  const showList = isDesktop ? listOpen : !selected;
  const showThread = isDesktop ? true : !!selected;
  const toggleList = () => {
    if (isDesktop) setListOpen((o) => !o);
    else setSelected(undefined); // mobile: back to the list
  };

  // Real 1:1 conversations first, then real tag-based "ไทป์รูม" group rooms.
  const privateRooms = conversations.map(convToRoom);
  const groupRooms = rooms.map(tagRoomToRoom);
  const allRooms = [...privateRooms, ...groupRooms];

  useEffect(() => {
    if (initialRoomId && !selected) {
      const found = allRooms.find((r) => r.id === initialRoomId);
      if (found) setSelected(found);
    }
  }, [initialRoomId, allRooms, selected]);

  const pick = (room: ChatRoom) => {
    setSelected(room);
    setListOpen(false); // collapse the list so the thread goes near-fullscreen
  };

  return (
    <Box
      className="ong-chat-shell"
      style={{
        display: "flex",
        gap: 12,
        height: "calc(100dvh - 120px)",
        minHeight: 420,
      }}
    >
      {/* Collapsible conversation list (full width on mobile, 300px on desktop) */}
      {showList && (
        <BaseCard withBorder shadow="none" p="xs" style={{ width: isDesktop ? 300 : "100%", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <ScrollArea style={{ flex: 1 }}>
            <Stack gap="xs" p="xs">
              <Text fw={700} size="xs" c="dimmed" tt="uppercase">{APP_TEXT.chat.privateChats}</Text>
              {privateRooms.length > 0 ? (
                privateRooms.map((room) => (
                  <ChatRoomItem key={room.id} room={room} active={selected?.id === room.id} onClick={() => pick(room)} />
                ))
              ) : (
                <Text size="xs" c="dimmed" px="xs">ยังไม่มีแชต — ไปกด &quot;เริ่มคุย&quot; ที่โปรไฟล์คนอื่น</Text>
              )}
              <Text fw={700} size="xs" c="dimmed" tt="uppercase" mt="sm">{APP_TEXT.chat.ongRooms}</Text>
              {groupRooms.length > 0 ? (
                groupRooms.map((room) => (
                  <ChatRoomItem key={room.id} room={room} active={selected?.id === room.id} onClick={() => pick(room)} />
                ))
              ) : (
                <Text size="xs" c="dimmed" px="xs">สร้างไทป์ที่มีแท็ก แล้วจะได้เข้าไทป์รูมของแท็กนั้นอัตโนมัติ</Text>
              )}
            </Stack>
          </ScrollArea>
        </BaseCard>
      )}

      {/* Thread — fills the rest */}
      {showThread && (
      <BaseCard withBorder shadow="none" p={0} style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Group gap="xs" px="sm" py="xs" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
          <Tooltip label={isDesktop ? (listOpen ? "ซ่อนรายการแชต" : "แสดงรายการแชต") : "กลับไปรายการแชต"}>
            <ActionIcon variant="subtle" color="gray" onClick={toggleList}>
              {isDesktop ? <IconLayoutSidebar size={20} /> : <IconArrowLeft size={20} />}
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
      )}
    </Box>
  );
}
