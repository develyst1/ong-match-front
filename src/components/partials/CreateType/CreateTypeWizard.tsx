"use client";

import { useState } from "react";
import {
  Alert,
  Center,
  Container,
  Group,
  Loader,
  Progress,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconArrowLeft,
  IconBolt,
  IconConfetti,
  IconSparkles,
} from "@tabler/icons-react";
import { BaseButton } from "@/components/ui/Button";
import { BaseInput } from "@/components/ui/Input";
import { LevelBadge } from "@/components/common";
import { useTypeCreation } from "@/hooks/type";
import StepQuiz from "./StepQuiz";
import type { QuizDTO, SubmitQuizResponse } from "@/types/api/main/quiz";

type Phase = "name" | "elaborate" | "validating" | "verdict" | "quiz" | "result";

interface CreateTypeWizardProps {
  onDone?: () => void;
}

const PHASE_PROGRESS: Record<Phase, number> = {
  name: 16,
  elaborate: 33,
  validating: 50,
  verdict: 66,
  quiz: 83,
  result: 100,
};

export default function CreateTypeWizard({ onDone }: CreateTypeWizardProps) {
  const { validate, submit } = useTypeCreation();
  const [phase, setPhase] = useState<Phase>("name");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rejectReason, setRejectReason] = useState<string | null>(null);
  const [verdict, setVerdict] = useState("");
  const [quiz, setQuiz] = useState<QuizDTO | null>(null);
  const [result, setResult] = useState<SubmitQuizResponse | null>(null);

  const runValidation = () => {
    setRejectReason(null);
    setPhase("validating");
    validate.mutate(
      { title: title.trim(), description: description.trim() },
      {
        onSuccess: (data) => {
          setVerdict(data.verdict);
          setQuiz(data.quiz);
          setPhase("verdict");
        },
        onError: (err: unknown) => {
          const reason =
            (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
            "ไทป์นี้ผ่านการตรวจไม่ได้ ลองปรับชื่อหรือคำอธิบายให้ชัดเจนขึ้น";
          setRejectReason(reason);
          setPhase("elaborate");
        },
      },
    );
  };

  const handleQuizSubmit = (answers: string[], elapsedSec: number) => {
    if (!quiz) return;
    submit.mutate(
      { id: quiz.id, answers, elapsedSec },
      {
        onSuccess: (data) => {
          setResult(data);
          setPhase("result");
        },
      },
    );
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg" maw={560} mx="auto">
        <Progress value={PHASE_PROGRESS[phase]} size="sm" radius="xl" color="ong-green" />

        {phase === "name" && (
          <Stack gap="md">
            <Group gap="xs">
              <ThemeIcon size={38} radius="xl" variant="light" color="ong-green">
                <IconSparkles size={20} />
              </ThemeIcon>
              <Title order={3}>คุณอยากเพิ่มไทป์อะไร?</Title>
            </Group>
            <Text size="sm" c="dimmed">
              ตั้งชื่อไทป์ที่เป็นตัวคุณ เช่น &quot;ชอบเล่นกีตาร์ไฟฟ้า&quot;, &quot;สายวิ่งเทรล&quot;, &quot;คอกาแฟ specialty&quot;
            </Text>
            <BaseInput
              label="ชื่อไทป์"
              placeholder="พิมพ์ไทป์ของคุณ..."
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              autoFocus
            />
            <BaseButton size="lg" disabled={title.trim().length < 2} onClick={() => setPhase("elaborate")}>
              ถัดไป
            </BaseButton>
          </Stack>
        )}

        {phase === "elaborate" && (
          <Stack gap="md">
            <Group gap="xs">
              <ThemeIcon size={38} radius="xl" variant="light" color="ong-green">
                <IconBolt size={20} />
              </ThemeIcon>
              <Title order={3}>เล่าเรื่องไทป์นี้ของคุณ</Title>
            </Group>
            <Text size="sm" c="dimmed">
              ยิ่งเล่าลึก AI ยิ่งออกคำถามได้ตรง — คุณอินกับ &quot;{title}&quot; มานานแค่ไหน ชอบอะไรเป็นพิเศษ?
            </Text>
            {rejectReason && (
              <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
                {rejectReason}
              </Alert>
            )}
            <Textarea
              placeholder="เล่าเรื่องราวความอินของคุณ..."
              radius="lg"
              autosize
              minRows={4}
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
            <Group justify="space-between">
              <BaseButton variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={() => setPhase("name")}>
                ย้อนกลับ
              </BaseButton>
              <BaseButton size="lg" disabled={description.trim().length < 10} onClick={runValidation}>
                ให้ AI ตรวจ + ออกข้อสอบ
              </BaseButton>
            </Group>
          </Stack>
        )}

        {phase === "validating" && (
          <Center mih={280}>
            <Stack align="center" gap="md">
              <Loader color="ong-green" size="lg" type="dots" />
              <Text fw={600}>AI กำลังตรวจไทป์และออกแบบทดสอบ...</Text>
              <Text size="sm" c="dimmed">
                กันไทป์มั่ว + สร้างคำถามวัดความลึกให้คุณ
              </Text>
            </Stack>
          </Center>
        )}

        {phase === "verdict" && (
          <Stack gap="md" align="center" ta="center" py="md">
            <ThemeIcon size={72} radius="xl" variant="light" color="ong-green">
              <IconSparkles size={38} />
            </ThemeIcon>
            <Title order={3}>AI อ่านเรื่องคุณแล้ว</Title>
            <Text size="lg" fw={600} c="ong-green.7" maw={440}>
              &ldquo;{verdict}&rdquo;
            </Text>
            <Text size="sm" c="dimmed" maw={440}>
              ทำแบบทดสอบสั้น ๆ เพื่อยืนยันเลเวลจริงของคุณ (จับเวลานะ กันปลอมไทป์)
            </Text>
            <BaseButton size="lg" mt="xs" onClick={() => setPhase("quiz")}>
              เริ่มแบบทดสอบยืนยัน
            </BaseButton>
          </Stack>
        )}

        {phase === "quiz" && quiz && (
          <StepQuiz quiz={quiz} loading={submit.isPending} onSubmit={handleQuizSubmit} />
        )}

        {phase === "result" && result && (
          <ResultView result={result} title={title} onDone={onDone} onRetry={() => setPhase("elaborate")} />
        )}
      </Stack>
    </Container>
  );
}

