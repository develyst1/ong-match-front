"use client";

import { RingProgress, Text, Stack } from "@mantine/core";
import { scoreColor } from "@/lib/utils";

interface MatchScoreRingProps {
  score: number;
  size?: number;
  label?: string;
}

/** Circular "Ong Match Score" indicator (e.g. 92% องค์ตรงกัน). */
export default function MatchScoreRing({
  score,
  size = 80,
  label = "องค์ตรงกัน",
}: MatchScoreRingProps) {
  return (
    <Stack align="center" gap={4}>
      <RingProgress
        size={size}
        thickness={8}
        roundCaps
        sections={[{ value: score, color: scoreColor(score) }]}
        label={
          <Text ta="center" fw={700} size="lg">
            {score}%
          </Text>
        }
      />
      <Text size="xs" c="dimmed" ta="center">
        {label}
      </Text>
    </Stack>
  );
}
