// Frontend domain types for Match suggestions ("Ong Match Score").

import type { Interest } from "@/types/app/interest";
import type { Tribe } from "@/types/app/tribe";
import type { User } from "@/types/app/user";
import type { MatchStatus } from "@/types/api/main/match";

export interface MatchSuggestion {
  id: string;
  user: User;
  score: number;
  sharedTribe: Tribe;
  sharedInterests: Interest[];
  status: MatchStatus;
  createdAt: string;
}

export interface MatchListParams {
  tribeId?: string;
  location?: string;
  ageMin?: number;
  ageMax?: number;
  page?: number;
  pageSize?: number;
}
