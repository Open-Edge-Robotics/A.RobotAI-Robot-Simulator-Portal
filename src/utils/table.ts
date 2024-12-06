/**
 * @description 검색어와 필터타입으로 필터링하는 함수
 * @param dataList - 검색어와 필터타입으로 필터할 데이터 배열
 * @param optionList - 필터에 사용되는 옵션 리스트
 * @param keyword - 검색어
 * @param filterType - 필터 타입 (ex 이름 or ID or 설명 등)
 * @returns 검색 결과 배열
 */
export const filterListByKeyword = <T>(
  dataList: T[],
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
