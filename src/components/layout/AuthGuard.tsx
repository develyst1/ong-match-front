"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Center, Loader } from "@mantine/core";
import { useAuth } from "@/hooks/auth";

/**
 * Gate for authenticated-only areas. Guests are bounced to the public landing
 * feed at `/`; while auth state is resolving (or a guest is being redirected)
 * a centered loader is shown instead of the protected content.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { ready, isAuthenticated } = useAuth();

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace("/");
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated) {
    return (
      <Center h="100vh">
        <Loader color="ong-green" />
      </Center>
    );
  }

  return <>{children}</>;
}
