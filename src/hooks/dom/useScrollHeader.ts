import { useState, useEffect, useRef } from 'react';
// hooks
import useThrottle from 'hooks/event/useThrottle';
// utils
import { getScrollTop } from 'utils/helpers/dom';
// types
import type { MutableRefObject } from 'react';

/**
 * 스크롤에 따른 헤더 표시 Hook
 */
const useScrollHeader = (ref: MutableRefObject<HTMLElement | null>) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);

  const onThrottleScroll = useThrottle(onScroll, 100);

  function onScroll() {
    const scrollTop = getScrollTop();
    if (scrollTop > lastScrollTop.current) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollTop.current = scrollTop < 0 ? 0 : scrollTop;
  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transition = '0.2s ease';
    ref.current.style.transform = isVisible ? 'translate3d(0,0,0)' : 'translate3d(0,-100%,0)';
  }, [ref, isVisible]);

  useEffect(() => {
    document.addEventListener('scroll', onThrottleScroll);
    return () => document.removeEventListener('scroll', onThrottleScroll);
  }, [onThrottleScroll]);

  return { isVisible };
};

export default useScrollHeader;
