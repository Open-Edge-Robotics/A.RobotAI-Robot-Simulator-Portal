import { CustomVerticalLabeledValue } from "@/components/common/LabeledValue";
import Title from "@/components/common/Title";

import { formatDateTime } from "@/utils/common/formatting";

interface SimulationInformationProps {
  id: number;
  namespace: string;
  mecId: string;
  createdAt: string;
}

export default function SimulationInformation({ id, namespace, mecId, createdAt }: SimulationInformationProps) {
  return (
    <div className="mb-6">
      <Title title="시뮬레이션 정보" fontSize="text-lg" fontWeight="font-medium" margin="mb-3" />
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <CustomVerticalLabeledValue label="시뮬레이션 ID" value={id.toString()} />
        <CustomVerticalLabeledValue label="네임스페이스" value={namespace} />
        <CustomVerticalLabeledValue label="MEC ID" value={mecId} />
        <CustomVerticalLabeledValue label="생성 시간" value={formatDateTime(createdAt)} />
      </div>
    </div>
  );
}
