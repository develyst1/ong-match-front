"use client";

import { Box, Group, Progress, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import type { ContactCheck } from "@/types/api/main/social";

/** Friendly "chat locked" card — shows the level gate as a progress bar. */
export default function ContactGateCard({ contact, name }: { contact: ContactCheck; name: string }) {
  const hasBand =
    typeof contact.requiredLevel === "number" && typeof contact.yourLevel === "number";
  const pct =
    hasBand && contact.requiredLevel! > 0
      ? Math.min(100, Math.round((contact.yourLevel! / contact.requiredLevel!) * 100))
      : 0;

  return (
    <BaseCard withBorder shadow="none" padding="lg" style={{ background: "var(--mantine-color-gray-0)" }}>
      <Stack gap="sm" align="center" ta="center">
        <ThemeIcon size={48} radius="xl" variant="light" color="gray">
          <IconLock size={24} />
        </ThemeIcon>
        <Text fw={700}>แชตยังไม่ปลดล็อก</Text>

        {hasBand ? (
          <>
            <Text size="sm" c="dimmed" maw={360}>
              ต้องมีเลเวล <b>{contact.requiredLevel}</b> ในไทป์ &ldquo;{contact.typeTitle}&rdquo; ถึงจะทัก {name} ได้
            </Text>
            <Box w="100%" maw={320}>
              <Progress value={pct} color="ong-green" radius="xl" size="lg" />
              <Group justify="space-between" mt={6}>
                <Text size="xs" c="dimmed">คุณ lvl {contact.yourLevel}</Text>
                <Text size="xs" fw={700} c="ong-green.7">ต้อง lvl {contact.requiredLevel}</Text>
              </Group>
            </Box>
            <Text size="xs" c="dimmed">อัปเลเวลไทป์ของคุณอีกนิดเพื่อปลดล็อก 🔓</Text>
          </>
        ) : (
          <Text size="sm" c="dimmed" maw={360}>
            {contact.reason}
          </Text>
        )}
      </Stack>
    </BaseCard>
  );
}
