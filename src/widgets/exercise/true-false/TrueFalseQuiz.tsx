import React, { useEffect, useMemo, useState } from 'react';

import { TrueFalseQuizChoice_SelectedStatus } from '@/entities/quizzes/true-false/enum';
import {
  convertAnswersToTrueFalseQuizChoices,
  type TrueFalseQuizChoice,
  type TrueFalseQuizContent,
} from '@/entities/quizzes/true-false/types';
import { type Quiz } from '@/entities/quizzes/types';
import { useSelectedLanguage } from '@/shared/lib';
import { Text, View } from '@/shared/ui';
import SelectableList, { type SelectableItemRender } from '@/shared/ui/List/SelectableList';

import TrueFalseRadioButton from './TrueFalseRadioButton';

type TrueFalseQuizProps = {
  quiz: Quiz;
  showAnswer?: boolean;
  play: (audioSource: string, playingDialogId?: number) => void;
  startWaitingForAnswer: () => void;
  onAnswerSelected?: (payload: { isCorrect: boolean }) => void;
};

type TrueFalseQuizUserChoices = {
  questionId: number;
  hasChosenTrue: boolean;
}[];

const TrueFalseQuiz = ({
  quiz,
  showAnswer = true,
  play,
  startWaitingForAnswer,
  onAnswerSelected,
}: TrueFalseQuizProps) => {
  const { language: _learningLang } = useSelectedLanguage();
  // NOTE: mặc định native language = vi
  const nativeLang = 'vi';

  // states
  const [userChoices, setUserChoices] = useState<TrueFalseQuizUserChoices>([]);

  // pre-processing
  const choices = useMemo(
    () =>
      convertAnswersToTrueFalseQuizChoices(
        (quiz.content as TrueFalseQuizContent).questions,
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
  const selectHandler = (questionId: number, userChoice: boolean) => {
    const newUserChoices: TrueFalseQuizUserChoices = [
      ...userChoices,
      { questionId, hasChosenTrue: userChoice },
    ];

    setUserChoices(newUserChoices);
    // If all answered, compute correctness and notify
    try {
      const total = choices.length;
      if (newUserChoices.length === total) {
        const correct = choices.every((c) => {
          const chosen = newUserChoices.find((uc) => uc.questionId === c.id)?.hasChosenTrue;
          return chosen === c.isTrue;
        });
        onAnswerSelected?.({ isCorrect: correct });
      }
    } catch {}
  };

  const deselectHandler = (questionId: number) => {
    const newUserChoices: TrueFalseQuizUserChoices = userChoices.filter((uc) => {
      return uc.questionId !== questionId;
    });

    setUserChoices(newUserChoices);
  };

  const changeSelectionHandler = (questionId: number, newUserChoice: boolean) => {
    setUserChoices((prev) =>
      prev.map((choice) =>
        choice.questionId === questionId ? { ...choice, hasChosenTrue: newUserChoice } : choice
      )
    );
  };

  // render func
  const _itemRender: SelectableItemRender<TrueFalseQuizChoice> = ({
    item: choice,
    // index,
    // selected,
    onChoose,
    radioRef,
  }) => {
    // Lấy ra lựa chọn (true, false) của question hiện tại (nếu đã chọn trước đó sẽ nằm trong mảng)
    // Mục đích để render status của item
    const hasChosen = userChoices.find((uc) => {
      return uc.questionId === choice.id;
    })?.hasChosenTrue;

    // Mapping lựa chọn thành enum
    let selectedStatus =
      hasChosen === undefined
        ? TrueFalseQuizChoice_SelectedStatus.UNSELECTED
        : hasChosen === true
          ? TrueFalseQuizChoice_SelectedStatus.TRUE
          : TrueFalseQuizChoice_SelectedStatus.FALSE;

    // Lấy ra đáp án đúng, mapping thành enum
    const correctAnswer = choice.isTrue
      ? TrueFalseQuizChoice_SelectedStatus.TRUE
      : TrueFalseQuizChoice_SelectedStatus.FALSE;

    // hàm onPress cho item, chưa chọn thì thêm vào mảng, chọn rồi thì bỏ chọn hoặc thay đổi từ true thành false
    const handleChoose = (userChoice: boolean) => {
      onChoose();
      if (hasChosen !== undefined) {
        if (userChoice === hasChosen) deselectHandler(choice.id);
        else changeSelectionHandler(choice.id, userChoice);
      } else selectHandler(choice.id, userChoice);
    };

    return (
      <TrueFalseRadioButton
        key={`true-false-quiz-item-${choice?.id}`}
        ref={radioRef}
        selectedStatus={selectedStatus}
        correctAnswer={correctAnswer}
        showAnswer={showAnswer}
        id={choice?.id}
        // isWrong={isWrong}
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
    <View className="m-h-[260px]">
      {/* <Text>{`${JSON.stringify(
          choices.map((c) => {
            return c.isTrue;
          })
        )}`}</Text> */}
      {/* <Text>{`${JSON.stringify(userChoices)}`}</Text> */}

      {choices ? (
        <>
          <Text className="font-bevietnampro text-sm dark:text-gray-dark">{quiz.instruction}</Text>

          <SelectableList
            data={{ choices }}
            scrollEnabled={false}
            isLoading={false}
            // value={currentChoice}
            contentContainerClassName={``}
            itemClassName={`flex-1 justify-center`}
            // handleSelect={selectHandler}
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

export default TrueFalseQuiz;
