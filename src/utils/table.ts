import Instance from "@/components/feature/Instance";
import { Simulation } from "@/components/feature/simulation";

export const filterDataList = (
  dataList: Instance[] | Simulation[],
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

    return value.toLowerCase().includes(keyword.toLowerCase());
  });
};
