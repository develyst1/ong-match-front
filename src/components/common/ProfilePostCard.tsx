"use client";

import { Badge, Group, Stack, Text } from "@mantine/core";
import { BaseCard } from "@/components/ui/Card";
import LevelBadge from "./LevelBadge";
import { timeFromNow } from "@/lib/utils";
import type { UserPost } from "@/types/api/main/social";

/** A single post shown on a profile (content + its type + time). */
export default function ProfilePostCard({ post }: { post: UserPost }) {
  return (
    <BaseCard withBorder shadow="none" padding="md">
      <Stack gap="xs">
        <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
          {post.content}
        </Text>
        <Group justify="space-between" wrap="nowrap">
          <Group gap={6}>
            {post.type_title && (
              <Badge variant="light" color="teal" radius="sm">
                {post.type_title}
              </Badge>
            )}
            {typeof post.type_level === "number" && <LevelBadge level={post.type_level} size="sm" />}
          </Group>
          <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
            {timeFromNow(post.created_at)}
          </Text>
        </Group>
      </Stack>
    </BaseCard>
  );
}
