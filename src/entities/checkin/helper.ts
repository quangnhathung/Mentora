// entities/checkin/helper.ts
import { addDays, format, startOfWeek } from 'date-fns';

import { type DailyCheckinResponse, type DailyCheckinType } from './type';

const DAYS_IN_WEEK = 7;

export const generateWeeklyData = (apiData: DailyCheckinResponse[]): DailyCheckinType[] => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // tuần bắt đầu thứ 2

  const weeklyData: DailyCheckinType[] = [];

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const currentDay = addDays(startOfCurrentWeek, i);
    const dayLabel = format(currentDay, 'EEE'); // Mon, Tue, ...

    // Convert API date (ISO string) thành local Date để so sánh
    const foundRecord = apiData.find((record) => {
      const recordDate = new Date(record.date);
      return recordDate.toDateString() === currentDay.toDateString();
    });

    weeklyData.push({
      id: dayLabel,
      label: dayLabel,
      fullDate: currentDay.toISOString(),
      isChecked: foundRecord ? foundRecord.isChecked : false,
      isMiss: foundRecord ? foundRecord.isMiss : false,
      isToday: currentDay.toDateString() === today.toDateString(),
    });
  }

  return weeklyData;
};
