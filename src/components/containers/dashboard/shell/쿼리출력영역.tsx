import styled from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
// styles
import { typo } from 'sjds';
// types
import type { Warning } from 'types/api/problem';
import { boxShadow } from 'sjds';

const 쿼리출력영역 = ({ isPass, warningList }: Props) => {
  return (
    <Wrapper>
      <Badge text="정확성" />
      {isPass && <Message isPass={isPass}>PASS</Message>}
      {!isPass && <Message isPass={isPass}>NON-PASS</Message>}
      {warningList.length > 0 && (
        <>
          <WarningWrapper>
            <Badge text="효율성" />
            {warningList.map((warning, idx) => (
              <WarninbBadge key={idx}>
                {warning.name.toUpperCase().replaceAll('_', ' ')}
              </WarninbBadge>
            ))}
          </WarningWrapper>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
`;

const Message = styled.p<{ isPass: boolean }>`
  ${typo.subtitle2};
  color: ${({ isPass, theme }) => (isPass ? theme.semantic.success : theme.semantic.danger)};
`;

const WarningWrapper = styled.div`
  margin-top: 32px;
`;

const WarninbBadge = styled.i`
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
  isPass: boolean;
  warningList: Warning[];
};

export default 쿼리출력영역;
