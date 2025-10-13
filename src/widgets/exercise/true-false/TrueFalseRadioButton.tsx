import { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { TrueFalseQuizChoice_SelectedStatus } from '@/entities/quizzes/true-false/enum';
import { type ChoiceColorsByStatus } from '@/entities/quizzes/types';
import useTranslation from '@/shared/lib/hooks/useTranslation';
import { Text } from '@/shared/ui';
import { type RadioButtonHandle } from '@/shared/ui/animations/RiveAnimation';
import IconButton from '@/shared/ui/IconButton';
import { type RadioButtonProp } from '@/shared/ui/RadioButton';

type TrueFalseProp = Omit<
  RadioButtonProp,
  'children' | 'icon' | 'iconUrl' | 'minSize' | 'selected' | 'onChoose'
> & {
  selectedStatus: TrueFalseQuizChoice_SelectedStatus;
  correctAnswer: TrueFalseQuizChoice_SelectedStatus;
  showAnswer: boolean;
  id: number;
  content: string;
  nativeContent: string;
  audio: string;
  play: (audioSource: string, playingDialogId?: number) => void;
  onChoose: (userChoice: boolean) => void;
};

const TrueFalseRadioButton = forwardRef<RadioButtonHandle, TrueFalseProp>(
  (
    {
      id,
      content,
      nativeContent,
      audio,
      play,
      selectedStatus,
      correctAnswer,
      showAnswer,
      className,
      onChoose,
    }: TrueFalseProp,
    _ref: React.ForwardedRef<RadioButtonHandle>
  ) => {
    const { isTranslating, start, stop } = useTranslation();

    const isSelected = selectedStatus !== TrueFalseQuizChoice_SelectedStatus.UNSELECTED;
    const isTrueCorrect = correctAnswer === TrueFalseQuizChoice_SelectedStatus.TRUE;
    const isFalseCorrect = correctAnswer === TrueFalseQuizChoice_SelectedStatus.FALSE;

    let trueOptionColors: ChoiceColorsByStatus = {};
    let falseOptionColors: ChoiceColorsByStatus = {};

    const correctColors: ChoiceColorsByStatus = {
      backgroundColor: 'bg-cyan',
      borderColor: 'border-cyan',
      color: 'dark:text-cyan',
    };

    const unSelectedColors: ChoiceColorsByStatus = {
      backgroundColor: 'bg-white',
      borderColor: 'border-white',
      color: 'dark:text-white',
    };

    const selectedColors: ChoiceColorsByStatus = {
      backgroundColor: 'bg-primary',
      borderColor: 'border-primary',
      color: 'dark:text-primary',
    };

    const wrongColors: ChoiceColorsByStatus = {
      backgroundColor: 'bg-red',
      borderColor: 'border-red',
      color: 'dark:text-red',
    };

    if (showAnswer) {
      if (isSelected) {
        // User có chọn
        if (selectedStatus === TrueFalseQuizChoice_SelectedStatus.TRUE) {
          trueOptionColors = isTrueCorrect ? correctColors : selectedColors;
        } else if (isTrueCorrect) {
          // User chọn FALSE nhưng TRUE mới là đáp án đúng → tô đỏ
          trueOptionColors = wrongColors;
        }
      } else {
        // User không chọn → chỉ highlight đáp án đúng
        if (isTrueCorrect) {
          trueOptionColors = wrongColors;
        }
      }
    } else {
      // Chưa show answer → chỉ highlight khi user chọn
      if (selectedStatus === TrueFalseQuizChoice_SelectedStatus.TRUE) {
        trueOptionColors = selectedColors;
      }
    }

    if (showAnswer) {
      if (isSelected) {
        if (selectedStatus === TrueFalseQuizChoice_SelectedStatus.FALSE) {
          falseOptionColors = isFalseCorrect ? correctColors : selectedColors;
        } else if (isFalseCorrect) {
          falseOptionColors = wrongColors;
        }
      } else {
        if (isFalseCorrect) {
          falseOptionColors = wrongColors;
        }
      }
    } else {
      if (selectedStatus === TrueFalseQuizChoice_SelectedStatus.FALSE) {
        falseOptionColors = selectedColors;
      }
    }

    let finalColors =
      (trueOptionColors.backgroundColor as string)?.endsWith('red') ||
      (falseOptionColors.backgroundColor as string)?.endsWith('red')
        ? wrongColors
        : (trueOptionColors.backgroundColor as string)?.endsWith('cyan') ||
            (falseOptionColors.backgroundColor as string)?.endsWith('cyan')
          ? correctColors
          : unSelectedColors;

    return (
      <View className={twMerge(`my-1 flex-row justify-center gap-4`)}>
        {/* LEFT */}
        <View
          className={twMerge(
            `flex-1 flex-row items-center justify-between gap-1 rounded-lg border-2 border-white p-1 ${className} ${finalColors.borderColor}`
          )}
        >
          <View className="flex-1">
            <Text className={`font-bevietnampro ${finalColors.color} `}>
              {!isTranslating ? content : nativeContent}
            </Text>
          </View>
          <View className="gap-1">
            <IconButton
              iconName="translation"
              size={20}
              onPressIn={() => start(id)}
              onPressOut={stop}
            />
            <IconButton
              iconName="play_sound"
              size={20}
              onPress={() => {
                play(audio, -1);
              }}
            />
          </View>
        </View>

        {/* RIGHT */}
        <View className="flex-row items-center justify-center gap-2">
          <Pressable
            onPress={() => {
              onChoose(true);
            }}
          >
            <View className="flex-col items-center">
              <View
                className={twMerge(
                  `border-1 h-6 w-6 rounded-full border-border-dark bg-white ${trueOptionColors.backgroundColor} ${trueOptionColors.borderColor}`
                )}
              ></View>
              <Text>True</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              onChoose(false);
            }}
          >
            <View className="flex-col items-center">
              <View
                className={twMerge(
                  `border-1 h-6 w-6 rounded-full border-border-dark bg-white ${falseOptionColors.backgroundColor} ${falseOptionColors.borderColor}`
                )}
              ></View>
              <Text>False</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
);

export default TrueFalseRadioButton;
