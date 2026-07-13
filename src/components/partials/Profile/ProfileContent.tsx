"use client";

import {
  Avatar,
  Container,
  Group,
  LoadingOverlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BaseCard } from "@/components/ui/Card";
import { OngBadge } from "@/components/common";
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
        <Title order={2}>👤 {APP_TEXT.nav.profile}</Title>

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
          <Text fw={700}>🏅 องค์ของคุณ</Text>
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
                  <Text style={{ fontSize: 24 }}>{tribe.emoji}</Text>
                  <Stack gap={2}>
                    <Text size="sm" fw={600}>
                      {tribe.name}
                    </Text>
                    {tribe.id === me?.primaryTribeId && (
                      <Text size="xs" c="ong-green.7" fw={600}>
                        องค์หลัก
                      </Text>
                    )}
                  </Stack>
                </Group>
              </BaseCard>
            ))}
          </SimpleGrid>
        </Stack>

        <Stack gap="sm">
          <Text fw={700}>✨ ความสนใจย่อย</Text>
          <Group gap="xs">
            {myInterests.length > 0 ? (
              myInterests.map((interest) => (
                <Text key={interest.id} size="sm" c="dimmed">
                  {interest.emoji} {interest.name}
                </Text>
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
