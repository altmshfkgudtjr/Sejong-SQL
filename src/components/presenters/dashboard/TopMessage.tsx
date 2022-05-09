import { typo } from 'sjds';
import styled from 'styled-components';

/**
 * 대시보드 상단 메세지
 * @param message
 */
const TopMessage = ({ message }: Props) => {
  return <Wrapper>{message}</Wrapper>;
};

const Wrapper = styled.div`
  width: fit-content;
  padding: 16px 20px;
  border-radius: 0 16px 16px 16px;
  border: 1px solid ${({ theme }) => theme.border.b2};
  background-color: ${({ theme }) => theme.background.bg1};
  ${typo.value2};
  color: ${({ theme }) => theme.semantic.success};
`;

type Props = {
  message: string;
};

export default TopMessage;
