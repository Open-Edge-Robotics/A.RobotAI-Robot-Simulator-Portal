const HEADER_LIST = [
  "서버명",
  "IP주소",
  "운영체제",
  "네임스페이스",
  "포트번호",
  "노드정보",
  "다른데이터A",
  "다른데이터B",
];

const HEADER_MAP = {
  [HEADER_LIST[0]]: "serverName",
  [HEADER_LIST[1]]: "ipAddress",
  [HEADER_LIST[2]]: "os",
  [HEADER_LIST[3]]: "namespace",
  [HEADER_LIST[4]]: "port",
  [HEADER_LIST[5]]: "node",
  [HEADER_LIST[6]]: "other1",
  [HEADER_LIST[7]]: "other2",
};

export { HEADER_LIST, HEADER_MAP };
