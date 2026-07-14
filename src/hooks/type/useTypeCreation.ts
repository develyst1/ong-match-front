"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { relevel, submitQuiz, suggestTypes, validateType } from "@/services/type.service";
import { MY_TYPES_QUERY_KEY } from "./useMyTypes";

export const useTypeCreation = () => {
  const queryClient = useQueryClient();

  const suggest = useMutation({
    mutationFn: (story: string) => suggestTypes(story),
  });

  const validate = useMutation({
    mutationFn: (input: { title: string; description: string }) => validateType(input),
  });

  const submit = useMutation({
    mutationFn: ({ id, answers, elapsedSec }: { id: string; answers: unknown[]; elapsedSec: number }) =>
      submitQuiz(id, { answers, elapsedSec }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...MY_TYPES_QUERY_KEY] });
    },
  });

  const startRelevel = useMutation({
    mutationFn: (id: string) => relevel(id),
  });

  return { suggest, validate, submit, startRelevel };
};
