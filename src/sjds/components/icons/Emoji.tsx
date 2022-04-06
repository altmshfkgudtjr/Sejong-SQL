import styled from 'styled-components';

/**
 * 이모지
 * @param props
 * @param props.name 이모지명
 * @param props.size 사이즈
 */
const Emoji = ({ name, size = '48', ...props }: Props) => {
  return (
    <Wrapper size={size}>
      <svg style={{ pointerEvents: 'none' }} {...props}>
        <use href={`#${name}`} />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ size: EmojiSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: #c3cbd4;
  border-radius: 8px;
`;

type EmojiSize = '24' | '48';

type Props = {
  name: string;
  size?: EmojiSize;
};

export default Emoji;
