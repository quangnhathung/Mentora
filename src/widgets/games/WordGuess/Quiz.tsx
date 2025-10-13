import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import { type Quest } from '@/entities/games/WordGuess/types';
import { Image, Pressable, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { SvgIcon } from '@/shared/ui/SvgIcon';

export type QuizRef = {
  getResult: () => boolean | null;
  reset: () => void;
  next: () => void;
  isAnswered: () => boolean;
};

type Props = {
  data: Quest;
  onResult?: (isCorrect: boolean) => void;
  onIncorrect?: () => void;
};

export const Quiz = forwardRef<QuizRef, Props>(({ data, onResult, onIncorrect }, ref) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const shuffledOptions = useMemo(() => shuffleArray(data.options), [data]);

  useImperativeHandle(ref, () => ({
    getResult: () => {
      if (!selectedId) return null;
      const selected = data.options.find((o) => o.id === selectedId);
      return selected?.correct ?? false;
    },
    reset: () => {
      setSelectedId(null);
    },
    next: () => {
      setSelectedId(null);
      setAnswered(false);
    },
    isAnswered: () => answered,
  }));

  const handlePress = (id: string) => {
    if (selectedId) return;
    setSelectedId(id);

    const opt = data.options.find((o) => o.id === id);
    if (opt) {
      const correct = opt.correct ?? false;
      onResult?.(correct);

      if (!correct && !answered) {
        onIncorrect?.();
      }

      setAnswered(true);
    }
  };

  return (
    <View className="mt-4 w-full items-center px-3">
      {data.image && (
        <Image source={{ uri: data.image }} className="mb-4 size-[150px] rounded-xl" />
      )}
      {data.text && <Text className="mb-4 text-lg">{data.text}</Text>}

      {shuffledOptions.map((opt) => {
        const isSelected = selectedId === opt.id;
        const isCorrect = !!opt.correct;
        const showCorrect = selectedId && isCorrect;

        let bgColor = 'bg-background-dark-light';
        let icon: React.ReactNode = null;

        if (isSelected) {
          if (isCorrect) {
            bgColor = 'bg-green-500';
            icon = <SvgIcon name="checked" size={16} color="green" />;
          } else {
            bgColor = 'bg-red';
            icon = <SvgIcon name="error" size={16} />;
          }
        } else if (showCorrect) {
          bgColor = 'bg-green-500';
          icon = <SvgIcon name="checked" size={16} color="green" />;
        }

        return (
          <BottomBorder key={opt.id} className="border-custom-5 mb-3 w-full flex-1">
            <Pressable
              onPress={() => handlePress(opt.id)}
              className={`w-full ${bgColor} flex-1 flex-row items-center justify-between rounded-xl p-3`}
            >
              <Text className={`flex-1 text-center`}>{opt.text}</Text>
              {icon}
            </Pressable>
          </BottomBorder>
        );
      })}
    </View>
  );
});

//utils

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
