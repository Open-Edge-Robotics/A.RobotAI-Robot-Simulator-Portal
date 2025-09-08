import { Link } from "react-router-dom";

import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import Divider from "@/components/common/Divider";
import Icon from "@/components/common/Icon";
import LabeledValue from "@/components/common/LabeledValue";

import { ALLOWED_ACTIONS_BY_STATUS, PATTERN_CONFIGS } from "@/constants/simulation";

import { useSimulationActions } from "@/hooks/simulation/useSimulationActions";
import type { Simulation } from "@/types/simulation/domain";

import { formatDateTime } from "@/utils/formatting";

import ActionButtons from "../SimulationActionButtons";

interface SimulationTableCardProps {
  simulation: Simulation;
}

export default function SimulationCard({ simulation }: SimulationTableCardProps) {
  const { actionHandlers, isLoading, loadingStates } = useSimulationActions();
  const allowedActions = ALLOWED_ACTIONS_BY_STATUS[simulation.status].filter((action) => action !== "edit");

  return (
    <Container className="p-5">
      {/* Card Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-medium">{simulation.simulationName}</h3>
          <StatusBadge status={simulation.status} />
        </div>
        <Link
          to={`/simulations/${simulation.simulationId}`}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-50"
        >
          <Icon name="chevron_right" className="text-gray-400" />
        </Link>
      </div>

      {/* Card Details */}
      <div className="space-y-2 text-gray-500">
        <LabeledValue
          label="실행 패턴"
          value={PATTERN_CONFIGS[simulation.patternType].title}
          containerClass="justify-between"
        />
        <LabeledValue label="생성일시" value={formatDateTime(simulation.createdAt)} containerClass="justify-between" />
        <LabeledValue
          label="최종 업데이트"
          value={formatDateTime(simulation.updatedAt)}
          containerClass="justify-between"
        />
        <LabeledValue label="MEC ID" value={simulation.mecId} containerClass="justify-between" />
      </div>

      <Divider color="bg-gray-50" className="my-4" />

      {/* Card Actions */}
      <ActionButtons
        actions={allowedActions}
        simulationId={simulation.simulationId}
        actionHandlers={actionHandlers}
        isLoading={isLoading}
        loadingStates={loadingStates}
        className="ml-auto"
      />
    </Container>
  );
}
