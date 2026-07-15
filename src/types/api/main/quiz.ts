// Backend contract types for the type-creation + quiz flow.

export interface QuizQuestionDTO {
  id: string;
  prompt: string;
  choices?: string[];
}

export interface QuizDTO {
  id: string;
  questions: QuizQuestionDTO[];
  timeLimitSec: number;
}

export interface TypeDTO {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  level: number;
  status: string;
  first_created_at: string;
  expires_at: string;
}

export interface ValidateTypeResponse {
  type: TypeDTO;
  /** Qualitative blurb from the AI (e.g. "โอ้ รู้ลึกมาก!"); the numeric level band is hidden. */
  verdict: string;
  quiz: QuizDTO;
}

/** One AI-proposed type the user can pick from after telling their story. */
export interface TypeCandidate {
  title: string;
  blurb: string;
  tags: string[];
}

export interface SuggestTypesResponse {
  candidates: TypeCandidate[];
}

export interface QuizFeedback {
  id: string;
  correct: boolean;
  note: string;
}

export interface SubmitQuizResponse {
  passed: boolean;
  score: number;
  level: number;
  feedback: QuizFeedback[];
}

export interface RelevelResponse {
  quiz: QuizDTO;
}

export interface MyType {
  id: string;
  title: string;
  description: string | null;
  level: number;
  status: string;
  daysLeft: number;
  minContactLevel: number;
}
