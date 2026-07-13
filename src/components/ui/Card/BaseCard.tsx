"use client";

import { Card, type CardProps } from "@mantine/core";

/**
 * Wrapper around Mantine's Card. `CardProps` carries the Mantine-specific
 * style props (radius, padding, w, maw, style, …). DOM event handlers are
 * added explicitly because Mantine's plain `CardProps` (via BoxProps) does
 * not include them — they only surface through the polymorphic component type.
 */
export interface BaseCardProps extends CardProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export default function BaseCard({
  children,
  radius = "xl",
  padding = "lg",
  withBorder = false,
  shadow = "sm",
  ...props
}: BaseCardProps) {
  return (
    <Card
      radius={radius}
      padding={padding}
      withBorder={withBorder}
      shadow={shadow}
      {...props}
    >
      {children}
    </Card>
  );
}
