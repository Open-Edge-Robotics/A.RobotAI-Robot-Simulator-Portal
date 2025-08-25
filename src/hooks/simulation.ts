import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";
import { QUERY_KEYS } from "@/constants/api";

export function useSimulationActions() {
  const queryClient = useQueryClient();

  const startMutation = useMutation({
    mutationFn: (id: number) => simulationAPI.runSimulation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation }),
  });

  const pauseMutation = useMutation({
    mutationFn: (id: number) => simulationAPI.pauseSimulation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => simulationAPI.deleteSimulation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation }),
  });

  const isLoading = startMutation.isPending || pauseMutation.isPending || deleteMutation.isPending;

  return {
    actions: {
      onStart: (simulationId: number) => startMutation.mutate(simulationId),
      onPause: (simulationId: number) => pauseMutation.mutate(simulationId),
      onDelete: (simulationId: number) => deleteMutation.mutate(simulationId),
    },
    isLoading,
  };
}
