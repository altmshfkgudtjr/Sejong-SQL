import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import { DashboardLayout } from 'sjds/layouts';
import Layout from 'components/layouts';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import SearchInput from 'components/presenters/dashboard/manage/SearchInput';
import MemberManageButton from 'components/presenters/dashboard/manage/MemberManagerButton';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import Sidebar from 'components/containers/Sidebar';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useDebounce from 'hooks/event/useDebounce';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useClassController from 'hooks/controllers/useClassController';
// utils
import { koreanTimeFormatter } from 'utils/helpers/date';
// styles
import { typo } from 'sjds';
// types
import type { ChangeEvent } from 'react';

/** 분반 학생 관리 페이지 */
const ClassMemberManagePage = () => {
  const router = useRouter();
  const classId = parseInt(router.query.classId as string, 10);
  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();

  const [assistantList, setAssistantList] = useState<Member[]>([]);
  const [studentList, setStudentList] = useState<Member[]>([]);

  const { data: memberData, refetch } = useClassController.GetClassMemeberList(classId);
  const { mutate: searchMutate, data: searchData } = useClassController.GetUserList();
  const { mutate: addMutate } = useClassController.AddClassMemeber({ onSuccess: refetch });
  const { mutate: deleteMutate } = useClassController.DeletedClassMemeber({ onSuccess: refetch });

  const onSearchUser = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    searchMutate({ classId, sejongId: e.target.value });
  }, 200);

  const onAddAssistant = (user: User) => {
    addMutate({
      classId,
      userId: user.id,
      data: { type: 'ta' },
    });

    initSnackbar({
      title: '추가 완료',
      message: `${user.name}님이 조교로 추가되었습니다.`,
      type: 'Success',
    });
  };

  const onAddStudent = (user: User) => {
    addMutate({
      classId,
      userId: user.id,
      data: { type: 'st' },
    });

    initSnackbar({
      title: '추가 완료',
      message: `${user.name}님이 학생으로 추가되었습니다.`,
      type: 'Success',
    });
  };

  const onRemoveMember = (member: Member) => {
    deleteMutate({
      classId,
      userId: member.id,
    });

    initSnackbar({
      title: '제거 완료',
      message: `${member.name}님이 수업에서 제거되었습니다.`,
      type: 'Success',
    });
  };

  useEffect(() => {
    if (!memberData?.result) {
      return;
    }

    const assistantList_ = memberData.result.filter(user => user.type === 'ta');
    const studentList_ = memberData.result.filter(user => user.type === 'st');
    setAssistantList(assistantList_);
    setStudentList(studentList_);
  }, [memberData]);

  useEffect(() => searchMutate({ classId, sejongId: '' }), []);

  return (
    <>
      <MetaTitle content="분반 학생 관리" />

      <Wrapper>
        <Breadcrumb />

        <TopMessageWrapper>
          <TopMessage message="학생 및 조교를 배정할 수 있습니다." />
        </TopMessageWrapper>

        <Section>
          <Title>조교 관리</Title>
          <SearchInput placeholder="이름으로 검색해주세요." onInput={onSearchUser}>
            {searchData?.result
              ?.filter(
                user =>
                  !assistantList.map(v => v.id).includes(user.id) &&
                  !memberData?.result?.map(v => v.id).includes(user.id),
              )
              .map(user => (
                <MemberManageButton
                  key={user.id}
                  labelList={[user.sejong_id, user.name, user.major]}
                  onClick={() => onAddAssistant(user)}
                />
              ))}
          </SearchInput>
          {assistantList.length > 0 && (
            <MemeberListWrapper>
              <MemeberListHead>
                <span>학번</span>
                <span>이름</span>
                <span>날짜</span>
              </MemeberListHead>
              {assistantList.map(user => (
                <MemberManageButton
                  key={user.id}
                  isExist
                  labelList={[user.sejong_id, user.name, koreanTimeFormatter(user.created_at)]}
                  onClick={() => onRemoveMember(user)}
                />
              ))}
            </MemeberListWrapper>
          )}
        </Section>

        <Section>
          <Title>학생 관리</Title>
          <SearchInput placeholder="이름으로 검색해주세요." onInput={onSearchUser}>
            {searchData?.result
              ?.filter(
                user =>
                  !assistantList.map(v => v.id).includes(user.id) &&
                  !memberData?.result?.map(v => v.id).includes(user.id),
              )
              .map(user => (
                <MemberManageButton
                  key={user.id}
                  labelList={[user.sejong_id, user.name, user.major]}
                  onClick={() => onAddStudent(user)}
                />
              ))}
          </SearchInput>
          {studentList.length > 0 && (
            <MemeberListWrapper>
              <MemeberListHead>
                <span>학번</span>
                <span>이름</span>
                <span>날짜</span>
              </MemeberListHead>
              {studentList.map(user => (
                <MemberManageButton
                  key={user.id}
                  isExist
                  labelList={[user.sejong_id, user.name, koreanTimeFormatter(user.created_at)]}
                  onClick={() => onRemoveMember(user)}
                />
              ))}
            </MemeberListWrapper>
          )}
        </Section>
      </Wrapper>
    </>
  );
};

ClassMemberManagePage.getLayout = page => {
  return (
    <Layout isSide>
      <Sidebar />
      {page}
    </Layout>
  );
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
`;

const TopMessageWrapper = styled.div`
  margin-bottom: 16px;
`;

const Section = styled.section`
  margin-bottom: 96px;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f1};
`;

const MemeberListWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 16px 16px 0;
`;

const MemeberListHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    width: 100px;
    ${typo.subtitle2};
    color: ${({ theme }) => theme.text.f4};
  }
`;

type User = {
  /** 아이디 */
  id: string;
  /** 학번 */
  sejong_id: string;
  /** 이름 */
  name: string;
  /** 해당 분반에 이미 속한 상태인지 아닌지 여부 */
  exists: boolean;
  /** 학과 */
  major: string;
};

type Member = {
  /** 사용자 ID */
  id: string;
  /** 학번 */
  sejong_id: string;
  /** 이름 */
  name: string;
  /** 권한 (조교 또는 학생) */
  type: string;
  /** 특정 분반에 추가된 날짜 */
  created_at: string;
  /** 학과 */
  major: string;
};

export default ClassMemberManagePage;
