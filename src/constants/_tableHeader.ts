const HEADER_LIST = [
  "namespace",
  "status",
  "image",
  "age",
  "label",
  "template type",
  "topics",
  "pod name",
];

const HEADER_MAP = {
  [HEADER_LIST[0]]: "instanceNamespace",
  [HEADER_LIST[1]]: "instanceStatus",
  [HEADER_LIST[2]]: "instanceImage",
  [HEADER_LIST[3]]: "instanceAge",
  [HEADER_LIST[4]]: "instanceLabel",
  [HEADER_LIST[5]]: "templateType",
  [HEADER_LIST[6]]: "topics",
  [HEADER_LIST[7]]: "podName",
};

export { HEADER_LIST, HEADER_MAP };
