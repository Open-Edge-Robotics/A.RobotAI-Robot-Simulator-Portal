import SimulationHeader from "@/components/simulation/SimluationHeader";
import SimulationForm from "@/components/simulation/SimulationForm";

import { useCreateSimulation } from "@/hooks/simulation/useCreateSimulation.ts";

import type { Mec, SimulationFormData, Template } from "@/types/simulation/domain";

import { transformFormDataToRequest } from "../utils";

const defaultFormData: SimulationFormData = {
  name: "",
  description: "",
  mecId: null,
  pattern: null,
};

export default function SimulationCreatePage() {
  const mecList = getMockMecList();
  const templateList = getMockTemplateList();

  const { mutate: createSimulation, isPending, isSuccess } = useCreateSimulation();

  const handleSubmit = (formData: SimulationFormData) => {
    const newSimulation = transformFormDataToRequest(formData);
    createSimulation(newSimulation);
  };

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <SimulationHeader title="시뮬레이션 생성" />
      <SimulationForm
        initialData={defaultFormData}
        mecList={mecList}
        templateList={templateList}
        onSubmit={handleSubmit}
        disableSubmitButton={isPending || isSuccess}
        submitButtonText="시뮬레이션 생성"
      />
    </div>
  );
}

const getMockMecList = (): Mec[] => [
  { id: "mec1", name: "MEC-001" },
  { id: "mec2", name: "MEC-002" },
  { id: "mec3", name: "MEC-003" },
];

const getMockTemplateList = (): Template[] => [{ id: 1, name: "템플릿 1" }];
