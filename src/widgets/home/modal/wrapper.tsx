import { vars } from 'nativewind';
import { useState } from 'react';

import UserAvatar from '@/entities/user/ui/UserAvatar';
import { useUserStore } from '@/entities/user/useUserStore';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Pressable, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { SvgIcon } from '@/shared/ui/SvgIcon';

type Props = {
  title: string;
  status: number; //-1:lock , 0: studying, 1: completed
  children: React.ReactNode;
  isExpand?: boolean;
  className?: string;
};

export const AchiveWrapper = ({ title, children, status, className }: Props) => {
  const { profile } = useUserStore();
  const isExpand = status === 0;
  const [expanded, setExpanded] = useState(isExpand);
  const moderateSize = vars({
    '--c-30': `${moderateScale(30)}px`,
  });
  const LockStyle = 'absolute inset-0 -z-10 rounded-xl';

  return (
    <>
      <BottomBorder
        style={moderateSize}
        className={`${className} border-custom-5 w-full rounded-xl`}
      >
        <View
          className={`relative w-full rounded-xl ${status === -1 ? 'bg-background-gray' : 'bg-background-dark'} `}
        >
          <Pressable
            onPress={() => setExpanded(!expanded)}
            className="flex-row items-center justify-between p-1 pr-3"
          >
            <View className="flex-row">
              <UserAvatar
                percent={0}
                size={50}
                imgSize={30}
                strokeWidth={4}
                showPercent={false}
                image={profile?.avatar!}
              />
              <View className="pt-1 text-center">
                <Text className="font-bevietnampro text-[14px]">{title}</Text>
                <Text
                  className={`${
                    status === 1
                      ? `dark:text-secondary`
                      : status === 0
                        ? `dark:text-primary`
                        : `dark:text-[#BABABA]`
                  } font-bevietnampro text-[10px]`}
                >
                  {status === 1
                    ? `${'Completed'}`
                    : status === 0
                      ? `${'In progress'}`
                      : `${'Complete the roadmap first to unlock'}`}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              {status === -1 && <SvgIcon name="lock" size={21} />}
              <SvgIcon name={expanded ? 'chevronUp' : 'chevronDown'} />
            </View>
          </Pressable>

          {expanded && <View className="px-3">{children}</View>}
          {status === -1 && (
            <View className={`${LockStyle} w-full items-end justify-center pb-2`}></View>
          )}
        </View>
      </BottomBorder>
    </>
  );
};
