// import { forwardRef, useCallback } from 'react';
// import { Animated, View } from 'react-native';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

// import { type ChooseToFillTheBlanksQuizWord } from '@/entities/quizzes/choose-to-fil-blanks/types';

// export type DraggableWordProps = {
//   word: ChooseToFillTheBlanksQuizWord;
//   onPress: () => void;
//   onDrop: () => boolean;
//   isUsed: boolean;
// };
// const DraggableWord = forwardRef<View, DraggableWordProps>(({ word, onPress, isUsed }, ref) => {
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const savedX = useSharedValue(0);
//   const savedY = useSharedValue(0);
//   const zIndex = useSharedValue(1);

//   const handleDrop = useCallback((wordId: number) => {
//     const dropped = handleDropByCoords(wordId);
//     console.log('Dropped:', dropped);

//     if (!dropped) {
//       // reset vị trí khi không drop được
//       savedX.value = 0;
//       savedY.value = 0;
//       translateX.value = 0;
//       translateY.value = 0;
//       zIndex.value = 1;
//     }
//   }, []);

//   const panGesture = Gesture.Pan()
//     .onStart(() => {
//       savedX.value = translateX.value;
//       savedY.value = translateY.value;
//       zIndex.value = 99999;
//     })
//     .onUpdate((event) => {
//       console.log(event.absoluteX, event.absoluteY);
//       translateX.value = savedX.value + event.translationX;
//       translateY.value = savedY.value + event.translationY;
//     })
//     .onEnd(() => {
//       // runOnJS(onDrop)(word.id)
//       // runOnJS(handleDrop)(word.id);
//       // savedX.value = 0;
//       // savedY.value = 0;
//       // translateX.value = 0;
//       // translateY.value = 0;
//       // zIndex.value = 1;
//     });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
//     zIndex: zIndex.value,
//   }));

//   return (
//     <GestureDetector gesture={panGesture}>
//       <Animated.View
//         style={[animatedStyle, { backgroundColor: 'red', padding: 10, width: 100, height: 100 }]}
//       >
//         {/* <TextQuizChoice
//           containerClassName={isUsed ? 'hidden' : ''}
//           text={word.text}
//           onPress={onPress}
//         /> */}
//         <View style={[{ backgroundColor: 'green' }]} ref={ref} />
//       </Animated.View>
//     </GestureDetector>
//   );
// });

// export default DraggableWord;
