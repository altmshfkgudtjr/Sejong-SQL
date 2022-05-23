import { useQuery, useMutation } from 'react-query';
// api
import * as classAPIs from 'api/class';

/**
 * 분반 생성
 */
export const CreateClass = () => {
  const result = useMutation(['createClassAPI'], classAPIs.createClassAPI);

  return result;
};

/**
 * 분반 반환 API
 * - 분반 ID가 없을 시, 본인이 속한 분반 전체 반환
 * @param classId 분반 ID
 */
export const GetClass = (classId?: number) => {
  const result = useQuery(['getClassAPI'], () => classAPIs.getClassAPI({ classId }));

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
export const GetClassMemeberList = () => {
  const result = useMutation(['getClassMemberListAPI'], classAPIs.getClassMemberListAPI);

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
export const AddClassMemeber = () => {
  const result = useMutation(['addClassMemeberAPI'], classAPIs.addClassMemeberAPI);

  return result;
};

/**
 * 분반에 사용자 제거
 */
export const DeletedClassMemeber = () => {
  const result = useMutation(['deleteClassMemeberAPI'], classAPIs.deleteClassMemeberAPI);

  return result;
};
