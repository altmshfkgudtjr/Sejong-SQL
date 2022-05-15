import { useQuery, useMutation } from 'react-query';
// api
import * as userAPIs from 'api/user';

/**
 * 회원가입
 */
export const SignUp = () => {
  const result = useMutation(['signInAPI'], userAPIs.signUpAPI);

  return result;
};

/**
 * 로그인
 */
export const SignIn = () => {
  const result = useMutation(['signInAPI'], userAPIs.signInAPI);

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
