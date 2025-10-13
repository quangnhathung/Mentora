import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useColorScheme } from 'nativewind';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';

import { translate } from '@/shared/lib';
import { colors, ControlledInput, View } from '@/shared/ui';
import { Modal, useModal } from '@/shared/ui/modal';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { Text } from '@/shared/ui/text';

export type CreatePostModalProps = {
  onSubmit?: (payload: { title: string; content: string }) => Promise<void> | void;
  initialTitle?: string;
  initialContent?: string;
};

export type CreatePostModalRef = {
  modal: BottomSheetModal;
  submit: () => void;
};

const TITLE_MAX = 70;
const CONTENT_MAX = 1000;

const schema = z.object({
  title: z
    .string({ required_error: translate('form.error.required') })
    .min(1, translate('form.error.required'))
    .max(TITLE_MAX),
  content: z
    .string({ required_error: translate('form.error.required') })
    .min(10, translate('form.error.required'))
    .max(CONTENT_MAX),
});

type FormValues = z.infer<typeof schema>;

export const CreatePostModal = forwardRef<CreatePostModalRef, CreatePostModalProps>(
  ({ initialTitle = '', initialContent = '', onSubmit }, fwRef) => {
    const { ref } = useModal();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const insets = useSafeAreaInsets();

    const { control, handleSubmit, reset, watch } = useForm<FormValues>({
      defaultValues: { title: initialTitle, content: initialContent },
      resolver: zodResolver(schema),
      mode: 'onChange',
    });

    const wTitle = watch('title') || '';
    const wContent = watch('content') || '';

    const handleClose = useCallback(() => {
      reset({ title: initialTitle, content: initialContent });
    }, [reset, initialTitle, initialContent]);

    const onSubmitHandler = useCallback(
      async (data: FormValues) => {
        try {
          if (onSubmit) await onSubmit(data);
          ref.current?.dismiss();
          handleClose();
        } catch (err) {
          console.error('CreatePostModal submit error:', err);
        }
      },
      [onSubmit, ref, handleClose]
    );

    useImperativeHandle(fwRef, () => ({
      modal: ref.current!,
      submit: () => handleSubmit(onSubmitHandler)(),
    }));

    return (
      <Modal
        ref={ref}
        snapPoints={['90%']}
        onDismiss={handleClose}
        bottomInset={insets.bottom}
        backgroundStyle={{
          backgroundColor: isDark ? colors.background.dark.light : (colors.white.DEFAULT as string),
        }}
      >
        <View
          className="flex-1 px-4 pt-4"
          testID="createPostModal"
          // style={{ paddingBottom: insets.bottom }}
        >
          <View className="flex-1">
            {/* Title */}
            <ControlledInput
              testID="title-input"
              control={control}
              dark
              name="title"
              disabled={false}
              editable
              className={`pb-5 font-bevietnampro-bold text-secondary`}
              label={translate('community.form.title')}
              placeholder={translate('community.form.title_placeholder')}
              placeholderTextColor={colors.gray.DEFAULT}
              maxLength={TITLE_MAX}
              accessibilityLabel="Post title"
              maxLengthRender={
                <Text className="absolute bottom-2 right-2 text-right text-xs text-white dark:text-white">
                  {wTitle.length}/{TITLE_MAX}
                </Text>
              }
            />

            {/* Content */}
            <ControlledInput
              testID="content-input"
              control={control}
              dark
              name="content"
              label={translate('community.form.content')}
              placeholder={translate('community.form.content_placeholder')}
              placeholderTextColor={colors.gray.DEFAULT}
              maxLength={CONTENT_MAX}
              multiline
              disabled={false}
              editable
              className={`pb-5`}
              numberOfLines={6}
              accessibilityLabel="Post content"
              maxLengthRender={
                <Text className="absolute bottom-2 right-2 text-right text-xs text-white dark:text-white">
                  {wContent.length}/{CONTENT_MAX}
                </Text>
              }
            />
          </View>

          <View className="py-2">
            <Text testID="helperNote" className="text-left text-xs text-gray dark:text-gray">
              * Your post will be reviewed before it's published.
            </Text>
            <PrimaryButton
              // testID="createButton"
              title={translate('common.create')}
              className={`my-1`}
              textStyle={`uppercase`}
              onPress={handleSubmit(onSubmitHandler)}
            />
          </View>
        </View>
      </Modal>
    );
  }
);

export default CreatePostModal;
