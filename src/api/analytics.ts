import request from 'api';
// types
import type * as types from 'types/api/analytics';

/**
 * 통계 반환 API
 * @version 1
 *
 * @param classId 분반 ID
 * @param params
 * @param params.weekId 주차
 * @param params.sejongId 사용자 학번
 */
export const getClassAnalyticsAPI = (props: types.GetClassAnalyticsProps) => {
  return request.get<types.GetClassAnalyticsResponse>(`/api/v1/class/${props.classId}/status`, {
    params: {
      pgroup_id: props.params.weekId,
      sejong_id: props.params.sejongId,
    },
  });
};

/**
 * 특정 사용자가 푼 문제 반환 API
 * @version 1
 */
export const getUserSubmissionAPI = (props: types.GetUserSubmissionProps) => {
  return request.get<types.GetUserSubmissionResponse>(`/api/v1/problems/${props.uspId}/me`);
};
