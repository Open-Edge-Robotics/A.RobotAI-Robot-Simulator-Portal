import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { CreateSimulationRequest } from "@/types/simulation/api";

import { errorToast, successToast } from "@/utils/toast";

export function useUpdateSimulation(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSimulation: CreateSimulationRequest) => {
      return simulationAPI.updateSimulation(id, newSimulation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation });
      successToast("시뮬레이션을 수정했습니다.");
      navigate(`/simulation/${id}`);
    },
    // TODO: 에러 처리
    onError: (e: { response: object }) => {
      errorToast("시뮬레이션을 수정하지 못했습니다.");
      console.log(e.response);
    },
  });
}
