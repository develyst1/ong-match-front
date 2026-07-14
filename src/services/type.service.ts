import type {
  MyType,
  QuizDTO,
  SubmitQuizResponse,
  ValidateTypeResponse,
} from "@/types/api/main/quiz";
import {
  getMyTypesApi,
  relevelApi,
  submitQuizApi,
  validateTypeApi,
} from "@/lib/api/api-types";
import { mockDelay } from "@/lib/api/mock-data";

// ─── Mock fallback so the wizard still runs if the backend is down ──
const mockQuiz = (title: string): QuizDTO => ({
  id: `mock-quiz-${Date.now()}`,
  timeLimitSec: 60,
  questions: [
    { id: "q1", prompt: `เล่าจุดเริ่มต้นที่ทำให้คุณสนใจ "${title}"` },
    { id: "q2", prompt: `อะไรคือสิ่งที่คนนอกวงการ "${title}" มักเข้าใจผิด?`, choices: ["ก", "ข", "ค", "ง"] },
    { id: "q3", prompt: `ถ้าให้แนะนำมือใหม่เรื่อง "${title}" คุณจะบอกอะไรเป็นอย่างแรก?` },
  ],
});

export const validateType = async (input: { title: string; description: string }): Promise<ValidateTypeResponse> => {
  try {
    const res = await validateTypeApi(input);
    return res.data.data;
  } catch (err) {
    // A 422 (rejected type) is a real answer, not a network failure — rethrow it.
    if (isHttpStatus(err, 422)) throw err;
    const now = new Date();
    return mockDelay({
      type: {
        id: `mock-type-${Date.now()}`,
        user_id: "mock-user",
        title: input.title,
        description: input.description,
        level: 0,
        status: "active",
        first_created_at: now.toISOString(),
        expires_at: new Date(now.getTime() + 30 * 86400_000).toISOString(),
      },
      verdict: "ดูน่าสนใจ ลองทำแบบทดสอบยืนยันกัน",
      quiz: mockQuiz(input.title),
    });
  }
};

export const submitQuiz = async (
  id: string,
  payload: { answers: unknown[]; elapsedSec: number },
): Promise<SubmitQuizResponse> => {
  try {
    const res = await submitQuizApi(id, payload);
    return res.data.data;
  } catch {
    const answered = payload.answers.filter((a) => String(a ?? "").trim().length > 8).length;
    const score = Math.min(100, answered * 30);
    const passed = score >= 60;
    return mockDelay({
      passed,
      score,
      level: passed ? Math.round(score * 0.4) : 0,
      feedback: [],
    });
  }
};

export const relevel = async (id: string): Promise<QuizDTO> => {
  try {
    const res = await relevelApi(id);
    return res.data.data.quiz;
  } catch (err) {
    if (isHttpStatus(err, 429)) throw err;
    return mockDelay(mockQuiz("อัปเลเวล"));
  }
};

export const getMyTypes = async (): Promise<MyType[]> => {
  try {
    const res = await getMyTypesApi();
    return res.data.data;
  } catch {
    return mockDelay([]);
  }
};

function isHttpStatus(err: unknown, status: number): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    (err as { response?: { status?: number } }).response?.status === status
  );
}
