import { STATUS_CONFIGS } from "@/constants/simulation";
import type { SimulationStatus } from "@/types/simulation/domain";

import Badge from ".";

export default function StatusBadge({ status }: { status: SimulationStatus }) {
  const config = STATUS_CONFIGS[status];

  return (
    <div className="w-17">
      <Badge text={config.text} bgColor={config.bgColor} textColor={config.textColor} fontSize="text-xs" />
    </div>
  );
}
