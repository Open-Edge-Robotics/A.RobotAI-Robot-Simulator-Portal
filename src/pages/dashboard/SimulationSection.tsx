import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Select } from "innogrid-ui";

import { QUERY_KEYS } from "@/apis/constants";
import { dashboardAPI } from "@/apis/dashboard";
import Container from "@/components/common/Container.tsx";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import Title from "@/components/common/Title";

import SimulationDetail from "./SimulationDetail";

interface SimulationSectionProps {
  simulations: { simulationId: number; simulationName: string }[];
}

export default function SimulationSection({ simulations }: SimulationSectionProps) {
  const [selectedSimulationId, setSelectedSimulationId] = useState<number | null>(null);

  // 선택된 시뮬레이션 상세 정보 조회
  const {
    data: simulationData,
    status: simulationStatus,
    refetch: refetchSimulation,
  } = useQuery({
    queryKey: [...QUERY_KEYS.simulation, selectedSimulationId],
    queryFn: () => dashboardAPI.getMockSimulation(selectedSimulationId!),
    enabled: selectedSimulationId !== null,
  });

  const handleSimulationChange = (simulationId: number | null) => {
    setSelectedSimulationId(simulationId);
  };

  const selectedSimulation = simulationStatus === "success" ? simulationData.data : null;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <Title title={`${selectedSimulation ? `${selectedSimulation.simulationName} 상세 현황` : "시뮬레이션 선택"}`} />
        <Select
          options={simulations}
          value={simulations.find((simulation) => simulation.simulationId === selectedSimulationId) || null}
          getOptionLabel={(option) => option.simulationName}
          getOptionValue={(option) => option.simulationId.toString()}
          size="l-medium"
          onChange={(option) => handleSimulationChange(option ? option.simulationId : null)}
        />
      </div>

      {selectedSimulationId === null ? (
        <SimulationFallback />
      ) : (
        <>
          {simulationStatus === "pending" && <LoadingFallback message="시뮬레이션 정보를 불러오고 있습니다" />}
          {simulationStatus === "error" && (
            <ErrorFallback
              onRetry={refetchSimulation}
              message="시뮬레이션 정보를 불러올 수 없습니다."
              subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
            />
          )}
          {simulationStatus === "success" && selectedSimulation && <SimulationDetail simulation={selectedSimulation} />}
        </>
      )}
    </div>
  );
}

function SimulationFallback() {
  return (
    <Container shadow>
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <div className="mb-5 flex items-center rounded-full bg-gray-50 p-4">
          <Icon name="robot_2" className="text-gray-500" size="48px" fill />
        </div>
        <h3 className="mb-2 text-lg font-semibold">시뮬레이션을 선택해주세요</h3>
        <p className="mb-6 text-sm text-gray-500">
          우측 상단에서 시뮬레이션을 선택하면 해당 시뮬레이션의 상세 정보를 확인할 수 있습니다.
        </p>
      </div>
    </Container>
  );
}
