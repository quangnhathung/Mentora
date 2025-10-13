import React, { useEffect, useMemo, useState } from 'react';

import { SingleChoiceQuiz_Status } from '@/entities/quizzes/single-choice/enum';
import {
  convertAnswersToSingleQuizChoices,
  type SingleChoiceQuiz_Choice,
  type SingleChoiceQuizContent,
} from '@/entities/quizzes/single-choice/types';
import { type Quiz } from '@/entities/quizzes/types';
import { useSelectedLanguage } from '@/shared/lib';
import { Text, View } from '@/shared/ui';
import SelectableList, { type SelectableItemRender } from '@/shared/ui/List/SelectableList';

import SingleChoiceRadioButton from './SingleChoiceRadioButton';

type SingleChoiceQuizProps = {
  quiz: Quiz;
  showAnswer?: boolean;
  play: (audioSource: string, playingDialogId?: number) => void;
  startWaitingForAnswer: () => void;
  onAnswerSelected?: (payload: { isCorrect: boolean }) => void;
};

const SingleChoiceQuiz = ({
  quiz,
  showAnswer = true,
  play,
  startWaitingForAnswer,
  onAnswerSelected,
}: SingleChoiceQuizProps) => {
  const { language: _learningLang } = useSelectedLanguage();
  // NOTE: mặc định native language = vi
  const nativeLang = 'vi';

  const [currentChoice, setCurrentChoice] = useState<number>(-1);
  const choices = useMemo(
    () =>
      convertAnswersToSingleQuizChoices(
        (quiz.content as SingleChoiceQuizContent).answers,
        nativeLang,
        _learningLang
      ),
    [quiz, _learningLang]
  );

  // hooks
  useEffect(() => {
    startWaitingForAnswer();
  }, []);

  // handlers
  const selectHandler = (idx: number) => {
    const chosen = choices[idx].id;
    setCurrentChoice(chosen as number);
    // Notify upstream about correctness for auto-advance logic
    try {
      const correctId = (quiz.content as SingleChoiceQuizContent).correctAnswer;
      const isCorrect = chosen === correctId;
      onAnswerSelected?.({ isCorrect });
    } catch {}
    // unlockByQuiz();
  };

  // render func
  const _itemRender: SelectableItemRender<SingleChoiceQuiz_Choice> = ({
    item: choice,
    // index,
    // selected,
    onChoose,
    radioRef,
  }) => {
    const status = !showAnswer
      ? currentChoice === choice.id
        ? SingleChoiceQuiz_Status.SELECTED
        : SingleChoiceQuiz_Status.UNSELECTED
      : currentChoice === choice.id
        ? choice.id === (quiz.content as SingleChoiceQuizContent).correctAnswer
          ? SingleChoiceQuiz_Status.CORRECT
          : SingleChoiceQuiz_Status.SELECTED
        : choice.id === (quiz.content as SingleChoiceQuizContent).correctAnswer
          ? SingleChoiceQuiz_Status.WRONG
          : SingleChoiceQuiz_Status.UNSELECTED;

    const handleChoose = () => {
      onChoose();
    };

    return (
      <SingleChoiceRadioButton
        key={`selectable-item-${choice?.id}`}
        ref={radioRef}
        // selected={selected}
        id={choice.id as number}
        status={status}
        className={''}
        content={choice.description}
        nativeContent={choice.nativeDescription}
        audio={choice.audioSource}
        play={play}
        onChoose={handleChoose}
      />
    );
  };

  return (
    // NOTE: height đang là pixel
    <View className="m-h-[260px]">
      {choices ? (
        <>
          {/* <Text>{`${JSON.stringify(choices)}`}</Text>
          <Text>{`${currentChoice}`}</Text> */}
          <Text className="font-bevietnampro text-sm dark:text-gray-dark">{quiz.instruction}</Text>
          {/* NOTE: itemRender chưa fix eslint báo lỗi nên tạm comment  */}
          <SelectableList
            data={{ choices }}
            scrollEnabled={false}
            isLoading={false}
            value={currentChoice}
            contentContainerClassName={``}
            itemClassName={`flex-1 justify-center`}
            handleSelect={selectHandler}
            itemRender={_itemRender}
          />
        </>
      ) : (
        // NOTE: constant error text
        <Text>Error when displaying quiz</Text>
      )}
    </View>
  );
};

export default SingleChoiceQuiz;
