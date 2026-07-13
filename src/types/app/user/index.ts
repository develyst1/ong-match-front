// Frontend domain types for a User profile.

import type { ActivityLevel } from "@/types/api/main/user";

export interface User {
  id: string;
  displayName: string;
  bio: string;
  age: number;
  location: string;
  avatarUrl: string;
  primaryTribeId: string;
  interestIds: string[];
  activityLevel: ActivityLevel;
  createdAt: string;
}

export interface OngBadge {
  tribeId: string;
  tribeName: string;
  tribeEmoji: string;
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
  primaryTribeId: string;
  interestIds: string[];
  activityLevel: ActivityLevel;
}
