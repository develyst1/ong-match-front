// Backend response shape for a Match suggestion between two users.

import type { InterestResponse } from "./interest";
import type { TribeResponse } from "./tribe";
import type { UserResponse } from "./user";

export type MatchStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "MATCHED";

export interface MatchResponse {
  id: string;
  user: UserResponse;
  score: number;
  sharedTribe: TribeResponse;
  sharedInterests: InterestResponse[];
  status: MatchStatus;
  createdAt: string;
}
