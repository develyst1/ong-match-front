"use client";

import { Container, Stack, Text, Title } from "@mantine/core";
import TribesGrid from "./TribesGrid";

export default function TribesContent() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Stack gap={4}>
          <Title order={2}>🗂️ องค์ทั้งหมด</Title>
          <Text size="sm" c="dimmed">
            เลือกองค์ที่ใช่ตัวคุณ แล้วเจอคนองค์เดียวกัน
          </Text>
        </Stack>
        <TribesGrid />
      </Stack>
    </Container>
  );
}
