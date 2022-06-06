import styled from 'styled-components';
// components
import { FillButton } from 'sjds/components/buttons';
// styles
import { typo } from 'sjds';

/**
 * 주차 선택 버튼
 * @param props
 * @param props.labelList 출력 데이터
 * @param props.onClick
 */
const WeekButton = ({ isExist, labelList, onClick }: Props) => {
  const LabelList = labelList.map((label, idx) => <span key={idx}>{label ? label : '-'}</span>);

  return (
    <Wrapper>
      <LabelWrapper>{LabelList}</LabelWrapper>

      <Button isExist={isExist} size="Regular" onClick={onClick}>
        선택
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  span {
    width: 100px;
    ${typo.value3};
    color: ${({ theme }) => theme.text.f1};

    &:nth-child(2) {
      width: 80px;
    }
  }

  & ~ & {
    margin-top: 8px;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled(FillButton)<{ isExist?: boolean }>`
  flex: 0 1 auto;
  width: 80px;
  background-color: ${({ isExist, theme }) => (isExist ? theme.primary : theme.semantic.info)};
  color: ${({ theme }) => theme.semantic.white};
`;

type Props = {
  isExist?: boolean;
  labelList: string[];
  onClick: (e: any) => void;
};

export default WeekButton;
