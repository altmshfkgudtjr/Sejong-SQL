import styled from 'styled-components';
// components
import CheckBox from 'components/atoms/inputs/Checkbox';
// styles
import { typo, boxShadow } from 'sjds';
// types
import type { Warning } from 'types/api/problem';

/** 고급 조건 테이블 아이템 */
const TableItem = ({ data, checked = false, onChange }: Props) => {
  return (
    <Wrapper>
      <Cell>
        <CheckBox label={`advanced-condition-${data.id}`} checked={checked} onChange={onChange} />
      </Cell>
      <Cell>
        <Badge>{data.name.replaceAll('_', ' ').toUpperCase()}</Badge>
      </Cell>
      <Cell>{data.content}</Cell>
    </Wrapper>
  );
};

const Wrapper = styled.tr``;

const Cell = styled.td`
  padding: 16px;
  ${typo.body3};
  color: ${({ theme }) => theme.text.f3};

  & > label {
    vertical-align: middle;
  }
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
  data: Warning;
  checked: boolean;
  onChange: () => void;
};

export default TableItem;
