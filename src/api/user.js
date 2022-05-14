import request from 'api';

// SERVER API 제작 진행 중
/**
 * 회원가입 API
 *
 * @param {object} data
 * @param {string} data.id 계정 아이디
 * @param {string} data.pw 계정 비밀번호
 * @param {string} data.name 사용자 이름
 */
export const signupAPI = data => {
  return request.post(`/api/auth/signup`, data);
};

/**
 * 로그인 API
 *
 * @param {object} data
 * @param {string} data.id 계정 아이디
 * @param {string} data.pw 계정 비밀번호
 */
export const signinAPI = data => {
  return request.post(`/api/auth/signup`, data);
};

/**
 * 세종대학교 구성원 인증 API
 *
 * @param {object} data
 * @param {string} data.sejong_id 세종대학교 포털 아이디
 * @param {string} data.sejong_pw 세종대학교 포털 비밀번호
 */
export const authroizatonSejongUnivAPI = data => {
  return request.post(`/api/auth/signup`, data);
};

// SERVER API 제작 진행 중
/**
 * 내 정보 반환 API
 * @version 1
 */
export const getProfileAPI = () => {
  return request.get(`/api/v1/users/me`);
};

/**
 * 내 정보 수정 API
 * @version 1
 *
 * @param {object} data
 * @param {string} data.old_pw 기존 비밀번호
 * @param {string} data.new_pw 새로운 비밀번호
 * @param {string} data.name 이름
 */
export const updateProfileAPI = data => {
  return request.put(`/api/v1/users/me`, data);
};

// SERVER API 제작 진행 중
/**
 * 회원탈퇴 API
 * @version 1
 *
 * @param {object} data
 * @param {string} data.pw 계정 비밀번호
 */
export const successionAPI = data => {
  return request.delete(`/api/v1/users/me`, data);
};
