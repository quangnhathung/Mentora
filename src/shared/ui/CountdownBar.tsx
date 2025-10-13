// CountdownBar.tsx
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Easing, type LayoutChangeEvent, Text, View } from 'react-native';

import { SvgIcon } from '@/shared/ui/SvgIcon';

type Props = {
  seconds: number; // total seconds
  running?: boolean; // start/pause control
  points?: number; // star count pill
  onTick?: (remainingSec: number) => void; // callback (no logging inside)
  onExpire?: () => void; // callback when expired
  className?: string;
  barBgClass?: string;
  barFillClass?: string;
  clockColorClass?: string;
};

export type CountdownBarRef = {
  pause: () => void;
  resume: () => void;
  reset: (sec?: number) => void;
  remaining: () => number;
  isExpired: () => boolean;
};

const CountdownBar = forwardRef<CountdownBarRef, Props>(
  (
    {
      seconds,
      running = true,
      points,
      onTick,
      onExpire,
      className = 'w-full',
      barBgClass = 'bg-white',
      barFillClass = 'bg-teal-300',
      clockColorClass = 'text-teal-300',
    },
    ref
  ) => {
    // animated value: 1 => full, 0 => empty
    const anim = useRef(new Animated.Value(1)).current;

    // measured width of the bar container (px)
    const [barWidthPx, setBarWidthPx] = useState<number | null>(null);

    // remaining seconds (float)
    const remainingRef = useRef<number>(seconds);
    const [remaining, setRemaining] = useState<number>(seconds);

    // expired flag
    const [expired, setExpired] = useState(false);

    // interval ref (ReturnType<typeof setInterval> avoids NodeJS.Timer deprecation)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // helper: clear interval
    const clearTick = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // start ticking (update remainingRef frequently)
    const startTick = () => {
      clearTick();
      const startedAt = Date.now();
      const initialRemain = remainingRef.current;
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startedAt) / 1000;
        const r = Math.max(0, initialRemain - elapsed);
        remainingRef.current = r;
        setRemaining(r);
        // call onTick WITHOUT logging here
        onTick?.(r);
      }, 200);
    };

    // start animation for `durationMs` from current anim value -> 0
    const startAnim = (durationMs: number) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: Math.max(0, Math.round(durationMs)),
        easing: Easing.linear,
        useNativeDriver: false, // animating width number (not supported natively)
      }).start(({ finished }) => {
        if (finished) {
          clearTick();
          remainingRef.current = 0;
          setRemaining(0);
          setExpired(true);
          // call onExpire WITHOUT logging here
          onExpire?.();
        }
      });
    };

    // begin countdown (resume) using remainingRef
    const resumeInternal = () => {
      setExpired(false);
      const r = Math.max(0, remainingRef.current);
      const ratio = seconds > 0 ? r / seconds : 0;
      anim.setValue(ratio);
      startTick();
      startAnim(Math.round(r * 1000));
    };

    // pause: stop animation & tick, capture current anim value as remaining
    const pauseInternal = () => {
      anim.stopAnimation((val) => {
        const ratio = Number(val ?? 0);
        const r = Math.max(0, Math.min(seconds, seconds * ratio));
        remainingRef.current = r;
        setRemaining(r);
      });
      clearTick();
    };

    // reset to given seconds (or initial seconds)
    const resetInternal = (sec?: number) => {
      const s = sec ?? seconds;
      clearTick();
      anim.stopAnimation();
      anim.setValue(1);
      remainingRef.current = s;
      setRemaining(s);
      setExpired(false);
      if (running) {
        resumeInternal();
      }
    };

    // expose ref methods
    useImperativeHandle(ref, () => ({
      pause: pauseInternal,
      resume: resumeInternal,
      reset: resetInternal,
      remaining: () => remainingRef.current,
      isExpired: () => expired,
    }));

    // handle running / seconds changes
    useEffect(() => {
      remainingRef.current = seconds;
      setRemaining(seconds);
      setExpired(false);
      anim.stopAnimation();
      anim.setValue(1);

      if (running) {
        // start after a tick to reduce race with layout
        setTimeout(() => {
          resumeInternal();
        }, 0);
      } else {
        pauseInternal();
      }

      return () => clearTick();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds, running]);

    // measure bar width
    const onBarLayout = (e: LayoutChangeEvent) => {
      const w = e.nativeEvent.layout.width;
      setBarWidthPx(w);
    };

    // compute width style for filled bar based on anim and measured px
    const fillStyle =
      barWidthPx != null
        ? {
            width: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, barWidthPx],
            }),
          }
        : { width: 0 };

    // format mm:ss display (ceil seconds to show)
    const fmt = (s: number) => {
      const whole = Math.ceil(s);
      const m = Math.floor(whole / 60);
      const ss = whole % 60;
      return `${m}:${String(ss).padStart(2, '0')}`;
    };

    return (
      <View className={`flex-row items-center ${className}`}>
        {/* bar */}
        <View
          className={`h-2 flex-1 overflow-hidden rounded-full ${barBgClass} mr-3`}
          onLayout={onBarLayout}
        >
          {/* filled bar — Animated.View supports style width numeric */}
          <Animated.View className={`${barFillClass} h-full rounded-full`} style={fillStyle} />
        </View>

        {/* clock + time */}
        <View className="mr-3 flex-row items-center">
          <SvgIcon name="clock" size={16} color="cyan" />
          <Text className={`ml-1 font-bold text-cyan ${clockColorClass}`}>{fmt(remaining)}</Text>
        </View>

        {/* points pill */}
        {typeof points === 'number' && (
          <View className="flex-row items-center rounded-full bg-secondary px-3 py-1">
            <SvgIcon name="star" size={14} />
            <Text className="ml-2 font-bold text-white">{points}</Text>
          </View>
        )}
      </View>
    );
  }
);

export default CountdownBar;
