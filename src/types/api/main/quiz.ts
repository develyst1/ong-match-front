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
  quiz: QuizDTO;
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
}
