import type { GetStatusResponseFinal } from "@/types/simulation/status";

import { getField } from "@/utils/common/field";
import { formatDateTime, formatMsToGeneralForm } from "@/utils/common/formatting";

interface TimeInformationProps {
  status: GetStatusResponseFinal["currentStatus"]["status"];
  timestamps: GetStatusResponseFinal["currentStatus"]["timestamps"];
}
export default function TimeInformation({ status, timestamps }: TimeInformationProps) {
  const hasStartTime = "startedAt" in timestamps;
  const endedAt = getEndedAt(status, timestamps);

  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center gap-4">
        {hasStartTime ? (
          <>
            <span>시작: {formatDateTime(timestamps.startedAt)}</span>
            {endedAt ? (
              <>
                <span>종료: {formatDateTime(endedAt)}</span>
                <span>
                  소요: {formatMsToGeneralForm(new Date(endedAt).getTime() - new Date(timestamps.startedAt).getTime())}
                </span>
              </>
            ) : (
              <span>
                경과:{" "}
                {formatMsToGeneralForm(
                  new Date(timestamps.lastUpdated).getTime() - new Date(timestamps.startedAt).getTime(),
                )}
              </span>
            )}
          </>
        ) : (
          <span>생성: {formatDateTime(timestamps.createdAt)}</span>
        )}
      </div>
      <span>업데이트: {formatDateTime(timestamps.lastUpdated)}</span>
    </div>
  );
}

// 상태별 종료 시간 추출
function getEndedAt(
  status: GetStatusResponseFinal["currentStatus"]["status"],
  timestamps: GetStatusResponseFinal["currentStatus"]["timestamps"],
): string | null {
  switch (status) {
    case "COMPLETED":
      return getField(timestamps, "completedAt");
    case "FAILED":
      return getField(timestamps, "failedAt");
    case "STOPPED":
      return getField(timestamps, "stoppedAt");
    default:
      return null;
  }
}
