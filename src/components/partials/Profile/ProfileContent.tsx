"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconMedal, IconPencil, IconPlus, IconUser } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { BaseButton } from "@/components/ui/Button";
import { EmptyState, CompactTypeRow } from "@/components/common";
import { StepQuiz } from "@/components/partials/CreateType";
import ProfileEditModal from "./ProfileEditModal";
import { useMe } from "@/hooks/user";
import { useMyTypes, useSetTypeRequirement, useTypeCreation } from "@/hooks/type";
import { initials } from "@/lib/utils";
import { APP_TEXT } from "@/constant/text/common";
import type { QuizDTO } from "@/types/api/main/quiz";

export default function ProfileContent() {
  const router = useRouter();
  const { me } = useMe();
  const { types } = useMyTypes();
  const { submit, startRelevel } = useTypeCreation();
  const setRequirement = useSetTypeRequirement();

  const [relevelQuiz, setRelevelQuiz] = useState<QuizDTO | null>(null);
  const [relevelError, setRelevelError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

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
          <BaseCard withBorder padding={0} shadow="sm" style={{ overflow: "hidden" }}>
            <Box
              style={{
                height: 140,
                background: me.coverUrl
                  ? `center / cover no-repeat url(${me.coverUrl})`
                  : "linear-gradient(120deg, var(--mantine-color-ong-green-3), var(--mantine-color-teal-2))",
              }}
            />
            <Stack gap="md" align="center" ta="center" px="xl" pb="xl" mt={-52}>
              <Avatar
                size={104}
                radius="xl"
                color="ong-green"
                src={me.avatarUrl || null}
                style={{ border: "4px solid var(--mantine-color-body)" }}
              >
                {initials(me.displayName)}
              </Avatar>
              <Stack gap={4} align="center">
                <Title order={3}>{me.displayName}</Title>
                <Text size="sm" c="dimmed">
                  {[me.age ? `${me.age} ปี` : null, me.location].filter(Boolean).join(" · ")}
                </Text>
              </Stack>
              {me.bio && (
                <Text size="sm" maw={480}>
                  {me.bio}
                </Text>
              )}
              <BaseButton
                variant="light"
                radius="xl"
                leftSection={<IconPencil size={16} />}
                onClick={() => setEditOpen(true)}
              >
                แก้ไขโปรไฟล์
              </BaseButton>
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
              เพิ่มไทป์
            </BaseButton>
          </Group>

          {relevelError && (
            <Text size="sm" c="red">
              {relevelError}
            </Text>
          )}

          {types.length > 0 ? (
            <Stack gap="xs">
              {types.map((type) => (
                <CompactTypeRow
                  key={type.id}
                  title={type.title}
                  level={type.level}
                  daysLeft={type.daysLeft}
                  status={type.status}
                  onRelevel={() => handleRelevel(type.id)}
                  relevelLoading={startRelevel.isPending && startRelevel.variables === type.id}
                  minContactLevel={type.minContactLevel}
                  onRequirementChange={(minLevel) => setRequirement.mutate({ id: type.id, minLevel })}
                  requirementLoading={setRequirement.isPending && setRequirement.variables?.id === type.id}
                />
              ))}
            </Stack>
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

      {me && (
        <ProfileEditModal me={me} opened={editOpen} onClose={() => setEditOpen(false)} />
      )}

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
