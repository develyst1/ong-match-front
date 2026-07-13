"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Group,
  NumberInput,
  Progress,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { BaseButton } from "@/components/ui/Button";
import { BaseInput } from "@/components/ui/Input";
import { TribeIcon } from "@/components/common";
import { useInterests } from "@/hooks/interest";
import { useTribes } from "@/hooks/tribe";
import { useUpdateMe } from "@/hooks/user";
import { APP_TEXT } from "@/constant/text/common";

const TOTAL_STEPS = 3;

interface OnboardingForm {
  displayName: string;
  bio: string;
  age: number;
  location: string;
}

export default function OnboardingContent() {
  const router = useRouter();
  const { tribes } = useTribes();
  const { interests } = useInterests();
  const updateMe = useUpdateMe();

  const [step, setStep] = useState(1);
  const [primaryTribeId, setPrimaryTribeId] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [form, setForm] = useState<OnboardingForm>({
    displayName: "",
    bio: "",
    age: 20,
    location: "กรุงเทพมหานคร",
  });

  const tribeInterests = interests.filter(
    (i) => i.tribeId === primaryTribeId,
  );

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const canNext =
    (step === 1 && Boolean(primaryTribeId)) ||
    (step === 2 && selectedInterests.length > 0) ||
    step === 3;

  const handleFinish = () => {
    updateMe.mutate(
      {
        ...form,
        primaryTribeId,
        interestIds: selectedInterests,
        activityLevel: "MEDIUM",
      },
      { onSuccess: () => router.push("/discover") },
    );
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg" maw={640} mx="auto">
        <Progress
          value={(step / TOTAL_STEPS) * 100}
          size="sm"
          radius="xl"
          color="ong-green"
        />

        {step === 1 && (
          <Step1
            tribes={tribes}
            primaryTribeId={primaryTribeId}
            onSelect={setPrimaryTribeId}
          />
        )}

        {step === 2 && (
          <Stack gap="md">
            <Stack gap={4}>
              <Title order={3}>{APP_TEXT.onboarding.step2Title}</Title>
              <Text size="sm" c="dimmed">
                {APP_TEXT.onboarding.step2Desc}
              </Text>
            </Stack>
            <Group gap="xs">
              {tribeInterests.map((interest) => (
                <Chip
                  key={interest.id}
                  checked={selectedInterests.includes(interest.id)}
                  onChange={() => toggleInterest(interest.id)}
                  variant="light"
                  color="ong-green"
                  radius="xl"
                  size="md"
                >
                  {interest.name}
                </Chip>
              ))}
            </Group>
          </Stack>
        )}

        {step === 3 && <Step3 form={form} onChange={setForm} />}

        <Group justify="space-between" mt="md">
          {step > 1 ? (
            <BaseButton variant="subtle" onClick={() => setStep((s) => s - 1)}>
              {APP_TEXT.button.back}
            </BaseButton>
          ) : (
            <Box />
          )}
          {step < TOTAL_STEPS ? (
            <BaseButton
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
            >
              {APP_TEXT.button.next}
            </BaseButton>
          ) : (
            <BaseButton loading={updateMe.isPending} onClick={handleFinish}>
              {APP_TEXT.button.save}
            </BaseButton>
          )}
        </Group>
      </Stack>
    </Container>
  );
}

function Step1({
  tribes,
  primaryTribeId,
  onSelect,
}: {
  tribes: { id: string; slug: string; name: string; nameEn: string; color: string; description: string; memberCount: number }[];
  primaryTribeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Stack gap="md">
      <Stack gap={4}>
        <Title order={3}>{APP_TEXT.onboarding.step1Title}</Title>
        <Text size="sm" c="dimmed">
          {APP_TEXT.onboarding.step1Desc}
        </Text>
      </Stack>
      <Grid>
        {tribes.map((tribe) => {
          const isActive = primaryTribeId === tribe.id;
          return (
            <Grid.Col key={tribe.id} span={{ base: 6, sm: 4 }}>
              <Box
                onClick={() => onSelect(tribe.id)}
                style={{
                  cursor: "pointer",
                  border: `2px solid ${
                    isActive
                      ? `var(--mantine-color-${tribe.color}-5)`
                      : "var(--mantine-color-gray-3)"
                  }`,
                  borderRadius: "var(--mantine-radius-xl)",
                  padding: "var(--mantine-spacing-md)",
                  background: isActive
                    ? `var(--mantine-color-${tribe.color}-0)`
                    : "transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <Stack align="center" gap="xs" ta="center">
                  <ThemeIcon
                    size={56}
                    radius="xl"
                    variant="light"
                    color={tribe.color}
                  >
                    <TribeIcon slug={tribe.slug} size={30} />
                  </ThemeIcon>
                  <Text fw={700} size="sm">
                    {tribe.name}
                  </Text>
                  <Badge color={tribe.color} variant="light" radius="xl" size="sm">
                    {tribe.memberCount.toLocaleString()}
                  </Badge>
                </Stack>
              </Box>
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}

function Step3({
  form,
  onChange,
}: {
  form: OnboardingForm;
  onChange: (form: OnboardingForm) => void;
}) {
  return (
    <Stack gap="md">
      <Stack gap={4}>
        <Title order={3}>{APP_TEXT.onboarding.step3Title}</Title>
        <Text size="sm" c="dimmed">
          {APP_TEXT.onboarding.step3Desc}
        </Text>
      </Stack>
      <BaseInput
        label="ชื่อที่แสดง"
        placeholder="เช่น น้องกระบองเพชร"
        value={form.displayName}
        onChange={(e) => onChange({ ...form, displayName: e.currentTarget.value })}
      />
      <TextInput
        label="แนะนำตัวสั้นๆ"
        placeholder="บอกหน่อยคุณเป็นคนไทป์ไหน"
        radius="xl"
        size="md"
        value={form.bio}
        onChange={(e) => onChange({ ...form, bio: e.currentTarget.value })}
      />
      <Group grow>
        <NumberInput
          label="อายุ"
          min={18}
          max={100}
          radius="xl"
          size="md"
          value={form.age}
          onChange={(val) =>
            onChange({ ...form, age: typeof val === "number" ? val : 18 })
          }
        />
        <TextInput
          label="จังหวัด"
          placeholder="กรุงเทพมหานคร"
          radius="xl"
          size="md"
          value={form.location}
          onChange={(e) =>
            onChange({ ...form, location: e.currentTarget.value })
          }
        />
      </Group>
    </Stack>
  );
}
