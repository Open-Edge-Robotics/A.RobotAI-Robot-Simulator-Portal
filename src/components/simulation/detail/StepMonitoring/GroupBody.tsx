import { CustomVerticalLabeledValue } from "@/components/common/LabeledValue";
import { getFieldConfigs } from "@/types/simulation/groupField";
import type { GroupDetail } from "@/types/simulation/simulationDetail";

interface StepBodyProps {
  group: GroupDetail;
  lastUpdatedAt: string;
}

export default function GroupBody({ group, lastUpdatedAt }: StepBodyProps) {
  const fieldConfigs = getFieldConfigs(group, lastUpdatedAt);

  return (
    <div className="bg-gray-10 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {fieldConfigs.map((config, index) => (
        <div key={index}>
          <CustomVerticalLabeledValue label={config.label} value={config.value} />
        </div>
      ))}
    </div>
  );
}
