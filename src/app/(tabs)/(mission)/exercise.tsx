import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';

import { getDailyVocab, vocabDailyList } from '@/entities/mission/mock/vocab';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Text } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';

const pool = [...vocabDailyList];
const data = getDailyVocab(pool, 10); // 10 vocab cố định trong ngày theo timezone Asia/Ho_Chi_Minh

export type VocabDaily = {
  id?: string;
  vocaulary?: string;
  meaning?: string;
  ipa?: string;
  Example?: string;
};

const MissionExerciseScreen = () => {
  const [answer, setAnswer] = useState('');
  const [_, setIsCorrect] = useState(false);
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  const [Current, setCurrent] = useState<number>(0);
  useHideTabBar();

  const total = data.length;
  const handleNext = () => {
    setCurrent((prev) => {
      if (prev < total - 1) return prev + 1;
      else {
        router.replace('/(tabs)/(mission)/congratulate');
      }
      return prev;
    });
  };

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === data[Current].vocaulary?.toLowerCase()) {
      setIsCorrect(true);
      handleNext();
    } else {
      setIsCorrect(false);
      alert('Ẹccccc!');
    }
  };

  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <View className="W-full items-center pt-[2rem]">
          <Text className="font-baloo text-2xl dark:text-navbar-active">Daily Mission</Text>
        </View>
      }
      Body={
        <View className="flex-1 items-center justify-center px-5">
          <View className="w-[280px]">
            <Text className="text-center text-[20px]">
              Vượt qua kiểm tra với tiến độ 10/10 để checkin thành công
            </Text>
          </View>
          <View
            style={{ height: 395 }}
            className="mt-2 w-full flex-col justify-between rounded-3xl border px-3 pt-4"
          >
            <Text className="text-center text-3xl font-bold">{data[Current].meaning}</Text>
            <View className="flex-1 items-center justify-center">
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                placeholder=".........................."
                placeholderTextColor="black"
                className="w-4/5 rounded-xl p-3 text-center text-2xl"
                style={{
                  textAlign: 'center',
                  includeFontPadding: false,
                }}
              />
            </View>
            <SecondaryButton
              title={'Check!'}
              className={`my-2`}
              textStyle={`uppercase`}
              onPress={checkAnswer}
            />
          </View>
        </View>
      }
      Bottom={
        <>
          <View className="px-3 pb-2">
            <Text className="m-0 p-0 text-center dark:text-[#9CA3AF]">Not ready?</Text>
            <SecondaryButton
              title={'Practice again!'}
              className={`my-2`}
              textStyle={`uppercase`}
              onPress={() => {
                router.replace('/(tabs)/(mission)/checkin');
              }}
            />
          </View>
        </>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(MissionExerciseScreen));
