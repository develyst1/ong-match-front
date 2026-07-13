import type { User, UserProfileFormValues } from "@/types/app/user";
import type { UserResponse } from "@/types/api/main/user";
import { getMeApi, getUserApi, updateMeApi } from "@/lib/api/api-main";
import { MOCK_ME, MOCK_USERS, mockDelay } from "@/lib/api/mock-data";

const toUser = (u: UserResponse): User => ({ ...u });

export const getMe = async (): Promise<User> => {
  try {
    const res = await getMeApi();
    return toUser(res.data.data);
  } catch {
    return mockDelay(toUser(MOCK_ME));
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const res = await getUserApi(id);
    return toUser(res.data.data);
  } catch {
    const found = MOCK_USERS.find((u) => u.id === id) ?? MOCK_ME;
    return mockDelay(toUser(found));
  }
};

export const updateMe = async (body: UserProfileFormValues): Promise<User> => {
  try {
    const res = await updateMeApi(body);
    return toUser(res.data.data);
  } catch {
    return mockDelay(toUser({ ...MOCK_ME, ...body }));
  }
};
