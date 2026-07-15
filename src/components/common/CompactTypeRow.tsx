"use client";

import { useState } from "react";
import { ActionIcon, Group, NumberInput, Stack, Text, Tooltip } from "@mantine/core";
import { IconClockHour4, IconArrowUp, IconMessage2Cog } from "@tabler/icons-react";
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
  /** When provided (owner view), shows the chat-requirement control for this type. */
  minContactLevel?: number;
  onRequirementChange?: (minLevel: number) => void;
  requirementLoading?: boolean;
}

/** Minimal type line: name + level + expiry. Optional level-up + chat-requirement controls. */
export default function CompactTypeRow({
  title,
  level,
  daysLeft,
  status,
  onRelevel,
  relevelLoading,
  minContactLevel,
  onRequirementChange,
  requirementLoading,
}: CompactTypeRowProps) {
  const expired = status === "expired";
  const [draft, setDraft] = useState<number>(minContactLevel ?? 0);

  const commit = () => {
    const v = Math.max(0, Math.min(100, Math.round(draft || 0)));
    if (v !== (minContactLevel ?? 0)) onRequirementChange?.(v);
  };

  return (
    <BaseCard withBorder shadow="none" padding="sm" style={{ opacity: expired ? 0.55 : 1 }}>
      <Stack gap={onRequirementChange ? "xs" : 0}>
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

        {onRequirementChange && !expired && (
          <Group gap="xs" wrap="nowrap" pl={2}>
            <IconMessage2Cog size={15} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">คุยกับฉันได้เมื่อเลเวล ≥</Text>
            <NumberInput
              size="xs"
              w={78}
              min={0}
              max={100}
              radius="md"
              value={draft}
              disabled={requirementLoading}
              onChange={(v) => setDraft(typeof v === "number" ? v : 0)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.currentTarget as HTMLInputElement).blur();
              }}
            />
            <Text size="xs" c="dimmed">{draft > 0 ? "" : "(ทุกคน)"}</Text>
          </Group>
        )}
      </Stack>
    </BaseCard>
  );
}
