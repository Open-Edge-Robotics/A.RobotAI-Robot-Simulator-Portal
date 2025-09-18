import SimulationHeader from "@/components/simulation/SimluationHeader";
import SimulationForm from "@/components/simulation/SimulationForm";

import { useCreateSimulation } from "@/hooks/simulation/useCreateSimulation.ts";

import type { MecLite, SimulationFormData } from "@/types/simulation/domain";
import type { TemplateLite } from "@/types/template/domain";

import { transformSimulationFormDataToRequest } from "@/utils/simulation/transformData";

export default function SimulationCreatePage() {
  const mecList = getMockMecList();
  const templateList = getMockTemplateList();

  const { mutate: createSimulation, isPending, isSuccess } = useCreateSimulation();

  const handleSubmit = (formData: SimulationFormData) => {
    const newSimulation = transformSimulationFormDataToRequest(formData);
    createSimulation(newSimulation);
  };

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

const getMockTemplateList = (): TemplateLite[] => [{ templateId: 1, templateName: "템플릿 1" }];
