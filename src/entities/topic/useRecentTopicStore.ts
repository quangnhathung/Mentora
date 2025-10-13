import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type Topic } from '@/entities/topic/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

interface RecentTopicsState {
  recentTopics: Topic[];
  addTopic: (topic: Topic) => void;
  clearTopics: () => void;
}

export const useRecentTopicsStore = create<RecentTopicsState>()(
  persist(
    (set, get) => ({
      recentTopics: [],
      addTopic: (topic: Topic) => {
        const current = get().recentTopics;
        const filtered = current.filter((t) => t.id !== topic.id);
        const updated = [topic, ...filtered].slice(0, 7);
        set({ recentTopics: updated });
      },
      clearTopics: () => set({ recentTopics: [] }),
    }),
    {
      name: 'recent-topics-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
