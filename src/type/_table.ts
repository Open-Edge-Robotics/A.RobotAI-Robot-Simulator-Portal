import { HEADER_LIST } from "@/constants/detailTable";

export type TableKeys = (typeof HEADER_LIST)[number];

export type TableData = {
  [key in TableKeys]?: string;
};
