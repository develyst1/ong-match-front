"use client";

import { useState } from "react";
import {
  Alert,
  Badge,
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
  IconConfetti,
  IconSparkles,
} from "@tabler/icons-react";
import { BaseButton } from "@/components/ui/Button";
import { BaseCard } from "@/components/ui/Card";
import { LevelBadge } from "@/components/common";
import { useTypeCreation } from "@/hooks/type";
import StepQuiz from "./StepQuiz";
import type { QuizDTO, SubmitQuizResponse, TypeCandidate } from "@/types/api/main/quiz";

type Phase = "story" | "suggesting" | "choose" | "validating" | "verdict" | "quiz" | "result";

interface CreateTypeWizardProps {
  onDone?: () => void;
}

const PHASE_PROGRESS: Record<Phase, number> = {
  story: 14,
  suggesting: 28,
  choose: 42,
  validating: 56,
  verdict: 70,
  quiz: 85,
  result: 100,
};

export default function CreateTypeWizard({ onDone }: CreateTypeWizardProps) {
  const { suggest, validate, submit } = useTypeCreation();
  const [phase, setPhase] = useState<Phase>("story");
  const [story, setStory] = useState("");
  const [candidates, setCandidates] = useState<TypeCandidate[]>([]);
  const [chosen, setChosen] = useState<TypeCandidate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verdict, setVerdict] = useState("");
  const [quiz, setQuiz] = useState<QuizDTO | null>(null);
  const [result, setResult] = useState<SubmitQuizResponse | null>(null);

  const runSuggest = () => {
    setError(null);
    setPhase("suggesting");
    suggest.mutate(story.trim(), {
      onSuccess: (list) => {
        if (list.length === 0) {
          setError("AI แนะนำไทป์ไม่สำเร็จ ลองเล่าให้ละเอียดขึ้น");
          setPhase("story");
          return;
        }
        setCandidates(list);
        setPhase("choose");
      },
      onError: (err: unknown) => {
        const reason =
          (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
          "AI แนะนำไทป์ไม่สำเร็จ ลองเล่าให้ละเอียดขึ้น";
        setError(reason);
        setPhase("story");
      },
    });
  };

  const pickCandidate = (candidate: TypeCandidate) => {
    setChosen(candidate);
    setError(null);
    setPhase("validating");
    validate.mutate(
      { title: candidate.title, description: story.trim() },
      {
        onSuccess: (data) => {
          setVerdict(data.verdict);
          setQuiz(data.quiz);
          setPhase("verdict");
        },
        onError: (err: unknown) => {
          const reason =
            (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
            "ไทป์นี้ผ่านการตรวจไม่ได้ ลองเลือกไทป์อื่นหรือเล่าใหม่";
          setError(reason);
          setPhase("choose");
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

        {phase === "story" && (
          <Stack gap="md">
            <Group gap="xs">
              <ThemeIcon size={38} radius="xl" variant="light" color="ong-green">
                <IconSparkles size={20} />
              </ThemeIcon>
              <Title order={3}>เล่าเรื่องความอินของคุณ</Title>
            </Group>
            <Text size="sm" c="dimmed">
              ไม่ต้องตั้งชื่อไทป์เอง — เล่าให้ฟังว่าคุณชอบ/ทำอะไร อินมานานแค่ไหน แล้ว AI จะแนะนำไทป์ให้คุณเลือก
            </Text>
            {error && (
              <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
                {error}
              </Alert>
            )}
            <Textarea
              placeholder="เช่น ผมเล่นกีตาร์ไฟฟ้าแนวบลูส์มา 8 ปี ชอบ fingerstyle กับ bending คัฟเวอร์ SRV บ่อยๆ..."
              radius="lg"
              autosize
              minRows={4}
              value={story}
              onChange={(e) => setStory(e.currentTarget.value)}
              autoFocus
            />
            <BaseButton size="lg" disabled={story.trim().length < 10} onClick={runSuggest}>
              ให้ AI แนะนำไทป์
            </BaseButton>
          </Stack>
        )}

        {phase === "suggesting" && (
          <Center mih={280}>
            <Stack align="center" gap="md">
              <Loader color="ong-green" size="lg" type="dots" />
              <Text fw={600}>AI กำลังอ่านเรื่องของคุณ...</Text>
              <Text size="sm" c="dimmed">
                กำลังคิดไทป์ที่ใช่ให้คุณเลือก
              </Text>
            </Stack>
          </Center>
        )}

        {phase === "choose" && (
          <Stack gap="md">
            <Group gap="xs">
              <ThemeIcon size={38} radius="xl" variant="light" color="ong-green">
                <IconSparkles size={20} />
              </ThemeIcon>
              <Title order={3}>เลือกไทป์ที่ใช่ที่สุด</Title>
            </Group>
            <Text size="sm" c="dimmed">
              AI แนะนำมา {candidates.length} ไทป์จากเรื่องของคุณ เลือกอันที่ตรงใจแล้วไปทำแบบทดสอบยืนยัน
            </Text>
            {error && (
              <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
                {error}
              </Alert>
            )}
            <Stack gap="sm">
              {candidates.map((c) => (
                <BaseCard
                  key={c.title}
                  withBorder
                  shadow="sm"
                  padding="md"
                  onClick={() => pickCandidate(c)}
                  style={{ cursor: "pointer" }}
                >
                  <Stack gap={6}>
                    <Text fw={700}>{c.title}</Text>
                    {c.blurb && (
                      <Text size="sm" c="dimmed">
                        {c.blurb}
                      </Text>
                    )}
                    {c.tags.length > 0 && (
                      <Group gap={6}>
                        {c.tags.slice(0, 5).map((tag) => (
                          <Badge key={tag} variant="light" color="teal" radius="sm" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </Stack>
                </BaseCard>
              ))}
            </Stack>
            <BaseButton variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={() => setPhase("story")}>
              เล่าใหม่
            </BaseButton>
          </Stack>
        )}

        {phase === "validating" && (
          <Center mih={280}>
            <Stack align="center" gap="md">
              <Loader color="ong-green" size="lg" type="dots" />
              <Text fw={600}>AI กำลังออกแบบทดสอบ...</Text>
              <Text size="sm" c="dimmed">
                สร้างคำถามวัดความลึกไทป์ &quot;{chosen?.title}&quot; ให้คุณ
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
          <ResultView result={result} title={chosen?.title ?? "ไทป์ของคุณ"} onDone={onDone} onRetry={() => setPhase("choose")} />
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
