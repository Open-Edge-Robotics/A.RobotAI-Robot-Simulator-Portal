// 객체(`obj`)에서 특정 필드(`field`)의 값을 안전하게 가져오는 함수
export const getField = <T extends Record<string, unknown>, K extends string>(
  obj: T,
  field: K,
): K extends keyof T ? T[K] : null => {
  if (field in obj) {
    return obj[field] as K extends keyof T ? T[K] : null;
  }
  return null as K extends keyof T ? T[K] : null;
};
