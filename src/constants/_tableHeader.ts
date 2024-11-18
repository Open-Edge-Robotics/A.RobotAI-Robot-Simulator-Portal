const HEADER_LIST = [
  "네임스페이스",
  "포트번호",
  "age",
  "템플릿 타입",
  "인스턴스 볼륨",
  "로그",
  "상태",
  "토픽",
];

const HEADER_MAP = {
  [HEADER_LIST[0]]: "instanceNamespace",
  [HEADER_LIST[1]]: "instancePortNumber",
  [HEADER_LIST[2]]: "instanceAge",
  [HEADER_LIST[3]]: "templateType",
  [HEADER_LIST[4]]: "instanceVolume",
  [HEADER_LIST[5]]: "instanceLog",
  [HEADER_LIST[6]]: "instanceStatus",
  [HEADER_LIST[7]]: "topics",
};

export { HEADER_LIST, HEADER_MAP };
