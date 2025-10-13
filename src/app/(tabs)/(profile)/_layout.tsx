import { Stack } from 'expo-router';

export default function ProfileLayout() {
  // const router = useRouter();
  // const [isVisible, setIsVisible] = useState(false);
  // const goBack = () => {
  //   router.back();
  // };

  // const handleHeaderRight = () => {
  //   setIsVisible(true);
  // };

  // const headerTitle = () => (
  //   <View style={tw`items-center justify-center`}>
  //     <TextGradient style={tw`text-sm font-semibold text-white`}>Listening Marathon</TextGradient>
  //   </View>
  // );

  // const headerLeft = () => (
  //   <View style={tw``}>
  //     <Pressable onPress={goBack}>
  //       <FontAwesomeIcon
  //         size={moderateScale(18)}
  //         name="arrow-left"
  //         color={`${tw.color('white')}`}
  //       />
  //     </Pressable>
  //   </View>
  // );

  // const headerRight = () => (
  //   <View style={tw``}>
  //     <Pressable onPress={handleHeaderRight}>
  //       <FontAwesomeIcon5 size={moderateScale(18)} name="cog" color={`${tw.color('white')}`} />
  //     </Pressable>
  //     <SettingBottomSheet isVisible={isVisible} setIsVisible={setIsVisible} />
  //   </View>
  // );

  return (
    <Stack initialRouteName="profile">
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="info" options={{ headerShown: false }} />
      <Stack.Screen name="performance" options={{ headerShown: false }} />
      <Stack.Screen name="setting" options={{ headerShown: false }} />
      <Stack.Screen
        name="help"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[uid]"
        options={
          {
            // animation: 'fade_from_bottom',
            // headerShown: false,
            // headerBackVisible: false,
            // headerTitleStyle: tw`text-white`,
            // headerTitleAlign: 'center',
            // headerStyle: tw`flex-1 items-center justify-center rounded-b-2xl bg-primary-dark-light`,
            // headerTitle: () => headerTitle(),
            // headerLeft: () => headerLeft(),
            // headerRight: () => headerRight(),
          }
        }
      />
    </Stack>
  );
}
