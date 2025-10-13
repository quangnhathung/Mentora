import { router } from 'expo-router';
import { useColorScheme, vars } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

import { vocabTopicsData } from '@/entities/games/FindWords/mock';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Modal, Pressable, Text, useModal, View } from '@/shared/ui';
import { type CountdownBarRef } from '@/shared/ui/CountdownBar';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import { ResultContent } from '@/widgets/games/Result';
import Slide from '@/widgets/games/WordSlide/Slide';
import { type WordSlideRef } from '@/widgets/games/WordSlide/Slide';

import { getRandomItems } from '../useRandomQuest';

type props = {
  level: string;
  isTimeout: boolean;
  onEnd: () => void;
  onTryAgain: () => void;
  countdownBarRef: React.RefObject<CountdownBarRef>;
};

export const WordSlide = ({ level, isTimeout, countdownBarRef, onTryAgain, onEnd }: props) => {
  const SlideRef = useRef<WordSlideRef>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // 0-based current quest index
  const [currentQuest, setCurrentQuest] = useState<number>(0);

  const moderateSize = vars({
    '--c-150': `${moderateScale(150)}px`,
    '--c-50': `${moderateScale(50)}px`,
  });

  const SCREEN_H = Dimensions.get('window').height;

  // helper: random topic
  const randomTopic = () => vocabTopicsData[Math.floor(Math.random() * vocabTopicsData.length)];

  // topic state (object)
  const [data, setData] = useState(() => randomTopic());
  const vocabs = data.options;

  const VocabQuantity = level === '5' ? 3 : level === '10' ? 4 : 5;
  const NumOfQuest = level === '5' ? 3 : level === '10' ? 5 : 7;
  const GameHeight = Platform.OS === 'web' ? 0.93 : 0.6;

  // console.log(GameHeight);

  // const [totalCount] = useState(VocabQuantity);

  const { ref, present, dismiss } = useModal();
  const [end, setEnd] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [randomWords, setRandomWords] = useState<string[]>([]);

  // generate random words when topic changes OR when currentQuest changes (tùy bạn)
  useEffect(() => {
    if (!data) return;
    const newWords = getRandomItems(
      vocabs.map((v: any) => v.vocabulary),
      VocabQuantity
    );
    setRandomWords(newWords);
  }, [data, VocabQuantity, currentQuest, vocabs]);

  useEffect(() => {
    if (end) {
      onEnd();
    }
  }, [end, onEnd]);

  // --- NOTE: ĐÃ BỎ effect từng gọi onTryAgain tự động ---
  // nếu cần parent biết khi user try again, call onTryAgain() trong handleTryAgain

  const handleTryAgain = () => {
    dismiss();
    countdownBarRef?.current?.reset();
    setEnd(false);
    setIsCompleted(false); // thêm dòng này

    setData(randomTopic());
    setCurrentQuest(0);
    SlideRef.current?.reset();
    onTryAgain();
  };

  useEffect(() => {
    if (isCompleted) {
      // nếu là màn cuối (0-based) hoặc timeout -> end
      if (currentQuest === NumOfQuest - 1) {
        countdownBarRef.current?.pause();
        present();
        setEnd(true);
      } else {
        // next quest: reset slide và tăng index
        setIsCompleted(false);
        setEnd(false);
        SlideRef.current?.reset();
        setCurrentQuest((prev) => prev + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, isTimeout, currentQuest, NumOfQuest, present, countdownBarRef]);

  useEffect(() => {
    if (isTimeout) {
      countdownBarRef.current?.pause();
      present();
      setEnd(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, isTimeout, currentQuest, NumOfQuest, present, countdownBarRef]);

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
          <View className="flex-row items-center justify-between">
            <View className="justify-between">
              <Text className="font-bevietnampro dark:text-cyan">Topic</Text>
              <Text className="font-baloo text-2xl">{data.text}</Text>
            </View>
            <View className="flex-row items-center justify-center gap-2">
              <Text className="pt-1 text-center font-baloo text-2xl">
                {/* display 1-based to user */}
                {currentQuest + 1}/{NumOfQuest}
              </Text>
              <Pressable>
                <SvgIcon name="speaker" size={24} />
              </Pressable>
            </View>
          </View>

          <View className="flex-row items-center justify-between py-3">
            <SvgIcon name="Secondary_button_play" className="flip-x" />
            <View style={{ height: SCREEN_H * GameHeight }} className="flex-1 px-3">
              <Slide
                ref={SlideRef}
                onCompleted={() => {
                  setIsCompleted(true);
                }}
                words={randomWords}
              />
            </View>
            <SvgIcon name="Secondary_button_play" className="-scale-x-100" />
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
