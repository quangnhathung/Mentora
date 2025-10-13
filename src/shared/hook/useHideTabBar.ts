import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export const useHideTabBar = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const tabsParent = navigation.getParent();
    if (!tabsParent) return;

    tabsParent.setOptions({ tabBarStyle: { display: 'none' } });

    return () => tabsParent.setOptions({ tabBarStyle: { display: 'flex' } });
  }, [navigation]);
};
