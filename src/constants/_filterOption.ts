const SIMULATION_OPTION_LIST = [
  { label: "이름", value: "simulationName" },
  { label: "ID", value: "simulationId" },
  { label: "설명", value: "simulationDescription" },
  { label: "생성일", value: "simulationCreatedAt" },
  { label: "상태", value: "simulationStatus" },
  { label: "네임 스페이스", value: "simulationNamespace" },
];

const INSTANCE_OPTION_LIST = [
  { label: "이름", value: "instanceName" },
  { label: "ID", value: "instanceId" },
  { label: "설명", value: "instanceDescription" },
  { label: "생성일", value: "instanceCreatedAt" },
  { label: "파드 이름", value: "podName" },
  { label: "네임 스페이스", value: "podNamespace" },
  { label: "파드 상태", value: "podStatus" },
];

const TEMPLATE_OPTION_LIST = [
  { label: "템플릿 타입", value: "templateType" },
  { label: "ID", value: "templateId" },
  { label: "설명", value: "templateDescription" },
];

export { SIMULATION_OPTION_LIST, INSTANCE_OPTION_LIST, TEMPLATE_OPTION_LIST };
