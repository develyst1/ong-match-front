"use client";

import { Select, type SelectProps } from "@mantine/core";

interface BaseSelectProps extends SelectProps {
  label?: React.ReactNode;
}

export default function BaseSelect({
  label,
  radius = "xl",
  size = "md",
  ...props
}: BaseSelectProps) {
  return <Select label={label} radius={radius} size={size} {...props} />;
}
