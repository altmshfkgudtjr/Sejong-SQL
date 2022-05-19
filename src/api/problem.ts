import request from 'api';
// types
import type * as problemTypes from 'types/api/problem';

/**
 * 평가 기준 정보 반환 API
 * @version 1
 */
export const getWarningListAPI = () => {
  return request.get<problemTypes.GetWarningListResponse>(`/api/v1/warnings`);
};

/**
 * 현재 내 진행 중인 문제 목록 반환 API
 * @version 1
 */
export const getMyProblemListAPI = () => {
  return request.get<problemTypes.GetMyProblemListResponse>(`/api/v1/users/me/problems`);
};

/**
 * 문제 목록 반환 API
 * @version 1
 */
export const getProblemListAPI = ({ weekId }: problemTypes.GetProblemListProps) => {
  return request.get<problemTypes.GetProblemListResponse>(`/api/v1/pgroups/${weekId}/problems`);
};

/**
 * 문제 반환 API
 * @version 1
 */
export const getProblemAPI = ({ problemId }: problemTypes.GetProblemProps) => {
  return request.get<problemTypes.GetProblemResponse>(`/api/v1/problems/${problemId}`);
};

/**
 * 문제 생성 API
 * @version 1
 */
export const createProblemAPI = ({ classId, weekId, data }: problemTypes.CreateProblemProps) => {
  return request.post<problemTypes.CreateProblemResponse>(
    `/api/v1/class/${classId}/pgroups/${weekId}/problems`,
    data,
  );
};

/**
 * 문제 수정 API
 * @version 1
 */
export const editProblemAPI = ({ classId, problemId, data }: problemTypes.EditProblemProps) => {
  return request.put(`/api/v1/class/${classId}/problems/${problemId}`, data);
};

/**
 * 문제 삭제 API
 * @version 1
 */
export const removeProblemAPI = ({ classId, problemId }: problemTypes.RemoveProblemProps) => {
  return request.delete<problemTypes.RemoveProblemResponse>(
    `/api/v1/class/${classId}/problems/${problemId}`,
  );
};

/**
 * 문제 실행 API
 * @version 1
 */
export const runProblemAPI = ({ classId, problemId, data }: problemTypes.RunProblemProps) => {
  return request.post<problemTypes.RunProblemResponse>(`/api/v1/problems/${problemId}/run`, data);
};

/**
 * 문제 제출 API
 * @version 1
 */
export const submitProblemAPI = ({ classId, problemId, data }: problemTypes.SubmitProblemProps) => {
  return request.post<problemTypes.SubmitProblemResponse>(
    `/api/v1/problems/${problemId}/submit`,
    data,
  );
};
