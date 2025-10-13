import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'src/shared/ui';

import BottomBorder from '@/shared/ui/BottomBorder';

type Props = {
  words: string[];
  rows?: number;
  horizontalPadding?: number;
  maxTile?: number;
  onCompleted: () => void;
};

export type WordSlideRef = {
  reset: () => void;
};

const Slide = forwardRef<WordSlideRef, Props>(
  ({ words, rows = 5, horizontalPadding = 32, maxTile = 96, onCompleted }, ref) => {
    const [foundWords, setFoundWords] = useState<string[]>([]);
    // chuẩn hóa từ
    const sanitized = useMemo(() => {
      if (!words || words.length === 0) return [];
      return words.map((w) => {
        let upper = (w ?? '').toUpperCase();
        if (upper.length < 4) upper = upper.padEnd(4, ' ');
        if (upper.length > 4) upper = upper.slice(0, 4);
        return upper;
      });
    }, [words]);

    useEffect(() => {
      if (foundWords.length > 0 && foundWords.length === sanitized.length) {
        onCompleted();
      }
    }, [foundWords, sanitized, onCompleted]);

    const safeRows = Math.min(4, Math.max(1, sanitized.length || rows));
    const [containerWidth, setContainerWidth] = useState<number | null>(null);

    const TILE = useMemo(() => {
      if (!containerWidth) return 64;
      const available = Math.max(containerWidth - horizontalPadding, 120);
      return Math.min(maxTile, Math.floor(available / 4));
    }, [containerWidth, horizontalPadding, maxTile]);

    const TILE_H = TILE + 13;
    const BOARD_HEIGHT = TILE_H * safeRows;
    const BOARD_CENTER_Y = BOARD_HEIGHT / 2;

    const boardRows = useMemo(() => {
      const r: string[][] = [];
      for (let i = 0; i < safeRows; i++) {
        const w = sanitized[i] ?? '    ';
        r.push(w.split(''));
      }
      return r;
    }, [sanitized, safeRows]);

    const initCols = useMemo(() => {
      const cols: string[][] = [[], [], [], []];
      for (let c = 0; c < 4; c++) {
        for (let r = 0; r < safeRows; r++) cols[c].push(boardRows[r][c]);
        const times = Math.floor(Math.random() * safeRows);
        for (let t = 0; t < times; t++) {
          const first = cols[c].shift()!;
          cols[c].push(first);
        }
      }
      return cols;
    }, [boardRows, safeRows]);

    const [columns, setColumns] = useState(initCols);

    const [_centerIndices, setCenterIndices] = useState<number[]>(new Array(4).fill(0));
    const [matchedPositions, setMatchedPositions] = useState<Set<number>[]>(
      new Array(4).fill(0).map(() => new Set())
    );

    // animation states
    const t0 = useSharedValue(0);
    const t1 = useSharedValue(0);
    const t2 = useSharedValue(0);
    const t3 = useSharedValue(0);
    const translates = [t0, t1, t2, t3];

    const animStyle0 = useAnimatedStyle(() => ({
      transform: [{ translateY: t0.value }],
    }));
    const animStyle1 = useAnimatedStyle(() => ({
      transform: [{ translateY: t1.value }],
    }));
    const animStyle2 = useAnimatedStyle(() => ({
      transform: [{ translateY: t2.value }],
    }));
    const animStyle3 = useAnimatedStyle(() => ({
      transform: [{ translateY: t3.value }],
    }));
    const animatedStyles = [animStyle0, animStyle1, animStyle2, animStyle3];

    // compute min/max translate (top = min, bottom = max)
    const minTranslate = BOARD_CENTER_Y - TILE_H / 2 - (safeRows - 1) * TILE_H;
    const maxTranslate = BOARD_CENTER_Y - TILE_H / 2 - 0 * TILE_H;

    // sync initial translates whenever layout / initCols change
    useEffect(() => {
      setColumns(initCols);

      // reset matched / found khi words thay đổi
      setFoundWords([]);
      setMatchedPositions(new Array(4).fill(0).map(() => new Set<number>()));
      setCenterIndices(new Array(4).fill(0));

      // đặt thẳng vị trí center (không dùng spring) để tránh sai số ban đầu
      const snapTranslate = Math.round(maxTranslate);
      translates.forEach((t) => {
        t.value = snapTranslate;
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initCols, BOARD_CENTER_Y, TILE_H]);

    // expose reset
    useImperativeHandle(ref, () => ({
      reset: () => {
        setFoundWords([]);
        setMatchedPositions(new Array(4).fill(0).map(() => new Set<number>()));
        setCenterIndices(new Array(4).fill(0));
        setColumns(initCols);
        const snapTranslate = Math.round(maxTranslate);
        translates.forEach((t) => {
          t.value = snapTranslate;
        });
      },
    }));

    function updateCenterIndexOnEnd(colIndex: number, finalTranslate: number) {
      // finalTranslate passed from onEnd = startY + translationY (số chính xác)
      const rawIdx = Math.round((BOARD_CENTER_Y - finalTranslate - TILE_H / 2) / TILE_H);
      const idx = clamp(rawIdx, 0, safeRows - 1);
      const snapTranslate = Math.round(BOARD_CENTER_Y - TILE_H / 2 - idx * TILE_H);
      // animate to snap (spring)
      translates[colIndex].value = withSpring(snapTranslate);

      setCenterIndices((prev) => {
        const next = [...prev];
        next[colIndex] = idx;

        const candidate = columns.map((col, i) => col[next[i]] ?? ' ').join('');
        if (sanitized.includes(candidate) && !foundWords.includes(candidate)) {
          setFoundWords((fw) => [...fw, candidate]);
          setMatchedPositions((mp) =>
            mp.map((s, i) => {
              const ns = new Set(s);
              ns.add(next[i]);
              return ns;
            })
          );
        }
        return next;
      });
    }

    // create pan gestures (works on web + mobile)
    const panGestures = translates.map((shared, colIndex) =>
      Gesture.Pan()
        .onBegin(() => {
          // cancel any running spring to avoid value conflict / jump
          cancelAnimation(shared);
          // store start position on the shared object
          (shared as any).startY = shared.value;
        })
        .onUpdate((e) => {
          // update shared value to move the column, clamp inside allowed range
          const proposed = (shared as any).startY + (e as any).translationY;
          shared.value = clamp(proposed, minTranslate, maxTranslate);
        })
        .onEnd((e) => {
          // compute final translate and clamp
          const final = (shared as any).startY + (e as any).translationY;
          const finalClamped = clamp(final, minTranslate, maxTranslate);
          runOnJS(updateCenterIndexOnEnd)(colIndex, finalClamped);
        })
    );

    const onContainerLayout = (e: LayoutChangeEvent) => {
      setContainerWidth(e.nativeEvent.layout.width);
    };

    return (
      <GestureHandlerRootView className="flex-1">
        <View className="flex-1 items-center justify-center p-4" onLayout={onContainerLayout}>
          <View className="w-full items-center justify-center" style={{ height: BOARD_HEIGHT }}>
            <View className="flex-row">
              {columns.map((col, cIdx) => {
                const animStyle = animatedStyles[cIdx];
                return (
                  <GestureDetector key={cIdx} gesture={panGestures[cIdx]}>
                    <Animated.View
                      className="items-center px-1"
                      style={[
                        animStyle,
                        { height: BOARD_HEIGHT, alignItems: 'center', justifyContent: 'center' },
                      ]}
                    >
                      {col.map((ch, rIdx) => {
                        const isEmpty = !ch || ch.trim() === '';
                        const isMatched = matchedPositions[cIdx].has(rIdx);

                        // Nếu ô rỗng => render placeholder có cùng kích thước/margin để giữ vị trí.
                        if (isEmpty) {
                          return (
                            <View
                              key={`${cIdx}-${rIdx}`}
                              // giữ margin tương đương className="m-1"
                              style={{ width: TILE, height: TILE, margin: 4 }}
                              pointerEvents="none"
                            />
                          );
                        }

                        const borderClass = isMatched
                          ? 'bg-green-500'
                          : 'border-2 bg-background-dark-light';
                        const textClass = isMatched ? 'dark:text-white' : 'text-white';

                        return (
                          <View
                            key={`${cIdx}-${rIdx}`}
                            style={{
                              paddingTop: rIdx === 0 ? 4 : undefined,
                              paddingBottom: rIdx === col.length - 1 ? 4 : undefined,
                            }}
                          >
                            <BottomBorder className="border-custom-5 m-1">
                              <TouchableOpacity
                                activeOpacity={0.9}
                                className={`items-center justify-center rounded-xl ${borderClass}`}
                                style={{ width: TILE, height: TILE }}
                              >
                                <Text className={`font-baloo text-3xl ${textClass}`}>{ch}</Text>
                              </TouchableOpacity>
                            </BottomBorder>
                          </View>
                        );
                      })}
                    </Animated.View>
                  </GestureDetector>
                );
              })}
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    );
  }
);

export default Slide;

function clamp(n: number, lo: number, hi: number) {
  'worklet';
  return Math.max(lo, Math.min(hi, n));
}
