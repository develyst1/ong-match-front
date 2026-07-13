"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconMessageCircle } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/common";
import { useChatRooms } from "@/hooks/chat";
import type { ChatRoom } from "@/types/app/chat";
import { APP_TEXT } from "@/constant/text/common";
import ChatRoomItem from "./ChatRoomItem";
import ChatThread from "./ChatThread";

export default function ChatContent({ initialRoomId }: { initialRoomId?: string }) {
  const router = useRouter();
  const { rooms } = useChatRooms();
  const [selected, setSelected] = useState<ChatRoom | undefined>(
    rooms.find((r) => r.id === initialRoomId),
  );

  // pick the requested room once rooms load
  useEffect(() => {
    if (initialRoomId && !selected) {
      const found = rooms.find((r) => r.id === initialRoomId);
      if (found) setSelected(found);
    }
  }, [initialRoomId, rooms, selected]);

  const groupRooms = rooms.filter((r) => r.type === "GROUP");
  const privateRooms = rooms.filter((r) => r.type === "PRIVATE");

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl" h="100%">
        <Group gap="sm">
          <IconMessageCircle size={26} stroke={1.8} />
          <Title order={2}>{APP_TEXT.chat.title}</Title>
        </Group>

        {rooms.length === 0 ? (
          <EmptyState
            icon={<IconMessageCircle size={30} stroke={1.8} />}
            title={APP_TEXT.chat.noRoom}
            description="อ๊อกคนที่ตรงไทป์ก่อน แล้วมาคุยกันได้เลย"
          >
            <BaseCard
              withBorder
              shadow="none"
              p="sm"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/discover")}
            >
              <Text size="sm" c="ong-green.7" fw={600}>
                ไปหาคนไทป์เดียวกัน →
              </Text>
            </BaseCard>
          </EmptyState>
        ) : (
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <BaseCard withBorder p="sm" shadow="none">
                <Stack gap="xs">
                  <Text fw={700} size="sm" c="dimmed">
                    {APP_TEXT.chat.ongRooms}
                  </Text>
                  {groupRooms.map((room) => (
                    <ChatRoomItem
                      key={room.id}
                      room={room}
                      active={selected?.id === room.id}
                      onClick={() => setSelected(room)}
                    />
                  ))}
                  <Text fw={700} size="sm" c="dimmed" mt="sm">
                    {APP_TEXT.chat.privateChats}
                  </Text>
                  {privateRooms.map((room) => (
                    <ChatRoomItem
                      key={room.id}
                      room={room}
                      active={selected?.id === room.id}
                      onClick={() => setSelected(room)}
                    />
                  ))}
                </Stack>
              </BaseCard>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8 }}>
              {selected ? (
                <BaseCard withBorder p={0} shadow="none" h="100%">
                  <ChatThread room={selected} />
                </BaseCard>
              ) : (
                <BaseCard withBorder shadow="none" h="100%">
                  <EmptyState
                    icon={<IconArrowLeft size={30} stroke={1.8} />}
                    title="เลือกห้องแชต"
                    description="เลือกไทป์รูม หรือแชตส่วนตัวทางซ้าย"
                  />
                </BaseCard>
              )}
            </Grid.Col>
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
