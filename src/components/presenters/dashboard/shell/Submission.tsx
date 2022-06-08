import styled from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import { TextButton } from 'sjds/components/buttons';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';
// styles
import { typo, boxShadow } from 'sjds';
// types
import type { SubmitProblemResponse } from 'types/api/problem';

/** 쿼리 제출에 대한 결과 */
const Submission = ({ data }: Props) => {
  const { initSnackbar } = useSnackbar();

  const onClickBadge = warning => {
    initSnackbar({
      type: 'Info',
      title: `${warning.name.replaceAll('_', ' ').toUpperCase()}`,
      message: warning.content,
    });
  };

  const ConditionList = data?.warnings.map(warning => (
    <ConditionBadge key={warning.id} size="Regular" onClick={() => onClickBadge(warning)}>
      {warning.name.replaceAll('_', ' d').toUpperCase()}
    </ConditionBadge>
  ));

  return (
    <Wrapper>
      {!!data && (
        <Result isPass={data.accuracy}>
          <mark>{data.accuracy ? '정답' : '오답'}</mark> 입니다.
        </Result>
      )}

      <Badge text="고급 조건" />
      {ConditionList}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Result = styled.div<{ isPass: boolean }>`
  padding: 8px 12px;
  margin-bottom: 32px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.bg2};
  ${typo.value1};
  ${boxShadow.e1};
  cursor: default;

  & > mark {
    color: ${({ isPass, theme }) => (isPass ? theme.semantic.success : theme.semantic.danger)};
  }
`;

const ConditionBadge = styled(TextButton)`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.bg3};
  color: ${({ theme }) => theme.semantic.info};
  font-weight: 500;
  white-space: nowrap;
  ${boxShadow.e1};

  & ~ & {
    margin-left: 8px;
  }
`;

type Props = {
  data?: SubmitProblemResponse;
};

export default Submission;
