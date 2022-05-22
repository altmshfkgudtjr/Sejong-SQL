import styled, { useTheme } from 'styled-components';
import { useState, useRef } from 'react';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import { FillButton } from 'sjds/components/buttons';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import TextInput from 'components/atoms/inputs/Text';
import CheckBox from 'components/atoms/inputs/Checkbox';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useClassController from 'hooks/controllers/useClassController';
// styles
import { typo } from 'sjds';

/** 분반 생성 페이지 */
const ClassCreatePage = () => {
  const currentTheme = useTheme();

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const semester = useRef<HTMLInputElement>(null);
  const professor = useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useState(true);

  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();

  const { mutate, status } = useClassController.CreateClass();

  const isEmpty = (target: HTMLInputElement, message: string) => {
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
  };

  const onChangeCheckBox = () => setIsChecked(v => !v);

  const onSubmit = () => {
    const nameTarget = name.current;
    const descriptionTarget = description.current;
    const semesterTarget = semester.current;
    const professorTarget = professor.current;

    if (!nameTarget || !descriptionTarget || !semesterTarget || !professorTarget) {
      return;
    }

    if (
      isEmpty(nameTarget, '클래스명을 입력해주세요') ||
      isEmpty(semesterTarget, '개설학기를 입력해주세요') ||
      isEmpty(professorTarget, '담당교수를 입력해주세요')
    ) {
      return;
    }

    mutate({
      data: {
        name: nameTarget.value,
        comment: descriptionTarget.value
          ? descriptionTarget.value
          : `교수님의 ${nameTarget.value} 수업입니다.`,
        semester: semesterTarget.value,
        prof_id: professorTarget.value,
        activate: isChecked,
      },
    });
  };

  return (
    <>
      <MetaTitle content="수업 생성" />

      <Wrapper>
        <Breadcrumb />

        <TopMessageWrapper>
          <TopMessage message="수업에 대한 정보를 입력해주세요" />
        </TopMessageWrapper>

        <section>
          <Title>수업명</Title>
          <TextInput placeholder="새로운 수업" ref={name} />
        </section>

        <section>
          <Title>수업 설명</Title>
          <TextInput placeholder="새로운 수업 설명 (선택사항)" ref={description} />
        </section>

        <section>
          <Title>개설학기</Title>
          <TextInput placeholder="2022년 1학기" ref={semester} />
        </section>

        <section>
          <Title>담당 교수</Title>
          <TextInput placeholder="홍길동" ref={professor} />
        </section>

        <section>
          <Title>분반 활성화</Title>
          <CheckBox
            label="class-activate"
            message=""
            checked={isChecked}
            onChange={onChangeCheckBox}
          />
        </section>

        <SubmitButton onClick={onSubmit} size="Regular" color={currentTheme.primary}>
          생성하기
        </SubmitButton>
      </Wrapper>
    </>
  );
};

ClassCreatePage.getLayout = page => {
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
`;

const SubmitButton = styled(FillButton)`
  flex: 0;
  width: 164px;
  margin-top: 48px;
`;

export default ClassCreatePage;
