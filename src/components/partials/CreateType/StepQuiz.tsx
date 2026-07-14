"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Group, Radio, Stack, Text, Textarea, Title } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { BaseButton } from "@/components/ui/Button";
import { useCountdown } from "@/hooks/common";
import QuizTimer from "./QuizTimer";
import type { QuizDTO } from "@/types/api/main/quiz";

interface StepQuizProps {
  quiz: QuizDTO;
  loading?: boolean;
  onSubmit: (answers: string[], elapsedSec: number) => void;
}

/**
 * Timed quiz. Answers are collected per question; when the user submits or the
 * countdown hits 0, we report the answers + how many seconds were actually used
 * (the backend uses elapsed time as an anti-fake signal).
 */
export default function StepQuiz({ quiz, loading, onSubmit }: StepQuizProps) {
  const total = quiz.timeLimitSec;
  const [answers, setAnswers] = useState<string[]>(() => quiz.questions.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const { remaining, running, start } = useCountdown(total);

  // The elapsed value is captured at submit time from the live `remaining`.
  const submit = useMemo(
    () => (curRemaining: number) => {
      if (submitted) return;
      setSubmitted(true);
      onSubmit(answers, Math.max(0, total - curRemaining));
    },
    [answers, submitted, onSubmit, total],
  );

  // Start the clock once on mount; auto-submit when it expires.
  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (remaining === 0 && !submitted) submit(0);
  }, [remaining, submitted, submit]);

  const setAnswer = (i: number, val: string) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));

  const urgent = running && remaining <= 10;

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <Stack gap={2}>
          <Title order={3}>ทดสอบความลึกไทป์ ⚡</Title>
          <Text size="sm" c="dimmed">
            ตอบให้จริงและทัน — เวลาจับอยู่ กันปลอมไทป์
          </Text>
        </Stack>
        <QuizTimer remaining={remaining} total={total} />
      </Group>

      {urgent && (
        <Alert color="orange" variant="light" radius="md" icon={<IconAlertTriangle size={16} />}>
          ใกล้หมดเวลาแล้ว! ระบบจะส่งคำตอบอัตโนมัติเมื่อครบเวลา
        </Alert>
      )}

      {quiz.questions.map((q, i) => (
        <Stack key={q.id} gap="xs">
          <Text fw={600} size="sm">
            {i + 1}. {q.prompt}
          </Text>
          {q.choices && q.choices.length > 0 ? (
            <Radio.Group value={answers[i]} onChange={(v) => setAnswer(i, v)}>
              <Stack gap={6}>
                {q.choices.map((choice, ci) => (
                  <Radio key={ci} value={choice} label={choice} color="ong-green" />
                ))}
              </Stack>
            </Radio.Group>
          ) : (
            <Textarea
              placeholder="พิมพ์คำตอบของคุณ..."
              radius="lg"
              autosize
              minRows={2}
              value={answers[i]}
              onChange={(e) => setAnswer(i, e.currentTarget.value)}
            />
          )}
        </Stack>
      ))}

      <BaseButton
        size="lg"
        loading={loading}
        disabled={submitted}
        onClick={() => submit(remaining)}
      >
        ส่งคำตอบ
      </BaseButton>
    </Stack>
  );
}
