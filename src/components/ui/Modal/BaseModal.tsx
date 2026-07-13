"use client";

import { Modal, type ModalProps } from "@mantine/core";

interface BaseModalProps extends Omit<ModalProps, "opened" | "onClose"> {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export default function BaseModal({
  open,
  onClose,
  title,
  children,
  centered = true,
  radius = "xl",
  ...props
}: BaseModalProps) {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title}
      centered={centered}
      radius={radius}
      {...props}
    >
      {children}
    </Modal>
  );
}
