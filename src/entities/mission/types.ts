import { translate } from '@/shared/lib';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';

export type MissionStatus = 'complete' | 'available' | 'inprogress' | 'failed' | 'claimed';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type Reward = { type: 'xp' | 'star'; amount: number };
export type Mission = {
  id: number;
  name: string;
  desc?: string;
  descImg?: string;
  image?: string;
  status: MissionStatus;
  completeDate?: number;
  level: DifficultyLevel;
  progress: { current: number; target: number };
  reward: Reward;
};

export type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export type CheckInDay = { key: DayKey; done: boolean };

export type MissionBundle = {
  checkIn: CheckInDay[]; // T2..CN
  missions: Mission[];
};

export type ChallengeBundle = {
  title: string;
  challenges: Mission[];
};

export type AchievementBundle = {
  title: string;
  achievements: Mission[];
};

export type MissionActionResponse = {};
export type MissionResponse = { data: Mission };

export type MissionListResponse = { data: MissionBundle } & {
  offset: 1;
  limit: 10;
  count: 100;
};

export type ChallengeListResponse = { data: ChallengeBundle } & {
  offset: 1;
  limit: 10;
  count: 100;
};

export type AchievementListResponse = { data: AchievementBundle[] } & {
  offset: 1;
  limit: 10;
  count: 100;
};

export const convertMissionToChoices = (mission: Mission[]): ChoiceBase[] => {
  return mission.map((mission) => ({
    id: mission.id ?? '',
    value: String(mission.id ?? ''), // <-- dùng chính mission.id
    description: `<p class="justify-start"><span class="text-white">${
      mission.name ?? ''
    }</span></p>${mission.status === 'complete' ? `<p class="justify-start"><span class="dark:text-secondary text-xxs">${translate('common.complete')}</span></p>` : ''}`,
  }));
};
