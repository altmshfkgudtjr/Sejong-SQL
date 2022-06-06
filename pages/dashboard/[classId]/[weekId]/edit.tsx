import styled, { useTheme } from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { format, parseISO, isBefore } from 'date-fns';
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
import { mediaQuery, typo, animations } from 'sjds';

/** 주차 수정 페이지 */
const WeekEditPage = () => {
  const currentTheme = useTheme();
  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();
  const router = useRouter();
  const classId = parseInt(router.query.classId as string, 10);
  const weekId = parseInt(router.query.weekId as string, 10);

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const [isCheckedTest, setIsCheckedTest] = useState(false);
  const [isCheckedActive, setIsCheckedActive] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { refetch: classRefetch } = useClassController.GetClassList();
  const { refetch: weekListRefetch } = useWeekController.GetWeekList(classId);
  const {
    status: weekStatus,
    data: weekData,
    refetch: weekRefetch,
  } = useWeekController.GetWeek(weekId);
  const { mutate: editMutate, status: editStatus } = useWeekController.UpdateWeek();
  const { mutate: removeMutate, status: removeStatus } = useWeekController.RemoveWeek();

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
    editMutate(
      {
        classId,
        weekId,
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
          classRefetch();
          weekListRefetch();
          initSnackbar({
            type: 'Success',
            title: '수정 완료',
            message: '주차 내용이 수정되었습니다',
          });
          Router.replace(`/dashboard/${classId}/${weekId}`);
        },
      },
    );
  }, [
    onEmptyCheck,
    endDate,
    startDate,
    editMutate,
    weekRefetch,
    classRefetch,
    weekListRefetch,
    classId,
    weekId,
    isCheckedTest,
    isCheckedActive,
    initSnackbar,
  ]);

  const onDelete = useCallback(() => {
    if (confirm('주차를 정말 삭제하시겠습니까?')) {
      removeMutate(
        { classId, weekId },
        {
          onSuccess: () => {
            classRefetch();
            weekListRefetch();
            initSnackbar({
              type: 'Success',
              title: '삭제 완료',
              message: '주차가 삭제 완료되었습니다',
            });
            Router.replace(`/dashboard/${classId}`);
          },
        },
      );
    }
  }, [removeMutate, classId, weekId, classRefetch, weekListRefetch, initSnackbar]);

  /** 초기 데이터 설정 */
  useEffect(() => {
    if (!weekData?.result) {
      return;
    }

    setIsCheckedActive(!!weekData.result?.activate);
    setIsCheckedTest(!!weekData.result?.exam);
    weekData.result?.activate_start && setStartDate(parseISO(weekData.result?.activate_start));
    weekData.result?.activate_end && setEndDate(parseISO(weekData.result?.activate_end));
  }, [weekData]);

  return (
    <>
      <MetaTitle content="주차 수정" />

      <Wrapper>
        <Breadcrumb />

        <TopMessageWrapper>
          <TopMessage message="주차에 대한 정보를 수정해주세요." />
        </TopMessageWrapper>

        <section>
          <Title>주차명</Title>
          <TextInput placeholder="새로운 주차" ref={name} defaultValue={weekData?.result?.name} />
        </section>

        <section>
          <Title>주차 설명</Title>
          <TextInput
            placeholder="새로운 주차 설명 (선택사항)"
            ref={description}
            defaultValue={weekData?.result?.comment}
          />
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

        {weekStatus === 'success' && (isCheckedTest || isCheckedActive) && (
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

        <ButtonWrapper>
          <SubmitButton
            onClick={onSubmit}
            size="Regular"
            color={currentTheme.primary}
            disabled={editStatus === 'loading'}
          >
            수정하기
          </SubmitButton>
          <DeleteButton
            onClick={onDelete}
            size="Regular"
            color={currentTheme.background.bg5}
            disabled={removeStatus === 'loading'}
          >
            삭제하기
          </DeleteButton>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

WeekEditPage.getLayout = page => {
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
  animation: 0.4s ease ${animations.fadeIn};

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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;

  ${mediaQuery.medium} {
    flex-direction: row;
  }
`;

const SubmitButton = styled(FillButton)`
  flex: 1;
  max-width: 164px;
`;

const DeleteButton = styled(FillButton)`
  flex: 1;
  max-width: 164px;
`;

export default WeekEditPage;
