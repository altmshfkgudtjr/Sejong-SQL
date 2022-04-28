import styled from 'styled-components';

const PasswordInput = ({ ...props }) => {
  return (
    <Wrapper>
      <Input type="password" {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 320px;
  height: 48px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.bg3};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.text.f2};
  background-color: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.text.f4};
  }
`;

export default PasswordInput;
