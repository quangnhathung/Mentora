import { router } from 'expo-router';
import { useColorScheme, vars } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';

import { vocabTopicsData } from '@/entities/games/FindWords/mock';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Modal, Pressable, Text, useModal, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { type CountdownBarRef } from '@/shared/ui/CountdownBar';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import { Matrix } from '@/widgets/games/FindTheWords/matrix';
import { ResultContent } from '@/widgets/games/Result';

import { getRandomItems } from '../useRandomQuest';

type props = {
  level: string;
  isTimeout: boolean;
  onCompleted: () => void;
  onTryAgain: () => void;
  countdownBarRef: React.RefObject<CountdownBarRef>;
};

export const FindTheWord = ({
  level,
  isTimeout,
  countdownBarRef,
  onTryAgain,
  onCompleted,
}: props) => {
  const moderateSize = vars({
    '--c-150': `${moderateScale(150)}px`,
    '--c-50': `${moderateScale(50)}px`,
  });

  const randomTopic = () => vocabTopicsData[Math.floor(Math.random() * vocabTopicsData.length)];

  const [data, setData] = useState(() => randomTopic());
  const vocabs = data.options;

  const [seed, setSeed] = useState(0);
  const VocabQuantity = level === '5' ? 4 : level === '10' ? 6 : 8;
  const NumOfRow = level === '5' ? 6 : level === '10' ? 6 : 7;
  const [foundCount, setFoundCount] = useState(0);
  const [totalCount] = useState(VocabQuantity);

  const { ref, present, dismiss } = useModal();
  const [completed, setCompleted] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [randomWords, setRandomWords] = useState<string[]>([]);

  useEffect(() => {
    const newWords = getRandomItems(
      vocabs.map((v: any) => v.vocabulary),
      VocabQuantity
    );
    setRandomWords(newWords);
  }, [data, VocabQuantity, seed, vocabs]);

  // khi hoàn thành thành công
  useEffect(() => {
    if (completed) {
      onCompleted();
    }
  }, [completed, onCompleted]);

  const prevIsTimeoutRef = useRef<boolean>(false);
  useEffect(() => {
    const becameTimeout = isTimeout && !prevIsTimeoutRef.current;
    if ((totalCount > 0 && foundCount === totalCount) || becameTimeout) {
      setCompleted(true);
      countdownBarRef.current?.pause();
      present();
    }
    prevIsTimeoutRef.current = isTimeout;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundCount, totalCount, isTimeout]);

  const handleTryAgain = () => {
    // đóng modal
    dismiss();
    // reset counts & UI
    setFoundCount(0); // reset về 0
    countdownBarRef?.current?.reset?.();
    setCompleted(false);
    // random topic + force remount matrix
    setData(randomTopic());
    setSeed((s) => s + 1);
    // báo cho cha xử lý (ví dụ: reset isTimeout ở cha)
    try {
      onTryAgain();
    } catch {
      // ignore if parent handler absent
    }
  };

  // nếu hoàn thành thì hiện Result modal (đã xử lý ở useEffect)
  const reward = isTimeout ? 0 : Number(level);

  return (
    <BottomBorder className="border-custom-5 w-full">
      <View className="w-full items-center justify-center">
        <GradientView
          colors={['primary-dark', 'primary', 'primary-light']}
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
                <Text className="font-baloo text-2xl">{data.text}</Text>
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <Text className="pt-1 text-center font-baloo text-2xl">
                  {foundCount}/{totalCount}
                </Text>
                <Pressable>
                  <SvgIcon name="speaker" size={24} />
                </Pressable>
              </View>
            </View>
            <Matrix
              key={seed}
              rows={NumOfRow}
              cols={5}
              words={randomWords}
              onFoundCountChange={(found) => {
                setFoundCount(found);
              }}
            />
          </View>
        </GradientView>

        <Modal
          backgroundStyle={{
            backgroundColor: isDark
              ? colors.background.dark.light
              : (colors.white.DEFAULT as string),
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
    </BottomBorder>
  );
};
