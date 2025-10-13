import { memo } from 'react';
import Animated, { type SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { type Word } from '@/entities/audio/types';
import { colors, Text, View } from '@/shared/ui';

export const KaraokeText = memo(({ index, words }: { words: Word[]; index: number }) => {
  return (
    <View className={`w-full flex-row flex-wrap`}>
      {words.map((w, i) => (
        <Text className={`font-bevietnampro-bold`} key={`word-normal-${index}-${w.text}-${i}`}>
          {w.text}
          {i === words.length - 1 ? '' : ' '}
        </Text>
      ))}
    </View>
  );
});

const KaraokeWordAnimated = memo(
  ({
    word,
    index,
    active,
    timeSV,
    trackIndex,
    lastTrackIndex,
    isLast,
  }: {
    word: { text: string; start: number; end: number };
    index: number;
    timeSV: SharedValue<number>;
    lastTrackIndex: SharedValue<number>;
    trackIndex: number;
    isLast: boolean;
    active: boolean;
  }) => {
    const style = useAnimatedStyle(() => {
      const t = timeSV?.value;
      const dur = Math.max(0.001, word.end - word.start);
      const p = (t - word.start) / dur;
      const mainColor =
        p > 0 && active && trackIndex === lastTrackIndex.value
          ? colors.cyan.DEFAULT
          : colors.white.DEFAULT;
      return { color: mainColor };
    });

    return (
      <Animated.Text
        key={`hl-${index}`}
        className={`font-bevietnampro-bold text-sm`}
        style={[{}, style]}
      >
        {word.text}
        {isLast ? '' : ' '}
      </Animated.Text>
    );
  },
  (prev, next) => {
    // 🔒 Ngăn rerender khi chỉ có timeSV.value đổi (UI thread),
    // còn object SharedValue (timeSV) vẫn cùng tham chiếu
    if (prev.timeSV !== next.timeSV) return false;

    // So sánh các prop còn lại
    const sameWord =
      prev.word.text === next.word.text &&
      prev.word.start === next.word.start &&
      prev.word.end === next.word.end;

    return (
      sameWord &&
      prev.index === next.index &&
      prev.isLast === next.isLast &&
      prev.active === next.active
    );
  }
);

export const Karaoke = memo(function Karaoke({
  timeSV,
  trackIndex,
  lastTrackIndex,
  words,
  active,
}: {
  words: Word[];
  timeSV: SharedValue<number>;
  lastTrackIndex: SharedValue<number>;
  trackIndex: number;
  active: boolean;
}) {
  return (
    <View className={`w-full flex-row flex-wrap`}>
      {words.map((w, i) => (
        <KaraokeWordAnimated
          key={`word-${trackIndex}-${w.text}-${i}`}
          word={w}
          index={i}
          trackIndex={trackIndex}
          lastTrackIndex={lastTrackIndex}
          timeSV={timeSV}
          active={active}
          isLast={i === words.length - 1}
        />
      ))}
    </View>
  );
});
