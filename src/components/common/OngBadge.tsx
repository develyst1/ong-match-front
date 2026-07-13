"use client";

import { Badge, type BadgeProps } from "@mantine/core";
import type { Tribe } from "@/types/app/tribe";
import { TribeIcon } from "./TribeIcon";

interface OngBadgeProps extends Omit<BadgeProps, "color"> {
  tribe: Pick<Tribe, "slug" | "name" | "color">;
}

/** Pill that shows a Tribe icon + name with the tribe's color. */
export default function OngBadge({ tribe, size = "md", variant = "light", ...props }: OngBadgeProps) {
  return (
    <Badge
      color={tribe.color}
      size={size}
      variant={variant}
      radius="xl"
      leftSection={<TribeIcon slug={tribe.slug} size={14} />}
      {...props}
    >
      {tribe.name}
    </Badge>
  );
}
