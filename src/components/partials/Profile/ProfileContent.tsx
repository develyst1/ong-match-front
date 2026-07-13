"use client";

import {
  Avatar,
  Badge,
  Container,
  Group,
  LoadingOverlay,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconMedal, IconSparkles, IconUser } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { OngBadge, TribeIcon } from "@/components/common";
import { useInterests } from "@/hooks/interest";
import { useMe } from "@/hooks/user";
import { useTribes } from "@/hooks/tribe";
import { initials } from "@/lib/utils";
import { APP_TEXT } from "@/constant/text/common";

export default function ProfileContent() {
  const { me, isLoading } = useMe();
  const { tribes } = useTribes();
  const { interests } = useInterests();

  const primaryTribe = tribes.find((t) => t.id === me?.primaryTribeId);
  const myInterests = interests.filter((i) =>
    me?.interestIds.includes(i.id),
  );

  return (
    <Container size="md" py="xl">
      <LoadingOverlay visible={isLoading} />
      <Stack gap="xl">
        <Group gap="sm">
          <IconUser size={26} stroke={1.8} />
          <Title order={2}>{APP_TEXT.nav.profile}</Title>
        </Group>

        {me && (
          <BaseCard withBorder padding="xl" shadow="sm">
            <Stack gap="lg" align="center" ta="center">
              <Avatar
                size={96}
                radius="xl"
                color={primaryTribe?.color ?? "ong-green"}
                src={me.avatarUrl || null}
              >
                {initials(me.displayName)}
              </Avatar>
              <Stack gap={4} align="center">
                <Title order={3}>{me.displayName}</Title>
                <Text size="sm" c="dimmed">
                  {me.age} ปี · {me.location}
                </Text>
              </Stack>
              {primaryTribe && <OngBadge tribe={primaryTribe} size="lg" />}
              {me.bio && (
                <Text size="sm" maw={480}>
                  {me.bio}
                </Text>
              )}
            </Stack>
          </BaseCard>
        )}

        <Stack gap="sm">
          <Group gap="xs">
            <IconMedal size={20} stroke={1.8} />
            <Text fw={700}>ไทป์ของคุณ</Text>
          </Group>
          <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
            {tribes.map((tribe) => (
              <BaseCard
                key={tribe.id}
                withBorder
                shadow="none"
                padding="sm"
                style={{
                  opacity: tribe.id === me?.primaryTribeId ? 1 : 0.5,
                  borderColor:
                    tribe.id === me?.primaryTribeId
                      ? `var(--mantine-color-${tribe.color}-5)`
                      : undefined,
                }}
              >
                <Group gap="xs">
                  <ThemeIcon
                    size={36}
                    radius="xl"
                    variant="light"
                    color={tribe.color}
                  >
                    <TribeIcon slug={tribe.slug} size={22} />
                  </ThemeIcon>
                  <Stack gap={2}>
                    <Text size="sm" fw={600}>
                      {tribe.name}
                    </Text>
                    {tribe.id === me?.primaryTribeId && (
                      <Text size="xs" c="ong-green.7" fw={600}>
                        ไทป์หลัก
                      </Text>
                    )}
                  </Stack>
                </Group>
              </BaseCard>
            ))}
          </SimpleGrid>
        </Stack>

        <Stack gap="sm">
          <Group gap="xs">
            <IconSparkles size={20} stroke={1.8} />
            <Text fw={700}>ความสนใจย่อย</Text>
          </Group>
          <Group gap="xs">
            {myInterests.length > 0 ? (
              myInterests.map((interest) => (
                <Badge key={interest.id} size="sm" radius="xl" variant="light" color="gray">
                  {interest.name}
                </Badge>
              ))
            ) : (
              <Text size="sm" c="dimmed">
                ยังไม่ได้เลือกความสนใจย่อย
              </Text>
            )}
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
}
