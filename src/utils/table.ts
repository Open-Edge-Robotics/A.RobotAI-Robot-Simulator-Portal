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
