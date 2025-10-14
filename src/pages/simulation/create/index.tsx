import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import SimulationHeader from "@/components/simulation/shared/SimluationHeader";
import SimulationForm from "@/components/simulation/SimulationForm";

import { useCreateSimulation } from "@/hooks/simulation/core/useCreateSimulation";
import { useTemplates } from "@/hooks/template/useTemplates";

import type { MecLite } from "@/types/mec/domain";
import type { SimulationFormData } from "@/types/simulation/domain";

import { simulationFormToCreateRequest } from "@/utils/simulation/mappers";

export default function SimulationCreatePage() {
  const mecList = getMockMecList();
  const { data, status, refetch } = useTemplates();
  const { mutate: createSimulation, isPending, isSuccess } = useCreateSimulation();

  if (status === "pending") {
    return <LoadingFallback message="템플릿 정보를 불러오고 있습니다." />;
  }

  if (status === "error") {
    return (
      <ErrorFallback
        onRetry={refetch}
        message="템플릿 정보를 불러올 수 없습니다."
        subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
      />
    );
  }

  const handleSubmit = (formData: SimulationFormData) => {
    const newSimulation = simulationFormToCreateRequest(formData);
    createSimulation(newSimulation);
  };

  const templateList = data.data;

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <SimulationHeader title="새 시뮬레이션 생성" />
      <SimulationForm
        mecList={mecList}
        templateList={templateList}
        onSubmit={handleSubmit}
        disableSubmitButton={isPending || isSuccess}
        submitButtonText="시뮬레이션 생성"
      />
    </div>
  );
}

const getMockMecList = (): MecLite[] => [
  { id: "mec1", name: "MEC-001" },
  { id: "mec2", name: "MEC-002" },
  { id: "mec3", name: "MEC-003" },
];
