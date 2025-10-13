import { forwardRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { SingleChoiceQuiz_Status } from '@/entities/quizzes/single-choice/enum';
import { type ChoiceColorsByStatus } from '@/entities/quizzes/types';
import useTranslation from '@/shared/lib/hooks/useTranslation';
import { Text } from '@/shared/ui';
import RiveAnimation, { type RadioButtonHandle } from '@/shared/ui/animations/RiveAnimation';
import IconButton from '@/shared/ui/IconButton';
import { type RadioButtonProp } from '@/shared/ui/RadioButton';

type SingleChoiceProp = Omit<
  RadioButtonProp,
  'children' | 'icon' | 'iconUrl' | 'minSize' | 'selected'
> & {
  status?: SingleChoiceQuiz_Status;
  id: number;
  content: string;
  nativeContent: string;
  audio: string;
  play: (audioSource: string, playingDialogId?: number) => void;
};

const SingleChoiceRadioButton = forwardRef<RadioButtonHandle, SingleChoiceProp>(
  (
    { id, content, nativeContent, audio, play, className, status, onChoose }: SingleChoiceProp,
    ref: React.ForwardedRef<RadioButtonHandle>
  ) => {
    const { isTranslating, start, stop } = useTranslation();
    // const moderateSize = useMemo(
    //   () =>
    //     vars({
    //       '--s-28': `${moderateScale(28)}px`,
    //       '--s-35': `${moderateScale(35)}px`,
    //       '--s-radio': `${moderateScale(5)}px`,
    //     }),
    //   []
    // );

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

    let colors = unSelectedColors;

    switch (status) {
      case SingleChoiceQuiz_Status.SELECTED:
        colors = selectedColors;
        break;
      case SingleChoiceQuiz_Status.CORRECT:
        colors = correctColors;
        break;
      case SingleChoiceQuiz_Status.WRONG:
        colors = wrongColors;
        break;
      default:
        break;
    }

    return (
      <View
        className={twMerge(
          `my-1 flex-1 justify-center rounded-lg border-2 border-white ${className} ${colors.borderColor}`
        )}
      >
        <Pressable className={`justify-center`} onPress={onChoose}>
          <View className={`h-full flex-row items-center gap-1 p-1`}>
            {/* Rive */}
            <View className="" pointerEvents="none">
              <RiveAnimation
                // className={`size-[30px] ${!selected && 'opacity-0'}`}
                className={`size-[30px] ${status === SingleChoiceQuiz_Status.UNSELECTED && 'opacity-0'}`}
                // layoutScaleFactor={3}
                // selected={selected}

                autoplay
                forwardedRef={ref}
                source={
                  Platform.OS === 'web'
                    ? `https://static.saoladigital.com/public/mtt-mobile-app/animations/checked-1.riv`
                    : require('@assets/animations/checked.riv')
                }
              />
            </View>

            {/* Right */}
            <View className="flex-1 flex-row items-center justify-between" pointerEvents="box-none">
              <Text className={`font-bevietnampro text-base ${colors.color}`}>
                {!isTranslating ? content : nativeContent}
              </Text>
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
                    play(audio);
                  }}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
);

export default SingleChoiceRadioButton;
