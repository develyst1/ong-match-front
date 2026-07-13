"use client";

import { IconCategory } from "@tabler/icons-react";
import { Container, Stack, Text, Title } from "@mantine/core";
import TribesGrid from "./TribesGrid";

export default function TribesContent() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Stack gap={4}>
          <Title order={2}>
            <IconCategory size={28} stroke={1.8} style={{ verticalAlign: "-4px", marginRight: 6 }} />
            ไทป์ทั้งหมด
          </Title>
          <Text size="sm" c="dimmed">
            เลือกไทป์ที่ใช่ตัวคุณ แล้วเจอคนไทป์เดียวกัน
          </Text>
        </Stack>
        <TribesGrid />
      </Stack>
    </Container>
  );
}
