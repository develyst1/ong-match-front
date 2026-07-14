"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppShell as MantineAppShell,
  Avatar,
  Box,
  Group,
  NavLink,
  Stack,
  Text,
  Title,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconCompass,
  IconMessages,
  IconUser,
  IconCategory,
  IconLogout,
  IconSparkles,
  IconPlus,
} from "@tabler/icons-react";
import { APP_TEXT } from "@/constant/text/common";

interface NavItem {
  label: string;
  short: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: APP_TEXT.nav.discover, short: "หาไทป์", href: "/discover", icon: <IconCompass size={22} /> },
  { label: APP_TEXT.nav.tribes, short: "ไทป์รูม", href: "/tribes", icon: <IconCategory size={22} /> },
  { label: APP_TEXT.nav.chat, short: "แชต", href: "/chat", icon: <IconMessages size={22} /> },
  { label: APP_TEXT.nav.profile, short: "ฉัน", href: "/profile", icon: <IconUser size={22} /> },
];

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const activeHref = `/${pathname.split("/")[1] ?? ""}`;

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 248, breakpoint: "sm", collapsed: { mobile: true } }}
      padding={0}
      bg={colorScheme === "dark" ? "dark.8" : "gray.0"}
    >
      {/* Top bar */}
      <MantineAppShell.Header withBorder={false} style={{ backdropFilter: "blur(8px)", background: "var(--mantine-color-body)" }}>
        <Group h="100%" px="md" justify="space-between">
          <Link href="/discover" style={{ textDecoration: "none", color: "inherit" }}>
            <Group gap="sm">
              <Avatar size={34} radius="xl" color="ong-green" variant="filled">
                <IconSparkles size={19} stroke={1.8} />
              </Avatar>
              <Title order={4} c="ong-green.8">
                {APP_TEXT.brand}
              </Title>
            </Group>
          </Link>
          <UnstyledButton
            onClick={() => router.push("/onboarding")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--mantine-color-ong-green-6)",
              color: "white",
              padding: "6px 14px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <IconPlus size={16} stroke={2.5} />
            สร้างไทป์
          </UnstyledButton>
        </Group>
      </MantineAppShell.Header>

      {/* Desktop sidebar */}
      <MantineAppShell.Navbar p="md" withBorder={false}>
        <Stack gap="xs" justify="space-between" h="100%">
          <Stack gap={4}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                component={Link}
                href={item.href}
                label={item.label}
                active={activeHref === item.href}
                leftSection={item.icon}
                variant="filled"
                styles={{ root: { borderRadius: "var(--mantine-radius-lg)" }, label: { fontWeight: 600 } }}
              />
            ))}
          </Stack>
          <NavLink
            component={Link}
            href="/"
            label={APP_TEXT.button.logout}
            color="red"
            leftSection={<IconLogout size={22} />}
            styles={{ root: { borderRadius: "var(--mantine-radius-lg)" } }}
          />
        </Stack>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main pb={{ base: 84, sm: "md" }}>
        <Box mih="100%" px="md" pt="md">
          {children}
        </Box>
      </MantineAppShell.Main>

      {/* Mobile bottom tab bar — the chat-app feel */}
      <Box
        hiddenFrom="sm"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 68,
          background: "var(--mantine-color-body)",
          borderTop: "1px solid var(--mantine-color-gray-2)",
          zIndex: 200,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <Group h={68} justify="space-around" align="center" px="xs">
          {NAV_ITEMS.map((item) => {
            const active = activeHref === item.href;
            return (
              <UnstyledButton
                key={item.href}
                component={Link}
                href={item.href}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: 1 }}
              >
                <Box c={active ? "ong-green.6" : "gray.5"}>{item.icon}</Box>
                <Text size="11px" fw={active ? 700 : 500} c={active ? "ong-green.7" : "dimmed"}>
                  {item.short}
                </Text>
              </UnstyledButton>
            );
          })}
        </Group>
      </Box>
    </MantineAppShell>
  );
}
