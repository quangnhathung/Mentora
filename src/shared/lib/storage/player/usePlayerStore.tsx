import { type AudioStatus } from 'expo-audio';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PlayerValues = {
  isPlaying: boolean;
  trackIndex: number;
  pageIndex: number;
  status: AudioStatus | {};
};

interface PlayerState extends PlayerValues {
  setIsPlaying: (bool: boolean) => void;
  setTrackIndex: (idx: number) => void;
  setPageIndex: (idx: number) => void;
  setAudioStatus: (status: AudioStatus) => void;
}

export const usePlayerStore = create<PlayerState>()(
  subscribeWithSelector(
    immer((set) => ({
      isPlaying: false,
      trackIndex: 0,
      pageIndex: 0,
      status: {},
      setIsPlaying: (bool: boolean) => {
        set({ isPlaying: bool });
      },
      setTrackIndex: (idx: number) => {
        set({ trackIndex: idx });
      },
      setPageIndex: (idx: number) => {
        set({ pageIndex: idx });
      },
      setAudioStatus: (status: AudioStatus) => {
        set({ status });
      },
    }))
  )
);

if (__DEV__) {
  // track toàn bộ store, hoặc từng slice
  // @ts-ignore
  console.tron?.trackZustand?.(usePlayerStore);
}
