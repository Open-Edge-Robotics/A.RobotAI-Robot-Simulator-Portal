import { STATUS_CONFIG } from "@/constants/simulation";
import type { Status } from "@/types/simulation/domain";

import Badge from ".";

export default function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="w-17">
      <Badge text={config.text} bgColor={config.bgColor} textColor={config.textColor} fontSize="text-xs" />
    </div>
  );
}
