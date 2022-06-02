import request from 'api';
// utils
import * as storageUtils from 'utils/storage';
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
  const localToken = storageUtils.getLocalStorage('ssql-refreshToken');
  const sessionToken = storageUtils.getSessionStorage('ssql-refreshToken');
  const isLocal = !!localToken && !sessionToken;
  const refreshToken = localToken || sessionToken;

  return request
    .get<types.GetTokenResponse>(`/api/auth/token/refresh`, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    .then(res => {
      if (isLocal) {
        storageUtils.saveLocalStorage('ssql-accessToken', res.result?.access_token);
        storageUtils.saveLocalStorage('ssql-refreshToken', res.result?.refresh_token);
      } else {
        storageUtils.saveSessionStorage('ssql-accessToken', res.result?.access_token);
        storageUtils.saveSessionStorage('ssql-refreshToken', res.result?.refresh_token);
      }
    });
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
export const seccessionAPI = ({ data }: types.SeccessionProps) => {
  return request.delete<types.SeccessionResponse>(`/api/v1/users/me`, { data });
};

/**
 * 사용자 검색 API
 * @version 1
 */
export const getProfessorListAPI = ({ name }: types.GetProfessorListProps) => {
  return request.get<types.GetProfessorListResponse>(`/api/v1/users/search`, {
    params: {
      user_name: name,
    },
  });
};
