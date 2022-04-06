import { useRef } from 'react';

/**
 * Throttle Hook
 *
 * @example
 * const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
 *   ...
 * };
 *
 * const onThrottleScroll = useThrottle<[React.UIEvent<HTMLDivElement>]>(
 *   onScroll,
 *   300
 * );
 */
function useThrottle<T extends any[]>(callback: Function, time: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...params: T) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...params);
        timer.current = null;
      }, time);
    }
  };
}

export default useThrottle;
