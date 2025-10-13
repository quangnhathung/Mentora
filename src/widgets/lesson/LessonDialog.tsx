import React from 'react';
import {
  FlatList,
  type ListRenderItemInfo,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import { type Audio } from '@/entities/audio/types';
import { Karaoke, KaraokeText } from '@/features/lesson/ui/Karaoke';
import { useSelectedLanguage } from '@/shared/lib';
import useTranslation from '@/shared/lib/hooks/useTranslation';
import { usePlayerStore } from '@/shared/lib/storage/player/usePlayerStore';
import { type Translation } from '@/shared/types';
import { Image, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import IconButton from '@/shared/ui/IconButton';

const VISIBLE_OPACITY = 1;
const HIDDEN_OPACITY = 0;
const OPACITY_DURATION = 180;

type LessonDialogItemProps = {
  item: Audio;
  index: number;
  image: string;
  trackIndex: number | null | undefined;
  isCurrentPage: boolean;
  timeSV: SharedValue<number>;
  lastTrackIndex: SharedValue<number>;
  isTranslatingId: number | null | undefined;
  startTranslation: (id: number) => void;
  stopTranslation: () => void;
  language: string;
  onRequestPlay?: (index: number) => void;
};

const LessonDialogItem = React.memo(
  ({
    item,
    index,
    image,
    trackIndex,
    isCurrentPage,
    timeSV,
    lastTrackIndex,
    isTranslatingId,
    startTranslation,
    stopTranslation,
    language,
    onRequestPlay,
  }: LessonDialogItemProps) => {
    const hasActive = isCurrentPage && trackIndex != null;
    const activeIndex = trackIndex ?? 0;
    const targetOpacity = hasActive
      ? index <= activeIndex
        ? VISIBLE_OPACITY
        : HIDDEN_OPACITY
      : VISIBLE_OPACITY;
    const opacity = useSharedValue(targetOpacity);

    React.useEffect(() => {
      // [WHY] Fade visibility to reveal the current dialog line and any that follow, hiding prior lines.
      opacity.value = withTiming(targetOpacity, {
        duration: OPACITY_DURATION,
      });
    }, [opacity, targetOpacity]);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    const translationStr = item.translations.find((translation: Translation) => {
      return translation.lang === language;
    });

    return (
      <TouchableWithoutFeedback>
        <Animated.View style={[animatedStyle]}>
          <BottomBorder className={`border-custom-5 flex-1 rounded-2xl`}>
            <View className={twMerge(`flex-1 flex-row rounded-2xl bg-background-dark-light`)}>
              {image && item.isNarrator && (
                <View className={`flex-1`}>
                  <Image
                    source={{ uri: image }}
                    contentFit="cover"
                    className="h-[200px] w-full rounded-2xl"
                  />
                </View>
              )}
              <View
                className={`w-full flex-col p-3 ${item.isNarrator && 'absolute bottom-0 bg-black/80'}`}
              >
                <View className="">
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-white dark:text-primary">{item.character?.name}</Text>

                    <View className="flex-row gap-1">
                      <IconButton
                        iconName="translation"
                        size={18}
                        onPressIn={() => startTranslation(item.id)}
                        onPressOut={stopTranslation}
                      />
                      <IconButton
                        iconName="play_sound"
                        size={18}
                        onPress={() => {
                          onRequestPlay?.(index);
                        }}
                      />
                    </View>
                  </View>

                  <View className="flex-row flex-wrap">
                    {isTranslatingId !== item.id ? (
                      hasActive && trackIndex === index && isCurrentPage ? (
                        <Karaoke
                          timeSV={timeSV}
                          lastTrackIndex={lastTrackIndex}
                          trackIndex={trackIndex}
                          words={item.words}
                          active
                        />
                      ) : (
                        <KaraokeText words={item.words} index={index} />
                      )
                    ) : (
                      <Text className="font-bevietnampro-semibold text-sm">
                        {translationStr?.text}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </BottomBorder>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
);

LessonDialogItem.displayName = 'LessonDialogItem';

type LessonDialogProps = {
  image: string;
  segmentId: number;
  activeSegmentIndex: number;
  pageIndex: number;
  timeSV: SharedValue<number>;
  lastTrackIndex: SharedValue<number>;
  isCurrentPage: boolean;
  data: Audio[];
  activeIndex?: number;
  onRequestPlay?: (index: number) => void;
};

const LessonDialog = ({
  image,
  segmentId,
  timeSV,
  lastTrackIndex,
  isCurrentPage,
  onRequestPlay,
  data,
}: LessonDialogProps) => {
  const { language } = useSelectedLanguage();
  const { isTranslating, start, stop } = useTranslation();
  const listRef = React.useRef<FlatList<Audio>>(null);
  const [listHeight, setListHeight] = React.useState(0);
  const { trackIndex } = usePlayerStore();

  // Auto-scroll to activeIndex controlled by parent (ExercisePager)
  React.useEffect(() => {
    if (trackIndex == null || trackIndex < 0 || trackIndex >= data.length) return;
    listRef.current?.scrollToIndex({ index: trackIndex, animated: true, viewPosition: 0.5 });
  }, [trackIndex, data.length]);

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<Audio>) => (
      <LessonDialogItem
        item={item}
        index={index}
        image={image}
        trackIndex={trackIndex}
        isCurrentPage={isCurrentPage}
        timeSV={timeSV}
        lastTrackIndex={lastTrackIndex}
        isTranslatingId={isTranslating}
        startTranslation={start}
        stopTranslation={stop}
        language={language}
        onRequestPlay={onRequestPlay}
      />
    ),
    [
      image,
      isCurrentPage,
      isTranslating,
      language,
      lastTrackIndex,
      onRequestPlay,
      start,
      stop,
      timeSV,
      trackIndex,
    ]
  );

  return (
    <View
      className={`${Platform.OS === 'web' ? 'h-screen' : 'flex-1'}`}
      onLayout={(event) => {
        setListHeight(event.nativeEvent.layout.height);
      }}
    >
      <FlatList
        ref={listRef}
        keyExtractor={(item) => `text-${segmentId}-${item.id}`}
        data={data}
        horizontal={false}
        nestedScrollEnabled
        scrollEnabled
        ItemSeparatorComponent={() => <View className="h-2" />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: listHeight > 0 ? listHeight / 2 : 0,
        }}
        // Keep bottom spacing on native so content isn't under the floating footer; web gets page padding
        ListFooterComponent={
          Platform.OS !== 'web' ? <View className={`h-[85px]`} /> : <View className={`h-[550px]`} />
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default LessonDialog;
