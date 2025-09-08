import { CustomVerticalLabeledValue } from "@/components/common/LabeledValue";
import type { GroupDetail } from "@/types/simulation/simulationDetail";
import { formatDateTime, formatDuration } from "@/utils/formatting";

interface StepBodyProps {
  group: GroupDetail;
  lastUpdatedAt: string;
}

export default function GroupBody({ group, lastUpdatedAt }: StepBodyProps) {
  const fieldConfigs = getFieldConfigs(group, lastUpdatedAt);

  return (
    <div className="bg-gray-10 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {fieldConfigs.map((config, index) => (
        <div key={index}>
          <CustomVerticalLabeledValue label={config.label} value={config.value} />
        </div>
      ))}
    </div>
  );
}

interface FieldConfig {
  label: string;
  value: string;
}

// 상태별 필드 설정을 생성하는 함수
function getFieldConfigs(group: GroupDetail, lastUpdatedAt: string): FieldConfig[] {
  switch (group.status) {
    case "PENDING": {
      return [
        {
          label: "상태",
          value: "대기중",
        },
      ];
    }

    case "RUNNING": {
      const runningFields = [
        {
          label: "자율행동체 수",
          value: group.autonomousAgents.toString(),
        },
        {
          label: "시작 시간",
          value: formatDateTime(group.startedAt),
        },
        {
          label: "경과 시간",
          value: formatDuration(new Date(lastUpdatedAt).getTime() - new Date(group.startedAt).getTime()),
        },

        {
          label: "반복 횟수",
          value: `${group.currentRepeat}/${group.totalRepeats}`,
        },
      ];

      return runningFields;
    }

    case "COMPLETED": {
      const completedFields = [
        {
          label: "자율행동체 수",
          value: group.autonomousAgents.toString(),
        },
        {
          label: "시작 시간",
          value: formatDateTime(group.startedAt),
        },
        {
          label: "완료 시간",
          value: formatDateTime(group.completedAt),
        },
        {
          label: "소요 시간",
          value: formatDuration(new Date(group.completedAt).getTime() - new Date(group.startedAt).getTime()),
        },
        {
          label: "반복 횟수",
          value: `${group.currentRepeat}/${group.totalRepeats}`,
        },
      ];

      return completedFields;
    }

    case "FAILED": {
      return [
        {
          label: "자율행동체 수",
          value: group.autonomousAgents.toString(),
        },
        {
          label: "시작 시간",
          value: formatDateTime(group.startedAt),
        },
        {
          label: "실패 시간",
          value: formatDateTime(group.failedAt),
        },
        {
          label: "경과 시간",
          value: formatDuration(new Date(group.failedAt).getTime() - new Date(group.startedAt).getTime()),
        },
        {
          label: "반복 횟수",
          value: `${group.currentRepeat}/${group.totalRepeats}`,
        },
        {
          label: "오류 ",
          value: group.error,
        },
      ];
    }

    case "STOPPED": {
      return [
        {
          label: "자율행동체 수",
          value: group.autonomousAgents.toString(),
        },
        {
          label: "시작 시간",
          value: formatDateTime(group.startedAt),
        },
        {
          label: "중지 시간",
          value: formatDateTime(group.stoppedAt),
        },
        {
          label: "경과 시간",
          value: formatDuration(new Date(group.stoppedAt).getTime() - new Date(group.startedAt).getTime()),
        },
        {
          label: "반복 횟수",
          value: `${group.currentRepeat}/${group.totalRepeats}`,
        },
      ];
    }

    default: {
      // Exhaustiveness check - 새로운 상태가 추가되면 컴파일 에러 발생
      const _exhaustiveCheck: never = group;
      return [];
    }
  }
}
