import { useQuery, useMutation } from 'react-query';
// api
import * as weekAPIs from 'api/week';

/**
 * 주차 목록 반환
 * @param classId 분반 ID
 */
export const GetWeekList = (classId: number) => {
  const result = useQuery(['getWeekListAPI', classId], () => weekAPIs.getWeekListAPI({ classId }));

  return result;
};

/**
 * 주차 반환
 * @param weekId 주차 ID
 */
export const GetWeek = (weekId: number) => {
  const result = useQuery(['getWeekAPI', weekId], () => weekAPIs.getWeekAPI({ weekId }));

  return result;
};

/**
 * 주차 생성
 */
export const CreateWeek = (config?: object) => {
  const result = useMutation(['createWeekAPI'], weekAPIs.createWeekAPI, config);

  return result;
};

/**
 * 주차 수정
 */
export const UpdateWeek = () => {
  const result = useMutation(['updateWeekAPI'], weekAPIs.updateWeekAPI);

  return result;
};

/**
 * 주차 제거
 */
export const RemoveWeek = () => {
  const result = useMutation(['removeWeekAPI'], weekAPIs.removeWeekAPI);

  return result;
};
