"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Container,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconMedal, IconPlus, IconUser } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { BaseButton } from "@/components/ui/Button";
import { EmptyState, TypeCard } from "@/components/common";
import { StepQuiz } from "@/components/partials/CreateType";
import { useMe } from "@/hooks/user";
import { useMyTypes, useTypeCreation } from "@/hooks/type";
import { initials } from "@/lib/utils";
import { APP_TEXT } from "@/constant/text/common";
import type { QuizDTO } from "@/types/api/main/quiz";

export default function ProfileContent() {
  const router = useRouter();
  const { me } = useMe();
  const { types } = useMyTypes();
  const { submit, startRelevel } = useTypeCreation();

  const [relevelQuiz, setRelevelQuiz] = useState<QuizDTO | null>(null);
  const [relevelError, setRelevelError] = useState<string | null>(null);

  const handleRelevel = (id: string) => {
    setRelevelError(null);
    startRelevel.mutate(id, {
      onSuccess: (quiz) => setRelevelQuiz(quiz),
      onError: (err: unknown) => {
        const msg =
          (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
          "อัปเลเวลไม่สำเร็จ ลองใหม่ภายหลัง";
        setRelevelError(msg);
      },
    });
  };

  const handleRelevelSubmit = (answers: string[], elapsedSec: number) => {
    if (!relevelQuiz) return;
    submit.mutate(
      { id: relevelQuiz.id, answers, elapsedSec },
      { onSuccess: () => setRelevelQuiz(null) },
    );
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Group gap="sm">
          <IconUser size={26} stroke={1.8} />
          <Title order={2}>{APP_TEXT.nav.profile}</Title>
        </Group>

        {me && (
          <BaseCard withBorder padding="xl" shadow="sm">
            <Stack gap="lg" align="center" ta="center">
              <Avatar size={96} radius="xl" color="ong-green" src={me.avatarUrl || null}>
                {initials(me.displayName)}
              </Avatar>
              <Stack gap={4} align="center">
                <Title order={3}>{me.displayName}</Title>
                <Text size="sm" c="dimmed">
                  {me.age} ปี · {me.location}
                </Text>
              </Stack>
              {me.bio && (
                <Text size="sm" maw={480}>
                  {me.bio}
                </Text>
              )}
            </Stack>
          </BaseCard>
        )}

        <Stack gap="sm">
          <Group justify="space-between">
            <Group gap="xs">
              <IconMedal size={20} stroke={1.8} />
              <Text fw={700}>ไทป์ของคุณ</Text>
            </Group>
            <BaseButton
              size="xs"
              variant="light"
              radius="xl"
              leftSection={<IconPlus size={14} />}
              onClick={() => router.push("/onboarding")}
            >
              สร้างไทป์ใหม่
            </BaseButton>
          </Group>

          {relevelError && (
            <Text size="sm" c="red">
              {relevelError}
            </Text>
          )}

          {types.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {types.map((type) => (
                <TypeCard
                  key={type.id}
                  type={type}
                  onRelevel={handleRelevel}
                  relevelLoading={startRelevel.isPending && startRelevel.variables === type.id}
                />
              ))}
            </SimpleGrid>
          ) : (
            <EmptyState
              title="ยังไม่มีไทป์"
              description="สร้างไทป์แรกของคุณ ผ่านแบบทดสอบเพื่อพิสูจน์ว่าคุณอินจริง"
            >
              <BaseButton mt="sm" onClick={() => router.push("/onboarding")}>
                เริ่มสร้างไทป์
              </BaseButton>
            </EmptyState>
          )}
        </Stack>
      </Stack>

      <Modal
        opened={!!relevelQuiz}
        onClose={() => setRelevelQuiz(null)}
        size="lg"
        radius="lg"
        title="อัปเลเวลไทป์"
        centered
      >
        {relevelQuiz && (
          <StepQuiz quiz={relevelQuiz} loading={submit.isPending} onSubmit={handleRelevelSubmit} />
        )}
      </Modal>
    </Container>
  );
}
