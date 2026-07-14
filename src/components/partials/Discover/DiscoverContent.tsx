"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Badge,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { IconHome, IconSend2 } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { BaseButton } from "@/components/ui/Button";
import { EmptyState, LevelBadge } from "@/components/common";
import { useFeed, useCreatePost, useFollow } from "@/hooks/social";
import { initials, timeFromNow } from "@/lib/utils";
import type { FeedItem } from "@/types/api/main/social";

export default function DiscoverContent() {
  const { feed, isLoading } = useFeed();
  const createPost = useCreatePost();
  const [draft, setDraft] = useState("");

  const submit = () => {
    if (draft.trim().length < 2) return;
    createPost.mutate(
      { content: draft.trim() },
      { onSuccess: () => setDraft("") },
    );
  };

  return (
    <Container size="sm" py="lg">
      <Stack gap="lg">
        <Group gap="sm">
          <IconHome size={26} stroke={1.8} />
          <Title order={2}>ฟีด</Title>
        </Group>

        {/* Composer */}
        <BaseCard withBorder shadow="sm" padding="md">
          <Group align="flex-start" wrap="nowrap">
            <Avatar radius="xl" color="ong-green">คุณ</Avatar>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Textarea
                placeholder="แชร์เรื่องไทป์ของคุณวันนี้..."
                variant="unstyled"
                autosize
                minRows={1}
                value={draft}
                onChange={(e) => setDraft(e.currentTarget.value)}
                styles={{ input: { fontSize: 15 } }}
              />
              <Group justify="flex-end">
                <BaseButton
                  size="xs"
                  radius="xl"
                  loading={createPost.isPending}
                  disabled={draft.trim().length < 2}
                  leftSection={<IconSend2 size={14} />}
                  onClick={submit}
                >
                  โพสต์
                </BaseButton>
              </Group>
            </Stack>
          </Group>
        </BaseCard>

        {isLoading ? (
          <Group justify="center" py="xl">
            <Loader color="ong-green" />
          </Group>
        ) : feed.length > 0 ? (
          <Stack gap="md">
            {feed.map((item) => (
              <FeedPost key={item.id} item={item} />
            ))}
          </Stack>
        ) : (
          <EmptyState title="ยังไม่มีโพสต์" description="เริ่มโพสต์แรก หรือไปติดตามคนไทป์เดียวกันที่หน้าไทป์รูม" />
        )}
      </Stack>
    </Container>
  );
}

const SOURCE_META: Record<FeedItem["source"], { label: string; color: string }> = {
  you: { label: "คุณ", color: "gray" },
  following: { label: "ติดตาม", color: "ong-green" },
  recommended: { label: "แนะนำ", color: "grape" },
};

function FeedPost({ item }: { item: FeedItem }) {
  const router = useRouter();
  const follow = useFollow();
  const [following, setFollowing] = useState(false);
  const name = item.display_name ?? "ไม่ระบุชื่อ";
  const meta = SOURCE_META[item.source];

  const toggleFollow = () => {
    const next = !following;
    setFollowing(next);
    follow.mutate({ userId: item.user_id, next });
  };

  return (
    <BaseCard withBorder shadow="sm" padding="md">
      <Stack gap="sm">
        <Group justify="space-between" wrap="nowrap">
          <Group
            gap="sm"
            wrap="nowrap"
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/u/${item.user_id}`)}
          >
            <Avatar radius="xl" color="ong-green" src={item.avatar_url || null}>
              {initials(name)}
            </Avatar>
            <Stack gap={0}>
              <Group gap={6}>
                <Text fw={700} size="sm">{name}</Text>
                <Badge size="xs" variant="light" color={meta.color} radius="sm">
                  {meta.label}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">{timeFromNow(item.created_at)}</Text>
            </Stack>
          </Group>
          {item.source !== "you" && (
            <BaseButton
              size="xs"
              radius="xl"
              variant={following ? "light" : "filled"}
              onClick={toggleFollow}
            >
              {following ? "กำลังติดตาม" : "ติดตาม"}
            </BaseButton>
          )}
        </Group>

        <Text size="sm">{item.content}</Text>

        {item.type_title && (
          <Group gap="xs">
            <Badge variant="light" color="teal" radius="sm">{item.type_title}</Badge>
            {typeof item.type_level === "number" && <LevelBadge level={item.type_level} size="sm" />}
          </Group>
        )}
      </Stack>
    </BaseCard>
  );
}
