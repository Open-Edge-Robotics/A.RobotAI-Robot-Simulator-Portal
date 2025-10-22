export const isArraysEqualUnique = <T>(arr1: T[], arr2: T[]): boolean => {
  // 1. 길이가 다르면 바로 false 리턴
  if (arr1.length !== arr2.length) return false;

  // 2. 각 배열에서 중복 제거
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // 3. 고유 요소 개수가 다르면 false
  if (set1.size !== set2.size) return false;

  // 4. set1의 모든 요소가 set2에 있는지 확인
  for (const item of set1) {
    if (!set2.has(item)) return false;
  }

  return true;
};
