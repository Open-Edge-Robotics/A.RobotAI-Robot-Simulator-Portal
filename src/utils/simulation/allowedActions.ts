import { ALLOWED_ACTIONS_BY_STATUS } from "@/constants/simulation";

import type { SimulationActionType, SimulationStatus } from "@/types/simulation/domain";

export const getAllowedActions = (status: SimulationStatus, context: "list" | "detail"): SimulationActionType[] => {
  const baseActions = ALLOWED_ACTIONS_BY_STATUS[status];

  if (context === "list") {
    return baseActions.filter((action) => action !== "edit" && action !== "delete");
  }

  return baseActions;
};
