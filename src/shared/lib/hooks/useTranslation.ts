import { useState } from 'react';

const useTranslation = () => {
  const [isTranslating, setIsTranslating] = useState<number>(-1);

  // handlers
  const start = (num: number) => setIsTranslating(num);
  const stop = () => setIsTranslating(-1);

  return { isTranslating, start, stop };
};

export default useTranslation;
