import type {
  MatchListParams,
  MatchSuggestion,
} from "@/types/app/match";
import type { InterestResponse } from "@/types/api/main/interest";
import type { MatchResponse } from "@/types/api/main/match";
import type { TribeResponse } from "@/types/api/main/tribe";
import type { UserResponse } from "@/types/api/main/user";
import { acceptMatchApi, getMatchesApi, rejectMatchApi } from "@/lib/api/api-main";
import { MOCK_INTERESTS, MOCK_MATCHES, MOCK_TRIBES, MOCK_USERS, mockDelay } from "@/lib/api/mock-data";

const toMatch = (m: MatchResponse): MatchSuggestion => ({
  id: m.id,
  score: m.score,
  status: m.status,
  createdAt: m.createdAt,
  user: { ...m.user },
  sharedTribe: { ...m.sharedTribe },
  sharedInterests: m.sharedInterests.map((i) => ({ ...i })),
});

const byId = <T extends { id: string }>(id: string, list: T[]): T =>
  list.find((x) => x.id === id) ?? list[0];

export const getMatches = async (
  params?: MatchListParams,
): Promise<MatchSuggestion[]> => {
  try {
    const res = await getMatchesApi(params as Record<string, unknown> | undefined);
    return (res.data?.data?.content ?? []).map(toMatch);
  } catch {
    let list = MOCK_MATCHES.map(toMatch);
    if (params?.tribeId) {
      list = list.filter((m) => m.sharedTribe.id === params.tribeId);
    }
    return mockDelay(list);
  }
};

export const respondToMatch = async (
  id: string,
  accept: boolean,
): Promise<MatchSuggestion> => {
  try {
    const res = accept ? await acceptMatchApi(id) : await rejectMatchApi(id);
    return toMatch(res.data.data);
  } catch {
    const original = byId<MatchResponse>(id, MOCK_MATCHES);
    const tribe = byId<TribeResponse>(original.user.primaryTribeId, MOCK_TRIBES);
    const interests = original.sharedInterests.map(
      (i) => byId<InterestResponse>(i.id, MOCK_INTERESTS),
    );
    const user = byId<UserResponse>(original.user.id, MOCK_USERS);
    return mockDelay(
      toMatch({
        ...original,
        user,
        sharedTribe: tribe,
        sharedInterests: interests,
        status: accept ? "ACCEPTED" : "REJECTED",
      }),
    );
  }
};
