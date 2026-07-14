"use client";

import { useRouter } from "next/navigation";
import { CreateTypeWizard } from "@/components/partials/CreateType";

export default function OnboardingPage() {
  const router = useRouter();
  return <CreateTypeWizard onDone={() => router.push("/profile")} />;
}
