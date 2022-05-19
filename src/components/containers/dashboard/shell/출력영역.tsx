import styled, { useTheme } from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import { FillButton } from 'sjds/components/buttons';
// hooks
import * as useProblemController from 'hooks/controllers/useProblemController';
import { typo } from 'sjds';

const 출력영역 = ({ classId, problemId, getUserQuery }: Props) => {
  const currentTheme = useTheme();

  const { mutate, status, data } = useProblemController.RunProblem();

  const onRun = () => {
    const query = getUserQuery();

    mutate({
      classId,
      problemId,
      data: { query },
    });
  };

  const TableHeader =
    status === 'success' && !!data
      ? Object.keys(data.result?.query_result[0]).map((key, idx) => <td key={idx}>{key}</td>)
      : null;

  const TableRowList =
    status === 'success' && !!data
      ? data.result?.query_result.map((row, idx) => (
          <tr key={idx}>
            {Object.keys(row).map((key, idx) => (
              <td key={idx}>{row[key]}</td>
            ))}
          </tr>
        ))
      : null;

  return (
    <Wrapper>
      <Badge text="실행 결과" />

      <Body>
        {status === 'success' && (
          <table>
            <thead>{TableHeader}</thead>
            <tbody>{TableRowList}</tbody>
          </table>
        )}
      </Body>

      <Footer>
        <Button onClick={onRun} color={currentTheme.primary} size="Regular">
          쿼리 실행
        </Button>
        <Button color={currentTheme.primary} size="Regular">
          제출하기
        </Button>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
`;

const Body = styled.div`
  flex: 1;

  table {
    width: 100%;
  }

  thead td {
    ${typo.subtitle2};
  }

  table,
  tr,
  td {
    border: 1px solid ${({ theme }) => theme.border.b2};
    ${typo.body2};
  }

  td {
    padding: 4px 8px;
  }
`;

const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  position: sticky;
  padding: 16px 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.bg3};
`;

const Button = styled(FillButton)`
  flex: 0 1 auto;
  width: 120px;
`;

type Props = {
  classId: number;
  problemId: number;
  getUserQuery: () => string;
};

export default 출력영역;
