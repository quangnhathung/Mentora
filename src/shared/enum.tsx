import { type BaseQuizChoiceStatus } from './types';

export enum BaseChoiceStatus {
  UNSELECTED = 'unselected',
  SELECTED = 'selected',
  CORRECT = 'correct',
  WRONG = 'wrong',
}

// NOTE: Không biết để helper ở đâu
export const getStatusChoice: <T>(
  renderingChoiceId: T,
  currentUserChoiceId: T,
  correctAnswerId: T,
  showAnswer: boolean
) => BaseQuizChoiceStatus =
  // eslint-disable-next-line max-params
  (renderingChoiceId, currentUserChoiceId, correctAnswerId, showAnswer) => {
    const isCurrentRenderingChoice =
      currentUserChoiceId && currentUserChoiceId === renderingChoiceId;

    // Chưa hiển thị đáp án => SELECTED hoặc UNSELECTED
    if (!showAnswer) {
      return isCurrentRenderingChoice ? BaseChoiceStatus.SELECTED : BaseChoiceStatus.UNSELECTED;
    }
    // Hiển thị đáp án => SELECTED hoặc UNSELECTED hoặc WRONG hoặc CORRECT
    else {
      if (isCurrentRenderingChoice) {
        if (correctAnswerId === currentUserChoiceId) return BaseChoiceStatus.CORRECT;
        else return BaseChoiceStatus.SELECTED;
      } else {
        if (correctAnswerId === renderingChoiceId) {
          return BaseChoiceStatus.WRONG;
        } else return BaseChoiceStatus.UNSELECTED;
      }
    }
  };
