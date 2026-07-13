"use client";

import { useRouter } from "next/navigation";
import {
  Badge,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { BaseButton } from "@/components/ui/Button";
import { BaseCard } from "@/components/ui/Card";
import { TribeIcon } from "@/components/common";
import { useTribes } from "@/hooks/tribe";
import { APP_TEXT } from "@/constant/text/common";

export default function LandingPage() {
  const router = useRouter();
  const { tribes } = useTribes();

  return (
    <div className="ong-landing-bg" style={{ minHeight: "100vh" }}>
      <Container size="lg" py={64}>
        <Stack gap={48} align="center" ta="center">
          {/* Hero */}
          <Stack gap="md" align="center" maw={680}>
            <Badge
              color="ong-green"
              variant="light"
              radius="xl"
              size="lg"
              leftSection={<IconSparkles size={14} stroke={2} />}
            >
              {APP_TEXT.brand}
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
            <Title order={3}>เลือกไทป์ของคุณ</Title>
            <SimpleGrid cols={{ base: 2, xs: 3, md: 6 }} spacing="md">
              {tribes.slice(0, 6).map((tribe) => (
                <BaseCard
                  key={tribe.id}
                  withBorder
                  padding="lg"
                  shadow="sm"
                  onClick={() => router.push("/onboarding")}
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
        </Stack>
      </Container>
    </div>
  );
}
