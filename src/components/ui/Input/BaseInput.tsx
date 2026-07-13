"use client";

import { TextInput, type TextInputProps } from "@mantine/core";

interface BaseInputProps extends TextInputProps {
  label?: React.ReactNode;
}

export default function BaseInput({
  label,
  radius = "xl",
  size = "md",
  ...props
}: BaseInputProps) {
  return <TextInput label={label} radius={radius} size={size} {...props} />;
}
