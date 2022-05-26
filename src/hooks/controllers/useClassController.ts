import { useQuery, useMutation } from 'react-query';
// api
import * as classAPIs from 'api/class';
// types
import * as types from 'types/api/class';

/**
 * 분반 생성
 */
export const CreateClass = (config?: object) => {
  const result = useMutation(['createClassAPI'], classAPIs.createClassAPI, config);

  return result;
};

/**
 * 분반 반환
 * @param classId 분반 ID
 */
export const GetClass = (classId: number) => {
  const result = useQuery(['getClassAPI', classId], () =>
    classAPIs.getClassAPI<types.GetClassResponse>({ classId }),
  );

  return result;
};

/**
 * 분반 리스트 반환
 */
export const GetClassList = () => {
  const result = useQuery(['getClassAPI'], () =>
    classAPIs.getClassAPI<types.GetClassListResponse>({ classId: undefined }),
  );

  return result;
};

/**
 * 분반 수정
 */
export const UpdateClass = () => {
  const result = useMutation(['updateClassAPI'], classAPIs.updateClassAPI);

  return result;
};

/**
 * 분반 제거
 */
export const DeleteClass = () => {
  const result = useMutation(['deleteClassAPI'], classAPIs.deleteClassAPI);

  return result;
};

/**
 * 분반 사용자 목록 반환
 * - 조교와 학생
 */
export const GetClassMemeberList = (classId: number) => {
  const result = useQuery(['getClassMemberListAPI', classId], () =>
    classAPIs.getClassMemberListAPI({ classId }),
  );

  return result;
};

/**
 * 사용자 검색
 */
export const GetUserList = () => {
  const result = useMutation(['getUserListAPI'], classAPIs.getUserListAPI);

  return result;
};

/**
 * 분반에 사용자 추가
 */
export const AddClassMemeber = (config?: object) => {
  const result = useMutation(['addClassMemeberAPI'], classAPIs.addClassMemeberAPI, config);

  return result;
};

/**
 * 분반에 사용자 제거
 */
export const DeletedClassMemeber = (config?: object) => {
  const result = useMutation(['deleteClassMemeberAPI'], classAPIs.deleteClassMemeberAPI, config);

  return result;
};
