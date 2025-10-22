import { STATUS_CONFIGS } from "@/constants/simulation";

import type { SimulationStatus } from "@/types/simulation/domain";

import Badge from ".";
import Dot from "../Dot";

export default function StatusBadge({ status }: { status: SimulationStatus }) {
  const { bgColor, highlightColor, text, textColor } = STATUS_CONFIGS[status];

  return (
    <Badge bgColor={bgColor}>
      <Dot color={highlightColor} size="sm" />
      <span className={`${textColor} text-xs font-normal`}>{text}</span>
    </Badge>
  );
}
