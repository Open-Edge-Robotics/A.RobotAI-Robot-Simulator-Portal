import { useState } from "react";
import { Link } from "react-router-dom";

import { Select } from "innogrid-ui";

import InformationFallback from "@/components/common/Fallback/InformationFallback";
import Icon from "@/components/common/Icon";
import Title from "@/components/common/Title";

import { SEGMENTS } from "@/constants/navigation";

import type { SimulationLite } from "@/types/simulation/domain";

import SimulationSummary from "./SimulationSummary";

interface SimulationSectionProps {
  simulationDropDownList: SimulationLite[];
}

export default function SimulationSection({ simulationDropDownList }: SimulationSectionProps) {
  const [selectedSimulationId, setSelectedSimulationId] = useState<number | null>(null);

  const handleSimulationChange = (simulationId: number | null) => {
    setSelectedSimulationId(simulationId);
  };

  const selectedSimulation = simulationDropDownList.find(
    (simulation) => simulation.simulationId === selectedSimulationId,
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        {selectedSimulation ? (
          <Title>
            <div className="flex items-center gap-1">
              <span>{selectedSimulation.simulationName} 상세 현황</span>
              <DetailPageLink to={`${SEGMENTS.absolute.simulation}/${selectedSimulation.simulationId}`} />
            </div>
          </Title>
        ) : (
          <Title title="시뮬레이션 선택" />
        )}
        <Select
          options={simulationDropDownList}
          value={simulationDropDownList.find((simulation) => simulation.simulationId === selectedSimulationId) || null}
          getOptionLabel={(option) => option.simulationName}
          getOptionValue={(option) => option.simulationId.toString()}
          size="l-medium"
          onChange={(option) => handleSimulationChange(option ? option.simulationId : null)}
        />
      </div>

      {selectedSimulationId === null ? (
        <InformationFallback
          message="시뮬레이션을 선택해주세요"
          subMessage="우측 상단에서 시뮬레이션을 선택하면 해당 시뮬레이션의 상세 정보를 확인할 수 있습니다."
        />
      ) : (
        <SimulationSummary simulationId={selectedSimulationId} />
      )}
    </div>
  );
}

function DetailPageLink({ to }: { to: string }) {
  return (
    <Link to={to} className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-50">
      <Icon name="arrow_outward" className="cursor-pointer" />
    </Link>
  );
}
