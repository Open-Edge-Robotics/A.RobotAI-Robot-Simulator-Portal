import Container from "@/components/common/Container.tsx";
import DonutChart from "@/components/common/DonutChart";
import Title from "@/components/common/Title";

import type { ResourceUsageData } from "@/types/simulation/domain";

interface ResourceUsageProps {
  resource: ResourceUsageData;
}

export default function ResourceUsage({ resource }: ResourceUsageProps) {
  const { cpu, disk, memory } = resource;

  return (
    <Container shadow className="p-6">
      <Title title="리소스 사용률" fontSize="text-xl" fontWeight="font-medium" margin="mb-4" />
      <div className="grid gap-6 sm:grid-cols-3">
        <DonutChart label="CPU" percentage={cpu.usagePercent} />
        <DonutChart label="Memory" percentage={memory.usagePercent} />
        <DonutChart label="Disk" percentage={disk.usagePercent} />
      </div>
    </Container>
  );
}
