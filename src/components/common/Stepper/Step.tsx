interface StepProps {
  label: string;
  stepNumber: number;
  isCompleted: boolean;
  isActive: boolean;
}

export default function Step({
  label,
  stepNumber,
  isCompleted,
  isActive,
}: StepProps) {
  return (
    <div className="flex items-center gap-2">
      <StepNumber
        isActive={isActive}
        isCompleted={isCompleted}
        stepNumber={stepNumber}
      />
      <StepLabel label={label} isActive={isActive} />
    </div>
  );
}

interface StepNumberProps {
  isCompleted: boolean;
  isActive: boolean;
  stepNumber: number;
}

function StepNumber({ isCompleted, isActive, stepNumber }: StepNumberProps) {
  const completedStyle = "bg-blue-200 text-white";
  const activeStyle = "bg-blue-500 text-white";
  const defaultStyle = "bg-gray-200 text-white";

  return (
    <div
      className={`flex h-7 w-7 items-center justify-center rounded-full ${
        isCompleted ? completedStyle : isActive ? activeStyle : defaultStyle
      }`}
    >
      {isCompleted ? (
        <span className="material-symbols-outlined font-light">
          check_small
        </span>
      ) : (
        <span>{stepNumber}</span>
      )}
    </div>
  );
}

interface StepLabelProps {
  label: string;
  isActive: boolean;
}

function StepLabel({ label, isActive }: StepLabelProps) {
  const textStyle = isActive ? "text-blue-500 font-semibold" : "text-gray-800";

  return (
    <div className={`font-medium whitespace-nowrap ${textStyle}`}>{label}</div>
  );
}
