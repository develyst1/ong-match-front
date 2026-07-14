"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppShell as MantineAppShell,
  Avatar,
  Box,
  Group,
  Menu,
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
} from "@tabler/icons-react";
import { APP_TEXT } from "@/constant/text/common";
import { useAuth } from "@/hooks/auth";

interface NavItem {
  label: string;
  short: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "หาไทป์", short: "หาไทป์", href: "/discover", icon: <IconCompass size={20} /> },
  { label: "ไทป์รูม", short: "ไทป์รูม", href: "/tribes", icon: <IconCategory size={20} /> },
  { label: "แชต", short: "แชต", href: "/chat", icon: <IconMessages size={20} /> },
  { label: "โปรไฟล์", short: "ฉัน", href: "/profile", icon: <IconUser size={20} /> },
];

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const { logout } = useAuth();
  const activeHref = `/${pathname.split("/")[1] ?? ""}`;

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <MantineAppShell
      header={{ height: 60 }}
      padding={0}
      bg={colorScheme === "dark" ? "dark.8" : "gray.0"}
    >
      {/* Top bar — brand + horizontal menu + user menu */}
      <MantineAppShell.Header
        withBorder={false}
        style={{ backdropFilter: "blur(8px)", background: "var(--mantine-color-body)", borderBottom: "1px solid var(--mantine-color-gray-2)" }}
      >
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group gap="lg" wrap="nowrap">
            <Link href="/discover" style={{ textDecoration: "none", color: "inherit" }}>
              <Group gap="sm" wrap="nowrap">
                <Avatar size={34} radius="xl" color="ong-green" variant="filled">
                  <IconSparkles size={19} stroke={1.8} />
                </Avatar>
                <Title order={4} c="ong-green.8" visibleFrom="xs">
                  {APP_TEXT.brand}
                </Title>
              </Group>
            </Link>

            {/* Horizontal nav (desktop) */}
            <Group gap={4} wrap="nowrap" visibleFrom="sm">
              {NAV_ITEMS.map((item) => {
                const active = activeHref === item.href;
                return (
                  <UnstyledButton
                    key={item.href}
                    component={Link}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 14px",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: 14,
                      color: active ? "var(--mantine-color-ong-green-7)" : "var(--mantine-color-dimmed)",
                      background: active ? "var(--mantine-color-ong-green-0)" : "transparent",
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </UnstyledButton>
                );
              })}
            </Group>
          </Group>

          {/* User menu */}
          <Menu position="bottom-end" radius="md" shadow="md" width={180}>
            <Menu.Target>
              <UnstyledButton>
                <Avatar size={34} radius="xl" color="ong-green" variant="light">
                  <IconUser size={19} />
                </Avatar>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconUser size={16} />}
                onClick={() => router.push("/profile")}
              >
                {APP_TEXT.nav.profile}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={16} />}
                onClick={handleLogout}
              >
                {APP_TEXT.button.logout}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Main pb={{ base: 84, sm: "md" }}>
        <Box mih="100%" px="md" pt="md">
          {children}
        </Box>
      </MantineAppShell.Main>

      {/* Mobile bottom tab bar */}
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
