"use client";

import { useQuery } from "@tanstack/react-query";
import { getInterests } from "@/services/interest.service";
import type { InterestListParams } from "@/types/app/interest";

export const INTERESTS_QUERY_KEY = ["interests"] as const;

export const useInterests = (params?: InterestListParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...INTERESTS_QUERY_KEY, params],
    queryFn: () => getInterests(params),
  });

  return { interests: data ?? [], isLoading, isError, error };
};
