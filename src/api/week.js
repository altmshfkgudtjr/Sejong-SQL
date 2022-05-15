import request from 'api';

/**
// SERVER API 제작 진행 중
 * 주차 목록 반환 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 *
 */
export const getWeekListAPI = classId => {
  return request.get(`/api/v1/class/${classId}/pgroups`);
};

/**
 * 주차 생성 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {object} data
 * @param {string} data.name 주차 이름
 * @param {string} data.comment 주차 설명
 * @param {boolean} data.exam 시험모드 여부
 * @param {boolean} data.activate 활성화 여부
 * @param {string | null} data.activate_start 활성화 시작 시간
 * @param {string | null} data.activate_end 활성화 종료 시간
 *
 */
export const createWeekAPI = (classId, data) => {
  return request.post(`/api/v1/class/${classId}/pgroups`, data);
};

/**
 * 주차 수정 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} weekId 주차 ID
 * @param {object} data
 * @param {string} data.name 주차 이름
 * @param {string} data.comment 주차 설명
 * @param {boolean} data.exam 시험모드 여부
 * @param {boolean} data.activate 활성화 여부
 * @param {string | null} data.activate_start 활성화 시작 시간
 * @param {string | null} data.activate_end 활성화 종료 시간
 *
 */
export const updateWeekAPI = (classId, weekId, data) => {
  return request.put(`/api/v1/class/${classId}/pgroups/${weekId}`, data);
};

/**
 * 주차 제거 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} weekId 주차 ID
 *
 */
export const removeWeekAPI = (classId, weekId) => {
  return request.delete(`/api/v1/class/${classId}/pgroups/${weekId}`);
};
