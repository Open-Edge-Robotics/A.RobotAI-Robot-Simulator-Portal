import type {
  CreatePatternGroupRequest,
  DeletePatternGroupRequest,
  UpdatePatternGroupRequest,
} from "@/types/simulation/api";
import type { PatternActionType } from "@/types/simulation/domain";

import { useCreatePatternGroup } from "./useCreatePatternGroup";
import { useDeletePatternGroup } from "./useDeletePatternGroup";
import { useUpdatePatternGroup } from "./useUpdatePatternGroup";

interface UseUpdateSimulationOptions {
  onSuccessCallback?: {
    create?: () => void;
    update?: () => void;
    delete?: () => void;
  };
}

export function useUpdateSimulation(simulationId: number, options: UseUpdateSimulationOptions) {
  const { onSuccessCallback = {} } = options || {};

  const createMutation = useCreatePatternGroup(simulationId, {
    onSuccessCallback: onSuccessCallback.create,
  });
  const updateMutation = useUpdatePatternGroup(simulationId, {
    onSuccessCallback: onSuccessCallback.update,
  });
  const deleteMutation = useDeletePatternGroup(simulationId, {
    onSuccessCallback: onSuccessCallback.delete,
  });

  const actionHandlers = {
    create: (data: CreatePatternGroupRequest) => createMutation.mutate(data),
    update: (data: UpdatePatternGroupRequest) => updateMutation.mutate(data),
    delete: (data: DeletePatternGroupRequest) => deleteMutation.mutate(data),
  };

  // 개별 로딩 상태 객체
  const loadingStates: Record<PatternActionType, boolean> = {
    create: createMutation.isPending,
    update: updateMutation.isPending,
    delete: deleteMutation.isPending,
  };

  const mutations = {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
  };

  return {
    actionHandlers,
    loadingStates,
    mutations,
  };
}
