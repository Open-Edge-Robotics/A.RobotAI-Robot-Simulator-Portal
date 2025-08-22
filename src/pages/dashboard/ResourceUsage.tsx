import Container from "@/components/common/Container.tsx";
import DonutChart from "@/components/common/DonutChart";
import Title from "@/components/common/Title";

interface ResourceUsageProps {
  resource: { cpu: number; memory: number; disk: number };
}

export default function ResourceUsage({ resource }: ResourceUsageProps) {
  return (
    <Container padding="p-6" shadow grow>
      <Title title="리소스 사용률" fontSize="text-xl" fontWeight="font-medium" margin="mb-4" />
      <div className="grid grid-cols-3 gap-6">
        <DonutChart label="CPU" percentage={resource.cpu} />
        <DonutChart label="Memory" percentage={resource.memory} />
        <DonutChart label="Disk" percentage={resource.disk} />
      </div>
    </Container>
  );
}
