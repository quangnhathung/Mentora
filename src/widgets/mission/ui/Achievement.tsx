import { AchieveTask } from '@/shared/Achievement-task-block';
import { View } from '@/shared/ui';

// {
// <AchiveTask target={4} currentProcess={1} topic={'wait'} />
// }

const achive = [
  { id: 1, target: 1, currentProcess: 0, topic: 'Family' },
  { id: 2, target: 1, currentProcess: 1, topic: 'Transport' },
  { id: 3, target: 1, currentProcess: 0, topic: 'Commic' },
  { id: 4, target: 1, currentProcess: 0, topic: 'Animals' },
  { id: 5, target: 1, currentProcess: 0, topic: 'Natural' },
  { id: 6, target: 1, currentProcess: 0, topic: 'Space' },
];

export const AchieveMission = () => {
  return (
    <View className="mt-3 w-full flex-col justify-center gap-2">
      {achive.map((item) => (
        <AchieveTask
          key={item.id}
          target={item.target}
          currentProcess={item.currentProcess}
          topic={item.topic}
        />
      ))}
    </View>
  );
};
