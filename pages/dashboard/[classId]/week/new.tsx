import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useRef, useCallback } from 'react';
import { format, isBefore } from 'date-fns';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import { FillButton } from 'sjds/components/buttons';
import TextInput from 'components/atoms/inputs/Text';
import CheckBox from 'components/atoms/inputs/Checkbox';
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

  const { refetch } = useClassController.GetClassList();
  const { mutate: createMutate, status } = useWeekController.CreateWeek({
    onSuccess: refetch,
  });
  const { refetch: weekRefetch } = useWeekController.GetWeekist(classId);

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
    if (!isCheckedTest) {
      setIsCheckedActive(true);
    }
    setIsCheckedTest(v => !v);
  };
  const onChangeActive = () => {
    if (isCheckedActive) {
      setIsCheckedTest(false);
    }
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
          weekRefetch();
          router.replace(`/dashboard/${classId}`);
        },
      },
    );
  }, [
    onEmptyCheck,
    endDate,
    startDate,
    createMutate,
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
          <CheckBox label="class-test" message="" checked={isCheckedTest} onChange={onChangeTest} />
        </section>

        <section>
          <Title>주차 활성화</Title>
          <CheckBox
            label="class-activate"
            message=""
            checked={isCheckedActive}
            onChange={onChangeActive}
          />
        </section>

        {isCheckedActive && (
          <section>
            <DatePickerWrapper>
              <i>시작</i>
              <DatePicker defaultDate={new Date()} selectsStart onChange={setStartDate} />
            </DatePickerWrapper>
            <DatePickerWrapper>
              <i>종료</i>
              <DatePicker defaultDate={new Date()} selectsEnd onChange={setEndDate} />
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
