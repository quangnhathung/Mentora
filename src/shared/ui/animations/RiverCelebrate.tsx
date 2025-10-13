import { cssInterop } from 'nativewind';
import React, { forwardRef, useMemo } from 'react';
// @ts-ignore
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Rive, { type RiveRef } from 'rive-react-native';

type RiveComponentProps = Omit<React.ComponentProps<typeof Rive>, 'url' | 'resourceName'> & {
  source: string | number;
  className?: string | undefined;
};

const isValidUrl = (uri: string | undefined): boolean => {
  if (!uri) return false;
  return uri.startsWith('http') || uri.startsWith('file');
};

const RiveNW = cssInterop(Rive, { className: 'style' });

const RiveCelebration = forwardRef<RiveRef, RiveComponentProps>(({ source, ...riveProps }, ref) => {
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

  return <RiveNW ref={ref} {...riveProps} {...riveConfig} />;
});

export default RiveCelebration;
