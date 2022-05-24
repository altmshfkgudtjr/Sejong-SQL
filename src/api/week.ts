import request from 'api';
// types
import * as types from 'types/api/week';

/**
 * 주차 목록 반환 API
 * @version 1
 */
export const getWeekListAPI = ({ classId }: types.GetWeekListProps) => {
  return request.get<types.GetWeekListResponse>(`/api/v1/class/${classId}/pgroups`);
};

/**
 * 주차 생성 API
 * @version 1
 */
export const createWeekAPI = ({ classId, data }: types.CreateWeekProps) => {
  return request.post(`/api/v1/class/${classId}/pgroups`, data);
};

/**
 * 주차 수정 API
 * @version 1
 */
export const updateWeekAPI = ({ classId, weekId, data }: types.UpdateWeekProps) => {
  return request.put(`/api/v1/class/${classId}/pgroups/${weekId}`, data);
};

/**
 * 주차 제거 API
 * @version 1
 */
export const removeWeekAPI = ({ classId, weekId }: types.RemoveWeekProps) => {
  return request.delete(`/api/v1/class/${classId}/pgroups/${weekId}`);
};
