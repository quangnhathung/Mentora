import React, { useRef, useState } from 'react';

import { FindTheWord } from '@/features/games/ui/FindWords';
import { WordChain } from '@/features/games/ui/WordChain';
import { WordGuess } from '@/features/games/ui/WordGuess';
import { WordSlide } from '@/features/games/ui/WordSlide';
import { Text, View } from '@/shared/ui';
import CountdownBar, { type CountdownBarRef } from '@/shared/ui/CountdownBar';

type GameProps = {
  points: string;
  id?: string;
};

export const GameTemplate = ({ points, id }: GameProps) => {
  const ref = useRef<CountdownBarRef>(null);
  const [running] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);
  //const RiverRef = useRef<RiveRef>(null);
  const [_, setCompleted] = React.useState(false);
  const timming = points === '5' ? 100 : points === '10' ? 220 : 380;

  // useEffect(() => {
  //   if (completed === true) {
  //     RiverRef.current?.play();
  //     setTimeout(() => {
  //       RiverRef.current?.stop();
  //     }, 4000);
  //   }
  // }, [completed, setCompleted, RiverRef]);

  const renderContent = () => {
    switch (id) {
      case '1':
        return (
          <WordGuess
            countdownBarRef={ref}
            onCompleted={() => setCompleted(true)}
            onTryAgain={() => {
              setCompleted(false);
            }}
            isTimeout={isTimeout}
            level={points}
          />
        );
      case '2':
        return (
          <View className="items-center justify-center">
            <FindTheWord
              onCompleted={() => setCompleted(true)}
              onTryAgain={() => {
                setCompleted(false);
              }}
              countdownBarRef={ref}
              isTimeout={isTimeout}
              level={points}
            />
          </View>
        );
      case '3':
        return (
          <View className="items-center justify-center">
            <WordSlide
              onEnd={() => setCompleted(true)}
              onTryAgain={() => {
                setCompleted(false);
              }}
              countdownBarRef={ref}
              isTimeout={isTimeout}
              level={points}
            />
          </View>
        );
      case '4':
        return (
          <View className="items-center justify-center">
            <WordChain
              onEnd={() => setCompleted(true)}
              onTryAgain={() => {
                setCompleted(false);
              }}
              countdownBarRef={ref}
              isTimeout={isTimeout}
              level={points}
            />
          </View>
        );
      default:
        return (
          <View className="items-center justify-center">
            <Text>Error</Text>
          </View>
        );
    }
  };
  return (
    <View className="w-full">
      <CountdownBar
        ref={ref}
        seconds={timming}
        running={running} // truyền điều kiện dùng countdown
        points={Number(points)}
        onExpire={() => setIsTimeout(true)}
      />

      <View style={{ height: 16 }} />

      <View>{renderContent()}</View>
      {/* <View pointerEvents="none" className="elevation-[9999] absolute inset-0 z-[9999]">
        <RiveAnimation
          autoplay={false}
          ref={RiverRef}
          source={require('@assets/animations/celebrate.riv')}
        />
      </View> */}
    </View>
  );
};
