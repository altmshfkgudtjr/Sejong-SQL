import request from 'api';
// types
import type * as types from 'types/api/problem';

/**
 * 평가 기준 정보 반환 API
 * @version 1
 */
export const getWarningListAPI = () => {
  return request.get<types.GetWarningListResponse>(`/api/v1/warnings`);
};

/**
 * 현재 내 진행 중인 문제 목록 반환 API
 * @version 1
 */
export const getMyProblemListAPI = () => {
  return request.get<types.GetMyProblemListResponse>(`/api/v1/users/me/problems`);
};

/**
 * 문제 목록 반환 API
 * @version 1
 */
export const getProblemListAPI = ({ weekId }: types.GetProblemListProps) => {
  return request.get<types.GetProblemListResponse>(`/api/v1/pgroups/${weekId}/problems`);
};

/**
 * 문제 반환 API
 * @version 1
 */
export const getProblemAPI = ({ problemId }: types.GetProblemProps) => {
  return request.get<types.GetProblemResponse>(`/api/v1/problems/${problemId}`);
};

/**
 * 문제 생성 API
 * @version 1
 */
export const createProblemAPI = ({ classId, weekId, data }: types.CreateProblemProps) => {
  return request.post<types.CreateProblemResponse>(
    `/api/v1/class/${classId}/pgroups/${weekId}/problems`,
    data,
  );
};

/**
 * 문제 수정 API
 * @version 1
 */
export const editProblemAPI = ({ classId, problemId, data }: types.EditProblemProps) => {
  return request.put(`/api/v1/class/${classId}/problems/${problemId}`, data);
};

/**
 * 문제 삭제 API
 * @version 1
 */
export const removeProblemAPI = ({ classId, problemId }: types.RemoveProblemProps) => {
  return request.delete<types.RemoveProblemResponse>(
    `/api/v1/class/${classId}/problems/${problemId}`,
  );
};

/**
 * 문제 실행 API
 * @version 1
 */
export const runProblemAPI = ({ problemId, data }: types.RunProblemProps) => {
  return request.post<types.RunProblemResponse>(`/api/v1/problems/${problemId}/run`, data);
};

/**
 * 문제 제출 API
 * @version 1
 */
export const submitProblemAPI = ({ problemId, data }: types.SubmitProblemProps) => {
  return request.post<types.SubmitProblemResponse>(`/api/v1/problems/${problemId}/submit`, data);
};
