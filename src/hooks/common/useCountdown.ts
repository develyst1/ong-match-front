"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Simple 1-second countdown. `start()` (re)begins from `seconds`; when it hits
 * 0 it stops and fires `onExpire` once. Cleans up its interval on unmount.
 */
export function useCountdown(seconds: number, onExpire?: () => void) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const clear = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    setRemaining(seconds);
    setRunning(true);
    timer.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clear();
          setRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }, [seconds, clear]);

  const stop = useCallback(() => {
    clear();
    setRunning(false);
  }, [clear]);

  useEffect(() => clear, [clear]);

  return { remaining, running, start, stop };
}
