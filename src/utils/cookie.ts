/**
 * 쿠키 설정하기
 * @param key 쿠키 Key
 * @param value 쿠키 Value
 * @param expiredDays 만료 날짜일 (현재 기준)
 */
export const setCookie = (key: string, value: string, expiredDays: number = 7) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredDays);
  const cookieValue =
    encodeURI(value) +
    (expiredDays === null ? '' : `; expires=${exdate.toUTCString()}`) +
    '; path=/';

  document.cookie = `${key}=${cookieValue}`;
};

/**
 * 쿠키 삭제하기
 * - Client
 * @param key 쿠키 Key
 */
export const removeCookie = (key: string) => {
  const cookieValue = `${key}=''; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  document.cookie = cookieValue;
};

/**
 * 쿠키 가져오기
 * - Client
 * @param key 쿠키 Key
 */
export const getCookieFromClient = (key: string): string => {
  let cookieList = document.cookie.split(';');

  for (let i = 0; i < cookieList.length; i++) {
    let x = cookieList[i].substring(0, cookieList[i].indexOf('='));
    let y = cookieList[i].substring(cookieList[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, '');
    if (x === key) {
      return decodeURI(y);
    }
  }

  return '';
};

/**
 * 쿠키 가져오기
 * - Server
 * @param key 쿠키 Key
 * @param ctx
 */
export const getCookieFromServer = (key: string, ctx: any): string => {
  const cookieSet = ctx.req.cookies;
  const value = cookieSet[key] ? cookieSet[key] : '';

  return value;
};
