"use client";

import {
  IconCactus,
  IconDog,
  IconMovie,
  IconMountain,
  IconPaw,
  IconSparkles,
} from "@tabler/icons-react";
import type { TablerIcon } from "@/lib/icon-registry";

/** Map a tribe slug to its Tabler icon. */
export const TRIBE_ICONS: Record<string, TablerIcon> = {
  cartoon: IconMovie,
  mountain: IconMountain,
  cactus: IconCactus,
  dog: IconDog,
  exotic: IconPaw,
  mixed: IconSparkles,
};

const FALLBACK_ICON = IconSparkles;

interface TribeIconProps {
  slug?: string;
  size?: number | string;
  stroke?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders the Tabler icon for a tribe (looked up by slug).
 * Drop-in replacement for the old emoji rendering — no emoji anywhere.
 */
export function TribeIcon({ slug, size = 24, stroke = 1.8, ...props }: TribeIconProps) {
  const Icon = (slug && TRIBE_ICONS[slug]) || FALLBACK_ICON;
  return <Icon size={size} stroke={stroke} {...props} />;
}
