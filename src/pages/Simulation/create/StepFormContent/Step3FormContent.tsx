import Fallback from "@/components/common/Fallback";

import type { Pattern, Template } from "../../types";

import ParallelPatternForm from "./ParallelPatternForm";
import SequentialPatternForm from "./SequentialPatternForm";

interface Step3FormContentProps {
  pattern: Pattern;
  onChangePattern: (pattern: Pattern) => void;
}

const getMockTemplateList = (): Template[] => [
  { id: "template1", name: "템플릿 1" },
  { id: "template2", name: "템플릿 2" },
  { id: "template3", name: "템플릿 3" },
];

export default function Step3FormContent({ pattern, onChangePattern }: Step3FormContentProps) {
  if (!pattern) return <Fallback text="패턴을 선택해주세요." />;

  const templateList = getMockTemplateList();

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
