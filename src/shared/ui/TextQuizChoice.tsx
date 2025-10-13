import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { type ChoiceColorsByStatus } from '@/entities/quizzes/types';
import { Pressable } from '@/shared/ui';

import { BaseChoiceStatus } from '../enum';
import { type BaseQuizChoiceStatus } from '../types';
import TextWithBorder from './TextWithBorder';

type TextQuizChoiceProps = {
  text: string;
  status?: BaseQuizChoiceStatus;
  containerClassName?: string;
  borderClassName?: string;
  onPress?: () => void;
};

const TextQuizChoice = forwardRef<null, TextQuizChoiceProps>(
  (
    { text, status = BaseChoiceStatus.UNSELECTED, borderClassName, containerClassName, onPress },
    ref
  ) => {
    let colorPalette: ChoiceColorsByStatus = {
      borderColor: 'border-white',
      color: 'dark:text-white',
    };

    switch (status) {
      case BaseChoiceStatus.SELECTED:
        colorPalette = {
          borderColor: 'border-primary',
          color: 'dark:text-primary',
        };
        break;
      case BaseChoiceStatus.CORRECT:
        colorPalette = {
          borderColor: 'border-cyan',
          color: 'dark:text-cyan',
        };
        break;
      case BaseChoiceStatus.WRONG:
        colorPalette = {
          borderColor: 'border-red',
          color: 'dark:text-red',
        };
        break;
      default:
        break;
    }

    return (
      <Pressable
        ref={ref}
        className={`${containerClassName}`}
        style={(pressed) => {
          return { opacity: pressed ? 0.7 : 1 };
        }}
        onPress={onPress}
      >
        <TextWithBorder
          text={text}
          borderClassName={twMerge(`rounded-lg ${borderClassName} ${colorPalette.borderColor}`)}
          textClassName={twMerge(`font-bevietnampro ${colorPalette.color}`)}
        />
      </Pressable>
    );
  }
);

export default TextQuizChoice;
