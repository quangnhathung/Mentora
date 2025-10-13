import { useState } from 'react';

const STEPS = ['language', 'iam', 'goal', 'level'] as const;
export type Step = (typeof STEPS)[number];
export type SelectionState = Record<Step, number>;

export const useOnboardingStep = () => {
  const [stepIndex, setIndex] = useState(1); // lazy initializer để chỉ chạy map đúng một lần
  const [selection, setSelection] = useState<SelectionState>(() =>
    STEPS.reduce((acc, step) => {
      acc[step] = -1;
      return acc;
    }, {} as SelectionState)
  );

  const current = STEPS[stepIndex - 1];

  const next = () => setIndex((i) => Math.min(i + 1, STEPS.length));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const updateSelection = (step: Step, value: string | number) => {
    setSelection((prev) => ({ ...prev, [step]: value }));
  };

  return { current, currentStep: stepIndex, selection, setSelection: updateSelection, next, prev };
};
