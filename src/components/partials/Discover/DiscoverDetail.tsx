"use client";

import { SimpleGrid, Skeleton } from "@mantine/core";
import MatchCard from "./MatchCard";
import { EmptyState } from "@/components/common";
import { useMatches } from "@/hooks/match";
import { APP_TEXT } from "@/constant/text/common";

interface DiscoverDetailProps {
  tribeId?: string;
  sort?: string;
}

export default function DiscoverDetail({ tribeId, sort }: DiscoverDetailProps) {
  const params = tribeId && tribeId !== "all" ? { tribeId } : undefined;
  const { matches, isLoading } = useMatches(params);

  const sorted = [...matches].sort((a, b) =>
    sort === "new"
      ? +new Date(b.createdAt) - +new Date(a.createdAt)
      : b.score - a.score,
  );

  if (!isLoading && sorted.length === 0) {
    return (
      <EmptyState
        emoji="🌵"
        title={APP_TEXT.discover.noResults}
        description="ลองเปลี่ยนองค์ หรือดูแบบ 'ทุกองค์' ดูนะ"
      />
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="lg">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={280} radius="xl" />
          ))
        : sorted.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
    </SimpleGrid>
  );
}
