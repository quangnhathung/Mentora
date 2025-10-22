import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  type GestureResponderEvent,
  type LayoutChangeEvent,
  PanResponder,
  type PanResponderGestureState,
} from 'react-native';

import { Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { SvgIcon } from '@/shared/ui/SvgIcon';

// ===== Types =====
type Props = {
  rows: number;
  cols: number;
  words: string[];
  onFoundCountChange?: (foundCount: number, total: number) => void;
};

// ===== Helpers =====
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Only allow horizontal and vertical directions (no diagonals)
const DIRS = [
  { dr: 0, dc: 1 }, // →
  { dr: 0, dc: -1 }, // ←
  { dr: 1, dc: 0 }, // ↓
  { dr: -1, dc: 0 }, // ↑
];

const randInt = (n: number) => Math.floor(Math.random() * n);
const choice = <T,>(arr: T[]) => arr[randInt(arr.length)];

function makeEmptyGrid(r: number, c: number): string[][] {
  return Array.from({ length: r }, () => Array.from({ length: c }, () => ''));
}

type PlaceParams = {
  grid: string[][];
  word: string;
  r: number;
  c: number;
  dr: number;
  dc: number;
};

function canPlace({ grid, word, r, c, dr, dc }: PlaceParams) {
  const rows = grid.length;
  const cols = grid[0].length;
  for (let i = 0; i < word.length; i++) {
    const rr = r + dr * i;
    const cc = c + dc * i;
    if (rr < 0 || rr >= rows || cc < 0 || cc >= cols) return false;
    const ch = grid[rr][cc];
    if (ch !== '' && ch !== word[i]) return false;
  }
  return true;
}

function placeWord(grid: string[][], wordRaw: string): boolean {
  const word = wordRaw.toUpperCase();
  const rows = grid.length;
  const cols = grid[0].length;

  for (let tries = 0; tries < 200; tries++) {
    const { dr, dc } = choice(DIRS);
    const r = randInt(rows);
    const c = randInt(cols);

    if (!canPlace({ grid, word, r, c, dr, dc })) continue;

    for (let i = 0; i < word.length; i++) {
      const rr = r + dr * i;
      const cc = c + dc * i;
      grid[rr][cc] = word[i];
    }
    return true;
  }
  return false;
}

function fillRandom(grid: string[][]) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (!grid[r][c]) grid[r][c] = ALPHABET[randInt(ALPHABET.length)];
    }
  }
  return grid;
}

function coordsToKey(r: number, c: number) {
  return `${r}:${c}`;
}

// Only allow straight horizontal or vertical lines
function isStraightHV(path: { r: number; c: number }[]) {
  if (path.length < 2) return true;
  const allSameRow = path.every((p) => p.r === path[0].r);
  const allSameCol = path.every((p) => p.c === path[0].c);
  if (!(allSameRow || allSameCol)) return false;

  for (let i = 1; i < path.length; i++) {
    const dr = Math.abs(path[i].r - path[i - 1].r);
    const dc = Math.abs(path[i].c - path[i - 1].c);
    if (dr + dc !== 1) return false;
  }
  return true;
}

