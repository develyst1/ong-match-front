import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";
import type {
  FeedItem,
  MatchingPerson,
  PublicProfile,
  TypeSearchItem,
} from "@/types/api/main/social";

export const getFeedApi = () =>
  mainClient.get<ApiResponse<FeedItem[]>>("/api/v1/feed");

export const createPostApi = (body: { content: string; typeId?: string | null }) =>
  mainClient.post<ApiResponse<{ id: string }>>("/api/v1/posts", body);

export const followApi = (userId: string) =>
  mainClient.post<ApiResponse<{ following: boolean }>>(`/api/v1/users/${userId}/follow`);

export const unfollowApi = (userId: string) =>
  mainClient.delete<ApiResponse<{ following: boolean }>>(`/api/v1/users/${userId}/follow`);

export const searchTypesApi = (q: string, tags: string[]) =>
  mainClient.get<ApiResponse<TypeSearchItem[]>>("/api/v1/types/search", {
    params: { q: q || undefined, tags: tags.length ? tags.join(",") : undefined },
  });

export const getPeopleMatchesApi = () =>
  mainClient.get<ApiResponse<MatchingPerson[]>>("/api/v1/people/matches");

export const getPublicProfileApi = (userId: string) =>
  mainClient.get<ApiResponse<PublicProfile>>(`/api/v1/users/${userId}`);
