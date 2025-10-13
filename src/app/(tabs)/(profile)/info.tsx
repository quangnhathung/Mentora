import { useIsMutating } from '@tanstack/react-query';
import { vars } from 'nativewind';
import { useMemo, useRef } from 'react';
import { Platform } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { View } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { HeaderWithBack } from '@/widgets/common/HeaderWithBack';
import { ProfileInfoForm, type ProfileInfoFormRef } from '@/widgets/profile/ProfileInfoForm';

export default function ProfileUserInfo() {
  const formRef = useRef<ProfileInfoFormRef>(null);
  const isLoading = useIsMutating() > 0;
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={['top']}
      className={``}
      scrollable
      style={moderateSize}
      Header={<HeaderWithBack title={translate('profile.menu.profile')} />}
      Body={
        <View className="flex-1 items-center justify-start">
          <ProfileInfoForm ref={formRef} />
        </View>
      }
      Bottom={
        <>
          <KeyboardStickyView
            offset={{
              opened: Platform.select({
                ios: 80,
                android: 95,
              })!,
            }}
            className={`pb-2`}
          >
            <PrimaryButton
              loading={isLoading}
              title={translate('button.save')}
              className={`my-2`}
              textStyle={`uppercase`}
              onPress={() => formRef.current?.submit()}
            />
            {/* <Text
              className="rounded-xl bg-primary py-4 text-center font-bevietnampro-bold uppercase text-white"
              onPress={() => console.log('Submit!')}
            >
              {translate('button.save')}
            </Text> */}
          </KeyboardStickyView>
        </>
      }
    />
  );
}
