import { HEADER_LIST } from "@/constants/_tableHeader";

export type TableKeys = (typeof HEADER_LIST)[number];

export type TableData = {
  [key in TableKeys]?: string;
};
