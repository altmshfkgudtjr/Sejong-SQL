import styled from 'styled-components';

/**
 * 기본 버튼
 */
const BaseButton = styled.button<BaseButtonType>`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 4px;
  margin: 0;
  border-radius: 4px;
  overflow: hidden;

  &:disabled {
    cursor: not-allowed;
  }
`;

export interface BaseButtonType {
  size?: '';
  disabled?: boolean;
}

export default BaseButton;
