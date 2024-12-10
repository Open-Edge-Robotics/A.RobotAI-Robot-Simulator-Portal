import CreateButton from "@/components/shared/button/CreateButton";
import DeleteButton from "@/components/shared/button/DeleteButton";
import ExecuteButton from "@/components/shared/button/ExecuteButton";
import StopButton from "@/components/shared/button/StopButton";

type Props = {
  isExecuteActive: boolean;
  isStopActive: boolean;
  isDeleteActive: boolean;
  onCreate: () => void;
  onExecute: () => void;
  onStop: () => void;
  onDelete: () => void;
};

const ButtonGroup = ({
  isExecuteActive,
  isStopActive,
  isDeleteActive,
  onCreate,
  onExecute,
  onStop,
  onDelete,
}: Props) => {
  return (
    <div className="flex gap-2">
      <CreateButton onClick={onCreate} />
      <ExecuteButton onClick={onExecute} disabled={!isExecuteActive} />
      <StopButton onClick={onStop} disabled={!isStopActive} />
      <DeleteButton onClick={onDelete} disabled={!isDeleteActive} />
    </div>
  );
};

export default ButtonGroup;
