"use client";

import { Button, type ButtonProps } from "@mantine/core";

interface BaseButtonProps extends ButtonProps {
  text?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function BaseButton({
  text,
  children,
  radius = "xl",
  size = "md",
  ...props
}: BaseButtonProps) {
  return (
    <Button radius={radius} size={size} {...props}>
      {text ?? children}
    </Button>
  );
}
