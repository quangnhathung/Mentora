import { Platform } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { type Topic } from '@/entities/topic/types';
import { type Unit } from '@/entities/unit/types';
import { Image, Pressable, ProgressBar, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

type TopicItemHorizontalProp = {
  data: Topic;
  direction?: string;
  first?: boolean;
  last?: boolean;
  handleSelect: (unit: Unit) => void;
};

export const TopicItemHorizontal = ({ data = {}, last, handleSelect }: TopicItemHorizontalProp) => {
  return (
    <View
      className={twMerge(
        `px-4 ${Platform.OS === 'web' ? 'w-screen md:max-w-screen-md-half md:pl-4 md:pr-0' : 'w-screen'} flex-col flex-nowrap justify-end py-2 ${last && 'mr-[160px]'}`
      )}
    >
      <Pressable onPress={() => handleSelect(data)}>
        <BottomBorder className={`border-custom-5-light flex-1 rounded-xl`}>
          <GradientView
            colors={['primary-dark', 'primary']}
            containerClassName={`overflow-hidden rounded-xl`}
            className={`w-full justify-end bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
          >
            <View className={`flex-col`}>
              <BottomBorder className={`border-custom-5-light flex-1 rounded-b-3xl`}>
                <View className="h-[--s-topic-image] w-full items-center justify-center overflow-hidden rounded-b-2xl">
                  <Image source={data.image} contentFit="cover" className={`size-full`} />
                  <View className={`absolute size-full bg-black/60 p-3`}>
                    <View className={`flex-1 flex-col`}>
                      <Text className="text-xs capitalize dark:text-cyan">{data.level}</Text>
                      <Text numberOfLines={2} className="w-full text-base">
                        {data.name}
                      </Text>
                    </View>
                  </View>
                </View>
              </BottomBorder>
              <View className={`flex-row p-3`}>
                <View className={`flex-1 flex-col gap-2`}>
                  <View className="flex-row items-center">
                    <Image
                      source={data.image}
                      contentFit="cover"
                      className={`size-[26px] rounded-full border border-white`}
                    />
                    <Image
                      source={data.image}
                      contentFit="cover"
                      className={`z-10 -ml-[13px] size-[26px] rounded-full border border-white`}
                    />
                    <Image
                      source={data.image}
                      contentFit="cover"
                      className={`z-20 -ml-[13px] size-[26px] rounded-full border border-white`}
                    />
                    <View
                      className={`z-30 -ml-[13px] size-[26px] items-center justify-center rounded-full border border-white bg-gray`}
                    >
                      <Text className={`text-[8px]`}>+99</Text>
                    </View>
                    <Text className={`pl-1 text-xs`}> completed this topic</Text>
                  </View>
                  <View className={`flex-col`}>
                    <View className={`flex-row justify-between`}>
                      <Text className="mb-1 text-xs dark:text-white">3 / 12 lessons</Text>
                      <Text className="mb-1 text-end text-xs dark:text-white">40%</Text>
                    </View>
                    <ProgressBar initialProgress={40} />
                  </View>
                </View>
              </View>
            </View>
          </GradientView>
        </BottomBorder>
      </Pressable>
    </View>
  );
};
