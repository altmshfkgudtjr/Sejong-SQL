import request from 'api';
// types
import type * as types from 'types/api/user';

/**
 * 회원가입 API
 */
export const signUpAPI = ({ data }: types.SignUpProps) => {
  return request.post<types.SignUpResponse>(`/api/auth/signup`, data);
};

/**
 * 로그인 API
 */
export const signInAPI = ({ data }: types.SignInProps) => {
  return request.post<types.SignInResponse>(`/api/auth/signin`, data);
};

/**
 * 세종대학교 구성원 인증 API
 */
export const authroizatonSejongUnivAPI = ({ data }: types.AuthorizationSejongUnivProps) => {
  return request.post<types.AuthorizationSejongUnivResponse>(`/api/auth/sejong`, data);
};

/**
 * Token 갱신 API
 */
export const getTokenAPI = () => {
  return request.post<types.GetTokenResponse>(`/api/auth/token/refresh`);
};

/**
 * 내 정보 반환 API
 * @version 1
 */
export const getProfileAPI = () => {
  return request.get<types.GetProfileResponse>(`/api/v1/users/me`);
};

/**
 * 내 정보 수정 API
 * @version 1
 */
export const updateProfileAPI = ({ data }: types.UpdateProfileProps) => {
  return request.put<types.UpdateProfileResponse>(`/api/v1/users/me`, data);
};

/**
 * 회원탈퇴 API
 * @version 1
 */
export const successionAPI = ({ data }: types.SuccessionProps) => {
  return request.delete<types.SuccessionResponse>(`/api/v1/users/me`, { data });
};
