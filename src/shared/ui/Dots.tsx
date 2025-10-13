import { View } from 'react-native';

export const Dots = ({ count = 0, active = 0 }) => {
  const dots = Array.from({ length: Math.max(0, count) });

  return (
    <View className="flex-row justify-center gap-1 pt-4">
      {dots.map((_, i) => (
        <View
          key={`dot-${i}`}
          className={`rounded-full ${i === active ? 'h-[7px] w-[30px] bg-secondary' : 'size-[7px] bg-white'}`}
        />
      ))}
    </View>
  );
};
