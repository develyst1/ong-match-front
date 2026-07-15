// Frontend domain types for a User profile.

import type { ActivityLevel } from "@/types/api/main/user";

export interface User {
  id: string;
  displayName: string;
  bio: string;
  age: number;
  location: string;
  avatarUrl: string;
  coverUrl?: string;
  primaryTribeId: string;
  interestIds: string[];
  activityLevel: ActivityLevel;
  createdAt: string;
}

export interface OngBadge {
  tribeId: string;
  tribeSlug: string;
  tribeName: string;
  tribeColor: string;
}

export interface UserProfileParams {
  id?: string;
}

export interface UserProfileFormValues {
  displayName: string;
  bio: string;
  age: number;
  location: string;
  avatarUrl?: string;
  coverUrl?: string;
  primaryTribeId: string;
  interestIds: string[];
  activityLevel: ActivityLevel;
}
