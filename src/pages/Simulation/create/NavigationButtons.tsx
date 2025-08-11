import { Button } from "innogrid-ui";

interface NavigationButtonsProps {
  onClickPrev: () => void;
  onClickNext: () => void;
  onClickComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function NavigationButtons({
  onClickPrev,
  onClickNext,
  onClickComplete,
  isFirstStep,
  isLastStep,
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
        >
          시뮬레이션 생성
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
