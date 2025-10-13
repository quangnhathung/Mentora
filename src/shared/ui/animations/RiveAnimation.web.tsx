// RiveAnimation.web.tsx
import type Rive from '@rive-app/react-canvas';
import { useRive } from '@rive-app/react-canvas';
import React, { useImperativeHandle } from 'react';

import { type RadioButtonHandle } from './RiveAnimation';
// @ts-ignore dùng lại resolver của RN để lấy uri cho require(...)

type RiveComponentProps = Omit<React.ComponentProps<typeof Rive>, 'src'> & {
  source: string;
  selected?: number | undefined;
  autoplay?: boolean | undefined;
  className?: string | undefined;
  animationName?: string | undefined;
  forwardedRef?: React.ForwardedRef<RadioButtonHandle> | undefined;
};

const RiveAnimation = ({
  source,
  forwardedRef,
  animationName,
  autoplay = true,
  ...rest
}: RiveComponentProps) => {
  const { rive, RiveComponent } = useRive({
    src: source,
    animations: animationName,
    // stateMachines: 'bumpy',
    autoplay,
  });

  /** Phát animation khi được chọn */
  const playSelect = () => {
    rive?.play();
    // riveRef.current?.play('active');
  };

  /** Phát animation khi bỏ chọn */
  const playDeselect = () => {
    // riveRef.current?.play('inactive');
    rive?.stop();
    rive?.reset();
  };

  /* Expose hàm ra ngoài cho Parent */
  useImperativeHandle(forwardedRef, () => ({
    select: playSelect,
    deselect: playDeselect,
  }));

  return <RiveComponent {...rest} />;
};

export default RiveAnimation;
