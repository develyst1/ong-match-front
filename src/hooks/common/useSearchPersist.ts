"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_EXPIRE_NUM = 30;
const DEFAULT_EXPIRE_UNIT: "day" | "hour" = "day";

export interface SearchPersistResult<T extends Record<string, string>> {
  filterValues: T;
  persist: (key: string, value: T | Record<string, string>) => void;
  clear: () => void;
}

/**
 * Persist filter state to cookies (with configurable expiry) so that a user
 * returning to a page sees their last filter set. Mirrors the skill pattern.
 */
export function useSearchPersist<T extends Record<string, string>>(
  storageKey: string,
  defaults: T,
): SearchPersistResult<T> {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterValues, setFilterValues] = useState<T>(() => {
    const fromUrl = Object.fromEntries(searchParams.entries());
    if (Object.keys(fromUrl).length) return { ...defaults, ...fromUrl } as T;
    return defaults;
  });

  const persist = useCallback(
    (_: string, value: T | Record<string, string>) => {
      setFilterValues((prev) => {
        const merged = { ...prev, ...value };
        const params = new URLSearchParams(
          Object.fromEntries(
            Object.entries(merged).filter(([, v]) => v && v !== "all"),
          ),
        );
        const qs = params.toString();
        router.replace(qs ? `?${qs}` : "?", { scroll: false });
        return merged as T;
      });
    },
    [router],
  );

  const clear = useCallback(() => {
    setFilterValues(defaults);
    router.replace("?", { scroll: false });
  }, [defaults, router]);

  // Sync URL → state on back/forward navigation.
  useEffect(() => {
    const fromUrl = Object.fromEntries(searchParams.entries());
    setFilterValues({ ...defaults, ...fromUrl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Persist to cookie whenever filters change.
  useEffect(() => {
    const expireNum = Number(
      process.env.NEXT_PUBLIC_SEARCH_PERSIST_EXPIRE_NUM ?? DEFAULT_EXPIRE_NUM,
    );
    const expireUnit =
      (process.env
        .NEXT_PUBLIC_SEARCH_PERSIST_UNIT as "day" | "hour" | undefined) ??
      DEFAULT_EXPIRE_UNIT;
    const maxAge =
      expireUnit === "hour" ? expireNum * 3600 : expireNum * 86400;
    document.cookie = `${storageKey}=${encodeURIComponent(
      JSON.stringify(filterValues),
    )}; max-age=${maxAge}; path=/`;
  }, [filterValues, storageKey]);

  return { filterValues, persist, clear };
}
