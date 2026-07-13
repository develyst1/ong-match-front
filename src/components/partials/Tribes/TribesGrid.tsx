"use client";

import {
  Badge,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { BaseCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/common";
import { useTribes } from "@/hooks/tribe";
import type { Tribe } from "@/types/app/tribe";

export function TribesGrid() {
  const { tribes, isLoading } = useTribes();

  if (!isLoading && tribes.length === 0) {
    return (
      <EmptyState
        emoji="🗂️"
        title="ยังไม่มีองค์ให้เลือก"
        description="ลองรีเฟรชใหม่อีกครั้งนะ"
      />
    );
  }

  return (
    <SimpleGrid
      cols={{ base: 2, xs: 3, sm: 4, md: 6 }}
      spacing="md"
    >
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={160} radius="xl" />
          ))
        : tribes.map((tribe) => <TribeCard key={tribe.id} tribe={tribe} />)}
    </SimpleGrid>
  );
}

function TribeCard({ tribe }: { tribe: Tribe }) {
  return (
    <BaseCard
      withBorder
      padding="lg"
      shadow="sm"
      style={{
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <Stack align="center" gap="xs" ta="center">
        <Text style={{ fontSize: 44, lineHeight: 1 }}>{tribe.emoji}</Text>
        <Text fw={700} size="sm">
          {tribe.name}
        </Text>
        <Badge color={tribe.color} variant="light" radius="xl" size="sm">
          {tribe.memberCount.toLocaleString()} คน
        </Badge>
      </Stack>
    </BaseCard>
  );
}

export default TribesGrid;
