import { useRef } from 'react';

/**
 * Debounce Hook
 *
 * @example
 * const onInput = (e: React.UIEvent<HTMLDivElement>) => {
 *   ...
 * };
 *
 * const onThrottleInput = useThrottle<[React.UIEvent<HTMLDivElement>]>(
 *   onInput,
 *   300
 * );
 */
function useDebounce<T extends any[]>(callback: Function, time: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (...params: T) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...params);
      timer.current = null;
    }, time);
  };
}

export default useDebounce;
