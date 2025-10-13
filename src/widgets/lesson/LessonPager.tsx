import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { type Lesson } from '@/entities/lesson/types';
import { usePlayer } from '@/shared/lib/hooks/usePlayer';
import { usePlayerStore } from '@/shared/lib/storage/player/usePlayerStore';
import { View } from '@/shared/ui';
import { PagingDots } from '@/shared/ui';
import AudioPlaylist, { type AudioPlaylistRef } from '@/shared/ui/Player/AudioPlaylist';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import LessonDialog from '@/widgets/lesson/LessonDialog';

type LessonPagerProps = {
  steps: Lesson[];
  onIndexChange?: (index: number) => void; // zero-based
};

const LessonPager = ({ steps, onIndexChange }: LessonPagerProps) => {
  const scrollRef = useRef<any>(null);
  const playerRef = useRef<AudioPlaylistRef>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [waitingForAnswer, setWaitingForAnswer] = useState(true);
  const { trackIndex, setTrackIndex } = usePlayerStore();
  const [disableImmediately, setDisableImmediately] = useState(false);

  // const [chainStopped, setChainStopped] = useState(false);

  // audio player is per page; create one and replace source
  const currentSegments = steps.at(pageIndex)?.segments ?? [];
  const source = steps.at(pageIndex)?.segments![0]?.source;
  const audio = usePlayer(source ?? '');
  const isLastTrack = trackIndex >= currentSegments.length - 1;

  // Xử lý phát track mới khi trackIndex thay đổi
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (trackIndex >= 0) {
      const source = steps.at(pageIndex)?.segments![trackIndex]?.source;
      audio.player.replace({ uri: source });

      const id = setTimeout(() => {
        audio.play(trackIndex);
      }, 10);

      return () => {
        clearTimeout(id);
      };
    }
  }, [trackIndex]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Clear the immediate disabled state once we have the latest playing status
    if (disableImmediately) {
      setDisableImmediately(false);
    }
  }, [audio.status.playing]);

  const startWaitingForAnswer = useCallback(() => setWaitingForAnswer(true), []);
  const endWaitingForAnswer = useCallback(() => setWaitingForAnswer(false), []);
  const { width: screenWidth } = useWindowDimensions();

  const goTo = useCallback(
    (to: number) => {
      if (to < 0 || to >= steps.length) return;
      scrollRef.current?.scrollTo({ x: screenWidth * to, y: 0, animated: true });
      setPageIndex(to);
      onIndexChange?.(to);
      setTrackIndex(0);
      // setChainStopped(false);
      startWaitingForAnswer();
    },
    [onIndexChange, screenWidth, steps.length, startWaitingForAnswer]
  );

  const next = useCallback(() => {
    goTo(pageIndex + 1);
  }, [goTo, pageIndex]);

  // const autoAdvanceOnCorrect = useCallback(() => {
  //   // reveal first, then move on
  //   endWaitingForAnswer();
  //   setTimeout(next, 700);
  // }, [endWaitingForAnswer, next]);

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const newIndex = Math.round(x / screenWidth);
      if (newIndex !== pageIndex) {
        setPageIndex(newIndex);
        onIndexChange?.(newIndex);
        startWaitingForAnswer();
      }
    },
    [pageIndex, onIndexChange, screenWidth, startWaitingForAnswer]
  );

  // Reset active item to 0 when page changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setTrackIndex(0);
    // setChainStopped(false);
  }, [pageIndex]);

  const renderItem = (item: Lesson, index: number) => {
    let content: React.ReactNode = null;
    // switch (item.quiz?.type) {
    //   case QuizType.SINGLE_CHOICE:
    //     content = (
    //       <SingleChoiceQuiz
    //         quiz={item.quiz}
    //         showAnswer={!waitingForAnswer}
    //         play={play}
    //         startWaitingForAnswer={startWaitingForAnswer}
    //         onAnswerSelected={({ isCorrect }) => {
    //           if (pageIndex === index && isCorrect) autoAdvanceOnCorrect();
    //         }}
    //       />
    //     );
    //     break;
    //   case QuizType.TRUE_FALSE:
    //     content = (
    //       <TrueFalseQuiz
    //         quiz={item.quiz}
    //         showAnswer={!waitingForAnswer}
    //         play={play}
    //         startWaitingForAnswer={startWaitingForAnswer}
    //         onAnswerSelected={({ isCorrect }) => {
    //           if (pageIndex === index && isCorrect) autoAdvanceOnCorrect();
    //         }}
    //       />
    //     );
    //     break;
    //   case QuizType.FINDING_ERRORS:
    //     content = (
    //       <FindingErrorsQuiz
    //         quiz={item.quiz}
    //         showAnswer={!waitingForAnswer}
    //         play={play}
    //         startWaitingForAnswer={startWaitingForAnswer}
    //       />
    //     );
    //     break;
    //   case QuizType.FINDING_SYNONYM:
    //     content = (
    //       <FindingSynonymQuiz
    //         quiz={item.quiz}
    //         showAnswer={!waitingForAnswer}
    //         play={play}
    //         startWaitingForAnswer={startWaitingForAnswer}
    //       />
    //     );
    //     break;
    //   case QuizType.CHOOSE_TO_FILL_THE_BLANKS:
    //     content = (
    //       <ChooseToFillTheBlanksQuiz
    //         quiz={item.quiz}
    //         showAnswer={!waitingForAnswer}
    //         startWaitingForAnswer={startWaitingForAnswer}
    //       />
    //     );
    //     break;
    //   default:
    //     break;
    // }

    const isCurrentPage = index === pageIndex;
    const segments = item.segments!;
    const activeIdx = isCurrentPage ? trackIndex : 0;

    const sources: string[] = isCurrentPage ? segments.map((segment) => segment.source) : [];

    return (
      <View
        className={`h-full rounded-2xl p-4 ${Platform.OS === 'web' ? 'w-screen md:w-full md:max-w-screen-md' : 'w-screen'}`}
      >
        {/* Header Audio Player (waveform) */}
        {isCurrentPage ? (
          <AudioPlaylist
            ref={playerRef}
            audio={audio}
            pageIndex={pageIndex}
            image={item.image!}
            sources={sources}
            onReplay={() => {
              audio.stop();
              setTrackIndex(0);
            }}
          />
        ) : // <PlayerOverlay image={item.image!} />
        null}

        {/* Audio list without waveform; tap speaker sets active item */}
        <LessonDialog
          image={item.image!}
          timeSV={playerRef.current?.timeSV!}
          lastTrackIndex={playerRef.current?.lastTrackIndex!}
          isCurrentPage={isCurrentPage}
          activeSegmentIndex={activeIdx}
          pageIndex={pageIndex}
          segmentId={item.id!}
          data={segments}
          onRequestPlay={(i) => {
            if (!isCurrentPage) return;
            // setChainStopped(true); // manual choice pauses chaining until Replay
            audio.stop();
            setTrackIndex(i);
          }}
          activeIndex={isCurrentPage ? activeIdx : -1}
        />
        {content}
      </View>
    );
  };

  return (
    <View className={`flex-1`}>
      {/* Paging dots */}
      <PagingDots
        count={steps.length}
        index={pageIndex}
        disabled={waitingForAnswer}
        onPress={(i) => {
          if (!waitingForAnswer) goTo(i);
        }}
      />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        scrollEnabled={!waitingForAnswer}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
      >
        {steps.map((s, i) => (
          <View className={``} key={s.id ?? i}>
            {renderItem(s, i)}
          </View>
        ))}
      </ScrollView>
      <View
        className={`absolute bottom-0 w-full items-center justify-center rounded-t-xl bg-background-dark-light px-4 py-3`}
      >
        <PrimaryButton
          title={
            isLastTrack ? 'Next' : isLastTrack && waitingForAnswer ? 'See Answer' : 'Next Step'
          }
          className={`w-full`}
          textStyle={`uppercase`}
          disabled={disableImmediately || audio.status.playing}
          onPress={() => {
            setDisableImmediately(true);
            // if (lockedByAudio) return;
            if (isLastTrack && waitingForAnswer) endWaitingForAnswer();
            else {
              const nextTrack = trackIndex + 1;
              if (nextTrack < currentSegments.length) {
                setTrackIndex(nextTrack);
              } else {
                next();
              }
            }
          }}
        />
      </View>
    </View>
  );
};

export default LessonPager;
