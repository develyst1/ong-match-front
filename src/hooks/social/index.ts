"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  followUser,
  getCanContact,
  getFeed,
  getPeopleMatches,
  getPublicProfile,
  searchTypes,
} from "@/services/social.service";

export const FEED_QUERY_KEY = ["feed"] as const;
export const MATCHES_QUERY_KEY = ["people-matches"] as const;

export const useFeed = () => {
  const { data, isLoading } = useQuery({ queryKey: [...FEED_QUERY_KEY], queryFn: getFeed });
  return { feed: data ?? [], isLoading };
};

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ content, typeId }: { content: string; typeId?: string | null }) =>
      createPost(content, typeId),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...FEED_QUERY_KEY] }),
  });
};

export const useFollow = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, next }: { userId: string; next: boolean }) => followUser(userId, next),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...FEED_QUERY_KEY] }),
  });
};

export const usePeopleMatches = () => {
  const { data, isLoading } = useQuery({ queryKey: [...MATCHES_QUERY_KEY], queryFn: getPeopleMatches });
  return { people: data ?? [], isLoading };
};

export const useTypeSearch = (q: string, tags: string[]) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["type-search", q, tags.join(",")],
    queryFn: () => searchTypes(q, tags),
  });
  return { results: data ?? [], isLoading, isFetching };
};

export const usePublicProfile = (userId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["public-profile", userId],
    queryFn: () => getPublicProfile(userId as string),
    enabled: Boolean(userId),
  });
  return { profile: data ?? null, isLoading };
};

export const useCanContact = (userId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["can-contact", userId],
    queryFn: () => getCanContact(userId as string),
    enabled: Boolean(userId),
  });
  return { contact: data ?? null, isLoading };
};
