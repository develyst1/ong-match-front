"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconLock, IconMessage } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { BaseCard } from "@/components/ui/Card";
import { BaseButton } from "@/components/ui/Button";
import { CompactTypeRow } from "@/components/common";
import { usePublicProfile, useFollow, useCanContact } from "@/hooks/social";
import { useStartConversation } from "@/hooks/chat";
import { initials } from "@/lib/utils";

export default function PublicProfileContent({ userId }: { userId: string }) {
  const router = useRouter();
  const { profile, isLoading } = usePublicProfile(userId);
  const { contact } = useCanContact(userId);
  const follow = useFollow();
  const startChat = useStartConversation();
  const [following, setFollowing] = useState(false);

  const openChat = () =>
    startChat.mutate(userId, {
      onSuccess: (convId) => router.push(`/chat/${convId}`),
    });

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

        <BaseCard withBorder padding={0} shadow="sm" style={{ overflow: "hidden" }}>
          {/* Cover banner (falls back to a soft gradient when no image is set) */}
          <Box
            h={140}
            style={{
              background: profile.cover_url
                ? `center / cover no-repeat url(${profile.cover_url})`
                : "linear-gradient(135deg, var(--mantine-color-ong-green-3), var(--mantine-color-teal-2))",
            }}
          />
          <Stack gap="md" align="center" ta="center" px="xl" pb="xl">
            <Avatar
              size={96}
              radius="xl"
              color="ong-green"
              src={profile.avatar_url || null}
              mt={-48}
              style={{ border: "4px solid var(--mantine-color-body)" }}
            >
              {initials(name)}
            </Avatar>
            <Stack gap={2} align="center">
              <Title order={3}>{name}</Title>
              {profile.location && <Text size="sm" c="dimmed">{profile.location}</Text>}
            </Stack>
            {profile.bio && <Text size="sm" maw={420}>{profile.bio}</Text>}
            <Group gap="sm">
              <BaseButton radius="xl" variant={following ? "light" : "filled"} onClick={toggleFollow}>
                {following ? "กำลังติดตาม" : "ติดตาม"}
              </BaseButton>
              <BaseButton
                radius="xl"
                variant="light"
                loading={startChat.isPending}
                disabled={contact ? !contact.allowed : true}
                leftSection={contact && !contact.allowed ? <IconLock size={16} /> : <IconMessage size={16} />}
                onClick={openChat}
              >
                เริ่มคุย
              </BaseButton>
            </Group>
            {contact && !contact.allowed && (
              <Alert color="gray" variant="light" radius="md" icon={<IconLock size={16} />} maw={420}>
                {contact.reason}
              </Alert>
            )}
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
