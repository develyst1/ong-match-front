"use client";

import { useQuery } from "@tanstack/react-query";
import { getTribes } from "@/services/tribe.service";

export const TRIBES_QUERY_KEY = ["tribes"] as const;

export const useTribes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...TRIBES_QUERY_KEY],
    queryFn: getTribes,
  });

  return { tribes: data ?? [], isLoading, isError, error };
};
