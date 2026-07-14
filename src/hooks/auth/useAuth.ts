"use client";

import { useCallback, useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const TOKEN_KEY = "ong-match-token";
const EMAIL_KEY = "ong-match-email";

/**
 * Client-side auth state for Ong Match (Phase 1 demo auth).
 *
 * Source of truth is the presence of `ong-match-token` in localStorage — the
 * same signal the axios interceptor uses to attach the caller's email. Reading
 * happens in an effect so server and first client render agree (`ready=false`),
 * avoiding a hydration mismatch.
 */
export function useAuth() {
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthenticated(Boolean(window.localStorage.getItem(TOKEN_KEY)));
    setEmail(window.localStorage.getItem(EMAIL_KEY));
    setReady(true);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(EMAIL_KEY);
    setIsAuthenticated(false);
    setEmail(null);
    void signOut({ redirect: false });
  }, []);

  return { ready, isAuthenticated, email, logout };
}
