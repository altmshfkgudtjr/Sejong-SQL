import request from 'api';

/**
 * 평가기준 정보 반환 API
 * @version 1
 */
export const getWarningListAPI = () => {
  return request.get(`/api/v1/warnings`);
};

// SERVER API 제작 진행 중
/**
 * 현재 내 진행 중인 문제 목록 반환 API
 * @version 1
 */
export const getMyProblemListAPI = () => {
  return request.get(`/api/v1/users/me/problems`);
};

// SERVER API 제작 진행 중
/**
 * 문제 목록 반환 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} weekId 주차 ID
 */
export const getProblemListAPI = (classId, weekId) => {
  return request.get(`/api/v1/class/${classId}/pgroups/${weekId}/problems`);
};

// SERVER API 제작 진행 중
/**
 * 문제 반환 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} problemId 주차 ID
 */
export const getProblemAPI = (classId, problemId) => {
  return request.get(`/api/v1/class/${classId}/problems/${problemId}`);
};

// SERVER API 제작 진행 중
/**
 * 문제 생성 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} weekId 주차 ID
 * @param {object} data
 * @param {string} data.env_id ENV ID
 * @param {string} data.title 문제 이름
 * @param {string} data.content 문제 내용
 * @param {string} data.answer 정답
 * @param {number =} data.timelimit 제한시간 (기본값 10초)
 * @param {number[]} data.warnings 평가기준 ID 리스트
 */
export const createProblemAPI = (classId, weekId, data) => {
  return request.post(`/api/v1/class/${classId}/pgroups/${weekId}/problems`, data);
};

// SERVER API 제작 진행 중
/**
 * 문제 수정 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} problemId 문제 ID
 * @param {object} data
 * @param {string} data.env_id ENV ID
 * @param {string} data.title 문제 이름
 * @param {string} data.content 문제 내용
 * @param {string} data.answer 정답
 * @param {number =} data.timelimit 제한시간 (기본값 10초)
 * @param {number[]} data.warnings 평가기준 ID 리스트
 */
export const editProblemAPI = (classId, problemId, data) => {
  return request.put(`/api/v1/class/${classId}/problems/${problemId}`, data);
};

// SERVER API 제작 진행 중
/**
 * 문제 삭제 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} problemId 문제 ID
 */
export const removeProblemAPI = (classId, problemId) => {
  return request.delete(`/api/v1/class/${classId}/problems/${problemId}`);
};

// SERVER API 제작 진행 중
/**
 * 문제 실행 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} problemId 문제 ID
 * @param {object} data
 * @param {string} data.query 실행시킬 쿼리
 */
export const runProblemAPI = (classId, problemId, data) => {
  return request.post(`/api/v1/class/${classId}/problems/${problemId}/run`, data);
};

// SERVER API 제작 진행 중
/**
 * 문제 제출 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 * @param {number} problemId 문제 ID
 * @param {object} data
 * @param {string} data.query 실행시킬 쿼리
 */
export const submitProblemAPI = (classId, problemId, data) => {
  return request.post(`/api/v1/class/${classId}/problems/${problemId}/submit`, data);
};
