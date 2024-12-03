import CreateButton from "@/components/shared/button/CreateButton";
import DeleteButton from "@/components/shared/button/DeleteButton";
import ExecuteButton from "@/components/shared/button/ExecuteButton";

type Props = {
  isExecuteActive: boolean;
  isDeleteActive: boolean;
  onCreate: () => void;
  onExecute: () => void;
  onDelete: () => void;
};

const ButtonGroup = ({
  isExecuteActive,
  isDeleteActive,
  onCreate,
  onExecute,
  onDelete,
}: Props) => {
  return (
    <div className="flex gap-2">
      <CreateButton onClick={onCreate} />
      <ExecuteButton onClick={onExecute} disabled={!isExecuteActive} />
      <DeleteButton onClick={onDelete} disabled={!isDeleteActive} />
    </div>
  );
};

export default ButtonGroup;