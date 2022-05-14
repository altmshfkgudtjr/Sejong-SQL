import request from 'api';

/**
 * 분반 생성 API
 * @version 1
 *
 * @param {object} data
 * @param {string} data.name 분반 이름 (수업명)
 * @param {string} data.comment 분반 설명 (수업 설명)
 * @param {string} data.semester 개설학기
 * @param {string} data.prof_id 담당 교수 아이디
 * @param {boolean} data.activate 활성화 여부
 */
export const craeteClassAPI = data => {
  return request.post(`/api/v1/class`, data);
};

// SERVER API 제작 진행 중
/**
 * 분반 반환 API
 * - 분반 ID가 없을 시, 본인이 속한 분반 전체 반환
 * @version 1
 *
 * @param {number =} classId 분반 ID
 */
export const getClassAPI = classId => {
  return request.get(`/ap1/v1/class${classId ? `/${classId}` : ''}`);
};

// SERVER API 제작 진행 중
/**
 * 분반 수정 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {object} data
 * @param {string} data.name 분반 이름 (수업명)
 * @param {string} data.comment 분반 설명 (수업 설명)
 * @param {string} data.semester 개설학기
 * @param {string} data.prof_id 담당 교수 아이디
 * @param {boolean} data.activate 활성화 여부
 */
export const authorizationSejongUnivAPI = (classId, data) => {
  return request.put(`/ap1/v1/class/${classId}`, data);
};

/**
 * 분반 제거 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 */
export const deleteClassAPI = classId => {
  return request.delete(`/ap1/v1/class/${classId}`);
};

/**
 * 분반 사용자 목록 반환 API
 * - 조교와 학생을 반환
 * @version 1
 *
 * @param {number} classId 분반 ID
 */
export const getClassMemberListAPI = classId => {
  return request.get(`/api/v1/class/${classId}/users`);
};

/**
 * 사용자 검색 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {string} studentId 사용자 아이디(학번)
 */
export const getUserListAPI = (classId, studentId) => {
  return request.get(`/api/v1/class/${classId}/user/${studentId}`);
};

/**
 * 분반에 사용자 추가 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {string} userId 사용자 ID
 */
export const addClassMemeberAPI = (classId, userId) => {
  return request.post(`/api/v1/class/${classId}/users/${userId}`);
};
