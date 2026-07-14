"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Badge,
  Box,
  Center,
  Container,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconLock, IconSparkles } from "@tabler/icons-react";
import { BaseButton } from "@/components/ui/Button";
import { BaseCard } from "@/components/ui/Card";
import { LevelBadge, TribeIcon } from "@/components/common";
import { useAuth } from "@/hooks/auth";
import { useTribes } from "@/hooks/tribe";
import { useFeed } from "@/hooks/social";
import { initials, timeFromNow } from "@/lib/utils";
import { APP_TEXT } from "@/constant/text/common";
import type { FeedItem } from "@/types/api/main/social";

/**
 * Public landing + read-only news feed. Guests can browse the latest posts but
 * every interaction (profiles, chat, follow, posting) is gated behind login.
 * Signed-in users are sent straight to their real home (`/discover`).
 */
export default function LandingPage() {
  const router = useRouter();
  const { ready, isAuthenticated } = useAuth();
  const { tribes } = useTribes();
  const { feed, isLoading } = useFeed();

  useEffect(() => {
    if (ready && isAuthenticated) router.replace("/discover");
  }, [ready, isAuthenticated, router]);

  if (!ready || isAuthenticated) {
    return (
      <Center h="100vh">
        <Loader color="ong-green" />
      </Center>
    );
  }

  return (
    <Box mih="100vh" bg="var(--mantine-color-body)">
      {/* Top bar */}
      <Box
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(8px)",
          background: "color-mix(in srgb, var(--mantine-color-body) 82%, transparent)",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
        }}
      >
        <Container size="md">
          <Group h={60} justify="space-between">
            <Group gap="sm">
              <Avatar size={34} radius="xl" color="ong-green" variant="filled">
                <IconSparkles size={19} stroke={1.8} />
              </Avatar>
              <Title order={4} c="ong-green.8">
                {APP_TEXT.brand}
              </Title>
            </Group>
            <Group gap="xs">
              <BaseButton variant="subtle" size="sm" onClick={() => router.push("/login")}>
                {APP_TEXT.button.login}
              </BaseButton>
              <BaseButton size="sm" onClick={() => router.push("/register")}>
                {APP_TEXT.button.register}
              </BaseButton>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Hero */}
      <Box className="ong-landing-bg">
        <Container size="md" py={56}>
          <Stack gap="md" align="center" ta="center" maw={640} mx="auto">
            <Badge
              color="ong-green"
              variant="light"
              radius="xl"
              size="lg"
              leftSection={<IconSparkles size={14} stroke={2} />}
            >
              {APP_TEXT.brand}
            </Badge>
            <Title order={1} style={{ fontSize: "clamp(2rem, 6vw, 3.25rem)", lineHeight: 1.15 }}>
              {APP_TEXT.tagline}
            </Title>
            <Text size="lg" c="dimmed">
              {APP_TEXT.taglineSub}
            </Text>
            <Group mt="xs">
              <BaseButton size="lg" onClick={() => router.push("/register")}>
                {APP_TEXT.landing.getStarted}
              </BaseButton>
              <BaseButton size="lg" variant="light" onClick={() => router.push("/login")}>
                {APP_TEXT.button.login}
              </BaseButton>
            </Group>
            <Text size="xs" c="dimmed">
              อ่านฟีดล่าสุดได้เลย ไม่ต้องเข้าสู่ระบบ
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="md" py="xl">
        <Stack gap={40}>
          {/* Tribe strip */}
          {tribes.length > 0 && (
            <Stack gap="sm">
              <Title order={3}>เลือกไทป์ของคุณ</Title>
              <SimpleGrid cols={{ base: 2, xs: 3, md: 6 }} spacing="md">
                {tribes.slice(0, 6).map((tribe) => (
                  <BaseCard
                    key={tribe.id}
                    withBorder
                    padding="lg"
                    shadow="sm"
                    onClick={() => router.push("/register")}
                    style={{ cursor: "pointer" }}
                  >
                    <Stack align="center" gap="xs" ta="center">
                      <ThemeIcon size={56} radius="xl" variant="light" color={tribe.color}>
                        <TribeIcon slug={tribe.slug} size={28} />
                      </ThemeIcon>
                      <Text fw={600} size="sm">
                        {tribe.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {tribe.memberCount.toLocaleString()} คน
                      </Text>
                    </Stack>
                  </BaseCard>
                ))}
              </SimpleGrid>
            </Stack>
          )}

          {/* Public read-only feed */}
          <Stack gap="md">
            <Group justify="space-between" align="flex-end">
              <Title order={3}>ฟีดล่าสุด</Title>
              <Badge variant="light" color="gray" radius="sm" leftSection={<IconLock size={12} />}>
                อ่านอย่างเดียว
              </Badge>
            </Group>

            {isLoading ? (
              <Group justify="center" py="xl">
                <Loader color="ong-green" />
              </Group>
            ) : feed.length > 0 ? (
              <Stack gap="md">
                {feed.slice(0, 20).map((item) => (
                  <GuestFeedPost key={item.id} item={item} onGated={() => router.push("/login")} />
                ))}
              </Stack>
            ) : (
              <BaseCard withBorder padding="xl">
                <Text ta="center" c="dimmed">
                  ยังไม่มีโพสต์ในฟีด
                </Text>
              </BaseCard>
            )}
          </Stack>

          {/* Locked CTA */}
          <BaseCard withBorder shadow="sm" padding="xl" className="ong-landing-bg">
            <Stack gap="sm" align="center" ta="center">
              <ThemeIcon size={48} radius="xl" variant="light" color="ong-green">
                <IconLock size={24} />
              </ThemeIcon>
              <Title order={3}>อยากดูโปรไฟล์ แชต และเจอคนไทป์เดียวกัน?</Title>
              <Text c="dimmed" maw={420}>
                สมัครสมาชิกเพื่อปลดล็อกการติดตาม แชต และค้นหาคนไทป์เดียวกับคุณ
              </Text>
              <Group mt="xs">
                <BaseButton size="md" onClick={() => router.push("/register")}>
                  {APP_TEXT.button.register}
                </BaseButton>
                <BaseButton size="md" variant="light" onClick={() => router.push("/login")}>
                  {APP_TEXT.button.login}
                </BaseButton>
              </Group>
            </Stack>
          </BaseCard>
        </Stack>
      </Container>
    </Box>
  );
}

/** Read-only feed card for guests: no follow / no profile link — clicks prompt login. */
function GuestFeedPost({ item, onGated }: { item: FeedItem; onGated: () => void }) {
  const name = item.display_name ?? "ไม่ระบุชื่อ";
  return (
    <BaseCard withBorder shadow="sm" padding="md" onClick={onGated} style={{ cursor: "pointer" }}>
      <Stack gap="sm">
        <Group gap="sm" wrap="nowrap">
          <Avatar radius="xl" color="ong-green" src={item.avatar_url || null}>
            {initials(name)}
          </Avatar>
          <Stack gap={0}>
            <Text fw={700} size="sm">
              {name}
            </Text>
            <Text size="xs" c="dimmed">
              {timeFromNow(item.created_at)}
            </Text>
          </Stack>
        </Group>

        <Text size="sm">{item.content}</Text>

        {item.type_title && (
          <Group gap="xs">
            <Badge variant="light" color="teal" radius="sm">
              {item.type_title}
            </Badge>
            {typeof item.type_level === "number" && <LevelBadge level={item.type_level} size="sm" />}
          </Group>
        )}
      </Stack>
    </BaseCard>
  );
}
