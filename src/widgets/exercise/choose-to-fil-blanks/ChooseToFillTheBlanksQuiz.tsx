// ChooseToFillTheBlanksQuiz.tsx
import throttle from 'lodash.throttle';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Gesture, GestureDetector, Pressable } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import {
  type ChooseToFillTheBlanksQuizContent,
  type ChooseToFillTheBlanksQuizWord,
} from '@/entities/quizzes/choose-to-fil-blanks/types';
import { type Quiz } from '@/entities/quizzes/types';
import { BaseChoiceStatus } from '@/shared/enum';
import { translate } from '@/shared/lib';
import { Text, View } from '@/shared/ui';
import TextQuizChoice from '@/shared/ui/TextQuizChoice';

import MovingWord from './MovingWord';

export type DraggableWordProps = {
  word: ChooseToFillTheBlanksQuizWord;
  onPress: () => void;
  onDrop: () => boolean;
  isUsed: boolean;
};

export const DraggableWord = forwardRef<View, DraggableWordProps>(
  ({ word, isUsed, onPress, onDrop }, ref) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedX = useSharedValue(0);
    const savedY = useSharedValue(0);
    const zIndex = useSharedValue(1);

    const handleDrop = useCallback(() => {
      const dropped = onDrop();
      console.log('Dropped:', dropped);

      if (!dropped) {
        // reset vị trí khi không drop được
        savedX.value = 0;
        savedY.value = 0;
        translateX.value = 0;
        translateY.value = 0;
        zIndex.value = 1;
      }
    }, []);

    const panGesture = Gesture.Pan()
      .onStart(() => {
        savedX.value = translateX.value;
        savedY.value = translateY.value;
        zIndex.value = 99999;
      })
      .onUpdate((event) => {
        console.log(event.absoluteX, event.absoluteY);
        translateX.value = savedX.value + event.translationX;
        translateY.value = savedY.value + event.translationY;
      })
      .onEnd(() => {
        // runOnJS(onDrop)(word.id)
        runOnJS(handleDrop)();
        // savedX.value = 0;
        // savedY.value = 0;
        // translateX.value = 0;
        // translateY.value = 0;
        // zIndex.value = 1;
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
      zIndex: zIndex.value,
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle]} ref={ref}>
          <TextQuizChoice
            containerClassName={isUsed ? 'hidden' : ''}
            text={word.text}
            onPress={onPress}
          />
          {/* <View style={[{ backgroundColor: 'green' }]} ref={ref} /> */}
        </Animated.View>
      </GestureDetector>
    );
  }
);

