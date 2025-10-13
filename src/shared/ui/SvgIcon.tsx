// src/shared/ui/SvgIcon.tsx
import Achievement from '@assets/images/svgs/achievement.svg';
import Add from '@assets/images/svgs/add.svg';
import Saved from '@assets/images/svgs/add.svg';
import ArrowLeft from '@assets/images/svgs/arrow-left.svg';
import Badge from '@assets/images/svgs/badge.svg';
import Book from '@assets/images/svgs/book.svg';
import Calendar from '@assets/images/svgs/calendar.svg';
import CatWithCup from '@assets/images/svgs/CatWithCup.svg';
import Checked from '@assets/images/svgs/checked.svg';
import CheckfailGray from '@assets/images/svgs/checkfailgray.svg';
import ChevronDown from '@assets/images/svgs/ChevronDown.svg';
import ChevronUp from '@assets/images/svgs/ChevronUp.svg';
import Clock from '@assets/images/svgs/clock.svg';
import Comment from '@assets/images/svgs/comment.svg';
import Community from '@assets/images/svgs/community.svg';
import Compass from '@assets/images/svgs/compass.svg';
import Congratulation from '@assets/images/svgs/congratulation.svg';
import Credit from '@assets/images/svgs/credit.svg';
import Customer from '@assets/images/svgs/Customer.svg';
import Edit from '@assets/images/svgs/edit.svg';
import Error from '@assets/images/svgs/error.svg';
import Facebook from '@assets/images/svgs/facebook.svg';
import Feed from '@assets/images/svgs/feed.svg';
import Feedback from '@assets/images/svgs/feedback.svg';
import Fire from '@assets/images/svgs/fire.svg';
import Flag from '@assets/images/svgs/flag.svg';
import Flame from '@assets/images/svgs/flame.svg';
import Games from '@assets/images/svgs/game.svg';
import HandClap from '@assets/images/svgs/handclap.svg';
import Heart from '@assets/images/svgs/heart.svg';
import Help from '@assets/images/svgs/help.svg';
import Home from '@assets/images/svgs/home.svg';
import Increase from '@assets/images/svgs/increase.svg';
import Instruction from '@assets/images/svgs/instructions.svg';
import Language from '@assets/images/svgs/language.svg';
import Leaderboard from '@assets/images/svgs/leaderboard.svg';
import LeaderboardStage from '@assets/images/svgs/leaderboard-stage.svg';
import Like from '@assets/images/svgs/like.svg';
import Link from '@assets/images/svgs/link.svg';
import Lock from '@assets/images/svgs/LockGray.svg';
import Logout from '@assets/images/svgs/logout.svg';
import Mission from '@assets/images/svgs/mission.svg';
import News from '@assets/images/svgs/news.svg';
import Pause from '@assets/images/svgs/pause.svg';
import Performance from '@assets/images/svgs/performance.svg';
import Play from '@assets/images/svgs/play.svg';
import PlaySound from '@assets/images/svgs/play-sound.svg';
import Profile from '@assets/images/svgs/profile.svg';
import Rating from '@assets/images/svgs/rating.svg';
import Replay from '@assets/images/svgs/replay.svg';
import Report from '@assets/images/svgs/report.svg';
import Reset from '@assets/images/svgs/reset.svg';
import SecondaryButtonPlay from '@assets/images/svgs/secondary-button-play.svg';
import Share from '@assets/images/svgs/share.svg';
import Speaker from '@assets/images/svgs/speaker.svg';
import Star from '@assets/images/svgs/star.svg';
import Reward from '@assets/images/svgs/star.svg';
import Structure from '@assets/images/svgs/structure.svg';
import Talk from '@assets/images/svgs/talk.svg';
import Theme from '@assets/images/svgs/theme.svg';
import Tiktok from '@assets/images/svgs/tiktok.svg';
import Translation from '@assets/images/svgs/translation.svg';
import UnlockAchieve from '@assets/images/svgs/unlock-achieve.svg';
import Verified from '@assets/images/svgs/verified.svg';
// import TranslationSvg from './svg/TranslationSvg';
import Voice from '@assets/images/svgs/voice.svg';
import Website from '@assets/images/svgs/website.svg';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

const ICONS = {
  flame: Flame,
  heart: Heart,
  star: Star,
  compass: Compass,
  community: Community,
  flag: Flag,
  profile: Profile,
  logout: Logout,
  help: Help,
  performance: Performance,
  edit: Edit,
  verified: Verified,
  language: Language,
  link: Link,
  reset: Reset,
  rating: Rating,
  theme: Theme,
  calendar: Calendar,
  achievement: Achievement,
  home: Home,
  mission: Mission,
  book: Book,
  leaderboard: Leaderboard,
  leaderboardStage: LeaderboardStage,
  badge: Badge,
  credit: Credit,
  like: Like,
  comment: Comment,
  games: Games,
  instructions: Instruction,
  arrowleft: ArrowLeft,
  clock: Clock,
  speaker: Speaker,
  checked: Checked,
  error: Error,
  add: Add,
  saved: Saved,
  reward: Reward,
  feed: Feed,
  news: News,
  share: Share,
  report: Report,
  translation: Translation,
  play_sound: PlaySound,
  congratulation: Congratulation,
  Secondary_button_play: SecondaryButtonPlay,
  feedback: Feedback,
  voice: Voice,
  structure: Structure,
  talk: Talk,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  lock: Lock,
  play: Play,
  pause: Pause,
  replay: Replay,
  facebook: Facebook,
  customer: Customer,
  tiktok: Tiktok,
  website: Website,
  checkfailgray: CheckfailGray,
  handclap: HandClap,
  fire: Fire,
  all: Feed,
  beginner: Feed,
  elementary: Feed,
  intermediate: Feed,
  advanced: Feed,
  UnlockAchieve: UnlockAchieve,
  increase: Increase,
  CatWithCup: CatWithCup,
} satisfies Record<string, React.FC<SvgProps>>;

export type IconName = keyof typeof ICONS;
type Props = {
  className?: string;
  name: IconName;
  size?: number;
  color?: string;
};

export const SvgIcon = ({ className, name, size = 24, color = 'white' }: Props) => {
  const Component = useMemo(() => ICONS[name] ?? null, [name]);
  return (
    <View className={`item-center justify-center`}>
      <Component className={className} color={color} width={size} height={size} />
    </View>
  );
};
