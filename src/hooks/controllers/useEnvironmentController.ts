import { useQuery, useMutation } from 'react-query';
// api
import * as environmentAPIs from 'api/environment';

/**
 * 분반 소속 Env 리스트 반환
 * @param classId 분반 ID
 * @param config
 */
export const GetClassEnvList = (classId: number, config = {}) => {
  const result = useQuery(
    ['getClassEnvListAPI', classId],
    () => environmentAPIs.getClassEnvListAPI({ classId }),
    config,
  );

  return result;
};

/**
 * 내 Env 리스트 반환
 * @param config
 */
export const GetMyEnvList = (config = {}) => {
  const result = useQuery(['getMyEnvListAPI'], () => environmentAPIs.getMyEnvListAPI(), config);

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
