import styled from 'styled-components';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
// components
import EnvModalBoard from './Board';
import EnvModalNew from './New';
// styles
import { mediaQuery, boxShadow } from 'sjds';

// TODO 슬라이더 아이템이 3개 이상일 경우, transition 제대로 되지 않는 버그
/** 가상 데이터베이스 선택 모달 */
const EnvModal = ({ onCloseModal, args }) => {
  const ANIMATION_DURATION = 250;

  const slider = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);
  const direction = useRef<'Left' | 'Right'>('Right');
  const [idx, setIdx] = useState(0);
  const [isAnime, setIsAnime] = useState(false);

  const onAnime = () => {
    setIsAnime(true);
    timer.current = window.setTimeout(() => {
      setIsAnime(false);
    }, ANIMATION_DURATION);
  };

  const onPrev = () => {
    onAnime();
    setIdx(v => v - 1);
    direction.current = 'Left';
  };

  const onNext = () => {
    onAnime();
    setIdx(v => v + 1);
    direction.current = 'Right';
  };

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  useLayoutEffect(() => {
    const target = slider.current;

    return () => {
      if (!target) {
        return;
      }

      target.style.transition = `0ms ease`;
      target.style.transform = `translateX(${-100 * idx}%)`;
    };
  }, [idx]);

  useEffect(() => {
    const target = slider.current;
    if (!target) {
      return;
    }

    const sign = direction.current === 'Left' ? 1 : -1;

    target.style.transition = isAnime ? `${ANIMATION_DURATION}ms ease` : '0ms ease';
    target.style.transform = isAnime ? `translateX(${sign * 100 * idx}%)` : `translateX(0%)`;
  }, [idx, isAnime]);

  return (
    <Wrapper>
      <Slider ref={slider}>
        <SliderItem currentIdx={idx} idx={0} isAnime={isAnime}>
          <EnvModalBoard onNext={onNext} onCloseModal={onCloseModal} args={args} />
        </SliderItem>
        <SliderItem currentIdx={idx} idx={1} isAnime={isAnime}>
          <EnvModalNew onPrev={onPrev} args={args} />
        </SliderItem>
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  padding-bottom: 400px;
  background-color: ${({ theme }) => theme.background.bg2};
  ${boxShadow.e2};
  overflow-x: hidden;
  overflow-y: auto;

  ${mediaQuery.medium} {
    width: 600px;
    height: 800px;
    max-height: 100%;
    border-radius: 12px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slider = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SliderItem = styled.div<{ currentIdx: number; idx: number; isAnime: boolean }>`
  display: ${({ currentIdx, idx, isAnime }) => {
    if (currentIdx === idx) {
      return 'block';
    } else if (isAnime && (idx === currentIdx - 1 || idx === currentIdx + 1)) {
      return 'block';
    }
    return 'none';
  }};
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
`;

export default EnvModal;
