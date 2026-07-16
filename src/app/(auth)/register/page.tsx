"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Badge, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconAlertCircle, IconSparkles } from "@tabler/icons-react";
import { BaseButton } from "@/components/ui/Button";
import { BaseInput } from "@/components/ui/Input";
import { BaseCard } from "@/components/ui/Card";
import { updateMeApi } from "@/lib/api/api-main";
import { register } from "@/services/auth.service";
import { ageFromDob } from "@/lib/utils";
import { APP_TEXT } from "@/constant/text/common";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^0\d{8,9}$/.test(phone)) {
      setError("กรอกเบอร์โทรให้ถูกต้อง (เช่น 0812345678)");
      return;
    }
    if (password.length < 6) {
      setError("รหัสผ่านอย่างน้อย 6 ตัวอักษร");
      return;
    }
    setLoading(true);

    // 1) Create the real account (email + password) → stores the JWT.
    try {
      await register(email, password, name);
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      setError(status === 409 ? "อีเมลนี้ถูกใช้แล้ว" : "สมัครไม่สำเร็จ ลองใหม่อีกครั้ง");
      setLoading(false);
      return;
    }

    // 2) Save profile basics (phone is unique — one account per phone).
    const age = dob ? ageFromDob(new Date(dob)) : undefined;
    try {
      await updateMeApi({ displayName: name, phone, ...(age ? { age } : {}) });
      router.push("/onboarding");
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) {
        setError("เบอร์นี้ถูกใช้สมัครแล้ว หนึ่งเบอร์สมัครได้บัญชีเดียว");
        setLoading(false);
        return;
      }
      router.push("/onboarding"); // account created; profile can be edited later
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
          <Title order={2}>{APP_TEXT.button.register}</Title>
          <Text size="sm" c="dimmed">
            {APP_TEXT.landing.ctaDesc}
          </Text>
        </Stack>

        {error && (
          <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
            {error}
          </Alert>
        )}

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
            <BaseInput
              label="เบอร์โทรศัพท์"
              type="tel"
              placeholder="0812345678"
              description="ใช้ยืนยันตัวตน หนึ่งเบอร์สมัครได้บัญชีเดียว"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value.replace(/[^0-9]/g, ""))}
              maxLength={10}
              required
            />
            <DatePickerInput
              label="วันเกิด"
              placeholder="เลือกวันเกิด"
              radius="xl"
              size="md"
              valueFormat="D MMM YYYY"
              maxDate={new Date()}
              value={dob}
              onChange={setDob}
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
            <BaseButton type="submit" fullWidth loading={loading}>
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
