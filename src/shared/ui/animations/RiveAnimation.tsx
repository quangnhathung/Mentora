import { cssInterop } from 'nativewind';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
// @ts-ignore
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Rive, { type RiveRef } from 'rive-react-native';

type RiveComponentProps = Omit<React.ComponentProps<typeof Rive>, 'url' | 'resourceName'> & {
  selected?: boolean | undefined;
  source: string | number;
  className?: string | undefined;
  forwardedRef?: React.ForwardedRef<RadioButtonHandle> | undefined;
};

export type RadioButtonHandle = {
  select: () => void;
  deselect: () => void;
};

const isValidUrl = (uri: string | undefined): boolean => {
  if (!uri) return false;
  return uri.startsWith('http') || uri.startsWith('file');
};

const RiveNW = cssInterop(Rive, { className: 'style' });
const RiveAnimation = (props: RiveComponentProps) => {
  const { source, forwardedRef, ...riveProps } = props;

  const riveRef = useRef<RiveRef>(null);

  /** Phát animation khi được chọn */
  const playSelect = () => {
    // rive?.play();
    riveRef.current?.play();
  };

  /** Phát animation khi bỏ chọn */
  const playDeselect = () => {
    // Cách nhanh nhất: phát animation 'inactive'
    // riveRef.current?.play('inactive');
    riveRef.current?.stop();
    riveRef.current?.reset();
  };

  /* Expose hàm ra ngoài cho Parent */
  useImperativeHandle(forwardedRef, () => ({
    select: playSelect,
    deselect: playDeselect,
  }));

  const riveConfig = useMemo(() => {
    if (typeof source === 'string' && isValidUrl(source)) {
      return { url: source };
    }

    const resolved = resolveAssetSource(source);
    const uri = resolved?.uri;
    const isUrl = isValidUrl(uri);

    return {
      resourceName: !isUrl && uri ? uri : undefined,
      url: isUrl ? uri : undefined,
    };
  }, [source]);

  // riveProps.selected = false;
  return <RiveNW ref={riveRef} {...riveProps} {...riveConfig} />;
};

export default RiveAnimation;
