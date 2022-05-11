import styled from 'styled-components';
// components
import Badge from 'components/containers/dashboard/shell/Badge';

const 출력영역 = () => {
  return (
    <Wrapper>
      <Badge text="실행 결과" />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default 출력영역;
