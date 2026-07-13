"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, getUser, updateMe } from "@/services/user.service";
import type { UserProfileFormValues } from "@/types/app/user";

export const ME_QUERY_KEY = ["me"] as const;
export const USER_QUERY_KEY = ["user"] as const;

export const useMe = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...ME_QUERY_KEY],
    queryFn: getMe,
  });

  return { me: data, isLoading, isError, error };
};

export const useUser = (id?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...USER_QUERY_KEY, id],
    queryFn: () => getUser(id as string),
    enabled: Boolean(id),
  });

  return { user: data, isLoading, isError, error };
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UserProfileFormValues) => updateMe(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...ME_QUERY_KEY] });
    },
  });
};