export const Matrix: React.FC<Props> = ({ rows, cols, words, onFoundCountChange }) => {
  // ====== Board generation ======
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());

  // reveal single box
  const [revealedWord, setRevealedWord] = useState<string | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // wrong highlight
  const [wrongCells, setWrongCells] = useState<Set<string>>(new Set());
  const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimer.current) {
        clearTimeout(revealTimer.current);
        revealTimer.current = null;
      }
      if (wrongTimer.current) {
        clearTimeout(wrongTimer.current);
        wrongTimer.current = null;
      }
    };
  }, []);

  // normalized unique uppercase words (preserve first-seen order)
  const normalizedWords = useMemo(
    () => Array.from(new Set(words.map((w) => w.toUpperCase()))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(words)]
  );

  useEffect(() => {
    if (typeof onFoundCountChange === 'function') {
      const total = normalizedWords.length;
      onFoundCountChange(foundWords.size, total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundWords, JSON.stringify(words)]);

  useEffect(() => {
    const g = makeEmptyGrid(rows, cols);
    words.forEach((w) => placeWord(g, w));
    fillRandom(g);
    setGrid(g);
    setFoundCells(new Set());
    setFoundWords(new Set());
    setRevealedWord(null);
    setWrongCells(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, JSON.stringify(words)]);

  // ====== Layout & Slide selection ======
  const gridRef = useRef<View | null>(null);
  const [layout, setLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [cellSize, setCellSize] = useState<number>(36); // fallback

  const updateLayout = () => {
    const g = gridRef.current;
    if (!g) return;

    g.measure((...args) => {
      const [_, __, width, height, pageX, pageY] = args;
      setLayout({ x: pageX, y: pageY, width, height });

      const totalGap = GAP_PX * 2 * cols;
      const computed = Math.floor((width - totalGap) / cols);

      setCellSize(computed > 10 ? computed : 36);
    });
  };

  useEffect(() => {
    updateLayout();
    const t = setTimeout(updateLayout, 100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  const onGridLayout = (_e: LayoutChangeEvent) => {
    updateLayout();
  };

  const [dragPath, setDragPath] = useState<{ r: number; c: number }[]>([]);

  const getCellByPage = (pageX: number, pageY: number) => {
    if (!layout) return null;

    const relX = pageX - layout.x;
    const relY = pageY - layout.y;

    const step = cellSize + GAP_PX * 2;
    const c = Math.floor(relX / step);
    const r = Math.floor(relY / step);

    if (r < 0 || r >= rows || c < 0 || c >= cols) return null;
    return { r, c };
  };

  const addCellToDragPath = (next: { r: number; c: number }) => {
    setDragPath((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.r === next.r && last.c === next.c) return prev;
      const candidate = [...prev, next];
      if (!isStraightHV(candidate)) return prev;
      const exists = prev.find((p) => p.r === next.r && p.c === next.c);
      if (exists) return prev;
      return candidate;
    });
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState
        ) => {
          const cell = getCellByPage(gestureState.x0, gestureState.y0);
          setDragPath(cell ? [cell] : []);
        },
        onPanResponderMove: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState
        ) => {
          const cell = getCellByPage(gestureState.moveX, gestureState.moveY);
          if (cell) addCellToDragPath(cell);
        },
        onPanResponderRelease: () => {
          if (dragPath.length >= 2) {
            const letters = dragPath.map(({ r, c }) => grid[r]?.[c]).join('');
            const reversed = letters.split('').reverse().join('');
            const normalized = normalizedWords;
            const match = normalized.includes(letters) || normalized.includes(reversed);

            if (match) {
              const newFound = new Set(foundCells);
              dragPath.forEach(({ r, c }) => newFound.add(coordsToKey(r, c)));
              setFoundCells(newFound);

              const matchedWord = normalized.includes(letters) ? letters : reversed;
              const fw = new Set(foundWords);
              fw.add(matchedWord.toUpperCase());
              setFoundWords(fw);

              // reveal matched word for 3s (reset previous reveal timer)
              if (revealTimer.current) {
                clearTimeout(revealTimer.current);
                revealTimer.current = null;
              }
              setRevealedWord(matchedWord.toUpperCase());
              revealTimer.current = setTimeout(() => {
                setRevealedWord(null);
                revealTimer.current = null;
              }, 3000);
            } else {
              const wrongSet = new Set<string>();
              dragPath.forEach(({ r, c }) => wrongSet.add(coordsToKey(r, c)));
              setWrongCells(wrongSet);

              if (wrongTimer.current) {
                clearTimeout(wrongTimer.current);
                wrongTimer.current = null;
              }
              wrongTimer.current = setTimeout(() => {
                setWrongCells(new Set());
                wrongTimer.current = null;
              }, 800);
            }
          }
          setDragPath([]);
        },

        onPanResponderTerminate: () => {
          setDragPath([]);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grid, layout, cellSize, rows, cols, JSON.stringify(words), foundCells, foundWords, dragPath]
  );

  // ====== Rendering helpers ======
  const isInDrag = (r: number, c: number) => dragPath.some((p) => p.r === r && p.c === c);
  const isFound = (r: number, c: number) => foundCells.has(coordsToKey(r, c));
  const isWrong = (r: number, c: number) => wrongCells.has(coordsToKey(r, c));
  const GAP_PX = 4;

  // ---- suggestion logic ----
  const nextSuggestion = useMemo(
    () => normalizedWords.find((w) => !foundWords.has(w)) ?? null,
    [normalizedWords, foundWords]
  );

  const displayedWord = revealedWord ?? nextSuggestion;
  const isDisplayedFound = displayedWord ? foundWords.has(displayedWord) : false;

  // ====== UI ======
  return (
    <View className="w-full items-center justify-center p-3">
      <View className="mb-3 w-full flex-row flex-wrap items-center justify-center px-2">
        <View className="mb-3 w-full flex-row items-center justify-center">
          <BottomBorder className="border-custom-5 w-full">
            <View
              className={`w-full flex-row items-center justify-between rounded-xl bg-background-dark-light p-1 px-2`}
            >
              <View />
              <Text
                className={`pt-2 text-center font-baloo text-xl ${
                  isDisplayedFound ? 'dark:text-green-500' : ''
                }`}
              >
                {displayedWord ?? ''}
              </Text>
              {isDisplayedFound ? (
                <SvgIcon className={`${isDisplayedFound ?? 'hidden'}`} name="checked" />
              ) : (
                <View />
              )}
            </View>
          </BottomBorder>
        </View>
      </View>

      {/* Lưới chữ */}
      <View ref={gridRef} onLayout={onGridLayout} className="w-full" {...panResponder.panHandlers}>
        {grid.map((row, rIdx) => (
          <View key={`r-${rIdx}`} className="flex-row">
            {row.map((ch, cIdx) => {
              const inDrag = isInDrag(rIdx, cIdx);
              const found = isFound(rIdx, cIdx);
              const wrong = isWrong(rIdx, cIdx);

              const baseClass = 'rounded-2xl items-center justify-center bg-background-dark-light';
              const cls = found ? 'bg-green-500' : wrong ? 'bg-red' : inDrag ? 'bg-green-500' : '';
              // const textCls = found
              //   ? 'dark:text-cyan'
              //   : wrong
              //     ? 'dark:text-red'
              //     : inDrag
              //       ? 'dark:text-cyan'
              //       : 'text-white';

              const size = cellSize;
              return (
                <BottomBorder
                  style={{ margin: GAP_PX }}
                  key={`c-${cIdx}`}
                  className="border-custom-5 rounded-2xl"
                >
                  <View className={`${baseClass} ${cls}`} style={{ width: size, height: size }}>
                    <Text
                      className={`font-bevietnampro ${found ? 'dark:text-white' : ''} text-2xl font-bold`}
                    >
                      {ch}
                    </Text>
                  </View>
                </BottomBorder>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};
