import { router } from 'expo-router';
import { useColorScheme, vars } from 'nativewind';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { wordGuessTopicsData } from '@/entities/games/WordGuess/mock';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Modal, Pressable, Text, useModal, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { type CountdownBarRef } from '@/shared/ui/CountdownBar';
import { CyanButton } from '@/shared/ui/CyanButton';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import { ResultContent } from '@/widgets/games/Result';
import { Quiz, type QuizRef } from '@/widgets/games/WordGuess/Quiz';

import { getRandomItems } from '../useRandomQuest';

type props = {
  level: string;
  isTimeout: boolean;
  onCompleted: () => void;
  onTryAgain: () => void;
  countdownBarRef: React.RefObject<CountdownBarRef>;
};

export const WordGuess = ({
  level,
  isTimeout,
  onCompleted,
  countdownBarRef,
  onTryAgain,
}: props) => {
  const [completed, setCompleted] = React.useState(false);
  const [currentQuestion, setcurrentQuestion] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const quizRef = useRef<QuizRef>(null);
  const [answered, setAnswered] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { ref, present, dismiss } = useModal();

  useEffect(() => {
    if (completed) {
      onCompleted();
    }
  }, [completed, onCompleted]);

  useEffect(() => {
    if (!completed) {
      onTryAgain();
    }
  }, [onTryAgain, completed]);

  const moderateSize = vars({
    '--c-150': `${moderateScale(150)}px`,
    '--c-50': `${moderateScale(50)}px`,
  });

  // const data = wordGuessTopicsData[Math.floor(Math.random() * wordGuessTopicsData.length)];
  const RandomQuestions = useMemo(() => {
    const data = wordGuessTopicsData[Math.floor(Math.random() * wordGuessTopicsData.length)];
    const question = data.quests;
    const NumOfQuest = level === '5' ? 5 : level === '10' ? 7 : 10;
    return {
      topic: data.name,
      quests: getRandomItems(question, NumOfQuest),
    };
    // khi completed false lại (tức là TryAgain) thì random mới
  }, [level]);

  const data = useMemo(
    () => wordGuessTopicsData[Math.floor(Math.random() * wordGuessTopicsData.length)],
    []
  );
  //const question = data.quests;
  const NumOfQuest = level === '5' ? 5 : level === '10' ? 7 : 10;

  const handleReset = () => {
    quizRef.current?.reset();
  };

  const handleNext = () => {
    if (answered) {
      if (currentQuestion + 1 >= RandomQuestions.quests.length) {
        setCompleted(true);
        present();
        countdownBarRef.current?.pause();
        return;
      }
      setcurrentQuestion(currentQuestion + 1);
      quizRef.current?.next();
      setAnswered(false);
    }
    return;
  };

  const handleTryAgain = () => {
    dismiss();
    setcurrentQuestion(0);
    setIncorrectCount(0);
    setCompleted(false);
    quizRef.current?.reset();
    countdownBarRef?.current?.reset();
  };

  //calculate reward
  const reward = incorrectCount !== 0 || isTimeout ? 0 : Number(level);

  return (
    <BottomBorder className="border-custom-5 w-full">
      <View className="relative items-center justify-center">
        <GradientView
          colors={['primary-dark', 'primary']}
          containerClassName="min-h-4 w-full rounded-xl"
          className="bg-gradient-to-r from-primary-dark via-primary to-primary-light p-4"
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={moderateSize}
          pointerEvents="box-none"
        >
          <View>
            <View className="flex-row items-center justify-between">
              <View className="justify-between">
                <Text className="font-bevietnampro dark:text-cyan">Topic</Text>
                <Text className="font-baloo text-2xl">{data.name}</Text>
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <Text className="pt-1 text-center font-baloo text-xl">
                  {currentQuestion + 1} / {NumOfQuest}
                </Text>
                <Pressable>
                  <SvgIcon name="speaker" size={24} />
                </Pressable>
              </View>
            </View>

            <Quiz
              ref={quizRef}
              data={RandomQuestions.quests[currentQuestion]}
              onIncorrect={() => setIncorrectCount((c) => c + 1)}
              onResult={() => {
                setAnswered(true);
              }}
            />
            <View className="w-full flex-row justify-between gap-1">
              <CyanButton
                title={'retry'}
                className={`my-2 flex-1`}
                textStyle={`uppercase`}
                onPress={handleReset}
                disabled={!answered}
              />
              <SecondaryButton
                title={'next'}
                className={`my-2 flex-1`}
                textStyle={`uppercase`}
                onPress={handleNext}
                disabled={!answered}
              />
            </View>
          </View>
        </GradientView>
        <Modal
          backgroundStyle={{
            backgroundColor: isDark
              ? colors.background.dark.light
              : (colors.white.DEFAULT as string),
          }}
          ref={ref}
          snapPoints={['45%']}
          backdropComponent={() => null}
        >
          <ResultContent
            handleNext={() => {
              dismiss();
              router.push('/(games)/games');
            }}
            handleReset={handleTryAgain}
            point={reward}
          />
        </Modal>
      </View>
    </BottomBorder>
  );
};
