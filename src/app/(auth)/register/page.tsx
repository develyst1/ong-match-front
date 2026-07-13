"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { BaseButton } from "@/components/ui/Button";
import { BaseInput } from "@/components/ui/Input";
import { BaseCard } from "@/components/ui/Card";
import { APP_TEXT } from "@/constant/text/common";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode — backend wiring TODO. Go straight to onboarding.
    window.localStorage.setItem("ong-match-token", "demo-token");
    router.push("/onboarding");
  };

  return (
    <BaseCard withBorder shadow="md" padding="xl" w="100%" maw={420}>
      <Stack gap="md">
        <Stack gap={4} align="center" ta="center">
          <Badge color="ong-green" variant="light" radius="xl">
            🌵 {APP_TEXT.brand}
          </Badge>
          <Title order={2}>{APP_TEXT.button.register}</Title>
          <Text size="sm" c="dimmed">
            {APP_TEXT.landing.ctaDesc}
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <BaseInput
              label="ชื่อเล่น"
              placeholder="เช่น น้องกระบองเพชร"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
            <BaseInput
              label="อีเมล"
              type="email"
              placeholder="you@ongmatch.th"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="รหัสผ่าน"
              placeholder="••••••••"
              radius="xl"
              size="md"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <BaseButton type="submit" fullWidth>
              {APP_TEXT.button.register}
            </BaseButton>
          </Stack>
        </form>

        <Text size="sm" c="dimmed" ta="center">
          มีบัญชีแล้ว?{" "}
          <Text component="a" href="/login" c="ong-green.7" fw={600} size="sm">
            {APP_TEXT.button.login}
          </Text>
        </Text>
      </Stack>
    </BaseCard>
  );
}
