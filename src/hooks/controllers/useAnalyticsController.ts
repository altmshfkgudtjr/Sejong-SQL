import { useQuery, useMutation } from 'react-query';
// api
import * as analyticsAPIs from 'api/analytics';
// types
import * as types from 'types/api/analytics';

/**
 * 통계 조회
 */
export const GetClassAnalytics = () => {
  const result = useMutation(['getClassAnalyticsAPI'], analyticsAPIs.getClassAnalyticsAPI);

  return result;
};

/**
 * 사용자 로그 코드 확인
 */
export const GetUserSubmission = (props: types.GetUserSubmissionProps) => {
  const result = useQuery(['getUserSubmissionAPI', props.uspId], () =>
    analyticsAPIs.getUserSubmissionAPI(props),
  );

  return result;
};
