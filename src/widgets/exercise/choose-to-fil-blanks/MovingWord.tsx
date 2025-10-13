import Animated, {
  runOnJS,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import TextQuizChoice from '@/shared/ui/TextQuizChoice';

import { type MovingRecord } from './ChooseToFillTheBlanksQuiz';

// type MovingWordProps = {
//   wordId: number;
//   text: string;

//   startX: number;
//   startY: number;
//   endX: number;
//   endY: number;
//   onAnimationEnd: (wordId: number) => void;
// };

// function MovingWord({ wordId, text, startX, startY, endX, endY, onAnimationEnd }: MovingWordProps) {
//   const translateX = useSharedValue(startX);
//   const translateY = useSharedValue(startY);
//   const opacity = useSharedValue(0);

//   useEffect(() => {
//     opacity.value = withTiming(1, { duration: 150 });
//     translateX.value = withTiming(endX, { duration: 250 }, (finished: boolean | undefined) => {
//       if (finished) runOnJS(onAnimationEnd)(wordId);
//     });
//     translateY.value = withTiming(endY, { duration: 250 });
//   }, [endX, endY]);

//   // HANDLERS
//   const endMovingHandlers = () => {
//     onAnimationEnd(wordId);
//   };

//   // STYLES
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
//   }));
//   return (
//     <Animated.View style={[animatedStyle, { position: 'absolute' }]}>
//       <TextQuizChoice text={text} />
//     </Animated.View>
//   );
// }

type MovingWordProps = {
  record: SharedValue<MovingRecord | null>;
  text: string | null;
  onAnimationEnd: () => void;
};

export function MovingWord({ record, text, onAnimationEnd }: MovingWordProps) {
  console.log('re-render MovingWord');

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useAnimatedReaction(
    () => (record.value ? record.value.wordId : null),
    (newWordId, prevWordId) => {
      // console.log('newWordId', newWordId);
      // console.log('prevWordId', prevWordId);
      if (newWordId && newWordId !== prevWordId) {
        const { startX, startY, endX, endY } = record.value!;
        translateX.value = startX;
        translateY.value = startY;

        opacity.value = withTiming(1, { duration: 150 });

        translateX.value = withTiming(endX, { duration: 500 });
        translateY.value = withTiming(endY, { duration: 500 }, (finished) => {
          if (finished) {
            opacity.value = withTiming(0, { duration: 150 });
            runOnJS(onAnimationEnd)();
          }
        });
      }
    }
  );

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle]}>{text && <TextQuizChoice text={text} />}</Animated.View>
  );
}

export default MovingWord;