export type MovingRecord = {
  wordId: number;
  // text: string;
  blankKey: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type ChooseToFillTheBlanksQuizProps = {
  quiz: Quiz;
  showAnswer?: boolean;
  startWaitingForAnswer: () => void;
  // play: (audioSource?: string, audioId?: number) => void;
  // lockByQuiz: () => void;
};

const ChooseToFillTheBlanksQuiz = ({
  quiz,
  showAnswer = false,
  startWaitingForAnswer,
  // lockByQuiz,
}: ChooseToFillTheBlanksQuizProps) => {
  // console.log('re-render ChooseToFillTheBlanksQuiz');
  // useEffect(() => {
  //   console.log('MOUNT ChooseToFillTheBlanksQuiz');

  //   return () => {
  //     console.log('UNMOUNT ChooseToFillTheBlanksQuiz');
  //   };
  // }, []);

  // data
  const quizContent = quiz?.content as ChooseToFillTheBlanksQuizContent;

  const [wordList] = useState<ChooseToFillTheBlanksQuizWord[]>(quizContent?.wordList);

  // Thứ tự các blank sẽ được điền
  const [blankKeysOrder, setBlankOrder] = useState<string[]>([]);
  // Quản lý các blank (questionId_-extId → word.text)
  const [filledBlanks, setFilledBlanks] = useState<{ [key: string]: string }>({});

  // refs
  const containerRef = useRef<View | null>(null);
  const wordListRefs = useRef<{ [key: string]: View | null }>({});
  const blankRefs = useRef<{ [key: string]: View | null }>({});

  // Toàn bộ thông tin của từ đang di chuyển
  // const [currentMovingRecord, setCurrentMovingRecord] = useState<MovingRecord | null>(null);
  const currentMovingRecord = useSharedValue<MovingRecord | null>(null);
  const [currentMovingText, setCurrentMovingText] = useState<string | null>(null);

  // Danh sách từ đã dùng
  const [usedWordIds, setUsedWordIds] = useState<number[]>([]);

  // ################## HANDLERS
  useEffect(() => {
    startWaitingForAnswer();
  }, []);

  useEffect(() => {
    const order: string[] = [];
    quizContent?.questions.forEach((q) => {
      q.sentenceTexts.forEach((t) => {
        if (t.isBlank) order.push(`${q.id}-${t.id}`);
      });
    });
    setBlankOrder(order);
  }, [quizContent]);

  // ################## HANDLERS
  const chooseHandler = (wordFromWordListId: number, blankKey: string) => {
    // lock
    if (currentMovingRecord.value) return;

    const wordFromWordList = wordList.find((w) => w.id === wordFromWordListId);
    if (!wordFromWordList) return;

    const parentContainerNode = containerRef.current;
    const wordNode = wordListRefs.current[wordFromWordListId];
    const blankNode = blankRefs.current[blankKey];

    if (!wordNode || !blankNode || !parentContainerNode) {
      console.warn('[handlePressWord] missing refs');
      return;
    }

    (wordNode as any).measureInWindow((wx: number, wy: number, ww: number) => {
      (parentContainerNode as any).measureInWindow((px: number, py: number) => {
        (blankNode as any).measureInWindow((bx: number, by: number, bw: number) => {
          // Lấy tọa độ bắt đầu tương đối của chữ
          const startWordRelativeX = wx - px;
          const startWordRelativeY = wy - py;

          // Lấy tọa độ kết thúc tương đối của chữ và căn giữa
          const endWordRelativeX = bx - px + (bw - ww) / 2;
          const endWordRelativeY = by - py;

          // Tạo phiên bay
          currentMovingRecord.value = {
            wordId: wordFromWordListId,
            // text: wordFromWordList.text,
            blankKey,
            startX: startWordRelativeX,
            startY: startWordRelativeY,
            endX: endWordRelativeX,
            endY: endWordRelativeY,
          };
          setCurrentMovingText(wordFromWordList.text);
        });
      });
    });
  };

  // runOnJS
  const endChoosingHandler = () => {
    // console.log('endChoosingHandler', currentMovingRecord.value);
    if (!currentMovingRecord.value) return;

    const { wordId, blankKey } = currentMovingRecord.value;

    const chosenWordFromWordList = wordList.find((w) => w.id === wordId)?.text;
    if (!chosenWordFromWordList) return;

    // Đã đặt vào blank => lưu lại quản lý
    setFilledBlanks((prev) => ({
      ...prev,
      [blankKey]: chosenWordFromWordList,
    }));

    // Kêt thúc phiên bay
    currentMovingRecord.value = null;
    setCurrentMovingText(null);

    // setCurrentMovingRecord(null);
  };

  // runOnJs
  const endDraggingHandler = (wordId: number) => {
    let dropped = false;

    const blankEntries = Object.entries(blankRefs.current);
    if (!blankEntries.length) return dropped;

    // So sánh vùng của chữ được thả với cac blanks xem thỏa cái nào
    for (const [key, ref] of blankEntries) {
      if (!ref) continue;
      try {
        wordListRefs.current[`${wordId}`]?.measureInWindow(
          // eslint-disable-next-line max-params
          (wx: number, wy: number, ww: number, wh: number) => {
            // eslint-disable-next-line max-params
            (ref as any).measureInWindow((bx: number, by: number, bw: number, bh: number) => {
              // blank đã có từ thì bỏ qua
              if (filledBlanks[key]) return dropped;

              // threshold
              // const padding = 0;

              const isIntersecting = wx < bx + bw && wx + ww > bx && wy < by + bh && wy + wh > by;

              if (isIntersecting) {
                const wordText = wordList.find((w) => w.id === wordId)?.text;
                if (!wordText) return dropped;

                dropped = true;

                setUsedWordIds((prev) => (prev.includes(wordId) ? prev : [...prev, wordId]));
                setFilledBlanks((prev) => ({ ...prev, [key]: wordText }));
              }
            });
          }
        );
      } catch (err) {
        // measureInWindow khi ref bị unmount
        console.warn('[handleDropByCoords] measure error', err);
      }
    }

    return dropped;
  };

  return (
    <View className="gap-2" ref={containerRef}>
      <Text>showAnswer: {`${!!showAnswer}`}</Text>
      {/* Đề bài */}
      <Text className="font-bevietnampro-semibold">
        {translate('exercise.choose_to_fill_the_blanks_quiz.instruction')}
      </Text>

      {/* <Text>filledBlanks: {JSON.stringify(filledBlanks)}</Text> */}
      {/* <Text>usedWordIds: {JSON.stringify(usedWordIds)}</Text> */}

      {/* Word list */}
      <View className="flex-1 flex-row flex-wrap gap-2">
        {quizContent.wordList.map((word) => {
          return (
            <DraggableWord
              key={`${word.id}`}
              ref={(el) => (wordListRefs.current[word.id] = el)}
              word={word}
              isUsed={usedWordIds.includes(word.id)}
              onPress={throttle(() => {
                console.log('pressed: ', currentMovingRecord.value);

                if (currentMovingRecord.value) return;
                const nextBlankKey = blankKeysOrder.find((key) => !filledBlanks[key]);
                if (!nextBlankKey) {
                  return;
                }

                setUsedWordIds((prev) => [...prev, word.id]);
                chooseHandler(word.id, nextBlankKey);
              }, 400)}
              onDrop={() => {
                return endDraggingHandler(word.id);
              }}
            />
          );
        })}
      </View>

      {/* Các câu hỏi */}
      <View className="mt-4 gap-5">
        {quizContent.questions.map((question, idx) => {
          return (
            <View key={question.id} className="flex-1 flex-row flex-wrap items-center gap-2">
              {/* Đánh số câu */}
              <Text className="mr-2">{idx + 1}. </Text>

              {/* Các từ trong câu */}
              {question.sentenceTexts.map((text) => {
                const key = `${question.id}-${text.id}`;

                // NOTE: Đang so sánh trực tiếp với text
                const status =
                  showAnswer && filledBlanks[key] === text.text
                    ? BaseChoiceStatus.CORRECT
                    : BaseChoiceStatus.WRONG;

                return !text.isBlank ? (
                  <Text key={key}>{text.text}</Text>
                ) : (
                  <Pressable
                    key={key}
                    onPress={() => {
                      if (Object.keys(filledBlanks).includes(key)) {
                        const currentWordId = filledBlanks[key].split('-').at(1)!;

                        setFilledBlanks((filledBlanks) => {
                          const cloneFilledBlanks = { ...filledBlanks };
                          delete cloneFilledBlanks[key];

                          return cloneFilledBlanks;
                        });

                        setUsedWordIds((cur) => cur.filter((w) => w !== parseInt(currentWordId)));
                      }
                    }}
                  >
                    <View
                      style={{ minWidth: 100 }}
                      className={twMerge(
                        `items-center justify-center ${!showAnswer && !filledBlanks[key] && `border-b border-dotted border-white`}`
                      )}
                      ref={(el) => (blankRefs.current[key] = el)}
                    >
                      {!showAnswer ? (
                        <TextQuizChoice
                          containerClassName={filledBlanks[key] ? 'opacity-100' : 'opacity-0'}
                          text={filledBlanks[key]}
                        />
                      ) : (
                        <TextQuizChoice text={text.text} status={status} />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          );
        })}
      </View>

      <MovingWord
        record={currentMovingRecord}
        text={currentMovingText}
        onAnimationEnd={() => {
          endChoosingHandler();
        }}
      />
    </View>
  );
};

export default ChooseToFillTheBlanksQuiz;
