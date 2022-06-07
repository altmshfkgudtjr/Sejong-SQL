import styled from 'styled-components';
// styles
import { typo } from 'sjds';
// types
import type { Warning } from 'types/api/problem';
import { boxShadow } from 'sjds';

const 쿼리출력영역 = ({ isPass, warningList }: Props) => {
  return (
    <Wrapper>
      {isPass && <Message isPass={isPass}>PASS</Message>}
      {!isPass && (
        <>
          <Message isPass={isPass}>NON-PASS</Message>
          <WarningWrapper>
            {warningList.map((warning, idx) => (
              <Badge key={idx}>{warning.name.toUpperCase().replaceAll('_', ' ')}</Badge>
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

const Badge = styled.i`
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
