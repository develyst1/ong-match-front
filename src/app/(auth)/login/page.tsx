"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import {
  Alert,
  Badge,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
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
      await login(email, password);
      router.push("/discover");
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      setError(status === 401 ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" : "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseCard withBorder shadow="md" padding="xl" w="100%" maw={420}>
      <Stack gap="md">
        <Stack gap={4} align="center" ta="center">
          <Badge
            color="ong-green"
            variant="light"
            radius="xl"
            leftSection={<IconSparkles size={14} stroke={2} />}
          >
            {APP_TEXT.brand}
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
