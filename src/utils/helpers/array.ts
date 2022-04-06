/**
 * 특정 길이 배열 반환
 * @param num 배열 길이
 * @param defaultValue 배열 초기값
 */
export const ArrayByNumber = <T>(num: number, defaultValue: T | null = null): Array<T> => {
  return new Array(num).fill(defaultValue);
};
