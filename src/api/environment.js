import request from 'api';

/**
 * 분반 소속 Env 리스트 반환 API
 * @version 1
 *
 * @param {number} classId 분반 ID
 */
export const getClassEnvListAPI = classId => {
  return request.get(`/api/v1/class/${classId}/envs`);
};

/**
 * 분반 소속 Env 리스트 반환 API
 * @version 1
 */
export const getMyEnvListAPI = () => {
  return request.get(`/api/v1/users/me/envs`);
};

/**
 * Env 생성 API
 * @version 1
 *
 * @param {object} data
 * @param {number} data.classId 분반 ID
 */
export const createEnvAPI = data => {
  return request.post(`/api/v1/envs`, data);
};

/**
 * Env 제거 API
 * @version 1
 *
 * @param {object} data
 * @param {number} data.classId 분반 ID
 */
export const removeEnvAPI = data => {
  return request.post(`/api/v1/envs`, data);
};

/**
 * 클래스에 Env 연결 API
 * @version 1
 *
 * @param {number} envId Env ID
 * @param {number} classId 분반 ID
 */
export const connectEnvToClassAPI = (envId, classId) => {
  return request.post(`/api/v1/class/${classId}/envs/${envId}`);
};

/**
 * 클래스에 Env 연결 해제 API
 * @version 1
 *
 * @param {number} envId Env ID
 * @param {number} classId 분반 ID
 */
export const unconnectEnvToClassAPI = (envId, classId) => {
  return request.delete(`/api/v1/class/${classId}/envs/${envId}`);
};
