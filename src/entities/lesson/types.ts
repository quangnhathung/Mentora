import { type Audio } from '@/entities/audio/types';
import { type Quiz } from '@/entities/quizzes/types';
import { translate } from '@/shared/lib';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';

export type LessonState = 'complete' | 'inprogress' | 'locked';
export type Lesson = {
  id?: number;
  name?: string;
  image?: string;
  state?: LessonState;
  context?: string;
  unitId?: number;
  lessonId?: number;
  order?: number;
  segments?: Audio[];
  quizzes?: Quiz[];
};

export type GetAllLessonStepsByLessonIdPathParams = { lessonId: number };

export type LessonDetailResponse = { data: Lesson[] } & {
  offset: 1;
  limit: 10;
  count: 100;
};

export const convertLessonsToChoices = (lessons: Lesson[]): ChoiceBase[] => {
  return lessons.map((lesson) => ({
    id: lesson.id ?? '',
    value: String(lesson.id ?? ''), // <-- dùng chính lesson.id
    description: `<p class="justify-start"><span class="text-white">${
      lesson.name ?? ''
    }</span></p>${lesson.state === 'complete' ? `<p class="justify-start"><span class="dark:text-secondary text-xxs">${translate('common.complete')}</span></p>` : ''}`,
  }));
};
