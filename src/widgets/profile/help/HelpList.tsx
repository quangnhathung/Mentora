import { useState } from 'react';
import { ScrollView } from 'react-native';

import type { HelpCenter } from '@/app/(tabs)/(profile)/help';
import { AccordionWithGradient } from '@/shared/AccordionWithGradient';
import { Text, View } from '@/shared/ui';

type Props = {
  className?: string;
  data: HelpCenter[];
};

export const HelpList = ({ className, data }: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(data[0].id);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className={`mb-4 w-full ${className ?? ''}`}
    >
      <View className="w-full pb-5">
        {data.map((item) => (
          <AccordionWithGradient
            key={item.id}
            title={item.title}
            isExpand={expandedId === item.id}
            onToggle={
              () => setExpandedId(expandedId === item.id ? null : item.id) // mở/đóng
            }
            className="mt-3"
          >
            <Text className="font-bevietnampro text-base">{item.content}</Text>
          </AccordionWithGradient>
        ))}
      </View>
    </ScrollView>
  );
};
