import type {
  FeedItem,
  MatchingPerson,
  PublicProfile,
  TypeSearchItem,
} from "@/types/api/main/social";
import {
  createPostApi,
  followApi,
  getFeedApi,
  getPeopleMatchesApi,
  getPublicProfileApi,
  searchTypesApi,
  unfollowApi,
} from "@/lib/api/api-social";
import { mockDelay } from "@/lib/api/mock-data";

export const getFeed = async (): Promise<FeedItem[]> => {
  try {
    return (await getFeedApi()).data.data;
  } catch {
    return mockDelay([]);
  }
};

export const createPost = async (content: string, typeId?: string | null): Promise<void> => {
  try {
    await createPostApi({ content, typeId });
  } catch {
    await mockDelay(null);
  }
};

export const followUser = async (userId: string, next: boolean): Promise<void> => {
  try {
    if (next) await followApi(userId);
    else await unfollowApi(userId);
  } catch {
    await mockDelay(null);
  }
};

export const searchTypes = async (q: string, tags: string[]): Promise<TypeSearchItem[]> => {
  try {
    return (await searchTypesApi(q, tags)).data.data;
  } catch {
    return mockDelay([]);
  }
};

export const getPeopleMatches = async (): Promise<MatchingPerson[]> => {
  try {
    return (await getPeopleMatchesApi()).data.data;
  } catch {
    return mockDelay([]);
  }
};

export const getPublicProfile = async (userId: string): Promise<PublicProfile | null> => {
  try {
    return (await getPublicProfileApi(userId)).data.data;
  } catch {
    return mockDelay(null);
  }
};
