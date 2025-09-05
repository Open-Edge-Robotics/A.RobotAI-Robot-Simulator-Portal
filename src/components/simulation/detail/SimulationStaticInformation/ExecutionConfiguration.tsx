import { CustomVerticalLabeledValue } from "@/components/common/LabeledValue";
import Title from "@/components/common/Title";

import { formatDuration } from "@/utils/formatting";

interface ExecutionConfigurationProps {
  executionInformation: {
    pattern: string;
    totalGroups: number;
    totalAgent: number;
    totalExecutionTime: number;
  };
}

export default function ExecutionConfiguration({ executionInformation }: ExecutionConfigurationProps) {
  return (
    <div>
      <Title title="실행 설정 정보" fontSize="text-lg" fontWeight="font-medium" margin="mb-3" />
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <CustomVerticalLabeledValue label="실행 패턴" value={executionInformation.pattern} />
        <CustomVerticalLabeledValue label="총 에이전트 그룹 수" value={executionInformation.totalGroups.toString()} />
        <CustomVerticalLabeledValue label="총 에이전트 수" value={executionInformation.totalAgent.toString()} />
        <CustomVerticalLabeledValue
          label="예상 실행 시간"
          value={`${formatDuration(executionInformation.totalExecutionTime)} (${executionInformation.totalExecutionTime}ms)`}
        />
      </div>
    </div>
  );
}
