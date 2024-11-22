import { BaseInstance } from "@/type/_field";
import { SimulationType } from "@/type/response/_simulation";

export const filterDataList = (
  dataList: BaseInstance[] | SimulationType[],
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
