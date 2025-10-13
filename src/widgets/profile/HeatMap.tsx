import 'global.css';

import { vars } from 'nativewind';
import React, { useState } from 'react';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Text, TouchableOpacity, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { SvgIcon } from '@/shared/ui/SvgIcon';

// Mỗi màu thể hiện mức độ nhiệt (hoặc trạng thái)
const levels: { [key: number]: string } = {
  0: 'bg-[#B1B1B1]',
  1: 'bg-primary',
  2: 'bg-[#7F6FFE]',
  3: 'bg-[#594DB7]',
};

type Props = {
  HeatData: number[][];
  month?: string;
  label1: string;
  label2: string;
};
const moderateSize = vars({
  '--c-17': `${moderateScale(16)}px`,
  '--c-11': `${moderateScale(12)}px`,
  '--c-70': `${moderateScale(70)}px`,
  '--c-120': `${moderateScale(120)}px`,
  '--c-mr': `${moderateScale(5)}px`,
});

export function HeatmapCalendar({ HeatData, label1, label2 }: Props) {
  return (
    <View style={moderateSize} className="flex-col text-center">
      <View className="w-full flex-row">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(
          (d, idx) => (
            <Text key={idx} className="mr-[--c-mr] h-6 text-[12px]">
              {d}
            </Text>
          )
        )}
      </View>
      <View className="flex-row">
        {HeatData.map((week, colIdx) => (
          <View key={colIdx} className="mr-[--c-mr] flex-col">
            {week.map((level, rowIdx) => (
              <View key={rowIdx} className={`${levels[level]} mb-1 size-[--c-17] rounded`} />
            ))}
          </View>
        ))}
      </View>

      <View className="flex-row justify-around">
        <Text className="font-bevietnampro font-bold text-white">{label1}</Text>
        <Text className="pr-4 font-bevietnampro font-bold text-white">{label2}</Text>
      </View>
    </View>
  );
}

type HeatmapLayoutProps = {
  year: number;
  data1: number[][];
  data2: number[][];
  monthRange1: string;
  monthRange2: string;
};

export default function HeatmapLayout({
  year,
  data1,
  data2,
  monthRange1,
  monthRange2,
}: HeatmapLayoutProps) {
  const [selected, setSelected] = useState<'1' | '0'>('1');

  const currentData = selected === '1' ? data1 : data2;

  const range1 = parseRangeLabelToMonths(monthRange1);
  const range2 = parseRangeLabelToMonths(monthRange2);

  return (
    <BottomBorder className={`border-custom-5 mt-4 w-full rounded-b-2xl`}>
      <View style={moderateSize} className="w-full rounded-2xl bg-background-dark-light">
        <View className="flex-row justify-between p-4">
          <SvgIcon name="calendar" />
          <Text className="font-baloo text-lg text-white">
            {translate('profile.heading.heatmap', { year })}
          </Text>
          <Text></Text>
        </View>

        <View className="mx-1 w-full flex-row pb-4">
          <View className="mr-1 h-[--c-120] flex-col">
            <TouchableOpacity
              onPress={() => setSelected('1')}
              className={`mr-1 h-[--c-70] flex-col justify-end border-r-2 border-white pr-1`}
            >
              <Text
                className={`font-bevietnampro text-base ${selected === '1' ? 'dark:text-secondary' : ''}`}
              >
                {monthRange1}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelected('0')}
              className={`mr-1 h-[--c-70] flex-col justify-start border-r-2 border-t-2 border-white pr-1`}
            >
              <Text
                className={`font-bevietnampro text-base ${selected === '0' ? 'dark:text-secondary' : ''}`}
              >
                {monthRange2}
              </Text>
            </TouchableOpacity>
          </View>

          <HeatmapCalendar
            label1={selected === '1' ? range1[0] : range2[0]}
            label2={selected === '0' ? range2[1] : range1[1]}
            HeatData={currentData}
          />
        </View>
      </View>
    </BottomBorder>
  );
}

// utility
function parseRangeLabelToMonths(range: string): string[] {
  const match = range.match(/^T(\d+)-T(\d+)$/);
  if (!match) return [];

  const [, start, end] = match;
  const startMonth = parseInt(start, 10);
  const endMonth = parseInt(end, 10);

  const months: string[] = [];
  for (let m = startMonth; m <= endMonth; m++) {
    months.push(`Tháng ${m}`);
  }

  return months;
}
