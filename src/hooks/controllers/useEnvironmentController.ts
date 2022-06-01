import { useQuery, useMutation } from 'react-query';
// api
import * as environmentAPIs from 'api/environment';

/**
 * 분반 소속 Env 리스트 반환
 */
export const GetClassEnvList = (classId: number) => {
  const result = useQuery(['getClassEnvListAPI', classId], () =>
    environmentAPIs.getClassEnvListAPI({ classId }),
  );

  return result;
};

/**
 * 내 Env 리스트 반환
 */
export const GetMyEnvList = () => {
  const result = useQuery(['getMyEnvListAPI'], () => environmentAPIs.getMyEnvListAPI());

  return result;
};

/**
 * Env 생성
 */
export const CreateEnv = () => {
  const result = useMutation(['createEnvAPI'], environmentAPIs.createEnvAPI);

  return result;
};

/**
 * 내 Env 제거
 */
export const DeleteEnv = () => {
  const result = useMutation(['deleteEnvAPI'], environmentAPIs.deleteEnvAPI);

  return result;
};

/**
 * 클래스에 Env 연결
 */
export const ConnectEnvToClass = () => {
  const result = useMutation(['connectEnvToClassAPI'], environmentAPIs.connectEnvToClassAPI);

  return result;
};

/**
 * 클래스에 Env 연결 해제
 */
export const UnconnectEnvToClassClass = () => {
  const result = useMutation(['unconnectEnvToClassAPI'], environmentAPIs.unconnectEnvToClassAPI);

  return result;
};
