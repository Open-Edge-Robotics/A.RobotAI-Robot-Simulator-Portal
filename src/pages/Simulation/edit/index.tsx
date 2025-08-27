import { useParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback.tsx";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback.tsx";
import SimulationHeader from "@/components/simulation/SimluationHeader";
import SimulationForm from "@/components/simulation/SimulationForm";

import { useSimulation } from "@/hooks/simulation/useSimulation";
import { useUpdateSimulation } from "@/hooks/simulation/useUpdateSimulation.ts";

import type { Mec, SimulationFormData, Template } from "@/types/simulation/domain";

import { transformFormDataToRequest, transformResponseToFormdata } from "../utils";

export default function SimulationEditPage() {
  const { id: rawId } = useParams();
  const id = rawId ? Number(rawId) : null;
  const isValidId = id && !isNaN(id);

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <SimulationHeader title="시뮬레이션 수정" />
      {isValidId ? (
        <SimulationEditContent id={id} />
      ) : (
        <ErrorFallback message="잘못된 시뮬레이션 ID입니다." showBackButton />
      )}
    </div>
  );
}

function SimulationEditContent({ id }: { id: number }) {
  const mecList = getMockMecList();
  const templateList = getMockTemplateList();

  // 수정할 시뮬레이션 정보 가져오기
  const { status, data, refetch } = useSimulation(id, { select: transformResponseToFormdata });

  // 시뮬레이션 수정 함수
  const { mutate: updateSimulation, isPending, isSuccess } = useUpdateSimulation(id);

  const handleSubmit = (formData: SimulationFormData) => {
    const newSimulation = transformFormDataToRequest(formData);
    updateSimulation(newSimulation);
  };

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <SimulationHeader title="시뮬레이션 수정" />
      {status === "pending" && <LoadingFallback message="시뮬레이션 정보를 불러오는 중입니다." />}
      {status === "error" && (
        <ErrorFallback
          onRetry={refetch}
          message="시뮬레이션 정보를 불러올 수 없습니다."
          subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
          showBackButton
        />
      )}
      {status === "success" && (
        <SimulationForm
          initialData={data}
          mecList={mecList}
          templateList={templateList}
          onSubmit={handleSubmit}
          disableSubmitButton={isPending || isSuccess}
          submitButtonText="시뮬레이션 수정"
        />
      )}
    </div>
  );
}

const getMockMecList = (): Mec[] => [
  { id: "mec1", name: "MEC-001" },
  { id: "mec2", name: "MEC-002" },
  { id: "mec3", name: "MEC-003" },
];

const getMockTemplateList = (): Template[] => [{ id: 1, name: "템플릿 1" }];
