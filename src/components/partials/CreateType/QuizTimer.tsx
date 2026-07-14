"use client";

import { Group, RingProgress, Text } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

interface QuizTimerProps {
  remaining: number;
  total: number;
}

/** Circular countdown; turns orange under 10s and red under 5s. */
export default function QuizTimer({ remaining, total }: QuizTimerProps) {
  const pct = total > 0 ? (remaining / total) * 100 : 0;
  const color = remaining <= 5 ? "red" : remaining <= 10 ? "orange" : "ong-green";
  return (
    <RingProgress
      size={72}
      thickness={6}
      roundCaps
      sections={[{ value: pct, color }]}
      label={
        <Group justify="center" gap={2}>
          <IconClock size={13} color={`var(--mantine-color-${color}-6)`} />
          <Text ta="center" fw={700} size="sm" c={color}>
            {remaining}
          </Text>
        </Group>
      }
    />
  );
}
