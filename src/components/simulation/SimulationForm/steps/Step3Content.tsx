import ErrorFallback from "@/components/common/Fallback/ErrorFallback";

import type { SimulationPatternFormData } from "@/types/simulation/domain";
import type { TemplateLite } from "@/types/template/domain";

import ParallelPatternForm from "../patterns/ParallelPatternForm";
import SequentialPatternForm from "../patterns/SequentialPatternForm";

interface Step3ContentProps {
  pattern: SimulationPatternFormData;
  onChangePattern: (pattern: SimulationPatternFormData) => void;
  templateList: TemplateLite[];
}

export default function Step3Content({ pattern, onChangePattern, templateList }: Step3ContentProps) {
  if (!pattern) return <ErrorFallback message="패턴을 먼저 선택해주세요." />;

  switch (pattern.type) {
    case "sequential":
      return (
        <SequentialPatternForm
          templateList={templateList}
          agentGroups={pattern.agentGroups}
          onChangeAgentGroups={(groups) => onChangePattern({ type: "sequential", agentGroups: groups })}
        />
      );
    case "parallel":
      return (
        <ParallelPatternForm
          templateList={templateList}
          agentGroups={pattern.agentGroups}
          onChangeAgentGroups={(groups) => onChangePattern({ type: "parallel", agentGroups: groups })}
        />
      );
    default:
      return <ErrorFallback message="패턴을 먼저 선택해주세요." />;
  }
}
