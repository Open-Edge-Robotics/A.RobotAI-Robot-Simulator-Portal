import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";

import type { SystemOverviewConfig } from "@/types/dashboard/domain";

interface SystemOverviewCardProps {
  config: SystemOverviewConfig;
  value?: number;
}

export default function SystemOverviewCard({ config, value }: SystemOverviewCardProps) {
  const { label, iconName, iconColor, iconBgColor } = config;

  return (
    <div className="min-w-40 flex-1">
      <Container flexDirection="flex-row" shadow className="items-start justify-between p-4">
        <div>
          <div className="mb-1 text-2xl font-bold">{value ?? "-"}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-sm ${iconBgColor}`}>
          <Icon name={iconName} className={`${iconColor}`} />
        </div>
      </Container>
    </div>
  );
}
