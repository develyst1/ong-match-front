"use client";

import { IconSeedling } from "@tabler/icons-react";
import { Stack, Text, ThemeIcon } from "@mantine/core";

interface EmptyStateProps {
  /** A Tabler icon node to display in the circular badge. */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Friendly empty/zero-state block used across lists. */
export default function EmptyState({
  icon,
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <Stack align="center" justify="center" py={48} gap="sm">
      <ThemeIcon size={64} radius="xl" variant="light" color="ong-green">
        {icon ?? <IconSeedling size={30} stroke={1.8} />}
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
