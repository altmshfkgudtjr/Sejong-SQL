/**
 * 랜덤 문자열 생성 함수
 * - 기본값:  8자리
 *
 * @param length 문자열 길이
 * @returns 랜덤 문자열
 */
export const initRandomChar = (length: number = 8): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
