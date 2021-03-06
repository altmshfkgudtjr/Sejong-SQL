import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useRef, useCallback, useEffect } from 'react';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import { FillButton } from 'sjds/components/buttons';
import Toggle from 'components/atoms/inputs/Toggle';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import SearchInput from 'components/presenters/dashboard/manage/SearchInput';
import MemberManageButton from 'components/presenters/dashboard/manage/MemberManagerButton';
import TextInput from 'components/atoms/inputs/Text';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import useDebounce from 'hooks/event/useDebounce';
import * as useUserController from 'hooks/controllers/useUserController';
import * as useClassController from 'hooks/controllers/useClassController';
// styles
import { typo } from 'sjds';
// types
import type { ChangeEvent } from 'react';

/** 분반 수정 페이지 */
const ClassEditPage = () => {
  const currentTheme = useTheme();
  const router = useRouter();
  const classId = parseInt(router.query.classId as string, 10);

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const semester = useRef<HTMLInputElement>(null);
  const _ = useRef<HTMLDivElement>(null);

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [isChecked, setIsChecked] = useState(true);

  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();

  const { data: classData } = useClassController.GetClass(classId);
  const { refetch: classRefetch } = useClassController.GetClassList();
  const { mutate: updateMutate, status } = useClassController.UpdateClass();
  const { mutate: searchMutate, data: searchData } = useUserController.GetProfessorList();

  const getCurrentDate = () => {
    const time = new Date();
    return `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`;
  };

  const onEmptyCheck = useCallback(
    (target: HTMLInputElement, message: string) => {
      if (target.value.length === 0) {
        initSnackbar({
          title: 'WARNING',
          message,
          type: 'Warning',
        });
        target.focus();
        return true;
      }
      return false;
    },
    [initSnackbar],
  );

  const onSearchProfessor = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    searchMutate({ name: e.target.value });
  }, 300);

  const onAddProfessor = (prof: Professor) => {
    if (professor) {
      initSnackbar({
        title: 'WARNING',
        message: '이미 선택된 담당 교수가 존재합니다',
        type: 'Warning',
      });
      return;
    }

    setProfessor(prof);
    _.current?.click();
  };

  const onDeleteProfessor = () => {
    setProfessor(null);
  };

  const onChangeCheckBox = () => setIsChecked(v => !v);

  const onSubmit = useCallback(() => {
    const nameTarget = name.current;
    const descriptionTarget = description.current;
    const semesterTarget = semester.current;

    if (!nameTarget || !descriptionTarget || !semesterTarget) {
      return;
    }

    if (
      onEmptyCheck(nameTarget, '클래스명을 입력해주세요') ||
      onEmptyCheck(semesterTarget, '개설학기를 입력해주세요')
    ) {
      return;
    }

    if (!professor) {
      initSnackbar({
        title: 'WARNING',
        message: '담당 교수를 입력해주세요',
        type: 'Warning',
      });
      return;
    }

    updateMutate(
      {
        classId,
        data: {
          name: nameTarget.value,
          comment: descriptionTarget.value
            ? descriptionTarget.value
            : `교수님의 ${nameTarget.value} 수업입니다.`,
          semester: semesterTarget.value,
          prof_id: professor.id,
          activate: isChecked,
        },
      },
      {
        onSuccess: () => classRefetch(),
      },
    );
  }, [initSnackbar, onEmptyCheck, updateMutate, classRefetch, classId, professor, isChecked]);

  useEffect(() => {
    if (!classData?.result) {
      return;
    }

    setProfessor(classData.result.prof);
  }, [classData]);

  useEffect(() => searchMutate({ name: '' }), [searchMutate]);

  return (
    <>
      <MetaTitle content="분반 수정" />

      <Wrapper>
        <Breadcrumb />

        <TopMessageWrapper>
          <TopMessage message="수업에 대한 정보를 수정해주세요" />
        </TopMessageWrapper>

        <section>
          <Title>수업명</Title>
          <TextInput placeholder="새로운 수업" ref={name} defaultValue={classData?.result?.name} />
        </section>

        <section>
          <Title>수업 설명</Title>
          <TextInput
            placeholder="새로운 수업 설명 (선택사항)"
            ref={description}
            defaultValue={classData?.result?.comment}
          />
        </section>

        <section>
          <Title>개설학기</Title>
          <TextInput
            placeholder="2022년 1학기"
            ref={semester}
            defaultValue={classData?.result?.semester}
            readOnly
          />
        </section>

        <section>
          <Title>담당 교수</Title>
          <SearchInput placeholder="이름으로 검색해주세요." onInput={onSearchProfessor}>
            {searchData?.result
              ?.filter(prof => prof.id !== professor?.id)
              .map(prof => (
                <MemberManageButton
                  key={prof.id}
                  labelList={[prof.name, prof.major]}
                  onClick={() => onAddProfessor(prof)}
                />
              ))}
          </SearchInput>
          {professor && (
            <MemeberListWrapper>
              <MemeberListHead>
                <span>학과</span>
                <span>이름</span>
                <span>날짜</span>
              </MemeberListHead>
              <MemberManageButton
                isExist
                labelList={[professor.major, professor.name, getCurrentDate()]}
                onClick={onDeleteProfessor}
              />
            </MemeberListWrapper>
          )}
        </section>

        <section>
          <Title>분반 활성화</Title>
          <Toggle checked={isChecked} onClick={onChangeCheckBox} />
        </section>

        <SubmitButton
          onClick={onSubmit}
          size="Regular"
          color={currentTheme.primary}
          disabled={status === 'loading'}
        >
          수정하기
        </SubmitButton>
      </Wrapper>

      <div ref={_} />
    </>
  );
};

ClassEditPage.getLayout = page => {
  return <Layout isSide>{page}</Layout>;
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;

  & > section {
    margin-bottom: 16px;
  }
`;

const TopMessageWrapper = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f1};
`;

const SubmitButton = styled(FillButton)`
  flex: 0;
  width: 164px;
  margin-top: 48px;
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

/** 교수 데이터 타입 */
type Professor = {
  /** 아이디 */
  id: string;
  /** 학번 */
  sejong_id: null;
  /** 이름 */
  name: string;
  /** 학과 */
  major: string;
};

export default ClassEditPage;
