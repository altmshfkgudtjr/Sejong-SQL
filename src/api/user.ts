import request from 'api';
// types
import type * as userTypes from 'types/api/user';

/**
 * 회원가입 API
 */
export const signUpAPI = ({ data }: userTypes.SignUpProps) => {
  return request.post<userTypes.SignUpResponse>(`/api/auth/signup`, data);
};

/**
 * 로그인 API
 */
export const signInAPI = ({ data }: userTypes.SignInProps) => {
  return request.post<userTypes.SignInResponse>(`/api/auth/signin`, data);
};

/**
 * 세종대학교 구성원 인증 API
 */
export const authroizatonSejongUnivAPI = ({ data }: userTypes.AuthorizationSejongUnivProps) => {
  return request.post<userTypes.AuthorizationSejongUnivResponse>(`/api/auth/sejong`, data);
};

/**
 * Token 갱신 API
 */
export const getTokenAPI = () => {
  return request.post<userTypes.GetTokenResponse>(`/api/auth/token/refresh`);
};

/**
 * 내 정보 반환 API
 * @version 1
 */
export const getProfileAPI = () => {
  return request.get<userTypes.GetProfileResponse>(`/api/v1/users/me`);
};

/**
 * 내 정보 수정 API
 * @version 1
 */
export const updateProfileAPI = ({ data }: userTypes.UpdateProfileProps) => {
  return request.put<userTypes.UpdateProfileResponse>(`/api/v1/users/me`, data);
};

/**
 * 회원탈퇴 API
 * @version 1
 */
export const successionAPI = ({ data }: userTypes.SuccessionProps) => {
  return request.delete<userTypes.SuccessionResponse>(`/api/v1/users/me`, { data });
};
