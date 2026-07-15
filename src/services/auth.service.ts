import { loginApi, registerApi } from "@/lib/api/api-auth";
import type { AuthResponse, LoginBody, RegisterBody } from "@/types/api/main/auth";

const TOKEN_KEY = "ong-match-token";
const EMAIL_KEY = "ong-match-email";

/** Persist the signed token; every later request is authenticated with it. */
function storeSession(auth: AuthResponse) {
  window.localStorage.setItem(TOKEN_KEY, auth.token);
  window.localStorage.setItem(EMAIL_KEY, auth.user.email);
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
}

/**
 * Real login — the backend verifies the password hash. There is no local
 * fallback on purpose: if the call fails, the user is not signed in.
 */
export async function login(body: LoginBody): Promise<AuthResponse> {
  const auth = (await loginApi(body)).data.data;
  storeSession(auth);
  return auth;
}

export async function register(body: RegisterBody): Promise<AuthResponse> {
  const auth = (await registerApi(body)).data.data;
  storeSession(auth);
  return auth;
}

/** Message for a failed auth call, using the backend's reason when present. */
export function authErrorMessage(err: unknown, fallback: string): string {
  const res = (err as { response?: { status?: number; data?: { error?: string } } })?.response;
  if (res?.data?.error) return res.data.error;
  if (res?.status === 401) return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
  if (!res) return "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง";
  return fallback;
}
