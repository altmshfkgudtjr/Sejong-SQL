import { useState, useLayoutEffect, useCallback } from 'react';
import { isBefore, intervalToDuration } from 'date-fns';
// types
import type { RefObject } from 'react';
import type { Duration } from 'date-fns';

/**
 * 시험 타이머
 * @param props
 * @param props.target 타이머 표시할 Element
 * @param props.isKoreanFormat 남은 시간 표시할 한국어 포맷
 * @param props.endDate 종료 시각
 */
const useExamTimer = ({ target, isKoreanFormat = false, endDate }: Props) => {
  const [duration, setDuration] = useState<Duration>({});
  const [isDone, setIsDone] = useState(false);

  const updateDOM = useCallback(
    (duration: Duration) => {
      if (!target?.current) {
        return;
      }

      if (isKoreanFormat) {
        target.current.textContent = `${duration.hours ? duration.hours + '시간' : ''} ${
          duration.minutes ? duration.minutes + '분' : ''
        } ${duration.seconds ? duration.seconds + '초' : ''}`;
      } else {
        target.current.textContent = `${
          duration.hours !== undefined && duration.hours < 10
            ? '0' + duration.hours
            : duration.hours
        }:${
          duration.minutes !== undefined && duration.minutes < 10
            ? '0' + duration.minutes
            : duration.minutes
        }:${
          duration.seconds !== undefined && duration.seconds < 10
            ? '0' + duration.seconds
            : duration.seconds
        }`;
      }
    },
    [target, isKoreanFormat],
  );

  /** isStart, isDone 설정 */
  useLayoutEffect(() => {
    const currentDate = new Date();

    if (isBefore(currentDate, endDate)) {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  }, [duration, endDate]);

  /** 타이머 작동 */
  useLayoutEffect(() => {
    const callback = () => {
      const currentDate = new Date();

      const diff = intervalToDuration({
        start: currentDate,
        end: endDate,
      });

      setDuration(diff);
      updateDOM(diff);

      const isTimeOut = isBefore(endDate, currentDate);
      if (isTimeOut) {
        window.clearInterval(timer_2);
        return;
      }
    };

    const timer_1 = window.setTimeout(callback, 0);
    const timer_2 = window.setInterval(callback, 1000);
    return () => {
      window.clearTimeout(timer_1);
      window.clearInterval(timer_2);
    };
  }, [endDate, updateDOM]);

  return {
    duration,
    isDone,
  };
};

type Props = {
  target?: RefObject<HTMLElement>;
  isKoreanFormat?: boolean;
  endDate: Date;
};

export default useExamTimer;
