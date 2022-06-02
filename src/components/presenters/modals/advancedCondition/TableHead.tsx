import styled from 'styled-components';
// components
import CheckBox from 'components/atoms/inputs/Checkbox';
// styles
import { typo } from 'sjds';

/** 고급 조건 테이블 헤드 */
const TableHead = ({ checked = false, onChange }: Props) => {
  return (
    <Wrapper>
      <Cell>
        <CheckBox label={`env-database-all`} checked={checked} onChange={onChange} />
      </Cell>
      <Cell>이름</Cell>
      <Cell>설명</Cell>
    </Wrapper>
  );
};

const Wrapper = styled.tr``;

const Cell = styled.td`
  padding: 16px;
  ${typo.subtitle3};
  color: ${({ theme }) => theme.text.f2};

  & > label {
    vertical-align: middle;
  }
`;

type Props = {
  checked: boolean;
  onChange: () => void;
};

export default TableHead;
