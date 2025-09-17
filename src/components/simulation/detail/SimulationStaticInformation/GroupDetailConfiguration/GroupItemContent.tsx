import { CustomVerticalLabeledValue } from "@/components/common/LabeledValue";

import type { GroupExecutionDetail } from "@/types/simulation/domain";

interface GroupItemContentProps {
  group: GroupExecutionDetail;
}

export default function GroupItemContent({ group }: GroupItemContentProps) {
  return (
    <div className="bg-gray-10 grid grid-cols-1 gap-4 rounded-b-md p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <CustomVerticalLabeledValue label="자율행동체 수" value={`${group.autonomousAgentCount}대`} />
      <CustomVerticalLabeledValue label="실행 시간" value={`${group.executionTime}초`} />
      <CustomVerticalLabeledValue label="반복 횟수" value={`${group.repeatCount}회`} />
      {group.delayAfterCompletion !== undefined ? (
        <CustomVerticalLabeledValue label="완료 후 대기 시간" value={`${group.delayAfterCompletion}초`} />
      ) : null}
    </div>
  );
}
