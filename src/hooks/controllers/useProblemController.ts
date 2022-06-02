import { useQuery, useMutation } from 'react-query';
// api
import * as prolbemAPIs from 'api/problem';

/**
 * 평가 기준 정보 반환
 */
export const GetWarningList = () => {
  const result = useQuery(['getWarningListAPI'], () => prolbemAPIs.getWarningListAPI());

  return result;
};

/**
 * 현재 내 진행 중인 문제 목록 반환
 */
export const GetMyProblemList = () => {
  const result = useQuery(['getMyProblemListAPI'], () => prolbemAPIs.getMyProblemListAPI());

  return result;
};

/**
 * 주차 문제 목록 반환
 * @param weekId 주차 ID
 */
export const GetProblemList = (weekId: number) => {
  const result = useQuery(['getProblemListAPI', weekId], () =>
    prolbemAPIs.getProblemListAPI({ weekId }),
  );

  return result;
};

/**
 * 특정 문제 반환
 * @param problemId 문제 ID
 */
export const GetProblem = (problemId: number) => {
  const result = useQuery(['getProblemAPI', problemId], () =>
    prolbemAPIs.getProblemAPI({ problemId }),
  );

  return result;
};

/**
 * 문제 생성
 */
export const CreateProblem = () => {
  const result = useMutation(['createProblemAPI'], prolbemAPIs.createProblemAPI);

  return result;
};

/**
 * 관리자용 특정 문제 반환
 * @param classId 분반 ID
 * @param problemId 문제 ID
 */
export const GetProblemForAdmin = (classId: number, problemId: number) => {
  const result = useQuery(['getProblemForAdminAPI', problemId], () =>
    prolbemAPIs.getProblemForAdminAPI({ classId, problemId }),
  );

  return result;
};

/**
 * 문제 수정
 */
export const EditProblem = () => {
  const result = useMutation(['editProblemAPI'], prolbemAPIs.editProblemAPI);

  return result;
};

/**
 * 문제 삭제
 */
export const RemoveProblem = () => {
  const result = useMutation(['removeProblemAPI'], prolbemAPIs.removeProblemAPI);

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

/**
 * 가상 데이터베이스에서 문제 실행
 */
export const RunNewProblem = () => {
  const result = useMutation(['runNewProblemAPI'], prolbemAPIs.runNewProblemAPI);

  return result;
};
