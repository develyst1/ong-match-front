// Phase 2 backend contract types: feed, follows, search, matches, public profile.

export type FeedSource = "you" | "following" | "recommended";

export interface FeedItem {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  content: string;
  type_title: string | null;
  type_level: number | null;
  source: FeedSource;
  created_at: string;
}

export interface TypeSearchItem {
  id: string;
  title: string;
  level: number;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  tags: string[];
}

export interface MatchingPerson {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  type_title: string;
  type_level: number;
  my_level: number;
  level_gap: number;
  shared_tags: number;
}

export interface PublicProfileType {
  id: string;
  title: string;
  level: number;
  daysLeft: number;
  status: string;
}

export interface PublicProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  types: PublicProfileType[];
}

export interface ContactCheck {
  allowed: boolean;
  reason: string;
  typeTitle?: string;
  requiredLevel?: number;
  yourLevel?: number;
}
