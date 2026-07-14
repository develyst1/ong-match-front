"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyTypes } from "@/services/type.service";

export const MY_TYPES_QUERY_KEY = ["my-types"] as const;

export const useMyTypes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...MY_TYPES_QUERY_KEY],
    queryFn: getMyTypes,
  });

  return { types: data ?? [], isLoading, isError, error };
};
