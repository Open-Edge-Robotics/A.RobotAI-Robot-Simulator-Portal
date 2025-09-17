import { useReducer } from "react";

export function useGroupDetailState() {
  const [isConfigSectionOpen, toggleConfigSection] = useReducer((x) => !x, false);
  const [showAddEditor, toggleAddEditor] = useReducer((x) => !x, false);

  return {
    isConfigSectionOpen,
    toggleConfigSection,
    showAddEditor,
    toggleAddEditor,
  };
}
