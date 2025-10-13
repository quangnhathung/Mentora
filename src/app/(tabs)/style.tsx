import * as React from 'react';

import { Buttons } from '@/shared/buttons';
import { Colors } from '@/shared/colors';
import { Typography } from '@/shared/typography';
import { FocusAwareStatusBar, SafeAreaView, ScrollView } from '@/shared/ui';

export default function Style() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <Typography />
          <Colors />
          <Buttons />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
