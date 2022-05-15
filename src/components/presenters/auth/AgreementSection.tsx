import styled, { useTheme } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
// components
import { TextButton, FillButton } from 'sjds/components/buttons';
import 개인정보처리방침 from 'components/presenters/auth/개인정보처리방침';

/**
 * 개인정보처리방침 동의 영역
 * @param props
 * @param props.onRead 동의 여부
 */
const AgreementSection = ({ onRead }: Props) => {
  const currentTheme = useTheme();
  const router = useRouter();

  const [isRead, setIsRead] = useState(false);

  const scrollTarget = useRef<HTMLDivElement>(null);
  const readTarget = useRef<HTMLDivElement>(null);

  const onIntersect = (entries, observer) => {
    if (entries[0].isIntersecting) {
      setIsRead(true);
      observer.unobserve(entries[0].target);
    }
  };

  const onBack = () => router.back();

  const onScrollAgreement = () => {
    if (!scrollTarget.current) {
      return;
    }

    scrollTarget.current.scrollBy({
      top: 2000,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    let observer;
    if (readTarget.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(readTarget.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  return (
    <>
      <AgreementLayout>
        <AgreementWrapper ref={scrollTarget}>
          <개인정보처리방침 />
          <div ref={readTarget} />
        </AgreementWrapper>
      </AgreementLayout>
      <ScrollButton size="Regular" color={currentTheme.semantic.info} onClick={onScrollAgreement}>
        스크롤 내리기
      </ScrollButton>
      <ButtonWrapper>
        <FillButton size="Regular" color={currentTheme.background.bg5} onClick={onBack}>
          돌아가기
        </FillButton>
        <FillButton size="Regular" color={currentTheme.primary} onClick={onRead} disabled={!isRead}>
          동의 및 진행
        </FillButton>
      </ButtonWrapper>
    </>
  );
};

const AgreementLayout = styled.div`
  width: calc(100% - 32px);
  max-width: 600px;
  max-height: 320px;
  padding: 16px 0;
  margin-bottom: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.background.bg3};
  overflow: hidden;
`;

const AgreementWrapper = styled.div`
  height: 100%;
  padding: 16px 32px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: ${({ theme }) => theme.border.b2};
    border-radius: 16px;

    &:hover {
      background-color: ${({ theme }) => theme.border.b1};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 320px;

  & > button {
    flex: 1;
  }
`;

const ScrollButton = styled(TextButton)`
  flex: 0 0 auto;
  width: 320px;
  margin-bottom: 16px;
`;

type Props = {
  onRead: () => void;
};

export default AgreementSection;
