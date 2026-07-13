"use client";

import { Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconCompass } from "@tabler/icons-react";
import { Suspense } from "react";
import { useSearchPersist } from "@/hooks/common";
import { useTribes } from "@/hooks/tribe";
import DiscoverHeader from "./DiscoverHeader";
import DiscoverDetail from "./DiscoverDetail";
import { DISCOVER_STORAGE_KEY, DEFAULT_FILTERS } from "./Discover.config";
import { APP_TEXT } from "@/constant/text/common";

export default function DiscoverContent() {
  // useSearchParams() is used inside <DiscoverInner/> via useSearchPersist,
  // so it must be wrapped in a Suspense boundary for static prerendering.
  return (
    <Suspense fallback={null}>
      <DiscoverInner />
    </Suspense>
  );
}

function DiscoverInner() {
  const { filterValues: filters, persist } = useSearchPersist(
    DISCOVER_STORAGE_KEY,
    DEFAULT_FILTERS,
  );
  const { tribes } = useTribes();

  const handleFilterChange = (key: string, value: string) => {
    persist("", { ...filters, [key]: value });
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Stack gap={4}>
          <Group gap="sm">
            <IconCompass size={26} stroke={1.8} />
            <Title order={2}>{APP_TEXT.discover.title}</Title>
          </Group>
          <Text size="sm" c="dimmed">
            {APP_TEXT.discover.suggested}
          </Text>
        </Stack>
        <DiscoverHeader
          tribes={tribes}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <DiscoverDetail tribeId={filters.tribeId} sort={filters.sort} />
      </Stack>
    </Container>
  );
}
