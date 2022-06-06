import styled from 'styled-components';
// styles
import { typo } from 'sjds';

/**
 * 쿼리로 출력되는 테이블
 */
const QueryTable = ({ data }: Props) => {
  if (data.length === 0) {
    return null;
  }

  const Head = Object.keys(data[0]).map((key, idx) => <td key={idx}>{key}</td>);

  const Body = data.map((row, idx) => (
    <tr key={idx}>
      {Object.keys(row).map((key, idx) => (
        <td key={idx}>{row[key]}</td>
      ))}
    </tr>
  ));

  return (
    <Wrapper>
      <thead>
        <tr>{Head}</tr>
      </thead>

      <tbody>{Body}</tbody>
    </Wrapper>
  );
};

const Wrapper = styled.table`
  width: 100%;
  padding-right: 32px;

  &,
  tr,
  td {
    border: 1px solid ${({ theme }) => theme.border.b2};
  }

  td {
    padding: 4px 8px;
    white-space: nowrap;
  }

  thead td {
    ${typo.subtitle2};
    background-color: ${({ theme }) => theme.background.bg4};
  }

  tbody td {
    ${typo.body2};
  }
`;

type Props = {
  data: object[];
};

export default QueryTable;
