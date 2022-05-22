import { useQuery, useMutation } from 'react-query';
// api
import * as prolbemAPIs from 'api/problem';

/**
 * 특정 문제 반환
 * @param problemId 문제 ID
 */
export const GetProblem = (problemId: number) => {
  const result = useQuery(['getProblemAPI'], () => prolbemAPIs.getProblemAPI({ problemId }));

  return result;
};

/**
 * 특정 문제 실행
 */
export const RunProblem = () => {
  const result = useMutation(['runProblemAPI'], prolbemAPIs.runProblemAPI);

  return result;
};

/**
 * 특정 문제 제출
 */
export const SubmitProblem = () => {
  const result = useMutation(['submitProblemAPI'], prolbemAPIs.submitProblemAPI);

  return result;
};
