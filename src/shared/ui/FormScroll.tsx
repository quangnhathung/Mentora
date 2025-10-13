import { Animated, Platform, ScrollView } from 'react-native';
import {
  KeyboardAwareScrollView,
  useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const FormScroll: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const Scroll =
    Platform.OS === 'web'
      ? ScrollView // web dùng ScrollView thường
      : KeyboardAwareScrollView; // iOS/Android dùng KASC

  const { height: kbHeight } = useReanimatedKeyboardAnimation();

  /* --- animated style dịch form --- */
  const formAnim = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(-kbHeight.value, { duration: 250 }),
      },
    ],
  }));

  return (
    <Animated.View style={[{ flex: 1 }, formAnim]}>
      <Scroll
        /* --- 2 prop hợp lệ ở v1.13.2 --- */
        {...(Platform.OS !== 'web' && {
          bottomOffset: 16, // khoảng hở tối thiểu (px)
          extraKeyboardSpace: 8, // bù thêm (có thể âm)
        })}
        /* -- style & behaviour chung -- */
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 40 }}
        showsVerticalScrollIndicator={false}
        className={`flex-1`}
      >
        {children}
      </Scroll>
    </Animated.View>
  );
};
