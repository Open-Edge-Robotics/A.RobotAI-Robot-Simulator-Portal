import type { SimulationPattern } from "@/types/simulation/domain";

export const calculateTotalAgentCount = <K extends { autonomousAgentCount: number }>(agentGroups: K[]) => {
  return agentGroups.reduce((sum, group) => sum + group.autonomousAgentCount, 0);
};

export const calculateTotalExecutionTime = (pattern: SimulationPattern) => {
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
};
