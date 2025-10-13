// useKaraokeClock.expo-audio.ts
import {
  type AudioPlayer,
  type AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';
import { useEffect, useMemo } from 'react';
import { type SharedValue, useFrameCallback, useSharedValue } from 'react-native-reanimated';

type UseKaraokeClockOptions = {
  /**
   * ms giữa các lần player phát status -> càng lớn càng tiết kiệm,
   * UI vẫn mượt nhờ nội suy trên UI thread.
   */
  statusUpdateIntervalMs?: number; // mặc định 200ms
  /**
   * Giới hạn trần tốc độ nội suy (1.0 = bình thường). Nếu bạn cho phép playbackRate,
   * có thể truyền vào để nội suy đúng tốc độ.
   */
  maxRate?: number; // mặc định 2.0
};

export type UsePlayerReturn = {
  status: AudioStatus;
  timeSV: SharedValue<number>;
  lastTrackIndex: SharedValue<number>;
  durationSV: SharedValue<number>;
  isPlayingSV: SharedValue<boolean>;
  rateSV: SharedValue<number>;
  play: (trackIndex: number) => Promise<void>;
  pause: () => Promise<void>;
  seekTo: (sec: number) => Promise<void>;
  stop: () => Promise<void>;
  player: AudioPlayer;
};

export function usePlayer(source: string, opts: UseKaraokeClockOptions = {}): UsePlayerReturn {
  const { statusUpdateIntervalMs = 500 } = opts;

  // 1) Tạo player
  const player = useAudioPlayer(source, statusUpdateIntervalMs);

  // 2) Lấy snapshot status (hook này có thể gây re-render NHƯNG
  // ta không dùng status trực tiếp trong render của UI, chỉ bridge sang SharedValue)
  const status = useAudioPlayerStatus(player);

  // 3) SharedValues chạy trên UI thread
  const timeSV = useSharedValue(0); // giây, clock cho karaoke UI
  const durationSV = useSharedValue(0); // giây
  const isPlayingSV = useSharedValue(false);
  const rateSV = useSharedValue(1);
  const lastTrackIndex = useSharedValue(1);

  // Anchor để nội suy mượt giữa 2 status
  const _anchorTimeSV = useSharedValue(0); // currentTime tại lần sync gần nhất (s)
  const _lastFrameMsSV = useSharedValue(0); // frame timestamp của UI thread (ms)

  // 6) API điều khiển: gọi trực tiếp player (native) + đồng bộ SV để UI phản hồi tức thì
  const controls = useMemo(() => {
    return {
      play: async (trackIndex: number) => {
        await player.play();
        // status sẽ cập nhật sau; UI có thể phản hồi tức thì:
        lastTrackIndex.value = trackIndex;
        isPlayingSV.value = true;
        _lastFrameMsSV.value = 0; // reset mốc frame
      },
      pause: async () => {
        await player.pause();
        isPlayingSV.value = false;
      },
      seekTo: async (sec: number) => {
        await player.seekTo(sec);
        // đồng bộ ngay SV để UI nhảy tức thì
        _anchorTimeSV.value = sec;
        timeSV.value = sec;
        _lastFrameMsSV.value = 0;
      },
      stop: async () => {
        // expo-audio không auto reset về 0 khi xong (khác expo-av) -> ta tự xử
        await player.pause();
        await player.seekTo(0);
        isPlayingSV.value = false;
        _anchorTimeSV.value = 0;
        timeSV.value = 0;
        _lastFrameMsSV.value = 0;
      },
      // expose thô nếu cần cấu hình thêm
      player,
    };
  }, [player, isPlayingSV, _anchorTimeSV, timeSV, _lastFrameMsSV]);

  // 4) Mỗi lần status đổi -> đồng bộ anchor + SV (ít lần/giây)
  // useEffect(() => {
  //   if (!status) return;
  //   const { currentTime = 0, duration = 0, isPlaying = false, rate = 1 } = status as any;

  //   durationSV.value = duration || 0;
  //   isPlayingSV.value = !!isPlaying;
  //   rateSV.value = Math.min(maxRate, Math.max(0.25, Number(rate) || 1));

  //   // đồng bộ đồng hồ: đặt anchor và set timeSV ngay lập tức
  //   _anchorTimeSV.value = Number(currentTime) || 0;
  //   if (Platform.OS === 'web') {
  //     timeSV.value = _anchorTimeSV.value > 0 ? _anchorTimeSV.value / 1000 : 0;
  //   } else {
  //     timeSV.value = _anchorTimeSV.value;
  //   }

  //   // reset mốc frame để delta tính từ frame tiếp theo
  //   _lastFrameMsSV.value = 0;
  // }, [status, durationSV, isPlayingSV, rateSV, _anchorTimeSV, _lastFrameMsSV, timeSV, maxRate]);

  useEffect(() => {
    if (status.didJustFinish) {
      isPlayingSV.value = false;
      _anchorTimeSV.value = 0;
      timeSV.value = 0;
      _lastFrameMsSV.value = 0;
    }
  }, [status.didJustFinish]);

  // 5) Nội suy theo frame (UI thread) → mượt, không re-render React
  useFrameCallback(({ timestamp: frameNowMs }) => {
    if (!isPlayingSV.value) {
      _lastFrameMsSV.value = frameNowMs; // giữ đồng bộ khi pause
      return;
    }
    if (_lastFrameMsSV.value === 0) {
      _lastFrameMsSV.value = frameNowMs;
      return;
    }
    const deltaMs = frameNowMs - _lastFrameMsSV.value;
    _lastFrameMsSV.value = frameNowMs;

    const next = timeSV.value + (deltaMs / 1000) * rateSV.value;
    // clamp tới duration (đề phòng chạy quá đuôi)
    const dur = durationSV.value || Infinity;
    timeSV.value = next > dur ? dur : next;
  });

  return {
    // clock cho UI karaoke (đọc trên UI thread)
    status,
    timeSV,
    lastTrackIndex,
    durationSV,
    isPlayingSV,
    rateSV,
    // điều khiển native
    ...controls,
  };
}
