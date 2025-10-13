import { useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';

import { useLessonData } from '@/entities/lesson/model';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { ActivityIndicator, SafeAreaView, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { ExerciseHeader } from '@/widgets/exercise/ExerciseHeader';
import LessonPager from '@/widgets/lesson/LessonPager';

type LessonParams = {
  lid: string;
};

export default function LessonExercise() {
  // params
  const { lid: lessonId } = useLocalSearchParams<LessonParams>();
  const [currentIndex, setCurrentIndex] = useState(0);

  // fetch lesson steps (mocked + nested audio/quizzes)
  const { data: lessonDetailData, isLoading } = useLessonData.getLessonSectionById(
    parseInt(String(lessonId))
  )({
    variables: { id: parseInt(String(lessonId)) },
    enabled: Boolean(lessonId),
  });
  const lessonDetail = lessonDetailData?.data;

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
        '--s-header-bottom-radius': `${moderateScale(28)}px`,
        '--s-image': `${moderateScale(64)}px`,
        '--s-24': `${moderateScale(24)}px`,
      }),
    []
  );

  return (
    <TwoSectionHeader
      style={moderateSize}
      edges={[]}
      className={``}
      scrollable={false}
      // scrollable={Platform.OS === 'web'}
      containerClassName=""
      headerClassName="bg-background-dark-light rounded-b-[--s-header-bottom-radius] border-b-0"
      Header={
        lessonDetail && (
          <ExerciseHeader
            currentStep={currentIndex + 1}
            maxStep={lessonDetail.length}
            containerClassName="rounded-b-[--s-header-bottom-radius] bg-background-dark-light px-0"
          />
        )
      }
      Body={
        <View className="h-full">
          <View className="flex-1">
            {isLoading && (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
              </View>
            )}
            {!isLoading && lessonDetail && (
              <LessonPager steps={lessonDetail} onIndexChange={setCurrentIndex} />
            )}
          </View>
          <SafeAreaView edges={['bottom']} className={`bg-background-dark-light`} />
        </View>
      }
    />
  );
}
