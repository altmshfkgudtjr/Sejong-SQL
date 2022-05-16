import { useQuery, useMutation } from 'react-query';
// api
import * as userAPIs from 'api/user';
// utils
import * as storageUtils from 'utils/storage';

/**
 * 회원가입
 */
export const SignUp = () => {
  const result = useMutation(['signInAPI'], userAPIs.signUpAPI);

  return result;
};

/**
 * 로그인
 * @param isPersist 로그인 상태 유지 여부
 */
export const SignIn = (isPersist: boolean) => {
  const result = useMutation(['signInAPI'], userAPIs.signInAPI);

  storageUtils.removeSessionStorage('ssql-accessToken');
  storageUtils.removeSessionStorage('ssql-refreshToken');
  storageUtils.removeLocalStorage('ssql-accessToken');
  storageUtils.removeLocalStorage('ssql-refreshToken');

  if (isPersist && !!result.data) {
    storageUtils.saveLocalStorage('ssql-accessToken', result.data.result?.access_token);
    storageUtils.saveLocalStorage('ssql-refreshToken', result.data.result?.refresh_token);
  } else if (!isPersist && !!result.data) {
    storageUtils.saveSessionStorage('ssql-accessToken', result.data.result?.access_token);
    storageUtils.saveSessionStorage('ssql-refreshToken', result.data.result?.refresh_token);
  }

  return result;
};

/**
 * 세종대학교 구성원 인증
 */
export const AuthorizationSejongUniv = () => {
  const result = useMutation(['authroizatonSejongUnivAPI'], userAPIs.authroizatonSejongUnivAPI);

  return result;
};

/**
 * 내 정보 반환
 */
export const GetProfile = () => {
  const result = useQuery(['getProfileAPI'], userAPIs.getProfileAPI);

  return result;
};

/**
 * 내 정보 수정
 */
export const UpdateProfile = () => {
  const result = useMutation(['updateProfileAPI'], userAPIs.updateProfileAPI);

  return result;
};

/**
 * 회원탈퇴
 */
export const Succession = () => {
  const result = useMutation(['successionAPI'], userAPIs.successionAPI);

  return result;
};
