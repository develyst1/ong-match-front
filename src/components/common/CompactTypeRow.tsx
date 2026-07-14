"use client";

import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconClockHour4, IconArrowUp } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import LevelBadge from "./LevelBadge";

interface CompactTypeRowProps {
  title: string;
  level: number;
  daysLeft: number;
  status: string;
  /** When provided, shows a small level-up action (owner view only). */
  onRelevel?: () => void;
  relevelLoading?: boolean;
}

/** Minimal type line: name + level + expiry only. Optional level-up action. */
export default function CompactTypeRow({
  title,
  level,
  daysLeft,
  status,
  onRelevel,
  relevelLoading,
}: CompactTypeRowProps) {
  const expired = status === "expired";
  return (
    <BaseCard withBorder shadow="none" padding="sm" style={{ opacity: expired ? 0.55 : 1 }}>
      <Group justify="space-between" wrap="nowrap">
        <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
          <LevelBadge level={level} size="md" />
          <Text fw={600} size="sm" lineClamp={1}>{title}</Text>
        </Group>
        <Group gap="sm" wrap="nowrap">
          <Group gap={4} c={expired ? "red" : "dimmed"} wrap="nowrap">
            <IconClockHour4 size={13} />
            <Text size="xs" fw={500}>{expired ? "หมดอายุ" : `${daysLeft} วัน`}</Text>
          </Group>
          {onRelevel && !expired && (
            <Tooltip label="อัปเลเวล">
              <ActionIcon variant="light" color="ong-green" radius="xl" loading={relevelLoading} onClick={onRelevel}>
                <IconArrowUp size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Group>
    </BaseCard>
  );
}
