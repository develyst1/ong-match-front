import type { Tribe } from "@/types/app/tribe";
import type { TribeResponse } from "@/types/api/main/tribe";
import { getTribesApi } from "@/lib/api/api-main";
import { MOCK_TRIBES, mockDelay } from "@/lib/api/mock-data";

const toTribe = (t: TribeResponse): Tribe => ({ ...t });

export const getTribes = async (): Promise<Tribe[]> => {
  try {
    const res = await getTribesApi();
    return (res.data?.data ?? []).map(toTribe);
  } catch {
    // Backend not running yet — fall back to mock seed.
    const data = await mockDelay(MOCK_TRIBES.map(toTribe));
    return data;
  }
};
