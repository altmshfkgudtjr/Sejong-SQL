import request from 'api';
// types
import * as types from 'types/api/environment';

/**
 * 분반 소속 Env 리스트 반환 API
 * @version 1
 */
export const getClassEnvListAPI = ({ classId }: types.GetClassEnvListProps) => {
  return request.get<types.GetClassEnvListResponse>(`/api/v1/class/${classId}/envs`);
};

/**
 * 내 Env 리스트 반환 API
 * @version 1
 */
export const getMyEnvListAPI = () => {
  return request.get<types.GetMyEnvListResponse>(`/api/v1/users/me/envs`);
};

/**
 * Env 생성 API
 * @version 1
 */
export const createEnvAPI = ({ data }: types.CreateEnvProps) => {
  return request.post(`/api/v1/envs`, data);
};

/**
 * 내 Env 삭제 API
 * @version 1
 */
export const deleteEnvAPI = ({ envId }: types.DeleteEnvProps) => {
  return request.delete(`/api/v1/envs/${envId}`);
};

/**
 * 클래스에 Env 연결 API
 * @version 1
 */
export const connectEnvToClassAPI = ({ envId, classId }: types.ConnectEnvToClassProps) => {
  return request.post(`/api/v1/class/${classId}/envs/${envId}`);
};

/**
 * 클래스에 Env 연결 해제 API
 * @version 1
 */
export const unconnectEnvToClassAPI = ({ envId, classId }: types.UnconnectEnvToClassProps) => {
  return request.delete(`/api/v1/class/${classId}/envs/${envId}`);
};
