import { AppShellLayout } from "@/components/layout/AppShell";
import { AuthGuard } from "@/components/layout/AuthGuard";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShellLayout>{children}</AppShellLayout>
    </AuthGuard>
  );
}
