"use client";

import { useRouter } from "next/navigation";
import { Group, ScrollArea, Stack, Text } from "@mantine/core";
import { IconFlame, IconUsers } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { useTrendingTags } from "@/hooks/social";

/** Horizontal strip of trending tag-groups. Tap a tag to search people in it. */
export default function TrendingTags() {
  const router = useRouter();
  const { tags } = useTrendingTags();

  if (tags.length === 0) return null;

  return (
    <Stack gap="xs">
      <Group gap={6}>
        <IconFlame size={18} color="var(--mantine-color-orange-6)" />
        <Text fw={700} size="sm">ไทป์มาแรง</Text>
      </Group>
      <ScrollArea scrollbars="x" offsetScrollbars type="never">
        <Group gap="sm" wrap="nowrap" pb={4}>
          {tags.map((t) => (
            <BaseCard
              key={t.tag}
              withBorder
              shadow="none"
              padding="sm"
              style={{ cursor: "pointer", minWidth: 150, flexShrink: 0 }}
              onClick={() => router.push(`/tribes?tag=${encodeURIComponent(t.tag)}`)}
            >
              <Stack gap={4}>
                <Text fw={700} size="sm" lineClamp={1}>#{t.tag}</Text>
                <Group gap={4} c="ong-green.7">
                  <IconUsers size={13} />
                  <Text size="xs" fw={600}>{t.people.toLocaleString()} คน</Text>
                </Group>
                {t.sample_titles[0] && (
                  <Text size="10px" c="dimmed" lineClamp={1}>
                    {t.sample_titles.slice(0, 2).join(" · ")}
                  </Text>
                )}
              </Stack>
            </BaseCard>
          ))}
        </Group>
      </ScrollArea>
    </Stack>
  );
}
