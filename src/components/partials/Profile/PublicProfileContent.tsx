"use client";

import { useState } from "react";
import {
  Avatar,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { BaseCard } from "@/components/ui/Card";
import { BaseButton } from "@/components/ui/Button";
import { CompactTypeRow } from "@/components/common";
import { usePublicProfile, useFollow } from "@/hooks/social";
import { initials } from "@/lib/utils";

export default function PublicProfileContent({ userId }: { userId: string }) {
  const router = useRouter();
  const { profile, isLoading } = usePublicProfile(userId);
  const follow = useFollow();
  const [following, setFollowing] = useState(false);

  if (isLoading) {
    return (
      <Group justify="center" py={80}>
        <Loader color="ong-green" />
      </Group>
    );
  }
  if (!profile) {
    return (
      <Container size="sm" py="xl">
        <Text ta="center" c="dimmed">ไม่พบผู้ใช้นี้</Text>
      </Container>
    );
  }

  const name = profile.display_name ?? "ไม่ระบุชื่อ";
  const toggleFollow = () => {
    const next = !following;
    setFollowing(next);
    follow.mutate({ userId, next });
  };

  return (
    <Container size="sm" py="lg">
      <Stack gap="lg">
        <BaseButton variant="subtle" w="fit-content" leftSection={<IconArrowLeft size={16} />} onClick={() => router.back()}>
          ย้อนกลับ
        </BaseButton>

        <BaseCard withBorder padding="xl" shadow="sm">
          <Stack gap="md" align="center" ta="center">
            <Avatar size={88} radius="xl" color="ong-green" src={profile.avatar_url || null}>
              {initials(name)}
            </Avatar>
            <Stack gap={2} align="center">
              <Title order={3}>{name}</Title>
              {profile.location && <Text size="sm" c="dimmed">{profile.location}</Text>}
            </Stack>
            {profile.bio && <Text size="sm" maw={420}>{profile.bio}</Text>}
            <BaseButton radius="xl" variant={following ? "light" : "filled"} onClick={toggleFollow}>
              {following ? "กำลังติดตาม" : "ติดตาม"}
            </BaseButton>
          </Stack>
        </BaseCard>

        <Stack gap="sm">
          <Text fw={700}>ไทป์ ({profile.types.length})</Text>
          {profile.types.length > 0 ? (
            <Stack gap="xs">
              {profile.types.map((t) => (
                <CompactTypeRow key={t.id} title={t.title} level={t.level} daysLeft={t.daysLeft} status={t.status} />
              ))}
            </Stack>
          ) : (
            <Text size="sm" c="dimmed">ยังไม่มีไทป์</Text>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
