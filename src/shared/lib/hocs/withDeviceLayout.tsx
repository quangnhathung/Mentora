import React from 'react';

import { useLayout } from '@/shared/lib/hooks/useLayout';
import { MobileLandscape } from '@/shared/ui/layouts/devices/MobileLandscape';
import { MobilePortrait } from '@/shared/ui/layouts/devices/MobilePortrait';
import { Tablet } from '@/shared/ui/layouts/devices/Tablet';
import { Web } from '@/shared/ui/layouts/devices/Web';

const MAP = {
  'mobile-portrait': MobilePortrait,
  'mobile-landscape': MobileLandscape,
  tablet: Tablet,
  web: Web,
} as const;

export function withDeviceLayout<P extends object>(
  Comp: React.ComponentType<P>
): React.ComponentType<P> {
  const WithDeviceLayout: React.FC<P> = (props) => {
    const layout = useLayout();
    const Wrapper = MAP[layout];

    return (
      <Wrapper>
        <Comp {...props} />
      </Wrapper>
    );
  };
  return WithDeviceLayout;
}
