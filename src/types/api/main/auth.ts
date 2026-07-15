// Backend contract for real account auth (/api/v1/auth/*).

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
}

export interface AuthResponse {
  /** Signed JWT — the only thing that proves who the caller is. */
  token: string;
  user: AuthUser;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  password: string;
  displayName?: string;
  phone?: string;
  age?: number;
}
