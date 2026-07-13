"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Alert,
  Badge,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BaseButton } from "@/components/ui/Button";
import { BaseInput } from "@/components/ui/Input";
import { BaseCard } from "@/components/ui/Card";
import { APP_TEXT } from "@/constant/text/common";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        // Demo mode: backend not required — just go to onboarding/discover.
        window.localStorage.setItem("ong-match-token", "demo-token");
        router.push("/discover");
      }
    } catch {
      setError("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseCard withBorder shadow="md" padding="xl" w="100%" maw={420}>
      <Stack gap="md">
        <Stack gap={4} align="center" ta="center">
          <Badge color="ong-green" variant="light" radius="xl">
            🌵 {APP_TEXT.brand}
          </Badge>
          <Title order={2}>{APP_TEXT.button.login}</Title>
          <Text size="sm" c="dimmed">
            {APP_TEXT.tagline}
          </Text>
        </Stack>

        {error && (
          <Alert color="red" variant="light" radius="md">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
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
            <BaseButton type="submit" loading={loading} fullWidth>
              {APP_TEXT.button.login}
            </BaseButton>
          </Stack>
        </form>

        <Text size="sm" c="dimmed" ta="center">
          ยังไม่มีบัญชี?{" "}
          <Text
            component="a"
            href="/register"
            c="ong-green.7"
            fw={600}
            size="sm"
          >
            สมัครสมาชิก
          </Text>
        </Text>
      </Stack>
    </BaseCard>
  );
}
