import Badge from "@/components/common/Badge";
import Container from "@/components/common/Container.tsx";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback.tsx";
import LabeledValue from "@/components/common/LabeledValue";

import { PATTERN_CONFIGS } from "@/constants/simulation";

import type { Mec, SimulationFormData } from "@/types/simulation/domain";
import type { TemplateLite } from "@/types/template/domain";

import { calculateTotalAgentCount, calculateTotalExecutionTime } from "@/utils/simulation/calculate";

interface Step4ContentProps {
  formData: SimulationFormData;
  mecList: Mec[];
  templateList: TemplateLite[];
}

export default function Step4Content({ formData, mecList, templateList }: Step4ContentProps) {
  if (!formData.mecId || !formData.pattern) return <ErrorFallback message="필수 정보를 모두 입력해주세요." />;

  const totalAgentCount = calculateTotalAgentCount(formData.pattern.agentGroups);
  const totalExecutionTime = calculateTotalExecutionTime(formData.pattern);

  const mecName = mecList.find((mec) => mec.id === formData.mecId)?.name || "-";
  const patternConfig = PATTERN_CONFIGS[formData.pattern.type];

  return (
    <div className="space-y-5">
      {/* 기본 정보 */}
      <Container shadow className="gap-6 p-6">
        <Header title="기본 정보" />
        <Body>
          <LabeledValue label="이름:" value={formData.name} labelClass="w-24" />
          <LabeledValue label="설명:" value={formData.description || "-"} labelClass="w-24" />
          <LabeledValue label="MEC:" value={mecName} labelClass="w-24" />
          <LabeledValue label="실행 패턴:" value={PATTERN_CONFIGS[formData.pattern.type].title} labelClass="w-24" />
        </Body>
      </Container>

      {/* 패턴 상세 정보 */}
      <Container shadow className="gap-6 p-6">
        <Header title={`${patternConfig.title} ${patternConfig.unit}`} />
        <Body>
          {renderPatternDetails(formData.pattern, templateList)}

          {/* 총 실행 정보 */}
          <Container bgColor="bg-gray-10" borderColor="border-gray-100" className="mt-5 p-4">
            <LabeledValue label="총 실행 정보:" containerClass="justify-between">
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

function renderPatternDetails(pattern: NonNullable<SimulationFormData["pattern"]>, templateList: TemplateLite[]) {
  // 순차 실행
  if (pattern.type === "sequential") {
    const groupUnit = PATTERN_CONFIGS.sequential.unit;

    return pattern.agentGroups.map((group) => {
      const label = `${group.stepOrder}${groupUnit}`;

      return (
        <PatternConfigCard
          indexLabel={label}
          autonomousAgentCount={group.autonomousAgentCount}
          delayAfterCompletion={group.delayAfterCompletion}
          executionTime={group.executionTime}
          repeatCount={group.repeatCount}
          template={templateList.find((template) => template.templateId === group.templateId)?.name || "-"}
          key={label}
        />
      );
    });
  }

  // 병렬 실행
  const groupUnit = PATTERN_CONFIGS.parallel.unit;

  return pattern.agentGroups.map((group, index) => {
    const label = `${groupUnit} ${index + 1}`;

    return (
      <PatternConfigCard
        indexLabel={label}
        autonomousAgentCount={group.autonomousAgentCount}
        executionTime={group.executionTime}
        repeatCount={group.repeatCount}
        template={templateList.find((template) => template.templateId === group.templateId)?.name || "-"}
        key={label}
      />
    );
  });
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
  autonomousAgentCount: number;
  delayAfterCompletion?: number;
  executionTime: number;
  repeatCount: number;
}

function PatternConfigCard({
  indexLabel,
  template,
  autonomousAgentCount,
  delayAfterCompletion,
  executionTime,
  repeatCount,
}: PatternConfigCardProps) {
  return (
    <Container bgColor="bg-green-10" borderColor="border-green-500" className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <Badge text={indexLabel} bgColor="bg-green-200" textColor="text-green-700" fontWeight="font-medium" />
        <Badge text={template} fontSize="text-sm" textColor="text-gray-700" />
      </div>
      <div className="space-y-2">
        <LabeledValue
          label="가상자율행동체 개수:"
          value={`${autonomousAgentCount}대`}
          containerClass="justify-between"
        />
        <LabeledValue label="실행 시간:" value={`${executionTime}초`} containerClass="justify-between" />
        {delayAfterCompletion && (
          <LabeledValue
            label="완료 후 대기 시간:"
            value={`${delayAfterCompletion}초`}
            containerClass="justify-between"
          />
        )}
        <LabeledValue label="반복 횟수:" value={`${repeatCount}초`} containerClass="justify-between" />
      </div>
    </Container>
  );
}
