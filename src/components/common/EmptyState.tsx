"use client";

import { Stack, Text, ThemeIcon } from "@mantine/core";

interface EmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Friendly empty/zero-state block used across lists. */
export default function EmptyState({
  emoji = "🌱",
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <Stack align="center" justify="center" py={48} gap="sm">
      <ThemeIcon size={64} radius="xl" variant="light" color="ong-green">
        <span style={{ fontSize: 30 }}>{emoji}</span>
      </ThemeIcon>
      <Text fw={600} size="lg" ta="center">
        {title}
      </Text>
      {description && (
        <Text size="sm" c="dimmed" ta="center" maw={360}>
          {description}
        </Text>
      )}
      {children}
    </Stack>
  );
}
