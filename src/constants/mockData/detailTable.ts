import { HEADER_LIST } from "@/constants/detailTable";
import { TableData } from "@/type/_table";
import { InstanceDetailResponse } from "@/type/response/instance";

export const MOCK_DETAIL_TABLE_DATA: TableData[] = [
  { [HEADER_LIST[0]]: "mec-windows" },
  { [HEADER_LIST[1]]: "192.168.1.2" },
  { [HEADER_LIST[2]]: "macOS Big Sur" },
  { [HEADER_LIST[3]]: "namespace" },
  { [HEADER_LIST[4]]: "80000" },
  { [HEADER_LIST[5]]: "ㅇㄻㅇㄹㅇㄹ" },
  { [HEADER_LIST[6]]: "다른데이터입니다" },
  { [HEADER_LIST[7]]: "다른데이터입니다B" },
];

export const MOCK_DETAIL_RESPONSE: InstanceDetailResponse = {
  serverName: "난 서버네임",
  ipAddress: "192.168.1.2",
  os: "macOS Big Sur",
  namespace: "namespace",
  port: "80000",
  node: "ㅇㄻㅇㄹㅇㄹ",
  other1: "다른데이터입니다",
  other2: "다른데이터입니다B",
};
