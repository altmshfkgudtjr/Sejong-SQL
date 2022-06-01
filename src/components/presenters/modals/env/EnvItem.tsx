import styled, { css } from 'styled-components';
import { format, parseISO } from 'date-fns';
// components
import CheckBox from 'components/atoms/inputs/Checkbox';
// styles
import { typo, boxShadow, lib } from 'sjds';
// types
import type { Environment, MyEnvironment } from 'types/api/environment';
import { isTypeEnvironment } from 'types/guards/envrionment';

/** 가상 데이터베이스 테이블 아이템 */
const EnvItem = ({ data, checked = false, onChange, onSelect }: Props) => {
  const type = isTypeEnvironment(data) ? 'class' : 'my';

  return (
    <Wrapper>
      <Cell>
        <CheckBox label={`env-database-${type}-${data.id}`} checked={checked} onChange={onChange} />
      </Cell>
      <Cell>
        <Button onClick={onSelect}>{data.name}</Button>
      </Cell>
      <Cell>{format(parseISO(data.created_at), 'yyyy-MM-dd')}</Cell>
      {isTypeEnvironment(data) && <Cell>{data.owner}</Cell>}
      <Cell>
        {data.table.length === 0 && '분석 중...'}
        {data.table.length > 0 && data.table.map((d, idx) => <Badge key={idx}>{d}</Badge>)}
      </Cell>
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

const Badge = styled.i`
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.bg3};
  color: ${({ theme }) => theme.semantic.info};
  ${boxShadow.e1};

  & ~ & {
    margin-left: 8px;
  }
`;

const Button = styled.button`
  color: ${({ theme }) => theme.semantic.info};

  ${lib.onlyHover(css`
    text-decoration: underline;
    text-underline-position: under;
  `)};
`;

type Props = {
  data: Environment | MyEnvironment;
  checked: boolean;
  onChange: () => void;
  onSelect: () => void;
};

export default EnvItem;
