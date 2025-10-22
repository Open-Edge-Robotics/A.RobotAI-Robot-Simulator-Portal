import { Button } from "innogrid-ui";

interface NavigationButtonsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  onCompleteClick: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  disableCompleteButton?: boolean;
  submitButtonText?: string;
}

export default function NavigationButtons({
  onPrevClick: onClickPrev,
  onNextClick: onClickNext,
  onCompleteClick: onClickComplete,
  isFirstStep,
  isLastStep,
  disableCompleteButton = false,
  submitButtonText = "완료",
}: NavigationButtonsProps) {
  return (
    <div className="mt-10 flex items-center justify-between">
      <Button
        color="tertiary"
        onClick={(e) => {
          e.preventDefault();
          onClickPrev();
        }}
        disabled={isFirstStep}
        size="large"
      >
        이전
      </Button>
      {isLastStep ? (
        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            onClickComplete();
          }}
          size="large"
          disabled={disableCompleteButton}
        >
          {submitButtonText}
        </Button>
      ) : (
        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            onClickNext();
          }}
          size="large"
        >
          다음
        </Button>
      )}
    </div>
  );
}
