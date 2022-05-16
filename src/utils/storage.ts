/**
 * LocalStorage에 저장
 */
export const saveLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const _value = JSON.stringify(value);
  window.localStorage.setItem(key, _value);
};

/**
 * LocalStorage에 제거
 */
export const removeLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
  return null;
};

/**
 * LocalStorage에서 정보 반환
 */
export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(key);
  if (!value) {
    return null;
  }

  const value_ = JSON.parse(value);
  return value_;
};

/**
 * SessionStorage 저장
 */
export const saveSessionStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const _value = JSON.stringify(value);
  window.sessionStorage.setItem(key, _value);
  return key;
};

/**
 * SessionStorage에 제거
 */
export const removeSessionStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(key);
  }

  return null;
};

/**
 * SessionStorage에서 정보 반환
 */
export const getSessionStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.sessionStorage.getItem(key);
  if (!value) {
    return null;
  }

  const value_ = JSON.parse(value);
  return value_;
};
