import { Option } from "@/components/shared/FilterGroup";

/**
 * @description 배열을 가공하여 Option[] 타입으로 반환
 * @param itemList - 변환할 데이터 배열
 * @param valueKey - 'value'로 변환할 키
 * @param labelKey - 'label'로 변환할 키
 * @returns {value: string, label: string} 형태로 변환된 배열
 */
export const transformResponseToOptionList = <
  T extends { [key: string]: string | number },
>(
  itemList: T[], // T 타입의 배열
  valueKey: keyof T, // T 타입의 key
  labelKey: keyof T, // T 타입의 key
): Option[] => {
  return itemList.map((item) => ({
    value: String(item[valueKey]),
    label: String(item[labelKey]),
  }));
};
