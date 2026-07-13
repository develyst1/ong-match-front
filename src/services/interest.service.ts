import type { Interest, InterestListParams } from "@/types/app/interest";
import type { InterestResponse } from "@/types/api/main/interest";
import { getInterestsApi } from "@/lib/api/api-main";
import { MOCK_INTERESTS, mockDelay } from "@/lib/api/mock-data";

const toInterest = (i: InterestResponse): Interest => ({ ...i });

export const getInterests = async (
  params?: InterestListParams,
): Promise<Interest[]> => {
  try {
    const res = await getInterestsApi(params as Record<string, unknown> | undefined);
    return (res.data?.data ?? []).map(toInterest);
  } catch {
    let list = MOCK_INTERESTS.map(toInterest);
    if (params?.tribeId) {
      list = list.filter((i) => i.tribeId === params.tribeId);
    }
    return mockDelay(list);
  }
};
