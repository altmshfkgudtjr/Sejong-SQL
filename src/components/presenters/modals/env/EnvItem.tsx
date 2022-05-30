import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
// components
import CheckBox from 'components/atoms/inputs/Checkbox';
// styles
import { typo } from 'sjds';
// types
import type { Environment } from 'types/api/environment';

/** 가상 데이터베이스 테이블 아이템 */
const EnvItem = ({ data, checked = false, onChange }: Props) => {
  return (
    <Wrapper>
      <Cell>
        <CheckBox label={`env-database-${data.id}`} checked={checked} onChange={onChange} />
      </Cell>
      <Cell>{data.name}</Cell>
      <Cell>{format(parseISO(data.created_at), 'yyyy-MM-dd')}</Cell>
      <Cell>{data.owner}</Cell>
      <Cell>{data.table.join(', ')}</Cell>
    </Wrapper>
  );
};

const Wrapper = styled.tr``;

const Cell = styled.td`
  padding: 16px;
  ${typo.body3};
  color: ${({ theme }) => theme.text.f4};

  & > label {
    vertical-align: middle;
  }
`;

type Props = {
  data: Environment;
  checked: boolean;
  onChange: () => void;
};

export default EnvItem;
