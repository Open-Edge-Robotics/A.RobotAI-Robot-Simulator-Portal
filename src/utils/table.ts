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

/**
 * @description api response에서 원하는 prop만 추출해 배열로 반환
 * @param list - api response 배열 (타입 명시 필요)
 * @param propName - 추출하고 싶은 prop명
 * @returns {array} - 인스턴스 id 배열
 */
export const extractPropsFromList = <T, K extends keyof T>(
  list: T[],
  propName: K,
): T[K][] => {
  const array: T[K][] = [];
  list.map((item) => {
    array.push(item[propName]);
  });
  return array;
};

/**
 * @description 공통 prop 하나를 가지고 있는 api response 타입 데이터 합치기
 * @param originalList - prop 추가 대상이 되는 리스트
 * @param addList - 추가하고 싶은 prop이 있는 리스트
 * @param comparisonProp - 두 리스트에서 공통으로 가지고 있는 prop
 * @param propName - 추가할 prop
 * @returns
 */
export const mergeListData = <T, K>(
  originalList: T[],
  addList: K[],
  comparisonProp: keyof T & keyof K,
  propName: keyof K,
) => {
  return originalList.map((originalItem) => {
    const prop = addList.find(
      (newItem) =>
        (newItem[comparisonProp] as any) ===
        (originalItem[comparisonProp] as any),
    );

    if (prop) return { ...originalItem, [propName]: prop[propName] };

    return originalItem;
  });
};
