import Badge from "@/components/common/Badge";
import Container from "@/components/common/Container.tsx";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback.tsx";
import LabeledValue from "@/components/common/LabeledValue";

import { PATTERN_CONFIG } from "../../constants.ts";
import type { Mec, Pattern, SimulationFormData, Template } from "../../types.ts";

interface Step4ContentProps {
  formData: SimulationFormData;
  mecList: Mec[];
  templateList: Template[];
}

// TODO: 컴포넌트 분리, 폴더 구조 생각해보기

export default function Step4Content({ formData, mecList, templateList }: Step4ContentProps) {
  if (!formData.mecId || !formData.pattern) return <ErrorFallback message="필수 정보를 모두 입력해주세요." />;
  const totalAgentCount = calculateTotalAgentCount(formData.pattern.agentGroups);
  const totalExecutionTime = calculateTotalExecutionTime(formData.pattern);

  const mecName = mecList.find((mec) => mec.id === formData.mecId)?.name || "-";
  const templateName =
    templateList.find((template) => template.id === formData.pattern?.agentGroups[0]?.templateId)?.name || "-";

  const getPatternInfoHeaderTitle = () => {
    const patternData = PATTERN_CONFIG[formData.pattern?.type ?? "sequential"];
    return `${patternData.title} ${patternData.unit}`;
  };

  return (
    <div className="space-y-5">
      {/* 기본 정보 */}
      <Container gap="gap-6" padding="p-6" shadow>
        <Header title="기본 정보" />
        <Body>
          <LabeledValue label="이름:" value={formData.name} labelWidth="w-24" />
          <LabeledValue label="설명:" value={formData.description || "-"} labelWidth="w-24" />
          <LabeledValue label="MEC:" value={mecName} labelWidth="w-24" />
          <LabeledValue label="실행 패턴:" value={PATTERN_CONFIG[formData.pattern.type].title} labelWidth="w-24" />
        </Body>
      </Container>

      {/* 패턴 상세 정보 */}
      <Container gap="gap-6" padding="p-6" shadow>
        <Header title={getPatternInfoHeaderTitle()} />
        <Body>
          {formData.pattern.type === "sequential"
            ? formData.pattern.agentGroups.map((group) => {
                // template 없을 경우 fallback 처리
                // (실제로는 step validation으로 검증을 거쳤으므로 template에 null 값이 들어갈 일은 없음)
                // TODO: null 값 처리 로직 다듬기
                if (!group.templateId)
                  return <ErrorFallback message="필수 정보를 모두 입력해주세요." key={group.stepOrder} />;

                const groupUnit = PATTERN_CONFIG.sequential.unit;
                const label = `${group.stepOrder}${groupUnit}`;
                return (
                  <PatternConfigCard
                    indexLabel={label}
                    agentCount={group.agentCount}
                    delayAfterCompletion={group.delayAfterCompletion}
                    executionTime={group.executionTime}
                    repeatCount={group.repeatCount}
                    template={templateName}
                    key={label}
                  />
                );
              })
            : formData.pattern.agentGroups.map((group, i) => {
                if (!group.templateId) return <ErrorFallback message="필수 정보를 모두 입력해주세요." key={i} />;
                const groupUnit = PATTERN_CONFIG.parallel.unit;
                const label = `${groupUnit} ${i + 1}`;
                return (
                  <PatternConfigCard
                    indexLabel={label}
                    agentCount={group.agentCount}
                    executionTime={group.executionTime}
                    repeatCount={group.repeatCount}
                    template={templateList.find((template) => template.id === group.templateId)?.name || "-"}
                    key={label}
                  />
                );
              })}

          {/* 총 실행 정보 */}
          <Container bgColor="bg-gray-10" borderColor="border-gray-100" margin="mt-5" padding="p-4">
            <LabeledValue label="총 실행 정보:" justifyContent="justify-between">
              <div className="flex gap-3">
                <span>
                  총 가상자율행동체: <span className="font-semibold">{totalAgentCount}대</span>
                </span>
                <span>
                  총 실행시간: <span className="font-semibold">{totalExecutionTime}초</span>
                </span>
              </div>
            </LabeledValue>
          </Container>
        </Body>
      </Container>
    </div>
  );
}

function Header({ title }: { title: string }) {
  return <h3 className="text-lg font-semibold">{title}</h3>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

interface PatternConfigCardProps {
  indexLabel: string;
  template: string;
  agentCount: number;
  delayAfterCompletion?: number;
  executionTime: number;
  repeatCount: number;
}

function PatternConfigCard({
  indexLabel,
  template,
  agentCount,
  delayAfterCompletion,
  executionTime,
  repeatCount,
}: PatternConfigCardProps) {
  return (
    <Container bgColor="bg-green-10" borderColor="border-green-500" padding="p-4">
      <div className="mb-3 flex items-center justify-between">
        <Badge text={indexLabel} bgColor="bg-green-200" textColor="text-green-700" fontWeight="font-medium" />
        <Badge text={template} fontSize="text-sm" textColor="text-gray-700" />
      </div>
      <div className="space-y-2">
        <LabeledValue label="가상자율행동체 개수:" value={`${agentCount}대`} justifyContent="justify-between" />
        <LabeledValue label="실행 시간:" value={`${executionTime}초`} justifyContent="justify-between" />
        {delayAfterCompletion && (
          <LabeledValue
            label="완료 후 대기 시간:"
            value={`${delayAfterCompletion}초`}
            justifyContent="justify-between"
          />
        )}
        <LabeledValue label="반복 횟수:" value={`${repeatCount}초`} justifyContent="justify-between" />
      </div>
    </Container>
  );
}

const calculateTotalAgentCount = <K extends { agentCount: number }>(agentGroups: K[]) => {
  return agentGroups.reduce((sum, group) => sum + group.agentCount, 0);
};

function calculateTotalExecutionTime(pattern: Pattern) {
  if (!pattern) return 0;

  if (pattern.type === "sequential") {
    const totalExecutionTime = pattern.agentGroups.reduce((sum, group) => {
      // Sequential: 단계별 총 시간 = (executionTime × repeatCount) + delayAfterCompletion
      const groupTotal = group.executionTime * group.repeatCount + group.delayAfterCompletion;
      return sum + groupTotal;
    }, 0);

    const lastGroupDelay = pattern.agentGroups.at(-1)?.delayAfterCompletion || 0;
    return totalExecutionTime + lastGroupDelay;
  }

  if (pattern.type === "parallel") {
    // Parallel: 그룹별 총 시간 = executionTime × repeatCount, 전체 시간은 최대값
    const totalExecutionTime = Math.max(...pattern.agentGroups.map((group) => group.executionTime * group.repeatCount));
    return totalExecutionTime;
  }

  return 0;
}