function ResultView({
  result,
  title,
  onDone,
  onRetry,
}: {
  result: SubmitQuizResponse;
  title: string;
  onDone?: () => void;
  onRetry: () => void;
}) {
  if (result.passed) {
    return (
      <Stack align="center" gap="md" py="md" ta="center">
        <ThemeIcon size={80} radius="xl" variant="light" color="ong-green">
          <IconConfetti size={44} />
        </ThemeIcon>
        <Title order={2}>ปลดล็อกไทป์สำเร็จ! 🎉</Title>
        <Text c="dimmed">
          &quot;{title}&quot; เข้าโปรไฟล์คุณแล้ว ผ่านการทดสอบด้วยคะแนน {result.score}
        </Text>
        <LevelBadge level={result.level} size="xl" />
        <BaseButton size="lg" mt="sm" onClick={onDone}>
          ไปที่โปรไฟล์
        </BaseButton>
      </Stack>
    );
  }
  return (
    <Stack align="center" gap="md" py="md" ta="center">
      <ThemeIcon size={80} radius="xl" variant="light" color="orange">
        <IconAlertCircle size={44} />
      </ThemeIcon>
      <Title order={2}>ยังไม่ผ่านรอบนี้</Title>
      <Text c="dimmed">
        คะแนน {result.score} — ต้องได้ 60 ขึ้นไป ลองเล่าให้ลึกขึ้นแล้วทำใหม่ได้
      </Text>
      <BaseButton size="lg" variant="light" onClick={onRetry}>
        ลองใหม่
      </BaseButton>
    </Stack>
  );
}
