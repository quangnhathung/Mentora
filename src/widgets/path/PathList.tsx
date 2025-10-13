import React from 'react';

import { usePathStore } from '@/entities/path/usePathStore';
import { translate } from '@/shared/lib';
import { Text } from '@/shared/ui';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';
import { TopicList } from '@/widgets/topic/TopicList';

export const PathList = () => {
  const { path } = usePathStore();
  const topics = path?.data?.topics;

  return topics?.map((item) => (
    <TopicList
      header={
        <>
          <Text className={`w-full justify-center pt-2 text-center font-baloo text-base`}>
            {translate('entity.topic')}
          </Text>
          <TextGradient
            className={`from-primary via-white to-primary text-center font-baloo text-xl uppercase tracking-widest`}
            content={`${item?.name}`}
            colors={['primary', 'white', 'primary']}
          />
        </>
      }
      key={`'topic-list${item.id}`}
      data={item}
    />
  ));
};
