import Fallback from "@/components/common/Fallback";

import type { Pattern, Template } from "../../types";

import ParallelPatternForm from "./ParallelPatternForm";
import SequentialPatternForm from "./SequentialPatternForm";

interface Step3ContentProps {
  pattern: Pattern;
  onChangePattern: (pattern: Pattern) => void;
  templateList: Template[];
}

export default function Step3Content({ pattern, onChangePattern, templateList }: Step3ContentProps) {
  if (!pattern) return <Fallback text="패턴을 선택해주세요." />;

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
      return <Fallback text="패턴을 선택해주세요." />;
  }
}
