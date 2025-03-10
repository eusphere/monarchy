import * as React from 'react';

type PollControls = [() => void, () => void];

const usePoll = (fn: () => void, interval: number = 1000): PollControls => {
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const stop = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const start = React.useCallback(() => {
    stop();
    intervalRef.current = setInterval(fn, interval);
  }, [fn, interval, stop]);

  React.useEffect(() => {
    return () => stop(); // Cleanup on unmount
  }, [stop]);

  return [start, stop];
};

export default usePoll;
