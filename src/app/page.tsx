"use client";

import { useRouter } from "next/navigation";
import {
  Badge,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BaseButton } from "@/components/ui/Button";
import { BaseCard } from "@/components/ui/Card";
import { useTribes } from "@/hooks/tribe";
import { APP_TEXT } from "@/constant/text/common";

const TRIBE_EMOJIS = ["🎌", "🏔️", "🌵", "🐶", "🦎", "✨"];

export default function LandingPage() {
  const router = useRouter();
  const { tribes } = useTribes();

  return (
    <div className="ong-landing-bg" style={{ minHeight: "100vh" }}>
      <Container size="lg" py={64}>
        <Stack gap={48} align="center" ta="center">
          {/* Hero */}
          <Stack gap="md" align="center" maw={680}>
            <Badge color="ong-green" variant="light" radius="xl" size="lg">
              🌵 {APP_TEXT.brand}
            </Badge>
            <Title order={1} style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
              {APP_TEXT.tagline}
            </Title>
            <Text size="lg" c="dimmed">
              {APP_TEXT.taglineSub}
            </Text>
            <Group mt="sm">
              <BaseButton
                size="lg"
                onClick={() => router.push("/onboarding")}
              >
                {APP_TEXT.landing.getStarted}
              </BaseButton>
              <BaseButton
                size="lg"
                variant="light"
                onClick={() => router.push("/login")}
              >
                {APP_TEXT.button.login}
              </BaseButton>
            </Group>
          </Stack>

          {/* Tribe showcase */}
          <Stack gap="md" w="100%">
            <Title order={3}>เลือกองค์ของคุณ</Title>
            <SimpleGrid cols={{ base: 2, xs: 3, md: 6 }} spacing="md">
              {tribes.slice(0, 6).map((tribe, i) => (
                <BaseCard
                  key={tribe.id}
                  withBorder
                  padding="lg"
                  shadow="sm"
                  onClick={() => router.push("/onboarding")}
                  style={{ cursor: "pointer" }}
                >
                  <Stack align="center" gap="xs" ta="center">
                    <Text style={{ fontSize: 36, lineHeight: 1 }}>
                      {TRIBE_EMOJIS[i] ?? tribe.emoji}
                    </Text>
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
        </Stack>
      </Container>
    </div>
  );
}
