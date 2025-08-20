import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "innogrid-ui";

import { QUERY_KEYS } from "@/apis/constants.ts";
import { simulationAPI } from "@/apis/simulation/index.ts";
import type { CreateSimulationRequest } from "@/apis/simulation/types.ts";
import Container from "@/components/common/Container.tsx/index.tsx";
import Icon from "@/components/common/Icon/index.tsx";

import Header from "../create/Header.tsx";
import SimulationForm from "../form/SimulationForm.tsx";
import type { Mec, SimulationFormData, Template } from "../types";
import { transformFormDataToRequest } from "../utils.ts";

export default function SimulationEditPage() {
  const { id: rawId } = useParams();
  const id = rawId ? Number(rawId) : null;
  const isValidId = id && !isNaN(id);

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <Header title="시뮬레이션 수정" />
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
  const { status, data, refetch } = useQuery({
    queryKey: [...QUERY_KEYS.simulation, id],
    queryFn: () => simulationAPI.getSimulation(id),
    select: (data) => {
      const simulation = data.data;
      return {
        name: simulation.simulationName,
        description: simulation.simulationDescription,
        mecId: simulation.mecId,
        pattern:
          simulation.patternType === "sequential"
            ? { type: "sequential", agentGroups: simulation.executionPlan.steps }
            : { type: "parallel", agentGroups: simulation.executionPlan.groups },
      } satisfies SimulationFormData;
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 시뮬레이션 수정 함수
  const {
    mutate: editSimulation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (newSimulation: CreateSimulationRequest) => {
      return simulationAPI.editSimulation(id, newSimulation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation });
      // TODO: 토스트 전역으로 띄우고 컴펌 없이 바로 이동하도록 변경
      if (confirm("시뮬레이션 수정이 완료되었습니다.")) {
        navigate(`/simulation/${id}`);
      }
    },
    // TODO: 에러 처리
    onError: (e: { response: object }) => {
      alert("error");
      console.log(e.response);
    },
  });

  const handleSubmit = (formData: SimulationFormData) => {
    const newSimulation = transformFormDataToRequest(formData);
    editSimulation(newSimulation);
  };

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <Header title="시뮬레이션 수정" />
      {status === "pending" && <LoadingFallback />}
      {status === "error" && (
        <ErrorFallback onRetry={refetch} message="시뮬레이션 정보를 불러올 수 없습니다." showBackButton />
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

function LoadingFallback() {
  return (
    <Container shadow overflowHidden>
      <div className="px-6 py-12 text-center">
        <h3 className="mb-5 text-lg font-semibold">시뮬레이션 정보를 불러오는 중입니다</h3>
        <Icon name="progress_activity" className="animate-spin text-blue-500" size="32px" />
      </div>
    </Container>
  );
}

interface ErrorFallbackProps {
  onRetry?: () => void;
  message?: string;
  showBackButton?: boolean;
}

function ErrorFallback({ onRetry, message = "에러가 발생했습니다", showBackButton = false }: ErrorFallbackProps) {
  const navigate = useNavigate();

  return (
    <Container shadow overflowHidden>
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <Icon name="error" className="mb-4 text-red-500" size="48px" />
        <h3 className="mb-2 text-lg font-semibold">{message}</h3>
        <p className="mb-6 text-sm text-gray-500">
          시뮬레이션이 존재하지 않거나 네트워크 연결을 확인하고 다시 시도해 주세요.
        </p>
        <div className="flex gap-3">
          {onRetry && (
            <Button onClick={onRetry} size="medium" color="primary">
              <div className="flex items-center gap-2">
                <Icon name="refresh" size="20px" className="mt-0.5 ml-[-4px]" />
                다시 시도
              </div>
            </Button>
          )}
          {showBackButton && (
            <Button onClick={() => navigate(-1)} size="medium" color="secondary">
              이전 페이지로
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

const getMockMecList = (): Mec[] => [
  { id: "mec1", name: "MEC-001" },
  { id: "mec2", name: "MEC-002" },
  { id: "mec3", name: "MEC-003" },
];

const getMockTemplateList = (): Template[] => [{ id: 1, name: "템플릿 1" }];
