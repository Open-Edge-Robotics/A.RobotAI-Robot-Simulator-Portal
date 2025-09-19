import Container from "@/components/common/Container.tsx";
import Divider from "@/components/common/Divider";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import Title from "@/components/common/Title";

import type { GetStatusResponseFinal } from "@/types/simulation/status";

import { formatDateTime } from "@/utils/common/formatting";

import ProgressIndicator from "./ProgressIndicator";
import ProgressOverview from "./ProgressOverview";
import TimeInformation from "./TimeInformation";

interface SimulationOverallProgressProps {
  result: GetStatusResponseFinal;
}

export default function SimulationOverallProgress({ result }: SimulationOverallProgressProps) {
  if (result.currentStatus.status === "INITIATING") {
    return (
      <Container className="p-6">
        <SimulationOverallProgressTitle />
        <InformationFallback
          message={result.currentStatus.message}
          subMessage={`마지막 업데이트: ${formatDateTime(result.currentStatus.timestamps.lastUpdated)}`}
          removeBorder
        />
      </Container>
    );
  }

  const progressData =
    result.patternType === "sequential"
      ? {
          patternType: "sequential" as const,
          progress: result.currentStatus.progress,
        }
      : {
          patternType: "parallel" as const,
          progress: result.currentStatus.progress,
        };

  return (
    <Container className="p-6">
      <SimulationOverallProgressTitle message={result.currentStatus.message} />

      {/* 진행 상황 개요 */}
      <ProgressOverview progressData={progressData} />

      {/* 진행률 바 */}
      <ProgressIndicator progressData={progressData} status={result.currentStatus.status} />

      <Divider className="my-6" />

      {/* 실행 시간 정보 */}
      <TimeInformation status={result.currentStatus.status} timestamps={result.currentStatus.timestamps} />
    </Container>
  );
}

function SimulationOverallProgressTitle({ message }: { message?: string }) {
  return (
    <Title fontSize="text-xl" margin="mb-4">
      <span>전체 진행 상황</span>
      <span className="ml-4 text-sm font-medium text-gray-600">{message}</span>
    </Title>
  );
}
