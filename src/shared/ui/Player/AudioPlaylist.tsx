import { type AudioStatus, setAudioModeAsync } from 'expo-audio';
import React, { forwardRef, memo, useEffect, useImperativeHandle } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { type UsePlayerReturn } from '@/shared/lib/hooks/usePlayer';
import { usePlayerStore } from '@/shared/lib/storage/player/usePlayerStore';
import colors from '@/shared/ui/colors';
import { Image } from '@/shared/ui/image';
import { SvgIcon } from '@/shared/ui/SvgIcon';

type AudioPlaylistProps = {
  sources: string[];
  audio: UsePlayerReturn;
  image: string;
  pageIndex: number;
  onReplay: () => void;
};

export type AudioPlaylistRef = {
  status: AudioStatus;
  timeSV: SharedValue<number>;
  isPlayingSV: SharedValue<boolean>;
  lastTrackIndex: SharedValue<number>;
};

const AudioPlaylist = forwardRef<AudioPlaylistRef, AudioPlaylistProps>(
  ({ image, sources, audio, onReplay }, ref) => {
    const { trackIndex, setIsPlaying } = usePlayerStore();

    const { player, timeSV, lastTrackIndex, isPlayingSV, status, play, pause, seekTo, stop } =
      audio;

    useImperativeHandle(ref, () => ({
      status,
      timeSV,
      isPlayingSV,
      lastTrackIndex,
    }));

    useEffect(() => {
      setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    }, []);

    useEffect(() => {
      if (status.didJustFinish) {
        // console.log('debug status.didJustFinish', status.didJustFinish);
        pause();
        seekTo(0);
        const nextIndex = trackIndex + 1;
        if (nextIndex < sources.length) {
          // setTrackIndex(nextIndex);
          setIsPlaying(true);
        } else {
          // add final step here
          stop();
          // if (Platform.OS !== 'web') {
          // }
          setIsPlaying(false);
        }
      }
    }, [status.didJustFinish]);

    // 🧭 helpers cho seek nhanh
    // const seekBy = (deltaSec: number) => {
    //   // đọc current time từ shared value và nhảy delta
    //   const next = Math.max(0, timeSV.value + deltaSec);
    //   seekTo(next);
    // };

    // Xử lý nút Play/Pause
    const handlePause = async () => {
      if (!player) return;

      pause();
      setIsPlaying(false);
    };

    const handlePlay = () => {
      if (!player) return;
      play(trackIndex);
      setIsPlaying(true);
    };

    return (
      <View className="hidden rounded-2xl">
        <View
          className="mb-4 w-full items-center justify-center"
          style={{ height: Platform.OS === 'web' ? moderateScale(250) : moderateScale(200) }}
        >
          <Image
            source={{ uri: image }}
            contentFit="cover"
            className="size-full rounded-2xl border border-white"
          />
          <View
            className={`z-9 absolute top-0 size-full items-center justify-center rounded-2xl bg-black/60`}
          >
            <View className="z-10 size-full items-center justify-center">
              {/* <Wave /> */}
              <View
                className={`absolute bottom-0 w-full flex-row items-center justify-between p-4`}
              >
                {status.playing ? (
                  <Pressable
                    className={``}
                    onPress={handlePause}
                    disabled={!sources.length}
                    accessibilityRole="button"
                  >
                    <SvgIcon name="pause" color={colors.white.DEFAULT} size={32} />
                  </Pressable>
                ) : (
                  <Pressable
                    className={``}
                    onPress={handlePlay}
                    disabled={!sources.length}
                    accessibilityRole="button"
                  >
                    <SvgIcon name="play" color={colors.white.DEFAULT} size={32} />
                  </Pressable>
                )}
                <Pressable
                  className={``}
                  onPress={() => onReplay()}
                  accessibilityRole="button"
                  accessibilityLabel="Replay all"
                >
                  <SvgIcon name="replay" color={colors.white.DEFAULT} size={32} />
                </Pressable>
              </View>
            </View>
          </View>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
          <Button title="Previous" onPress={handlePrevious} disabled={trackIndex === 0} />
          <Button title="Next" onPress={handleNext} disabled={trackIndex >= sources.length - 1} />
        </View> */}
        </View>
      </View>
    );
  }
);

export default memo(AudioPlaylist);
