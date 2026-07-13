"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMatches, respondToMatch } from "@/services/match.service";
import type { MatchListParams } from "@/types/app/match";

export const MATCHES_QUERY_KEY = ["matches"] as const;

export const useMatches = (params?: MatchListParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...MATCHES_QUERY_KEY, params],
    queryFn: () => getMatches(params),
  });

  return { matches: data ?? [], isLoading, isError, error };
};

export const useRespondToMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, accept }: { id: string; accept: boolean }) =>
      respondToMatch(id, accept),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...MATCHES_QUERY_KEY] });
    },
  });
};
