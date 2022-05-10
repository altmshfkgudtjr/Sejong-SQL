import styled from 'styled-components';
// types
import type { PropsWithChildren } from 'react';

/**
 * 뱃지
 * @param props
 * @param props.type 뱃지 타입
 */
const Badge = ({ type, children }: PropsWithChildren<Props>) => {
  return <Wrapper type={type}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ type: Type }>`
  padding: 4px 12px 4px 8px;
  border-radius: 4px;
  background-color: ${({ type }) => {
    if (type === 'Info') {
      return '#ECF4FD';
    }
  }};

  color: ${({ type }) => {
    if (type === 'Info') {
      return '#2680EB';
    }
  }};
`;

type Type = 'Info' | 'Success' | 'Warnig' | 'Error';

type Props = {
  type: Type;
};

export default Badge;
