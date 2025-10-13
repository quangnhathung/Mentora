import { View } from 'moti';
import { useEffect, useState } from 'react';

import { type FindingSynonymQuizContent } from '@/entities/quizzes/finding-synonym/types';
import { type Quiz } from '@/entities/quizzes/types';
import { getStatusChoice } from '@/shared/enum';
import { translate } from '@/shared/lib';
import { Text } from '@/shared/ui';
import TextQuizChoice from '@/shared/ui/TextQuizChoice';

type FindingSynonymQuizProps = {
  quiz: Quiz;
  showAnswer?: boolean;
  play: (audioSource: string, playingDialogId?: number) => void;
  startWaitingForAnswer: () => void;
};

type FindingSynonymQuizUserChoice = {
  questionId: number;
  userChoiceId: number;
};

// NOTE: Chưa có explanation sau khi trả lời hoặc hint
// NOTEL Render map lồng nhau
const FindingSynonymQuiz = ({
  quiz,
  showAnswer = true,
  startWaitingForAnswer,
}: FindingSynonymQuizProps) => {
  console.log('FindingSynonym');
  const quizContent = quiz.content as FindingSynonymQuizContent;

  // state
  const [userChoices, setUserChoices] = useState<FindingSynonymQuizUserChoice[]>([]);

  // handlers
  const selectHandler = (questionId: number, userChoice: number) => {
    if (showAnswer) return;

    const storedChoice = userChoices.find((c) => {
      return c.questionId === questionId;
    });

    // Kiểm tra tồn tại
    if (!storedChoice) select(questionId, userChoice);
    else {
      if (userChoice === storedChoice.userChoiceId) deselect(questionId);
      else changeSelection(questionId, userChoice);
    }

    // unlockByQuiz();
  };

  const select = (questionId: number, userChoiceId: number) => {
    setUserChoices(() => {
      return [...userChoices, { questionId, userChoiceId }];
    });
  };

  const deselect = (questionId: number) => {
    const afterDeselect = userChoices.filter((c) => c.questionId !== questionId);
    setUserChoices(afterDeselect);
  };

  const changeSelection = (questionId: number, userChoiceId: number) => {
    const afterChangeSelection = userChoices.map((c) =>
      c.questionId === questionId ? { ...c, userChoiceId } : c
    );
    setUserChoices(afterChangeSelection);
  };

  // useEffect
  useEffect(() => {
    startWaitingForAnswer();
  }, []);

  return (
    <View className="gap-2">
      {/* Đề bài */}

      {/* <Text>showAnswer: {`${!!showAnswer}`}</Text> */}
      {/* <Text>userChoices: {JSON.stringify(userChoices)}</Text> */}

      {/* quizContent */}
      <View className="gap-5">
        {quizContent.questions.map((question) => {
          {
            /* Render danh sách câu cần sửa lỗi */
          }
          return (
            <View key={question.id} className="gap-2">
              {/* Đề bài */}
              <Text className="font-bevietnampro-semibold">
                {`${translate(`exercise.finding_synonym_quiz.instruction`)} ${question.synonyms.reduce(
                  // eslint-disable-next-line max-params
                  (acc, synonym, index, synonymsArr) =>
                    acc + (index < synonymsArr.length - 1 ? `"${synonym}", ` : `"${synonym}"`),
                  ''
                )}`}
              </Text>
              {/* Câu hỏi */}
              <View className="flex-row items-center">
                {/* Đánh số câu */}
                <Text className="mr-2">{question.id}. </Text>

                <View className="flex-1 flex-row flex-wrap gap-2">
                  {question.sentenceTexts.map((sentenceText) => {
                    const currentUserChoiceId =
                      userChoices.find((c) => c.questionId === question.id)?.userChoiceId || -1;
                    const renderingChoiceId = sentenceText.id;

                    const status = getStatusChoice<number>(
                      renderingChoiceId,
                      currentUserChoiceId,
                      question.correctAnswer,
                      showAnswer
                    );

                    {
                      /* Render từng từ trong câu  */
                    }
                    const isPunctuation = /^[.,!?'"“”‘’:]$/.test(sentenceText.text);

                    {
                      /* Render từng từ trong câu  */
                    }
                    return isPunctuation ? (
                      <Text key={`${question.id}-${sentenceText.id}`}>{sentenceText.text}</Text>
                    ) : (
                      <TextQuizChoice
                        key={`${question.id}-${sentenceText.id}`}
                        text={sentenceText.text}
                        status={status}
                        onPress={() => {
                          selectHandler(question.id, sentenceText.id);
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FindingSynonymQuiz;
