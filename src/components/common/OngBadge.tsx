"use client";

import { Badge, type BadgeProps } from "@mantine/core";
import type { Tribe } from "@/types/app/tribe";

interface OngBadgeProps extends Omit<BadgeProps, "color"> {
  tribe: Pick<Tribe, "emoji" | "name" | "color">;
}

/** Pill that shows a Tribe emoji + name with the tribe's color. */
export default function OngBadge({ tribe, size = "md", variant = "light", ...props }: OngBadgeProps) {
  return (
    <Badge color={tribe.color} size={size} variant={variant} radius="xl" {...props}>
      <span style={{ marginRight: 4 }}>{tribe.emoji}</span>
      {tribe.name}
    </Badge>
  );
}
