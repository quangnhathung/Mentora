import React from 'react';

import { ScrollView, Text, TouchableOpacity, View } from '@/shared/ui';

export type Filter = {
  key: string;
  label: string;
};

type props = {
  value: string; //choice
  onChange: (v: any) => void;
  className?: string;
  data: Filter[];
};

export function LevelFilter({ value, onChange, data }: props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-2 pl-2 pr-6">
        {data.map((l) => {
          const active = l.key === value;
          return (
            <TouchableOpacity key={l.key} onPress={() => onChange(l.key)} testID={`level-${l.key}`}>
              <View
                className={`rounded-3xl border-2 border-[#6366F1] px-5 py-1 ${active ? 'bg-primary' : 'bg-transparent'}`}
              >
                <Text
                  className={`min-w-[30px] text-center font-bevietnampro text-base font-bold ${active ? 'dark:text-white' : ''}`}
                >
                  {l.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
