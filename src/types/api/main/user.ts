// Backend response shape for a User profile.

export type ActivityLevel = "LOW" | "MEDIUM" | "HIGH";

export interface UserResponse {
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
