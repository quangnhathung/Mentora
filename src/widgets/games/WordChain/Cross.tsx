import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { type LayoutChangeEvent, type StyleProp, Text, View, type ViewStyle } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Line } from 'react-native-svg';

import BottomBorder from '@/shared/ui/BottomBorder';

type Props = {
  words: string[];
  onCompleted?: () => void;
  onReset?: () => void;
};

export type CrossRef = {
  reset: () => void;
};

export const Cross = forwardRef<CrossRef, Props>(({ words: rawWords, onCompleted }, ref) => {
  // normalize and dedupe target words
  const wordsUpper = rawWords.map((w) => w.toUpperCase());
  const wordsUnique = Array.from(new Set(wordsUpper));

  // unique letters from all target words
  const allLettersStr = wordsUnique.join('');
  const uniqueLettersSet = new Set(allLettersStr.split(''));
  const uniqueLetters = Array.from(uniqueLettersSet);

  // states
  const [letterList, setLetterList] = useState<string[]>(
    [...uniqueLetters].sort(() => Math.random() - 0.5)
  );
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [, setIsCompleted] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // measurement & positioning
  const letterPositions = useRef(
    letterList.map(() => ({ x: 0, y: 0, width: 44, height: 44, centerX: 0, centerY: 0 }))
  );
  const [absolutePositions, setAbsolutePositions] = useState<{ left: number; top: number }[]>([]);
  const [measureVersion, setMeasureVersion] = useState(0);

  const containerRef = useRef<View | null>(null);
  const containerPage = useRef({ pageX: 0, pageY: 0 });

  // guards
  const processingRef = useRef(false);
  const completedRef = useRef(false);

  // expose reset via ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFoundWords([]);
      setCurrentPath([]);
      setIsCompleted(false);
      completedRef.current = false;

      const newList = [...uniqueLetters].sort(() => Math.random() - 0.5);
      setLetterList(newList);

      letterPositions.current = newList.map(() => ({
        x: 0,
        y: 0,
        width: 44,
        height: 44,
        centerX: 0,
        centerY: 0,
      }));
      setAbsolutePositions([]);
      setMeasureVersion((v) => v + 1);

      setTimeout(() => {
        if (containerRef.current && (containerRef.current as any).measure) {
          (containerRef.current as any).measure((...args: any) => {
            const [_, __, ___, ____, pageX, pageY] = args;
            containerPage.current = { pageX, pageY };
          });
        }
      }, 0);
    },
  }));

  // call onCompleted exactly once when all unique words are found
  useEffect(() => {
    if (foundWords.length === wordsUnique.length && !completedRef.current) {
      completedRef.current = true;
      setIsCompleted(true);
      if (onCompleted) onCompleted();
    }
  }, [foundWords, wordsUnique.length, onCompleted]);

  // ensure letterPositions length matches letterList length
  useEffect(() => {
    letterPositions.current = letterList.map(() => ({
      x: 0,
      y: 0,
      width: 44,
      height: 44,
      centerX: 0,
      centerY: 0,
    }));
    setAbsolutePositions([]);
    setMeasureVersion((v) => v + 1);
  }, [letterList]);

  // IMPORTANT: sync when parent words change
  // Use a stable dependency string (avoid direct array/object identity)
  useEffect(() => {
    const newList = [...uniqueLetters].sort(() => Math.random() - 0.5);
    setLetterList(newList);

    setFoundWords([]);
    setCurrentPath([]);
    completedRef.current = false;
    setIsCompleted(false);

    letterPositions.current = newList.map(() => ({
      x: 0,
      y: 0,
      width: 44,
      height: 44,
      centerX: 0,
      centerY: 0,
    }));
    setAbsolutePositions([]);
    setMeasureVersion((v) => v + 1);
    processingRef.current = false;

    // measure container page coords asap
    setTimeout(() => {
      if (containerRef.current && (containerRef.current as any).measure) {
        (containerRef.current as any).measure((...args: any) => {
          const [_, __, ___, ____, pageX, pageY] = args;
          containerPage.current = { pageX, pageY };
        });
      }
    }, 0);
    // use stable string dependency to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsUpper.join('|')]);

  // helper: compare positions arrays, avoid unnecessary setState
  const positionsEqual = (
    a: { left: number; top: number }[] | null | undefined,
    b: { left: number; top: number }[] | null | undefined
  ) => {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (Math.abs(a[i].left - b[i].left) > 0.5 || Math.abs(a[i].top - b[i].top) > 0.5)
        return false;
    }
    return true;
  };

  // compute absolute positions around container center when measurements ready
  const computeAbsolutePositionsIfReady = () => {
    const { width: W, height: H } = containerSize;
    if (W <= 0 || H <= 0) return;

    // Fallback default sizes if necessary (avoid blocking)
    letterPositions.current.forEach((p) => {
      if (p.width <= 0) p.width = 44;
      if (p.height <= 0) p.height = 44;
    });

    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.28;
    const n = letterList.length;
    const startAngle = -90;

    const positions = Array.from({ length: n }, (_, i) => {
      const angleDeg = startAngle + (360 / n) * i;
      const rad = (angleDeg * Math.PI) / 180;
      const measured = letterPositions.current[i];
      const left = cx + radius * Math.cos(rad) - measured.width / 2;
      const top = cy + radius * Math.sin(rad) - measured.height / 2;
      return { left, top };
    });

    positions.forEach((pos, i) => {
      const lp = letterPositions.current[i];
      lp.x = pos.left;
      lp.y = pos.top;
      lp.centerX = pos.left + lp.width / 2;
      lp.centerY = pos.top + lp.height / 2;
    });

    if (!positionsEqual(absolutePositions, positions)) {
      setAbsolutePositions(positions);
    }
  };

  // recompute when container size, measurement version or letterList changes
  useEffect(() => {
    computeAbsolutePositionsIfReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize, measureVersion, letterList]);

  // find which letter index is hit by local x,y (relative to container)
  const findLetterAtPointLocal = (x: number, y: number): number => {
    for (let i = 0; i < letterPositions.current.length; i++) {
      const pos = letterPositions.current[i];
      if (x >= pos.x && x <= pos.x + pos.width && y >= pos.y && y <= pos.y + pos.height) {
        return i;
      }
    }
    return -1;
  };

  // convert gesture event coords to local container coords if needed
  const getLocalCoords = (nativeEvent: any): { x: number; y: number } | null => {
    if (typeof nativeEvent.x === 'number' && typeof nativeEvent.y === 'number') {
      return { x: nativeEvent.x, y: nativeEvent.y };
    }
    if (
      typeof nativeEvent.absoluteX === 'number' &&
      typeof nativeEvent.absoluteY === 'number' &&
      containerPage.current.pageX != null
    ) {
      return {
        x: nativeEvent.absoluteX - containerPage.current.pageX,
        y: nativeEvent.absoluteY - containerPage.current.pageY,
      };
    }
    return null;
  };

  // gesture handlers
  const onHandlerStateChange = ({ nativeEvent }: { nativeEvent: any }) => {
    const { state } = nativeEvent;

    if (state === State.BEGAN) {
      const local = getLocalCoords(nativeEvent);
      if (!local) return;
      const index = findLetterAtPointLocal(local.x, local.y);
      if (index !== -1) setCurrentPath([index]);
      return;
    }

    if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      if (processingRef.current) return;
      processingRef.current = true;

      try {
        if (currentPath.length > 1) {
          const currentWord = currentPath.map((i) => letterList[i]).join('');
          if (wordsUnique.includes(currentWord)) {
            setFoundWords((prev) => (prev.includes(currentWord) ? prev : [...prev, currentWord]));
          }
        }
      } finally {
        setCurrentPath([]);
        setTimeout(() => {
          processingRef.current = false;
        }, 0);
      }
    }
  };

  const onGestureEvent = ({ nativeEvent }: { nativeEvent: any }) => {
    const local = getLocalCoords(nativeEvent);
    if (!local) return;
    const index = findLetterAtPointLocal(local.x, local.y);
    if (index !== -1) {
      setCurrentPath((prev) => {
        if (prev.length === 0) return [index]; // Start path if none
        const last = prev[prev.length - 1];
        if (last === index) return prev;
        return [...prev, index];
      });
    }
  };

  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });

    setTimeout(() => {
      if (containerRef.current && (containerRef.current as any).measure) {
        (containerRef.current as any).measure((...args: any) => {
          const [_, __, ___, ____, pageX, pageY] = args;
          containerPage.current = { pageX, pageY };
        });
      }
    }, 0);
  };

  // measure tile sizes (initial in-flow render; later absolute onLayout also fires)
  const onLetterLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    const prev = letterPositions.current[index];
    const changed =
      !prev || prev.width !== width || prev.height !== height || prev.x !== x || prev.y !== y;

    letterPositions.current[index] = {
      x: prev?.x ?? x,
      y: prev?.y ?? y,
      width: width > 0 ? width : 44,
      height: height > 0 ? height : 44,
      centerX: prev?.centerX ?? x + (width > 0 ? width : 44) / 2,
      centerY: prev?.centerY ?? y + (height > 0 ? height : 44) / 2,
    };

    if (changed) setMeasureVersion((v) => v + 1);
  };

  if (uniqueLetters.length < 3 || uniqueLetters.length > 4) {
    return (
      <Text className="text-2xl text-white">
        Invalid number of letters (must be 3 or 4 unique letters)
      </Text>
    );
  }

  const isPositioned = absolutePositions.length === letterList.length;

  return (
    <View className="size-full justify-between p-0">
      {/* Top: target words */}
      <View className="px-1">
        <View className="items-center">
          <View>
            {wordsUpper.map((word, wordIndex) => (
              <View key={wordIndex} className="mb-2 flex-row">
                {word.split('').map((char, charIndex) => (
                  <BottomBorder key={charIndex} className="border-custom-5 mx-1">
                    <View
                      className={`size-11 ${
                        foundWords.includes(word) ? 'bg-green-500' : 'bg-background-dark-light'
                      } flex items-center justify-center rounded-xl`}
                    >
                      <Text
                        className={`pt-2 font-baloo text-2xl ${
                          foundWords.includes(word) ? 'text-white' : 'text-transparent'
                        }`}
                      >
                        {char}
                      </Text>
                    </View>
                  </BottomBorder>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Middle: current forming word */}
      <View>
        <View className="flex-row justify-center gap-1">
          {currentPath.map((pathIndex, pos) => (
            <View key={pos}>
              <Text className="font-baloo text-3xl text-cyan dark:text-cyan">
                {letterList[pathIndex]}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom: gesture area */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            ref={containerRef}
            onLayout={onContainerLayout}
            className="relative"
            style={{ height: 220 }}
          >
            {letterList.map((letter, index) => {
              const pos = absolutePositions[index];
              const absoluteStyle: StyleProp<ViewStyle> =
                isPositioned && pos
                  ? ({ position: 'absolute', left: pos.left, top: pos.top } as ViewStyle)
                  : undefined;

              return (
                <BottomBorder
                  className="border-custom-5"
                  key={`${letter}-${index}`}
                  onLayout={onLetterLayout(index)}
                  style={absoluteStyle}
                >
                  <View
                    className={`size-11 ${
                      currentPath.includes(index) ? 'bg-green-500' : 'bg-background-dark-light'
                    } flex items-center justify-center rounded-xl`}
                  >
                    <Text className={`pt-2 font-baloo text-2xl dark:text-white`}>{letter}</Text>
                  </View>
                </BottomBorder>
              );
            })}

            {/* SVG overlay lines */}
            {containerSize.width > 0 && containerSize.height > 0 && (
              <Svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: containerSize.width,
                  height: containerSize.height,
                }}
              >
                {currentPath.map((index, i) => {
                  if (i === 0) return null;
                  const start = letterPositions.current[currentPath[i - 1]];
                  const end = letterPositions.current[index];
                  if (!start || !end) return null;
                  return (
                    <Line
                      key={i}
                      x1={start.centerX}
                      y1={start.centerY}
                      x2={end.centerX}
                      y2={end.centerY}
                      stroke="white"
                      strokeWidth={4}
                    />
                  );
                })}
              </Svg>
            )}
          </View>
        </PanGestureHandler>
      </View>

      {/* optional completed UI */}
      {/* {isCompleted && <Text className="mt-8 text-center text-2xl text-white">Completed!</Text>} */}
    </View>
  );
});
