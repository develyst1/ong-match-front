"use client";

import { Group, SegmentedControl, Text } from "@mantine/core";
import { BaseSelect } from "@/components/ui/Select";
import type { Tribe } from "@/types/app/tribe";

interface DiscoverHeaderProps {
  tribes: Tribe[];
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export default function DiscoverHeader({
  tribes,
  filters,
  onFilterChange,
}: DiscoverHeaderProps) {
  const tribeData = [
    { value: "all", label: "ทุกองค์" },
    ...tribes.map((t) => ({ value: t.id, label: `${t.emoji} ${t.name}` })),
  ];

  return (
    <Group justify="space-between" align="flex-end" wrap="wrap" gap="md">
      <div style={{ minWidth: 240, flex: 1 }}>
        <Text size="sm" fw={500} mb={4}>
          องค์
        </Text>
        <BaseSelect
          value={filters.tribeId}
          onChange={(value) => onFilterChange("tribeId", value ?? "all")}
          data={tribeData}
          searchable
          clearable={false}
          w={{ base: "100%", sm: 320 }}
        />
      </div>
      <SegmentedControl
        value={filters.sort ?? "score"}
        onChange={(value) => onFilterChange("sort", value)}
        data={[
          { label: "องค์ตรงสุด", value: "score" },
          { label: "ใหม่ล่าสุด", value: "new" },
        ]}
        radius="xl"
      />
    </Group>
  );
}
