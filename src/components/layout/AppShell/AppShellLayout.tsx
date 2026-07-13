"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  AppShell as MantineAppShell,
  Avatar,
  Box,
  Burger,
  Group,
  NavLink,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCompass,
  IconMessages,
  IconUser,
  IconCategory,
  IconLogout,
} from "@tabler/icons-react";
import { APP_TEXT } from "@/constant/text/common";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: APP_TEXT.nav.discover, href: "/discover", icon: <IconCompass size={20} /> },
  { label: APP_TEXT.nav.tribes, href: "/tribes", icon: <IconCategory size={20} /> },
  { label: APP_TEXT.nav.chat, href: "/chat", icon: <IconMessages size={20} /> },
  { label: APP_TEXT.nav.profile, href: "/profile", icon: <IconUser size={20} /> },
];

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const { colorScheme } = useMantineColorScheme();

  const activeHref = `/${pathname.split("/")[1] ?? ""}`;

  return (
    <MantineAppShell
      header={{ height: 64 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      bg={colorScheme === "dark" ? "dark.8" : "gray.0"}
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Avatar size={36} radius="xl" color="ong-green" variant="filled">
              🌵
            </Avatar>
            <Title order={4}>{APP_TEXT.brand}</Title>
          </Group>
          <Text size="xs" c="dimmed" hiddenFrom="sm">
            {APP_TEXT.tagline}
          </Text>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <Stack gap="xs" justify="space-between" h="100%">
          <Stack gap="xs">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive}
                  leftSection={item.icon}
                  onClick={toggle}
                  styles={{ root: { borderRadius: "var(--mantine-radius-xl)" } }}
                />
              );
            })}
          </Stack>
          <NavLink
            href="/"
            label={APP_TEXT.button.logout}
            color="red"
            leftSection={<IconLogout size={20} />}
            styles={{ root: { borderRadius: "var(--mantine-radius-xl)" } }}
          />
        </Stack>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        <Box mih="100%">{children}</Box>
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}
