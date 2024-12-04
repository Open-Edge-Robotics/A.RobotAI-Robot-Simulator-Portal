/**
 * @description 인스턴스 상세 테이블에 보여지는 헤더 이름
 * HEADER_LIST와 HEADER_MAP의 요소 순서가 매칭되어야 함
 */
const HEADER_LIST = [
  "pod name",
  "status",
  "image",
  "age",
  "label",
  "template type",
  "topics",
  "namespace",
];

/**
 * @description 인스턴스 상세 테이블 헤더에 들어가는 변수 이름
 */
const HEADER_MAP = {
  [HEADER_LIST[0]]: "podName",
  [HEADER_LIST[1]]: "instanceStatus",
  [HEADER_LIST[2]]: "instanceImage",
  [HEADER_LIST[3]]: "instanceAge",
  [HEADER_LIST[4]]: "instanceLabel",
  [HEADER_LIST[5]]: "templateType",
  [HEADER_LIST[6]]: "topics",
  [HEADER_LIST[7]]: "instanceNamespace",
};

export { HEADER_LIST, HEADER_MAP };
