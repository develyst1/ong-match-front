"use client";

import { Group, Progress, Stack, Text } from "@mantine/core";
import { IconClockHour4, IconArrowUp } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { BaseButton } from "@/components/ui/Button";
import LevelBadge from "./LevelBadge";
import type { MyType } from "@/types/api/main/quiz";

interface TypeCardProps {
  type: MyType;
  onRelevel?: (id: string) => void;
  relevelLoading?: boolean;
}

export default function TypeCard({ type, onRelevel, relevelLoading }: TypeCardProps) {
  const expired = type.status === "expired";
  const urgent = !expired && type.daysLeft <= 5;

  return (
    <BaseCard withBorder shadow="sm" padding="lg" style={{ opacity: expired ? 0.55 : 1 }}>
      <Stack gap="sm">
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Text fw={700} size="md" lineClamp={2}>
            {type.title}
          </Text>
          <LevelBadge level={type.level} size="md" />
        </Group>

        {type.description && (
          <Text size="sm" c="dimmed" lineClamp={2}>
            {type.description}
          </Text>
        )}

        <Progress value={type.level} color={type.level >= 80 ? "yellow" : "ong-green"} radius="xl" size="sm" />

        <Group justify="space-between" align="center">
          <Group gap={4} c={expired ? "red" : urgent ? "orange" : "dimmed"}>
            <IconClockHour4 size={14} />
            <Text size="xs" fw={500}>
              {expired ? "หมดอายุแล้ว" : `เหลือ ${type.daysLeft} วัน`}
            </Text>
          </Group>
          {!expired && onRelevel && (
            <BaseButton
              size="xs"
              variant="light"
              radius="xl"
              loading={relevelLoading}
              leftSection={<IconArrowUp size={14} />}
              onClick={() => onRelevel(type.id)}
            >
              อัปเลเวล
            </BaseButton>
          )}
        </Group>
      </Stack>
    </BaseCard>
  );
}
