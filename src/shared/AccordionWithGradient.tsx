import { Pressable, Text, View } from '@/shared/ui';
import { SvgIcon } from '@/shared/ui/SvgIcon';

import BottomBorder from './ui/BottomBorder';
import { GradientView } from './ui/GradientView/GradientView';

type Props = {
  title: string;
  children: React.ReactNode;
  isExpand?: boolean; // do cha điều khiển
  onToggle?: () => void; // báo cho cha biết khi bấm
  className?: string;
};

export const AccordionWithGradient = ({
  title,
  children,
  className,
  isExpand = false,
  onToggle,
}: Props) => {
  return (
    <BottomBorder
      className={`${className} ${isExpand ? 'bg-background-dark-light' : 'border-custom-5-light'} w-full rounded-xl`}
    >
      <GradientView
        colors={['primary-dark', 'primary', 'primary-light']}
        containerClassName="rounded-xl"
        className="w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light"
      >
        <Pressable onPress={onToggle} className="flex-row items-center justify-between px-3 py-4">
          <View className="flex-row">
            <Text className="font-baloo text-base">{title}</Text>
          </View>
          <View className="flex-row gap-2">
            <SvgIcon name={isExpand ? 'chevronUp' : 'chevronDown'} />
          </View>
        </Pressable>
      </GradientView>
      {isExpand && (
        <BottomBorder className={`${className} border-custom-5 flex-1 rounded-xl`}>
          <View className="rounded-xl bg-background-dark-light px-4 pb-2">{children}</View>
        </BottomBorder>
      )}
    </BottomBorder>
    // <View style={moderateSize} className={`${className} rounded-2xl border-2 border-white`}>

    // </View>
  );
};
