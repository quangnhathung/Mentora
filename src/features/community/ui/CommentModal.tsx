import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useColorScheme } from 'nativewind';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';

import { translate } from '@/shared/lib';
import useKeyboardHeight from '@/shared/lib/hooks/useRnKeyboardHeight';
import { colors, ControlledInput, View } from '@/shared/ui';
import { Modal, useModal } from '@/shared/ui/modal';
import BottomSheetKeyboardAwareScrollView from '@/shared/ui/modal-keyboard-aware-scroll-view';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

export type CommentModalProps = {
  onSubmit?: (text: string) => Promise<void> | void;
  initialText?: string;
};

export type CommentModalRef = {
  modal: BottomSheetModal;
};

const MAX = 500;
const schema = z.object({
  text: z
    .string({ required_error: translate('form.error.required') })
    .min(1, translate('form.error.required'))
    .max(MAX),
});

type FormValues = z.infer<typeof schema>;

export const CommentModal = forwardRef<CommentModalRef, CommentModalProps>(
  ({ initialText = '', onSubmit }, fwRef) => {
    const { ref, dismiss } = useModal();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const insets = useSafeAreaInsets();

    const kbH = useKeyboardHeight();
    const snapPoint = Platform.OS === 'web' ? 320 : 220;
    const snapPoint2 = Platform.OS === 'web' ? 320 : 480;
    const available = Platform.OS === 'web' ? 320 : Math.max(400, snapPoint + kbH);

    const { control, handleSubmit, reset, watch } = useForm<FormValues>({
      defaultValues: { text: initialText },
      resolver: zodResolver(schema),
      mode: 'onChange',
    });

    const _ = watch('text') || '';

    useImperativeHandle(fwRef, () => ({
      modal: ref.current!,
    }));

    const onSubmitHandler = async (data: FormValues) => {
      try {
        if (onSubmit) await onSubmit(data.text);
        dismiss();
        reset({ text: '' });
      } catch (e) {
        console.error('CommentModal submit error:', e);
      }
    };

    // Dynamically size the second snap point to available height when keyboard opens (native only)
    useEffect(() => {
      if (Platform.OS === 'web') return;
      if (kbH <= 0) requestAnimationFrame(() => ref.current?.snapToIndex?.(0));

      requestAnimationFrame(() => ref.current?.snapToIndex?.(2));
    }, [ref, kbH]);

    return (
      <Modal
        ref={ref}
        snapPoints={[snapPoint, snapPoint2, available]}
        backgroundStyle={{
          backgroundColor: isDark
            ? (colors.background.dark.light as string)
            : (colors.white.DEFAULT as string),
        }}
      >
        <BottomSheetKeyboardAwareScrollView>
          <View className="flex-1 px-4 pt-4" style={{ paddingBottom: insets.bottom }}>
            <ControlledInput
              control={control}
              name="text"
              dark
              label={translate('common.comment')}
              placeholder={translate('community.form.content_placeholder')}
              placeholderTextColor={colors.gray.DEFAULT}
              maxLength={MAX}
              multiline
              onFocus={() => ref.current?.snapToIndex?.(1)}
              editable
              className={`pb-5`}
              numberOfLines={4}
            />
            <PrimaryButton
              title={translate('common.submit')}
              className={`my-1`}
              textStyle={`uppercase`}
              onPress={handleSubmit(onSubmitHandler)}
            />
          </View>
        </BottomSheetKeyboardAwareScrollView>
      </Modal>
    );
  }
);

export default CommentModal;
