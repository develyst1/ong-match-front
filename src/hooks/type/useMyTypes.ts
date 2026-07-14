"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyTypes, setTypeRequirement } from "@/services/type.service";

export const MY_TYPES_QUERY_KEY = ["my-types"] as const;

export const useMyTypes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...MY_TYPES_QUERY_KEY],
    queryFn: getMyTypes,
  });

  return { types: data ?? [], isLoading, isError, error };
};

export const useSetTypeRequirement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, minLevel }: { id: string; minLevel: number }) => setTypeRequirement(id, minLevel),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...MY_TYPES_QUERY_KEY] }),
  });
};
