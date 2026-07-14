"use client";

import { Badge, type BadgeProps } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";

/** Color band by depth: grey (unproven) → green → teal → grape → gold. */
function levelColor(level: number): string {
  if (level <= 0) return "gray";
  if (level < 25) return "ong-green";
  if (level < 50) return "teal";
  if (level < 80) return "grape";
  return "yellow";
}

interface LevelBadgeProps extends Omit<BadgeProps, "color" | "children"> {
  level: number;
}

export default function LevelBadge({ level, ...props }: LevelBadgeProps) {
  return (
    <Badge
      color={levelColor(level)}
      variant={level >= 80 ? "filled" : "light"}
      radius="sm"
      leftSection={<IconBolt size={12} stroke={2.5} />}
      {...props}
    >
      lvl {level}
    </Badge>
  );
}
