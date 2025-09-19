import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { CreateSimulationRequest } from "@/types/simulation/api";

import { successToast } from "@/utils/common/toast";

export function useCreateSimulation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newSimulation: CreateSimulationRequest) => {
      return simulationAPI.createSimulation(newSimulation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
      successToast("시뮬레이션을 생성했습니다.");
      navigate("/simulation");
    },
  });
}
