import Badge from "../../../../components/common/Badge";
import Container from "../../../../components/common/Container.tsx";
import { PATTERN_DATA } from "../../constant.ts";
import type { Pattern, SimulatioFormData } from "../../types.ts";

interface Step4FormContentProps {
  formData: SimulatioFormData;
}

export default function Step4FormContent({ formData }: Step4FormContentProps) {
  if (!formData.mec || !formData.pattern)
    return <div>필수 정보를 모두 입력해주세요.</div>;

  const totalAutonomousAgentCount = getTotalAutonomousAgentCount(
    formData.pattern.agentGroups,
  );
  const totalExecutionTime = getTotalExecutionTime(formData.pattern);

  const getPatternInfoHeaderTitle = () => {
    const patternData = PATTERN_DATA[formData.pattern?.type ?? "sequential"];
    return `${patternData.title} ${patternData.unit}`;
  };

  return (
    <div className="space-y-5">
      {/* 기본 정보 */}
      <Container gap="gap-6" padding="p-6" shadow="shadow-xs">
        <Header title="기본 정보" />
        <Body>
          <LabelValuePair
            label="이름:"
            value={formData.name}
            labelWidth="w-24"
          />
          <LabelValuePair
            label="설명:"
            value={formData.description}
            labelWidth="w-24"
          />
          {/* TODO: mec null 값 없애기 */}
          <LabelValuePair
            label="MEC:"
            value={formData.mec.name}
            labelWidth="w-24"
          />
          <LabelValuePair
            label="실행 패턴:"
            value={formData.pattern.type}
            labelWidth="w-24"
          />
        </Body>
      </Container>

      {/* 패턴 상세 정보 */}
      <Container gap="gap-6" padding="p-6" shadow="shadow-xs">
        <Header title={getPatternInfoHeaderTitle()} />
        <Body>
          {formData.pattern.type === "sequential"
            ? formData.pattern.agentGroups.map((group) => {
                const groupUnit = PATTERN_DATA.sequential.unit;
                const label = `${group.stepOrder}${groupUnit}`;
                return (
                  <PatternConfigCard
                    indexLabel={label}
                    autonomousAgentCount={group.autonomousAgentCount}
                    delayAfterCompletion={group.delayAfterCompletion}
                    executionTime={group.executionTime}
                    repeatCount={group.repeatCount}
                    // TODO: template null값 없애기
                    template={group.template?.name ?? ""}
                  />
                );
              })
            : formData.pattern.agentGroups.map((group, i) => {
                const groupUnit = PATTERN_DATA.parallel.unit;
                const label = `${groupUnit} ${i + 1}`;
                return (
                  <PatternConfigCard
                    indexLabel={label}
                    autonomousAgentCount={group.autonomousAgentCount}
                    executionTime={group.executionTime}
                    repeatCount={group.repeatCount}
                    // TODO: template null값 없애기
                    template={group.template?.name ?? ""}
                  />
                );
              })}

          {/* 총 실행 정보 */}
          <Container
            bgColor="bg-neutral-50"
            borderColor="border-neutral-200"
            margin="mt-5"
            padding="p-4"
          >
            <LabelValuePair
              label="총 실행 정보:"
              justifyContent="justify-between"
            >
              <div className="flex gap-3">
                <span>
                  총 가상자율행동체:{" "}
                  <span className="font-semibold">
                    {totalAutonomousAgentCount}대
                  </span>
                </span>
                <span>
                  총 실행시간:{" "}
                  <span className="font-semibold">{totalExecutionTime}초</span>
                </span>
              </div>
            </LabelValuePair>
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

interface LabelValuePairProps {
  label: string;
  labelWidth?: string;
  labelFontWeight?: string;
  value?: string;
  justifyContent?: string;
  children?: React.ReactNode;
}

function LabelValuePair({
  label,
  labelWidth = "w-auto",
  labelFontWeight = "font-normal",
  value,
  justifyContent = "justify-normal",
  children,
}: LabelValuePairProps) {
  return (
    <div className={`flex ${justifyContent}`}>
      <span className={`${labelWidth} ${labelFontWeight}`}>{label}</span>
      <span>{value}</span>
      {children}
    </div>
  );
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
    <Container
      bgColor="bg-green-50"
      borderColor="border-green-200"
      padding="p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <Badge text={indexLabel} fontWeight="font-medium" />
        <Badge text={template} bgColor="bg-neutral-500" fontSize="text-sm" />
      </div>
      <div className="space-y-2">
        <LabelValuePair
          label="가상자율행동체 개수:"
          value={`${autonomousAgentCount}대`}
          justifyContent="justify-between"
        />
        <LabelValuePair
          label="실행 시간:"
          value={`${executionTime}초`}
          justifyContent="justify-between"
        />
        {delayAfterCompletion && (
          <LabelValuePair
            label="완료 후 대기 시간:"
            value={`${delayAfterCompletion}초`}
            justifyContent="justify-between"
          />
        )}
        <LabelValuePair
          label="반복 횟수:"
          value={`${repeatCount}초`}
          justifyContent="justify-between"
        />
      </div>
    </Container>
  );
}

const getTotalAutonomousAgentCount = <
  K extends { autonomousAgentCount: number },
>(
  agentGroups: K[],
) => {
  return agentGroups.reduce(
    (sum, group) => sum + group.autonomousAgentCount,
    0,
  );
};

function getTotalExecutionTime(pattern: Pattern) {
  if (!pattern) return 0;

  if (pattern.type === "sequential") {
    const totalExecutionTime = pattern.agentGroups.reduce((sum, group) => {
      const groupTotal =
        (group.executionTime + group.delayAfterCompletion) * group.repeatCount;
      return sum + groupTotal;
    }, 0);
    return totalExecutionTime;
  }

  if (pattern.type === "parallel") {
    const totalExecutionTime = Math.max(
      ...pattern.agentGroups.map(
        (group) => group.executionTime * group.repeatCount,
      ),
    );
    return totalExecutionTime;
  }

  return 0;
}
