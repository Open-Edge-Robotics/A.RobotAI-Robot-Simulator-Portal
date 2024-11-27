import { INSTANCE_OPTION_LIST } from "@/constants/_filterOption";
import {
  InstanceCreatedAtField,
  InstanceDescriptionField,
  InstanceIdField,
  InstanceNameField,
} from "@/type/_field";
import { InstanceListResponse } from "@/type/response/_instance";
import { SimulationType } from "@/type/response/_simulation";

export const filterSimulationList = (
  dataList: SimulationType[],
  optionList: { label: string; value: string }[],
  keyword: string,
  filterType: string,
) => {
  if (keyword === "") {
    return dataList;
  }

  return dataList.filter((data) => {
    const filterKey = optionList.find(
      (option) => option.value === filterType,
    )?.value;

    const value = data[filterKey as keyof typeof data];

    if (!filterKey) return true;

    return String(value).toLowerCase().includes(keyword.toLowerCase());
  });
};

export const filterInstances = (
  instances: InstanceListResponse,
  keyword: string,
  filterType: string,
) => {
  return instances.filter((instance) => {
    if (filterType === INSTANCE_OPTION_LIST[0].value) {
      return instance[INSTANCE_OPTION_LIST[0].value as keyof InstanceIdField]
        .toString()
        .includes(keyword);
    } else if (filterType === INSTANCE_OPTION_LIST[1].value) {
      return instance[INSTANCE_OPTION_LIST[1].value as keyof InstanceNameField]
        .toLowerCase()
        .includes(keyword.toLowerCase());
    } else if (filterType === INSTANCE_OPTION_LIST[2].value) {
      return instance[
        INSTANCE_OPTION_LIST[2].value as keyof InstanceDescriptionField
      ]
        .toLowerCase()
        .includes(keyword.toLowerCase());
    } else if (filterType === INSTANCE_OPTION_LIST[3].value) {
      return instance[
        INSTANCE_OPTION_LIST[3].value as keyof InstanceCreatedAtField
      ].includes(keyword);
    }
    return true;
  });
};

/**
 * @description 시뮬레이션/인스턴스 목록 조회 데이터 중 생성일 가공
 * '2024-11-18 09:41:31.405853' -> '2024-11-18'
 */
const processCreatedAt = (date: string): string => {
  const formattedDate = new Date(date.toString());
  return formattedDate.toISOString().split("T")[0];
};
export const formatCreatedAt = <T>(data: T[], createdAtKey: keyof T): T[] => {
  return data.map((item) => ({
    ...item,
    [createdAtKey]: processCreatedAt(item[createdAtKey] as string),
  }));
};
