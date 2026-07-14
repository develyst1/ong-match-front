"use client";

import { use } from "react";
import { PublicProfileContent } from "@/components/partials/Profile";

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <PublicProfileContent userId={id} />;
}
