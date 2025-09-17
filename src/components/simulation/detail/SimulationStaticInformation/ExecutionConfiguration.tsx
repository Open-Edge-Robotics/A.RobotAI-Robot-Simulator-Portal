import { CustomVerticalLabeledValue } from "@/components/common/LabeledValue";
import Title from "@/components/common/Title";

interface ExecutionConfigurationProps {
  executionInformation: {
    patternName: string;
    patternUnit: string;
    totalGroups: number;
    totalAgent: number;
  };
}

export default function ExecutionConfiguration({ executionInformation }: ExecutionConfigurationProps) {
  const { patternName, patternUnit, totalGroups, totalAgent } = executionInformation;

  return (
    <div>
      <Title title="실행 설정 정보" fontSize="text-lg" fontWeight="font-medium" margin="mb-3" />
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <CustomVerticalLabeledValue label="실행 패턴" value={patternName} />
        <CustomVerticalLabeledValue label={`총 ${patternUnit} 수`} value={totalGroups.toString()} />
        <CustomVerticalLabeledValue label="총 가상 자율행동체 수" value={totalAgent.toString()} />
      </div>
    </div>
  );
}
