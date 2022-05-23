import styled from 'styled-components';
// components
import { FillButton } from 'sjds/components/buttons';
// styles
import { typo } from 'sjds';

/**
 * 멤버 관리 버튼
 * @param props
 * @param props.isExist 이미 추가 여부
 * @param props.labelList 출력 데이터
 * @param props.onClick
 */
const MemberManageButton = ({ isExist, labelList, onClick }: Props) => {
  const LabelList = labelList.map((label, idx) => <span key={idx}>{label}</span>);

  return (
    <Wrapper>
      <LabelWrapper>{LabelList}</LabelWrapper>

      <Button isExist={isExist} size="Regular" onClick={onClick}>
        {isExist ? '제거' : '추가'}
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

export default MemberManageButton;
