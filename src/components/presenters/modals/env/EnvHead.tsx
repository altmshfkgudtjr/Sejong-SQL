import styled from 'styled-components';
// components
import CheckBox from 'components/atoms/inputs/Checkbox';
// styles
import { typo } from 'sjds';

/** 가상 데이터베이스 테이블 헤드 */
const EnvHead = ({ type, checked = false, onChange }: Props) => {
  return (
    <Wrapper>
      <Cell>
        <CheckBox
          label={`env-database-${type.toLowerCase()}`}
          checked={checked}
          onChange={onChange}
        />
      </Cell>
      <Cell>이름</Cell>
      <Cell>생성일</Cell>
      {type === 'Class' && <Cell>생성자</Cell>}
      <Cell>소속 테이블</Cell>
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
  type: 'Class' | 'My';
  checked: boolean;
  onChange: () => void;
};

export default EnvHead;
