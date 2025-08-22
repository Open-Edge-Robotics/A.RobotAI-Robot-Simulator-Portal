import { STATUS_CONFIG } from "@/pages/simulation/constants";
import type { Status } from "@/pages/simulation/types";

import Badge from ".";

export default function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="w-16">
      <Badge text={config.text} bgColor={config.bgColor} textColor={config.textColor} fontSize="text-xs" />
    </div>
  );
}
