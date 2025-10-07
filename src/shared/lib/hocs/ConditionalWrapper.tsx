import type { ReactElement, ReactNode } from 'react';
import React from 'react';
type ConditionalWrapperProps = {
  condition?: boolean;
  wrapper: (children: ReactNode, condition: boolean) => ReactNode; // hoặc JSX.Element nếu bạn muốn chặt chẽ hơn
  children: ReactNode;
};

export function ConditionalWrapper({
  condition = false,
  wrapper,
  children,
}: ConditionalWrapperProps): ReactElement {
  // Dùng Fragment để đảm bảo component luôn trả về một element
  return <>{wrapper(children, condition)}</>;
}
