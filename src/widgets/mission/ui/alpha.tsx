import { AlphaBlock } from '@/shared/AlphaBlock';
import { View } from '@/shared/ui';

{
  /* <TaskBlock
        title={'daily.missions.collectStars'}
        isCompleted={true}
        isfail={false}
        target={12}
        currentProcess={4}
        pointsReward={20}
      />
      <Countdown /> */
}

const tasks = [
  { id: 1, value: 'T' },
  { id: 2, value: '' },
  { id: 3, value: '' },
  { id: 4, value: '' },
  { id: 5, value: '' },
  { id: 6, value: '' },
  { id: 7, value: '' },
];

export const AchivementCompleted = () => {
  return (
    <View className="w-full flex-row justify-center gap-1">
      {tasks.map((AchiveComplete) => (
        <AlphaBlock key={AchiveComplete.id} value={AchiveComplete.value} />
      ))}
    </View>
  );
};
