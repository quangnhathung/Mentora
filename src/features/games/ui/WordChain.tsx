import { router } from 'expo-router';
import { useColorScheme, vars } from 'nativewind';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions } from 'react-native';

import { WordChainMock } from '@/entities/games/WordChain/mock';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Modal, Pressable, Text, useModal, View } from '@/shared/ui';
import { type CountdownBarRef } from '@/shared/ui/CountdownBar';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import { ResultContent } from '@/widgets/games/Result';
import { Cross, type CrossRef } from '@/widgets/games/WordChain/Cross';

import { getRandomItems } from '../useRandomQuest';

type Props = {
  level: string;
  isTimeout: boolean;
  onEnd: () => void;
  onTryAgain: () => void;
  countdownBarRef: React.RefObject<CountdownBarRef>;
};

export const WordChain = ({ level, isTimeout, countdownBarRef, onTryAgain, onEnd }: Props) => {
  const crossRef = useRef<CrossRef>(null); // ✅ đổi tên để tránh nhầm lẫn với component Cross
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuest, setCurrentQuest] = useState(0);

  const moderateSize = vars({
    '--c-150': `${moderateScale(150)}px`,
    '--c-50': `${moderateScale(50)}px`,
  });

  const SCREEN_H = Dimensions.get('window').height;

  // số lượng màn dựa vào level
  const NumOfQuest = level === '5' ? 3 : level === '10' ? 4 : 5;

  const [seed, setSeed] = useState(0);
  const data = useMemo(() => {
    return getRandomItems(WordChainMock, NumOfQuest);
  }, [NumOfQuest, seed]);

  const { ref, present, dismiss } = useModal();
  const [end, setEnd] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Khi end chuyển true => thông báo parent
  useEffect(() => {
    if (end) {
      onEnd();
    }
  }, [end, onEnd]);

  // Reset khi bấm try again
  const handleTryAgain = () => {
    dismiss();
    countdownBarRef?.current?.reset();
    setEnd(false);
    setIsCompleted(false);
    setCurrentQuest(0);
    crossRef.current?.reset();
    setSeed((prev) => prev + 1);
    onTryAgain();
  };

  // Khi hoàn thành 1 màn
  useEffect(() => {
    if (!isCompleted) return;

    if (currentQuest === NumOfQuest - 1 || isTimeout) {
      countdownBarRef.current?.pause();
      present();
      setEnd(true);
    } else {
      setIsCompleted(false);
      setEnd(false);
      crossRef.current?.reset();
      setCurrentQuest((prev) => prev + 1);
    }
  }, [isCompleted, NumOfQuest, countdownBarRef, currentQuest, isTimeout, present]);

  useEffect(() => {
    if (isTimeout) {
      countdownBarRef.current?.pause();
      present();
      setEnd(true);
    }
  }, [isTimeout, countdownBarRef, present]);

  // useEffect(() => {
  //   if (data.length > 0 && data[currentQuest]) {
  //     console.log('current quest data:', data[currentQuest]);
  //     console.log('complete:', isCompleted);
  //     console.log('step: ', currentQuest);
  //   }
  // }, [data, currentQuest, isCompleted]);

  const reward = isTimeout ? 0 : Number(level);

  return (
    <View className="w-full items-center justify-center pt-2">
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
          <View className="flex-row items-center justify-end">
            <View className="flex-row items-center justify-center gap-2">
              <Text className="pt-1 text-center font-baloo text-2xl">
                {currentQuest + 1}/{NumOfQuest}
              </Text>
              <Pressable>
                <SvgIcon name="speaker" size={24} />
              </Pressable>
            </View>
          </View>

          <View
            style={{ height: SCREEN_H * 0.6 }}
            className="flex-row items-center justify-between py-3"
          >
            {data && data[currentQuest] ? (
              <Cross
                ref={crossRef}
                onCompleted={() => setIsCompleted(true)}
                words={data[currentQuest].vocabs}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </View>
      </GradientView>

      <Modal
        backgroundStyle={{
          backgroundColor: isDark ? colors.background.dark.light : (colors.white.DEFAULT as string),
        }}
        enablePanDownToClose={false}
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
  );
};
