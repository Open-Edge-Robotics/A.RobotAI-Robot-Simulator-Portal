export const getField = <T extends Record<string, unknown>, K extends string>(
  obj: T,
  field: K,
): K extends keyof T ? T[K] : null => {
  if (field in obj) {
    return obj[field] as K extends keyof T ? T[K] : null;
  }
  return null as K extends keyof T ? T[K] : null;
};
