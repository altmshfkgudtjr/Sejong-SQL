import { useQuery, useMutation } from 'react-query';
// api
import * as weekAPIs from 'api/week';

/**
 * 주차 목록 반환
 * @param classId 문제 ID
 */
export const GetWeekist = (classId: number) => {
  const result = useQuery(['getWeekListAPI'], () => weekAPIs.getWeekListAPI({ classId }));

  return result;
};

/**
 * 주차 생성
 */
export const CreateWeek = () => {
  const result = useMutation(['createWeekAPI'], weekAPIs.createWeekAPI);

  return result;
};

/**
 * 주차 수정
 */
export const UpdateWeek = () => {
  const result = useMutation(['updateWeekAPI'], weekAPIs.updateWeekAPI);

  return result;
};
