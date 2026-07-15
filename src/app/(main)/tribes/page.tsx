import { Suspense } from "react";
import { TribesContent } from "@/components/partials/Tribes";

export default function TribesPage() {
  return (
    <Suspense>
      <TribesContent />
    </Suspense>
  );
}
