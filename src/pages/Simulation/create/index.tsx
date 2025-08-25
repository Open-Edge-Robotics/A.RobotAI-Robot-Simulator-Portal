import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/api.ts";
import { simulationAPI } from "@/apis/simulation.ts";
import type { CreateSimulationRequest } from "@/types/simulation/api.ts";

import SimulationForm from "../../../components/simulation/SimulationForm/index.tsx";
import type { Mec, SimulationFormData, Template } from "../../../types/simulation/domain.ts";
import { transformFormDataToRequest } from "../utils.ts";

import SimulationHeader from "../../../components/simulation/SimluationHeader/index.tsx";
import { errorToast, successToast } from "@/utils/toast.ts";

const defaultFormData: SimulationFormData = {
  name: "",
  description: "",
  mecId: null,
  pattern: null,
};

export default function SimulationCreatePage() {
  const navigate = useNavigate();

  const mecList = getMockMecList();
  const templateList = getMockTemplateList();

  const queryClient = useQueryClient();
  const {
    mutate: createSimulation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (newSimulation: CreateSimulationRequest) => {
      return simulationAPI.createSimulation(newSimulation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation });
      successToast("시뮬레이션 생성이 완료되었습니다.");
      navigate("/simulation");
    },
    // TODO: 에러 처리
    onError: (e: { response: object }) => {
      errorToast("시뮬레이션 생성에 실패했습니다.");
      console.log(e.response);
    },
  });

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
