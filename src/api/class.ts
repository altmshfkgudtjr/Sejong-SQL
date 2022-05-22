import request from 'api';
// types
import * as types from 'types/api/class';

/**
 * 분반 생성 API
 * @version 1
 */
export const createClassAPI = ({ data }: types.CreateClassProps) => {
  return request.post<types.CreateClassResponse>(`/api/v1/class`, data);
};

/**
 * 분반 반환 API
 * - 분반 ID가 없을 시, 본인이 속한 분반 전체 반환
 * @version 1
 */
export const getClassAPI = ({ classId }: types.GetClassProps) => {
  return request.get<types.GetClassResponse>(`/api/v1/class${classId ? `/${classId}` : ''}`);
};

/**
 * 분반 수정 API
 * @version 1
 */
export const updateClassAPI = ({ classId, data }: types.UpdateClassProps) => {
  return request.put(`/api/v1/class/${classId}`, data);
};

/**
 * 분반 제거 API
 * @version 1
 */
export const deleteClassAPI = ({ classId }: types.DeleteClassProps) => {
  return request.delete(`/api/v1/class/${classId}`);
};

/**
 * 분반 사용자 목록 반환 API
 * - 조교와 학생을 반환
 * @version 1
 */
export const getClassMemberListAPI = ({ classId }: types.GetClassMemeberProps) => {
  return request.get<types.GetClassMemeberResponse>(`/api/v1/class/${classId}/users`);
};

/**
 * 사용자 검색 API
 * @version 1
 */
export const getUserListAPI = ({ classId, userId }: types.GetUserListProps) => {
  return request.get<types.GetUserListResponse>(`/api/v1/class/${classId}/user/${userId}`);
};

/**
 * 분반에 사용자 추가 API
 * @version 1
 */
export const addClassMemeberAPI = ({ classId, userId, data }: types.AddClassMemeberProps) => {
  return request.post(`/api/v1/class/${classId}/users/${userId}`, data);
};

/**
 * 분반에 사용자 제거 API
 * @version 1
 */
export const deleteClassMemeberAPI = ({ classId, userId }: types.DeleteClassMemeberProps) => {
  return request.delete(`/api/v1/class/${classId}/users/${userId}`);
};
