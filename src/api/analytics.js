import request from 'api';

/**
 * 주차 통계 반환 API
 * @version 1
 *
 * @param {number} weekId 주차 ID
 */
export const getWeekStatusAPI = weekId => {
  return request.get(`/api/v1/status/pgroups/${weekId}`);
};

/**
 * 문제 통계 반환 API
 * @version 1
 *
 * @param {number} problemId 문제 ID
 */
export const getProblemStatusAPI = problemId => {
  return request.get(`/api/v1/status/problems/${problemId}`);
};

/**
 * 특정 사용자가 푼 문제 반환 API
 * @version 1
 *
 * @param {number} problemId 문제 ID
 */
export const getUserSubmissionAPI = (problemId, userId) => {
  return request.get(`/api/v1/problems/${problemId}/users/${userId}`);
};
