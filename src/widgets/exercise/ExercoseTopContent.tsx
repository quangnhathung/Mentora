import { ActivityIndicator, View } from 'react-native';

import { type Lesson } from '@/entities/lesson/types';
import { type Unit } from '@/entities/unit/types';
import { Image } from '@/shared/ui';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

type ExerciseTopContentProps = {
  unit: Unit;
  lesson: Lesson;
};

const ExerciseTopContent = ({ unit, lesson }: ExerciseTopContentProps) => {
  return (
    <View className="items-center">
      {unit && lesson ? (
        <>
          {unit.image && <Image source={unit.image} className="size-[--s-image]" />}
          <TextGradient
            className={`from-primary via-white to-primary py-2 text-center font-baloo text-2xl uppercase tracking-widest`}
            content={lesson.name ?? ''}
            locations={[0, 0.47, 1]}
          />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default ExerciseTopContent;
