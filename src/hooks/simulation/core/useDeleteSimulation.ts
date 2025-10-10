import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { SEGMENTS } from "@/constants/navigation";

import { successToast } from "@/utils/common/toast";

export function useDeleteSimulation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => simulationAPI.deleteSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 삭제했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
      navigate(SEGMENTS.absolute.simulation);
    },
  });
}
