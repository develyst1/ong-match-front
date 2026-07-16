import { loginApi, registerApi } from "@/lib/api/api-auth";

const TOKEN_KEY = "ong-match-token";
const EMAIL_KEY = "ong-match-email";

function persist(token: string, email: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(EMAIL_KEY, email);
}

/** Log in with real credentials; stores the JWT. Throws on bad credentials (401). */
export const login = async (email: string, password: string): Promise<void> => {
  const res = await loginApi({ email, password });
  const { token, user } = res.data.data;
  persist(token, user.email);
};

/** Register a real account; stores the JWT. Throws on duplicate email (409). */
export const register = async (email: string, password: string, displayName?: string): Promise<void> => {
  const res = await registerApi({ email, password, displayName });
  const { token, user } = res.data.data;
  persist(token, user.email);
};
