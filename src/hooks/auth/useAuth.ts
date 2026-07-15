"use client";

import { useCallback, useEffect, useState } from "react";
import { clearSession } from "@/services/auth.service";

const TOKEN_KEY = "ong-match-token";
const EMAIL_KEY = "ong-match-email";

/**
 * Client-side auth state for Ong Match.
 *
 * Source of truth is the signed token in localStorage (issued by the backend at
 * login) — the same token the axios interceptor sends as `Bearer`. Reading
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
    clearSession();
    setIsAuthenticated(false);
    setEmail(null);
  }, []);

  return { ready, isAuthenticated, email, logout };
}
