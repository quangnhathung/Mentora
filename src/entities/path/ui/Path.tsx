import { View } from 'react-native';

import LeftPathSvg from '@/shared/ui/svg/LeftPathSvg';
import RightPathSvg from '@/shared/ui/svg/RightPathSvg';

const Path = ({
  direction,
  active,
  height,
  textHeight,
}: {
  direction: string;
  active: boolean;
  height: number;
  textHeight: number;
}) => {
  const top = Math.floor((height - textHeight) / 2);

  return (
    <View style={{ top }}>
      {direction === 'left' ? <RightPathSvg active={active} /> : <LeftPathSvg active={active} />}
    </View>
  );
};

export default Path;
