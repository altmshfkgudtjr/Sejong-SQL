import styled, { useTheme } from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useState, useRef, useCallback } from 'react';
import { format, isBefore } from 'date-fns';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import { FillButton } from 'sjds/components/buttons';
import TextInput from 'components/atoms/inputs/Text';
import Toggle from 'components/atoms/inputs/Toggle';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import DatePicker from 'components/containers/commons/DatePicker';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useClassController from 'hooks/controllers/useClassController';
import * as useWeekController from 'hooks/controllers/useWeekController';
// styles
import { typo } from 'sjds';

/** 주차 생성 페이지 */
const WeekCreatePage = () => {
  const currentTheme = useTheme();
  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();
  const router = useRouter();
  const classId = parseInt(router.query.classId as string, 10);

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const [isCheckedTest, setIsCheckedTest] = useState(false);
  const [isCheckedActive, setIsCheckedActive] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { mutate: createMutate, status } = useWeekController.CreateWeek();
  const { refetch: classRefetch } = useClassController.GetClassList();
  const { refetch: weekRefetch } = useWeekController.GetWeekList(classId);

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

  const onChangeTest = () => {
    setIsCheckedTest(v => !v);
  };
  const onChangeActive = () => {
    setIsCheckedActive(v => !v);
  };

  const onSubmit = useCallback(() => {
    const nameTarget = name.current;
    const descriptionTarget = description.current;

    if (!nameTarget || !descriptionTarget) {
      return;
    }

    if (onEmptyCheck(nameTarget, '클래스명을 입력해주세요')) {
      return;
    }

    if (isBefore(endDate, startDate)) {
      initSnackbar({
        title: 'WARNING',
        message: '주차 시작일 또는 종료일을 확인해주세요',
        type: 'Warning',
      });
      return;
    }

    // 주차 생성하기 API 호출
    createMutate(
      {
        classId,
        data: {
          name: nameTarget.value,
          comment: descriptionTarget.value,
          exam: isCheckedTest,
          activate: isCheckedActive,
          activate_start: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          activate_end: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
        },
      },
      {
        onSuccess: () => {
          classRefetch();
          weekRefetch();
          initSnackbar({
            type: 'Success',
            title: '생성 완료',
            message: '새로운 주차가 생성되었습니다',
          });
          Router.replace(`/dashboard/${classId}`);
        },
      },
    );
  }, [
    onEmptyCheck,
    endDate,
    startDate,
    createMutate,
    classRefetch,
    weekRefetch,
    classId,
    isCheckedTest,
    isCheckedActive,
    initSnackbar,
  ]);

  return (
    <>
      <MetaTitle content="주차 생성" />

      <Wrapper>
        <Breadcrumb />

        <TopMessageWrapper>
          <TopMessage message="주차에 대한 정보를 입력해주세요." />
        </TopMessageWrapper>

        <section>
          <Title>주차명</Title>
          <TextInput placeholder="새로운 주차" ref={name} />
        </section>

        <section>
          <Title>주차 설명</Title>
          <TextInput placeholder="새로운 주차 설명 (선택사항)" ref={description} />
        </section>

        <section>
          <Title>시험모드</Title>
          <Toggle checked={isCheckedTest} onClick={onChangeTest} />
        </section>

        <section>
          <Title>주차 활성화</Title>
          <Toggle checked={isCheckedActive} onClick={onChangeActive} />
        </section>

        {isCheckedActive && (
          <section>
            <DatePickerWrapper>
              <i>시작</i>
              <DatePicker defaultDate={startDate} selectsStart onChange={setStartDate} />
            </DatePickerWrapper>
            <DatePickerWrapper>
              <i>종료</i>
              <DatePicker defaultDate={endDate} selectsEnd onChange={setEndDate} />
            </DatePickerWrapper>
          </section>
        )}

        <SubmitButton
          onClick={onSubmit}
          size="Regular"
          color={currentTheme.primary}
          disabled={status === 'loading'}
        >
          생성하기
        </SubmitButton>
      </Wrapper>
    </>
  );
};

WeekCreatePage.getLayout = page => {
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

const DatePickerWrapper = styled.div`
  & > i {
    display: block;
    ${typo.badge};
    color: ${({ theme }) => theme.text.f4};
    margin-bottom: 8px;
  }

  & ~ & {
    margin-top: 16px;
  }
`;

const SubmitButton = styled(FillButton)`
  flex: 0;
  width: 164px;
  margin-top: 48px;
`;

export default WeekCreatePage;
