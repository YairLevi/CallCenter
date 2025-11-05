import type { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { tryGetErrorMessage } from "@/api/try-get-error-message.ts";

export function useMutationErrorMessage(mutations: UseMutationResult[]) {
  const [error, setError] = useState('')

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const failedMutation = mutations.find(m => m.isError);
    const message = failedMutation
      ? tryGetErrorMessage(failedMutation.error) ?? ''
      : '';

    setError(message);
  }, [...mutations.map(m => m.isError)])

  return error
}
